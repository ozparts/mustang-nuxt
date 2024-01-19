import { Manufacturers } from "./index";

export const getProductInfo = (
  part: { name: string; description: string },
  productType: string,
  manufacturergroup: string
) => {
  let text = [] as string[];

  // DBA PRODUCTS
  if (manufacturergroup === Manufacturers.DBA.id) {
    if (productType === "kit") {
      if (part.name.includes("SP") || part.name.includes("SS")) {
        text = [
          "Upgrade over OE with a 12 month Manufacturers Warranty",
          "High quality, high performance to suit your requirements",
          "One box includes 1 set per axle",
        ];
      }
      if (part.name.includes("XP")) {
        text = [
          "Ideal for spirited driving with a 12 month Manufacturers Warranty",
          "High quality, high performance to suit your requirements",
          "One box includes 1 set per axle",
        ];
      }
    }

    if (productType === "calipers") {
      text = [
        "OE replacement & everyday use",
        "Passenger Cars & SUV",
        "4X4 & Light Commercial Vehicles",
      ];
    }

    if (productType === "brakepad") {
      if (part.description.includes("Street")) {
        text = [
          "Operating temperature up to 440℃",
          "Performance cars, SUVs & 4WDs",
          "Use with DBA Street Series discs",
        ];
      }
      if (part.description.includes("Xtreme Performance")) {
        text = [
          "Operating temperature up to 550℃",
          "Performance cars, SUVs & 4WDs",
          "Use with DBA 4000 & 5000 Series discs",
        ];
      }
    }

    if (productType === "discbrake" || productType === "excluded") {
      if (part.description.includes("Street Series")) {
        if (
          part.description.includes("plain") &&
          !part.description.includes("En-Shield")
        ) {
          text = [
            "Ideal for OE replacement & everyday use",
            "Passenger cars, SUV & light commercial vehicles",
            "High quality & high performance to suit your requirements",
          ];
        }
        if (part.description.includes("En-Shield")) {
          text = [
            "Ideal for OE replacement & everyday use",
            "EnShield - Rust protective coating",
            "High quality & high performance to suit your requirements",
          ];
        }

        if (part.description.includes("T2")) {
          text = [
            "Ideal for spirited driving with a 12-month Manufacturer's Warranty",
            "High machining quality & high carbon alloyed iron",
            "Patented T3 slot design",
          ];
        }

        if (part.description.includes("X-GOLD")) {
          text = [
            "Ideal for spirited driving with a 12-month Manufacturer's Warranty",
            "High machining quality & high carbon alloyed iron",
            "Popular alternative for show cars",
          ];
        }
      }

      if (part.description.includes("5000")) {
        if (
          part.description.includes("plain") &&
          !part.description.includes("En-Shield")
        ) {
          text = [
            "Ideal for high-performance applications",
            "Benefits of 5000 Series 2-piece design with OE look",
            "Hat made from extra lightweight 6061 T6 aircraft aluminium",
            "High machining quality & high carbon alloyed iron",
          ];
        }
        if (part.description.includes("T3")) {
          text = [
            "Ideal for high-performance applications",
            "2-piece performance rotor with patented T3 slot design",
            "Hat made from extra lightweight 6061 T6 aircraft aluminium",
            "High machining quality & high carbon alloyed iron",
          ];
        }
        if (part.name.includes("W")) {
          text = [
            "Ideal for high-performance applications",
            "2-piece performance rotor with the wave technology",
            "Hat made from extra lightweight 6061 T6 aircraft aluminium",
            "High machining quality & high carbon alloyed iron",
          ];
        }
        if (part.name.includes(".1") || part.description.includes("Rotor")) {
          text = [
            "Ideal for high-performance applications",
            "Rotor rings with patented T3 slot design",
            "Individual rotors for more economical replacement options",
            "High machining quality & high carbon alloyed iron",
          ];
        }
      }

      if (part.description.includes("4000")) {
        if (
          part.description.includes("plain") &&
          !part.description.includes("En-Shield")
        ) {
          text = [
            "Ideal for high-performance applications",
            "Benefits of 4000 Series with OE look",
            "Thermal Stability Profiling (heat treated)",
            "High machining quality & high carbon alloyed iron",
          ];
        }
        if (part.description.includes("XS")) {
          text = [
            "Popular alternative for show cars",
            "High machining quality & high carbon alloyed iron",
            "Thermal Stability Profiling (heat treated)",
          ];
        }
        if (part.description.includes("T3")) {
          text = [
            "Ideal for high-performance applications",
            "DBA’s patented T3 bi-directional slot design",
            "Thermal Stability Profiling (heat treated)",
            "High machining quality & high carbon alloyed iron",
          ];
        }
        if (part.description.includes("XD")) {
          text = [
            "Ideal for spirited driving with a 12 month Manufacturers Warranty",
            "High quality, high performance to suit your requirements",
            "One box includes 1 disc per axle (Left or Right)",
          ];
        }
      }
    }
    return text;

    // ACL PRODUCTS
  } else if (manufacturergroup === Manufacturers.ACL.id) {
    if (
      part.description === "Main bearing set (ACL Race Series)" ||
      part.description ===
        "Main bearing set (ACL Race Series) with 0.025mm (0.001”) extra clearance"
    ) {
      text = [
        "High performance Trimetal engine bearings",
        "Designed to withstand higher RPM conditions",
        "High strength overlay plate with reduced thickness for improved fatigue properties",
      ];
    } else if (
      part.description ===
        "Con rod bearing set (ACL Race Series) with 0.025mm (0.001”) extra clearance" ||
      part.description === "Con rod bearing set (ACL Race Series)"
    ) {
      text = [
        "Hardened backs enhance bearing support",
        "Crush increased for better retention",
        "Chamfers enlarged for performance crankshafts",
        "Overlay plate for better fatigue resistance",
      ];
    }
    return text;

    // ACS PRODUCTS
  } else if (manufacturergroup === Manufacturers.ACS.id) {
    if (part.description === "Clutch Kit - Clutch Pro") {
      text = [
        "Clutch Pro is renowned in Australia and Europe for high-quality clutch kits and components",
        "Ideal for track day cars",
        "12 month Manufacturers Warranty",
        "Serviceable components",
      ];
    } else if (
      part.description ===
        "Xtreme Performance - 230mm Carbon Twin Plate Clutch Kit Incl Flywheel 1670Nm" ||
      part.description ===
        "Xtreme Performance - 230mm Carbon Blade Twin Plate Clutch Kit Incl Flywheel & CSC 1670Nm"
    ) {
      text = [
        "Torque Capacity: 1670Nm",
        "Carbon Friction: Stable at extreme temperatures",
        "Low Inertia: For quicker response",
        "Certification: SFI Certified",
        "Low Pedal Effort: For easier operation",
        "4140 Chromoly Plates: Pressure & intermediate",
      ];
    } else if (
      part.description ===
        "Xtreme Performance - 230mm Organic Twin Plate Clutch Kit Incl Flywheel 1200Nm" ||
      part.description ===
        "Xtreme Performance - 230mm Organic Twin Plate Clutch Kit Incl Flywheel & CSC 1200Nm"
    ) {
      text = [
        "Torque Capacity: 1200Nm",
        "Application: Ideal for high-horsepower street use",
        "Twin Plate Organic: For maximum horsepower and torque",
        "Certification: SFI Certified",
        "Low Inertia: For quicker response",
        "Components: Serviceable",
      ];
    } else if (
      part.description ===
        "Xtreme Performance - 230mm Rigid Ceramic Twin Plate Clutch Kit Incl Flywheel 1800Nm" ||
      part.description ===
        "Xtreme Performance - 230mm Rigid Ceramic Twin Plate Clutch Kit Incl Flywheel & CSC 1800Nm"
    ) {
      text = [
        "Torque Capacity: 1800Nm",
        // "Application: Suitable across street, circuit, drift, or race settings",
        "Low Pedal Effort: Enhances ease of use",
        "Low Inertia: Offers quicker response",
        "4140 Chromoly Pressure & Intermediate Plates: Ensures durability",
        "Features Pull-Push Conversion: Adds operational flexibility",
      ];
    } else if (
      part.description ===
        "Clutch Kit - Xtreme Performance Race Carbon Blade Incl Flywheel" ||
      part.description ===
        "Clutch Kit - Xtreme Performance Race Carbon Blade Incl Flywheel & CSC"
    ) {
      text = [
        "Series Type: Stage 3 Clutch Kits Carbon Race Series",
        "Heat Capacity: Exceptional, catering to high-horsepower applications",
        "Use Cases: Globally adopted by powerful time attack and drift cars",
        "Recommended For: Vehicles needing enhanced modulation, particularly those with extreme power",
      ];
    } else if (
      part.description ===
        "Clutch Kit - Xtreme Performance Race Sprung Ceramic Incl Flywheel 910Nm" ||
      part.description ===
        "Clutch Kit - Xtreme Performance Race Sprung Ceramic Incl Flywheel & CSC 910Nm"
    ) {
      text = [
        "Torque Capacity: 910Nm",
        "Clamp Load: Increased over standard",
        "Friction Disc: Sprung Ceramic",
        "Kit Components: All-inclusive for successful installation",
      ];
    } else if (
      part.description ===
      "Xtreme Performance - 270mm Organic Twin Plate Clutch Kit Incl Flywheel & CSC 1300Nm"
    ) {
      text = [
        "Designed for high-horsepower street use",
        "Torque Capacity: 1300Nm",
        "Excellent, with heavy-duty pressure plate and rigid organic friction discs",
        "Strap-driven intermediate plate eliminates rattle",
      ];
    } else if (
      part.description ===
        "Xtreme Performance - 270mm Organic Twin Sprung Plate Clutch Kit Incl Flywheel & CSC 1000Nm" ||
      part.description ===
        "Xtreme Performance - 270mm Organic Twin Sprung Plate Clutch Kit Incl Flywheel 1000Nm"
    ) {
      text = [
        "Torque Capacity: 1000Nm",
        "Shock Reduction: Designed for reduced shock loading compared to rigid discs",
        "Comprehensive Kit: Includes everything for installation + accessories",
        "Operation Flexibility: Internal hydraulic release and pull-push conversions",
        "Certification: SFI Certified",
      ];
    } else if (
      part.description ===
        "Clutch Kit - Xtreme Performance Heavy Duty Organic Incl Flywheel 600Nm  Conversion kit Dual-mass to solid flywheel" ||
      part.description ===
        "Clutch Kit - Xtreme Performance Heavy Duty Organic Incl Flywheel & CSC 600Nm  Conversion kit Dual-mass to solid flywheel"
    ) {
      text = [
        "Torque Capacity: 600Nm - Essential for performance evaluation.",
        "Clamp Load: Increased over standard - More pressure for better engagement.",
        "Friction Discs: Organic - Provides smooth operation.",
        "Pressure Plate: Heavy Duty - Built for durability and longevity.",
      ];
    }

    return text;
  } else if (manufacturergroup === Manufacturers.PEDDERS.id) {
    if (
      part.description === "SportsRyder EziFit Rear (2 springs & 2 x shocks)"
    ) {
      text = [
        "All-in-One Lowering Solution",
        "Quick, Easy Install",
        "Balanced Handling",
        "Pre-Assembled Components",
        "2-Year/25K Mile Warranty",
      ];
    } else if (
      part.description === "Remote Canister Adj. Coilover. MOQ = 5 pcs" ||
      part.description === "Pedders Extreme XA Coilover Kit"
    ) {
      text = [
        "Damping with 30-Stage Adjustability",
        "Customizable Vehicle Height",
        "Filled with Nitrogen Gas",
        "High-Quality Alloy Steel Coils",
      ];
    } else if (part.description === "Pedders Rear Gas Sports Ryder Shock") {
      text = [
        "Direct Replacement for OEM",
        "Tuned Valving for Original Ride",
        "Individually Tested for Quality",
        "Nitrogen Gas Filled",
        "2-Year, 25,000-Mile Warranty",
      ];
    } else if (
      part.description === "Pedders Sportsryder Coil Spring" ||
      part.description === "Pedders Rear Sportsryder Coil Spring Low" ||
      part.description === "Pedders Front Sportsryder Coil Spring Low"
    ) {
      text = [
        "Minimizes Body Roll",
        "Maximizes Tire Grip",
        "ISO 9001 Standard",
        "+/-2mm Tolerance at Loaded Height",
        "Hot Coiled and Oil Quenched",
        "Powder-Coated Finish",
      ];
    } else if (
      part.description ===
        "Pedders Lowered Spring Kit, Ford Mustang, S550, 2018 on WITH Magnetic Ride ONLY" ||
      part.description ===
        "Ford Mustang 2015-Onwards Spring Kit (without Magnaride)"
    ) {
      text = [
        "Lowers Vehicle by 25-30mm",
        "Works with OEM Shocks",
        "ISO 9001 Standard",
        "High-Grade Steel",
        "Powder-Coated Finish",
      ];
    }

    // XFORCE PRODUCTS
  } else if (manufacturergroup === Manufacturers.XFORCE.id) {
    if (
      part.description ===
      '2.5" Cat-Back Exhaust System with Oval Mufflers, 304 Stainless Steel'
    ) {
      text = [
        "Enhance Mustang sound with 304-grade exhaust system",
        '2.5" bore, dual 4” tailpipes for V8 and EcoBoost',
        "Boosts sound and tone, easy bolt-on installation",
        "Engineered for longevity and performance",
      ];
    } else if (
      part.description ===
      '2.5" Cat-Back System with Oval Varex Mufflers, 304 Stainless Steel'
    ) {
      text = [
        "304-grade stainless exhaust boosts Mustang sound",
        "VAREX mufflers controlled via keyfob for V8, EcoBoost",
        "Easy bolt-on installation, fits existing mounts",
        "Engineered for durability and performance",
      ];
    } else if (
      part.description ===
      '3" Downpipe with High-Flow Catalytic Converter, 304 Stainless Steel'
    ) {
      text = [
        "Equipped with a 100 cspi sports catalytic converter for track use",
        "Unique header design boosts power and audio note",
        "Compatible only with Xforce cat-back systems",
        "Easy bolt-on installation",
      ];
    } else if (
      part.description ===
      '3" Varex Valved Cat-Back Exhaust System, 304 Stainless Steel'
    ) {
      text = [
        "Features VAREX Valve Technology for sound control",
        "Straight-through design maximizes power and performance",
        "Engineered specifically for the Ford F150 Raptor's 3.5L EcoBoost V6 engine",
        'Constructed with 3" 304 stainless steel mandrel bent pipework',
      ];
    } else if (
      part.description ===
      '3" Cat-Back System with Round Mufflers, 304 Stainless Steel'
    ) {
      text = [
        "Twin cat-back system with unique header design for increased power and enhanced engine sound",
        "Easy installation, bolting directly to existing mounting points",
        "Made from durable, polished 304 stainless steel for long-lasting performance",
        'Dual 4" tip available in quad-tip variant; not compatible with convertibles',
      ];
    } else if (
      part.description ===
      '3" Cat-Back System System with Oval Mufflers, 304 Stainless Steel'
    ) {
      text = [
        "Unique header design increases power across the rev range and enhances engine sound",
        "Twin cat-back system with X pipe before muffler for optimized performance",
        "Easy installation using existing mounting points",
        "Constructed from durable, polished 304 stainless steel",
        'Dual 4" tip option available in quad-tip variant; not compatible with convertibles',
      ];
    } else if (
      part.description ===
      '1"7/8 Header with High-Flow Catalytic Converters, 304 Stainless Steel'
    ) {
      text = [
        '4-1 design header kit with 1 7/8" primary pipes and 3" outlet',
        "Equipped with high-flow metallic 200 Cell cat converters",
        "Compatible only with Xforce cat-back systems",
        "Designed specifically for track and off-road use",
        "Non-polished stainless steel construction for durability",
      ];
    } else if (
      part.description ===
      "Black Round Angle-Cut Double Wall Tip 3″ Inlet, 4″ Outlet Round Muffler"
    ) {
      text = [
        "Stainless steel construction for durability",
        '3" inlet and 4" outlet dimensions designed for optimized airflow',
        "Compatible exclusively with Xforce systems",
        "Features carbon fiber coating for additional protection and aesthetics",
      ];
    } else if (part.description === '3.5" Twin Quad Tips') {
      text = [
        "Exclusively designed for Ford Mustang GT 2015 with Xforce System",
        'Twin quad-tip option featuring twin 3.5" tips',
        "Crafted from 304-grade stainless steel for durability",
        "Laser-etched design for a premium look",
        "Not compatible with OEM systems",
      ];
    } else if (part.description === '3"-4" Carbon  Double Wall Tips') {
      text = [
        "Compatible exclusively with Xforce systems",
        "Constructed from durable stainless steel",
        "Carbon fiber coating for added resilience",
        'Features a 3" inlet and 4" outlet for optimized airflow',
      ];
    } else if (
      part.description ===
      '3" Cat-Back System with Round Varex Mufflers, 304 Stainless Steel'
    ) {
      text = [
        'Twin 3" Cat-Back System for maximum back-pressure reduction',
        "VAREX valve-controlled round rear mufflers for adjustable sound",
        "Brushed 304-grade stainless steel construction for durability",
        "Compatible only with Ford Mustang GT 2015-17 Fastback; not for convertibles",
        "Bolts directly to existing mounting points for easy installation",
      ];
    } else if (
      part.description ===
      '3" Cat-Back System with Oval Varex Mufflers, 304 Stainless Steel'
    ) {
      text = [
        "Dual VAREX-equipped oval mufflers allow for adjustable sound control",
        "Constructed from polished 304-grade stainless steel for durability",
        "Compatible exclusively with Ford Mustang GT 2015-17 Fastback",
        "Easy bolt-on design aligns with existing mounting points",
      ];
    } else if (
      part.description ===
      '4" Twin Quad Black Tip (for Xforce system only, will not fit OEM)'
    ) {
      text = [
        "Twin quad-tip shadow black finish upgrades the visual aesthetics of your 2018 Ford Mustang GT's XFORCE exhaust system",
        "Made from 304-grade stainless steel for durability and longevity",
        'Four 3.5" laser-etched trims are specifically designed to be compatible with XFORCE exhaust systems',
        "Provides a completely revamped look to the rear end of your Mustang",
      ];
    } else if (
      part.description ===
      '3" Axle-Back System with Oval Mufflers and Quad Tips, 304 Stainless Steel'
    ) {
      text = [
        "Easy bolt-on installation",
        "Enhances vehicle performance",
        "Durable stainless steel",
        "Improved engine audio",
        "Adapts to factory pipes",
      ];
    } else if (
      part.description ===
      '3" Cat-Back System with Oval Mufflers, 304 Stainless Steel'
    ) {
      text = [
        "Easy installation with bolt-on design",
        "High-performance and power boost",
        "Long-lasting 304 stainless steel",
        "Enhanced engine audio experience",
        'Quad 4" tip for aesthetics',
      ];
    } else if (
      part.description ===
      '3" Cat-Back Exhaust with Oval Varex Mufflers, 304 Stainless Steel'
    ) {
      text = [
        "VAREX valve-controlled mufflers for sound control",
        'Twin 3" bore for optimal back-pressure reduction',
        "304-grade stainless steel for durability",
        "Easy bolt-on installation",
        "Unique header design boosts power",
      ];
    }
  } else if (manufacturergroup === Manufacturers.WHITELINE.id) {
    if (part.description === "Rear Toe arm - arm") {
      text = [
        "Heavy-duty turnbuckle arms for precise pinion angle adjustment",
        "Enhanced traction control during heavy acceleration",
        "On-car adjustability for fine-tuning performance",
        "Improved differential pinion angle control",
        "Key feature for better handling in car business",
      ];
    } else if (part.description === "Rear Sway bar - link") {
      text = [
        "Whiteline adjustable sway bar links enhance sway bar effectiveness",
        "Top-spec, lightweight design with adjustability",
        "Eliminates sway bar preload during installation",
        "Maximizes grip and handling for improved performance",
        "Critical component for enthusiasts' car upgrades",
      ];
    } else if (part.description === "Rear Subframe - mount bushing") {
      text = [
        "DIY-friendly bushing kit for easy installation",
        "Compatible with original bushing for simplicity",
        "Eliminates 'lost motion' in the rear crossmember",
        "Dramatically reduces misalignment and movement",
        "Enhances rear-end stability during cornering",
      ];
    } else if (part.description === "Rear Stabilizer arm") {
      text = [
        "Whiteline high-performance vertical links for Mustang",
        "Constructed from 6061-T6 forged aviation-grade aluminum",
        "Robust I-beam design eliminates undesirable effects",
        "CNC precision machining maintains suspension geometry",
        "Minimal flex polymer bushings reduce wheel hop",
      ];
    } else if (part.description === "Front Sway bar - link") {
      text = [
        "Whiteline adjustable sway bar links enhance sway bar performance",
        "Top-spec lightweight design with adjustability",
        "Eliminates sway bar preload during installation",
        "Maximizes grip and handling for improved performance",
        "Crucial upgrade for enthusiasts seeking better sway bar effectiveness",
      ];
    } else if (part.description === "Front Radius Arm Lower - Bushing Kit") {
      text = [
        "Whiteline caster kits enhance cornering grip and stability",
        "Dual offset bushings for improved steering feel",
        "Increase in static caster and dynamic negative camber gain",
        "Enhanced braking performance and alignment stability",
        "A valuable upgrade for improved vehicle handling",
      ];
    } else if (part.description === "Radius Arm Lower - Bushing Kit") {
      text = [
        "Worn suspension bushings can impact braking performance",
        "Whiteline synthetic elastomer bushings offer durability",
        "Improve braking efficiency and safety",
        "Prevent severe wear over time for better predictability",
        "A critical upgrade for vehicle maintenance",
      ];
    } else if (part.description === "Front Gearbox - mount bushing") {
      text = [
        "Reduces compliance of the factory gearbox mount",
        "Improved performance with a simple installation",
        "A valuable upgrade for smoother shifting",
      ];
    } else if (part.description === "Front Camber adjusting - bolt") {
      text = [
        "Whiteline camber bolts correct uneven tire wear",
        "Offers a broad adjustment range of up to +/- 1.5 degrees",
        "Utilizes a positive toothed lock washer for no slipping",
        "Easy to adjust and secure repeatedly",
        "Ideal solution for addressing alignment issues",
      ];
    } else if (
      part.description === "Rear Sway bar - 25mm heavy duty blade adjustable"
    ) {
      text = [
        "Whiteline 25mm 3 point adjustable sway bar reduces body roll",
        "Evenly spreads lateral loads for increased cornering grip",
        "Enhances handling, safety, and tire wear",
        "A cost-effective upgrade for better vehicle performance",
        "Maintains ride quality and comfort",
      ];
    } else if (
      part.description === "Front Sway bar - 35mm heavy duty blade adjustable"
    ) {
      text = [
        "Evenly spreads lateral loads for increased cornering grip",
        "Enhances handling, safety, and tire wear",
        "A cost-effective upgrade for better vehicle performance",
        "Maintains ride quality and comfort",
      ];
    } else if (part.description === "Front and Rear Sway bar - vehicle kit") {
      text = [
        "Minimize excess body roll",
        "Dramatically improve handling performance",
        "Extend tire life",
        "Enhance steering response",
        "Improve braking stability and response",
      ];
    }
  }
  return text;
};
