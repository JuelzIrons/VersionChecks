import os
import re
import sys
import json
import time
import shutil
import subprocess
import traceback

import requests

# IF YOU USE MY FUCKING CODE, PLEASE FOR THE LOVE OF GOD CREDIT ME SOMEWHERE. I SPENT A LOT OF TIME ON THIS, AND ALL I ASK IN RETURN IS A MENTION. THANK YOU.
# ====================== CONFIG ======================
APPID        = "4551040"
DEPOT        = "4551041"
STEAM_USER   = "YOUR_STEAM_USERNAME"  # set this before running
POLL_SECONDS = 60
FAKE_UPDATE  = False

STEAMCMD   = r"C:\steamcmd\steamcmd.exe"
WEBHOOK    = "YOUR_DISCORD_WEBHOOK_URL"  # set this before running

BASE       = os.path.dirname(os.path.abspath(__file__))
OLD_DLL    = os.path.join(BASE, "OLD", "UnityPlayer.dll")
OLD_MAP    = os.path.join(BASE, "OLD", "Frida-Map.js")
OUT_DIR    = os.path.join(BASE, "output")
STATE_FILE = os.path.join(BASE, "state.json")

# STUFF FOR MY GIT REPO -- CHANGE THESE PATHS IF YOU WANT TO PUSH TO YOUR OWN REPO, OR JUST REMOVE THE GIT STUFF ENTIRELY
LIVE_MAP   = r"C:\Users\Xera\Documents\GitHub\VersionChecks\AC Menu\Frida-Map.js"
REPO_DIR   = r"C:\Users\Xera\Documents\GitHub\VersionChecks"

# where steamcmd download_depot drops files
DEPOT_DIR  = os.path.join(r"C:\steamcmd", "steamapps", "content", f"app_{APPID}", f"depot_{DEPOT}")

MIN_LEN = 5
# ====================================================


def log(msg):
    print(f"[{time.strftime('%Y-%m-%d %H:%M:%S')}] {msg}", flush=True)


def load_state():
    if os.path.exists(STATE_FILE):
        with open(STATE_FILE) as f:
            return json.load(f)
    return {}


def save_state(state):
    with open(STATE_FILE, "w") as f:
        json.dump(state, f, indent=2)


def get_buildid():
    r = requests.get(f"https://api.steamcmd.net/v1/info/{APPID}", timeout=30)
    r.raise_for_status()
    data = r.json()
    return str(data["data"][APPID]["depots"]["branches"]["public"]["buildid"])


def download_depot():
    log("Downloading depot via steamcmd...")
    cmd = [STEAMCMD, "+login", STEAM_USER, "+download_depot", APPID, DEPOT, "+quit"]
    p = subprocess.run(cmd, capture_output=True, text=True, timeout=3600)
    log(p.stdout[-500:] if p.stdout else "(no stdout)")
    if p.returncode != 0:
        raise RuntimeError(f"steamcmd exit {p.returncode}")


def git_push(buildid, version):
    def g(*args):
        return subprocess.run(["git", "-C", REPO_DIR, *args],
                              capture_output=True, text=True, timeout=120)
    g("add", LIVE_MAP)
    msg = f"AC update: build {buildid} (Unity {version})"
    c = g("commit", "-m", msg)
    if c.returncode != 0:
        log(f"git commit: {c.stdout.strip()} {c.stderr.strip()}")
        return
    p = g("push", "origin", "HEAD")
    if p.returncode != 0:
        log(f"git push FAILED: {p.stderr.strip()}")
    else:
        log(f"git pushed: {msg}")


def find_file(root, name):
    for dirpath, _, files in os.walk(root):
        if name in files:
            return os.path.join(dirpath, name)
    return None


def extract_unity_version(ggm_path):
    with open(ggm_path, "rb") as f:
        head = f.read(200)
    m = re.search(rb'(\d+\.\d+\.\d+[abf]\d+)', head)
    return m.group(1).decode() if m else "UNKNOWN"


def extract_strings(path):
    with open(path, "rb") as f:
        data = f.read()
    pattern = re.compile(rb'[ -~]{' + str(MIN_LEN).encode() + rb',}')
    return {m.start(): m.group().decode("ascii") for m in pattern.finditer(data)}


def remap(new_dll):
    old_strings = extract_strings(OLD_DLL)
    new_strings = extract_strings(new_dll)
    old_to_new = {
        old: new_strings[off]
        for off, old in old_strings.items()
        if off in new_strings and new_strings[off] != old
    }

    with open(OLD_MAP, "r") as f:
        js = f.read()

    matched = 0
    for old, new in old_to_new.items():
        if f'"{old}"' in js:
            js = js.replace(f'"{old}"', f'"{new}"')
            matched += 1

    # build symbol map json from the remapped js: name: ...findExportByName("token")
    symbols = dict(re.findall(r'(\w+)\s*:\s*\(\)\s*=>\s*Il2Cpp\.module\.findExportByName\("([^"]+)"\)', js))

    return js, symbols, len(old_to_new), matched


