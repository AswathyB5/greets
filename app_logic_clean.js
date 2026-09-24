
const PHOTOS = {/* photos omitted */};
const CATALOG = [
 {id:"bmi",photo:"bmi_brand",photoAlt:"BMI vacuum furnace installation",name:"BMI",full:"Fours Industriels B.M.I.",country:"France",site:"https://www.bmi-fours.com",
  intro:"Vacuum furnaces for hardening, brazing, tempering and thermochemical treatment, designed and built in France since the early 1980s.",
  cats:[
   {id:"gas-quenching",photo:"bmi_gas",photoAlt:"BMI horizontal vacuum gas quenching furnace",name:"Gas quenching furnaces",sub:"Hardening, brazing and laboratory furnaces",
    desc:"Vacuum furnaces that heat parts without oxidation and then cool them with high-pressure gas. BMI's patented rotating gas-flow system gives uniform quenching even on dense or complex loads.",
    url:"https://www.bmi-fours.com/products/#gas-cooling",
    machines:[
     {id:"b8t",photo:"b8t",photoAlt:"BMI horizontal vacuum gas quenching furnace",name:"B8_T vacuum gas quenching furnace",tag:"Horizontal",short:"Front-loading furnace for high-throughput production.",
      desc:"The B8_T is BMI's horizontal-loading vacuum gas quenching furnace, built for high-throughput production. Parts are heated under vacuum and quenched with gas at 5 to 12 bar, with BMI's patented rotating volute keeping gas flow even through the whole load. It is fully automated for precise, repeatable cycles with clean surfaces and minimal distortion.",
      features:["Horizontal front loading","Gas quenching at 5 to 12 bar abs","Patented rotating volute for uniform cooling","GRAPHTIL® man-machine interface","Graphite, molybdenum or fibre hot zones"],
      specs:[["Working zone","450 × 450 × 600 mm to 900 × 900 × 1200 mm"],["Load capacity","200 to 3000 kg"],["Maximum temperature","1250 °C, 1350 °C or 1500 °C"],["Vacuum level","10⁻² mbar, 10⁻⁵ mbar or 10⁻⁶ mbar"],["Quench pressure","5 to 12 bar abs"],["Hot zone","Graphite, molybdenum or fibre/wool combinations"],["Control","GRAPHTIL® man-machine interface"]],
      process:["Hardening and gas quenching","Hyperquenching","Bright annealing","Solution annealing of stainless steel","Ageing","Stress relieving","Brazing","Sintering","Special alloy degassing","Steel tempering","ALLCARB® low-pressure carburizing"],
      url:"https://www.bmi-fours.com/products/vacuum-hardening-furnace/",k:"vacuum hardening quench tool steel dies",i:["tools","auto","aero"]},
     {id:"vse8t",photo:"vse8t",photoAlt:"BMI vertical vacuum furnace",name:"VSE8_T vacuum gas quenching furnace",tag:"Vertical",short:"Bottom-loading furnace for tall or delicate parts.",
      desc:"The VSE8_T is BMI's bottom-loading vertical vacuum gas quenching furnace. Loading from below suits long, tall or delicate components that must be treated standing or hanging to limit distortion. It shares the B8_T's high-pressure gas quenching and patented rotating volute.",
      features:["Vertical bottom loading","Gas quenching at 5 to 12 bar abs","Patented rotating volute for uniform cooling","GRAPHTIL® man-machine interface","Graphite, molybdenum or fibre hot zones"],
      specs:[["Working zone","Ø 600 × h 600 mm to Ø 1800 × h 1800 mm"],["Load capacity","200 to 3000 kg"],["Maximum temperature","1250 °C, 1350 °C or 1500 °C"],["Vacuum level","10⁻² mbar, 10⁻⁵ mbar or 10⁻⁶ mbar"],["Quench pressure","5 to 12 bar abs"],["Control","GRAPHTIL® man-machine interface"]],
      process:["Hardening and gas quenching","Hyperquenching","Bright annealing","Ageing","Stress relieving","Brazing","Sintering","Steel tempering"],
      url:"https://www.bmi-fours.com/products/vacuum-hardening-furnace/",k:"vacuum hardening long parts shafts",i:["aero","auto"]},
     {id:"brazing",photo:"bmi_brazing",photoAlt:"BMI vacuum furnace with loading truck",name:"Vacuum brazing furnace",short:"Oxide-free brazing of assemblies.",
      desc:"Vacuum furnace for brazing assemblies in a clean, oxide-free atmosphere, used widely in aerospace and for high-value components where joint quality matters.",
      features:["Oxide-free brazing under vacuum","Controlled heating and cooling","Suited to nickel and other brazing alloys"],
      process:["Vacuum brazing","Degassing"],url:"https://www.bmi-fours.com/products/vacuum-brazing-furnace/",k:"brazing assemblies",i:["aero","medical"]},
     {id:"lab",name:"Compact laboratory furnace",short:"Small vacuum furnace for R&D and process development.",
      desc:"A compact vacuum furnace for laboratories, universities and R&D departments, for developing and validating heat-treatment cycles before scaling up to production.",
      features:["Compact footprint","Vacuum heat treatment at laboratory scale","Process development and testing"],
      process:["Hardening","Brazing","Annealing","Process trials"],url:"https://www.bmi-fours.com/products/laboratory-furnace/",k:"lab r&d laboratory",i:[]}
    ]},
   {id:"oil-quenching",photo:"bmi_oil",photoAlt:"BMI vacuum furnace installation",name:"Oil quenching furnaces",sub:"Horizontal and vertical",
    desc:"Vacuum furnaces with an integrated oil quench for steels that need a faster quench than gas can provide.",
    url:"https://www.bmi-fours.com/products/#oil-quenching",
    machines:[
     {id:"oil-horizontal",name:"Vacuum oil quenching furnace, horizontal",tag:"Horizontal",short:"Vacuum heating with an integrated oil quench.",
      desc:"Horizontal vacuum furnace with an integrated oil quench tank, for steels and part sections that need a more severe quench than gas.",
      features:["Vacuum heating without oxidation","Integrated oil quench","Horizontal loading"],process:["Hardening","Oil quenching","Carburizing followed by oil quench"],
      url:"https://www.bmi-fours.com/products/oil-quenching-furnace/",k:"hardening oil",i:["auto"]},
     {id:"oil-vertical",name:"Vacuum oil quenching furnace, vertical",tag:"Vertical",short:"For long parts quenched hanging.",
      desc:"Vertical vacuum oil quenching furnace for long parts that must be quenched hanging to limit distortion.",
      features:["Vertical loading","Integrated oil quench","Reduced distortion on long parts"],process:["Hardening","Oil quenching"],
      url:"https://www.bmi-fours.com/products/vertical-oil-quenching-furnace/",k:"hardening long parts oil",i:["auto"]}
    ]},
   {id:"low-temperature",photo:"bmi_low",photoAlt:"BMI vacuum furnaces on the shop floor",name:"Low-temperature furnaces",sub:"Tempering and aluminium brazing",
    desc:"Vacuum furnaces for lower-temperature processes such as tempering after hardening and brazing aluminium assemblies.",
    url:"https://www.bmi-fours.com/products/#low-temperature",
    machines:[
     {id:"tempering",name:"Vacuum tempering furnace",short:"Tempering after hardening.",
      desc:"Vacuum tempering furnace for tempering hardened parts with clean surfaces and uniform temperature through the load.",
      features:["Vacuum or protective atmosphere","Uniform load temperature","Clean, bright surfaces"],process:["Tempering","Stress relieving","Ageing"],
      url:"https://www.bmi-fours.com/products/tempering-furnace/",k:"tempering",i:["tools","auto"]},
     {id:"alu-brazing",name:"Aluminium brazing vacuum furnace",short:"For heat exchangers and aluminium assemblies.",
      desc:"Vacuum furnace for fluxless brazing of aluminium assemblies such as heat exchangers.",
      features:["Fluxless aluminium brazing","Tight temperature uniformity"],process:["Aluminium vacuum brazing"],
      url:"https://www.bmi-fours.com/products/aluminum-brazing-furnace/",k:"heat exchanger brazing aluminium",i:["auto","aero"]}
    ]},
   {id:"thermochemical",photo:"bmi_thermo",photoAlt:"BMI vacuum furnace with pumping system",name:"Thermochemical treatment furnaces",sub:"Carburizing, nitriding and sub-zero",
    desc:"Furnaces and BMI's own processes for changing the surface chemistry of steel parts, such as carburizing and nitriding, plus sub-zero treatment.",
    url:"https://www.bmi-fours.com/products/#process",
    machines:[
     {id:"allcarb",name:"ALLCARB® low-pressure carburizing",short:"Case hardening for gears and transmission parts.",
      desc:"BMI's ALLCARB® low-pressure carburizing process, run in its vacuum furnaces, case-hardens steel parts such as gears and transmission components without intergranular oxidation.",
      features:["Low-pressure (vacuum) carburizing","No intergranular oxidation","Can be combined with high-pressure gas quenching"],process:["Low-pressure carburizing","Carbonitriding"],
      url:"https://www.bmi-fours.com/products/low-pressure-carburizing/",k:"lpc carburizing gears case hardening",i:["auto"]},
     {id:"allnit",name:"ALLNIT® low-pressure nitriding",short:"Nitriding for wear and fatigue resistance.",
      desc:"BMI's ALLNIT® low-pressure nitriding process for improving wear and fatigue resistance of steel parts and tools.",
      features:["Low-pressure nitriding","Controlled nitrided layer"],process:["Nitriding","Nitrocarburizing"],
      url:"https://www.bmi-fours.com/products/low-pressure-nitriding/",k:"nitriding",i:["auto","tools"]},
     {id:"plasma-nitriding",name:"Plasma nitriding furnace",short:"Ion nitriding for tools, dies and engineering parts.",
      desc:"Plasma (ion) nitriding furnace for tools, dies and engineering components.",
      features:["Plasma-assisted nitriding","Selective treatment possible"],process:["Plasma nitriding"],
      url:"https://www.bmi-fours.com/products/plasma-nitriding-furnace/",k:"ion nitriding dies moulds plasma",i:["tools","auto"]},
     {id:"cool-plus",name:"COOL PLUS sub-zero treatment furnace",short:"Cryogenic treatment of hardened steels.",
      desc:"The COOL PLUS vacuum furnace performs sub-zero cryogenic treatment, stabilising hardened steels by converting retained austenite.",
      features:["Sub-zero cryogenic treatment","Dimensional stabilisation"],process:["Sub-zero treatment","Cryogenic treatment"],
      url:"https://www.bmi-fours.com/products/sub-zero/",k:"cryogenic deep cryo sub-zero",i:["tools","aero"]}
    ]}
  ]},
 {id:"novatec",photo:"nov_main",photoAlt:"Novatec PLURITANK multi-chamber ultrasonic cleaning line",name:"Novatec",full:"Novatec S.r.l., San Martino di Lupari (Padova)",country:"Italy",site:"https://novatec.it/en",
  intro:"Industrial ultrasonic cleaning systems engineered, built and tested in Italy since 1993.",
  cats:[
   {id:"pluritank",photo:"nov_main",photoAlt:"Novatec PLURITANK multi-chamber cleaning line",name:"PLURITANK multi-chamber lines",sub:"Modular lines up to 12 stages",
    desc:"Multi-stage ultrasonic cleaning lines where parts move through cleaning, rinsing and drying stations in sequence. Built to the customer's parts, cleanliness target and throughput.",
    url:"https://novatec.it/en/multi-chamber-ultrasonic-cleaning",
    machines:[
     {id:"pluritank-line",photo:"nov_main",photoAlt:"Novatec PLURITANK multi-chamber ultrasonic cleaning line",gallery:[["nm_pluri","PLURITANK automatic ultrasonic cleaning system"],["nm_brand","PLURITANK line in a cleanroom"],["nov_brand","Inside a PLURITANK line"]],name:"PLURITANK ultrasonic cleaning line",short:"Serial and large-format parts, up to 12 stages.",
      desc:"PLURITANK is Novatec's modular multi-chamber ultrasonic cleaning line. Stages for ultrasonic cleaning, rinsing and drying are combined to suit the part, the contamination and the required cleanliness, with up to 12 stages per line.",
      features:["Modular, up to 12 stages, with room for future hardware and software upgrades","Multi-frequency ultrasonic groups","User-friendly HMI with multiple programs","Data exchange and traceability","AISI 304/316 stainless construction","Factory acceptance test with your sample parts"],
      process:["Degreasing","Ultrasonic cleaning","Rinsing","Drying"],url:"https://novatec.it/en/multi-chamber-ultrasonic-cleaning",k:"ultrasonic cleaning washing rinsing drying",i:["auto","medical","optics","watch","semi","tools"]},
     {id:"pre-pvd",name:"PLURITANK pre-treatment line for PVD coating",short:"Surface preparation before PVD, CVD and DLC.",
      desc:"A PLURITANK line configured to prepare tools and components for coating. Ultrasonic cleaning followed by rinsing and drying removes residues so the coating bonds reliably, batch after batch.",
      features:["Reproducible pre-coating cleanliness","Rinsing and drying cycles","Matched to coating plant capacity"],
      process:["Pre-PVD cleaning","Pre-CVD cleaning","Pre-DLC cleaning"],url:"https://novatec.it/en/multi-chamber-ultrasonic-cleaning",k:"pvd pre-treatment coating cleaning",i:["tools"]},
     {id:"cleanroom",photo:"nm_clean",photoAlt:"Novatec cleaning line for cleanroom use",name:"Cleanroom cleaning line",short:"Low-particle cleaning for semiconductor and medical.",
      desc:"Precision cleaning for semiconductor hardware, vacuum-chamber parts and medical devices. Cleanroom class 7 design is available, with ultrapure water rinsing and documentation for validated processes.",
      features:["Cleanroom class 7 design available","Ultrapure water rinsing","IQ/OQ/PQ documentation for medical"],
      process:["Precision cleaning","Ultrapure rinsing","Drying"],url:"https://novatec.it/en/products",k:"cleanroom semiconductor medical implants",i:["semi","medical"]}
    ]},
   {id:"2crd",photo:"crd_green",photoAlt:"Novatec 2CRD single-chamber precision cleaning system",name:"2CRD single-chamber systems",sub:"Vacuum cleaning with rotating basket, 8 sizes",
    desc:"Compact single-chamber systems that clean and vacuum-dry in one chamber, with a rotating basket to reach blind holes and complex geometry.",
    url:"https://novatec.it/en/2crd-vacuum-cleaning",
    machines:[
     {id:"2crd-system",photo:"crd_green",photoAlt:"Novatec 2CRD single-chamber precision cleaning system",gallery:[["nm_2crd","Novatec 2CRD400 one-chamber vacuum cleaning system"],["nm_2crd_b","2CRD one-chamber system"],["nov_2crd","Single-chamber precision cleaning system"]],name:"2CRD vacuum precision cleaning system",short:"Cleaning and vacuum drying in one chamber.",
      desc:"The 2CRD is Novatec's aqueous one-chamber vacuum cleaning system. It combines ultrasonic frequencies with vacuum processes and flexible cleaning, rinsing and drying steps in one compact chamber with a rotating basket. It is especially suited to blind and tapped holes, porous-coated surfaces and complex parts carrying polishing pastes and oils, including medical implants between production steps. Models include the 2CRD400, and the range comes in 8 sizes.",
      features:["Single chamber: clean, rinse and vacuum dry","Ultrasonic cleaning combined with vacuum processes","Cleans blind and tapped holes and porous-coated surfaces","Rotating basket","Compact footprint, 8 sizes"],process:["Ultrasonic cleaning","Rinsing","Vacuum drying"],
      url:"https://novatec.it/en/2crd-vacuum-cleaning",k:"precision cleaning vacuum drying blind holes 2crd400 implants polishing paste",i:["medical","semi","watch","auto"]}
    ]},
   {id:"medical-implants",photo:"nm_implants",photoAlt:"Orthopaedic implants cleaned on Novatec systems",name:"Medical implant processing",sub:"In-process cleaning, final cleaning, passivation and FPI",
    desc:"Complete cleaning and treatment systems for orthopaedic and medical implant makers, from cleaning between machining and polishing steps to final cleaning and passivation into the cleanroom. Every system is customised to the customer's user requirement specification (URS) and can be supplied as a single machine or a combined, fully automated line.",
    url:"https://novatec.it/en/products",
    machines:[
     {id:"ipc",photo:"nm_ipc",photoAlt:"Novatec PLURITANK in-line cleaning system for implants",gallery:[["nm_2crd","2CRD400 one-chamber vacuum system"],["nm_basket","Implants in a cleaning basket"]],name:"IPC in-process cleaning",tag:"One-chamber or in-line",short:"Cleaning implants between production steps.",
      desc:"In-process cleaning (IPC) removes oils, chips, particles and polishing pastes from implants between grinding, blasting and polishing steps. Novatec offers it as a one-chamber 2CRD vacuum system for blind holes, porous coatings and complex shapes, or as an in-line PLURITANK system for higher volumes and a wider mix of parts.",
      features:["One-chamber 2CRD vacuum systems or in-line PLURITANK systems","Ultrasonic cleaning combined with vacuum processes","Handles blind and tapped holes and porous-coated surfaces","Multi-frequency ultrasonic groups","Data exchange and traceability","Modular for future hardware and software upgrades"],
      process:["Removing polishing pastes and oils","Cleaning after grinding and blasting","Cleaning between machining steps"],url:"https://novatec.it/en/products",k:"ipc in-process cleaning implants orthopaedic polishing paste 2crd pluritank",i:["medical"]},
     {id:"fcps",photo:"nm_fcps",photoAlt:"Novatec final cleaning line with unload air lock to cleanroom",gallery:[["nm_brand","Final cleaning line in a cleanroom"],["nm_fcps_b","Transfer through the line"],["nm_fcps_c","Unloading into the cleanroom"],["nm_fcps_d","Implant basket leaving the line"]],name:"FCS / FCPS final cleaning and passivation",tag:"Cleanroom unload",short:"Final cleaning, with optional passivation, into the cleanroom.",
      desc:"After in-process cleaning, implants need a final clean to remove dust and handling residues before sterilisation and packaging. The FCS (final cleaning system) or FCPS (combined final cleaning and passivation system) is an automatic PLURITANK line that unloads through an air lock straight into the cleanroom, leaving parts free of contaminants, stains and organic or biological residues.",
      features:["Final cleaning, or combined final cleaning and passivation","Unload air lock directly into the cleanroom","Support with final qualification (IQ, OQ)","Material and calibration certificates","Multi-frequency ultrasonic groups","Data exchange and traceability"],
      process:["Final cleaning before sterilisation","Passivation","Cleanroom transfer"],url:"https://novatec.it/en/products",k:"fcs fcps final cleaning passivation cleanroom air lock implants sterilisation",i:["medical"]},
     {id:"fpi",photo:"nm_fpi",photoAlt:"3D layout of a Novatec PLURITANK FPI line",gallery:[["nm_fpi_b","Parts under UV inspection"],["nm_fpi_c","FPI line installation"],["nm_fpi_d","Automated FPI line"]],name:"FPI fluorescent penetrant inspection line",tag:"PLURITANK",short:"Automated cleaning and crack detection.",
      desc:"An automatic PLURITANK line that combines surface cleaning, preparation and fluorescent penetrant inspection in one fully automated process. It is used to validate medical implants during manufacturing by revealing flaws, cracks and signs of fatigue, with automated part transfer for high throughput and a stable process.",
      features:["Cleaning, preparation and FPI in one automated line","Reveals flaws, cracks and fatigue signs","Automated part transfer for high throughput","Custom-designed to the customer's specification"],
      process:["Fluorescent penetrant inspection","Pre-inspection cleaning","Part validation"],url:"https://novatec.it/en/products",k:"fpi fluorescent penetrant inspection ndt cracks implants aerospace",i:["medical","aero"]},
     {id:"combined",photo:"nm_urs",photoAlt:"Layout of a combined Novatec implant cleaning project",gallery:[["nm_urs_b","Implants in custom baskets"]],name:"Combined turnkey implant lines (URS)",tag:"All-in project",short:"Complete, automated implant cleaning plant.",
      desc:"For larger projects Novatec designs the whole cleaning area to the customer's URS, linking the individual systems with conveyors and full automatic management. A typical line includes automatic basket loading with scanners and RFID, IPC one-chamber vacuum systems, quality verification stations, a combined final cleaning and passivation system, spray cleaning with an unload air lock, and a basket return conveyor, all with data exchange for traceability.",
      features:["Automatic basket loading station with scanners and RFID","IPC one-chamber vacuum systems","QVS quality verification stations","FCPS final cleaning and passivation with air lock to cleanroom","PFC spray cleaning system with unload air lock","BRC basket return air-lock conveyor","Full automatic management and data exchange for traceability"],
      process:["In-process cleaning","Final cleaning and passivation","Quality verification","Cleanroom transfer"],url:"https://novatec.it/en/products",k:"urs turnkey combined implants rfid qvs pfc brc cleanroom",i:["medical"]}
    ]},
   {id:"components",photo:"nov_gen",photoAlt:"Novatec ultrasonic generators",name:"Ultrasonic components",sub:"Generators, transducers and PLT 60V",
    desc:"The ultrasonic building blocks Novatec uses in its own systems, also supplied for building or upgrading tanks.",
    url:"https://novatec.it/en/ultrasonic-components",
    machines:[
     {id:"generators",photo:"nov_gen",photoAlt:"Novatec ultrasonic generators",gallery:[["nov_trans","Immersible ultrasonic transducers"]],name:"Ultrasonic generators and transducers",short:"For building or upgrading cleaning tanks.",
      desc:"Ultrasonic generators and transducers for building new cleaning tanks or upgrading existing ones.",
      features:["Generators and transducers","For new tanks or retrofits"],process:["Ultrasonic cleaning"],url:"https://novatec.it/en/ultrasonic-components",k:"generator transducer",i:[]},
     {id:"plt60v",name:"PLT 60V pressure-cycle unit",short:"Pressure-change cleaning for internal channels.",
      desc:"The PLT 60V uses pressure cycling to clean internal channels and cavities that ultrasound alone struggles to reach.",
      features:["Pressure-cycle cleaning","Reaches internal channels and cavities"],process:["Pressure-change cleaning"],url:"https://novatec.it/en/ultrasonic-components",k:"pressure cleaning channels",i:["auto","medical"]}
    ]}
  ]},
 {id:"huasheng",photo:"lineup",photoAlt:"Huasheng coating machines: HA802, MA1500, HiPIMS, TC802 and MC1000",name:"Huasheng",full:"Guangdong Huasheng Nanotechnology Co., Ltd.",country:"China",site:"https://www.hscoat.com",
  intro:"PVD, DLC, diamond, optical and CVD coating equipment, plus complete turnkey coating plants.",
  cats:[
   {id:"pvd",photo:"hs_pvd",photoAlt:"Huasheng G4PRO PVD coating machine",name:"PVD coating equipment",sub:"Arc, HiPIMS, hybrid and decorative",
    desc:"Physical vapour deposition systems for hard, wear-resistant coatings on cutting tools, moulds and components, and for decorative colour finishes.",
    url:"https://www.hscoat.com/pvd-coating-equipment/",
    machines:[
     {id:"md800",name:"MD800 arc coating machine",tag:"Arc coating",photo:"ma800",photoAlt:"Huasheng MA800Plus arc coating machine",gallery:[["hs_md","Huasheng MD series coating machine"]],short:"High-rate arc coater for tool coating production.",
      desc:"The MD800 is the arc coating machine at the heart of Huasheng's turnkey tool-coating plant. Low-voltage, high-current arc discharge evaporates and ionises the target material, which is deposited on the tools under an electric field, giving a high deposition rate and strong coating adhesion.",
      features:["Arc coating with high deposition rate","High ionisation rate and good coverage on complex shapes","Very high impact resistance of coatings","Fully automatic operation"],
      specs:[["Technology","Arc coating"],["Capacity","12,000 pcs per batch (APMT1135 inserts)"],["Operation","Fully automatic"]],
      process:["TiAlN, AlCrN and similar hard coatings","Inserts, drills and end mills"],url:"https://www.hscoat.com/aip-coating-equipment/",k:"pvd arc aip tialn inserts drills end mills md800 turnkey",i:["tools"]},
     {id:"aip",photo:"hs_pvd",photoAlt:"Huasheng G4PRO arc coating machine",name:"Arc coating equipment",tag:"Arc coating",short:"Hard nitride coatings for cutting tools.",
      desc:"Arc coating systems for hard nitride coatings such as TiAlN and AlCrN on inserts, drills, end mills and forming tools.",
      features:["High deposition rate","Strong adhesion","Multilayer and nano-layer coatings"],process:["Cutting tool coating","Mould and die coating"],
      url:"https://www.hscoat.com/aip-coating-equipment/",k:"pvd tialn alcrn inserts drills end mills cutting tools arc",i:["tools"]},
     {id:"hipims",photo:"hs_hipims",photoAlt:"Huasheng HiPIMS coating machine",name:"HiPIMS coating equipment",short:"Dense, smooth, droplet-free coatings.",
      desc:"High-power impulse magnetron sputtering systems that produce dense, smooth coatings without the droplets typical of arc processes.",
      features:["High-density plasma","Smooth, droplet-free surfaces"],process:["Precision tool coating","Component coating"],
      url:"https://www.hscoat.com/hipims-coating-equipment/",k:"pvd sputtering smooth hipims",i:["tools","medical","auto"]},
     {id:"hybrid",name:"Hybrid coating equipment",short:"Arc and sputtering in one chamber.",
      desc:"Hybrid systems that combine arc and sputtering sources in one chamber for multilayer coating designs.",
      features:["Multiple processes in one chamber","Flexible multilayer designs"],process:["Multilayer tool and component coatings"],
      url:"https://www.hscoat.com/hybrid-coating-equipment/",k:"pvd arc sputtering multilayer hybrid",i:["tools","auto"]},
     {id:"decorative",name:"Decorative coating equipment",short:"Colour PVD finishes.",
      desc:"PVD systems for durable colour finishes on hardware, sanitaryware, watches and consumer products.",
      features:["Wide colour range","Durable, wear-resistant finishes"],process:["Decorative PVD"],
      url:"https://www.hscoat.com/decorative-coating-equipment/",k:"colour gold black decorative sanitary",i:["watch"]}
    ]},
   {id:"dlc",photo:"hs_dlc",photoAlt:"Huasheng DLC coating system",name:"DLC coating equipment",sub:"PECVD DLC and ta-C",
    desc:"Diamond-like carbon coating systems for low friction and high hardness.",url:"https://www.hscoat.com/dlc-coating-equipment/",
    machines:[
     {id:"pecvd-dlc",photo:"hs_dlc",photoAlt:"Huasheng DLC coating system",name:"PECVD DLC coating equipment",short:"Low-friction coatings for components.",
      desc:"Plasma-enhanced CVD systems for low-friction DLC coatings on automotive and engineering components such as piston pins.",
      features:["Low friction","High hardness and wear resistance"],process:["Automotive component coating","Engineering component coating"],
      url:"https://www.hscoat.com/pecvd-dlc-coating-equipment/",k:"dlc low friction piston pin pecvd",i:["auto","medical"]},
     {id:"tac",photo:"hs_tc802",photoAlt:"Huasheng TC802 coating machine",name:"ta-C coating equipment",short:"Hydrogen-free carbon coatings.",
      desc:"Systems for hydrogen-free tetrahedral amorphous carbon (ta-C) coatings, used for machining non-ferrous materials and for high-wear parts.",
      features:["Hydrogen-free carbon","Very high hardness"],process:["Tools for aluminium and non-ferrous machining","High-wear components"],
      url:"https://www.hscoat.com/ta-c-coating-equipment/",k:"tac hydrogen-free carbon aluminium machining",i:["tools","auto"]}
    ]},
   {id:"diamond",photo:"hs_diamond",photoAlt:"Huasheng coating system",name:"Diamond coating equipment",sub:"HFCVD",desc:"Hot-filament CVD systems that grow diamond films on carbide tools.",url:"https://www.hscoat.com/diamond-coating-equipment/",
    machines:[
     {id:"hfcvd",name:"HFCVD diamond coating equipment",short:"Diamond films on carbide tools.",
      desc:"Hot-filament CVD systems that deposit diamond on carbide tools for machining graphite, composites and aluminium-silicon alloys.",
      features:["Very high hardness","Long tool life on abrasive materials"],process:["Carbide tool coating"],
      url:"https://www.hscoat.com/hfcvd-diamond-coating-equipment/",k:"diamond carbide graphite composites hfcvd",i:["tools","aero"]}
    ]},
   {id:"optical",photo:"hs_mc1000",photoAlt:"Huasheng MC1000 coating machine",name:"Optical coating equipment",sub:"Evaporation and magnetron sputtering",desc:"Systems for optical thin films on lenses and optical components.",url:"https://www.hscoat.com/optical-coating-equipment/",
    machines:[
     {id:"evaporation",name:"Evaporation optical coating equipment",short:"Anti-reflection and filter coatings.",
      desc:"Evaporation systems for anti-reflection and filter coatings on lenses and optics.",features:["Anti-reflection coatings","Filter coatings"],process:["Lens coating"],
      url:"https://www.hscoat.com/evaporation-optical-coating-equipment/",k:"anti-reflection lenses evaporation",i:["optics"]},
     {id:"sputter-optical",name:"Magnetron sputtering optical coating equipment",short:"Precise multilayer optical films.",
      desc:"Magnetron sputtering systems for precise multilayer optical films.",features:["Precise layer control","Multilayer films"],process:["Optical filters","Precision optics"],
      url:"https://www.hscoat.com/magnetron-sputtering-optical-coating-equipment/",k:"optical films sputtering",i:["optics","semi"]}
    ]},
   {id:"cvd",photo:"hs_ma1500",photoAlt:"Huasheng MA1500 coating machine",name:"CVD coating equipment",sub:"CVD and CVA aluminizing",desc:"Chemical vapour deposition systems for thick wear-resistant and high-temperature coatings.",url:"https://www.hscoat.com/cvd-coating-equipment/",
    machines:[
     {id:"cvd-systems",name:"CVD coating systems",short:"Thick wear-resistant coatings.",
      desc:"CVD systems for thick wear-resistant coatings, typically on turning inserts.",features:["Thick, wear-resistant layers"],process:["Turning insert coating"],
      url:"https://www.hscoat.com/cvd-coating-systems/",k:"cvd inserts turning",i:["tools"]},
     {id:"cva",name:"CVA aluminizing systems",short:"Aluminide coatings for high-temperature parts.",
      desc:"Chemical vapour aluminizing systems for aluminide coatings that protect parts against high-temperature oxidation.",features:["High-temperature oxidation resistance"],process:["Turbine and hot-section parts"],
      url:"https://www.hscoat.com/cva-aluminizing-systems/",k:"aluminide turbine oxidation cva",i:["aero"]}
    ]},
   {id:"turnkey",photo:"turnkey",photoAlt:"Layout of the Huasheng turnkey coating plant",name:"Turnkey coating solutions",sub:"Complete MD800 tool-coating plant",desc:"A complete tool-coating centre from Huasheng: cleaning, coating, maintenance, utilities and quality control, laid out and commissioned as one plant.",url:"https://www.hscoat.com/turnkey-solution/",
    machines:[
     {id:"md800-turnkey",name:"MD800 turnkey coating centre",photo:"turnkey",photoAlt:"Layout of the Huasheng turnkey coating plant: cleaning, coating, chiller, sandblasting and quality control",gallery:[["cleanline","Fully automatic ultrasonic cleaning line"],["ma800","MA800Plus arc coating machine"]],short:"Complete plant for in-house tool coating.",
      desc:"Huasheng's turnkey coating solution gives a tool maker full control of its own coating process, from incoming tools to inspected, coated product. The plant is built around the MD800 arc coater, with a fully automatic ultrasonic cleaning line, blasting equipment for target and liner maintenance, utilities and quality-control instruments. Owning the process keeps coating know-how in-house, allows your own coating recipes, and cuts turnaround to as little as the same day.",
      features:["Full control of your coating process and know-how","Open technology to develop your own coatings","Same-day coating turnaround possible","Universal process flow for many tool types"],
      specs:[["Cleaning","Fully automatic ultrasonic cleaning line, 14,000 pcs/h (APMT1135)"],["Coating","MD800 arc coater, 12,000 pcs per batch (APMT1135)"],["Target maintenance","9060A manual sandblaster, about 2 min per target"],["Liner maintenance","1212F pressurised sandblaster, about 4 h per set"],["Cooling","MCW-600 air-cooled chiller, 60 kW, R407C, 380 V 50 Hz"],["Pure water","CSJ-05 EDI water purifier, up to 18 MΩ·cm"],["Compressed air","SZ-30A permanent-magnet inverter compressor"],["Quality control","XHS-4700 ball crater tester, HR-150C Rockwell hardness tester, industrial microscope"]],
      process:["Cleaning","Coating","Target and liner maintenance","Inspection and dispatch"],url:"https://www.hscoat.com/turnkey-solution/",k:"turnkey plant job shop coating centre md800",i:["tools"]}
    ]}
  ]}
];
const IND = [
 {id:"tools",n:"Cutting and gear cutting tools",d:"Hobs, shaper cutters, gear cutting tools, inserts, drills and end mills."},
 {id:"jobshop",n:"PVD coating service providers",d:"Coating job shops and in-house coating centres."},
 {id:"dies",n:"Dies and mould manufacturers",d:"Press tools, forging dies, die-casting and plastic moulds."},
 {id:"steel",n:"Steel and metal processing",d:"Commercial heat treaters, steel, alloy and forging plants."},
 {id:"power",n:"Power: wind, solar and thermal",d:"Gearbox parts, turbine blades, shafts and bearings."},
 {id:"oilgas",n:"Oil and gas",d:"Valves, pumps, drilling tools and wear parts."},
 {id:"auto",n:"Automotive",d:"Gears, transmission, engine and EV components."},
 {id:"aero",n:"Aerospace and defence",d:"Turbine parts, brazed assemblies, weapon and vehicle components."},
 {id:"medical",n:"Medical devices and implants",d:"Orthopaedic implants, surgical instruments, cleanroom final cleaning."},
 {id:"semi",n:"Semiconductor and electronics",d:"Chamber parts and precision components."},
 {id:"optics",n:"Optics and eyewear",d:"Lenses and optical components."},
 {id:"watch",n:"Watches, jewellery and decorative",d:"Cases, bands, fittings and hardware finishes."}
];
const IND_ICON={"tools": "<path class=\"d\" d=\"M12 3.2l1.3 1.9 2.2-.6.4 2.3 2.3.4-.6 2.2 1.9 1.3-1.9 1.3.6 2.2-2.3.4-.4 2.3-2.2-.6L12 17.6l-1.3-1.9-2.2.6-.4-2.3-2.3-.4.6-2.2L4.5 10.1l1.9-1.3-.6-2.2 2.3-.4.4-2.3 2.2.6z\"/><circle cx=\"12\" cy=\"10.4\" r=\"2.6\"/><path d=\"M12 17.6V22M10.5 20h3\"/>", "jobshop": "<rect class=\"d\" x=\"4\" y=\"3\" width=\"16\" height=\"15\" rx=\"2.5\"/><circle cx=\"12\" cy=\"10.5\" r=\"3.6\"/><path d=\"M12 5.5v1.4M12 14.1v1.4M7 10.5h1.4M15.6 10.5H17\"/><path d=\"M7 21h10M9 18v3M15 18v3\"/>", "dies": "<path class=\"d\" d=\"M3 4h18v6H3z\"/><path d=\"M3 14h18v6H3z\"/><path d=\"M8.5 10v1.2a3.5 3.5 0 0 0 7 0V10M8.5 14v-1.2\"/><path d=\"M15.5 14v-1.2M12 4V2\"/>", "steel": "<path class=\"d\" d=\"M4 3h16v3.5h-6v11h6V21H4v-3.5h6v-11H4z\"/>", "power": "<circle class=\"d\" cx=\"18\" cy=\"5.5\" r=\"2.5\"/><path d=\"M18 1.5v1M21.5 5.5h1M20.6 2.9l.7-.7\"/><circle cx=\"9\" cy=\"8\" r=\"1.4\"/><path d=\"M9 9.4V22M6 22h6\"/><path class=\"d\" d=\"M9 6.6 8 1.8l2.2 1.4zM10.2 8.8l4.5 2-2.6.9zM7.8 8.8 3.4 11l.5-2.7z\"/>", "oilgas": "<path class=\"d\" d=\"M12 2.5c3.4 4.4 5.6 7.3 5.6 10.6a5.6 5.6 0 0 1-11.2 0C6.4 9.8 8.6 6.9 12 2.5z\"/><path d=\"M9.6 13.6a2.5 2.5 0 0 0 2.4 2.5\"/>", "auto": "<path class=\"d\" d=\"M3 16.5V13l2.3-5.2A2 2 0 0 1 7.1 6.6h9.8a2 2 0 0 1 1.8 1.2L21 13v3.5z\"/><path d=\"M5.2 12.5h13.6\"/><circle cx=\"7.5\" cy=\"17\" r=\"2\"/><circle cx=\"16.5\" cy=\"17\" r=\"2\"/>", "aero": "<path class=\"d\" d=\"M21 4.2c.8.8-.2 2.6-1.6 4L16 11.6l2 8.2-1.8 1.8-3.8-6.6-3.2 3.2.4 2.6-1.4 1.4-1.8-3.6-3.6-1.8L4.2 15.4l2.6.4 3.2-3.2-6.6-3.8L5.2 7l8.2 2 3.4-3.4c1.4-1.4 3.2-2.4 4.2-1.4z\"/>", "medical": "<path class=\"d\" d=\"M12 21.5s-7.5-4.3-7.5-10.2V5.2L12 2.5l7.5 2.7v6.1c0 5.9-7.5 10.2-7.5 10.2z\"/><path d=\"M12 8v7M8.5 11.5h7\"/>", "semi": "<rect class=\"d\" x=\"6.5\" y=\"6.5\" width=\"11\" height=\"11\" rx=\"1.8\"/><rect x=\"9.5\" y=\"9.5\" width=\"5\" height=\"5\" rx=\".8\"/><path d=\"M9.5 6.5V3M14.5 6.5V3M9.5 21v-3.5M14.5 21v-3.5M6.5 9.5H3M6.5 14.5H3M21 9.5h-3.5M21 14.5h-3.5\"/>", "optics": "<circle class=\"d\" cx=\"6.5\" cy=\"14\" r=\"4\"/><circle class=\"d\" cx=\"17.5\" cy=\"14\" r=\"4\"/><path d=\"M10.5 13.5c1-.8 2-.8 3 0M2.5 13 4 6.5h2M21.5 13 20 6.5h-2\"/>", "watch": "<rect class=\"d\" x=\"8.5\" y=\"1.5\" width=\"7\" height=\"4\" rx=\"1\"/><rect class=\"d\" x=\"8.5\" y=\"18.5\" width=\"7\" height=\"4\" rx=\"1\"/><circle cx=\"12\" cy=\"12\" r=\"6\"/><path d=\"M12 8.8V12l2.2 1.4\"/>"};
const IND_COL={tools:["#FF9A3C","#E0521B"],jobshop:["#27C4B5","#0B8A7E"],dies:["#7C8CFF","#4353D6"],steel:["#9AA8B2","#56636B"],
 power:["#FFD34D","#F29B0C"],oilgas:["#4A4A4A","#161616"],auto:["#FF6B6B","#D62839"],aero:["#4FB3FF","#1667C9"],medical:["#FF7EB3","#D6336C"],
 semi:["#B18CFF","#6F3FD6"],optics:["#4DE1F0","#1596B8"],watch:["#E9C46A","#B8860B"]};
