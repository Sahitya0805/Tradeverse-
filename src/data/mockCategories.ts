import { CategoryInfo } from '../types';

export const MOCK_CATEGORIES: CategoryInfo[] = [
  {
    id: 'vehicles',
    name: 'Vehicles',
    icon: 'Car',
    description: 'Cars, Electric Vehicles, Luxury, Boats & Parts',
    subcategories: ['Cars', 'SUVs', 'Luxury Cars', 'Electric Vehicles', 'Motorcycles', 'Boats', 'Auto Parts'],
    liveCount: 14280,
    trendingPct: '+18.4%',
    aiRecommendation: 'Tesla Model Y & Porsche 911 prices down 4.2% this month'
  },
  {
    id: 'real-estate',
    name: 'Real Estate',
    icon: 'Home',
    description: 'Homes, Apartments, Offices & Vacation Rentals',
    subcategories: ['Homes', 'Apartments', 'Condos', 'Commercial', 'Office Space', 'Land', 'Vacation Rentals'],
    liveCount: 8940,
    trendingPct: '+12.1%',
    aiRecommendation: 'San Diego waterfront properties seeing 8.5% equity yield'
  },
  {
    id: 'jobs',
    name: 'Jobs & Careers',
    icon: 'Briefcase',
    description: 'Full-Time, Remote, Freelance & ATS Resume Coach',
    subcategories: ['Full-Time', 'Part-Time', 'Remote Jobs', 'Hybrid Jobs', 'Freelance', 'Contract'],
    liveCount: 5620,
    trendingPct: '+24.6%',
    aiRecommendation: 'Remote Staff AI Engineer roles up 35% in demand'
  },
  {
    id: 'electronics',
    name: 'Electronics & Goods',
    icon: 'Smartphone',
    description: 'Phones, Laptops, Gaming, Audio & Collectibles',
    subcategories: ['Phones', 'Laptops', 'Gaming', 'Cameras', 'Audio', 'Fashion', 'Furniture'],
    liveCount: 22100,
    trendingPct: '+9.8%',
    aiRecommendation: 'Apple M3 Max laptops offering $850 average savings'
  },
  {
    id: 'services',
    name: 'Services & Pros',
    icon: 'Wrench',
    description: 'Home Repair, Moving, Tutoring, Legal & Tech',
    subcategories: ['Cleaning', 'Moving', 'Electrical', 'Plumbing', 'Tutoring', 'Lawyers', 'Development'],
    liveCount: 4310,
    trendingPct: '+15.3%',
    aiRecommendation: 'Verified AI engineering services with 100% SLA guarantee'
  },
  {
    id: 'pets',
    name: 'Pets & Animals',
    icon: 'Dog',
    description: 'Adoption, Food, Accessories & Vet Care',
    subcategories: ['Dogs', 'Cats', 'Birds', 'Fish', 'Pet Adoption', 'Pet Accessories', 'Veterinary'],
    liveCount: 1840,
    trendingPct: '+6.2%',
    aiRecommendation: 'AKC certified Golden Retriever puppies with health guarantee'
  },
  {
    id: 'community',
    name: 'Community & Local',
    icon: 'Users',
    description: 'Events, Clubs, Volunteer, Lost & Found & Forums',
    subcategories: ['Events', 'Clubs', 'Sports', 'Volunteer', 'Lost & Found', 'Donations'],
    liveCount: 3120,
    trendingPct: '+11.7%',
    aiRecommendation: 'Annual AI & Tech Summit tickets 80% sold out'
  },
  {
    id: 'business',
    name: 'B2B & Enterprise',
    icon: 'Building2',
    description: 'Suppliers, Wholesalers, Franchises & Startups',
    subcategories: ['Suppliers', 'Wholesalers', 'Distributors', 'Export/Import', 'Franchises', 'Startups'],
    liveCount: 940,
    trendingPct: '+31.0%',
    aiRecommendation: 'Automated DTC E-Commerce brand operating at 38% net margin'
  }
];
