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
    hs_ma1500: "assets/catalog/hs_ma1500.jpg",
    hs_cvd: "assets/catalog/hs_ma1500.jpg",
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
      id: "bmi", photo: "bmi_brand", photoAlt: "BMI vacuum furnace installation",
      name: "BMI", full: "Fours Industriels B.M.I.", country: "France", site: "https://www.bmi-fours.com",
      intro: "Vacuum furnaces for hardening, brazing, tempering and thermochemical treatment, designed and built in France since the early 1980s.",
      cats: [
        {
          id: "gas-quenching", photo: "bmi_thermo", photoAlt: "BMI vacuum furnace with pumping system",
          name: "Gas quenching furnaces", sub: "Hardening, brazing and laboratory furnaces",
          desc: "Vacuum furnaces that heat parts without oxidation and then cool them with high-pressure gas. BMI's patented rotating gas-flow system gives uniform quenching even on dense or complex loads.",
          url: "https://www.bmi-fours.com/products/#gas-cooling",
          machines: [
            {
              id: "b8t", photo: "b8t", photoAlt: "BMI horizontal vacuum gas quenching furnace",
              name: "B8_T vacuum gas quenching furnace", tag: "Horizontal",
              short: "Front-loading furnace for high-throughput production.",
              desc: "The B8_T is BMI's horizontal-loading vacuum gas quenching furnace, built for high-throughput production. Parts are heated under vacuum and quenched with gas at 5 to 12 bar, with BMI's patented rotating volute keeping gas flow even through the whole load. It is fully automated for precise, repeatable cycles with clean surfaces and minimal distortion.",
              features: [
                "Horizontal front loading", "Gas quenching at 5 to 12 bar abs",
                "Patented rotating volute for uniform cooling", "GRAPHTIL® man-machine interface",
                "Graphite, molybdenum or fibre hot zones",
              ],
              specs: [
                ["Working zone", "450 × 450 × 600 mm to 900 × 900 × 1200 mm"],
                ["Load capacity", "200 to 3000 kg"],
                ["Maximum temperature", "1250 °C, 1350 °C or 1500 °C"],
                ["Vacuum level", "10⁻² mbar, 10⁻⁵ mbar or 10⁻⁶ mbar"],
                ["Quench pressure", "5 to 12 bar abs"],
                ["Hot zone", "Graphite, molybdenum or fibre/wool combinations"],
                ["Control", "GRAPHTIL® man-machine interface"],
              ],
              process: ["Hardening and gas quenching", "Hyperquenching", "Bright annealing", "Solution annealing of stainless steel", "Ageing", "Stress relieving", "Brazing", "Sintering", "Special alloy degassing", "Steel tempering", "ALLCARB® low-pressure carburizing"],
              url: "https://www.bmi-fours.com/products/vacuum-hardening-furnace/",
              k: "vacuum hardening quench tool steel dies",
              i: ["tools", "auto", "aero"],
            },
            {
              id: "vse8t", photo: "vse8t", photoAlt: "BMI vertical vacuum furnace",
              name: "VSE8_T vacuum gas quenching furnace", tag: "Vertical",
              short: "Bottom-loading furnace for tall or delicate parts.",
              desc: "The VSE8_T is BMI's bottom-loading vertical vacuum gas quenching furnace. Loading from below suits long, tall or delicate components that must be treated standing or hanging to limit distortion. It shares the B8_T's high-pressure gas quenching and patented rotating volute.",
              features: [
                "Vertical bottom loading", "Gas quenching at 5 to 12 bar abs",
                "Patented rotating volute for uniform cooling", "GRAPHTIL® man-machine interface",
                "Graphite, molybdenum or fibre hot zones",
              ],
              specs: [
                ["Working zone", "Ø 600 × h 600 mm to Ø 1800 × h 1800 mm"],
                ["Load capacity", "200 to 3000 kg"],
                ["Maximum temperature", "1250 °C, 1350 °C or 1500 °C"],
                ["Vacuum level", "10⁻² mbar, 10⁻⁵ mbar or 10⁻⁶ mbar"],
                ["Quench pressure", "5 to 12 bar abs"],
                ["Control", "GRAPHTIL® man-machine interface"],
              ],
              process: ["Hardening and gas quenching", "Hyperquenching", "Bright annealing", "Ageing", "Stress relieving", "Brazing", "Sintering", "Steel tempering"],
              url: "https://www.bmi-fours.com/products/vacuum-hardening-furnace/",
              k: "vacuum hardening long parts shafts",
              i: ["aero", "auto"],
            },
            {
              id: "brazing", photo: "bmi_brazing", photoAlt: "BMI vacuum furnace with loading truck",
              name: "Vacuum brazing furnace",
              short: "Oxide-free brazing of assemblies.",
              desc: "Vacuum furnace for brazing assemblies in a clean, oxide-free atmosphere, used widely in aerospace and for high-value components where joint quality matters.",
              features: ["Oxide-free brazing under vacuum", "Controlled heating and cooling", "Suited to nickel and other brazing alloys"],
              process: ["Vacuum brazing", "Degassing"],
              url: "https://www.bmi-fours.com/products/vacuum-brazing-furnace/",
              k: "brazing assemblies",
              i: ["aero", "medical"],
            },
            {
              id: "lab",
              name: "Compact laboratory furnace",
              short: "Small vacuum furnace for R&D and process development.",
              desc: "A compact vacuum furnace for laboratories, universities and R&D departments, for developing and validating heat-treatment cycles before scaling up to production.",
              features: ["Compact footprint", "Vacuum heat treatment at laboratory scale", "Process development and testing"],
              process: ["Hardening", "Brazing", "Annealing", "Process trials"],
              url: "https://www.bmi-fours.com/products/laboratory-furnace/",
              k: "lab r&d laboratory",
              i: [],
            },
          ],
        },
        {
          id: "oil-quenching", photo: "bmi_oil", photoAlt: "BMI vacuum furnace installation",
          name: "Oil quenching furnaces", sub: "Horizontal and vertical",
          desc: "Vacuum furnaces with an integrated oil quench for steels that need a faster quench than gas can provide.",
          url: "https://www.bmi-fours.com/products/#oil-quenching",
          machines: [
            {
              id: "oil-horizontal", tag: "Horizontal",
              name: "Vacuum oil quenching furnace, horizontal",
              short: "Vacuum heating with an integrated oil quench.",
              desc: "Horizontal vacuum furnace with an integrated oil quench tank, for steels and part sections that need a more severe quench than gas.",
              features: ["Vacuum heating without oxidation", "Integrated oil quench", "Horizontal loading"],
              process: ["Hardening", "Oil quenching", "Carburizing followed by oil quench"],
              url: "https://www.bmi-fours.com/products/oil-quenching-furnace/",
              k: "hardening oil",
              i: ["auto"],
            },
            {
              id: "oil-vertical", tag: "Vertical",
              name: "Vacuum oil quenching furnace, vertical",
              short: "For long parts quenched hanging.",
              desc: "Vertical vacuum oil quenching furnace for long parts that must be quenched hanging to limit distortion.",
              features: ["Vertical loading", "Integrated oil quench", "Reduced distortion on long parts"],
              process: ["Hardening", "Oil quenching"],
              url: "https://www.bmi-fours.com/products/vertical-oil-quenching-furnace/",
              k: "hardening long parts oil",
              i: ["auto"],
            },
          ],
        },
        {
          id: "low-temperature", photo: "bmi_low", photoAlt: "BMI vacuum furnaces on the shop floor",
          name: "Low-temperature furnaces", sub: "Tempering and aluminium brazing",
          desc: "Vacuum furnaces for lower-temperature processes such as tempering after hardening and brazing aluminium assemblies.",
          url: "https://www.bmi-fours.com/products/#low-temperature",
          machines: [
            {
              id: "tempering",
              name: "Vacuum tempering furnace",
              short: "Tempering after hardening.",
              desc: "Vacuum tempering furnace for tempering hardened parts with clean surfaces and uniform temperature through the load.",
              features: ["Vacuum or protective atmosphere", "Uniform load temperature", "Clean, bright surfaces"],
              process: ["Tempering", "Stress relieving", "Ageing"],
              url: "https://www.bmi-fours.com/products/tempering-furnace/",
              k: "tempering",
              i: ["tools", "auto"],
            },
            {
              id: "alu-brazing",
              name: "Aluminium brazing vacuum furnace",
              short: "For heat exchangers and aluminium assemblies.",
              desc: "Vacuum furnace for fluxless brazing of aluminium assemblies such as heat exchangers.",
              features: ["Fluxless aluminium brazing", "Tight temperature uniformity"],
              process: ["Aluminium vacuum brazing"],
              url: "https://www.bmi-fours.com/products/aluminum-brazing-furnace/",
              k: "heat exchanger brazing aluminium",
              i: ["auto", "aero"],
            },
          ],
        },
        {
          id: "thermochemical", photo: "bmi_thermo", photoAlt: "BMI vacuum furnace with pumping system",
          name: "Thermochemical treatment furnaces", sub: "Carburizing, nitriding and sub-zero",
          desc: "Furnaces and BMI's own processes for changing the surface chemistry of steel parts, such as carburizing and nitriding, plus sub-zero treatment.",
          url: "https://www.bmi-fours.com/products/#process",
          machines: [
            {
              id: "allcarb",
              name: "ALLCARB® low-pressure carburizing",
              short: "Case hardening for gears and transmission parts.",
              desc: "BMI's ALLCARB® low-pressure carburizing process, run in its vacuum furnaces, case-hardens steel parts such as gears and transmission components without intergranular oxidation.",
              features: ["Low-pressure (vacuum) carburizing", "No intergranular oxidation", "Can be combined with high-pressure gas quenching"],
              specs: [["Process", "Low-pressure carburizing (LPC)"], ["Atmosphere", "Vacuum (10⁻⁴ to 10⁻⁶ mbar)"], ["Temperature", "850–1050 °C"], ["Applications", "Gears, transmission parts, tooling"]],
              process: ["Low-pressure carburizing", "Carbonitriding"],
              url: "https://www.bmi-fours.com/products/low-pressure-carburizing/",
              k: "lpc carburizing gears case hardening",
              i: ["auto"],
            },
            {
              id: "allnit",
              name: "ALLNIT® low-pressure nitriding",
              short: "Nitriding for wear and fatigue resistance.",
              desc: "BMI's ALLNIT® low-pressure nitriding process for improving wear and fatigue resistance of steel parts and tools.",
              features: ["Low-pressure nitriding", "Controlled nitrided layer"],
              specs: [["Process", "Low-pressure nitriding (LPC)"], ["Atmosphere", "Vacuum (10⁻⁴ to 10⁻⁶ mbar)"], ["Temperature", "500–580 °C"], ["Applications", "Crankshafts, gears, hydraulic rods"]],
              process: ["Nitriding", "Nitrocarburizing"],
              url: "https://www.bmi-fours.com/products/low-pressure-nitriding/",
              k: "nitriding",
              i: ["auto", "tools"],
            },
            {
              id: "plasma-nitriding",
              name: "Plasma nitriding furnace",
              short: "Ion nitriding for tools, dies and engineering parts.",
              desc: "Plasma (ion) nitriding furnace for tools, dies and engineering components.",
              features: ["Plasma-assisted nitriding", "Selective treatment possible"],
              spec_url: "https://www.bmi-fours.com/products/plasma-nitriding-furnace/",
              process: ["Plasma nitriding"],
              url: "https://www.bmi-fours.com/products/plasma-nitriding-furnace/",
              k: "ion nitriding dies moulds plasma",
              i: ["tools", "auto"],
            },
            {
              id: "cool-plus",
              name: "COOL PLUS sub-zero treatment furnace",
              short: "Cryogenic treatment of hardened steels.",
              desc: "The COOL PLUS vacuum furnace performs sub-zero cryogenic treatment, stabilising hardened steels by converting retained austenite.",
              features: ["Sub-zero cryogenic treatment", "Dimensional stabilisation"],
              process: ["Sub-zero treatment", "Cryogenic treatment"],
              url: "https://www.bmi-fours.com/products/sub-zero/",
              k: "cryogenic deep cryo sub-zero",
              i: ["tools", "aero"],
            },
          ],
        },
      ],
    },
    {
      id: "novatec", photo: "nov_main", photoAlt: "Novatec PLURITANK multi-chamber ultrasonic cleaning line",
      name: "Novatec", full: "Novatec S.r.l., San Martino di Lupari (Padova)", country: "Italy", site: "https://novatec.it/en",
      intro: "Industrial ultrasonic cleaning systems engineered, built and tested in Italy since 1993.",
      cats: [
        {
          id: "pluritank", photo: "nov_main", photoAlt: "Novatec PLURITANK multi-chamber cleaning line",
          name: "PLURITANK multi-chamber lines", sub: "Modular lines up to 12 stages",
          desc: "Multi-stage ultrasonic cleaning lines where parts move through cleaning, rinsing and drying stations in sequence. Built to the customer's parts, cleanliness target and throughput.",
          url: "https://novatec.it/en/multi-chamber-ultrasonic-cleaning",
          machines: [
            {
              id: "pluritank-line", photo: "nm_pluri", photoAlt: "Novatec PLURITANK automatic ultrasonic cleaning system",
              gallery: [["nm_pluri", "PLURITANK automatic ultrasonic cleaning system"], ["lineup", "PLURITANK line in a production area"]],
              name: "PLURITANK ultrasonic cleaning line",
              short: "Serial and large-format parts, up to 12 stages.",
              desc: "PLURITANK is Novatec's modular multi-chamber ultrasonic cleaning line. Stages for ultrasonic cleaning, rinsing and drying are combined to suit the part, the contamination and the required cleanliness, with up to 12 stages per line.",
              features: [
                "Modular, up to 12 stages, with room for future hardware and software upgrades",
                "Multi-frequency ultrasonic groups",
                "User-friendly HMI with multiple programs",
                "Data exchange and traceability",
                "AISI 304/316 stainless construction",
                "Factory acceptance test with your sample parts",
              ],
              specs: [
                ["Capacity", "Up to 12 stages, custom modules"],
                ["Cleanliness", "Configurable to your target class"],
                ["Construction", "AISI 304/316 stainless steel"],
                ["Control", "Touch-screen HMI, multiple programs"],
              ],
              process: ["Degreasing", "Ultrasonic cleaning", "Rinsing", "Drying"],
              url: "https://novatec.it/en/multi-chamber-ultrasonic-cleaning",
              k: "ultrasonic cleaning washing rinsing drying",
              i: ["auto", "medical", "optics", "watch", "semi", "tools"],
            },
            {
              id: "pre-pvd",
              name: "PLURITANK pre-treatment line for PVD coating",
              short: "Surface preparation before PVD, CVD and DLC.",
              desc: "A PLURITANK line configured to prepare tools and components for coating. Ultrasonic cleaning followed by rinsing and drying removes residues so the coating bonds reliably, batch after batch.",
              features: ["Reproducible pre-coating cleanliness", "Rinsing and drying cycles", "Matched to coating plant capacity"],
              process: ["Pre-PVD cleaning", "Pre-CVD cleaning", "Pre-DLC cleaning"],
              url: "https://novatec.it/en/multi-chamber-ultrasonic-cleaning",
              k: "pvd pre-treatment coating cleaning",
              i: ["tools"],
            },
            {
              id: "cleanroom", photo: "nm_implants", photoAlt: "Novatec cleaning line for cleanroom use",
              name: "Cleanroom cleaning line",
              short: "Low-particle cleaning for semiconductor and medical.",
              desc: "Precision cleaning for semiconductor hardware, vacuum-chamber parts and medical devices. Cleanroom class 7 design is available, with ultrapure water rinsing and documentation for validated processes.",
              features: ["Cleanroom class 7 design available", "Ultrapure water rinsing", "IQ/OQ/PQ documentation for medical"],
              specs: [["Cleanroom class", "Class 7 (10,000) available"], ["Water", "Ultrapure (18 MΩ·cm)"], ["Validation", "IQ/OQ/PQ available"]],
              process: ["Precision cleaning", "Ultrapure rinsing", "Drying"],
              url: "https://novatec.it/en/products",
              k: "cleanroom semiconductor medical implants",
              i: ["semi", "medical"],
            },
          ],
        },
        {
          id: "2crd", photo: "crd_green", photoAlt: "Novatec 2CRD single-chamber precision cleaning system",
          name: "2CRD single-chamber systems", sub: "Vacuum cleaning with rotating basket, 8 sizes",
          desc: "Compact single-chamber systems that clean and vacuum-dry in one chamber, with a rotating basket to reach blind holes and complex geometry.",
          url: "https://novatec.it/en/2crd-vacuum-cleaning",
          machines: [
            {
              id: "2crd-system", photo: "crd_green", photoAlt: "Novatec 2CRD single-chamber precision cleaning system",
              gallery: [["crd_green", "2CRD single-chamber precision cleaning system"], ["nm_implants", "Implants in a cleaning basket"]],
              name: "2CRD vacuum precision cleaning system",
              short: "Cleaning and vacuum drying in one chamber.",
              desc: "The 2CRD is Novatec's aqueous one-chamber vacuum cleaning system. It combines ultrasonic frequencies with vacuum processes and flexible cleaning, rinsing and drying steps in one compact chamber with a rotating basket. It is especially suited to blind and tapped holes, porous-coated surfaces and complex parts carrying polishing pastes and oils, including medical implants between production steps. Models include the 2CRD400, and the range comes in 8 sizes.",
              features: [
                "Single chamber: clean, rinse and vacuum dry",
                "Ultrasonic cleaning combined with vacuum processes",
                "Cleans blind and tapped holes and porous-coated surfaces",
                "Rotating basket",
                "Compact footprint, 8 sizes",
              ],
              specs: [["Chamber", "One chamber, rotating basket"], ["Sizes", "8 models from 2CRD400 to larger"], ["Process", "Clean, rinse, vacuum dry"], ["Ultrasonics", "Multi-frequency"]],
              process: ["Ultrasonic cleaning", "Rinsing", "Vacuum drying"],
              url: "https://novatec.it/en/2crd-vacuum-cleaning",
              k: "precision cleaning vacuum drying blind holes 2crd400 implants polishing paste",
              i: ["medical", "semi", "watch", "auto"],
            },
          ],
        },
        {
          id: "medical-implants", photo: "nm_implants", photoAlt: "Orthopaedic implants cleaned on Novatec systems",
          name: "Medical implant processing", sub: "In-process cleaning, final cleaning, passivation and FPI",
          desc: "Complete cleaning and treatment systems for orthopaedic and medical implant makers, from cleaning between machining and polishing steps to final cleaning and passivation into the cleanroom. Every system is customised to the customer's user requirement specification (URS) and can be supplied as a single machine or a combined, fully automated line.",
          url: "https://novatec.it/en/products",
          machines: [
            {
              id: "ipc", photo: "nm_implants", photoAlt: "Novatec PLURITANK in-line cleaning system for implants",
              gallery: [["nm_implants", "Implants in a cleaning basket"], ["crd_green", "2CRD400 one-chamber vacuum system"]],
              name: "IPC in-process cleaning", tag: "One-chamber or in-line",
              short: "Cleaning implants between production steps.",
              desc: "In-process cleaning (IPC) removes oils, chips, particles and polishing pastes from implants between grinding, blasting and polishing steps. Novatec offers it as a one-chamber 2CRD vacuum system for blind holes, porous coatings and complex shapes, or as an in-line PLURITANK system for higher volumes and a wider mix of parts.",
              features: [
                "One-chamber 2CRD vacuum systems or in-line PLURITANK systems",
                "Ultrasonic cleaning combined with vacuum processes",
                "Handles blind and tapped holes and porous-coated surfaces",
                "Multi-frequency ultrasonic groups",
                "Data exchange and traceability",
                "Modular for future hardware and software upgrades",
              ],
              specs: [["Options", "2CRD one-chamber or PLURITANK in-line"], ["Process", "Cleaning, rinsing, vacuum drying"], ["Traceability", "Data exchange and logging"]],
              process: ["Removing polishing pastes and oils", "Cleaning after grinding and blasting", "Cleaning between machining steps"],
              url: "https://novatec.it/en/products",
              k: "ipc in-process cleaning implants orthopaedic polishing paste 2crd pluritank",
              i: ["medical"],
            },
            {
              id: "fcps", photo: "nm_fpi", photoAlt: "Novatec final cleaning line with unload air lock to cleanroom",
              gallery: [["nm_fpi", "Final cleaning line in a cleanroom"], ["nm_implants", "Transfer through the line"], ["crd_green", "Unloading into the cleanroom"]],
              name: "FCS / FCPS final cleaning and passivation", tag: "Cleanroom unload",
              short: "Final cleaning, with optional passivation, into the cleanroom.",
              desc: "After in-process cleaning, implants need a final clean to remove dust and handling residues before sterilisation and packaging. The FCS (final cleaning system) or FCPS (combined final cleaning and passivation system) is an automatic PLURITANK line that unloads through an air lock straight into the cleanroom, leaving parts free of contaminants, stains and organic or biological residues.",
              features: [
                "Final cleaning, or combined final cleaning and passivation",
                "Unload air lock directly into the cleanroom",
                "Support with final qualification (IQ, OQ)",
                "Material and calibration certificates",
                "Multi-frequency ultrasonic groups",
                "Data exchange and traceability",
              ],
              specs: [["Options", "FCS (cleaning) or FCPS (cleaning + passivation)"], ["Air lock", "Cleanroom transfer"], ["Validation", "IQ, OQ available"], ["Documentation", "Material and calibration certificates"]],
              process: ["Final cleaning before sterilisation", "Passivation", "Cleanroom transfer"],
              url: "https://novatec.it/en/products",
              k: "fcs fcps final cleaning passivation cleanroom air lock implants sterilisation",
              i: ["medical"],
            },
            {
              id: "fpi", photo: "nm_fpi", photoAlt: "3D layout of a Novatec PLURITANK FPI line",
              gallery: [["nm_fpi", "Parts under UV inspection"], ["crd_green", "FPI line installation"], ["nm_implants", "Automated FPI line"]],
              name: "FPI fluorescent penetrant inspection line", tag: "PLURITANK",
              short: "Automated cleaning and crack detection.",
              desc: "An automatic PLURITANK line that combines surface cleaning, preparation and fluorescent penetrant inspection in one fully automated process. It is used to validate medical implants during manufacturing by revealing flaws, cracks and signs of fatigue, with automated part transfer for high throughput and a stable process.",
              features: [
                "Cleaning, preparation and FPI in one automated line",
                "Reveals flaws, cracks and fatigue signs",
                "Automated part transfer for high throughput",
                "Custom-designed to the customer's specification",
              ],
              specs: [["Process", "Cleaning, preparation, FPI inspection"], ["Detection", "Fluorescent penetrant, UV inspection"], ["Automation", "Full automatic part transfer"]],
              process: ["Fluorescent penetrant inspection", "Pre-inspection cleaning", "Part validation"],
              url: "https://novatec.it/en/products",
              k: "fpi fluorescent penetrant inspection ndt cracks implants aerospace",
              i: ["medical", "aero"],
            },
            {
              id: "combined", photo: "nm_implants", photoAlt: "Layout of a combined Novatec implant cleaning project",
              gallery: [["nm_implants", "Implants in custom baskets"]],
              name: "Combined turnkey implant lines (URS)", tag: "All-in project",
              short: "Complete, automated implant cleaning plant.",
              desc: "For larger projects Novatec designs the whole cleaning area to the customer's URS, linking the individual systems with conveyors and full automatic management. A typical line includes automatic basket loading with scanners and RFID, IPC one-chamber vacuum systems, quality verification stations, a combined final cleaning and passivation system, spray cleaning with an unload air lock, and a basket return conveyor, all with data exchange for traceability.",
              features: [
                "Automatic basket loading station with scanners and RFID",
                "IPC one-chamber vacuum systems",
                "QVS quality verification stations",
                "FCPS final cleaning and passivation with air lock to cleanroom",
                "PFC spray cleaning system with unload air lock",
                "BRC basket return air-lock conveyor",
                "Full automatic management and data exchange for traceability",
              ],
              specs: [["Scope", "Complete cleaning area, URS-based"], ["Components", "Basket loading, IPC, QVS, FCPS, PFC, BRC"], ["Automation", "Full automatic with conveyors"], ["Traceability", "Data exchange and logging"]],
              process: ["In-process cleaning", "Final cleaning and passivation", "Quality verification", "Cleanroom transfer"],
              url: "https://novatec.it/en/products",
              k: "urs turnkey combined implants rfid qvs pfc brc cleanroom",
              i: ["medical"],
            },
          ],
        },
        {
          id: "components", photo: "nov_gen", photoAlt: "Novatec ultrasonic generators",
          name: "Ultrasonic components", sub: "Generators, transducers and PLT 60V",
          desc: "The ultrasonic building blocks Novatec uses in its own systems, also supplied for building or upgrading tanks.",
          url: "https://novatec.it/en/ultrasonic-components",
          machines: [
            {
              id: "generators", photo: "nov_gen", photoAlt: "Novatec ultrasonic generators",
              gallery: [["nov_gen", "Immersible ultrasonic transducers"]],
              name: "Ultrasonic generators and transducers",
              short: "For building or upgrading cleaning tanks.",
              desc: "Ultrasonic generators and transducers for building new cleaning tanks or upgrading existing ones.",
              features: ["Generators and transducers", "For new tanks or retrofits"],
              process: ["Ultrasonic cleaning"],
              url: "https://novatec.it/en/ultrasonic-components",
              k: "generator transducer",
              i: [],
            },
            {
              id: "plt60v",
              name: "PLT 60V pressure-cycle unit",
              short: "Pressure-change cleaning for internal channels.",
              desc: "The PLT 60V uses pressure cycling to clean internal channels and cavities that ultrasound alone struggles to reach.",
              features: ["Pressure-cycle cleaning", "Reaches internal channels and cavities"],
              process: ["Pressure-change cleaning"],
              url: "https://novatec.it/en/ultrasonic-components",
              k: "pressure cleaning channels",
              i: ["auto", "medical"],
            },
          ],
        },
      ],
    },
    {
      id: "huasheng", photo: "lineup", photoAlt: "Huasheng coating machine lineup",
      name: "Huasheng", full: "Guangdong Huasheng Nanotechnology Co., Ltd.", country: "China", site: "https://www.hscoat.com",
      intro: "PVD, DLC, diamond, optical and CVD coating equipment, plus complete turnkey coating plants.",
      cats: [
        {
          id: "pvd", photo: "hs_pvd", photoAlt: "Huasheng G4PRO PVD coating machine",
          name: "PVD coating equipment", sub: "Arc, HiPIMS, hybrid and decorative",
          desc: "Physical vapour deposition systems for hard, wear-resistant coatings on cutting tools, moulds and components, and for decorative colour finishes.",
          url: "https://www.hscoat.com/pvd-coating-equipment/",
          machines: [
            {
              id: "md800", name: "MD800 arc coating machine", tag: "Arc coating", photo: "hs_md", photoAlt: "Huasheng MA800Plus arc coating machine",
              gallery: [["hs_md", "Huasheng MD series coating machine"]],
              short: "High-rate arc coater for tool coating production.",
              desc: "The MD800 is the arc coating machine at the heart of Huasheng's turnkey tool-coating plant. Low-voltage, high-current arc discharge evaporates and ionises the target material, which is deposited on the tools under an electric field, giving a high deposition rate and strong coating adhesion.",
              features: ["Arc coating with high deposition rate", "High ionisation rate and good coverage on complex shapes", "Very high impact resistance of coatings", "Fully automatic operation"],
              specs: [["Technology", "Arc coating"], ["Capacity", "12,000 pcs per batch (APMT1135 inserts)"], ["Operation", "Fully automatic"]],
              process: ["TiAlN, AlCrN and similar hard coatings", "Inserts, drills and end mills"],
              url: "https://www.hscoat.com/aip-coating-equipment/",
              k: "pvd arc aip tialn inserts drills end mills md800 turnkey",
              i: ["tools"],
            },
            {
              id: "aip", photo: "hs_pvd", photoAlt: "Huasheng G4PRO arc coating machine", tag: "Arc coating",
              name: "Arc coating equipment",
              short: "Hard nitride coatings for cutting tools.",
              desc: "Arc coating systems for hard nitride coatings such as TiAlN and AlCrN on inserts, drills, end mills and forming tools.",
              features: ["High deposition rate", "Strong adhesion", "Multilayer and nano-layer coatings"],
              process: ["Cutting tool coating", "Mould and die coating"],
              url: "https://www.hscoat.com/aip-coating-equipment/",
              k: "pvd tialn alcrn inserts drills end mills cutting tools arc",
              i: ["tools"],
            },
            {
              id: "hipims", photo: "hs_pvd", photoAlt: "Huasheng HiPIMS coating machine",
              name: "HiPIMS coating equipment",
              short: "Dense, smooth, droplet-free coatings.",
              desc: "High-power impulse magnetron sputtering systems that produce dense, smooth coatings without the droplets typical of arc processes.",
              features: ["High-density plasma", "Smooth, droplet-free surfaces"],
              process: ["Precision tool coating", "Component coating"],
              url: "https://www.hscoat.com/hipims-coating-equipment/",
              k: "pvd sputtering smooth hipims",
              i: ["tools", "medical", "auto"],
            },
            {
              id: "hybrid",
              name: "Hybrid coating equipment",
              short: "Arc and sputtering in one chamber.",
              desc: "Hybrid systems that combine arc and sputtering sources in one chamber for multilayer coating designs.",
              features: ["Multiple processes in one chamber", "Flexible multilayer designs"],
              process: ["Multilayer tool and component coatings"],
              url: "https://www.hscoat.com/hybrid-coating-equipment/",
              k: "pvd arc sputtering multilayer hybrid",
              i: ["tools", "auto"],
            },
            {
              id: "decorative",
              name: "Decorative coating equipment",
              short: "Colour PVD finishes.",
              desc: "PVD systems for durable colour finishes on hardware, sanitaryware, watches and consumer products.",
              features: ["Wide colour range", "Durable, wear-resistant finishes"],
              process: ["Decorative PVD"],
              url: "https://www.hscoat.com/decorative-coating-equipment/",
              k: "colour gold black decorative sanitary",
              i: ["watch"],
            },
          ],
        },
        {
          id: "dlc", photo: "hs_dlc", photoAlt: "Huasheng DLC coating system",
          name: "DLC coating equipment", sub: "PECVD DLC and ta-C",
          desc: "Diamond-like carbon coating systems for low friction and high hardness.",
          url: "https://www.hscoat.com/dlc-coating-equipment/",
          machines: [
            {
              id: "pecvd-dlc", photo: "hs_dlc", photoAlt: "Huasheng DLC coating system",
              name: "PECVD DLC coating equipment",
              short: "Low-friction coatings for components.",
              desc: "Plasma-enhanced CVD systems for low-friction DLC coatings on automotive and engineering components such as piston pins.",
              features: ["Low friction", "High hardness and wear resistance"],
              process: ["Automotive component coating", "Engineering component coating"],
              url: "https://www.hscoat.com/pecvd-dlc-coating-equipment/",
              k: "dlc low friction piston pin pecvd",
              i: ["auto", "medical"],
            },
            {
              id: "tac", photo: "hs_dlc", photoAlt: "Huasheng DLC coating system",
              name: "ta-C coating equipment",
              short: "Hydrogen-free carbon coatings.",
              desc: "Systems for hydrogen-free tetrahedral amorphous carbon (ta-C) coatings, used for machining non-ferrous materials and for high-wear parts.",
              features: ["Hydrogen-free carbon", "Very high hardness"],
              process: ["Tools for aluminium and non-ferrous machining", "High-wear components"],
              url: "https://www.hscoat.com/ta-c-coating-equipment/",
              k: "tac hydrogen-free carbon aluminium machining",
              i: ["tools", "auto"],
            },
          ],
        },
        {
          id: "diamond", photo: "hs_diamond", photoAlt: "Huasheng coating system",
          name: "Diamond coating equipment", sub: "HFCVD",
          desc: "Hot-filament CVD systems that grow diamond films on carbide tools.",
          url: "https://www.hscoat.com/diamond-coating-equipment/",
          machines: [
            {
              id: "hfcvd", photo: "hs_diamond", photoAlt: "Huasheng HFCVD diamond coating system",
              name: "HFCVD diamond coating equipment",
              short: "Diamond films on carbide tools.",
              desc: "Hot-filament CVD systems that deposit diamond on carbide tools for machining graphite, composites and aluminium-silicon alloys.",
              features: ["Very high hardness", "Long tool life on abrasive materials"],
              process: ["Carbide tool coating"],
              url: "https://www.hscoat.com/hfcvd-diamond-coating-equipment/",
              k: "diamond carbide graphite composites hfcvd",
              i: ["tools", "aero"],
            },
          ],
        },
        {
          id: "optical", photo: "hs_optical", photoAlt: "Huasheng optical coating equipment",
          name: "Optical coating equipment", sub: "Evaporation and magnetron sputtering",
          desc: "Systems for optical thin films on lenses and optical components.",
          url: "https://www.hscoat.com/optical-coating-equipment/",
          machines: [
            {
              id: "evaporation", photo: "hs_optical", photoAlt: "Huasheng evaporation optical coating equipment",
              name: "Evaporation optical coating equipment",
              short: "Anti-reflection and filter coatings.",
              desc: "Evaporation systems for anti-reflection and filter coatings on lenses and optics.",
              features: ["Anti-reflection coatings", "Filter coatings"],
              process: ["Lens coating"],
              url: "https://www.hscoat.com/evaporation-optical-coating-equipment/",
              k: "anti-reflection lenses evaporation",
              i: ["optics"],
            },
            {
              id: "sputter-optical", photo: "hs_optical", photoAlt: "Huasheng magnetron sputtering optical coating equipment",
              name: "Magnetron sputtering optical coating equipment",
              short: "Precise multilayer optical films.",
              desc: "Magnetron sputtering systems for precise multilayer optical films.",
              features: ["Precise layer control", "Multilayer films"],
              process: ["Optical filters", "Precision optics"],
              url: "https://www.hscoat.com/magnetron-sputtering-optical-coating-equipment/",
              k: "optical films sputtering",
              i: ["optics", "semi"],
            },
          ],
        },
        {
          id: "cvd", photo: "hs_cvd", photoAlt: "Huasheng CVD and aluminizing coating equipment",
          name: "CVD coating equipment", sub: "CVD and CVA aluminizing",
          desc: "Chemical vapour deposition systems for thick wear-resistant and high-temperature coatings.",
          url: "https://www.hscoat.com/cvd-coating-equipment/",
          machines: [
            {
              id: "cvd-systems", photo: "hs_cvd", photoAlt: "Huasheng CVD coating system",
              name: "CVD coating systems",
              short: "Thick wear-resistant coatings.",
              desc: "CVD systems for thick wear-resistant coatings, typically on turning inserts.",
              features: ["Thick, wear-resistant layers"],
              process: ["Turning insert coating"],
              url: "https://www.hscoat.com/cvd-coating-systems/",
              k: "cvd inserts turning",
              i: ["tools"],
            },
            {
              id: "cva", photo: "hs_cvd", photoAlt: "Huasheng CVA aluminizing system",
              name: "CVA aluminizing systems",
              short: "Aluminide coatings for high-temperature parts.",
              desc: "Chemical vapour aluminizing systems for aluminide coatings that protect parts against high-temperature oxidation.",
              features: ["High-temperature oxidation resistance"],
              process: ["Turbine and hot-section parts"],
              url: "https://www.hscoat.com/cva-aluminizing-systems/",
              k: "aluminide turbine oxidation cva",
              i: ["aero"],
            },
          ],
        },
        {
          id: "turnkey", photo: "turnkey", photoAlt: "Layout of the Huasheng turnkey coating plant",
          name: "Turnkey coating solutions", sub: "Complete MD800 tool-coating plant",
          desc: "A complete tool-coating centre from Huasheng: cleaning, coating, maintenance, utilities and quality control, laid out and commissioned as one plant.",
          url: "https://www.hscoat.com/turnkey-solution/",
          machines: [
            {
              id: "md800-turnkey", photo: "turnkey", photoAlt: "Layout of the Huasheng turnkey coating plant",
              gallery: [["cleanline", "Fully automatic ultrasonic cleaning line"], ["hs_md", "MA800Plus arc coating machine"]],
              name: "MD800 turnkey coating centre",
              short: "Complete plant for in-house tool coating.",
              desc: "Huasheng's turnkey coating solution gives a tool maker full control of its own coating process, from incoming tools to inspected, coated product. The plant is built around the MD800 arc coater, with a fully automatic ultrasonic cleaning line, blasting equipment for target and liner maintenance, utilities and quality-control instruments. Owning the process keeps coating know-how in-house, allows your own coating recipes, and cuts turnaround to as little as the same day.",
              features: [
                "Full control of your coating process and know-how",
                "Open technology to develop your own coatings",
                "Same-day coating turnaround possible",
                "Universal process flow for many tool types",
              ],
              specs: [
                ["Cleaning", "Fully automatic ultrasonic cleaning line, 14,000 pcs/h (APMT1135)"],
                ["Coating", "MD800 arc coater, 12,000 pcs per batch (APMT1135)"],
                ["Target maintenance", "9060A manual sandblaster, about 2 min per target"],
                ["Liner maintenance", "1212F pressurised sandblaster, about 4 h per set"],
                ["Cooling", "MCW-600 air-cooled chiller, 60 kW, R407C, 380 V 50 Hz"],
                ["Pure water", "CSJ-05 EDI water purifier, up to 18 MΩ·cm"],
                ["Compressed air", "SZ-30A permanent-magnet inverter compressor"],
                ["Quality control", "XHS-4700 ball crater tester, HR-150C Rockwell hardness tester, industrial microscope"],
              ],
              process: ["Cleaning", "Coating", "Target and liner maintenance", "Inspection and dispatch"],
              url: "https://www.hscoat.com/turnkey-solution/",
              k: "turnkey plant job shop coating centre md800",
              i: ["tools"],
            },
          ],
        },
      ],
    },
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

    var html = '<div class="mpage">' +
      crumbs([{ t: b.name, href: "#/" + b.id }, { t: c.name, href: "#/" + b.id + '/' + c.id }, { t: m.name }]) +
      '<div class="mlayout' + (many ? ' many' : '') + '">' +
      '<div class="mleft">' +
      '<div class="brand-badge-row">' +
      '<span class="flag-chip">' + esc(b.country) + '</span>' +
      '<span class="oem-chip">' + esc(b.name) + '</span>' +
      (m.tag ? '<span class="tag-chip">' + esc(m.tag) + '</span>' : '') +
      '</div>' +
      '<h1>' + esc(m.name) + '</h1>' +
      '<p class="lede">' + esc(m.desc) + '</p>' +
      '<div class="cta-row">' +
      enquire(b.id, m.name, "Enquire about this") +
      '<a class="btn btn--ghost" href="' + (m.url || c.url) + '" target="_blank" rel="noopener"><span>View on ' + esc(b.name) + ' website</span>' + SVG_EXT + '</a>' +
      '</div>' +
      '<div class="mcols">' +
      '<section class="mcol-card"><h2>Key features</h2><ul class="feat">' + m.features.map(function (f) { return '<li><span class="check-ic-wrap">' + SVG_CHECK + '</span><span>' + esc(f) + '</span></li>'; }).join("") + '</ul></section>' +
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