const PROC_OPT={bmi:"Vacuum heat treatment (BMI)",novatec:"Ultrasonic cleaning (Novatec)",huasheng:"PVD / DLC / diamond coating (Huasheng)"};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
/* Extra industry tags for each machine */
(()=>{const T={
 jobshop:["md800","aip","hipims","hybrid","decorative","pecvd-dlc","tac","hfcvd","cvd-systems","md800-turnkey","pre-pvd","pluritank-line","2crd-system","plasma-nitriding"],
 dies:["b8t","vse8t","tempering","allnit","plasma-nitriding","cool-plus","aip","hybrid","hipims","tac","pre-pvd","pluritank-line","2crd-system"],
 steel:["b8t","vse8t","oil-horizontal","oil-vertical","tempering","allcarb","allnit","plasma-nitriding","brazing","lab","pluritank-line"],
 aero:["b8t","vse8t","brazing","allcarb","cool-plus","fpi","pluritank-line","2crd-system","hipims","pecvd-dlc","cva"],
 power:["vse8t","allcarb","allnit","brazing","cva","pecvd-dlc","fpi","pluritank-line"],
 oilgas:["vse8t","oil-vertical","allnit","plasma-nitriding","aip","hybrid","pecvd-dlc","tac","fpi","pluritank-line"]};
 CATALOG.forEach(b=>b.cats.forEach(c=>c.machines.forEach(m=>{m.i=m.i||[];for(const k in T)if(T[k].includes(m.id)&&!m.i.includes(k))m.i.push(k)})));})();
