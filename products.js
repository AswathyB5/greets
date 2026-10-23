/* ===================================================================
   GREETS EQUIPMENT — Products Catalogue & Inner-Page Router
   Ported from greets-products (20).html and adapted for the enhanced
   index.html design system (styles.css variables, typography, spacing).
   =================================================================== */

(function () {
  "use strict";

  /* ----------------------------------------------------------------
     LOGO paths — match the assets already used by the home page
     ---------------------------------------------------------------- */
  const LOGO_PATHS = {
    bmi: "assets/logo-BMI.png",
    novatec: "assets/logo-novatec.png",
    huasheng: "Huasheng-machine-photos/HUASHENG-logo.png",
  };

  /* ----------------------------------------------------------------
     PHOTOS — asset paths (instead of base64 blobs from the reference)
     ---------------------------------------------------------------- */
  const PHOTOS = {
    /* BMI */
    b8t: "assets/catalog/BMI-furnace-door-open-hot-zone.jpg",
    vse8t: "assets/catalog/vse8t.jpg",
    bmi_brazing: "assets/catalog/bmi_brazing.jpg",
    bmi_low: "assets/catalog/bmi_low.jpg",
    bmi_oil: "assets/catalog/bmi_oil.jpg",
    bmi_thermo: "assets/catalog/bmi_thermo.jpg",
    bmi_brand: "assets/catalog/bmi_brand.jpg",
    bmi_gas: "assets/catalog/bmi_gas.jpg",
    /* BMI 2026 presentation photography */
    bmi_line_installed: "assets/catalog/BMI-furnace-line-installed.jpg",
    bmi_horiz_workshop: "assets/catalog/BMI-horizontal-furnace-workshop.jpg",
    bmi_vert_assembly: "assets/catalog/BMI-vertical-furnace-assembly.jpg",
    bmi_large_assembly: "assets/catalog/BMI-large-furnace-assembly.jpg",
    bmi_workshops: "assets/catalog/BMI-furnaces-in-workshop.jpg",
    bmi_with_trolley: "assets/catalog/BMI-furnace-with-loading-trolley.jpg",
    bmi_white_trolley: "assets/catalog/BMI-furnace-white-with-trolley.jpg",
    bmi_vert_portrait: "assets/catalog/BMI-vertical-furnace-portrait.jpg",
    bmi_hot_zone: "assets/catalog/BMI-hot-zone-head-on.jpg",
    bmi_door_open_hot_zone: "assets/catalog/BMI-furnace-door-open-hot-zone.jpg",
    bmi_horiz_door_open: "assets/catalog/BMI-horizontal-furnace-door-open.jpg",
    bmi_horiz_01: "assets/catalog/BMI-horizontal-furnace-01.jpg",
    bmi_horiz_02: "assets/catalog/BMI-horizontal-furnace-02.jpg",
    bmi_control_cabinets: "assets/catalog/BMI-furnace-with-control-cabinets.jpg",
    bmi_cooling_unit: "assets/catalog/BMI-furnace-with-cooling-unit.jpg",
    bmi_top_view: "assets/catalog/BMI-furnace-top-view.jpg",
    bmi_vert_tall: "assets/catalog/BMI-vertical-furnace-tall.jpg",
    bmi_vert_white: "assets/catalog/BMI-vertical-furnace-white.jpg",
    bmi_vert_orange: "assets/catalog/BMI-vertical-furnace-orange.jpg",
    bmi_load_tray: "assets/catalog/BMI-furnace-load-tray-extended.jpg",
    bmi_long_horiz: "assets/catalog/BMI-long-horizontal-furnace.jpg",
    bmi_loading_trolley: "assets/catalog/BMI-furnace-loading-trolley.jpg",
    bmi_hall: "assets/catalog/BMI-furnace-hall.jpg",
    bmi_white_workshop: "assets/catalog/BMI-furnace-white-workshop.jpg",
    bmi_early_furnace: "assets/catalog/BMI-historical-early-furnace.jpg",
    bmi_hot_zone_bw: "assets/catalog/BMI-hot-zone-detail-bw.jpg",
    /* Novatec */
    nov_main: "assets/catalog/PLURITANK-1400-line-and-loading.jpg",
    nov_brand: "assets/catalog/PLURITANK-1400-line-overview.jpg",
    nov_2crd: "assets/catalog/2CRD400-front.jpg",
    nov_gen: "assets/catalog/ultrasonic-tanks-with-generators.jpg",
    nov_trans: "assets/catalog/nov_trans.jpg",
    crd_green: "assets/catalog/2CRD400-front.jpg",
    nm_brand: "assets/catalog/PLURITANK-cleanroom-line-01.jpg",
    nm_pluri_cat: "assets/catalog/PLURITANK-1400-line-overview.jpg",
    nm_pluri: "assets/catalog/PLURITANK-line-studio.jpg",
    nm_2crd: "assets/catalog/2CRD400-front.jpg",
    nm_2crd_b: "assets/catalog/2CRD200-front.jpg",
    nm_implants: "assets/catalog/MEDICAL-implant-components.jpg",
    nm_ipc: "assets/catalog/MEDICAL-IPC-2CRD400.jpg",
    nm_basket: "assets/catalog/MEDICAL-implants-in-basket-01.jpg",
    nm_fcps: "assets/catalog/MEDICAL-FCPS-cleanroom-line-01.jpg",
    nm_fcps_b: "assets/catalog/MEDICAL-FCPS-cleanroom-line-02.jpg",
    nm_fcps_c: "assets/catalog/MEDICAL-FCPS-cleanroom-unload.jpg",
    nm_fcps_d: "assets/catalog/MEDICAL-FCPS-line-portrait.jpg",
    nm_fpi: "assets/catalog/MEDICAL-FPI-system-drawing.jpg",
    nm_fpi_b: "assets/catalog/MEDICAL-FPI-line-installed-01.jpg",
    nm_fpi_c: "assets/catalog/MEDICAL-FPI-line-installed-02.jpg",
    nm_fpi_d: "assets/catalog/MEDICAL-FPI-system-drawing.jpg",
    nm_urs: "assets/catalog/MEDICAL-combined-layout-drawing.jpg",
    nm_urs_b: "assets/catalog/MEDICAL-implants-in-basket-02.jpg",
    nm_clean: "assets/catalog/PLURITANK-cleanroom-line-01.jpg",
    nm_hq: "assets/catalog/NOVATEC-headquarters.jpg",
    nov_plt1400_overview: "assets/catalog/PLURITANK-1400-line-overview.jpg",
    nov_plt1400_loading: "assets/catalog/PLURITANK-1400-line-and-loading.jpg",
    nov_plt1400_gen: "assets/catalog/PLURITANK-1400-ultrasonic-generators.jpg",
    nov_plt_studio: "assets/catalog/PLURITANK-line-studio.jpg",
    nov_plt_clean_01: "assets/catalog/PLURITANK-cleanroom-line-01.jpg",
    nov_plt_clean_02: "assets/catalog/PLURITANK-cleanroom-line-02.jpg",
    nov_plt_clean_03: "assets/catalog/PLURITANK-cleanroom-line-03.jpg",
    nov_plt_fume: "assets/catalog/PLURITANK-line-fume-extraction.jpg",
    nov_plt_enclosed: "assets/catalog/PLURITANK-enclosed-line.jpg",
    nov_plt_panel: "assets/catalog/PLURITANK-line-control-panel.jpg",
    nov_plt_guarded: "assets/catalog/PLURITANK-line-guarded.jpg",
    nov_plt_dryer: "assets/catalog/PLURITANK-line-with-dryer.jpg",
    nov_plt_gantry: "assets/catalog/PLURITANK-gantry-interior.jpg",
    nov_plt_tanks: "assets/catalog/PLURITANK-tank-row-interior.jpg",
    nov_plt_tank_detail: "assets/catalog/PLURITANK-tank-detail.jpg",
    nov_plt_compact: "assets/catalog/PLURITANK-compact-line.jpg",
    nov_tanks_gen: "assets/catalog/ultrasonic-tanks-with-generators.jpg",
    nov_2crd100: "assets/catalog/2CRD100-front.jpg",
    nov_2crd100r: "assets/catalog/2CRD100-R-front.jpg",
    nov_2crd200: "assets/catalog/2CRD200-front.jpg",
    nov_2crd200_load: "assets/catalog/2CRD200-loading.jpg",
    nov_2crd400: "assets/catalog/2CRD400-front.jpg",
    nov_2crd800: "assets/catalog/2CRD800-front.jpg",
    nov_2crd800_saw1: "assets/catalog/2CRD800-saw-blades-01.jpg",
    nov_2crd800_saw2: "assets/catalog/2CRD800-saw-blades-02.jpg",
    nov_2crd800_trolley: "assets/catalog/2CRD800-loading-tooling.jpg",
    nov_2crd_chamber: "assets/catalog/2CRD-vacuum-chamber-interior.jpg",
    nov_2crd_baskets: "assets/catalog/2CRD-baskets-and-tooling.jpg",
    nov_med_ipc_2crd: "assets/catalog/MEDICAL-IPC-2CRD400.jpg",
    nov_med_ipc_plt1: "assets/catalog/MEDICAL-IPC-pluritank-line-01.jpg",
    nov_med_ipc_plt2: "assets/catalog/MEDICAL-IPC-pluritank-line-02.jpg",
    nov_med_fcps1: "assets/catalog/MEDICAL-FCPS-cleanroom-line-01.jpg",
    nov_med_fcps2: "assets/catalog/MEDICAL-FCPS-cleanroom-line-02.jpg",
    nov_med_fcps_port: "assets/catalog/MEDICAL-FCPS-line-portrait.jpg",
    nov_med_fcps_unload: "assets/catalog/MEDICAL-FCPS-cleanroom-unload.jpg",
    nov_med_fpi_draw: "assets/catalog/MEDICAL-FPI-system-drawing.jpg",
    nov_med_fpi1: "assets/catalog/MEDICAL-FPI-line-installed-01.jpg",
    nov_med_fpi2: "assets/catalog/MEDICAL-FPI-line-installed-02.jpg",
    nov_med_basket1: "assets/catalog/MEDICAL-implants-in-basket-01.jpg",
    nov_med_basket2: "assets/catalog/MEDICAL-implants-in-basket-02.jpg",
    nov_med_layout: "assets/catalog/MEDICAL-combined-layout-drawing.jpg",
    nov_med_parts: "assets/catalog/MEDICAL-implant-components.jpg",
    nov_hq: "assets/catalog/NOVATEC-headquarters.jpg",
    /* Huasheng */
    hs_logo: "Huasheng-machine-photos/HUASHENG-logo.png",
    hs_gfour: "Huasheng-machine-photos/GFOUR.jpg",
    hs_md200: "Huasheng-machine-photos/MD200.jpg",
    hs_md500: "Huasheng-machine-photos/MD500.jpg",
    hs_md800: "Huasheng-machine-photos/MD800-PLUS.jpg",
    hs_md1500: "Huasheng-machine-photos/MD1500-drawing.jpg",
    hs_hd500: "Huasheng-machine-photos/HD500.jpg",
    hs_da600pro: "Huasheng-machine-photos/DA600PRO.jpg",
    hs_tc800plus: "Huasheng-machine-photos/TC800PLUS.jpg",
    hs_tc800plus_f: "Huasheng-machine-photos/TC800PLUS-F.jpg",
    hs_wcc800: "Huasheng-machine-photos/WCC800.jpg",
    hs_broach: "Huasheng-machine-photos/Broach.jpg",
    hs_deco_h: "Huasheng-machine-photos/HUASHENG-DECO-H-machine.jpg",
    hs_deco_a: "Huasheng-machine-photos/HUASHENG-DECO-A-machine.jpg",
    hs_deco_b: "Huasheng-machine-photos/HUASHENG-DECO-B-machine.jpg",
    hs_deco_g: "Huasheng-machine-photos/HUASHENG-DECO-G-machine.jpg",
    hs_af: "Huasheng-machine-photos/HUASHENG-AF-machine.jpg",
    hs_opt: "Huasheng-machine-photos/HUASHENG-OPT-machine.jpg",
    hs_pow: "Huasheng-machine-photos/HUASHENG-POW-machine.jpg",
    // Compatibility fallbacks
    hs_pvd: "Huasheng-machine-photos/GFOUR.jpg",
    hs_dlc: "Huasheng-machine-photos/TC800PLUS.jpg",
    hs_diamond: "Huasheng-machine-photos/DA600PRO.jpg",
    hs_mc1000: "Huasheng-machine-photos/HUASHENG-OPT-machine.jpg",
    hs_optical: "Huasheng-machine-photos/HUASHENG-OPT-machine.jpg",
    hs_cvd: "Huasheng-machine-photos/MD1500-drawing.jpg",
    hs_md: "Huasheng-machine-photos/MD500.jpg",
    hs_hipims: "Huasheng-machine-photos/WCC800.jpg",
    hs_tc802: "Huasheng-machine-photos/TC800PLUS.jpg",
    hs_ma1500: "Huasheng-machine-photos/MD800-PLUS.jpg",
    ma800: "Huasheng-machine-photos/MD800-PLUS.jpg",
    turnkey: "Huasheng-machine-photos/MD800-PLUS.jpg",
    cleanline: "assets/catalog/cleanline.jpg",
    lineup: "Huasheng-machine-photos/GFOUR.jpg",
  };
  /* ----------------------------------------------------------------
     Industries
     ---------------------------------------------------------------- */
  const IND = [
    { id: "tools", n: "Cutting and gear cutting tools", d: "Hobs, shaper cutters, inserts, drills and end mills." },
    { id: "jobshop", n: "PVD coating service providers", d: "Coating job shops and in-house coating centres." },
    { id: "dies", n: "Dies and mould manufacturers", d: "Press tools, forging dies, die-casting and plastic moulds." },
    { id: "steel", n: "Steel and metal processing", d: "Commercial heat treaters, steel, alloy and forging plants." },
    { id: "power", n: "Power: wind, solar and thermal", d: "Gearbox parts, turbine blades, shafts and bearings." },
    { id: "oilgas", n: "Oil and gas", d: "Valves, pumps, drilling tools and wear parts." },
    { id: "auto", n: "Automotive", d: "Gears, transmission, engine and EV components." },
    { id: "aero", n: "Aerospace and defence", d: "Turbine parts, brazed assemblies, weapon and vehicle components." },
    { id: "medical", n: "Medical devices and implants", d: "Orthopaedic implants, surgical instruments, cleanroom final cleaning." },
    { id: "semi", n: "Semiconductor and electronics", d: "Chamber parts and precision components." },
    { id: "optics", n: "Optics and eyewear", d: "Lenses and optical components." },
    { id: "watch", n: "Watches, jewellery and decorative", d: "Cases, bands, fittings and hardware finishes." },
  ];

  const IND_COL = {
    tools: ["#FF9A3C", "#E0521B"], jobshop: ["#27C4B5", "#0B8A7E"], dies: ["#7C8CFF", "#4353D6"],
    steel: ["#9AA8B2", "#56636B"], power: ["#FFD34D", "#F29B0C"], oilgas: ["#4A4A4A", "#161616"],
    auto: ["#FF6B6B", "#D62839"], aero: ["#4FB3FF", "#1667C9"], medical: ["#FF7EB3", "#D6336C"],
    semi: ["#B18CFF", "#6F3FD6"], optics: ["#4DE1F0", "#1596B8"], watch: ["#E9C46A", "#B8860B"],
  };

  /* ----------------------------------------------------------------
     Process option mapping for the enquiry form
     ---------------------------------------------------------------- */
  const PROC_OPT = {
    bmi: "Vacuum heat treatment (BMI)",
    novatec: "Ultrasonic cleaning (Novatec)",
    huasheng: "PVD / DLC / diamond coating (Huasheng)",
  };

  /* ----------------------------------------------------------------
     Catalogue data
     ---------------------------------------------------------------- */
  const CATALOG = [
  {
    "id": "bmi",
    "photo": "bmi_line_installed",
    "photoAlt": "Row of furnaces installed at a plant",
    "gallery": [
      [
        "bmi_line_installed",
        "Row of furnaces installed at a plant"
      ],
      [
        "bmi_hot_zone",
        "Hot zone straight on. Striking - good for a feature panel."
      ],
      [
        "bmi_hall",
        "Several furnaces in a hall"
      ],
      [
        "bmi_early_furnace",
        "Early BMI furnace, black and white. Good alongside Since 1947."
      ],
      [
        "bmi_hot_zone_bw",
        "Hot zone and door, black and white"
      ]
    ],
    "name": "BMI",
    "full": "Fours Industriels B.M.I.",
    "country": "France",
    "site": "https://www.bmi-fours.com",
    "intro": "French designer & manufacturer since 1947 and specialist in vacuum for more than 50 years. Vacuum furnaces for hardening, brazing, tempering and thermochemical treatment, designed and built in France.",
    "cats": [
      {
        "id": "gas-quenching",
        "photo": "bmi_horiz_workshop",
        "photoAlt": "Horizontal vacuum furnace in the works",
        "name": "Gas quenching furnaces",
        "sub": "Hardening, brazing and laboratory furnaces",
        "desc": "Vacuum furnaces that heat parts without oxidation and then cool them with high-pressure gas. BMI's patented rotating gas-flow system gives uniform quenching even on dense or complex loads.",
        "url": "https://www.bmi-fours.com/products/#gas-quenching",
        "machines": [
          {
            "id": "b8t",
            "photo": "bmi_door_open_hot_zone",
            "photoAlt": "BMI horizontal vacuum gas quenching furnace with door open",
            "caption": "BMI horizontal vacuum gas quenching furnace (door open, hot zone visible)",
            "gallery": [
              [
                "bmi_door_open_hot_zone",
                "Door open, hot zone visible"
              ],
              [
                "bmi_load_tray",
                "Load tray drawn out of the furnace"
              ],
              [
                "bmi_hot_zone",
                "Hot zone straight on. Striking - good for a feature panel."
              ],
              [
                "b8t",
                "BMI horizontal vacuum gas quenching furnace"
              ]
            ],
            "name": "B8_T vacuum gas quenching furnace",
            "tag": "Horizontal",
            "bmi_desc": "HIGH TEMPERATURE VACUUM FURNACE – Vacuum Hardening & Gas Quenching Furnaces",
            "short": "Front-loading furnace for high-throughput production.",
            "desc": "The B8_T is BMI's horizontal-loading vacuum gas quenching furnace, built for high-throughput production. Parts are heated under vacuum and quenched with gas at 5 to 12 bar, with BMI's patented rotating volute keeping gas flow even through the whole load. It is fully automated for precise, repeatable cycles with clean surfaces and minimal distortion.",
            "features": [
              "Horizontal front loading",
              "Gas quenching at 5 to 12 bar abs",
              "Patented rotating volute for uniform cooling",
              "GRAPHTIL® man-machine interface",
              "Graphite, molybdenum or fibre hot zones"
            ],
            "specs": [
              [
                "Working zone",
                "450 × 450 × 600 mm to 1000 × 1000 × 1500 mm"
              ],
              [
                "Load capacity",
                "200 to 4000 kg"
              ],
              [
                "Maximum temperature",
                "1250 °C to 1600 °C"
              ],
              [
                "Vacuum level",
                "10⁻² mbar, 10⁻⁵ mbar or 10⁻⁶ mbar"
              ],
              [
                "Quench pressure",
                "5 to 12 bar abs"
              ],
              [
                "Hot zone",
                "Graphite, molybdenum or fibre/wool combinations"
              ],
              [
                "Control",
                "GRAPHTIL® man-machine interface"
              ]
            ],
            "models": [
              {
                "model": "B83T",
                "orientation": "Horizontal",
                "load": "200 kg",
                "dimensions": "450 × 450 × 600 mm",
                "temp": "1250°C to 1600°C",
                "vacuum": "5×10⁻² mbar",
                "pressure": "5 bar"
              },
              {
                "model": "B84T",
                "orientation": "Horizontal",
                "load": "600 kg",
                "dimensions": "600 × 600 × 900 mm",
                "temp": "1250°C to 1600°C",
                "vacuum": "5×10⁻² mbar",
                "pressure": "5 bar"
              },
              {
                "model": "B85T",
                "orientation": "Horizontal",
                "load": "1,000 kg",
                "dimensions": "900 × 700 × 1,200 mm",
                "temp": "1250°C to 1600°C",
                "vacuum": "5×10⁻² mbar",
                "pressure": "5 bar"
              },
              {
                "model": "B86T",
                "orientation": "Horizontal",
                "load": "2,000 kg",
                "dimensions": "1,000 × 1,000 × 1,500 mm",
                "temp": "1250°C to 1600°C",
                "vacuum": "5×10⁻² mbar",
                "pressure": "5 bar"
              }
            ],
            "process": [
              "Quenching, hyperquenching",
              "Brazing, Sintering",
              "Tempering, Annealing",
              "Ageing",
              "Stress Relieving",
              "ALLCARB®",
              "Carbonitriding"
            ],
            "thermochemical": "ALLCARB®",
            "options": [
              "Forced convection heating under inert gas pressure 5×10⁻⁶ mbar",
              "12 bar",
              "Low pressure carburizing ALLCARB®",
              "Compliance with aerospace standards: AMS2750E, AMS2769...",
              "Alternative insulations, including full graphite and full metal insulation",
              "Design and supply of peripheral equipment: loader, gas buffer tank, water cooling system, fixtures and baskets..."
            ],
            "url": "https://www.bmi-fours.com/products/vacuum-hardening-furnace/",
            "k": "vacuum hardening quench tool steel dies b83t b84t b85t b86t allcarb",
            "i": [
              "tools",
              "auto",
              "aero"
            ],
            "family": "Vacuum hardening & gas quenching — horizontal",
            "config": "Horizontal",
            "benefits": [
              "Rotating flow cooling",
              "Perfect Quenching uniformity",
              "Versatile furnace: large range of heat treatments available"
            ]
          },
          {
            "id": "vse8t",
            "photo": "bmi_vert_assembly",
            "photoAlt": "BMI vertical vacuum furnace under assembly",
            "caption": "Vertical furnace under assembly",
            "gallery": [
              [
                "bmi_vert_assembly",
                "Vertical furnace under assembly"
              ],
              [
                "bmi_vert_white",
                "Vertical furnace, white"
              ],
              [
                "bmi_vert_orange",
                "Vertical furnace, orange"
              ],
              [
                "vse8t",
                "BMI vertical vacuum furnace"
              ]
            ],
            "name": "VSE8_T vacuum gas quenching furnace",
            "tag": "Vertical",
            "bmi_desc": "HIGH TEMPERATURE VERTICAL VACUUM FURNACE – Vacuum Hardening & Gas Quenching Furnaces",
            "short": "Bottom-loading furnace for tall or delicate parts.",
            "desc": "The VSE8_T is BMI's bottom-loading vertical vacuum gas quenching furnace. Loading from below suits long, tall or delicate components that must be treated standing or hanging to limit distortion. It shares the B8_T's high-pressure gas quenching and patented rotating volute.",
            "features": [
              "Vertical bottom loading",
              "Gas quenching at 5 to 12 bar abs",
              "Patented rotating volute for uniform cooling",
              "GRAPHTIL® man-machine interface",
              "Graphite, molybdenum or fibre hot zones"
            ],
            "specs": [
              [
                "Working zone",
                "Ø 600 × h 600 mm to Ø 1800 × h 1800 mm"
              ],
              [
                "Load capacity",
                "200 to 3000 kg"
              ],
              [
                "Maximum temperature",
                "1250 °C, 1350 °C or 1500 °C"
              ],
              [
                "Vacuum level",
                "10⁻² mbar, 10⁻⁵ mbar or 10⁻⁶ mbar"
              ],
              [
                "Quench pressure",
                "5 to 12 bar abs"
              ],
              [
                "Control",
                "GRAPHTIL® man-machine interface"
              ]
            ],
            "models": [
              {
                "model": "VSE83T",
                "orientation": "Vertical",
                "load": "300 kg",
                "dimensions": "Ø 600 × 600 mm",
                "temp": "1250°C to 1600°C",
                "vacuum": "5×10⁻² mbar",
                "pressure": "5 bar"
              },
              {
                "model": "VSE84T",
                "orientation": "Vertical",
                "load": "800 kg",
                "dimensions": "Ø 900 × 900 mm",
                "temp": "1250°C to 1600°C",
                "vacuum": "5×10⁻² mbar",
                "pressure": "5 bar"
              },
              {
                "model": "VSE84T120",
                "orientation": "Vertical",
                "load": "1,000 kg",
                "dimensions": "Ø 900 × 1,200 mm",
                "temp": "1250°C to 1600°C",
                "vacuum": "5×10⁻² mbar",
                "pressure": "5 bar"
              },
              {
                "model": "VSE84T150",
                "orientation": "Vertical",
                "load": "1,200 kg",
                "dimensions": "Ø 900 × 1,500 mm",
                "temp": "1250°C to 1600°C",
                "vacuum": "5×10⁻² mbar",
                "pressure": "5 bar"
              },
              {
                "model": "VSE85T",
                "orientation": "Vertical",
                "load": "1,300 kg",
                "dimensions": "Ø 1,200 × 1,200 mm",
                "temp": "1250°C to 1600°C",
                "vacuum": "5×10⁻² mbar",
                "pressure": "5 bar"
              },
              {
                "model": "VSE85T150",
                "orientation": "Vertical",
                "load": "1,800 kg",
                "dimensions": "Ø 1,200 × 1,500 mm",
                "temp": "1250°C to 1600°C",
                "vacuum": "5×10⁻² mbar",
                "pressure": "5 bar"
              },
              {
                "model": "VSE86T",
                "orientation": "Vertical",
                "load": "2,000 kg",
                "dimensions": "Ø 1,500 × 1,500 mm",
                "temp": "1250°C to 1600°C",
                "vacuum": "5×10⁻² mbar",
                "pressure": "5 bar"
              },
              {
                "model": "VSE86T200",
                "orientation": "Vertical",
                "load": "3,000 kg",
                "dimensions": "Ø 1,500 × 2,000 mm",
                "temp": "1250°C to 1600°C",
                "vacuum": "5×10⁻² mbar",
                "pressure": "5 bar"
              }
            ],
            "process": [
              "Quenching, hyperquenching",
              "Brazing, Sintering",
              "Tempering, Annealing",
              "Ageing",
              "Stress Relieving",
              "ALLCARB®",
              "Carbonitriding"
            ],
            "thermochemical": "ALLCARB®",
            "options": [
              "Forced convection heating under inert gas pressure 5×10⁻⁶ mbar",
              "12 bar",
              "Low pressure carburizing ALLCARB®",
              "Compliance with aerospace standards: AMS2750E, AMS2769...",
              "Alternative insulations, including full graphite and full metal insulation",
              "Reversible cooling (top-to-bottom / bottom-to-top)",
              "«In pit» design with carousel loader/unloader",
              "Design and supply of peripheral equipment: loader, gas buffer tank, water cooling system, fixtures and baskets..."
            ],
            "url": "https://www.bmi-fours.com/products/vacuum-hardening-furnace/",
            "k": "vacuum hardening long parts shafts vse83t vse84t vse84t120 vse84t150 vse85t vse85t150 vse86t vse86t200 allcarb",
            "i": [
              "aero",
              "auto"
            ],
            "family": "Vacuum hardening & gas quenching — vertical",
            "config": "Vertical",
            "benefits": [
              "Treatment of massive loads and/or elongated parts",
              "Perfect quenching uniformity and low distortion",
              "Versatile furnace: large range of heat treatments available"
            ]
          },
          {
            "id": "brazing",
            "photo": "bmi_large_assembly",
            "photoAlt": "Large furnace being assembled",
            "caption": "Large furnace being assembled",
            "gallery": [
              [
                "bmi_large_assembly",
                "Large furnace being assembled"
              ],
              [
                "bmi_horiz_01",
                "Horizontal furnace, door closed"
              ],
              [
                "bmi_long_horiz",
                "Long horizontal furnace"
              ],
              [
                "bmi_brazing",
                "Furnace with loading trolley"
              ]
            ],
            "name": "Vacuum brazing furnace",
            "bmi_desc": "HIGH TEMPERATURE VACUUM BRAZING FURNACE",
            "short": "Oxide-free brazing of assemblies.",
            "desc": "Vacuum furnace for brazing assemblies in a clean, oxide-free atmosphere, used widely in aerospace and for high-value components where joint quality matters.",
            "features": [
              "Oxide-free brazing under vacuum",
              "Controlled heating and cooling",
              "Suited to nickel and other brazing alloys"
            ],
            "specs": [
              [
                "Configuration",
                "Horizontal front-loading"
              ],
              [
                "Working zone",
                "450 × 450 × 600 mm to 2,500 × 1,500 × 7,000 mm"
              ],
              [
                "Load capacity",
                "200 to 20,000 kg"
              ],
              [
                "Maximum temperature",
                "1250 °C to 1500 °C"
              ],
              [
                "Vacuum level",
                "5 × 10⁻² mbar"
              ],
              [
                "Cooling pressure",
                "1.4 bar abs"
              ],
              [
                "Process",
                "High-temperature vacuum brazing & degassing"
              ],
              [
                "Applications",
                "Aerospace assemblies, heat exchangers, turbine parts, medical devices"
              ]
            ],
            "models": [
              {
                "model": "B53T",
                "orientation": "Horizontal",
                "load": "200 kg",
                "dimensions": "450 × 450 × 600 mm",
                "temp": "1250°C to 1500°C",
                "vacuum": "5×10⁻² mbar",
                "pressure": "1.4 bar"
              },
              {
                "model": "B54T",
                "orientation": "Horizontal",
                "load": "600 kg",
                "dimensions": "600 × 600 × 900 mm",
                "temp": "1250°C to 1500°C",
                "vacuum": "5×10⁻² mbar",
                "pressure": "1.4 bar"
              },
              {
                "model": "B55T",
                "orientation": "Horizontal",
                "load": "1,000 kg",
                "dimensions": "900 × 700 × 1,200 mm",
                "temp": "1250°C to 1500°C",
                "vacuum": "5×10⁻² mbar",
                "pressure": "1.4 bar"
              },
              {
                "model": "B56T",
                "orientation": "Horizontal",
                "load": "1,500 kg",
                "dimensions": "1,000 × 1,000 × 1,500 mm",
                "temp": "1250°C to 1500°C",
                "vacuum": "5×10⁻² mbar",
                "pressure": "1.4 bar"
              },
              {
                "model": "B57T",
                "orientation": "Horizontal",
                "load": "2,000 kg",
                "dimensions": "1,200 × 1,200 × 1,800 mm",
                "temp": "1250°C to 1500°C",
                "vacuum": "5×10⁻² mbar",
                "pressure": "1.4 bar"
              },
              {
                "model": "B59T700",
                "orientation": "Horizontal",
                "load": "20,000 kg",
                "dimensions": "2,500 × 1,500 × 7,000 mm",
                "temp": "1250°C to 1500°C",
                "vacuum": "5×10⁻² mbar",
                "pressure": "1.4 bar"
              }
            ],
            "process": [
              "Brazing",
              "Annealing",
              "Ageing",
              "Sintering, MIM",
              "Boriding",
              "ALLCARB®",
              "Carbonitriding",
              "Stress relieving"
            ],
            "thermochemical": "ALLCARB®",
            "options": [
              "5×10⁻⁶ mbar",
              "Low pressure carburizing ALLCARB®",
              "Compliance with aerospace standards: AMS2750E, AMS2769...",
              "Alternative insulations, including full graphite and full metal insulation",
              "Design and supply of peripheral equipment: loader, gas buffer tank, water cooling system, fixtures and baskets..."
            ],
            "url": "https://www.bmi-fours.com/products/vacuum-brazing-furnace/",
            "k": "brazing assemblies high temperature b53t b54t b55t b56t b57t b59t700 allcarb",
            "i": [
              "aero",
              "medical"
            ],
            "family": "High-temperature vacuum brazing furnace",
            "config": "Horizontal & Vertical (Very Large Furnace)",
            "benefits": [
              "Cost-effective alternative to a quenching furnace",
              "Productivity thanks to reduced cycle times",
              "Reduced investment and operating costs",
              "Very Large Furnace options",
              "Titanium fuselage stress relieving"
            ]
          },
          {
            "id": "lab",
            "photo": "bmi_white_workshop",
            "photoAlt": "Compact vacuum furnace in the works",
            "caption": "Furnace in the works",
            "name": "Compact laboratory furnace",
            "bmi_desc": "HIGH TEMPERATURE COMPACT VACUUM FURNACE (BMICRO) & BFIRST HIGH TEMPERATURE VACUUM FURNACE – Vacuum Hardening & Gas Quenching Furnaces",
            "short": "Small vacuum furnace for R&D and process development.",
            "desc": "A compact vacuum furnace for laboratories, universities and R&D departments, for developing and validating heat-treatment cycles before scaling up to production.",
            "features": [
              "Compact footprint",
              "Vacuum heat treatment at laboratory scale",
              "Process development and testing"
            ],
            "specs": [
              [
                "Configuration",
                "Vertical & Horizontal compact designs"
              ],
              [
                "Working zone",
                "Ø 200 × 300 mm to 250 × 250 × 300 mm"
              ],
              [
                "Load capacity",
                "20 to 50 kg"
              ],
              [
                "Maximum temperature",
                "1250 °C to 1500 °C"
              ],
              [
                "Vacuum level",
                "5 × 10⁻² mbar"
              ],
              [
                "Cooling pressure",
                "5 bar abs"
              ],
              [
                "Process",
                "R&D, prototyping, laboratory heat treatment & brazing"
              ],
              [
                "Applications",
                "Universities, research centres, pilot lines, tool prototyping"
              ]
            ],
            "models": [
              {
                "model": "BMICRO 20/30",
                "orientation": "Vertical",
                "load": "20 kg",
                "dimensions": "Ø 200 × 300 mm",
                "temp": "1250°C to 1500°C",
                "vacuum": "5×10⁻² mbar",
                "pressure": "5 bar"
              },
              {
                "model": "BMICRO 30/45",
                "orientation": "Vertical",
                "load": "50 kg",
                "dimensions": "Ø 300 × 450 mm",
                "temp": "1250°C to 1500°C",
                "vacuum": "5×10⁻² mbar",
                "pressure": "5 bar"
              },
              {
                "model": "BFIRST",
                "orientation": "Horizontal",
                "load": "20 kg",
                "dimensions": "250 × 250 × 300 mm",
                "temp": "1250°C",
                "vacuum": "5×10⁻² mbar",
                "pressure": "5 bar"
              }
            ],
            "process": [
              "Quenching, Gas Quenching, Hyperquenching",
              "Brazing, Sintering",
              "Tempering, Annealing, Bright Annealing",
              "Ageing",
              "Stress Relieving",
              "Special Alloy Degassing",
              "ALLCARB®",
              "Carbonitriding"
            ],
            "thermochemical": "ALLCARB®",
            "options": [
              "Forced convection heating under inert gas pressure 5×10⁻⁶ mbar",
              "10 bar (BFIRST) / 12 bar (BMICRO)",
              "Low pressure carburizing ALLCARB®",
              "Compliance with aerospace standards: AMS2750E, AMS2769...",
              "Alternative insulations, including full graphite and full metal insulation",
              "Design and supply of peripheral equipment: loader, gas buffer tank, water cooling system, fixtures and baskets..."
            ],
            "url": "https://www.bmi-fours.com/products/laboratory-furnace/",
            "k": "lab r&d laboratory bmicro bmicro 20/30 bmicro 30/45 bfirst allcarb",
            "i": [],
            "family": "Compact vacuum furnace (BMICRO) & Entry-level vacuum furnace (BFIRST)",
            "config": "Vertical (BMICRO) / Horizontal (BFIRST)",
            "benefits": [
              "Compact design",
              "Reduced investment and operating costs allowing in-house heat treatment",
              "Versatile furnace: large range of heat treatments available"
            ]
          }
        ]
      },
      {
        "id": "oil-quenching",
        "photo": "bmi_workshops",
        "photoAlt": "Several furnaces in the works",
        "name": "Oil quenching furnaces",
        "sub": "Horizontal and vertical",
        "desc": "Vacuum furnaces with an integrated oil quench for steels that need a faster quench than gas can provide.",
        "url": "https://www.bmi-fours.com/products/#oil-quenching",
        "machines": [
          {
            "id": "oil-horizontal",
            "photo": "bmi_horiz_02",
            "photoAlt": "Horizontal furnace with pump set",
            "caption": "Horizontal furnace with pump set",
            "gallery": [
              [
                "bmi_horiz_02",
                "Horizontal furnace with pump set"
              ],
              [
                "bmi_workshops",
                "Several furnaces in the works"
              ]
            ],
            "tag": "Horizontal",
            "name": "Vacuum oil quenching furnace, horizontal",
            "bmi_desc": "OIL QUENCHING VACUUM FURNACE",
            "short": "Vacuum heating with an integrated oil quench.",
            "desc": "Horizontal vacuum furnace with an integrated oil quench tank, for steels and part sections that need a more severe quench than gas.",
            "features": [
              "Vacuum heating without oxidation",
              "Integrated oil quench",
              "Horizontal loading"
            ],
            "specs": [
              [
                "Configuration",
                "Horizontal single-chamber & dual-chamber / PIT"
              ],
              [
                "Working zone",
                "450 × 400 × 600 mm to 900 × 900 × 1,200 mm"
              ],
              [
                "Load capacity",
                "200 to 1,200 kg"
              ],
              [
                "Maximum temperature",
                "1050 °C to 1250 °C"
              ],
              [
                "Vacuum level",
                "5 × 10⁻² mbar"
              ],
              [
                "Cooling / Quench",
                "Integrated oil quench (with optional 1.2 bar gas quench)"
              ],
              [
                "Process",
                "Vacuum oil quenching, case hardening, carburizing"
              ],
              [
                "Applications",
                "Transmission gears, shafts, high-alloy steel components"
              ]
            ],
            "models": [
              {
                "model": "B53TH",
                "orientation": "Horizontal (Single-chamber)",
                "load": "200 kg",
                "dimensions": "450 × 450 × 600 mm",
                "temp": "1050°C",
                "vacuum": "5×10⁻² mbar",
                "pressure": "—"
              },
              {
                "model": "B54TH",
                "orientation": "Horizontal (Single-chamber)",
                "load": "600 kg",
                "dimensions": "600 × 500 × 900 mm",
                "temp": "1050°C",
                "vacuum": "5×10⁻² mbar",
                "pressure": "—"
              },
              {
                "model": "B55TH",
                "orientation": "Horizontal (Single-chamber)",
                "load": "1,000 kg",
                "dimensions": "900 × 900 × 1,200 mm",
                "temp": "1050°C",
                "vacuum": "5×10⁻² mbar",
                "pressure": "—"
              },
              {
                "model": "B63TH",
                "orientation": "Horizontal (Dual-chamber)",
                "load": "200 kg",
                "dimensions": "450 × 400 × 600 mm",
                "temp": "1250°C",
                "vacuum": "5×10⁻² mbar",
                "pressure": "1.2 bar"
              },
              {
                "model": "B64TH",
                "orientation": "Horizontal (Dual-chamber)",
                "load": "400 kg",
                "dimensions": "600 × 500 × 900 mm",
                "temp": "1250°C",
                "vacuum": "5×10⁻² mbar",
                "pressure": "1.2 bar"
              },
              {
                "model": "B64TH Max",
                "orientation": "Horizontal (Dual-chamber)",
                "load": "800 kg",
                "dimensions": "600 × 600 × 900 mm",
                "temp": "1250°C",
                "vacuum": "5×10⁻² mbar",
                "pressure": "1.2 bar"
              },
              {
                "model": "P164TH",
                "orientation": "Horizontal (PIT Dual-chamber)",
                "load": "800 kg",
                "dimensions": "600 × 600 × 900 mm",
                "temp": "1050°C",
                "vacuum": "5×10⁻² mbar",
                "pressure": "1.2 bar"
              },
              {
                "model": "P165TH",
                "orientation": "Horizontal (PIT Dual-chamber)",
                "load": "1,200 kg",
                "dimensions": "900 × 800 × 1,200 mm",
                "temp": "1050°C",
                "vacuum": "5×10⁻² mbar",
                "pressure": "1.2 bar"
              }
            ],
            "process": [
              "Oil Quenching",
              "ALLCARB® / Carbonitriding",
              "Gas Quenching (6 bar)",
              "Annealing / Tempering"
            ],
            "thermochemical": "ALLCARB®",
            "options": [
              "Forced convection heating under inert gas pressure 5×10⁻⁶ mbar",
              "Gas (6 bar)",
              "Single-chamber economical furnace configuration",
              "Dual-chamber furnace, versatile with oil quenching & gas quenching",
              "PIT_dual-chamber oil quenching furnace for the heat treatment of large loads",
              "Design and supply of peripheral equipment: loader, washing machines, oil temperature control, fixtures and baskets..."
            ],
            "url": "https://www.bmi-fours.com/products/oil-quenching-furnace/",
            "k": "hardening oil b53th b54th b55th b63th b64th p164th p165th allcarb",
            "i": [
              "auto"
            ],
            "family": "Oil quenching vacuum furnace",
            "config": "Horizontal — single-chamber economical furnace, dual-chamber versatile furnace with oil & gas quenching, & PIT dual-chamber for large loads",
            "benefits": [
              "Large range of furnaces suited to commercial heat treaters as well as to in-house productions",
              "Reduced investment & operating costs",
              "Benefits of vacuum vs atmosphere heat treatment: no intragranular corrosion",
              "Quick & stable transfer to the oil bath",
              "Oil bath parameters completely adjustable to suit the parts’ geometry & steel grade",
              "Versatility & flexibility: large range of heat treatments available"
            ]
          },
          {
            "id": "oil-vertical",
            "photo": "bmi_vert_portrait",
            "photoAlt": "Vertical furnace (portrait)",
            "caption": "Vertical furnace (portrait)",
            "gallery": [
              [
                "bmi_vert_portrait",
                "Vertical furnace (portrait)"
              ],
              [
                "bmi_vert_tall",
                "Tall vertical furnace"
              ]
            ],
            "tag": "Vertical",
            "name": "Vacuum oil quenching furnace, vertical",
            "bmi_desc": "OIL QUENCHING VACUUM FURNACE",
            "short": "For long parts quenched hanging.",
            "desc": "Vertical vacuum oil quenching furnace for long parts that must be quenched hanging to limit distortion.",
            "features": [
              "Vertical loading",
              "Integrated oil quench",
              "Reduced distortion on long parts"
            ],
            "specs": [
              [
                "Configuration",
                "Vertical dual-chamber (bottom / pit loading)"
              ],
              [
                "Working zone",
                "Ø 900 × 1,600 mm to Ø 1,500 × 3,000 mm"
              ],
              [
                "Load capacity",
                "1,200 to 2,000 kg"
              ],
              [
                "Maximum temperature",
                "1050 °C"
              ],
              [
                "Vacuum level",
                "5 × 10⁻² mbar"
              ],
              [
                "Cooling pressure",
                "0.9 bar abs (oil & gas quench)"
              ],
              [
                "Process",
                "Vertical oil quenching, hardening for long components"
              ],
              [
                "Applications",
                "Long shafts, broaches, landing gear components, extrusion screws"
              ]
            ],
            "models": [
              {
                "model": "V64TH160",
                "orientation": "Vertical (Dual-chamber)",
                "load": "1,200 kg",
                "dimensions": "Ø 900 × 1,600 mm",
                "temp": "1050°C",
                "vacuum": "5×10⁻² mbar",
                "pressure": "0.9 bar"
              },
              {
                "model": "V64TH200",
                "orientation": "Vertical (Dual-chamber)",
                "load": "1,500 kg",
                "dimensions": "Ø 900 × 2,000 mm",
                "temp": "1050°C",
                "vacuum": "5×10⁻² mbar",
                "pressure": "0.9 bar"
              },
              {
                "model": "V66TH160",
                "orientation": "Vertical (Dual-chamber)",
                "load": "2,000 kg",
                "dimensions": "Ø 1,500 × 1,600 mm",
                "temp": "1050°C",
                "vacuum": "5×10⁻² mbar",
                "pressure": "0.9 bar"
              },
              {
                "model": "V66TH300",
                "orientation": "Vertical (Dual-chamber)",
                "load": "2,000 kg",
                "dimensions": "Ø 1,500 × 3,000 mm",
                "temp": "1050°C",
                "vacuum": "5×10⁻² mbar",
                "pressure": "0.9 bar"
              }
            ],
            "process": [
              "Oil Quenching",
              "ALLCARB® / Carbonitriding",
              "Gas Quenching",
              "Annealing / Tempering"
            ],
            "thermochemical": "ALLCARB®",
            "options": [
              "Forced convection heating under inert gas pressure 5×10⁻⁶ mbar",
              "Gas (0.9 bar)",
              "Vertical dual-chamber furnace dedicated to mass production or long parts",
              "Dedicated vertical hanging fixtures, pit loader, and oil management peripherals"
            ],
            "url": "https://www.bmi-fours.com/products/vertical-oil-quenching-furnace/",
            "k": "hardening long parts oil v64th160 v64th200 v66th160 v66th300 allcarb",
            "i": [
              "auto"
            ],
            "family": "Oil quenching vacuum furnace",
            "config": "Vertical — vertical dual-chamber furnace dedicated to mass production or long parts",
            "benefits": [
              "Large range of furnaces suited to commercial heat treaters as well as to in-house productions",
              "Reduced investment & operating costs",
              "Benefits of vacuum vs atmosphere heat treatment: no intragranular corrosion",
              "Quick & stable transfer to the oil bath",
              "Oil bath parameters completely adjustable to suit the parts’ geometry & steel grade",
              "Versatility & flexibility: large range of heat treatments available"
            ]
          }
        ]
      },
      {
        "id": "low-temperature",
        "photo": "bmi_with_trolley",
        "photoAlt": "Furnace with automatic loading trolley",
        "name": "Low-temperature furnaces",
        "sub": "Tempering and aluminium brazing",
        "desc": "Vacuum furnaces for lower-temperature processes such as tempering after hardening and brazing aluminium assemblies.",
        "url": "https://www.bmi-fours.com/products/#low-temperature",
        "machines": [
          {
            "id": "tempering",
            "photo": "bmi_horiz_door_open",
            "photoAlt": "Horizontal furnace, door open",
            "caption": "Horizontal furnace, door open",
            "gallery": [
              [
                "bmi_horiz_door_open",
                "Horizontal furnace, door open"
              ],
              [
                "bmi_top_view",
                "Furnace from above"
              ]
            ],
            "name": "Vacuum tempering furnace",
            "bmi_desc": "VACUUM PURGE TEMPERING FURNACE",
            "short": "Tempering after hardening.",
            "desc": "Vacuum tempering furnace for tempering hardened parts with clean surfaces and uniform temperature through the load.",
            "features": [
              "Vacuum or protective atmosphere",
              "Uniform load temperature",
              "Clean, bright surfaces"
            ],
            "specs": [
              [
                "Configuration",
                "Horizontal front-loading"
              ],
              [
                "Working zone",
                "450 × 450 × 600 mm to 1,000 × 1,000 × 1,800 mm"
              ],
              [
                "Load capacity",
                "200 to 2,000 kg"
              ],
              [
                "Maximum temperature",
                "750 °C to 900 °C"
              ],
              [
                "Vacuum level",
                "5 × 10⁻² mbar"
              ],
              [
                "Cooling pressure",
                "1.2 bar abs"
              ],
              [
                "Process",
                "Vacuum purge tempering, stress relieving, ageing"
              ],
              [
                "Applications",
                "Tool steels, dies, aerospace structural components"
              ]
            ],
            "models": [
              {
                "model": "B53R",
                "orientation": "Horizontal",
                "load": "200 kg",
                "dimensions": "450 × 450 × 600 mm",
                "temp": "750°C to 900°C",
                "vacuum": "5×10⁻² mbar",
                "pressure": "1.2 bar"
              },
              {
                "model": "B54R",
                "orientation": "Horizontal",
                "load": "600 kg",
                "dimensions": "600 × 600 × 900 mm",
                "temp": "750°C to 900°C",
                "vacuum": "5×10⁻² mbar",
                "pressure": "1.2 bar"
              },
              {
                "model": "B55R",
                "orientation": "Horizontal",
                "load": "1,000 kg",
                "dimensions": "900 × 700 × 1,200 mm",
                "temp": "750°C to 900°C",
                "vacuum": "5×10⁻² mbar",
                "pressure": "1.2 bar"
              },
              {
                "model": "B56R",
                "orientation": "Horizontal",
                "load": "1,500 kg",
                "dimensions": "1,000 × 1,000 × 1,500 mm",
                "temp": "750°C to 900°C",
                "vacuum": "5×10⁻² mbar",
                "pressure": "1.2 bar"
              },
              {
                "model": "B56R180",
                "orientation": "Horizontal",
                "load": "2,000 kg",
                "dimensions": "1,000 × 1,000 × 1,800 mm",
                "temp": "750°C to 900°C",
                "vacuum": "5×10⁻² mbar",
                "pressure": "1.2 bar"
              }
            ],
            "process": [
              "Tempering",
              "(Magnetic) Annealing",
              "Ageing",
              "Stress Relieving",
              "ALLNIT®",
              "Nitrocarburizing",
              "COOL PLUS"
            ],
            "thermochemical": "ALLNIT®, COOL PLUS",
            "options": [
              "Low pressure nitriding ALLNIT®",
              "Sub-zero treatment COOL PLUS",
              "Compliance with aerospace standards: AMS2750E, AMS2769...",
              "Design and supply of peripheral equipment: loader, gas buffer tank, water cooling system, fixtures and baskets…"
            ],
            "url": "https://www.bmi-fours.com/products/tempering-furnace/",
            "k": "tempering b53r b54r b55r b56r b56r180 allnit cool plus",
            "i": [
              "tools",
              "auto"
            ],
            "family": "Vacuum purge tempering furnace",
            "config": "Horizontal — tempering and low temperature treatments",
            "benefits": [
              "Perfect temperature homogeneity",
              "Compact design",
              "Reduced cycle times",
              "Reduced investment and operating costs",
              "Higher profitability than a retort furnace"
            ]
          },
          {
            "id": "alu-brazing",
            "photo": "bmi_white_trolley",
            "photoAlt": "Furnace with loading trolley",
            "caption": "Furnace with loading trolley",
            "name": "Aluminium brazing vacuum furnace",
            "bmi_desc": "VACUUM ALUMINIUM BRAZING FURNACE",
            "short": "For heat exchangers and aluminium assemblies.",
            "desc": "Vacuum furnace for fluxless brazing of aluminium assemblies such as heat exchangers.",
            "features": [
              "Fluxless aluminium brazing",
              "Tight temperature uniformity"
            ],
            "specs": [
              [
                "Configuration",
                "Horizontal front-loading"
              ],
              [
                "Working zone",
                "450 × 450 × 600 mm to 1,000 × 1,000 × 2,500 mm"
              ],
              [
                "Load capacity",
                "150 to 800 kg"
              ],
              [
                "Maximum temperature",
                "700 °C"
              ],
              [
                "Vacuum level",
                "5 × 10⁻² mbar"
              ],
              [
                "Cooling pressure",
                "1.2 bar abs"
              ],
              [
                "Process",
                "Fluxless aluminium vacuum brazing"
              ],
              [
                "Applications",
                "Automotive radiators, aircraft heat exchangers, cold plates"
              ]
            ],
            "models": [
              {
                "model": "BA53",
                "orientation": "Horizontal",
                "load": "150 kg",
                "dimensions": "450 × 450 × 600 mm",
                "temp": "700°C",
                "vacuum": "5×10⁻² mbar",
                "pressure": "1.2 bar"
              },
              {
                "model": "BA54",
                "orientation": "Horizontal",
                "load": "300 kg",
                "dimensions": "600 × 600 × 900 mm",
                "temp": "700°C",
                "vacuum": "5×10⁻² mbar",
                "pressure": "1.2 bar"
              },
              {
                "model": "BA55",
                "orientation": "Horizontal",
                "load": "400 kg",
                "dimensions": "900 × 900 × 1,200 mm",
                "temp": "700°C",
                "vacuum": "5×10⁻² mbar",
                "pressure": "1.2 bar"
              },
              {
                "model": "BA55-200",
                "orientation": "Horizontal",
                "load": "600 kg",
                "dimensions": "900 × 900 × 2,000 mm",
                "temp": "700°C",
                "vacuum": "5×10⁻² mbar",
                "pressure": "1.2 bar"
              },
              {
                "model": "BA56-250",
                "orientation": "Horizontal",
                "load": "800 kg",
                "dimensions": "1,000 × 1,000 × 2,500 mm",
                "temp": "700°C",
                "vacuum": "5×10⁻² mbar",
                "pressure": "1.2 bar"
              }
            ],
            "process": [
              "Annealing",
              "Ageing",
              "Stress relieving",
              "Aluminium brazing",
              "Special alloy degassing"
            ],
            "thermochemical": "Fluxless aluminium brazing",
            "options": [
              "Multi-zone temperature regulation with high-uniformity heating elements",
              "Rapid cooling with inert gas at 1.2 bar abs",
              "Design and supply of peripheral equipment: loader, water cooling system, fixtures and baskets..."
            ],
            "url": "https://www.bmi-fours.com/products/aluminum-brazing-furnace/",
            "k": "heat exchanger brazing aluminium ba53 ba54 ba55 ba55-200 ba56-250",
            "i": [
              "auto",
              "aero"
            ],
            "family": "Vacuum aluminium brazing furnace",
            "config": "Horizontal",
            "benefits": [
              "Reliable and repeatable brazing results",
              "Fully automated operation for optimal process control",
              "Superior joint integrity and surface finish",
              "No flux required, reducing contamination and post-process cleaning"
            ]
          }
        ]
      },
      {
        "id": "thermochemical",
        "photo": "bmi_cooling_unit",
        "photoAlt": "Furnace with cooling unit",
        "name": "Thermochemical treatment furnaces",
        "sub": "Carburizing, nitriding and sub-zero",
        "desc": "Furnaces and BMI's own processes for changing the surface chemistry of steel parts, such as carburizing and nitriding, plus sub-zero treatment.",
        "url": "https://www.bmi-fours.com/products/#process",
        "machines": [
          {
            "id": "allcarb",
            "photo": "bmi_load_tray",
            "photoAlt": "Load tray drawn out of the furnace",
            "caption": "Load tray drawn out of the furnace",
            "name": "ALLCARB® low-pressure carburizing",
            "short": "Case hardening for gears and transmission parts.",
            "desc": "BMI's ALLCARB® low-pressure carburizing process, run in its vacuum furnaces, case-hardens steel parts such as gears and transmission components without intergranular oxidation.",
            "features": [
              "Low-pressure (vacuum) carburizing",
              "No intergranular oxidation",
              "Can be combined with high-pressure gas quenching"
            ],
            "specs": [
              [
                "Process",
                "Low-pressure carburizing (LPC)"
              ],
              [
                "Atmosphere",
                "Vacuum (10⁻⁴ to 10⁻⁶ mbar)"
              ],
              [
                "Temperature",
                "850–1050 °C"
              ],
              [
                "Applications",
                "Gears, transmission parts, tooling"
              ]
            ],
            "process": [
              "ALLCARB® low-pressure carburizing (LPC)",
              "Case hardening of transmission gears, shafts and injectors",
              "High-temperature carburizing (up to 1050 °C)",
              "Carbonitriding"
            ],
            "url": "https://www.bmi-fours.com/products/low-pressure-carburizing/",
            "k": "lpc carburizing gears case hardening",
            "i": [
              "auto"
            ]
          },
          {
            "id": "allnit",
            "photo": "bmi_control_cabinets",
            "photoAlt": "Furnace with its control cabinets",
            "caption": "Furnace with its control cabinets",
            "name": "ALLNIT® low-pressure nitriding",
            "short": "Nitriding for wear and fatigue resistance.",
            "desc": "BMI's ALLNIT® low-pressure nitriding process for improving wear and fatigue resistance of steel parts and tools.",
            "features": [
              "Low-pressure nitriding",
              "Controlled nitrided layer"
            ],
            "specs": [
              [
                "Process",
                "Low-pressure nitriding (LPC)"
              ],
              [
                "Atmosphere",
                "Vacuum (10⁻⁴ to 10⁻⁶ mbar)"
              ],
              [
                "Temperature",
                "500–580 °C"
              ],
              [
                "Applications",
                "Crankshafts, gears, hydraulic rods"
              ]
            ],
            "process": [
              "ALLNIT® low-pressure nitriding (LPN)",
              "Low-pressure nitrocarburizing",
              "Post-oxidation (CORSNIT)",
              "Surface hardening of tooling and precision parts"
            ],
            "url": "https://www.bmi-fours.com/products/low-pressure-nitriding/",
            "k": "nitriding",
            "i": [
              "auto",
              "tools"
            ]
          },
          {
            "id": "plasma-nitriding",
            "photo": "bmi_vert_tall",
            "photoAlt": "Tall vertical furnace",
            "caption": "Tall vertical furnace",
            "name": "Plasma nitriding furnace",
            "tag": "Vertical",
            "bmi_desc": "PLASMA NITRIDING FURNACE",
            "short": "Ion nitriding for tools, dies and engineering parts.",
            "desc": "Plasma (ion) nitriding furnace for tools, dies and engineering components. Delivers precise case depth and surface hardness control with zero white layer or controlled compound layer for dies, moulds, automotive gearing, and precision tools.",
            "features": [
              "Plasma-assisted nitriding",
              "Selective treatment possible"
            ],
            "specs": [
              [
                "Configuration",
                "Vertical bottom-loading"
              ],
              [
                "Load capacity",
                "80 to 1,500 kg"
              ],
              [
                "Useful volume",
                "Ø 500 × 500 mm to Ø 1,050 × 1,500 mm"
              ],
              [
                "Maximum temperature",
                "600 °C"
              ],
              [
                "Vacuum level",
                "5 × 10⁻² mbar"
              ],
              [
                "Gas pressure",
                "0.9 bar abs"
              ],
              [
                "Process",
                "Plasma (ion) nitriding"
              ],
              [
                "Applications",
                "Forming dies, extrusion tools, gears, shafts, moulds"
              ]
            ],
            "models": [
              {
                "model": "VI63",
                "orientation": "Vertical",
                "load": "80 kg",
                "dimensions": "Ø 500 × 500 mm",
                "temp": "600 °C",
                "vacuum": "5×10⁻² mbar",
                "pressure": "0.9 bar"
              },
              {
                "model": "VI64",
                "orientation": "Vertical",
                "load": "400 kg",
                "dimensions": "Ø 600 × 1,000 mm",
                "temp": "600 °C",
                "vacuum": "5×10⁻² mbar",
                "pressure": "0.9 bar"
              },
              {
                "model": "VI65",
                "orientation": "Vertical",
                "load": "1,500 kg",
                "dimensions": "Ø 850 × 1,500 mm",
                "temp": "600 °C",
                "vacuum": "5×10⁻² mbar",
                "pressure": "0.9 bar"
              },
              {
                "model": "VI66",
                "orientation": "Vertical",
                "load": "1,500 kg",
                "dimensions": "Ø 1,050 × 1,500 mm",
                "temp": "600 °C",
                "vacuum": "5×10⁻² mbar",
                "pressure": "0.9 bar"
              }
            ],
            "spec_url": "https://www.bmi-fours.com/products/plasma-nitriding-furnace/",
            "process": [
              "Plasma nitriding / Ion nitriding",
              "Plasma nitrocarburizing",
              "Plasma post-oxidation",
              "Selective surface hardening"
            ],
            "thermochemical": "Plasma nitriding / Ion nitriding",
            "options": [
              "Second sole",
              "Auxiliary heating & optical pyrometry temperature control",
              "Automated gas mixing and pulse plasma generator control"
            ],
            "url": "https://www.bmi-fours.com/products/plasma-nitriding-furnace/",
            "k": "ion nitriding dies moulds plasma vi63 vi64 vi65 vi66",
            "i": [
              "tools",
              "auto"
            ],
            "family": "Plasma nitriding furnace",
            "config": "Vertical",
            "benefits": [
              "Cold-wall design for excellent thermal control",
              "Ideal for complex or sensitive parts requiring localized hardening",
              "Fully automated operation for cycle consistency and reproducibility",
              "Clean process, free from ammonia emissions",
              "Good alternative to low-pressure nitriding (ALLNIT®) for certain industrial requirements"
            ]
          },
          {
            "id": "cool-plus",
            "photo": "bmi_cooling_unit",
            "photoAlt": "Furnace with cooling unit",
            "caption": "Furnace with cooling unit",
            "name": "COOL PLUS sub-zero treatment furnace",
            "short": "Cryogenic treatment of hardened steels.",
            "desc": "The COOL PLUS vacuum furnace performs sub-zero cryogenic treatment, stabilising hardened steels by converting retained austenite.",
            "features": [
              "Sub-zero cryogenic treatment",
              "Dimensional stabilisation"
            ],
            "process": [
              "Deep cryogenic treatment",
              "Retained austenite transformation",
              "Dimensional stabilisation of gauges, bearings and tooling",
              "Wear resistance enhancement"
            ],
            "url": "https://www.bmi-fours.com/products/sub-zero/",
            "k": "cryogenic deep cryo sub-zero",
            "i": [
              "tools",
              "aero"
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "novatec",
    "photo": "nov_plt1400_overview",
    "photoAlt": "Novatec PLURITANK 1400 multi-stage ultrasonic cleaning line",
    "gallery": [
      [
        "nov_plt1400_overview",
        "Novatec PLURITANK 1400 multi-stage ultrasonic cleaning line"
      ],
      [
        "nov_2crd400",
        "2CRD-400 one-chamber precision vacuum cleaning system"
      ],
      [
        "nov_med_fcps1",
        "FCS / FCPS final cleaning and passivation cleanroom line"
      ],
      [
        "nov_hq",
        "Novatec S.r.l. headquarters, San Martino di Lupari (Padova), Italy"
      ],
      [
        "nov_2crd800_saw1",
        "2CRD-800 loaded with circular saw blades"
      ]
    ],
    "name": "Novatec",
    "full": "Novatec S.r.l., San Martino di Lupari (Padova)",
    "country": "Italy",
    "site": "https://novatec.it/en",
    "intro": "Industrial ultrasonic cleaning systems engineered, built and tested in Italy since 1993.",
    "strengths": [
      "Customised solutions built to each customer's specification.",
      "Ultrasonic technology and automation produced in house in Italy, not bought in.",
      "Long-term stability.",
      "Price to performance ratio."
    ],
    "cats": [
      {
        "id": "pluritank",
        "family": "PLURITANK",
        "photo": "nov_plt1400_overview",
        "photoAlt": "Novatec PLURITANK 1400 multi-stage ultrasonic cleaning line",
        "name": "Multi-tank ultrasonic cleaning",
        "sub": "Modular lines up to 14 process stations",
        "desc": "Modular multi-tank ultrasonic cleaning lines configured from separate process modules — ultrasonic immersion or spray cleaning, cascade rinsing, hot air and vacuum drying. Up to 14 process stations with automatic basket handling from 10 kg to 300 kg and above.",
        "url": "https://novatec.it/en/multi-chamber-ultrasonic-cleaning",
        "machines": [
          {
            "id": "pluritank-line",
            "lineLayout": {
              "title": "PLURITANK 1400 — Multi-Stage Process Line Layout",
              "reference": "Novatec GA drawing 5298.3.0-26CO",
              "dimensions": [
                [
                  "Internal tank",
                  "700 × 1200 × 1650 h mm (approx. 1386 litres)"
                ],
                [
                  "External basket",
                  "540 × 1090 × 1540 h mm"
                ],
                [
                  "Line footprint",
                  "19500 × 7000 mm"
                ],
                [
                  "Width options",
                  "Supplied in two overall widths. The tank size is the same in both."
                ]
              ],
              "stations": [
                {
                  "pos": "C",
                  "station": "Motorised loading conveyor",
                  "notes": "Infeed load station"
                },
                {
                  "pos": "1",
                  "station": "Ultrasonic cleaning tank with basket agitation",
                  "notes": "Primary ultrasonic wash"
                },
                {
                  "pos": "2",
                  "station": "Rinsing tank with turbulent flow",
                  "notes": "Turbulent flow rinse"
                },
                {
                  "pos": "3",
                  "station": "Ultrasonic cleaning tank with basket agitation",
                  "notes": "Secondary ultrasonic wash"
                },
                {
                  "pos": "4",
                  "station": "Rinsing tank with turbulent flow",
                  "notes": "Intermediate cascade rinse"
                },
                {
                  "pos": "5",
                  "station": "Ultrasonic cleaning tank with basket agitation",
                  "notes": "Final precision ultrasonic wash"
                },
                {
                  "pos": "6",
                  "station": "Rinsing tank with turbulent flow",
                  "notes": "Cascade flow rinse"
                },
                {
                  "pos": "7",
                  "station": "DI water ultrasonic rinsing tank",
                  "notes": "Demineralised ultrasonic rinse"
                },
                {
                  "pos": "8 – 9",
                  "station": "DI water rinsing tank with slow drain system",
                  "notes": "Cascades back to tank 7"
                },
                {
                  "pos": "10 – 14",
                  "station": "Hot air tunnel dryer",
                  "notes": "5 drying positions"
                },
                {
                  "pos": "S",
                  "station": "Motorised unloading conveyor",
                  "notes": "Outfeed unload station"
                }
              ],
              "ancillary": [
                "General control board",
                "WT1 buffer tank, filter holder and pump",
                "Two pump and filter groups",
                "DEMI 100/4 demineralised water plant",
                "Exhaust fan",
                "CS1 loading and unloading operators zone"
              ]
            },
            "photo": "nov_plt1400_overview",
            "photoAlt": "Novatec PLURITANK 1400 multi-stage ultrasonic cleaning line",
            "gallery": [
              [
                "nov_plt1400_overview",
                "PLURITANK 1400 complete line from above"
              ],
              [
                "nov_plt1400_loading",
                "PLURITANK 1400 line with motorised loading conveyor"
              ],
              [
                "nov_plt_gantry",
                "Inside the line - transport gantry over the tanks"
              ],
              [
                "nov_plt_tanks",
                "Tank row with basket agitation"
              ],
              [
                "nov_plt_panel",
                "Line with main electrical control cabinet"
              ],
              [
                "nov_plt_fume",
                "Line with overhead fume extraction"
              ],
              [
                "nov_plt_dryer",
                "Line with dryer and DI water plant"
              ],
              [
                "nov_plt_tank_detail",
                "Single tank and basket, close up"
              ]
            ],
            "name": "PLURITANK ultrasonic cleaning line",
            "short": "Serial and large-format parts, up to 14 process stations.",
            "desc": "PLURITANK is Novatec's modular multi-chamber ultrasonic cleaning line. Process stations for ultrasonic cleaning, rinsing and drying are combined to suit the part, the contamination and the required cleanliness, with up to 14 process stations per line.",
            "features": [
              "Modular, up to 14 process stations, with room for future hardware and software upgrades",
              "Configurable tank capacity from 50 to 1,500 litres",
              "Multi-frequency ultrasonic groups",
              "User-friendly HMI with multiple programs",
              "Data exchange and traceability",
              "AISI 304/316 stainless construction",
              "Factory acceptance test with your sample parts"
            ],
            "specs": [
              [
                "Configuration",
                "Configurable modular multi-tank ultrasonic cleaning line"
              ],
              [
                "Tank volume range",
                "50 to 1,500 litres per tank (built to order based on part size)"
              ],
              [
                "Process stations",
                "Up to 14 process stations per line"
              ],
              [
                "Ultrasonic technology",
                "Multi-frequency ultrasonic groups (in-house Italian design & manufacture)"
              ],
              [
                "Available process stages",
                "Ultrasonic immersion, spray wash, multi-stage cascade DI water rinsing, passivation, hot air & vacuum drying"
              ],
              [
                "Basket load capacity",
                "10 kg to 300+ kg per basket with automatic robot transporter"
              ],
              [
                "Material construction",
                "AISI 304 / AISI 316 stainless steel throughout"
              ],
              [
                "Control system",
                "Siemens PLC with touchscreen HMI, multi-program recipe management & data traceability"
              ]
            ],
            "process": [
              "Ultrasonic immersion cleaning",
              "Cascade DI water rinsing",
              "Passivation and corrosion protection",
              "Hot air and vacuum drying"
            ],
            "url": "https://novatec.it/en/multi-chamber-ultrasonic-cleaning",
            "k": "ultrasonic cleaning washing rinsing drying pluritank pvd pre-treatment sterilisation",
            "i": [
              "auto",
              "medical",
              "optics",
              "watch",
              "semi",
              "tools"
            ],
            "family": "PLURITANK",
            "family_desc": "Modular multi-tank ultrasonic cleaning line. Built from separate process modules - ultrasonic immersion or spray cleaning, cascade rinsing, hot air and vacuum drying - so the line is configured to the job. Configurable tank volume from 50 to 1,500 litres with up to 14 process stations. Stainless steel throughout, PLC and HMI control, automatic basket handling from 10 kg to 300 kg and above.",
            "typical_use": "Cleaning tools and components before PVD coating and other vacuum treatments. Final cleaning before sterilisation and packing."
          },
          {
            "id": "pre-pvd",
            "photo": "nov_plt_studio",
            "photoAlt": "Novatec PLURITANK pre-treatment line for PVD coating",
            "caption": "Novatec PLURITANK pre-treatment line for PVD coating",
            "gallery": [
              [
                "nov_plt_studio",
                "Novatec PLURITANK pre-treatment line for PVD coating"
              ],
              [
                "nov_plt_guarded",
                "PLURITANK line with safety guarding"
              ],
              [
                "nov_plt_gantry",
                "Transport gantry over the tanks"
              ]
            ],
            "name": "PLURITANK pre-treatment line for PVD coating",
            "short": "Surface preparation before PVD, CVD and DLC.",
            "desc": "A PLURITANK line configured to prepare tools and components for coating. Ultrasonic cleaning followed by rinsing and drying removes residues so the coating bonds reliably, batch after batch.",
            "features": [
              "Reproducible pre-coating cleanliness",
              "Rinsing and drying cycles",
              "Matched to coating plant capacity"
            ],
            "process": [
              "Pre-PVD cleaning",
              "Pre-CVD cleaning",
              "Pre-DLC cleaning",
              "Tool surface preparation"
            ],
            "url": "https://novatec.it/en/multi-chamber-ultrasonic-cleaning",
            "k": "pvd pre-treatment coating cleaning pluritank tools inserts",
            "i": [
              "tools"
            ],
            "configNote": "Each PLURITANK line is built to the tank volume the job requires. The number in the PLURITANK name (50, 65, 80, 110, 140, 210, 1400, 1500 …) is the tank volume in litres — not a catalogue model number. Novatec do not publish a fixed model list; instead they configure the line from 50 to 1,500 litres per tank, with up to 14 process stations, to match the part size, basket weight and throughput. Contact Greets for a technical proposal tailored to your application.",
            "family": "PLURITANK",
            "family_desc": "Modular multi-tank ultrasonic cleaning line. Built from separate process modules - ultrasonic immersion or spray cleaning, cascade rinsing, hot air and vacuum drying - so the line is configured to the job. Up to 14 process stations. Stainless steel throughout, PLC and HMI control, automatic basket handling from 10 kg to 300 kg and above.",
            "typical_use": "Cleaning tools and components before PVD coating and other vacuum treatments. Final cleaning before sterilisation and packing."
          },
          {
            "id": "cleanroom",
            "photo": "nov_plt_clean_01",
            "photoAlt": "Novatec cleaning line for cleanroom use",
            "caption": "Novatec cleaning line for cleanroom use",
            "gallery": [
              [
                "nov_plt_clean_01",
                "Novatec cleaning line for cleanroom use"
              ],
              [
                "nov_plt_clean_02",
                "Cleanroom line, opposite angle"
              ],
              [
                "nov_plt_clean_03",
                "Line in a white cleanroom, operator in shot"
              ],
              [
                "nov_plt_enclosed",
                "Fully enclosed line with gantry"
              ]
            ],
            "name": "Cleanroom cleaning line",
            "short": "Low-particle cleaning for semiconductor and medical.",
            "desc": "Precision cleaning for semiconductor hardware, vacuum-chamber parts and medical devices. Cleanroom class 7 design is available, with ultrapure water rinsing and documentation for validated processes.",
            "features": [
              "Cleanroom class 7 design available",
              "Ultrapure water rinsing",
              "IQ/OQ/PQ documentation for medical"
            ],
            "process": [
              "Precision cleaning",
              "Ultrapure rinsing",
              "Cleanroom drying",
              "Sterilisation prep"
            ],
            "url": "https://novatec.it/en/products",
            "k": "cleanroom semiconductor medical implants sterilisation",
            "i": [
              "semi",
              "medical"
            ],
            "configNote": "Each PLURITANK line is built to the tank volume the job requires. The number in the PLURITANK name is the tank volume in litres — not a catalogue model number. Novatec configure the line from 50 to 1,500 litres per tank, with up to 14 process stations, to match the part size, basket weight and throughput. Contact Greets for a technical proposal tailored to your application.",
            "family": "PLURITANK",
            "family_desc": "Modular multi-tank ultrasonic cleaning line. Built from separate process modules - ultrasonic immersion or spray cleaning, cascade rinsing, hot air and vacuum drying - so the line is configured to the job. Up to 14 process stations. Stainless steel throughout, PLC and HMI control, automatic basket handling from 10 kg to 300 kg and above.",
            "typical_use": "Cleaning tools and components before PVD coating and other vacuum treatments. Final cleaning before sterilisation and packing."
          }
        ],
        "applications": [
          {
            "id": "ipc",
            "name": "IPC in-process cleaning",
            "short": "Cleaning implants between production steps.",
            "desc": "In-process cleaning (IPC) removes oils, chips, particles and polishing pastes from implants between grinding, blasting and polishing steps. Supplied as an in-line PLURITANK system for higher volumes and a wider mix of parts, or as a one-chamber 2CRD vacuum system for blind holes and complex shapes.",
            "url": "https://novatec.it/en/products",
            "k": "ipc in-process cleaning implants orthopaedic pluritank manufacturing steps",
            "i": ["medical"]
          },
          {
            "id": "fcps",
            "name": "FCS / FCPS final cleaning and passivation",
            "short": "Final cleaning, with optional passivation, into the cleanroom.",
            "desc": "The FCS (final cleaning system) or FCPS (combined final cleaning and passivation system) is an automatic PLURITANK line that unloads through an air lock straight into the cleanroom, leaving parts free of contaminants, stains and organic or biological residues.",
            "url": "https://novatec.it/en/products",
            "k": "fcs fcps final cleaning passivation cleanroom air lock implants sterilisation",
            "i": ["medical"]
          },
          {
            "id": "fpi",
            "name": "FPI fluorescent penetrant inspection line",
            "short": "Automated cleaning and crack detection.",
            "desc": "An automatic PLURITANK line that combines surface cleaning, preparation and fluorescent penetrant inspection in one fully automated process. Used to validate medical implants during manufacturing by revealing flaws, cracks and signs of fatigue.",
            "url": "https://novatec.it/en/products",
            "k": "fpi fluorescent penetrant inspection ndt cracks fatigue flaws implants pluritank",
            "i": ["medical", "aero"]
          }
        ]
      },
      {
        "id": "2crd",
        "family": "2CRD",
        "photo": "nov_2crd400",
        "photoAlt": "Novatec 2CRD single-chamber precision cleaning system",
        "name": "2CRD Series Single-chamber precision cleaning under vacuum",
        "sub": "2CRD one-chamber systems with rotating basket, 8 sizes",
        "desc": "One-chamber system for precision cleaning under vacuum. Cleaning, rinsing and drying all happen in a single chamber, fed from three filtered buffer tanks. Available static, or with rotation and tilting.",
        "url": "https://novatec.it/en/2crd-vacuum-cleaning",
        "machines": [
          {
            "id": "2crd-system",
            "photo": "nov_2crd400",
            "photoAlt": "Novatec 2CRD400 single-chamber precision cleaning system",
            "gallery": [
              [
                "nov_2crd400",
                "2CRD-400 one-chamber precision vacuum cleaning system"
              ],
              [
                "nov_2crd100",
                "2CRD-100 precision vacuum cleaning system"
              ],
              [
                "nov_2crd100r",
                "2CRD-100-ROT (rotation and tilting)"
              ],
              [
                "nov_2crd200",
                "2CRD-200 precision vacuum cleaning system"
              ],
              [
                "nov_2crd200_load",
                "2CRD-200 being loaded with cutting tools"
              ],
              [
                "nov_2crd800",
                "2CRD-800 large-capacity vacuum cleaning system"
              ],
              [
                "nov_2crd800_saw1",
                "2CRD-800 loaded with circular saw blades"
              ],
              [
                "nov_2crd800_saw2",
                "2CRD-800 loaded with saw blades, close up"
              ],
              [
                "nov_2crd800_trolley",
                "2CRD-800 loading trolley with tooling"
              ],
              [
                "nov_2crd_chamber",
                "Inside the vacuum chamber, basket in place"
              ],
              [
                "nov_2crd_baskets",
                "Baskets and tool holders"
              ]
            ],
            "name": "2CRD Series Single-chamber precision cleaning under vacuum",
            "short": "Cleaning and vacuum drying in one chamber.",
            "desc": "The 2CRD is Novatec's aqueous one-chamber vacuum cleaning system. It combines ultrasonic frequencies with vacuum processes and flexible cleaning, rinsing and drying steps in one compact chamber with a rotating basket. It is especially suited to blind and tapped holes, porous-coated surfaces and complex parts carrying polishing pastes and oils, including medical implants between production steps. Standard range: 2CRD-100, 200, 400 and 800, each static or -ROT with rotation and tilting.",
            "features": [
              "Single chamber: clean, rinse and vacuum dry",
              "Ultrasonic cleaning combined with vacuum processes",
              "Cleans blind and tapped holes and porous-coated surfaces",
              "Rotating basket",
              "Compact footprint, confirmed 4 sizes (8 standard variants)"
            ],
            "process": [
              "Blind and tapped holes",
              "Porous coated surfaces",
              "Complex geometries",
              "Removing polishing pastes and oils",
              "Vacuum drying"
            ],
            "models": [
              {
                "family": "2CRD",
                "model": "2CRD-100",
                "chamber": "300 × 400 × 300 h",
                "size": "1800 × 1800 × 2100 h",
                "load": "On request",
                "notes": "Static",
                "source": "Novatec 2CRD brochure"
              },
              {
                "family": "2CRD",
                "model": "2CRD-100-ROT",
                "chamber": "300 × 400 × 300 h",
                "size": "1800 × 1800 × 2100 h",
                "load": "On request",
                "notes": "Rotation and tilting",
                "source": "Novatec website"
              },
              {
                "family": "2CRD",
                "model": "2CRD-200",
                "chamber": "400 × 600 × 430 h",
                "size": "2600 × 2000 × 2100 h",
                "load": "On request",
                "notes": "Static",
                "source": "Novatec 2CRD brochure"
              },
              {
                "family": "2CRD",
                "model": "2CRD-200-ROT",
                "chamber": "400 × 600 × 430 h",
                "size": "2600 × 2000 × 2100 h",
                "load": "On request",
                "notes": "Rotation and tilting",
                "source": "Novatec website"
              },
              {
                "family": "2CRD",
                "model": "2CRD-400",
                "chamber": "On request",
                "size": "approx. 3200 × 2000 × 2100 h",
                "load": "On request",
                "notes": "Static",
                "source": "Novatec GA drawing 2CRD400"
              },
              {
                "family": "2CRD",
                "model": "2CRD-400-ROT",
                "chamber": "On request",
                "size": "approx. 3200 × 2000 × 2100 h",
                "load": "On request",
                "notes": "Rotation and tilting",
                "source": "Novatec website"
              },
              {
                "family": "2CRD",
                "model": "2CRD-800",
                "chamber": "600 × 1050 × 630 h",
                "size": "3500 × 2000 × 2200 h",
                "load": "On request",
                "notes": "Static",
                "source": "Novatec 2CRD brochure"
              },
              {
                "family": "2CRD",
                "model": "2CRD-800-ROT",
                "chamber": "600 × 1050 × 630 h",
                "size": "3500 × 2000 × 2200 h",
                "load": "On request",
                "notes": "Rotation and tilting",
                "source": "Novatec website"
              }
            ],
            "url": "https://novatec.it/en/2crd-vacuum-cleaning",
            "k": "precision cleaning vacuum drying blind holes 2crd 2crd100 2crd200 2crd400 2crd800 rot rotation tilting implants polishing paste buffer tanks",
            "i": [
              "medical",
              "semi",
              "watch",
              "auto"
            ],
            "family": "2CRD",
            "family_desc": "One-chamber system for precision cleaning under vacuum. Cleaning, rinsing and drying all happen in a single chamber, fed from three filtered buffer tanks. Available static, or with rotation and tilting.",
            "typical_use": "Blind and tapped holes, porous coated surfaces and complex geometries. Removing polishing pastes and oils."
          }
        ],
        "applications": [
          {
            "id": "ipc",
            "name": "IPC in-process cleaning",
            "short": "Cleaning implants between production steps.",
            "desc": "In-process cleaning (IPC) removes oils, chips, particles and polishing pastes from implants between grinding, blasting and polishing steps. The 2CRD one-chamber vacuum system is especially suited to blind holes, porous-coated surfaces and complex implant shapes.",
            "url": "https://novatec.it/en/products",
            "k": "ipc in-process cleaning implants 2crd vacuum blind holes manufacturing steps",
            "i": ["medical"]
          }
        ]
      },
      {
        "id": "medical-implants",
        "family": "Medical implant processing",
        "photo": "nov_med_parts",
        "photoAlt": "Medical implant components after precision cleaning",
        "name": "Medical implant processing",
        "sub": "PFC, QVS/BRC, EP & turnkey plants",
        "desc": "Complete cleaning and surface treatment systems for orthopaedic and medical implant manufacturing. Built to the customer's specification, from spray cleaning with cleanroom air lock to electropolishing, quality verification, and full turnkey lines. IPC, FCS/FCPS and FPI are listed as applications under PLURITANK and 2CRD above.",
        "url": "https://novatec.it/en/products",
        "machines": [
          {
            "id": "ipc",
            "family": "IPC in-process cleaning",
            "photo": "nov_med_ipc_2crd",
            "photoAlt": "Novatec IPC in-process cleaning system",
            "caption": "IPC in-process cleaning system",
            "gallery": [
              [
                "nov_med_ipc_2crd",
                "IPC in-process cleaning - 2CRD400 one-chamber vacuum system"
              ],
              [
                "nov_med_basket1",
                "Implants loaded in a basket"
              ]
            ],
            "name": "IPC in-process cleaning",
            "short": "Cleaning implants between production steps.",
            "desc": "In-process cleaning (IPC) removes oils, chips, particles and polishing pastes from implants between grinding, blasting and polishing steps. Supplied as an in-line PLURITANK system for higher volumes and a wider mix of parts, or as a one-chamber 2CRD vacuum system for blind holes and complex shapes.",
            "features": [
              "Cleaning implants between production steps",
              "Removes oils, chips, particles and polishing pastes",
              "Available as in-line PLURITANK system or 2CRD vacuum system",
              "Handles blind holes, porous coatings and complex shapes"
            ],
            "process": [
              "In-process cleaning",
              "Removing polishing pastes and oils",
              "Blind and tapped holes",
              "Porous coated surfaces"
            ],
            "url": "https://novatec.it/en/products",
            "k": "ipc in-process cleaning implants orthopaedic pluritank manufacturing steps",
            "i": [
              "medical"
            ],
            "family_desc": "In-process cleaning removes oils, chips, particles and polishing pastes from implants between production steps.",
            "typical_use": "Cleaning implants between grinding, blasting and polishing steps."
          },
          {
            "id": "fcps",
            "family": "FCS / FCPS",
            "photo": "nov_med_fcps1",
            "photoAlt": "FCS / FCPS final cleaning and passivation system",
            "caption": "FCS / FCPS final cleaning and passivation, cleanroom",
            "gallery": [
              [
                "nov_med_fcps1",
                "FCS / FCPS final cleaning and passivation, cleanroom"
              ],
              [
                "nov_med_fcps_unload",
                "Unload air lock on the cleanroom side"
              ]
            ],
            "name": "FCS / FCPS final cleaning and passivation",
            "short": "Final cleaning, with optional passivation, into the cleanroom.",
            "desc": "The FCS (final cleaning system) or FCPS (combined final cleaning and passivation system) is an automatic PLURITANK line that unloads through an air lock straight into the cleanroom, leaving parts free of contaminants, stains and organic or biological residues.",
            "features": [
              "Final cleaning and passivation into cleanroom",
              "Unloads through an air lock straight into cleanroom",
              "Free of contaminants, stains, organic and biological residues",
              "Automated basket handling and validation data logging"
            ],
            "process": [
              "Final cleaning",
              "Passivation",
              "Cleanroom air lock unload",
              "Medical implant packaging prep"
            ],
            "url": "https://novatec.it/en/products",
            "k": "fcs fcps final cleaning passivation cleanroom air lock implants sterilisation",
            "i": [
              "medical"
            ],
            "family_desc": "Automatic PLURITANK line unloading through an air lock straight into the cleanroom.",
            "typical_use": "Final cleaning and passivation of orthopaedic implants before cleanroom packaging."
          },
          {
            "id": "fpi",
            "family": "FPI",
            "photo": "nov_med_fpi1",
            "photoAlt": "FPI fluorescent penetrant inspection line installed",
            "caption": "FPI fluorescent penetrant inspection line installed",
            "gallery": [
              [
                "nov_med_fpi1",
                "FPI fluorescent penetrant inspection line installed"
              ]
            ],
            "name": "FPI fluorescent penetrant inspection line",
            "short": "Automated cleaning and crack detection.",
            "desc": "An automatic PLURITANK line that combines surface cleaning, preparation and fluorescent penetrant inspection in one fully automated process. Used to validate medical implants during manufacturing by revealing flaws, cracks and signs of fatigue.",
            "features": [
              "Automated cleaning and crack detection",
              "Combines surface cleaning, prep and fluorescent penetrant inspection",
              "Reveals flaws, micro-cracks and fatigue signs",
              "Fully automated process for medical implants & aerospace"
            ],
            "process": [
              "Fluorescent penetrant inspection",
              "Non-destructive testing (NDT)",
              "Crack and flaw detection",
              "Pre-inspection surface cleaning"
            ],
            "url": "https://novatec.it/en/products",
            "k": "fpi fluorescent penetrant inspection ndt cracks fatigue flaws implants pluritank",
            "i": [
              "medical",
              "aero"
            ],
            "family_desc": "Automatic line combining surface cleaning, preparation and fluorescent penetrant inspection.",
            "typical_use": "Flaw and crack detection on medical implants and aerospace parts."
          },
          {
            "id": "qvs-brc",
            "family": "QVS / BRC",
            "photo": "nov_med_layout",
            "photoAlt": "Novatec combined medical line layout showing QVS and BRC",
            "caption": "Novatec combined medical line layout showing QVS and BRC",
            "gallery": [
              [
                "nov_med_layout",
                "Novatec combined medical line layout showing QVS and BRC"
              ],
              [
                "nov_med_basket1",
                "Implants loaded in a basket"
              ],
              [
                "nov_med_fcps_unload",
                "Unload air lock on the cleanroom side"
              ]
            ],
            "name": "QVS / BRC quality verification & basket return conveyor",
            "tag": "Automation",
            "short": "Quality verification stations and basket return air lock conveyor.",
            "desc": "Quality Verification Stations (QVS) combined with Basket Return Conveyor (BRC) air locks. These specialised transfer, inspection, and air lock modules link individual cleaning, passivation, and cleanroom packaging stations into a seamless, contamination-free automated medical implant production loop.",
            "features": [
              "QVS: Quality verification stations",
              "BRC: Basket return air lock conveyor",
              "The modules that link a combined medical line together",
              "Part of a full automatic medical implant line",
              "Automated barcode/RFID tracking and data exchange"
            ],
            "process": [
              "Full automatic medical implant lines",
              "Quality verification",
              "Cleanroom basket return conveyor"
            ],
            "url": "https://novatec.it/en/products",
            "k": "qvs brc quality verification basket return air lock conveyor medical implant line",
            "i": [
              "medical"
            ],
            "family_desc": "Quality verification stations, and basket return air lock conveyor. The modules that link a combined medical line together.",
            "typical_use": "Part of a full automatic medical implant line."
          },
          {
            "id": "ep",
            "family": "Electropolishing (EP)",
            "photo": "nov_plt_compact",
            "photoAlt": "Novatec PLURITANK electropolishing line",
            "gallery": [
              [
                "nov_med_basket2",
                "Implants in basket, close up"
              ]
            ],
            "name": "Electropolishing line (EP)",
            "tag": "PLURITANK EP",
            "short": "Electropolishing line built on PLURITANK platform.",
            "desc": "The Novatec Electropolishing (EP) line is a multi-stage automated treatment line built on the PLURITANK platform. It incorporates dedicated acid electropolishing baths, chemical neutralisation, cascade recovery rinse tanks, and hot-air drying to deliver mirror-smooth, passivated finishes on stainless steel and titanium medical implants.",
            "features": [
              "Electropolishing line built on the PLURITANK platform",
              "Adds dedicated electropolish tank plus neutralisation and recovery rinsing",
              "Multi-stage cascade DI water rinsing and drying",
              "Delivers burr-free, passivated, micro-smooth implant surfaces"
            ],
            "process": [
              "Stainless steel medical implants",
              "Titanium medical implants",
              "Electropolishing",
              "Neutralisation & recovery rinsing"
            ],
            "url": "https://novatec.it/en/products",
            "k": "electropolishing ep pluritank stainless titanium medical implants neutralisation",
            "i": [
              "medical"
            ],
            "family_desc": "An electropolishing line built on the PLURITANK platform, adding an electropolish tank plus neutralisation and recovery rinsing.",
            "typical_use": "Stainless steel and titanium medical implants."
          },
          {
            "id": "combined",
            "family": "Combined medical lines",
            "photo": "nov_med_layout",
            "photoAlt": "Combined medical line layout - IPC, QVS, FCPS, PFC, BRC, air locks",
            "caption": "Combined medical line layout - IPC, QVS, FCPS, PFC, BRC, air locks",
            "gallery": [
              [
                "nov_med_layout",
                "Combined medical line layout - IPC, QVS, FCPS, PFC, BRC, air locks"
              ],
              [
                "nov_med_fcps1",
                "FCS / FCPS final cleaning and passivation, cleanroom"
              ],
              [
                "nov_med_fpi1",
                "FPI fluorescent penetrant inspection line installed"
              ],
              [
                "nov_med_ipc_2crd",
                "IPC in-process cleaning - 2CRD400 one-chamber vacuum system"
              ],
              [
                "nov_med_basket1",
                "Implants loaded in a basket"
              ],
              [
                "nov_med_basket2",
                "Implants in basket, close up"
              ],
              [
                "nov_med_parts",
                "Medical implant components"
              ]
            ],
            "name": "Combined turnkey implant lines",
            "tag": "All-in project",
            "short": "Complete, automated implant cleaning plant.",
            "desc": "For larger projects Novatec designs the whole cleaning area to the customer's URS, linking the individual systems with conveyors and full automatic management. A typical line includes automatic basket loading with scanners and RFID, IPC one-chamber vacuum systems, quality verification stations, a combined final cleaning and passivation system, spray cleaning with an unload air lock, and a basket return conveyor, all with data exchange for traceability.",
            "features": [
              "Automatic basket loading station with scanners and RFID",
              "IPC one-chamber vacuum systems",
              "QVS quality verification stations",
              "FCPS final cleaning and passivation with air lock to cleanroom",
              "PFC spray cleaning system with unload air lock",
              "BRC basket return air-lock conveyor",
              "Full automatic management and data exchange for traceability"
            ],
            "process": [
              "In-process cleaning",
              "Final cleaning and passivation",
              "Quality verification",
              "Cleanroom transfer"
            ],
            "url": "https://novatec.it/en/products",
            "k": "custom turnkey combined implants rfid qvs pfc brc cleanroom fcs fcps",
            "i": [
              "medical"
            ],
            "family_desc": "Full automatic turnkey medical implant cleaning plants built to customer User Requirement Specification, integrating basket loading, IPC, QVS, FCPS, PFC, and BRC with cleanroom air locks.",
            "typical_use": "Turnkey automated plants for orthopaedic & medical implant manufacturing."
          }
        ]
      },
      {
        "id": "components",
        "family": "Ultrasonic components",
        "photo": "nov_plt1400_gen",
        "photoAlt": "Novatec PLURITANK 1400 ultrasonic generator rack and filtration skids",
        "name": "Ultrasonic components",
        "sub": "Generators, transducers and PLT 60V",
        "desc": "Generators and transducers, including the PLT 60V two-chamber pressure-cycle unit. Multi-frequency ultrasonic groups.",
        "url": "https://novatec.it/en/ultrasonic-components",
        "machines": [
          {
            "id": "generators",
            "photo": "nov_plt1400_gen",
            "photoAlt": "PLURITANK 1400 generator rack and filtration skids",
            "caption": "PLURITANK 1400 generator rack and filtration skids",
            "gallery": [
              [
                "nov_plt1400_gen",
                "PLURITANK 1400 generator rack and filtration skids"
              ],
              [
                "nov_tanks_gen",
                "Bench ultrasonic tanks with separate generators"
              ]
            ],
            "name": "Ultrasonic generators and transducers",
            "short": "For building or upgrading cleaning tanks.",
            "desc": "Ultrasonic generators and transducers for building new cleaning tanks or upgrading existing ones.",
            "features": [
              "Generators and transducers",
              "For new tanks or retrofits"
            ],
            "process": [
              "Ultrasonic cleaning",
              "Tank retrofit and upgrade",
              "Multi-frequency ultrasound"
            ],
            "url": "https://novatec.it/en/ultrasonic-components",
            "k": "generators transducers ultrasonic components multi-frequency",
            "i": [],
            "family": "Ultrasonic components",
            "family_desc": "Generators and transducers, including the PLT 60V two-chamber pressure-cycle unit. Multi-frequency ultrasonic groups.",
            "typical_use": "Supplied with the lines, or separately."
          },
          {
            "id": "plt60v",
            "photo": "nov_plt_compact",
            "photoAlt": "Novatec PLT 60V pressure-cycle cleaning unit",
            "name": "PLT 60V pressure-cycle unit",
            "short": "Pressure-change cleaning for internal channels.",
            "desc": "The PLT 60V uses pressure cycling to clean internal channels and cavities that ultrasound alone struggles to reach.",
            "features": [
              "Pressure-cycle cleaning",
              "Reaches internal channels and cavities"
            ],
            "process": [
              "Pressure-change cleaning",
              "Internal channel flushing",
              "Deep cavity cleaning"
            ],
            "models": [
              {
                "family": "PLURITANK",
                "model": "PLT 60V",
                "chamber": "60 L",
                "size": "On request",
                "load": "On request",
                "notes": "Two-chamber pressure-cycle unit, listed under Components",
                "source": "Novatec website"
              }
            ],
            "url": "https://novatec.it/en/ultrasonic-components",
            "k": "plt60v pressure cleaning internal channels two-chamber",
            "i": [
              "auto",
              "medical"
            ],
            "family": "Ultrasonic components",
            "family_desc": "Generators and transducers, including the PLT 60V two-chamber pressure-cycle unit. Multi-frequency ultrasonic groups.",
            "typical_use": "Supplied with the lines, or separately."
          }
        ]
      }
    ]
  },
  {
    "id": "huasheng",
    "photo": "hs_gfour",
    "photoAlt": "Huasheng GFOUR hybrid coating machine",
    "gallery": [
      [
        "hs_gfour",
        "GFOUR 4th-generation hybrid coating machine"
      ],
      [
        "hs_md800",
        "MD800 PLUS arc coating machine"
      ],
      [
        "hs_da600pro",
        "DA600PRO hot filament CVD diamond coating machine"
      ],
      [
        "hs_tc800plus",
        "TC800PLUS ta-C diamond-like carbon coating machine"
      ],
      [
        "hs_deco_h",
        "DECO H multi-arc + HiPIMS decorative coating system"
      ]
    ],
    "name": "Huasheng",
    "full": "Guangdong Huasheng Nanotechnology Co., Ltd.",
    "country": "China",
    "site": "https://www.hscoat.com",
    "intro": "PVD arc, HiPIMS, hybrid, ta-C DLC and HFCVD diamond coating equipment, plus complete turnkey coating plants.",
    "cats": [
      {
        "id": "pvd",
        "photo": "hs_gfour",
        "photoAlt": "Huasheng PVD coating machines",
        "name": "PVD coating equipment",
        "sub": "Arc, HiPIMS, hybrid and broach systems",
        "desc": "Physical vapour deposition systems for hard, wear-resistant coatings on cutting tools, moulds and precision components.",
        "url": "https://www.hscoat.com/pvd-coating-equipment/",
        "machines": [
          {
            "id": "gfour",
            "series": "GFOUR",
            "photo": "hs_gfour",
            "photoAlt": "Huasheng GFOUR hybrid coating machine",
            "name": "GFOUR 4th-generation hybrid coating machine",
            "tag": "Hybrid PVD",
            "short": "4th-gen hybrid: 4 targets, controllable plasma, square wave.",
            "desc": "The GFOUR is Huasheng's 4th-generation hybrid coating machine featuring four independent target stations, controllable plasma density, and adjustable square-wave pulse bias. It allows simultaneous or sequential deposition of multi-layer, gradient, and nanocomposite coating architectures for high-end cutting tools and demanding mechanical components.",
            "features": [
              "Smooth, droplet-free surface",
              "Excellent adhesion",
              "2 µm/h deposition",
              "Thick coatings up to 30 µm"
            ],
            "specs": [
              [
                "Coating technology",
                "4th-generation hybrid coating (4 targets)"
              ],
              [
                "Chamber volume",
                "0.76 m³"
              ],
              [
                "Effective coating area",
                "Φ500 × 400 mm"
              ],
              [
                "Max. working temperature",
                "650 °C"
              ],
              [
                "Equipment size (L×W×H)",
                "4850 × 1600 × 2400 mm"
              ],
              [
                "Capacity",
                "7 trees (8,400 APMT1135 inserts / 2,520 round tools)"
              ],
              [
                "Max. load",
                "300 kg (Spindle Ø130 mm)"
              ],
              [
                "Process time",
                "AlTiN 6–8 h"
              ],
              [
                "Typical applications",
                "Indexable inserts, small cutting tools, applications needing thick coatings without re-sharpening."
              ]
            ],
            "process": [
              "Indexable inserts",
              "Small cutting tools",
              "Thick coatings (0.5–30 µm)",
              "AlTiN, AlCrN, TiSiN"
            ],
            "models": [
              {
                "model": "GFOUR",
                "tech": "4th-generation hybrid coating",
                "area": "Φ500 × 400 mm",
                "temp": "650 °C",
                "load": "7 trees (8,400 inserts / 2,520 tools, 300 kg, Spindle Ø130)",
                "size": "4850 × 1600 × 2400 mm",
                "time": "AlTiN 6–8 h"
              }
            ],
            "url": "https://www.hscoat.com/pvd-coating-equipment/",
            "k": "gfour hybrid pvd thick coatings inserts drills cutting tools 4th generation",
            "i": [
              "tools",
              "auto",
              "dies"
            ],
            "series_desc": "4th-generation hybrid coating platform with four targets, controllable plasma, adjustable square wave and ionisation rate. Coating thickness 0.5-30 µm.",
            "typical_applications": "Indexable inserts, small cutting tools, applications needing thick coatings without re-sharpening."
          },
          {
            "id": "md200",
            "series": "MD",
            "photo": "hs_md200",
            "photoAlt": "Huasheng MD200 arc coating machine",
            "name": "MD200 arc coating machine",
            "tag": "Arc ion plating",
            "short": "Compact arc coater for small-batch and regrinding shops.",
            "desc": "The MD200 is Huasheng's compact arc coating machine engineered for small-batch tool manufacturing, R&D trials, and fast-turnaround tool regrinding shops. Utilising lateral etching and advanced multi-arc ion plating, it delivers industrial-grade TiAlN and AlCrN coatings on cutting tools with minimal power consumption and a compact footprint.",
            "features": [
              "High deposition rate",
              "High ionisation rate",
              "Ultra-high impact resistance",
              "Fully automatic",
              "MD800 PLUS and MD1500 are the only machines in the range that take hobbing tools (D80 x L150)"
            ],
            "specs": [
              [
                "Coating technology",
                "Arc ion plating (4 arc sources)"
              ],
              [
                "Chamber volume",
                "0.5 m³"
              ],
              [
                "Effective coating area",
                "Φ310 × 400 mm"
              ],
              [
                "Max. working temperature",
                "500 °C"
              ],
              [
                "Equipment size (L×W×H)",
                "3400 × 2000 × 2500 mm"
              ],
              [
                "Capacity",
                "3 trees (3,600 APMT1135 inserts / 1,000 round tools)"
              ],
              [
                "Max. load",
                "200 kg (Spindle Ø130 mm)"
              ],
              [
                "Process time",
                "AlTiN 6–8 h"
              ],
              [
                "Typical applications",
                "Inserts, end mills, drills, gear cutting tools, and turnkey coating plants."
              ]
            ],
            "process": [
              "TiAlN",
              "AlCrN",
              "TiN",
              "TiCN",
              "Inserts, end mills, drills"
            ],
            "models": [
              {
                "model": "MD200",
                "tech": "Arc ion plating (4 arc sources)",
                "area": "Φ310 × 400 mm",
                "temp": "500 °C",
                "load": "3 trees (3,600 inserts / 1,000 tools, 200 kg, Spindle Ø130)",
                "size": "3400 × 2000 × 2500 mm",
                "time": "AlTiN 6–8 h"
              },
              {
                "model": "MD500",
                "tech": "Arc ion plating (6 arc sources)",
                "area": "Φ410 × 400 mm",
                "temp": "600 °C",
                "load": "5 trees (6,000 inserts / 1,800 tools, 300 kg, Spindle Ø130)",
                "size": "3400 × 2150 × 2500 mm",
                "time": "AlTiN 6–8 h"
              },
              {
                "model": "MD800 PLUS",
                "tech": "Arc ion plating (8 arc sources)",
                "area": "Φ650 × 400 mm",
                "temp": "600 °C",
                "load": "10 trees (12,000 inserts / 3,600 tools / 30 hobs, 500 kg, Spindle Ø130)",
                "size": "3750 × 2400 × 2500 mm",
                "time": "AlTiN 6–8 h"
              },
              {
                "model": "MD1500",
                "tech": "Arc ion plating (16 arc sources, vertical)",
                "area": "Φ720 × 900 mm",
                "temp": "600 °C",
                "load": "12 trees (28,000 inserts / 5,300 tools / 72 hobs, 1,000 kg, Spindle Ø130)",
                "size": "4860 × 2300 × 2660 mm",
                "time": "AlTiN 6–8 h"
              }
            ],
            "url": "https://www.hscoat.com/aip-coating-equipment/",
            "k": "md200 arc aip pvd tialn alcrn inserts drills",
            "i": [
              "tools"
            ],
            "series_desc": "Arc ion plating range for cutting tool production, using Huasheng's lateral etching and multi arc ion plating. Four sizes from MD200 up to MD1500.",
            "typical_applications": "Inserts, end mills, drills. MD800 PLUS sits at the centre of the turnkey coating plant. MD1500 is the production machine for gear cutting tools - 72 hobbing tools and 1000 kg per batch."
          },
          {
            "id": "md500",
            "series": "MD",
            "photo": "hs_md500",
            "photoAlt": "Huasheng MD500 arc coating machine",
            "name": "MD500 arc coating machine",
            "tag": "Arc ion plating",
            "short": "Mid-size arc coater for serial cutting-tool production.",
            "desc": "The MD500 is Huasheng's mid-size arc coating machine designed for flexible medium-volume cutting tool and mould production. It incorporates Huasheng's proprietary lateral etching technology and multi-arc sources to coat drills, milling cutters, and inserts with outstanding uniformity and adhesion.",
            "features": [
              "High deposition rate",
              "High ionisation rate",
              "Ultra-high impact resistance",
              "Fully automatic",
              "MD800 PLUS and MD1500 are the only machines in the range that take hobbing tools (D80 x L150)"
            ],
            "specs": [
              [
                "Coating technology",
                "Arc ion plating (6 arc sources)"
              ],
              [
                "Chamber volume",
                "0.7 m³"
              ],
              [
                "Effective coating area",
                "Φ410 × 400 mm"
              ],
              [
                "Max. working temperature",
                "600 °C"
              ],
              [
                "Equipment size (L×W×H)",
                "3400 × 2150 × 2500 mm"
              ],
              [
                "Capacity",
                "5 trees (6,000 APMT1135 inserts / 1,800 round tools)"
              ],
              [
                "Max. load",
                "300 kg (Spindle Ø130 mm)"
              ],
              [
                "Process time",
                "AlTiN 6–8 h"
              ],
              [
                "Typical applications",
                "Inserts, end mills, drills, gear cutting tools, and turnkey coating plants."
              ]
            ],
            "process": [
              "TiAlN",
              "AlCrN",
              "AlTiSiN",
              "CrN",
              "Inserts, end mills, drills"
            ],
            "models": [
              {
                "model": "MD200",
                "tech": "Arc ion plating (4 arc sources)",
                "area": "Φ310 × 400 mm",
                "temp": "500 °C",
                "load": "3 trees (3,600 inserts / 1,000 tools, 200 kg, Spindle Ø130)",
                "size": "3400 × 2000 × 2500 mm",
                "time": "AlTiN 6–8 h"
              },
              {
                "model": "MD500",
                "tech": "Arc ion plating (6 arc sources)",
                "area": "Φ410 × 400 mm",
                "temp": "600 °C",
                "load": "5 trees (6,000 inserts / 1,800 tools, 300 kg, Spindle Ø130)",
                "size": "3400 × 2150 × 2500 mm",
                "time": "AlTiN 6–8 h"
              },
              {
                "model": "MD800 PLUS",
                "tech": "Arc ion plating (8 arc sources)",
                "area": "Φ650 × 400 mm",
                "temp": "600 °C",
                "load": "10 trees (12,000 inserts / 3,600 tools / 30 hobs, 500 kg, Spindle Ø130)",
                "size": "3750 × 2400 × 2500 mm",
                "time": "AlTiN 6–8 h"
              },
              {
                "model": "MD1500",
                "tech": "Arc ion plating (16 arc sources, vertical)",
                "area": "Φ720 × 900 mm",
                "temp": "600 °C",
                "load": "12 trees (28,000 inserts / 5,300 tools / 72 hobs, 1,000 kg, Spindle Ø130)",
                "size": "4860 × 2300 × 2660 mm",
                "time": "AlTiN 6–8 h"
              }
            ],
            "url": "https://www.hscoat.com/aip-coating-equipment/",
            "k": "md500 arc aip pvd inserts end mills cutting tools",
            "i": [
              "tools",
              "dies"
            ],
            "series_desc": "Arc ion plating range for cutting tool production, using Huasheng's lateral etching and multi arc ion plating. Four sizes from MD200 up to MD1500.",
            "typical_applications": "Inserts, end mills, drills. MD800 PLUS sits at the centre of the turnkey coating plant. MD1500 is the production machine for gear cutting tools - 72 hobbing tools and 1000 kg per batch."
          },
          {
            "id": "md800",
            "series": "MD",
            "name": "MD800 arc coating machine",
            "tag": "Arc coating",
            "photo": "hs_md800",
            "photoAlt": "Huasheng MD800 PLUS arc coating machine",
            "gallery": [
              [
                "hs_md800",
                "Huasheng MD800 PLUS arc coating machine"
              ],
              [
                "hs_md500",
                "Huasheng MD500 arc coating machine"
              ]
            ],
            "short": "High-rate arc coater for tool coating production.",
            "desc": "The MD800 PLUS is the arc coating machine at the heart of Huasheng's turnkey tool-coating plant. Low-voltage, high-current arc discharge evaporates and ionises the target material, which is deposited on the tools under an electric field, giving a high deposition rate and strong coating adhesion. Configured for high-throughput production of inserts, end mills, drills, and hob cutters.",
            "features": [
              "High deposition rate",
              "High ionisation rate",
              "Ultra-high impact resistance",
              "Fully automatic",
              "MD800 PLUS and MD1500 are the only machines in the range that take hobbing tools (D80 x L150)"
            ],
            "specs": [
              [
                "Technology",
                "Arc coating"
              ],
              [
                "Capacity",
                "12,000 pcs per batch (APMT1135 inserts)"
              ],
              [
                "Operation",
                "Fully automatic"
              ]
            ],
            "process": [
              "TiAlN, AlCrN and similar hard coatings",
              "Inserts, drills and end mills",
              "Hobbing tools (D80 × L150)",
              "AlTiSiN and custom nano-composite coatings"
            ],
            "models": [
              {
                "model": "MD200",
                "tech": "Arc ion plating (4 arc sources)",
                "area": "Φ310 × 400 mm",
                "temp": "500 °C",
                "load": "3 trees (3,600 inserts / 1,000 tools, 200 kg, Spindle Ø130)",
                "size": "3400 × 2000 × 2500 mm",
                "time": "AlTiN 6–8 h"
              },
              {
                "model": "MD500",
                "tech": "Arc ion plating (6 arc sources)",
                "area": "Φ410 × 400 mm",
                "temp": "600 °C",
                "load": "5 trees (6,000 inserts / 1,800 tools, 300 kg, Spindle Ø130)",
                "size": "3400 × 2150 × 2500 mm",
                "time": "AlTiN 6–8 h"
              },
              {
                "model": "MD800 PLUS",
                "tech": "Arc ion plating (8 arc sources)",
                "area": "Φ650 × 400 mm",
                "temp": "600 °C",
                "load": "10 trees (12,000 inserts / 3,600 tools / 30 hobs, 500 kg, Spindle Ø130)",
                "size": "3750 × 2400 × 2500 mm",
                "time": "AlTiN 6–8 h"
              },
              {
                "model": "MD1500",
                "tech": "Arc ion plating (16 arc sources, vertical)",
                "area": "Φ720 × 900 mm",
                "temp": "600 °C",
                "load": "12 trees (28,000 inserts / 5,300 tools / 72 hobs, 1,000 kg, Spindle Ø130)",
                "size": "4860 × 2300 × 2660 mm",
                "time": "AlTiN 6–8 h"
              }
            ],
            "url": "https://www.hscoat.com/aip-coating-equipment/",
            "k": "pvd arc aip tialn inserts drills end mills md800 md800 plus turnkey hobs",
            "i": [
              "tools",
              "auto",
              "jobshop"
            ],
            "series_desc": "Arc ion plating range for cutting tool production, using Huasheng's lateral etching and multi arc ion plating. Four sizes from MD200 up to MD1500.",
            "typical_applications": "Inserts, end mills, drills. MD800 PLUS sits at the centre of the turnkey coating plant. MD1500 is the production machine for gear cutting tools - 72 hobbing tools and 1000 kg per batch."
          },
          {
            "id": "md1500",
            "series": "MD",
            "photo": "hs_md1500",
            "photoAlt": "Line drawing of Huasheng MD1500 layout",
            "caption": "MD1500 high-capacity vertical arc coating machine - manufacturer line drawing",
            "gallery": [
              [
                "hs_md1500",
                "Line drawing of Huasheng MD1500 machine layout"
              ]
            ],
            "name": "MD1500 high-capacity vertical arc coating machine",
            "tag": "Heavy production",
            "short": "Production machine for gear cutting tools: 72 hobs and 1000 kg per batch.",
            "desc": "The MD1500 is Huasheng's heavy-duty, high-capacity vertical arc coating machine engineered for high-volume manufacturing and large-format cutting tools, including long broaches and gear hobs up to 72 pieces or 1,000 kg per batch. Built with heavy-load rotary fixtures and high-power multi-arc cathode arrays.",
            "features": [
              "High deposition rate",
              "High ionisation rate",
              "Ultra-high impact resistance",
              "Fully automatic",
              "MD800 PLUS and MD1500 are the only machines in the range that take hobbing tools (D80 x L150)"
            ],
            "specs": [
              [
                "Machine",
                ""
              ],
              [
                "Coating technology",
                "Arc ion plating (16 arc sources, vertical)"
              ],
              [
                "Chamber volume",
                "1.8 m³"
              ],
              [
                "Effective coating area",
                "Φ720 × 900 mm"
              ],
              [
                "Max. working temperature",
                "600 °C"
              ],
              [
                "Equipment size (L×W×H)",
                "4860 × 2300 × 2660 mm"
              ],
              [
                "Capacity",
                "12 trees (28,000 inserts / 5,300 tools / 72 hobs)"
              ],
              [
                "Max. load",
                "1,000 kg (Spindle Ø130 mm)"
              ],
              [
                "Process time",
                "AlTiN 6–8 h"
              ],
              [
                "Typical applications",
                "Inserts, end mills, drills, gear cutting tools, and turnkey coating plants."
              ],
              [
                "MD1500 utilities",
                ""
              ],
              [
                "Power supply",
                "3 x 380/220 V (3L+N+PE), 3 x 300 A, 170 kW, 50/60 Hz"
              ],
              [
                "Average consumption",
                "About 120 kW/h, roughly 6 hours per batch"
              ],
              [
                "Cooling water",
                "5-5.5 bar at 22-24 °C. Max heat discharge about 90 kW, flow 120 L/min, ullage 10 L per batch."
              ],
              [
                "Compressed air",
                "5 - 6.5 bar"
              ],
              [
                "Process gas",
                "Ar / N2 / H2 at 1.0 - 1.2 bar, minimum purity 99.992%"
              ],
              [
                "Gas per batch",
                "Ar 350 L, N2 1100 L, ordinary N2 1000 L"
              ],
              [
                "Room required",
                "8100 x 5500 mm, keeping an 800 mm safety passage around the machine"
              ],
              [
                "Arc source power supply",
                "HDP400: 73 V, 12 kW, 0.1-500 Hz, duty cycle 5-95%, 50-300 A"
              ]
            ],
            "site_reqs_title": "MD1500 utilities",
            "site_reqs": [
              [
                "Power supply",
                "3 x 380/220 V (3L+N+PE), 3 x 300 A, 170 kW, 50/60 Hz"
              ],
              [
                "Average consumption",
                "About 120 kW/h, roughly 6 hours per batch"
              ],
              [
                "Cooling water",
                "5-5.5 bar at 22-24 °C. Max heat discharge about 90 kW, flow 120 L/min, ullage 10 L per batch."
              ],
              [
                "Compressed air",
                "5 - 6.5 bar"
              ],
              [
                "Process gas",
                "Ar / N2 / H2 at 1.0 - 1.2 bar, minimum purity 99.992%"
              ],
              [
                "Gas per batch",
                "Ar 350 L, N2 1100 L, ordinary N2 1000 L"
              ],
              [
                "Room required",
                "8100 x 5500 mm, keeping an 800 mm safety passage around the machine"
              ],
              [
                "Arc source power supply",
                "HDP400: 73 V, 12 kW, 0.1-500 Hz, duty cycle 5-95%, 50-300 A"
              ]
            ],
            "process": [
              "Gear cutting tools",
              "72 hobbing tools per batch",
              "High-volume inserts & end mills",
              "AlTiN, AlCrN, TiN"
            ],
            "models": [
              {
                "model": "MD200",
                "tech": "Arc ion plating (4 arc sources)",
                "area": "Φ310 × 400 mm",
                "temp": "500 °C",
                "load": "3 trees (3,600 inserts / 1,000 tools, 200 kg, Spindle Ø130)",
                "size": "3400 × 2000 × 2500 mm",
                "time": "AlTiN 6–8 h"
              },
              {
                "model": "MD500",
                "tech": "Arc ion plating (6 arc sources)",
                "area": "Φ410 × 400 mm",
                "temp": "600 °C",
                "load": "5 trees (6,000 inserts / 1,800 tools, 300 kg, Spindle Ø130)",
                "size": "3400 × 2150 × 2500 mm",
                "time": "AlTiN 6–8 h"
              },
              {
                "model": "MD800 PLUS",
                "tech": "Arc ion plating (8 arc sources)",
                "area": "Φ650 × 400 mm",
                "temp": "600 °C",
                "load": "10 trees (12,000 inserts / 3,600 tools / 30 hobs, 500 kg, Spindle Ø130)",
                "size": "3750 × 2400 × 2500 mm",
                "time": "AlTiN 6–8 h"
              },
              {
                "model": "MD1500",
                "tech": "Arc ion plating (16 arc sources, vertical)",
                "area": "Φ720 × 900 mm",
                "temp": "600 °C",
                "load": "12 trees (28,000 inserts / 5,300 tools / 72 hobs, 1,000 kg, Spindle Ø130)",
                "size": "4860 × 2300 × 2660 mm",
                "time": "AlTiN 6–8 h"
              }
            ],
            "url": "https://www.hscoat.com/aip-coating-equipment/",
            "k": "md1500 arc vertical hobs gear cutting tools 1000kg high capacity",
            "i": [
              "tools",
              "auto",
              "jobshop"
            ],
            "series_desc": "Arc ion plating range for cutting tool production, using Huasheng's lateral etching and multi arc ion plating. Four sizes from MD200 up to MD1500.",
            "typical_applications": "Inserts, end mills, drills. MD800 PLUS sits at the centre of the turnkey coating plant. MD1500 is the production machine for gear cutting tools - 72 hobbing tools and 1000 kg per batch."
          },
          {
            "id": "hd500",
            "series": "HD",
            "photo": "hs_hd500",
            "photoAlt": "Huasheng HD500 hybrid arc + HiPIMS coating machine",
            "caption": "Huasheng HD500 hybrid arc + HiPIMS coating machine",
            "name": "HD500 hybrid arc + HiPIMS coating machine",
            "tag": "Hybrid HiPIMS",
            "short": "30% performance gain over arc alone, for stainless steel & titanium.",
            "desc": "The HD500 is Huasheng's hybrid arc + HiPIMS coating machine, combining high-ionisation HiPIMS sputtering with high-rate arc deposition in a single chamber. Engineered for precision cutting tools machining difficult materials such as stainless steel, titanium, and aerospace superalloys, delivering up to 30% longer tool life over standard arc coatings.",
            "features": [
              "30% performance gain over arc alone",
              "Ultra-low friction",
              "Optically graded surface finish",
              "HiPIMS surface layer over an arc matrix"
            ],
            "specs": [
              [
                "Coating technology",
                "Hybrid arc + magnetron (HiPIMS)"
              ],
              [
                "Chamber volume",
                "0.7 m³"
              ],
              [
                "Effective coating area",
                "Φ410 × 400 mm"
              ],
              [
                "Max. working temperature",
                "700 °C"
              ],
              [
                "Equipment size (L×W×H)",
                "3400 × 1600 × 2600 mm"
              ],
              [
                "Capacity",
                "5 trees (6,000 APMT1135 inserts / 1,800 round tools)"
              ],
              [
                "Max. load",
                "200 kg (Spindle Ø130 mm)"
              ],
              [
                "Process time",
                "AlTiN 6–8 h"
              ],
              [
                "Typical applications",
                "Hard-to-machine materials such as stainless steel and titanium alloys."
              ]
            ],
            "process": [
              "Stainless steel machining tools",
              "Titanium alloys",
              "Hard-to-machine materials",
              "HiPIMS + Arc hybrid"
            ],
            "models": [
              {
                "model": "HD500",
                "tech": "Hybrid arc + magnetron (HiPIMS)",
                "area": "Φ410 × 400 mm",
                "temp": "700 °C",
                "load": "5 trees (6,000 inserts / 1,800 tools, 200 kg, Spindle Ø130)",
                "size": "3400 × 1600 × 2600 mm",
                "time": "AlTiN 6–8 h"
              },
              {
                "model": "HD800",
                "tech": "Hybrid arc + magnetron (HiPIMS)",
                "area": "Φ650 × 400 mm",
                "temp": "600 °C",
                "load": "10 trees (12,000 inserts / 3,600 tools, 300 kg, Spindle Ø130)",
                "size": "3750 × 2400 × 2500 mm",
                "time": "AlTiN 6–8 h"
              }
            ],
            "url": "https://www.hscoat.com/hybrid-coating-equipment/",
            "k": "hd500 hybrid hipims arc low friction titanium stainless",
            "i": [
              "tools",
              "aero",
              "auto"
            ],
            "series_desc": "Hybrid platform combining high-ionisation sputtering with arc processes.",
            "typical_applications": "Hard-to-machine materials such as stainless steel and titanium alloys."
          },
          {
            "id": "hd800",
            "series": "HD",
            "photo": "hs_hd500",
            "photoAlt": "Huasheng HD series hybrid arc + HiPIMS coating platform (HD500 configuration shown)",
            "caption": "Huasheng HD series hybrid arc + HiPIMS coating platform (HD500 configuration shown)",
            "name": "HD800 hybrid arc + HiPIMS coating machine",
            "tag": "Hybrid HiPIMS",
            "short": "High-capacity hybrid platform for hard-to-machine materials.",
            "desc": "The HD800 is Huasheng's high-capacity hybrid coating platform combining high-power impulse magnetron sputtering (HiPIMS) and multi-arc discharge. It produces ultra-dense, droplet-free, ultra-smooth coatings on high-performance cutting tools, forming dies, and precision mechanical components with excellent thermal stability.",
            "features": [
              "30% performance gain over arc alone",
              "Ultra-low friction",
              "Optically graded surface finish",
              "HiPIMS surface layer over an arc matrix"
            ],
            "specs": [
              [
                "Coating technology",
                "Hybrid arc + magnetron (HiPIMS)"
              ],
              [
                "Chamber volume",
                "1.0 m³"
              ],
              [
                "Effective coating area",
                "Φ650 × 400 mm"
              ],
              [
                "Max. working temperature",
                "600 °C"
              ],
              [
                "Equipment size (L×W×H)",
                "3750 × 2400 × 2500 mm"
              ],
              [
                "Capacity",
                "10 trees (12,000 inserts / 3,600 round tools)"
              ],
              [
                "Max. load",
                "300 kg (Spindle Ø130 mm)"
              ],
              [
                "Process time",
                "AlTiN 6–8 h"
              ],
              [
                "Typical applications",
                "Hard-to-machine materials such as stainless steel and titanium alloys."
              ]
            ],
            "process": [
              "Stainless steel machining tools",
              "Titanium alloys",
              "Hard-to-machine materials",
              "HiPIMS + Arc hybrid"
            ],
            "models": [
              {
                "model": "HD500",
                "tech": "Hybrid arc + magnetron (HiPIMS)",
                "area": "Φ410 × 400 mm",
                "temp": "700 °C",
                "load": "5 trees (6,000 inserts / 1,800 tools, 200 kg, Spindle Ø130)",
                "size": "3400 × 1600 × 2600 mm",
                "time": "AlTiN 6–8 h"
              },
              {
                "model": "HD800",
                "tech": "Hybrid arc + magnetron (HiPIMS)",
                "area": "Φ650 × 400 mm",
                "temp": "600 °C",
                "load": "10 trees (12,000 inserts / 3,600 tools, 300 kg, Spindle Ø130)",
                "size": "3750 × 2400 × 2500 mm",
                "time": "AlTiN 6–8 h"
              }
            ],
            "url": "https://www.hscoat.com/hybrid-coating-equipment/",
            "k": "hd800 hybrid hipims arc smooth droplet free aerospace",
            "i": [
              "tools",
              "aero",
              "auto"
            ],
            "series_desc": "Hybrid platform combining high-ionisation sputtering with arc processes.",
            "typical_applications": "Hard-to-machine materials such as stainless steel and titanium alloys."
          },
          {
            "id": "wcc800",
            "series": "WCC",
            "photo": "hs_wcc800",
            "photoAlt": "Huasheng WCC800 DC + HiPIMS magnetron sputtering machine",
            "name": "WCC800 DC + HiPIMS magnetron sputtering machine",
            "tag": "HiPIMS sputtering",
            "short": "Universal wear-resistant coating system using DC + HiPIMS.",
            "desc": "The WCC800 is Huasheng's universal wear-resistant coating system combining DC magnetron sputtering and HiPIMS technology. Tailored for precision components, forming tools, and friction-sensitive parts requiring smooth, low-stress, wear-resistant coatings.",
            "features": [
              "Sputter deposition with no peeling or delamination",
              "Modular design",
              "Suits small batches and complex shapes"
            ],
            "specs": [
              [
                "Coating technology",
                "DC + HiPIMS magnetron sputtering (WC/C, TiAlN)"
              ],
              [
                "Chamber volume",
                "1.0 m³"
              ],
              [
                "Effective coating area",
                "Φ650 × 400 mm"
              ],
              [
                "Max. working temperature",
                "<200 °C (deposition)"
              ],
              [
                "Equipment size (L×W×H)",
                "4850 × 1600 × 2400 mm"
              ],
              [
                "Capacity",
                "8 trees (Spindle Ø170 mm)"
              ],
              [
                "Max. load",
                "350 kg"
              ],
              [
                "Process time",
                "4–5 h"
              ],
              [
                "Typical applications",
                "Components and tools, medical instruments, WC/C and TiAlN coatings."
              ]
            ],
            "process": [
              "Components and tools",
              "Medical instruments",
              "WC/C coatings",
              "TiAlN coatings"
            ],
            "models": [
              {
                "model": "WCC800",
                "tech": "DC + HiPIMS magnetron sputtering (WC/C, TiAlN)",
                "area": "Φ650 × 400 mm",
                "temp": "<200 °C",
                "load": "8 trees (350 kg, Spindle Ø170)",
                "size": "4850 × 1600 × 2400 mm",
                "time": "4–5 h"
              }
            ],
            "url": "https://www.hscoat.com/hipims-coating-equipment/",
            "k": "wcc800 wcc hipims sputtering wc c tialn low friction medical",
            "i": [
              "auto",
              "medical",
              "tools"
            ],
            "series_desc": "Universal wear-resistant coating system using DC + HiPIMS magnetron sputtering.",
            "typical_applications": "Components and tools, medical instruments, WC/C and TiAlN coatings."
          },
          {
            "id": "broach",
            "series": "Special",
            "photo": "hs_broach",
            "photoAlt": "Huasheng dedicated broach coating equipment",
            "name": "Broach coating equipment",
            "tag": "Dedicated vertical arc",
            "short": "Dedicated broach coating equipment with a tall chamber.",
            "desc": "Dedicated vertical arc coating equipment specially designed by Huasheng for extra-long cutting tools, such as broaches, long drills, and form cutters. Features an extended vertical working zone, multi-zone heating, and distributed arc cathodes for uniform coating thickness along the entire length.",
            "features": [
              "Effective coating area Φ650 x 2000 mm",
              "1000 kg load",
              "Coatings TiN, AlCrN, AlTiN, AlCrSiN"
            ],
            "specs": [
              [
                "Coating technology",
                "Arc, dedicated to broaches"
              ],
              [
                "Chamber volume",
                "2.5 m³"
              ],
              [
                "Effective coating area",
                "Φ650 × 2000 mm"
              ],
              [
                "Max. working temperature",
                "450 °C"
              ],
              [
                "Equipment size (L×W×H)",
                "3750 × 1800 × 2960 mm"
              ],
              [
                "Capacity",
                "10 trees"
              ],
              [
                "Max. load",
                "1,000 kg"
              ],
              [
                "Process time",
                "7–9 h"
              ],
              [
                "Typical applications",
                "Broaches and other long tools."
              ]
            ],
            "process": [
              "Broaches and other long tools",
              "TiN, AlCrN, AlTiN, AlCrSiN",
              "Helical broaches & rotor cutters"
            ],
            "models": [
              {
                "model": "Broach coater",
                "tech": "Arc, dedicated to broaches",
                "area": "Φ650 × 2000 mm",
                "temp": "450 °C",
                "load": "10 trees (1,000 kg)",
                "size": "3750 × 1800 × 2960 mm",
                "time": "7–9 h"
              }
            ],
            "url": "https://www.hscoat.com/aip-coating-equipment/",
            "k": "broach coater tall chamber 2000mm 1000kg alcrsn altin tin",
            "i": [
              "tools",
              "auto"
            ],
            "series_desc": "Dedicated broach coating equipment with a tall chamber.",
            "typical_applications": "Broaches and other long tools."
          },
          {
            "id": "aip",
            "photo": "hs_md800",
            "photoAlt": "Huasheng MD800 PLUS arc coating machine",
            "name": "Arc coating equipment",
            "tag": "Arc coating",
            "short": "Hard nitride coatings for cutting tools.",
            "desc": "Arc coating systems for hard nitride coatings such as TiAlN and AlCrN on inserts, drills, end mills and forming tools.",
            "features": [
              "High deposition rate",
              "Strong adhesion",
              "Multilayer and nano-layer coatings"
            ],
            "process": [
              "Cutting tool coating",
              "Mould and die coating"
            ],
            "url": "https://www.hscoat.com/aip-coating-equipment/",
            "k": "pvd tialn alcrn inserts drills end mills cutting tools arc",
            "i": [
              "tools"
            ]
          },
          {
            "id": "hipims",
            "photo": "hs_wcc800",
            "photoAlt": "Huasheng WCC800 HiPIMS coating machine",
            "name": "HiPIMS coating equipment",
            "short": "Dense, smooth, droplet-free coatings.",
            "desc": "High-power impulse magnetron sputtering systems that produce dense, smooth coatings without the droplets typical of arc processes.",
            "features": [
              "High-density plasma",
              "Smooth, droplet-free surfaces"
            ],
            "process": [
              "Precision tool coating",
              "Component coating"
            ],
            "url": "https://www.hscoat.com/hipims-coating-equipment/",
            "k": "pvd sputtering smooth hipims",
            "i": [
              "tools",
              "medical",
              "auto"
            ]
          },
          {
            "id": "hybrid",
            "photo": "hs_gfour",
            "photoAlt": "Huasheng hybrid coating equipment",
            "name": "Hybrid coating equipment",
            "short": "Arc and sputtering in one chamber.",
            "desc": "Hybrid systems that combine arc and sputtering sources in one chamber for multilayer coating designs.",
            "features": [
              "Multiple processes in one chamber",
              "Flexible multilayer designs"
            ],
            "process": [
              "Multilayer tool and component coatings"
            ],
            "url": "https://www.hscoat.com/hybrid-coating-equipment/",
            "k": "pvd arc sputtering multilayer hybrid",
            "i": [
              "tools",
              "auto"
            ]
          },
          {
            "id": "decorative",
            "photo": "hs_deco_h",
            "photoAlt": "Huasheng decorative coating equipment",
            "name": "Decorative coating equipment",
            "short": "Colour PVD finishes.",
            "desc": "PVD systems for durable colour finishes on hardware, sanitaryware, watches and consumer products.",
            "features": [
              "Wide colour range",
              "Durable, wear-resistant finishes"
            ],
            "process": [
              "Decorative PVD"
            ],
            "url": "https://www.hscoat.com/decorative-coating-equipment/",
            "k": "colour gold black decorative sanitary",
            "i": [
              "watch"
            ]
          }
        ]
      },
      {
        "id": "dlc",
        "photo": "hs_tc800plus",
        "photoAlt": "Huasheng DLC and ta-C coating systems",
        "name": "DLC & ta-C coating equipment",
        "sub": "ta-C and filtered arc ta-C",
        "desc": "Tetrahedral amorphous carbon (ta-C) and filtered arc systems for hydrogen-free carbon coatings with extreme hardness up to 6000 HV.",
        "url": "https://www.hscoat.com/dlc-coating-equipment/",
        "machines": [
          {
            "id": "tc800plus",
            "series": "TC",
            "photo": "hs_tc800plus",
            "photoAlt": "Huasheng TC800PLUS ta-C coating machine",
            "name": "TC800PLUS ta-C coating machine",
            "tag": "ta-C DLC",
            "short": "ta-C diamond-like carbon, hardness up to 6000 HV.",
            "desc": "The TC800PLUS is Huasheng's dedicated tetrahedral amorphous carbon (ta-C) diamond-like carbon coating system. Operating with high-density plasma deposition, it creates hydrogen-free carbon films with diamond-like hardness up to 6000 HV and an ultra-low friction coefficient, ideal for non-ferrous machining, aluminium cutting tools, and high-wear sliding components.",
            "features": [
              "Up to 6000 HV",
              "Low-temperature deposition under 200 °C",
              "Fast heat dissipation",
              "Anti-adhesion"
            ],
            "specs": [
              [
                "Coating technology",
                "Arc magnetron hybrid ion plating (ta-C)"
              ],
              [
                "Chamber volume",
                "1.0 m³"
              ],
              [
                "Effective coating area",
                "Φ650 × 400 mm"
              ],
              [
                "Max. working temperature",
                "200 °C"
              ],
              [
                "Equipment size (L×W×H)",
                "3750 × 1800 × 2300 mm"
              ],
              [
                "Capacity",
                "10 trees (2,400 round tools)"
              ],
              [
                "Max. load",
                "500 kg (Spindle Ø130 mm)"
              ],
              [
                "Process time",
                "3–6 h"
              ],
              [
                "Typical applications",
                "Micro drills, aluminium and copper machining, optical lens moulds, PCB drilling."
              ]
            ],
            "process": [
              "Micro drills",
              "Aluminium and copper machining",
              "Optical lens moulds",
              "PCB drilling",
              "ta-C diamond-like carbon"
            ],
            "models": [
              {
                "model": "TC800PLUS",
                "tech": "Arc magnetron hybrid ion plating (ta-C)",
                "area": "Φ650 × 400 mm",
                "temp": "200 °C",
                "load": "10 trees (2,400 round tools, 500 kg, Spindle Ø130)",
                "size": "3750 × 1800 × 2300 mm",
                "time": "3–6 h"
              },
              {
                "model": "TC800PLUS-F",
                "tech": "Filtered arc ta-C (S-shaped filter)",
                "area": "Φ650 × 400 mm",
                "temp": "200 °C",
                "load": "8,640 micro-tools (D3.175×38.1L, 350 kg, Spindle Ø130)",
                "size": "4950 × 3400 × 2600 mm",
                "time": "3–6 h"
              }
            ],
            "url": "https://www.hscoat.com/ta-c-coating-equipment/",
            "k": "tc800plus tac dlc 6000hv aluminium non ferrous optical moulds",
            "i": [
              "tools",
              "auto",
              "semi"
            ],
            "series_desc": "ta-C diamond-like carbon. The -F version adds an S-shaped magnetic filter that blocks large particles.",
            "typical_applications": "Micro drills, aluminium and copper machining, optical lens moulds, PCB drilling."
          },
          {
            "id": "tc800plus-f",
            "series": "TC",
            "photo": "hs_tc800plus_f",
            "photoAlt": "Huasheng TC800PLUS-F filtered arc ta-C coating machine",
            "name": "TC800PLUS-F filtered arc ta-C coating machine",
            "tag": "Filtered arc ta-C",
            "short": "S-shaped magnetic filter that blocks large particles, up to 6000 HV.",
            "desc": "The TC800PLUS-F is Huasheng's filtered arc ta-C coating system equipped with an S-shaped magnetic filter. The magnetic filter removes macroscopic droplets and neutral particles from the plasma stream, depositing defect-free, ultra-smooth, hydrogen-free carbon films with hardness up to 6000 HV.",
            "features": [
              "Up to 6000 HV",
              "Low-temperature deposition under 200 °C",
              "Fast heat dissipation",
              "Anti-adhesion"
            ],
            "specs": [
              [
                "Coating technology",
                "Filtered arc ta-C (S-shaped filter)"
              ],
              [
                "Chamber volume",
                "1.0 m³"
              ],
              [
                "Effective coating area",
                "Φ650 × 400 mm"
              ],
              [
                "Max. working temperature",
                "200 °C"
              ],
              [
                "Equipment size (L×W×H)",
                "4950 × 3400 × 2600 mm"
              ],
              [
                "Capacity",
                "8,640 pcs (D3.175×38.1L)"
              ],
              [
                "Max. load",
                "350 kg (Spindle Ø130 mm)"
              ],
              [
                "Process time",
                "3–6 h"
              ],
              [
                "Typical applications",
                "Micro drills, aluminium and copper machining, optical lens moulds, PCB drilling."
              ]
            ],
            "process": [
              "Micro drills",
              "Aluminium and copper machining",
              "Optical lens moulds",
              "PCB drilling",
              "Filtered ta-C"
            ],
            "models": [
              {
                "model": "TC800PLUS",
                "tech": "Arc magnetron hybrid ion plating (ta-C)",
                "area": "Φ650 × 400 mm",
                "temp": "200 °C",
                "load": "10 trees (2,400 round tools, 500 kg, Spindle Ø130)",
                "size": "3750 × 1800 × 2300 mm",
                "time": "3–6 h"
              },
              {
                "model": "TC800PLUS-F",
                "tech": "Filtered arc ta-C (S-shaped filter)",
                "area": "Φ650 × 400 mm",
                "temp": "200 °C",
                "load": "8,640 micro-tools (D3.175×38.1L, 350 kg, Spindle Ø130)",
                "size": "4950 × 3400 × 2600 mm",
                "time": "3–6 h"
              }
            ],
            "url": "https://www.hscoat.com/ta-c-coating-equipment/",
            "k": "tc800plus-f filtered arc tac filter s-shaped 6000hv pcb microdrills",
            "i": [
              "tools",
              "semi",
              "optics"
            ],
            "series_desc": "ta-C diamond-like carbon. The -F version adds an S-shaped magnetic filter that blocks large particles.",
            "typical_applications": "Micro drills, aluminium and copper machining, optical lens moulds, PCB drilling."
          },
          {
            "id": "pecvd-dlc",
            "photo": "hs_tc800plus",
            "photoAlt": "Huasheng DLC coating system",
            "name": "PECVD DLC coating equipment",
            "short": "Low-friction coatings for components.",
            "desc": "Plasma-enhanced CVD systems for low-friction DLC coatings on automotive and engineering components such as piston pins.",
            "features": [
              "Low friction",
              "High hardness and wear resistance"
            ],
            "process": [
              "Automotive component coating",
              "Engineering component coating"
            ],
            "url": "https://www.hscoat.com/pecvd-dlc-coating-equipment/",
            "k": "dlc low friction piston pin pecvd",
            "i": [
              "auto",
              "medical"
            ]
          },
          {
            "id": "tac",
            "photo": "hs_tc800plus",
            "photoAlt": "Huasheng ta-C coating equipment",
            "name": "ta-C coating equipment",
            "short": "Hydrogen-free carbon coatings.",
            "desc": "Systems for hydrogen-free tetrahedral amorphous carbon (ta-C) coatings, used for machining non-ferrous materials and for high-wear parts.",
            "features": [
              "Hydrogen-free carbon",
              "Very high hardness"
            ],
            "process": [
              "Tools for aluminium and non-ferrous machining",
              "High-wear components"
            ],
            "url": "https://www.hscoat.com/ta-c-coating-equipment/",
            "k": "tac hydrogen-free carbon aluminium machining",
            "i": [
              "tools",
              "auto"
            ]
          }
        ]
      },
      {
        "id": "diamond",
        "photo": "hs_da600pro",
        "photoAlt": "Huasheng HFCVD diamond coating system",
        "name": "Diamond coating equipment",
        "sub": "HFCVD parallel filament array",
        "desc": "Hot-filament CVD systems that grow microcrystalline and nanocrystalline diamond films on carbide tools.",
        "url": "https://www.hscoat.com/diamond-coating-equipment/",
        "machines": [
          {
            "id": "da600pro",
            "series": "DA",
            "specs_layout": "full",
            "photo": "hs_da600pro",
            "photoAlt": "Huasheng DA600PRO HFCVD diamond coating machine",
            "name": "DA600PRO HFCVD diamond coating machine",
            "tag": "HFCVD diamond",
            "short": "Parallel filament array for uniform temperature and 4–30 µm diamond film.",
            "desc": "The DA600PRO is Huasheng's advanced hot-filament CVD (HFCVD) diamond coating machine. Equipped with a parallel filament array for highly uniform chamber temperature, it deposits microcrystalline and nanocrystalline diamond coatings (4–30 µm) on cemented carbide inserts, end mills, and drills for high-speed machining of graphite, carbon composites, and high-silicon aluminium alloys.",
            "features": [
              "Deposition up to 1.0 µm/h",
              "Film 4-30 µm",
              "Film thickness variation under 15%",
              "Produces the HGR410 and HFR410 diamond grades"
            ],
            "specs": [
              [
                "Machine",
                ""
              ],
              [
                "Coating technology",
                "Hot filament CVD (HFCVD) diamond. Not related to CVA aluminizing."
              ],
              [
                "Equipment size",
                "Length 2600 × width 1200 × height 2700 mm"
              ],
              [
                "Chamber volume",
                "0.16 m³"
              ],
              [
                "Coating area",
                "300 × 300 mm"
              ],
              [
                "Maximum paintable end mills",
                "D16 × 150 mm"
              ],
              [
                "Capacity",
                "500 pcs at D3"
              ],
              [
                "Process time",
                "16 – 33 hours"
              ],
              [
                "Deposition rate",
                "Up to 1.0 µm/h"
              ],
              [
                "Film thickness",
                "4 – 30 µm"
              ],
              [
                "Electrical and services",
                ""
              ],
              [
                "Voltage",
                "3 × 380/220 V (3L+N+PE)"
              ],
              [
                "Current",
                "75 A"
              ],
              [
                "Power",
                "50 kW"
              ],
              [
                "Frequency",
                "50/60 Hz"
              ],
              [
                "Cooling water",
                "22–26 °C at 5–5.5 bar. Max heat emission about 20 kW, flow 35 L/min."
              ],
              [
                "Compressed air",
                "5 – 6.5 bar"
              ],
              [
                "Process gas",
                "H2 / Ar / CH4 at 1.0 – 1.2 bar"
              ],
              [
                "Average consumption",
                "About 18 kW/h, batch duration about 2.5 h, subject to process"
              ],
              [
                "Process gas purity and consumption",
                ""
              ],
              [
                "Minimum purity",
                "H2 99.995%, Ar 99.995%, CH4 99.6%"
              ],
              [
                "Consumption per batch",
                "H2 2.5 L, Ar 12 L, CH4 0.5 L"
              ],
              [
                "Diamond coating grades produced (coatings, not machines)",
                ""
              ],
              [
                "HGR410",
                "Carbon. Microhardness 80–100 GPa. Thickness 9±1 µm. Dry friction coefficient 0.2. Coating temperature above 500 °C, oxidation temperature 650 °C. For graphite, zirconia, ceramics and metal carbides."
              ],
              [
                "HFR410",
                "Carbon. Microhardness 80–100 GPa. Thickness 10±2 µm. Dry friction coefficient 0.2. Coating temperature above 500 °C, oxidation temperature 650 °C. For PCB boards, high-silicon aluminium, CFRP and other composite materials."
              ]
            ],
            "process": [
              "Graphite, composites, CFRP",
              "PCB ceramic substrates",
              "AlSi alloys (Si>12%)",
              "Woodworking tools",
              "Microcrystalline / Nanocrystalline diamond"
            ],
            "models": [
              {
                "model": "DA600PRO",
                "tech": "HFCVD diamond",
                "area": "300 × 300 mm",
                "temp": "—",
                "load": "500 pcs (D3) / 800 pcs (D3.175)",
                "size": "2600 × 1200 × 2700 mm",
                "time": "16–33 h"
              }
            ],
            "url": "https://www.hscoat.com/hfcvd-diamond-coating-equipment/",
            "k": "da600pro hfcvd diamond carbide graphite cfrp composites pcb ceramic woodworking alsi",
            "i": [
              "tools",
              "aero"
            ],
            "series_desc": "Hot filament CVD diamond coating with a parallel filament array for uniform temperature. Not related to CVA aluminizing.",
            "typical_applications": "Graphite, composites, CFRP, PCB ceramic substrates, AlSi alloys (Si>12%), woodworking."
          },
          {
            "id": "hfcvd",
            "photo": "hs_da600pro",
            "photoAlt": "Huasheng HFCVD diamond coating equipment",
            "name": "HFCVD diamond coating equipment",
            "short": "Diamond films on carbide tools.",
            "desc": "Hot-filament CVD systems that deposit diamond on carbide tools for machining graphite, composites and aluminium-silicon alloys.",
            "features": [
              "Very high hardness",
              "Long tool life on abrasive materials"
            ],
            "process": [
              "Carbide tool coating"
            ],
            "url": "https://www.hscoat.com/hfcvd-diamond-coating-equipment/",
            "k": "diamond carbide graphite composites hfcvd",
            "i": [
              "tools",
              "aero"
            ]
          }
        ]
      },
      {
        "id": "decorative",
        "photo": "hs_deco_h",
        "photoAlt": "Huasheng decorative coating machines",
        "name": "Decorative PVD coating equipment",
        "sub": "DECO H, DECO A, DECO B, DECO G & AF series",
        "desc": "Decorative PVD and functional coating systems for watches, jewellery, consumer hardware, architectural panels, and touchscreen anti-fingerprint coatings.",
        "url": "https://www.hscoat.com/decorative-coating-equipment/",
        "machines": [
          {
            "id": "deco-h",
            "photo": "hs_deco_h",
            "photoAlt": "Huasheng DECO H multi-arc + HiPIMS decorative coating system",
            "name": "DECO H multi-arc + HiPIMS decorative coating system",
            "tag": "Multi-Arc + HiPIMS",
            "short": "Hardness above 2000 HV and widest colour range for luxury items.",
            "desc": "The DECO H is Huasheng's flagship decorative coating system, combining multi-arc ion plating, magnetron sputtering, and HiPIMS. Delivers ultra-hard (HV > 2000), wear-resistant luxury colour finishes for watches, fine jewellery, and premium consumer hardware.",
            "features": [
              "Denser film, wider colour range, hardness above 2000 HV",
              "Lower friction coefficient, brighter colour and better corrosion resistance than mid frequency sputtering alone"
            ],
            "specs": [
              [
                "Technology",
                "Multi-arc + magnetron sputtering + HiPIMS"
              ],
              [
                "Hardness",
                "> 2000 HV"
              ],
              [
                "Chamber sizes",
                "Φ1000 × H1000 mm to Φ1900 × H1250 mm"
              ],
              [
                "Effective coating area",
                "Φ800 × H700 mm to Φ1700 × H950 mm"
              ],
              [
                "Typical applications",
                "High-end bathroom and hardware, 3C digital, watches, jewellery, luxury goods, eyeglass frames, automotive trim."
              ]
            ],
            "process": [
              "Luxury watch cases",
              "Jewellery & accessories",
              "Eyewear frames",
              "Gold, Rose Gold, Black, Gunmetal, Blue PVD"
            ],
            "models": [
              {
                "family": "DECO H",
                "model": "DECO800H",
                "chamberSize": "Φ1000 × H1000",
                "area": "Φ800 × H700",
                "arcTargets": "6",
                "otherTargets": "4 cylindrical Φ70 × H1150",
                "footprint": "3.1 × 2.3 × 2.4 m"
              },
              {
                "family": "DECO H",
                "model": "DECO1000H",
                "chamberSize": "Φ1200 × H1250",
                "area": "Φ1000 × H950",
                "arcTargets": "10",
                "otherTargets": "8 cylindrical",
                "footprint": "3.6 × 3.6 × 2.4 m"
              },
              {
                "family": "DECO H",
                "model": "DECO1550H",
                "chamberSize": "Φ1750 × H1250",
                "area": "Φ1550 × H950",
                "arcTargets": "10",
                "otherTargets": "12 cylindrical + 1 column arc",
                "footprint": "4.2 × 3.6 × 2.4 m"
              },
              {
                "family": "DECO H",
                "model": "DECO1700H",
                "chamberSize": "Φ1900 × H1250",
                "area": "Φ1700 × H950",
                "arcTargets": "12",
                "otherTargets": "16 cylindrical + 1 column arc",
                "footprint": "4.3 × 3.9 × 2.6 m"
              }
            ],
            "url": "https://www.hscoat.com/decorative-coating-equipment/",
            "k": "deco deco-h decorative hipims watches jewellery gold rose gold luxury",
            "i": [
              "watch",
              "optics",
              "jobshop"
            ],
            "series": "DECO H",
            "series_desc": "Multi arc plus magnetron sputtering plus HIPIMS. The flagship of the decorative range.",
            "typical_applications": "High-end bathroom and hardware, 3C digital, watches, jewellery, luxury goods, eyeglass frames, automotive trim."
          },
          {
            "id": "deco-a",
            "photo": "hs_deco_a",
            "photoAlt": "Huasheng DECO A large multi-arc coating system",
            "name": "DECO A large-capacity multi-arc coating system",
            "tag": "Large Multi-Arc",
            "short": "Largest chambers Huasheng builds, with up to 30 arc sources.",
            "desc": "The DECO A is Huasheng's high-capacity large-volume multi-arc coating system designed for architectural hardware, sanitary fittings, stainless steel sheets, and consumer appliances, with chamber sizes available up to DECO2600A.",
            "features": [
              "Gold, rose gold, gun grey, black, coffee, blue and custom colours on metals, glass, crystal, ceramics and polymers"
            ],
            "specs": [
              [
                "Technology",
                "Multi-arc ion plating"
              ],
              [
                "Chamber sizes",
                "Φ1200 × H1200 mm to Φ2800 × H2400 mm"
              ],
              [
                "Effective coating area",
                "Φ1000 × H900 mm to Φ2600 × H2100 mm"
              ],
              [
                "Arc sources",
                "10 to 30 arc sources"
              ],
              [
                "Typical applications",
                "Volume decorative coating where the largest batch size matters, architectural panels, sanitary fittings."
              ]
            ],
            "process": [
              "Architectural stainless steel panels",
              "Elevator trim & doors",
              "Sanitary fittings & faucets",
              "Large hardware fixtures"
            ],
            "models": [
              {
                "family": "DECO A",
                "model": "DECO1000A",
                "chamberSize": "Φ1200 × H1200",
                "area": "Φ1000 × H900",
                "arcTargets": "10",
                "otherTargets": "—",
                "footprint": "3.6 × 3.6 × 2.4 m"
              },
              {
                "family": "DECO A",
                "model": "DECO1400A",
                "chamberSize": "Φ1600 × H1800",
                "area": "Φ1400 × H1500",
                "arcTargets": "16",
                "otherTargets": "—",
                "footprint": "4.2 × 3.6 × 3.0 m"
              },
              {
                "family": "DECO A",
                "model": "DECO2000A",
                "chamberSize": "Φ2200 × H1800",
                "area": "Φ2000 × H1500",
                "arcTargets": "20",
                "otherTargets": "—",
                "footprint": "4.8 × 4.2 × 3.0 m"
              },
              {
                "family": "DECO A",
                "model": "DECO2600A",
                "chamberSize": "Φ2800 × H2400",
                "area": "Φ2600 × H2100",
                "arcTargets": "30",
                "otherTargets": "—",
                "footprint": "5.4 × 4.8 × 3.6 m"
              }
            ],
            "url": "https://www.hscoat.com/decorative-coating-equipment/",
            "k": "deco-a architectural panels large chamber sanitary fittings multi arc hardware",
            "i": [
              "watch",
              "jobshop",
              "steel"
            ],
            "series": "DECO A",
            "series_desc": "Multi arc ion plating. Includes the largest chambers in the decorative range, up to DECO2600A.",
            "typical_applications": "Volume decorative coating where the largest batch size matters."
          },
          {
            "id": "deco-b",
            "photo": "hs_deco_b",
            "photoAlt": "Huasheng DECO B dark colour coating system",
            "name": "DECO B dark color multi-arc + magnetron coating system",
            "tag": "Dark Series PVD",
            "short": "Dedicated dark, gunmetal, and black colour series.",
            "desc": "The DECO B is Huasheng's multi-arc plus magnetron sputtering system dedicated to the dark, gunmetal, and deep black colour series on watches, phone casings, eyewear, and premium dark-finish hardware.",
            "features": [
              "Dark colours - black, coffee, gun grey - with the depth and consistency those shades need"
            ],
            "specs": [
              [
                "Technology",
                "Multi-arc + magnetron sputtering"
              ],
              [
                "Finish series",
                "Dark color series (Gunmetal, Obsidian Black, Graphite)"
              ],
              [
                "Chamber sizes",
                "Φ1000 × H1000 mm to Φ1900 × H1250 mm"
              ],
              [
                "Effective coating area",
                "Φ800 × H700 mm to Φ1700 × H950 mm"
              ],
              [
                "Typical applications",
                "Watches, phone casings, eyewear, dark-finish hardware."
              ]
            ],
            "process": [
              "Gunmetal & Black PVD",
              "Consumer electronics",
              "Automotive interior trim",
              "Hardware & accessories"
            ],
            "models": [
              {
                "family": "DECO B",
                "model": "DECO800B",
                "chamberSize": "Φ1000 × H1000",
                "area": "Φ800 × H700",
                "arcTargets": "6",
                "otherTargets": "4 cylindrical",
                "footprint": "3.1 × 2.3 × 2.4 m"
              },
              {
                "family": "DECO B",
                "model": "DECO1000B",
                "chamberSize": "Φ1200 × H1250",
                "area": "Φ1000 × H950",
                "arcTargets": "10",
                "otherTargets": "8 cylindrical",
                "footprint": "3.6 × 3.6 × 2.4 m"
              },
              {
                "family": "DECO B",
                "model": "DECO1550B",
                "chamberSize": "Φ1750 × H1250",
                "area": "Φ1550 × H950",
                "arcTargets": "10",
                "otherTargets": "12 cylindrical + 1 column arc",
                "footprint": "4.2 × 3.6 × 2.4 m"
              },
              {
                "family": "DECO B",
                "model": "DECO1700B",
                "chamberSize": "Φ1900 × H1250",
                "area": "Φ1700 × H950",
                "arcTargets": "12",
                "otherTargets": "16 cylindrical + 1 column arc",
                "footprint": "4.3 × 3.9 × 2.6 m"
              }
            ],
            "url": "https://www.hscoat.com/decorative-coating-equipment/",
            "k": "deco-b dark series black gunmetal pvd electronics automotive trim",
            "i": [
              "watch",
              "auto",
              "jobshop"
            ],
            "series": "DECO B",
            "series_desc": "Multi arc plus magnetron sputtering, set up for the dark colour series.",
            "typical_applications": "Watches, phone casings, eyewear, dark-finish hardware."
          },
          {
            "id": "deco-g",
            "photo": "hs_deco_g",
            "photoAlt": "Huasheng DECO G real gold coating system",
            "name": "DECO G multi-arc + real gold coating system",
            "tag": "Real Gold PVD",
            "short": "Multi-arc and magnetron sputtering with real gold furnace.",
            "desc": "The DECO G is Huasheng's multi-arc plus magnetron sputtering system equipped with a specialised real gold evaporation furnace for genuine gold and gold alloy colour deposition on luxury goods, watch cases, and jewellery.",
            "features": [
              "Furnace gold and titanium gold, plus rose gold, gun ash, coffee and blue"
            ],
            "specs": [
              [
                "Technology",
                "Multi-arc + magnetron sputtering + real gold furnace"
              ],
              [
                "Precious metal",
                "Real gold (18K, 24K, Rose Gold), Titanium gold"
              ],
              [
                "Chamber sizes",
                "Φ1000 × H1000 mm to Φ1900 × H1250 mm"
              ],
              [
                "Effective coating area",
                "Φ800 × H700 mm to Φ1700 × H950 mm"
              ],
              [
                "Typical applications",
                "Jewellery, watch cases and bracelets, gold-finish hardware."
              ]
            ],
            "process": [
              "Real gold PVD coating",
              "18K & 24K gold deposition",
              "Luxury jewellery",
              "High-end watch cases"
            ],
            "models": [
              {
                "family": "DECO G",
                "model": "DECO800G",
                "chamberSize": "Φ1000 × H1000",
                "area": "Φ800 × H700",
                "arcTargets": "6",
                "otherTargets": "2 cylindrical + 2 flat L1100 × W58 × 1.5",
                "footprint": "3.1 × 2.3 × 2.4 m"
              },
              {
                "family": "DECO G",
                "model": "DECO1000G",
                "chamberSize": "Φ1200 × H1250",
                "area": "Φ1000 × H950",
                "arcTargets": "10",
                "otherTargets": "4 cylindrical + 2 flat",
                "footprint": "3.6 × 3.6 × 2.4 m"
              },
              {
                "family": "DECO G",
                "model": "DECO1550G",
                "chamberSize": "Φ1750 × H1250",
                "area": "Φ1550 × H950",
                "arcTargets": "10",
                "otherTargets": "4 cylindrical + 2 flat",
                "footprint": "4.2 × 3.6 × 2.4 m"
              },
              {
                "family": "DECO G",
                "model": "DECO1700G",
                "chamberSize": "Φ1900 × H1250",
                "area": "Φ1700 × H950",
                "arcTargets": "12",
                "otherTargets": "4 cylindrical + 2 flat",
                "footprint": "4.3 × 3.9 × 2.6 m"
              }
            ],
            "url": "https://www.hscoat.com/decorative-coating-equipment/",
            "k": "deco-g real gold 18k 24k jewellery watchcases luxury precious metal",
            "i": [
              "watch",
              "jobshop"
            ],
            "series": "DECO G",
            "series_desc": "Multi arc plus magnetron sputtering with a real gold furnace.",
            "typical_applications": "Jewellery, watch cases and bracelets, gold-finish hardware."
          },
          {
            "id": "af-series",
            "photo": "hs_af",
            "photoAlt": "Huasheng AF anti-fingerprint coating equipment",
            "name": "AF anti-fingerprint coating equipment",
            "tag": "Anti-Fingerprint",
            "short": "Magnetron sputtering and evaporation for AF functional coatings.",
            "desc": "The AF series combines magnetron sputtering and evaporation for deposition of functional anti-fingerprint, hydrophobic, and oleophobic coatings on smartphone display glass, automotive touchscreens, optical filters, and metallic trim.",
            "features": [
              "4 cylindrical targets Φ70 x H1150, optional, plus 15 sets of evaporation electrodes",
              "Same four chamber sizes as DECO H"
            ],
            "specs": [
              [
                "Technology",
                "Magnetron sputtering + thermal evaporation electrodes"
              ],
              [
                "Electrode sets",
                "15 sets evaporation electrodes + 4 cylindrical targets"
              ],
              [
                "Chamber sizes",
                "Φ1000 × H1000 mm to Φ1900 × H1250 mm"
              ],
              [
                "Effective coating area",
                "Φ800 × H700 mm to Φ1700 × H950 mm"
              ],
              [
                "Typical applications",
                "Anti-fingerprint top layers over decorative coatings, touchscreen glass, optical displays, metal trim."
              ]
            ],
            "process": [
              "Anti-fingerprint (AF) coating",
              "Hydrophobic & oleophobic layers",
              "Touchscreen glass",
              "Optical displays"
            ],
            "models": [
              {
                "family": "AF",
                "model": "AF800",
                "chamberSize": "Φ1000 × H1000",
                "area": "Φ800 × H700",
                "arcTargets": "—",
                "otherTargets": "4 cylindrical Φ70 × H1150 + 15 sets evaporation electrodes",
                "footprint": "Not published"
              },
              {
                "family": "AF",
                "model": "AF1000",
                "chamberSize": "Φ1200 × H1250",
                "area": "Φ1000 × H950",
                "arcTargets": "—",
                "otherTargets": "4 cylindrical Φ70 × H1150 + 15 sets evaporation electrodes",
                "footprint": "Not published"
              },
              {
                "family": "AF",
                "model": "AF1550",
                "chamberSize": "Φ1750 × H1250",
                "area": "Φ1550 × H950",
                "arcTargets": "—",
                "otherTargets": "4 cylindrical Φ70 × H1150 + 15 sets evaporation electrodes",
                "footprint": "Not published"
              },
              {
                "family": "AF",
                "model": "AF1700",
                "chamberSize": "Φ1900 × H1250",
                "area": "Φ1700 × H950",
                "arcTargets": "—",
                "otherTargets": "4 cylindrical Φ70 × H1150 + 15 sets evaporation electrodes",
                "footprint": "Not published"
              }
            ],
            "url": "https://www.hscoat.com/decorative-coating-equipment/",
            "k": "af anti fingerprint touchscreen display glass oleophobic hydrophobic",
            "i": [
              "optics",
              "semi",
              "watch"
            ],
            "series": "AF",
            "series_desc": "Magnetron sputtering plus evaporation, for anti-fingerprint coatings.",
            "typical_applications": "Anti-fingerprint top layers over decorative coatings."
          }
        ]
      },
      {
        "id": "optical",
        "photo": "hs_opt",
        "photoAlt": "Huasheng optical precision coating systems",
        "name": "Optical coating equipment",
        "sub": "Evaporation and magnetron sputtering",
        "desc": "Optical coating equipment for high-precision optical films, anti-reflection (AR) and optical filters on glass, quartz and silicon wafers.",
        "url": "https://www.hscoat.com/optical-coating-equipment/",
        "machines": [
          {
            "id": "opt-t",
            "photo": "hs_opt",
            "photoAlt": "Huasheng OPT-T thermal evaporation optical coating equipment",
            "name": "OPT-T thermal evaporation optical coating equipment",
            "tag": "Thermal Evaporation",
            "short": "Thermal evaporation for aluminium, nickel-chromium and silver wires.",
            "desc": "The OPT-T is Huasheng's thermal evaporation optical coating equipment for high-rate metallic reflective films, mirror coatings, and decorative optical layers using tungsten filament or boat evaporation on plastics, glass, and reflectors.",
            "features": [
              "Chrome, silver, gold, gun black, semi-transparent NCVM non-conductive film and rainbow mirror effects on plastics"
            ],
            "specs": [
              [
                "Technology",
                "Thermal evaporation (Al, NiCr, Ag wire)"
              ],
              [
                "Chamber sizes",
                "Φ1400 / 1600 / 1800 mm (Height 1600 / 1800 / 2000 mm)"
              ],
              [
                "Evaporation materials",
                "Aluminium, nickel chromium, silver wire"
              ],
              [
                "Substrate fixtures",
                "High-capacity planetary dome fixtures"
              ],
              [
                "Typical applications",
                "OPT-T for plastic decorative parts, automotive reflectors, and optical mirrors."
              ]
            ],
            "process": [
              "Aluminium mirror coating",
              "Nickel-chromium reflection layers",
              "Silver metallisation",
              "Optical reflectors"
            ],
            "models": [
              {
                "family": "OPT",
                "model": "OPT-T",
                "chamberSize": "Φ1400 / 1600 / 1800, height 1600 / 1800 / 2000",
                "area": "Planetary dome fixture",
                "arcTargets": "—",
                "otherTargets": "Thermal evaporation: Aluminium, nickel chromium and silver wire",
                "footprint": "Not published"
              },
              {
                "family": "OPT",
                "model": "OPT-E",
                "chamberSize": "Φ900, 1100, 1350, 1550, 1800, 2050, 2350, 2700, height 1500",
                "area": "Planetary dome fixture",
                "arcTargets": "—",
                "otherTargets": "Electron beam evaporation: SiO₂, TiO₂, ZrO₂, SiO",
                "footprint": "Not published"
              }
            ],
            "url": "https://www.hscoat.com/optical-coating-equipment/",
            "k": "opt-t thermal evaporation aluminium silver mirrors reflectors optical",
            "i": [
              "optics",
              "auto"
            ],
            "series": "OPT",
            "series_desc": "Evaporation coating in two versions. OPT-T is thermal evaporation, OPT-E is electron beam.",
            "typical_applications": "OPT-T for plastic decorative parts."
          },
          {
            "id": "opt-e",
            "photo": "hs_opt",
            "photoAlt": "Huasheng OPT-E electron beam evaporation optical coating system",
            "name": "OPT-E electron beam evaporation optical coating equipment",
            "tag": "E-beam optical",
            "short": "Electron beam evaporation for anti-reflection and filter coatings on glass, quartz and silicon wafers.",
            "desc": "The OPT-E is Huasheng's electron beam (E-beam) evaporation optical coating machine for precision anti-reflection (AR) coatings, dielectric filters, and multilayer optical films on glass, quartz, and semiconductor wafers.",
            "features": [
              "Precision optical film - AR anti-reflection, HR high reflectivity, filters, semiconductor electrode and contact layers"
            ],
            "specs": [
              [
                "Coating technology",
                "Electron beam evaporation (E-beam)"
              ],
              [
                "Substrate materials",
                "Glass, quartz, silicon wafers, optical crystals"
              ],
              [
                "Coating types",
                "Anti-reflection (AR), bandpass filters, dielectric mirrors, beam splitters"
              ],
              [
                "Uniformity",
                "High optical uniformity across planetary dome fixtures"
              ],
              [
                "Control system",
                "PLC + PC automation with quartz crystal and optical thickness monitoring"
              ],
              [
                "Typical applications",
                "OPT-E for glass, quartz, silicon wafers and ceramics."
              ]
            ],
            "process": [
              "Anti-reflection (AR) coatings",
              "Optical filters",
              "Dielectric mirrors",
              "Glass, quartz and silicon wafers"
            ],
            "models": [
              {
                "family": "OPT",
                "model": "OPT-T",
                "chamberSize": "Φ1400 / 1600 / 1800, height 1600 / 1800 / 2000",
                "area": "Planetary dome fixture",
                "arcTargets": "—",
                "otherTargets": "Thermal evaporation: Aluminium, nickel chromium and silver wire",
                "footprint": "Not published"
              },
              {
                "family": "OPT",
                "model": "OPT-E",
                "chamberSize": "Φ900, 1100, 1350, 1550, 1800, 2050, 2350, 2700, height 1500",
                "area": "Planetary dome fixture",
                "arcTargets": "—",
                "otherTargets": "Electron beam evaporation: SiO₂, TiO₂, ZrO₂, SiO",
                "footprint": "Not published"
              }
            ],
            "url": "https://www.hscoat.com/optical-coating-equipment/",
            "k": "opt-e opt e optical coating electron beam evaporation e-beam anti-reflection filter glass quartz silicon wafers",
            "i": [
              "optics",
              "semi"
            ],
            "series": "OPT",
            "series_desc": "Evaporation coating in two versions. OPT-T is thermal evaporation, OPT-E is electron beam.",
            "typical_applications": "OPT-E for glass, quartz, silicon wafers and ceramics."
          },
          {
            "id": "sputter-optical",
            "photo": "hs_pow",
            "photoAlt": "Huasheng magnetron sputtering powder coating system",
            "name": "Magnetron sputtering for coating powder rather than parts",
            "tag": "Powder sputtering",
            "short": "Coats diamond, metal and ceramic powders with iron, aluminium, titanium, nickel, copper, molybdenum, zirconium, tungsten, chromium, silicon or cobalt.",
            "desc": "Magnetron sputtering for coating powder rather than parts. Coats diamond, metal and ceramic powders with iron, aluminium, titanium, nickel, copper, molybdenum, zirconium, tungsten, chromium, silicon or cobalt.",
            "features": [
              "Magnetron sputtering for coating powder rather than parts",
              "Coats diamond, metal and ceramic powders",
              "Deposition of iron, aluminium, titanium, nickel, copper, molybdenum, zirconium, tungsten, chromium, silicon or cobalt"
            ],
            "specs": [
              [
                "Coating technology",
                "Magnetron sputtering for coating powder rather than parts"
              ],
              [
                "Coating materials",
                "Iron, aluminium, titanium, nickel, copper, molybdenum, zirconium, tungsten, chromium, silicon or cobalt"
              ],
              [
                "Substrate powders",
                "Diamond, metal and ceramic powders"
              ],
              [
                "Typical applications",
                "Powder metallurgy, diamond tool manufacture"
              ]
            ],
            "process": [
              "Powder metallurgy",
              "Diamond tool manufacture",
              "Diamond powder coating",
              "Ceramic & metal powders"
            ],
            "url": "https://www.hscoat.com/optical-coating-equipment/",
            "k": "sputter-optical magnetron sputtering coating powder diamond metal ceramic powder metallurgy diamond tool manufacture",
            "i": [
              "tools",
              "steel"
            ],
            "series": "OPT",
            "series_desc": "Magnetron sputtering for coating powder rather than parts.",
            "typical_applications": "Powder metallurgy, diamond tool manufacture."
          }
        ]
      },
      {
        "id": "cvd",
        "photo": "hs_ma1500",
        "photoAlt": "Huasheng MA1500 coating machine",
        "name": "CVD & CVA coating equipment",
        "sub": "CVD and CVA aluminizing",
        "desc": "Chemical vapour deposition systems for thick wear-resistant and high-temperature coatings.",
        "url": "https://www.hscoat.com/cvd-coating-equipment/",
        "machines": [
          {
            "id": "cvd-systems",
            "name": "CVD coating systems",
            "short": "Thick wear-resistant coatings.",
            "desc": "CVD systems for thick wear-resistant coatings, typically on turning inserts.",
            "features": [
              "Thick, wear-resistant layers"
            ],
            "process": [
              "Turning insert coating"
            ],
            "url": "https://www.hscoat.com/cvd-coating-systems/",
            "k": "cvd inserts turning",
            "i": [
              "tools"
            ]
          },
          {
            "id": "cva",
            "name": "CVA aluminizing systems",
            "short": "Aluminide coatings for high-temperature parts.",
            "desc": "Chemical vapour aluminizing systems for aluminide coatings that protect parts against high-temperature oxidation.",
            "features": [
              "High-temperature oxidation resistance"
            ],
            "process": [
              "Turbine and hot-section parts"
            ],
            "url": "https://www.hscoat.com/cva-aluminizing-systems/",
            "k": "aluminide turbine oxidation cva",
            "i": [
              "aero"
            ]
          }
        ]
      },
      {
        "id": "turnkey",
        "photo": "turnkey",
        "photoAlt": "Huasheng MD800 PLUS arc coating machine",
        "name": "Turnkey coating solutions",
        "sub": "Complete MD800 tool-coating plant",
        "desc": "A complete tool-coating centre from Huasheng: cleaning, coating, maintenance, utilities and quality control, laid out and commissioned as one plant.",
        "url": "https://www.hscoat.com/turnkey-solution/",
        "machines": [
          {
            "id": "md800-turnkey",
            "photo": "hs_md800",
            "photoAlt": "Huasheng MD800 PLUS turnkey coating centre",
            "caption": "Huasheng MD800 PLUS turnkey coating centre",
            "gallery": [
              [
                "hs_md800",
                "Huasheng MD800 PLUS arc coating machine"
              ],
              [
                "cleanline",
                "Fully automatic ultrasonic cleaning line"
              ]
            ],
            "name": "MD800 turnkey coating centre",
            "short": "Complete plant for in-house tool coating.",
            "desc": "Huasheng's turnkey coating solution gives a tool maker full control of its own coating process, from incoming tools to inspected, coated product. The plant is built around the MD800 PLUS arc coater, with a fully automatic ultrasonic cleaning line, blasting equipment for target and liner maintenance, utilities and quality-control instruments. Owning the process keeps coating know-how in-house, allows your own coating recipes, and cuts turnaround to as little as the same day.",
            "features": [
              "Full control of your coating process and know-how",
              "Open technology to develop your own coatings",
              "Same-day coating turnaround possible",
              "Universal process flow for many tool types"
            ],
            "specs": [
              [
                "Cleaning",
                "Fully automatic ultrasonic cleaning line, 14,000 pcs/h (APMT1135)"
              ],
              [
                "Coating",
                "MD800 arc coater, 12,000 pcs per batch (APMT1135)"
              ],
              [
                "Target maintenance",
                "9060A manual sandblaster, about 2 min per target"
              ],
              [
                "Liner maintenance",
                "1212F pressurised sandblaster, about 4 h per set"
              ],
              [
                "Cooling",
                "MCW-600 air-cooled chiller, 60 kW, R407C, 380 V 50 Hz"
              ],
              [
                "Pure water",
                "CSJ-05 EDI water purifier, up to 18 MΩ·cm"
              ],
              [
                "Compressed air",
                "SZ-30A permanent-magnet inverter compressor"
              ],
              [
                "Quality control",
                "XHS-4700 ball crater tester, HR-150C Rockwell hardness tester, industrial microscope"
              ]
            ],
            "process": [
              "Cleaning",
              "Coating",
              "Target and liner maintenance",
              "Inspection and dispatch"
            ],
            "url": "https://www.hscoat.com/turnkey-solution/",
            "k": "turnkey plant job shop coating centre md800 md800 plus",
            "i": [
              "tools",
              "jobshop"
            ],
            "family": "Turnkey",
            "family_desc": "Huasheng Turnkey Coating Centres provide complete in-house coating plants encompassing incoming tool ultrasonic cleaning, MD800 PLUS coating coater, target and liner sandblasting maintenance, water purification, air compression, and metallurgical quality control instruments.",
            "typical_applications": "Turnkey in-house coating plants for tool regrinding shops and cutting tool manufacturers."
          }
        ]
      }
    ]
  }
];

  /* ----------------------------------------------------------------
     Extra industry tags for each machine
     ---------------------------------------------------------------- */
  (function () {
    var T = {
      jobshop: ["md800", "aip", "hipims", "hybrid", "decorative", "pecvd-dlc", "tac", "hfcvd", "cvd-systems", "md800-turnkey", "pre-pvd", "pluritank-line", "2crd-system", "plasma-nitriding"],
      dies: ["b8t", "vse8t", "tempering", "allnit", "plasma-nitriding", "cool-plus", "aip", "hybrid", "hipims", "tac", "pre-pvd", "pluritank-line", "2crd-system"],
      steel: ["b8t", "vse8t", "oil-horizontal", "oil-vertical", "tempering", "allcarb", "allnit", "plasma-nitriding", "brazing", "lab", "pluritank-line"],
      aero: ["b8t", "vse8t", "brazing", "allcarb", "cool-plus", "fpi", "pluritank-line", "2crd-system", "hipims", "pecvd-dlc", "cva"],
      power: ["vse8t", "allcarb", "allnit", "brazing", "cva", "pecvd-dlc", "fpi", "pluritank-line"],
      oilgas: ["vse8t", "oil-vertical", "allnit", "plasma-nitriding", "aip", "hybrid", "pecvd-dlc", "tac", "fpi", "pluritank-line"],
    };
    CATALOG.forEach(function (b) {
      b.cats.forEach(function (c) {
        c.machines.forEach(function (m) {
          m.i = m.i || [];
          for (var k in T) {
            if (T[k].includes(m.id) && !m.i.includes(k)) m.i.push(k);
          }
        });
      });
    });
  })();

  /* Extra keywords for tooling-related machines */
  (function () {
    var G = ["md800", "aip", "hipims", "tac", "md800-turnkey", "b8t", "tempering", "cool-plus", "allnit", "plasma-nitriding", "pre-pvd", "pluritank-line", "2crd-system"];
    CATALOG.forEach(function (b) {
      b.cats.forEach(function (c) {
        c.machines.forEach(function (m) {
          if (G.includes(m.id)) m.k = (m.k || "") + " hob hobs shaper cutter gear cutting tools broach";
        });
      });
    });
  })();

  /* Extra keywords for carbide tooling (Novatec cleaning & Huasheng coating) */
  (function () {
    var C_TOOLING = ["md800", "aip", "hipims", "hybrid", "tac", "hfcvd", "da600pro", "md800-turnkey", "pre-pvd", "pluritank-line", "2crd-system"];
    CATALOG.forEach(function (b) {
      b.cats.forEach(function (c) {
        c.machines.forEach(function (m) {
          if (C_TOOLING.includes(m.id)) m.k = (m.k || "") + " carbide carbide drills carbide drill carbide tooling";
        });
      });
    });
  })();

  /* ----------------------------------------------------------------
     IDX — flat searchable index
     ---------------------------------------------------------------- */
  const IDX = [];
  CATALOG.forEach(function (b) {
    b.cats.forEach(function (c) {
      c.machines.forEach(function (m) {
        IDX.push({
          n: m.name, b: b.name, bid: b.id, cid: c.id, mid: m.id,
          s: m.short || "", f: c.name, k: m.k || "",
          i: m.i || [], href: b.id + "/" + c.id + "/" + m.id + "/",
          _m: m, _c: c, _b: b,
        });
      });
    });
  });

  /* ----------------------------------------------------------------
     Helpers
     ---------------------------------------------------------------- */
  const esc = function (s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };

  const logo = function (id) {
    return LOGO_PATHS[id] || "";
  };

  const fig = function (o, brand) {
    var fb = Array.prototype.slice.call(arguments, 2);
    var src = [o].concat(fb).find(function (x) { return x && x.photo && PHOTOS[x.photo]; });
    if (src && src !== o) {
      o = { photo: src.photo, photoAlt: src.photoAlt || "", name: o.name };
    }
    if (o.photo && PHOTOS[o.photo]) {
      return '<figure class="mphoto"><img src="' + PHOTOS[o.photo] + '" alt="' + esc(o.photoAlt || o.name) + '"></figure>';
    }
    return '<div class="mphoto empty"><span>Machine photo from the ' + esc(brand) + ' dealer kit</span></div>';
  };

  /* ----------------------------------------------------------------
     Breadcrumb + enquire helpers
     ---------------------------------------------------------------- */
  /* ----------------------------------------------------------------
     SVG Icon Helpers & Helpers
     ---------------------------------------------------------------- */
  const SVG_CHECK = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--lime)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';
  const SVG_ARROW = '<svg class="arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>';
  const SVG_EXT = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>';
  const SVG_BACK = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>';

  const HUASHENG_COATING_TABLE = [
    { series: "GFOUR", model: "GFOUR", tech: "4th-generation hybrid coating", cat: "PVD - hybrid", vol: "0.76", area: "Φ500 x 400", temp: "650", size: "4850 x 1600 x 2400", trees: "7", insertLoad: "8400", roundToolLoad: "2520", hobbingLoad: "—", maxLoad: "300", spindle: "130", time: "AlTiN 6-8", machineId: "gfour" },
    { series: "MD", model: "MD200", tech: "Arc ion plating (4 arc sources)", cat: "PVD - arc", vol: "0.50", area: "Φ310 x 400", temp: "500", size: "3400 x 2000 x 2500", trees: "3", insertLoad: "3600", roundToolLoad: "1000", hobbingLoad: "—", maxLoad: "200", spindle: "130", time: "AlTiN 6-8", machineId: "md200" },
    { series: "MD", model: "MD500", tech: "Arc ion plating (6 arc sources)", cat: "PVD - arc", vol: "0.70", area: "Φ410 x 400", temp: "600", size: "3400 x 2150 x 2500", trees: "5", insertLoad: "6000", roundToolLoad: "1800", hobbingLoad: "—", maxLoad: "300", spindle: "130", time: "AlTiN 6-8", machineId: "md500" },
    { series: "MD", model: "MD800 PLUS", tech: "Arc ion plating (8 arc sources)", cat: "PVD - arc", vol: "1.00", area: "Φ650 x 400", temp: "600", size: "3750 x 2400 x 2500", trees: "10", insertLoad: "12000", roundToolLoad: "3600", hobbingLoad: "30", maxLoad: "500", spindle: "130", time: "AlTiN 6-8", machineId: "md800" },
    { series: "MD", model: "MD1500", tech: "Arc ion plating (16 arc sources, vertical)", cat: "PVD - arc", vol: "1.80", area: "Φ720 x 900", temp: "600", size: "4860 x 2300 x 2660", trees: "12", insertLoad: "28000", roundToolLoad: "5300 (D6x50L)", hobbingLoad: "72", maxLoad: "1000", spindle: "130", time: "AlTiN 6-8", machineId: "md1500" },
    { series: "HD", model: "HD500", tech: "Hybrid arc + magnetron (HiPIMS)", cat: "PVD - hybrid", vol: "0.70", area: "Φ410 x 400", temp: "700", size: "3400 x 1600 x 2600", trees: "5", insertLoad: "6000", roundToolLoad: "1800", hobbingLoad: "—", maxLoad: "200", spindle: "130", time: "AlTiN 6-8", machineId: "hd500" },
    { series: "HD", model: "HD800", tech: "Hybrid arc + magnetron (HiPIMS)", cat: "PVD - hybrid", vol: "1.00", area: "Φ650 x 400", temp: "600", size: "3750 x 2400 x 2500", trees: "10", insertLoad: "12000", roundToolLoad: "3600", hobbingLoad: "—", maxLoad: "300", spindle: "130", time: "AlTiN 6-8", machineId: "hd800" },
    { series: "DA", model: "DA600PRO", tech: "Hot filament CVD (HFCVD) diamond", cat: "Diamond", vol: "0.16", area: "300 x 300", temp: "—", size: "2600 x 1200 x 2700", trees: "—", insertLoad: "—", roundToolLoad: "500 (D3)", hobbingLoad: "—", maxLoad: "—", spindle: "—", time: "16-33", machineId: "da600pro" },
    { series: "TC", model: "TC800PLUS", tech: "Arc magnetron hybrid ion plating (ta-C)", cat: "DLC / ta-C", vol: "1.00", area: "Φ650 x 400", temp: "200", size: "3750 x 1800 x 2300", trees: "10", insertLoad: "—", roundToolLoad: "2400", hobbingLoad: "—", maxLoad: "500", spindle: "130", time: "3-6", machineId: "tc800plus" },
    { series: "TC", model: "TC800PLUS-F", tech: "Filtered arc ta-C (S-shaped filter)", cat: "DLC / ta-C", vol: "1.00", area: "Φ650 x 400", temp: "200", size: "4950 x 3400 x 2600", trees: "—", insertLoad: "—", roundToolLoad: "8640 (D3.175x38.1L)", hobbingLoad: "—", maxLoad: "350", spindle: "130", time: "3-6", machineId: "tc800plus-f" },
    { series: "WCC", model: "WCC800", tech: "DC + HiPIMS magnetron sputtering (WC/C, TiAlN)", cat: "PVD - HiPIMS", vol: "1.00", area: "Φ650 x 400", temp: "<200 (deposition)", size: "4850 x 1600 x 2400", trees: "8", insertLoad: "—", roundToolLoad: "—", hobbingLoad: "—", maxLoad: "350", spindle: "170", time: "4-5", machineId: "wcc800" },
    { series: "Special", model: "Broach coating equipment", tech: "Arc, dedicated to broaches", cat: "PVD - arc", vol: "2.50", area: "Φ650 x 2000", temp: "450", size: "3750 x 1800 x 2960", trees: "10", insertLoad: "—", roundToolLoad: "—", hobbingLoad: "—", maxLoad: "1000", spindle: "—", time: "7-9", machineId: "broach" }
  ];

  const HUASHENG_COATING_IDS = HUASHENG_COATING_TABLE.map(function (x) { return x.machineId; });

  const OMIT_SPEC_KEYS = [
    "Coating technology",
    "Technology",
    "Chamber volume",
    "Effective coating area",
    "Effective area",
    "Max. working temperature",
    "Equipment size (L×W×H)",
    "Equipment size",
    "Capacity",
    "Max. load",
    "Process time",
    "Operation"
  ];

  const crumbs = function (parts) {
    return '<div class="crumbrow">' +
      '<button type="button" class="backbtn" data-back>' + SVG_BACK + '<span>Back</span></button>' +
      '<nav class="crumbs" aria-label="Breadcrumb">' +
      '<a href="#finder" class="crumb-home"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> Products</a>' +
      parts.map(function (p) {
        return p.href
          ? ' <span class="crumb-sep" aria-hidden="true">/</span> <a href="' + p.href + '">' + esc(p.t) + '</a>'
          : ' <span class="crumb-sep" aria-hidden="true">/</span> <span class="crumb-current" aria-current="page">' + esc(p.t) + '</span>';
      }).join("") +
      '</nav>' +
      '</div>';
  };

  const enquire = function (bid, label, text) {
    var labelText = text || "Enquire about this";
    return '<button type="button" class="btn btn--primary btn--lg" data-enquire="' + bid + '" data-label="' + esc(label) + '">' +
      '<span>' + esc(labelText) + '</span>' + SVG_ARROW +
      '</button>';
  };

  /* ----------------------------------------------------------------
     Page renderers
     ---------------------------------------------------------------- */
  /* ----------------------------------------------------------------
     Page renderers
     ---------------------------------------------------------------- */
  function brandPage(b) {
    document.title = b.name + " Equipment in India | GREETS";

    var html = crumbs([{ t: b.name }]) +
      '<header class="phead brandhead has-photo">' +
      '<div class="phead-content">' +
      '<div class="brand-badge-row">' +
      '<span class="flag-chip">' + esc(b.country) + '</span>' +
      '<span class="oem-chip">Authorised Dealer in India</span>' +
      '</div>' +
      '<div class="brand-title-group">' +
      '<span class="plate big"><img src="' + logo(b.id) + '" alt="' + esc(b.name) + '"></span>' +
      '<div>' +
      '<h1>' + esc(b.name) + ' equipment range</h1>' +
      '<p class="brand-sub-full">' + esc(b.full) + '</p>' +
      '</div>' +
      '</div>' +
      '<p class="lede">' + esc(b.intro) + '</p>' +
      (b.strengths && b.strengths.length ? (
        '<div class="brand-strengths" style="margin: 1.25rem 0 1.5rem; background: var(--panel); border: 1px solid var(--line); border-radius: 10px; padding: 1.15rem 1.25rem;">' +
        '<h3 style="font-size: 0.88rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--steel); margin: 0 0 0.75rem; font-weight: 700;">Core strengths</h3>' +
        '<ul style="list-style: none; padding: 0; margin: 0; display: grid; gap: 0.6rem;">' +
        b.strengths.map(function (s) {
          return '<li style="display: flex; align-items: flex-start; gap: 0.6rem; font-size: 0.94rem; color: var(--ink); line-height: 1.45;">' +
            '<span style="flex-shrink:0; margin-top:2px;">' + SVG_CHECK + '</span>' +
            '<span>' + esc(s) + '</span>' +
            '</li>';
        }).join('') +
        '</ul>' +
        '</div>'
      ) : '') +
      '<div class="cta-row">' +
      enquire(b.id, b.name + " Range", "Enquire for " + b.name + " in India") +
      '<a href="' + b.site + '" target="_blank" rel="noopener" class="btn btn--ghost">' +
      '<span>Visit official website</span>' + SVG_EXT +
      '</a>' +
      '</div>' +
      '</div>' +
      '<div class="phead-media">' +
      (b.gallery && b.gallery.length ? (
        '<figure class="mphoto brand-mphoto">' +
        '<div class="mshot-stage"><img id="mshot-main" src="' + PHOTOS[b.gallery[0][0]] + '" alt="' + esc(b.name) + ' installation"></div>' +
        '<figcaption id="mshot-cap">' + esc(b.gallery[0][1]) + '</figcaption>' +
        '<div class="mthumbs">' +
        b.gallery.map(function (g, k) {
          var cap = g[1] || '';
          var altText = cap.toLowerCase().indexOf(b.name.toLowerCase()) !== -1 ? cap : (cap ? b.name + ' - ' + cap : b.name);
          return '<button type="button" class="mthumb" data-src="' + g[0] + '" data-cap="' + esc(cap) + '" aria-label="' + esc(altText) + '"' + (k === 0 ? ' aria-current="true"' : '') + '>' +
            '<img src="' + PHOTOS[g[0]] + '" alt="' + esc(altText) + '">' +
            '</button>';
        }).join('') +
        '</div>' +
        '</figure>'
      ) : fig(b, b.name)) +
      '</div>' +
      '</div>' +

      '<div class="cards">' +
      b.cats.map(function (c) {
        return '<a class="card" href="' + b.id + '/' + c.id + '/">' +
          '<b>' + esc(c.name) + '</b>' +
          '<span>' + esc(c.sub) + '</span>' +
          '<div class="card-badge-line"><span class="cat-pill-count">' + c.machines.length + (c.machines.length === 1 ? " product range" : " product ranges") + '</span></div>' +
          '</a>';
      }).join("") +
      '</div>' +

      '<div class="brand-ext-bar">' +
      '<a href="' + b.site + '" target="_blank" rel="noopener"><span>Visit official ' + esc(b.name) + ' website</span> ' + SVG_EXT + '</a>' +
      '</div>';

    document.getElementById("view").innerHTML = '<div class="wrap">' + html + '</div>';
  }

  function catPage(b, c) {
    document.title = c.name + " | " + b.name + " | GREETS";

    var html = crumbs([{ t: b.name, href: "#/" + b.id }, { t: c.name }]) +
      '<header class="phead has-photo">' +
      '<div class="phead-content">' +
      '<div class="brand-badge-row">' +
      '<span class="flag-chip">' + esc(b.country) + '</span>' +
      '<span class="oem-chip">' + esc(b.name) + '</span>' +
      (c.family ? '<span class="oem-desc-chip" title="Family">' + esc(c.family) + '</span>' : '') +
      '</div>' +
      '<h1>' + esc(c.name) + '</h1>' +
      '<p class="lede">' + esc(c.desc) + '</p>' +
      '<div class="cta-row">' +
      enquire(b.id, c.name, "Enquire about " + c.name) +
      '<a class="btn btn--ghost" href="' + c.url + '" target="_blank" rel="noopener">' +
      '<span>See range on ' + esc(b.name) + ' website</span>' + SVG_EXT +
      '</a>' +
      '</div>' +
      '</div>' +
      '<div class="phead-media">' +
      fig(c, b.name, b) +
      '</div>' +
      '</div>' +

      '<div class="cards">' +
      c.machines.map(function (m) {
        var topFeat = (m.features || [])[0] || "";
        return '<a class="card machine-item-card" href="#/' + b.id + '/' + c.id + '/' + m.id + '">' +
          '<b>' + esc(m.name) + '</b>' +
          '<span>' + esc(m.short || m.desc) + '</span>' +
          '<em>View details & technical data</em>' +
          '</a>';
      }).join("") +
      '</div>';

    document.getElementById("view").innerHTML = '<div class="wrap">' + html + '</div>';
  }

  function machinePage(b, c, m) {
    document.title = m.name + " | " + b.name + " | GREETS";
    var rel = c.machines.filter(function (x) { return x !== m; });

    var src = [m, c, b].find(function (x) { return x && x.photo && PHOTOS[x.photo]; });
    var shots = [];
    if (src) shots.push([src.photo, src.photoAlt || m.name]);
    (m.gallery || []).forEach(function (g) {
      if (PHOTOS[g[0]] && !shots.some(function (x) { return x[0] === g[0]; })) shots.push(g);
    });

    var photo;
    if (shots.length) {
      var mainAlt = shots[0][1] && shots[0][1].toLowerCase().indexOf(m.name.toLowerCase()) !== -1 ? shots[0][1] : (shots[0][1] ? m.name + ' - ' + shots[0][1] : m.name);
      photo = '<figure class="mshot">' +
        '<div class="mshot-stage"><img id="mshot-main" src="' + PHOTOS[shots[0][0]] + '" alt="' + esc(mainAlt) + '"></div>' +
        '<figcaption id="mshot-cap">' + (m.caption ? esc(m.caption) : (shots.length > 1 ? esc(shots[0][1]) : esc(m.name))) + '</figcaption>';
      if (shots.length > 1) {
        photo += '<div class="mthumbs">' + shots.map(function (g, k) {
          var cap = g[1] || '';
          var altText = cap.toLowerCase().indexOf(m.name.toLowerCase()) !== -1 ? cap : (cap ? m.name + ' - ' + cap : m.name);
          return '<button type="button" class="mthumb" data-src="' + g[0] + '" data-cap="' + esc(cap) + '" aria-label="' + esc(altText) + '"' + (k === 0 ? ' aria-current="true"' : '') + '>' +
            '<img src="' + PHOTOS[g[0]] + '" alt="' + esc(altText) + '">' +
            '</button>';
        }).join("") + '</div>';
      }
      photo += '</figure>';
    } else {
      photo = '<div class="mshot empty"><span>Machine photo from ' + esc(b.name) + ' dealer kit</span></div>';
    }

    var many = !!(m.specs && m.specs.length > 6);
    var relnav = rel.length
      ? '<nav class="mrel" aria-label="More in ' + esc(c.name) + '"><span class="mrel-head">More in ' + esc(c.name) + ':</span><div class="mrel-links">' +
      rel.map(function (x) { return '<a href="#/' + b.id + '/' + c.id + '/' + x.id + '">' + esc(x.name) + '</a>'; }).join("") +
      '</div></nav>'
      : '';

    var isHuashengCoatingMachine = (b.id === 'huasheng' && (HUASHENG_COATING_IDS.includes(m.id) || (m.models && m.models[0] && m.models[0].tech && !m.models[0].chamberSize)));

    var specs;
    if (m.specs && m.specs.length) {
      var filteredSpecs = m.specs;
      if (isHuashengCoatingMachine) {
        filteredSpecs = m.specs.filter(function (r) { return !OMIT_SPEC_KEYS.includes(r[0]); });
      }
      if (filteredSpecs.length) {
        specs = '<table class="spec"><tbody>' +
          filteredSpecs.map(function (r) {
            if (!r[1]) {
              return '<tr class="spec-group"><th colspan="2" scope="colgroup">' + esc(r[0]) + '</th></tr>';
            }
            return '<tr><th scope="row">' + esc(r[0]) + '</th><td>' + esc(r[1]) + '</td></tr>';
          }).join("") +
          '</tbody></table>' +
          '<p class="note">Manufacturer figures; exact values depend on the configuration.</p>';
      } else {
        specs = '<div class="ondemand" style="padding:0.75rem 1rem;">' +
          '<b>Full specifications below</b>' +
          '<p>See the complete technical parameter table below for chamber volume, dimensions, capacities, and process times.</p>' +
          '</div>';
      }
    } else {
      specs = '<div class="ondemand">' +
        '<b>Datasheet on request</b>' +
        '<p>This machine is configured to your part specs and throughput. Contact Greets Equipment for technical proposal.</p>' +
        enquire(b.id, m.name + " datasheet", "Enquire about this") +
        '</div>';
    }

    var lineLayoutHtml = '';
    if (m.lineLayout) {
      var ll = m.lineLayout;
      lineLayoutHtml = '<section class="m-models-section m-linelayout-section" style="margin-top: 2.25rem;">' +
        '<div class="m-models-head">' +
        '<div class="m-models-head__title">' +
        '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--lime)" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>' +
        '<div>' +
        '<h2>' + esc(ll.title) + '</h2>' +
        '<p>Process station sequence, ancillary utilities & layout footprint (' + esc(ll.reference) + ')</p>' +
        '</div>' +
        '</div>' +
        '<span class="m-models-count">' + ll.stations.length + ' Process Stations</span>' +
        '</div>' +
        '<div class="m-linelayout-grid" style="display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap:1.25rem; margin-bottom:1.5rem;">' +
        '<div class="mcol-card" style="margin:0;">' +
        '<h3 style="font-size:1.05rem; font-weight:700; color:var(--ink); margin-bottom:0.75rem;">Key dimensions</h3>' +
        '<table class="spec" style="font-size:0.88rem;"><tbody>' +
        ll.dimensions.map(function (d) { return '<tr><th scope="row">' + esc(d[0]) + '</th><td>' + esc(d[1]) + '</td></tr>'; }).join('') +
        '</tbody></table></div>' +
        '<div class="mcol-card" style="margin:0;">' +
        '<h3 style="font-size:1.05rem; font-weight:700; color:var(--ink); margin-bottom:0.75rem;">Ancillary equipment &amp; utilities</h3>' +
        '<ul class="feat" style="font-size:0.88rem;">' +
        ll.ancillary.map(function (a) { return '<li><span class="check-ic-wrap">' + SVG_CHECK + '</span><span>' + esc(a) + '</span></li>'; }).join('') +
        '</ul></div></div>' +
        '<div class="m-models-table-wrap">' +
        '<table class="m-models-table"><thead><tr>' +
        '<th scope="col" style="width:110px;">Position</th><th scope="col">Station Description</th><th scope="col">Process Notes</th>' +
        '</tr></thead><tbody>' +
        ll.stations.map(function (st) {
          return '<tr><td><span class="pill-orientation" style="font-weight:700;">' + esc(st.pos) + '</span></td>' +
            '<td class="td-model" style="font-weight:600; color:var(--ink);">' + esc(st.station) + '</td>' +
            '<td>' + (st.notes ? '<span class="pill-orientation">' + esc(st.notes) + '</span>' : '<span style="color:var(--steel);">—</span>') + '</td></tr>';
        }).join('') +
        '</tbody></table></div></section>';
    }

    var modelsTableHtml = '';
    if (isHuashengCoatingMachine) {
      var headers = [
        "Series",
        "Model",
        "Coating technology",
        "Chamber volume (m³)",
        "Effective coating area (mm)",
        "Max. working temp. (°c)",
        "Equipment size L x W x H (mm)",
        "Capacity (trees)",
        "Insert load APMT1135 (pcs)",
        "Round tool load (pcs)",
        "Hobbing tool load D80xL150 (pcs)",
        "Max. load (kg)",
        "Spindle Ø (mm)",
        "Process time (h)",
        "Action"
      ];

      modelsTableHtml = '<section class="m-models-section">' +
        '<div class="m-models-head">' +
        '<div class="m-models-head__title">' +
        '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--lime)" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>' +
        '<div>' +
        '<h2>Standard model range &amp; technical parameters</h2>' +
        '<p>Published per-model coating zones, batch load capacities, equipment dimensions, and cycle times</p>' +
        '</div>' +
        '</div>' +
        '<span class="m-models-count">' + HUASHENG_COATING_TABLE.length + ' Models in Range</span>' +
        '</div>' +
        '<div class="m-models-table-wrap" style="overflow-x: auto; -webkit-overflow-scrolling: touch;">' +
        '<table class="m-models-table" style="min-width: 1400px;">' +
        '<thead>' +
        '<tr>' +
        headers.map(function (h, idx) {
          return '<th scope="col"' + (idx === headers.length - 1 ? ' class="th-action"' : '') + '>' + esc(h) + '</th>';
        }).join("") +
        '</tr>' +
        '</thead>' +
        '<tbody>' +
        HUASHENG_COATING_TABLE.map(function (row) {
          var isCurrent = row.machineId === m.id || (row.model.toLowerCase() === m.name.toLowerCase()) || (m.name.toLowerCase().indexOf(row.model.toLowerCase()) === 0);
          return '<tr' + (isCurrent ? ' class="row-current" style="background: rgba(2, 150, 60, 0.08); font-weight: 600;"' : '') + '>' +
            '<td><span class="pill-orientation" style="font-weight:700;">' + esc(row.series) + '</span></td>' +
            '<td class="td-model"><span class="model-badge">' + esc(row.model) + '</span></td>' +
            '<td>' + esc(row.tech) + '</td>' +
            '<td class="td-highlight">' + esc(row.vol) + '</td>' +
            '<td class="td-dim">' + esc(row.area) + '</td>' +
            '<td>' + esc(row.temp) + '</td>' +
            '<td>' + esc(row.size) + '</td>' +
            '<td class="td-highlight">' + esc(row.trees) + '</td>' +
            '<td>' + esc(row.insertLoad) + '</td>' +
            '<td>' + esc(row.roundToolLoad) + '</td>' +
            '<td>' + esc(row.hobbingLoad) + '</td>' +
            '<td class="td-highlight">' + esc(row.maxLoad) + '</td>' +
            '<td>' + esc(row.spindle) + '</td>' +
            '<td>' + esc(row.time) + '</td>' +
            '<td class="td-action">' +
            '<button type="button" class="btn-model-enquire" data-enquire="' + esc(b.id) + '" data-label="' + esc('Huasheng - ' + row.model) + '">' +
            '<span>Enquire</span>' + SVG_ARROW +
            '</button>' +
            '</td>' +
            '</tr>';
        }).join("") +
        '</tbody>' +
        '</table>' +
        '</div>' +
        '</section>';
    } else if (m.models && m.models.length && c.id !== 'medical-implants') {
      var isDeco = m.models[0].chamberSize !== undefined || m.models[0].arcTargets !== undefined || m.models[0].otherTargets !== undefined;
      var isCoating = m.models[0].tech !== undefined && !isDeco;
      var isCleaning = m.models[0].chamber !== undefined || m.models[0].notes !== undefined;
      var headers = isDeco
        ? ["Family", "Model", "Chamber Size (mm)", "Effective coating area (mm)", "Arc Targets", "Other Targets", "Footprint L×W×H (m)", "Action"]
        : (isCoating
          ? ["Model", "Technology", "Effective coating area", "Max Temp", "Load / Capacity", "Equipment Size (mm)", "Cycle Time", "Action"]
          : (isCleaning
            ? ["Family", "Model", "Usable Chamber / Tank (mm)", "Overall Size (mm)", "Max Load", "Version / Notes", "Action"]
            : ["Model", "Config", "Load", "Dimensions", "Max Temp", "Vacuum", "Cooling", "Action"]));

      modelsTableHtml = '<section class="m-models-section">' +
        '<div class="m-models-head">' +
        '<div class="m-models-head__title">' +
        '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--lime)" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>' +
        '<div>' +
        '<h2>Standard model range &amp; technical parameters</h2>' +
        '<p>' + (isDeco ? 'Published per-model chamber dimensions, effective coating zones, target configurations, and footprint dimensions' : (isCoating ? 'Published per-model coating zones, batch load capacities, equipment dimensions, and cycle times' : (isCleaning ? 'Published per-model usable chamber/tank capacities, overall dimensions, and configurations' : 'Published per-model load ratings, dimensions, maximum temperatures, and vacuum levels'))) + '</p>' +
        '</div>' +
        '</div>' +
        '<span class="m-models-count">' + m.models.length + ' Models in Family</span>' +
        '</div>' +
        '<div class="m-models-table-wrap">' +
        '<table class="m-models-table">' +
        '<thead>' +
        '<tr>' +
        headers.map(function (h, idx) {
          return '<th scope="col"' + (idx === headers.length - 1 ? ' class="th-action"' : '') + '>' + esc(h) + '</th>';
        }).join("") +
        '</tr>' +
        '</thead>' +
        '<tbody>' +
        m.models.map(function (mod) {
          if (isDeco) {
            return '<tr>' +
              '<td><span class="pill-orientation" style="font-weight:600;">' + esc(mod.family || 'Huasheng') + '</span></td>' +
              '<td class="td-model"><span class="model-badge">' + esc(mod.model) + '</span></td>' +
              '<td class="td-dim">' + esc(mod.chamberSize || '—') + '</td>' +
              '<td>' + esc(mod.area || '—') + '</td>' +
              '<td>' + esc(mod.arcTargets || '—') + '</td>' +
              '<td><span class="pill-orientation">' + esc(mod.otherTargets || '—') + '</span></td>' +
              '<td>' + esc(mod.footprint || '—') + '</td>' +
              '<td class="td-action">' +
              '<button type="button" class="btn-model-enquire" data-enquire="' + esc(b.id) + '" data-label="' + esc(m.name + ' - ' + mod.model) + '">' +
              '<span>Enquire</span>' + SVG_ARROW +
              '</button>' +
              '</td>' +
              '</tr>';
          }
          if (isCoating) {
            return '<tr>' +
              '<td class="td-model"><span class="model-badge">' + esc(mod.model) + '</span></td>' +
              '<td><span class="pill-orientation">' + esc(mod.tech || '—') + '</span></td>' +
              '<td class="td-dim">' + esc(mod.area || '—') + '</td>' +
              '<td>' + esc(mod.temp || '—') + '</td>' +
              '<td class="td-highlight">' + esc(mod.load || '—') + '</td>' +
              '<td>' + esc(mod.size || '—') + '</td>' +
              '<td>' + esc(mod.time || '—') + '</td>' +
              '<td class="td-action">' +
              '<button type="button" class="btn-model-enquire" data-enquire="' + esc(b.id) + '" data-label="' + esc(m.name + ' - ' + mod.model) + '">' +
              '<span>Enquire</span>' + SVG_ARROW +
              '</button>' +
              '</td>' +
              '</tr>';
          }
          if (isCleaning) {
            return '<tr>' +
              '<td><span class="pill-orientation" style="font-weight:600;">' + esc(mod.family || 'Novatec') + '</span></td>' +
              '<td class="td-model"><span class="model-badge">' + esc(mod.model) + '</span></td>' +
              '<td class="td-dim">' + esc(mod.chamber || '—') + '</td>' +
              '<td>' + esc(mod.size || '—') + '</td>' +
              '<td class="td-highlight">' + esc(mod.load || '—') + '</td>' +
              '<td><span class="pill-orientation">' + esc(mod.notes || '—') + '</span></td>' +
              '<td class="td-action">' +
              '<button type="button" class="btn-model-enquire" data-enquire="' + esc(b.id) + '" data-label="' + esc(m.name + ' - ' + mod.model) + '">' +
              '<span>Enquire</span>' + SVG_ARROW +
              '</button>' +
              '</td>' +
              '</tr>';
          }
          return '<tr>' +
            '<td class="td-model"><span class="model-badge">' + esc(mod.model) + '</span></td>' +
            '<td><span class="pill-orientation">' + esc(mod.orientation) + '</span></td>' +
            '<td class="td-highlight">' + esc(mod.load) + '</td>' +
            '<td class="td-dim">' + esc(mod.dimensions) + '</td>' +
            '<td>' + esc(mod.temp) + '</td>' +
            '<td>' + esc(mod.vacuum) + '</td>' +
            '<td>' + esc(mod.pressure) + '</td>' +
            '<td class="td-action">' +
            '<button type="button" class="btn-model-enquire" data-enquire="' + esc(b.id) + '" data-label="' + esc(m.name + ' - ' + mod.model) + '">' +
            '<span>Enquire</span>' + SVG_ARROW +
            '</button>' +
            '</td>' +
            '</tr>';
        }).join("") +
        '</tbody>' +
        '</table>' +
        '</div>' +
        '</section>';
    }

    var html = '<div class="mpage">' +
      crumbs([{ t: b.name, href: "#/" + b.id }, { t: c.name, href: "#/" + b.id + '/' + c.id }, { t: m.name }]) +
      '<div class="mlayout' + (many ? ' many' : '') + '">' +
      '<div class="mleft">' +
      '<div class="brand-badge-row">' +
      '<span class="flag-chip">' + esc(b.country) + '</span>' +
      '<span class="oem-chip">' + esc(b.name) + '</span>' +
      ((m.series || m.family || c.family || m.bmi_desc) ? '<span class="oem-desc-chip" title="' + (m.series ? 'Series' : 'Family') + '">' + esc(m.series || m.family || c.family || m.bmi_desc) + '</span>' : '') +
      '</div>' +
      '<h1>' + esc(m.name) + '</h1>' +
      '<p class="lede">' + esc(m.desc) + '</p>' +
      '<div class="cta-row">' +
      enquire(b.id, m.name, "Enquire about this") +
      '<a class="btn btn--ghost" href="' + (m.url || c.url) + '" target="_blank" rel="noopener"><span>View on ' + esc(b.name) + ' website</span>' + SVG_EXT + '</a>' +
      '</div>' +
      '<div class="mcols">' +
      (function () {
        var famDesc = m.family_desc || m.series_desc;
        if (!famDesc) return '';
        var famHeading = m.series ? (esc(m.series) + ' series overview') : (m.family ? (esc(m.family) + ' family overview') : (esc(c.name) + ' overview'));
        return '<section class="mcol-card" style="grid-column: 1 / -1;">' +
          '<div style="display:flex; align-items:center; gap:0.5rem; margin-bottom:0.45rem;">' +
          '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--lime)" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">' +
          '<rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect>' +
          '</svg>' +
          '<h2 style="margin:0; font-size:0.95rem;">' + famHeading + '</h2>' +
          '</div>' +
          '<p class="fam-desc" style="margin:0; font-size:0.82rem; color:var(--ink); line-height:1.5;">' + esc(famDesc) + '</p>' +
          '</section>';
      })() +
      (function () {
        var isWide = (m.id === 'da600pro' || m.specs_layout === 'full');
        var typicalAppsCard = (m.typical_applications || m.typical_use) ? ('<section class="mcol-card" style="' + (isWide ? 'margin-top: 1rem;' : 'grid-column: 1 / -1;') + '"><h2>' + (m.typical_applications ? 'Typical applications' : 'Typical use') + '</h2><p style="margin:0.25rem 0 0; font-size:0.82rem; color:var(--ink); line-height:1.5;">' + esc(m.typical_applications || m.typical_use) + '</p></section>') : '';
        var industriesCard = (m.i && m.i.length) ? ('<section class="mcol-card" style="' + (isWide ? 'margin-top: 0.85rem;' : 'grid-column: 1 / -1;') + '"><h2>Industries</h2><p class="indline" style="margin:0.25rem 0 0;">' + m.i.map(function (x) { var indObj = IND.find(function (z) { return z.id === x; }); return indObj ? esc(indObj.n) : ""; }).filter(Boolean).join(", ") + '</p></section>') : '';

        return (!isWide ? typicalAppsCard : '') +
          '<section class="mcol-card' + ((!m.benefits || !m.benefits.length) && !isWide ? ' mcol-card--full' : '') + '"><h2>Key features</h2><ul class="feat">' + m.features.map(function (f) { return '<li><span class="check-ic-wrap">' + SVG_CHECK + '</span><span>' + esc(f) + '</span></li>'; }).join("") + '</ul></section>' +
          (m.benefits && m.benefits.length ? '<section class="mcol-card"><h2>Key benefits</h2><ul class="feat">' + m.benefits.map(function (b) { return '<li><span class="check-ic-wrap">' + SVG_CHECK + '</span><span>' + esc(b) + '</span></li>'; }).join("") + '</ul></section>' : '') +
          (m.config ? '<section class="mcol-card"' + (m.thermochemical ? '' : ' style="grid-column: 1 / -1;"') + '><h2>Configuration</h2><p style="margin-top:0.4rem; font-size:0.82rem; color:var(--ink); font-weight:550;">' + esc(m.config) + '</p></section>' : '') +
          (m.thermochemical ? '<section class="mcol-card"' + (m.config ? '' : ' style="grid-column: 1 / -1;"') + '><h2>Thermochemical options</h2><p style="margin-top:0.4rem; font-size:0.82rem; color:var(--lime); font-weight:600;">' + esc(m.thermochemical) + '</p></section>' : '') +
          (m.process && m.process.length ? '<section class="mcol-card"' + (isWide ? '' : ' style="grid-column: 1 / -1;"') + '><h2>Supported processes</h2><div class="pills" style="margin-top:0.35rem;">' + m.process.map(function (p) { return '<span>' + esc(p) + '</span>'; }).join("") + '</div></section>' : '') +
          (m.options && m.options.length ? '<section class="mcol-card" style="grid-column: 1 / -1;"><h2>Main options</h2><ul class="feat feat--options">' + m.options.map(function (o) { return '<li><span class="check-ic-wrap">' + SVG_CHECK + '</span><span>' + esc(o) + '</span></li>'; }).join("") + '</ul></section>' : '') +
          (m.site_reqs && m.site_reqs.length ? '<section class="mcol-card" style="grid-column: 1 / -1;"><h2>' + esc(m.site_reqs_title || 'Installation & site requirements') + '</h2><table class="spec" style="margin-top:0.75rem;"><tbody>' + m.site_reqs.map(function (r) { return '<tr><th scope="row">' + esc(r[0]) + '</th><td>' + esc(r[1]) + '</td></tr>'; }).join("") + '</tbody></table></section>' : '') +
          (!isWide ? industriesCard : '');
      })() +
      '</div>' +
      relnav +
      '</div>' +
      '<div class="mright">' +
      photo +
      ((m.id === 'da600pro' || m.specs_layout === 'full') ? (
        ((m.typical_applications || m.typical_use) ? '<section class="mcol-card" style="margin-top: 1rem;"><h2>' + (m.typical_applications ? 'Typical applications' : 'Typical use') + '</h2><p style="margin:0.25rem 0 0; font-size:0.82rem; color:var(--ink); line-height:1.5;">' + esc(m.typical_applications || m.typical_use) + '</p></section>' : '') +
        ((m.i && m.i.length) ? '<section class="mcol-card" style="margin-top: 0.85rem;"><h2>Industries</h2><p class="indline" style="margin:0.25rem 0 0;">' + m.i.map(function (x) { var indObj = IND.find(function (z) { return z.id === x; }); return indObj ? esc(indObj.n) : ""; }).filter(Boolean).join(", ") + '</p></section>' : '')
      ) : (
        '<section class="mspec"><div class="mspec-head"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--lime)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg><h2>Technical data</h2></div>' + specs + '</section>'
      )) +
      '</div>' +
      '</div>' +
      (((m.id === 'da600pro' || m.specs_layout === 'full') && specs) ? '<section class="mspec mspec--full" id="technical-data"><div class="mspec-head"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--lime)" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg><h2>Technical data</h2></div>' + specs + '</section>' : '') +
      modelsTableHtml + lineLayoutHtml +
      '</div>';

    document.getElementById("view").innerHTML = '<div class="wrap">' + html + '</div>';
  }

  /* ----------------------------------------------------------------
     Router
     ---------------------------------------------------------------- */
  var home = document.getElementById("top");
  var view = document.getElementById("view");
  var HOME_TITLE = document.title;
  var pending = null;
  var lastDepth = 0;

  function route() {
    var h = location.hash;
    var saved = history.state && typeof history.state.y === "number" ? history.state.y : null;

    if (!history.state || history.state.d == null) history.replaceState({ d: lastDepth + 1, y: null }, "");
    lastDepth = history.state.d;

    if (h.startsWith("#/")) {
      var parts = h.slice(2).split("/");
      var bid = parts[0];
      var cid = parts[1];
      var mid = parts[2];

      var b = CATALOG.find(function (x) { return x.id === bid; });
      var c = b && cid ? b.cats.find(function (x) { return x.id === cid; }) : null;
      var m = c && mid ? c.machines.find(function (x) { return x.id === mid; }) : null;

      if (m) {
        machinePage(b, c, m);
      } else if (c) {
        catPage(b, c);
      } else if (b) {
        brandPage(b);
      } else {
        document.getElementById("view").innerHTML = '<div class="wrap">' +
          crumbs([{ t: "Not found" }]) +
          '<h1>Page not found</h1>' +
          '<p class="lede">This product page doesn\'t exist. <a href="#finder">Go back to all products</a>.</p>' +
          '</div>';
        document.title = "Not found | GREETS";
      }

      home.hidden = true;
      view.hidden = false;
      window.scrollTo(0, saved || 0);

      var h1 = view.querySelector("h1");
      if (h1) {
        h1.tabIndex = -1;
        h1.focus({ preventScroll: true });
      }
    } else {
      view.hidden = true;
      home.hidden = false;
      document.title = HOME_TITLE;

      if (saved != null) {
        requestAnimationFrame(function () { window.scrollTo(0, saved); });
      } else if (h.length > 1) {
        var t = document.getElementById(h.slice(1));
        if (t) {
          requestAnimationFrame(function () {
            var headerHeight = document.querySelector('.header')?.offsetHeight || 72;
            var targetEl = t.querySelector('.wrap.container') || t;
            var y = targetEl.getBoundingClientRect().top + window.pageYOffset - headerHeight - 16;
            window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
          });
        } else {
          window.scrollTo(0, 0);
        }
      } else {
        window.scrollTo(0, 0);
      }

      if (pending) {
        var f = document.getElementById("enquiry-form");
        if (!f) f = document.getElementById("enquiry");
        if (f) {
          var pSelect = f.querySelector("select[name='process']") || f.querySelector("#process");
          if (pSelect) pSelect.value = pending.p;
          var msgInput = f.querySelector("textarea[name='msg']") || f.querySelector("textarea[name='details']") || f.querySelector("#msg");
          if (msgInput && !msgInput.value) msgInput.value = "Enquiry about: " + pending.l + "\n";
        }
        pending = null;
      }
    }
  }

  /* ----------------------------------------------------------------
     Back button + photo gallery + enquire handling
     ---------------------------------------------------------------- */
  view.addEventListener("click", function (e) {
    var crumbHome = e.target.closest(".crumb-home");
    if (crumbHome) {
      location.hash = "#finder";
      route();
      return;
    }

    var back = e.target.closest("[data-back]");
    if (back) {
      var d = history.state && history.state.d;
      if (d > 1) {
        history.back();
      } else {
        var parts = location.hash.slice(2).split("/");
        parts.pop();
        location.hash = parts.length ? "#/" + parts.join("/") : "#hero";
      }
      return;
    }

    var thumb = e.target.closest(".mthumb");
    if (thumb) {
      var im = document.getElementById("mshot-main");
      if (im) {
        im.src = PHOTOS[thumb.dataset.src];
        var thumbImg = thumb.querySelector("img");
        im.alt = (thumbImg && thumbImg.alt) || thumb.dataset.cap;
      }
      var cap = document.getElementById("mshot-cap");
      if (cap) cap.textContent = thumb.dataset.cap;
      view.querySelectorAll(".mthumb").forEach(function (x) { x.removeAttribute("aria-current"); });
      thumb.setAttribute("aria-current", "true");
      return;
    }

    var btn = e.target.closest("[data-enquire]");
    if (!btn) return;
    pending = { p: PROC_OPT[btn.dataset.enquire], l: btn.dataset.label };
    location.hash = "#contact";
  });

  /* Click handler for partner cards on home page */
  document.addEventListener("click", function (e) {
    var pcard = e.target.closest(".partner-card-light[data-brand]");
    if (pcard && pcard.dataset.brand && pcard.dataset.brand !== "greets") {
      var link = pcard.querySelector("a[href^='#/']");
      if (link && !e.target.closest("a")) {
        location.hash = link.getAttribute("href");
      }
    }
  });

  /* ----------------------------------------------------------------
     Smart search: understands applications, processes and synonyms
     (Ported directly from greets-products (20).html)
     ---------------------------------------------------------------- */
  const PROC = {
    harden: ["b8t", "vse8t", "oil-horizontal", "oil-vertical", "lab"],
    temper: ["tempering"],
    braze: ["brazing", "alu-brazing"],
    carburize: ["allcarb"],
    nitride: ["allnit", "plasma-nitriding"],
    cryo: ["cool-plus"],
    clean: ["pluritank-line", "pre-pvd", "cleanroom", "2crd-system", "ipc", "fcps", "combined", "generators", "plt60v"],
    passivate: ["fcps", "combined"],
    inspect: ["fpi"],
    pvd: ["md800", "aip", "hipims", "hybrid", "decorative"],
    dlc: ["pecvd-dlc", "tac"],
    diamond: ["hfcvd"],
    optical: ["opt-t", "opt-e", "sputter-optical"],
    cvd: ["cvd-systems", "cva"],
    turnkey: ["md800-turnkey", "combined"],
    carbide_tools: ["pre-pvd", "pluritank-line", "2crd-system", "hfcvd", "da600pro", "md800", "aip", "hipims", "hybrid", "tac", "md800-turnkey"]
  };
  PROC.coat = [].concat(PROC.pvd, PROC.dlc, PROC.diamond, PROC.optical, PROC.cvd, ["md800-turnkey"]);
  PROC.heat = [].concat(PROC.harden, PROC.temper, PROC.braze, PROC.carburize, PROC.nitride, PROC.cryo);

  const PROC_LABEL = {
    harden: "hardening",
    temper: "tempering",
    braze: "brazing",
    carburize: "carburizing",
    nitride: "nitriding",
    cryo: "sub-zero treatment",
    clean: "cleaning",
    passivate: "passivation",
    inspect: "crack inspection (FPI)",
    pvd: "PVD coating",
    dlc: "DLC coating",
    diamond: "diamond coating",
    optical: "optical coating",
    cvd: "CVD & CVA coating",
    turnkey: "turnkey plants",
    carbide_tools: "carbide tooling & drills",
    coat: "coating",
    heat: "heat treatment"
  };

  const SYN = [
    [["carbide drill", "carbide drills", "carbide tool", "carbide tools", "carbide"], "p:carbide_tools"],
    [["mould", "mold", "die", "dies", "diecast", "die-cast", "injection", "stamping", "press tool", "presstool", "forging die", "punch"], "i:dies"],
    [["hob", "shaper", "gear cutting", "broach", "drill", "endmill", "end mill", "insert", "tap", "reamer", "cutting tool", "cutter", "milling"], "i:tools"],
    [["car", "automotive", "auto", "vehicle", "gearbox", "transmission", "engine", "piston", "ev "], "i:auto"],
    [["aerospace", "aircraft", "aviation", "defence", "defense", "military", "weapon"], "i:aero"],
    [["implant", "medical", "orthopaedic", "orthopedic", "surgical", "hospital", "dental"], "i:medical"],
    [["semiconductor", "wafer", "electronic", "chip"], "i:semi"],
    [["lens", "optic", "eyewear", "spectacle", "glass"], "i:optics"],
    [["watch", "jewel", "decorative", "sanitary", "faucet", "hardware finish", "colour", "color"], "i:watch"],
    [["job shop", "jobshop", "coating service", "coating centre", "coating center", "coater"], "i:jobshop"],
    [["steel", "forging", "metal", "heat treater", "alloy", "foundry"], "i:steel"],
    [["wind", "solar", "thermal power", "power plant", "power", "turbine"], "i:power"],
    [["oil", "gas", "valve", "pump", "drilling", "petro", "refinery"], "i:oilgas"],
    [["nitrid", "nitrocarbur", "ion nitr"], "p:nitride"],
    [["carburi", "case harden", "lpc"], "p:carburize"],
    [["harden", "quench", "anneal", "stress reliev", "sinter", "vacuum furnace", "furnace"], "p:harden"],
    [["temper"], "p:temper"],
    [["braz"], "p:braze"],
    [["cryo", "sub-zero", "subzero", "deep freez"], "p:cryo"],
    [["heat treat", "heat-treat", "thermal process"], "p:heat"],
    [["clean", "wash", "degreas", "ultrason", "pre-treat", "pretreat", "rinse", "dry"], "p:clean"],
    [["passivat"], "p:passivate"],
    [["fpi", "penetrant", "crack", "ndt", "inspection"], "p:inspect"],
    [["coat", "plating", "film", "surface treat"], "p:coat"],
    [["pvd", "arc", "sputter", "hipims", "tialn", "alcrn", "tin ", "physical vapour", "physical vapor"], "p:pvd"],
    [["dlc", "diamond-like", "diamond like", "ta-c", "tac", "low friction"], "p:dlc"],
    [["diamond", "hfcvd"], "p:diamond"],
    [["cvd", "aluminiz", "aluminis"], "p:cvd"],
    [["anti-reflect", "optical coat"], "p:optical"],
    [["turnkey", "plant", "complete line", "setup"], "p:turnkey"]
  ];

  function lev1(a, b) {
    if (Math.abs(a.length - b.length) > 1) return false;
    let i = 0, j = 0, d = 0;
    while (i < a.length && j < b.length) {
      if (a[i] === b[j]) { i++; j++; continue; }
      if (++d > 1) return false;
      if (a.length > b.length) i++;
      else if (b.length > a.length) j++;
      else { i++; j++; }
    }
    return d + (a.length - i) + (b.length - j) <= 1;
  }

  function understand(q) {
    const rawLower = (q || "").toLowerCase().trim();
    const text = " " + rawLower.replace(/[^a-z0-9\- ]/g, " ").replace(/\s+/g, " ") + " ";
    const words = text.trim().split(" ").filter(function (w) { return w.length > 0; });
    const inds = new Set(), procs = new Set(), used = new Set();
    SYN.forEach(function (pair) {
      const keys = pair[0], c = pair[1];
      keys.forEach(function (k) {
        const hit = k.includes(" ")
          ? text.includes(" " + k.trim())
          : words.some(function (w) {
            const ok = w.startsWith(k) ||
              (w.length >= 4 && k.startsWith(w)) ||
              (w.length >= 5 && k.length >= 4 && [k.length - 1, k.length, k.length + 1].some(function (L) { return lev1(w.slice(0, L), k); }));
            if (ok) used.add(w);
            return ok;
          });
        if (hit) {
          if (c[0] === "i") inds.add(c.slice(2));
          else procs.add(c.slice(2));
        }
      });
    });
    return {
      raw: rawLower,
      words: words,
      inds: Array.from(inds),
      procs: Array.from(procs),
      free: words.filter(function (w) { return !used.has(w); })
    };
  }

  const STEP_OF = function (p) {
    return ({ bmi: 1, novatec: 2, huasheng: 3 })[p.bid] || 1;
  };

  function scoreOf(p, u, rawLower) {
    let sc = 0, why = [];
    const blob = (p.n + " " + p.b + " " + p.f + " " + p.s + " " + p.k).toLowerCase();
    const pNameLower = p.n.toLowerCase();
    const pBrandLower = p.b.toLowerCase();
    const pCatLower = p.f.toLowerCase();

    // Carbide tooling: Carbide drills and tools are processed by Novatec (cleaning) and Huasheng (coating).
    // BMI vacuum furnaces do not process carbide tooling.
    const isCarbideSearch = u.procs.includes("carbide_tools") ||
      (rawLower && (rawLower.includes("carbide") || rawLower.includes("drill"))) ||
      u.words.some(function (w) { return w.includes("carbide") || w.includes("drill"); });
    if ((p.bid === "bmi" || (p.b && p.b.toLowerCase() === "bmi")) && isCarbideSearch) {
      return { sc: 0, why: [] };
    }

    // If query is a single character (letter/number), match products whose name OR category starts with that letter
    if (rawLower && rawLower.length === 1) {
      const ch = rawLower;
      const cleanName = pNameLower.replace(/^[^a-z0-9]+/i, "");
      const cleanCat = pCatLower.replace(/^[^a-z0-9]+/i, "");

      // 1. Machine name starts with this letter (top priority)
      if (cleanName.startsWith(ch)) {
        return { sc: 20, why: [] };
      }
      // 2. Category name starts with this letter
      if (cleanCat.startsWith(ch)) {
        return { sc: 15, why: [p.f] };
      }
      return { sc: 0, why: [] };
    }

    // Direct phrase / substring matches (case-insensitive)
    if (rawLower && rawLower.length > 1) {
      if (pNameLower.startsWith(rawLower)) {
        sc += 16;
      } else if (pNameLower.includes(rawLower)) {
        sc += 10;
      } else if (blob.includes(rawLower)) {
        sc += 6;
      }
    }

    u.inds.forEach(function (i) {
      if (p.i.includes(i)) {
        sc += 4;
        var indObj = IND.find(function (z) { return z.id === i; });
        if (indObj) why.push(indObj.n);
      }
    });

    let procHit = false;
    u.procs.forEach(function (pr) {
      if ((PROC[pr] || []).includes(p.mid)) {
        sc += 6;
        procHit = true;
        if (PROC_LABEL[pr]) why.push(PROC_LABEL[pr]);
      }
    });

    u.words.forEach(function (w) {
      if (pNameLower.startsWith(w)) sc += 6;
      else if (pNameLower.includes(w)) sc += 4;
      else if (blob.includes(w)) sc += 2;
    });

    // when both an application and a process are asked for, favour machines matching both
    if (u.procs.length && !procHit) {
      if (!blob.includes(rawLower) && !u.words.some(function (w) { return pNameLower.includes(w); })) {
        sc = 0;
      } else {
        sc = Math.max(1, sc - 3);
      }
    }
    if (u.inds.length && u.procs.length && !(u.inds.some(function (i) { return p.i.includes(i); }))) {
      if (!blob.includes(rawLower) && !u.words.some(function (w) { return pNameLower.includes(w); })) {
        sc = Math.min(sc, 1);
      }
    }
    return { sc: sc, why: Array.from(new Set(why)) };
  }

  /* ----------------------------------------------------------------
     Finder Controller
     ---------------------------------------------------------------- */
  (function initFinder() {
    let brand = "all", ind = null;
    const q = document.getElementById("q"),
      res = document.getElementById("results"),
      st = document.getElementById("ind-status"),
      fInd = document.getElementById("f-ind"),
      fCat = document.getElementById("f-cat");

    if (fInd) {
      fInd.innerHTML = '<option value="">All industries</option>' +
        IND.map(function (x) { return '<option value="' + x.id + '">' + esc(x.n) + '</option>'; }).join("");
    }

    function fillCats() {
      if (!fCat) return;
      const cur = fCat.value;
      const bs = CATALOG.filter(function (x) { return brand === "all" || x.name === brand; });
      fCat.innerHTML = '<option value="">All categories</option>' + bs.map(function (x) {
        return '<optgroup label="' + esc(x.name) + '">' + x.cats.map(function (c) {
          return '<option value="' + x.id + '/' + c.id + '">' + esc(c.name) + '</option>';
        }).join("") + '</optgroup>';
      }).join("");
      if (Array.from(fCat.options).some(function (o) { return o.value === cur; })) {
        fCat.value = cur;
      }
    }

    const thumbOf = function (p) {
      const o = [p._m, p._c, p._b].find(function (x) { return x && x.photo && PHOTOS[x.photo]; });
      return o ? PHOTOS[o.photo] : "";
    };

    function syncButtons() {
      document.querySelectorAll(".seg button").forEach(function (x) {
        x.setAttribute("aria-pressed", x.dataset.brand === brand);
      });
      const step = brand === "all" ? "all" : brand.toLowerCase();
      document.querySelectorAll(".steps button").forEach(function (x) {
        x.setAttribute("aria-pressed", x.dataset.step === step);
      });
    }

    function render() {
      if (!res) return;
      const raw = q ? q.value.trim() : "", rawLower = raw.toLowerCase(), cat = fCat ? fCat.value : "", u = understand(raw);
      const isCarbide = u.procs.includes("carbide_tools") ||
        (rawLower && (rawLower.includes("carbide") || rawLower.includes("drill"))) ||
        u.words.some(function (w) { return w.includes("carbide") || w.includes("drill"); });

      let list = IDX.filter(function (p) {
        if (isCarbide && (p.bid === "bmi" || (p.b && p.b.toLowerCase() === "bmi"))) {
          return false;
        }
        return (brand === "all" || p.b === brand) &&
          (!ind || p.i.includes(ind)) &&
          (!cat || (p.bid + "/" + p.cid) === cat);
      });
      let scored = list.map(function (p) {
        return Object.assign({ p: p }, raw ? scoreOf(p, u, rawLower) : { sc: 1, why: [] });
      }).filter(function (x) { return x.sc > 0; });

      if (raw && rawLower.length > 1) {
        const top = Math.max.apply(Math, [0].concat(scored.map(function (x) { return x.sc; })));
        scored = scored.filter(function (x) { return x.sc >= Math.min(3, top); });
      }

      scored.sort(function (a, b) {
        if (rawLower.length === 1) {
          return (b.sc - a.sc) || (STEP_OF(a.p) - STEP_OF(b.p));
        }
        return (STEP_OF(a.p) - STEP_OF(b.p)) || (b.sc - a.sc);
      });

      // Smart Fallback (Option 1): If 0 matches under active brand/filter, check across all brands
      let isFallback = false;
      let fallbackFromBrand = null;
      if (!scored.length && raw && (brand !== "all" || cat)) {
        let fallbackList = IDX.filter(function (p) {
          if (isCarbide && (p.bid === "bmi" || (p.b && p.b.toLowerCase() === "bmi"))) {
            return false;
          }
          return (!ind || p.i.includes(ind));
        });
        let fallbackScored = fallbackList.map(function (p) {
          return Object.assign({ p: p }, scoreOf(p, u, rawLower));
        }).filter(function (x) { return x.sc > 0; });

        if (rawLower.length > 1) {
          const fbTop = Math.max.apply(Math, [0].concat(fallbackScored.map(function (x) { return x.sc; })));
          fallbackScored = fallbackScored.filter(function (x) { return x.sc >= Math.min(3, fbTop); });
        }

        if (fallbackScored.length > 0) {
          isFallback = true;
          fallbackFromBrand = brand;
          scored = fallbackScored;
          scored.sort(function (a, b) {
            if (rawLower.length === 1) {
              return (b.sc - a.sc) || (STEP_OF(a.p) - STEP_OF(b.p));
            }
            return (STEP_OF(a.p) - STEP_OF(b.p)) || (b.sc - a.sc);
          });
        }
      }

      const rowHtml = function (x) {
        const p = x.p, th = thumbOf(p), lg = logo(p.bid);
        return '<a class="result" role="listitem" href="' + p.href + '">' +
          '<span class="r-th">' + (th ? '<img src="' + th + '" alt="" loading="lazy">' : '') + '</span>' +
          '<span class="r-main"><span class="n">' + esc(p.n) + '</span><span class="r-s">' +
          (x.why.length ? '<em class="r-why">For ' + esc(x.why.slice(0, 2).join(", ")) + '</em> ' : '') +
          esc(p.s) + '</span></span>' +
          '<span class="r-cat">' + esc(p.f) + '</span>' +
          '<span class="b">' + (lg ? '<img src="' + lg + '" alt="' + esc(p.b) + '">' : esc(p.b)) + '</span>' +
          '<span class="r-go" aria-hidden="true">›</span></a>';
      };

      let fallbackBanner = '';
      if (isFallback) {
        const otherBrandNames = Array.from(new Set(scored.map(function (x) { return x.p.b; }))).join(" & ");
        fallbackBanner = '<div class="brand-fallback-banner">' +
          '<div class="brand-fallback-msg">' +
          '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>' +
          '<span>No systems match <b>“' + esc(raw) + '”</b> under <b>' + esc(fallbackFromBrand !== "all" ? fallbackFromBrand : "selected filter") + '</b>. Showing <b>' + scored.length + '</b> matches from <b>' + esc(otherBrandNames) + '</b>:</span>' +
          '</div>' +
          '<button type="button" class="btn-switch-all-brands" id="switch-all-brands">' +
          '<span>Switch to all brands</span>' +
          '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>' +
          '</button>' +
          '</div>';
      }

      if (!scored.length) {
        res.innerHTML = '<div class="empty-state">' +
          '<p class="empty">No systems match your search or filters. Try an application such as “moulds”, “hobs” or “implants”, a process such as “nitriding” or “DLC”, or <a href="#contact">ask Greets</a>.</p>' +
          '<button type="button" class="btn-clear-filters" id="empty-clr">' +
          '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>' +
          '<span>Clear all filters</span></button>' +
          '</div>';
      } else if (raw) {
        const steps = [
          [1, "Harden", "BMI vacuum furnaces"],
          [2, "Clean", "Novatec cleaning systems"],
          [3, "Coat", "Huasheng coating equipment"]
        ];
        res.innerHTML = fallbackBanner + steps.map(function (stepArr) {
          const n = stepArr[0], v = stepArr[1], sub = stepArr[2];
          const g = scored.filter(function (x) { return STEP_OF(x.p) === n; });
          return g.length
            ? '<div class="r-group" role="presentation"><span class="bc-n">' + n + '</span> <b>' + v + '</b> <span>' + sub + '</span> <em>' + g.length + '</em></div>' + g.map(rowHtml).join("")
            : "";
        }).join("");
      } else {
        res.innerHTML = fallbackBanner + scored.map(rowHtml).join("");
      }

      const n = scored.length;
      let head = '<b>' + n + '</b> ' + (n === 1 ? 'system' : 'systems');
      if (raw && (u.inds.length || u.procs.length)) {
        const appl = u.inds.map(function (i) {
          var found = IND.find(function (z) { return z.id === i; });
          return found ? found.n : i;
        });
        const pr = u.procs.map(function (x) { return PROC_LABEL[x] || x; });
        const stepsHit = [1, 2, 3].filter(function (k) {
          return scored.some(function (x) { return STEP_OF(x.p) === k; });
        }).map(function (k) { return ["", "Harden", "Clean", "Coat"][k]; });
        head += ' for ' + esc(appl.concat(pr).join(" + ")) + (stepsHit.length > 1 ? ' <span class="route">Suggested route: ' + esc(stepsHit.join(" → ")) + '</span>' : '');
      } else if (raw) {
        head += ' for “' + esc(raw) + '”';
      }

      const active = [
        (brand !== "all" && !isFallback) ? brand : null,
        ind ? (IND.find(function (z) { return z.id === ind; }) || {}).n : null,
        (cat && fCat && fCat.selectedIndex >= 0 && !isFallback) ? fCat.options[fCat.selectedIndex].text : null
      ].filter(Boolean);

      if (active.length) {
        head += ' <span class="fchips">' + active.map(esc).join(", ") + '</span>';
      }
      if (raw || active.length || isFallback) {
        head += '<button type="button" id="clr">Reset filters</button>';
      }
      if (st) st.innerHTML = head;

      const resetAll = function () {
        brand = "all";
        ind = null;
        if (q) q.value = "";
        if (fInd) fInd.value = "";
        fillCats();
        if (fCat) fCat.value = "";
        syncButtons();
        render();
        if (q) q.focus();
      };

      const c = document.getElementById("clr");
      if (c) c.onclick = resetAll;
      const emptyClr = document.getElementById("empty-clr");
      if (emptyClr) emptyClr.onclick = resetAll;
      const switchBtn = document.getElementById("switch-all-brands");
      if (switchBtn) {
        switchBtn.onclick = function () {
          brand = "all";
          if (fCat) fCat.value = "";
          fillCats();
          syncButtons();
          render();
        };
      }
    }

    // Populate logo buttons
    document.querySelectorAll('.seg button[data-brand]:not([data-brand="all"])').forEach(function (bt) {
      const id = bt.dataset.brand.toLowerCase(), src = logo(id);
      if (src) {
        bt.innerHTML = '<img src="' + src + '" alt="' + esc(bt.dataset.brand) + '">';
        bt.classList.add("logo-btn");
      }
    });

    if (q) q.addEventListener("input", render);

    // Clear brand filter automatically when clicking an example term
    document.querySelectorAll(".qchip").forEach(function (c) {
      c.addEventListener("click", function () {
        brand = "all";
        ind = null;
        if (fInd) fInd.value = "";
        fillCats();
        if (fCat) fCat.value = "";
        syncButtons();
        if (q) {
          q.value = c.textContent.replace(/\s+/g, " ").trim();
          render();
          q.focus();
        }
      });
    });

    if (fInd) fInd.addEventListener("change", function () { ind = fInd.value || null; render(); });
    if (fCat) fCat.addEventListener("change", function () {
      if (fCat.value) {
        const bid = fCat.value.split("/")[0];
        const found = CATALOG.find(function (x) { return x.id === bid; });
        if (found) brand = found.name;
        syncButtons();
      }
      render();
    });

    document.querySelectorAll(".steps button").forEach(function (b) {
      b.addEventListener("click", function () {
        const s = b.dataset.step;
        if (s === "all") {
          brand = "all";
        } else {
          const found = CATALOG.find(function (x) { return x.id === s; });
          if (found) brand = found.name;
        }
        fillCats();
        syncButtons();
        render();
      });
    });

    document.querySelectorAll(".seg button").forEach(function (b) {
      b.addEventListener("click", function () {
        brand = b.dataset.brand;
        fillCats();
        syncButtons();
        render();
      });
    });

    const IND_ALIASES = {
      "cutting-tools": "tools",
      "cutting_tools": "tools",
      "tools": "tools",
      "cutting": "tools",
      "inserts": "tools",
      "jobshop": "jobshop",
      "job-shop": "jobshop",
      "dies": "dies",
      "moulds-dies": "dies",
      "moulds_dies": "dies",
      "moulds": "dies",
      "molds": "dies",
      "forming-tools": "dies",
      "precision-machining": "tools",
      "steel": "steel",
      "commercial-heat-treat": "steel",
      "heat-treat": "steel",
      "heattreat": "steel",
      "power": "power",
      "energy": "power",
      "oilgas": "oilgas",
      "oil-gas": "oilgas",
      "oil_gas": "oilgas",
      "oil": "oilgas",
      "gas": "oilgas",
      "auto": "auto",
      "automotive": "auto",
      "powertrain": "auto",
      "bearings-gears": "auto",
      "aero": "aero",
      "aerospace": "aero",
      "defence": "aero",
      "defense": "aero",
      "medical": "medical",
      "medical-devices": "medical",
      "medical_devices": "medical",
      "implants": "medical",
      "semi": "semi",
      "semiconductor": "semi",
      "electronics": "semi",
      "optics": "optics",
      "optical": "optics",
      "optical-components": "optics",
      "eyewear": "optics",
      "watch": "watch",
      "watches": "watch",
      "jewellery": "watch",
      "jewelry": "watch",
      "decorative": "watch"
    };

    function resolveInd(id) {
      if (!id) return null;
      var clean = String(id).toLowerCase().trim();
      if (IND_ALIASES[clean]) return IND_ALIASES[clean];
      var found = IND.find(function (x) { return x.id.toLowerCase() === clean; });
      return found ? found.id : null;
    }

    function scrollToFinder() {
      var finderSection = document.getElementById("finder");
      if (finderSection) {
        requestAnimationFrame(function () {
          var header = document.querySelector(".header");
          var headerHeight = header ? header.offsetHeight : 72;
          var card = finderSection.querySelector(".wrap.container") || finderSection;
          var y = card.getBoundingClientRect().top + window.pageYOffset - headerHeight - 16;
          window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
        });
      }
    }

    function checkUrlInd(shouldScroll) {
      var queryInd = "";
      try {
        var params = new URLSearchParams(window.location.search);
        queryInd = params.get("ind") || params.get("industry") || "";
      } catch (e) {
        var match = window.location.search.match(/[?&]ind=([^&]+)/);
        if (match) queryInd = decodeURIComponent(match[1]);
      }
      if (!queryInd && window.location.hash) {
        var hashMatch = window.location.hash.match(/[?&]ind=([^&]+)/);
        if (hashMatch) queryInd = decodeURIComponent(hashMatch[1]);
      }
      var resolved = resolveInd(queryInd);
      if (resolved) {
        ind = resolved;
        if (fInd) fInd.value = resolved;
        brand = "all";
        if (q) q.value = "";
        fillCats();
        if (fCat) fCat.value = "";
        syncButtons();
        render();
        if (shouldScroll) {
          setTimeout(scrollToFinder, 120);
        }
        return true;
      }
      return false;
    }

    // Clicking an industry card in the industries section filters the finder
    document.addEventListener("click", function (e) {
      var b = e.target.closest(".industry-card-v2[data-ind], .ind[data-ind], [data-ind]");
      if (b && b.dataset.ind) {
        e.preventDefault();
        var resolved = resolveInd(b.dataset.ind) || b.dataset.ind;
        ind = resolved;
        if (fInd) fInd.value = resolved;
        brand = "all";
        if (q) q.value = "";
        fillCats();
        if (fCat) fCat.value = "";
        syncButtons();
        render();
        scrollToFinder();
      }
    });

    fillCats();
    var hasUrlInd = checkUrlInd(true);
    if (!hasUrlInd) {
      render();
    }

    window.addEventListener("hashchange", function () { checkUrlInd(true); });
    window.addEventListener("popstate", function () { checkUrlInd(true); });
  })();

  /* ----------------------------------------------------------------
      Product & Industries mega menu & mobile navigation
      ---------------------------------------------------------------- */
  (function () {
    var mega = document.getElementById("mega");
    var megaBtn = document.getElementById("mega-btn");
    var megaInd = document.getElementById("mega-ind");
    var megaIndBtn = document.getElementById("mega-ind-btn");

    if (mega) {
      mega.innerHTML = '<div class="mega-grid">' + CATALOG.map(function (b) {
        return '<div><a class="mega-brand" href="' + b.id + '/">' +
          '<img src="' + logo(b.id) + '" alt="' + esc(b.name) + '"></a><ul>' +
          b.cats.map(function (c) {
            return '<li><a href="' + b.id + '/' + c.id + '/">' + esc(c.name) + '</a></li>';
          }).join("") +
          '</ul></div>';
      }).join("") + '</div>';
    }

    if (megaInd) {
      var cols = [
        { title: "Tooling & Metalworking", items: [IND[0], IND[1], IND[2], IND[3]] },
        { title: "Energy, Auto & Aerospace", items: [IND[4], IND[5], IND[6], IND[7]] },
        { title: "Precision, Medical & Optics", items: [IND[8], IND[9], IND[10], IND[11]] }
      ];

      megaInd.innerHTML = '<div class="mega-grid">' + cols.map(function (col) {
        return '<div>' +
          '<div class="mega-brand" style="font-weight:750; color:var(--lime, #02963C); font-size:0.92rem; align-items:center; min-height:52px; margin-bottom:10px;">' + esc(col.title) + '</div>' +
          '<ul>' +
          col.items.map(function (item) {
            return '<li><a href="#finder" data-ind="' + item.id + '">' +
              esc(item.n) +
              '</a></li>';
          }).join("") +
          '</ul></div>';
      }).join("") + '</div>';
    }

    function closeAllMega() {
      if (mega && !mega.hidden) {
        mega.hidden = true;
        if (megaBtn) megaBtn.setAttribute("aria-expanded", "false");
      }
      if (megaInd && !megaInd.hidden) {
        megaInd.hidden = true;
        if (megaIndBtn) megaIndBtn.setAttribute("aria-expanded", "false");
      }
    }

    function scrollToSection(targetId) {
      var target = document.getElementById(targetId);
      if (target) {
        if (history.pushState) {
          history.pushState(null, "", "#" + targetId);
          if (window.updateHomeBreadcrumbs) window.updateHomeBreadcrumbs();
        } else {
          window.location.hash = targetId;
        }
        var header = document.querySelector(".header");
        var headerHeight = header ? header.offsetHeight : 72;
        var y = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 16;
        window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
      }
    }

    if (mega && megaBtn && !megaBtn._hasMegaListener) {
      megaBtn._hasMegaListener = true;
      megaBtn.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (!mega.hidden) {
          closeAllMega();
          scrollToSection("finder");
          return;
        }
        closeAllMega();
        mega.hidden = false;
        megaBtn.setAttribute("aria-expanded", "true");
        scrollToSection("finder");
      });
    }

    if (megaInd && megaIndBtn && !megaIndBtn._hasMegaListener) {
      megaIndBtn._hasMegaListener = true;
      megaIndBtn.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (!megaInd.hidden) {
          closeAllMega();
          scrollToSection("industries");
          return;
        }
        closeAllMega();
        megaInd.hidden = false;
        megaIndBtn.setAttribute("aria-expanded", "true");
        scrollToSection("industries");
      });
    }

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeAllMega();
    });

    document.addEventListener("click", function (e) {
      if (e.target.closest("#mega-btn") || e.target.closest("#mega-ind-btn")) return;
      var isOutsideMega = mega && !mega.hidden && !mega.contains(e.target);
      var isOutsideInd = megaInd && !megaInd.hidden && !megaInd.contains(e.target);
      if (isOutsideMega || isOutsideInd) {
        closeAllMega();
      }
    });

    if (mega) {
      mega.addEventListener("click", function (e) {
        if (e.target.closest("a")) closeAllMega();
      });
    }
    if (megaInd) {
      megaInd.addEventListener("click", function (e) {
        if (e.target.closest("a")) closeAllMega();
      });
    }

    // Populate mobile products panel
    var mobPanel = document.getElementById("mobile-products-panel");
    if (mobPanel) {
      mobPanel.innerHTML = '<a href="#finder" class="mobile-all-products-link">' +
        '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>' +
        '<span>Find a system &mdash; All products</span>' +
        '</a>' +
        CATALOG.map(function (b) {
          return '<div class="mobile-brand-group">' +
            '<a class="mobile-brand-title" href="' + b.id + '/">' +
            (logo(b.id) ? '<img src="' + logo(b.id) + '" alt="' + esc(b.name) + '">' : '') +
            '<span>' + esc(b.name) + '</span>' +
            '</a>' +
            '<ul class="mobile-cat-list">' +
            b.cats.map(function (c) {
              return '<li><a href="' + b.id + '/' + c.id + '/">' + esc(c.name) + '</a></li>';
            }).join("") +
            '</ul></div>';
        }).join("");
    }

    // Populate mobile industries panel
    var mobIndPanel = document.getElementById("mobile-industries-panel");
    if (mobIndPanel) {
      var indCols = [
        { title: "Tooling & Metalworking", items: [IND[0], IND[1], IND[2], IND[3]] },
        { title: "Energy, Auto & Aerospace", items: [IND[4], IND[5], IND[6], IND[7]] },
        { title: "Precision, Medical & Optics", items: [IND[8], IND[9], IND[10], IND[11]] }
      ];

      mobIndPanel.innerHTML = '<a href="#industries" class="mobile-all-products-link">' +
        '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>' +
        '<span>Industries overview &mdash; All 12 sectors</span>' +
        '</a>' +
        indCols.map(function (col) {
          return '<div class="mobile-brand-group">' +
            '<div class="mobile-brand-title" style="color:var(--lime, #02963C); font-weight:750;">' +
            '<span>' + esc(col.title) + '</span>' +
            '</div>' +
            '<ul class="mobile-cat-list">' +
            col.items.map(function (item) {
              return '<li><a href="#finder" data-ind="' + item.id + '">' + esc(item.n) + '</a></li>';
            }).join("") +
            '</ul></div>';
        }).join("");
    }
  })();

  /* ----------------------------------------------------------------
      Header nav spy
      ---------------------------------------------------------------- */
  var SPY = {
    hero: "home",
    industries: "industries",
    finder: "products",
    bmi: "products",
    novatec: "products",
    huasheng: "products",
    why: "why",
    contact: "contact",
  };

  function moveInd() {
    var ind = document.getElementById("nav-ind");
    var g = document.getElementById("navgroup");
    if (!ind || !g) return;
    var a = g.querySelector("[data-spy].is-active");
    if (!a || a.offsetParent === null) {
      ind.style.opacity = 0;
      return;
    }
    var gr = g.getBoundingClientRect();
    var r = a.getBoundingClientRect();
    ind.style.opacity = 1;
    ind.style.width = r.width + "px";
    ind.style.height = r.height + "px";
    ind.style.transform = "translate(" + (r.left - gr.left) + "px," + (r.top - gr.top) + "px)";
  }

  function markNav(key) {
    document.querySelectorAll("[data-spy]").forEach(function (e) {
      var on = e.dataset.spy === key;
      e.classList.toggle("is-active", on);
      if (on && e.tagName === "A") e.setAttribute("aria-current", "true");
      else e.removeAttribute("aria-current");
    });
    moveInd();
  }

  window.addEventListener("resize", moveInd);
  if (document.fonts) document.fonts.ready.then(moveInd);

  function markMega() {
    var h = location.hash;
    document.querySelectorAll("#mega a").forEach(function (a) {
      var href = a.getAttribute("href");
      var on = h.startsWith("#/") && (h === href || h.startsWith(href + "/"));
      a.classList.toggle("is-current", on);
      if (on) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });
  }

  var spyLock = 0;
  var spyObs = null;

  function spyNow() {
    var mega = document.getElementById("mega");
    if (!mega.hidden) return;
    if (!view.hidden) {
      markNav("products");
      return;
    }
    var mid = window.innerHeight / 2;
    for (var i = 0; i < Object.keys(SPY).length; i++) {
      var id = Object.keys(SPY)[i];
      var el = document.getElementById(id);
      if (!el) continue;
      var r = el.getBoundingClientRect();
      if (r.top <= mid && r.bottom >= mid) {
        markNav(SPY[id]);
        return;
      }
    }
  }

  /* ----------------------------------------------------------------
      Scroll restoration
      ---------------------------------------------------------------- */
  history.scrollRestoration = "manual";
  var _st = 0;
  window.addEventListener("scroll", function () {
    if (_st) return;
    _st = setTimeout(function () {
      _st = 0;
      try { history.replaceState({ ...(history.state || {}), y: window.scrollY }, ""); } catch (e) { }
    }, 150);
  }, { passive: true });

  /* ----------------------------------------------------------------
      Initialise
      ---------------------------------------------------------------- */
  window.addEventListener("hashchange", function () {
    route();
    if (location.hash.startsWith("#/")) markNav("products");
    markMega();
  });

  /* initial load */
  markMega();
  route();

  /* header nav spy — watch section elements */
  spyObs = new IntersectionObserver(function (es) {
    if (!view.hidden || spyLock) return;
    var mega = document.getElementById("mega");
    if (!mega.hidden) return;
    es.forEach(function (e) {
      if (e.isIntersecting) markNav(SPY[e.target.id]);
    });
  }, { rootMargin: "-45% 0px -50% 0px" });

  Object.keys(SPY).forEach(function (id) {
    var el = document.getElementById(id);
    if (el) spyObs.observe(el);
  });

  document.querySelectorAll(".navgroup a[data-spy]").forEach(function (l) {
    l.addEventListener("click", function () {
      markNav(l.dataset.spy);
      clearTimeout(spyLock);
      spyLock = setTimeout(function () { spyLock = 0; }, 1000);
    });
  });

  window.addEventListener("scroll", spyNow);
})();
