// All site copy, transcribed from "B2B Transportation Booklet Solution.pdf"
// (Fleet & Transportation Solutions Toolkit, 21 spreads). Page numbers refer to the booklet.
// Strings marked NEW are web-only copy (nav labels, CTAs, page intros) that is not in the
// booklet and still needs client sign-off. Everything else is the booklet's wording.

export const site = {
  name: 'Petrolube',
  toolkit: 'Fleet & Transportation Solutions Toolkit',
  tagline: 'Complete lubrication solutions for commercial vehicles and fleets',
  pillars: [
    ['Improve', 'reliability'],
    ['Maximizing', 'uptime'],
    ['Reducing total', 'cost of ownership'],
    ['Protecting', 'every kilometer'],
  ],
  contact: {
    office: 'Jeddah, Prince Sultan Road, Aya Mall',
    email: 'sales@petrolubegroup.com',
    website: 'https://www.petrolubegroup.com/',
    websiteLabel: 'www.petrolubegroup.com',
    phones: ['+966 12 699 6600', '+966 12 699 6677'],
  },
  // Decoded from the "Scan Me" QR codes in the booklet.
  links: {
    oilFinder: 'https://petrolube.ewp.earlweb.net/',
  },
};

// p.03
export const about = {
  title: ['About', 'Petrolube'],
  body: 'Petrolube is a leading Saudi manufacturer of high-performance lubricants and specialty fluids, established in 1968. Recognized as one of the largest independent lubricant manufacturers in the GCC, Petrolube operates three blending plants across Jeddah, Riyadh, and Dubai with an annual production capacity exceeding 312,000 metric tons, offering more than 400 products and exporting to over 50 countries across the GCC, Middle East, Africa, and Asia.',
  stats: [
    { value: '#1', label: 'Largest lubricant manufacturer in GCC' },
    { value: '03', label: 'Blending plants in KSA and UAE' },
    { value: '312,000+', label: 'tonnes/year total capacity' },
    { value: '400+', label: 'Product offering' },
  ],
};

// p.04
export const footprint = {
  title: ['Our', 'Global Footprint'],
  stats: [
    { value: '4', label: 'Countries', sub: 'Physical presence', icon: 'globe' },
    { value: '50+', label: 'Countries', sub: 'Exports globally', icon: 'export' },
    { value: '3', label: 'Production', sub: 'Facilities', icon: 'factory' },
    { value: '6', label: 'Warehouses', sub: '', icon: 'warehouse' },
  ],
  plants: [
    { city: 'Jeddah', tonnes: 177000 },
    { city: 'Dubai', tonnes: 75000 },
    { city: 'Riyadh', tonnes: 60000 },
  ],
  warehouses: ['Riyadh', 'Jeddah 1', 'Jeddah 2', 'Dammam', 'Makkah', 'Abha'],
};

// p.05
export const legacy = [
  // Positions measured from the booklet's Story Legacy artwork (p.05), as a % of the extracted
  // scene: x = left edge of the text, b = bottom edge, sitting just above that year's photo.
  { year: '1968', img: 'legacy-1968', x: 6.9, b: 36.2, w: 13.4, text: 'Petromin Oil Company is established, with the Jeddah factory operating at a capacity of 10,000 MT per annum.' },
  { year: '1982', img: 'legacy-1982', x: 22.8, b: 44.0, w: 13.4, text: 'Riyadh Production Plant is established, marking the beginning of local manufacturing and bringing the total production capacity to 60,000 MT per annum.' },
  { year: '2007', img: 'legacy-2007', x: 38.7, b: 60.0, w: 13.0, text: 'Aldabbagh Group acquires Petromin, marking the beginning of a new era for the company.' },
  { year: '2010–16', img: 'legacy-2010', x: 54.5, b: 70.5, w: 11.5, text: 'Expansion of our global footprint into new markets.' },
  { year: '2021', img: 'legacy-2021', x: 70.3, b: 81.0, w: 10.0, text: 'Petromin Company is renamed Petrolube Oil Company.' },
  { year: '2023', img: 'legacy-2023', x: 85.6, b: 84.6, w: 12.0, text: 'Introduction of new standards, further strengthening our commitment to quality and excellence.' },
];

