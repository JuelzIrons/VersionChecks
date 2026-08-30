📦
46046 /Scratchpad/test_hook_lethalape.js
32246 /Scratchpad/test_hook_lethalape.js.map
✄
// Scratchpad/test_hook_lethalape.ts
var XRInputHandler = class {
  InputDevices;
  tryGetFeatureValue;
  buttonStates;
  constructor() {
    this.InputDevices = Il2Cpp.domain.assembly("UnityEngine.XRModule").image.class("UnityEngine.XR.InputDevices");
    this.tryGetFeatureValue = this.InputDevices.method("TryGetFeatureValue_bool", 3);
    this.buttonStates = /* @__PURE__ */ new Map();
  }
  update() {
    this.updateControllerStates(1);
    this.updateControllerStates(2);
  }
  updateControllerStates(id) {
    for (const f of ["PrimaryButton", "SecondaryButton", "GripButton", "TriggerButton"]) {
      this.buttonStates.set(`${id}_${f}`, this.getButtonState(id, f));
    }
  }
  getButtonState(deviceId, featureName) {
    try {
      const valuePtr = Il2Cpp.alloc(1);
      const success = this.tryGetFeatureValue.invoke(uint64(deviceId), Il2Cpp.string(featureName), valuePtr);
      if (success)
        return valuePtr.readU8() !== 0;
    } catch (_) {
    }
    return false;
  }
  isButtonPressed(id, f) {
    return this.buttonStates.get(`${id}_${f}`) || false;
  }
  get leftSecondary() {
    return this.isButtonPressed(1, "SecondaryButton");
  }
  get rightPrimary() {
    return this.isButtonPressed(2, "PrimaryButton");
  }
  get rightSecondary() {
    return this.isButtonPressed(2, "SecondaryButton");
  }
  get leftGrab() {
    return this.isButtonPressed(1, "GripButton");
  }
  get rightGrab() {
    return this.isButtonPressed(2, "GripButton");
  }
  get leftTrigger() {
    return this.isButtonPressed(1, "TriggerButton");
  }
  get rightTrigger() {
    return this.isButtonPressed(2, "TriggerButton");
  }
};
Il2Cpp.perform(() => {
  const ASM = Il2Cpp.domain.assembly("Assembly-CSharp").image;
  const UCore = Il2Cpp.domain.assembly("UnityEngine.CoreModule").image;
  const UPhys = Il2Cpp.domain.assembly("UnityEngine.PhysicsModule").image;
  const TMPAssembly = Il2Cpp.domain.assembly("Unity.TextMeshPro").image;
  const Time = UCore.class("UnityEngine.Time");
  const GameObject = UCore.class("UnityEngine.GameObject");
  const UObject = UCore.class("UnityEngine.Object");
  const Vector3 = UCore.class("UnityEngine.Vector3");
  const Quaternion = UCore.class("UnityEngine.Quaternion");
  const Renderer = UCore.class("UnityEngine.Renderer");
  const Shader = UCore.class("UnityEngine.Shader");
  const BoxCollider = UPhys.class("UnityEngine.BoxCollider");
  const Rigidbody = UPhys.class("UnityEngine.Rigidbody");
  const RectTransform = UCore.class("UnityEngine.RectTransform");
  const TextMeshPro = TMPAssembly.class("TMPro.TextMeshPro");
  const Application = UCore.class("UnityEngine.Application");
  const LineRenderer = UCore.class("UnityEngine.LineRenderer");
  const ModsClass = ASM.class("Mods");
  const GTPlayerClass = ASM.class("GorillaLocomotion.Player");
  let XeraNetManagerClass = null;
  let WardrobeManagerClass = null;
  let PhotonNetwork = null;
  let PhotonView = null;
  let XeraNetPlayerClass = null;
  let PlayerHealthClass = null;
  let GTPlayerClass2 = null;
  let ScrapManagerClass = null;
  let DoorManagerClass = null;
  let BTMGameManagerClass = null;
  try {
    XeraNetManagerClass = ASM.class("LethalApeR.Networking.XeraNetworkingManager");
  } catch (_) {
  }
  try {
    WardrobeManagerClass = ASM.class("LethalApeR.PlayFab.WardrobeManager");
  } catch (_) {
  }
  try {
    PhotonNetwork = Il2Cpp.domain.assembly("PhotonUnityNetworking").image.class("Photon.Pun.PhotonNetwork");
  } catch (_) {
  }
  try {
    PhotonView = Il2Cpp.domain.assembly("PhotonUnityNetworking").image.class("Photon.Pun.PhotonView");
  } catch (_) {
  }
  try {
    XeraNetPlayerClass = ASM.class("LethalApeR.Networking.XeraNetworkingPlayer");
  } catch (_) {
  }
  try {
    PlayerHealthClass = ASM.class("LethalApeR.Rivals.Combat.PlayerHealth");
  } catch (_) {
  }
  try {
    GTPlayerClass2 = ASM.class("GorillaLocomotion.Player");
  } catch (_) {
  }
  try {
    ScrapManagerClass = ASM.class("LethalApeR.Gameplay.Scrap.ScrapManager");
  } catch (_) {
  }
  try {
    DoorManagerClass = ASM.class("LethalApeR.DoorManager");
  } catch (_) {
  }
  try {
    BTMGameManagerClass = ASM.class("LethalApeR.Gameplay.BeTheMonster.BTMGameManager");
  } catch (_) {
  }
  const FAKE_ID = "xera-" + Array.from({ length: 16 }, () => Math.floor(Math.random() * 16).toString(16)).join("");
  console.log("[Xra] spoofed customId: " + FAKE_ID);
  try {
    const LoadingPFM = ASM.class("LethalApeR.PlayFab.LoadingPlayFabManager");
    LoadingPFM.method("ResolveCustomId").implementation = function() {
      return Il2Cpp.string(FAKE_ID);
    };
    LoadingPFM.method("get_BannedAtLogin").implementation = function() {
      return 0;
    };
    console.log("[Xra] LoadingPlayFabManager patched");
  } catch (e) {
    console.log("[Xra] LoadingPFM patch failed: " + e);
  }
  try {
    const PlayFabMgr = ASM.class("LethalApeR.PlayFab.PlayFabManager");
    PlayFabMgr.method("ResolvePlayFabCustomId").implementation = function() {
      return Il2Cpp.string(FAKE_ID);
    };
    PlayFabMgr.method("HandleBanned").implementation = function() {
    };
    PlayFabMgr.method("get_IsBanned").implementation = function() {
      return 0;
    };
    console.log("[Xra] PlayFabManager ban bypass patched");
  } catch (e) {
    console.log("[Xra] PlayFabMgr ban patch failed: " + e);
  }
  try {
    const LocalProfMgr = ASM.class("LethalApeR.PlayFab.LocalProfileManager");
    LocalProfMgr.method("CheckBanStatus").implementation = function(_u, _d, callback) {
      try {
        callback.method("Invoke").invoke(false);
      } catch (_) {
      }
    };
    LocalProfMgr.method("get_IsBanned").implementation = function() {
      return 0;
    };
    console.log("[Xra] LocalProfileManager ban bypass patched");
  } catch (e) {
    console.log("[Xra] LocalProfMgr ban patch failed: " + e);
  }
  function xnpIsMine(self) {
    try {
      const go = self.method("get_gameObject").invoke();
      const pv = getComponent(go, PhotonView);
      return pv && !pv.isNull() && pv.method("get_IsMine").invoke();
    } catch (_) {
      return false;
    }
  }
  try {
    const XNP = ASM.class("LethalApeR.Networking.XeraNetworkingPlayer");
    const kickOrig = new NativeFunction(XNP.method("RPC_HammerKickQuit").virtualAddress, "void", ["pointer"]);
    const tpPosOrig = new NativeFunction(XNP.method("RPC_TeleportToPosition").virtualAddress, "void", ["pointer", "float", "float", "float"]);
    const tpSpawnOrig = new NativeFunction(XNP.method("RPC_TeleportToSpawn").virtualAddress, "void", ["pointer"]);
    const grabOrig = new NativeFunction(XNP.method("RPC_GrabPlayer").virtualAddress, "void", ["pointer", "int", "bool"]);
    XNP.method("RPC_HammerKickQuit").implementation = function() {
      if (xnpIsMine(this))
        return;
      kickOrig(this.handle);
    };
    XNP.method("RPC_TeleportToPosition").implementation = function(x, y, z) {
      if (xnpIsMine(this))
        return;
      tpPosOrig(this.handle, x, y, z);
    };
    XNP.method("RPC_TeleportToSpawn").implementation = function() {
      if (xnpIsMine(this))
        return;
      tpSpawnOrig(this.handle);
    };
    XNP.method("RPC_GrabPlayer").implementation = function(grabberActorId, isLeftHand) {
      if (xnpIsMine(this))
        return;
      grabOrig(this.handle, grabberActorId, isLeftHand);
    };
    console.log("[Xra] RPC shield active");
  } catch (e) {
    console.log("[Xra] RPC shield failed: " + e);
  }
  try {
    const XeraNetPlayer = ASM.class("LethalApeR.Networking.XeraNetworkingPlayer");
    XeraNetPlayer.method("UpdateNameWithOculusInfo").implementation = function(_oculusUsername) {
    };
    console.log("[Xra] UpdateNameWithOculusInfo bypassed");
  } catch (e) {
    console.log("[Xra] username bypass failed: " + e);
  }
  try {
    const LocalProfileMgr = ASM.class("LethalApeR.PlayFab.LocalProfileManager");
    LocalProfileMgr.method("OwnsItem").implementation = function(_id) {
      return 1;
    };
    console.log("[Xra] LocalProfileManager.OwnsItem patched");
  } catch (e) {
    console.log("[Xra] LocalProfileMgr patch failed: " + e);
  }
  try {
    const PlayFabMgr = ASM.class("LethalApeR.PlayFab.PlayFabManager");
    PlayFabMgr.method("OwnsItem").implementation = function(_id) {
      return 1;
    };
    console.log("[Xra] PlayFabManager.OwnsItem patched");
  } catch (e) {
    console.log("[Xra] PlayFabMgr patch failed: " + e);
  }
  const zeroVector = Vector3.field("zeroVector").value;
  const oneVector = Vector3.field("oneVector").value;
  const identityQuaternion = Quaternion.field("identityQuaternion").value;
  let UberShader = null;
  for (const s of ["Universal Render Pipeline/Lit", "Universal Render Pipeline/Unlit", "Standard"]) {
    try {
      const f = Shader.method("Find").invoke(Il2Cpp.string(s));
      if (f && !f.isNull()) {
        UberShader = f;
        break;
      }
    } catch (_) {
    }
  }
  let tmpFont = null;
  try {
    const allTmp = UObject.method("FindObjectsOfType").inflate(TextMeshPro).invoke();
    for (let i = 0; i < allTmp.length; i++) {
      try {
        const f = allTmp.get(i).method("get_font").invoke();
        if (f && !f.isNull()) {
          tmpFont = f;
          break;
        }
      } catch (_) {
      }
    }
  } catch (_) {
  }
  function getComponent(obj, type) {
    return obj.method("GetComponent", 1).inflate(type).invoke();
  }
  function addComponent(obj, type) {
    return obj.method("AddComponent", 1).inflate(type).invoke();
  }
  function getTransform(obj) {
    return obj.method("get_transform").invoke();
  }
  function Destroy(o) {
    try {
      UObject.method("Destroy", 1).invoke(o);
    } catch (_) {
    }
  }
  function vec(v) {
    return [v.field("x").value, v.field("y").value, v.field("z").value];
  }
  function setMaterialColour(renderer, colorArr) {
    try {
      const mat = renderer.method("get_material").invoke();
      if (UberShader)
        mat.method("set_shader").invoke(UberShader);
      mat.method("set_color").invoke(colorArr);
      if (colorArr[0] > 1 || colorArr[1] > 1 || colorArr[2] > 1) {
        try {
          mat.method("EnableKeyword", 1).invoke(Il2Cpp.string("_EMISSION"));
        } catch (_) {
        }
        try {
          mat.method("SetColor", 2).invoke(Il2Cpp.string("_EmissionColor"), colorArr);
        } catch (_) {
        }
      }
    } catch (_) {
    }
  }
  function createPanel(parent, localPos, width, height, depth, color) {
    const obj = GameObject.method("CreatePrimitive").invoke(3);
    setMaterialColour(getComponent(obj, Renderer), color);
    const tf = getTransform(obj);
    if (parent)
      tf.method("SetParent", 2).invoke(parent, false);
    tf.method("set_localPosition").invoke(localPos);
    tf.method("set_localRotation").invoke(identityQuaternion);
    tf.method("set_localScale").invoke([depth, width, height]);
    return obj;
  }
  function createText(parent, text, localPos, fontSize, color, rectW = 10, rectH = 2) {
    const go = new Il2Cpp.Object(GameObject.alloc());
    go.method(".ctor", 1).invoke(Il2Cpp.string("T"));
    const tf = getTransform(go);
    tf.method("SetParent", 2).invoke(parent, false);
    tf.method("set_localPosition").invoke(localPos);
    tf.method("set_localRotation").invoke(Quaternion.method("Euler").invoke(0, 90, 90));
    const s = 0.04;
    tf.method("set_localScale").invoke([s, s, s]);
    const tmp = addComponent(go, TextMeshPro);
    tmp.method("set_text").invoke(Il2Cpp.string(text));
    if (tmpFont)
      tmp.method("set_font").invoke(tmpFont);
    tmp.method("set_fontSize").invoke(fontSize);
    tmp.method("set_color").invoke(color);
    tmp.method("set_alignment").invoke(514);
    tmp.method("set_enableWordWrapping").invoke(false);
    try {
      getComponent(go, RectTransform).method("set_sizeDelta").invoke([rectW, rectH]);
    } catch (_) {
    }
    return go;
  }
  let GTPlayer = null;
  let leftHandTransform = null;
  let rightHandTransform = null;
  let headCollider = null;
  let rigidbody = null;
  function ensurePlayer() {
    if (GTPlayer)
      return true;
    try {
      GTPlayer = GTPlayerClass.method("get_Instance").invoke();
    } catch (_) {
    }
    if (!GTPlayer || GTPlayer.isNull?.()) {
      GTPlayer = null;
      return false;
    }
    leftHandTransform = GTPlayer.field("leftHandTransform").value;
    rightHandTransform = GTPlayer.field("rightHandTransform").value;
    headCollider = GTPlayer.field("headCollider").value;
    try {
      rigidbody = getComponent(GTPlayer.method("get_gameObject").invoke(), Rigidbody);
    } catch (_) {
    }
    return true;
  }
  const input = new XRInputHandler();
  let time = 0;
  function findOne(cls) {
    if (!cls)
      return null;
    try {
      const arr = UObject.method("FindObjectsOfType").inflate(cls).invoke();
      for (let i = 0; i < arr.length; i++) {
        const o = arr.get(i);
        if (o && !o.isNull())
          return o;
      }
    } catch (_) {
    }
    return null;
  }
  function findAll(cls) {
    const out = [];
    if (!cls)
      return out;
    try {
      const arr = UObject.method("FindObjectsOfType").inflate(cls).invoke();
      for (let i = 0; i < arr.length; i++) {
        const o = arr.get(i);
        if (o && !o.isNull())
          out.push(o);
      }
    } catch (_) {
    }
    return out;
  }
  function xeraManager() {
    try {
      const m = XeraNetManagerClass?.method("get_Manager").invoke();
      return m && !m.isNull() ? m : null;
    } catch (_) {
      return null;
    }
  }
  function xeraLocalPlayer() {
    try {
      const m = xeraManager();
      if (!m)
        return null;
      const lp = m.field("LocalPlayer").value;
      return lp && !lp.isNull() ? lp : null;
    } catch (_) {
      return null;
    }
  }
  function xeraPlayers() {
    try {
      const m = xeraManager();
      if (!m)
        return [];
      const list = m.field("Players").value;
      if (!list || list.isNull())
        return [];
      const out = [];
      const c = list.method("get_Count").invoke();
      for (let i = 0; i < c; i++) {
        const p = list.method("get_Item").invoke(i);
        if (p && !p.isNull())
          out.push(p);
      }
      return out;
    } catch (_) {
      return [];
    }
  }
  function isXeraLocal(p) {
    try {
      const pv = getComponent(p, PhotonView);
      return pv && !pv.isNull() && pv.method("get_IsMine").invoke();
    } catch (_) {
      return false;
    }
  }
  function xeraPlayerName(p) {
    try {
      const n = p.field("lastUsername").value;
      return n ? n.toString().replace(/^"|"$/g, "") : "?";
    } catch (_) {
      return "?";
    }
  }
  function getOtherPlayers() {
    return xeraPlayers().filter((p) => !isXeraLocal(p));
  }
  function sendAllOutgoing() {
    try {
      PhotonNetwork?.method("SendAllOutgoingCommands").invoke();
    } catch (_) {
    }
  }
  function setUsername(name) {
    try {
      const m = xeraManager();
      if (!m || m.isNull() || m.handle.isNull())
        return;
      const lp = xeraLocalPlayer();
      if (!lp || lp.isNull() || lp.handle.isNull())
        return;
      XeraNetManagerClass.method("SetUsername", 1).invoke(Il2Cpp.string(name));
    } catch (_) {
    }
  }
  function setColour(r, g, b) {
    if (!xeraManager())
      return;
    try {
      XeraNetManagerClass.method("SetColour", 1).invoke([r, g, b, 1]);
    } catch (_) {
    }
  }
  function claimMaster() {
    try {
      if (!PhotonNetwork)
        return;
      PhotonNetwork.method("SetMasterClient").invoke(PhotonNetwork.method("get_LocalPlayer").invoke());
      sendAllOutgoing();
    } catch (_) {
    }
  }
  function leaveRoom() {
    try {
      PhotonNetwork?.method("LeaveRoom", 1).invoke(true);
    } catch (_) {
    }
  }
  function joinRandom() {
    try {
      const m = xeraManager();
      if (!m)
        return;
      XeraNetManagerClass.method("JoinRandomRoom", 2).invoke(m.field("DefaultQueue").value, 10);
    } catch (_) {
    }
  }
  function roomInfo() {
    try {
      if (!PhotonNetwork)
        return "no photon";
      const r = PhotonNetwork.method("get_CurrentRoom").invoke();
      if (!r || r.isNull())
        return "not in room";
      return r.method("get_Name").invoke().toString().replace(/^"|"$/g, "") + " " + r.method("get_PlayerCount").invoke() + "/" + r.method("get_MaxPlayers").invoke();
    } catch (_) {
      return "?";
    }
  }
  const objectArrayClass = Il2Cpp.corlib.class("System.Object");
  function sendRPCToXeraPlayer(target, rpcName, ...args) {
    try {
      const pv = getComponent(target, PhotonView);
      if (!pv || pv.isNull())
        return;
      const a = Il2Cpp.array(objectArrayClass, args.length);
      for (let i = 0; i < args.length; i++)
        a.set(i, args[i]);
      pv.method("RPC").overload("System.String", "Photon.Pun.RpcTarget", "System.Object[]").invoke(Il2Cpp.string(rpcName), 1, a);
      sendAllOutgoing();
    } catch (e) {
      console.log(`[Xra] RPC ${rpcName}: ${e}`);
    }
  }
  function kickXeraPlayer(t) {
    sendRPCToXeraPlayer(t, "RPC_HammerKickQuit");
  }
  function teleportXeraPlayer(t, x, y, z) {
    const fc = Il2Cpp.corlib.class("System.Single");
    const bx = new Il2Cpp.Object(Il2Cpp.exports.valueTypeBox(fc, Il2Cpp.alloc(4).writeFloat(x)));
    const by = new Il2Cpp.Object(Il2Cpp.exports.valueTypeBox(fc, Il2Cpp.alloc(4).writeFloat(y)));
    const bz = new Il2Cpp.Object(Il2Cpp.exports.valueTypeBox(fc, Il2Cpp.alloc(4).writeFloat(z)));
    sendRPCToXeraPlayer(t, "RPC_TeleportToPosition", bx, by, bz);
  }
  let velSetter = null;
  let velGetter = null;
  function resolveVel() {
    if (velSetter)
      return;
    for (const n of ["set_linearVelocity", "set_velocity"]) {
      try {
        if (Rigidbody.tryMethod(n)) {
          velSetter = n;
          break;
        }
      } catch (_) {
      }
    }
    for (const n of ["get_linearVelocity", "get_velocity"]) {
      try {
        if (Rigidbody.tryMethod(n)) {
          velGetter = n;
          break;
        }
      } catch (_) {
      }
    }
  }
  function setVelocity(v) {
    resolveVel();
    if (rigidbody && velSetter)
      try {
        rigidbody.method(velSetter).invoke(v);
      } catch (_) {
      }
  }
  function getVelocity() {
    resolveVel();
    if (!rigidbody || !velGetter)
      return [0, 0, 0];
    try {
      return vec(rigidbody.method(velGetter).invoke());
    } catch (_) {
      return [0, 0, 0];
    }
  }
  function teleportTo(pos) {
    setVelocity(zeroVector);
    try {
      if (rigidbody)
        rigidbody.method("set_position").invoke(pos);
    } catch (_) {
    }
    try {
      getTransform(GTPlayer.method("get_gameObject").invoke()).method("set_position").invoke(pos);
    } catch (_) {
    }
  }
  function aimPosition(dist) {
    try {
      const o = rightHandTransform.method("get_position").invoke();
      const f = rightHandTransform.method("get_forward").invoke();
      return Vector3.method("op_Addition", 2).invoke(o, Vector3.method("op_Multiply", 2).invoke(f, dist));
    } catch (_) {
      return zeroVector;
    }
  }
  let notifSlots = [];
  let notifReady = false;
  function initNotifs() {
    if (notifReady)
      return;
    try {
      const headTf = getTransform(headCollider);
      for (let i = 0; i < 4; i++) {
        const go = new Il2Cpp.Object(GameObject.alloc());
        go.method(".ctor", 1).invoke(Il2Cpp.string("N"));
        const tf = getTransform(go);
        tf.method("SetParent", 2).invoke(headTf, false);
        tf.method("set_localPosition").invoke([0, 0.35 - i * 0.06, 0.7]);
        tf.method("set_localScale").invoke([0.015, 0.015, 0.015]);
        const tmp = addComponent(go, TextMeshPro);
        if (tmpFont)
          tmp.method("set_font").invoke(tmpFont);
        tmp.method("set_fontSize").invoke(6);
        tmp.method("set_color").invoke([1, 1, 1, 1]);
        tmp.method("set_alignment").invoke(514);
        tmp.method("set_enableWordWrapping").invoke(false);
        try {
          getComponent(go, RectTransform).method("set_sizeDelta").invoke([40, 4]);
        } catch (_) {
        }
        go.method("SetActive").invoke(false);
        notifSlots.push({ go, tmp, expiry: 0 });
      }
      notifReady = true;
    } catch (_) {
    }
  }
  function notify(text, dur = 2.5) {
    initNotifs();
    if (!notifReady)
      return;
    let slot = notifSlots.find((s) => Date.now() > s.expiry) || notifSlots.reduce((a, b) => a.expiry < b.expiry ? a : b);
    try {
      slot.tmp.method("set_text").invoke(Il2Cpp.string(`<color=red>></color> ${text}`));
      slot.go.method("SetActive").invoke(true);
      slot.expiry = Date.now() + dur * 1e3;
    } catch (_) {
    }
  }
  let savedMask = null;
  let prevNoclip = false;
  function setNoClip(on) {
    try {
      const mf = GTPlayer.field("locomotionEnabledLayers").value;
      if (on) {
        if (savedMask == null)
          savedMask = mf.field("m_Mask").value;
        mf.field("m_Mask").value = 0;
      } else if (savedMask != null)
        mf.field("m_Mask").value = savedMask;
    } catch (_) {
    }
    try {
      GTPlayer.field("headCollider").value.method("set_enabled").invoke(!on);
      GTPlayer.field("bodyCollider").value.method("set_enabled").invoke(!on);
    } catch (_) {
    }
  }
  let longArmsOn = false;
  let armMult = 1.4;
  function updateLongArms() {
    if (!longArmsOn)
      return;
    try {
      const anchor = getTransform(GTPlayer.method("get_gameObject").invoke()).method("get_position").invoke();
      for (const ht of [leftHandTransform, rightHandTransform]) {
        const [hx, hy, hz] = vec(ht.method("get_position").invoke());
        const [ax, ay, az] = vec(anchor);
        ht.method("set_position").invoke([ax + (hx - ax) * armMult, ay + (hy - ay) * armMult, az + (hz - az) * armMult]);
      }
    } catch (_) {
    }
  }
  let leftPlat = null, rightPlat = null;
  function doPlatforms() {
    if (input.leftGrab) {
      if (!leftPlat) {
        const p = Vector3.method("op_Addition", 2).invoke(leftHandTransform.method("get_position").invoke(), [0, -0.035, 0]);
        leftPlat = GameObject.method("CreatePrimitive").invoke(3);
        setMaterialColour(getComponent(leftPlat, Renderer), [5, 0.1, 0.1, 1]);
        getTransform(leftPlat).method("set_position").invoke(p);
        getTransform(leftPlat).method("set_rotation").invoke(leftHandTransform.method("get_rotation").invoke());
        getTransform(leftPlat).method("set_localScale").invoke([0.035, 0.15, 0.35]);
      }
    } else if (leftPlat) {
      Destroy(leftPlat);
      leftPlat = null;
    }
    if (input.rightGrab) {
      if (!rightPlat) {
        const p = Vector3.method("op_Addition", 2).invoke(rightHandTransform.method("get_position").invoke(), [0, -0.035, 0]);
        rightPlat = GameObject.method("CreatePrimitive").invoke(3);
        setMaterialColour(getComponent(rightPlat, Renderer), [5, 0.1, 0.1, 1]);
        getTransform(rightPlat).method("set_position").invoke(p);
        getTransform(rightPlat).method("set_rotation").invoke(rightHandTransform.method("get_rotation").invoke());
        getTransform(rightPlat).method("set_localScale").invoke([0.025, 0.15, 0.2]);
      }
    } else if (rightPlat) {
      Destroy(rightPlat);
      rightPlat = null;
    }
  }
  const espLines = /* @__PURE__ */ new Map();
  function clearEsp() {
    for (const [, l] of espLines) {
      try {
        Destroy(l.method("get_gameObject").invoke());
      } catch (_) {
      }
    }
    espLines.clear();
  }
  function updateEsp() {
    try {
      const from = getTransform(headCollider).method("get_position").invoke();
      const seen = /* @__PURE__ */ new Set();
      for (const p of xeraPlayers()) {
        if (isXeraLocal(p))
          continue;
        const key = p.handle.toString();
        seen.add(key);
        let to;
        try {
          to = getTransform(p.field("Head").value).method("get_position").invoke();
        } catch (_) {
          continue;
        }
        let line = espLines.get(key);
        if (!line || line.isNull?.()) {
          const go = new Il2Cpp.Object(GameObject.alloc());
          go.method(".ctor", 0).invoke();
          line = addComponent(go, LineRenderer);
          try {
            line.method("set_startWidth").invoke(0.012);
            line.method("set_endWidth").invoke(0.012);
            line.method("set_positionCount").invoke(2);
            line.method("set_useWorldSpace").invoke(true);
            if (UberShader)
              line.method("get_material").invoke().method("set_shader").invoke(UberShader);
          } catch (_) {
          }
          espLines.set(key, line);
        }
        try {
          line.method("SetPosition").invoke(0, from);
          line.method("SetPosition").invoke(1, to);
          line.method("get_material").invoke().method("set_color").invoke([5, 0.1, 0.1, 1]);
        } catch (_) {
        }
      }
      for (const [k, l] of Array.from(espLines.entries())) {
        if (!seen.has(k)) {
          try {
            Destroy(l.method("get_gameObject").invoke());
          } catch (_) {
          }
          espLines.delete(k);
        }
      }
    } catch (_) {
    }
  }
  const bgColor = [0.06, 0, 0, 1];
  const btnColor = [0.08, 0.02, 0.02, 1];
  const btnOnColor = [5, 0.1, 0.1, 1];
  const textCol = [1, 0.15, 0.15, 1];
  const menuW = 0.32;
  const itemH = 0.055;
  const itemSpacing = 0.01;
  const headerH = 0.06;
  const menuPad = 0.04;
  let currentCategory = 0;
  let currentPage = 0;
  let menuRoot = null;
  let buttonGOs = [];
  let flyspeed = 5;
  let prevJump = false;
  let pendingRejoinAt = 0;
  let targetIdx = 0;
  let clickDelay = 0;
  let nameSet = false;
  let lastNameSpoof = 0;
  let cosmeticsUnlocked = false;
  function btn(text, method, keepOn = false) {
    return { text, method, keepOn, enabled: false };
  }
  function toggle(text, enable, disable) {
    return { text, keepOn: true, enabled: false, enableMethod: enable, disableMethod: disable };
  }
  function goTo(cat) {
    currentCategory = cat;
    currentPage = 0;
    reloadMenu();
  }
  function reloadMenu() {
    if (menuRoot) {
      Destroy(menuRoot);
      menuRoot = null;
      buttonGOs = [];
    }
  }
  const buttons = [
    [
      btn("Movement", () => goTo(1)),
      btn("Cosmetics", () => goTo(2)),
      btn("Players", () => goTo(3)),
      btn("Name", () => goTo(4)),
      btn("Color", () => goTo(5)),
      btn("Trolls", () => goTo(6)),
      btn("Room", () => goTo(7)),
      btn("Self", () => goTo(10)),
      btn("GameMode", () => goTo(11)),
      btn("Scrap", () => goTo(12)),
      btn("Settings", () => goTo(8)),
      btn("Credits", () => goTo(9))
    ],
    [
      btn("Back", () => goTo(0)),
      { text: "Fly [B]", keepOn: true, enabled: false, method: () => {
        if (input.rightSecondary) {
          setVelocity(Vector3.method("op_Multiply", 2).invoke(rightHandTransform.method("get_forward").invoke(), flyspeed));
        }
      } },
      { text: "Platforms [G]", keepOn: true, enabled: false, method: () => doPlatforms() },
      { text: "No Clip [T]", keepOn: true, enabled: false, method: () => {
        if (input.rightTrigger && !prevNoclip)
          setNoClip(true);
        if (!input.rightTrigger && prevNoclip)
          setNoClip(false);
        prevNoclip = input.rightTrigger;
      }, disableMethod: () => {
        setNoClip(false);
        prevNoclip = false;
      } },
      { text: "Super Jump", keepOn: true, enabled: false, method: () => {
        if (input.rightTrigger && !prevJump)
          setVelocity([0, 22, 0]);
        prevJump = input.rightTrigger;
      } },
      { text: "Low Gravity", keepOn: true, enabled: false, method: () => {
        try {
          rigidbody?.method("set_useGravity").invoke(false);
        } catch (_) {
        }
        const [vx, vy, vz] = getVelocity();
        setVelocity([vx, Math.max(vy - 0.05, -2), vz]);
      }, disableMethod: () => {
        try {
          rigidbody?.method("set_useGravity").invoke(true);
        } catch (_) {
        }
      } },
      toggle("Long Arms", () => {
        longArmsOn = true;
      }, () => {
        longArmsOn = false;
      }),
      { text: "Speed Boost", keepOn: true, enabled: false, method: () => {
        try {
          GTPlayer.field("maxJumpSpeed").value = 29.5;
        } catch (_) {
        }
      } },
      btn("TP To Aim", () => teleportTo(aimPosition(15))),
      toggle("Player ESP", () => {
      }, () => clearEsp()),
      toggle("Ghost Monkey", () => {
        const lp = xeraLocalPlayer();
        if (lp)
          try {
            lp.method("set_canTrack").invoke(false);
          } catch (_) {
          }
        notify("ghost on", 2);
      }, () => {
        const lp = xeraLocalPlayer();
        if (lp)
          try {
            lp.method("set_canTrack").invoke(true);
          } catch (_) {
          }
        notify("ghost off", 2);
      }),
      toggle("RGB Monkey", () => {
        const lp = xeraLocalPlayer();
        if (lp)
          try {
            lp.method("SetRGBMonkey").invoke(true);
          } catch (_) {
          }
      }, () => {
        const lp = xeraLocalPlayer();
        if (lp)
          try {
            lp.method("SetRGBMonkey").invoke(false);
          } catch (_) {
          }
      })
    ],
    [
      btn("Back", () => goTo(0)),
      btn("Unlock All", () => {
        try {
          const wm = WardrobeManagerClass.field("Instance").value;
          if (!wm || wm.isNull()) {
            notify("no WardrobeManager", 3);
            return;
          }
          const pt = getTransform(wm.field("cosmeticsParent").value);
          const c = pt.method("get_childCount").invoke();
          const all = [];
          for (let i = 0; i < c; i++) {
            try {
              const g = pt.method("GetChild", 1).invoke(i).method("get_gameObject").invoke();
              if (g && !g.isNull())
                all.push(g);
            } catch (_) {
            }
          }
          for (const fn of ["ownedCosmetics", "ownedHeadCosmetic", "ownedFaceCosmetic", "ownedBodyCosmetic", "ownedHandCosmetic", "ownedEyeCosmetic", "ownedSkinCosmetic", "ownedNameTagCosmetic", "ownedMonsterSkinCosmetic", "ownedPlayerModelCosmetic"]) {
            try {
              const l = wm.field(fn).value;
              l.method("Clear").invoke();
              for (const g of all)
                try {
                  l.method("Add").invoke(g);
                } catch (_) {
                }
            } catch (_) {
            }
          }
          try {
            wm.method("UpdateCosmeticListForType").invoke();
          } catch (_) {
          }
          try {
            wm.method("RefreshCosmetics").invoke();
          } catch (_) {
          }
          notify(`unlocked ${all.length}`, 4);
        } catch (e) {
          notify("unlock failed: " + e, 3);
        }
      }),
      btn("Equip Next", () => {
        const wm = findOne(WardrobeManagerClass);
        if (wm)
          try {
            wm.method("ScrollCosmetic").invoke(true);
            wm.method("UseCosmetic").invoke(true);
          } catch (_) {
          }
      }),
      btn("Equip Prev", () => {
        const wm = findOne(WardrobeManagerClass);
        if (wm)
          try {
            wm.method("ScrollCosmetic").invoke(false);
            wm.method("UseCosmetic").invoke(true);
          } catch (_) {
          }
      }),
      btn("Unequip", () => {
        const wm = findOne(WardrobeManagerClass);
        if (wm)
          try {
            wm.method("UseCosmetic").invoke(false);
          } catch (_) {
          }
      }),
      btn("Type >>", () => {
        const wm = findOne(WardrobeManagerClass);
        if (wm)
          try {
            wm.method("SwitchCosmeticType").invoke(true);
          } catch (_) {
          }
      }),
      btn("Refresh", () => {
        const wm = findOne(WardrobeManagerClass);
        if (wm)
          try {
            wm.method("RefreshCosmetics").invoke();
          } catch (_) {
          }
      })
    ],
    [btn("Back", () => goTo(0))],
    // 3: Players (rebuilt dynamically in buildMenu)
    [
      btn("Back", () => goTo(0)),
      btn("XERA.LOL", () => {
        setUsername("<size=200%><color=red>XERA.LOL");
        notify("name set", 2);
      }),
      btn("XERA", () => {
        setUsername("<color=red>XERA");
      }),
      btn("0x11xera", () => {
        setUsername("<color=red>0x11xera");
      }),
      btn("NULL", () => setUsername("NULL")),
      btn("Ghost", () => setUsername(" "))
    ],
    [
      btn("Back", () => goTo(0)),
      btn("Red", () => setColour(1, 0, 0)),
      btn("Green", () => setColour(0, 1, 0)),
      btn("Blue", () => setColour(0, 0, 1)),
      btn("Yellow", () => setColour(1, 1, 0)),
      btn("Cyan", () => setColour(0, 1, 1)),
      btn("Pink", () => setColour(1, 0.4, 0.7)),
      btn("Orange", () => setColour(1, 0.5, 0)),
      btn("Purple", () => setColour(0.5, 0, 1)),
      btn("White", () => setColour(1, 1, 1)),
      btn("Black", () => setColour(0.05, 0.05, 0.05)),
      btn("Gold", () => setColour(1, 0.84, 0))
    ],
    [
      btn("Back", () => goTo(0)),
      btn("Claim Master", () => {
        claimMaster();
        notify("master", 2);
      }),
      btn("TP All Sky", () => {
        claimMaster();
        for (const p of getOtherPlayers())
          teleportXeraPlayer(p, 0, 500, 0);
        notify("sky'd", 2);
      }),
      btn("Kick All", () => {
        claimMaster();
        const o = getOtherPlayers();
        for (const p of o)
          kickXeraPlayer(p);
        notify(`kicked ${o.length}`, 3);
      }),
      btn("TP All Here", () => {
        claimMaster();
        const pos = vec(getTransform(GTPlayer.method("get_gameObject").invoke()).method("get_position").invoke());
        for (const p of getOtherPlayers())
          teleportXeraPlayer(p, pos[0], pos[1], pos[2]);
        notify("tp'd all", 2);
      })
    ],
    [
      btn("Back", () => goTo(0)),
      btn("Hop Server", () => {
        leaveRoom();
        pendingRejoinAt = Date.now() + 1200;
        notify("hopping...", 3);
      }),
      btn("Leave Room", () => {
        leaveRoom();
        notify("left", 2);
      }),
      btn("Room Info", () => notify(roomInfo(), 5)),
      btn("Join Random", () => {
        joinRandom();
        notify("joining...", 2);
      })
    ],
    [
      btn("Back", () => goTo(0)),
      btn("Fly Speed +", () => {
        flyspeed++;
        notify(`fly: ${flyspeed}`, 2);
      }),
      btn("Fly Speed -", () => {
        flyspeed = Math.max(1, flyspeed - 1);
        notify(`fly: ${flyspeed}`, 2);
      }),
      btn("Arm +", () => {
        armMult = Math.min(2.5, armMult + 0.1);
        notify(`arms: ${armMult.toFixed(1)}x`, 2);
      }),
      btn("Arm -", () => {
        armMult = Math.max(1, armMult - 0.1);
        notify(`arms: ${armMult.toFixed(1)}x`, 2);
      })
    ],
    [
      btn("Back", () => goTo(0)),
      btn("Xera", () => {
      }),
      btn("Joshua Walker", () => {
      }),
      btn("Discord", () => {
        try {
          Application.method("OpenURL", 1).invoke(Il2Cpp.string("https://discord.gg/hA6E8Cjt3w"));
        } catch (_) {
        }
      })
    ]
  ];
  function currentSource() {
    return buttons[currentCategory] || buttons[0];
  }
  function buildMenu() {
    buttons[3] = [btn("Back", () => goTo(0))];
    const others = getOtherPlayers();
    if (others.length > 0) {
      targetIdx = targetIdx % others.length;
      buttons[3].push(btn(`> ${xeraPlayerName(others[targetIdx])}`, () => {
        targetIdx = (targetIdx + 1) % others.length;
        reloadMenu();
      }));
      buttons[3].push(btn("Kick Target", () => {
        claimMaster();
        kickXeraPlayer(others[targetIdx % others.length]);
        notify("kicked", 2);
      }));
      buttons[3].push(btn("TP Here", () => {
        claimMaster();
        const p = vec(getTransform(GTPlayer.method("get_gameObject").invoke()).method("get_position").invoke());
        teleportXeraPlayer(others[targetIdx % others.length], p[0], p[1], p[2]);
      }));
      buttons[3].push(btn("TP Sky", () => {
        claimMaster();
        teleportXeraPlayer(others[targetIdx % others.length], 0, 500, 0);
      }));
    } else {
      buttons[3].push(btn("No players", () => {
      }));
    }
    const items = currentSource();
    const startIdx = currentPage * 6;
    const visible = items.slice(startIdx, startIdx + 6);
    const totalPages = Math.max(1, Math.ceil(items.length / 6));
    const totalH = headerH + menuPad * 2 + visible.length * (itemH + itemSpacing) + 0.04;
    menuRoot = new Il2Cpp.Object(GameObject.alloc());
    menuRoot.method(".ctor", 1).invoke(Il2Cpp.string("XeraMenu"));
    const rootTf = getTransform(menuRoot);
    const bg = createPanel(rootTf, [0, 0, 0], menuW, totalH, 0.012, bgColor);
    createText(rootTf, "0x11xera Frida 1.0r1", [-0.015, 0, totalH / 2 - headerH / 2 - 5e-3], 4, textCol, 18, 3);
    createText(rootTf, `${currentPage + 1}/${totalPages}`, [-0.015, 0, -totalH / 2 + 0.018], 2.5, [0.5, 0.5, 0.5, 1], 10, 2);
    buttonGOs = [];
    menuButtonMap.clear();
    const btnW = menuW - 0.04;
    const btnStartZ = totalH / 2 - headerH - menuPad;
    for (let i = 0; i < visible.length; i++) {
      const b = visible[i];
      const zOff = btnStartZ - i * (itemH + itemSpacing) - itemH / 2;
      const color = b.enabled ? btnOnColor : btnColor;
      const panel = createPanel(rootTf, [2e-3, 0, zOff], btnW, itemH, 0.014, color);
      const col = getComponent(panel, BoxCollider);
      col.method("set_isTrigger").invoke(true);
      if (baseBtnClass) {
        try {
          const bb = addComponent(panel, baseBtnClass);
          menuButtonMap.set(bb.handle.toString(), i);
        } catch (_) {
        }
      }
      const label = b.enabled ? `> ${b.text}` : b.text;
      createText(rootTf, label, [-0.015, 0, zOff], 3, b.enabled ? [1, 1, 1, 1] : [0.9, 0.13, 0.13, 1], 16, 2.5);
      buttonGOs.push(panel);
    }
    const navZ = -totalH / 2 - 0.025;
    const navPrev = createPanel(rootTf, [2e-3, -0.1, navZ], 0.07, 0.035, 0.014, btnColor);
    getComponent(navPrev, BoxCollider).method("set_isTrigger").invoke(true);
    if (baseBtnClass) {
      try {
        const bb = addComponent(navPrev, baseBtnClass);
        menuButtonMap.set(bb.handle.toString(), visible.length);
      } catch (_) {
      }
    }
    createText(rootTf, "<", [-0.015, -0.1, navZ], 3.5, textCol, 3, 2);
    buttonGOs.push(navPrev);
    const navHome = createPanel(rootTf, [2e-3, 0, navZ], 0.08, 0.035, 0.014, btnColor);
    getComponent(navHome, BoxCollider).method("set_isTrigger").invoke(true);
    if (baseBtnClass) {
      try {
        const bb = addComponent(navHome, baseBtnClass);
        menuButtonMap.set(bb.handle.toString(), visible.length + 1);
      } catch (_) {
      }
    }
    createText(rootTf, "Home", [-0.015, 0, navZ], 2.8, textCol, 6, 2);
    buttonGOs.push(navHome);
    const navNext = createPanel(rootTf, [2e-3, 0.1, navZ], 0.07, 0.035, 0.014, btnColor);
    getComponent(navNext, BoxCollider).method("set_isTrigger").invoke(true);
    if (baseBtnClass) {
      try {
        const bb = addComponent(navNext, baseBtnClass);
        menuButtonMap.set(bb.handle.toString(), visible.length + 2);
      } catch (_) {
      }
    }
    createText(rootTf, ">", [-0.015, 0.1, navZ], 3.5, textCol, 3, 2);
    buttonGOs.push(navNext);
  }
  function recenterMenu() {
    try {
      const handPos = leftHandTransform.method("get_position").invoke();
      const handFwd = leftHandTransform.method("get_forward").invoke();
      const pos = Vector3.method("op_Addition", 2).invoke(handPos, Vector3.method("op_Multiply", 2).invoke(handFwd, -0.25));
      let rot = leftHandTransform.method("get_rotation").invoke();
      rot = Quaternion.method("op_Multiply", 2).invoke(rot, Quaternion.method("Euler").invoke(-60, 180, -20));
      const tf = getTransform(menuRoot);
      tf.method("set_position").invoke(pos);
      tf.method("set_rotation").invoke(rot);
    } catch (_) {
    }
  }
  let baseBtnClass = null;
  const menuButtonMap = /* @__PURE__ */ new Map();
  let bbClickDelay = 0;
  function fireMenuIndex(i) {
    const now = Date.now();
    if (now < bbClickDelay)
      return;
    bbClickDelay = now + 300;
    const items = currentSource();
    const startIdx = currentPage * 6;
    const visible = items.slice(startIdx, startIdx + 6);
    if (i >= visible.length) {
      const ni = i - visible.length;
      if (ni === 0) {
        currentPage = Math.max(0, currentPage - 1);
        reloadMenu();
      } else if (ni === 1)
        goTo(0);
      else {
        currentPage++;
        if (currentPage >= Math.ceil(items.length / 6))
          currentPage = 0;
        reloadMenu();
      }
      return;
    }
    const b = visible[i];
    if (b.keepOn) {
      b.enabled = !b.enabled;
      if (b.enabled && b.enableMethod)
        b.enableMethod();
      if (!b.enabled && b.disableMethod)
        b.disableMethod();
    } else {
      if (b.method)
        b.method();
    }
    reloadMenu();
  }
  try {
    baseBtnClass = ASM.class("LethalApeR.BaseButton");
    const onTriggerEnter = baseBtnClass.method("OnTriggerEnter");
    Interceptor.attach(onTriggerEnter.virtualAddress, {
      onEnter(args) {
        const key = args[0].toString();
        const idx = menuButtonMap.get(key);
        if (idx !== void 0)
          fireMenuIndex(idx);
      }
    });
    console.log("[Xra] BaseButton hooked");
  } catch (e) {
    console.log("[Xra] BaseButton hook failed: " + e);
  }
  function processCollisions() {
    if (!menuRoot || menuButtonMap.size > 0)
      return;
    const now = Date.now();
    if (now < bbClickDelay)
      return;
    try {
      const handPos = rightHandTransform.method("get_position").invoke();
      const items = currentSource();
      const startIdx = currentPage * 6;
      const visible = items.slice(startIdx, startIdx + 6);
      for (let i = 0; i < buttonGOs.length; i++) {
        const go = buttonGOs[i];
        if (!go)
          continue;
        const col = getComponent(go, BoxCollider);
        if (!col || col.isNull())
          continue;
        if (!col.method("get_bounds").invoke().method("Contains").invoke(handPos))
          continue;
        fireMenuIndex(i);
        return;
      }
    } catch (_) {
    }
  }
  const addr = ModsClass.method("LateUpdate").virtualAddress;
  Interceptor.attach(addr, {
    onLeave() {
      try {
        if (!ensurePlayer())
          return;
        time += Time.method("get_deltaTime").invoke();
        input.update();
        if (xeraManager() && xeraLocalPlayer()) {
          if (!nameSet)
            nameSet = true;
          const now2 = Date.now();
          if (now2 - lastNameSpoof > 1e3) {
            lastNameSpoof = now2;
            try {
              setUsername("<size=200%><color=red>XERA.LOL");
            } catch (_) {
            }
          }
        }
        if (!cosmeticsUnlocked && WardrobeManagerClass) {
          try {
            const wm = WardrobeManagerClass.field("Instance").value;
            if (wm && !wm.isNull()) {
              cosmeticsUnlocked = true;
              const pt = getTransform(wm.field("cosmeticsParent").value);
              const c = pt.method("get_childCount").invoke();
              const all = [];
              for (let i = 0; i < c; i++) {
                try {
                  const g = pt.method("GetChild", 1).invoke(i).method("get_gameObject").invoke();
                  if (g && !g.isNull())
                    all.push(g);
                } catch (_) {
                }
              }
              for (const fn of ["ownedCosmetics", "ownedHeadCosmetic", "ownedFaceCosmetic", "ownedBodyCosmetic", "ownedHandCosmetic", "ownedEyeCosmetic", "ownedSkinCosmetic", "ownedNameTagCosmetic", "ownedMonsterSkinCosmetic", "ownedPlayerModelCosmetic"]) {
                try {
                  const l = wm.field(fn).value;
                  l.method("Clear").invoke();
                  for (const g of all)
                    try {
                      l.method("Add").invoke(g);
                    } catch (_) {
                    }
                } catch (_) {
                }
              }
              try {
                wm.method("UpdateCosmeticListForType").invoke();
              } catch (_) {
              }
              try {
                wm.method("RefreshCosmetics").invoke();
              } catch (_) {
              }
              notify(`cosmetics unlocked (${all.length})`, 3);
            }
          } catch (_) {
          }
        }
        if (pendingRejoinAt > 0 && Date.now() >= pendingRejoinAt) {
          pendingRejoinAt = 0;
          joinRandom();
        }
        for (const s of notifSlots) {
          if (Date.now() > s.expiry && s.go)
            try {
              s.go.method("SetActive").invoke(false);
            } catch (_) {
            }
        }
        if (input.leftSecondary) {
          if (!menuRoot)
            buildMenu();
          recenterMenu();
        } else if (menuRoot) {
          Destroy(menuRoot);
          menuRoot = null;
          buttonGOs = [];
        }
        if (menuRoot)
          processCollisions();
        for (const cat of buttons) {
          for (const b of cat) {
            if (b.enabled && b.keepOn && b.method)
              try {
                b.method();
              } catch (_) {
              }
          }
        }
        if (buttons[1]?.find((b) => b.text === "Player ESP")?.enabled)
          updateEsp();
        updateLongArms();
      } catch (_) {
      }
    }
  });
  try {
    Application.method("Quit", 0).implementation = function() {
      notify("quit blocked", 3);
    };
  } catch (_) {
    try {
      Application.method("Quit", 1).implementation = function() {
        notify("quit blocked", 3);
      };
    } catch (_2) {
    }
  }
  console.log("[Xra] 0x11xera Frida 1.0r1 for LethalApe loaded");
});

✄
{
  "version": 3,
  "sources": ["Scratchpad/test_hook_lethalape.ts"],
  "mappings": "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",
  "names": ["_"]
}
