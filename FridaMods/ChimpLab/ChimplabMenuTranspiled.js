/// <reference path="frida.d.ts" />

// ╔══════════════════════════════════════════════════════════════════════╗
// ║   Xra Menu :3  --  ChimplabVR                                        ║
// ║   built on the Juelz menu framework                                  ║
// ║   hold Y (left controller) to open, poke buttons with your right     ║
// ╚══════════════════════════════════════════════════════════════════════╝
//
// Neon note: Unity treats colour channels above 1.0 as HDR. Anything over 1
// blows out into a bright emissive glow once bloom hits it, so the neon
// palette below deliberately runs values like 4.0 instead of clamping at 1.

// ──────────────────────────────────────────────────────────── globals
let rigidbody: any = null;

let hue = 0;


let flyspeed = 5.0;
let playerScale = 1.0;

let buttonClickDelay = 0.0;
let menu: any = null;
let menuBgRenderer: any = null;
let menuBg2Renderer: any = null;
let reference: any = null;
let referenceCollider: any = null;

let textGradientSpeed = 2.4;
let menuTextFrameCounter = 0;
let animatedMenuTexts: Array<{ component: any; render: (phase: number) => string; phase: number }> = [];

let leftPrimary = false;
let leftSecondary = false;
let rightPrimary = false;
let rightSecondary = false;
let leftGrab = false;
let rightGrab = false;
let leftTrigger = false;
let rightTrigger = false;

let deltaTime = 0.0;
let time = 0.0;

let previousNoclipKey = false;
let previousJumpKey = false;


let closePosition: any = null;
let leftPlatform: any = null;
let rightPlatform: any = null;

let sceneReady = true;
let sceneRecheckDelay = 0.0;

// ──────────────────────────────────────────────────────────── theme
let bgColor: [number, number, number, number] = [0.02, 0.0, 0.04, 1.0];
let bgColor2: [number, number, number, number] = [0.08, 0.0, 0.14, 1.0];
let textColor: [number, number, number, number] = [1.0, 0.2, 0.85, 1.0];
let buttonColor: [number, number, number, number] = [0.06, 0.0, 0.1, 1.0];
let buttonPressedColor: [number, number, number, number] = [4.0, 0.2, 2.6, 1.0];

let menuName = "Xra Menu :3";
let themeIndex = 0;

// btnOn values run past 1.0 on purpose — that's what makes them glow.
const themes = [
    { name: "Neon Pink",    bg: [0.02, 0.0, 0.04, 1.0],  bg2: [0.08, 0.0, 0.14, 1.0],  text: [1.0, 0.2, 0.85, 1.0],  btn: [0.06, 0.0, 0.1, 1.0],  btnOn: [4.0, 0.2, 2.6, 1.0]  },
    { name: "Cyber Cyan",   bg: [0.0, 0.03, 0.05, 1.0],  bg2: [0.0, 0.1, 0.16, 1.0],   text: [0.3, 1.0, 1.0, 1.0],   btn: [0.0, 0.07, 0.11, 1.0], btnOn: [0.2, 4.0, 4.5, 1.0]  },
    { name: "Acid Green",   bg: [0.01, 0.05, 0.0, 1.0],  bg2: [0.03, 0.14, 0.0, 1.0],  text: [0.6, 1.0, 0.1, 1.0],   btn: [0.02, 0.09, 0.0, 1.0], btnOn: [1.4, 4.5, 0.1, 1.0]  },
    { name: "Ultraviolet",  bg: [0.03, 0.0, 0.07, 1.0],  bg2: [0.1, 0.0, 0.22, 1.0],   text: [0.75, 0.4, 1.0, 1.0],  btn: [0.07, 0.0, 0.16, 1.0], btnOn: [2.4, 0.4, 5.0, 1.0]  },
    { name: "Hazard",       bg: [0.06, 0.03, 0.0, 1.0],  bg2: [0.16, 0.08, 0.0, 1.0],  text: [1.0, 0.65, 0.1, 1.0],  btn: [0.11, 0.05, 0.0, 1.0], btnOn: [5.0, 1.8, 0.0, 1.0]  },
    { name: "Blood Neon",   bg: [0.06, 0.0, 0.0, 1.0],   bg2: [0.18, 0.0, 0.02, 1.0],  text: [1.0, 0.25, 0.25, 1.0], btn: [0.11, 0.0, 0.01, 1.0], btnOn: [5.0, 0.1, 0.1, 1.0]  },
    { name: "Toxic Lime",   bg: [0.03, 0.05, 0.0, 1.0],  bg2: [0.1, 0.16, 0.0, 1.0],   text: [0.85, 1.0, 0.2, 1.0],  btn: [0.06, 0.1, 0.0, 1.0],  btnOn: [3.2, 5.0, 0.2, 1.0]  },
    { name: "Electric Blue",bg: [0.0, 0.01, 0.07, 1.0],  bg2: [0.0, 0.05, 0.2, 1.0],   text: [0.4, 0.7, 1.0, 1.0],   btn: [0.0, 0.03, 0.14, 1.0], btnOn: [0.4, 1.6, 5.0, 1.0]  },
    { name: "Vaporwave",    bg: [0.04, 0.0, 0.06, 1.0],  bg2: [0.14, 0.02, 0.2, 1.0],  text: [0.4, 1.0, 0.95, 1.0],  btn: [0.09, 0.01, 0.14, 1.0],btnOn: [4.0, 0.6, 3.4, 1.0]  },
    { name: "Gold Rush",    bg: [0.05, 0.04, 0.0, 1.0],  bg2: [0.15, 0.12, 0.0, 1.0],  text: [1.0, 0.85, 0.2, 1.0],  btn: [0.1, 0.08, 0.0, 1.0],  btnOn: [5.0, 3.4, 0.2, 1.0]  },
    { name: "Void",         bg: [0.01, 0.01, 0.01, 1.0], bg2: [0.04, 0.04, 0.05, 1.0], text: [0.9, 0.9, 0.95, 1.0],  btn: [0.03, 0.03, 0.04, 1.0],btnOn: [3.0, 3.0, 3.4, 1.0]  },
    { name: "RGB Strobe",   bg: [0.0, 0.0, 0.0, 1.0],    bg2: [0.05, 0.05, 0.05, 1.0], text: [1.0, 1.0, 1.0, 1.0],   btn: [0.04, 0.04, 0.04, 1.0],btnOn: [4.0, 0.4, 3.0, 1.0]  },
];
const RGB_THEME_INDEX = 11;

let currentTooltip = "";
let tooltipResetTime = 0;

// ──────────────────────────────────────────────────────────── banner
{
    const W = 58;
    const pad = "  ";
    const line = (s: string) => pad + "║ " + s + " ".repeat(Math.max(0, W - 2 - s.length)) + "║";
    const center = (s: string) => {
        const inner = W - 2;
        const left = Math.max(0, Math.floor((inner - s.length) / 2));
        return line(" ".repeat(left) + s);
    };
    console.log("");
    console.log(pad + "╔" + "═".repeat(W) + "╗");
    console.log(line(""));
    console.log(center("Xra Menu :3   v1.0   for ChimplabVR"));
    console.log(line(""));
    console.log(pad + "╠" + "═".repeat(W) + "╣");
    console.log(line("Movement / Spawner / Neon / Name / Cosmetics / Room"));
    console.log(line("Toggles run every frame while they're ON."));
    console.log(pad + "╠" + "═".repeat(W) + "╣");
    console.log(center(">> HOLD Y ON LEFT CONTROLLER TO OPEN <<"));
    console.log(pad + "╚" + "═".repeat(W) + "╝");
    console.log("");
}

// ──────────────────────────────────────────────────────────── XR input
class XRInputHandler {
    private InputDevices: any;
    private tryGetFeatureValue: any;
    private buttonStates: Map<string, boolean>;

    constructor() {
        this.InputDevices = Il2Cpp.domain
            .assembly("UnityEngine.XRModule")
            .image.class("UnityEngine.XR.InputDevices");
        this.tryGetFeatureValue = this.InputDevices.method("TryGetFeatureValue_bool", 3);
        this.buttonStates = new Map();
    }

    update() {
        this.updateControllerStates(1);
        this.updateControllerStates(2);
    }

    private updateControllerStates(controllerId: number) {
        const features = ["PrimaryButton", "SecondaryButton", "GripButton", "TriggerButton", "MenuButton"];
        features.forEach(feature => {
            this.buttonStates.set(`${controllerId}_${feature}`, this.getButtonState(controllerId, feature));
        });
    }

    private getButtonState(deviceId: number, featureName: string): boolean {
        try {
            const valuePtr = Il2Cpp.alloc(1);
            const feature = Il2Cpp.string(featureName);
            const success = this.tryGetFeatureValue.invoke(uint64(deviceId), feature, valuePtr);
            if (success) return valuePtr.readU8() !== 0;
        } catch (_) { }
        return false;
    }

    isButtonPressed(controllerId: number, feature: string): boolean {
        return this.buttonStates.get(`${controllerId}_${feature}`) || false;
    }

    get leftControllerPrimaryButton(): boolean { return this.isButtonPressed(1, "PrimaryButton"); }
    get leftControllerSecondaryButton(): boolean { return this.isButtonPressed(1, "SecondaryButton"); }
    get rightControllerPrimaryButton(): boolean { return this.isButtonPressed(2, "PrimaryButton"); }
    get rightControllerSecondaryButton(): boolean { return this.isButtonPressed(2, "SecondaryButton"); }
    get leftGrab(): boolean { return this.isButtonPressed(1, "GripButton"); }
    get rightGrab(): boolean { return this.isButtonPressed(2, "GripButton"); }
    get leftControllerTriggerButton(): boolean { return this.isButtonPressed(1, "TriggerButton"); }
    get rightControllerTriggerButton(): boolean { return this.isButtonPressed(2, "TriggerButton"); }
}