// p.06–07
export const whoWeServe = {
  eyebrow: 'Transportation industry overview',
  title: ['Who', 'We Serve'],
  intro: 'Commercial transportation spans several distinct fleet segments, each with different duty cycles and maintenance needs.',
  points: [
    'Commercial transportation is a diverse, specialized market.',
    'Each sector operates under different conditions and duty cycles.',
    'Drivetrains and maintenance needs vary across fleet types.',
    'Equipment complexity is rising while margins are tightening.',
    'Lubrication now improves reliability, reduces downtime, and controls costs.',
  ],
  coverageTitle: ['Every Segment', 'Total Coverage'],
  segments: [
    { id: 'long-haul', name: 'Long Haul Trucking', img: 'seg-long-haul', text: 'High-mileage duty cycles where drain intervals and fuel economy drive cost per kilometer.' },
    { id: 'last-mile', name: 'Urban & Last Mile Distribution', img: 'seg-last-mile', text: 'Stop start operation that stresses transmissions, brakes, and driveline components.' },
    { id: 'public-transport', name: 'Public Transportation', img: 'seg-public-transport', text: 'Severe-duty, high-contamination environments demanding robust filtration and greasing.' },
    { id: 'box-chiller', name: 'Box & Chiller Truck Fleets', img: 'seg-box-chiller', text: 'Face harsh road conditions, strict temperature controls, and heavy stop-and-go city traffic.' },
    { id: 'oil-gas', name: 'Oil & Gas Transport', img: 'seg-oil-gas', text: 'Remote operation and regulatory scrutiny that raise the cost of unplanned downtime.' },
    { id: 'municipal', name: 'Municipal Fleets', img: 'seg-municipal', text: 'Mixed-asset fleets balancing budget cycles against service continuity.' },
  ],
};

// p.08–09
export const testimonials = {
  title: ['Proven by the', 'Brands We Serve'],
  intro: 'Leading companies across industries trust our lubrication program to deliver measurable results — improving uptime, driving efficiency, and powering long-term operational performance.',
  motto: [['Trust built on', 'performance.'], ['Partnerships', 'built to last.']],
  quotes: [
    { logo: 'client-juffali', company: 'Juffali Commercial Vehicles', role: 'GM of Spare Parts', quote: 'Their technical contributions ensure the peak performance of our critical equipment and continuously drive improvements in our O&M processes.' },
    { logo: 'client-al-jaber', company: 'Al Jaber', role: 'Operation Manager', quote: 'We rely on their technical services to maintain optimum equipment performance and steadily advance our operational productivity.' },
    { logo: 'client-sgp-riyadh', company: 'SGP Riyadh', role: 'Senior Engineering Manager', quote: 'Their aftersales support has been instrumental in enhancing our productivity and assuring continuous improvements in our critical operations.' },
    { logo: 'client-modern-bus', company: 'Modern Bus Company Limited', role: 'Fleet Engineer', quote: "We count on their technical expertise to ensure our critical equipment performs optimally, driving continuous advancement in our fleet's productivity." },
  ],
};

// p.10–11
export const quality = {
  title: ['Quality', 'Certifications & Approvals'],
  certifications: [
    { img: 'cert-bv-iso9001', alt: 'ISO 9001 — Bureau Veritas Certification' },
    { img: 'cert-bv-iso45001', alt: 'ISO 45001 — Bureau Veritas Certification' },
    { img: 'cert-bv-iso14001', alt: 'ISO 14001 — Bureau Veritas Certification' },
    { img: 'cert-iso17025', alt: 'ISO 17025:2017' },
    { img: 'cert-saso-standards', alt: 'SASO — Saudi Standards' },
    { img: 'cert-saudi-made', alt: 'Saudi Made — Gold Category of Saudi Made' },
    { img: 'cert-saudi-accreditation', alt: 'Saudi Accreditation' },
    { img: 'cert-saso-quality', alt: 'SASO Quality Mark' },
    { img: 'cert-eneos', alt: 'ENEOS Approved Blending Plant Certificate' },
    { img: 'cert-emirates-quality', alt: 'Emirates Quality Mark' },
  ],
  oem: [
    { img: 'oem-daimler', alt: 'Daimler' },
    { img: 'oem-volvo', alt: 'Volvo' },
    { img: 'oem-cummins', alt: 'Cummins' },
    { img: 'oem-renault', alt: 'Renault' },
    { img: 'oem-gm', alt: 'GM' },
    { img: 'oem-dexos1', alt: 'dexos1 — GM approved, Gen 3' },
    { img: 'oem-scania', alt: 'Scania' },
    { img: 'oem-mack', alt: 'Mack' },
  ],
  specs: [
    { img: 'spec-api', alt: 'American Petroleum Institute approvals' },
    { img: 'spec-astm', alt: "ASTM International — ASTM's Proficiency Testing Programs" },
    { img: 'spec-acea', alt: 'ACEA — Driving mobility for Europe' },
  ],
  sustainability: [
    { img: 'esg-gri', alt: 'GRI' },
    { img: 'esg-msci', alt: 'MSCI provisional ESG rating BBB, as of Feb 2026' },
  ],
};