(()=>{const G=["md800","aip","hybrid","hipims","tac","md800-turnkey","b8t","tempering","cool-plus","allnit","plasma-nitriding","pre-pvd","pluritank-line","2crd-system"];
 CATALOG.forEach(b=>b.cats.forEach(c=>c.machines.forEach(m=>{if(G.includes(m.id))m.k=(m.k||"")+" hob hobs shaper cutter gear cutting tools broach"})));})();
const IDX=[];
CATALOG.forEach(b=>b.cats.forEach(c=>c.machines.forEach(m=>IDX.push({n:m.name,b:b.name,bid:b.id,cid:c.id,mid:m.id,s:m.short||"",f:c.name,k:m.k||"",i:m.i||[],href:`#/${b.id}/${c.id}/${m.id}`,_m:m,_c:c,_b:b}))));
(()=>{const f=document.querySelector("#huasheng figure img");if(f)PHOTOS.lineup=f.getAttribute("src")})();
const fig=(o,brand,...fb)=>{const src=[o,...fb].find(x=>x&&x.photo&&PHOTOS[x.photo]);if(src&&src!==o)o={photo:src.photo,photoAlt:src.photoAlt,name:o.name};return o.photo&&PHOTOS[o.photo]?`<figure class="mphoto"><img src="${PHOTOS[o.photo]}" alt="${esc(o.photoAlt||o.name)}"></figure>`:`<div class="mphoto empty"><span>Machine photo from the ${esc(brand)} dealer kit</span></div>`};
const logo=id=>{const im=document.querySelector(`.dealer [data-logo="${id}"] img`);return im?im.getAttribute("src"):""};

