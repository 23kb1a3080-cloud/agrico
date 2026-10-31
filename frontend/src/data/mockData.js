// AgriConnect Initial Mock Dataset (Ready to sync with REST APIs)

export const initialUsers = [
  {
    id: 1,
    name: "Ramesh Patel",
    email: "ramesh@kisan.com",
    role: "FARMER",
    phone: "+91 98765 43210",
    city: "Nashik",
    state: "Maharashtra",
    farmName: "Patel Organic Farms",
    farmSize: "12.5 Acres",
    verificationStatus: "APPROVED",
    aadhaarNumber: "XXXX-XXXX-4589",
    aadhaarDoc: "aadhaar_ramesh_patel.pdf",
    landDoc: "1b_land_patel_nashik.pdf",
    submittedAt: "2026-10-15",
    verifiedAt: "2026-10-16"
  },
  {
    id: 2,
    name: "Suresh Kumar",
    email: "suresh@kisan.com",
    role: "FARMER",
    phone: "+91 98111 22334",
    city: "Guntur",
    state: "Andhra Pradesh",
    farmName: "Sri Venkateswara Farms",
    farmSize: "8.0 Acres",
    verificationStatus: "PENDING",
    aadhaarNumber: "XXXX-XXXX-1122",
    aadhaarDoc: "aadhaar_suresh.pdf",
    landDoc: "1b_land_suresh_guntur.pdf",
    submittedAt: "2026-10-30",
    verifiedAt: null
  },
  {
    id: 3,
    name: "Balvinder Singh",
    email: "balvinder@kisan.com",
    role: "FARMER",
    phone: "+91 94170 55667",
    city: "Ludhiana",
    state: "Punjab",
    farmName: "Green Gold Agro",
    farmSize: "25.0 Acres",
    verificationStatus: "APPROVED",
    aadhaarNumber: "XXXX-XXXX-9900",
    aadhaarDoc: "aadhaar_balvinder.pdf",
    landDoc: "1b_land_ludhiana.pdf",
    submittedAt: "2026-10-10",
    verifiedAt: "2026-10-12"
  },
  {
    id: 4,
    name: "Pooja Sharma",
    email: "pooja@gmail.com",
    role: "CUSTOMER",
    phone: "+91 99887 76655",
    city: "Mumbai",
    state: "Maharashtra",
    address: "B-402, Green Meadows, Andheri West, Mumbai 400053"
  },
  {
    id: 5,
    name: "Dr. Vikram Seth (System Admin)",
    email: "admin@agriconnect.gov.in",
    role: "ADMIN",
    phone: "+91 90000 11111",
    city: "New Delhi",
    state: "Delhi"
  }
];

export const initialProducts = [
  {
    id: 101,
    farmerId: 1,
    farmerName: "Ramesh Patel",
    farmerLocation: "Nashik, Maharashtra",
    title: "100% Certified Organic Fresh Tomatoes",
    category: "Vegetables",
    farmingType: "ORGANIC",
    price: 45,
    unit: "KG",
    stock: 850,
    harvestDate: "2026-10-28",
    rating: 4.9,
    reviewCount: 38,
    image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80",
    description: "Naturally ripened vine tomatoes grown using Desi Cow Jeevamrutha and organic compost without synthetic fertilizers or pesticides. Rich in Lycopene and vitamin C."
  },
  {
    id: 102,
    farmerId: 3,
    farmerName: "Balvinder Singh",
    farmerLocation: "Ludhiana, Punjab",
    title: "Premium Sharbati Wheat (Golden Grain)",
    category: "Grains",
    farmingType: "CONVENTIONAL",
    price: 36,
    unit: "KG",
    stock: 4500,
    harvestDate: "2026-10-12",
    rating: 4.8,
    reviewCount: 92,
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&auto=format&fit=crop&q=80",
    description: "A-grade Sharbati grain cultivated in nutrient-rich Punjab plains. Soft, sweet after-taste rotis with high dietary fiber and protein."
  },
  {
    id: 103,
    farmerId: 1,
    farmerName: "Ramesh Patel",
    farmerLocation: "Nashik, Maharashtra",
    title: "Salem Organic Turmeric Powder (High Curcumin)",
    category: "Spices",
    farmingType: "ORGANIC",
    price: 240,
    unit: "KG",
    stock: 320,
    harvestDate: "2026-09-18",
    rating: 5.0,
    reviewCount: 64,
    image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600&auto=format&fit=crop&q=80",
    description: "Sun-dried farm turmeric roots grounded with high 5.2% curcumin retention. Zero adulteration, certified pesticide-free laboratory tested."
  },
  {
    id: 104,
    farmerId: 3,
    farmerName: "Balvinder Singh",
    farmerLocation: "Ludhiana, Punjab",
    title: "Traditional Basmati 1121 Extra Long Rice",
    category: "Grains",
    farmingType: "CONVENTIONAL",
    price: 110,
    unit: "KG",
    stock: 2200,
    harvestDate: "2026-10-05",
    rating: 4.7,
    reviewCount: 45,
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&auto=format&fit=crop&q=80",
    description: "Aged 1121 aromatic basmati grain. Retains 2x length on cooking with non-sticky fluffiness and distinct Himalayan aroma."
  },
  {
    id: 105,
    farmerId: 1,
    farmerName: "Ramesh Patel",
    farmerLocation: "Nashik, Maharashtra",
    title: "Organic Red Onions (Export Quality)",
    category: "Vegetables",
    farmingType: "ORGANIC",
    price: 32,
    unit: "KG",
    stock: 1400,
    harvestDate: "2026-10-22",
    rating: 4.6,
    reviewCount: 29,
    image: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=600&auto=format&fit=crop&q=80",
    description: "Firm, pungent organic red onions with high dry skin layers ensuring longevity. Farm-fresh directly sorted in Nashik mandis."
  },
  {
    id: 106,
    farmerId: 3,
    farmerName: "Balvinder Singh",
    farmerLocation: "Ludhiana, Punjab",
    title: "Farm Fresh Desi Mustard Seeds (Sarson)",
    category: "Oilseeds",
    farmingType: "CONVENTIONAL",
    price: 85,
    unit: "KG",
    stock: 900,
    harvestDate: "2026-09-30",
    rating: 4.8,
    reviewCount: 19,
    image: "https://images.unsplash.com/photo-1509358271058-acd22cc93898?w=600&auto=format&fit=crop&q=80",
    description: "Cold-press ready high pungent mustard seeds with high natural oil content. Ideal for authentic mustard oil extraction or tempering."
  }
];