// p.12–13
export const trial = {
  eyebrow: 'A leading fuel fleet customer',
  title: ['60,000 km on one fill', 'Zero compromise on protection'],
  product: 'PETROMIN TURBOMASTER PLUS 10W-40 CI-4',
  productNote: 'validated under long-haul routes, heavy loads, high heat and dust.',
  resultsTitle: 'Big Results. Real Impact.',
  stats: [
    { value: '60,000', unit: 'km', label: '+50% drain extension achieved vs. standard diesel engine oils' },
    { value: '100', unit: '%', label: 'Fleet readiness — all vehicles fit for further use' },
    { value: '10–28', unit: '%', label: 'Controlled depletion — viscosity & TBN within limits' },
  ],
  footnote: '*Performance results can vary based on type of vehicle/equipment, environmental conditions and trial protocols.',
  protection: {
    title: 'Protection Held Under Severe Conditions',
    items: [
      { icon: 'engine', name: 'Engine Protection', text: 'All wear metals normal, well below caution limits.' },
      { icon: 'filter', name: 'Contaminant Control', text: 'Advanced protection through the full drain cycle.' },
      { icon: 'thermo', name: 'Thermal Stability', text: 'Viscosity & pressure held under severe heat.' },
    ],
  },
  value: {
    title: 'Customer Value Delivered',
    items: [
      { icon: 'clock', name: 'Reduced Downtime', text: 'Fewer maintenance stops and workshop visits.' },
      { icon: 'gears', name: 'Lower Maintenance', text: 'Reduced oil changes, labor, and service expenses.' },
      { icon: 'shield', name: 'Enhanced Engine Protection', text: 'Long-term protection for critical engine components.' },
    ],
  },
};

// p.14–15
export const challenges = {
  eyebrow: 'Transportation industry challenges',
  title: ['The pressures fleet operators are', 'managing today'],
  answerTitle: ['The', 'Right Lubrication', 'Strategy', 'Relieves Pressure'],
  pairs: [
    { answerIcon: 'drops', icon: 'chart', pressure: ['Rising', 'fuel prices & operating expenses'], answer: ['Suitable viscosity, friction modified', 'for unmatched performance in challenging conditions'] },
    { answerIcon: 'drop-shield', icon: 'gauge', pressure: ['Longer service', 'intervals & uptime pressure'], answer: ['Oxidation and shear stable', 'oils sustain protection across extended drains'] },
    { answerIcon: 'exhaust', icon: 'worker', pressure: ['Driver shortages', '& maintenance labor constraints'], answer: ['Low SAPS chemistry protects', 'aftertreatment systems and supports compliance.'] },
    { answerIcon: 'monitor', icon: 'leaf', pressure: ['Emission regulations', '& sustainability targets'], answer: ['Condition based monitoring', 'for improved reliability of the assets'] },
  ],
};

// p.16–17 — hotspot positions are measured from the booklet artwork (% of the image box).
export const bumperToBumper = {
  eyebrow: 'Complete bumper to bumper lubrication',
  title: ['Every fluid on the vehicle,', 'engineered as one system'],
  systems: [
    { id: 'engine-oils', name: 'Engine Oils', icon: 'r-oilcan', x: 29.4, y: 55.6, page: 'diesel-engine-oils', anchor: '',
      products: ['PETROMIN Turbomaster K SynTech 10W-40 CK-4', 'PETROMIN Turbomaster Plus 10W-40 CI-4', 'PETROMIN Turbomaster XD 15W-40 CI-4'] },
    { id: 'coolants', name: 'Coolants', icon: 'r-thermo', x: 17.9, y: 76.0, page: 'coolants-brake-fluids', anchor: 'coolants',
      products: ['PETROMIN Long Life Coolant 50'] },
    { id: 'greases', name: 'Greases', icon: 'r-bearing', x: 37.0, y: 82.1, page: 'hydraulic-oils-greases', anchor: 'greases',
      products: ['PETROMIN LITHCOMP EP Series'] },
    { id: 'gear-oils', name: 'Gear Oils & ATF', icon: 'r-gears-rot', x: 43.1, y: 75.8, page: 'transmission-gear-oils', anchor: '',
      products: ['PETROMIN ATF Dexron III H', 'PETROMIN Gearbox Oil HDC Series', 'PETROMIN Transmax MBT 75W-90'] },
    { id: 'def', name: 'Diesel Exhaust Fluid (DEF)', icon: 'r-emissions', x: 50.6, y: 73.7, page: 'diesel-exhaust-fluid', anchor: '',
      products: ['PETROMIN Petro Blue 32%'] },
    { id: 'hydraulic', name: 'Hydraulic Oils', icon: 'r-gears-drop', x: 70.7, y: 68.0, page: 'hydraulic-oils-greases', anchor: 'hydraulic-oils',
      products: ['PETROMIN Hydraulic Oil AW Series'] },
    { id: 'brake', name: 'Brake Fluids', icon: 'r-shield-check', x: 82.8, y: 66.8, page: 'coolants-brake-fluids', anchor: 'brake-fluids',
      products: ['PETROMIN Super Brake Fluid DOT 4'] },
  ],
};