/* Home page accordions, generated from the catalogue */
document.querySelectorAll(".families[data-brand]").forEach(el=>{
  const b=CATALOG.find(x=>x.id===el.dataset.brand);
  el.innerHTML=`<p class="fam-head"><b>${esc(el.dataset.title)}</b><a href="#/${b.id}">See all ${esc(b.name)} machines</a></p>`+
  b.cats.map((c,ci)=>`<details data-cat="${c.id}"><summary><span class="t">${esc(c.name)}<small>${esc(c.sub)}</small></span><span class="ic" aria-hidden="true">+</span></summary>
   <ul class="models">${c.machines.map(m=>`<li><a href="#/${b.id}/${c.id}/${m.id}"><b>${esc(m.name)}</b><span>${esc(m.short)}</span></a></li>`).join("")}</ul>
   <a class="catlink" href="#/${b.id}/${c.id}">View all ${esc(c.name)}</a></details>`).join("")+
  `<div class="cat-thumbs">${b.cats.map(c=>{const n=c.machines.length,ph=c.photo&&PHOTOS[c.photo];
    return `<button type="button" class="cthumb${ph?"":" nophoto"}" data-open="${c.id}">${ph?`<img src="${PHOTOS[c.photo]}" alt="">`:""}<span class="ct-t">${esc(c.name)}</span><span class="ct-n">${n} ${n===1?"product":"products"}</span></button>`}).join("")}</div>`;
  el.querySelectorAll(".cthumb").forEach(t=>t.addEventListener("click",()=>{const d=el.querySelector(`details[data-cat="${t.dataset.open}"]`);d.open=true;d.querySelector("summary").focus();}));
  const sec=el.closest(".partner"), vis=sec&&sec.querySelector(".p-visual"), th=el.querySelector(".cat-thumbs");
  if(vis&&th) vis.appendChild(th);
  const upd=()=>{const o=!!el.querySelector("details[open]");el.classList.toggle("has-open",o);if(sec)sec.classList.toggle("has-open",o)};
  el.querySelectorAll("details").forEach(d=>d.addEventListener("toggle",upd));
});