export const initialOrders = [
  {
    id: "ORD-9021",
    customerId: 4,
    customerName: "Pooja Sharma",
    customerPhone: "+91 99887 76655",
    farmerId: 1,
    farmerName: "Ramesh Patel",
    totalAmount: 1125,
    items: [
      { productId: 101, title: "100% Certified Organic Fresh Tomatoes", price: 45, quantity: 15, unit: "KG" },
      { productId: 103, title: "Salem Organic Turmeric Powder", price: 240, quantity: 1, unit: "KG" },
      { productId: 105, title: "Organic Red Onions", price: 32, quantity: 6.5, unit: "KG" }
    ],
    status: "DISPATCHED",
    shippingAddress: "B-402, Green Meadows, Andheri West, Mumbai 400053",
    placedAt: "2026-10-29 09:30 AM",
    trackingTimeline: [
      { stage: "PLACED", time: "2026-10-29 09:30 AM", note: "Order placed by customer" },
      { stage: "CONFIRMED", time: "2026-10-29 11:15 AM", note: "Farmer confirmed harvest availability" },
      { stage: "DISPATCHED", time: "2026-10-30 08:00 AM", note: "Dispatched via Krishi Express Van (MH-15-AB-4300)" }
    ]
  },
  {
    id: "ORD-8944",
    customerId: 4,
    customerName: "Pooja Sharma",
    customerPhone: "+91 99887 76655",
    farmerId: 3,
    farmerName: "Balvinder Singh",
    totalAmount: 2200,
    items: [
      { productId: 104, title: "Traditional Basmati 1121 Extra Long Rice", price: 110, quantity: 20, unit: "KG" }
    ],
    status: "DELIVERED",
    shippingAddress: "B-402, Green Meadows, Andheri West, Mumbai 400053",
    placedAt: "2026-10-20 04:10 PM",
    trackingTimeline: [
      { stage: "PLACED", time: "2026-10-20 04:10 PM", note: "Order confirmed" },
      { stage: "CONFIRMED", time: "2026-10-20 06:00 PM", note: "Grains packed in jute bags" },
      { stage: "DISPATCHED", time: "2026-10-21 10:00 AM", note: "Dispatched via North-South Logistics" },
      { stage: "DELIVERED", time: "2026-10-24 02:40 PM", note: "Received and signed by Pooja Sharma" }
    ]
  }
];