const DIR = 'https://www.petrolubegroup.com/product-directory/business-industries/';

// p.18–29. `directory` URLs are the booklet's "Scan Me" QR targets.
export const categories = [
  {
    slug: 'diesel-engine-oils',
    nav: 'Heavy Duty Diesel Engine Oils',
    short: 'Diesel Engine Oils',
    title: ['Heavy Duty', 'Diesel Engine Oils'],
    img: 'diesel-truck',
    card: 'diesel-truck',
    summary: 'CK-4, CI-4 and CH-4 heavy-duty engine oils for mixed, long-drain and severe-duty fleets.', // NEW
    quote: ['Advanced formulation for maximum', 'protection, efficiency, & engine life.'],
    directory: DIR + 'industrial-b2b-oil/?categories=24',
    benefits: [
      ['r-shield-gear', 'Excellent engine protection'], ['r-engine', 'Low ash content'], ['r-oilcan', 'Long oil change intervals'],
      ['r-gauge', 'High performance'], ['r-snow', 'Easy cold start'], ['r-fuel', 'Fuel economy'],
    ],
    groups: [{
      id: 'engine-oils',
      products: [
        { name: 'PETROMIN TURBOMASTER K SynTech 10W-40 CK-4',
          points: ['Protects modern low-emission diesel engines', 'Ensures ATD compatibility via low-SAPS formulation', 'Extends drain intervals and minimizes wear', 'Serves as an ideal single-oil mixed fleet solution'],
          spec: [['Grade/Spec', '10W-40 | API CK-4'], ['Application', 'Mixed fleets (heavy-duty diesel/gasoline)'], ['Compatibility', 'ATD, SCR, DPF']] },
        { name: 'PETROMIN TURBOMASTER K 15W-40 CK-4',
          points: ['Exceeds major global engine performance standards', 'Reduces deposit, sludge, and lacquer formation', 'Enhances durability and lifespan across mixed fleets', 'Ensures compatibility with modern ATDs'],
          spec: [['Grade/Spec', '15W-40 | API CK-4, SN'], ['Application', 'Mixed fleets (diesel/gasoline)'], ['Compatibility', 'ATDs (SCR, DPF, GPF)']] },
        { name: 'PETROMIN TURBOMASTER LD 10W-40 CI-4',
          points: ['Meets severe high-output, low-emission requirements', 'Extends drain intervals via high-temperature stability', 'Improves fuel economy with synthetic base stocks', 'Minimizes high-temp piston deposits'],
          spec: [['Grade/Spec', '10W-40 | API CI-4'], ['Application', 'Long-drain operations; moderate/low-sulfur fuel'], ['Compatibility', 'High-temperature turbocharged engines']] },
        { name: 'PETROMIN TURBOMASTER XD 15W-40 CI-4',
          points: ['Delivers severe-condition performance (on/off-road)', 'Demonstrates extended drain interval capabilities', 'Improves reliability through oxidation stability', 'Controls high-temperature piston deposits'],
          spec: [['Grade/Spec', '15W-40 | API CI-4'], ['Application', 'Severe operations; moderate/low-sulfur fuel'], ['Compatibility', 'Advanced global OEM standards']] },
        { name: 'PETROMIN FLEET MASTER LD 15W-40 CH-4',
          points: ['Improves engine life through excellent TBN retention', 'Reduces deposit formation via oxidation control', 'Keeps internal parts clean from rust and varnish', 'Serves as an ideal oil for older and newer mixed fleets'],
          spec: [['Grade/Spec', '15W-40 | API CH-4, SJ'], ['Application', 'Mixed fleets (high/low sulfur diesel or gasoline)'], ['Compatibility', 'Modern American and European standards']] },
      ],
    }],
  },
  {
    slug: 'transmission-gear-oils',
    nav: 'Transmissions & Gearbox Oils',
    short: 'Transmission & Gear Oils',
    title: ['Transmissions &', 'Gearbox Oils'],
    img: 'gears-golden',
    card: 'gears-golden',
    summary: 'Monograde and synthetic gear oils for manual transmissions, axles and final drives.', // NEW
    quote: ['Advanced transmission protection for smoother shifting,', 'greater efficiency, and longer gearbox life.'],
    directory: DIR + 'gears-transmission-oils/',
    benefits: [
      ['r-gauge2', 'High performance'], ['r-gear-clock', 'Long gear lifetime'], ['r-gears-rot', 'Built for severe conditions'],
      ['r-gear-waves', 'Perfect for shock loads too'], ['r-oilcan2', 'Long oil change interval'], ['r-speaker', 'Precise and noiseless gear switching'],
    ],
    groups: [{
      id: 'gear-oils',
      products: [
        { name: 'PETROMIN Gearbox Oil LD',
          points: ['Superior gear protection under high loads and varied operating conditions', 'Excellent oxidation and thermal stability for clean, deposit-free operation', 'Long service life for transmission and gearbox applications', 'Good seal compatibility for reliable operation'],
          spec: [['Grade/Spec', 'SAE 90 & SAE 140 monograde gear oil / API GL-4'], ['Application', 'Manual transmissions in passenger & commercial vehicles; construction & mining equipment gearboxes requiring API GL-4'], ['Compatibility', 'Transaxles, steering systems & hypoid drive axles requiring API GL-4 performance, according to OEM recommendations']] },
        { name: 'PETROMIN Gearbox Oil SYN HDM 75W-90',
          points: ['Excellent thermal and oxidation stability for clean operation and long service life', 'Extreme-pressure, anti-scuff, and anti-weld protection under heavy loads', 'Effective low-temperature lubrication for easier cold starts', 'Outstanding seal compatibility and full compatibility with synchromesh transmissions'],
          spec: [['Grade/Spec', 'SAE 75W-90 synthetic gear oil / API GL-4, GL-5 & MT-1'], ['Application', 'Manual transmissions, axles & final drives in passenger cars, commercial vehicles & off-highway equipment, according to OEM recommendations'], ['Compatibility', 'Synchromesh transmissions and specified Daimler/Mercedes-Benz applications; approved to DTFR 12B140 (formerly MB 235.9)']] },
        { name: 'PETROMIN Gearbox Oil HD Series',
          points: ['Protects components with in-built anti-weld, anti-scuff, and EP properties', 'Maintains deposit-free operation through excellent oxidation and thermal stability', 'Ensures trouble-free operation and longer component life', 'Eliminates leaks by protecting automotive seals'],
          spec: [['Grade/Spec', 'SAE 90, SAE 140 | API GL-5'], ['Application', 'Gears, transmissions, axles, and final drives operating under severe conditions'], ['Compatibility', 'Automotive seals and gaskets']] },
      ],
    }],
  },
  {
    slug: 'hydraulic-oils-greases',
    nav: 'Hydraulic Oils & Greases',
    short: 'Hydraulic Oils & Greases',
    title: ['Hydraulic Oils &', 'Greases'],
    img: 'hydraulic-cylinder',
    card: 'hydraulic-cylinder',
    summary: 'High-viscosity-index hydraulic oils and EP greases for mobile and stationary equipment.', // NEW
    quote: ['Advanced hydraulic', 'protection and reliable lubrication for smoother operation, reduced wear, and longer equipment life'],
    groups: [
      {
        id: 'hydraulic-oils', name: 'Hydraulic Oils',
        directory: DIR + 'industrial-b2b-oil/?categories=25',
        benefits: [['r-shield-check', 'High operating reliability'], ['r-gears-drop', 'Appropriate lubrication even under dynamic load'], ['r-shield-gear2', 'Excellent machine protection'], ['r-shield-drop', 'Water resistance']],
        products: [
          { name: 'PETROMIN Hydraulic Oil VH',
            points: ['High viscosity index for reliable performance in sub-zero and elevated temperatures', 'Strong anti-wear and rust protection to help extend equipment life', 'Excellent oxidation stability to reduce deposits and extend oil life', 'Effective air separation to help prevent cavitation and aeration'],
            spec: [['Grade/Spec', 'ISO VG 15, 32, 46, 68 & 100 / High-viscosity-index hydraulic oil'], ['Application', 'Stationary & mobile hydraulic equipment, including cranes, lifts, forklifts, excavators, CNC machines & industrial machinery'], ['Compatibility', 'Hydraulic systems requiring DIN 51524 HLP/HVLP, ISO 11158 HM/HV or ASTM D6158 HM/HV performance, according to OEM recommendations']] },
        ],
      },
      {
        id: 'greases', name: 'Greases', img: 'grease-bearing',
        directory: DIR + 'greases/',
        benefits: [['r-bearing', 'Outstanding wear protection'], ['r-sparkle', 'Extra cleanness'], ['r-funnel', 'Outstanding water washout'], ['r-drop-down', 'Low oil bleeding']],
        products: [
          { name: 'PETROMIN LITHCOMP EP Series',
            points: ['Delivers excellent thermal stability and oxidation resistance', 'Provides strong water resistance for dependable performance', 'Protects against wear under heavy and shock loads', 'Maintains structural stability under severe operating conditions', 'Extends service life and improves equipment reliability'],
            spec: [['Grade/Spec', 'NLGI 2 / NLGI 3'], ['Application', 'Industrial, automotive, and off-road applications (construction equipment, bearings, conveyors, pumps, compressors)'], ['Compatibility', 'Wide range of industrial and automotive bearing applications']] },
        ],
      },
    ],
  },
  {
    slug: 'coolants-brake-fluids',
    nav: 'Antifreeze Coolants & Brake Fluids',
    short: 'Coolants & Brake Fluids',
    title: ['Antifreeze Coolants &', 'Brake Fluids'],
    img: 'coolant-engine',
    card: 'coolant-engine',
    summary: 'Nitrite-free premixed OAT coolant and DOT 4 brake fluid for heavy-duty service.', // NEW
    quote: ['Advanced cooling', 'protection and reliable temperature control for improved heat transfer, corrosion resistance, and longer engine life.'],
    groups: [
      {
        id: 'coolants', name: 'Antifreeze Coolants',
        directory: DIR + 'speciality-products-4/?categories=35',
        benefits: [['r-hourglass', 'Long part lifetime'], ['r-snow-shield', 'Protection against freezing'], ['r-thermo', 'Protection against overheating'], ['r-gears-compat', 'Excellent part compatibility']],
        products: [
          { name: 'PETROMIN Extended Life Coolant Nitrite Free (Premixed)',
            points: ['Long-lasting protection against corrosion, cavitation, and scale', 'Reliable cooling and freeze/boil protection in severe hot and cold conditions', 'Extended-life OAT formula, free from nitrites, silicates, phosphates, and 2-EHA', 'Ready-to-use 50% glycol premix — no further dilution required'],
            spec: [['Grade/Spec', 'Ready-to-use / 50% glycol, nitrite-free OAT coolant'], ['Application', 'Gasoline & diesel engines in passenger cars, commercial vehicles and heavy-duty equipment; stationary natural gas & diesel engines'], ['Compatibility', 'Modern aluminium radiators, including CAB types; compatible with cooling-system elastomers']] },
        ],
      },
      {
        id: 'brake-fluids', name: 'Brake Fluids', img: 'brake-disc',
        directory: DIR + 'automotive-heavy-duty/?categories=16',
        products: [
          { name: 'PETROMIN Super Brake Fluid DOT 4',
            points: ['Ensures consistent and safe performance under severe braking conditions', 'Provides stable performance across a wide range of operating temperatures', 'Protects metal brake system components to extend service life', 'Minimizes leak risks through compatibility with rubber components'],
            spec: [['Grade/Spec', 'DOT 4 (Enhanced thermal stability and higher boiling point vs. DOT 3)'], ['Application', 'Disc, drum, and anti-skid braking systems; hydraulic clutches (high-speed, high-load, stop-and-go)'], ['Compatibility', 'Rubber and metal brake/clutch system components']] },
        ],
      },
    ],
  },
  {
    slug: 'diesel-exhaust-fluid',
    nav: 'Diesel Exhaust Fluid (DEF)',
    short: 'Diesel Exhaust Fluid',
    title: ['Diesel Exhaust', 'Fluid (DEF)'],
    img: 'def-cap',
    card: 'def-cap',
    summary: 'High-purity AUS 32 for SCR-equipped diesel and marine powertrains.', // NEW
    quote: ['Advanced', 'emission control for cleaner exhaust and reliable SCR performance.'],
    directory: DIR + 'speciality-products-4/?categories=32',
    benefits: [['r-emissions', 'Reduced harmful emissions'], ['r-gauge3', 'Optimized SCR efficiency'], ['r-gears-cost', 'Lower maintenance costs'], ['r-fuel2', 'Enhanced fuel economy']],
    groups: [{
      id: 'def',
      products: [
        { name: 'PETROMIN PETRO BLUE 32% (AdBlue)',
          points: ['Reduces NOx emissions to meet Euro 4, 5, and 6 standards', 'Cuts hydrocarbon, carbon monoxide, and particulate emissions', 'Enhances fuel economy and lowers overall SCR system maintenance costs', 'Protects heavy-duty diesel and marine SCR systems with a consistent, high-purity formulation', 'Ensures environmental compliance through efficient selective catalytic reduction'],
          spec: [['Type/Spec', '32% Aqueous Urea Solution (AUS 32) | Transparent/Colourless'], ['Application', 'Diesel engine powertrains and marine systems equipped with SCR technology'], ['Handling/Storage', '2-year shelf life']] },
      ],
    }],
  },
];