document.querySelectorAll("img[data-photo]").forEach(i=>{if(PHOTOS[i.dataset.photo])i.src=PHOTOS[i.dataset.photo]});
(()=>{const f=document.querySelector("#novatec figure img");if(f){f.src=PHOTOS.nov_main;f.alt="Novatec PLURITANK multi-chamber ultrasonic cleaning line in a cleanroom"}})();
/* Swap the brand photo to the category that was opened */
document.querySelectorAll(".families[data-brand]").forEach(el=>{
  const b=CATALOG.find(x=>x.id===el.dataset.brand);
  const figEl=el.closest(".partner").querySelector("figure.photo img");
  if(!figEl) return;
  const cap=document.createElement("figcaption"); cap.className="photo-cap"; cap.setAttribute("aria-live","polite");
  figEl.after(cap);
  const def={src:figEl.getAttribute("src"),alt:figEl.alt};
  const show=c=>{
    const src=c&&c.photo&&PHOTOS[c.photo]?PHOTOS[c.photo]:def.src;
    cap.textContent=c&&c.photo&&PHOTOS[c.photo]?c.name:"";
    if(figEl.getAttribute("src")===src) return;
    figEl.classList.add("swap");
    setTimeout(()=>{figEl.src=src;figEl.alt=c&&c.photo?(c.photoAlt||c.name):def.alt;figEl.classList.remove("swap")},150);
  };
  el.querySelectorAll("details").forEach(d=>d.addEventListener("toggle",()=>{
    if(d.open){show(b.cats.find(x=>x.id===d.dataset.cat));}
    else{const o=[...el.querySelectorAll("details[open]")].pop();show(o?b.cats.find(x=>x.id===o.dataset.cat):null);}
  }));
});

