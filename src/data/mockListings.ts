import { Listing } from '../types';

export const MOCK_LISTINGS: Listing[] = [
  // VEHICLES — FAMILY SUVs UNDER $40K & LUXURY
  {
    id: 'veh-1',
    title: '2024 Tesla Model Y Performance AWD',
    category: 'vehicles',
    subcategory: 'SUVs',
    price: 39500,
    originalPrice: 44000,
    priceType: 'negotiable',
    location: 'Austin, TX (Local & Shipping)',
    images: [
      'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Pristine condition Tesla Model Y Performance with Full Self-Driving Supervised hardware. Single owner, garage kept, zero accidents. Includes Wall Connector charger.',
    seller: {
      name: 'Apex EV Dealership',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      verified: true,
      rating: 4.9,
      responseRate: '< 15 mins',
      type: 'dealer'
    },
    aiMetrics: {
      dealScore: 'Great Deal',
      trustScore: 98,
      demandScore: 92,
      priceHistoryTrend: 'down',
      pros: ['$4,500 under regional KBB market value', 'Full battery health report (98% capacity)', 'FSD Hardware 4 installed'],
      cons: ['Minor scuff on rear right rim'],
      aiSummary: 'Top-tier electric family SUV priced competitively due to year-end inventory refresh.'
    },
    specs: [
      { label: 'Year', value: 2024 },
      { label: 'Mileage', value: '12,400 mi' },
      { label: 'Drive Train', value: 'Dual Motor AWD' },
      { label: 'Range', value: '303 miles' }
    ],
    vehicleDetails: {
      vin: '5YJYGDEF9RF882910',
      mileage: '12,400 mi',
      estimatedRepairCost: '$0 (Under Factory Warranty)',
      marketValueAvg: 44000
    },
    createdDate: '2 hours ago',
    views: 412,
    likes: 89,
    featured: true
  },
  {
    id: 'veh-3',
    title: '2023 Toyota RAV4 Prime Plug-In Hybrid XSE',
    category: 'vehicles',
    subcategory: 'SUVs',
    price: 34800,
    originalPrice: 38500,
    priceType: 'negotiable',
    location: 'Denver, CO',
    images: [
      'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Popular Toyota RAV4 Prime PHEV with 42 miles pure EV range and 302 HP. Weather package, JBL premium sound, heated rear seats, and panoramic roof.',
    seller: {
      name: 'Mile High Auto',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      verified: true,
      rating: 4.85,
      responseRate: '< 30 mins',
      type: 'dealer'
    },
    aiMetrics: {
      dealScore: 'Great Deal',
      trustScore: 97,
      demandScore: 95,
      priceHistoryTrend: 'stable',
      pros: ['302 HP combined output', '42-mile all-electric range', 'Toyota Safety Sense 2.5+'],
      cons: ['High regional demand'],
      aiSummary: 'Extremely reliable family SUV with class-leading resale value and low fuel costs.'
    },
    specs: [
      { label: 'Year', value: 2023 },
      { label: 'Mileage', value: '18,200 mi' },
      { label: 'Engine', value: '2.5L 4-Cyl PHEV' },
      { label: 'MPG', value: '94 MPGe / 38 MPG' }
    ],
    vehicleDetails: {
      vin: 'JTMBB1FV9PD019284',
      mileage: '18,200 mi',
      estimatedRepairCost: '$0',
      marketValueAvg: 38500
    },
    createdDate: '4 hours ago',
    views: 650,
    likes: 142,
    featured: true
  },
  {
    id: 'veh-4',
    title: '2024 Hyundai Ioniq 5 Limited AWD SUV',
    category: 'vehicles',
    subcategory: 'SUVs',
    price: 37200,
    originalPrice: 42000,
    priceType: 'negotiable',
    location: 'San Jose, CA',
    images: [
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Ultra-fast 800V charging (10% to 80% in 18 mins). Vision roof, relaxation driver seat, HUD augmented reality display, and Highway Driving Assist II.',
    seller: {
      name: 'Silicon Valley Motors',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
      verified: true,
      rating: 4.9,
      responseRate: '< 1 hour',
      type: 'dealer'
    },
    aiMetrics: {
      dealScore: 'Hot Find',
      trustScore: 96,
      demandScore: 91,
      priceHistoryTrend: 'down',
      pros: ['Ultra-fast 800V charging tech', 'Spacious futuristic cabin', 'V2L power outlet included'],
      cons: ['Slightly lower cargo volume than RAV4'],
      aiSummary: 'Futuristic electric family SUV offering high tech features under $40,000.'
    },
    specs: [
      { label: 'Year', value: 2024 },
      { label: 'Mileage', value: '9,800 mi' },
      { label: 'Drivetrain', value: 'AWD (320 HP)' },
      { label: 'Charging', value: '18 min 800V DC Fast' }
    ],
    vehicleDetails: {
      vin: 'KM8KR4AE8RU091245',
      mileage: '9,800 mi',
      estimatedRepairCost: '$0',
      marketValueAvg: 42000
    },
    createdDate: '1 day ago',
    views: 810,
    likes: 195
  },
  {
    id: 'veh-5',
    title: '2023 Ford Mustang Mach-E Premium AWD SUV',
    category: 'vehicles',
    subcategory: 'SUVs',
    price: 35900,
    originalPrice: 41000,
    priceType: 'fixed',
    location: 'Chicago, IL',
    images: [
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Space White Mach-E Premium with Extended Range battery. B&O 10-speaker sound system, BlueCruise hands-free driving, and 360-degree camera.',
    seller: {
      name: 'Windy City Auto',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      verified: true,
      rating: 4.8,
      responseRate: '< 2 hours',
      type: 'dealer'
    },
    aiMetrics: {
      dealScore: 'Great Deal',
      trustScore: 95,
      demandScore: 89,
      priceHistoryTrend: 'down',
      pros: ['BlueCruise hands-free highway driving', 'Extended range 290 miles', 'Premium B&O audio'],
      cons: ['Slight firm sport ride suspension'],
      aiSummary: 'Sporty crossover SUV blending iconic styling with everyday utility.'
    },
    specs: [
      { label: 'Year', value: 2023 },
      { label: 'Mileage', value: '15,100 mi' },
      { label: 'Range', value: '290 miles' },
      { label: 'Drive', value: 'AWD' }
    ],
    vehicleDetails: {
      vin: '3FMTK3SU5PMA88192',
      mileage: '15,100 mi',
      estimatedRepairCost: '$0',
      marketValueAvg: 41000
    },
    createdDate: '2 days ago',
    views: 590,
    likes: 120
  },
  {
    id: 'veh-2',
    title: '2023 Porsche 911 Carrera S Coupe',
    category: 'vehicles',
    subcategory: 'Luxury Cars',
    price: 118000,
    priceType: 'fixed',
    location: 'Miami, FL',
    images: [
      'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Chalk White exterior with Bordeaux Red leather interior. Sport Chrono package, PDK transmission, Sport Exhaust. Fully clear-bra protected.',
    seller: {
      name: 'Elena Rostova',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
      verified: true,
      rating: 5.0,
      responseRate: '< 1 hour',
      type: 'individual'
    },
    aiMetrics: {
      dealScore: 'Fair Price',
      trustScore: 95,
      demandScore: 96,
      priceHistoryTrend: 'stable',
      pros: ['Clean CarFax, single private owner', 'Sport Chrono & PPF installed', 'Recent Porsche dealer service'],
      cons: ['Slight premium over base Carrera'],
      aiSummary: 'Strong luxury investment car holding resale value exceptionally well.'
    },
    specs: [
      { label: 'Engine', value: '3.0L Twin-Turbo Flat-6' },
      { label: 'Horsepower', value: '443 hp' },
      { label: 'Transmission', value: '8-Speed PDK' }
    ],
    vehicleDetails: {
      vin: 'WP0AB2A91PS291034',
      mileage: '8,900 mi',
      estimatedRepairCost: '$0',
      marketValueAvg: 119500
    },
    createdDate: '1 day ago',
    views: 890,
    likes: 215
  },

  // REAL ESTATE
  {
    id: 're-1',
    title: 'Modern Waterfront Smart Villa with Private Dock',
    category: 'real-estate',
    subcategory: 'Homes',
    price: 1250000,
    priceType: 'fixed',
    location: 'San Diego, CA (Pacific Beach)',
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80'
    ],
    description: '4 Bed / 4.5 Bath architecturally designed smart home. Floor-to-ceiling glass walls, solar roof, infinity edge pool, and deep-water yacht dock access.',
    seller: {
      name: 'Vanguard Luxury Realty',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      verified: true,
      rating: 4.95,
      responseRate: '< 30 mins',
      type: 'agent'
    },
    aiMetrics: {
      dealScore: 'Hot Find',
      trustScore: 99,
      demandScore: 97,
      priceHistoryTrend: 'up',
      pros: ['Substantial rental yield potential ($9.5k/mo)', 'Top-rated La Jolla school district', 'Solar net metering offsets 90% power'],
      cons: ['HOA fee of $450/month'],
      aiSummary: 'Exceptional coastal investment property with high liquidity and equity growth trajectory.'
    },
    specs: [
      { label: 'Bedrooms', value: 4 },
      { label: 'Bathrooms', value: 4.5 },
      { label: 'Sq Ft', value: 3850 },
      { label: 'Year Built', value: 2022 }
    ],
    propertyDetails: {
      schoolRating: 9.6,
      crimeScore: 'Low (98th percentile safety)',
      transitScore: 84,
      investmentScore: 94,
      leaseTerms: 'Available for purchase or $8,500/mo long-term lease'
    },
    createdDate: '3 days ago',
    views: 1450,
    likes: 340,
    featured: true
  },
  {
    id: 're-2',
    title: 'Minimalist Loft Apartment in Tech Corridor',
    category: 'real-estate',
    subcategory: 'Apartments',
    price: 2800,
    priceType: 'monthly',
    location: 'Seattle, WA (South Lake Union)',
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Sleek 2-bedroom loft with exposed concrete, high ceilings, automated blinds, and rooftop lounge overlooking the skyline. Pet friendly.',
    seller: {
      name: 'Urban Living Mgmt',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
      verified: true,
      rating: 4.8,
      responseRate: '< 1 hour',
      type: 'business'
    },
    aiMetrics: {
      dealScore: 'Great Deal',
      trustScore: 96,
      demandScore: 94,
      priceHistoryTrend: 'stable',
      pros: ['Walking distance to Amazon HQ & Meta', 'High-speed gigabit fiber included', 'EV parking spot available'],
      cons: ['Strict 1-year lease minimum'],
      aiSummary: 'Ideal high-efficiency rental for tech professionals with turnkey smart home amenities.'
    },
    specs: [
      { label: 'Bed / Bath', value: '2 Bed / 2 Bath' },
      { label: 'Sq Ft', value: 1050 },
      { label: 'Pets', value: 'Dogs & Cats Allowed' }
    ],
    propertyDetails: {
      schoolRating: 8.2,
      crimeScore: 'Low-Med',
      transitScore: 95,
      investmentScore: 88,
      leaseTerms: '12 Months Lease'
    },
    createdDate: '5 hours ago',
    views: 620,
    likes: 112
  },
  {
    id: 're-3',
    title: 'Luxury 2-Bed High-Rise Condo with Panoramic Bay View',
    category: 'real-estate',
    subcategory: 'Condos',
    price: 3200,
    priceType: 'monthly',
    location: 'San Francisco, CA (SOMA)',
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Corner 2-bedroom 2-bathroom suite with floor-to-ceiling glass, valet parking, 24/7 concierge, state of the art gym and heated lap pool.',
    seller: {
      name: 'Pacific Heights Properties',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      verified: true,
      rating: 4.9,
      responseRate: '< 20 mins',
      type: 'agent'
    },
    aiMetrics: {
      dealScore: 'Fair Price',
      trustScore: 98,
      demandScore: 96,
      priceHistoryTrend: 'stable',
      pros: ['24/7 Concierge & Security', 'Includes designated EV charging bay', 'Corner unit with dual bay views'],
      cons: ['Parking fee $200/mo'],
      aiSummary: 'Premier urban high-rise living in San Francisco tech hub.'
    },
    specs: [
      { label: 'Bed / Bath', value: '2 Bed / 2 Bath' },
      { label: 'Sq Ft', value: 1180 },
      { label: 'Floor', value: '28th Floor' }
    ],
    propertyDetails: {
      schoolRating: 8.8,
      crimeScore: 'Low',
      transitScore: 98,
      investmentScore: 91,
      leaseTerms: 'Flexible 6-12 Months'
    },
    createdDate: '1 day ago',
    views: 940,
    likes: 210
  },

  // JOBS
  {
    id: 'job-1',
    title: 'Staff AI Engineer — Autonomous Agents',
    category: 'jobs',
    subcategory: 'Remote Jobs',
    price: 220000,
    priceType: 'contact',
    location: 'Remote (US/Canada)',
    images: [
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'We are seeking a Staff AI Systems Architect to lead autonomous agent workflow design using LLMs, LangGraph, and vector databases. 100% remote with competitive equity package.',
    seller: {
      name: 'Cognitive Dynamics Labs',
      avatar: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=150&q=80',
      verified: true,
      rating: 4.9,
      responseRate: '< 2 hours',
      type: 'business'
    },
    aiMetrics: {
      dealScore: 'Hot Find',
      trustScore: 99,
      demandScore: 98,
      priceHistoryTrend: 'up',
      pros: ['$220k - $280k base + 0.25% equity', 'Unlimited PTO & $5,000 home office stipend', 'Cutting-edge agentic stack'],
      cons: ['Requires strong track record in Python & Rust'],
      aiSummary: 'Top-tier remote AI compensation package with direct AI-native product impact.'
    },
    specs: [
      { label: 'Salary Range', value: '$220,000 - $280,000 / yr' },
      { label: 'Work Mode', value: '100% Remote' },
      { label: 'Experience', value: '6+ Years' }
    ],
    jobDetails: {
      type: 'Remote',
      salaryRange: '$220,000 - $280,000 / yr',
      requiredSkills: ['Python', 'TypeScript', 'LangChain', 'Vector Search', 'PyTorch'],
      experienceLevel: 'Staff / Senior Lead'
    },
    createdDate: '1 day ago',
    views: 2100,
    likes: 540,
    featured: true
  },
  {
    id: 'job-2',
    title: 'Senior React & Next.js Frontend Architect',
    category: 'jobs',
    subcategory: 'Remote Jobs',
    price: 185000,
    priceType: 'contact',
    location: 'Remote (Global)',
    images: [
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Building next-generation design systems and high performance client interfaces. Deep expertise in Tailwind CSS, Framer Motion, and WebGL required.',
    seller: {
      name: 'Linear Tech Alliance',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      verified: true,
      rating: 5.0,
      responseRate: '< 30 mins',
      type: 'business'
    },
    aiMetrics: {
      dealScore: 'Great Deal',
      trustScore: 98,
      demandScore: 96,
      priceHistoryTrend: 'up',
      pros: ['$185k - $215k base', 'Flexible working hours', '4-day work week option'],
      cons: ['High technical bar'],
      aiSummary: 'High-impact frontend role in fast-growing product startup.'
    },
    specs: [
      { label: 'Salary Range', value: '$185,000 - $215,000 / yr' },
      { label: 'Work Mode', value: '100% Remote' },
      { label: 'Experience', value: '5+ Years' }
    ],
    jobDetails: {
      type: 'Remote',
      salaryRange: '$185,000 - $215,000 / yr',
      requiredSkills: ['React', 'Next.js', 'TypeScript', 'Tailwind', 'Framer Motion'],
      experienceLevel: 'Senior'
    },
    createdDate: '3 hours ago',
    views: 1120,
    likes: 310
  },

  // ELECTRONICS
  {
    id: 'elec-1',
    title: 'Apple MacBook Pro 16" M3 Max (64GB RAM, 2TB SSD)',
    category: 'electronics',
    subcategory: 'Laptops',
    price: 2950,
    originalPrice: 3800,
    priceType: 'negotiable',
    location: 'San Francisco, CA',
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Space Black MacBook Pro M3 Max 16-Core CPU / 40-Core GPU. Flawless condition, under AppleCare+ until 2026. Original box and 140W MagSafe charger included.',
    seller: {
      name: 'Marcus Tech ReCommerce',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
      verified: true,
      rating: 4.9,
      responseRate: '< 10 mins',
      type: 'individual'
    },
    aiMetrics: {
      dealScore: 'Great Deal',
      trustScore: 97,
      demandScore: 95,
      priceHistoryTrend: 'down',
      pros: ['Save $850 off original MSRP', 'AppleCare+ transferable warranty active', 'Only 18 battery charge cycles'],
      cons: ['No return policy after 7 days'],
      aiSummary: 'Powerhouse machine for AI developers, video creators, and engineers.'
    },
    specs: [
      { label: 'Processor', value: 'Apple M3 Max (16-Core)' },
      { label: 'Unified Memory', value: '64 GB' },
      { label: 'Storage', value: '2 TB High Speed SSD' },
      { label: 'Condition', value: 'Mint (Like New)' }
    ],
    createdDate: '4 hours ago',
    views: 780,
    likes: 190
  },
  {
    id: 'elec-2',
    title: 'Apple iPhone 16 Pro Max (512GB Natural Titanium)',
    category: 'electronics',
    subcategory: 'Phones',
    price: 1240,
    originalPrice: 1399,
    priceType: 'fixed',
    location: 'New York, NY',
    images: [
      'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Brand new factory sealed iPhone 16 Pro Max. Unlocked for all carriers worldwide. Includes Apple 1-year international warranty.',
    seller: {
      name: 'Empire Electronics',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      verified: true,
      rating: 4.95,
      responseRate: '< 15 mins',
      type: 'dealer'
    },
    aiMetrics: {
      dealScore: 'Great Deal',
      trustScore: 99,
      demandScore: 98,
      priceHistoryTrend: 'stable',
      pros: ['Factory Sealed Box', 'Unlocked for all GSM/CDMA carriers', 'Includes screen protector'],
      cons: ['Fixed non-negotiable price'],
      aiSummary: 'Flagship iPhone 16 Pro Max at wholesale pricing.'
    },
    specs: [
      { label: 'Storage', value: '512 GB' },
      { label: 'Color', value: 'Natural Titanium' },
      { label: 'Status', value: 'Factory Sealed' }
    ],
    createdDate: '2 hours ago',
    views: 1420,
    likes: 410
  },
  {
    id: 'elec-3',
    title: 'Google Pixel 9 Pro Fold (512GB Obsidian Black)',
    category: 'electronics',
    subcategory: 'Phones',
    price: 1590,
    originalPrice: 1799,
    priceType: 'negotiable',
    location: 'Austin, TX',
    images: [
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Google Pixel 9 Pro Fold with Gemini Advanced integration, 8" Super Actua Inner display, and pro camera system.',
    seller: {
      name: 'Austin Tech Exchange',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      verified: true,
      rating: 4.85,
      responseRate: '< 30 mins',
      type: 'individual'
    },
    aiMetrics: {
      dealScore: 'Hot Find',
      trustScore: 96,
      demandScore: 94,
      priceHistoryTrend: 'down',
      pros: ['Gemini AI Features Built-in', 'Massive 8" Folding Display', 'Save $209 off retail'],
      cons: ['Requires delicate handling'],
      aiSummary: 'Top tier foldable Android flagship with built-in AI assistant.'
    },
    specs: [
      { label: 'RAM', value: '16 GB' },
      { label: 'Storage', value: '512 GB' },
      { label: 'Screen', value: '8.0" Super Actua' }
    ],
    createdDate: '1 day ago',
    views: 890,
    likes: 240
  },

  // SERVICES
  {
    id: 'serv-1',
    title: 'Custom AI Automation & Full-Stack Web Development',
    category: 'services',
    subcategory: 'Development',
    price: 85,
    priceType: 'hourly',
    location: 'Global / Remote Service',
    images: [
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Senior Full-Stack Consultant building custom Web Apps, AI agent workflows, SaaS platforms, and internal tools. Over 40+ completed enterprise contracts.',
    seller: {
      name: 'DevCraft AI Agency',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80',
      verified: true,
      rating: 5.0,
      responseRate: '< 15 mins',
      type: 'business'
    },
    aiMetrics: {
      dealScore: 'Great Deal',
      trustScore: 100,
      demandScore: 93,
      priceHistoryTrend: 'stable',
      pros: ['100% Client Satisfaction rate', 'Free 30-min AI architectural review', 'Includes automated CI/CD pipeline'],
      cons: ['High demand; book 1 week in advance'],
      aiSummary: 'Verified senior engineering service with guaranteed code quality and SOC2 standards.'
    },
    specs: [
      { label: 'Hourly Rate', value: '$85 / hr' },
      { label: 'Tech Stack', value: 'Next.js, Python, Tailwind, OpenAI, Postgres' },
      { label: 'Turnaround', value: 'Rapid Delivery' }
    ],
    createdDate: '2 days ago',
    views: 340,
    likes: 95
  },

  // PETS
  {
    id: 'pet-1',
    title: 'Purebred Golden Retriever Puppies (AKC Certified)',
    category: 'pets',
    subcategory: 'Dogs',
    price: 1400,
    priceType: 'negotiable',
    location: 'Denver, CO',
    images: [
      'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Healthy, playful Golden Retriever puppies raised in family home. Vaccinated, microchipped, dewclaws removed, and health guarantee included.',
    seller: {
      name: 'Highland Goldens',
      avatar: 'https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&w=150&q=80',
      verified: true,
      rating: 4.95,
      responseRate: '< 1 hour',
      type: 'individual'
    },
    aiMetrics: {
      dealScore: 'Fair Price',
      trustScore: 98,
      demandScore: 90,
      priceHistoryTrend: 'stable',
      pros: ['AKC certified pedigree', '2-year genetic health guarantee', 'First vet checkups complete'],
      cons: ['Requires home visit verification'],
      aiSummary: 'Ethically bred family companions with verified health records.'
    },
    specs: [
      { label: 'Age', value: '9 Weeks' },
      { label: 'Vaccinated', value: 'Yes' },
      { label: 'Microchipped', value: 'Yes' }
    ],
    createdDate: '1 day ago',
    views: 920,
    likes: 280
  },

  // COMMUNITY
  {
    id: 'comm-1',
    title: 'Annual AI & Web Tech Summit 2026',
    category: 'community',
    subcategory: 'Events',
    price: 49,
    priceType: 'fixed',
    location: 'San Jose Convention Center & Online',
    images: [
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Join 2,500+ builders, founders, and AI researchers for keynotes, hands-on workshops, and networking hackathons.',
    seller: {
      name: 'TechVerse Alliance',
      avatar: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&w=150&q=80',
      verified: true,
      rating: 4.85,
      responseRate: '< 4 hours',
      type: 'business'
    },
    aiMetrics: {
      dealScore: 'Great Deal',
      trustScore: 96,
      demandScore: 97,
      priceHistoryTrend: 'up',
      pros: ['Includes recordings & workshop code repos', 'Catered lunch & evening mixer', 'Keynote speakers from top AI labs'],
      cons: ['In-person seats strictly limited'],
      aiSummary: 'Premier developer event offering immense networking and skill advancement.'
    },
    specs: [
      { label: 'Date', value: 'Sept 14-16, 2026' },
      { label: 'Format', value: 'Hybrid Pass' }
    ],
    createdDate: '4 days ago',
    views: 1850,
    likes: 420
  },

  // BUSINESS
  {
    id: 'biz-1',
    title: 'Turnkey E-Commerce Brand (Automated Logistics)',
    category: 'business',
    subcategory: 'Startups',
    price: 145000,
    priceType: 'negotiable',
    location: 'Chicago, IL (Global Ship)',
    images: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Established DTC brand producing ergonomic home office equipment. $380,000 TTM revenue with 38% net margin. 3PL warehousing and automated Shopify workflow.',
    seller: {
      name: 'Apex Capital Advisors',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80',
      verified: true,
      rating: 5.0,
      responseRate: '< 1 hour',
      type: 'business'
    },
    aiMetrics: {
      dealScore: 'Hot Find',
      trustScore: 97,
      demandScore: 95,
      priceHistoryTrend: 'stable',
      pros: ['Clean financial audits & Tax returns verified', 'Fully remote operation requires < 10 hrs/week', 'Strong supplier contracts locked for 2 years'],
      cons: ['Requires inventory capital buffer'],
      aiSummary: 'Highly profitable automated business with immediate positive cash flow.'
    },
    specs: [
      { label: 'TTM Revenue', value: '$380,000' },
      { label: 'Net Profit Margin', value: '38%' }
    ],
    createdDate: '2 days ago',
    views: 1100,
    likes: 310
  }
];
