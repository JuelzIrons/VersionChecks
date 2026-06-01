// Juelz's AC menu v3.1
// I removed obfuscation from the menu so people can use it as a template for their own mods if they want, but the code is still pretty messy and not designed for reuse, so good luck with that
// If you use my code give credits please
// for questions or concerns contact me at juelz.muppet860@passinbox.com

Il2Cpp.perform(() => {
  {
    const W = 54;
    const pad = "  ";
    const line = (s) => pad + "\u2551 " + s + " ".repeat(Math.max(0, W - 2 - s.length)) + "\u2551";
    const center = (s) => {
      const inner = W - 2;
      const left = Math.max(0, Math.floor((inner - s.length) / 2));
      return line(" ".repeat(left) + s);
    };
    const top = pad + "\u2554" + "\u2550".repeat(W) + "\u2557";
    const mid = pad + "\u2560" + "\u2550".repeat(W) + "\u2563";
    const bot = pad + "\u255A" + "\u2550".repeat(W) + "\u255D";
    console.log("");
    console.log(top);
    console.log(line(""));
    console.log(center("Juelz's AC menu   v3.1"));
    console.log(line(""));
    console.log(mid);
    console.log(line("I have quit discord and will not be responding to DMs."));
    console.log(line("If you see anyone claiming to be me, they are lying."));
    console.log(line("This menu will not receive updates but il2cpp symbols will stay up-to-date."));
    console.log(line("if theres a genuinely urgent issue you can reach out to me in email juelz.muppet860@passinbox.com"));
    console.log(line("There is no more discord server -- If you were sold this you were scammed."));
    console.log(mid);
    console.log(center(">> CLICK Y ON LEFT CONTROLLER TO OPEN <<"));
    console.log(bot);
    console.log("");
  }
  const acImage = Il2Cpp.domain.assembly("AnimalCompany").image;
  const coreImage = Il2Cpp.domain.assembly("UnityEngine.CoreModule").image;
  const uiImage = Il2Cpp.domain.assembly("UnityEngine.UI").image;
  const uiModImage = Il2Cpp.domain.assembly("UnityEngine.UIModule").image;
  const textImage = Il2Cpp.domain.assembly("UnityEngine.TextRenderingModule").image;
  const physImage = Il2Cpp.domain.assembly("UnityEngine.PhysicsModule").image;
  let xrImage = null;
  for (const name of ["UnityEngine.XRModule", "UnityEngine.XR", "UnityEngine.SpatialTracking", "Unity.XR.Management"]) {
    try {
      xrImage = Il2Cpp.domain.assembly(name).image;
      break;
    } catch (_) {
    }
  }
  if (!xrImage) {
    console.log("[XeraCompany] WARNING: XR assembly not found. XR input disabled.");
    try {
      const asms = Il2Cpp.domain.assemblies;
      for (const a of asms)
        console.log("[XeraCompany] assembly:", a.name);
    } catch (_) {
    }
  }
  const GameObjectClass = coreImage.class("UnityEngine.GameObject");
  const ObjectClass = coreImage.class("UnityEngine.Object");
  const Vector3Class = coreImage.class("UnityEngine.Vector3");
  const QuaternionClass = coreImage.class("UnityEngine.Quaternion");
  const TimeClass = coreImage.class("UnityEngine.Time");
  const ResourcesClass = coreImage.class("UnityEngine.Resources");
  const MaterialClass = coreImage.class("UnityEngine.Material");
  const ShaderClass = coreImage.class("UnityEngine.Shader");
  const RendererClass = coreImage.class("UnityEngine.Renderer");
  const CanvasClass = uiModImage.class("UnityEngine.Canvas");
  const CanvasScalerClass = uiImage.class("UnityEngine.UI.CanvasScaler");
  const TextClass = uiImage.class("UnityEngine.UI.Text");
  const FontClass = textImage.class("UnityEngine.Font");
  const RectTransformClass = coreImage.class("UnityEngine.RectTransform");
  const MeshColliderClass = physImage.class("UnityEngine.MeshCollider");
  const PhysicsClass = physImage.class("UnityEngine.Physics");
  const QualitySettingsClass = coreImage.class("UnityEngine.QualitySettings");
  let InputDevicesClass = null;
  let InputDeviceClass = null;
  let CommonUsagesClass = null;
  let XRSettingsClass = null;
  if (xrImage) {
    try {
      InputDevicesClass = xrImage.class("UnityEngine.XR.InputDevices");
    } catch (_) {
    }
    try {
      InputDeviceClass = xrImage.class("UnityEngine.XR.InputDevice");
    } catch (_) {
    }
    try {
      CommonUsagesClass = xrImage.class("UnityEngine.XR.CommonUsages");
    } catch (_) {
    }
    try {
      XRSettingsClass = xrImage.class("UnityEngine.XR.XRSettings");
    } catch (_) {
    }
  }
  const GorillaLocomotionClass = acImage.class("AnimalCompany.GorillaLocomotion");
  const NetPlayerClass = acImage.class("AnimalCompany.NetPlayer");
  const GameManagerClass = acImage.class("AnimalCompany.GameManager");
  const MobControllerClass = acImage.class("AnimalCompany.MobController");
  const ItemSellingMachineClass = acImage.class("AnimalCompany.ItemSellingMachineController");
  const PlayerBuffControllerClass = acImage.class("AnimalCompany.PlayerBuffController");
  const PlayerBuffClass = acImage.class("AnimalCompany.PlayerBuff");
  const GrabbableObjectClass = acImage.class("AnimalCompany.GrabbableObject");
  const PrefabGenClass = acImage.class("AnimalCompany.PrefabGenerator");
  const GrabbableItemClass = acImage.class("AnimalCompany.GrabbableItem");
  const BackpackItemClass = acImage.class("AnimalCompany.BackpackItem");
  let UberShader = null;
  let TextShader = null;
  const uberCandidates = [
    "Universal Render Pipeline/Unlit",
    "Universal Render Pipeline/Lit",
    "URP/Unlit",
    "Sprites/Default",
    "Hidden/InternalErrorShader"
  ];
  for (const name of uberCandidates) {
    try {
      const s = ShaderClass.method("Find").invoke(Il2Cpp.string(name));
      if (s && !s.handle.isNull()) {
        UberShader = s;
        break;
      }
    } catch (_) {
    }
  }
  const textCandidates = ["UI/Default", "UI/Unlit/Text", "Sprites/Default"];
  for (const name of textCandidates) {
    try {
      const s = ShaderClass.method("Find").invoke(Il2Cpp.string(name));
      if (s && !s.handle.isNull()) {
        TextShader = s;
        break;
      }
    } catch (_) {
    }
  }
  let LineRendererClass = null;
  for (const img of [coreImage, physImage, uiModImage, uiImage]) {
    try {
      if (!LineRendererClass)
        LineRendererClass = img.class("UnityEngine.LineRenderer");
    } catch (_) {
    }
  }
  function shadePrimitive(go, color) {
    try {
      const rend = go.method("GetComponent", 1).inflate(RendererClass).invoke();
      if (!rend || rend.handle.isNull())
        return;
      const mat = rend.method("get_material").invoke();
      if (!mat || mat.handle.isNull())
        return;
      if (UberShader)
        mat.method("set_shader").invoke(UberShader);
      mat.method("set_color").invoke(color);
    } catch (_) {
    }
  }
  const L_NODE = 4;
  const R_NODE = 5;
  const _outBool = Il2Cpp.alloc(1);
  const _outFloat = Il2Cpp.alloc(4);
  const _outVec2 = Il2Cpp.alloc(8);
  const FEATURE_FIELD = {
    "Primary2DAxisClick": "primary2DAxisClick",
    "PrimaryButton": "primaryButton",
    "SecondaryButton": "secondaryButton",
    "Primary2DAxis": "primary2DAxis",
    "Grip": "grip",
    "Trigger": "trigger"
  };
  function usageVal(feature) {
    try {
      return CommonUsagesClass.field(FEATURE_FIELD[feature]).value;
    } catch (_) {
      return null;
    }
  }
  function resolveTGFV(outTypeMatch) {
    if (!InputDeviceClass)
      return null;
    try {
      for (const m of InputDeviceClass.methods) {
        if (m.name !== "TryGetFeatureValue" || m.parameterCount !== 2)
          continue;
        try {
          if (m.parameters[1].type.name.indexOf(outTypeMatch) >= 0)
            return m;
        } catch (_) {
        }
      }
    } catch (_) {
    }
    return null;
  }
  const _tgfvBool = resolveTGFV("Boolean");
  const _tgfvFloat = resolveTGFV("Single");
  const _tgfvVec2 = resolveTGFV("Vector2");
  function xrDevice(node) {
    try {
      return InputDevicesClass.method("GetDeviceAtXRNode", 1).invoke(node);
    } catch (_) {
      return null;
    }
  }
  function getBool(feature, node) {
    if (!InputDevicesClass || !CommonUsagesClass)
      return false;
    try {
      const dev = xrDevice(node);
      if (!dev)
        return false;
      const u = usageVal(feature);
      if (!u)
        return false;
      if (_tgfvBool)
        _tgfvBool.bind(dev).invoke(u, _outBool);
      else
        dev.method("TryGetFeatureValue", 2).invoke(u, _outBool);
      return _outBool.readU8() !== 0;
    } catch (_) {
      return false;
    }
  }
  function getFloat(feature, node) {
    if (!InputDevicesClass || !CommonUsagesClass)
      return 0;
    try {
      const dev = xrDevice(node);
      if (!dev)
        return 0;
      const u = usageVal(feature);
      if (!u)
        return 0;
      if (_tgfvFloat)
        _tgfvFloat.bind(dev).invoke(u, _outFloat);
      else
        return 0;
      return _outFloat.readFloat();
    } catch (_) {
      return 0;
    }
  }
  function getVec2(feature, node) {
    if (!InputDevicesClass || !CommonUsagesClass)
      return [0, 0];
    try {
      const dev = xrDevice(node);
      if (!dev)
        return [0, 0];
      const u = usageVal(feature);
      if (!u)
        return [0, 0];
      if (_tgfvVec2)
        _tgfvVec2.bind(dev).invoke(u, _outVec2);
      else
        return [0, 0];
      return [_outVec2.readFloat(), _outVec2.add(4).readFloat()];
    } catch (_) {
      return [0, 0];
    }
  }
  const zeroVec3 = [0, 0, 0];
  function v3xyz(v) {
    return [v.handle.readFloat(), v.handle.add(4).readFloat(), v.handle.add(8).readFloat()];
  }
  function v3add(a, b) {
    return Vector3Class.method("op_Addition", 2).invoke(a, b);
  }
  function v3sub(a, b) {
    return Vector3Class.method("op_Subtraction", 2).invoke(a, b);
  }
  function v3mul(a, s) {
    return Vector3Class.method("op_Multiply", 2).invoke(a, s);
  }
  function v3lerp(a, b, t) {
    return Vector3Class.method("Lerp").invoke(a, b, t);
  }
  function v3norm(a) {
    return Vector3Class.method("Normalize", 1).invoke(a);
  }
  function v3mag(a) {
    return Vector3Class.method("Magnitude", 1).invoke(a);
  }
  function v3dist(a, b) {
    return Vector3Class.method("Distance").invoke(a, b);
  }
  let _playerInst = null;
  let _localPlayer = null;
  let _headTransform = null;
  let _playerHandle = "0";
  function invalidatePlayerRefs() {
    _playerInst = null;
    _localPlayer = null;
    _headTransform = null;
    _playerHandle = "0";
  }
  let _lobbyChanged = false;
  function playerInst() {
    try {
      const cur = GorillaLocomotionClass.method("get_Instance").invoke();
      if (!cur)
        return null;
      const h = cur.handle.toString();
      if (h !== _playerHandle) {
        if (_playerHandle !== "0") {
          console.log("[XeraCompany] lobby change detected, will rebuild menu");
          _lobbyChanged = true;
        }
        _playerHandle = h;
        _localPlayer = null;
        _headTransform = null;
      }
      _playerInst = cur;
      return cur;
    } catch (_) {
      invalidatePlayerRefs();
      return null;
    }
  }
  function localPlayer() {
    if (!_localPlayer) {
      try {
        _localPlayer = NetPlayerClass.field("_localPlayer").value;
      } catch (_) {
      }
    }
    return _localPlayer;
  }
  function headTransform() {
    if (!_headTransform) {
      const inst = playerInst();
      if (!inst)
        return null;
      try {
        _headTransform = inst.field("headFollower").value;
      } catch (_) {
      }
    }
    return _headTransform;
  }
  function getRigidbody() {
    const inst = playerInst();
    if (!inst)
      return null;
    try {
      return inst.method("get_playerRigidbody").invoke();
    } catch (_) {
      return null;
    }
  }
  function getLeftHand() {
    const inst = playerInst();
    if (!inst)
      return null;
    try {
      return inst.field("leftHandFollower").value;
    } catch (_) {
      return null;
    }
  }
  function getRightHand() {
    const inst = playerInst();
    if (!inst)
      return null;
    try {
      return inst.field("rightHandFollower").value;
    } catch (_) {
      return null;
    }
  }
  function findAll(cls) {
    let arr = null;
    try {
      arr = ObjectClass.method("FindObjectsOfType", 1).inflate(cls).invoke(false);
    } catch (_) {
      try {
        arr = ObjectClass.method("FindObjectsOfType", 0).inflate(cls).invoke();
      } catch (_2) {
      }
    }
    if (!arr)
      return [];
    const out = [];
    try {
      for (let i = 0; i < arr.length; i++)
        out.push(arr.get(i));
    } catch (_) {
    }
    return out;
  }
  function findOne(cls) {
    try {
      return ObjectClass.method("FindObjectOfType", 1).inflate(cls).invoke(false);
    } catch (_) {
    }
    try {
      return ObjectClass.method("FindObjectOfType", 0).inflate(cls).invoke();
    } catch (_) {
    }
    return null;
  }
  const BoxColliderClass = physImage.class("UnityEngine.BoxCollider");
  const ColliderClass = physImage.class("UnityEngine.Collider");
  const RigidbodyClass = physImage.class("UnityEngine.Rigidbody");
  const TransformClass = coreImage.class("UnityEngine.Transform");
  let GraphicRaycasterClass = null;
  try {
    GraphicRaycasterClass = uiImage.class("UnityEngine.UI.GraphicRaycaster");
  } catch (_) {
  }
  let ButtonBehaviourClass = null;
  for (const n of ["AnimalCompany.ComputerTerminalKey", "AnimalCompany.GorillaReportButton"]) {
    try {
      ButtonBehaviourClass = acImage.class(n);
      if (ButtonBehaviourClass)
        break;
    } catch (_) {
    }
  }
  let menuFont = null;
  function getMenuFont() {
    if (menuFont)
      return menuFont;
    try {
      const fonts = ResourcesClass.method("FindObjectsOfTypeAll", 1).invoke(FontClass.type);
      for (let i = 0; i < fonts.length; i++) {
        const f = fonts.get(i);
        if (FontClass.method("get_name").on(f).invoke().toString() === "Utopium") {
          menuFont = f;
          break;
        }
      }
    } catch (_) {
    }
    if (!menuFont) {
      try {
        menuFont = ResourcesClass.method("GetBuiltinResource", 1).inflate(FontClass).invoke(Il2Cpp.string("Arial.ttf"));
      } catch (_) {
      }
    }
    return menuFont;
  }
  function handTransform(right) {
    const inst = playerInst();
    if (!inst)
      return null;
    try {
      return inst.field(right ? "rightHandTransform" : "leftHandTransform").value;
    } catch (_) {
      return null;
    }
  }
  function destroyGO(go) {
    try {
      if (go)
        ObjectClass.method("Destroy", 1).invoke(go);
    } catch (_) {
    }
  }
  function getComp(obj, cls) {
    try {
      return obj.method("GetComponent", 1).inflate(cls).invoke();
    } catch (_) {
      return null;
    }
  }
  function addComp(obj, cls) {
    try {
      return obj.method("AddComponent", 1).inflate(cls).invoke();
    } catch (_) {
      return null;
    }
  }
  function goTransform(obj) {
    return obj.method("get_transform").invoke();
  }
  const identQ = [0, 0, 0, 1];
  const menuscale = 0.9;
  function createObj(pos, rot, scale, prim, color, parent = null, enableCollider = false) {
    const go = GameObjectClass.method("CreatePrimitive").invoke(prim);
    const rend = getComp(go, RendererClass);
    if (rend && !rend.handle.isNull()) {
      if (color[3] === 0) {
        try {
          rend.method("set_enabled").invoke(false);
        } catch (_) {
        }
      } else {
        const mat = rend.method("get_material").invoke();
        if (mat && !mat.handle.isNull()) {
          if (UberShader)
            mat.method("set_shader").invoke(UberShader);
          mat.method("set_color").invoke(color);
        }
      }
    }
    const col = getComp(go, ColliderClass);
    if (col && !col.handle.isNull()) {
      try {
        col.method("set_enabled").invoke(enableCollider);
      } catch (_) {
      }
      try {
        col.method("set_isTrigger").invoke(true);
      } catch (_) {
      }
    }
    const tf = goTransform(go);
    if (parent)
      tf.method("SetParent", 2).invoke(parent, false);
    tf.method("set_position").invoke(pos);
    tf.method("set_rotation").invoke(rot);
    tf.method("set_localScale").invoke(scale);
    return go;
  }
  function renderMenuText(canvasObject, text, color, pos, size) {
    const go = createObj([0, 0, 0], identQ, [1, 1, 1], 3, [0, 0, 0, 0], goTransform(canvasObject), false);
    const t = addComp(go, TextClass);
    t.method("set_text").invoke(Il2Cpp.string(text));
    const f = getMenuFont();
    if (f)
      t.method("set_font").invoke(f);
    t.method("set_fontSize").invoke(1);
    t.method("set_color").invoke(color);
    t.method("set_fontStyle").invoke(2);
    t.method("set_alignment").invoke(4);
    t.method("set_resizeTextForBestFit").invoke(true);
    t.method("set_resizeTextMinSize").invoke(0);
    try {
      const rt = getComp(t, RectTransformClass);
      rt.method("set_sizeDelta").invoke(size);
      rt.method("set_position").invoke(pos);
      rt.method("set_rotation").invoke(QuaternionClass.method("Euler").invoke(180, 90, 90));
    } catch (_) {
    }
    return go;
  }
  let menuGO = null;
  let referenceGO = null;
  let referenceCollider = null;
  let righthand = false;
  let buttonClickDelay = 0;
  let liveButtons = /* @__PURE__ */ new Map();
  const bgColor = [0.08, 0.02, 0.12, 0.85];
  const titleColor = [0.95, 0.2, 0.2, 1];
  const textColor = [0.87, 0.85, 0.9, 1];
  const btnColor = [0.25, 0.05, 0.1, 0.85];
  const btnOnColor = [0.85, 0, 0, 1];
  function destroyMenu() {
    destroyGO(menuGO);
    menuGO = null;
    destroyGO(referenceGO);
    referenceGO = null;
    referenceCollider = null;
    liveButtons.clear();
  }
  function reloadMenu() {
    destroyGO(menuGO);
    menuGO = null;
    liveButtons.clear();
  }
  Script.bindWeak(globalThis, () => {
    destroyMenu();
  });
  function renderReference() {
    const hand = handTransform(!righthand);
    if (!hand)
      return;
    referenceGO = createObj([0, 0, 0], identQ, [0.01, 0.01, 0.01], 0, bgColor, hand, true);
    referenceCollider = getComp(referenceGO, ColliderClass);
    goTransform(referenceGO).method("set_localPosition").invoke([-0.05, -0.115, 0.065]);
    try {
      referenceGO.method("set_layer").invoke(2);
    } catch (_) {
    }
    const rb = addComp(referenceGO, RigidbodyClass);
    try {
      rb.method("set_isKinematic").invoke(true);
    } catch (_) {
    }
  }
  function renderMenu() {
    const src = currentSource();
    maxPages = Math.max(0, Math.ceil(src.length / 8) - 1);
    if (pageIndex < 0)
      pageIndex = maxPages;
    if (pageIndex > maxPages)
      pageIndex = 0;
    menuGO = createObj([0, 0, 0], identQ, [0.1, 0.3, 0.3825], 3, [0, 0, 0, 0]);
    try {
      destroyGO(getComp(menuGO, BoxColliderClass));
    } catch (_) {
    }
    const menuTF = goTransform(menuGO);
    const bg = createObj([0.1, 0, 0], identQ, [0.1, 1, 1], 3, bgColor, menuTF);
    try {
      destroyGO(getComp(bg, BoxColliderClass));
    } catch (_) {
    }
    const canvasObject = createObj([0, 0, 0], identQ, [1, 1, 1], 3, [0, 0, 0, 0], menuTF);
    try {
      destroyGO(getComp(canvasObject, BoxColliderClass));
    } catch (_) {
    }
    const canvas = addComp(canvasObject, CanvasClass);
    try {
      addComp(canvasObject, CanvasScalerClass).method("set_dynamicPixelsPerUnit").invoke(1e3);
    } catch (_) {
    }
    if (GraphicRaycasterClass) {
      try {
        addComp(canvasObject, GraphicRaycasterClass);
      } catch (_) {
      }
    }
    canvas.method("set_renderMode").invoke(2);
    liveButtons.clear();
    renderMenuText(canvasObject, `Xera Company - ${catName} [${pageIndex + 1}/${maxPages + 1}]`, titleColor, [0.11, 0, 0.175], [1, 0.1]);
    const addButton = (b, z) => {
      const on = b.type === "toggle" && b.enabled;
      const btn = createObj([0.105, 0, z], identQ, [0.09, 0.9, 0.08], 3, on ? btnOnColor : btnColor, menuTF, true);
      btn.method("set_name").invoke(Il2Cpp.string("@" + b.name));
      if (ButtonBehaviourClass)
        addComp(btn, ButtonBehaviourClass);
      try {
        getComp(btn, BoxColliderClass).method("set_isTrigger").invoke(true);
      } catch (_) {
      }
      const label = b.name + (b.type === "toggle" ? b.enabled ? "  ON" : "  OFF" : "");
      renderMenuText(canvasObject, label, on ? btnOnColor : textColor, [0.11, 0, z], [1, 0.1]);
      liveButtons.set(b.name, b);
    };
    if (catIndex !== 0)
      addButton(backBtn0, -0.225);
    if (pageIndex > 0)
      addButton(prevPageBtn, 0.225);
    if (pageIndex < maxPages)
      addButton(nextPageBtn, -0.275);
    const start = pageIndex * 8;
    const page = src.slice(start, start + 8);
    let i = 0;
    page.forEach((b) => {
      addButton(b, 0.13 - i * 0.04);
      i++;
    });
    renderMenuText(canvasObject, "github.com/JuelzIrons/VersionChecks", [1, 0.05, 0.05, 1], [0.11, 0, 0.275], [1, 0.08]);
    renderMenuText(canvasObject, `Item: ${ITEM_IDS[itemSpawnIdx].replace("item_", "")}   Mob: ${MOB_IDS[mobSpawnIdx].name}`, [0.75, 0.75, 0.75, 1], [0.11, 0, -0.315], [1, 0.07]);
    try {
      let ps = 1;
      try {
        ps = playerInst().field("<playerScale>k__BackingField").value;
      } catch (_) {
      }
      const ls = menuTF.method("get_localScale").invoke();
      menuTF.method("set_localScale").invoke(v3mul(v3mul(ls, ps), menuscale));
    } catch (_) {
    }
    try {
      ObjectClass.method("DontDestroyOnLoad").invoke(menuGO);
    } catch (_) {
    }
    recenterMenu();
  }
  function recenterMenu() {
    if (!menuGO)
      return;
    const hand = handTransform(righthand);
    if (!hand)
      return;
    const tf = goTransform(menuGO);
    try {
      let targetRot = hand.method("get_rotation").invoke();
      if (righthand)
        targetRot = QuaternionClass.method("op_Multiply", 2).invoke(targetRot, QuaternionClass.method("Euler").invoke(0, 0, 180));
      const targetPos = hand.method("get_position").invoke();
      const dt = TimeClass.method("get_deltaTime").invoke();
      const k = Math.min(1, dt * 45);
      const curPos = tf.method("get_position").invoke();
      const curRot = tf.method("get_rotation").invoke();
      const newPos = Vector3Class.method("Lerp").invoke(curPos, targetPos, k);
      const newRot = QuaternionClass.method("Slerp").invoke(curRot, targetRot, k);
      tf.method("set_position").invoke(newPos);
      tf.method("set_rotation").invoke(newRot);
    } catch (_) {
    }
  }
  const backBtn0 = { name: "Back", type: "button", method: () => changeCat(0, "Home") };
  const prevPageBtn = { name: "< Page", type: "button", method: () => {
    pageIndex--;
    reloadMenu();
  } };
  const nextPageBtn = { name: "Page >", type: "button", method: () => {
    pageIndex++;
    reloadMenu();
  } };
  let catIndex = 4;
  let pageIndex = 0;
  let cursorIndex = 0;
  let catName = "Credits";
  let menuHidden = false;
  let cooldown = false;
  let cooldownTime = 0;
  let cooldownSetAt = 0;
  let prevRClick = false;
  let lastActionAt = 0;
  let maxPages = 0;
  let unhideStart = -1;
  function changeCat(idx, name) {
    catIndex = idx;
    pageIndex = 0;
    cursorIndex = 0;
    catName = name;
  }
  const META_FLAG = "xera_metaquest.flag";
  function metaFlagOn() {
    try {
      return File.readAllText(META_FLAG).trim() === "1";
    } catch (_) {
      return false;
    }
  }
  function writeMetaFlag(on) {
    try {
      File.writeAllText(META_FLAG, on ? "1" : "0");
    } catch (e) {
      console.log("[MetaQuest] flag write err: " + e);
    }
  }
  let _metaHooked = false;
  function applyMetaHook() {
    if (_metaHooked)
      return;
    try {
      const AppUtils = acImage.class("AnimalCompany.AppUtils");
      AppUtils.method("CalculatePhotonAppVersion").implementation = function() {
        return Il2Cpp.string("5M8b0P9cmf0LCq5oFxWy");
      };
      _metaHooked = true;
      console.log("[MetaQuest] spoof active");
    } catch (e) {
      console.log("[MetaQuest] hook err: " + e);
    }
  }
  function setMetaQuest(on) {
    writeMetaFlag(on);
    if (on) {
      applyMetaHook();
      console.log("[MetaQuest] ON \u2014 restart the game if already connected");
    } else if (_metaHooked) {
      try {
        acImage.class("AnimalCompany.AppUtils").method("CalculatePhotonAppVersion").implementation = null;
      } catch (_) {
      }
      _metaHooked = false;
      console.log("[MetaQuest] OFF \u2014 restart to fully revert");
    }
  }
  let _devApplied = false;
  function applyDevFlag() {
    try {
      const app = acImage.class("AnimalCompany.App");
      const state = app.method("get_state").invoke();
      if (!state || state.handle.isNull())
        return false;
      const user = state.method("get_user").invoke();
      if (!user || user.handle.isNull())
        return false;
      user.method("get_isDeveloper").invoke().method("set_value").invoke(true);
      console.log("[XeraCompany] developer flag set");
      return true;
    } catch (_) {
      return false;
    }
  }
  const DISCORD_APP_ID = "1509617940474101975";
  const INVALID_HANDLE = ptr("-1");
  let _rpcHandle = null;
  let _rpcConnected = false;
  let _rpcEnabled = false;
  let _rpcSessionStart = Math.floor(Date.now() / 1e3);
  let _rpcLastPush = 0;
  let _CreateFileW = null, _WriteFile = null, _CloseHandle = null;
  try {
    const k32 = Process.getModuleByName("kernel32.dll");
    _CreateFileW = new NativeFunction(k32.getExportByName("CreateFileW"), "pointer", ["pointer", "uint32", "uint32", "pointer", "uint32", "uint32", "pointer"]);
    _WriteFile = new NativeFunction(k32.getExportByName("WriteFile"), "int", ["pointer", "pointer", "uint32", "pointer", "pointer"]);
    _CloseHandle = new NativeFunction(k32.getExportByName("CloseHandle"), "int", ["pointer"]);
  } catch (e) {
    console.log("[RPC] win32 resolve err: " + e);
  }
  function _utf8Latin1(s) {
    try {
      return unescape(encodeURIComponent(s));
    } catch (_) {
      return s;
    }
  }
  function rpcWriteFrame(op, json) {
    if (!_WriteFile || !_rpcHandle || _rpcHandle.equals(INVALID_HANDLE))
      return false;
    try {
      const enc = _utf8Latin1(json);
      const n = enc.length;
      const frame = Memory.alloc(8 + n);
      frame.writeU32(op);
      frame.add(4).writeU32(n);
      for (let i = 0; i < n; i++)
        frame.add(8 + i).writeU8(enc.charCodeAt(i) & 255);
      const written = Memory.alloc(4);
      const ok = _WriteFile(_rpcHandle, frame, 8 + n, written, NULL);
      console.log("[RPC] WriteFile op=" + op + " ret=" + ok + " wrote=" + written.readU32() + "/" + (8 + n));
      return ok !== 0;
    } catch (e) {
      console.log("[RPC] write err: " + e);
      return false;
    }
  }
  function rpcConnect() {
    if (!_CreateFileW) {
      console.log("[RPC] CreateFileW not resolved");
      return false;
    }
    const GENERIC_RW = 3221225472 >>> 0;
    const OPEN_EXISTING = 3;
    for (let i = 0; i < 10; i++) {
      try {
        const path = Memory.allocUtf16String("\\\\.\\pipe\\discord-ipc-" + i);
        const h = _CreateFileW(path, GENERIC_RW, 0, NULL, OPEN_EXISTING, 0, NULL);
        if (h.equals(INVALID_HANDLE))
          continue;
        _rpcHandle = h;
        console.log("[RPC] opened pipe discord-ipc-" + i);
        if (rpcWriteFrame(0, JSON.stringify({ v: 1, client_id: DISCORD_APP_ID }))) {
          _rpcConnected = true;
          console.log("[RPC] handshake sent on discord-ipc-" + i);
          return true;
        }
        console.log("[RPC] handshake write failed on discord-ipc-" + i);
        try {
          _CloseHandle(h);
        } catch (_) {
        }
        _rpcHandle = null;
      } catch (e) {
        console.log("[RPC] connect " + i + " err: " + e);
      }
    }
    console.log("[RPC] no discord pipe found (is Discord running?)");
    return false;
  }
  function rpcPush() {
    const payload = {
      cmd: "SET_ACTIVITY",
      args: {
        pid: Process.id,
        activity: {
          state: "In the Animal Company",
          details: "Cheating like a chud",
          timestamps: { start: _rpcSessionStart },
          instance: true
        }
      },
      nonce: Date.now() + "-" + Math.floor(Math.random() * 1e5)
    };
    if (!rpcWriteFrame(1, JSON.stringify(payload))) {
      _rpcConnected = false;
    }
  }
  function rpcDisconnect() {
    try {
      if (_rpcHandle && !_rpcHandle.equals(INVALID_HANDLE))
        _CloseHandle(_rpcHandle);
    } catch (_) {
    }
    _rpcHandle = null;
    _rpcConnected = false;
  }
  function setDiscordRPC(on) {
    _rpcEnabled = on;
    if (on) {
      _rpcSessionStart = Math.floor(Date.now() / 1e3);
      if (rpcConnect()) {
        rpcPush();
        _rpcLastPush = Date.now();
      }
    } else {
      rpcDisconnect();
    }
  }
  function rpcTick() {
    if (!_rpcEnabled)
      return;
    const now = Date.now();
    if (!_rpcConnected) {
      if (now - _rpcLastPush > 5e3) {
        _rpcLastPush = now;
        rpcConnect();
      }
      return;
    }
    if (now - _rpcLastPush > 12e3) {
      _rpcLastPush = now;
      rpcPush();
    }
  }
  const CFG_FILE = "XERA.cfg";
  let _persist = false;
  function cfgRead() {
    try {
      const o = JSON.parse(File.readAllText(CFG_FILE));
      return { persist: !!o.persist, enabled: Array.isArray(o.enabled) ? o.enabled : [] };
    } catch (_) {
      return { persist: false, enabled: [] };
    }
  }
  function cfgCollectEnabled() {
    const out = [];
    for (const cat of buttons)
      for (const b of cat)
        if (b.type === "toggle" && b.enabled)
          out.push(b.name);
    return out;
  }
  function cfgWrite() {
    try {
      File.writeAllText(CFG_FILE, JSON.stringify({
        persist: _persist,
        enabled: _persist ? cfgCollectEnabled() : []
      }));
    } catch (e) {
      console.log("[Cfg] write err: " + e);
    }
  }
  function cfgSaveIfOn() {
    if (_persist)
      cfgWrite();
  }
  function cfgApplyOnLoad() {
    const c = cfgRead();
    _persist = c.persist;
    for (const cat of buttons)
      for (const b of cat)
        if (b.name === "Save Config")
          b.enabled = _persist;
    if (!c.persist)
      return;
    const want = {};
    for (const n of c.enabled)
      want[n] = true;
    for (const cat of buttons)
      for (const b of cat) {
        if (b.type !== "toggle" || b.name === "Save Config")
          continue;
        if (want[b.name] && !b.enabled) {
          b.enabled = true;
          try {
            b.enableMethod?.();
          } catch (e) {
            console.log("[Cfg] apply " + b.name + " err: " + e);
          }
        }
      }
    console.log("[Cfg] restored " + c.enabled.length + " saved mods");
  }
  let flySpeed = 10;
  const MAX_FLY_SPEED = 30;
  let leftPlatDown = false;
  let rightPlatDown = false;
  let leftPlatform = null;
  let rightPlatform = null;
  let lastNoclipBtn = false;
  let noclipOn = false;
  let itemHue = 0;
  let itemScale = 0.5;
  let strobeH = 0;
  let strobeT = 0;
  let qualityLevel = 3;
  const QUALITY_NAMES = ["Very Low", "Low", "Medium", "High", "Very High", "Ultra"];
  let tpGunPrevTrigger = false;
  let punchLastRight = [];
  let punchLastLeft = [];
  const ITEM_IDS = [
    "item_grenade",
    "item_rpg",
    "item_revolver",
    "item_shotgun",
    "item_grenade_launcher",
    "item_flaregun",
    "item_crossbow",
    "item_timebomb",
    "item_dynamite",
    "item_landmine",
    "item_jetpack",
    "item_zipline_gun",
    "item_backpack",
    "item_quiver",
    "item_hookshot",
    "item_axe",
    "item_great_sword",
    "item_baseball_bat",
    "item_drill",
    "item_pickaxe",
    "item_boombox",
    "item_balloon",
    "item_goldbar",
    "item_goldcoin",
    "item_ruby",
    "item_heart_gun",
    "item_moneygun",
    "item_radiation_gun",
    "item_friend_launcher",
    "item_rpg_smshr",
    "item_rpg_easter",
    "item_salmoncannon",
    "item_sawblade_launcher",
    "item_impulse_grenade",
    "item_tele_grenade",
    "item_cluster_grenade",
    "item_stash_grenade",
    "item_pogostick",
    "item_hoverpad",
    "item_snowboard",
    "item_skishoe",
    "item_crate",
    "item_backpack_large_base",
    "item_pelican_case",
    "item_shield",
    "item_megaphone",
    "item_remote_controller",
    "item_trampoline",
    "item_portal_teleporter"
  ];
  const MOB_IDS = [
    { name: "Angler", id: 1 },
    { name: "Armstrong", id: 3 },
    { name: "Banshee", id: 5 },
    { name: "Bomb", id: 6 },
    { name: "Bomber", id: 7 },
    { name: "Chicken", id: 10 },
    { name: "Cyst", id: 11 },
    { name: "FakeGorilla", id: 12 },
    { name: "BigHead", id: 13 },
    { name: "EvilEye", id: 16 },
    { name: "GiantThrower", id: 17 },
    { name: "Spider", id: 19 },
    { name: "FlyingSwarm", id: 20 },
    { name: "NextBot", id: 21 },
    { name: "Segway", id: 22 },
    { name: "Lanky", id: 26 },
    { name: "Blob", id: 27 },
    { name: "Cutie", id: 28 },
    { name: "SpiderCave", id: 29 },
    { name: "ForestMob", id: 30 },
    { name: "Mimic", id: 31 },
    { name: "GraveyardBoss", id: 32 },
    { name: "Ringmaster", id: 33 },
    { name: "Puppet", id: 34 },
    { name: "RobotDog", id: 36 },
    { name: "Shadow", id: 37 },
    { name: "Heart", id: 38 },
    { name: "ShadowBoss", id: 40 },
    { name: "BigShark", id: 41 },
    { name: "Skinwalker", id: 43 }
  ];
  let itemSpawnIdx = 0;
  let mobSpawnIdx = 0;
  let rainbowAllHue = 0;
  const NULL_REF = Il2Cpp.reference(Il2Cpp.domain.assembly("mscorlib").image.class("System.Object").alloc());
  let orbitNetObjs = [];
  let orbitTfs = [];
  const buffValueCache = {};
  function buffVal(name) {
    if (buffValueCache[name] === void 0) {
      try {
        buffValueCache[name] = PlayerBuffClass.field(name).value;
      } catch (_) {
        buffValueCache[name] = -1;
      }
    }
    return buffValueCache[name];
  }
  function applyBuff(name, amount) {
    try {
      const ctrl = PlayerBuffControllerClass.field("_instance").value;
      if (!ctrl)
        return;
      const val = buffVal(name);
      if (val < 0)
        return;
      ctrl.method("ApplyBuffToPlayer").invoke(val, amount);
    } catch (_) {
    }
  }
  function resetBuff(name) {
    try {
      const ctrl = PlayerBuffControllerClass.field("_instance").value;
      if (!ctrl)
        return;
      const val = buffVal(name);
      if (val < 0)
        return;
      ctrl.method("ResetBuffToPlayer").invoke(val);
    } catch (_) {
    }
  }
  function headPos() {
    const head = headTransform();
    if (!head)
      return null;
    return head.method("get_position").invoke();
  }
  function spawnItemAtPos(bareID, pos) {
    const rot = [0, 0, 0, 1];
    try {
      const prefab = PrefabGenClass.method("GetItemPrefab", 1).invoke(Il2Cpp.string(bareID));
      if (prefab && !prefab.isNull()) {
        const r = PrefabGenClass.method("SpawnItem", 4).invoke(prefab, pos, rot, NULL_REF);
        if (r && !r.handle.isNull())
          return r;
      }
      let r2 = PrefabGenClass.method("SpawnItem", 4).invoke(Il2Cpp.string(bareID), pos, rot, NULL_REF);
      if (r2 && !r2.handle.isNull())
        return r2;
      r2 = PrefabGenClass.method("SpawnItem", 4).invoke(Il2Cpp.string("item_prefab/" + bareID), pos, rot, NULL_REF);
      return r2 && !r2.handle.isNull() ? r2 : null;
    } catch (e) {
      console.log("[XeraCompany] spawnItem err: " + e);
      return null;
    }
  }
  const FONT5 = {
    "X": ["#...#", ".#.#.", "..#..", ".#.#.", "#...#"],
    "E": ["#####", "#....", "###..", "#....", "#####"],
    "R": ["####.", "#...#", "####.", "#..#.", "#...#"],
    "A": [".###.", "#...#", "#####", "#...#", "#...#"],
    "D": ["####.", "#...#", "#...#", "#...#", "####."],
    "I": ["#####", "..#..", "..#..", "..#..", "#####"],
    "S": [".####", "#....", ".###.", "....#", "####."],
    "C": [".####", "#....", "#....", "#....", ".####"],
    "O": [".###.", "#...#", "#...#", "#...#", ".###."],
    "G": [".####", "#....", "#..##", "#...#", ".###."],
    "V": ["#...#", "#...#", "#...#", ".#.#.", "..#.."],
    "N": ["#...#", "##..#", "#.#.#", "#..##", "#...#"],
    "T": ["#####", "..#..", "..#..", "..#..", "..#.."],
    "K": ["#..#.", "#.#..", "##...", "#.#..", "#..#."],
    "F": ["#####", "#....", "###..", "#....", "#...."],
    "U": ["#...#", "#...#", "#...#", "#...#", ".###."],
    "Y": ["#...#", ".#.#.", "..#..", "..#..", "..#.."],
    "P": ["####.", "#...#", "####.", "#....", "#...."],
    "J": ["..###", "....#", "....#", "#...#", ".###."],
    "L": ["#....", "#....", "#....", "#....", "#####"],
    "Z": ["#####", "...#.", "..#..", ".#...", "#####"],
    "M": ["#...#", "##.##", "#.#.#", "#...#", "#...#"],
    "B": ["####.", "#...#", "####.", "#...#", "####."],
    "0": [".###.", "#..##", "#.#.#", "##..#", ".###."],
    "3": ["####.", "....#", ".###.", "....#", "####."],
    "4": ["#..#.", "#..#.", "#####", "...#.", "...#."],
    "!": ["..#..", "..#..", "..#..", ".....", "..#.."],
    "?": [".###.", "#...#", "..##.", ".....", "..#.."],
    ":": [".....", "..#..", ".....", "..#..", "....."],
    ")": [".#...", "..#..", "..#..", "..#..", ".#..."],
    "<": ["...#.", "..#..", ".#...", "..#..", "...#."],
    ".": [".....", ".....", ".....", ".....", "..#.."],
    "/": ["....#", "...#.", "..#..", ".#...", "#...."],
    " ": [".....", ".....", ".....", ".....", "....."]
  };
  function placeRock(itemID, pos, scaleUp = true) {
    const no = spawnItemAtPos(itemID, pos);
    if (no && !no.handle.isNull() && scaleUp) {
      try {
        const gbo = no.method("GetComponent", 1).inflate(GrabbableObjectClass).invoke();
        if (gbo && !gbo.handle.isNull())
          gbo.method("SetNormalizedScaleModifier").invoke(1);
      } catch (_) {
      }
    }
  }
  function renderBraille(lines, itemID, cell = 0.38) {
    const head = headTransform();
    if (!head)
      return;
    const origin = head.method("get_position").invoke();
    const fwd = head.method("get_forward").invoke();
    const right = head.method("get_right").invoke();
    const up = head.method("get_up").invoke();
    const dist = 10;
    const base = v3add(origin, v3mul(fwd, dist));
    let maxCols = 0;
    for (const l of lines)
      maxCols = Math.max(maxCols, [...l].length);
    const totalCols = maxCols * 2;
    const totalRows = lines.length * 4;
    const dots = [
      [1, 0, 0],
      [2, 0, 1],
      [4, 0, 2],
      [64, 0, 3],
      [8, 1, 0],
      [16, 1, 1],
      [32, 1, 2],
      [128, 1, 3]
    ];
    for (let ly = 0; ly < lines.length; ly++) {
      const chars = [...lines[ly]];
      for (let cx = 0; cx < chars.length; cx++) {
        const code = (chars[cx].codePointAt(0) || 0) - 10240;
        if (code <= 0)
          continue;
        for (const [bit, dx, dy] of dots) {
          if (!(code & bit))
            continue;
          const col = cx * 2 + dx;
          const row = ly * 4 + dy;
          const rOff = (col - totalCols / 2) * cell;
          const uOff = (totalRows / 2 - row) * cell;
          let pos = v3add(base, v3mul(right, rOff));
          pos = v3add(pos, v3mul(up, uOff));
          placeRock(itemID, pos, false);
        }
      }
    }
  }
  const SHREK_ART = [
    "\u2800\u28C0\u2800\u2800\u2800\u2880\u2874\u280A\u2809\u2809\u2819\u2832\u28C4\u2800\u2800\u2800\u2880\u2800",
    "\u28FC\u28F9\u2833\u28C0\u28A0\u28FF\u283F\u28B6\u28DC\u2812\u28BA\u28E4\u283F\u28E7\u2880\u287C\u28A7\u28F3",
    "\u2808\u2809\u2811\u28AE\u2809\u28A0\u28F6\u28FC\u28FD\u2800\u28EF\u28E4\u2876\u284C\u28B9\u280A\u2809\u2801",
    "\u2800\u2800\u2800\u285C\u2800\u2809\u289B\u28EF\u2858\u2809\u281B\u28FB\u285B\u280B\u2818\u2844\u2800\u2800",
    "\u2800\u2800\u2800\u2847\u2880\u28B6\u280A\u281B\u2851\u2812\u2856\u2819\u2813\u28A4\u2800\u2847\u2800\u2800",
    "\u2800\u2800\u2800\u2847\u2808\u2800\u2819\u2812\u2823\u28A4\u2867\u2834\u2812\u2803\u2801\u2845\u2800\u2800",
    "\u2800\u2800\u2800\u2833\u2840\u2800\u2800\u2880\u28C0\u28C0\u28C0\u2800\u2800\u2800\u28E0\u2803\u2800\u2800",
    "\u2800\u2800\u2800\u2800\u2808\u2826\u28C0\u2800\u2800\u2800\u2800\u2800\u28E0\u281E\u2801\u2800\u2800\u2800",
    "\u2800\u2800\u2800\u2800\u2800\u2800\u2808\u2809\u2809\u2809\u2809\u2809\u2800\u2800\u2800\u2800\u2800\u2800"
  ];
  const TAKEL_ART = [
    "\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u28A0\u2800\u2800\u2800\u2800\u2800",
    "\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u28B0\u28FF\u2864\u2804\u2800\u2800\u2800",
    "\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2880\u28E4\u28F6\u28BF\u28FF\u2847\u2800\u2800\u2800\u2800",
    "\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u283C\u28FF\u28E7\u28F8\u28FF\u28E7\u28E4\u28C0\u2840\u2800",
    "\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2818\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28F7\u2840",
    "\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2818\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28F7",
    "\u2800\u2800\u2800\u2800\u2800\u2880\u2840\u28E0\u28E4\u28E6\u28F4\u28FF\u28FF\u28FF\u28FF\u281B\u2809\u2801",
    "\u2800\u2800\u2800\u2800\u2800\u28FF\u28FF\u28FF\u28BF\u283F\u28FF\u28FF\u28FF\u28FF\u284F\u2800\u2800\u2800",
    "\u2800\u2800\u2800\u2800\u28F8\u28FF\u28FF\u285F\u2800\u2800\u2800\u2808\u28BF\u28FF\u28FF\u2802\u2800\u2800",
    "\u28E0\u28C4\u28F6\u28E4\u28FF\u280B\u2800\u2800\u2800\u2800\u2800\u2800\u28FC\u28FF\u285F\u2800\u2800\u2800",
    "\u2809\u281B\u283F\u28BF\u2803\u2800\u2800\u2800\u2800\u2800\u2800\u28E0\u28FF\u28FF\u2844\u2800\u2800\u2800",
    "\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u28BB\u28FF\u280B\u2800\u2800\u2800\u2800",
    "\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2880\u28FF\u2803\u2800\u2800\u2800\u2800\u2800",
    "\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u28B8\u28FF\u28C7\u2800\u2800\u2800\u2800\u2800",
    "\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2819\u280B\u2800\u2800\u2800\u2800\u2800"
  ];
  const HEART_ART = [
    "\u2880\u28F4\u28F6\u28C4\u2800\u28E0\u28F6\u28E6\u2840",
    "\u28FE\u28FF\u28FF\u28FF\u28F7\u28FF\u28FF\u28FF\u28F7",
    "\u28BF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u287F",
    "\u2808\u28BF\u28FF\u28FF\u28FF\u28FF\u28FF\u287F\u2801",
    "\u2800\u2808\u28BF\u28FF\u28FF\u28FF\u287F\u2801\u2800",
    "\u2800\u2800\u2808\u28BF\u28FF\u287F\u2801\u2800\u2800",
    "\u2800\u2800\u2800\u2808\u283F\u2801\u2800\u2800\u2800"
  ];
  const SKULL_ART = [
    "\u2800\u28C0\u28E4\u28F6\u28F6\u28F6\u28E4\u28C0\u2800",
    "\u2880\u28F4\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28E6\u2840",
    "\u28FE\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28F7",
    "\u28FF\u28FF\u281F\u2809\u28FF\u28FF\u2809\u283B\u28FF\u28FF",
    "\u28FF\u28FF\u2800\u2800\u28FF\u28FF\u2800\u2800\u28FF\u28FF",
    "\u28BF\u28FF\u28F7\u28E4\u28FF\u28FF\u28E4\u28FE\u28FF\u287F",
    "\u2808\u283B\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u281F\u2801",
    "\u2800\u2800\u2809\u281B\u283F\u283F\u281B\u2809\u2800\u2800"
  ];
  const AMOGUS_ART = [
    "\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u28E0\u28E4\u28E4\u28E4\u28E4\u28E4\u28F6\u28E6\u28E4\u28C4\u2840\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800",
    "\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2880\u28F4\u28FF\u287F\u281B\u2809\u2819\u281B\u281B\u281B\u281B\u283B\u28BF\u28FF\u28F7\u28E4\u2840\u2800\u2800\u2800\u2800\u2800",
    "\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u28FC\u28FF\u280B\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2880\u28C0\u28C0\u2808\u28BB\u28FF\u28FF\u2844\u2800\u2800\u2800\u2800",
    "\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u28F8\u28FF\u284F\u2800\u2800\u2800\u28E0\u28F6\u28FE\u28FF\u28FF\u28FF\u283F\u283F\u283F\u28BF\u28FF\u28FF\u28FF\u28C4\u2800\u2800\u2800",
    "\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u28FF\u28FF\u2801\u2800\u2800\u28B0\u28FF\u28FF\u28EF\u2801\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2808\u2819\u28BF\u28F7\u2844\u2800",
    "\u2800\u2800\u28C0\u28E4\u28F4\u28F6\u28F6\u28FF\u285F\u2800\u2800\u2800\u28B8\u28FF\u28FF\u28FF\u28C6\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u28FF\u28F7\u2800",
    "\u2800\u28B0\u28FF\u285F\u280B\u2809\u28F9\u28FF\u2847\u2800\u2800\u2800\u2818\u28FF\u28FF\u28FF\u28FF\u28F7\u28E6\u28E4\u28E4\u28E4\u28F6\u28F6\u28F6\u28F6\u28FF\u28FF\u28FF\u2800",
    "\u2800\u28B8\u28FF\u2847\u2800\u2800\u28FF\u28FF\u2847\u2800\u2800\u2800\u2800\u2839\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u287F\u2803\u2800",
    "\u2800\u28F8\u28FF\u2847\u2800\u2800\u28FF\u28FF\u2847\u2800\u2800\u2800\u2800\u2800\u2809\u283B\u283F\u28FF\u28FF\u28FF\u28FF\u287F\u283F\u283F\u281B\u28BB\u28FF\u2847\u2800\u2800",
    "\u2800\u28FF\u28FF\u2801\u2800\u2800\u28FF\u28FF\u2847\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u28B8\u28FF\u28E7\u2800\u2800",
    "\u2800\u28FF\u28FF\u2800\u2800\u2800\u28FF\u28FF\u2847\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u28B8\u28FF\u28FF\u2800\u2800",
    "\u2800\u28FF\u28FF\u2800\u2800\u2800\u28FF\u28FF\u2847\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u28B8\u28FF\u28FF\u2800\u2800",
    "\u2800\u28BF\u28FF\u2846\u2800\u2800\u28FF\u28FF\u2847\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u28B8\u28FF\u2847\u2800\u2800",
    "\u2800\u2838\u28FF\u28E7\u2840\u2800\u28FF\u28FF\u2847\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u28FF\u28FF\u2803\u2800\u2800",
    "\u2800\u2800\u281B\u28BF\u28FF\u28FF\u28FF\u28FF\u28C7\u2800\u2800\u2800\u2800\u2800\u28F0\u28FF\u28FF\u28F7\u28F6\u28F6\u28F6\u28F6\u2836\u2800\u28A0\u28FF\u28FF\u2800\u2800\u2800",
    "\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u28FF\u28FF\u2800\u2800\u2800\u2800\u2800\u28FF\u28FF\u2847\u2800\u28FD\u28FF\u284F\u2801\u2800\u2800\u28B8\u28FF\u2847\u2800\u2800\u2800",
    "\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u28FF\u28FF\u2800\u2800\u2800\u2800\u2800\u28FF\u28FF\u2847\u2800\u28B9\u28FF\u2846\u2800\u2800\u2800\u28F8\u28FF\u2807\u2800\u2800\u2800",
    "\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u28BF\u28FF\u28E6\u28C4\u28C0\u28E0\u28F4\u28FF\u28FF\u2801\u2800\u2808\u283B\u28FF\u28FF\u28FF\u28FF\u287F\u280F\u2800\u2800\u2800\u2800",
    "\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2808\u281B\u283B\u283F\u283F\u283F\u283F\u280B\u2801\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800"
  ];
  const FINGER_ART = [
    "\u2800\u2800\u28F6\u2800\u2800\u2800",
    "\u2800\u2800\u28FF\u2800\u2800\u2800",
    "\u2800\u2800\u28FF\u2800\u2800\u2800",
    "\u28F0\u28F6\u28FF\u28F6\u28F6\u2840",
    "\u28FF\u28FF\u28FF\u28FF\u28FF\u2847",
    "\u28FF\u28FF\u28FF\u28FF\u28FF\u2847",
    "\u28FF\u28FF\u28FF\u28FF\u28FF\u2847",
    "\u2808\u281B\u281B\u281B\u281B\u2801"
  ];
  const SMILEY_ART = [
    "\u2800\u28C0\u28E4\u28E4\u28E4\u28C0\u2800",
    "\u28F4\u28FF\u28FF\u28FF\u28FF\u28FF\u28E6",
    "\u28FF\u283F\u28FF\u28FF\u28FF\u283F\u28FF",
    "\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF",
    "\u28FF\u283B\u28FF\u28FF\u28FF\u281F\u28FF",
    "\u28BF\u28F7\u28CD\u281B\u28CB\u28FE\u287F",
    "\u2808\u283B\u28BF\u28FF\u287F\u281F\u2801"
  ];
  const MUSHROOM_ART = [
    "\u2800\u28E0\u28F6\u28FF\u28FF\u28F7\u28C4\u2800",
    "\u28F0\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28F7",
    "\u28FF\u283F\u28FF\u28FF\u28FF\u283F\u28FF\u28FF",
    "\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF",
    "\u2818\u28BF\u28FF\u28FF\u28FF\u28FF\u287F\u2803",
    "\u2800\u2800\u28FF\u28FF\u28FF\u28FF\u2800\u2800",
    "\u2800\u2800\u283F\u283F\u283F\u283F\u2800\u2800"
  ];
  function spellInSky(text, itemID, dense = false) {
    const head = headTransform();
    if (!head)
      return;
    const origin = head.method("get_position").invoke();
    const fwd = head.method("get_forward").invoke();
    const right = head.method("get_right").invoke();
    const up = head.method("get_up").invoke();
    const cell = 0.5;
    const dist = 8;
    const charW = 5, charH = 5, gap = 1;
    const base = v3add(origin, v3mul(fwd, dist));
    const totalCols = text.length * (charW + gap) - gap;
    let colCursor = -(totalCols * cell) / 2;
    const subs = dense ? [[-0.25, -0.25], [-0.25, 0.25], [0.25, -0.25], [0.25, 0.25]] : [[0, 0]];
    for (const ch of text.toUpperCase()) {
      const glyph = FONT5[ch] || FONT5[" "];
      for (let r = 0; r < charH; r++) {
        for (let c = 0; c < charW; c++) {
          if (glyph[r][c] !== "#")
            continue;
          for (const [du, dc] of subs) {
            const rOff = colCursor + (c + dc) * cell;
            const uOff = (charH / 2 - r + du) * cell;
            let pos = v3add(base, v3mul(right, rOff));
            pos = v3add(pos, v3mul(up, uOff));
            placeRock(itemID, pos);
          }
        }
      }
      colCursor += (charW + gap) * cell;
    }
  }
  function spawnMobAtPos(id, pos) {
    const rot = [0, 0, 0, 1];
    try {
      PrefabGenClass.method("SpawnMobAsync", 6).invoke(id, pos, rot, NULL_REF, NULL_REF, Il2Cpp.string("menu"));
    } catch (_) {
      try {
        PrefabGenClass.method("SpawnMobAsyncInternal", 6).invoke(id, pos, rot, NULL_REF, NULL_REF, Il2Cpp.string("menu"));
      } catch (e) {
        console.log("[XeraCompany] spawnMob err: " + e);
      }
    }
  }
  function spawnNetworkPrefab(prefabName, pos) {
    try {
      const pg = PrefabGenClass.field("_instance").value;
      if (!pg || pg.handle.isNull())
        return null;
      const runner = pg.method("get_runner").invoke();
      if (!runner || runner.handle.isNull())
        return null;
      const sources = runner.field("_config").value.field("PrefabTable").value.field("_sources").value;
      const count = sources.method("get_Count").invoke();
      for (let i = 0; i < count; i++) {
        try {
          const source = sources.method("get_Item").invoke(i);
          const desc = source.method("get_Description").invoke().toString();
          if (!desc.includes(prefabName))
            continue;
          const no = source.method("WaitForResult").invoke();
          if (!no || no.handle.isNull())
            return null;
          const makeZeroForType = (type) => {
            if (type.class.isEnum || type.isPrimitive)
              return 0;
            if (!type.class.isValueType)
              return NULL_REF;
            const fields = type.class.fields.filter((f) => !f.isStatic);
            if (fields.length === 0)
              return 0;
            return fields.map((f) => makeZeroForType(f.type));
          };
          const buildNullableArg = (nullableType, hasValue, value) => {
            const fields = nullableType.class.fields.filter((f) => !f.isStatic);
            return fields.map((f) => {
              const lname = f.name.toLowerCase();
              if (lname.includes("hasvalue"))
                return hasValue ? 1 : 0;
              if (lname === "value")
                return hasValue ? value : makeZeroForType(f.type);
              return makeZeroForType(f.type);
            });
          };
          const normalizeValue = (type, value) => {
            if (typeof value === "boolean")
              return value ? 1 : 0;
            if (value instanceof Il2Cpp.ValueType) {
              const fields = type.class.fields.filter((f) => !f.isStatic);
              if (fields.length === 0)
                return 0;
              return fields.map((f) => normalizeValue(f.type, f.bind(value).value));
            }
            if (Array.isArray(value))
              return value.map((v) => normalizeValue(type, v));
            return value;
          };
          const buildNullableFromValueType = (nullableType, valueType) => buildNullableArg(nullableType, true, normalizeValue(valueType.type, valueType));
          let spawnMethod = null;
          for (const m of runner.method("Spawn").overloads()) {
            if (m.parameterCount !== 6 || m.isGeneric)
              continue;
            const p = m.parameters;
            if (p[0].type.name.includes("Fusion.NetworkObject") && p[1].type.name.startsWith("System.Nullable") && p[1].type.name.includes("Vector3") && p[2].type.name.startsWith("System.Nullable") && p[2].type.name.includes("Quaternion") && p[3].type.name.startsWith("System.Nullable") && p[3].type.name.includes("PlayerRef") && p[4].type.name.includes("OnBeforeSpawned") && p[5].type.name.includes("NetworkSpawnFlags")) {
              spawnMethod = m;
              break;
            }
          }
          if (!spawnMethod)
            return null;
          const posArg = buildNullableFromValueType(spawnMethod.parameters[1].type, pos);
          const rotArg = buildNullableFromValueType(spawnMethod.parameters[2].type, QuaternionClass.method("get_identity").invoke());
          const authArg = buildNullableArg(spawnMethod.parameters[3].type, false, makeZeroForType(spawnMethod.parameters[3].type));
          const onBeforeArg = spawnMethod.parameters[4].type.class.isValueType ? makeZeroForType(spawnMethod.parameters[4].type) : NULL_REF;
          return spawnMethod.bind(runner).invoke(no, posArg, rotArg, authArg, onBeforeArg, 0);
        } catch (_) {
        }
      }
    } catch (e) {
      console.log("[XeraCompany] spawnNetworkPrefab err: " + e);
    }
    return null;
  }
  function doFly() {
    const rb = getRigidbody();
    if (!rb)
      return;
    const inst = playerInst();
    if (!inst)
      return;
    const [lx, lz] = getVec2("Primary2DAxis", L_NODE);
    const [, ry] = getVec2("Primary2DAxis", R_NODE);
    const bodyT = inst.method("get_transform").invoke();
    const [fx, , fz] = v3xyz(bodyT.method("get_forward").invoke());
    const [rx, , rz] = v3xyz(bodyT.method("get_right").invoke());
    const vel = [
      (lx * rx + lz * fx) * flySpeed,
      ry * flySpeed,
      (lx * rz + lz * fz) * flySpeed
    ];
    rb.method("set_linearVelocity").invoke(v3lerp(rb.method("get_linearVelocity").invoke(), vel, 0.95));
  }
  function doVeloFly() {
    if (!getBool("PrimaryButton", R_NODE))
      return;
    const rb = getRigidbody();
    if (!rb)
      return;
    const rh = getRightHand();
    if (!rh)
      return;
    const dt = TimeClass.method("get_deltaTime").invoke();
    const fwd = rh.method("get_forward").invoke();
    const boost = v3mul(fwd, dt * Math.min(flySpeed * 2, MAX_FLY_SPEED));
    rb.method("set_linearVelocity").invoke(v3add(rb.method("get_linearVelocity").invoke(), boost));
  }
  function doPlatforms() {
    const lh = getLeftHand();
    const rh = getRightHand();
    const lg = getFloat("Grip", L_NODE) > 0.5;
    const rg = getFloat("Grip", R_NODE) > 0.5;
    if (lg && !leftPlatDown) {
      leftPlatDown = true;
      leftPlatform = GameObjectClass.method("CreatePrimitive").invoke(3);
      leftPlatform.method("get_transform").invoke().method("set_localScale").invoke([0.3, 0.01, 0.3]);
      shadePrimitive(leftPlatform, [0.8, 0, 0, 1]);
      if (lh) {
        const pos = lh.method("get_position").invoke();
        leftPlatform.method("get_transform").invoke().method("set_position").invoke(v3add(pos, [0, -0.1, 0]));
      }
    }
    if (!lg && leftPlatDown) {
      leftPlatDown = false;
      if (leftPlatform) {
        ObjectClass.method("Destroy", 1).invoke(leftPlatform);
        leftPlatform = null;
      }
    }
    if (rg && !rightPlatDown) {
      rightPlatDown = true;
      rightPlatform = GameObjectClass.method("CreatePrimitive").invoke(3);
      rightPlatform.method("get_transform").invoke().method("set_localScale").invoke([0.3, 0.01, 0.3]);
      shadePrimitive(rightPlatform, [0.8, 0, 0, 1]);
      if (rh) {
        const pos = rh.method("get_position").invoke();
        rightPlatform.method("get_transform").invoke().method("set_position").invoke(v3add(pos, [0, -0.1, 0]));
      }
    }
    if (!rg && rightPlatDown) {
      rightPlatDown = false;
      if (rightPlatform) {
        ObjectClass.method("Destroy", 1).invoke(rightPlatform);
        rightPlatform = null;
      }
    }
  }
  function doNoclipTick() {
    const btn = getBool("SecondaryButton", L_NODE);
    if (btn !== lastNoclipBtn) {
      lastNoclipBtn = btn;
      noclipOn = !noclipOn;
      const cols = ObjectClass.method("FindObjectsOfType").inflate(MeshColliderClass).invoke();
      for (let i = 0; i < cols.length; i++)
        cols.get(i).method("set_enabled").invoke(!noclipOn);
    }
  }
  function doLowGravity() {
    const rb = getRigidbody();
    if (!rb)
      return;
    try {
      rb.method("AddForce", 2).invoke([0, 8.8, 0], 5);
    } catch (_) {
    }
  }
  function doSpeedBoost() {
    const rb = getRigidbody();
    if (!rb)
      return;
    const vel = rb.method("get_linearVelocity").invoke();
    if (v3mag(vel) > 0.1)
      rb.method("set_linearVelocity").invoke(v3mul(vel, 1.05));
  }
  function doPunchMod() {
    const rb = getRigidbody();
    if (!rb)
      return;
    const head = headTransform();
    if (!head)
      return;
    const players = findAll(NetPlayerClass);
    if (punchLastRight.length !== players.length)
      punchLastRight = new Array(players.length).fill(zeroVec3);
    if (punchLastLeft.length !== players.length)
      punchLastLeft = new Array(players.length).fill(zeroVec3);
    const headPos2 = head.method("get_position").invoke();
    for (let i = 0; i < players.length; i++) {
      const np = players[i];
      try {
        if (np.method("get_IsMine").invoke())
          continue;
      } catch (_) {
        continue;
      }
      const rhT = npHand(np, "handRight");
      const lhT = npHand(np, "handLeft");
      const rh = rhT ? rhT.method("get_position").invoke() : null;
      const lh = lhT ? lhT.method("get_position").invoke() : null;
      const vel = rb.method("get_linearVelocity").invoke();
      if (rh && v3dist(rh, headPos2) < 0.25) {
        const delta = v3mul(v3norm(v3sub(rh, punchLastRight[i])), 10);
        rb.method("set_linearVelocity").invoke(v3add(vel, delta));
      }
      punchLastRight[i] = rh ?? zeroVec3;
      if (lh && v3dist(lh, headPos2) < 0.25) {
        const delta = v3mul(v3norm(v3sub(lh, punchLastLeft[i])), 10);
        rb.method("set_linearVelocity").invoke(v3add(vel, delta));
      }
      punchLastLeft[i] = lh ?? zeroVec3;
    }
  }
  function doTPRandom() {
    const lp = localPlayer();
    if (!lp)
      return;
    selfRPC(() => lp.method("RPC_Teleport").invoke([(Math.random() - 0.5) * 100, 1 + Math.random() * 19, (Math.random() - 0.5) * 100]));
  }
  function doTPToMachine() {
    const machine = findOne(ItemSellingMachineClass);
    if (!machine)
      return;
    const pos = machine.method("get_transform").invoke().method("get_position").invoke();
    const lp = localPlayer();
    if (!lp)
      return;
    selfRPC(() => lp.method("RPC_Teleport").invoke(v3add(pos, [0, 1, 1.5])));
  }
  let gunPointer = null;
  let gunLine = null;
  function rightHandTF() {
    const inst = playerInst();
    if (inst) {
      try {
        const t = inst.field("rightHandTransform").value;
        if (t && !t.handle.isNull())
          return t;
      } catch (_) {
      }
    }
    return getRightHand();
  }
  function renderGun() {
    const handTF = rightHandTF();
    if (!handTF)
      return { ray: null, end: null };
    const startPos = handTF.method("get_position").invoke();
    const dir = handTF.method("get_forward").invoke();
    const rayStart = v3add(startPos, v3mul(dir, 0.3));
    const layerMask = 1 << 8 | 1 << 31;
    let finalRay = null, finalDist = Infinity;
    try {
      const hits = PhysicsClass.method("RaycastAll", 4).invoke(rayStart, dir, 512, layerMask);
      if (hits && !hits.handle.isNull()) {
        for (let i = 0; i < hits.length; i++) {
          try {
            const hit = hits.get(i);
            const col = hit.method("get_collider").invoke();
            if (!col || col.handle.isNull())
              continue;
            const hitGO = col.method("get_gameObject").invoke();
            if (!hitGO || hitGO.handle.isNull())
              continue;
            if (gunPointer && hitGO.handle.equals(gunPointer.handle))
              continue;
            const layer = hitGO.method("get_layer").invoke();
            if (layer === 2)
              continue;
            const pt = hit.method("get_point").invoke();
            const d = v3dist(pt, startPos);
            if (d > 0.3 && d < finalDist) {
              finalRay = hit;
              finalDist = d;
            }
          } catch (_) {
          }
        }
      }
    } catch (e) {
      console.log("[renderGun] " + e);
    }
    let endPos = null;
    if (finalRay) {
      try {
        endPos = finalRay.method("get_point").invoke();
      } catch (_) {
      }
    }
    if (!endPos)
      endPos = v3add(startPos, v3mul(dir, 10));
    if (!gunPointer || gunPointer.handle.isNull()) {
      try {
        gunPointer = GameObjectClass.method("CreatePrimitive").invoke(
          0
          /* Sphere */
        );
        gunPointer.method("set_name").invoke(Il2Cpp.string("[Xera GunPointer]"));
        gunPointer.method("get_transform").invoke().method("set_localScale").invoke([0.15, 0.15, 0.15]);
        try {
          gunPointer.method("GetComponent", 1).inflate(MeshColliderClass).invoke().method("set_enabled").invoke(false);
        } catch (_) {
        }
        try {
          gunPointer.method("set_layer").invoke(2);
        } catch (_) {
        }
        ObjectClass.method("DontDestroyOnLoad").invoke(gunPointer);
      } catch (e) {
        console.log("[renderGun] pointer err: " + e);
      }
    }
    if (gunPointer && !gunPointer.handle.isNull()) {
      try {
        gunPointer.method("SetActive").invoke(true);
        gunPointer.method("get_transform").invoke().method("set_position").invoke(endPos);
        shadePrimitive(gunPointer, finalRay ? [0, 1, 0, 1] : [1, 0, 0, 1]);
      } catch (_) {
      }
    }
    if (LineRendererClass) {
      if (!gunLine || gunLine.handle.isNull()) {
        try {
          const lineObj = GameObjectClass.method("CreatePrimitive").invoke(0);
          try {
            lineObj.method("GetComponent", 1).inflate(RendererClass).invoke().method("set_enabled").invoke(false);
          } catch (_) {
          }
          try {
            lineObj.method("GetComponent", 1).inflate(MeshColliderClass).invoke().method("set_enabled").invoke(false);
          } catch (_) {
          }
          try {
            lineObj.method("set_layer").invoke(2);
          } catch (_) {
          }
          gunLine = lineObj.method("AddComponent", 1).inflate(LineRendererClass).invoke();
          ObjectClass.method("DontDestroyOnLoad").invoke(lineObj);
        } catch (e) {
          console.log("[renderGun] line err: " + e);
        }
      }
      if (gunLine && !gunLine.handle.isNull()) {
        try {
          const mat = gunLine.method("get_material").invoke();
          if (mat && !mat.handle.isNull() && TextShader)
            mat.method("set_shader").invoke(TextShader);
          gunLine.method("set_startColor").invoke([1, 0, 0, 1]);
          gunLine.method("set_endColor").invoke([1, 0, 0, 1]);
          gunLine.method("set_startWidth").invoke(0.02);
          gunLine.method("set_endWidth").invoke(0.02);
          gunLine.method("set_positionCount").invoke(2);
          gunLine.method("set_useWorldSpace").invoke(true);
          gunLine.method("SetPosition").invoke(0, startPos);
          gunLine.method("SetPosition").invoke(1, endPos);
        } catch (_) {
        }
      }
    }
    return { ray: finalRay, end: endPos };
  }
  function hideGun() {
    try {
      if (gunPointer && !gunPointer.handle.isNull())
        gunPointer.method("SetActive").invoke(false);
    } catch (_) {
    }
    try {
      if (gunLine && !gunLine.handle.isNull())
        gunLine.method("get_gameObject").invoke().method("SetActive").invoke(false);
    } catch (_) {
    }
  }
  let _gunPrevTrigger = {};
  let _gunFireDelay = {};
  function gunMod(id, onFire, rapid = false, cooldown2 = 0.15) {
    const gripping = getFloat("Grip", R_NODE) > 0.5;
    if (!gripping) {
      hideGun();
      _gunPrevTrigger[id] = false;
      return;
    }
    const gun = renderGun();
    const trigger = getFloat("Trigger", R_NODE) > 0.5;
    const now = TimeClass.method("get_time").invoke();
    if (rapid) {
      if (trigger && now > (_gunFireDelay[id] || 0)) {
        _gunFireDelay[id] = now + cooldown2;
        try {
          onFire(gun.end, gun.ray);
        } catch (e) {
          console.log("[gunMod " + id + "] " + e);
        }
      }
    } else {
      if (trigger && !_gunPrevTrigger[id]) {
        try {
          onFire(gun.end, gun.ray);
        } catch (e) {
          console.log("[gunMod " + id + "] " + e);
        }
      }
      _gunPrevTrigger[id] = trigger;
    }
  }
  function doSelfTPGun() {
    gunMod("tp", (end) => {
      const [bx, by, bz] = v3xyz(end);
      const lp = localPlayer();
      if (lp)
        selfRPC(() => lp.method("RPC_Teleport").invoke([bx, by + 0.5, bz]));
    });
  }
  function doSpawnItemGun() {
    gunMod("item", (end) => {
      spawnItemAtPos(ITEM_IDS[itemSpawnIdx], end);
    }, true, 0.12);
  }
  function doSpawnMobGun() {
    gunMod("mob", (end) => {
      spawnMobAtPos(MOB_IDS[mobSpawnIdx].id, end);
    }, true, 0.3);
  }
  function setBigPlayer(on) {
    const s = on ? 3 : 1;
    try {
      playerInst()?.method("get_transform").invoke().method("set_localScale").invoke([s, s, s]);
    } catch (e) {
      console.log("[XeraCompany] BigPlayer err: " + e);
    }
  }
  function setTinyPlayer(on) {
    const s = on ? 0.25 : 1;
    try {
      playerInst()?.method("get_transform").invoke().method("set_localScale").invoke([s, s, s]);
    } catch (e) {
      console.log("[XeraCompany] TinyPlayer err: " + e);
    }
  }
  function npHand(np, name) {
    try {
      const v = np.field(name).value;
      if (v)
        return v;
    } catch (_) {
    }
    try {
      return np.method("get_" + name).invoke();
    } catch (_) {
    }
    return null;
  }
  function doGiveSelfMoney() {
    try {
      GameManagerClass.method("AddPlayerMoney").invoke(5e3);
    } catch (e) {
      console.log("[XeraCompany] GiveSelfMoney err: " + e);
    }
  }
  function enableSlowMotion() {
    try {
      TimeClass.method("set_timeScale").invoke(0.3);
    } catch (e) {
      console.log("[XeraCompany] SlowMotion ON err: " + e);
    }
  }
  function disableSlowMotion() {
    try {
      TimeClass.method("set_timeScale").invoke(1);
    } catch (e) {
      console.log("[XeraCompany] SlowMotion OFF err: " + e);
    }
  }
  function getHeldItems() {
    const out = [];
    const lp = localPlayer();
    if (!lp)
      return out;
    try {
      const anchors = lp.method("get_anchors").invoke();
      if (!anchors)
        return out;
      for (let i = 0; i < anchors.length; i++) {
        const a = anchors.get(i);
        if (!a)
          continue;
        const obj = a.method("get_grabbableObject").invoke();
        if (obj)
          out.push(obj);
      }
    } catch (_) {
    }
    return out;
  }
  function doItemColorUp() {
    itemHue = (itemHue + 0.05) % 1;
    for (const o of getHeldItems())
      try {
        o.method("SetColorHue").invoke(itemHue);
      } catch (_) {
      }
  }
  function doItemColorDown() {
    itemHue = (itemHue - 0.05 + 1) % 1;
    for (const o of getHeldItems())
      try {
        o.method("SetColorHue").invoke(itemHue);
      } catch (_) {
      }
  }
  function doStrobeColor() {
    strobeH = (strobeH + 0.05) % 1;
    for (const o of getHeldItems())
      try {
        o.method("SetColorHue").invoke(strobeH);
      } catch (_) {
      }
  }
  function doItemSizeUp() {
    itemScale = Math.min(itemScale + 0.1, 1);
    for (const o of getHeldItems())
      try {
        o.method("SetNormalizedScaleModifier").invoke(itemScale);
      } catch (_) {
      }
  }
  function doItemSizeDown() {
    itemScale = Math.max(itemScale - 0.1, 0);
    for (const o of getHeldItems())
      try {
        o.method("SetNormalizedScaleModifier").invoke(itemScale);
      } catch (_) {
      }
  }
  function doStrobeSize() {
    strobeT += 0.08;
    const s = 0.5 + 0.5 * Math.sin(strobeT);
    for (const o of getHeldItems())
      try {
        o.method("SetNormalizedScaleModifier").invoke(s);
      } catch (_) {
      }
  }
  let rainbowSelfHue = 0;
  let rainbowMobHue = 0;
  let rainbowPlayerHue = 0;
  let jellyPartyNext = 0;
  function doRainbowSelf() {
    rainbowSelfHue = (rainbowSelfHue + 0.01) % 1;
    const lp = localPlayer();
    if (!lp)
      return;
    try {
      selfRPC(() => lp.method("RPC_SetColorHSV").invoke(0.1, rainbowSelfHue, 1, 1));
    } catch (_) {
    }
  }
  function doJellySelf() {
    const lp = localPlayer();
    if (!lp)
      return;
    try {
      selfRPC(() => lp.method("RPC_SetJellyEffect").invoke(2, 1));
    } catch (_) {
    }
  }
  function doJellyParty() {
    const now = TimeClass.method("get_time").invoke();
    if (now < jellyPartyNext)
      return;
    jellyPartyNext = now + 1.8;
    for (const np of findAll(NetPlayerClass))
      try {
        np.method("RPC_SetJellyEffect").invoke(2, 1);
      } catch (_) {
      }
  }
  function doSqueakyParty() {
    for (const np of findAll(NetPlayerClass))
      try {
        np.method("RPC_SetSqueakyVoiceEnabled").invoke(true);
      } catch (_) {
      }
  }
  function doUnsqueakyParty() {
    for (const np of findAll(NetPlayerClass))
      try {
        np.method("RPC_SetSqueakyVoiceEnabled").invoke(false);
      } catch (_) {
      }
  }
  function doRainbowMonsters() {
    rainbowMobHue = (rainbowMobHue + 0.01) % 1;
    for (const mob of findAll(MobControllerClass))
      try {
        mob.method("RPC_SetColorHSV").invoke(0.1, rainbowMobHue, 1, 1);
      } catch (_) {
      }
  }
  function doRainbowPlayers() {
    rainbowPlayerHue = (rainbowPlayerHue + 0.01) % 1;
    const lp = localPlayer();
    for (const np of findAll(NetPlayerClass)) {
      try {
        if (np.method("get_IsMine").invoke())
          continue;
      } catch (_) {
        continue;
      }
      try {
        np.method("RPC_SetColorHSV").invoke(0.1, rainbowPlayerHue, 1, 1);
      } catch (_) {
      }
    }
  }
  function doPayAllMoney() {
    const lp = localPlayer();
    for (const np of findAll(NetPlayerClass)) {
      try {
        if (np.method("get_IsMine").invoke())
          continue;
      } catch (_) {
        continue;
      }
      try {
        np.method("RPC_AddPlayerMoney").invoke(500);
      } catch (_) {
      }
    }
  }
  function doStinkyAll() {
    for (const np of findAll(NetPlayerClass))
      try {
        np.method("RPC_TagAsStinky").invoke();
      } catch (_) {
      }
  }
  function cycleItem(dir) {
    itemSpawnIdx = ((itemSpawnIdx + dir) % ITEM_IDS.length + ITEM_IDS.length) % ITEM_IDS.length;
  }
  function cycleMob(dir) {
    mobSpawnIdx = ((mobSpawnIdx + dir) % MOB_IDS.length + MOB_IDS.length) % MOB_IDS.length;
  }
  function doSpawnItem() {
    const p = headPos();
    if (!p)
      return;
    const head = headTransform();
    const fwd = head.method("get_forward").invoke();
    const at = v3add(p, v3mul(fwd, 0.5));
    spawnItemAtPos(ITEM_IDS[itemSpawnIdx], at);
  }
  function doSpawnMob() {
    const p = headPos();
    if (!p)
      return;
    const head = headTransform();
    const fwd = head.method("get_forward").invoke();
    const at = v3add(p, v3mul(fwd, 1.5));
    spawnMobAtPos(MOB_IDS[mobSpawnIdx].id, at);
  }
  function orbitCenter() {
    const head = headTransform();
    if (head)
      return head.method("get_position").invoke();
    return null;
  }
  function startOrbit() {
    stopOrbit();
    const center = orbitCenter();
    if (!center)
      return;
    for (let i = 0; i < 8; i++) {
      const angle = Math.PI * 2 / 8 * i;
      const off = [Math.cos(angle) * 6.5, 0, Math.sin(angle) * 6.5];
      const spawnPos = v3add(center, off);
      const no = spawnNetworkPrefab("ItemSellingMachineController", spawnPos);
      if (!no || no.handle.isNull())
        continue;
      orbitNetObjs.push(no);
      try {
        const go = no.method("get_gameObject").invoke();
        const tf = go.method("get_transform").invoke();
        orbitTfs.push({ transform: tf, angle });
      } catch (_) {
      }
    }
    console.log("[XeraCompany] orbit spawned " + orbitNetObjs.length + " machines");
  }
  function tickOrbit() {
    if (orbitTfs.length === 0) {
      if (orbitNetObjs.length === 0)
        startOrbit();
      return;
    }
    const center = orbitCenter();
    if (!center)
      return;
    const dt = TimeClass.method("get_deltaTime").invoke();
    for (const orb of orbitTfs) {
      orb.angle += 1.5 * dt;
      const off = [Math.cos(orb.angle) * 6.5, 0, Math.sin(orb.angle) * 6.5];
      try {
        orb.transform.method("set_position").invoke(v3add(center, off));
      } catch (_) {
      }
    }
  }
  function stopOrbit() {
    for (const no of orbitNetObjs) {
      try {
        const runner = no.method("get_Runner").invoke();
        if (runner && !runner.handle.isNull())
          runner.method("Despawn").invoke(no);
      } catch (_) {
      }
    }
    orbitNetObjs = [];
    orbitTfs = [];
  }
  function setInvincible(on) {
    try {
      const lp = localPlayer();
      if (!lp)
        return;
      lp.method("set_isInvincible").invoke(on);
    } catch (e) {
      console.log("[XeraCompany] Invincible err: " + e);
    }
  }
  function doKillMe() {
    const lp = localPlayer();
    if (!lp)
      return;
    try {
      selfRPC(() => lp.method("RPC_DoPlayerDie").invoke(true));
    } catch (e) {
      console.log("[XeraCompany] KillMe err: " + e);
    }
  }
  function doReviveMe() {
    const lp = localPlayer();
    if (!lp)
      return;
    try {
      selfRPC(() => lp.method("RPC_DoPlayerDie").invoke(false));
    } catch (e) {
      console.log("[XeraCompany] ReviveMe err: " + e);
    }
  }
  function doHealMe() {
    const lp = localPlayer();
    if (!lp)
      return;
    selfRPC(() => {
      try {
        lp.method("set_healthLost").invoke(0);
      } catch (_) {
      }
      try {
        lp.method("set_isDie").invoke(false);
      } catch (_) {
      }
    });
  }
  function setArmScale(s) {
    try {
      playerInst()?.method("get_transform").invoke().method("set_localScale").invoke([s, s, s]);
    } catch (e) {
      console.log("[XeraCompany] arm scale err: " + e);
    }
  }
  function setSelfColor(hue) {
    const lp = localPlayer();
    if (!lp)
      return;
    selfRPC(() => {
      try {
        lp.method("RPC_SetColorHSV").invoke(99999, hue, 1, 1);
      } catch (_) {
      }
    });
  }
  function doSetName(name) {
    const lp = localPlayer();
    if (!lp)
      return;
    try {
      lp.method("set_displayName").invoke(Il2Cpp.string(name));
    } catch (_) {
      try {
        lp.field("_displayName").value = Il2Cpp.string(name);
      } catch (e) {
        console.log("[XeraCompany] setName err: " + e);
      }
    }
  }
  function forEachOther(fn) {
    const lp = localPlayer();
    for (const np of findAll(NetPlayerClass)) {
      try {
        if (np.method("get_IsMine").invoke())
          continue;
      } catch (_) {
        continue;
      }
      if (lp && sameHandle(np, lp))
        continue;
      try {
        fn(np);
      } catch (_) {
      }
    }
  }
  function doColorAll(hue) {
    forEachOther((np) => np.method("RPC_SetColorHSV").invoke(99999, hue, 1, 1));
  }
  function doScaleAll(s) {
    forEachOther((np) => {
      try {
        np.method("set_playerScale").invoke(s);
      } catch (_) {
      }
      try {
        np.field("_playerScale").value = s;
      } catch (_) {
      }
    });
  }
  function doMoneyAll(amt) {
    forEachOther((np) => np.method("RPC_AddPlayerMoney").invoke(amt));
  }
  function doBounceAll() {
    forEachOther((np) => np.method("RPC_AddForce").invoke([(Math.random() - 0.5) * 2e3, 1200, (Math.random() - 0.5) * 2e3]));
  }
  function doInvincibleAll() {
    forEachOther((np) => {
      try {
        np.method("set_isInvincible").invoke(true);
      } catch (_) {
      }
    });
  }
  function doWantedAll() {
    forEachOther((np) => {
      try {
        np.method("set_isWanted").invoke(true);
      } catch (_) {
      }
    });
  }
  let rainbowAllPlayersHue = 0;
  function doRainbowAllPlayers() {
    rainbowAllPlayersHue = (rainbowAllPlayersHue + 0.02) % 1;
    for (const np of findAll(NetPlayerClass)) {
      try {
        np.method("RPC_SetColorHSV").invoke(99999, rainbowAllPlayersHue, 1, 1);
      } catch (_) {
      }
    }
  }
  function doMachineToMe() {
    const inst = playerInst();
    if (!inst)
      return;
    const machine = findOne(ItemSellingMachineClass);
    if (!machine || machine.handle.isNull()) {
      console.log("[XeraCompany] no selling machine");
      return;
    }
    try {
      const pos = inst.method("get_transform").invoke().method("get_position").invoke();
      machine.method("get_transform").invoke().method("set_position").invoke(pos);
    } catch (e) {
      console.log("[XeraCompany] MachineToMe err: " + e);
    }
  }
  let _elevFloor = 0;
  let _elevTick = 0;
  function doElevatorSpam() {
    if (_elevTick++ % 9 !== 0)
      return;
    try {
      const ElevatorMgr = acImage.class("AnimalCompany.ElevatorManager");
      const elevs = ObjectClass.method("FindObjectsOfType", 1).inflate(ElevatorMgr).invoke(false);
      if (!elevs || elevs.length === 0)
        return;
      _elevFloor = (_elevFloor + 1) % 3;
      for (let i = 0; i < elevs.length; i++) {
        try {
          elevs.get(i).method("RPC_RequestElevator").invoke(_elevFloor, false);
        } catch (_) {
        }
      }
    } catch (_) {
    }
  }
  let _orbitAngle = 0;
  let _orbitTick = 0;
  function doOrbitPlayers() {
    if (_orbitTick++ % 2 !== 0)
      return;
    const inst = playerInst();
    if (!inst)
      return;
    const center = inst.method("get_transform").invoke().method("get_position").invoke();
    const others = [];
    const lp = localPlayer();
    for (const np of findAll(NetPlayerClass)) {
      try {
        if (np.method("get_IsMine").invoke())
          continue;
      } catch (_) {
        continue;
      }
      if (lp && sameHandle(np, lp))
        continue;
      others.push(np);
    }
    if (others.length === 0)
      return;
    _orbitAngle += 0.15;
    const [cx, cy, cz] = v3xyz(center);
    for (let i = 0; i < others.length; i++) {
      const a = _orbitAngle + i * (Math.PI * 2 / others.length);
      const pos = [cx + Math.cos(a) * 4, cy + 0.5, cz + Math.sin(a) * 4];
      tpNetPlayer(others[i], pos);
    }
  }
  function doGiveMasterclient() {
    try {
      const pg = PrefabGenClass.field("_instance").value;
      if (!pg || pg.handle.isNull())
        return;
      const runner = pg.method("get_runner").invoke();
      if (!runner || runner.handle.isNull())
        return;
      const localRef = runner.method("get_LocalPlayer").invoke();
      runner.method("SetMasterClient").invoke(localRef);
      console.log("[XeraCompany] master client set");
    } catch (e) {
      console.log("[XeraCompany] Masterclient err: " + e);
    }
  }
  function netObjOf(np) {
    for (const g of ["get_Object", "get_NetworkObject", "get_networkObject"]) {
      try {
        const o = np.method(g).invoke();
        if (o && !o.handle.isNull())
          return o;
      } catch (_) {
      }
    }
    return null;
  }
  function tpNetPlayer(np, pos) {
    try {
      const o = netObjOf(np);
      if (o)
        o.method("RequestStateAuthority").invoke();
    } catch (_) {
    }
    selfRPC(() => {
      try {
        np.method("RPC_Teleport").invoke(pos);
      } catch (_) {
      }
    });
  }
  function doBringAll() {
    const inst = playerInst();
    if (!inst)
      return;
    const pos = inst.method("get_transform").invoke().method("get_position").invoke();
    for (const np of findAll(NetPlayerClass)) {
      try {
        if (np.method("get_IsMine").invoke())
          continue;
      } catch (_) {
        continue;
      }
      tpNetPlayer(np, pos);
    }
  }
  function doMassStun() {
    const now = TimeClass.method("get_time").invoke();
    if (now < jellyPartyNext)
      return;
    jellyPartyNext = now + 1;
    for (const np of findAll(NetPlayerClass)) {
      try {
        if (np.method("get_IsMine").invoke())
          continue;
      } catch (_) {
        continue;
      }
      try {
        const p = np.method("get_transform").invoke().method("get_position").invoke();
        np.method("RPC_PlayerStun").invoke(p, 999, 5, 0);
      } catch (_) {
      }
    }
  }
  let dropItemsTick = 0;
  function doDropAllItems() {
    if (dropItemsTick++ % 30 !== 0)
      return;
    try {
      const anchorCls = acImage.class("AnimalCompany.AttachedItemAnchor");
      const anchors = ObjectClass.method("FindObjectsOfType", 1).inflate(anchorCls).invoke(false);
      for (let i = 0; i < anchors.length; i++) {
        const a = anchors.get(i);
        if (!a || a.handle.isNull())
          continue;
        try {
          a.method("RPC_DropObject").invoke(0, zeroVec3, [0, 0, 0, 1], zeroVec3, zeroVec3, true);
        } catch (_) {
        }
        try {
          a.method("RPC_UnattachObject").invoke();
        } catch (_) {
        }
      }
    } catch (_) {
    }
  }
  let rainbowAllTick = 0;
  function doRainbowAllItems() {
    rainbowAllHue = (rainbowAllHue + 5) % 127;
    if (rainbowAllTick++ % 5 !== 0)
      return;
    try {
      const items = ObjectClass.method("FindObjectsOfType", 1).inflate(GrabbableObjectClass).invoke(false);
      for (let i = 0; i < items.length; i++) {
        const it = items.get(i);
        if (!it || it.handle.isNull())
          continue;
        try {
          it.method("set_colorHue").invoke(rainbowAllHue);
        } catch (_) {
        }
        try {
          it.method("set_colorSaturation").invoke(rainbowAllHue);
        } catch (_) {
        }
      }
    } catch (_) {
    }
  }
  function safeHookNull(clsName, method) {
    try {
      acImage.class(clsName).method(method).implementation = null;
    } catch (_) {
    }
  }
  function hookMobNoop(method, on) {
    if (on) {
      try {
        MobControllerClass.method(method).implementation = function() {
        };
      } catch (e) {
        console.log("[XeraCompany] mob hook " + method + " err: " + e);
      }
    } else {
      safeHookNull("AnimalCompany.MobController", method);
    }
  }
  function setMobFrozen(on) {
    hookMobNoop("FixedUpdateNetwork", on);
  }
  function setMobNoAggro(on) {
    hookMobNoop("SetTargetPlayer", on);
  }
  function setMobNoMove(on) {
    hookMobNoop("UpdateNavAgent", on);
  }
  function setMobNoAttack(on) {
    hookMobNoop("Stun", on);
  }
  function setMobInstaDie(on) {
    if (on) {
      try {
        MobControllerClass.method("Hit").implementation = function() {
          try {
            this.method("ForceDie").invoke();
          } catch (_) {
          }
        };
      } catch (e) {
        console.log("[XeraCompany] mob instadie err: " + e);
      }
    } else {
      safeHookNull("AnimalCompany.MobController", "Hit");
    }
  }
  function setMobNoDamage(on) {
    if (on) {
      try {
        MobControllerClass.method("CanHit").implementation = function() {
          return false;
        };
      } catch (e) {
        console.log("[XeraCompany] mob nodmg err: " + e);
      }
    } else {
      safeHookNull("AnimalCompany.MobController", "CanHit");
    }
  }
  function setMobMaxHealth(on) {
    if (on) {
      try {
        MobControllerClass.method("get_n_health").implementation = function() {
          return 999999;
        };
      } catch (e) {
        console.log("[XeraCompany] mob maxhp err: " + e);
      }
    } else {
      safeHookNull("AnimalCompany.MobController", "get_n_health");
    }
  }
  function setMobSpeedX10(on) {
    if (on) {
      try {
        MobControllerClass.method("get_n_navAgentSpeed").implementation = function() {
          return this.method("get_n_navAgentSpeed").invoke() * 10;
        };
      } catch (e) {
        console.log("[XeraCompany] mob speed err: " + e);
      }
    } else {
      safeHookNull("AnimalCompany.MobController", "get_n_navAgentSpeed");
    }
  }
  function setNoFallDamage(on) {
    if (on) {
      try {
        acImage.class("AnimalCompany.PlayerController").method("HandleFallDamage").implementation = function() {
        };
      } catch (e) {
        console.log("[XeraCompany] nofall err: " + e);
      }
    } else {
      safeHookNull("AnimalCompany.PlayerController", "HandleFallDamage");
    }
  }
  function setInfMidAirJumps(on) {
    try {
      const loco = GorillaLocomotionClass.method("get_Instance").invoke();
      if (loco && !loco.handle.isNull())
        loco.method("set_maxMidAirJumps").invoke(on ? 9999 : 0);
    } catch (e) {
      console.log("[XeraCompany] midair err: " + e);
    }
  }
  function setAntiKnockback(on) {
    if (on) {
      try {
        NetPlayerClass.method("RPC_AddForce").implementation = function(force) {
          if (this.method("get_IsMine").invoke())
            return;
          return this.method("RPC_AddForce").invoke(force);
        };
      } catch (e) {
        console.log("[XeraCompany] antikb err: " + e);
      }
    } else {
      safeHookNull("AnimalCompany.NetPlayer", "RPC_AddForce");
    }
  }
  function setInfJetpack(on) {
    if (on) {
      try {
        acImage.class("AnimalCompany.JetpackHandy").method("RPC_UseJetpack").implementation = function() {
          this.method("RPC_UseJetpack").invoke();
          try {
            this.field("_isUsed").value = false;
          } catch (_) {
          }
        };
      } catch (e) {
        console.log("[XeraCompany] jetpack err: " + e);
      }
    } else {
      safeHookNull("AnimalCompany.JetpackHandy", "RPC_UseJetpack");
    }
  }
  function hookGetterReturn(clsName, method, val, on) {
    if (on) {
      try {
        acImage.class(clsName).method(method).implementation = function() {
          return val;
        };
      } catch (e) {
        console.log("[XeraCompany] hook " + clsName + "." + method + " err: " + e);
      }
    } else {
      safeHookNull(clsName, method);
    }
  }
  function setItemsNoDespawn(on) {
    hookGetterReturn("AnimalCompany.GrabbableItem", "get_disableAutoDespawnTimer", true, on);
  }
  function setInfSellValue(on) {
    hookGetterReturn("AnimalCompany.GrabbableItem", "get_sellValue", 999999999, on);
    hookGetterReturn("AnimalCompany.GrabbableItem", "get_additionalSellValue", 999999999, on);
  }
  function setBagInfCapacity(on) {
    hookGetterReturn("AnimalCompany.BackpackItem", "get_capacity", 255, on);
    hookGetterReturn("AnimalCompany.BackpackItem", "get_capacitySafe", 255, on);
  }
  function setAllGrabbable(on) {
    hookGetterReturn("AnimalCompany.GrabbableObject", "get_canGrab", true, on);
  }
  function setBagAlwaysOpen(on) {
    hookGetterReturn("AnimalCompany.BackpackItem", "get_isOpen", true, on);
    hookGetterReturn("AnimalCompany.BackpackItem", "get_canGrabContainedItems", true, on);
  }
  function setNoBombFuse(on) {
    hookGetterReturn("AnimalCompany.Timebomb", "get__fuseTime", 0, on);
  }
  function setInfFlare(on) {
    hookGetterReturn("AnimalCompany.FlareGun", "get_hasAmmo", true, on);
  }
  function setShotgunInf(on) {
    hookGetterReturn("AnimalCompany.Shotgun", "get__ammoLeft", 255, on);
  }
  function setGrenadeCap(on) {
    hookGetterReturn("AnimalCompany.GrenadeLauncher", "get_capacity", 255, on);
  }
  function setFastInteract(on) {
    hookGetterReturn("AnimalCompany.HandInteractor", "get_interactDelay", 0, on);
  }
  function setRevolverInf(on) {
    hookGetterReturn("AnimalCompany.Revolver", "get_ammoLoaded", 255, on);
    hookGetterReturn("AnimalCompany.Revolver", "get_isHammerCocked", true, on);
  }
  let _shieldEnabled = true;
  let _selfRPC = 0;
  function selfRPC(fn) {
    _selfRPC++;
    try {
      return fn();
    } finally {
      _selfRPC--;
    }
  }
  const RPC_BLOCK_LIST = [
    ["RPC_Teleport", "NetPlayer"],
    ["RPC_AddForce", "NetPlayer"],
    ["RPC_PlayerHit", "NetPlayer"],
    ["RPC_PlayerStun", "NetPlayer"],
    ["RPC_SetJellyEffect", "NetPlayer"],
    ["RPC_SetSqueakyVoiceEnabled", "NetPlayer"],
    ["RPC_SetColorHSV", "NetPlayer"],
    ["RPC_TagAsStinky", "NetPlayer"],
    ["RPC_KickPlayer", "NetSessionRPCs"]
  ];
  function installRPCShield() {
    const npHandle = NetPlayerClass.handle.toString();
    for (const [name, hostName] of RPC_BLOCK_LIST) {
      try {
        const host = acImage.class("AnimalCompany." + hostName);
        if (!host) {
          console.log("[Shield] missing class " + hostName);
          continue;
        }
        const m = host.method(name);
        if (!m) {
          console.log("[Shield] missing " + hostName + "." + name);
          continue;
        }
        const onNetPlayer = host.handle.toString() === npHandle;
        m.implementation = function(...args) {
          if (_shieldEnabled && _selfRPC === 0) {
            if (onNetPlayer) {
              try {
                const lp = NetPlayerClass.field("_localPlayer").value;
                if (lp && this.handle.toString() === lp.handle.toString())
                  return;
              } catch (_) {
              }
            } else {
              return;
            }
          }
          try {
            return this.method(name).invoke(...args);
          } catch (_) {
          }
        };
        console.log("[Shield] hooked " + hostName + "." + name);
      } catch (e) {
        console.log("[Shield] " + hostName + "." + name + " failed: " + e);
      }
    }
  }
  installRPCShield();
  if (metaFlagOn())
    applyMetaHook();
  try {
    setDiscordRPC(true);
  } catch (_) {
  }
  let playerButtons = [];
  let actionButtons = [];
  let selectedPlayer = null;
  function playerDisplayName(np) {
    for (const field of ["cache_displayName", "_displayName"]) {
      try {
        const s = np.field(field).value;
        if (s && s.length > 0)
          return s.toString();
      } catch (_) {
      }
    }
    return "Unknown";
  }
  function sameHandle(a, b) {
    try {
      return !!a && !!b && a.handle.toString() === b.handle.toString();
    } catch (_) {
      return false;
    }
  }
  function doTPToPlayer() {
    if (!selectedPlayer)
      return;
    try {
      const pos = selectedPlayer.method("get_transform").invoke().method("get_position").invoke();
      const lp = localPlayer();
      if (!lp)
        return;
      selfRPC(() => lp.method("RPC_Teleport").invoke(pos));
    } catch (e) {
      console.log("[XeraCompany] TPToPlayer err: " + e);
    }
  }
  function doYeetToMe() {
    if (!selectedPlayer)
      return;
    try {
      const inst = playerInst();
      if (!inst)
        return;
      const pos = inst.method("get_transform").invoke().method("get_position").invoke();
      tpNetPlayer(selectedPlayer, pos);
    } catch (e) {
      console.log("[XeraCompany] YeetToMe err: " + e);
    }
  }
  function doTPAllToMe() {
    const inst = playerInst();
    if (!inst)
      return;
    const lp = localPlayer();
    try {
      const pos = inst.method("get_transform").invoke().method("get_position").invoke();
      for (const np of findAll(NetPlayerClass)) {
        if (sameHandle(np, lp))
          continue;
        try {
          if (np.method("get_IsMine").invoke())
            continue;
        } catch (_) {
        }
        tpNetPlayer(np, pos);
      }
    } catch (e) {
      console.log("[XeraCompany] TPAllToMe err: " + e);
    }
  }
  function buildActionButtons() {
    actionButtons = [
      { name: "Back", type: "button", method: () => {
        buildPlayerList();
        changeCat(6, "Players");
      } },
      { name: "TP To Player", type: "button", tooltip: "Warp to their position", method: () => doTPToPlayer() },
      { name: "Yeet To Me", type: "button", tooltip: "Pull them to you", method: () => doYeetToMe() }
    ];
  }
  function buildPlayerList() {
    playerButtons = [
      { name: "Back", type: "button", method: () => changeCat(0, "Home") },
      { name: "Refresh", type: "button", method: () => buildPlayerList() },
      { name: "TP All To Me", type: "button", tooltip: "Yank everyone to you", method: () => doTPAllToMe() }
    ];
    const lp = localPlayer();
    for (const np of findAll(NetPlayerClass)) {
      if (sameHandle(np, lp))
        continue;
      try {
        if (np.method("get_IsMine").invoke())
          continue;
      } catch (_) {
      }
      const name = playerDisplayName(np);
      const target = np;
      playerButtons.push({
        name,
        type: "button",
        method: () => {
          selectedPlayer = target;
          buildActionButtons();
          changeCat(7, name);
        }
      });
    }
  }
  function doKillAllMonsters() {
    const mobs = findAll(MobControllerClass);
    if (mobs.length === 0) {
      console.log("[XeraCompany] KillAllMonsters: no mobs found");
      return;
    }
    for (const mob of mobs) {
      try {
        const pos = mob.method("get_transform").invoke().method("get_position").invoke();
        mob.method("RPC_Hit").invoke(999999, pos, false, 0);
      } catch (e) {
        console.log("[XeraCompany] KillAllMonsters err: " + e);
      }
    }
  }
  function doPressAllMachineButtons() {
    const m = findOne(ItemSellingMachineClass);
    if (!m) {
      console.log("[XeraCompany] PressMachineButtons: no machine found");
      return;
    }
    for (let i = 0; i < 10; i++) {
      try {
        m.method("RPC_ButtonPressed").invoke(i);
      } catch (e) {
        if (i === 0)
          console.log("[XeraCompany] PressMachineButtons err: " + e);
      }
    }
  }
  function setQuality(level) {
    qualityLevel = Math.max(0, Math.min(5, level));
    try {
      QualitySettingsClass.method("SetQualityLevel").invoke(qualityLevel, true);
    } catch (_) {
    }
  }
  function setResScale(scale) {
    if (XRSettingsClass)
      try {
        XRSettingsClass.method("set_eyeTextureResolutionScale").invoke(scale);
      } catch (_) {
      }
  }
  function setShadowDist(dist) {
    try {
      QualitySettingsClass.method("set_shadowDistance").invoke(dist);
    } catch (_) {
    }
  }
  const buttons = [
    // 0: Home
    [
      { name: "Movement", type: "button", method: () => changeCat(1, "Movement") },
      { name: "Self", type: "button", method: () => changeCat(2, "Self") },
      { name: "World", type: "button", method: () => changeCat(3, "World") },
      { name: "Spawn", type: "button", method: () => changeCat(8, "Spawn") },
      { name: "Hooks", type: "button", method: () => changeCat(9, "Hooks") },
      { name: "Experimental", type: "button", method: () => changeCat(5, "Experimental") },
      { name: "Players", type: "button", method: () => {
        buildPlayerList();
        changeCat(6, "Players");
      } }
    ],
    // 1: Movement
    [
      { name: "Back", type: "button", method: () => changeCat(0, "Home") },
      { name: "Fly", type: "toggle", method: () => doFly() },
      { name: "Velo Fly", type: "toggle", method: () => doVeloFly() },
      { name: "Platforms", type: "toggle", method: () => doPlatforms() },
      { name: "Noclip", type: "toggle", method: () => doNoclipTick() },
      { name: "Low Gravity", type: "toggle", method: () => doLowGravity() },
      { name: "Speed Boost", type: "toggle", method: () => doSpeedBoost() },
      { name: "Fly Speed +", type: "button", method: () => {
        flySpeed = Math.min(flySpeed + 2, MAX_FLY_SPEED);
      } },
      { name: "Fly Speed -", type: "button", method: () => {
        flySpeed = Math.max(flySpeed - 2, 1);
      } },
      { name: "TP Random", type: "button", method: () => doTPRandom() },
      { name: "TP To Machine", type: "button", method: () => doTPToMachine() },
      { name: "TP Gun", type: "toggle", method: () => doSelfTPGun() },
      { name: "Inf Mid-Air Jumps", type: "toggle", enableMethod: () => setInfMidAirJumps(true), disableMethod: () => setInfMidAirJumps(false) },
      { name: "No Fall Damage", type: "toggle", enableMethod: () => setNoFallDamage(true), disableMethod: () => setNoFallDamage(false) },
      { name: "Inf Jetpack", type: "toggle", enableMethod: () => setInfJetpack(true), disableMethod: () => setInfJetpack(false) },
      { name: "Anti-Knockback", type: "toggle", tooltip: "Block knockback from grenades/players", enableMethod: () => setAntiKnockback(true), disableMethod: () => setAntiKnockback(false) }
    ],
    // 2: Self
    [
      { name: "Back", type: "button", method: () => changeCat(0, "Home") },
      {
        name: "Meta Quest Servers",
        type: "toggle",
        enabled: metaFlagOn(),
        tooltip: "Spoof Photon app version to join Meta Quest lobbies. May need a restart. Persists.",
        enableMethod: () => setMetaQuest(true),
        disableMethod: () => setMetaQuest(false)
      },
      {
        name: "Save Config",
        type: "toggle",
        tooltip: "Remember enabled mods after restart (saves to XERA.cfg)",
        enableMethod: () => {
          _persist = true;
          cfgWrite();
        },
        disableMethod: () => {
          _persist = false;
          cfgWrite();
        }
      },
      {
        name: "RPC Shield",
        type: "toggle",
        enabled: false,
        tooltip: "Block incoming TP/hit/jelly/kick/etc RPCs targeting you",
        enableMethod: () => {
          _shieldEnabled = true;
          console.log("[Shield] ON");
        },
        disableMethod: () => {
          _shieldEnabled = false;
          console.log("[Shield] OFF");
        }
      },
      { name: "Give Self Money", type: "button", tooltip: "+5000 coins", method: () => doGiveSelfMoney() },
      {
        name: "Big Player",
        type: "toggle",
        enableMethod: () => {
          setBigPlayer(true);
          setTinyPlayer(false);
        },
        disableMethod: () => setBigPlayer(false)
      },
      {
        name: "Tiny Player",
        type: "toggle",
        enableMethod: () => {
          setTinyPlayer(true);
          setBigPlayer(false);
        },
        disableMethod: () => setTinyPlayer(false)
      },
      { name: "Punch Mod", type: "toggle", method: () => doPunchMod() },
      { name: "Slow Motion", type: "toggle", enableMethod: () => enableSlowMotion(), disableMethod: () => disableSlowMotion() },
      { name: "Item Color +", type: "button", method: () => doItemColorUp() },
      { name: "Item Color -", type: "button", method: () => doItemColorDown() },
      { name: "Item Strobe Color", type: "toggle", method: () => doStrobeColor() },
      { name: "Item Size +", type: "button", method: () => doItemSizeUp() },
      { name: "Item Size -", type: "button", method: () => doItemSizeDown() },
      { name: "Item Strobe Size", type: "toggle", method: () => doStrobeSize() },
      { name: "Rainbow Self", type: "toggle", method: () => doRainbowSelf() },
      { name: "Jelly Self", type: "toggle", method: () => doJellySelf() },
      { name: "Invincible", type: "toggle", tooltip: "set_isInvincible", enableMethod: () => setInvincible(true), disableMethod: () => setInvincible(false) },
      { name: "Kill Me", type: "button", method: () => doKillMe() },
      { name: "Revive Me", type: "button", method: () => doReviveMe() },
      { name: "Heal Me", type: "button", tooltip: "Reset health + un-die", method: () => doHealMe() },
      { name: "Selling Machine Orbit", type: "toggle", tooltip: "8 machines orbit you", enableMethod: () => startOrbit(), method: () => tickOrbit(), disableMethod: () => stopOrbit() },
      { name: "Long Arms", type: "toggle", tooltip: "Scale 1.75x", enableMethod: () => setArmScale(1.75), disableMethod: () => setArmScale(1) },
      { name: "Longer Arms", type: "toggle", tooltip: "Scale 2.5x", enableMethod: () => setArmScale(2.5), disableMethod: () => setArmScale(1) },
      { name: "Color Self Red", type: "button", method: () => setSelfColor(0) },
      { name: "Color Self Green", type: "button", method: () => setSelfColor(0.33) },
      { name: "Color Self Blue", type: "button", method: () => setSelfColor(0.67) },
      { name: "Color Self Pink", type: "button", method: () => setSelfColor(0.92) },
      { name: "Set Name Wally", type: "button", method: () => doSetName("Wally") },
      { name: "Set Name Discord", type: "button", tooltip: "Sets name to discord.gg/viscera", method: () => doSetName("discord.gg/viscera") }
    ],
    // 3: World
    [
      { name: "Back", type: "button", method: () => changeCat(0, "Home") },
      { name: "Kill All Monsters", type: "button", method: () => doKillAllMonsters() },
      { name: "Press Machine Buttons", type: "button", method: () => doPressAllMachineButtons() },
      { name: "Jelly Party", type: "toggle", method: () => doJellyParty() },
      { name: "Squeaky Party", type: "button", method: () => doSqueakyParty() },
      { name: "Unsqueaky Party", type: "button", method: () => doUnsqueakyParty() },
      { name: "Pay All 500", type: "button", tooltip: "Give every other player 500 coins", method: () => doPayAllMoney() },
      { name: "Stinky All", type: "button", method: () => doStinkyAll() },
      { name: "Bring All", type: "button", tooltip: "Teleport everyone to you", method: () => doBringAll() },
      { name: "Mass Stun All", type: "toggle", method: () => doMassStun() },
      { name: "Drop Everyone's Items", type: "toggle", method: () => doDropAllItems() },
      { name: "Rainbow All Items", type: "toggle", method: () => doRainbowAllItems() },
      { name: "Mob Frozen", type: "toggle", enableMethod: () => setMobFrozen(true), disableMethod: () => setMobFrozen(false) },
      { name: "Mob No Aggro", type: "toggle", enableMethod: () => setMobNoAggro(true), disableMethod: () => setMobNoAggro(false) },
      { name: "Mob No Move", type: "toggle", enableMethod: () => setMobNoMove(true), disableMethod: () => setMobNoMove(false) },
      { name: "Mob No Attack", type: "toggle", enableMethod: () => setMobNoAttack(true), disableMethod: () => setMobNoAttack(false) },
      { name: "Mob Insta Die", type: "toggle", enableMethod: () => setMobInstaDie(true), disableMethod: () => setMobInstaDie(false) },
      { name: "Mob No Damage", type: "toggle", enableMethod: () => setMobNoDamage(true), disableMethod: () => setMobNoDamage(false) },
      { name: "Mob Max Health", type: "toggle", enableMethod: () => setMobMaxHealth(true), disableMethod: () => setMobMaxHealth(false) },
      { name: "Mob Speed x10", type: "toggle", enableMethod: () => setMobSpeedX10(true), disableMethod: () => setMobSpeedX10(false) },
      { name: "Color All Red", type: "button", method: () => doColorAll(0) },
      { name: "Rainbow All Players", type: "toggle", method: () => doRainbowAllPlayers() },
      { name: "Scale All Big", type: "button", method: () => doScaleAll(5) },
      { name: "Scale All Tiny", type: "button", method: () => doScaleAll(0.1) },
      { name: "Scale All Normal", type: "button", method: () => doScaleAll(1) },
      { name: "Money All +9999", type: "button", method: () => doMoneyAll(9999) },
      { name: "Money Drain All", type: "button", method: () => doMoneyAll(-99999) },
      { name: "Bounce All", type: "button", tooltip: "Launch everyone randomly", method: () => doBounceAll() },
      { name: "Orbit Players", type: "toggle", tooltip: "Spin all players around you", method: () => doOrbitPlayers() },
      { name: "Invincible All", type: "button", method: () => doInvincibleAll() },
      { name: "Wanted All", type: "button", method: () => doWantedAll() },
      { name: "Machine To Me", type: "button", tooltip: "Move selling machine to you", method: () => doMachineToMe() },
      { name: "Elevator Spam", type: "toggle", method: () => doElevatorSpam() },
      { name: "Give Masterclient", type: "button", tooltip: "Become host", method: () => doGiveMasterclient() }
    ],
    // 4: Credits
    [
      { name: "Enter Menu", type: "button", method: () => changeCat(0, "Home") },
      { name: "Menu by Juelz", type: "button", tooltip: "Made Xera Company" }
    ],
    // 5: Experimental (buffs + perf)
    [
      { name: "Back", type: "button", method: () => changeCat(0, "Home") },
      { name: "Speed Boost", type: "toggle", enableMethod: () => applyBuff("SpeedBoost", 2), disableMethod: () => resetBuff("SpeedBoost") },
      { name: "Big Player", type: "toggle", enableMethod: () => applyBuff("Scale", 2.5), disableMethod: () => resetBuff("Scale") },
      { name: "Big Head", type: "toggle", enableMethod: () => applyBuff("HeadSize", 3), disableMethod: () => resetBuff("HeadSize") },
      { name: "Anti Gravity", type: "toggle", enableMethod: () => applyBuff("AntiGravity", 1), disableMethod: () => resetBuff("AntiGravity") },
      { name: "Damage Boost", type: "toggle", enableMethod: () => applyBuff("Damage", 3), disableMethod: () => resetBuff("Damage") },
      { name: "Bloodlust", type: "toggle", enableMethod: () => applyBuff("Bloodlust", 1), disableMethod: () => resetBuff("Bloodlust") },
      { name: "Prop Body", type: "toggle", enableMethod: () => applyBuff("PropBody", 1), disableMethod: () => resetBuff("PropBody") },
      { name: "Pink Effect", type: "toggle", enableMethod: () => applyBuff("PinkEffect", 1), disableMethod: () => resetBuff("PinkEffect") },
      { name: "Heart Eyes", type: "toggle", enableMethod: () => applyBuff("HeartEyes", 1), disableMethod: () => resetBuff("HeartEyes") },
      { name: "Flashlight Eyes", type: "toggle", enableMethod: () => applyBuff("FlashlightEyes", 1), disableMethod: () => resetBuff("FlashlightEyes") },
      { name: "Stinky", type: "toggle", enableMethod: () => applyBuff("Stinky", 1), disableMethod: () => resetBuff("Stinky") },
      { name: "Farty", type: "toggle", enableMethod: () => applyBuff("Farty", 1), disableMethod: () => resetBuff("Farty") },
      { name: "Fart Boost", type: "toggle", enableMethod: () => applyBuff("FartBoost", 2), disableMethod: () => resetBuff("FartBoost") },
      { name: "Radiation", type: "toggle", enableMethod: () => applyBuff("Radiation", 1), disableMethod: () => resetBuff("Radiation") },
      { name: "Quality +", type: "button", method: () => setQuality(qualityLevel + 1) },
      { name: "Quality -", type: "button", method: () => setQuality(qualityLevel - 1) },
      {
        name: "Low Quality",
        type: "toggle",
        enableMethod: () => {
          setQuality(0);
          setShadowDist(0);
          setResScale(0.7);
        },
        disableMethod: () => {
          setQuality(3);
          setShadowDist(50);
          setResScale(1);
        }
      }
    ],
    // 6 & 7 are dynamic (Players list / actions) — placeholders so indices line up
    [],
    [],
    // 8: Spawn
    [
      { name: "Back", type: "button", method: () => changeCat(0, "Home") },
      { name: "Item +", type: "button", method: () => cycleItem(1) },
      { name: "Item -", type: "button", method: () => cycleItem(-1) },
      { name: "Spawn Item", type: "button", tooltip: "Spawn selected item in front of you", method: () => doSpawnItem() },
      { name: "Mob +", type: "button", method: () => cycleMob(1) },
      { name: "Mob -", type: "button", method: () => cycleMob(-1) },
      { name: "Spawn Mob", type: "button", tooltip: "Spawn selected mob in front of you", method: () => doSpawnMob() },
      { name: "Spawn Item Gun", type: "toggle", tooltip: "Hold R-grip aim, R-trigger spawns item at laser", method: () => doSpawnItemGun() },
      { name: "Spawn Mob Gun", type: "toggle", tooltip: "Hold R-grip aim, R-trigger spawns mob at laser", method: () => doSpawnMobGun() },
      { name: "Spell XERA", type: "button", tooltip: "Spell XERA", method: () => spellInSky("XERA", "item_ore_hell", true) },
      { name: "Spell Discord", type: "button", tooltip: "Spell DISCORD.GG/VISCERA", method: () => spellInSky("DISCORD.GG/VISCERA", "item_ore_hell", true) },
      { name: "Spell .GG/VISCERA", type: "button", tooltip: "Spell .GG/VISCERA", method: () => spellInSky(".GG/VISCERA", "item_ore_hell", true) },
      { name: "Spell XERA ON TOP", type: "button", tooltip: "Spell XERA ON TOP", method: () => spellInSky("XERA ON TOP", "item_ore_hell", true) },
      { name: "Spell JUELZ ON TOP", type: "button", tooltip: "Spell JUELZ ON TOP", method: () => spellInSky("JUELZ ON TOP", "item_ore_hell", true) },
      { name: "Spell TIG ON TOP", type: "button", tooltip: "Spell TIG ON TOP", method: () => spellInSky("TIG ON TOP", "item_ore_hell", true) },
      { name: "Spell MXME ON TOP", type: "button", tooltip: "Spell MXME ON TOP", method: () => spellInSky("MXME ON TOP", "item_ore_hell", true) },
      { name: "Spell Dont Skid", type: "button", tooltip: "Spell DONT SKID!", method: () => spellInSky("DONT SKID!", "item_ore_hell", true) },
      { name: "Spell Fuck You", type: "button", tooltip: "Spell FUCK YOU", method: () => spellInSky("FUCK YOU", "item_ore_hell", true) },
      { name: "Spell AC Sucks", type: "button", tooltip: "Spell AC SUCKS!", method: () => spellInSky("AC SUCKS!", "item_ore_hell", true) },
      { name: "Spell Fuck AC", type: "button", tooltip: "Spell FUCK ANIMAL COMPANY", method: () => spellInSky("FUCK ANIMAL COMPANY", "item_ore_hell", true) },
      { name: "Spell Xera Company", type: "button", tooltip: "Spell XERA COMPANY", method: () => spellInSky("XERA COMPANY", "item_ore_hell", true) },
      { name: "Spell Banned?", type: "button", tooltip: "Spell BANNED?", method: () => spellInSky("BANNED?", "item_ore_hell", true) },
      { name: "Spell 404", type: "button", tooltip: "Spell 404", method: () => spellInSky("404", "item_ore_hell", true) },
      { name: "Spell :)", type: "button", tooltip: "Spell :)", method: () => spellInSky(":)", "item_ore_hell", true) },
      { name: "Spell <3", type: "button", tooltip: "Spell <3", method: () => spellInSky("<3", "item_ore_hell", true) },
      { name: "Spawn Shrek", type: "button", tooltip: "Render Shrek face in braille rocks", method: () => renderBraille(SHREK_ART, "item_ore_hell") },
      { name: "Spawn Take The L", type: "button", tooltip: "Render Take The L in braille rocks", method: () => renderBraille(TAKEL_ART, "item_ore_hell") },
      { name: "Spawn Heart", type: "button", tooltip: "Render a heart in rocks", method: () => renderBraille(HEART_ART, "item_ore_hell") },
      { name: "Spawn Skull", type: "button", tooltip: "Render a skull in rocks", method: () => renderBraille(SKULL_ART, "item_ore_hell") },
      { name: "Spawn Amogus", type: "button", tooltip: "sus", method: () => renderBraille(AMOGUS_ART, "item_ore_hell") },
      { name: "Spawn Amogus Small", type: "button", tooltip: "sus (small, less lag)", method: () => renderBraille(AMOGUS_ART, "item_ore_hell", 0.2) },
      { name: "Spawn Middle Finger", type: "button", tooltip: "Render a middle finger", method: () => renderBraille(FINGER_ART, "item_ore_hell") },
      { name: "Spawn Smiley", type: "button", tooltip: "Render a smiley face", method: () => renderBraille(SMILEY_ART, "item_ore_hell") },
      { name: "Spawn Mushroom", type: "button", tooltip: "Render a 1up mushroom", method: () => renderBraille(MUSHROOM_ART, "item_ore_hell") }
    ],
    // 9: Hooks
    [
      { name: "Back", type: "button", method: () => changeCat(0, "Home") },
      { name: "Items No Despawn", type: "toggle", enableMethod: () => setItemsNoDespawn(true), disableMethod: () => setItemsNoDespawn(false) },
      { name: "Inf Sell Value", type: "toggle", enableMethod: () => setInfSellValue(true), disableMethod: () => setInfSellValue(false) },
      { name: "Bag Inf Capacity", type: "toggle", enableMethod: () => setBagInfCapacity(true), disableMethod: () => setBagInfCapacity(false) },
      { name: "All Items Grabbable", type: "toggle", enableMethod: () => setAllGrabbable(true), disableMethod: () => setAllGrabbable(false) },
      { name: "Bag Always Open", type: "toggle", enableMethod: () => setBagAlwaysOpen(true), disableMethod: () => setBagAlwaysOpen(false) },
      { name: "Fast Interact", type: "toggle", enableMethod: () => setFastInteract(true), disableMethod: () => setFastInteract(false) },
      { name: "No Bomb Fuse", type: "toggle", enableMethod: () => setNoBombFuse(true), disableMethod: () => setNoBombFuse(false) },
      { name: "Inf Flare Ammo", type: "toggle", enableMethod: () => setInfFlare(true), disableMethod: () => setInfFlare(false) },
      { name: "Revolver Inf Ammo", type: "toggle", enableMethod: () => setRevolverInf(true), disableMethod: () => setRevolverInf(false) },
      { name: "Shotgun Inf Ammo", type: "toggle", enableMethod: () => setShotgunInf(true), disableMethod: () => setShotgunInf(false) },
      { name: "Grenade Cap 255", type: "toggle", enableMethod: () => setGrenadeCap(true), disableMethod: () => setGrenadeCap(false) }
    ]
  ];
  const backBtn = { name: "<- Back", type: "button", method: () => {
    pageIndex--;
  } };
  const nextBtn = { name: "Next ->", type: "button", method: () => {
    pageIndex++;
  } };
  const discordBtn = { name: "Discord", type: "button", tooltip: "discord.gg/dFSjBuh3Nk" };
  function handleMods() {
    for (const cat of buttons)
      for (const b of cat)
        if (b.enabled && b.type === "toggle" && b.method)
          try {
            b.method();
          } catch (_) {
          }
  }
  function currentSource() {
    if (catIndex === 6)
      return playerButtons;
    if (catIndex === 7)
      return actionButtons;
    return buttons[catIndex];
  }
  function correctIndex(modz) {
    const src = currentSource();
    maxPages = Math.max(0, Math.ceil(src.length / 8) - 1);
    if (pageIndex < 0)
      pageIndex = maxPages;
    if (pageIndex > maxPages)
      pageIndex = 0;
    if (cursorIndex < 0)
      cursorIndex = modz.length - 1;
    if (cursorIndex > modz.length - 1)
      cursorIndex = 0;
  }
  let prevMenuShown = false;
  function menuFrame() {
    if (menuGO) {
      try {
        menuGO.method("get_name").invoke();
      } catch (_) {
        menuGO = null;
        liveButtons.clear();
      }
    }
    const leftSecondary = getBool("SecondaryButton", L_NODE);
    const rightSecondary = getBool("SecondaryButton", R_NODE);
    const leftClick = getBool("Primary2DAxisClick", L_NODE);
    const rightClick = getBool("Primary2DAxisClick", R_NODE);
    const leftOpen = leftSecondary || leftClick;
    const rightOpen = rightSecondary || rightClick;
    const show = leftOpen || rightOpen;
    if (show) {
      righthand = rightOpen && !leftOpen;
      if (!menuGO) {
        renderMenu();
        renderReference();
      } else
        recenterMenu();
      if (!referenceGO)
        renderReference();
    } else if (menuGO || referenceGO) {
      destroyMenu();
    }
    prevMenuShown = show;
  }
  let tickCount = 0;
  let lastTickFrame = -1;
  let lastTickStamp = 0;
  function safeTick() {
    try {
      let frame = -1;
      try {
        frame = TimeClass.method("get_frameCount").invoke();
      } catch (_) {
      }
      if (frame === lastTickFrame)
        return;
      lastTickFrame = frame;
      tickCount++;
      try {
        lastTickStamp = TimeClass.method("get_time").invoke();
      } catch (_) {
      }
      if (tickCount % 250 === 0) {
        let lc = false, a = false, ry = 0, lg = 0;
        try {
          lc = getBool("Primary2DAxisClick", L_NODE);
        } catch (_) {
        }
        try {
          a = getBool("PrimaryButton", R_NODE);
        } catch (_) {
        }
        try {
          ry = getVec2("Primary2DAxis", R_NODE)[1];
        } catch (_) {
        }
        try {
          lg = getFloat("Grip", L_NODE);
        } catch (_) {
        }
        let lsec = false, rsec = false;
        try {
          lsec = getBool("SecondaryButton", L_NODE);
        } catch (_) {
        }
        try {
          rsec = getBool("SecondaryButton", R_NODE);
        } catch (_) {
        }
        console.log(`[XeraCompany] tick ${tickCount} cat=${catIndex} page=${pageIndex} shown=${!!menuGO} XR{lClick=${lc} A=${a} ry=${ry.toFixed(2)} lGrip=${lg.toFixed(2)} lSec=${lsec} rSec=${rsec}}`);
      }
      try {
        playerInst();
      } catch (_) {
      }
      if (_lobbyChanged) {
        _lobbyChanged = false;
        console.log("[XeraCompany] lobby change \u2192 rebuild menu");
        try {
          destroyMenu();
        } catch (e) {
          console.log("[XeraCompany] destroyMenu err: " + e);
        }
        catIndex = 0;
        pageIndex = 0;
        cursorIndex = 0;
        catName = "Home";
        cooldown = false;
        cooldownTime = 0;
        menuHidden = false;
        unhideStart = -1;
      }
      try {
        handleMods();
      } catch (e) {
        console.log("[XeraCompany] handleMods ERROR: " + e);
      }
      try {
        rpcTick();
      } catch (_) {
      }
      if (!_devApplied) {
        try {
          _devApplied = applyDevFlag();
        } catch (_) {
        }
      }
      try {
        menuFrame();
      } catch (e) {
        console.log("[XeraCompany] menuFrame ERROR (resetting): " + e);
        menuGO = null;
        liveButtons.clear();
      }
    } catch (e) {
      try {
        console.log("[XeraCompany] FATAL tick err: " + e);
      } catch (_) {
      }
    }
  }
  function attachIfExists(cls, methodName) {
    try {
      const m = cls.method(methodName);
      if (!m)
        return false;
      Interceptor.attach(ptr(m.virtualAddress.toString()), { onEnter() {
        safeTick();
      } });
      console.log("[XeraCompany] hooked " + cls.name + "." + methodName);
      return true;
    } catch (e) {
      console.log("[XeraCompany] hook " + methodName + " failed: " + e);
      return false;
    }
  }
  if (ButtonBehaviourClass) {
    try {
      const onTrigger = ButtonBehaviourClass.method("OnTriggerEnter");
      onTrigger.implementation = function(collider) {
        try {
          const rawName = this.method("get_name").invoke().toString();
          if (rawName.length > 2 && rawName[1] === "@") {
            if (referenceCollider && collider.handle.equals(referenceCollider.handle)) {
              const label = rawName.substring(2, rawName.length - 1);
              const now = TimeClass.method("get_time").invoke();
              if (now > buttonClickDelay) {
                buttonClickDelay = now + 0.25;
                const b = liveButtons.get(label);
                if (b) {
                  if (b.type === "toggle") {
                    b.enabled = !b.enabled;
                    try {
                      (b.enabled ? b.enableMethod : b.disableMethod)?.();
                    } catch (e) {
                      console.log("[XeraCompany] toggle " + label + " err: " + e);
                    }
                    try {
                      cfgSaveIfOn();
                    } catch (_) {
                    }
                    reloadMenu();
                  } else {
                    try {
                      b.method?.();
                    } catch (e) {
                      console.log("[XeraCompany] button " + label + " err: " + e);
                    }
                    reloadMenu();
                  }
                }
              }
            }
            return;
          }
        } catch (e) {
          console.log("[XeraCompany] OnTriggerEnter err: " + e);
        }
        return this.method("OnTriggerEnter").invoke(collider);
      };
      console.log("[XeraCompany] button trigger hook installed on " + ButtonBehaviourClass.name);
    } catch (e) {
      console.log("[XeraCompany] trigger hook failed: " + e);
    }
  } else {
    console.log("[XeraCompany] WARNING: no button behaviour class found \u2014 presses won't register");
  }
  try {
    const ApplicationClass = coreImage.class("UnityEngine.Application");
    let quitHooks = 0;
    for (const m of ApplicationClass.methods) {
      if (m.name === "Quit") {
        try {
          m.implementation = function() {
            console.log("[XeraCompany] Application.Quit blocked");
          };
          quitHooks++;
        } catch (_) {
        }
      }
    }
    console.log("[XeraCompany] Application.Quit hooks installed: " + quitHooks);
  } catch (e) {
    console.log("[XeraCompany] Application.Quit hook failed: " + e);
  }
  try {
    cfgApplyOnLoad();
  } catch (e) {
    console.log("[Cfg] load err: " + e);
  }
  attachIfExists(GorillaLocomotionClass, "FixedUpdate");
  attachIfExists(GorillaLocomotionClass, "OnUpdate");
});