/* Products mega menu */
const mega=document.getElementById("mega");
mega.innerHTML=`<div class="mega-grid">${CATALOG.map(b=>`<div><a class="mega-brand" href="#/${b.id}"><img src="${logo(b.id)}" alt="${esc(b.name)}"></a><ul>${b.cats.map(c=>`<li><a href="#/${b.id}/${c.id}">${esc(c.name)}</a></li>`).join("")}</ul></div>`).join("")}</div>`;
const megaBtn=document.getElementById("mega-btn");
function closeMega(){if(mega.hidden)return;mega.hidden=true;megaBtn.setAttribute("aria-expanded","false");if(typeof spyNow==="function")setTimeout(spyNow,50)}
megaBtn.addEventListener("click",()=>{const o=mega.hidden;if(!o){closeMega();return}mega.hidden=false;megaBtn.setAttribute("aria-expanded","true");if(typeof markNav==="function")markNav("products")});
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeMega()});
document.addEventListener("click",e=>{if(!mega.hidden&&!mega.contains(e.target)&&e.target!==megaBtn)closeMega()});
mega.addEventListener("click",e=>{if(e.target.closest("a"))closeMega()});

/* Router */
const home=document.getElementById("top"), view=document.getElementById("view");
const crumbs=parts=>`<div class="crumbrow"><button type="button" class="backbtn" data-back><span aria-hidden="true">‹</span> Back</button><nav class="crumbs" aria-label="Breadcrumb"><a href="#">Products</a>${parts.map(p=>p.href?` <span aria-hidden="true">/</span> <a href="${p.href}">${esc(p.t)}</a>`:` <span aria-hidden="true">/</span> <span aria-current="page">${esc(p.t)}</span>`).join("")}</nav></div>`;
const enquire=(bid,label)=>`<button type="button" class="btn btn-primary" data-enquire="${bid}" data-label="${esc(label)}">Enquire about this</button>`;
function brandPage(b){
  document.title=`${b.name} | GREETS`;
  return `${crumbs([{t:b.name}])}
  <header class="phead has-photo brandhead"><div><span class="plate big"><img src="${logo(b.id)}" alt="${esc(b.name)}"></span><h1 style="margin-top:22px">${esc(b.name)} in India</h1><p class="lede">${esc(b.full)}, ${esc(b.country)}. ${esc(b.intro)}</p></div>${fig(b,b.name)}</header>
  <div class="cards">${b.cats.map(c=>`<a class="card" href="#/${b.id}/${c.id}"><b>${esc(c.name)}</b><span>${esc(c.sub)}</span><em>${c.machines.length} ${c.machines.length===1?"product":"products"}</em></a>`).join("")}</div>
  <p class="ext"><a href="${b.site}" target="_blank" rel="noopener">Visit the ${esc(b.name)} website</a></p>`;
}
function catPage(b,c){
  document.title=`${c.name} | ${b.name} | GREETS`;
  return `${crumbs([{t:b.name,href:`#/${b.id}`},{t:c.name}])}
  <header class="phead has-photo"><div><p class="brandline">${esc(b.name)}, ${esc(b.country)}</p><h1>${esc(c.name)}</h1><p class="lede">${esc(c.desc)}</p></div>${fig(c,b.name,b)}</header>
  <div class="cards">${c.machines.map(m=>`<a class="card" href="#/${b.id}/${c.id}/${m.id}">${m.tag?`<i>${esc(m.tag)}</i>`:""}<b>${esc(m.name)}</b><span>${esc(m.short)}</span><em>View details</em></a>`).join("")}</div>
  <div class="cta-row">${enquire(b.id,c.name)}<a class="btn btn-ghost" href="${c.url}" target="_blank" rel="noopener">See this range on the ${esc(b.name)} website</a></div>`;
}
function machinePage(b,c,m){
  document.title=`${m.name} | ${b.name} | Greets`;
  const rel=c.machines.filter(x=>x!==m);
  // main photo with thumbnails (main + gallery) that swap on click
  const src=[m,c,b].find(x=>x&&x.photo&&PHOTOS[x.photo]);
  const shots=[];
  if(src) shots.push([src.photo,src.photoAlt||m.name]);
  (m.gallery||[]).forEach(g=>{if(PHOTOS[g[0]]&&!shots.some(x=>x[0]===g[0]))shots.push(g)});
  const photo=shots.length?`<figure class="mshot"><img id="mshot-main" src="${PHOTOS[shots[0][0]]}" alt="${esc(shots[0][1])}"><figcaption id="mshot-cap">${shots.length>1?esc(shots[0][1]):""}</figcaption>
    ${shots.length>1?`<div class="mthumbs">${shots.map((g,k)=>`<button type="button" class="mthumb" data-src="${g[0]}" data-cap="${esc(g[1])}" aria-label="Show photo: ${esc(g[1])}"${k===0?' aria-current="true"':''}><img src="${PHOTOS[g[0]]}" alt=""></button>`).join("")}</div>`:""}</figure>`
    :`<div class="mshot empty"><span>Machine photo from the ${esc(b.name)} dealer kit</span></div>`;
  const many=!!(m.specs&&m.specs.length>7);
  const relnav=rel.length?`<nav class="mrel" aria-label="More in ${esc(c.name)}"><span>More in ${esc(c.name)}:</span>${rel.map(x=>`<a href="#/${b.id}/${c.id}/${x.id}">${esc(x.name)}</a>`).join("")}</nav>`:"";
  const specs=m.specs?`<table class="spec"><tbody>${m.specs.map(r=>`<tr><th scope="row">${esc(r[0])}</th><td>${esc(r[1])}</td></tr>`).join("")}</tbody></table><p class="note">Manufacturer figures; exact values depend on the configuration.</p>`
    :`<div class="ondemand"><b>Datasheet on request</b><p>This machine is configured to your parts and throughput. Tell us what you need and we'll send the datasheet and a configuration proposal.</p>${enquire(b.id,m.name+" datasheet")}</div>`;
  return `<div class="mpage">${crumbs([{t:b.name,href:`#/${b.id}`},{t:c.name,href:`#/${b.id}/${c.id}`},{t:m.name}])}
  <div class="mlayout${many?" many":""}">
   <div class="mleft">
    <p class="brandline">${esc(b.name)}, ${esc(b.country)}${m.tag?`, ${esc(m.tag)}`:""}</p>
    <h1>${esc(m.name)}</h1>
    <p class="lede">${esc(m.desc)}</p>
    <div class="cta-row">${enquire(b.id,m.name)}<a class="btn btn-ghost" href="${m.url}" target="_blank" rel="noopener">View on the ${esc(b.name)} website</a></div>
    <div class="mcols">
     <section><h2>Key features</h2><ul class="feat">${m.features.map(f=>`<li>${esc(f)}</li>`).join("")}</ul></section>
     <section><h2>Processes and applications</h2><div class="pills">${m.process.map(p=>`<span>${esc(p)}</span>`).join("")}</div>
      ${m.i&&m.i.length?`<h2 class="sub2">Industries</h2><p class="indline">${m.i.map(x=>esc(IND.find(z=>z.id===x).n)).join(", ")}</p>`:""}</section>
    </div>
    ${relnav}
   </div>
   <div class="mright">${photo}<section class="mspec"><h2>Technical data</h2>${specs}</section></div>
  </div></div>`;
}

history.scrollRestoration="manual";
let lastDepth=0;
function route(){
  const h=location.hash;
  const saved=history.state&&typeof history.state.y==="number"?history.state.y:null;
  if(!history.state||history.state.d==null) history.replaceState({d:lastDepth+1,y:null},"");
  lastDepth=history.state.d;
  if(h.startsWith("#/")){
    const [bid,cid,mid]=h.slice(2).split("/");
    const b=CATALOG.find(x=>x.id===bid), c=b&&cid?b.cats.find(x=>x.id===cid):null, m=c&&mid?c.machines.find(x=>x.id===mid):null;
    let html;
    if(m) html=machinePage(b,c,m); else if(c) html=catPage(b,c); else if(b) html=brandPage(b);
    else html=`${crumbs([{t:"Not found"}])}<h1>Page not found</h1><p class="lede">This product page doesn't exist. <a href="#">Go back to all products</a>.</p>`;
    view.innerHTML=`<div class="wrap">${html}</div>`;
    home.hidden=true; view.hidden=false; window.scrollTo(0,saved||0);
    const h1=view.querySelector("h1"); if(h1){h1.tabIndex=-1;h1.focus({preventScroll:true})}
  } else {
    view.hidden=true; home.hidden=false; document.title=HOME_TITLE;
    const t=h.length>1?document.getElementById(h.slice(1)):null;
    if(saved!=null) requestAnimationFrame(()=>window.scrollTo(0,saved)); else if(t) requestAnimationFrame(()=>t.scrollIntoView()); else window.scrollTo(0,0);
    if(pending){const f=document.getElementById("enquiry");f.process.value=pending.p;if(!f.msg.value)f.msg.value=`Enquiry about: ${pending.l}\n`;pending=null}
  }
}
function moveInd(){const ind=document.getElementById("nav-ind"),g=document.getElementById("navgroup");if(!ind||!g)return;const a=g.querySelector("[data-spy].is-active");
  if(!a||a.offsetParent===null){ind.style.opacity=0;return}const gr=g.getBoundingClientRect(),r=a.getBoundingClientRect();
  ind.style.opacity=1;ind.style.width=r.width+"px";ind.style.height=r.height+"px";ind.style.transform=`translate(${r.left-gr.left}px,${r.top-gr.top}px)`;}