// p.20
export const apiCategories = {
  title: 'API Categories — Status',
  timeline: [
    { year: '1990', cat: 'CF-4', status: 'obsolete' },
    { year: '1998', cat: 'CH-4', status: 'current' },
    { year: '2002', cat: 'CI-4', status: 'current' },
    { year: '2004', cat: 'CI-4 PLUS', status: 'current' },
    { year: '2007', cat: 'CJ-4', status: 'current' },
    { year: '2017', cat: 'CK-4 / FA-4', status: 'current' },
  ],
  table: { standard: 'API CK-4', position: 'Current diesel standard', bestFor: 'Heavy-duty diesel engines', compatibility: 'Backward compatible ULSD, <15 ppm sulfur' },
};

// p.21 — extracted from the vector matrix: A = approval (filled dot), M = meets/exceeds (outline).
export const oems = ['Mercedes-Benz', 'MAN', 'Volvo', 'MTU', 'Mack', 'Renault Trucks', 'Cummins', 'Allison', 'CAT', 'Deutz'];
export const recommendations = [
  { product: 'Turbomaster K SynTech 10W-40 CK-4', row: 'AAAMAAMMMM' },
  { product: 'Turbomaster K 15W-40 CK-4',         row: 'AAAAAAA-MM' },
  { product: 'Turbomaster Plus 10W-40 CI-4',      row: 'A-AAAAA-MM' },
  { product: 'Turbomaster LD 10W-40 CI-4',        row: 'AMAAAAM-MM' },
  { product: 'Turbomaster MBX 10W-40 CI-4',       row: 'MMM-MMM--M' },
  { product: 'Turbomaster XD 15W-40 CI-4',        row: 'AMAAAAA-MM' },
  { product: 'Fleetmaster Plus 15W-40 CH-4',      row: '-M----M-MM' },
  { product: 'Fleetmaster LD 15W-40 CH-4',        row: 'MM-MM-M-MM' },
];

