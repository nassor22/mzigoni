export const translations = {
  en: {
    // Common
    welcome: 'Welcome',
    back: 'Back',
    next: 'Next',
    cancel: 'Cancel',
    confirm: 'Confirm',
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    
    // Navigation
    home: 'Home',
    dashboard: 'Dashboard',
    profile: 'Profile',
    settings: 'Settings',
    logout: 'Logout',
    
    // Auth
    login: 'Login',
    signup: 'Sign Up',
    email: 'Email',
    password: 'Password',
    phone: 'Phone Number',
    fullName: 'Full Name',
    
    // Roles
    client: 'Client',
    driver: 'Driver',
    selectRole: 'Select Your Role',
    
    // Client
    sendCargo: 'Send Cargo',
    newBooking: 'New Booking',
    trackDelivery: 'Track Delivery',
    tripHistory: 'Trip History',
    
    // Driver
    goOnline: 'Go Online',
    goOffline: 'Go Offline',
    acceptTrip: 'Accept Trip',
    startTrip: 'Start Trip',
    completeTrip: 'Complete Trip',
    
    // Booking
    cargoType: 'Cargo Type',
    pickupLocation: 'Pickup Location',
    deliveryLocation: 'Delivery Location',
    currentLocation: 'Current Location',
    
    // Map
    searchLocation: 'Search for a location...',
    getCurrentLocation: 'Get Current Location',
    
    // Payment
    payment: 'Payment',
    totalAmount: 'Total Amount',
    paymentMethod: 'Payment Method',
    mobileMoney: 'Mobile Money',
    creditCard: 'Credit Card',
    cash: 'Cash',
    
    // Status
    pending: 'Pending',
    confirmed: 'Confirmed',
    inProgress: 'In Progress',
    completed: 'Completed',
    cancelled: 'Cancelled'
  },
  sw: {
    // Common
    welcome: 'Karibu',
    back: 'Rudi',
    next: 'Ifuatayo',
    cancel: 'Ghairi',
    confirm: 'Thibitisha',
    loading: 'Inapakia...',
    error: 'Hitilafu',
    success: 'Mafanikio',
    
    // Navigation
    home: 'Nyumbani',
    dashboard: 'Dashibodi',
    profile: 'Wasifu',
    settings: 'Mipangilio',
    logout: 'Toka',
    
    // Auth
    login: 'Ingia',
    signup: 'Jisajili',
    email: 'Barua Pepe',
    password: 'Nenosiri',
    phone: 'Nambari ya Simu',
    fullName: 'Jina Kamili',
    
    // Roles
    client: 'Mteja',
    driver: 'Dereva',
    selectRole: 'Chagua Jukumu Lako',
    
    // Client
    sendCargo: 'Tuma Mizigo',
    newBooking: 'Uhifadhi Mpya',
    trackDelivery: 'Fuatilia Uwasilishaji',
    tripHistory: 'Historia ya Safari',
    
    // Driver
    goOnline: 'Ingia Mtandaoni',
    goOffline: 'Toka Mtandaoni',
    acceptTrip: 'Kubali Safari',
    startTrip: 'Anza Safari',
    completeTrip: 'Maliza Safari',
    
    // Booking
    cargoType: 'Aina ya Mizigo',
    pickupLocation: 'Mahali pa Kuchukua',
    deliveryLocation: 'Mahali pa Kufikisha',
    currentLocation: 'Mahali Ulipo Sasa',
    
    // Map
    searchLocation: 'Tafuta mahali...',
    getCurrentLocation: 'Pata Mahali Ulipo',
    
    // Payment
    payment: 'Malipo',
    totalAmount: 'Jumla ya Kiasi',
    paymentMethod: 'Njia ya Malipo',
    mobileMoney: 'Pesa za Simu',
    creditCard: 'Kadi ya Mkopo',
    cash: 'Pesa Taslimu',
    
    // Status
    pending: 'Inasubiri',
    confirmed: 'Imethibitishwa',
    inProgress: 'Inaendelea',
    completed: 'Imekamilika',
    cancelled: 'Imeghairiwa'
  }
};

export type TranslationKey = keyof typeof translations.en;

export const getTranslation = (key: TranslationKey, language: 'en' | 'sw'): string => {
  return translations[language][key] || translations.en[key];
};