function markNav(key){document.querySelectorAll("[data-spy]").forEach(e=>{const on=e.dataset.spy===key;e.classList.toggle("is-active",on);if(on&&e.tagName==="A")e.setAttribute("aria-current","true");else e.removeAttribute("aria-current")});moveInd();}
window.addEventListener("resize",moveInd);if(document.fonts)document.fonts.ready.then(moveInd);
function markMega(){const h=location.hash;document.querySelectorAll("#mega a").forEach(a=>{const href=a.getAttribute("href");const on=h.startsWith("#/")&&(h===href||h.startsWith(href+"/"));a.classList.toggle("is-current",on);if(on)a.setAttribute("aria-current","page");else a.removeAttribute("aria-current")})}
window.addEventListener("hashchange",()=>{if(location.hash.startsWith("#/"))markNav("products");markMega()});
/* remember scroll position of each history entry, so Back returns to the same spot */
let _st=0;window.addEventListener("scroll",()=>{if(_st)return;_st=setTimeout(()=>{_st=0;try{history.replaceState({...(history.state||{}),y:window.scrollY},"")}catch(e){}},150)},{passive:true});
/* highlight the header link for the section on screen */
const SPY={home:"home",industries:"industries",finder:"products",bmi:"products",novatec:"products",huasheng:"products",why:"why",contact:"contact"};
let spyLock=0;
document.querySelectorAll(".navgroup a[data-spy]").forEach(l=>l.addEventListener("click",()=>{markNav(l.dataset.spy);clearTimeout(spyLock);spyLock=setTimeout(()=>spyLock=0,1000)}));
function spyNow(){if(!mega.hidden)return;if(!view.hidden){markNav("products");return}const mid=window.innerHeight/2;for(const id of Object.keys(SPY)){const el=document.getElementById(id);if(!el)continue;const r=el.getBoundingClientRect();if(r.top<=mid&&r.bottom>=mid){markNav(SPY[id]);return}}}
const spyObs=new IntersectionObserver(es=>{if(!view.hidden||spyLock||!mega.hidden)return;es.forEach(e=>{if(e.isIntersecting)markNav(SPY[e.target.id])})},{rootMargin:"-45% 0px -50% 0px"});
Object.keys(SPY).forEach(id=>{const el=document.getElementById(id);if(el)spyObs.observe(el)});
let pending=null; const HOME_TITLE=document.title;
view.addEventListener("click",e=>{if(e.target.closest("[data-back]")){const d=history.state&&history.state.d;if(d>1)history.back();else{const parts=location.hash.slice(2).split("/");parts.pop();location.hash=parts.length?"#/"+parts.join("/"):"#"+(parts.length?"":"home")}return}
 const t=e.target.closest(".mthumb");if(t){const im=document.getElementById("mshot-main");im.src=PHOTOS[t.dataset.src];im.alt=t.dataset.cap;document.getElementById("mshot-cap").textContent=t.dataset.cap;view.querySelectorAll(".mthumb").forEach(x=>x.removeAttribute("aria-current"));t.setAttribute("aria-current","true");return}
 const b=e.target.closest("[data-enquire]");if(!b)return;pending={p:PROC_OPT[b.dataset.enquire],l:b.dataset.label};location.hash="#contact"});
window.addEventListener("hashchange",route);

/* ---------- smart search: understands applications, processes and synonyms ---------- */
const PROC={harden:["b8t","vse8t","oil-horizontal","oil-vertical","lab"],temper:["tempering"],braze:["brazing","alu-brazing"],carburize:["allcarb"],
 nitride:["allnit","plasma-nitriding"],cryo:["cool-plus"],clean:["pluritank-line","pre-pvd","cleanroom","2crd-system","ipc","fcps","combined","generators","plt60v"],
 passivate:["fcps","combined"],inspect:["fpi"],pvd:["md800","aip","hipims","hybrid","decorative"],dlc:["pecvd-dlc","tac"],diamond:["hfcvd"],
 optical:["evaporation","sputter-optical"],cvd:["cvd-systems","cva"],turnkey:["md800-turnkey","combined"]};
PROC.coat=[...PROC.pvd,...PROC.dlc,...PROC.diamond,...PROC.optical,...PROC.cvd,"md800-turnkey"];
PROC.heat=[...PROC.harden,...PROC.temper,...PROC.braze,...PROC.carburize,...PROC.nitride,...PROC.cryo];
const PROC_LABEL={harden:"hardening",temper:"tempering",braze:"brazing",carburize:"carburizing",nitride:"nitriding",cryo:"sub-zero treatment",clean:"cleaning",passivate:"passivation",inspect:"crack inspection (FPI)",pvd:"PVD coating",dlc:"DLC coating",diamond:"diamond coating",optical:"optical coating",cvd:"CVD coating",turnkey:"turnkey plants",coat:"coating",heat:"heat treatment"};
const SYN=[
 [["mould","mold","die","dies","diecast","die-cast","injection","stamping","press tool","presstool","forging die","punch"],"i:dies"],
 [["hob","shaper","gear cutting","broach","drill","endmill","end mill","insert","tap","reamer","cutting tool","cutter","milling"],"i:tools"],
 [["car","automotive","auto","vehicle","gearbox","transmission","engine","piston","ev "],"i:auto"],
 [["aerospace","aircraft","aviation","defence","defense","military","weapon"],"i:aero"],
 [["implant","medical","orthopaedic","orthopedic","surgical","hospital","dental"],"i:medical"],
 [["semiconductor","wafer","electronic","chip"],"i:semi"],
 [["lens","optic","eyewear","spectacle","glass"],"i:optics"],
 [["watch","jewel","decorative","sanitary","faucet","hardware finish","colour","color"],"i:watch"],
 [["job shop","jobshop","coating service","coating centre","coating center","coater"],"i:jobshop"],
 [["steel","forging","metal","heat treater","alloy","foundry"],"i:steel"],
 [["wind","solar","thermal power","power plant","power","turbine"],"i:power"],
 [["oil","gas","valve","pump","drilling","petro","refinery"],"i:oilgas"],
 [["nitrid","nitrocarbur","ion nitr"],"p:nitride"],[["carburi","case harden","lpc"],"p:carburize"],
 [["harden","quench","anneal","stress reliev","sinter","vacuum furnace","furnace"],"p:harden"],[["temper"],"p:temper"],[["braz"],"p:braze"],
 [["cryo","sub-zero","subzero","deep freez"],"p:cryo"],[["heat treat","heat-treat","thermal process"],"p:heat"],
 [["clean","wash","degreas","ultrason","pre-treat","pretreat","rinse","dry"],"p:clean"],[["passivat"],"p:passivate"],
 [["fpi","penetrant","crack","ndt","inspection"],"p:inspect"],
 [["coat","plating","film","surface treat"],"p:coat"],[["pvd","arc","sputter","hipims","tialn","alcrn","tin ","physical vapour","physical vapor"],"p:pvd"],
 [["dlc","diamond-like","diamond like","ta-c","tac","low friction"],"p:dlc"],[["diamond","hfcvd"],"p:diamond"],[["cvd","aluminiz","aluminis"],"p:cvd"],
 [["anti-reflect","optical coat","evaporation"],"p:optical"],[["turnkey","plant","complete line","setup"],"p:turnkey"]
];
function lev1(a,b){if(Math.abs(a.length-b.length)>1)return false;let i=0,j=0,d=0;while(i<a.length&&j<b.length){if(a[i]===b[j]){i++;j++;continue}if(++d>1)return false;if(a.length>b.length)i++;else if(b.length>a.length)j++;else{i++;j++}}return d+(a.length-i)+(b.length-j)<=1}
function understand(q){
  const text=" "+q.toLowerCase().replace(/[^a-z0-9\- ]/g," ").replace(/\s+/g," ")+" ";
  const words=text.trim().split(" ").filter(w=>w.length>1);
  const inds=new Set(), procs=new Set(), used=new Set();
  SYN.forEach(([keys,c])=>keys.forEach(k=>{
    const hit=k.includes(" ")?text.includes(" "+k.trim()):words.some(w=>{const ok=w.startsWith(k)||(w.length>=4&&k.startsWith(w))||(w.length>=5&&k.length>=4&&[k.length-1,k.length,k.length+1].some(L=>lev1(w.slice(0,L),k)));if(ok)used.add(w);return ok});
    if(hit){(c[0]==="i"?inds:procs).add(c.slice(2))}}));
  return {words,inds:[...inds],procs:[...procs],free:words.filter(w=>!used.has(w))};
}
const STEP_OF=p=>({bmi:1,novatec:2,huasheng:3})[p.bid];
function scoreOf(p,u){
  let sc=0, why=[];
  const blob=(p.n+" "+p.b+" "+p.f+" "+p.s+" "+p.k).toLowerCase();
  u.inds.forEach(i=>{if(p.i.includes(i)){sc+=3;why.push(IND.find(z=>z.id===i).n)}});
  let procHit=false;
  u.procs.forEach(pr=>{if((PROC[pr]||[]).includes(p.mid)){sc+=5;procHit=true;why.push(PROC_LABEL[pr])}});
  u.words.forEach(w=>{if(p.n.toLowerCase().includes(w))sc+=4;else if(blob.includes(w))sc+=2});
  // when both an application and a process are asked for, favour machines matching both
  if(u.procs.length&&!procHit)sc=0;
  if(u.inds.length&&u.procs.length&&!(u.inds.some(i=>p.i.includes(i))))sc=Math.min(sc,1);
  return {sc,why:[...new Set(why)]};
}