def post_discord(version, buildid, map_path, json_path, changed, matched, unity_changed, prev_version):
    warn = ""
    if unity_changed:
        warn = (f"\n\n:warning: **UNITY VERSION CHANGED** ({prev_version} -> {version}). "
                f"Export offsets may have shifted, verify manually before using syms.")

    color = 0xE74C3C if (unity_changed or matched != changed) else 0x2ECC71
    embed = {
        "title": "Juelz's Auto Syms Updater",
        "color": color,
        "fields": [
            {"name": "Unity Version", "value": f"`{version}`", "inline": True},
            {"name": "Depot ID", "value": f"`{buildid}`", "inline": True},
            {"name": "Remap", "value": f"{matched}/{changed} tokens matched", "inline": True},
        ],
        "description": ("Remapped." if matched == changed and not unity_changed
                        else "Check needed, match count mismatch??") + warn,
    }

    files = {
        "file1": (os.path.basename(map_path), open(map_path, "rb")),
        "file2": (os.path.basename(json_path), open(json_path, "rb")),
    }
    payload = {"payload_json": json.dumps({"embeds": [embed]})}
    r = requests.post(WEBHOOK, data=payload, files=files, timeout=60)
    r.raise_for_status()
    log(f"Posted to Discord ({r.status_code})")


def post_simple(msg, color=0x95A5A6):
    requests.post(WEBHOOK, json={"embeds": [{"description": msg, "color": color}]}, timeout=30)


def handle_update(buildid, state):
    download_depot()

    new_dll = find_file(DEPOT_DIR, "UnityPlayer.dll")
    ggm     = find_file(DEPOT_DIR, "globalgamemanagers")
    if not new_dll:
        raise RuntimeError(f"UnityPlayer.dll not found under {DEPOT_DIR}")

    version = extract_unity_version(ggm) if ggm else "UNKNOWN"
    prev_version = state.get("unity_version")
    unity_changed = prev_version is not None and version != prev_version

    js, symbols, changed, matched = remap(new_dll)

    banner = ("// DUMPED BY JUELZ SYMBOL MAPPER\n"
              f"// Unity {version} | Build {buildid}\n\n")
    js = banner + js

    os.makedirs(OUT_DIR, exist_ok=True)
    map_path  = os.path.join(OUT_DIR, f"Frida-Map_{buildid}.js")
    json_path = os.path.join(OUT_DIR, f"SymbolMap_{buildid}.json")
    with open(map_path, "w") as f:
        f.write(js)
    with open(json_path, "w") as f:
        json.dump(symbols, f, indent=2)

    # deploy live map
    with open(LIVE_MAP, "w") as f:
        f.write(js)
    log(f"Wrote live map -> {LIVE_MAP}")

    git_push(buildid, version)

    log(f"Remap done: {matched}/{changed} matched, unity={version}")
    post_discord(version, buildid, map_path, json_path, changed, matched, unity_changed, prev_version)

    state["last_buildid"] = buildid
    state["unity_version"] = version
    save_state(state)


def main():
    if not STEAM_USER:
        log("ERROR: set STEAM_USER in config first.")
        sys.exit(1)

    log(f"Watcher started. Polling buildid every {POLL_SECONDS}s.")
    state = load_state()

    # baseline on first run (no spurious trigger)
    if "last_buildid" not in state:
        try:
            state["last_buildid"] = get_buildid()
            save_state(state)
            log(f"Baseline buildid = {state['last_buildid']}")
        except Exception as e:
            log(f"Baseline fetch failed: {e}")

    if FAKE_UPDATE:
        log("FAKE_UPDATE: forcing one update cycle...")
        try:
            bid = get_buildid()
            handle_update(bid, state)
        except Exception as e:
            log(f"ERROR (fake): {e}\n{traceback.format_exc()}")
            try:
                post_simple(f":x: Watcher error (fake): `{e}`", 0xE74C3C)
            except Exception:
                pass

    while True:
        try:
            bid = get_buildid()
            if bid != state.get("last_buildid"):
                log(f"UPDATE: {state.get('last_buildid')} -> {bid}")
                handle_update(bid, state)
            else:
                log(f"No change (buildid {bid})")
        except Exception as e:
            log(f"ERROR: {e}\n{traceback.format_exc()}")
            try:
                post_simple(f":x: Watcher error: `{e}`", 0xE74C3C)
            except Exception:
                pass
        time.sleep(POLL_SECONDS)


if __name__ == "__main__":
    main()
