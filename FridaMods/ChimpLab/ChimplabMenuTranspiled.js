📦
105249 /ChimplabMenu.js
71736 /ChimplabMenu.js.map
✄
// ChimplabMenu.ts
var rigidbody = null;
var hue = 0;
var flyspeed = 5;
var playerScale = 1;
var buttonClickDelay = 0;
var menu = null;
var menuBgRenderer = null;
var menuBg2Renderer = null;
var reference = null;
var referenceCollider = null;
var textGradientSpeed = 2.4;
var menuTextFrameCounter = 0;
var animatedMenuTexts = [];
var leftPrimary = false;
var leftSecondary = false;
var rightPrimary = false;
var rightSecondary = false;
var leftGrab = false;
var rightGrab = false;
var leftTrigger = false;
var rightTrigger = false;
var deltaTime = 0;
var time = 0;
var previousNoclipKey = false;
var previousJumpKey = false;
var closePosition = null;
var leftPlatform = null;
var rightPlatform = null;
var sceneReady = true;
var sceneRecheckDelay = 0;
var bgColor = [0.06, 0, 0, 1];
var bgColor2 = [0.12, 0, 0, 1];
var textColor = [1, 0.15, 0.15, 1];
var buttonColor = [0.08, 0.02, 0.02, 1];
var buttonPressedColor = [5, 0.1, 0.1, 1];
var menuName = "0x11xera Frida 1.0r1";
var themeIndex = 0;
var themes = [
  { name: "Blood Red", bg: [0.06, 0, 0, 1], bg2: [0.12, 0, 0, 1], text: [1, 0.15, 0.15, 1], btn: [0.08, 0.02, 0.02, 1], btnOn: [5, 0.1, 0.1, 1] },
  { name: "Cyber Cyan", bg: [0, 0.03, 0.05, 1], bg2: [0, 0.1, 0.16, 1], text: [0.3, 1, 1, 1], btn: [0, 0.07, 0.11, 1], btnOn: [0.2, 4, 4.5, 1] },
  { name: "Acid Green", bg: [0.01, 0.05, 0, 1], bg2: [0.03, 0.14, 0, 1], text: [0.6, 1, 0.1, 1], btn: [0.02, 0.09, 0, 1], btnOn: [1.4, 4.5, 0.1, 1] },
  { name: "Ultraviolet", bg: [0.03, 0, 0.07, 1], bg2: [0.1, 0, 0.22, 1], text: [0.75, 0.4, 1, 1], btn: [0.07, 0, 0.16, 1], btnOn: [2.4, 0.4, 5, 1] },
  { name: "Hazard", bg: [0.06, 0.03, 0, 1], bg2: [0.16, 0.08, 0, 1], text: [1, 0.65, 0.1, 1], btn: [0.11, 0.05, 0, 1], btnOn: [5, 1.8, 0, 1] },
  { name: "Blood Neon", bg: [0.06, 0, 0, 1], bg2: [0.18, 0, 0.02, 1], text: [1, 0.25, 0.25, 1], btn: [0.11, 0, 0.01, 1], btnOn: [5, 0.1, 0.1, 1] },
  { name: "Toxic Lime", bg: [0.03, 0.05, 0, 1], bg2: [0.1, 0.16, 0, 1], text: [0.85, 1, 0.2, 1], btn: [0.06, 0.1, 0, 1], btnOn: [3.2, 5, 0.2, 1] },
  { name: "Electric Blue", bg: [0, 0.01, 0.07, 1], bg2: [0, 0.05, 0.2, 1], text: [0.4, 0.7, 1, 1], btn: [0, 0.03, 0.14, 1], btnOn: [0.4, 1.6, 5, 1] },
  { name: "Vaporwave", bg: [0.04, 0, 0.06, 1], bg2: [0.14, 0.02, 0.2, 1], text: [0.4, 1, 0.95, 1], btn: [0.09, 0.01, 0.14, 1], btnOn: [4, 0.6, 3.4, 1] },
  { name: "Gold Rush", bg: [0.05, 0.04, 0, 1], bg2: [0.15, 0.12, 0, 1], text: [1, 0.85, 0.2, 1], btn: [0.1, 0.08, 0, 1], btnOn: [5, 3.4, 0.2, 1] },
  { name: "Void", bg: [0.01, 0.01, 0.01, 1], bg2: [0.04, 0.04, 0.05, 1], text: [0.9, 0.9, 0.95, 1], btn: [0.03, 0.03, 0.04, 1], btnOn: [3, 3, 3.4, 1] },
  { name: "RGB Strobe", bg: [0, 0, 0, 1], bg2: [0.05, 0.05, 0.05, 1], text: [1, 1, 1, 1], btn: [0.04, 0.04, 0.04, 1], btnOn: [4, 0.4, 3, 1] }
];
var RGB_THEME_INDEX = 11;
var currentTooltip = "";
var tooltipResetTime = 0;
{
  const W = 58;
  const pad = "  ";
  const line = (s) => pad + "\u2551 " + s + " ".repeat(Math.max(0, W - 2 - s.length)) + "\u2551";
  const center = (s) => {
    const inner = W - 2;
    const left = Math.max(0, Math.floor((inner - s.length) / 2));
    return line(" ".repeat(left) + s);
  };
  console.log("");
  console.log(pad + "\u2554" + "\u2550".repeat(W) + "\u2557");
  console.log(line(""));
  console.log(center("0x11xera Frida 1.0r1   for ChimplabVR"));
  console.log(line(""));
  console.log(pad + "\u2560" + "\u2550".repeat(W) + "\u2563");
  console.log(line("Movement / Spawner / Neon / Name / Cosmetics / Room"));
  console.log(line("Toggles run every frame while they're ON."));
  console.log(pad + "\u2560" + "\u2550".repeat(W) + "\u2563");
  console.log(center(">> HOLD Y ON LEFT CONTROLLER TO OPEN <<"));
  console.log(pad + "\u255A" + "\u2550".repeat(W) + "\u255D");
  console.log("");
}
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
  updateControllerStates(controllerId) {
    const features = ["PrimaryButton", "SecondaryButton", "GripButton", "TriggerButton", "MenuButton"];
    features.forEach((feature) => {
      this.buttonStates.set(`${controllerId}_${feature}`, this.getButtonState(controllerId, feature));
    });
  }
  getButtonState(deviceId, featureName) {
    try {
      const valuePtr = Il2Cpp.alloc(1);
      const feature = Il2Cpp.string(featureName);
      const success = this.tryGetFeatureValue.invoke(uint64(deviceId), feature, valuePtr);
      if (success)
        return valuePtr.readU8() !== 0;
    } catch (_) {
    }
    return false;
  }
  isButtonPressed(controllerId, feature) {
    return this.buttonStates.get(`${controllerId}_${feature}`) || false;
  }
  get leftControllerPrimaryButton() {
    return this.isButtonPressed(1, "PrimaryButton");
  }
  get leftControllerSecondaryButton() {
    return this.isButtonPressed(1, "SecondaryButton");
  }
  get rightControllerPrimaryButton() {
    return this.isButtonPressed(2, "PrimaryButton");
  }
  get rightControllerSecondaryButton() {
    return this.isButtonPressed(2, "SecondaryButton");
  }
  get leftGrab() {
    return this.isButtonPressed(1, "GripButton");
  }
  get rightGrab() {
    return this.isButtonPressed(2, "GripButton");
  }
  get leftControllerTriggerButton() {
    return this.isButtonPressed(1, "TriggerButton");
  }
  get rightControllerTriggerButton() {
    return this.isButtonPressed(2, "TriggerButton");
  }
};
Il2Cpp.perform(() => {
  const AssemblyCSharp = Il2Cpp.domain.assembly("Assembly-CSharp").image;
  const UnityEngineCore = Il2Cpp.domain.assembly("UnityEngine.CoreModule").image;
  const UnityEnginePhysics = Il2Cpp.domain.assembly("UnityEngine.PhysicsModule").image;
  const UnityEngineUI = Il2Cpp.domain.assembly("UnityEngine.UI").image;
  const UnityEngineUIModule = Il2Cpp.domain.assembly("UnityEngine.UIModule").image;
  const UnityEngineTextRendering = Il2Cpp.domain.assembly("UnityEngine.TextRenderingModule").image;
  let PhotonUnityNetworking = null;
  try {
    PhotonUnityNetworking = Il2Cpp.domain.assembly("PhotonUnityNetworking").image;
  } catch (_) {
  }
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
  function gameClass(name) {
    try {
      return AssemblyCSharp.class(name);
    } catch (_) {
      console.log("[Xra] class not found: " + name);
      return null;
    }
  }
  const GTPlayerClass = gameClass("GorillaLocomotion.Player");
  const PhotonVRManager = gameClass("Photon.VR.PhotonVRManager");
  const PhotonVRPlayer = gameClass("Photon.VR.Player.PhotonVRPlayer");
  const NameScriptClass = gameClass("NameScript");
  const PlayfabManagerClass = gameClass("PlayfabManager");
  const ModeratorMenuClass = gameClass("ModeratorMenu");
  const ModCheckerClass = gameClass("ModChecker");
  let PhotonNetwork = null;
  let PhotonView = null;
  if (PhotonUnityNetworking) {
    try {
      PhotonNetwork = PhotonUnityNetworking.class("Photon.Pun.PhotonNetwork");
    } catch (_) {
    }
    try {
      PhotonView = PhotonUnityNetworking.class("Photon.Pun.PhotonView");
    } catch (_) {
    }
  }
  let ButtonBehaviour = null;
  for (const n of ["ChangeLeftCosmetic", "ChangeRightCosmetic", "ChangeHeadCosmetic", "ChangeFaceCosmetic", "ChangeBodyCosmetic"]) {
    const c = gameClass(n);
    if (c) {
      try {
        if (c.tryMethod("OnTriggerEnter")) {
          ButtonBehaviour = c;
          break;
        }
      } catch (_) {
      }
    }
  }
  if (!ButtonBehaviour)
    console.log("[Xra] WARNING: no OnTriggerEnter carrier class found \u2014 buttons won't press");
  let GTPlayer = GTPlayerClass.method("get_Instance").invoke();
  let UberShader = null;
  for (const s of ["Universal Render Pipeline/Lit", "Universal Render Pipeline/Unlit", "Standard", "Sprites/Default"]) {
    try {
      const found = Shader.method("Find").invoke(Il2Cpp.string(s));
      if (found && !found.isNull()) {
        UberShader = found;
        break;
      }
    } catch (_) {
    }
  }
  const zeroVector = Vector3.field("zeroVector").value;
  const oneVector = Vector3.field("oneVector").value;
  const identityQuaternion = Quaternion.field("identityQuaternion").value;
  let leftHandTransform = GTPlayer.field("leftHandTransform").value;
  let rightHandTransform = GTPlayer.field("rightHandTransform").value;
  let headCollider = GTPlayer.field("headCollider").value;
  const OVRInputHandler = new XRInputHandler();
  const arial = Resources.method("GetBuiltinResource", 1).inflate(Font).invoke(Il2Cpp.string("Arial.ttf"));
  function Destroy(object) {
    try {
      Object.method("Destroy", 1).invoke(object);
    } catch (_) {
    }
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
  function vec(v) {
    return [v.field("x").value, v.field("y").value, v.field("z").value];
  }
  let velSetter = null;
  let velGetter = null;
  function resolveVelocityNames() {
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
    resolveVelocityNames();
    if (!rigidbody || !velSetter)
      return;
    try {
      rigidbody.method(velSetter).invoke(v);
    } catch (_) {
    }
  }
  function getVelocity() {
    resolveVelocityNames();
    if (!rigidbody || !velGetter)
      return [0, 0, 0];
    try {
      return vec(rigidbody.method(velGetter).invoke());
    } catch (_) {
      return [0, 0, 0];
    }
  }
  function findRigidbody() {
    try {
      const go = GTPlayer.method("get_gameObject").invoke();
      const rb = getComponent(go, Rigidbody);
      if (rb && !rb.isNull())
        return rb;
    } catch (_) {
    }
    for (const field of GTPlayerClass.fields) {
      try {
        if (field.type.name === "UnityEngine.Rigidbody") {
          const v = GTPlayer.field(field.name).value;
          if (v && !v.isNull())
            return v;
        }
      } catch (_) {
      }
    }
    return null;
  }
  rigidbody = findRigidbody();
  function findOne(cls) {
    if (!cls)
      return null;
    try {
      const arr = Object.method("FindObjectsOfType").inflate(cls).invoke();
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
      const arr = Object.method("FindObjectsOfType").inflate(cls).invoke();
      for (let i = 0; i < arr.length; i++) {
        const o = arr.get(i);
        if (o && !o.isNull())
          out.push(o);
      }
    } catch (_) {
    }
    return out;
  }
  function hsl2Rgb(h, s, l) {
    s /= 100;
    l /= 100;
    const k = (n) => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = (n) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return [Math.round(255 * f(0)), Math.round(255 * f(8)), Math.round(255 * f(4))];
  }
  function toHexByte(v) {
    return Math.round(Math.min(1, Math.max(0, v)) * 255).toString(16).padStart(2, "0");
  }
  function isHDR(c) {
    return c[0] > 1 || c[1] > 1 || c[2] > 1;
  }
  function applyEmission(material, colorArr) {
    if (!isHDR(colorArr))
      return;
    try {
      material.method("EnableKeyword", 1).invoke(Il2Cpp.string("_EMISSION"));
    } catch (_) {
    }
    for (const prop of ["_EmissionColor", "_BaseColor"]) {
      try {
        material.method("SetColor", 2).invoke(Il2Cpp.string(prop), colorArr);
      } catch (_) {
      }
    }
  }
  function setMaterialColour(renderer, colorArr) {
    try {
      const mat = renderer.method("get_material").invoke();
      if (UberShader)
        mat.method("set_shader").invoke(UberShader);
      mat.method("set_color").invoke(colorArr);
      applyEmission(mat, colorArr);
    } catch (_) {
    }
  }
  let neonIntensity = 4;
  const NEON_HUES = [
    ["Pink", [1, 0.05, 0.65]],
    ["Cyan", [0.05, 1, 1]],
    ["Green", [0.15, 1, 0.05]],
    ["Purple", [0.55, 0.1, 1]],
    ["Orange", [1, 0.35, 0]],
    ["Red", [1, 0.05, 0.05]],
    ["Blue", [0.1, 0.35, 1]],
    ["Yellow", [1, 0.85, 0.05]],
    ["White", [1, 1, 1]]
  ];
  function neon(base, mult = neonIntensity) {
    return [base[0] * mult, base[1] * mult, base[2] * mult, 1];
  }
  function neonFromHue(h, mult = neonIntensity) {
    const [r, g, b] = hsl2Rgb(h, 100, 55);
    return [r / 255 * mult, g / 255 * mult, b / 255 * mult, 1];
  }
  let notifSlots = [];
  let notifSlotsReady = false;
  function initNotifSlots() {
    if (notifSlotsReady)
      return;
    try {
      const headTf = getTransform(headCollider);
      if (!headTf || headTf.isNull())
        return;
      for (let i = 0; i < 4; i++) {
        const slotGO = createObject(zeroVector, identityQuaternion, oneVector, 3, [0, 0, 0, 0], headTf);
        Destroy(getComponent(slotGO, BoxCollider));
        const canvasObj = addComponent(slotGO, Canvas);
        canvasObj.method("set_renderMode").invoke(2);
        try {
          addComponent(slotGO, CanvasScaler).method("set_dynamicPixelsPerUnit").invoke(1e3);
        } catch (_) {
        }
        getTransform(slotGO).method("set_localPosition").invoke([0, 0.42 - i * 0.07, 0.85]);
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
    } catch (_) {
    }
  }
  function notify(text, duration = 2.5) {
    initNotifSlots();
    if (!notifSlotsReady)
      return;
    try {
      let slot = notifSlots.find((s) => Date.now() > s.expiry);
      if (!slot)
        slot = notifSlots.reduce((a, b2) => a.expiry < b2.expiry ? a : b2);
      const [r, g, b] = [buttonPressedColor[0], buttonPressedColor[1], buttonPressedColor[2]];
      slot.text.method("set_text").invoke(Il2Cpp.string(`<color=#${toHexByte(r)}${toHexByte(g)}${toHexByte(b)}>></color> <color=white>${text}</color>`));
      slot.go.method("SetActive").invoke(true);
      slot.expiry = Date.now() + duration * 1e3;
    } catch (_) {
    }
  }
  function setTooltip(text, duration = 4) {
    currentTooltip = text;
    tooltipResetTime = Date.now() + duration * 1e3;
  }
  function gradientText(text, colorA, colorB) {
    if (text.includes("<color=") || text.length <= 1)
      return text;
    let result = "";
    for (let i = 0; i < text.length; i++) {
      const ch = text[i];
      if (ch === " ") {
        result += ch;
        continue;
      }
      const t = i / (text.length - 1);
      const r = colorA[0] + (colorB[0] - colorA[0]) * t;
      const g = colorA[1] + (colorB[1] - colorA[1]) * t;
      const b = colorA[2] + (colorB[2] - colorA[2]) * t;
      result += `<color=#${toHexByte(r)}${toHexByte(g)}${toHexByte(b)}>${ch}</color>`;
    }
    return result;
  }
  function canGradient(text) {
    return !text.includes("<color=") && text.length > 1;
  }
  function animatedGradientText(text, colorA, colorB, phase) {
    if (!canGradient(text))
      return text;
    let result = "";
    let visibleIndex = 0;
    for (let i = 0; i < text.length; i++) {
      const ch = text[i];
      if (ch === " ") {
        result += ch;
        continue;
      }
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
    if (menu == null || animatedMenuTexts.length === 0)
      return;
    menuTextFrameCounter++;
    if (menuTextFrameCounter % 2 !== 0)
      return;
    for (const item of animatedMenuTexts) {
      try {
        if (!item.component || item.component.isNull?.())
          continue;
        item.component.method("set_text").invoke(Il2Cpp.string(item.render(time * textGradientSpeed + item.phase)));
      } catch (_) {
      }
    }
  }
  function renderMenuText(canvasObject, text = "", color = [1, 1, 1, 1], pos = zeroVector, size = oneVector, animate = null) {
    const title = addComponent(createObject(zeroVector, identityQuaternion, oneVector, 3, [0, 0, 0, 0], getTransform(canvasObject)), Text);
    try {
      getComponent(title, BoxCollider).method("set_isTrigger").invoke(true);
    } catch (_) {
    }
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
    rectTransform.method("set_rotation").invoke(Quaternion.method("Euler").invoke(180, 90, 90));
    if (animate)
      animatedMenuTexts.push({ component: title, render: animate.render, phase });
  }
  const roundedMeshCache = /* @__PURE__ */ new Map();
  function getRoundedBoxMesh(width, height, cornerRadius) {
    const normalizedY = Math.max(1e-3, Math.min(0.46, cornerRadius / Math.max(width, 1e-3)));
    const normalizedZ = Math.max(1e-3, Math.min(0.46, cornerRadius / Math.max(height, 1e-3)));
    const cacheKey = normalizedY.toFixed(4) + ":" + normalizedZ.toFixed(4);
    const cached = roundedMeshCache.get(cacheKey);
    if (cached && !cached.isNull?.())
      return cached;
    const perimeter = [];
    const cornerSegments = 10;
    const corners = [
      [0.5 - normalizedY, 0.5 - normalizedZ, 0, Math.PI * 0.5],
      [-0.5 + normalizedY, 0.5 - normalizedZ, Math.PI * 0.5, Math.PI],
      [-0.5 + normalizedY, -0.5 + normalizedZ, Math.PI, Math.PI * 1.5],
      [0.5 - normalizedY, -0.5 + normalizedZ, Math.PI * 1.5, Math.PI * 2]
    ];
    for (const [centerY, centerZ, startAngle, endAngle] of corners) {
      for (let segment = 0; segment <= cornerSegments; segment++) {
        const t = segment / cornerSegments;
        const angle = startAngle + (endAngle - startAngle) * t;
        perimeter.push([centerY + Math.cos(angle) * normalizedY, centerZ + Math.sin(angle) * normalizedZ]);
      }
    }
    const vertices = [];
    for (const [y, z] of perimeter)
      vertices.push([0.5, y, z]);
    for (const [y, z] of perimeter)
      vertices.push([-0.5, y, z]);
    const ringCount = perimeter.length;
    const frontCenter = vertices.length;
    vertices.push([0.5, 0, 0]);
    const backCenter = vertices.length;
    vertices.push([-0.5, 0, 0]);
    const triangles = [];
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
  function menuCornerRadius(scale) {
    return Math.min(Math.min(scale[1], scale[2]) * 0.28, 0.06);
  }
  function createObject(pos = zeroVector, rot = identityQuaternion, scale = oneVector, primitiveType = 3, colorArr = [1, 1, 1, 1], parent = null, cornerRadius = 0) {
    const obj = GameObject.method("CreatePrimitive").invoke(primitiveType);
    const renderer = getComponent(obj, Renderer);
    if (colorArr[3] == 0) {
      try {
        renderer.method("set_enabled").invoke(false);
      } catch (_) {
      }
    } else {
      try {
        const material = renderer.method("get_material").invoke();
        if (UberShader)
          material.method("set_shader").invoke(UberShader);
        material.method("set_color").invoke(colorArr);
        applyEmission(material, colorArr);
      } catch (_) {
      }
    }
    if (cornerRadius > 0 && primitiveType === 3) {
      try {
        getComponent(obj, MeshFilter).method("set_sharedMesh").invoke(getRoundedBoxMesh(scale[1], scale[2], cornerRadius));
      } catch (_) {
      }
    }
    const transform = getTransform(obj);
    if (parent != null)
      transform.method("SetParent", 2).invoke(parent, false);
    transform.method("set_position").invoke(pos);
    transform.method("set_rotation").invoke(rot);
    transform.method("set_localScale").invoke(scale);
    return obj;
  }
  function pvrManager() {
    try {
      const m = PhotonVRManager.method("get_Manager").invoke();
      return m && !m.isNull() ? m : null;
    } catch (_) {
      return null;
    }
  }
  function sendAllOutgoing() {
    try {
      if (PhotonNetwork)
        PhotonNetwork.method("SendAllOutgoingCommands").invoke();
    } catch (_) {
    }
  }
  function setUsername(name, mirrorToNameScript = true) {
    try {
      PhotonVRManager.method("SetUsername", 1).invoke(Il2Cpp.string(name));
    } catch (e) {
      console.log("[Xra] SetUsername: " + e);
    }
    if (!mirrorToNameScript)
      return;
    try {
      const ns = findOne(NameScriptClass);
      if (ns) {
        ns.field("NameVar").value = Il2Cpp.string(name);
      }
    } catch (_) {
    }
  }
  function currentUsername() {
    try {
      const ns = findOne(NameScriptClass);
      if (ns) {
        const v = ns.field("NameVar").value;
        if (v)
          return v.toString().replace(/^"|"$/g, "");
      }
    } catch (_) {
    }
    try {
      if (PhotonNetwork) {
        const lp = PhotonNetwork.method("get_LocalPlayer").invoke();
        return lp.method("get_NickName").invoke().toString().replace(/^"|"$/g, "");
      }
    } catch (_) {
    }
    return "";
  }
  function setColour(r, g, b) {
    try {
      PhotonVRManager.method("SetColour", 1).invoke([r, g, b, 1]);
    } catch (e) {
      console.log("[Xra] SetColour: " + e);
    }
  }
  const COSMETIC_SLOTS = ["Head", "Face", "Body", "BothHands", "LeftHand", "RightHand"];
  let cosmeticSlot = 0;
  function setCosmetic(slot, id) {
    try {
      PhotonVRManager.method("SetCosmetic", 2).invoke(slot, Il2Cpp.string(id));
    } catch (e) {
      console.log("[Xra] SetCosmetic: " + e);
    }
  }
  const COSMETIC_ANCHORS = [
    "HeadCosmetics",
    // 0 Head
    "FaceCosmetics",
    // 1 Face
    "BodyCosmetics",
    // 2 Body
    "LeftHandCosmetics",
    // 3 BothHands — hands share one catalog
    "LeftHandCosmetics",
    // 4 LeftHand
    "RightHandCosmetics"
    // 5 RightHand
  ];
  let cosmeticsBySlot = [];
  let cosmeticScanSource = "";
  function scanAnchorsInto(pvrPlayer, sets) {
    for (let slot = 0; slot < COSMETIC_ANCHORS.length; slot++) {
      try {
        const tf = pvrPlayer.field(COSMETIC_ANCHORS[slot]).value;
        if (!tf || tf.isNull())
          continue;
        const count = tf.method("get_childCount").invoke();
        for (let i = 0; i < count; i++) {
          const child = tf.method("GetChild", 1).invoke(i);
          const name = child.method("get_name").invoke().toString().replace(/^"|"$/g, "");
          if (name.length > 0)
            sets[slot].add(name);
        }
      } catch (_) {
      }
    }
  }
  function loadPlayerPrefab() {
    const paths = [];
    try {
      const spawner = findOne(gameClass("Photon.VR.Player.PlayerSpawner"));
      if (spawner) {
        const p = spawner.field("PrefabLocation").value;
        if (p)
          paths.push(p.toString().replace(/^"|"$/g, ""));
      }
    } catch (_) {
    }
    for (const p of ["PhotonVR/Player", "PhotonVR/Prefabs/Player"])
      if (paths.indexOf(p) < 0)
        paths.push(p);
    for (const path of paths) {
      for (const argc of [2, 1]) {
        try {
          const loaded = argc === 2 ? Resources.method("Load", 2).invoke(Il2Cpp.string(path), GameObject.type) : Resources.method("Load", 1).invoke(Il2Cpp.string(path));
          if (loaded && !loaded.isNull()) {
            const comp = getComponent(loaded, PhotonVRPlayer);
            if (comp && !comp.isNull())
              return comp;
          }
        } catch (_) {
        }
      }
    }
    return null;
  }
  function collectCosmetics() {
    if (cosmeticsBySlot.length > 0)
      return cosmeticsBySlot;
    const sets = COSMETIC_ANCHORS.map(() => /* @__PURE__ */ new Set());
    const sources = [];
    try {
      const prefab = loadPlayerPrefab();
      if (prefab) {
        scanAnchorsInto(prefab, sets);
        sources.push("prefab");
      }
    } catch (e) {
      console.log("[Xra] prefab scan: " + e);
    }
    try {
      let any = false;
      for (const p of findAll(PhotonVRPlayer)) {
        scanAnchorsInto(p, sets);
        any = true;
      }
      if (any)
        sources.push("live rigs");
    } catch (_) {
    }
    if (sets.every((s) => s.size === 0)) {
      try {
        const pfm = findOne(PlayfabManagerClass);
        if (pfm) {
          for (const fieldName of ["Cosmetics", "CosmeticsDisable"]) {
            try {
              const arr = pfm.field(fieldName).value;
              if (!arr || arr.isNull())
                continue;
              for (let i = 0; i < arr.length; i++) {
                const go = arr.get(i);
                if (!go || go.isNull())
                  continue;
                const name = go.method("get_name").invoke().toString().replace(/^"|"$/g, "");
                if (name.length > 0)
                  for (const s of sets)
                    s.add(name);
              }
            } catch (_) {
            }
          }
          sources.push("playfab list");
        }
      } catch (_) {
      }
    }
    cosmeticsBySlot = sets.map((s) => Array.from(s).sort());
    cosmeticScanSource = sources.join(" + ") || "nothing";
    const total = new Set(cosmeticsBySlot.flat()).size;
    console.log(`[Xra] cosmetics: ${total} unique from ${cosmeticScanSource} (${cosmeticsBySlot.map((a, i) => `${COSMETIC_SLOTS[i]}:${a.length}`).join(" ")})`);
    return cosmeticsBySlot;
  }
  function cosmeticsForSlot(slot) {
    const all = collectCosmetics();
    return all[slot] || [];
  }
  function totalCosmetics() {
    return new Set(collectCosmetics().flat()).size;
  }
  function localPhotonPlayer() {
    try {
      const m = pvrManager();
      if (!m)
        return null;
      const lp = m.field("LocalPlayer").value;
      return lp && !lp.isNull() ? lp : null;
    } catch (_) {
      return null;
    }
  }
  function playerName(p) {
    try {
      const pv = p.method("get_photonView").invoke();
      const owner = pv.method("get_Owner").invoke();
      return owner.method("get_NickName").invoke().toString().replace(/^"|"$/g, "");
    } catch (_) {
      return "?";
    }
  }
  function isLocal(p) {
    try {
      return p.method("get_photonView").invoke().method("get_IsMine").invoke();
    } catch (_) {
      return false;
    }
  }
  function playerHeadPos(p) {
    try {
      return getTransform(p.field("Head").value).method("get_position").invoke();
    } catch (_) {
      return null;
    }
  }
  function teleportTo(pos) {
    try {
      setVelocity(zeroVector);
    } catch (_) {
    }
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
  function recenterMenu() {
    try {
      let menuPosition = leftHandTransform.method("get_position").invoke();
      let menuRotation = leftHandTransform.method("get_rotation").invoke();
      menuRotation = Quaternion.method("op_Multiply", 2).invoke(menuRotation, Quaternion.method("Euler").invoke(-45, 0, 0));
      const menuTransform = getTransform(menu);
      menuTransform.method("set_position").invoke(menuPosition);
      menuTransform.method("set_rotation").invoke(menuRotation);
    } catch (_) {
    }
  }
  function reloadMenu() {
    if (menu != null) {
      Destroy(menu);
      menu = null;
    }
    animatedMenuTexts.length = 0;
  }
  function updateButtonColor(button, buttonData) {
    try {
      const renderer = getComponent(button, Renderer);
      if (!renderer || renderer.isNull())
        return;
      setMaterialColour(renderer, buttonData.enabled ? buttonPressedColor : buttonColor);
    } catch (_) {
    }
  }
  function applyTheme(idx) {
    themeIndex = (idx % themes.length + themes.length) % themes.length;
    const t = themes[themeIndex];
    bgColor = [...t.bg];
    bgColor2 = [...t.bg2];
    textColor = [...t.text];
    buttonColor = [...t.btn];
    buttonPressedColor = [...t.btnOn];
    setTooltip(`Theme: ${t.name}`, 3);
    reloadMenu();
  }
  class ButtonInfo {
    buttonText;
    method;
    enableMethod;
    disableMethod;
    keepOn;
    enabled;
    tooltip;
    constructor(config) {
      this.buttonText = config.buttonText;
      this.method = config.method;
      this.enableMethod = config.enableMethod;
      this.disableMethod = config.disableMethod;
      this.keepOn = config.keepOn ?? true;
      this.enabled = config.enabled ?? false;
      this.tooltip = config.tooltip ?? "";
    }
  }
  function Platforms() {
    if (leftGrab) {
      if (leftPlatform == null) {
        const pos = Vector3.method("op_Addition", 2).invoke(leftHandTransform.method("get_position").invoke(), [0, -0.035, 0]);
        leftPlatform = createObject(pos, leftHandTransform.method("get_rotation").invoke(), [0.035, 0.15, 0.35], 3, buttonPressedColor);
      }
    } else if (leftPlatform != null) {
      Destroy(leftPlatform);
      leftPlatform = null;
    }
    if (rightGrab) {
      if (rightPlatform == null) {
        const pos = Vector3.method("op_Addition", 2).invoke(rightHandTransform.method("get_position").invoke(), [0, -0.035, 0]);
        rightPlatform = createObject(pos, rightHandTransform.method("get_rotation").invoke(), [0.025, 0.15, 0.2], 3, buttonPressedColor);
      }
    } else if (rightPlatform != null) {
      Destroy(rightPlatform);
      rightPlatform = null;
    }
  }
  let savedLocomotionMask = null;
  function setNoClip(on) {
    try {
      const maskField = GTPlayer.field("locomotionEnabledLayers").value;
      if (on) {
        if (savedLocomotionMask == null)
          savedLocomotionMask = maskField.field("m_Mask").value;
        maskField.field("m_Mask").value = 0;
      } else if (savedLocomotionMask != null) {
        maskField.field("m_Mask").value = savedLocomotionMask;
      }
    } catch (e) {
      console.log("[Xra] noclip mask: " + e);
    }
    try {
      GTPlayer.field("headCollider").value.method("set_enabled").invoke(!on);
      GTPlayer.field("bodyCollider").value.method("set_enabled").invoke(!on);
    } catch (e) {
      console.log("[Xra] noclip colliders: " + e);
    }
  }
  let longArmsEnabled = false;
  let armLengthMultiplier = 1.4;
  function applyArmOffset(handTransform, anchor, mult) {
    try {
      const [hx, hy, hz] = vec(handTransform.method("get_position").invoke());
      const [ax, ay, az] = vec(anchor);
      handTransform.method("set_position").invoke([ax + (hx - ax) * mult, ay + (hy - ay) * mult, az + (hz - az) * mult]);
    } catch (_) {
    }
  }
  function updateLongArms() {
    if (!longArmsEnabled)
      return;
    try {
      const anchor = getTransform(GTPlayer.method("get_gameObject").invoke()).method("get_position").invoke();
      applyArmOffset(leftHandTransform, anchor, armLengthMultiplier);
      applyArmOffset(rightHandTransform, anchor, armLengthMultiplier);
    } catch (_) {
    }
  }
  function applyPlayerScale(scale) {
    playerScale = Math.max(0.25, Math.min(4, scale));
    try {
      getTransform(GTPlayer.method("get_gameObject").invoke()).method("set_localScale").invoke([playerScale, playerScale, playerScale]);
    } catch (_) {
    }
    try {
      GTPlayer.field("maxArmLength").value = 1.5 * playerScale;
    } catch (_) {
    }
  }
  const tempObjects = [];
  let lastTempSpawn = 0;
  function spawnTemp(pos, size, colour, life, prim = 0) {
    try {
      const go = createObject(pos, identityQuaternion, [size, size, size], prim, colour);
      try {
        getComponent(go, Collider).method("set_enabled").invoke(false);
      } catch (_) {
      }
      tempObjects.push({ go, die: Date.now() + life });
      return go;
    } catch (_) {
      return null;
    }
  }
  function reapTempObjects() {
    const now = Date.now();
    for (let i = tempObjects.length - 1; i >= 0; i--) {
      if (now > tempObjects[i].die) {
        Destroy(tempObjects[i].go);
        tempObjects.splice(i, 1);
      }
    }
  }
  function clearTempObjects() {
    for (const t of tempObjects)
      Destroy(t.go);
    tempObjects.length = 0;
  }
  const NET_PREFAB = "PhotonVR/Player";
  const LOCAL_PREFABS = [
    "ZomBear",
    "ZomBunny",
    "Hellephant",
    "Boy",
    "Character",
    "Spaceship",
    "BigAsteroid",
    "SmallAsteroid",
    "Speaker",
    "DustParticles",
    "My Robot Kyle -done-",
    "GorillaPrefabs/Gorilla Rig",
    "Player Controller"
  ];
  let discoveredPrefabs = [];
  let prefabScanDone = false;
  function scanAllPrefabs() {
    if (prefabScanDone)
      return;
    prefabScanDone = true;
    const seen = new Set(LOCAL_PREFABS);
    try {
      const allRes = Resources.method("LoadAll", 2).invoke(Il2Cpp.string(""), GameObject.type);
      if (allRes && !allRes.isNull()) {
        console.log(`[Xra] LoadAll returned ${allRes.length} GameObjects`);
        for (let i = 0; i < allRes.length; i++) {
          try {
            const go = allRes.get(i);
            if (!go || go.isNull())
              continue;
            try {
              const pv = go.method("GetComponent", 1).inflate(PhotonView).invoke();
              if (!pv || pv.isNull())
                continue;
            } catch (_) {
              continue;
            }
            const name = go.method("get_name").invoke().toString();
            if (!name || seen.has(name))
              continue;
            seen.add(name);
            discoveredPrefabs.push(name);
          } catch (_) {
          }
        }
      }
    } catch (e) {
      console.log("[Xra] LoadAll(GameObject) error: " + e);
    }
    if (discoveredPrefabs.length === 0 && PhotonView) {
      try {
        const pvs = Object.method("FindObjectsOfType").inflate(PhotonView).invoke();
        if (pvs && !pvs.isNull()) {
          console.log(`[Xra] found ${pvs.length} PhotonViews in scene`);
          for (let i = 0; i < pvs.length; i++) {
            try {
              const pv = pvs.get(i);
              if (!pv || pv.isNull())
                continue;
              const go = pv.method("get_gameObject").invoke();
              if (!go || go.isNull())
                continue;
              let name = go.method("get_name").invoke().toString();
              if (!name)
                continue;
              name = name.replace(/\s*\(Clone\).*$/, "").replace(/\s*\(\d+\)$/, "").trim();
              if (!name || seen.has(name))
                continue;
              seen.add(name);
              discoveredPrefabs.push(name);
            } catch (_) {
            }
          }
        }
      } catch (e) {
        console.log("[Xra] PhotonView scan error: " + e);
      }
    }
    discoveredPrefabs.sort();
    console.log(`[Xra] discovered ${discoveredPrefabs.length} prefabs (+ ${LOCAL_PREFABS.length} hardcoded)`);
  }
  function getAllPrefabNames() {
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
        method: () => {
          selectedPrefabIndex = idx;
          setTooltip(`prefab [${idx + 1}/${all.length}]: ${name}`, 8);
          notify(`selected ${name}`, 3);
        }
      }));
    });
  }
  let selectedPrefabIndex = 0;
  let spawnDistance = 3;
  const netSpawned = [];
  const localSpawned = [];
  function selectedPrefab() {
    const all = getAllPrefabNames();
    return all[selectedPrefabIndex % all.length] || LOCAL_PREFABS[0];
  }
  function aimPosition(distance) {
    try {
      const origin = rightHandTransform.method("get_position").invoke();
      const fwd = rightHandTransform.method("get_forward").invoke();
      return Vector3.method("op_Addition", 2).invoke(origin, Vector3.method("op_Multiply", 2).invoke(fwd, distance));
    } catch (_) {
      return zeroVector;
    }
  }
  const prefabCache = /* @__PURE__ */ new Map();
  function loadPrefab(name) {
    if (prefabCache.has(name))
      return prefabCache.get(name);
    let obj = null;
    try {
      obj = Resources.method("Load", 2).invoke(Il2Cpp.string(name), GameObject.type);
      if (!obj || obj.isNull())
        obj = Resources.method("Load", 1).invoke(Il2Cpp.string(name));
    } catch (_) {
    }
    if (obj && obj.isNull?.())
      obj = null;
    prefabCache.set(name, obj);
    return obj;
  }
  function localSpawn(name, pos) {
    const prefab = loadPrefab(name);
    if (!prefab) {
      notify(`${name} not in Resources`, 3);
      return null;
    }
    try {
      const go = Object.method("Instantiate", 3).invoke(prefab, pos, identityQuaternion);
      if (go && !go.isNull()) {
        localSpawned.push(go);
        return go;
      }
    } catch (e) {
      console.log("[Xra] localSpawn: " + e);
    }
    return null;
  }
  function netSpawn(pos) {
    if (!PhotonNetwork) {
      notify("photon not loaded", 3);
      return null;
    }
    try {
      const go = PhotonNetwork.method("Instantiate", 5).invoke(Il2Cpp.string(NET_PREFAB), pos, identityQuaternion, 0, NULL);
      if (go && !go.isNull()) {
        netSpawned.push(go);
        return go;
      }
    } catch (e) {
      console.log("[Xra] netSpawn: " + e);
    }
    return null;
  }
  function clearLocalSpawns() {
    for (const go of localSpawned)
      Destroy(go);
    localSpawned.length = 0;
  }
  function clearNetSpawns() {
    if (!PhotonNetwork)
      return;
    for (const go of netSpawned) {
      try {
        PhotonNetwork.method("Destroy", 1).invoke(go);
      } catch (_) {
      }
    }
    netSpawned.length = 0;
  }
  let lastStrobe = 0;
  let lastBlinder = 0;
  function strobeColour() {
    hue = (hue + 47) % 360;
    return neonFromHue(hue);
  }
  const espLines = /* @__PURE__ */ new Map();
  function clearEsp() {
    for (const [, line] of espLines) {
      try {
        Destroy(line.method("get_gameObject").invoke());
      } catch (_) {
      }
    }
    espLines.clear();
  }
  function updateEsp() {
    try {
      const from = getTransform(headCollider).method("get_position").invoke();
      const seen = /* @__PURE__ */ new Set();
      for (const p of findAll(PhotonVRPlayer)) {
        if (isLocal(p))
          continue;
        const key = p.handle.toString();
        seen.add(key);
        const to = playerHeadPos(p);
        if (!to)
          continue;
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
            if (UberShader)
              mat.method("set_shader").invoke(UberShader);
          } catch (_) {
          }
          espLines.set(key, line);
        }
        try {
          line.method("SetPosition").invoke(0, from);
          line.method("SetPosition").invoke(1, to);
          line.method("get_material").invoke().method("set_color").invoke(buttonPressedColor);
        } catch (_) {
        }
      }
      for (const [key, line] of Array.from(espLines.entries())) {
        if (!seen.has(key)) {
          try {
            Destroy(line.method("get_gameObject").invoke());
          } catch (_) {
          }
          espLines.delete(key);
        }
      }
    } catch (_) {
    }
  }
  const NAME_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 _-.";
  let nameLetterIndex = 0;
  let nameBuffer = "";
  const NAME_COLOURS = ["none", "red", "lime", "cyan", "magenta", "yellow", "orange", "blue", "white", "black", "rainbow"];
  let nameColourIndex = 0;
  const PRESET_NAMES = [
    "XERA",
    "0x11xera",
    "NULL",
    "ERROR",
    "404",
    "unknown",
    "Anonymous",
    "Player",
    "SYSTEM",
    "admin",
    "mod",
    "Ghost"
  ];
  function rainbowTagged(text) {
    let out = "";
    let i = 0;
    for (const ch of text) {
      if (ch === " ") {
        out += ch;
        continue;
      }
      const [r, g, b] = hsl2Rgb(i * 32 % 360, 100, 55);
      out += `<color=#${toHexByte(r / 255)}${toHexByte(g / 255)}${toHexByte(b / 255)}>${ch}</color>`;
      i++;
    }
    return out;
  }
  function decorateName(raw) {
    const colour = NAME_COLOURS[nameColourIndex];
    if (colour === "none")
      return raw;
    if (colour === "rainbow")
      return rainbowTagged(raw);
    return `<color=${colour}>${raw}</color>`;
  }
  function applyName(raw) {
    const trimmed = raw.trim();
    if (trimmed.length === 0) {
      notify("name is empty", 2.5);
      return;
    }
    setUsername(decorateName(trimmed.substring(0, 15)), NAME_COLOURS[nameColourIndex] === "none");
    notify(`name: ${trimmed.substring(0, 15)}`, 3);
  }
  let pendingRejoinAt = 0;
  let roomCodeBuffer = "";
  function leaveRoom() {
    try {
      if (PhotonNetwork)
        PhotonNetwork.method("LeaveRoom", 1).invoke(true);
    } catch (e) {
      console.log("[Xra] leaveRoom: " + e);
    }
  }
  function joinRandom() {
    try {
      const m = pvrManager();
      if (!m)
        return;
      const queue = m.field("DefaultQueue").value;
      const limit = m.field("DefaultRoomLimit").value;
      PhotonVRManager.method("JoinRandomRoom", 2).invoke(queue, limit);
    } catch (e) {
      console.log("[Xra] joinRandom: " + e);
    }
  }
  function hopServer() {
    leaveRoom();
    pendingRejoinAt = Date.now() + 1200;
    notify("hopping to a new room...", 3);
  }
  function joinPrivate(code) {
    try {
      const m = pvrManager();
      const limit = m ? m.field("DefaultRoomLimit").value : 16;
      PhotonVRManager.method("JoinPrivateRoom", 2).invoke(Il2Cpp.string(code), limit);
      notify(`joining room ${code}`, 3);
    } catch (e) {
      console.log("[Xra] joinPrivate: " + e);
    }
  }
  function roomInfo() {
    try {
      if (!PhotonNetwork)
        return "photon not loaded";
      const room = PhotonNetwork.method("get_CurrentRoom").invoke();
      if (!room || room.isNull())
        return "not in a room";
      const name = room.method("get_Name").invoke().toString().replace(/^"|"$/g, "");
      const count = room.method("get_PlayerCount").invoke();
      const max = room.method("get_MaxPlayers").invoke();
      return `${name} \u2014 ${count}/${max}`;
    } catch (_) {
      return "unknown";
    }
  }
  const objectArrayClass = Il2Cpp.corlib.class("System.Object");
  function emptyArgs() {
    return Il2Cpp.array(objectArrayClass, 0);
  }
  function argsOf(...vals) {
    const arr = Il2Cpp.array(objectArrayClass, vals.length);
    for (let i = 0; i < vals.length; i++)
      arr.set(i, vals[i]);
    return arr;
  }
  function myModeratorView() {
    for (const mm of findAll(ModeratorMenuClass)) {
      try {
        const pv = getComponent(mm, PhotonView);
        if (pv && !pv.isNull() && pv.method("get_IsMine").invoke())
          return pv;
      } catch (_) {
      }
    }
    try {
      const mm = findOne(ModeratorMenuClass);
      if (mm) {
        const pv = mm.field("mypv").value;
        if (pv && !pv.isNull())
          return pv;
      }
    } catch (_) {
    }
    return null;
  }
  let rpcMethod = null;
  function resolveRpc() {
    if (rpcMethod || !PhotonView)
      return;
    try {
      for (const m of PhotonView.methods) {
        if (m.name === "RPC" && m.parameterCount === 3) {
          try {
            if (m.parameters[1].type.name.indexOf("Player") >= 0) {
              rpcMethod = m;
              return;
            }
          } catch (_) {
          }
        }
      }
      rpcMethod = PhotonView.tryMethod("RPC", 3);
    } catch (_) {
    }
  }
  function sendRpcTo(targetPlayer, method, args) {
    resolveRpc();
    const pv = myModeratorView();
    if (!pv) {
      notify("no moderator view found", 3);
      return false;
    }
    if (!rpcMethod) {
      notify("RPC method not found", 3);
      return false;
    }
    try {
      rpcMethod.invoke.call(pv, Il2Cpp.string(method), targetPlayer, args);
      return true;
    } catch (e) {
      console.log("[Xra] RPC " + method + ": " + e);
      return false;
    }
  }
  function playersOthers() {
    const out = [];
    try {
      const arr = PhotonNetwork.method("get_PlayerListOthers").invoke();
      for (let i = 0; i < arr.length; i++) {
        const p = arr.get(i);
        if (p && !p.isNull())
          out.push(p);
      }
    } catch (_) {
    }
    return out;
  }
  function photonPlayerName(p) {
    try {
      return p.method("get_NickName").invoke().toString().replace(/^"|"$/g, "");
    } catch (_) {
      return "?";
    }
  }
  function ownerOf(pvrPlayer) {
    try {
      return pvrPlayer.method("get_photonView").invoke().method("get_Owner").invoke();
    } catch (_) {
      return null;
    }
  }
  function kickPhotonPlayer(p) {
    return sendRpcTo(p, "_KickPlayer", emptyArgs());
  }
  function kickAll() {
    let n = 0;
    for (const p of playersOthers())
      if (kickPhotonPlayer(p))
        n++;
    try {
      sendAllOutgoing();
    } catch (_) {
    }
    notify(`kicked ${n} ${n === 1 ? "player" : "players"}`, 4);
  }
  function renamePhotonPlayer(p, name) {
    return sendRpcTo(p, "_ResetUsername", argsOf(Il2Cpp.string(name)));
  }
  function unlockModTools() {
    let touched = 0;
    for (const mc of findAll(ModCheckerClass)) {
      try {
        mc.field("HasMod").value = true;
      } catch (_) {
      }
      try {
        mc.field("_HasMod").value = true;
      } catch (_) {
      }
      try {
        const items = mc.field("Items").value;
        if (items && !items.isNull()) {
          for (let i = 0; i < items.length; i++) {
            const go = items.get(i);
            if (go && !go.isNull())
              go.method("SetActive").invoke(true);
          }
        }
      } catch (_) {
      }
      touched++;
    }
    notify(touched > 0 ? "mod tools unlocked" : "no ModChecker found", 3);
  }
  function setFloatField(name, value) {
    try {
      GTPlayer.field(name).value = value;
    } catch (e) {
      console.log(`[Xra] ${name}: ${e}`);
    }
  }
  let currentCategory = 0;
  let currentPage = 0;
  function goTo(cat) {
    currentCategory = cat;
    currentPage = 0;
  }
  const buttons = [
    [
      new ButtonInfo({ buttonText: "Movement", method: () => goTo(3), keepOn: false }),
      new ButtonInfo({ buttonText: "Spawner", method: () => goTo(4), keepOn: false }),
      new ButtonInfo({ buttonText: "Name", method: () => goTo(5), keepOn: false }),
      new ButtonInfo({ buttonText: "Neon", method: () => goTo(6), keepOn: false }),
      new ButtonInfo({ buttonText: "Cosmetics", method: () => {
        collectCosmetics();
        goTo(7);
      }, keepOn: false }),
      new ButtonInfo({ buttonText: "Players", method: () => goTo(8), keepOn: false }),
      new ButtonInfo({ buttonText: "Admin", method: () => goTo(17), keepOn: false }),
      new ButtonInfo({ buttonText: "Trolls", method: () => goTo(18), keepOn: false }),
      new ButtonInfo({ buttonText: "Room", method: () => goTo(9), keepOn: false }),
      new ButtonInfo({ buttonText: "Settings", method: () => goTo(2), keepOn: false }),
      new ButtonInfo({ buttonText: "Credits", method: () => goTo(10), keepOn: false })
    ],
    [
      new ButtonInfo({ buttonText: "Home", method: () => goTo(0), keepOn: false }),
      new ButtonInfo({ buttonText: "Leave", method: () => leaveRoom(), keepOn: false }),
      new ButtonInfo({
        buttonText: "PreviousPage",
        method: () => {
          const lastPage = Math.max(0, Math.ceil(currentSource().length / 6) - 1);
          currentPage--;
          if (currentPage < 0)
            currentPage = lastPage;
        },
        keepOn: false
      }),
      new ButtonInfo({
        buttonText: "NextPage",
        method: () => {
          const lastPage = Math.max(0, Math.ceil(currentSource().length / 6) - 1);
          currentPage++;
          currentPage %= lastPage + 1;
        },
        keepOn: false
      })
    ],
    [
      new ButtonInfo({ buttonText: "Back", method: () => goTo(0), keepOn: false }),
      new ButtonInfo({ buttonText: "Fly Speed +", method: () => {
        flyspeed += 1;
        setTooltip(`Fly speed: ${flyspeed}`, 3);
      }, keepOn: false, tooltip: "" }),
      new ButtonInfo({ buttonText: "Fly Speed -", method: () => {
        flyspeed = Math.max(1, flyspeed - 1);
        setTooltip(`Fly speed: ${flyspeed}`, 3);
      }, keepOn: false }),
      new ButtonInfo({ buttonText: "Next Theme", method: () => applyTheme(themeIndex + 1), keepOn: false }),
      new ButtonInfo({ buttonText: "Prev Theme", method: () => applyTheme(themeIndex - 1), keepOn: false }),
      new ButtonInfo({ buttonText: "Arm Reach +", method: () => {
        armLengthMultiplier = Math.min(2.5, armLengthMultiplier + 0.1);
        setTooltip(`Arm reach: ${armLengthMultiplier.toFixed(1)}x`, 3);
      }, keepOn: false }),
      new ButtonInfo({ buttonText: "Arm Reach -", method: () => {
        armLengthMultiplier = Math.max(1, armLengthMultiplier - 0.1);
        setTooltip(`Arm reach: ${armLengthMultiplier.toFixed(1)}x`, 3);
      }, keepOn: false }),
      new ButtonInfo({ buttonText: "Room Info", method: () => notify(roomInfo(), 5), keepOn: false })
    ],
    [
      new ButtonInfo({ buttonText: "Back", method: () => goTo(0), keepOn: false }),
      new ButtonInfo({
        buttonText: "Fly [B]",
        tooltip: "hold B to fly where your right hand points",
        method: () => {
          if (rightSecondary) {
            const dir = rightHandTransform.method("get_forward").invoke();
            setVelocity(Vector3.method("op_Multiply", 2).invoke(dir, flyspeed));
          }
        }
      }),
      new ButtonInfo({ buttonText: "Platforms [G]", tooltip: "hold grip for a platform under each hand", method: () => Platforms() }),
      new ButtonInfo({
        buttonText: "No Clip [T]",
        tooltip: "hold right trigger to phase through walls",
        method: () => {
          if (rightTrigger && !previousNoclipKey)
            setNoClip(true);
          if (!rightTrigger && previousNoclipKey)
            setNoClip(false);
          previousNoclipKey = rightTrigger;
        },
        disableMethod: () => {
          setNoClip(false);
          previousNoclipKey = false;
        }
      }),
      new ButtonInfo({
        buttonText: "Super Jump",
        tooltip: "pull right trigger to launch straight up",
        method: () => {
          if (rightTrigger && !previousJumpKey)
            setVelocity([0, 22, 0]);
          previousJumpKey = rightTrigger;
        }
      }),
      new ButtonInfo({
        buttonText: "Low Gravity",
        tooltip: "float down gently like a feather",
        method: () => {
          try {
            if (rigidbody)
              rigidbody.method("set_useGravity").invoke(false);
          } catch (_) {
          }
          const [vx, vy, vz] = getVelocity();
          setVelocity([vx, Math.max(vy - 0.05, -2), vz]);
        },
        disableMethod: () => {
          try {
            if (rigidbody)
              rigidbody.method("set_useGravity").invoke(true);
          } catch (_) {
          }
        }
      }),
      new ButtonInfo({
        buttonText: "Long Arms",
        tooltip: "stretchy arms without resizing your body",
        enableMethod: () => {
          longArmsEnabled = true;
        },
        disableMethod: () => {
          longArmsEnabled = false;
        }
      }),
      new ButtonInfo({
        buttonText: "Speed Boost",
        tooltip: "raises your max movement speed",
        method: () => {
          try {
            GTPlayer.field("maxJumpSpeed").value = 29.5;
          } catch (_) {
          }
        }
      }),
      new ButtonInfo({
        buttonText: "Freeze In Menu",
        tooltip: "hold still while the menu is open",
        enabled: true,
        method: () => {
          if (menu != null && rigidbody) {
            if (closePosition == null) {
              try {
                closePosition = rigidbody.method("get_position").invoke();
              } catch (_) {
              }
            } else {
              try {
                rigidbody.method("set_position").invoke(closePosition);
              } catch (_) {
              }
              setVelocity(zeroVector);
            }
          } else
            closePosition = null;
        }
      }),
      new ButtonInfo({
        buttonText: "TP To Aim [G+T]",
        tooltip: "hold grip then pull trigger to teleport where you point",
        method: () => {
          if (!rightGrab || !rightTrigger)
            return;
          const now = Date.now();
          if (now - lastTempSpawn < 350)
            return;
          lastTempSpawn = now;
          teleportTo(aimPosition(12));
        }
      }),
      new ButtonInfo({
        buttonText: "Grow / Shrink",
        tooltip: "right trigger grows you, left trigger shrinks you",
        method: () => {
          if (rightTrigger)
            applyPlayerScale(playerScale + 0.02);
          else if (leftTrigger)
            applyPlayerScale(playerScale - 0.02);
        }
      }),
      new ButtonInfo({ buttonText: "Reset Size", keepOn: false, method: () => {
        applyPlayerScale(1);
        notify("size reset", 2.5);
      } }),
      new ButtonInfo({
        buttonText: "Invisible",
        tooltip: "hides your networked body from everyone",
        enableMethod: () => {
          const lp = localPhotonPlayer();
          if (lp) {
            try {
              lp.method("set_enabled").invoke(false);
              notify("invisible", 3);
            } catch (_) {
            }
          }
        },
        disableMethod: () => {
          const lp = localPhotonPlayer();
          if (lp) {
            try {
              lp.method("set_enabled").invoke(true);
              notify("visible", 3);
            } catch (_) {
            }
          }
        }
      })
    ],
    [
      new ButtonInfo({ buttonText: "Back", method: () => goTo(0), keepOn: false }),
      new ButtonInfo({
        buttonText: "Prefab >",
        keepOn: false,
        method: () => {
          const all = getAllPrefabNames();
          selectedPrefabIndex = (selectedPrefabIndex + 1) % all.length;
          setTooltip(`prefab [${selectedPrefabIndex + 1}/${all.length}]: ${selectedPrefab()}`, 8);
        }
      }),
      new ButtonInfo({
        buttonText: "< Prefab",
        keepOn: false,
        method: () => {
          const all = getAllPrefabNames();
          selectedPrefabIndex = (selectedPrefabIndex - 1 + all.length) % all.length;
          setTooltip(`prefab [${selectedPrefabIndex + 1}/${all.length}]: ${selectedPrefab()}`, 8);
        }
      }),
      new ButtonInfo({ buttonText: "Prefab List", keepOn: false, method: () => goTo(15) }),
      new ButtonInfo({
        buttonText: "Scan Resources",
        keepOn: false,
        method: () => {
          scanAllPrefabs();
          rebuildPrefabList();
          notify(`found ${getAllPrefabNames().length} total prefabs`, 4);
        }
      }),
      new ButtonInfo({
        buttonText: "Spawn One",
        keepOn: false,
        method: () => {
          if (localSpawn(selectedPrefab(), aimPosition(spawnDistance)))
            notify(`spawned ${selectedPrefab()}`, 3);
        }
      }),
      new ButtonInfo({
        buttonText: "Spam Prefab [T]",
        tooltip: "hold right trigger to spam the selected prefab",
        method: () => {
          if (!rightTrigger)
            return;
          const now = Date.now();
          if (now - lastTempSpawn < 60)
            return;
          lastTempSpawn = now;
          localSpawn(selectedPrefab(), aimPosition(spawnDistance));
        }
      }),
      new ButtonInfo({
        buttonText: "Spawn Wall",
        tooltip: "drops a 5x5 grid of the selected prefab in front of you",
        keepOn: false,
        method: () => {
          const base = aimPosition(spawnDistance);
          const [bx, by, bz] = vec(base);
          for (let x = -2; x <= 2; x++) {
            for (let y = 0; y < 5; y++)
              localSpawn(selectedPrefab(), [bx + x * 1.2, by + y * 1.2, bz]);
          }
          notify(`wall of ${selectedPrefab()}`, 3);
        }
      }),
      new ButtonInfo({ buttonText: "Spawn Dist +", keepOn: false, method: () => {
        spawnDistance = Math.min(30, spawnDistance + 1);
        setTooltip(`spawn distance: ${spawnDistance}`, 4);
      } }),
      new ButtonInfo({ buttonText: "Spawn Dist -", keepOn: false, method: () => {
        spawnDistance = Math.max(1, spawnDistance - 1);
        setTooltip(`spawn distance: ${spawnDistance}`, 4);
      } }),
      new ButtonInfo({
        buttonText: "Rig Spam [B]",
        tooltip: "hold B to spam networked player rigs \u2014 everyone sees these",
        method: () => {
          if (!rightSecondary)
            return;
          const now = Date.now();
          if (now - lastTempSpawn < 80)
            return;
          lastTempSpawn = now;
          netSpawn(aimPosition(spawnDistance));
        }
      }),
      new ButtonInfo({
        buttonText: "Spawn Rig",
        keepOn: false,
        method: () => {
          if (netSpawn(aimPosition(spawnDistance)))
            notify("networked rig spawned", 3);
        }
      }),
      new ButtonInfo({ buttonText: "Clear My Spawns", keepOn: false, method: () => {
        const n = localSpawned.length;
        clearLocalSpawns();
        notify(`cleared ${n} local`, 3);
      } }),
      new ButtonInfo({ buttonText: "Clear Rigs", keepOn: false, method: () => {
        const n = netSpawned.length;
        clearNetSpawns();
        notify(`cleared ${n} rigs`, 3);
      } })
    ],
    [
      new ButtonInfo({ buttonText: "Back", method: () => goTo(0), keepOn: false }),
      new ButtonInfo({ buttonText: "Preset Names", method: () => goTo(11), keepOn: false, tooltip: "pick a ready made name" }),
      new ButtonInfo({
        buttonText: "Name Colour >",
        keepOn: false,
        tooltip: "wraps your name in a <color=> tag",
        method: () => {
          nameColourIndex = (nameColourIndex + 1) % NAME_COLOURS.length;
          setTooltip(`name colour: ${NAME_COLOURS[nameColourIndex]}`, 6);
        }
      }),
      new ButtonInfo({
        buttonText: "Letter >",
        keepOn: false,
        method: () => {
          nameLetterIndex = (nameLetterIndex + 1) % NAME_ALPHABET.length;
          setTooltip(`letter: ${NAME_ALPHABET[nameLetterIndex]}`, 6);
        }
      }),
      new ButtonInfo({
        buttonText: "< Letter",
        keepOn: false,
        method: () => {
          nameLetterIndex = (nameLetterIndex - 1 + NAME_ALPHABET.length) % NAME_ALPHABET.length;
          setTooltip(`letter: ${NAME_ALPHABET[nameLetterIndex]}`, 6);
        }
      }),
      new ButtonInfo({
        buttonText: "Add Letter",
        keepOn: false,
        method: () => {
          if (nameBuffer.length >= 15) {
            notify("15 characters max", 2.5);
            return;
          }
          nameBuffer += NAME_ALPHABET[nameLetterIndex];
          setTooltip(`name: ${nameBuffer}`, 8);
        }
      }),
      new ButtonInfo({
        buttonText: "Backspace",
        keepOn: false,
        method: () => {
          nameBuffer = nameBuffer.slice(0, -1);
          setTooltip(`name: ${nameBuffer}`, 8);
        }
      }),
      new ButtonInfo({ buttonText: "Clear Name", keepOn: false, method: () => {
        nameBuffer = "";
        setTooltip("name: (empty)", 6);
      } }),
      new ButtonInfo({ buttonText: "Apply Name", keepOn: false, method: () => applyName(nameBuffer) }),
      new ButtonInfo({
        buttonText: "Random Name",
        keepOn: false,
        method: () => {
          nameBuffer = (PRESET_NAMES[Math.floor(Math.random() * PRESET_NAMES.length)] + Math.floor(Math.random() * 1e3)).substring(0, 15);
          applyName(nameBuffer);
        }
      }),
      new ButtonInfo({ buttonText: "Show My Name", keepOn: false, method: () => notify(`you are: ${currentUsername()}`, 4) })
    ],
    [
      new ButtonInfo({ buttonText: "Back", method: () => goTo(0), keepOn: false }),
      new ButtonInfo({ buttonText: "Neon Colours", keepOn: false, method: () => goTo(16), tooltip: "HDR body colours everyone can see" }),
      new ButtonInfo({ buttonText: "Glow +", keepOn: false, method: () => {
        neonIntensity = Math.min(20, neonIntensity + 1);
        setTooltip(`glow: ${neonIntensity}x`, 4);
      } }),
      new ButtonInfo({ buttonText: "Glow -", keepOn: false, method: () => {
        neonIntensity = Math.max(1, neonIntensity - 1);
        setTooltip(`glow: ${neonIntensity}x`, 4);
      } }),
      new ButtonInfo({
        buttonText: "Neon Strobe",
        tooltip: "flashes your body through the neon palette \u2014 everyone sees it",
        // SetColour fires a network property update, so cap it well under framerate.
        method: () => {
          const now = Date.now();
          if (now - lastStrobe < 120)
            return;
          lastStrobe = now;
          const c = strobeColour();
          setColour(c[0], c[1], c[2]);
        },
        disableMethod: () => setColour(1, 1, 1)
      }),
      new ButtonInfo({
        buttonText: "Blinder Flash [T]",
        tooltip: "right trigger drops a huge blown-out sphere on your view",
        method: () => {
          if (!rightTrigger)
            return;
          const now = Date.now();
          if (now - lastBlinder < 220)
            return;
          lastBlinder = now;
          try {
            spawnTemp(getTransform(headCollider).method("get_position").invoke(), 14, neon([1, 1, 1], neonIntensity * 4), 160, 0);
          } catch (_) {
          }
        },
        disableMethod: () => clearTempObjects()
      }),
      new ButtonInfo({
        buttonText: "Neon Trail",
        tooltip: "leaves glowing cubes behind you",
        method: () => {
          const now = Date.now();
          if (now - lastTempSpawn < 70)
            return;
          lastTempSpawn = now;
          hue = (hue + 13) % 360;
          try {
            spawnTemp(getTransform(headCollider).method("get_position").invoke(), 0.22, neonFromHue(hue), 2500, 3);
          } catch (_) {
          }
        },
        disableMethod: () => clearTempObjects()
      }),
      new ButtonInfo({
        buttonText: "Neon Hands",
        tooltip: "glowing orbs on both hands",
        method: () => {
          const now = Date.now();
          if (now - lastTempSpawn < 60)
            return;
          lastTempSpawn = now;
          hue = (hue + 21) % 360;
          const c = neonFromHue(hue);
          try {
            spawnTemp(leftHandTransform.method("get_position").invoke(), 0.12, c, 500, 0);
            spawnTemp(rightHandTransform.method("get_position").invoke(), 0.12, c, 500, 0);
          } catch (_) {
          }
        },
        disableMethod: () => clearTempObjects()
      }),
      new ButtonInfo({
        buttonText: "Neon Rave",
        tooltip: "scatters glowing cubes all around you",
        method: () => {
          const now = Date.now();
          if (now - lastTempSpawn < 45)
            return;
          lastTempSpawn = now;
          hue = (hue + 29) % 360;
          try {
            const [x, y, z] = vec(getTransform(headCollider).method("get_position").invoke());
            spawnTemp([
              x + (Math.random() - 0.5) * 12,
              y + (Math.random() - 0.5) * 6,
              z + (Math.random() - 0.5) * 12
            ], 0.4, neonFromHue(hue), 1600, 3);
          } catch (_) {
          }
        },
        disableMethod: () => clearTempObjects()
      }),
      new ButtonInfo({ buttonText: "Clear Neon", keepOn: false, method: () => {
        const n = tempObjects.length;
        clearTempObjects();
        notify(`cleared ${n}`, 2.5);
      } })
    ],
    [
      new ButtonInfo({ buttonText: "Back", method: () => goTo(0), keepOn: false }),
      new ButtonInfo({
        buttonText: "Next Slot",
        keepOn: false,
        method: () => {
          cosmeticSlot = (cosmeticSlot + 1) % COSMETIC_SLOTS.length;
          dynamicCacheCat = -1;
          setTooltip(`slot: ${COSMETIC_SLOTS[cosmeticSlot]} (${cosmeticsForSlot(cosmeticSlot).length})`, 6);
        }
      }),
      new ButtonInfo({
        buttonText: "Browse Cosmetics",
        keepOn: false,
        method: () => {
          if (totalCosmetics() === 0) {
            notify("no cosmetics found yet", 3);
            return;
          }
          dynamicCacheCat = -1;
          goTo(12);
        }
      }),
      new ButtonInfo({ buttonText: "Clear This Slot", keepOn: false, method: () => {
        setCosmetic(cosmeticSlot, "");
        notify(`cleared ${COSMETIC_SLOTS[cosmeticSlot]}`, 3);
      } }),
      new ButtonInfo({
        buttonText: "Clear All",
        keepOn: false,
        method: () => {
          for (let i = 0; i < COSMETIC_SLOTS.length; i++)
            setCosmetic(i, "");
          notify("cosmetics cleared", 3);
        }
      }),
      new ButtonInfo({
        buttonText: "Rescan",
        keepOn: false,
        method: () => {
          cosmeticsBySlot = [];
          dynamicCacheCat = -1;
          const n = totalCosmetics();
          notify(`found ${n} cosmetics (${cosmeticScanSource})`, 4);
        }
      })
    ],
    [
      new ButtonInfo({ buttonText: "Back", method: () => goTo(0), keepOn: false }),
      new ButtonInfo({ buttonText: "Player List", keepOn: false, method: () => goTo(13) }),
      new ButtonInfo({
        buttonText: "Count Players",
        keepOn: false,
        method: () => {
          const n = findAll(PhotonVRPlayer).filter((p) => !isLocal(p)).length;
          notify(`${n} other ${n === 1 ? "chimp" : "chimps"} here`, 3);
        }
      }),
      new ButtonInfo({
        buttonText: "Player ESP",
        tooltip: "draws a line to everyone in the room",
        method: () => updateEsp(),
        disableMethod: () => clearEsp()
      }),
      new ButtonInfo({ buttonText: "Kick List", keepOn: false, method: () => goTo(13), tooltip: "kick/TP individual players" }),
      new ButtonInfo({ buttonText: "Kick All", keepOn: false, method: () => kickAll(), tooltip: "boots everyone else from the room" })
    ],
    [
      new ButtonInfo({ buttonText: "Back", method: () => goTo(0), keepOn: false }),
      new ButtonInfo({ buttonText: "Room Info", keepOn: false, method: () => notify(roomInfo(), 5) }),
      new ButtonInfo({ buttonText: "New Room", keepOn: false, method: () => hopServer(), tooltip: "leave and join a fresh random room" }),
      new ButtonInfo({ buttonText: "Leave Room", keepOn: false, method: () => {
        leaveRoom();
        notify("left the room", 3);
      } }),
      new ButtonInfo({ buttonText: "Rejoin", keepOn: false, method: () => {
        joinRandom();
        notify("rejoining...", 3);
      } }),
      new ButtonInfo({ buttonText: "Private Room", keepOn: false, method: () => goTo(14), tooltip: "type a room code and join it" })
    ],
    [
      new ButtonInfo({ buttonText: "Back", method: () => goTo(0), keepOn: false }),
      new ButtonInfo({ buttonText: "Xera", keepOn: false }),
      new ButtonInfo({ buttonText: "Joshua Walker", keepOn: false }),
      new ButtonInfo({ buttonText: "Discord", keepOn: false, method: () => {
        try {
          const Application = UnityEngineCore.class("UnityEngine.Application");
          Application.method("OpenURL").invoke(Il2Cpp.string("https://discord.gg/hA6E8Cjt3w"));
          notify("opening discord", 3);
        } catch (e) {
          console.log("[Xra] OpenURL: " + e);
          notify("failed to open", 3);
        }
      } })
    ],
    [
      // Preset names [11] — filled below
      // Preset names [11] — filled below
    ],
    [
      // Cosmetic browser [12] — dynamic
      // Cosmetic browser [12] — dynamic
    ],
    [
      // Player list [13] — dynamic
      // Player list [13] — dynamic
    ],
    [
      // Private room code [14] — filled below
      // Private room code [14] — filled below
    ],
    [
      // Prefab list [15] — filled below
      // Prefab list [15] — filled below
    ],
    [
      // Neon colours [16] — filled below
      // Neon colours [16] — filled below
    ],
    [
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
          for (const p of playersOthers())
            if (renamePhotonPlayer(p, n))
              c++;
          try {
            sendAllOutgoing();
          } catch (_) {
          }
          notify(`renamed ${c} to ${n}`, 4);
        }
      }),
      new ButtonInfo({
        buttonText: "God Speed",
        tooltip: "cranks your max jump/move speed",
        enableMethod: () => {
          setFloatField("maxJumpSpeed", 45);
          setFloatField("jumpMultiplier", 3);
          setFloatField("velocityLimit", 45);
          notify("god speed on", 3);
        },
        disableMethod: () => {
          setFloatField("maxJumpSpeed", 6.5);
          setFloatField("jumpMultiplier", 1.1);
          setFloatField("velocityLimit", 6.5);
          notify("speed reset", 3);
        }
      }),
      new ButtonInfo({
        buttonText: "Freeze Me",
        tooltip: "toggles Player.disableMovement",
        enableMethod: () => {
          try {
            GTPlayer.field("disableMovement").value = true;
          } catch (_) {
          }
          notify("movement frozen", 3);
        },
        disableMethod: () => {
          try {
            GTPlayer.field("disableMovement").value = false;
          } catch (_) {
          }
          notify("movement freed", 3);
        }
      }),
      new ButtonInfo({ buttonText: "Reveal Mod IDs", keepOn: false, method: () => unlockModTools(), tooltip: "same flag also shows other players' PlayFab IDs" })
    ],
    [
      // Trolls [18] — filled below
      // Trolls [18] — filled below
    ],
    [
      // Troll Target [19] — filled dynamically
      // Troll Target [19] — filled dynamically
    ],
    [
      // Kick Tools [20] — filled below
      // Kick Tools [20] — filled below
    ]
  ];
  buttons[11].push(new ButtonInfo({ buttonText: "Back", method: () => goTo(5), keepOn: false }));
  for (const n of PRESET_NAMES) {
    buttons[11].push(new ButtonInfo({
      buttonText: n,
      keepOn: false,
      method: () => {
        nameBuffer = n;
        applyName(n);
      }
    }));
  }
  buttons[15].push(new ButtonInfo({ buttonText: "Back", method: () => goTo(4), keepOn: false }));
  LOCAL_PREFABS.forEach((name, idx) => {
    buttons[15].push(new ButtonInfo({
      buttonText: name,
      keepOn: false,
      method: () => {
        selectedPrefabIndex = idx;
        setTooltip(`prefab: ${name}`, 8);
        notify(`selected ${name}`, 3);
      }
    }));
  });
  buttons[16].push(new ButtonInfo({ buttonText: "Back", method: () => goTo(6), keepOn: false }));
  for (const [label, base] of NEON_HUES) {
    buttons[16].push(new ButtonInfo({
      buttonText: `Neon ${label}`,
      keepOn: false,
      method: () => {
        const c = neon(base);
        setColour(c[0], c[1], c[2]);
        notify(`neon ${label.toLowerCase()} @ ${neonIntensity}x`, 3);
      }
    }));
  }
  buttons[16].push(new ButtonInfo({
    buttonText: "Random Neon",
    keepOn: false,
    method: () => {
      const c = neonFromHue(Math.floor(Math.random() * 360));
      setColour(c[0], c[1], c[2]);
      notify("random neon", 2.5);
    }
  }));
  buttons[16].push(new ButtonInfo({
    buttonText: "Reset Colour",
    keepOn: false,
    method: () => {
      setColour(1, 1, 1);
      notify("colour reset", 2.5);
    }
  }));
  buttons[14].push(new ButtonInfo({ buttonText: "Back", method: () => goTo(9), keepOn: false }));
  for (let d = 0; d <= 9; d++) {
    buttons[14].push(new ButtonInfo({
      buttonText: `Code ${d}`,
      keepOn: false,
      method: () => {
        if (roomCodeBuffer.length >= 8) {
          notify("code is full", 2.5);
          return;
        }
        roomCodeBuffer += String(d);
        setTooltip(`code: ${roomCodeBuffer}`, 8);
      }
    }));
  }
  buttons[14].push(new ButtonInfo({ buttonText: "Code Back", keepOn: false, method: () => {
    roomCodeBuffer = roomCodeBuffer.slice(0, -1);
    setTooltip(`code: ${roomCodeBuffer}`, 8);
  } }));
  buttons[14].push(new ButtonInfo({ buttonText: "Code Clear", keepOn: false, method: () => {
    roomCodeBuffer = "";
    setTooltip("code: (empty)", 6);
  } }));
  buttons[14].push(new ButtonInfo({
    buttonText: "Join Code",
    keepOn: false,
    method: () => {
      if (roomCodeBuffer.length === 0) {
        notify("enter a code first", 2.5);
        return;
      }
      joinPrivate(roomCodeBuffer);
    }
  }));
  let trollTargetIndex = 0;
  const RPC_ALL = 0;
  const RPC_OTHERS = 1;
  function findPV(goName) {
    try {
      const go = GameObject.method("Find").invoke(Il2Cpp.string(goName));
      if (go && !go.isNull()) {
        const pv = getComponent(go, PhotonView);
        if (pv && !pv.isNull())
          return pv;
      }
    } catch (_) {
    }
    return null;
  }
  function claimMaster() {
    try {
      const lp = PhotonNetwork.method("get_LocalPlayer").invoke();
      PhotonNetwork.method("SetMasterClient").invoke(lp);
      notify("claimed master", 2);
    } catch (e) {
      console.log("[Xra] claimMaster: " + e);
    }
  }
  function claimOwnership(pv) {
    try {
      if (!pv.method("get_IsMine").invoke())
        pv.method("RequestOwnership").invoke();
    } catch (_) {
    }
  }
  function boxInt(n) {
    const intClass = Il2Cpp.corlib.class("System.Int32");
    const mem = Memory.alloc(4);
    mem.writeS32(n);
    return new Il2Cpp.Object(Il2Cpp.exports.valueTypeBox(intClass, mem));
  }
  function makeParamArr(...args) {
    const objClass = Il2Cpp.corlib.class("System.Object");
    const boxed = args.map((a) => typeof a === "number" ? boxInt(a) : a);
    return Il2Cpp.array(objClass, boxed);
  }
  function sendRPCAll(goName, methodName, ...args) {
    const pv = findPV(goName);
    if (!pv) {
      notify(`${goName} not found`, 3);
      return;
    }
    claimOwnership(pv);
    try {
      pv.method("RPC").overload("System.String", "Photon.Pun.RpcTarget", "System.Object[]").invoke(Il2Cpp.string(methodName), RPC_ALL, makeParamArr(...args));
      notify(`${methodName}`, 2);
    } catch (e) {
      console.log(`[Xra] RPC ${methodName}: ${e}`);
      notify(`${methodName} failed`, 3);
    }
  }
  function sendRPCToPlayer(goName, methodName, targetPlayer, ...args) {
    const pv = findPV(goName);
    if (!pv) {
      notify(`${goName} not found`, 3);
      return;
    }
    claimOwnership(pv);
    try {
      pv.method("RPC").overload("System.String", "Photon.Realtime.Player", "System.Object[]").invoke(Il2Cpp.string(methodName), targetPlayer, makeParamArr(...args));
      notify(`${methodName}`, 2);
    } catch (e) {
      console.log(`[Xra] RPC\u2192player ${methodName}: ${e}`);
      notify(`${methodName} failed`, 3);
    }
  }
  function getTargetPlayer() {
    const others = playersOthers();
    if (others.length === 0)
      return null;
    return others[trollTargetIndex % others.length];
  }
  function getTargetActorNr() {
    const p = getTargetPlayer();
    if (!p)
      return -1;
    try {
      return p.method("get_ActorNumber").invoke();
    } catch (_) {
      return -1;
    }
  }
  function getTargetName() {
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
        method: () => {
          trollTargetIndex = idx;
          notify(`target: ${name}`, 3);
          goTo(18);
        }
      }));
    });
    if (others.length === 0)
      buttons[19].push(new ButtonInfo({ buttonText: "No players", keepOn: false, method: () => {
      } }));
  }
  function trollToTarget(rpcName) {
    const p = getTargetPlayer();
    if (!p) {
      notify("pick a target", 2);
      return;
    }
    sendRPCToPlayer("TrollManager", rpcName, p);
  }
  function trollToAll(rpcName) {
    sendRPCAll("TrollManager", rpcName);
  }
  function kickToTarget(rpcName) {
    const p = getTargetPlayer();
    if (!p) {
      notify("pick a target", 2);
      return;
    }
    sendRPCToPlayer("KickManager", rpcName, p);
  }
  buttons[18].push(new ButtonInfo({ buttonText: "Back", method: () => goTo(0), keepOn: false }));
  buttons[18].push(new ButtonInfo({ buttonText: "Set Master", keepOn: false, method: () => claimMaster() }));
  buttons[18].push(new ButtonInfo({ buttonText: "Pick Target", keepOn: false, method: () => {
    buildTrollTargetList();
    goTo(19);
  } }));
  buttons[18].push(new ButtonInfo({ buttonText: "Target >", keepOn: false, method: () => {
    const others = playersOthers();
    if (others.length === 0) {
      notify("no players", 2);
      return;
    }
    trollTargetIndex = (trollTargetIndex + 1) % others.length;
    notify(`target: ${getTargetName()}`, 3);
  } }));
  buttons[18].push(new ButtonInfo({ buttonText: "Kick Tools", keepOn: false, method: () => goTo(20) }));
  buttons[18].push(new ButtonInfo({ buttonText: ">> TARGET <<", keepOn: false, method: () => notify(`target: ${getTargetName()}`, 3) }));
  buttons[18].push(new ButtonInfo({ buttonText: "Freeze Target", keepOn: false, method: () => trollToTarget("FreezeRPC") }));
  buttons[18].push(new ButtonInfo({ buttonText: "Blind Target", keepOn: false, method: () => trollToTarget("BlindRPC") }));
  buttons[18].push(new ButtonInfo({ buttonText: "High Target", keepOn: false, method: () => trollToTarget("HighRPC") }));
  buttons[18].push(new ButtonInfo({ buttonText: "Invis Target", keepOn: false, method: () => trollToTarget("InvisRPC") }));
  buttons[18].push(new ButtonInfo({ buttonText: "ZeroGrav Target", keepOn: false, method: () => trollToTarget("ZeroGravRPC") }));
  buttons[18].push(new ButtonInfo({ buttonText: "Fling Target", keepOn: false, method: () => trollToTarget("FlingPlayerRPC") }));
  buttons[18].push(new ButtonInfo({ buttonText: "Jumpscare Target", keepOn: false, method: () => {
    const p = getTargetPlayer();
    if (!p) {
      notify("pick a target", 2);
      return;
    }
    const name = photonPlayerName(p);
    sendRPCToPlayer("TrollManager", "JumpscarePlayerRPC", p, Il2Cpp.string(name));
  } }));
  buttons[18].push(new ButtonInfo({ buttonText: "Missile Here", keepOn: false, method: () => {
    try {
      const pos = rightHandTransform.method("get_position").invoke();
      sendRPCAll("TrollManager", "MissleRPC", pos);
    } catch (_) {
      notify("missile failed", 2);
    }
  } }));
  buttons[18].push(new ButtonInfo({ buttonText: "TP Target To Me", keepOn: false, method: () => {
    try {
      const pos = GTPlayer.method("get_transform").invoke().method("get_position").invoke();
      sendRPCToPlayer("TrollManager", "TeleportSelfRPC", getTargetPlayer(), pos);
    } catch (e) {
      notify("tp failed", 2);
      console.log("[Xra] tp: " + e);
    }
  } }));
  buttons[18].push(new ButtonInfo({ buttonText: ">> ALL PLAYERS <<", keepOn: false, method: () => {
  } }));
  buttons[18].push(new ButtonInfo({ buttonText: "Freeze All", keepOn: false, method: () => trollToAll("FreezeRPC") }));
  buttons[18].push(new ButtonInfo({ buttonText: "Blind All", keepOn: false, method: () => trollToAll("BlindRPC") }));
  buttons[18].push(new ButtonInfo({ buttonText: "High All", keepOn: false, method: () => trollToAll("HighRPC") }));
  buttons[18].push(new ButtonInfo({ buttonText: "Fling All", keepOn: false, method: () => trollToAll("FlingPlayerRPC") }));
  buttons[18].push(new ButtonInfo({ buttonText: "ZeroGrav All", keepOn: false, method: () => trollToAll("ZeroGravRPC") }));
  buttons[20].push(new ButtonInfo({ buttonText: "Back", method: () => goTo(18), keepOn: false }));
  buttons[20].push(new ButtonInfo({ buttonText: "Set Master", keepOn: false, method: () => claimMaster() }));
  buttons[20].push(new ButtonInfo({ buttonText: ">> TARGET <<", keepOn: false, method: () => notify(`target: ${getTargetName()}`, 3) }));
  buttons[20].push(new ButtonInfo({ buttonText: "Kick Target", keepOn: false, method: () => {
    const p = getTargetPlayer();
    if (!p) {
      notify("pick a target", 2);
      return;
    }
    const name = photonPlayerName(p);
    sendRPCToPlayer("KickManager", "Kick", p, Il2Cpp.string(name));
  } }));
  buttons[20].push(new ButtonInfo({ buttonText: "Ban Target", keepOn: false, method: () => {
    const p = getTargetPlayer();
    if (!p) {
      notify("pick a target", 2);
      return;
    }
    const name = photonPlayerName(p);
    sendRPCToPlayer("KickManager", "Ban", p, Il2Cpp.string(name));
  } }));
  buttons[20].push(new ButtonInfo({ buttonText: "Mute Target", keepOn: false, method: () => {
    const p = getTargetPlayer();
    if (!p) {
      notify("pick a target", 2);
      return;
    }
    sendRPCToPlayer("KickManager", "MutePlayerRPC", p, Il2Cpp.string(photonPlayerName(p)), boxInt(1));
  } }));
  buttons[20].push(new ButtonInfo({ buttonText: "Unmute Target", keepOn: false, method: () => {
    const p = getTargetPlayer();
    if (!p) {
      notify("pick a target", 2);
      return;
    }
    sendRPCToPlayer("KickManager", "UnmutePlayerRPC", p, Il2Cpp.string(photonPlayerName(p)), boxInt(0));
  } }));
  buttons[20].push(new ButtonInfo({ buttonText: "Explode Target", keepOn: false, method: () => {
    const p = getTargetPlayer();
    if (!p) {
      notify("pick a target", 2);
      return;
    }
    const actorNr = getTargetActorNr();
    sendRPCToPlayer("KickManager", "StartIdenEXPLODERPC", p, boxInt(actorNr), Il2Cpp.string(photonPlayerName(p)));
  } }));
  buttons[20].push(new ButtonInfo({ buttonText: "TP Target Here", keepOn: false, method: () => {
    try {
      const pos = GTPlayer.method("get_transform").invoke().method("get_position").invoke();
      sendRPCToPlayer("KickManager", "TeleportSelfRPC", getTargetPlayer(), pos);
    } catch (e) {
      notify("tp failed", 2);
    }
  } }));
  buttons[20].push(new ButtonInfo({ buttonText: "Sound 1", keepOn: false, method: () => sendRPCAll("KickManager", "Sound", boxInt(0), boxInt(1)) }));
  buttons[20].push(new ButtonInfo({ buttonText: "Sound 2", keepOn: false, method: () => sendRPCAll("KickManager", "Sound", boxInt(1), boxInt(1)) }));
  buttons[20].push(new ButtonInfo({ buttonText: "Sound 3", keepOn: false, method: () => sendRPCAll("KickManager", "Sound", boxInt(2), boxInt(1)) }));
  buttons[20].push(new ButtonInfo({ buttonText: "Stop Sounds", keepOn: false, method: () => sendRPCAll("KickManager", "StopSounds", boxInt(0)) }));
  buttons[20].push(new ButtonInfo({ buttonText: "End Sound", keepOn: false, method: () => sendRPCAll("KickManager", "EndSound") }));
  function buildCosmeticButtons() {
    const out = [new ButtonInfo({ buttonText: "Back", method: () => goTo(7), keepOn: false })];
    const ids = cosmeticsForSlot(cosmeticSlot);
    for (const id of ids) {
      out.push(new ButtonInfo({
        buttonText: id,
        keepOn: false,
        method: () => {
          setCosmetic(cosmeticSlot, id);
          notify(`${COSMETIC_SLOTS[cosmeticSlot]}: ${id}`, 3);
        }
      }));
    }
    if (ids.length === 0)
      out.push(new ButtonInfo({ buttonText: "none for this slot", keepOn: false }));
    return out;
  }
  function buildPlayerButtons() {
    const out = [new ButtonInfo({ buttonText: "Back", method: () => goTo(8), keepOn: false })];
    for (const p of findAll(PhotonVRPlayer)) {
      if (isLocal(p))
        continue;
      const label = playerName(p);
      out.push(new ButtonInfo({
        buttonText: `TP: ${label}`,
        keepOn: false,
        tooltip: `teleport next to ${label}`,
        method: () => {
          const pos = playerHeadPos(p);
          if (!pos) {
            notify("they left already", 2.5);
            return;
          }
          const [x, y, z] = vec(pos);
          teleportTo([x + 1, y, z]);
          notify(`warped to ${label}`, 3);
        }
      }));
      out.push(new ButtonInfo({
        buttonText: `Kick: ${label}`,
        keepOn: false,
        tooltip: `boot ${label} from the room`,
        method: () => {
          const owner = ownerOf(p);
          if (!owner) {
            notify("can't resolve them", 2.5);
            return;
          }
          if (kickPhotonPlayer(owner)) {
            try {
              sendAllOutgoing();
            } catch (_) {
            }
            notify(`kicked ${label}`, 3);
          }
        }
      }));
    }
    if (out.length === 1)
      out.push(new ButtonInfo({ buttonText: "nobody here :(", keepOn: false }));
    return out;
  }
  const dynamicCats = {
    12: buildCosmeticButtons,
    13: buildPlayerButtons
  };
  let dynamicCache = [];
  let dynamicCacheCat = -1;
  function currentSource() {
    const dyn = dynamicCats[currentCategory];
    if (dyn) {
      if (dynamicCacheCat !== currentCategory) {
        try {
          dynamicCache = dyn();
        } catch (_) {
          dynamicCache = [];
        }
        dynamicCacheCat = currentCategory;
      }
      return dynamicCache;
    }
    dynamicCacheCat = -1;
    return buttons[currentCategory] || [];
  }
  function getIndex(buttonText) {
    const src = currentSource();
    for (const b of src)
      if (b.buttonText === buttonText)
        return b;
    for (const b of buttons[1])
      if (b.buttonText === buttonText)
        return b;
    for (const cat of buttons)
      for (const b of cat)
        if (b.buttonText === buttonText)
          return b;
    return void 0;
  }
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
    try {
      addComponent(canvasObject, GraphicRaycaster);
    } catch (_) {
    }
    canvas.method("set_renderMode").invoke(2);
    canvasScaler.method("set_dynamicPixelsPerUnit").invoke(1e3);
    const chromeButton = (label, z) => {
      const b = createObject([0.1, z, 0.205], identityQuaternion, [0.09, 0.2682, 0.075], 3, buttonColor, getTransform(menu), menuCornerRadius([0.09, 0.2682, 0.075]));
      createObject([0.1, z, 0.205], identityQuaternion, [0.08, 0.3, 0.1], 3, bgColor2, getTransform(menu), menuCornerRadius([0.08, 0.3, 0.1]));
      b.method("set_name").invoke(Il2Cpp.string("@" + label));
      if (ButtonBehaviour)
        addComponent(b, ButtonBehaviour);
      try {
        getComponent(b, BoxCollider).method("set_isTrigger").invoke(true);
      } catch (_) {
      }
      renderMenuText(canvasObject, label, textColor, [0.105, z, 0.205], [0.15, 0.15]);
    };
    chromeButton("Home", -0.06);
    chromeButton("Leave", 0.06);
    const pageCount = Math.max(1, Math.ceil(currentSource().length / 6));
    renderMenuText(canvasObject, `${gradientText(menuName, textColor, buttonPressedColor)} [ ${currentPage + 1}/${pageCount} ]`, textColor, [0.11, 0, 0.155], [1, 0.08], { render: (phase) => `${animatedGradientText(menuName, textColor, buttonPressedColor, phase)} [ ${currentPage + 1}/${pageCount} ]` });
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
    for (const [label, y] of [["PreviousPage", 0.17], ["NextPage", -0.17]]) {
      const pageButton = createObject([0.1, y, 0], identityQuaternion, [0.09, 0.15, 0.58], 3, buttonColor, getTransform(menu), menuCornerRadius([0.09, 0.15, 0.58]));
      createObject([0.1, y, 0], identityQuaternion, [0.08, 0.16, 0.59], 3, bgColor2, getTransform(menu), menuCornerRadius([0.08, 0.16, 0.59]));
      pageButton.method("set_name").invoke(Il2Cpp.string("@" + label));
      if (ButtonBehaviour)
        addComponent(pageButton, ButtonBehaviour);
      try {
        getComponent(pageButton, BoxCollider).method("set_isTrigger").invoke(true);
      } catch (_) {
      }
      renderMenuText(canvasObject, label === "NextPage" ? ">" : "<", textColor, [0.11, y, 0], [1, 0.1]);
    }
    let i = 0;
    currentSource().slice(currentPage * 6).slice(0, 6).forEach((buttonData) => {
      const zc = 0.09 - i * 0.04;
      const button = createObject([0.105, 0, zc], identityQuaternion, [0.09, 0.81, 0.03], 3, buttonColor, getTransform(menu));
      const edge1 = createObject([0.105, 0, zc + 0.01], identityQuaternion, [0.09, 0.77, 0.03], 3, buttonColor, getTransform(menu));
      const edge2 = createObject([0.105, 0, zc - 0.01], identityQuaternion, [0.09, 0.77, 0.03], 3, buttonColor, getTransform(menu));
      const c1 = createObject([0.1045, 0.115, zc - 8e-3], [0, 0, 0.7071, 0.7071], [0.025, 0.025, 0.04], 2, buttonColor, getTransform(menu));
      const c2 = createObject([0.1045, 0.115, zc + 8e-3], [0, 0, 0.7071, 0.7071], [0.025, 0.025, 0.04], 2, buttonColor, getTransform(menu));
      const c3 = createObject([0.1045, -0.115, zc + 8e-3], [0, 0, 0.7071, 0.7071], [0.025, 0.025, 0.04], 2, buttonColor, getTransform(menu));
      const c4 = createObject([0.1045, -0.115, zc - 8e-3], [0, 0, 0.7071, 0.7071], [0.025, 0.025, 0.04], 2, buttonColor, getTransform(menu));
      for (const cc of [edge1, edge2, c1, c2, c3, c4]) {
        try {
          getComponent(cc, Collider).method("set_isTrigger").invoke(true);
        } catch (_) {
        }
      }
      button.method("set_name").invoke(Il2Cpp.string("@" + buttonData.buttonText));
      if (ButtonBehaviour)
        addComponent(button, ButtonBehaviour);
      try {
        getComponent(button, BoxCollider).method("set_isTrigger").invoke(true);
      } catch (_) {
      }
      renderMenuText(canvasObject, gradientText(buttonData.buttonText, textColor, buttonPressedColor), textColor, [0.11, 0, zc], [1, 0.1], canGradient(buttonData.buttonText) ? { render: (phase) => animatedGradientText(buttonData.buttonText, textColor, buttonPressedColor, phase) } : null);
      for (const part of [button, edge1, edge2, c1, c2, c3, c4])
        updateButtonColor(part, buttonData);
      i++;
    });
    recenterMenu();
  }
  function renderReference() {
    reference = createObject(zeroVector, identityQuaternion, [0.01, 0.01, 0.01], 0, buttonPressedColor, rightHandTransform);
    referenceCollider = getComponent(reference, Collider);
    getTransform(reference).method("set_localPosition").invoke([0.01, 0, 0.2]);
    try {
      reference.method("set_layer").invoke(2);
    } catch (_) {
    }
    try {
      addComponent(reference, Rigidbody).method("set_isKinematic").invoke(true);
    } catch (_) {
    }
  }
  if (ButtonBehaviour) {
    try {
      const ButtonActivation = ButtonBehaviour.method("OnTriggerEnter");
      ButtonActivation.implementation = function(collider) {
        try {
          const rawName = this.method("get_name").invoke().toString();
          if (rawName.length > 2 && rawName[1] == "@") {
            if (referenceCollider && collider.handle.equals(referenceCollider.handle)) {
              const goName = rawName.substring(2, rawName.length - 1);
              const _time = Time.method("get_time").invoke();
              if (_time > buttonClickDelay) {
                buttonClickDelay = _time + 0.25;
                const button = getIndex(goName);
                if (button) {
                  if (button.tooltip)
                    setTooltip(button.tooltip, 4);
                  if (button.keepOn) {
                    button.enabled = !button.enabled;
                    try {
                      (button.enabled ? button.enableMethod : button.disableMethod)?.();
                    } catch (e) {
                      console.log("[Xra] toggle " + goName + ": " + e);
                    }
                  } else {
                    try {
                      button.method?.();
                    } catch (e) {
                      console.log("[Xra] press " + goName + ": " + e);
                    }
                  }
                  reloadMenu();
                }
              }
            }
            return;
          }
        } catch (e) {
          console.log("[Xra] OnTriggerEnter: " + e);
        }
        return this.method("OnTriggerEnter").invoke(collider);
      };
      console.log("[Xra] button hook installed on " + ButtonBehaviour.name);
    } catch (e) {
      console.log("[Xra] button hook failed: " + e);
    }
  }
  function reacquireRefs() {
    try {
      const newGT = GTPlayerClass.method("get_Instance").invoke();
      if (!newGT || newGT.isNull())
        return false;
      let lh = null, rh = null, hc = null;
      try {
        lh = newGT.field("leftHandTransform").value;
      } catch (_) {
      }
      try {
        rh = newGT.field("rightHandTransform").value;
      } catch (_) {
      }
      try {
        hc = newGT.field("headCollider").value;
      } catch (_) {
      }
      if (!lh || lh.isNull())
        return false;
      GTPlayer = newGT;
      leftHandTransform = lh;
      if (rh && !rh.isNull())
        rightHandTransform = rh;
      if (hc && !hc.isNull())
        headCollider = hc;
      rigidbody = findRigidbody();
      savedLocomotionMask = null;
      try {
        PlayerUpdate = GTPlayer.method("Update");
      } catch (_) {
      }
      try {
        if (menu != null) {
          Destroy(menu);
          menu = null;
        }
      } catch (_) {
        menu = null;
      }
      try {
        if (reference != null) {
          Destroy(reference);
          reference = null;
        }
      } catch (_) {
        reference = null;
      }
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
    } catch (e) {
      console.log("[Xra] reacquire: " + e);
      return false;
    }
  }
  let PlayerUpdate = GTPlayer.method("Update");
  PlayerUpdate.implementation = function() {
    if (!sceneReady) {
      try {
        const _t = Time.method("get_time").invoke();
        if (_t < sceneRecheckDelay)
          return PlayerUpdate.invoke();
        sceneRecheckDelay = _t + 0.5;
      } catch (_) {
        return PlayerUpdate.invoke();
      }
      if (reacquireRefs()) {
        sceneReady = true;
        console.log("[Xra] scene recovered");
      }
      return PlayerUpdate.invoke();
    }
    try {
      const _chk = GTPlayerClass.method("get_Instance").invoke();
      const _dead = !_chk || _chk.isNull();
      const _swap = !_dead && (GTPlayer == null || !GTPlayer.handle.equals(_chk.handle));
      if (_dead || _swap) {
        sceneReady = false;
        try {
          sceneRecheckDelay = Time.method("get_time").invoke() + (_swap ? 0.25 : 1.5);
        } catch (_) {
        }
        try {
          if (menu != null) {
            Destroy(menu);
            menu = null;
          }
        } catch (_) {
          menu = null;
        }
        animatedMenuTexts.length = 0;
        return PlayerUpdate.invoke();
      }
    } catch (_) {
      sceneReady = false;
      return PlayerUpdate.invoke();
    }
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
      deltaTime = Time.method("get_deltaTime").invoke();
      time = Time.method("get_time").invoke();
      updateAnimatedMenuText();
      if (leftSecondary) {
        if (menu != null && currentTooltip !== "" && Date.now() >= tooltipResetTime) {
          currentTooltip = "";
          reloadMenu();
        }
        if (menu == null)
          renderMenu();
        else
          recenterMenu();
      } else if (menu != null) {
        Destroy(menu);
        menu = null;
        animatedMenuTexts.length = 0;
      }
      if (menu == null) {
        if (reference != null) {
          Destroy(reference);
          reference = null;
        }
      } else if (reference == null) {
        renderReference();
      }
      for (const cat of buttons) {
        for (const button of cat) {
          if (!button.enabled || !button.method)
            continue;
          try {
            button.method();
          } catch (e) {
            console.log(`[Xra] '${button.buttonText}': ${e}`);
          }
        }
      }
      reapTempObjects();
      const nowHide = Date.now();
      for (const slot of notifSlots) {
        if (slot.go != null && slot.expiry > 0 && nowHide > slot.expiry) {
          try {
            slot.go.method("SetActive").invoke(false);
          } catch (_) {
          }
        }
      }
      if (pendingRejoinAt > 0 && Date.now() > pendingRejoinAt) {
        pendingRejoinAt = 0;
        joinRandom();
      }
      if (themeIndex === RGB_THEME_INDEX && menu != null) {
        hue = (hue + 9) % 360;
        try {
          if (menuBgRenderer != null) {
            try {
              setMaterialColour(menuBgRenderer, neonFromHue(hue, 3));
            } catch (_) {
              menuBgRenderer = null;
            }
          }
          if (menuBg2Renderer != null) {
            try {
              setMaterialColour(menuBg2Renderer, neonFromHue((hue + 40) % 360, 1.6));
            } catch (_) {
              menuBg2Renderer = null;
            }
          }
        } catch (_) {
        }
      }
    } catch (e) {
      console.log("[Xra] tick error: " + e);
    }
    return PlayerUpdate.invoke();
  };
  try {
    applyName("<size=200%><color=red>XERA.LOL");
  } catch (_) {
  }
  console.log("[Xra] loaded \u2014 hold Y on the left controller to open");
});

✄
{
  "version": 3,
  "sources": ["ChimplabMenu.ts"],
  "mappings": "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",
  "names": ["b"]
}
