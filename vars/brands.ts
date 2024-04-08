type BrandDescription = {
  header: string;
  body: string;
};

type BrandMedia = {
  youTube: false | string;
};

type BrandInfo = {
  name: string;
  title: string;
  linkKey: string;
  description: BrandDescription;
  media: BrandMedia;
};

type Brand = {
  [key: string]: BrandInfo;
};

export const BRANDS: Brand = {
  ACL: {
    name: "ACL Race Series",
    title: "Performance, engine, bearings",
    linkKey: "acl",
    description: {
      header:
        "ACL has a proud & rich history in Motorsport. There is no better proving ground than the racetrack whatever it’s configuration. In the heat of competition proven technology always comes through.",
      body: "The ACL RACE Series performance engine bearing range of today has a strong pedigree in motorsport & traces its roots back to the 1960’s with the manufacture of engine bearings for use in the world conquering Brabham Formula 1. Further experience in the Australian Supercars Championship & numerous other race codes has culminated in the current ACL RACE Series technology platform. The unique combination of design, metallurgy, engineering & precision quality control come together to deliver what engine builders expect from performance engine bearings.",
    },
    media: {
      youTube: false,
    },
  },
  DBA: {
    name: "DBA",
    title: "Disc, brakes and pads",
    linkKey: "dba",
    description: {
      header:
        "Over four decades of manufacturing experience and unsurpassed knowledge through research and development, DBA has positioned itself as Australia’s most awarded manufacturer and a global leader in brake rotors manufacturing.",
      body: "With continuous improvements in engineering along with a thirst for innovation, DBA has managed to consistently redefine and deliver disc brakes solutions for an extensive range of vehicle applications and conditions. With brake discs, as with any safety component, there can be no short-cuts. Drivers worldwide demand DBA products for consistent, reliable and superior performance. DBA ensures this by engineering disc brakes that are far superior to generic and aftermarket counterparts. How? DBA sets the bar in quality, tolerances, premium metals and manufacturing equipment that delivers premium quality disc brake rotors.",
    },
    media: {
      youTube: "https://www.youtube.com/channel/UCRbJZlGuvpX5kZA7aoLMbEw",
    },
  },
  HAWK: {
    name: "Hawk Performance",
    title: "Brake pads",
    linkKey: "hawk",
    description: {
      header:
        "Hawk Performance is a leading supplier of severe duty and high-performance friction products manufactured in ISO-certified facilities for the motorsports and performance automotive aftermarket.",
      body: "Hawk Performance products are engineered to allow users to control, command, and conquer the terrain for which their vehicles are designed. Decades of experience in developing friction materials for aerospace, industrial, military, automotive and motorsports applications give Hawk Performance an advantage over the competition. In the past decade, Hawk Performance friction products have won more motorsports championships than any other friction manufacturer.",
    },
    media: {
      youTube: "https://www.youtube.com/user/HAWKPERFORMANCE",
    },
  },
  PEDDERS: {
    name: "Pedders",
    title: "Suspension, shock, absorbers and springs",
    linkKey: "pedders",
    description: {
      header:
        "Pedders is Australia's Number 1 producer of comprehensive range of products and ser-vices for all suspension, braking, towing, load carrying and steering needs to suit pas-senger cars, four-wheel drives, light commercials and high performance vehicles.",
      body: "For each new chassis, Pedders develops an integrated and engineered suspension solu-tion. Be it OEM quality replacement parts, performance parts for passenger cars or tough off-road suspension we are one of the few manufacturers with a holistic solution. Whilst Pedders commenced as a shock absorber company, today they are unique in that they offer a “system” that they design, manufacture, distribute and in Australia also install all under the Pedders brand. Pedders “matched” parts include shock absorbers, springs (coil, leaf & torsion bar), bushings (polyurethane & rubber), chassis parts, hardware (camber pins, bump stops, sway bar components, mounts etc.), control arms, trailing arms, power steering gears & pumps, CV joints & shafts and even brake parts including pads, rotors & drums. All Pedders Branded – a SYSTEM.",
    },
    media: {
      youTube: "https://www.youtube.com/user/PeddersSuspension",
    },
  },
  TURBOSMART: {
    name: "Turbosmart",
    title: "Turbo performance products",
    linkKey: "turbosmart",
    description: {
      header:
        "Turbosmart is one of the world’s leading manufacturer of turbo accessories. An ever-increasing number of racing teams and tuning houses around the world use and recommend Turbosmart products.",
      body: "Their achievements on the track and at street events are a testimony to Turbosmart’s design, manufacturing and testing principles. The feedback received from the racers and tuners alike contributes to the on-going development of Turbosmart products, reinforcing the philosophy of continual improvement.",
    },
    media: {
      youTube: "https://www.youtube.com/user/Turbosmart66",
    },
  },
  WHITELINE: {
    name: "Whiteline",
    title: "Whiteline",
    linkKey: "whiteline",
    description: {
      header:
        "Whiteline's boasts a worldwide reputation as a leading manufacturer of replacement, enhancement and performance suspension components that deliver significant gains in vehicle balance, steering precision, grip levels and outright driving performance.",
      body: "Consisting of adjustable sway bars (also known as Stabilizer Bars or Anti Roll Bars), chassis bracing, alignment products and chassis control bushing kits, Whiteline products provide automotive workshops, tuners, enthusiasts and racers with innovative solutions to suspension and handling problems while delivering proven performance & problem solving outcomes for many of the worlds vehicle platforms.",
    },
    media: {
      youTube: "https://www.youtube.com/@WhitelinePerformance",
    },
  },
  XFORCE: {
    name: "XFORCE",
    title: "Performance exhaust",
    linkKey: "xforce",
    description: {
      header:
        "XFORCE focuses strongly on research and development which ensures that their di-verse range of exhaust products are of powerful engineering precision, stylish and practi-cally designed to maximize performance and most importantly, technically innovative such as our patent VAREX™ Muffler application which in itself, is an exhaust revolution.",
      body: "The focus on innovation and extensive quality control enables XFORCE to provide you with outstanding performance values when it comes to your exhaust. XFORCE is heavily involved in continuous research and development that combines powerfully with their manufacturing advantage in exhaust production and automotive engineering. Their ex-haust systems are specially designed and dyno tested by our state-of-the-art Dynapack Evolution 3000 chassis dynamometer machine, for proven maximum performance in Xforce R & D centre in Australia.",
    },
    media: {
      youTube: "https://www.youtube.com/user/xforceexhaust",
    },
  },
  XTREME: {
    name: "XTREME CLUTCH",
    title: "High performance clutch and components",
    linkKey: "xtreme",
    description: {
      header:
        "Xtreme Clutch has been at the forefront of performance clutch technology for decades. In house testing machinery and close bonds with motorsport has allowed Xtreme Clutch to do extensive testing on various combinations of materials and disc designs to suit high performance and racing applications.",
      body: "The Xtreme Clutch name has become synonymous with high performance. Xtreme has earned its reputation as Australasia’s largest manufacturer and stockist of clutch kits and components. Your Xtreme Clutch has been professionally engineered and developed as a brand new product resulting in a clutch that exceeds application requirements for performance, wear and driveability in the long term.",
    },
    media: {
      youTube: "https://www.youtube.com/channel/UCRfZxyw0nqAwcmbZmPlkEnA",
    },
  },
};
