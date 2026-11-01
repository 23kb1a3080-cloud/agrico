import { ROLES, VERIFICATION_STATUS, ORDER_STATUS, FARMING_TYPES } from '../config/constants.js';

export const memoryDb = {
  users: [
    {
      id: 1,
      fullName: 'Ramesh Patel',
      email: 'ramesh@kisan.com',
      phone: '+91 98765 43210',
      passwordHash: '$2a$10$7vGz0nQf1mBq1kE/5V.ULeS5lCqP3p9y6L5iUeA8y1lV4x5Z4p1/W', // kisan123
      role: ROLES.FARMER,
      city: 'Nashik',
      state: 'Maharashtra',
      address: 'Plot 4, Krishi Mandal, Nashik',
      farmName: 'Patel Organic Farms',
      farmSize: '12.5 Acres',
      aadhaarNumber: '5489-3210-9874',
      aadhaarDoc: 'aadhaar_ramesh_patel.pdf',
      landDoc: '1b_land_patel_nashik.pdf',
      verificationStatus: VERIFICATION_STATUS.APPROVED,
      isActive: true,
      createdAt: new Date().toISOString()
    },
    {
      id: 2,
      fullName: 'Suresh Kumar',
      email: 'suresh@kisan.com',
      phone: '+91 98111 22334',
      passwordHash: '$2a$10$7vGz0nQf1mBq1kE/5V.ULeS5lCqP3p9y6L5iUeA8y1lV4x5Z4p1/W',
      role: ROLES.FARMER,
      city: 'Guntur',
      state: 'Andhra Pradesh',
      address: 'Chilli Farm Road, Guntur',
      farmName: 'Sri Venkateswara Farms',
      farmSize: '8.0 Acres',
      aadhaarNumber: '1122-3344-5566',
      aadhaarDoc: 'aadhaar_suresh.pdf',
      landDoc: '1b_land_suresh_guntur.pdf',
      verificationStatus: VERIFICATION_STATUS.PENDING,
      isActive: true,
      createdAt: new Date().toISOString()
    },
    {
      id: 3,
      fullName: 'Balvinder Singh',
      email: 'balvinder@kisan.com',
      phone: '+91 94170 55667',
      passwordHash: '$2a$10$7vGz0nQf1mBq1kE/5V.ULeS5lCqP3p9y6L5iUeA8y1lV4x5Z4p1/W',
      role: ROLES.FARMER,
      city: 'Ludhiana',
      state: 'Punjab',
      address: 'GT Road Agro Belt, Ludhiana',
      farmName: 'Green Gold Agro',
      farmSize: '25.0 Acres',
      aadhaarNumber: '9900-1122-3344',
      aadhaarDoc: 'aadhaar_balvinder.pdf',
      landDoc: '1b_land_ludhiana.pdf',
      verificationStatus: VERIFICATION_STATUS.APPROVED,
      isActive: true,
      createdAt: new Date().toISOString()
    },
    {
      id: 4,
      fullName: 'Pooja Sharma',
      email: 'pooja@gmail.com',
      phone: '+91 99887 76655',
      passwordHash: '$2a$10$7vGz0nQf1mBq1kE/5V.ULeS5lCqP3p9y6L5iUeA8y1lV4x5Z4p1/W',
      role: ROLES.CUSTOMER,
      city: 'Mumbai',
      state: 'Maharashtra',
      address: 'B-402, Green Meadows, Andheri West, Mumbai 400053',
      isActive: true,
      createdAt: new Date().toISOString()
    },
    {
      id: 5,
      fullName: 'Dr. Vikram Seth (System Admin)',
      email: 'admin@agriconnect.gov.in',
      phone: '+91 90000 11111',
      passwordHash: '$2a$10$7vGz0nQf1mBq1kE/5V.ULeS5lCqP3p9y6L5iUeA8y1lV4x5Z4p1/W',
      role: ROLES.ADMIN,
      city: 'New Delhi',
      state: 'Delhi',
      isActive: true,
      createdAt: new Date().toISOString()
    }
  ],

  products: [
    {
      id: 101,
      farmerId: 1,
      farmerName: 'Ramesh Patel',
      farmerLocation: 'Nashik, Maharashtra',
      title: '100% Certified Organic Fresh Tomatoes',
      category: 'Vegetables',
      farmingType: FARMING_TYPES.ORGANIC,
      price: 45,
      unit: 'KG',
      stock: 850,
      harvestDate: '2026-10-28',
      rating: 4.9,
      reviewCount: 38,
      image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80',
      description: 'Naturally ripened vine tomatoes grown using Desi Cow Jeevamrutha and organic compost without synthetic fertilizers or pesticides.',
      isActive: true
    },
    {
      id: 102,
      farmerId: 3,
      farmerName: 'Balvinder Singh',
      farmerLocation: 'Ludhiana, Punjab',
      title: 'Premium Sharbati Wheat (Golden Grain)',
      category: 'Grains',
      farmingType: FARMING_TYPES.CONVENTIONAL,
      price: 36,
      unit: 'KG',
      stock: 4500,
      harvestDate: '2026-10-12',
      rating: 4.8,
      reviewCount: 92,
      image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&auto=format&fit=crop&q=80',
      description: 'A-grade Sharbati grain cultivated in nutrient-rich Punjab plains. Soft, sweet after-taste rotis with high dietary fiber.',
      isActive: true
    },
    {
      id: 103,
      farmerId: 1,
      farmerName: 'Ramesh Patel',
      farmerLocation: 'Nashik, Maharashtra',
      title: 'Salem Organic Turmeric Powder (High Curcumin)',
      category: 'Spices',
      farmingType: FARMING_TYPES.ORGANIC,
      price: 240,
      unit: 'KG',
      stock: 320,
      harvestDate: '2026-09-18',
      rating: 5.0,
      reviewCount: 64,
      image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600&auto=format&fit=crop&q=80',
      description: 'Sun-dried farm turmeric roots grounded with high 5.2% curcumin retention. Zero adulteration, certified pesticide-free.',
      isActive: true
    },
    {
      id: 104,
      farmerId: 3,
      farmerName: 'Balvinder Singh',
      farmerLocation: 'Ludhiana, Punjab',
      title: 'Traditional Basmati 1121 Extra Long Rice',
      category: 'Grains',
      farmingType: FARMING_TYPES.CONVENTIONAL,
      price: 110,
      unit: 'KG',
      stock: 2200,
      harvestDate: '2026-10-05',
      rating: 4.7,
      reviewCount: 45,
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&auto=format&fit=crop&q=80',
      description: 'Aged 1121 aromatic basmati grain. Retains 2x length on cooking with non-sticky fluffiness and distinct Himalayan aroma.',
      isActive: true
    }
  ],

  orders: [
    {
      id: 'ORD-9021',
      customerId: 4,
      customerName: 'Pooja Sharma',
      customerPhone: '+91 99887 76655',
      farmerId: 1,
      farmerName: 'Ramesh Patel',
      totalAmount: 1125,
      items: [
        { productId: 101, title: '100% Certified Organic Fresh Tomatoes', price: 45, quantity: 15, unit: 'KG' },
        { productId: 103, title: 'Salem Organic Turmeric Powder', price: 240, quantity: 1, unit: 'KG' }
      ],
      status: ORDER_STATUS.DISPATCHED,
      shippingAddress: 'B-402, Green Meadows, Andheri West, Mumbai 400053',
      placedAt: '2026-10-29 09:30 AM',
      trackingTimeline: [
        { stage: 'PLACED', time: '2026-10-29 09:30 AM', note: 'Order placed by customer' },
        { stage: 'CONFIRMED', time: '2026-10-29 11:15 AM', note: 'Farmer confirmed harvest availability' },
        { stage: 'DISPATCHED', time: '2026-10-30 08:00 AM', note: 'Dispatched via Krishi Express Van (MH-15-AB-4300)' }
      ]
    }
  ],

  communityPosts: [
    {
      id: 201,
      authorId: 2,
      authorName: 'Suresh Kumar',
      authorRole: ROLES.FARMER,
      authorLocation: 'Guntur, Andhra Pradesh',
      crop: 'Chilli / Mirchi',
      title: 'Severe Leaf Curling & Yellow Mottling on 45-day old Chilli crop',
      content: 'My 3-acre chilli crop in Guntur has suddenly shown upward leaf curling and stunted shoot growth in the last 4 days. Is this Gemini Virus or Whitefly infestation?',
      postType: 'DISEASE_DIAGNOSIS',
      image: 'https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?w=700&auto=format&fit=crop&q=80',
      likes: 14,
      createdAt: '2026-10-30 11:20 AM',
      replies: [
        {
          id: 301,
          authorName: 'Dr. K. N. Rao (Agronomist)',
          isExpert: true,
          text: 'This is typical Chilli Leaf Curl Virus transmitted by whiteflies. Immediately set up yellow sticky traps (15 per acre). Spray Diafenthiuron 50% WP @ 1.25g/L or NSKE 5% early morning.',
          createdAt: '2026-10-30 01:15 PM'
        }
      ]
    }
  ],

  messages: [
    {
      id: 1,
      senderId: 4,
      senderName: 'Pooja Sharma',
      receiverId: 1,
      receiverName: 'Ramesh Patel',
      text: 'Namaste Ramesh ji! Can I get 50kg organic tomatoes delivered by Thursday?',
      timestamp: '10:14 AM'
    },
    {
      id: 2,
      senderId: 1,
      senderName: 'Ramesh Patel',
      receiverId: 4,
      receiverName: 'Pooja Sharma',
      text: 'Namaste Pooja ji. Yes, fresh harvest is scheduled for Wednesday morning. Direct dispatch available.',
      timestamp: '10:20 AM'
    }
  ]
};