export const initialCommunityPosts = [
  {
    id: 201,
    authorName: "Suresh Kumar",
    authorRole: "FARMER",
    authorLocation: "Guntur, Andhra Pradesh",
    crop: "Chilli / Mirchi",
    title: "Severe Leaf Curling & Yellow Mottling on 45-day old Chilli crop. Need urgent advice!",
    content: "My 3-acre chilli crop in Guntur has suddenly shown upward leaf curling and stunted shoot growth in the last 4 days. Is this Gemini Virus or Whitefly infestation? What bio or chemical spray is recommended?",
    postType: "DISEASE_DIAGNOSIS",
    image: "https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?w=700&auto=format&fit=crop&q=80",
    likes: 14,
    createdAt: "2026-10-30 11:20 AM",
    replies: [
      {
        id: 301,
        authorName: "Dr. K. N. Rao (Agronomist)",
        isExpert: true,
        text: "This is typical Chilli Leaf Curl Virus transmitted primarily by whiteflies (Bemisia tabaci). Immediately set up yellow sticky traps (15 per acre). Spray Diafenthiuron 50% WP @ 1.25g/L or Bio-formulation of Neem Seed Kernel Extract (NSKE 5%) during early mornings.",
        createdAt: "2026-10-30 01:15 PM"
      },
      {
        id: 302,
        authorName: "Ramesh Patel",
        isExpert: false,
        text: "Brother Suresh, I faced this in Nashik last season. Along with spray, please stop excess nitrogenous urea fertilizing for 2 weeks, as tender growth attracts more sucking pests.",
        createdAt: "2026-10-30 02:30 PM"
      }
    ]
  },
  {
    id: 202,
    authorName: "Balvinder Singh",
    authorRole: "FARMER",
    authorLocation: "Ludhiana, Punjab",
    crop: "Wheat",
    title: "Best organic preventive measures against Yellow Rust before North-West winter fog sets in?",
    content: "We are preparing for November wheat sowing. Looking for natural seed treatment and preventive bio-fungicides to safeguard HD-2967 and DBW-187 from Stripe Rust.",
    postType: "PESTICIDE_GUIDANCE",
    image: null,
    likes: 22,
    createdAt: "2026-10-28 08:45 AM",
    replies: [
      {
        id: 303,
        authorName: "Dr. Vikram Seth (Admin/Agronomist)",
        isExpert: true,
        text: "Perform seed treatment with Trichoderma viride @ 4g/kg seed. Avoid overly dense spacing. For early prophylactic spray, 5% fermented butter milk (Khatta Chhach) mixed with copper vessel water works well against rust spores.",
        createdAt: "2026-10-28 10:10 AM"
      }
    ]
  }
];

export const cropAdvisoryDatabase = [
  {
    id: "guide-1",
    crop: "Tomato & Solanaceous",
    disease: "Early Blight & Late Blight (Alternaria / Phytophthora)",
    symptoms: "Concentric brown-black circular rings (bull's eye pattern) on lower leaves, spreading upward during damp conditions.",
    organicRemedy: "Spray Cow Urine + Fermented Butter Milk (1:10 dilution with water) every 10 days. Apply Copper Oxychloride 50% WP @ 2.5g/L if condition worsens.",
    chemicalRemedy: "Mancozeb 75% WP @ 2g/L or Azoxystrobin 23% SC @ 1ml/L.",
    preventiveTips: "Mulch with straw to avoid soil splash on lower leaves. Ensure drip irrigation instead of sprinkler."
  },
  {
    id: "guide-2",
    crop: "Paddy / Rice",
    disease: "Blast Disease (Magnaporthe oryzae)",
    symptoms: "Spindle-shaped lesions with greyish center and brownish borders on leaf blades and neck node.",
    organicRemedy: "Seed treatment with Pseudomonas fluorescens @ 10g/kg of seed. Foliar spray of cow dung slurry filtrate (20%).",
    chemicalRemedy: "Tricyclazole 75% WP @ 0.6g/L or Isoprothiolane 40% EC @ 1.5ml/L at boot leaf stage.",
    preventiveTips: "Avoid split application of nitrogen in late stages. Maintain shallow water layer."
  },
  {
    id: "guide-3",
    crop: "Cotton",
    disease: "Bacterial Blight & Angular Leaf Spot (Xanthomonas)",
    symptoms: "Water-soaked angular lesions bounded by veins, dark brown vein blight.",
    organicRemedy: "Spray Agniastra or Dashparni Ark 30ml/10L water. Dusting with wood ash early morning.",
    chemicalRemedy: "Copper Oxychloride (0.2%) + Streptocycline (100 ppm) spray.",
    preventiveTips: "Destruction of crop residues and deep summer ploughing."
  },
  {
    id: "guide-4",
    crop: "General Vegetables",
    disease: "Aphids, Thrips, and Whiteflies (Sucking Pest Complex)",
    symptoms: "Leaf curling, honey dew secretion, sooty mold appearance, premature dropping.",
    organicRemedy: "Cold-pressed Neem Oil 10,000 PPM @ 3ml/L with mild soap water. Yellow and blue sticky traps (20/acre).",
    chemicalRemedy: "Imidacloprid 17.8% SL @ 0.5ml/L or Acetamiprid 20% SP @ 0.4g/L.",
    preventiveTips: "Plant border barrier crops of Maize or Marigold around vegetable plots."
  }
];

export const initialMessages = [
  {
    id: 1,
    senderId: 4,
    senderName: "Pooja Sharma",
    receiverId: 1,
    receiverName: "Ramesh Patel",
    text: "Namaste Ramesh ji! Can I get 50kg organic tomatoes delivered by Thursday for a family event?",
    timestamp: "10:14 AM",
    isMe: false
  },
  {
    id: 2,
    senderId: 1,
    senderName: "Ramesh Patel",
    receiverId: 4,
    receiverName: "Pooja Sharma",
    text: "Namaste Pooja ji. Yes, I have fresh harvest coming up on Wednesday morning. I can dispatch directly via refrigerated van.",
    timestamp: "10:20 AM",
    isMe: true
  },
  {
    id: 3,
    senderId: 4,
    senderName: "Pooja Sharma",
    receiverId: 1,
    receiverName: "Ramesh Patel",
    text: "That is wonderful! I am placing the order through the marketplace right now.",
    timestamp: "10:25 AM",
    isMe: false
  }
];