/* Finder */
let brand="all", ind=null;
const q=document.getElementById("q"), res=document.getElementById("results"), st=document.getElementById("ind-status");
const fInd=document.getElementById("f-ind"), fCat=document.getElementById("f-cat");
fInd.innerHTML+=IND.map(x=>`<option value="${x.id}">${esc(x.n)}</option>`).join("");
function fillCats(){const cur=fCat.value;const bs=CATALOG.filter(x=>brand==="all"||x.name===brand);
  fCat.innerHTML=`<option value="">All categories</option>`+bs.map(x=>`<optgroup label="${esc(x.name)}">${x.cats.map(c=>`<option value="${x.id}/${c.id}">${esc(c.name)}</option>`).join("")}</optgroup>`).join("");
  if([...fCat.options].some(o=>o.value===cur))fCat.value=cur;}
const thumbOf=p=>{const o=[p._m,p._c,p._b].find(x=>x&&x.photo&&PHOTOS[x.photo]);return o?PHOTOS[o.photo]:""};
function syncButtons(){document.querySelectorAll(".seg button").forEach(x=>x.setAttribute("aria-pressed",x.dataset.brand===brand));
  const step=brand==="all"?"all":brand.toLowerCase();document.querySelectorAll(".steps button").forEach(x=>x.setAttribute("aria-pressed",x.dataset.step===step));}
function render(){
  const raw=q.value.trim(), cat=fCat.value, u=understand(raw);
  let list=IDX.filter(p=>(brand==="all"||p.b===brand)&&(!ind||p.i.includes(ind))&&(!cat||`${p.bid}/${p.cid}`===cat));
  let scored=list.map(p=>({p,...(raw?scoreOf(p,u):{sc:1,why:[]})})).filter(x=>x.sc>0);
  if(raw){const top=Math.max(0,...scored.map(x=>x.sc));scored=scored.filter(x=>x.sc>=Math.min(3,top));}
  scored.sort((a,b)=>STEP_OF(a.p)-STEP_OF(b.p)||b.sc-a.sc);
  const rowHtml=x=>{const p=x.p,th=thumbOf(p),lg=logo(p.bid);
    return `<a class="result" role="listitem" href="${p.href}"><span class="r-th">${th?`<img src="${th}" alt="" loading="lazy">`:""}</span><span class="r-main"><span class="n">${esc(p.n)}</span><span class="r-s">${x.why.length?`<em class="r-why">For ${esc(x.why.slice(0,2).join(", "))}</em> `:""}${esc(p.s)}</span></span><span class="r-cat">${esc(p.f)}</span><span class="b">${lg?`<img src="${lg}" alt="${esc(p.b)}">`:esc(p.b)}</span><span class="r-go" aria-hidden="true">›</span></a>`};
  if(!scored.length){res.innerHTML=`<p class="empty">No systems match. Try an application such as “moulds”, “hobs” or “implants”, a process such as “nitriding” or “DLC”, or <a href="#contact">ask Greets</a>.</p>`;}
  else if(raw){
    const steps=[[1,"Harden","BMI vacuum furnaces"],[2,"Clean","Novatec cleaning systems"],[3,"Coat","Huasheng coating equipment"]];
    res.innerHTML=steps.map(([n,v,sub])=>{const g=scored.filter(x=>STEP_OF(x.p)===n);return g.length?`<div class="r-group" role="presentation"><span class="bc-n">${n}</span><b>${v}</b><span>${sub}</span><em>${g.length}</em></div>${g.map(rowHtml).join("")}`:""}).join("");
  } else res.innerHTML=scored.map(rowHtml).join("");
  const n=scored.length;
  let head=`<b>${n}</b> ${n===1?"system":"systems"}`;
  if(raw&&(u.inds.length||u.procs.length)){
    const appl=u.inds.map(i=>IND.find(z=>z.id===i).n), pr=u.procs.map(x=>PROC_LABEL[x]);
    const stepsHit=[1,2,3].filter(k=>scored.some(x=>STEP_OF(x.p)===k)).map(k=>["","Harden","Clean","Coat"][k]);
    head+=` for ${esc([...appl,...pr].join(" + "))}${stepsHit.length>1?` <span class="route">Suggested route: ${stepsHit.join(" → ")}</span>`:""}`;
  } else if(raw) head+=` for “${esc(raw)}”`;
  const active=[brand!=="all"?brand:null,ind?IND.find(z=>z.id===ind).n:null,cat?fCat.options[fCat.selectedIndex].text:null].filter(Boolean);
  if(active.length) head+=` <span class="fchips">${active.map(esc).join(", ")}</span>`;
  if(raw||active.length) head+=`<button type="button" id="clr">Reset filters</button>`;
  st.innerHTML=head;
  const c=document.getElementById("clr"); if(c) c.onclick=()=>{brand="all";ind=null;q.value="";fInd.value="";fillCats();fCat.value="";syncButtons();render()};
}
document.querySelectorAll('.seg button[data-brand]:not([data-brand="all"])').forEach(bt=>{const id=bt.dataset.brand.toLowerCase(),src=logo(id);if(src){bt.innerHTML=`<img src="${src}" alt="${esc(bt.dataset.brand)}">`;bt.classList.add("logo-btn")}});
q.addEventListener("input",render);
document.querySelectorAll(".qchip").forEach(c=>c.addEventListener("click",()=>{q.value=c.textContent;render();q.focus()}));
fInd.addEventListener("change",()=>{ind=fInd.value||null;render()});
fCat.addEventListener("change",()=>{if(fCat.value){const bid=fCat.value.split("/")[0];brand=CATALOG.find(x=>x.id===bid).name;syncButtons();}render()});
document.querySelectorAll(".steps button").forEach(b=>b.addEventListener("click",()=>{const st=b.dataset.step;brand=st==="all"?"all":CATALOG.find(x=>x.id===st).name;fillCats();syncButtons();render()}));
document.querySelectorAll(".seg button").forEach(b=>b.addEventListener("click",()=>{brand=b.dataset.brand;fillCats();syncButtons();render()}));
fillCats();
document.getElementById("ind-grid").innerHTML=IND.map(x=>{
  const brands=[...new Set(IDX.filter(p=>p.i.includes(x.id)).map(p=>p.b))];
  return `<button class="ind ind2" type="button" data-ind="${x.id}" style="--c1:${IND_COL[x.id][0]};--c2:${IND_COL[x.id][1]}"><span class="ind-h"><span class="ind-ic" aria-hidden="true"><svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${IND_ICON[x.id]||""}</svg></span><b>${x.n}</b></span><span class="d">${x.d}</span><span class="tags">${brands.map(b=>`<span>${b}</span>`).join("")}</span></button>`}).join("");
document.querySelectorAll(".ind").forEach(b=>b.addEventListener("click",()=>{ind=b.dataset.ind;fInd.value=ind;brand="all";q.value="";fillCats();fCat.value="";syncButtons();render();document.getElementById("finder").scrollIntoView()}));
document.getElementById("enquiry").addEventListener("submit",e=>{e.preventDefault();const f=e.target,note=document.getElementById("form-note");
  if(!f.name.value.trim()||!f.email.value.trim()){note.textContent="Add your name and email so we can reply.";(f.name.value.trim()?f.email:f.name).focus();return}
  const body=`Name: ${f.name.value}\nCompany: ${f.company.value}\nEmail: ${f.email.value}\nPhone: ${f.phone.value}\nCity: ${f.city.value}\nProcess: ${f.process.value}\n\n${f.msg.value}`;
  location.href=`mailto:enquiry-equipment@greets.co.in?subject=${encodeURIComponent("Website enquiry: "+f.process.value)}&body=${encodeURIComponent(body)}`;
  note.textContent="Your email app should open with the enquiry ready to send. If it doesn't, email enquiry-equipment@greets.co.in directly.";});
render(); route(); if(location.hash.startsWith("#/"))markNav("products"); markMega();