Il2Cpp.perform(() => {
    // ───────────────────────────────────────────────────── assemblies
    const AssemblyCSharp = Il2Cpp.domain.assembly("Assembly-CSharp").image;
    const UnityEngineCore = Il2Cpp.domain.assembly("UnityEngine.CoreModule").image;
    const UnityEnginePhysics = Il2Cpp.domain.assembly("UnityEngine.PhysicsModule").image;
    const UnityEngineUI = Il2Cpp.domain.assembly("UnityEngine.UI").image;
    const UnityEngineUIModule = Il2Cpp.domain.assembly("UnityEngine.UIModule").image;
    const UnityEngineTextRendering = Il2Cpp.domain.assembly("UnityEngine.TextRenderingModule").image;

    let PhotonUnityNetworking: any = null;
    try { PhotonUnityNetworking = Il2Cpp.domain.assembly("PhotonUnityNetworking").image; } catch (_) {}

    // ───────────────────────────────────────────────────── unity classes
    const GameObject = UnityEngineCore.class("UnityEngine.GameObject");
    const Object = UnityEngineCore.class("UnityEngine.Object");
    const Vector3 = UnityEngineCore.class("UnityEngine.Vector3");
    const Quaternion = UnityEngineCore.class("UnityEngine.Quaternion");
    const Time = UnityEngineCore.class("UnityEngine.Time");
    const Resources = UnityEngineCore.class("UnityEngine.Resources");
    const Renderer = UnityEngineCore.class("UnityEngine.Renderer");
    const Shader = UnityEngineCore.class("UnityEngine.Shader");
    const RectTransform = UnityEngineCore.class("UnityEngine.RectTransform");
    const Mesh = UnityEngineCore.class("UnityEngine.Mesh");
    const MeshFilter = UnityEngineCore.class("UnityEngine.MeshFilter");
    const LineRenderer = UnityEngineCore.class("UnityEngine.LineRenderer");
    const BoxCollider = UnityEnginePhysics.class("UnityEngine.BoxCollider");
    const Collider = UnityEnginePhysics.class("UnityEngine.Collider");
    const Rigidbody = UnityEnginePhysics.class("UnityEngine.Rigidbody");
    const Canvas = UnityEngineUIModule.class("UnityEngine.Canvas");
    const CanvasScaler = UnityEngineUI.class("UnityEngine.UI.CanvasScaler");
    const GraphicRaycaster = UnityEngineUI.class("UnityEngine.UI.GraphicRaycaster");
    const Text = UnityEngineUI.class("UnityEngine.UI.Text");
    const Font = UnityEngineTextRendering.class("UnityEngine.Font");

    // ───────────────────────────────────────────────────── game classes
    function gameClass(name: string): any {
        try { return AssemblyCSharp.class(name); } catch (_) { console.log("[Xra] class not found: " + name); return null; }
    }

    const GTPlayerClass = gameClass("GorillaLocomotion.Player");
    const PhotonVRManager = gameClass("Photon.VR.PhotonVRManager");
    const PhotonVRPlayer = gameClass("Photon.VR.Player.PhotonVRPlayer");
    const NameScriptClass = gameClass("NameScript");
    const PlayfabManagerClass = gameClass("PlayfabManager");
    const ModeratorMenuClass = gameClass("ModeratorMenu");
    const ModCheckerClass = gameClass("ModChecker");

    let PhotonNetwork: any = null;
    let PhotonView: any = null;
    if (PhotonUnityNetworking) {
        try { PhotonNetwork = PhotonUnityNetworking.class("Photon.Pun.PhotonNetwork"); } catch (_) {}
        try { PhotonView = PhotonUnityNetworking.class("Photon.Pun.PhotonView"); } catch (_) {}
    }

    // Any MonoBehaviour with OnTriggerEnter works as the button carrier — we always
    // early-return for our own "@"-prefixed objects, so the host script never runs.
    let ButtonBehaviour: any = null;
    for (const n of ["ChangeLeftCosmetic", "ChangeRightCosmetic", "ChangeHeadCosmetic", "ChangeFaceCosmetic", "ChangeBodyCosmetic"]) {
        const c = gameClass(n);
        if (c) { try { if (c.tryMethod("OnTriggerEnter")) { ButtonBehaviour = c; break; } } catch (_) {} }
    }
    if (!ButtonBehaviour) console.log("[Xra] WARNING: no OnTriggerEnter carrier class found — buttons won't press");

    let GTPlayer = GTPlayerClass.method("get_Instance").invoke();

    let UberShader: any = null;
    for (const s of ["Universal Render Pipeline/Lit", "Universal Render Pipeline/Unlit", "Standard", "Sprites/Default"]) {
        try {
            const found = Shader.method("Find").invoke(Il2Cpp.string(s));
            if (found && !found.isNull()) { UberShader = found; break; }
        } catch (_) {}
    }

    const zeroVector = Vector3.field("zeroVector").value;
    const oneVector = Vector3.field("oneVector").value;
    const identityQuaternion = Quaternion.field("identityQuaternion").value;

    let leftHandTransform = GTPlayer.field("leftHandTransform").value;
    let rightHandTransform = GTPlayer.field("rightHandTransform").value;
    let headCollider = GTPlayer.field("headCollider").value;

    const OVRInputHandler = new XRInputHandler();

    const arial = Resources.method("GetBuiltinResource", 1).inflate(Font).invoke(Il2Cpp.string("Arial.ttf"));

    // ───────────────────────────────────────────────────── tiny helpers
    function Destroy(object: any) { try { Object.method("Destroy", 1).invoke(object); } catch (_) {} }
    function getComponent(obj: any, type: any) { return obj.method("GetComponent", 1).inflate(type).invoke(); }
    function addComponent(obj: any, type: any) { return obj.method("AddComponent", 1).inflate(type).invoke(); }
    function getTransform(obj: any) { return obj.method("get_transform").invoke(); }
    function vec(v: any): [number, number, number] {
        return [v.field("x").value as number, v.field("y").value as number, v.field("z").value as number];
    }

    // Unity 6 renamed Rigidbody.velocity -> linearVelocity; support both.
    let velSetter: string | null = null;
    let velGetter: string | null = null;
    function resolveVelocityNames() {
        if (velSetter) return;
        for (const n of ["set_linearVelocity", "set_velocity"]) {
            try { if (Rigidbody.tryMethod(n)) { velSetter = n; break; } } catch (_) {}
        }
        for (const n of ["get_linearVelocity", "get_velocity"]) {
            try { if (Rigidbody.tryMethod(n)) { velGetter = n; break; } } catch (_) {}
        }
    }
    function setVelocity(v: any) {
        resolveVelocityNames();
        if (!rigidbody || !velSetter) return;
        try { rigidbody.method(velSetter).invoke(v); } catch (_) {}
    }
    function getVelocity(): [number, number, number] {
        resolveVelocityNames();
        if (!rigidbody || !velGetter) return [0, 0, 0];
        try { return vec(rigidbody.method(velGetter).invoke()); } catch (_) { return [0, 0, 0]; }
    }

    function findRigidbody() {
        try {
            const go = GTPlayer.method("get_gameObject").invoke();
            const rb = getComponent(go, Rigidbody);
            if (rb && !rb.isNull()) return rb;
        } catch (_) {}
        for (const field of GTPlayerClass.fields) {
            try { if (field.type.name === "UnityEngine.Rigidbody") { const v = GTPlayer.field(field.name).value; if (v && !v.isNull()) return v; } } catch (_) {}
        }
        return null;
    }
    rigidbody = findRigidbody();

    function findOne(cls: any): any {
        if (!cls) return null;
        try {
            const arr = Object.method("FindObjectsOfType").inflate(cls).invoke();
            for (let i = 0; i < arr.length; i++) { const o = arr.get(i); if (o && !o.isNull()) return o; }
        } catch (_) {}
        return null;
    }
    function findAll(cls: any): any[] {
        const out: any[] = [];
        if (!cls) return out;
        try {
            const arr = Object.method("FindObjectsOfType").inflate(cls).invoke();
            for (let i = 0; i < arr.length; i++) { const o = arr.get(i); if (o && !o.isNull()) out.push(o); }
        } catch (_) {}
        return out;
    }

    // ───────────────────────────────────────────────────── colour utils
    function hsl2Rgb(h: number, s: number, l: number): [number, number, number] {
        s /= 100; l /= 100;
        const k = (n: number) => (n + h / 30) % 12;
        const a = s * Math.min(l, 1 - l);
        const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
        return [Math.round(255 * f(0)), Math.round(255 * f(8)), Math.round(255 * f(4))];
    }
    function toHexByte(v: number): string {
        return Math.round(Math.min(1, Math.max(0, v)) * 255).toString(16).padStart(2, "0");
    }

    // Anything with a channel past 1.0 is HDR — light up _EmissionColor so it
    // actually blooms instead of just clipping to white.
    function isHDR(c: number[]): boolean {
        return c[0] > 1.0 || c[1] > 1.0 || c[2] > 1.0;
    }

    function applyEmission(material: any, colorArr: number[]) {
        if (!isHDR(colorArr)) return;
        try { material.method("EnableKeyword", 1).invoke(Il2Cpp.string("_EMISSION")); } catch (_) {}
        for (const prop of ["_EmissionColor", "_BaseColor"]) {
            try { material.method("SetColor", 2).invoke(Il2Cpp.string(prop), colorArr); } catch (_) {}
        }
    }

    function setMaterialColour(renderer: any, colorArr: number[]) {
        try {
            const mat = renderer.method("get_material").invoke();
            if (UberShader) mat.method("set_shader").invoke(UberShader);
            mat.method("set_color").invoke(colorArr);
            applyEmission(mat, colorArr);
        } catch (_) {}
    }

    // Neon HDR palette — intensity is a multiplier so the whole set can be dimmed.
    let neonIntensity = 4.0;
    const NEON_HUES: Array<[string, [number, number, number]]> = [
        ["Pink",   [1.0, 0.05, 0.65]],
        ["Cyan",   [0.05, 1.0, 1.0]],
        ["Green",  [0.15, 1.0, 0.05]],
        ["Purple", [0.55, 0.1, 1.0]],
        ["Orange", [1.0, 0.35, 0.0]],
        ["Red",    [1.0, 0.05, 0.05]],
        ["Blue",   [0.1, 0.35, 1.0]],
        ["Yellow", [1.0, 0.85, 0.05]],
        ["White",  [1.0, 1.0, 1.0]],
    ];

    function neon(base: [number, number, number], mult: number = neonIntensity): [number, number, number, number] {
        return [base[0] * mult, base[1] * mult, base[2] * mult, 1.0];
    }

    function neonFromHue(h: number, mult: number = neonIntensity): [number, number, number, number] {
        const [r, g, b] = hsl2Rgb(h, 100, 55);
        return [(r / 255) * mult, (g / 255) * mult, (b / 255) * mult, 1.0];
    }

    // ───────────────────────────────────────────────────── HUD notifications
    let notifSlots: Array<{ go: any; text: any; expiry: number }> = [];
    let notifSlotsReady = false;

    function initNotifSlots() {
        if (notifSlotsReady) return;
        try {
            const headTf = getTransform(headCollider);
            if (!headTf || headTf.isNull()) return;
            for (let i = 0; i < 4; i++) {
                const slotGO = createObject(zeroVector, identityQuaternion, oneVector, 3, [0, 0, 0, 0], headTf);
                Destroy(getComponent(slotGO, BoxCollider));
                const canvasObj = addComponent(slotGO, Canvas);
                canvasObj.method("set_renderMode").invoke(2);
                try { addComponent(slotGO, CanvasScaler).method("set_dynamicPixelsPerUnit").invoke(1000.0); } catch (_) {}
                getTransform(slotGO).method("set_localPosition").invoke([0.0, 0.42 - i * 0.07, 0.85]);
                getTransform(slotGO).method("set_localScale").invoke([0.14, 0.14, 0.14]);

                const txtGO = createObject(zeroVector, identityQuaternion, oneVector, 3, [0, 0, 0, 0], getTransform(slotGO));
                Destroy(getComponent(txtGO, BoxCollider));
                const txtComp = addComponent(txtGO, Text);
                txtComp.method("set_font").invoke(arial);
                txtComp.method("set_fontSize").invoke(1);
                txtComp.method("set_color").invoke([1, 1, 1, 1]);
                txtComp.method("set_fontStyle").invoke(1);
                txtComp.method("set_alignment").invoke(4);
                txtComp.method("set_resizeTextForBestFit").invoke(true);
                txtComp.method("set_resizeTextMinSize").invoke(0);
                txtComp.method("set_text").invoke(Il2Cpp.string(""));
                getComponent(txtComp, RectTransform).method("set_sizeDelta").invoke([1.6, 0.22]);
                slotGO.method("SetActive").invoke(false);
                notifSlots.push({ go: slotGO, text: txtComp, expiry: 0 });
            }
            notifSlotsReady = true;
        } catch (_) {}
    }

    function notify(text: string, duration: number = 2.5) {
        initNotifSlots();
        if (!notifSlotsReady) return;
        try {
            let slot = notifSlots.find(s => Date.now() > s.expiry);
            if (!slot) slot = notifSlots.reduce((a, b) => (a.expiry < b.expiry ? a : b));
            const [r, g, b] = [buttonPressedColor[0], buttonPressedColor[1], buttonPressedColor[2]];
            slot.text.method("set_text").invoke(Il2Cpp.string(
                `<color=#${toHexByte(r)}${toHexByte(g)}${toHexByte(b)}>:3</color> <color=white>${text}</color>`
            ));
            slot.go.method("SetActive").invoke(true);
            slot.expiry = Date.now() + duration * 1000;
        } catch (_) {}
    }

    function setTooltip(text: string, duration: number = 4) {
        currentTooltip = text;
        tooltipResetTime = Date.now() + duration * 1000;
    }

    // ───────────────────────────────────────────────────── text rendering
    function gradientText(text: string, colorA: number[], colorB: number[]): string {
        if (text.includes("<color=") || text.length <= 1) return text;
        let result = "";
        for (let i = 0; i < text.length; i++) {
            const ch = text[i];
            if (ch === " ") { result += ch; continue; }
            const t = i / (text.length - 1);
            const r = colorA[0] + (colorB[0] - colorA[0]) * t;
            const g = colorA[1] + (colorB[1] - colorA[1]) * t;
            const b = colorA[2] + (colorB[2] - colorA[2]) * t;
            result += `<color=#${toHexByte(r)}${toHexByte(g)}${toHexByte(b)}>${ch}</color>`;
        }
        return result;
    }

    function canGradient(text: string): boolean {
        return !text.includes("<color=") && text.length > 1;
    }

    function animatedGradientText(text: string, colorA: number[], colorB: number[], phase: number): string {
        if (!canGradient(text)) return text;
        let result = "";
        let visibleIndex = 0;
        for (let i = 0; i < text.length; i++) {
            const ch = text[i];
            if (ch === " ") { result += ch; continue; }
            const wave = 0.5 + 0.5 * Math.sin(phase + visibleIndex * 0.48);
            const r = colorA[0] + (colorB[0] - colorA[0]) * wave;
            const g = colorA[1] + (colorB[1] - colorA[1]) * wave;
            const b = colorA[2] + (colorB[2] - colorA[2]) * wave;
            result += `<color=#${toHexByte(r)}${toHexByte(g)}${toHexByte(b)}>${ch}</color>`;
            visibleIndex++;
        }
        return result;
    }

    function updateAnimatedMenuText() {
        if (menu == null || animatedMenuTexts.length === 0) return;
        menuTextFrameCounter++;
        if (menuTextFrameCounter % 2 !== 0) return;
        for (const item of animatedMenuTexts) {
            try {
                if (!item.component || item.component.isNull?.()) continue;
                item.component.method("set_text").invoke(Il2Cpp.string(item.render(time * textGradientSpeed + item.phase)));
            } catch (_) {}
        }
    }

    function renderMenuText(
        canvasObject: any,
        text: string = "",
        color: [number, number, number, number] = [1, 1, 1, 1],
        pos: any = zeroVector,
        size: any = oneVector,
        animate: { render: (phase: number) => string } | null = null
    ) {
        const title = addComponent(createObject(zeroVector, identityQuaternion, oneVector, 3, [0, 0, 0, 0], getTransform(canvasObject)), Text);
        try { getComponent(title, BoxCollider).method("set_isTrigger").invoke(true); } catch (_) {}
        const phase = animatedMenuTexts.length * 0.73;
        title.method("set_text").invoke(Il2Cpp.string(animate ? animate.render(time * textGradientSpeed + phase) : text));
        title.method("set_font").invoke(arial);
        title.method("set_fontSize").invoke(1);
        title.method("set_color").invoke(color);
        title.method("set_fontStyle").invoke(3);
        title.method("set_alignment").invoke(4);
        title.method("set_resizeTextForBestFit").invoke(true);
        title.method("set_resizeTextMinSize").invoke(0);

        const rectTransform = getComponent(title, RectTransform);
        rectTransform.method("set_sizeDelta").invoke(size);
        rectTransform.method("set_position").invoke(pos);
        rectTransform.method("set_rotation").invoke(Quaternion.method("Euler").invoke(180.0, 90.0, 90.0));

        if (animate) animatedMenuTexts.push({ component: title, render: animate.render, phase });
    }

    // ───────────────────────────────────────────────────── rounded panels
    const roundedMeshCache = new Map<string, any>();
    function getRoundedBoxMesh(width: number, height: number, cornerRadius: number): any {
        const normalizedY = Math.max(0.001, Math.min(0.46, cornerRadius / Math.max(width, 0.001)));
        const normalizedZ = Math.max(0.001, Math.min(0.46, cornerRadius / Math.max(height, 0.001)));
        const cacheKey = normalizedY.toFixed(4) + ":" + normalizedZ.toFixed(4);
        const cached = roundedMeshCache.get(cacheKey);
        if (cached && !cached.isNull?.()) return cached;

        const perimeter: Array<[number, number]> = [];
        const cornerSegments = 10;
        const corners: Array<[number, number, number, number]> = [
            [0.5 - normalizedY, 0.5 - normalizedZ, 0, Math.PI * 0.5],
            [-0.5 + normalizedY, 0.5 - normalizedZ, Math.PI * 0.5, Math.PI],
            [-0.5 + normalizedY, -0.5 + normalizedZ, Math.PI, Math.PI * 1.5],
            [0.5 - normalizedY, -0.5 + normalizedZ, Math.PI * 1.5, Math.PI * 2],
        ];
        for (const [centerY, centerZ, startAngle, endAngle] of corners) {
            for (let segment = 0; segment <= cornerSegments; segment++) {
                const t = segment / cornerSegments;
                const angle = startAngle + (endAngle - startAngle) * t;
                perimeter.push([centerY + Math.cos(angle) * normalizedY, centerZ + Math.sin(angle) * normalizedZ]);
            }
        }

        const vertices: Array<[number, number, number]> = [];
        for (const [y, z] of perimeter) vertices.push([0.5, y, z]);
        for (const [y, z] of perimeter) vertices.push([-0.5, y, z]);
        const ringCount = perimeter.length;
        const frontCenter = vertices.length;
        vertices.push([0.5, 0, 0]);
        const backCenter = vertices.length;
        vertices.push([-0.5, 0, 0]);

        const triangles: number[] = [];
        for (let index = 0; index < ringCount; index++) {
            const next = (index + 1) % ringCount;
            triangles.push(frontCenter, index, next);
            triangles.push(backCenter, next + ringCount, index + ringCount);
            triangles.push(index, index + ringCount, next + ringCount);
            triangles.push(index, next + ringCount, next);
        }

        const vertexArray = Il2Cpp.array(Vector3, vertices.length);
        for (let index = 0; index < vertices.length; index++) {
            vertexArray.set(index, Il2Cpp.fromFridaValue(vertices[index], Vector3.type));
        }
        const triangleArray = Il2Cpp.array(Il2Cpp.corlib.class("System.Int32"), triangles);

        const mesh = Mesh.alloc();
        mesh.method(".ctor", 0).invoke();
        mesh.method("set_vertices").invoke(vertexArray);
        mesh.method("set_triangles").invoke(triangleArray);
        mesh.method("RecalculateBounds", 0).invoke();
        mesh.method("RecalculateNormals", 0).invoke();
        roundedMeshCache.set(cacheKey, mesh);
        return mesh;
    }

    function menuCornerRadius(scale: number[]): number {
        return Math.min(Math.min(scale[1], scale[2]) * 0.28, 0.06);
    }

    function createObject(
        pos: any = zeroVector,
        rot: any = identityQuaternion,
        scale: any = oneVector,
        primitiveType: number = 3,
        colorArr: [number, number, number, number] = [1, 1, 1, 1],
        parent: any = null,
        cornerRadius: number = 0
    ) {
        const obj = GameObject.method("CreatePrimitive").invoke(primitiveType);
        const renderer = getComponent(obj, Renderer);

        if (colorArr[3] == 0) {
            try { renderer.method("set_enabled").invoke(false); } catch (_) {}
        } else {
            try {
                const material = renderer.method("get_material").invoke();
                if (UberShader) material.method("set_shader").invoke(UberShader);
                material.method("set_color").invoke(colorArr);
                applyEmission(material, colorArr);
            } catch (_) {}
        }

        if (cornerRadius > 0 && primitiveType === 3) {
            try { getComponent(obj, MeshFilter).method("set_sharedMesh").invoke(getRoundedBoxMesh(scale[1], scale[2], cornerRadius)); } catch (_) {}
        }

        const transform = getTransform(obj);
        if (parent != null) transform.method("SetParent", 2).invoke(parent, false);
        transform.method("set_position").invoke(pos);
        transform.method("set_rotation").invoke(rot);
        transform.method("set_localScale").invoke(scale);
        return obj;
    }

    // ───────────────────────────────────────────────────── photon helpers
    function pvrManager(): any {
        try { const m = PhotonVRManager.method("get_Manager").invoke(); return (m && !m.isNull()) ? m : null; } catch (_) { return null; }
    }

    function sendAllOutgoing() {
        try { if (PhotonNetwork) PhotonNetwork.method("SendAllOutgoingCommands").invoke(); } catch (_) {}
    }

    function setUsername(name: string, mirrorToNameScript: boolean = true) {
        try { PhotonVRManager.method("SetUsername", 1).invoke(Il2Cpp.string(name)); } catch (e) { console.log("[Xra] SetUsername: " + e); }
        if (!mirrorToNameScript) return;
        // Also drive the in-world name board so it matches
        try {
            const ns = findOne(NameScriptClass);
            if (ns) { ns.field("NameVar").value = Il2Cpp.string(name); }
        } catch (_) {}
    }

    function currentUsername(): string {
        try {
            const ns = findOne(NameScriptClass);
            if (ns) { const v = ns.field("NameVar").value; if (v) return v.toString().replace(/^"|"$/g, ""); }
        } catch (_) {}
        try {
            if (PhotonNetwork) {
                const lp = PhotonNetwork.method("get_LocalPlayer").invoke();
                return lp.method("get_NickName").invoke().toString().replace(/^"|"$/g, "");
            }
        } catch (_) {}
        return "";
    }

    function setColour(r: number, g: number, b: number) {
        try { PhotonVRManager.method("SetColour", 1).invoke([r, g, b, 1.0]); } catch (e) { console.log("[Xra] SetColour: " + e); }
    }

    // CosmeticType: Head=0 Face=1 Body=2 BothHands=3 LeftHand=4 RightHand=5
    const COSMETIC_SLOTS = ["Head", "Face", "Body", "BothHands", "LeftHand", "RightHand"];
    let cosmeticSlot = 0;

    function setCosmetic(slot: number, id: string) {
        try { PhotonVRManager.method("SetCosmetic", 2).invoke(slot, Il2Cpp.string(id)); }
        catch (e) { console.log("[Xra] SetCosmetic: " + e); }
    }

    // Every cosmetic in the game lives as a child GameObject under one of the player
    // prefab's five anchor transforms — PhotonVRPlayer._RefreshPlayerValues just
    // SetActive()s the one whose name matches. So the child list IS the full catalog,
    // owner-only items included, with no PlayFab inventory involved. Reading it from
    // the prefab (rather than a hardcoded list) keeps this working across updates.
    const COSMETIC_ANCHORS = [
        "HeadCosmetics",      // 0 Head
        "FaceCosmetics",      // 1 Face
        "BodyCosmetics",      // 2 Body
        "LeftHandCosmetics",  // 3 BothHands — hands share one catalog
        "LeftHandCosmetics",  // 4 LeftHand
        "RightHandCosmetics", // 5 RightHand
    ];

    let cosmeticsBySlot: string[][] = [];
    let cosmeticScanSource = "";

    function scanAnchorsInto(pvrPlayer: any, sets: Array<Set<string>>) {
        for (let slot = 0; slot < COSMETIC_ANCHORS.length; slot++) {
            try {
                const tf = pvrPlayer.field(COSMETIC_ANCHORS[slot]).value;
                if (!tf || tf.isNull()) continue;
                const count = tf.method("get_childCount").invoke() as number;
                for (let i = 0; i < count; i++) {
                    // GetChild works on inactive children and on prefab assets alike
                    const child = tf.method("GetChild", 1).invoke(i);
                    const name = child.method("get_name").invoke().toString().replace(/^"|"$/g, "");
                    if (name.length > 0) sets[slot].add(name);
                }
            } catch (_) {}
        }
    }

    function loadPlayerPrefab(): any {
        const paths: string[] = [];
        try {
            const spawner = findOne(gameClass("Photon.VR.Player.PlayerSpawner"));
            if (spawner) {
                const p = spawner.field("PrefabLocation").value;
                if (p) paths.push(p.toString().replace(/^"|"$/g, ""));
            }
        } catch (_) {}
        for (const p of ["PhotonVR/Player", "PhotonVR/Prefabs/Player"]) if (paths.indexOf(p) < 0) paths.push(p);

        for (const path of paths) {
            for (const argc of [2, 1]) {
                try {
                    const loaded = argc === 2
                        ? Resources.method("Load", 2).invoke(Il2Cpp.string(path), GameObject.type)
                        : Resources.method("Load", 1).invoke(Il2Cpp.string(path));
                    if (loaded && !loaded.isNull()) {
                        const comp = getComponent(loaded, PhotonVRPlayer);
                        if (comp && !comp.isNull()) return comp;
                    }
                } catch (_) {}
            }
        }
        return null;
    }

    function collectCosmetics(): string[][] {
        if (cosmeticsBySlot.length > 0) return cosmeticsBySlot;

        const sets: Array<Set<string>> = COSMETIC_ANCHORS.map(() => new Set<string>());
        const sources: string[] = [];

        // 1. The prefab — authoritative, works before you've even joined a room
        try {
            const prefab = loadPlayerPrefab();
            if (prefab) { scanAnchorsInto(prefab, sets); sources.push("prefab"); }
        } catch (e) { console.log("[Xra] prefab scan: " + e); }

        // 2. Live players — catches anything added to a rig at runtime
        try {
            let any = false;
            for (const p of findAll(PhotonVRPlayer)) { scanAnchorsInto(p, sets); any = true; }
            if (any) sources.push("live rigs");
        } catch (_) {}

        // 3. PlayfabManager's inspector-assigned array — last resort, slot unknown
        if (sets.every(s => s.size === 0)) {
            try {
                const pfm = findOne(PlayfabManagerClass);
                if (pfm) {
                    for (const fieldName of ["Cosmetics", "CosmeticsDisable"]) {
                        try {
                            const arr = pfm.field(fieldName).value;
                            if (!arr || arr.isNull()) continue;
                            for (let i = 0; i < arr.length; i++) {
                                const go = arr.get(i);
                                if (!go || go.isNull()) continue;
                                const name = go.method("get_name").invoke().toString().replace(/^"|"$/g, "");
                                if (name.length > 0) for (const s of sets) s.add(name);
                            }
                        } catch (_) {}
                    }
                    sources.push("playfab list");
                }
            } catch (_) {}
        }

        cosmeticsBySlot = sets.map(s => Array.from(s).sort());
        cosmeticScanSource = sources.join(" + ") || "nothing";
        const total = new Set(cosmeticsBySlot.flat()).size;
        console.log(`[Xra] cosmetics: ${total} unique from ${cosmeticScanSource} ` +
            `(${cosmeticsBySlot.map((a, i) => `${COSMETIC_SLOTS[i]}:${a.length}`).join(" ")})`);
        return cosmeticsBySlot;
    }

    function cosmeticsForSlot(slot: number): string[] {
        const all = collectCosmetics();
        return all[slot] || [];
    }

    function totalCosmetics(): number {
        return new Set(collectCosmetics().flat()).size;
    }

    function localPhotonPlayer(): any {
        try { const m = pvrManager(); if (!m) return null; const lp = m.field("LocalPlayer").value; return (lp && !lp.isNull()) ? lp : null; } catch (_) { return null; }
    }

    function playerName(p: any): string {
        try {
            const pv = p.method("get_photonView").invoke();
            const owner = pv.method("get_Owner").invoke();
            return owner.method("get_NickName").invoke().toString().replace(/^"|"$/g, "");
        } catch (_) { return "?"; }
    }

    function isLocal(p: any): boolean {
        try { return p.method("get_photonView").invoke().method("get_IsMine").invoke() as boolean; } catch (_) { return false; }
    }

    function playerHeadPos(p: any): any {
        try { return getTransform(p.field("Head").value).method("get_position").invoke(); } catch (_) { return null; }
    }

    function teleportTo(pos: any) {
        try { setVelocity(zeroVector); } catch (_) {}
        try { if (rigidbody) rigidbody.method("set_position").invoke(pos); } catch (_) {}
        try { getTransform(GTPlayer.method("get_gameObject").invoke()).method("set_position").invoke(pos); } catch (_) {}
    }

    // ───────────────────────────────────────────────────── menu chrome
    function recenterMenu() {
        try {
            let menuPosition = leftHandTransform.method("get_position").invoke();
            let menuRotation = leftHandTransform.method("get_rotation").invoke();
            menuRotation = Quaternion.method("op_Multiply", 2).invoke(menuRotation, Quaternion.method("Euler").invoke(-45, 0, 0));
            const menuTransform = getTransform(menu);
            menuTransform.method("set_position").invoke(menuPosition);
            menuTransform.method("set_rotation").invoke(menuRotation);
        } catch (_) {}
    }

    function reloadMenu() {
        if (menu != null) { Destroy(menu); menu = null; }
        animatedMenuTexts.length = 0;
    }

    function updateButtonColor(button: any, buttonData: any) {
        try {
            const renderer = getComponent(button, Renderer);
            if (!renderer || renderer.isNull()) return;
            // Enabled buttons use the HDR btnOn colour, so route through the emission
            // helper — that's what makes an active toggle actually glow.
            setMaterialColour(renderer, buttonData.enabled ? buttonPressedColor : buttonColor);
        } catch (_) {}
    }

    function applyTheme(idx: number) {
        themeIndex = ((idx % themes.length) + themes.length) % themes.length;
        const t = themes[themeIndex];
        bgColor = [...t.bg] as [number, number, number, number];
        bgColor2 = [...t.bg2] as [number, number, number, number];
        textColor = [...t.text] as [number, number, number, number];
        buttonColor = [...t.btn] as [number, number, number, number];
        buttonPressedColor = [...t.btnOn] as [number, number, number, number];
        setTooltip(`Theme: ${t.name}`, 3);
        reloadMenu();
    }

    // ───────────────────────────────────────────────────── button model
    interface ButtonInfoConfig {
        buttonText: string;
        method?: () => void;
        enableMethod?: () => void;
        disableMethod?: () => void;
        keepOn?: boolean;
        enabled?: boolean;
        tooltip?: string;
    }

    class ButtonInfo {
        buttonText: string;
        method?: () => void;
        enableMethod?: () => void;
        disableMethod?: () => void;
        keepOn: boolean;
        enabled: boolean;
        tooltip: string;

        constructor(config: ButtonInfoConfig) {
            this.buttonText = config.buttonText;
            this.method = config.method;
            this.enableMethod = config.enableMethod;
            this.disableMethod = config.disableMethod;
            this.keepOn = config.keepOn ?? true;
            this.enabled = config.enabled ?? false;
            this.tooltip = config.tooltip ?? "";
        }
    }

    // ───────────────────────────────────────────────────── mods: movement
    function Platforms() {
        if (leftGrab) {
            if (leftPlatform == null) {
                const pos = Vector3.method("op_Addition", 2).invoke(leftHandTransform.method("get_position").invoke(), [0.0, -0.035, 0.0]);
                leftPlatform = createObject(pos, leftHandTransform.method("get_rotation").invoke(), [0.035, 0.15, 0.35], 3, buttonPressedColor);
            }
        } else if (leftPlatform != null) { Destroy(leftPlatform); leftPlatform = null; }

        if (rightGrab) {
            if (rightPlatform == null) {
                const pos = Vector3.method("op_Addition", 2).invoke(rightHandTransform.method("get_position").invoke(), [0.0, -0.035, 0.0]);
                rightPlatform = createObject(pos, rightHandTransform.method("get_rotation").invoke(), [0.025, 0.15, 0.2], 3, buttonPressedColor);
            }
        } else if (rightPlatform != null) { Destroy(rightPlatform); rightPlatform = null; }
    }

    // NoClip the same way the game's own power does it: drop the locomotion layer
    // mask and switch off the two body colliders. Much gentler than nuking every
    // collider in the scene.
    // LayerMask is a struct wrapping a single int. Store the raw int rather than the
    // struct — `field.value` hands back a view into the object, so a saved copy would
    // read back as 0 once we zero it.
    let savedLocomotionMask: number | null = null;
    function setNoClip(on: boolean) {
        try {
            const maskField = GTPlayer.field("locomotionEnabledLayers").value;
            if (on) {
                if (savedLocomotionMask == null) savedLocomotionMask = maskField.field("m_Mask").value as number;
                maskField.field("m_Mask").value = 0;
            } else if (savedLocomotionMask != null) {
                maskField.field("m_Mask").value = savedLocomotionMask;
            }
        } catch (e) { console.log("[Xra] noclip mask: " + e); }
        try {
            GTPlayer.field("headCollider").value.method("set_enabled").invoke(!on);
            GTPlayer.field("bodyCollider").value.method("set_enabled").invoke(!on);
        } catch (e) { console.log("[Xra] noclip colliders: " + e); }
    }

    let longArmsEnabled = false;
    let armLengthMultiplier = 1.4;

    function applyArmOffset(handTransform: any, anchor: any, mult: number) {
        try {
            const [hx, hy, hz] = vec(handTransform.method("get_position").invoke());
            const [ax, ay, az] = vec(anchor);
            handTransform.method("set_position").invoke([ax + (hx - ax) * mult, ay + (hy - ay) * mult, az + (hz - az) * mult]);
        } catch (_) {}
    }

    function updateLongArms() {
        if (!longArmsEnabled) return;
        try {
            const anchor = getTransform(GTPlayer.method("get_gameObject").invoke()).method("get_position").invoke();
            applyArmOffset(leftHandTransform, anchor, armLengthMultiplier);
            applyArmOffset(rightHandTransform, anchor, armLengthMultiplier);
        } catch (_) {}
    }

    function applyPlayerScale(scale: number) {
        playerScale = Math.max(0.25, Math.min(4.0, scale));
        try {
            getTransform(GTPlayer.method("get_gameObject").invoke()).method("set_localScale").invoke([playerScale, playerScale, playerScale]);
        } catch (_) {}
        try { GTPlayer.field("maxArmLength").value = 1.5 * playerScale; } catch (_) {}
    }

    // ───────────────────────────────────────────────────── temp objects
    const tempObjects: Array<{ go: any; die: number }> = [];
    let lastTempSpawn = 0;

    function spawnTemp(pos: any, size: number, colour: [number, number, number, number], life: number, prim: number = 0) {
        try {
            const go = createObject(pos, identityQuaternion, [size, size, size], prim, colour);
            try { getComponent(go, Collider).method("set_enabled").invoke(false); } catch (_) {}
            tempObjects.push({ go, die: Date.now() + life });
            return go;
        } catch (_) { return null; }
    }

    function reapTempObjects() {
        const now = Date.now();
        for (let i = tempObjects.length - 1; i >= 0; i--) {
            if (now > tempObjects[i].die) { Destroy(tempObjects[i].go); tempObjects.splice(i, 1); }
        }
    }

    function clearTempObjects() {
        for (const t of tempObjects) Destroy(t.go);
        tempObjects.length = 0;
    }

    // ───────────────────────────────────────────────────── spawner
    // PhotonVR/Player is the only prefab in Resources carrying a PhotonView, so it's
    // the only one Photon will replicate. Everything else spawns client-side.
    const NET_PREFAB = "PhotonVR/Player";
    const LOCAL_PREFABS = [
        "ZomBear", "ZomBunny", "Hellephant", "Boy", "Character",
        "Spaceship", "BigAsteroid", "SmallAsteroid", "Speaker", "DustParticles",
        "My Robot Kyle -done-", "GorillaPrefabs/Gorilla Rig", "Player Controller",
    ];

    // ── Dynamic prefab discovery ──
    let discoveredPrefabs: string[] = [];
    let prefabScanDone = false;

    function scanAllPrefabs() {
        if (prefabScanDone) return;
        prefabScanDone = true;
        const seen = new Set<string>(LOCAL_PREFABS);

        // Method 1: Resources.LoadAll with Type filter for GameObjects only
        try {
            const allRes = Resources.method("LoadAll", 2).invoke(Il2Cpp.string(""), GameObject.type);
            if (allRes && !allRes.isNull()) {
                console.log(`[Xra] LoadAll returned ${allRes.length} GameObjects`);
                for (let i = 0; i < allRes.length; i++) {
                    try {
                        const go = allRes.get(i);
                        if (!go || go.isNull()) continue;
                        // Must have PhotonView to be network-spawnable
                        try {
                            const pv = go.method("GetComponent", 1).inflate(PhotonView).invoke();
                            if (!pv || pv.isNull()) continue;
                        } catch (_) { continue; }
                        const name = go.method("get_name").invoke().toString();
                        if (!name || seen.has(name)) continue;
                        seen.add(name);
                        discoveredPrefabs.push(name);
                    } catch (_) {}
                }
            }
        } catch (e) { console.log("[Xra] LoadAll(GameObject) error: " + e); }

        // Method 2: fallback — scan PhotonViews in scene, get their root GO names
        if (discoveredPrefabs.length === 0 && PhotonView) {
            try {
                const pvs = Object.method("FindObjectsOfType").inflate(PhotonView).invoke();
                if (pvs && !pvs.isNull()) {
                    console.log(`[Xra] found ${pvs.length} PhotonViews in scene`);
                    for (let i = 0; i < pvs.length; i++) {
                        try {
                            const pv = pvs.get(i);
                            if (!pv || pv.isNull()) continue;
                            const go = pv.method("get_gameObject").invoke();
                            if (!go || go.isNull()) continue;
                            // Get the root prefab name (strip "(Clone)" etc)
                            let name = go.method("get_name").invoke().toString();
                            if (!name) continue;
                            name = name.replace(/\s*\(Clone\).*$/, "").replace(/\s*\(\d+\)$/, "").trim();
                            if (!name || seen.has(name)) continue;
                            seen.add(name);
                            discoveredPrefabs.push(name);
                        } catch (_) {}
                    }
                }
            } catch (e) { console.log("[Xra] PhotonView scan error: " + e); }
        }

        discoveredPrefabs.sort();
        console.log(`[Xra] discovered ${discoveredPrefabs.length} prefabs (+ ${LOCAL_PREFABS.length} hardcoded)`);
    }

    function getAllPrefabNames(): string[] {
        return [...LOCAL_PREFABS, ...discoveredPrefabs];
    }

    function rebuildPrefabList() {
        buttons[15] = [];
        buttons[15].push(new ButtonInfo({ buttonText: "Back", method: () => goTo(4), keepOn: false }));
        const all = getAllPrefabNames();
        all.forEach((name, idx) => {
            buttons[15].push(new ButtonInfo({
                buttonText: name,
                keepOn: false,
                method: () => { selectedPrefabIndex = idx; setTooltip(`prefab [${idx + 1}/${all.length}]: ${name}`, 8); notify(`selected ${name}`, 3); },
            }));
        });
    }

    let selectedPrefabIndex = 0;
    let spawnDistance = 3.0;
    const netSpawned: any[] = [];
    const localSpawned: any[] = [];

    function selectedPrefab(): string {
        const all = getAllPrefabNames();
        return all[selectedPrefabIndex % all.length] || LOCAL_PREFABS[0];
    }

    function aimPosition(distance: number): any {
        try {
            const origin = rightHandTransform.method("get_position").invoke();
            const fwd = rightHandTransform.method("get_forward").invoke();
            return Vector3.method("op_Addition", 2).invoke(origin, Vector3.method("op_Multiply", 2).invoke(fwd, distance));
        } catch (_) { return zeroVector; }
    }

    const prefabCache = new Map<string, any>();
    function loadPrefab(name: string): any {
        if (prefabCache.has(name)) return prefabCache.get(name);
        let obj: any = null;
        try {
            obj = Resources.method("Load", 2).invoke(Il2Cpp.string(name), GameObject.type);
            if (!obj || obj.isNull()) obj = Resources.method("Load", 1).invoke(Il2Cpp.string(name));
        } catch (_) {}
        if (obj && obj.isNull?.()) obj = null;
        prefabCache.set(name, obj);
        return obj;
    }

    function localSpawn(name: string, pos: any): any {
        const prefab = loadPrefab(name);
        if (!prefab) { notify(`${name} not in Resources`, 3); return null; }
        try {
            const go = Object.method("Instantiate", 3).invoke(prefab, pos, identityQuaternion);
            if (go && !go.isNull()) { localSpawned.push(go); return go; }
        } catch (e) { console.log("[Xra] localSpawn: " + e); }
        return null;
    }

    function netSpawn(pos: any): any {
        if (!PhotonNetwork) { notify("photon not loaded", 3); return null; }
        try {
            const go = PhotonNetwork.method("Instantiate", 5).invoke(Il2Cpp.string(NET_PREFAB), pos, identityQuaternion, 0, NULL);
            if (go && !go.isNull()) { netSpawned.push(go); return go; }
        } catch (e) { console.log("[Xra] netSpawn: " + e); }
        return null;
    }

    function clearLocalSpawns() {
        for (const go of localSpawned) Destroy(go);
        localSpawned.length = 0;
    }

    function clearNetSpawns() {
        if (!PhotonNetwork) return;
        for (const go of netSpawned) {
            try { PhotonNetwork.method("Destroy", 1).invoke(go); } catch (_) {}
        }
        netSpawned.length = 0;
    }

    // ───────────────────────────────────────────────────── neon effects
    let lastStrobe = 0;
    let lastBlinder = 0;

    function strobeColour(): [number, number, number, number] {
        hue = (hue + 47) % 360;
        return neonFromHue(hue);
    }

    // ───────────────────────────────────────────────────── mods: ESP
    const espLines: Map<string, any> = new Map();

    function clearEsp() {
        for (const [, line] of espLines) {
            try { Destroy(line.method("get_gameObject").invoke()); } catch (_) {}
        }
        espLines.clear();
    }

    function updateEsp() {
        try {
            const from = getTransform(headCollider).method("get_position").invoke();
            const seen = new Set<string>();
            for (const p of findAll(PhotonVRPlayer)) {
                if (isLocal(p)) continue;
                const key = p.handle.toString();
                seen.add(key);
                const to = playerHeadPos(p);
                if (!to) continue;

                let line = espLines.get(key);
                if (!line || line.isNull?.()) {
                    const go = GameObject.alloc();
                    go.method(".ctor", 0).invoke();
                    line = addComponent(go, LineRenderer);
                    try {
                        line.method("set_startWidth").invoke(0.012);
                        line.method("set_endWidth").invoke(0.012);
                        line.method("set_positionCount").invoke(2);
                        line.method("set_useWorldSpace").invoke(true);
                        const mat = line.method("get_material").invoke();
                        if (UberShader) mat.method("set_shader").invoke(UberShader);
                    } catch (_) {}
                    espLines.set(key, line);
                }
                try {
                    line.method("SetPosition").invoke(0, from);
                    line.method("SetPosition").invoke(1, to);
                    line.method("get_material").invoke().method("set_color").invoke(buttonPressedColor);
                } catch (_) {}
            }
            for (const [key, line] of Array.from(espLines.entries())) {
                if (!seen.has(key)) {
                    try { Destroy(line.method("get_gameObject").invoke()); } catch (_) {}
                    espLines.delete(key);
                }
            }
        } catch (_) {}
    }

    // ───────────────────────────────────────────────────── name builder
    const NAME_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 _-.:3";
    let nameLetterIndex = 0;
    let nameBuffer = "";

    // The nametag is a TextMeshPro, so rich text tags render on everyone's client.
    const NAME_COLOURS = ["none", "red", "lime", "cyan", "magenta", "yellow", "orange", "blue", "white", "black", "rainbow"];
    let nameColourIndex = 0;

    const PRESET_NAMES = [
        "Xra", "xra :3", "NULL", "ERROR", "404", "unknown",
        "Anonymous", "Player", "SYSTEM", "admin", "mod", "Ghost",
    ];

    function rainbowTagged(text: string): string {
        let out = "";
        let i = 0;
        for (const ch of text) {
            if (ch === " ") { out += ch; continue; }
            const [r, g, b] = hsl2Rgb((i * 32) % 360, 100, 55);
            out += `<color=#${toHexByte(r / 255)}${toHexByte(g / 255)}${toHexByte(b / 255)}>${ch}</color>`;
            i++;
        }
        return out;
    }

    function decorateName(raw: string): string {
        const colour = NAME_COLOURS[nameColourIndex];
        if (colour === "none") return raw;
        if (colour === "rainbow") return rainbowTagged(raw);
        return `<color=${colour}>${raw}</color>`;
    }

    function applyName(raw: string) {
        const trimmed = raw.trim();
        if (trimmed.length === 0) { notify("name is empty", 2.5); return; }
        // NameScript.Update() hard-truncates NameVar to 15 chars, which would shred a
        // colour tag — so only mirror plain names into it, tagged ones go to Photon only.
        setUsername(decorateName(trimmed.substring(0, 15)), NAME_COLOURS[nameColourIndex] === "none");
        notify(`name: ${trimmed.substring(0, 15)}`, 3);
    }

    // ───────────────────────────────────────────────────── room helpers
    let pendingRejoinAt = 0;
    let roomCodeBuffer = "";

    function leaveRoom() {
        try { if (PhotonNetwork) PhotonNetwork.method("LeaveRoom", 1).invoke(true); } catch (e) { console.log("[Xra] leaveRoom: " + e); }
    }

    function joinRandom() {
        try {
            const m = pvrManager();
            if (!m) return;
            const queue = m.field("DefaultQueue").value;
            const limit = m.field("DefaultRoomLimit").value as number;
            PhotonVRManager.method("JoinRandomRoom", 2).invoke(queue, limit);
        } catch (e) { console.log("[Xra] joinRandom: " + e); }
    }

    function hopServer() {
        leaveRoom();
        pendingRejoinAt = Date.now() + 1200;
        notify("hopping to a new room...", 3);
    }

    function joinPrivate(code: string) {
        try {
            const m = pvrManager();
            const limit = m ? (m.field("DefaultRoomLimit").value as number) : 16;
            PhotonVRManager.method("JoinPrivateRoom", 2).invoke(Il2Cpp.string(code), limit);
            notify(`joining room ${code}`, 3);
        } catch (e) { console.log("[Xra] joinPrivate: " + e); }
    }

    function roomInfo(): string {
        try {
            if (!PhotonNetwork) return "photon not loaded";
            const room = PhotonNetwork.method("get_CurrentRoom").invoke();
            if (!room || room.isNull()) return "not in a room";
            const name = room.method("get_Name").invoke().toString().replace(/^"|"$/g, "");
            const count = room.method("get_PlayerCount").invoke() as number;
            const max = room.method("get_MaxPlayers").invoke() as number;
            return `${name} — ${count}/${max}`;
        } catch (_) { return "unknown"; }
    }

    // ───────────────────────────────────────────────────── cheats
    // ModeratorMenu._KickPlayer is a [PunRPC] with no auth check — it just calls
    // Application.Quit() on whoever receives it. We send it targeted at any player.
    // PUN resolves the RPC on the receiver by matching our viewID, so we must send
    // from the PhotonView that sits on the same object as ModeratorMenu.
    const objectArrayClass = Il2Cpp.corlib.class("System.Object");

    function emptyArgs(): any { return Il2Cpp.array(objectArrayClass, 0); }
    function argsOf(...vals: any[]): any {
        const arr = Il2Cpp.array(objectArrayClass, vals.length);
        for (let i = 0; i < vals.length; i++) arr.set(i, vals[i]);
        return arr;
    }

    function myModeratorView(): any {
        for (const mm of findAll(ModeratorMenuClass)) {
            try {
                const pv = getComponent(mm, PhotonView);
                if (pv && !pv.isNull() && pv.method("get_IsMine").invoke()) return pv;
            } catch (_) {}
        }
        // Fallback: the field the game itself caches
        try {
            const mm = findOne(ModeratorMenuClass);
            if (mm) { const pv = mm.field("mypv").value; if (pv && !pv.isNull()) return pv; }
        } catch (_) {}
        return null;
    }

    // PhotonView.RPC(string, Player, object[]) — resolve by param count once.
    let rpcMethod: any = null;
    function resolveRpc() {
        if (rpcMethod || !PhotonView) return;
        try {
            for (const m of PhotonView.methods) {
                if (m.name === "RPC" && m.parameterCount === 3) {
                    try { if (m.parameters[1].type.name.indexOf("Player") >= 0) { rpcMethod = m; return; } } catch (_) {}
                }
            }
            rpcMethod = PhotonView.tryMethod("RPC", 3);
        } catch (_) {}
    }

    function sendRpcTo(targetPlayer: any, method: string, args: any) {
        resolveRpc();
        const pv = myModeratorView();
        if (!pv) { notify("no moderator view found", 3); return false; }
        if (!rpcMethod) { notify("RPC method not found", 3); return false; }
        try { rpcMethod.invoke.call(pv, Il2Cpp.string(method), targetPlayer, args); return true; }
        catch (e) { console.log("[Xra] RPC " + method + ": " + e); return false; }
    }

    function playersOthers(): any[] {
        const out: any[] = [];
        try {
            const arr = PhotonNetwork.method("get_PlayerListOthers").invoke();
            for (let i = 0; i < arr.length; i++) { const p = arr.get(i); if (p && !p.isNull()) out.push(p); }
        } catch (_) {}
        return out;
    }

    function photonPlayerName(p: any): string {
        try { return p.method("get_NickName").invoke().toString().replace(/^"|"$/g, ""); } catch (_) { return "?"; }
    }

    function ownerOf(pvrPlayer: any): any {
        try { return pvrPlayer.method("get_photonView").invoke().method("get_Owner").invoke(); } catch (_) { return null; }
    }

    function kickPhotonPlayer(p: any): boolean {
        return sendRpcTo(p, "_KickPlayer", emptyArgs());
    }

    function kickAll() {
        let n = 0;
        for (const p of playersOthers()) if (kickPhotonPlayer(p)) n++;
        try { sendAllOutgoing(); } catch (_) {}
        notify(`kicked ${n} ${n === 1 ? "player" : "players"}`, 4);
    }

    function renamePhotonPlayer(p: any, name: string): boolean {
        return sendRpcTo(p, "_ResetUsername", argsOf(Il2Cpp.string(name)));
    }

    // ModChecker gates the mod toolset behind a "Modewador" PlayFab item. Flip the
    // flags and re-activate the objects it hides so the tools light up locally.
    function unlockModTools() {
        let touched = 0;
        for (const mc of findAll(ModCheckerClass)) {
            try { mc.field("HasMod").value = true; } catch (_) {}
            try { mc.field("_HasMod").value = true; } catch (_) {}
            try {
                const items = mc.field("Items").value;
                if (items && !items.isNull()) {
                    for (let i = 0; i < items.length; i++) {
                        const go = items.get(i);
                        if (go && !go.isNull()) go.method("SetActive").invoke(true);
                    }
                }
            } catch (_) {}
            touched++;
        }
        notify(touched > 0 ? "mod tools unlocked" : "no ModChecker found", 3);
    }

    // Movement cheats live on GorillaLocomotion.Player
    function setFloatField(name: string, value: number) {
        try { GTPlayer.field(name).value = value; } catch (e) { console.log(`[Xra] ${name}: ${e}`); }
    }

    // ───────────────────────────────────────────────────── categories
    // 0 Home | 1 Menu chrome | 2 Settings | 3 Movement | 4 Spawner | 5 Name
    // 6 Colours | 7 Cosmetics | 8 Players | 9 Room | 10 Credits
    let currentCategory = 0;
    let currentPage = 0;

    function goTo(cat: number) { currentCategory = cat; currentPage = 0; }

    const buttons: ButtonInfo[][] = [
        [ // Home [0]
            new ButtonInfo({ buttonText: "Movement",  method: () => goTo(3), keepOn: false }),
            new ButtonInfo({ buttonText: "Spawner",   method: () => goTo(4), keepOn: false }),
            new ButtonInfo({ buttonText: "Name",      method: () => goTo(5), keepOn: false }),
            new ButtonInfo({ buttonText: "Neon",      method: () => goTo(6), keepOn: false }),
            new ButtonInfo({ buttonText: "Cosmetics", method: () => { collectCosmetics(); goTo(7); }, keepOn: false }),
            new ButtonInfo({ buttonText: "Players",   method: () => goTo(8), keepOn: false }),
            new ButtonInfo({ buttonText: "Admin",     method: () => goTo(17), keepOn: false }),
            new ButtonInfo({ buttonText: "Trolls",    method: () => goTo(18), keepOn: false }),
            new ButtonInfo({ buttonText: "Room",      method: () => goTo(9), keepOn: false }),
            new ButtonInfo({ buttonText: "Settings",  method: () => goTo(2), keepOn: false }),
            new ButtonInfo({ buttonText: "Credits",   method: () => goTo(10), keepOn: false }),
        ],
        [ // Menu chrome [1] — never rendered as a page, only looked up by name
            new ButtonInfo({ buttonText: "Home", method: () => goTo(0), keepOn: false }),
            new ButtonInfo({ buttonText: "Leave", method: () => leaveRoom(), keepOn: false }),
            new ButtonInfo({
                buttonText: "PreviousPage",
                method: () => {
                    const lastPage = Math.max(0, Math.ceil(currentSource().length / 6) - 1);
                    currentPage--;
                    if (currentPage < 0) currentPage = lastPage;
                },
                keepOn: false,
            }),
            new ButtonInfo({
                buttonText: "NextPage",
                method: () => {
                    const lastPage = Math.max(0, Math.ceil(currentSource().length / 6) - 1);
                    currentPage++;
                    currentPage %= lastPage + 1;
                },
                keepOn: false,
            }),
        ],
        [ // Settings [2]
            new ButtonInfo({ buttonText: "Back",       method: () => goTo(0), keepOn: false }),
            new ButtonInfo({ buttonText: "Fly Speed +", method: () => { flyspeed += 1; setTooltip(`Fly speed: ${flyspeed}`, 3); }, keepOn: false, tooltip: "" }),
            new ButtonInfo({ buttonText: "Fly Speed -", method: () => { flyspeed = Math.max(1, flyspeed - 1); setTooltip(`Fly speed: ${flyspeed}`, 3); }, keepOn: false }),
            new ButtonInfo({ buttonText: "Next Theme", method: () => applyTheme(themeIndex + 1), keepOn: false }),
            new ButtonInfo({ buttonText: "Prev Theme", method: () => applyTheme(themeIndex - 1), keepOn: false }),
            new ButtonInfo({ buttonText: "Arm Reach +", method: () => { armLengthMultiplier = Math.min(2.5, armLengthMultiplier + 0.1); setTooltip(`Arm reach: ${armLengthMultiplier.toFixed(1)}x`, 3); }, keepOn: false }),
            new ButtonInfo({ buttonText: "Arm Reach -", method: () => { armLengthMultiplier = Math.max(1.0, armLengthMultiplier - 0.1); setTooltip(`Arm reach: ${armLengthMultiplier.toFixed(1)}x`, 3); }, keepOn: false }),
            new ButtonInfo({ buttonText: "Room Info", method: () => notify(roomInfo(), 5), keepOn: false }),
        ],
        [ // Movement [3]
            new ButtonInfo({ buttonText: "Back", method: () => goTo(0), keepOn: false }),
            new ButtonInfo({
                buttonText: "Fly [B]",
                tooltip: "hold B to fly where your right hand points",
                method: () => {
                    if (rightSecondary) {
                        const dir = rightHandTransform.method("get_forward").invoke();
                        setVelocity(Vector3.method("op_Multiply", 2).invoke(dir, flyspeed));
                    }
                },
            }),
            new ButtonInfo({ buttonText: "Platforms [G]", tooltip: "hold grip for a platform under each hand", method: () => Platforms() }),
            new ButtonInfo({
                buttonText: "No Clip [T]",
                tooltip: "hold right trigger to phase through walls",
                method: () => {
                    if (rightTrigger && !previousNoclipKey) setNoClip(true);
                    if (!rightTrigger && previousNoclipKey) setNoClip(false);
                    previousNoclipKey = rightTrigger;
                },
                disableMethod: () => { setNoClip(false); previousNoclipKey = false; },
            }),
            new ButtonInfo({
                buttonText: "Super Jump",
                tooltip: "pull right trigger to launch straight up",
                method: () => {
                    if (rightTrigger && !previousJumpKey) setVelocity([0, 22.0, 0]);
                    previousJumpKey = rightTrigger;
                },
            }),
            new ButtonInfo({
                buttonText: "Low Gravity",
                tooltip: "float down gently like a feather",
                method: () => {
                    try { if (rigidbody) rigidbody.method("set_useGravity").invoke(false); } catch (_) {}
                    const [vx, vy, vz] = getVelocity();
                    setVelocity([vx, Math.max(vy - 0.05, -2.0), vz]);
                },
                disableMethod: () => { try { if (rigidbody) rigidbody.method("set_useGravity").invoke(true); } catch (_) {} },
            }),
            new ButtonInfo({
                buttonText: "Long Arms",
                tooltip: "stretchy arms without resizing your body",
                enableMethod: () => { longArmsEnabled = true; },
                disableMethod: () => { longArmsEnabled = false; },
            }),
            new ButtonInfo({
                buttonText: "Speed Boost",
                tooltip: "raises your max movement speed",
                method: () => { try { GTPlayer.field("maxJumpSpeed").value = 29.5; } catch (_) {} },
            }),
            new ButtonInfo({
                buttonText: "Freeze In Menu",
                tooltip: "hold still while the menu is open",
                enabled: true,
                method: () => {
                    if (menu != null && rigidbody) {
                        if (closePosition == null) {
                            try { closePosition = rigidbody.method("get_position").invoke(); } catch (_) {}
                        } else {
                            try { rigidbody.method("set_position").invoke(closePosition); } catch (_) {}
                            setVelocity(zeroVector);
                        }
                    } else closePosition = null;
                },
            }),
            new ButtonInfo({
                buttonText: "TP To Aim [G+T]",
                tooltip: "hold grip then pull trigger to teleport where you point",
                method: () => {
                    if (!rightGrab || !rightTrigger) return;
                    const now = Date.now();
                    if (now - lastTempSpawn < 350) return;
                    lastTempSpawn = now;
                    teleportTo(aimPosition(12.0));
                },
            }),
            new ButtonInfo({
                buttonText: "Grow / Shrink",
                tooltip: "right trigger grows you, left trigger shrinks you",
                method: () => {
                    if (rightTrigger) applyPlayerScale(playerScale + 0.02);
                    else if (leftTrigger) applyPlayerScale(playerScale - 0.02);
                },
            }),
            new ButtonInfo({ buttonText: "Reset Size", keepOn: false, method: () => { applyPlayerScale(1.0); notify("size reset", 2.5); } }),
            new ButtonInfo({
                buttonText: "Invisible",
                tooltip: "hides your networked body from everyone",
                enableMethod: () => {
                    const lp = localPhotonPlayer();
                    if (lp) { try { lp.method("set_enabled").invoke(false); notify("invisible", 3); } catch (_) {} }
                },
                disableMethod: () => {
                    const lp = localPhotonPlayer();
                    if (lp) { try { lp.method("set_enabled").invoke(true); notify("visible", 3); } catch (_) {} }
                },
            }),
        ],
        [ // Spawner [4]
            new ButtonInfo({ buttonText: "Back", method: () => goTo(0), keepOn: false }),
            new ButtonInfo({
                buttonText: "Prefab >",
                keepOn: false,
                method: () => {
                    const all = getAllPrefabNames();
                    selectedPrefabIndex = (selectedPrefabIndex + 1) % all.length;
                    setTooltip(`prefab [${selectedPrefabIndex + 1}/${all.length}]: ${selectedPrefab()}`, 8);
                },
            }),
            new ButtonInfo({
                buttonText: "< Prefab",
                keepOn: false,
                method: () => {
                    const all = getAllPrefabNames();
                    selectedPrefabIndex = (selectedPrefabIndex - 1 + all.length) % all.length;
                    setTooltip(`prefab [${selectedPrefabIndex + 1}/${all.length}]: ${selectedPrefab()}`, 8);
                },
            }),
            new ButtonInfo({ buttonText: "Prefab List", keepOn: false, method: () => goTo(15) }),
            new ButtonInfo({
                buttonText: "Scan Resources",
                keepOn: false,
                method: () => {
                    scanAllPrefabs();
                    rebuildPrefabList();
                    notify(`found ${getAllPrefabNames().length} total prefabs`, 4);
                },
            }),
            new ButtonInfo({
                buttonText: "Spawn One",
                keepOn: false,
                method: () => { if (localSpawn(selectedPrefab(), aimPosition(spawnDistance))) notify(`spawned ${selectedPrefab()}`, 3); },
            }),
            new ButtonInfo({
                buttonText: "Spam Prefab [T]",
                tooltip: "hold right trigger to spam the selected prefab",
                method: () => {
                    if (!rightTrigger) return;
                    const now = Date.now();
                    if (now - lastTempSpawn < 60) return;
                    lastTempSpawn = now;
                    localSpawn(selectedPrefab(), aimPosition(spawnDistance));
                },
            }),
            new ButtonInfo({
                buttonText: "Spawn Wall",
                tooltip: "drops a 5x5 grid of the selected prefab in front of you",
                keepOn: false,
                method: () => {
                    const base = aimPosition(spawnDistance);
                    const [bx, by, bz] = vec(base);
                    for (let x = -2; x <= 2; x++) {
                        for (let y = 0; y < 5; y++) localSpawn(selectedPrefab(), [bx + x * 1.2, by + y * 1.2, bz]);
                    }
                    notify(`wall of ${selectedPrefab()}`, 3);
                },
            }),
            new ButtonInfo({ buttonText: "Spawn Dist +", keepOn: false, method: () => { spawnDistance = Math.min(30, spawnDistance + 1); setTooltip(`spawn distance: ${spawnDistance}`, 4); } }),
            new ButtonInfo({ buttonText: "Spawn Dist -", keepOn: false, method: () => { spawnDistance = Math.max(1, spawnDistance - 1); setTooltip(`spawn distance: ${spawnDistance}`, 4); } }),
            new ButtonInfo({
                buttonText: "Rig Spam [B]",
                tooltip: "hold B to spam networked player rigs — everyone sees these",
                method: () => {
                    if (!rightSecondary) return;
                    const now = Date.now();
                    if (now - lastTempSpawn < 80) return;
                    lastTempSpawn = now;
                    netSpawn(aimPosition(spawnDistance));
                },
            }),
            new ButtonInfo({
                buttonText: "Spawn Rig",
                keepOn: false,
                method: () => { if (netSpawn(aimPosition(spawnDistance))) notify("networked rig spawned", 3); },
            }),
            new ButtonInfo({ buttonText: "Clear My Spawns", keepOn: false, method: () => { const n = localSpawned.length; clearLocalSpawns(); notify(`cleared ${n} local`, 3); } }),
            new ButtonInfo({ buttonText: "Clear Rigs", keepOn: false, method: () => { const n = netSpawned.length; clearNetSpawns(); notify(`cleared ${n} rigs`, 3); } }),
        ],
        [ // Name [5]
            new ButtonInfo({ buttonText: "Back", method: () => goTo(0), keepOn: false }),
            new ButtonInfo({ buttonText: "Preset Names", method: () => goTo(11), keepOn: false, tooltip: "pick a ready made name" }),
            new ButtonInfo({
                buttonText: "Name Colour >",
                keepOn: false,
                tooltip: "wraps your name in a <color=> tag",
                method: () => {
                    nameColourIndex = (nameColourIndex + 1) % NAME_COLOURS.length;
                    setTooltip(`name colour: ${NAME_COLOURS[nameColourIndex]}`, 6);
                },
            }),
            new ButtonInfo({
                buttonText: "Letter >",
                keepOn: false,
                method: () => {
                    nameLetterIndex = (nameLetterIndex + 1) % NAME_ALPHABET.length;
                    setTooltip(`letter: ${NAME_ALPHABET[nameLetterIndex]}`, 6);
                },
            }),
            new ButtonInfo({
                buttonText: "< Letter",
                keepOn: false,
                method: () => {
                    nameLetterIndex = (nameLetterIndex - 1 + NAME_ALPHABET.length) % NAME_ALPHABET.length;
                    setTooltip(`letter: ${NAME_ALPHABET[nameLetterIndex]}`, 6);
                },
            }),
            new ButtonInfo({
                buttonText: "Add Letter",
                keepOn: false,
                method: () => {
                    if (nameBuffer.length >= 15) { notify("15 characters max", 2.5); return; }
                    nameBuffer += NAME_ALPHABET[nameLetterIndex];
                    setTooltip(`name: ${nameBuffer}`, 8);
                },
            }),
            new ButtonInfo({
                buttonText: "Backspace",
                keepOn: false,
                method: () => { nameBuffer = nameBuffer.slice(0, -1); setTooltip(`name: ${nameBuffer}`, 8); },
            }),
            new ButtonInfo({ buttonText: "Clear Name", keepOn: false, method: () => { nameBuffer = ""; setTooltip("name: (empty)", 6); } }),
            new ButtonInfo({ buttonText: "Apply Name", keepOn: false, method: () => applyName(nameBuffer) }),
            new ButtonInfo({
                buttonText: "Random Name",
                keepOn: false,
                method: () => {
                    nameBuffer = (PRESET_NAMES[Math.floor(Math.random() * PRESET_NAMES.length)] + Math.floor(Math.random() * 1000)).substring(0, 15);
                    applyName(nameBuffer);
                },
            }),
            new ButtonInfo({ buttonText: "Show My Name", keepOn: false, method: () => notify(`you are: ${currentUsername()}`, 4) }),
        ],
        [ // Neon [6]
            new ButtonInfo({ buttonText: "Back", method: () => goTo(0), keepOn: false }),
            new ButtonInfo({ buttonText: "Neon Colours", keepOn: false, method: () => goTo(16), tooltip: "HDR body colours everyone can see" }),
            new ButtonInfo({ buttonText: "Glow +", keepOn: false, method: () => { neonIntensity = Math.min(20, neonIntensity + 1); setTooltip(`glow: ${neonIntensity}x`, 4); } }),
            new ButtonInfo({ buttonText: "Glow -", keepOn: false, method: () => { neonIntensity = Math.max(1, neonIntensity - 1); setTooltip(`glow: ${neonIntensity}x`, 4); } }),
            new ButtonInfo({
                buttonText: "Neon Strobe",
                tooltip: "flashes your body through the neon palette — everyone sees it",
                // SetColour fires a network property update, so cap it well under framerate.
                method: () => {
                    const now = Date.now();
                    if (now - lastStrobe < 120) return;
                    lastStrobe = now;
                    const c = strobeColour();
                    setColour(c[0], c[1], c[2]);
                },
                disableMethod: () => setColour(1.0, 1.0, 1.0),
            }),
            new ButtonInfo({
                buttonText: "Blinder Flash [T]",
                tooltip: "right trigger drops a huge blown-out sphere on your view",
                method: () => {
                    if (!rightTrigger) return;
                    const now = Date.now();
                    if (now - lastBlinder < 220) return;
                    lastBlinder = now;
                    try {
                        spawnTemp(getTransform(headCollider).method("get_position").invoke(), 14.0, neon([1, 1, 1], neonIntensity * 4), 160, 0);
                    } catch (_) {}
                },
                disableMethod: () => clearTempObjects(),
            }),
            new ButtonInfo({
                buttonText: "Neon Trail",
                tooltip: "leaves glowing cubes behind you",
                method: () => {
                    const now = Date.now();
                    if (now - lastTempSpawn < 70) return;
                    lastTempSpawn = now;
                    hue = (hue + 13) % 360;
                    try {
                        spawnTemp(getTransform(headCollider).method("get_position").invoke(), 0.22, neonFromHue(hue), 2500, 3);
                    } catch (_) {}
                },
                disableMethod: () => clearTempObjects(),
            }),
            new ButtonInfo({
                buttonText: "Neon Hands",
                tooltip: "glowing orbs on both hands",
                method: () => {
                    const now = Date.now();
                    if (now - lastTempSpawn < 60) return;
                    lastTempSpawn = now;
                    hue = (hue + 21) % 360;
                    const c = neonFromHue(hue);
                    try {
                        spawnTemp(leftHandTransform.method("get_position").invoke(), 0.12, c, 500, 0);
                        spawnTemp(rightHandTransform.method("get_position").invoke(), 0.12, c, 500, 0);
                    } catch (_) {}
                },
                disableMethod: () => clearTempObjects(),
            }),
            new ButtonInfo({
                buttonText: "Neon Rave",
                tooltip: "scatters glowing cubes all around you",
                method: () => {
                    const now = Date.now();
                    if (now - lastTempSpawn < 45) return;
                    lastTempSpawn = now;
                    hue = (hue + 29) % 360;
                    try {
                        const [x, y, z] = vec(getTransform(headCollider).method("get_position").invoke());
                        spawnTemp([
                            x + (Math.random() - 0.5) * 12,
                            y + (Math.random() - 0.5) * 6,
                            z + (Math.random() - 0.5) * 12,
                        ], 0.4, neonFromHue(hue), 1600, 3);
                    } catch (_) {}
                },
                disableMethod: () => clearTempObjects(),
            }),
            new ButtonInfo({ buttonText: "Clear Neon", keepOn: false, method: () => { const n = tempObjects.length; clearTempObjects(); notify(`cleared ${n}`, 2.5); } }),
        ],
        [ // Cosmetics [7] — dynamic list lives in category 12
            new ButtonInfo({ buttonText: "Back", method: () => goTo(0), keepOn: false }),
            new ButtonInfo({
                buttonText: "Next Slot",
                keepOn: false,
                method: () => {
                    cosmeticSlot = (cosmeticSlot + 1) % COSMETIC_SLOTS.length;
                    dynamicCacheCat = -1; // browser must rebuild for the new slot
                    setTooltip(`slot: ${COSMETIC_SLOTS[cosmeticSlot]} (${cosmeticsForSlot(cosmeticSlot).length})`, 6);
                },
            }),
            new ButtonInfo({
                buttonText: "Browse Cosmetics",
                keepOn: false,
                method: () => {
                    if (totalCosmetics() === 0) { notify("no cosmetics found yet", 3); return; }
                    dynamicCacheCat = -1; // slot may have changed since the last browse
                    goTo(12);
                },
            }),
            new ButtonInfo({ buttonText: "Clear This Slot", keepOn: false, method: () => { setCosmetic(cosmeticSlot, ""); notify(`cleared ${COSMETIC_SLOTS[cosmeticSlot]}`, 3); } }),
            new ButtonInfo({
                buttonText: "Clear All",
                keepOn: false,
                method: () => { for (let i = 0; i < COSMETIC_SLOTS.length; i++) setCosmetic(i, ""); notify("cosmetics cleared", 3); },
            }),
            new ButtonInfo({
                buttonText: "Rescan",
                keepOn: false,
                method: () => {
                    cosmeticsBySlot = [];
                    dynamicCacheCat = -1;
                    const n = totalCosmetics();
                    notify(`found ${n} cosmetics (${cosmeticScanSource})`, 4);
                },
            }),
        ],
        [ // Players [8] — dynamic list lives in category 13
            new ButtonInfo({ buttonText: "Back", method: () => goTo(0), keepOn: false }),
            new ButtonInfo({ buttonText: "Player List", keepOn: false, method: () => goTo(13) }),
            new ButtonInfo({
                buttonText: "Count Players",
                keepOn: false,
                method: () => {
                    const n = findAll(PhotonVRPlayer).filter(p => !isLocal(p)).length;
                    notify(`${n} other ${n === 1 ? "chimp" : "chimps"} here`, 3);
                },
            }),
            new ButtonInfo({
                buttonText: "Player ESP",
                tooltip: "draws a line to everyone in the room",
                method: () => updateEsp(),
                disableMethod: () => clearEsp(),
            }),
            new ButtonInfo({ buttonText: "Kick List", keepOn: false, method: () => goTo(13), tooltip: "kick/TP individual players" }),
            new ButtonInfo({ buttonText: "Kick All", keepOn: false, method: () => kickAll(), tooltip: "boots everyone else from the room" }),
        ],
        [ // Room [9]
            new ButtonInfo({ buttonText: "Back", method: () => goTo(0), keepOn: false }),
            new ButtonInfo({ buttonText: "Room Info",   keepOn: false, method: () => notify(roomInfo(), 5) }),
            new ButtonInfo({ buttonText: "New Room",    keepOn: false, method: () => hopServer(), tooltip: "leave and join a fresh random room" }),
            new ButtonInfo({ buttonText: "Leave Room",  keepOn: false, method: () => { leaveRoom(); notify("left the room", 3); } }),
            new ButtonInfo({ buttonText: "Rejoin",      keepOn: false, method: () => { joinRandom(); notify("rejoining...", 3); } }),
            new ButtonInfo({ buttonText: "Private Room", keepOn: false, method: () => goTo(14), tooltip: "type a room code and join it" }),
        ],
        [ // Credits [10]
            new ButtonInfo({ buttonText: "Back", method: () => goTo(0), keepOn: false }),
            new ButtonInfo({ buttonText: "Xra Menu :3", keepOn: false, tooltip: "for ChimplabVR" }),
            new ButtonInfo({ buttonText: "menu by Juelz", keepOn: false }),
            new ButtonInfo({ buttonText: "built on Frida", keepOn: false }),
        ],
        [ // Preset names [11] — filled below
        ],
        [ // Cosmetic browser [12] — dynamic
        ],
        [ // Player list [13] — dynamic
        ],
        [ // Private room code [14] — filled below
        ],
        [ // Prefab list [15] — filled below
        ],
        [ // Neon colours [16] — filled below
        ],
        [ // Admin / Cheats [17]
            new ButtonInfo({ buttonText: "Back", method: () => goTo(0), keepOn: false }),
            new ButtonInfo({ buttonText: "Unlock Mod Tools", keepOn: false, method: () => unlockModTools(), tooltip: "flips ModChecker.HasMod on" }),
            new ButtonInfo({ buttonText: "Kick List", keepOn: false, method: () => goTo(13) }),
            new ButtonInfo({ buttonText: "Kick All", keepOn: false, method: () => kickAll() }),
            new ButtonInfo({
                buttonText: "Rename All",
                keepOn: false,
                tooltip: "renames everyone else to your current name buffer",
                method: () => {
                    const n = (nameBuffer.trim() || "Chimp").substring(0, 15);
                    let c = 0;
                    for (const p of playersOthers()) if (renamePhotonPlayer(p, n)) c++;
                    try { sendAllOutgoing(); } catch (_) {}
                    notify(`renamed ${c} to ${n}`, 4);
                },
            }),
            new ButtonInfo({
                buttonText: "God Speed",
                tooltip: "cranks your max jump/move speed",
                enableMethod: () => { setFloatField("maxJumpSpeed", 45); setFloatField("jumpMultiplier", 3.0); setFloatField("velocityLimit", 45); notify("god speed on", 3); },
                disableMethod: () => { setFloatField("maxJumpSpeed", 6.5); setFloatField("jumpMultiplier", 1.1); setFloatField("velocityLimit", 6.5); notify("speed reset", 3); },
            }),
            new ButtonInfo({
                buttonText: "Freeze Me",
                tooltip: "toggles Player.disableMovement",
                enableMethod: () => { try { GTPlayer.field("disableMovement").value = true; } catch (_) {} notify("movement frozen", 3); },
                disableMethod: () => { try { GTPlayer.field("disableMovement").value = false; } catch (_) {} notify("movement freed", 3); },
            }),
            new ButtonInfo({ buttonText: "Reveal Mod IDs", keepOn: false, method: () => unlockModTools(), tooltip: "same flag also shows other players' PlayFab IDs" }),
        ],
        [ // Trolls [18] — filled below
        ],
        [ // Troll Target [19] — filled dynamically
        ],
        [ // Kick Tools [20] — filled below
        ],
    ];

    // Preset names [11]
    buttons[11].push(new ButtonInfo({ buttonText: "Back", method: () => goTo(5), keepOn: false }));
    for (const n of PRESET_NAMES) {
        buttons[11].push(new ButtonInfo({
            buttonText: n,
            keepOn: false,
            method: () => { nameBuffer = n; applyName(n); },
        }));
    }

    // Prefab list [15] — jump straight to any spawnable
    buttons[15].push(new ButtonInfo({ buttonText: "Back", method: () => goTo(4), keepOn: false }));
    LOCAL_PREFABS.forEach((name, idx) => {
        buttons[15].push(new ButtonInfo({
            buttonText: name,
            keepOn: false,
            method: () => { selectedPrefabIndex = idx; setTooltip(`prefab: ${name}`, 8); notify(`selected ${name}`, 3); },
        }));
    });

    // Neon body colours [16] — HDR, so they blow out into a glow
    buttons[16].push(new ButtonInfo({ buttonText: "Back", method: () => goTo(6), keepOn: false }));
    for (const [label, base] of NEON_HUES) {
        buttons[16].push(new ButtonInfo({
            buttonText: `Neon ${label}`,
            keepOn: false,
            method: () => { const c = neon(base); setColour(c[0], c[1], c[2]); notify(`neon ${label.toLowerCase()} @ ${neonIntensity}x`, 3); },
        }));
    }
    buttons[16].push(new ButtonInfo({
        buttonText: "Random Neon",
        keepOn: false,
        method: () => { const c = neonFromHue(Math.floor(Math.random() * 360)); setColour(c[0], c[1], c[2]); notify("random neon", 2.5); },
    }));
    buttons[16].push(new ButtonInfo({
        buttonText: "Reset Colour",
        keepOn: false,
        method: () => { setColour(1.0, 1.0, 1.0); notify("colour reset", 2.5); },
    }));

    // Private room code pad [14]
    buttons[14].push(new ButtonInfo({ buttonText: "Back", method: () => goTo(9), keepOn: false }));
    for (let d = 0; d <= 9; d++) {
        buttons[14].push(new ButtonInfo({
            buttonText: `Code ${d}`,
            keepOn: false,
            method: () => {
                if (roomCodeBuffer.length >= 8) { notify("code is full", 2.5); return; }
                roomCodeBuffer += String(d);
                setTooltip(`code: ${roomCodeBuffer}`, 8);
            },
        }));
    }
    buttons[14].push(new ButtonInfo({ buttonText: "Code Back", keepOn: false, method: () => { roomCodeBuffer = roomCodeBuffer.slice(0, -1); setTooltip(`code: ${roomCodeBuffer}`, 8); } }));
    buttons[14].push(new ButtonInfo({ buttonText: "Code Clear", keepOn: false, method: () => { roomCodeBuffer = ""; setTooltip("code: (empty)", 6); } }));
    buttons[14].push(new ButtonInfo({
        buttonText: "Join Code",
        keepOn: false,
        method: () => { if (roomCodeBuffer.length === 0) { notify("enter a code first", 2.5); return; } joinPrivate(roomCodeBuffer); },
    }));

    // ───────────────────────────────────────────────────── TrollManager / KickManager [18/19/20]
    let trollTargetIndex = 0;
    // Photon.Pun.RpcTarget: All=0, Others=1, MasterClient=2, AllBuffered=3, OthersBuffered=4, AllViaServer=5
    const RPC_ALL = 0;
    const RPC_OTHERS = 1;

    function findPV(goName: string): any {
        try {
            const go = GameObject.method("Find").invoke(Il2Cpp.string(goName));
            if (go && !go.isNull()) {
                const pv = getComponent(go, PhotonView);
                if (pv && !pv.isNull()) return pv;
            }
        } catch (_) {}
        return null;
    }

    function claimMaster() {
        try {
            const lp = PhotonNetwork.method("get_LocalPlayer").invoke();
            PhotonNetwork.method("SetMasterClient").invoke(lp);
            notify("claimed master", 2);
        } catch (e) { console.log("[Xra] claimMaster: " + e); }
    }

    function claimOwnership(pv: any) {
        try {
            if (!pv.method("get_IsMine").invoke()) pv.method("RequestOwnership").invoke();
        } catch (_) {}
    }

    // Box an int for RPC params
    function boxInt(n: number): any {
        const intClass = Il2Cpp.corlib.class("System.Int32");
        const mem = Memory.alloc(4);
        mem.writeS32(n);
        return new (Il2Cpp as any).Object((Il2Cpp as any).exports.valueTypeBox(intClass, mem));
    }

    function makeParamArr(...args: any[]): any {
        const objClass = Il2Cpp.corlib.class("System.Object");
        const boxed = args.map(a => typeof a === "number" ? boxInt(a) : a);
        return Il2Cpp.array(objClass, boxed);
    }

    // Send RPC to ALL via RpcTarget
    function sendRPCAll(goName: string, methodName: string, ...args: any[]) {
        const pv = findPV(goName);
        if (!pv) { notify(`${goName} not found`, 3); return; }
        claimOwnership(pv);
        try {
            pv.method("RPC").overload("System.String", "Photon.Pun.RpcTarget", "System.Object[]")
                .invoke(Il2Cpp.string(methodName), RPC_ALL, makeParamArr(...args));
            notify(`${methodName}`, 2);
        } catch (e) { console.log(`[Xra] RPC ${methodName}: ${e}`); notify(`${methodName} failed`, 3); }
    }

    // Send RPC to a specific Photon.Realtime.Player
    function sendRPCToPlayer(goName: string, methodName: string, targetPlayer: any, ...args: any[]) {
        const pv = findPV(goName);
        if (!pv) { notify(`${goName} not found`, 3); return; }
        claimOwnership(pv);
        try {
            pv.method("RPC").overload("System.String", "Photon.Realtime.Player", "System.Object[]")
                .invoke(Il2Cpp.string(methodName), targetPlayer, makeParamArr(...args));
            notify(`${methodName}`, 2);
        } catch (e) { console.log(`[Xra] RPC→player ${methodName}: ${e}`); notify(`${methodName} failed`, 3); }
    }

    function getTargetPlayer(): any {
        const others = playersOthers();
        if (others.length === 0) return null;
        return others[trollTargetIndex % others.length];
    }

    function getTargetActorNr(): number {
        const p = getTargetPlayer();
        if (!p) return -1;
        try { return p.method("get_ActorNumber").invoke() as number; } catch (_) { return -1; }
    }

    function getTargetName(): string {
        const p = getTargetPlayer();
        return p ? photonPlayerName(p) : "nobody";
    }

    function buildTrollTargetList() {
        buttons[19] = [];
        buttons[19].push(new ButtonInfo({ buttonText: "Back", method: () => goTo(18), keepOn: false }));
        const others = playersOthers();
        others.forEach((p, idx) => {
            const name = photonPlayerName(p);
            buttons[19].push(new ButtonInfo({
                buttonText: name,
                keepOn: false,
                method: () => { trollTargetIndex = idx; notify(`target: ${name}`, 3); goTo(18); },
            }));
        });
        if (others.length === 0) buttons[19].push(new ButtonInfo({ buttonText: "No players", keepOn: false, method: () => {} }));
    }

    // Helper: send troll RPC to target player (the no-param RPCs like FreezeRPC affect the RECEIVER)
    function trollToTarget(rpcName: string) {
        const p = getTargetPlayer();
        if (!p) { notify("pick a target", 2); return; }
        sendRPCToPlayer("TrollManager", rpcName, p);
    }

    // Helper: send troll RPC to all others
    function trollToAll(rpcName: string) {
        sendRPCAll("TrollManager", rpcName);
    }

    // Helper: send kick-manager RPC to target
    function kickToTarget(rpcName: string) {
        const p = getTargetPlayer();
        if (!p) { notify("pick a target", 2); return; }
        sendRPCToPlayer("KickManager", rpcName, p);
    }

    // Troll menu buttons [18]
    buttons[18].push(new ButtonInfo({ buttonText: "Back", method: () => goTo(0), keepOn: false }));
    buttons[18].push(new ButtonInfo({ buttonText: "Set Master", keepOn: false, method: () => claimMaster() }));
    buttons[18].push(new ButtonInfo({ buttonText: "Pick Target", keepOn: false, method: () => { buildTrollTargetList(); goTo(19); } }));
    buttons[18].push(new ButtonInfo({ buttonText: "Target >", keepOn: false, method: () => {
        const others = playersOthers();
        if (others.length === 0) { notify("no players", 2); return; }
        trollTargetIndex = (trollTargetIndex + 1) % others.length;
        notify(`target: ${getTargetName()}`, 3);
    }}));
    buttons[18].push(new ButtonInfo({ buttonText: "Kick Tools", keepOn: false, method: () => goTo(20) }));

    // Send to target player — RPCs execute on THEIR client
    buttons[18].push(new ButtonInfo({ buttonText: ">> TARGET <<", keepOn: false, method: () => notify(`target: ${getTargetName()}`, 3) }));
    buttons[18].push(new ButtonInfo({ buttonText: "Freeze Target", keepOn: false, method: () => trollToTarget("FreezeRPC") }));
    buttons[18].push(new ButtonInfo({ buttonText: "Blind Target", keepOn: false, method: () => trollToTarget("BlindRPC") }));
    buttons[18].push(new ButtonInfo({ buttonText: "High Target", keepOn: false, method: () => trollToTarget("HighRPC") }));
    buttons[18].push(new ButtonInfo({ buttonText: "Invis Target", keepOn: false, method: () => trollToTarget("InvisRPC") }));
    buttons[18].push(new ButtonInfo({ buttonText: "ZeroGrav Target", keepOn: false, method: () => trollToTarget("ZeroGravRPC") }));
    buttons[18].push(new ButtonInfo({ buttonText: "Fling Target", keepOn: false, method: () => trollToTarget("FlingPlayerRPC") }));
    buttons[18].push(new ButtonInfo({ buttonText: "Jumpscare Target", keepOn: false, method: () => {
        const p = getTargetPlayer();
        if (!p) { notify("pick a target", 2); return; }
        const name = photonPlayerName(p);
        sendRPCToPlayer("TrollManager", "JumpscarePlayerRPC", p, Il2Cpp.string(name));
    }}));
    buttons[18].push(new ButtonInfo({ buttonText: "Missile Here", keepOn: false, method: () => {
        try {
            const pos = rightHandTransform.method("get_position").invoke();
            sendRPCAll("TrollManager", "MissleRPC", pos);
        } catch (_) { notify("missile failed", 2); }
    }}));
    buttons[18].push(new ButtonInfo({ buttonText: "TP Target To Me", keepOn: false, method: () => {
        try {
            const pos = GTPlayer.method("get_transform").invoke().method("get_position").invoke();
            sendRPCToPlayer("TrollManager", "TeleportSelfRPC", getTargetPlayer(), pos);
        } catch (e) { notify("tp failed", 2); console.log("[Xra] tp: " + e); }
    }}));

    // Broadcast to everyone
    buttons[18].push(new ButtonInfo({ buttonText: ">> ALL PLAYERS <<", keepOn: false, method: () => {} }));
    buttons[18].push(new ButtonInfo({ buttonText: "Freeze All", keepOn: false, method: () => trollToAll("FreezeRPC") }));
    buttons[18].push(new ButtonInfo({ buttonText: "Blind All", keepOn: false, method: () => trollToAll("BlindRPC") }));
    buttons[18].push(new ButtonInfo({ buttonText: "High All", keepOn: false, method: () => trollToAll("HighRPC") }));
    buttons[18].push(new ButtonInfo({ buttonText: "Fling All", keepOn: false, method: () => trollToAll("FlingPlayerRPC") }));
    buttons[18].push(new ButtonInfo({ buttonText: "ZeroGrav All", keepOn: false, method: () => trollToAll("ZeroGravRPC") }));

    // Kick Manager [20]
    buttons[20].push(new ButtonInfo({ buttonText: "Back", method: () => goTo(18), keepOn: false }));
    buttons[20].push(new ButtonInfo({ buttonText: "Set Master", keepOn: false, method: () => claimMaster() }));
    buttons[20].push(new ButtonInfo({ buttonText: ">> TARGET <<", keepOn: false, method: () => notify(`target: ${getTargetName()}`, 3) }));
    buttons[20].push(new ButtonInfo({ buttonText: "Kick Target", keepOn: false, method: () => {
        const p = getTargetPlayer();
        if (!p) { notify("pick a target", 2); return; }
        const name = photonPlayerName(p);
        sendRPCToPlayer("KickManager", "Kick", p, Il2Cpp.string(name));
    }}));
    buttons[20].push(new ButtonInfo({ buttonText: "Ban Target", keepOn: false, method: () => {
        const p = getTargetPlayer();
        if (!p) { notify("pick a target", 2); return; }
        const name = photonPlayerName(p);
        sendRPCToPlayer("KickManager", "Ban", p, Il2Cpp.string(name));
    }}));
    buttons[20].push(new ButtonInfo({ buttonText: "Mute Target", keepOn: false, method: () => {
        const p = getTargetPlayer();
        if (!p) { notify("pick a target", 2); return; }
        sendRPCToPlayer("KickManager", "MutePlayerRPC", p, Il2Cpp.string(photonPlayerName(p)), boxInt(1));
    }}));
    buttons[20].push(new ButtonInfo({ buttonText: "Unmute Target", keepOn: false, method: () => {
        const p = getTargetPlayer();
        if (!p) { notify("pick a target", 2); return; }
        sendRPCToPlayer("KickManager", "UnmutePlayerRPC", p, Il2Cpp.string(photonPlayerName(p)), boxInt(0));
    }}));
    buttons[20].push(new ButtonInfo({ buttonText: "Explode Target", keepOn: false, method: () => {
        const p = getTargetPlayer();
        if (!p) { notify("pick a target", 2); return; }
        const actorNr = getTargetActorNr();
        sendRPCToPlayer("KickManager", "StartIdenEXPLODERPC", p, boxInt(actorNr), Il2Cpp.string(photonPlayerName(p)));
    }}));
    buttons[20].push(new ButtonInfo({ buttonText: "TP Target Here", keepOn: false, method: () => {
        try {
            const pos = GTPlayer.method("get_transform").invoke().method("get_position").invoke();
            sendRPCToPlayer("KickManager", "TeleportSelfRPC", getTargetPlayer(), pos);
        } catch (e) { notify("tp failed", 2); }
    }}));
    buttons[20].push(new ButtonInfo({ buttonText: "Sound 1", keepOn: false, method: () => sendRPCAll("KickManager", "Sound", boxInt(0), boxInt(1)) }));
    buttons[20].push(new ButtonInfo({ buttonText: "Sound 2", keepOn: false, method: () => sendRPCAll("KickManager", "Sound", boxInt(1), boxInt(1)) }));
    buttons[20].push(new ButtonInfo({ buttonText: "Sound 3", keepOn: false, method: () => sendRPCAll("KickManager", "Sound", boxInt(2), boxInt(1)) }));
    buttons[20].push(new ButtonInfo({ buttonText: "Stop Sounds", keepOn: false, method: () => sendRPCAll("KickManager", "StopSounds", boxInt(0)) }));
    buttons[20].push(new ButtonInfo({ buttonText: "End Sound", keepOn: false, method: () => sendRPCAll("KickManager", "EndSound") }));

    // ───────────────────────────────────────────────────── dynamic pages
    function buildCosmeticButtons(): ButtonInfo[] {
        const out: ButtonInfo[] = [new ButtonInfo({ buttonText: "Back", method: () => goTo(7), keepOn: false })];
        const ids = cosmeticsForSlot(cosmeticSlot);
        for (const id of ids) {
            out.push(new ButtonInfo({
                buttonText: id,
                keepOn: false,
                method: () => { setCosmetic(cosmeticSlot, id); notify(`${COSMETIC_SLOTS[cosmeticSlot]}: ${id}`, 3); },
            }));
        }
        if (ids.length === 0) out.push(new ButtonInfo({ buttonText: "none for this slot", keepOn: false }));
        return out;
    }

    function buildPlayerButtons(): ButtonInfo[] {
        const out: ButtonInfo[] = [new ButtonInfo({ buttonText: "Back", method: () => goTo(8), keepOn: false })];
        for (const p of findAll(PhotonVRPlayer)) {
            if (isLocal(p)) continue;
            const label = playerName(p);
            out.push(new ButtonInfo({
                buttonText: `TP: ${label}`,
                keepOn: false,
                tooltip: `teleport next to ${label}`,
                method: () => {
                    const pos = playerHeadPos(p);
                    if (!pos) { notify("they left already", 2.5); return; }
                    const [x, y, z] = vec(pos);
                    teleportTo([x + 1.0, y, z]);
                    notify(`warped to ${label}`, 3);
                },
            }));
            out.push(new ButtonInfo({
                buttonText: `Kick: ${label}`,
                keepOn: false,
                tooltip: `boot ${label} from the room`,
                method: () => {
                    const owner = ownerOf(p);
                    if (!owner) { notify("can't resolve them", 2.5); return; }
                    if (kickPhotonPlayer(owner)) { try { sendAllOutgoing(); } catch (_) {} notify(`kicked ${label}`, 3); }
                },
            }));
        }
        if (out.length === 1) out.push(new ButtonInfo({ buttonText: "nobody here :(", keepOn: false }));
        return out;
    }

    const dynamicCats: { [k: number]: () => ButtonInfo[] } = {
        12: buildCosmeticButtons,
        13: buildPlayerButtons,
    };

    let dynamicCache: ButtonInfo[] = [];
    let dynamicCacheCat = -1;

    function currentSource(): ButtonInfo[] {
        const dyn = dynamicCats[currentCategory];
        if (dyn) {
            if (dynamicCacheCat !== currentCategory) {
                try { dynamicCache = dyn(); } catch (_) { dynamicCache = []; }
                dynamicCacheCat = currentCategory;
            }
            return dynamicCache;
        }
        dynamicCacheCat = -1;
        return buttons[currentCategory] || [];
    }

    // Lookup for the trigger hook — static categories plus whatever page is live
    function getIndex(buttonText: string): ButtonInfo | undefined {
        const src = currentSource();
        for (const b of src) if (b.buttonText === buttonText) return b;
        for (const b of buttons[1]) if (b.buttonText === buttonText) return b;
        for (const cat of buttons) for (const b of cat) if (b.buttonText === buttonText) return b;
        return undefined;
    }

    // ───────────────────────────────────────────────────── menu build
    function renderMenu() {
        menu = createObject(zeroVector, identityQuaternion, [0.1, 0.3, 0.3825], 3, [0, 0, 0, 0]);
        Destroy(getComponent(menu, BoxCollider));

        const menuBackground = createObject([0.1, 0, 0], identityQuaternion, [0.1, 0.86, 0.7], 3, bgColor, getTransform(menu), menuCornerRadius([0.1, 0.86, 0.7]));
        Destroy(getComponent(menuBackground, BoxCollider));
        menuBgRenderer = getComponent(menuBackground, Renderer);

        const menuBackground2 = createObject([0.1, 0, 0], identityQuaternion, [0.09, 0.88, 0.72], 3, bgColor2, getTransform(menu), menuCornerRadius([0.09, 0.88, 0.72]));
        Destroy(getComponent(menuBackground2, BoxCollider));
        menuBg2Renderer = getComponent(menuBackground2, Renderer);

        const canvasObject = createObject(zeroVector, identityQuaternion, oneVector, 3, [0, 0, 0, 0], getTransform(menu));
        const canvas = addComponent(canvasObject, Canvas);
        Destroy(getComponent(canvasObject, BoxCollider));
        const canvasScaler = addComponent(canvasObject, CanvasScaler);
        try { addComponent(canvasObject, GraphicRaycaster); } catch (_) {}
        canvas.method("set_renderMode").invoke(2);
        canvasScaler.method("set_dynamicPixelsPerUnit").invoke(1000.0);

        const chromeButton = (label: string, z: number) => {
            const b = createObject([0.1, z, 0.205], identityQuaternion, [0.09, 0.2682, 0.075], 3, buttonColor, getTransform(menu), menuCornerRadius([0.09, 0.2682, 0.075]));
            createObject([0.1, z, 0.205], identityQuaternion, [0.08, 0.3, 0.1], 3, bgColor2, getTransform(menu), menuCornerRadius([0.08, 0.3, 0.1]));
            b.method("set_name").invoke(Il2Cpp.string("@" + label));
            if (ButtonBehaviour) addComponent(b, ButtonBehaviour);
            try { getComponent(b, BoxCollider).method("set_isTrigger").invoke(true); } catch (_) {}
            renderMenuText(canvasObject, label, textColor, [0.105, z, 0.205], [0.15, 0.15]);
        };
        chromeButton("Home", -0.06);
        chromeButton("Leave", 0.06);

        const pageCount = Math.max(1, Math.ceil(currentSource().length / 6));
        renderMenuText(
            canvasObject,
            `${gradientText(menuName, textColor, buttonPressedColor)} [ ${currentPage + 1}/${pageCount} ]`,
            textColor,
            [0.11, 0, 0.155],
            [1, 0.08],
            { render: (phase) => `${animatedGradientText(menuName, textColor, buttonPressedColor, phase)} [ ${currentPage + 1}/${pageCount} ]` }
        );

        // Tooltip line — shows live state for the pages that build up a string
        let tooltipText = "";
        if (currentCategory === 5) {
            tooltipText = `letter <b>${NAME_ALPHABET[nameLetterIndex]}</b>  |  ${nameBuffer || "(empty)"}`;
        } else if (currentCategory === 7 || currentCategory === 12) {
            tooltipText = `slot: ${COSMETIC_SLOTS[cosmeticSlot]} (${cosmeticsForSlot(cosmeticSlot).length})`;
        } else if (currentCategory === 14) {
            tooltipText = `code: ${roomCodeBuffer || "(empty)"}`;
        } else if (currentCategory === 4 || currentCategory === 15) {
            tooltipText = `prefab: ${selectedPrefab()}`;
        } else if (Date.now() < tooltipResetTime && currentTooltip !== "") {
            tooltipText = currentTooltip;
        }
        if (tooltipText) {
            const [r, g, b] = buttonPressedColor;
            tooltipText = `<color=#${toHexByte(r)}${toHexByte(g)}${toHexByte(b)}>${tooltipText}</color>`;
        }
        renderMenuText(canvasObject, tooltipText, textColor, [0.11, 0, 0.133], [1, 0.065]);

        for (const [label, y] of [["PreviousPage", 0.17], ["NextPage", -0.17]] as Array<[string, number]>) {
            const pageButton = createObject([0.1, y, 0], identityQuaternion, [0.09, 0.15, 0.58], 3, buttonColor, getTransform(menu), menuCornerRadius([0.09, 0.15, 0.58]));
            createObject([0.1, y, 0], identityQuaternion, [0.08, 0.16, 0.59], 3, bgColor2, getTransform(menu), menuCornerRadius([0.08, 0.16, 0.59]));
            pageButton.method("set_name").invoke(Il2Cpp.string("@" + label));
            if (ButtonBehaviour) addComponent(pageButton, ButtonBehaviour);
            try { getComponent(pageButton, BoxCollider).method("set_isTrigger").invoke(true); } catch (_) {}
            renderMenuText(canvasObject, label === "NextPage" ? ">" : "<", textColor, [0.11, y, 0], [1, 0.1]);
        }

        let i = 0;
        currentSource().slice(currentPage * 6).slice(0, 6).forEach((buttonData) => {
            const zc = 0.09 - i * 0.04;
            const button = createObject([0.105, 0, zc], identityQuaternion, [0.09, 0.81, 0.03], 3, buttonColor, getTransform(menu));
            const edge1 = createObject([0.105, 0, zc + 0.01], identityQuaternion, [0.09, 0.77, 0.03], 3, buttonColor, getTransform(menu));
            const edge2 = createObject([0.105, 0, zc - 0.01], identityQuaternion, [0.09, 0.77, 0.03], 3, buttonColor, getTransform(menu));
            const c1 = createObject([0.1045, 0.115, zc - 0.008], [0.0, 0, 0.7071, 0.7071], [0.025, 0.025, 0.04], 2, buttonColor, getTransform(menu));
            const c2 = createObject([0.1045, 0.115, zc + 0.008], [0.0, 0, 0.7071, 0.7071], [0.025, 0.025, 0.04], 2, buttonColor, getTransform(menu));
            const c3 = createObject([0.1045, -0.115, zc + 0.008], [0.0, 0, 0.7071, 0.7071], [0.025, 0.025, 0.04], 2, buttonColor, getTransform(menu));
            const c4 = createObject([0.1045, -0.115, zc - 0.008], [0.0, 0, 0.7071, 0.7071], [0.025, 0.025, 0.04], 2, buttonColor, getTransform(menu));
            for (const cc of [edge1, edge2, c1, c2, c3, c4]) {
                try { getComponent(cc, Collider).method("set_isTrigger").invoke(true); } catch (_) {}
            }
            button.method("set_name").invoke(Il2Cpp.string("@" + buttonData.buttonText));
            if (ButtonBehaviour) addComponent(button, ButtonBehaviour);
            try { getComponent(button, BoxCollider).method("set_isTrigger").invoke(true); } catch (_) {}
            renderMenuText(
                canvasObject,
                gradientText(buttonData.buttonText, textColor, buttonPressedColor),
                textColor,
                [0.11, 0, zc],
                [1, 0.1],
                canGradient(buttonData.buttonText) ? { render: (phase) => animatedGradientText(buttonData.buttonText, textColor, buttonPressedColor, phase) } : null
            );
            for (const part of [button, edge1, edge2, c1, c2, c3, c4]) updateButtonColor(part, buttonData);
            i++;
        });

        recenterMenu();
    }

    function renderReference() {
        reference = createObject(zeroVector, identityQuaternion, [0.01, 0.01, 0.01], 0, buttonPressedColor, rightHandTransform);
        referenceCollider = getComponent(reference, Collider);
        getTransform(reference).method("set_localPosition").invoke([0.01, 0, 0.2]);
        try { reference.method("set_layer").invoke(2); } catch (_) {}
        try { addComponent(reference, Rigidbody).method("set_isKinematic").invoke(true); } catch (_) {}
    }

    // ───────────────────────────────────────────────────── press handling
    if (ButtonBehaviour) {
        try {
            const ButtonActivation = ButtonBehaviour.method("OnTriggerEnter");
            ButtonActivation.implementation = function (collider: any) {
                try {
                    const rawName = this.method("get_name").invoke().toString();
                    if (rawName.length > 2 && rawName[1] == "@") {
                        if (referenceCollider && collider.handle.equals(referenceCollider.handle)) {
                            const goName = rawName.substring(2, rawName.length - 1);
                            const _time = Time.method("get_time").invoke() as number;
                            if (_time > buttonClickDelay) {
                                buttonClickDelay = _time + 0.25;
                                const button = getIndex(goName);
                                if (button) {
                                    if (button.tooltip) setTooltip(button.tooltip, 4);
                                    if (button.keepOn) {
                                        button.enabled = !button.enabled;
                                        try { (button.enabled ? button.enableMethod : button.disableMethod)?.(); }
                                        catch (e) { console.log("[Xra] toggle " + goName + ": " + e); }
                                    } else {
                                        try { button.method?.(); } catch (e) { console.log("[Xra] press " + goName + ": " + e); }
                                    }
                                    reloadMenu();
                                }
                            }
                        }
                        return;
                    }
                } catch (e) { console.log("[Xra] OnTriggerEnter: " + e); }
                return this.method("OnTriggerEnter").invoke(collider);
            };
            console.log("[Xra] button hook installed on " + ButtonBehaviour.name);
        } catch (e) { console.log("[Xra] button hook failed: " + e); }
    }

    // ───────────────────────────────────────────────────── scene recovery
    function reacquireRefs(): boolean {
        try {
            const newGT = GTPlayerClass.method("get_Instance").invoke();
            if (!newGT || newGT.isNull()) return false;
            let lh = null, rh = null, hc = null;
            try { lh = newGT.field("leftHandTransform").value; } catch (_) {}
            try { rh = newGT.field("rightHandTransform").value; } catch (_) {}
            try { hc = newGT.field("headCollider").value; } catch (_) {}
            if (!lh || lh.isNull()) return false;

            GTPlayer = newGT;
            leftHandTransform = lh;
            if (rh && !rh.isNull()) rightHandTransform = rh;
            if (hc && !hc.isNull()) headCollider = hc;
            rigidbody = findRigidbody();
            savedLocomotionMask = null;
            try { PlayerUpdate = GTPlayer.method("Update"); } catch (_) {}

            try { if (menu != null) { Destroy(menu); menu = null; } } catch (_) { menu = null; }
            try { if (reference != null) { Destroy(reference); reference = null; } } catch (_) { reference = null; }
            animatedMenuTexts.length = 0;
            roundedMeshCache.clear();
            clearEsp();
            cosmeticsBySlot = [];
            dynamicCacheCat = -1;
            notifSlots.length = 0;
            notifSlotsReady = false;
            clearTempObjects();
            clearLocalSpawns();
            netSpawned.length = 0;
            prefabCache.clear();
            console.log("[Xra] refs re-acquired");
            return true;
        } catch (e) { console.log("[Xra] reacquire: " + e); return false; }
    }

    // ───────────────────────────────────────────────────── frame loop
    // Must be bound to the live instance — an unbound class method can't be invoked.
    let PlayerUpdate = GTPlayer.method("Update");

    PlayerUpdate.implementation = function () {
        if (!sceneReady) {
            try {
                const _t = Time.method("get_time").invoke() as number;
                if (_t < sceneRecheckDelay) return PlayerUpdate.invoke();
                sceneRecheckDelay = _t + 0.5;
            } catch (_) { return PlayerUpdate.invoke(); }
            if (reacquireRefs()) { sceneReady = true; console.log("[Xra] scene recovered"); }
            return PlayerUpdate.invoke();
        }

        try {
            const _chk = GTPlayerClass.method("get_Instance").invoke();
            const _dead = !_chk || _chk.isNull();
            const _swap = !_dead && (GTPlayer == null || !GTPlayer.handle.equals(_chk.handle));
            if (_dead || _swap) {
                sceneReady = false;
                try { sceneRecheckDelay = (Time.method("get_time").invoke() as number) + (_swap ? 0.25 : 1.5); } catch (_) {}
                try { if (menu != null) { Destroy(menu); menu = null; } } catch (_) { menu = null; }
                animatedMenuTexts.length = 0;
                return PlayerUpdate.invoke();
            }
        } catch (_) { sceneReady = false; return PlayerUpdate.invoke(); }

        try {
            initNotifSlots();
            OVRInputHandler.update();
            updateLongArms();

            leftPrimary = OVRInputHandler.leftControllerPrimaryButton;
            leftSecondary = OVRInputHandler.leftControllerSecondaryButton;
            rightPrimary = OVRInputHandler.rightControllerPrimaryButton;
            rightSecondary = OVRInputHandler.rightControllerSecondaryButton;
            leftGrab = OVRInputHandler.leftGrab;
            rightGrab = OVRInputHandler.rightGrab;
            leftTrigger = OVRInputHandler.leftControllerTriggerButton;
            rightTrigger = OVRInputHandler.rightControllerTriggerButton;

            deltaTime = Time.method("get_deltaTime").invoke() as number;
            time = Time.method("get_time").invoke() as number;
            updateAnimatedMenuText();

            if (leftSecondary) {
                if (menu != null && currentTooltip !== "" && Date.now() >= tooltipResetTime) {
                    currentTooltip = "";
                    reloadMenu();
                }
                if (menu == null) renderMenu(); else recenterMenu();
            } else if (menu != null) {
                Destroy(menu);
                menu = null;
                animatedMenuTexts.length = 0;
            }

            if (menu == null) {
                if (reference != null) { Destroy(reference); reference = null; }
            } else if (reference == null) {
                renderReference();
            }

            // Run every enabled toggle
            for (const cat of buttons) {
                for (const button of cat) {
                    if (!button.enabled || !button.method) continue;
                    try { button.method(); } catch (e) { console.log(`[Xra] '${button.buttonText}': ${e}`); }
                }
            }

            reapTempObjects();

            // Hide expired HUD lines
            const nowHide = Date.now();
            for (const slot of notifSlots) {
                if (slot.go != null && slot.expiry > 0 && nowHide > slot.expiry) {
                    try { slot.go.method("SetActive").invoke(false); } catch (_) {}
                }
            }

            // Deferred rejoin after a room hop
            if (pendingRejoinAt > 0 && Date.now() > pendingRejoinAt) {
                pendingRejoinAt = 0;
                joinRandom();
            }

            // Unicorn RGB theme animates the panels live
            if (themeIndex === RGB_THEME_INDEX && menu != null) {
                // Strobe fast and push into HDR so the panels flare.
                hue = (hue + 9) % 360;
                try {
                    if (menuBgRenderer != null) {
                        try { setMaterialColour(menuBgRenderer, neonFromHue(hue, 3.0)); } catch (_) { menuBgRenderer = null; }
                    }
                    if (menuBg2Renderer != null) {
                        try { setMaterialColour(menuBg2Renderer, neonFromHue((hue + 40) % 360, 1.6)); } catch (_) { menuBg2Renderer = null; }
                    }
                } catch (_) {}
            }
        } catch (e) {
            console.log("[Xra] tick error: " + e);
        }

        return PlayerUpdate.invoke();
    };

    console.log("[Xra] loaded — hold Y on the left controller to open :3");
});