// p.30–37
export const services = {
  title: 'Our Services',
  lifecycle: [
    { name: 'Assess', text: 'Understand equipment, duty cycles and lubrication needs.', icon: 'svc-assess' },
    { name: 'Recommend', text: 'Select the right products and program.', icon: 'svc-step' },
    { name: 'Implement', text: 'Supply products, storage and training.', icon: 'svc-step' },
    { name: 'Monitor', text: 'Conduct oil analysis, testing and tank monitoring.', icon: 'svc-step' },
    { name: 'Optimize Process', text: 'Improve drain intervals, inventory and reliability.', icon: 'svc-step' },
  ],
  list: [
    {
      slug: 'assess', name: 'Assess', mark: 'serve-assess', img: 'svc-assess',
      oneLiner: 'Match the right lubricant to your operation.',
      intro: 'Lubrication assessment matching the right product to your operation.',
      features: ['Custom plans, structured data, tailored reports', 'Recommendations from technical analysis + field experience', 'Optimal selection, data-driven decisions, less waste', 'Led by specialists with real regional experience', 'Need Analysis, translating product & CVP benefits into monetary business value', 'Technical & lubricants management consultancy'],
      value: ['Optimal product selection for every application.', 'Data-driven decisions, not guesswork.', 'Optimized inventory and reduced waste.'],
    },
    {
      slug: 'lab-on-wheels', name: 'Lab on Wheels', mark: 'serve-lab-on-wheels', img: 'svc-lab-on-wheels',
      oneLiner: 'On-site oil testing, fast results.',
      intro: 'On-site oil testing for fast, usable answers.',
      features: ['Analysis of critical parameters', 'Tailored testing, quick turnaround', 'Catches problems before they cause downtime', 'Specialists interpret results on the spot'],
      value: ['Catch problems before they become breakdowns.', 'Reduced downtime and higher equipment productivity.', 'Immediate expert interpretation of results, not just raw data.'],
    },
    {
      slug: 'oil-condition-monitoring', name: 'Oil Condition Monitoring', short: 'Oil Condition Monitoring (OCM)', mark: 'serve-ocm', img: 'svc-ocm',
      oneLiner: 'Used oil analysis for equipment health.',
      intro: 'Used oil analysis for equipment health and maintenance decisions.',
      features: ['Sampling assesses lubricant and equipment condition', 'Early detection of issues', 'Recommendations from historical trend data', 'Less downtime, lower costs'],
      value: ['Reduced downtime through early issue detection', 'Lower maintenance costs from optimized drain intervals', 'Historical data available anytime, on any device'],
    },
    {
      slug: 'technical-training', name: 'Technical Training', mark: 'serve-training', img: 'svc-training',
      oneLiner: 'Specialist-led lubrication training.',
      intro: 'Specialist-led training to improve everyday lubrication practices.',
      features: ['Product knowledge and selection training', 'Hands-on, on-site sessions', 'Technical guides and reference handbooks', 'Skilled workforce, fewer failures, safer handling'],
      value: ['A skilled, confident workforce', 'Fewer lubrication-related failures', 'Safer handling and application practices'],
    },
    {
      slug: 'tank-sensors', name: 'Tank Sensors', mark: 'serve-tank-sensors', img: 'svc-tank-sensors',
      oneLiner: 'Remote, real-time inventory monitoring.',
      intro: 'Remote monitoring for real-time visibility of lubricant inventory.',
      features: ['Real-time oil level monitoring, live dashboard', 'Automated low-level alerts', 'Specialist installation and commissioning', 'Fewer stock-outs, fewer site visits'],
      value: ['Eliminates stock-outs through proactive alerts', 'No operational disruption during installation', 'Fewer manual site visits and dip checks'],
      notes: ['*Service on trial. Contact your Account Manager for details.'],
    },
    {
      slug: 'mobile-storage-tanks', name: 'Mobile Bulk Storage', short: 'Mobile Storage Tanks', mark: 'serve-mobile-tanks', img: 'svc-mobile-tanks',
      oneLiner: 'Ready-to-use storage on delivery.',
      intro: 'Ready-to-use storage while permanent storage is installed.',
      features: ['5,000-litre units with pump, dispensing gun, sensor, generator', 'Portable, ready on delivery', 'No assembly required', 'Professionally managed, standardized procedures'],
      value: ['No barrier to getting started', 'Immediate operations with no assembly required', 'Flexible mobility as your needs change'],
      notes: ['*Representative image only. Actual appearance may vary.', '*Service on trial. Contact your Account Manager for details.'],
    },
  ],
};

