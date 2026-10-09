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
    huasheng: "assets/Huasheng.png",
  };

  /* ----------------------------------------------------------------
     PHOTOS — asset paths (instead of base64 blobs from the reference)
     ---------------------------------------------------------------- */
  const PHOTOS = {
    /* BMI */
    b8t: "assets/catalog/b8t.jpg",
    vse8t: "assets/catalog/vse8t.jpg",
    bmi_brazing: "assets/catalog/bmi_brazing.jpg",
    bmi_low: "assets/catalog/bmi_low.jpg",
    bmi_oil: "assets/catalog/bmi_oil.jpg",
    bmi_thermo: "assets/catalog/bmi_thermo.jpg",
    bmi_brand: "assets/catalog/bmi_brand.jpg",
    /* Novatec */
    nov_main: "assets/catalog/nov_main.jpg",
    nov_gen: "assets/catalog/nov_gen.jpg",
    nm_pluri: "assets/catalog/nm_pluri.jpg",
    nm_implants: "assets/catalog/nm_implants.jpg",
    nm_fpi: "assets/catalog/nm_fpi.jpg",
    /* Huasheng */
    hs_pvd: "assets/catalog/hs_pvd.jpg",
    hs_dlc: "assets/catalog/hs_dlc.jpg",
    hs_diamond: "assets/catalog/hs_diamond.jpg",
    hs_mc1000: "assets/catalog/hs_mc1000.jpg",
    hs_optical: "assets/catalog/hs_mc1000.jpg",
    hs_md1500: "assets/catalog/hs_md1500.jpg",
    hs_cvd: "assets/catalog/hs_md1500.jpg",
    hs_md: "assets/catalog/hs_md.jpg",
    ma800: "assets/catalog/hs_md.jpg",
    turnkey: "assets/catalog/turnkey.jpg",
    cleanline: "assets/catalog/cleanline.jpg",
    crd_green: "assets/catalog/crd_green.jpg",
    lineup: "assets/catalog/hs_pvd.jpg",
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
    "photo": "bmi_brand",
    "photoAlt": "BMI vacuum furnace installation",
    "name": "BMI",
    "full": "Fours Industriels B.M.I.",
    "country": "France",
    "site": "https://www.bmi-fours.com",
    "intro": "French designer & manufacturer since 1947 and specialist in vacuum for more than 50 years. Vacuum furnaces for hardening, brazing, tempering and thermochemical treatment, designed and built in France.",
    "cats": [
      {
        "id": "gas-quenching",
        "photo": "bmi_thermo",
        "photoAlt": "BMI vacuum furnace with pumping system",
        "name": "Gas quenching furnaces",
        "sub": "Hardening, brazing and laboratory furnaces",
        "desc": "Vacuum furnaces that heat parts without oxidation and then cool them with high-pressure gas. BMI's patented rotating gas-flow system gives uniform quenching even on dense or complex loads.",
        "url": "https://www.bmi-fours.com/products/#gas-quenching",
        "machines": [
          {
            "id": "b8t",
            "photo": "b8t",
            "photoAlt": "BMI horizontal vacuum gas quenching furnace",
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
              "Graphite, molybdenum or fibre hot zones",
              "Clean vacuum heat treatment with zero intergranular oxidation (no IGO)"
            ],
            "specs": [
              [
                "Working zone",
                "450 × 450 × 600 mm to 1,000 × 1,000 × 1,500 mm"
              ],
              [
                "Load capacity",
                "200 to 2,000 kg"
              ],
              [
                "Maximum temperature",
                "1250 °C to 1600 °C"
              ],
              [
                "Vacuum level",
                "5 × 10⁻² mbar (high vacuum options available)"
              ],
              [
                "Quench pressure",
                "5 bar to 12 bar abs"
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
            "photo": "vse8t",
            "photoAlt": "BMI vertical vacuum furnace",
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
              "Graphite, molybdenum or fibre hot zones",
              "Treatment of massive loads and elongated parts with minimal distortion"
            ],
            "specs": [
              [
                "Working zone",
                "Ø 600 × 600 mm to Ø 1,500 × 2,000 mm"
              ],
              [
                "Load capacity",
                "300 to 3,000 kg"
              ],
              [
                "Maximum temperature",
                "1250 °C to 1600 °C"
              ],
              [
                "Vacuum level",
                "5 × 10⁻² mbar"
              ],
              [
                "Quench pressure",
                "5 bar to 12 bar abs"
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
            "photo": "bmi_brazing",
            "photoAlt": "BMI vacuum furnace with loading truck",
            "name": "Vacuum brazing furnace",
            "bmi_desc": "HIGH TEMPERATURE VACUUM BRAZING FURNACE",
            "short": "Oxide-free brazing of assemblies.",
            "desc": "Vacuum furnace for brazing assemblies in a clean, oxide-free atmosphere, used widely in aerospace and for high-value components where joint quality matters.",
            "features": [
              "Oxide-free brazing under vacuum",
              "Controlled heating and cooling",
              "Suited to nickel and other brazing alloys",
              "Cost-effective alternative to a quenching furnace with reduced cycle times",
              "Very Large Furnace options (titanium fuselage stress relieving)"
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
            "name": "Compact laboratory furnace",
            "bmi_desc": "HIGH TEMPERATURE COMPACT VACUUM FURNACE (BMICRO) & BFIRST HIGH TEMPERATURE VACUUM FURNACE – Vacuum Hardening & Gas Quenching Furnaces",
            "short": "Small vacuum furnace for R&D and process development.",
            "desc": "A compact vacuum furnace for laboratories, universities and R&D departments, for developing and validating heat-treatment cycles before scaling up to production.",
            "features": [
              "Compact footprint",
              "Vacuum heat treatment at laboratory scale",
              "Process development and testing",
              "Versatile furnace supporting full vacuum thermal cycles"
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
        "photo": "bmi_oil",
        "photoAlt": "BMI vacuum furnace installation",
        "name": "Oil quenching furnaces",
        "sub": "Horizontal and vertical",
        "desc": "Vacuum furnaces with an integrated oil quench for steels that need a faster quench than gas can provide.",
        "url": "https://www.bmi-fours.com/products/#oil-quenching",
        "machines": [
          {
            "id": "oil-horizontal",
            "tag": "Horizontal",
            "name": "Vacuum oil quenching furnace, horizontal",
            "bmi_desc": "OIL QUENCHING VACUUM FURNACE",
            "short": "Vacuum heating with an integrated oil quench.",
            "desc": "Horizontal vacuum furnace with an integrated oil quench tank, for steels and part sections that need a more severe quench than gas.",
            "features": [
              "Vacuum heating without oxidation",
              "Integrated oil quench",
              "Horizontal loading",
              "Quick & stable transfer to the oil bath",
              "Oil bath parameters completely adjustable to suit parts geometry & steel grade",
              "Zero intergranular corrosion (no IGO)"
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
            "tag": "Vertical",
            "name": "Vacuum oil quenching furnace, vertical",
            "bmi_desc": "OIL QUENCHING VACUUM FURNACE",
            "short": "For long parts quenched hanging.",
            "desc": "Vertical vacuum oil quenching furnace for long parts that must be quenched hanging to limit distortion.",
            "features": [
              "Vertical loading",
              "Integrated oil quench",
              "Reduced distortion on long parts (shafts, broaches, landing gear)",
              "Vacuum heating without oxidation",
              "Quick & stable transfer to the oil bath",
              "Completely adjustable oil bath parameters"
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
        "photo": "bmi_low",
        "photoAlt": "BMI vacuum furnaces on the shop floor",
        "name": "Low-temperature furnaces",
        "sub": "Tempering and aluminium brazing",
        "desc": "Vacuum furnaces for lower-temperature processes such as tempering after hardening and brazing aluminium assemblies.",
        "url": "https://www.bmi-fours.com/products/#low-temperature",
        "machines": [
          {
            "id": "tempering",
            "name": "Vacuum tempering furnace",
            "bmi_desc": "VACUUM PURGE TEMPERING FURNACE",
            "short": "Tempering after hardening.",
            "desc": "Vacuum tempering furnace for tempering hardened parts with clean surfaces and uniform temperature through the load.",
            "features": [
              "Vacuum or protective atmosphere",
              "Uniform load temperature and perfect temperature homogeneity",
              "Clean, bright surfaces",
              "Compact design with reduced cycle times"
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
            "name": "Aluminium brazing vacuum furnace",
            "bmi_desc": "VACUUM ALUMINIUM BRAZING FURNACE",
            "short": "For heat exchangers and aluminium assemblies.",
            "desc": "Vacuum furnace for fluxless brazing of aluminium assemblies such as heat exchangers.",
            "features": [
              "Fluxless aluminium brazing under high vacuum",
              "Tight temperature uniformity across multiple zones",
              "Superior joint integrity and surface finish",
              "No flux required, eliminating contamination and post-process cleaning"
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
        "photo": "bmi_thermo",
        "photoAlt": "BMI vacuum furnace with pumping system",
        "name": "Thermochemical treatment furnaces",
        "sub": "Carburizing, nitriding and sub-zero",
        "desc": "Furnaces and BMI's own processes for changing the surface chemistry of steel parts, such as carburizing and nitriding, plus sub-zero treatment.",
        "url": "https://www.bmi-fours.com/products/#process",
        "machines": [
          {
            "id": "allcarb",
            "name": "ALLCARB® low-pressure carburizing",
            "short": "Case hardening for gears and transmission parts.",
            "desc": "BMI's ALLCARB® low-pressure carburizing process, run in its vacuum furnaces, case-hardens steel parts such as gears and transmission components without intergranular oxidation.",
            "features": [
              "Low-pressure (vacuum) carburizing",
              "No intergranular oxidation (zero IGO)",
              "Can be combined with high-pressure gas quenching",
              "Deep, uniform carbon penetration in blind holes and narrow root fillets"
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
            "name": "ALLNIT® low-pressure nitriding",
            "short": "Nitriding for wear and fatigue resistance.",
            "desc": "BMI's ALLNIT® low-pressure nitriding process for improving wear and fatigue resistance of steel parts and tools.",
            "features": [
              "Low-pressure nitriding",
              "Controlled nitrided layer (combination layer and diffusion depth)",
              "Clean process with low gas consumption",
              "Uniform treatment on complex geometries"
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
            "name": "Plasma nitriding furnace",
            "tag": "Vertical",
            "bmi_desc": "PLASMA NITRIDING FURNACE",
            "short": "Ion nitriding for tools, dies and engineering parts.",
            "desc": "Plasma (ion) nitriding furnace for tools, dies and engineering components. Delivers precise case depth and surface hardness control with zero white layer or controlled compound layer for dies, moulds, automotive gearing, and precision tools.",
            "features": [
              "Plasma-assisted nitriding with pulsed DC glow discharge",
              "Selective treatment possible with mechanical masking",
              "Cold-wall design for excellent thermal control",
              "Clean process, free from ammonia emissions",
              "Fully automated operation for cycle consistency and reproducibility"
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
            "name": "COOL PLUS sub-zero treatment furnace",
            "short": "Cryogenic treatment of hardened steels.",
            "desc": "The COOL PLUS vacuum furnace performs sub-zero cryogenic treatment, stabilising hardened steels by converting retained austenite.",
            "features": [
              "Sub-zero cryogenic treatment down to -140 °C / -180 °C",
              "Dimensional stabilisation of precision components",
              "Elimination of retained austenite to maximize hardness and wear resistance",
              "Seamless inline transition between quenching and tempering"
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
    "photo": "nov_main",
    "photoAlt": "Novatec PLURITANK multi-chamber ultrasonic cleaning line",
    "name": "Novatec",
    "full": "Novatec S.r.l., San Martino di Lupari (Padova)",
    "country": "Italy",
    "site": "https://novatec.it/en",
    "intro": "Industrial ultrasonic cleaning systems engineered, built and tested in Italy since 1993.",
    "cats": [
      {
        "id": "pluritank",
        "photo": "nov_main",
        "photoAlt": "Novatec PLURITANK multi-chamber cleaning line",
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
            "photo": "nm_pluri",
            "photoAlt": "Novatec PLURITANK automatic ultrasonic cleaning system",
            "gallery": [
              [
                "nm_pluri",
                "PLURITANK automatic ultrasonic cleaning system"
              ],
              [
                "lineup",
                "PLURITANK line in a production area"
              ]
            ],
            "name": "PLURITANK multi-tank ultrasonic cleaning line",
            "short": "Configurable modular multi-tank range from 50 to 1,500 litres, up to 14 process stations.",
            "desc": "Modular multi-tank ultrasonic cleaning line. Built from separate process modules — ultrasonic immersion or spray cleaning, cascade rinsing, hot air and vacuum drying — configured to the exact volume and stages the job needs. Range from 50 to 1,500 litres per tank with up to 14 process stations. Stainless steel throughout, PLC and HMI control, automatic basket handling from 10 kg to 300 kg and above.",
            "features": [
              "Modular, up to 12 stages, with room for future hardware and software upgrades",
              "Multi-frequency ultrasonic groups",
              "User-friendly HMI with multiple programs",
              "Data exchange and traceability",
              "AISI 304/316 stainless construction",
              "Factory acceptance test with your sample parts",
              "Modular tank volumes from 50 to 1,500 litres with automatic basket handling"
            ],
            "specs": [
              [
                "Platform",
                "PLURITANK modular multi-tank ultrasonic cleaning line"
              ],
              [
                "Tank volume range",
                "Configurable from 50 to 1,500 litres per tank (built to order)"
              ],
              [
                "Process stations",
                "Up to 14 process stations, custom configurable"
              ],
              [
                "Process stages",
                "Ultrasonic immersion or spray cleaning, cascade rinsing, hot air and vacuum drying"
              ],
              [
                "Basket handling",
                "Automatic handling from 10 kg to 300 kg and above"
              ],
              [
                "Construction",
                "AISI 304/316 stainless steel throughout"
              ],
              [
                "Control",
                "PLC and HMI touch control with multi-recipe programming"
              ],
              [
                "Configuration",
                "Custom built to job volume and process requirement (no fixed catalogue model numbers)"
              ],
              [
                "Typical applications",
                "Cleaning tools and components before PVD coating and other vacuum treatments. Final cleaning before sterilisation and packing"
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
            "models": [
              {
                "family": "PLURITANK",
                "model": "PLURITANK 50",
                "chamber": "300 × 400 × 420 h (50 L)",
                "size": "Not published",
                "load": "Not published",
                "notes": "Standard tank size",
                "source": "Novatec PVD brochure"
              },
              {
                "family": "PLURITANK",
                "model": "PLT 60V",
                "chamber": "60 L",
                "size": "Not published",
                "load": "Not published",
                "notes": "Two-chamber pressure-cycle unit, listed under Components",
                "source": "Novatec website"
              },
              {
                "family": "PLURITANK",
                "model": "PLURITANK 65",
                "chamber": "330 × 490 × 400 deep (65 L)",
                "size": "approx. 9150 × 4550 × 2880 h",
                "load": "50 kg per basket",
                "notes": "9 process stages. Basket 260 × 390 × 320 h.",
                "source": "Novatec specification"
              },
              {
                "family": "PLURITANK",
                "model": "PLURITANK 80",
                "chamber": "400 × 500 × 400 h (80 L)",
                "size": "Not published",
                "load": "Not published",
                "notes": "Standard tank size",
                "source": "Novatec PVD brochure"
              },
              {
                "family": "PLURITANK",
                "model": "PLURITANK 110",
                "chamber": "400 × 500 × 550 h (110 L)",
                "size": "Not published",
                "load": "Not published",
                "notes": "Standard tank size",
                "source": "Novatec PVD brochure"
              },
              {
                "family": "PLURITANK",
                "model": "PLURITANK 140",
                "chamber": "140 L",
                "size": "Not published",
                "load": "120 kg per basket",
                "notes": "Basket 340 × 490 × 450 h. 5 baskets per hour, up to 10 with two robots.",
                "source": "Novatec specification"
              },
              {
                "family": "PLURITANK",
                "model": "PLURITANK 140 EP",
                "chamber": "140 L",
                "size": "Not published",
                "load": "Not published",
                "notes": "Electropolishing line for medical implants. Adds electropolish, neutralisation and recovery rinsing stages.",
                "source": "Novatec specification"
              },
              {
                "family": "PLURITANK",
                "model": "PLURITANK 210",
                "chamber": "500 × 700 × 600 h (210 L)",
                "size": "Not published",
                "load": "Not published",
                "notes": "Standard tank size",
                "source": "Novatec PVD brochure"
              },
              {
                "family": "PLURITANK",
                "model": "PLURITANK 1400",
                "chamber": "700 × 1200 × 1650 h (approx. 1386 L)",
                "size": "19500 × 7000 (line footprint)",
                "load": "Not published",
                "notes": "14 process stations. Basket 540 × 1090 × 1540 h.",
                "source": "Novatec GA drawing 5298.3.0-26CO"
              },
              {
                "family": "PLURITANK",
                "model": "PLURITANK 1500",
                "chamber": "approx. 1500 L",
                "size": "16550 × 7725, 3585 h",
                "load": "Not published",
                "notes": "12 process stations",
                "source": "Novatec GA drawing 5183.4.0-24CO"
              }
            ]
          },
          {
            "id": "pre-pvd",
            "name": "PLURITANK pre-treatment line for PVD coating",
            "short": "Surface preparation before PVD, CVD and DLC (50 to 1,500 L).",
            "desc": "A PLURITANK line configured to prepare tools and components for coating. Configurable from 50 to 1,500 litres per tank. Ultrasonic cleaning followed by rinsing and drying removes residues so the coating bonds reliably, batch after batch.",
            "features": [
              "Reproducible pre-coating cleanliness for maximum film adhesion",
              "Multi-stage ultrasonic cleaning, cascade rinsing and vacuum drying cycles",
              "Matched to coating plant batch capacity (50 to 1,500 litres)",
              "Stain-free, residue-free surface preparation before vacuum treatment"
            ],
            "specs": [
              [
                "Platform",
                "PLURITANK modular multi-tank line"
              ],
              [
                "Tank volume",
                "50 to 1,500 litres per station (configured to job)"
              ],
              [
                "Process stages",
                "Ultrasonic cleaning, cascade DI rinsing, vacuum drying"
              ],
              [
                "Typical applications",
                "Cleaning tools and components before PVD coating, CVD, and DLC"
              ]
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
            "models": [
              {
                "family": "PLURITANK",
                "model": "PLURITANK 50",
                "chamber": "300 × 400 × 420 h (50 L)",
                "size": "Not published",
                "load": "Not published",
                "notes": "Standard tank size",
                "source": "Novatec PVD brochure"
              },
              {
                "family": "PLURITANK",
                "model": "PLT 60V",
                "chamber": "60 L",
                "size": "Not published",
                "load": "Not published",
                "notes": "Two-chamber pressure-cycle unit, listed under Components",
                "source": "Novatec website"
              },
              {
                "family": "PLURITANK",
                "model": "PLURITANK 65",
                "chamber": "330 × 490 × 400 deep (65 L)",
                "size": "approx. 9150 × 4550 × 2880 h",
                "load": "50 kg per basket",
                "notes": "9 process stages. Basket 260 × 390 × 320 h.",
                "source": "Novatec specification"
              },
              {
                "family": "PLURITANK",
                "model": "PLURITANK 80",
                "chamber": "400 × 500 × 400 h (80 L)",
                "size": "Not published",
                "load": "Not published",
                "notes": "Standard tank size",
                "source": "Novatec PVD brochure"
              },
              {
                "family": "PLURITANK",
                "model": "PLURITANK 110",
                "chamber": "400 × 500 × 550 h (110 L)",
                "size": "Not published",
                "load": "Not published",
                "notes": "Standard tank size",
                "source": "Novatec PVD brochure"
              },
              {
                "family": "PLURITANK",
                "model": "PLURITANK 140",
                "chamber": "140 L",
                "size": "Not published",
                "load": "120 kg per basket",
                "notes": "Basket 340 × 490 × 450 h. 5 baskets per hour, up to 10 with two robots.",
                "source": "Novatec specification"
              },
              {
                "family": "PLURITANK",
                "model": "PLURITANK 140 EP",
                "chamber": "140 L",
                "size": "Not published",
                "load": "Not published",
                "notes": "Electropolishing line for medical implants. Adds electropolish, neutralisation and recovery rinsing stages.",
                "source": "Novatec specification"
              },
              {
                "family": "PLURITANK",
                "model": "PLURITANK 210",
                "chamber": "500 × 700 × 600 h (210 L)",
                "size": "Not published",
                "load": "Not published",
                "notes": "Standard tank size",
                "source": "Novatec PVD brochure"
              },
              {
                "family": "PLURITANK",
                "model": "PLURITANK 1400",
                "chamber": "700 × 1200 × 1650 h (approx. 1386 L)",
                "size": "19500 × 7000 (line footprint)",
                "load": "Not published",
                "notes": "14 process stations. Basket 540 × 1090 × 1540 h.",
                "source": "Novatec GA drawing 5298.3.0-26CO"
              },
              {
                "family": "PLURITANK",
                "model": "PLURITANK 1500",
                "chamber": "approx. 1500 L",
                "size": "16550 × 7725, 3585 h",
                "load": "Not published",
                "notes": "12 process stations",
                "source": "Novatec GA drawing 5183.4.0-24CO"
              }
            ]
          },
          {
            "id": "cleanroom",
            "photo": "nm_implants",
            "photoAlt": "Novatec cleaning line for cleanroom use",
            "name": "Cleanroom precision cleaning line",
            "short": "Low-particle cleaning for semiconductor and medical (50 to 1,500 L).",
            "desc": "Precision cleaning for semiconductor hardware, vacuum-chamber parts and medical devices. Configurable from 50 to 1,500 litres. Cleanroom Class 7 design is available, with ultrapure water rinsing and documentation for validated processes.",
            "features": [
              "Cleanroom class 7 design available",
              "Ultrapure water rinsing (18 MΩ·cm)",
              "IQ/OQ/PQ documentation for medical and high-purity applications",
              "Final cleaning before cleanroom packaging and sterilisation"
            ],
            "specs": [
              [
                "Platform",
                "PLURITANK cleanroom-configured multi-tank line"
              ],
              [
                "Tank volume range",
                "50 to 1,500 litres per station"
              ],
              [
                "Cleanroom class",
                "Class 7 (10,000) available"
              ],
              [
                "Water",
                "Ultrapure (18 MΩ·cm)"
              ],
              [
                "Validation",
                "IQ/OQ/PQ documentation available"
              ],
              [
                "Typical applications",
                "Final cleaning before sterilisation and packing; semiconductor & medical components"
              ]
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
            "models": [
              {
                "family": "PLURITANK",
                "model": "PLURITANK 50",
                "chamber": "300 × 400 × 420 h (50 L)",
                "size": "Not published",
                "load": "Not published",
                "notes": "Standard tank size",
                "source": "Novatec PVD brochure"
              },
              {
                "family": "PLURITANK",
                "model": "PLT 60V",
                "chamber": "60 L",
                "size": "Not published",
                "load": "Not published",
                "notes": "Two-chamber pressure-cycle unit, listed under Components",
                "source": "Novatec website"
              },
              {
                "family": "PLURITANK",
                "model": "PLURITANK 65",
                "chamber": "330 × 490 × 400 deep (65 L)",
                "size": "approx. 9150 × 4550 × 2880 h",
                "load": "50 kg per basket",
                "notes": "9 process stages. Basket 260 × 390 × 320 h.",
                "source": "Novatec specification"
              },
              {
                "family": "PLURITANK",
                "model": "PLURITANK 80",
                "chamber": "400 × 500 × 400 h (80 L)",
                "size": "Not published",
                "load": "Not published",
                "notes": "Standard tank size",
                "source": "Novatec PVD brochure"
              },
              {
                "family": "PLURITANK",
                "model": "PLURITANK 110",
                "chamber": "400 × 500 × 550 h (110 L)",
                "size": "Not published",
                "load": "Not published",
                "notes": "Standard tank size",
                "source": "Novatec PVD brochure"
              },
              {
                "family": "PLURITANK",
                "model": "PLURITANK 140",
                "chamber": "140 L",
                "size": "Not published",
                "load": "120 kg per basket",
                "notes": "Basket 340 × 490 × 450 h. 5 baskets per hour, up to 10 with two robots.",
                "source": "Novatec specification"
              },
              {
                "family": "PLURITANK",
                "model": "PLURITANK 140 EP",
                "chamber": "140 L",
                "size": "Not published",
                "load": "Not published",
                "notes": "Electropolishing line for medical implants. Adds electropolish, neutralisation and recovery rinsing stages.",
                "source": "Novatec specification"
              },
              {
                "family": "PLURITANK",
                "model": "PLURITANK 210",
                "chamber": "500 × 700 × 600 h (210 L)",
                "size": "Not published",
                "load": "Not published",
                "notes": "Standard tank size",
                "source": "Novatec PVD brochure"
              },
              {
                "family": "PLURITANK",
                "model": "PLURITANK 1400",
                "chamber": "700 × 1200 × 1650 h (approx. 1386 L)",
                "size": "19500 × 7000 (line footprint)",
                "load": "Not published",
                "notes": "14 process stations. Basket 540 × 1090 × 1540 h.",
                "source": "Novatec GA drawing 5298.3.0-26CO"
              },
              {
                "family": "PLURITANK",
                "model": "PLURITANK 1500",
                "chamber": "approx. 1500 L",
                "size": "16550 × 7725, 3585 h",
                "load": "Not published",
                "notes": "12 process stations",
                "source": "Novatec GA drawing 5183.4.0-24CO"
              }
            ]
          }
        ]
      },
      {
        "id": "2crd",
        "photo": "crd_green",
        "photoAlt": "Novatec 2CRD single-chamber precision cleaning system",
        "name": "Vacuum precision cleaning",
        "sub": "2CRD one-chamber systems with rotating basket, 8 sizes",
        "desc": "One-chamber system for precision cleaning under vacuum. Cleaning, rinsing and drying all happen in a single chamber, fed from three filtered buffer tanks. Available static, or with rotation and tilting.",
        "url": "https://novatec.it/en/2crd-vacuum-cleaning",
        "machines": [
          {
            "id": "2crd-system",
            "photo": "crd_green",
            "photoAlt": "Novatec 2CRD single-chamber precision cleaning system",
            "gallery": [
              [
                "crd_green",
                "2CRD single-chamber precision cleaning system"
              ],
              [
                "nm_implants",
                "Implants in a cleaning basket"
              ]
            ],
            "name": "2CRD vacuum precision cleaning system",
            "short": "One-chamber system for precision cleaning under vacuum.",
            "desc": "One-chamber system for precision cleaning under vacuum. Cleaning, rinsing and drying all happen in a single chamber, fed from three filtered buffer tanks. Available static, or with rotation and tilting.",
            "features": [
              "Single chamber: clean, rinse and vacuum dry",
              "Ultrasonic cleaning combined with vacuum processes",
              "Cleans blind and tapped holes and porous-coated surfaces",
              "Rotating and tilting basket options (-ROT)",
              "Compact footprint, 8 standard sizes plus custom variants up to 2CRD1700",
              "Three filtered buffer tanks for closed-loop fluid management"
            ],
            "specs": [
              [
                "Chamber",
                "One chamber under vacuum, rotating basket"
              ],
              [
                "Buffer tanks",
                "3 filtered buffer tanks"
              ],
              [
                "Movement",
                "Available static, or with rotation and tilting (-ROT)"
              ],
              [
                "Standard variants",
                "8 models: 2CRD-100, 200, 400, 800 (Static & -ROT)"
              ],
              [
                "Extended sizes",
                "Built to order up to 2CRD1700"
              ],
              [
                "Process",
                "Cleaning, rinsing and vacuum drying in one chamber"
              ],
              [
                "Ultrasonics",
                "Multi-frequency with vacuum assistance"
              ],
              [
                "Typical applications",
                "Blind and tapped holes, porous coated surfaces and complex geometries. Removing polishing pastes and oils"
              ]
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
                "load": "Not published",
                "notes": "Static",
                "source": "Novatec 2CRD brochure"
              },
              {
                "family": "2CRD",
                "model": "2CRD-100-ROT",
                "chamber": "300 × 400 × 300 h",
                "size": "1800 × 1800 × 2100 h",
                "load": "Not published",
                "notes": "Rotation and tilting",
                "source": "Novatec website"
              },
              {
                "family": "2CRD",
                "model": "2CRD-200",
                "chamber": "400 × 600 × 430 h",
                "size": "2600 × 2000 × 2100 h",
                "load": "Not published",
                "notes": "Static",
                "source": "Novatec 2CRD brochure"
              },
              {
                "family": "2CRD",
                "model": "2CRD-200-ROT",
                "chamber": "400 × 600 × 430 h",
                "size": "2600 × 2000 × 2100 h",
                "load": "Not published",
                "notes": "Rotation and tilting",
                "source": "Novatec website"
              },
              {
                "family": "2CRD",
                "model": "2CRD-400",
                "chamber": "Not published",
                "size": "approx. 3200 × 2000 × 2100 h",
                "load": "Not published",
                "notes": "Static",
                "source": "Novatec GA drawing 2CRD400"
              },
              {
                "family": "2CRD",
                "model": "2CRD-400-ROT",
                "chamber": "Not published",
                "size": "approx. 3200 × 2000 × 2100 h",
                "load": "Not published",
                "notes": "Rotation and tilting",
                "source": "Novatec website"
              },
              {
                "family": "2CRD",
                "model": "2CRD-800",
                "chamber": "600 × 1050 × 630 h",
                "size": "3500 × 2000 × 2200 h",
                "load": "Not published",
                "notes": "Static",
                "source": "Novatec 2CRD brochure"
              },
              {
                "family": "2CRD",
                "model": "2CRD-800-ROT",
                "chamber": "600 × 1050 × 630 h",
                "size": "3500 × 2000 × 2200 h",
                "load": "Not published",
                "notes": "Rotation and tilting",
                "source": "Novatec website"
              },
              {
                "family": "2CRD",
                "model": "2CRD1700",
                "chamber": "800 × 1200 × 820 h",
                "size": "4300 × 2100 × 2380 h, plus electrical board",
                "load": "1000 kg",
                "notes": "Built to order, above the standard range. Ultrasonic 9600 / 19200 W.",
                "source": "Novatec technical description"
              }
            ],
            "url": "https://novatec.it/en/2crd-vacuum-cleaning",
            "k": "precision cleaning vacuum drying blind holes 2crd 2crd100 2crd200 2crd400 2crd800 2crd1700 rot rotation tilting implants polishing paste buffer tanks",
            "i": [
              "medical",
              "semi",
              "watch",
              "auto"
            ]
          }
        ]
      },
      {
        "id": "medical-implants",
        "photo": "nm_implants",
        "photoAlt": "Orthopaedic implants cleaned on Novatec systems",
        "name": "Medical implant processing",
        "sub": "IPC, FCS/FCPS, PFC, FPI, QVS/BRC, EP & turnkey plants",
        "desc": "Complete cleaning and surface treatment systems for orthopaedic and medical implant manufacturing. Built to the customer's specification, from in-process machining wash to cleanroom air lock passivation, FPI inspection, electropolishing, and full turnkey lines.",
        "url": "https://novatec.it/en/products",
        "machines": [
          {
            "id": "ipc",
            "photo": "nm_implants",
            "photoAlt": "Novatec IPC in-process cleaning system for implants",
            "gallery": [
              [
                "nm_implants",
                "Implants in a cleaning basket"
              ],
              [
                "crd_green",
                "2CRD400 one-chamber vacuum system"
              ]
            ],
            "name": "IPC in-process cleaning",
            "tag": "One-chamber or in-line",
            "short": "Cleaning between production processes (2CRD or PLURITANK).",
            "desc": "Cleaning between production processes. Supplied either as a one-chamber system (2CRD) or as an in-line system (PLURITANK).",
            "features": [
              "One-chamber 2CRD vacuum systems or in-line PLURITANK systems",
              "Ultrasonic cleaning combined with vacuum processes",
              "Handles blind and tapped holes and porous-coated surfaces",
              "Multi-frequency ultrasonic groups",
              "Data exchange and traceability",
              "Modular for future hardware and software upgrades",
              "Removes polishing pastes, machining oils and particulate residues"
            ],
            "specs": [
              [
                "Execution",
                "One-chamber system (2CRD) or in-line system (PLURITANK)"
              ],
              [
                "Process",
                "Degreasing, ultrasonic cleaning, rinsing, vacuum drying"
              ],
              [
                "Traceability",
                "Data exchange and logging"
              ],
              [
                "Typical applications",
                "Medical implants between manufacturing steps"
              ]
            ],
            "process": [
              "Medical implants between manufacturing steps",
              "Removing polishing pastes and oils",
              "Cleaning after grinding and blasting"
            ],
            "url": "https://novatec.it/en/products",
            "k": "ipc in-process cleaning implants orthopaedic polishing paste 2crd pluritank manufacturing steps",
            "i": [
              "medical"
            ],
            "models": [
              {
                "family": "2CRD",
                "model": "2CRD-100",
                "chamber": "300 × 400 × 300 h",
                "size": "1800 × 1800 × 2100 h",
                "load": "Not published",
                "notes": "Static",
                "source": "Novatec 2CRD brochure"
              },
              {
                "family": "2CRD",
                "model": "2CRD-100-ROT",
                "chamber": "300 × 400 × 300 h",
                "size": "1800 × 1800 × 2100 h",
                "load": "Not published",
                "notes": "Rotation and tilting",
                "source": "Novatec website"
              },
              {
                "family": "2CRD",
                "model": "2CRD-200",
                "chamber": "400 × 600 × 430 h",
                "size": "2600 × 2000 × 2100 h",
                "load": "Not published",
                "notes": "Static",
                "source": "Novatec 2CRD brochure"
              },
              {
                "family": "2CRD",
                "model": "2CRD-200-ROT",
                "chamber": "400 × 600 × 430 h",
                "size": "2600 × 2000 × 2100 h",
                "load": "Not published",
                "notes": "Rotation and tilting",
                "source": "Novatec website"
              },
              {
                "family": "2CRD",
                "model": "2CRD-400",
                "chamber": "Not published",
                "size": "approx. 3200 × 2000 × 2100 h",
                "load": "Not published",
                "notes": "Static",
                "source": "Novatec GA drawing 2CRD400"
              },
              {
                "family": "2CRD",
                "model": "2CRD-400-ROT",
                "chamber": "Not published",
                "size": "approx. 3200 × 2000 × 2100 h",
                "load": "Not published",
                "notes": "Rotation and tilting",
                "source": "Novatec website"
              },
              {
                "family": "2CRD",
                "model": "2CRD-800",
                "chamber": "600 × 1050 × 630 h",
                "size": "3500 × 2000 × 2200 h",
                "load": "Not published",
                "notes": "Static",
                "source": "Novatec 2CRD brochure"
              },
              {
                "family": "2CRD",
                "model": "2CRD-800-ROT",
                "chamber": "600 × 1050 × 630 h",
                "size": "3500 × 2000 × 2200 h",
                "load": "Not published",
                "notes": "Rotation and tilting",
                "source": "Novatec website"
              },
              {
                "family": "2CRD",
                "model": "2CRD1700",
                "chamber": "800 × 1200 × 820 h",
                "size": "4300 × 2100 × 2380 h, plus electrical board",
                "load": "1000 kg",
                "notes": "Built to order, above the standard range. Ultrasonic 9600 / 19200 W.",
                "source": "Novatec technical description"
              }
            ]
          },
          {
            "id": "fcps",
            "photo": "nm_fpi",
            "photoAlt": "Novatec final cleaning line with unload air lock to cleanroom",
            "gallery": [
              [
                "nm_fpi",
                "Final cleaning line in a cleanroom"
              ],
              [
                "nm_implants",
                "Transfer through the line"
              ],
              [
                "crd_green",
                "Unloading into the cleanroom"
              ]
            ],
            "name": "FCS / FCPS final cleaning and passivation",
            "tag": "Cleanroom air lock",
            "short": "Final cleaning, or combined final cleaning and passivation, into cleanroom.",
            "desc": "Final cleaning, or combined final cleaning and passivation, with an unload air lock into the cleanroom.",
            "features": [
              "Final cleaning, or combined final cleaning and passivation (FCS / FCPS)",
              "Unload air lock directly into the cleanroom",
              "Support with final qualification (IQ, OQ)",
              "Material and calibration certificates included",
              "Multi-frequency ultrasonic groups",
              "Data exchange and traceability",
              "Removes particulate and bioburden before sterilisation"
            ],
            "specs": [
              [
                "Variants",
                "FCS (final cleaning) / FCPS (final cleaning + passivation)"
              ],
              [
                "Cleanroom interface",
                "Unload air lock into cleanroom"
              ],
              [
                "Validation",
                "IQ / OQ qualification support"
              ],
              [
                "Documentation",
                "Material and calibration certificates"
              ],
              [
                "Typical applications",
                "Removing dust and handling residues before sterilisation and packing in a cleanroom"
              ]
            ],
            "process": [
              "Final cleaning before sterilisation and packing",
              "Citric / nitric passivation",
              "Cleanroom air lock unload",
              "Ultrapure water rinsing"
            ],
            "url": "https://novatec.it/en/products",
            "k": "fcs fcps final cleaning passivation cleanroom air lock implants sterilisation packing",
            "i": [
              "medical"
            ],
            "models": [
              {
                "family": "PLURITANK",
                "model": "PLURITANK 50",
                "chamber": "300 × 400 × 420 h (50 L)",
                "size": "Not published",
                "load": "Not published",
                "notes": "Standard tank size",
                "source": "Novatec PVD brochure"
              },
              {
                "family": "PLURITANK",
                "model": "PLT 60V",
                "chamber": "60 L",
                "size": "Not published",
                "load": "Not published",
                "notes": "Two-chamber pressure-cycle unit, listed under Components",
                "source": "Novatec website"
              },
              {
                "family": "PLURITANK",
                "model": "PLURITANK 65",
                "chamber": "330 × 490 × 400 deep (65 L)",
                "size": "approx. 9150 × 4550 × 2880 h",
                "load": "50 kg per basket",
                "notes": "9 process stages. Basket 260 × 390 × 320 h.",
                "source": "Novatec specification"
              },
              {
                "family": "PLURITANK",
                "model": "PLURITANK 80",
                "chamber": "400 × 500 × 400 h (80 L)",
                "size": "Not published",
                "load": "Not published",
                "notes": "Standard tank size",
                "source": "Novatec PVD brochure"
              },
              {
                "family": "PLURITANK",
                "model": "PLURITANK 110",
                "chamber": "400 × 500 × 550 h (110 L)",
                "size": "Not published",
                "load": "Not published",
                "notes": "Standard tank size",
                "source": "Novatec PVD brochure"
              },
              {
                "family": "PLURITANK",
                "model": "PLURITANK 140",
                "chamber": "140 L",
                "size": "Not published",
                "load": "120 kg per basket",
                "notes": "Basket 340 × 490 × 450 h. 5 baskets per hour, up to 10 with two robots.",
                "source": "Novatec specification"
              },
              {
                "family": "PLURITANK",
                "model": "PLURITANK 140 EP",
                "chamber": "140 L",
                "size": "Not published",
                "load": "Not published",
                "notes": "Electropolishing line for medical implants. Adds electropolish, neutralisation and recovery rinsing stages.",
                "source": "Novatec specification"
              },
              {
                "family": "PLURITANK",
                "model": "PLURITANK 210",
                "chamber": "500 × 700 × 600 h (210 L)",
                "size": "Not published",
                "load": "Not published",
                "notes": "Standard tank size",
                "source": "Novatec PVD brochure"
              },
              {
                "family": "PLURITANK",
                "model": "PLURITANK 1400",
                "chamber": "700 × 1200 × 1650 h (approx. 1386 L)",
                "size": "19500 × 7000 (line footprint)",
                "load": "Not published",
                "notes": "14 process stations. Basket 540 × 1090 × 1540 h.",
                "source": "Novatec GA drawing 5298.3.0-26CO"
              },
              {
                "family": "PLURITANK",
                "model": "PLURITANK 1500",
                "chamber": "approx. 1500 L",
                "size": "16550 × 7725, 3585 h",
                "load": "Not published",
                "notes": "12 process stations",
                "source": "Novatec GA drawing 5183.4.0-24CO"
              }
            ]
          },
          {
            "id": "pfc",
            "photo": "nm_implants",
            "photoAlt": "Novatec PFC spray cleaning system",
            "name": "PFC spray cleaning system",
            "tag": "Spray cleaning",
            "short": "Spray cleaning system with unload air lock to cleanroom.",
            "desc": "Spray cleaning system with unload air lock to cleanroom.",
            "features": [
              "High-impact spray cleaning system",
              "Unload air lock directly into the cleanroom",
              "Integrated filtration and cascade rinsing",
              "Dedicated for medical implant lines"
            ],
            "specs": [
              [
                "Technology",
                "Aqueous spray cleaning with filtration"
              ],
              [
                "Cleanroom interface",
                "Unload air lock to cleanroom"
              ],
              [
                "Typical applications",
                "Medical implant lines"
              ]
            ],
            "process": [
              "Medical implant lines",
              "Spray cleaning",
              "Cleanroom air lock unload"
            ],
            "url": "https://novatec.it/en/products",
            "k": "pfc spray cleaning system air lock cleanroom medical implant lines",
            "i": [
              "medical"
            ]
          },
          {
            "id": "fpi",
            "photo": "nm_fpi",
            "photoAlt": "3D layout of a Novatec PLURITANK FPI line",
            "gallery": [
              [
                "nm_fpi",
                "Parts under UV inspection"
              ],
              [
                "crd_green",
                "FPI line installation"
              ],
              [
                "nm_implants",
                "Automated FPI line"
              ]
            ],
            "name": "FPI fluorescent penetrant inspection line",
            "tag": "PLURITANK FPI",
            "short": "Combined cleaning, preparation and FPI treatment in one line.",
            "desc": "Combined ultrasonic cleaning, surface preparation and FPI treatment in one automated line, built on the PLURITANK platform.",
            "features": [
              "Cleaning, preparation and FPI in one automated line",
              "Reveals flaws, cracks and fatigue signs",
              "Automated part transfer for high throughput and repeatability",
              "Custom-designed to customer specification and ASTM standards"
            ],
            "specs": [
              [
                "Platform",
                "PLURITANK automated line"
              ],
              [
                "Inspection process",
                "Combined ultrasonic cleaning, preparation and FPI inspection"
              ],
              [
                "Detection",
                "Fluorescent penetrant, UV inspection for crack and flaw detection"
              ],
              [
                "Typical applications",
                "Revealing flaws, cracks and fatigue signs on medical implants"
              ]
            ],
            "process": [
              "Revealing flaws, cracks and fatigue signs",
              "Fluorescent penetrant inspection",
              "Medical implants & aerospace parts"
            ],
            "url": "https://novatec.it/en/products",
            "k": "fpi fluorescent penetrant inspection ndt cracks fatigue flaws implants pluritank",
            "i": [
              "medical",
              "aero"
            ]
          },
          {
            "id": "qvs-brc",
            "photo": "nm_implants",
            "photoAlt": "Novatec QVS and BRC automation modules",
            "name": "QVS / BRC quality verification & basket return conveyor",
            "tag": "Automation",
            "short": "Quality verification stations and basket return air lock conveyor.",
            "desc": "Quality verification stations, and basket return air lock conveyor. The modules that link a combined medical line together.",
            "features": [
              "QVS: Quality verification stations",
              "BRC: Basket return air lock conveyor",
              "The modules that link a combined medical line together",
              "Part of a full automatic medical implant line",
              "Automated barcode/RFID tracking and data exchange"
            ],
            "specs": [
              [
                "Components",
                "QVS (Quality verification stations) & BRC (Basket return air lock conveyor)"
              ],
              [
                "Function",
                "Links combined medical cleaning and passivation lines into one continuous automated system"
              ],
              [
                "Typical applications",
                "Part of a full automatic medical implant line"
              ]
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
            ]
          },
          {
            "id": "ep",
            "photo": "nm_implants",
            "photoAlt": "Novatec PLURITANK electropolishing line",
            "name": "Electropolishing line (EP)",
            "tag": "PLURITANK EP",
            "short": "Electropolishing line built on PLURITANK platform.",
            "desc": "An electropolishing line built on the PLURITANK platform, adding an electropolish tank plus neutralisation and recovery rinsing.",
            "features": [
              "Electropolishing line built on the PLURITANK platform",
              "Adds dedicated electropolish tank plus neutralisation and recovery rinsing",
              "Multi-stage cascade DI water rinsing and drying",
              "Delivers burr-free, passivated, micro-smooth implant surfaces"
            ],
            "specs": [
              [
                "Platform",
                "PLURITANK platform with electropolish station"
              ],
              [
                "Process tanks",
                "Electropolish bath, neutralisation tank, cascade recovery rinsing, drying"
              ],
              [
                "Materials",
                "Stainless steel and titanium medical implants"
              ],
              [
                "Typical applications",
                "Stainless steel and titanium medical implants"
              ]
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
            "models": [
              {
                "family": "PLURITANK",
                "model": "PLURITANK 65",
                "chamber": "330 × 490 × 400 deep (65 L)",
                "size": "approx. 9150 × 4550 × 2880 h",
                "load": "50 kg per basket",
                "notes": "9 process stages. Basket 260 × 390 × 320 h.",
                "source": "Novatec specification"
              },
              {
                "family": "PLURITANK",
                "model": "PLURITANK 140",
                "chamber": "140 L",
                "size": "Not published",
                "load": "120 kg per basket",
                "notes": "Basket 340 × 490 × 450 h. 5 baskets per hour, up to 10 with two robots.",
                "source": "Novatec specification"
              },
              {
                "family": "PLURITANK",
                "model": "PLURITANK 140 EP",
                "chamber": "140 L",
                "size": "Not published",
                "load": "Not published",
                "notes": "Electropolishing line for medical implants. Adds electropolish, neutralisation and recovery rinsing stages.",
                "source": "Novatec specification"
              },
              {
                "family": "PLURITANK",
                "model": "PLURITANK 210",
                "chamber": "500 × 700 × 600 h (210 L)",
                "size": "Not published",
                "load": "Not published",
                "notes": "Standard tank size",
                "source": "Novatec PVD brochure"
              },
              {
                "family": "PLURITANK",
                "model": "PLURITANK 1400",
                "chamber": "700 × 1200 × 1650 h (approx. 1386 L)",
                "size": "19500 × 7000 (line footprint)",
                "load": "Not published",
                "notes": "14 process stations. Basket 540 × 1090 × 1540 h.",
                "source": "Novatec GA drawing 5298.3.0-26CO"
              }
            ]
          },
          {
            "id": "combined",
            "photo": "nm_implants",
            "photoAlt": "Layout of a combined Novatec implant cleaning project",
            "gallery": [
              [
                "nm_implants",
                "Implants in custom baskets"
              ]
            ],
            "name": "Custom combined implant lines, built to the customer's specification",
            "tag": "Custom engineered",
            "short": "Complete automated implant cleaning plant built to customer specification.",
            "desc": "For larger projects Novatec designs the whole cleaning area to the customer's specification, linking the individual systems with conveyors and full automatic management. A typical line includes automatic basket loading with scanners and RFID, IPC one-chamber vacuum systems, quality verification stations (QVS), a combined final cleaning and passivation system (FCPS), spray cleaning (PFC) with an unload air lock, and a basket return conveyor (BRC), all with data exchange for traceability.",
            "features": [
              "Automatic basket loading station with scanners and RFID",
              "IPC one-chamber vacuum systems (2CRD)",
              "QVS quality verification stations",
              "FCPS final cleaning and passivation with air lock to cleanroom",
              "PFC spray cleaning system with unload air lock",
              "BRC basket return air-lock conveyor",
              "Full automatic management and data exchange for traceability"
            ],
            "specs": [
              [
                "Scope",
                "Complete cleaning area, built to customer specification"
              ],
              [
                "Components",
                "Basket loading, IPC, QVS, FCPS, PFC, BRC"
              ],
              [
                "Automation",
                "Full automatic with conveyors and cleanroom air locks"
              ],
              [
                "Traceability",
                "Data exchange and batch logging"
              ],
              [
                "Typical applications",
                "Turnkey automated plants for orthopaedic & medical implant manufacturing"
              ]
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
            "models": [
              {
                "family": "PLURITANK",
                "model": "PLURITANK 50",
                "chamber": "300 × 400 × 420 h (50 L)",
                "size": "Not published",
                "load": "Not published",
                "notes": "Standard tank size",
                "source": "Novatec PVD brochure"
              },
              {
                "family": "PLURITANK",
                "model": "PLT 60V",
                "chamber": "60 L",
                "size": "Not published",
                "load": "Not published",
                "notes": "Two-chamber pressure-cycle unit, listed under Components",
                "source": "Novatec website"
              },
              {
                "family": "PLURITANK",
                "model": "PLURITANK 65",
                "chamber": "330 × 490 × 400 deep (65 L)",
                "size": "approx. 9150 × 4550 × 2880 h",
                "load": "50 kg per basket",
                "notes": "9 process stages. Basket 260 × 390 × 320 h.",
                "source": "Novatec specification"
              },
              {
                "family": "PLURITANK",
                "model": "PLURITANK 80",
                "chamber": "400 × 500 × 400 h (80 L)",
                "size": "Not published",
                "load": "Not published",
                "notes": "Standard tank size",
                "source": "Novatec PVD brochure"
              },
              {
                "family": "PLURITANK",
                "model": "PLURITANK 110",
                "chamber": "400 × 500 × 550 h (110 L)",
                "size": "Not published",
                "load": "Not published",
                "notes": "Standard tank size",
                "source": "Novatec PVD brochure"
              },
              {
                "family": "PLURITANK",
                "model": "PLURITANK 140",
                "chamber": "140 L",
                "size": "Not published",
                "load": "120 kg per basket",
                "notes": "Basket 340 × 490 × 450 h. 5 baskets per hour, up to 10 with two robots.",
                "source": "Novatec specification"
              },
              {
                "family": "PLURITANK",
                "model": "PLURITANK 140 EP",
                "chamber": "140 L",
                "size": "Not published",
                "load": "Not published",
                "notes": "Electropolishing line for medical implants. Adds electropolish, neutralisation and recovery rinsing stages.",
                "source": "Novatec specification"
              },
              {
                "family": "PLURITANK",
                "model": "PLURITANK 210",
                "chamber": "500 × 700 × 600 h (210 L)",
                "size": "Not published",
                "load": "Not published",
                "notes": "Standard tank size",
                "source": "Novatec PVD brochure"
              },
              {
                "family": "PLURITANK",
                "model": "PLURITANK 1400",
                "chamber": "700 × 1200 × 1650 h (approx. 1386 L)",
                "size": "19500 × 7000 (line footprint)",
                "load": "Not published",
                "notes": "14 process stations. Basket 540 × 1090 × 1540 h.",
                "source": "Novatec GA drawing 5298.3.0-26CO"
              },
              {
                "family": "PLURITANK",
                "model": "PLURITANK 1500",
                "chamber": "approx. 1500 L",
                "size": "16550 × 7725, 3585 h",
                "load": "Not published",
                "notes": "12 process stations",
                "source": "Novatec GA drawing 5183.4.0-24CO"
              }
            ]
          }
        ]
      },
      {
        "id": "components",
        "photo": "nov_gen",
        "photoAlt": "Novatec ultrasonic generators",
        "name": "Components",
        "sub": "Generators, transducers and PLT 60V",
        "desc": "Generators and transducers, including the PLT 60V two-chamber pressure-cycle unit. Multi-frequency ultrasonic groups.",
        "url": "https://novatec.it/en/ultrasonic-components",
        "machines": [
          {
            "id": "generators",
            "photo": "nov_gen",
            "photoAlt": "Novatec ultrasonic generators",
            "gallery": [
              [
                "nov_gen",
                "Immersible ultrasonic transducers"
              ]
            ],
            "name": "Ultrasonic generators and transducers",
            "short": "Generators and transducers, multi-frequency ultrasonic groups.",
            "desc": "Generators and transducers, including the PLT 60V two-chamber pressure-cycle unit. Multi-frequency ultrasonic groups.",
            "features": [
              "Generators and transducers",
              "For new tanks or retrofits",
              "Multi-frequency ultrasonic groups",
              "Digital generators with automatic frequency tuning",
              "Supplied with the lines, or separately"
            ],
            "specs": [
              [
                "Scope",
                "Digital ultrasonic generators and immersible transducers"
              ],
              [
                "Frequencies",
                "Multi-frequency ultrasonic groups"
              ],
              [
                "Supply options",
                "Supplied with the lines, or separately for new tanks or retrofits"
              ],
              [
                "Typical applications",
                "Supplied with the lines, or separately"
              ]
            ],
            "process": [
              "Ultrasonic cleaning",
              "Tank retrofit and upgrade",
              "Multi-frequency ultrasound"
            ],
            "url": "https://novatec.it/en/ultrasonic-components",
            "k": "generators transducers ultrasonic components multi-frequency",
            "i": []
          },
          {
            "id": "plt60v",
            "name": "PLT 60V two-chamber pressure-cycle unit",
            "short": "Two-chamber pressure-cycle unit for internal channels.",
            "desc": "The PLT 60V two-chamber pressure-cycle unit uses pressure cycling to clean internal channels and cavities that ultrasound alone struggles to reach.",
            "features": [
              "Pressure-cycle cleaning",
              "Reaches internal channels and cavities that ultrasound alone struggles to reach",
              "Two-chamber pressure-cycle unit",
              "Effective on complex hydraulic blocks and medical cannulations",
              "Supplied with the lines, or separately"
            ],
            "specs": [
              [
                "Chamber configuration",
                "Two-chamber pressure-cycle unit (60 L)"
              ],
              [
                "Process",
                "Pressure-change cleaning for internal channels"
              ],
              [
                "Supply options",
                "Supplied with the lines, or separately"
              ],
              [
                "Typical applications",
                "Internal channels, cavities and complex geometries"
              ]
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
                "size": "Not published",
                "load": "Not published",
                "notes": "Two-chamber pressure-cycle unit, listed under Components",
                "source": "Novatec website"
              }
            ],
            "url": "https://novatec.it/en/ultrasonic-components",
            "k": "plt60v pressure cleaning internal channels two-chamber",
            "i": [
              "auto",
              "medical"
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "huasheng",
    "photo": "lineup",
    "photoAlt": "Huasheng coating machine lineup",
    "name": "Huasheng",
    "full": "Guangdong Huasheng Nanotechnology Co., Ltd.",
    "country": "China",
    "site": "https://www.hscoat.com",
    "intro": "PVD arc, HiPIMS, hybrid, ta-C DLC and HFCVD diamond coating equipment, plus complete turnkey coating plants.",
    "cats": [
      {
        "id": "pvd",
        "photo": "hs_pvd",
        "photoAlt": "Huasheng PVD coating machines",
        "name": "PVD coating equipment",
        "sub": "Arc, HiPIMS, hybrid and broach systems",
        "desc": "Physical vapour deposition systems for hard, wear-resistant coatings on cutting tools, moulds and precision components.",
        "url": "https://www.hscoat.com/pvd-coating-equipment/",
        "machines": [
          {
            "id": "gfour",
            "photo": "hs_pvd",
            "photoAlt": "Huasheng GFOUR hybrid coating machine",
            "name": "GFOUR 4th-generation hybrid coating machine",
            "tag": "Hybrid PVD",
            "short": "Controllable plasma and thick coatings up to 30 µm.",
            "desc": "4th-generation hybrid coating platform with four targets, controllable plasma, adjustable square wave and ionisation rate. Coating thickness 0.5–30 µm.",
            "features": [
              "Smooth, droplet-free surface finish",
              "Excellent film adhesion",
              "2 µm/h high deposition rate",
              "Thick coatings up to 30 µm without re-sharpening",
              "Four targets with controllable plasma and adjustable square wave"
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
            ]
          },
          {
            "id": "md200",
            "photo": "hs_md",
            "photoAlt": "Huasheng MD200 arc coating machine",
            "name": "MD200 arc coating machine",
            "tag": "Arc ion plating",
            "short": "Compact arc coater for small-batch cutting-tool production.",
            "desc": "Arc ion plating range for cutting tool production, using Huasheng's lateral etching and multi-arc ion plating. Four sizes from MD200 up to MD1500.",
            "features": [
              "High deposition rate and high ionisation rate",
              "Ultra-high impact resistance of coatings",
              "Fully automatic operation with lateral etching",
              "MD800 PLUS and MD1500 accommodate hobbing tools (D80 × L150)",
              "MD800 PLUS sits at the centre of the turnkey coating plant; MD1500 handles 72 hobbing tools and 1,000 kg/batch"
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
            ]
          },
          {
            "id": "md500",
            "photo": "hs_md",
            "photoAlt": "Huasheng MD500 arc coating machine",
            "name": "MD500 arc coating machine",
            "tag": "Arc ion plating",
            "short": "Mid-size arc coater for serial cutting-tool production.",
            "desc": "Arc ion plating range for cutting tool production, using Huasheng's lateral etching and multi-arc ion plating. Four sizes from MD200 up to MD1500.",
            "features": [
              "High deposition rate and high ionisation rate",
              "Ultra-high impact resistance of coatings",
              "Fully automatic operation with lateral etching",
              "MD800 PLUS and MD1500 accommodate hobbing tools (D80 × L150)",
              "MD800 PLUS sits at the centre of the turnkey coating plant; MD1500 handles 72 hobbing tools and 1,000 kg/batch"
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
            ]
          },
          {
            "id": "md800",
            "name": "MD800 PLUS arc coating machine",
            "tag": "Arc coating",
            "photo": "hs_md",
            "photoAlt": "Huasheng MD800 PLUS arc coating machine",
            "gallery": [
              [
                "hs_md",
                "Huasheng MD series coating machine"
              ]
            ],
            "short": "Centre of turnkey coating plant, takes hobbing tools (D80 × L150).",
            "desc": "Arc ion plating range for cutting tool production, using Huasheng's lateral etching and multi-arc ion plating. Four sizes from MD200 up to MD1500.",
            "features": [
              "High deposition rate and high ionisation rate",
              "Ultra-high impact resistance of coatings",
              "Fully automatic operation with lateral etching",
              "MD800 PLUS and MD1500 accommodate hobbing tools (D80 × L150)",
              "MD800 PLUS sits at the centre of the turnkey coating plant; MD1500 handles 72 hobbing tools and 1,000 kg/batch"
            ],
            "specs": [
              [
                "Technology",
                "Arc ion plating (AIP)"
              ],
              [
                "Operation",
                "Fully automatic PLC + touch HMI"
              ],
              [
                "Coating technology",
                "Arc ion plating (8 arc sources)"
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
                "10 trees (12,000 inserts / 3,600 tools / 30 hobs)"
              ],
              [
                "Max. load",
                "500 kg (Spindle Ø130 mm)"
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
            ]
          },
          {
            "id": "md1500",
            "photo": "hs_md1500",
            "photoAlt": "Line drawing of Huasheng MD1500 layout",
            "gallery": [
              [
                "hs_md1500",
                "Line drawing of Huasheng MD1500 machine layout"
              ]
            ],
            "name": "MD1500 high-capacity vertical arc coating machine",
            "tag": "Heavy production",
            "short": "Production machine for gear cutting tools: 72 hobs and 1000 kg per batch.",
            "desc": "Arc ion plating range for cutting tool production, using Huasheng's lateral etching and multi-arc ion plating. Four sizes from MD200 up to MD1500.",
            "features": [
              "High deposition rate and high ionisation rate",
              "Ultra-high impact resistance of coatings",
              "Fully automatic operation with lateral etching",
              "MD800 PLUS and MD1500 accommodate hobbing tools (D80 × L150)",
              "MD800 PLUS sits at the centre of the turnkey coating plant; MD1500 handles 72 hobbing tools and 1,000 kg/batch"
            ],
            "specs": [
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
                "Power supply",
                "3 × 380/220 V (3L+N+PE), 3 × 300 A, 170 kW, 50/60 Hz"
              ],
              [
                "Average consumption",
                "About 120 kW/h, roughly 6 hours per batch"
              ],
              [
                "Cooling water",
                "5–5.5 bar at 22–24 °C; max heat discharge about 90 kW; flow 120 L/min; ullage 10 L per batch"
              ],
              [
                "Compressed air",
                "5–6.5 bar"
              ],
              [
                "Process gas",
                "Ar / N₂ / H₂ at 1.0–1.2 bar, minimum purity 99.992%"
              ],
              [
                "Gas per batch",
                "Ar 350 L, N₂ 1100 L, ordinary N₂ 1000 L"
              ],
              [
                "Room required",
                "8100 × 5500 mm, keeping an 800 mm safety passage around the machine"
              ],
              [
                "Arc source power supply",
                "HDP400: 73 V, 12 kW, 0.1–500 Hz, duty cycle 5–95%, 50–300 A"
              ]
            ],
            "site_reqs": [
              [
                "Power supply",
                "3 × 380/220 V (3L+N+PE), 3 × 300 A, 170 kW, 50/60 Hz"
              ],
              [
                "Average consumption",
                "About 120 kW/h, roughly 6 hours per batch"
              ],
              [
                "Cooling water",
                "5–5.5 bar at 22–24 °C; max heat discharge about 90 kW; flow 120 L/min; ullage 10 L per batch"
              ],
              [
                "Compressed air",
                "5–6.5 bar"
              ],
              [
                "Process gas",
                "Ar / N₂ / H₂ at 1.0–1.2 bar, minimum purity 99.992%"
              ],
              [
                "Gas per batch",
                "Ar 350 L, N₂ 1100 L, ordinary N₂ 1000 L"
              ],
              [
                "Room required",
                "8100 × 5500 mm, keeping an 800 mm safety passage around the machine"
              ],
              [
                "Arc source power supply",
                "HDP400: 73 V, 12 kW, 0.1–500 Hz, duty cycle 5–95%, 50–300 A"
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
            ]
          },
          {
            "id": "hd500",
            "photo": "hs_pvd",
            "photoAlt": "Huasheng HD500 hybrid coating machine",
            "name": "HD500 hybrid arc + HiPIMS coating machine",
            "tag": "Hybrid HiPIMS",
            "short": "30% performance gain over arc alone, for stainless steel & titanium.",
            "desc": "Hybrid platform combining high-ionisation sputtering with arc processes.",
            "features": [
              "30% performance gain over arc alone",
              "Ultra-low friction coefficient",
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
            ]
          },
          {
            "id": "hd800",
            "photo": "hs_pvd",
            "photoAlt": "Huasheng HD800 hybrid coating machine",
            "name": "HD800 hybrid arc + HiPIMS coating machine",
            "tag": "Hybrid HiPIMS",
            "short": "High-capacity hybrid platform for hard-to-machine materials.",
            "desc": "Hybrid platform combining high-ionisation sputtering with arc processes.",
            "features": [
              "30% performance gain over arc alone",
              "Ultra-low friction coefficient",
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
            ]
          },
          {
            "id": "wcc800",
            "photo": "hs_pvd",
            "photoAlt": "Huasheng WCC800 sputtering machine",
            "name": "WCC800 DC + HiPIMS magnetron sputtering machine",
            "tag": "HiPIMS sputtering",
            "short": "Universal wear-resistant coating system using DC + HiPIMS.",
            "desc": "Universal wear-resistant coating system using DC + HiPIMS magnetron sputtering.",
            "features": [
              "Sputter deposition with zero peeling or delamination",
              "Modular design for high process flexibility",
              "Suits small batches and complex geometric shapes",
              "Deposits WC/C and TiAlN low-friction coatings"
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
            ]
          },
          {
            "id": "broach",
            "photo": "hs_pvd",
            "photoAlt": "Huasheng dedicated broach coating equipment",
            "name": "Broach coating equipment",
            "tag": "Dedicated vertical arc",
            "short": "Dedicated broach coating equipment with a tall chamber.",
            "desc": "Dedicated broach coating equipment with a tall chamber for long cutting tools.",
            "features": [
              "Effective coating area Φ650 × 2000 mm",
              "1,000 kg heavy load capacity",
              "Deposits TiN, AlCrN, AlTiN, AlCrSiN",
              "Dedicated multi-axis vertical rotation fixtures"
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
            ]
          }
        ]
      },
      {
        "id": "dlc",
        "photo": "hs_dlc",
        "photoAlt": "Huasheng DLC and ta-C coating systems",
        "name": "DLC & ta-C coating equipment",
        "sub": "ta-C and filtered arc ta-C",
        "desc": "Tetrahedral amorphous carbon (ta-C) and filtered arc systems for hydrogen-free carbon coatings with extreme hardness up to 6000 HV.",
        "url": "https://www.hscoat.com/dlc-coating-equipment/",
        "machines": [
          {
            "id": "tc800plus",
            "photo": "hs_dlc",
            "photoAlt": "Huasheng TC800PLUS ta-C coating system",
            "name": "TC800PLUS ta-C coating machine",
            "tag": "ta-C DLC",
            "short": "ta-C diamond-like carbon, hardness up to 6000 HV.",
            "desc": "ta-C diamond-like carbon coating equipment for ultra-hard, low-friction surface layers.",
            "features": [
              "Hardness up to 6000 HV",
              "Low-temperature deposition under 200 °C",
              "Fast heat dissipation and anti-adhesion properties",
              "Arc magnetron hybrid ion plating"
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
            ]
          },
          {
            "id": "tc800plus-f",
            "photo": "hs_dlc",
            "photoAlt": "Huasheng TC800PLUS-F filtered arc ta-C coating system",
            "name": "TC800PLUS-F filtered arc ta-C coating machine",
            "tag": "Filtered arc ta-C",
            "short": "S-shaped magnetic filter that blocks large particles, up to 6000 HV.",
            "desc": "ta-C diamond-like carbon with an S-shaped magnetic filter that blocks large particles and droplets.",
            "features": [
              "Hardness up to 6000 HV",
              "S-shaped magnetic filter blocks macroscopic droplets and particles",
              "Low-temperature deposition under 200 °C",
              "Ultra-smooth droplet-free ta-C film"
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
            ]
          }
        ]
      },
      {
        "id": "diamond",
        "photo": "hs_diamond",
        "photoAlt": "Huasheng HFCVD diamond coating system",
        "name": "Diamond coating equipment",
        "sub": "HFCVD parallel filament array",
        "desc": "Hot-filament CVD systems that grow microcrystalline and nanocrystalline diamond films on carbide tools.",
        "url": "https://www.hscoat.com/diamond-coating-equipment/",
        "machines": [
          {
            "id": "da600pro",
            "photo": "hs_diamond",
            "photoAlt": "Huasheng DA600PRO HFCVD diamond coating system",
            "name": "DA600PRO HFCVD diamond coating machine",
            "tag": "HFCVD diamond",
            "short": "Parallel filament array for uniform temperature and 4–30 µm diamond film.",
            "desc": "Hot filament CVD diamond coating with a parallel filament array for uniform temperature. Not related to CVA aluminizing.",
            "features": [
              "Deposition rate up to 1.0 µm/h",
              "Film thickness 4–30 µm with variation under 15%",
              "Produces HGR410 and HFR410 diamond grades",
              "Parallel filament array for uniform temperature distribution"
            ],
            "specs": [
              [
                "Coating technology",
                "Hot-filament CVD diamond (parallel filament array)"
              ],
              [
                "Chamber volume",
                "0.16 m³"
              ],
              [
                "Effective coating area",
                "300 × 300 mm"
              ],
              [
                "Film thickness",
                "4–30 µm (variation <15%)"
              ],
              [
                "Deposition rate",
                "Up to 1.0 µm/h"
              ],
              [
                "Equipment size (L×W×H)",
                "2600 × 1200 × 2700 mm"
              ],
              [
                "Capacity",
                "500 pcs (D3) / 800 pcs (D3.175)"
              ],
              [
                "Process time",
                "16–33 h"
              ],
              [
                "Typical applications",
                "Graphite, composites, CFRP, PCB ceramic substrates, AlSi alloys (Si>12%), woodworking."
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
            ]
          }
        ]
      },
      {
        "id": "decorative",
        "photo": "hs_pvd",
        "photoAlt": "Huasheng decorative coating machines",
        "name": "Decorative PVD coating equipment",
        "sub": "DECO H, DECO A, DECO B, DECO G & AF series",
        "desc": "Decorative PVD and functional coating systems for watches, jewellery, consumer hardware, architectural panels, and touchscreen anti-fingerprint coatings.",
        "url": "https://www.hscoat.com/decorative-coating-equipment/",
        "machines": [
          {
            "id": "deco-h",
            "photo": "hs_pvd",
            "photoAlt": "Huasheng DECO H hybrid decorative coating system",
            "name": "DECO H multi-arc + HiPIMS decorative coating system",
            "tag": "Multi-Arc + HiPIMS",
            "short": "Hardness above 2000 HV and widest colour range for luxury items.",
            "desc": "Multi-arc plus magnetron sputtering plus HiPIMS. The flagship of the decorative range.",
            "features": [
              "Denser film, wider colour range, hardness above 2000 HV",
              "Lower friction coefficient and brighter colour than mid-frequency sputtering alone",
              "Superior corrosion and wear resistance",
              "Flagship hybrid configuration for luxury items"
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
            ]
          },
          {
            "id": "deco-a",
            "photo": "hs_pvd",
            "photoAlt": "Huasheng DECO A large multi-arc coating system",
            "name": "DECO A large-capacity multi-arc coating system",
            "tag": "Large Multi-Arc",
            "short": "Largest chambers Huasheng builds, with up to 30 arc sources.",
            "desc": "Multi-arc ion plating. Includes the largest chambers in the decorative range, up to DECO2600A.",
            "features": [
              "The largest chambers in the decorative range (up to DECO2600A)",
              "Gold, rose gold, gun grey, black, coffee, blue and custom colours",
              "Coats metals, glass, crystal, ceramics and polymers",
              "High volume throughput for large architectural batches"
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
            ]
          },
          {
            "id": "deco-b",
            "photo": "hs_pvd",
            "photoAlt": "Huasheng DECO B dark colour coating system",
            "name": "DECO B dark color multi-arc + magnetron coating system",
            "tag": "Dark Series PVD",
            "short": "Dedicated dark, gunmetal, and black colour series.",
            "desc": "Multi-arc plus magnetron sputtering, set up for the dark colour series.",
            "features": [
              "Dedicated dark colours: black, coffee, gun grey, dark titanium",
              "Depth and colour consistency required for premium finishes",
              "High wear resistance and corrosion durability",
              "Multi-arc adhesion with magnetron uniformity"
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
            ]
          },
          {
            "id": "deco-g",
            "photo": "hs_pvd",
            "photoAlt": "Huasheng DECO G real gold coating system",
            "name": "DECO G multi-arc + real gold coating system",
            "tag": "Real Gold PVD",
            "short": "Multi-arc and magnetron sputtering with real gold furnace.",
            "desc": "Multi-arc plus magnetron sputtering with a real gold furnace.",
            "features": [
              "Furnace gold and titanium gold, plus rose gold, gun ash, coffee and blue",
              "Integrated real gold evaporation furnace",
              "High precious metal efficiency with flat and cylindrical targets",
              "Clean, cyanide-free luxury gold coating"
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
            ]
          },
          {
            "id": "af-series",
            "photo": "hs_pvd",
            "photoAlt": "Huasheng AF anti-fingerprint coating equipment",
            "name": "AF anti-fingerprint coating equipment",
            "tag": "Anti-Fingerprint",
            "short": "Magnetron sputtering and evaporation for AF functional coatings.",
            "desc": "Magnetron sputtering plus evaporation, for anti-fingerprint coatings.",
            "features": [
              "4 cylindrical targets Φ70 × H1150 optional, plus 15 sets of evaporation electrodes",
              "Same four chamber sizes as DECO H",
              "High water contact angle (>115°) and oil repellency",
              "Anti-fingerprint top layers over decorative coatings"
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
            ]
          }
        ]
      },
      {
        "id": "optical",
        "photo": "hs_optical",
        "photoAlt": "Huasheng optical precision coating systems",
        "name": "Optical coating equipment",
        "sub": "OPT-E electron beam evaporation and magnetron sputtering",
        "desc": "Optical coating equipment for high-precision optical films, anti-reflection (AR) and optical filters on glass, quartz and silicon wafers.",
        "url": "https://www.hscoat.com/optical-coating-equipment/",
        "machines": [
          {
            "id": "opt-t",
            "photo": "hs_optical",
            "photoAlt": "Huasheng OPT-T thermal evaporation optical coating equipment",
            "name": "OPT-T thermal evaporation optical coating equipment",
            "tag": "Thermal Evaporation",
            "short": "Thermal evaporation for aluminium, nickel-chromium and silver wires.",
            "desc": "Thermal evaporation coating equipment for metallic optical and decorative films.",
            "features": [
              "Chrome, silver, gold, gun black, semi-transparent NCVM non-conductive film",
              "Rainbow mirror effects on plastics",
              "Thermal evaporation of aluminium, nickel chromium and silver wires",
              "High-throughput planetary dome fixtures"
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
            ]
          },
          {
            "id": "opt-e",
            "photo": "hs_optical",
            "photoAlt": "Huasheng OPT-E electron beam evaporation optical coating system",
            "name": "OPT-E electron beam evaporation optical coating equipment",
            "tag": "E-beam optical",
            "short": "Electron beam evaporation for anti-reflection and filter coatings on glass, quartz and silicon wafers.",
            "desc": "Electron beam evaporation coating equipment for precision optical and semiconductor films.",
            "features": [
              "Precision optical film: AR anti-reflection, HR high reflectivity, optical filters",
              "Semiconductor electrode and contact layers",
              "E-beam evaporation of SiO₂, TiO₂, ZrO₂, SiO",
              "Ultra-precise optical thickness monitoring"
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
            ]
          },
          {
            "id": "sputter-optical",
            "photo": "hs_optical",
            "photoAlt": "Huasheng magnetron sputtering optical coating system",
            "name": "Magnetron sputtering optical coating equipment",
            "tag": "Optical sputtering",
            "short": "Precise multilayer optical films on flat and curved substrates.",
            "desc": "Magnetron sputtering optical coating equipment for high-density, low-scatter multilayer optical films and hard protective optical coatings.",
            "features": [
              "Precise layer control",
              "Multilayer films",
              "Magnetron sputtering for dense, shift-free optical stacks",
              "Excellent adhesion and environmental durability",
              "High repeatability for multi-layer optical bandpass filters",
              "Planar and rotary target configurations"
            ],
            "specs": [
              [
                "Coating technology",
                "Closed-field magnetron sputtering"
              ],
              [
                "Film properties",
                "Dense, non-porous, zero-humidity-shift dielectric films"
              ],
              [
                "Substrates",
                "Glass, optical polymers, semiconductors"
              ],
              [
                "Typical applications",
                "Narrowband optical filters, AR coatings, durable optical front-surfaces"
              ]
            ],
            "process": [
              "Optical filters",
              "Precision optics",
              "Hard optical AR coatings",
              "Optical sensors & displays"
            ],
            "url": "https://www.hscoat.com/optical-coating-equipment/",
            "k": "sputter-optical magnetron sputtering optical coating precision multilayer filters",
            "i": [
              "optics",
              "semi"
            ]
          }
        ]
      },
      {
        "id": "specialty",
        "photo": "hs_pvd",
        "photoAlt": "Huasheng specialty powder coating equipment",
        "name": "Specialty & powder coating equipment",
        "sub": "POW 100 magnetron sputtering for powders",
        "desc": "Specialized PVD systems for functional coating of micro-powders, battery cathode/anode particles, and catalyst materials.",
        "url": "https://www.hscoat.com/pvd-coating-equipment/",
        "machines": [
          {
            "id": "pow-100",
            "photo": "hs_pvd",
            "photoAlt": "Huasheng POW 100 powder magnetron sputtering machine",
            "name": "POW 100 powder magnetron sputtering machine",
            "tag": "Powder Sputtering",
            "short": "Magnetron sputtering for fine powders and battery materials (100–3,000 g).",
            "desc": "Magnetron sputtering for coating powder rather than parts.",
            "features": [
              "Coats diamond, metal and ceramic powders",
              "Sputters iron, aluminium, titanium, nickel, copper, molybdenum, zirconium, tungsten, chromium, silicon or cobalt",
              "Specialized tumbling powder chamber (100–3,000 g capacity)",
              "Uniform nano-encapsulation of fine particles"
            ],
            "specs": [
              [
                "Technology",
                "Magnetron sputtering for powders"
              ],
              [
                "Chamber size",
                "L765 × W675 × H610 mm"
              ],
              [
                "Batch capacity",
                "100 g to 3,000 g powder loading"
              ],
              [
                "Sputtering targets",
                "2 cylindrical targets, adjustable to need"
              ],
              [
                "Equipment footprint",
                "2.8 × 1.2 × 2.2 m"
              ],
              [
                "Typical applications",
                "Powder metallurgy, diamond tool manufacture, battery active materials, catalyst engineering."
              ]
            ],
            "process": [
              "Battery active material coating",
              "Conductive powder metallisation",
              "Catalyst particle encapsulation",
              "Nano-surface engineering"
            ],
            "models": [
              {
                "family": "POW",
                "model": "POW 100",
                "chamberSize": "L765 × W675 × H610 mm",
                "area": "Loading capacity 100 – 3,000 g",
                "arcTargets": "—",
                "otherTargets": "2 cylindrical, adjustable to need",
                "footprint": "2.8 × 1.2 × 2.2 m"
              }
            ],
            "url": "https://www.hscoat.com/pvd-coating-equipment/",
            "k": "pow powder sputtering battery cathode anode catalyst particles nano coating",
            "i": [
              "semi",
              "power"
            ]
          }
        ]
      },
      {
        "id": "turnkey",
        "photo": "turnkey",
        "photoAlt": "Layout of the Huasheng turnkey coating plant",
        "name": "Turnkey coating solutions",
        "sub": "Complete MD800 PLUS tool-coating plant",
        "desc": "A complete tool-coating centre from Huasheng: cleaning, coating, maintenance, utilities and quality control, laid out and commissioned as one plant.",
        "url": "https://www.hscoat.com/turnkey-solution/",
        "machines": [
          {
            "id": "md800-turnkey",
            "photo": "turnkey",
            "photoAlt": "Layout of the Huasheng turnkey coating plant",
            "gallery": [
              [
                "cleanline",
                "Fully automatic ultrasonic cleaning line"
              ],
              [
                "hs_md",
                "Huasheng MD800 PLUS arc coating machine"
              ]
            ],
            "name": "MD800 PLUS turnkey coating centre",
            "short": "Complete plant for in-house tool coating.",
            "desc": "Huasheng's turnkey coating solution gives a tool maker full control of its own coating process, from incoming tools to inspected, coated product. The plant is built around the MD800 PLUS arc coater, with a fully automatic ultrasonic cleaning line, blasting equipment for target and liner maintenance, utilities and quality-control instruments. Owning the process keeps coating know-how in-house, allows your own coating recipes, and cuts turnaround to as little as the same day.",
            "features": [
              "Full control of your coating process and know-how",
              "Open technology to develop your own coatings",
              "Same-day coating turnaround possible",
              "Universal process flow for many tool types",
              "Built around the MD800 PLUS arc coater with automatic ultrasonic cleaning line"
            ],
            "specs": [
              [
                "Cleaning",
                "Fully automatic ultrasonic cleaning line, 14,000 pcs/h (APMT1135)"
              ],
              [
                "Coating",
                "MD800 PLUS arc coater, 12,000 pcs per batch (APMT1135)"
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
            "models": [
              {
                "model": "MD200",
                "tech": "Arc (4 sources)",
                "area": "Φ310 × 400 mm",
                "temp": "500°C",
                "load": "200 kg (3,600 inserts / 1,000 tools)",
                "size": "3400 × 2000 × 2500 mm",
                "time": "AlTiN 6–8 h"
              },
              {
                "model": "MD500",
                "tech": "Arc (6 sources)",
                "area": "Φ410 × 400 mm",
                "temp": "600°C",
                "load": "300 kg (6,000 inserts / 1,800 tools)",
                "size": "3400 × 2150 × 2500 mm",
                "time": "AlTiN 6–8 h"
              },
              {
                "model": "MD800 PLUS",
                "tech": "Arc (8 sources)",
                "area": "Φ650 × 400 mm",
                "temp": "600°C",
                "load": "500 kg (12,000 inserts / 30 hobs)",
                "size": "3750 × 2400 × 2500 mm",
                "time": "AlTiN 6–8 h"
              },
              {
                "model": "MD1500",
                "tech": "Arc (16 sources, vertical)",
                "area": "Φ720 × 900 mm",
                "temp": "600°C",
                "load": "1,000 kg (28,000 inserts / 72 hobs)",
                "size": "4860 × 2300 × 2660 mm",
                "time": "AlTiN 6–8 h"
              }
            ],
            "url": "https://www.hscoat.com/turnkey-solution/",
            "k": "turnkey plant job shop coating centre md800 md800 plus",
            "i": [
              "tools"
            ]
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
      '<div class="cta-row">' +
      enquire(b.id, b.name + " Range", "Enquire for " + b.name + " in India") +
      '<a href="' + b.site + '" target="_blank" rel="noopener" class="btn btn--ghost">' +
      '<span>Visit official website</span>' + SVG_EXT +
      '</a>' +
      '</div>' +
      '</div>' +
      '<div class="phead-media">' +
      fig(b, b.name) +
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
      photo = '<figure class="mshot">' +
        '<div class="mshot-stage"><img id="mshot-main" src="' + PHOTOS[shots[0][0]] + '" alt="' + esc(shots[0][1]) + '"></div>' +
        '<figcaption id="mshot-cap">' + (shots.length > 1 ? esc(shots[0][1]) : esc(m.name)) + '</figcaption>';
      if (shots.length > 1) {
        photo += '<div class="mthumbs">' + shots.map(function (g, k) {
          return '<button type="button" class="mthumb" data-src="' + g[0] + '" data-cap="' + esc(g[1]) + '" aria-label="' + esc(g[1]) + '"' + (k === 0 ? ' aria-current="true"' : '') + '>' +
            '<img src="' + PHOTOS[g[0]] + '" alt="">' +
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

    var specs;
    if (m.specs && m.specs.length) {
      specs = '<table class="spec"><tbody>' +
        m.specs.map(function (r) { return '<tr><th scope="row">' + esc(r[0]) + '</th><td>' + esc(r[1]) + '</td></tr>'; }).join("") +
        '</tbody></table>' +
        '<p class="note">* Manufacturer figures; exact values depend on configuration.</p>';
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
        '<h3 style="font-size:1.05rem; font-weight:700; color:var(--ink); margin-bottom:0.75rem;">Key Dimensions</h3>' +
        '<table class="spec" style="font-size:0.88rem;"><tbody>' +
        ll.dimensions.map(function(d) { return '<tr><th scope="row">' + esc(d[0]) + '</th><td>' + esc(d[1]) + '</td></tr>'; }).join('') +
        '</tbody></table></div>' +
        '<div class="mcol-card" style="margin:0;">' +
        '<h3 style="font-size:1.05rem; font-weight:700; color:var(--ink); margin-bottom:0.75rem;">Ancillary Equipment &amp; Utilities</h3>' +
        '<ul class="feat" style="font-size:0.88rem;">' +
        ll.ancillary.map(function(a) { return '<li><span class="check-ic-wrap">' + SVG_CHECK + '</span><span>' + esc(a) + '</span></li>'; }).join('') +
        '</ul></div></div>' +
        '<div class="m-models-table-wrap">' +
        '<table class="m-models-table"><thead><tr>' +
        '<th scope="col" style="width:110px;">Position</th><th scope="col">Station Description</th><th scope="col">Process Notes</th>' +
        '</tr></thead><tbody>' +
        ll.stations.map(function(st) {
          return '<tr><td><span class="pill-orientation" style="font-weight:700;">' + esc(st.pos) + '</span></td>' +
            '<td class="td-model" style="font-weight:600; color:var(--ink);">' + esc(st.station) + '</td>' +
            '<td>' + (st.notes ? '<span class="pill-orientation">' + esc(st.notes) + '</span>' : '<span style="color:var(--steel);">—</span>') + '</td></tr>';
        }).join('') +
        '</tbody></table></div></section>';
    }

    var modelsTableHtml = '';
    if (m.models && m.models.length) {
      var isDeco = m.models[0].chamberSize !== undefined || m.models[0].arcTargets !== undefined || m.models[0].otherTargets !== undefined;
      var isCoating = m.models[0].tech !== undefined && !isDeco;
      var isCleaning = m.models[0].chamber !== undefined || m.models[0].notes !== undefined;
      var headers = isDeco
        ? ["Family", "Model", "Chamber Size (mm)", "Effective Area (mm)", "Arc Targets", "Other Targets", "Footprint L×W×H (m)", "Action"]
        : (isCoating
          ? ["Model", "Technology", "Effective Area", "Max Temp", "Load / Capacity", "Equipment Size (mm)", "Cycle Time", "Action"]
          : (isCleaning
            ? ["Family", "Model", "Usable Chamber / Tank (mm)", "Overall Size (mm)", "Max Load", "Version / Notes", "Source / Reference", "Action"]
            : ["Model", "Config", "Load", "Dimensions", "Max Temp", "Vacuum", "Cooling", "Action"]));

      modelsTableHtml = '<section class="m-models-section">' +
        '<div class="m-models-head">' +
        '<div class="m-models-head__title">' +
        '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--lime)" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>' +
        '<div>' +
        '<h2>Standard Model Range & Technical Parameters</h2>' +
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
              '<td style="font-size:0.78rem; color:var(--steel);">' + esc(mod.source || '—') + '</td>' +
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
      (m.tag ? '<span class="tag-chip">' + esc(m.tag) + '</span>' : '') +
      (m.bmi_desc ? '<span class="tag-chip oem-desc-chip" title="Manufacturer designation">' + esc(m.bmi_desc) + '</span>' : '') +
      '</div>' +
      '<h1>' + esc(m.name) + '</h1>' +
      '<p class="lede">' + esc(m.desc) + '</p>' +
      '<div class="cta-row">' +
      enquire(b.id, m.name, "Enquire about this") +
      '<a class="btn btn--ghost" href="' + (m.url || c.url) + '" target="_blank" rel="noopener"><span>View on ' + esc(b.name) + ' website</span>' + SVG_EXT + '</a>' +
      '</div>' +
      '<div class="mcols">' +
      '<section class="mcol-card' + ((!m.benefits || !m.benefits.length) ? ' mcol-card--full' : '') + '"><h2>Key Technical Features</h2><ul class="feat">' + m.features.map(function (f) { return '<li><span class="check-ic-wrap">' + SVG_CHECK + '</span><span>' + esc(f) + '</span></li>'; }).join("") + '</ul></section>' +
      (m.benefits && m.benefits.length ? '<section class="mcol-card"><h2>Key Advantages &amp; Benefits</h2><ul class="feat">' + m.benefits.map(function (b) { return '<li><span class="check-ic-wrap">' + SVG_CHECK + '</span><span>' + esc(b) + '</span></li>'; }).join("") + '</ul></section>' : '') +
      (m.config ? '<section class="mcol-card"' + (m.thermochemical ? '' : ' style="grid-column: 1 / -1;"') + '><h2>Configuration</h2><p style="margin-top:0.4rem; font-size:0.92rem; color:var(--ink); font-weight:550;">' + esc(m.config) + '</p></section>' : '') +
      (m.thermochemical ? '<section class="mcol-card"' + (m.config ? '' : ' style="grid-column: 1 / -1;"') + '><h2>Thermochemical Options</h2><p style="margin-top:0.4rem; font-size:0.92rem; color:var(--lime); font-weight:600;">' + esc(m.thermochemical) + '</p></section>' : '') +
      (m.process && m.process.length ? '<section class="mcol-card" style="grid-column: 1 / -1;"><h2>Supported Processes &amp; Treatments</h2><div class="pills" style="margin-top:0.35rem;">' + m.process.map(function (p) { return '<span>' + esc(p) + '</span>'; }).join("") + '</div></section>' : '') +
      (m.options && m.options.length ? '<section class="mcol-card" style="grid-column: 1 / -1;"><h2>Main Options &amp; Peripherals</h2><ul class="feat feat--options">' + m.options.map(function (o) { return '<li><span class="check-ic-wrap">' + SVG_CHECK + '</span><span>' + esc(o) + '</span></li>'; }).join("") + '</ul></section>' : '') +
      (m.site_reqs && m.site_reqs.length ? '<section class="mcol-card" style="grid-column: 1 / -1;"><h2>Installation &amp; Site Requirements</h2><table class="spec" style="margin-top:0.75rem;"><tbody>' + m.site_reqs.map(function (r) { return '<tr><th scope="row">' + esc(r[0]) + '</th><td>' + esc(r[1]) + '</td></tr>'; }).join("") + '</tbody></table></section>' : '') +
      '</div>' +
      (m.i && m.i.length
        ? '<p class="ind-para"><strong>Target industries:</strong> ' + m.i.map(function (x) {
          var indObj = IND.find(function (z) { return z.id === x; });
          return indObj ? esc(indObj.n) : "";
        }).filter(Boolean).join(", ") + '.</p>'
        : '') +
      relnav +
      '</div>' +
      '<div class="mright">' +
      photo +
      '<section class="mspec"><div class="mspec-head"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--lime)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg><h2>Technical specifications</h2></div>' + specs + '</section>' +
      '</div>' +
      '</div>' +
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
      if (im) { im.src = PHOTOS[thumb.dataset.src]; im.alt = thumb.dataset.cap; }
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
    optical: ["evaporation", "sputter-optical"],
    cvd: ["cvd-systems", "cva"],
    turnkey: ["md800-turnkey", "combined"]
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
    cvd: "CVD coating",
    turnkey: "turnkey plants",
    coat: "coating",
    heat: "heat treatment"
  };

  const SYN = [
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
    [["anti-reflect", "optical coat", "evaporation"], "p:optical"],
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
      let list = IDX.filter(function (p) {
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

    // Clicking an industry card in the industries section filters the finder
    document.addEventListener("click", function (e) {
      var b = e.target.closest(".industry-card-v2[data-ind], .ind[data-ind], [data-ind]");
      if (b && b.dataset.ind) {
        e.preventDefault();
        ind = b.dataset.ind;
        if (fInd) fInd.value = ind;
        brand = "all";
        if (q) q.value = "";
        fillCats();
        if (fCat) fCat.value = "";
        syncButtons();
        render();
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
    });

    fillCats();
    render();
  })();

  /* ----------------------------------------------------------------
      Product mega menu & mobile navigation
      ---------------------------------------------------------------- */
  (function () {
    var mega = document.getElementById("mega");
    var megaBtn = document.getElementById("mega-btn");
    if (mega && megaBtn) {
      mega.innerHTML = '<div class="mega-grid">' + CATALOG.map(function (b) {
        return '<div><a class="mega-brand" href="' + b.id + '/">' +
          '<img src="' + logo(b.id) + '" alt="' + esc(b.name) + '"></a><ul>' +
          b.cats.map(function (c) {
            return '<li><a href="' + b.id + '/' + c.id + '/">' + esc(c.name) + '</a></li>';
          }).join("") +
          '</ul></div>';
      }).join("") + '</div>';

      function closeMega() {
        if (mega.hidden) return;
        mega.hidden = true;
        megaBtn.setAttribute("aria-expanded", "false");
      }

      megaBtn.addEventListener("click", function () {
        if (!mega.hidden) {
          closeMega();
          return;
        }
        mega.hidden = false;
        megaBtn.setAttribute("aria-expanded", "true");
      });

      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") closeMega();
      });

      document.addEventListener("click", function (e) {
        if (!mega.hidden && !mega.contains(e.target) && e.target !== megaBtn) {
          closeMega();
        }
      });

      mega.addEventListener("click", function (e) {
        if (e.target.closest("a")) closeMega();
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
              return '<li><a href="#/' + b.id + '/' + c.id + '">' + esc(c.name) + '</a></li>';
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