// p.38
export const roadmap = {
  eyebrow: 'Service delivery process',
  title: ['Our', 'Service Roadmap'],
  sub: 'How to get this service',
  steps: [
    { text: 'Contact Account Manager', icon: 'road-phone' },
    { text: 'Share equipment & lubrication details', icon: 'road-share' },
    { text: 'Schedule a Technical Meeting', icon: 'road-meeting' },
    { text: 'Team assesses conditions', icon: 'road-assess' },
    { text: 'Receive report & recommendations', icon: 'road-report' },
    { text: 'Align on implementation', icon: 'road-align' },
  ],
};

// p.39
export const oilFinder = {
  eyebrow: 'The right oil for every engine and every machine',
  title: ['Petrolube', 'Oil Finder'],
  what: 'Petrolube Oil Finder is a smart digital tool that instantly matches your vehicle or equipment with the right Petrolube lubricant. Instead of guessing or searching through technical catalogues, you enter a few details and let the tool do the work. Built on Petrolube’s technical expertise and OEM specifications, it delivers accurate recommendations that meet your manufacturer’s requirements with confidence.',
  delivers: 'The Oil Finder gives you a precise lubricant recommendation for both on-road vehicles and industrial or agricultural equipment. Choose your vehicle by make, model and year, or select your equipment by type, application or required specification. Recommendations span the full Petrolube range — engine oils, transmission and gear fluids, hydraulic oils, greases, coolants and industrial and agricultural lubricants. Each recommendation includes:',
  includes: ['The correct product, viscosity grade and specification', 'The performance level and OEM specifications your application requires', 'Results anytime, on any device, in seconds'],
};
