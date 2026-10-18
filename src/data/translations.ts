import { Language } from '../types';

export interface Translations {
  nav: {
    home: string;
    products: string;
    about: string;
    contact: string;
    enquireWhatsApp: string;
    basket: string;
  };
  hero: {
    title: string;
    ctaProducts: string;
    ctaWhatsApp: string;
    highlightPurity: string;
    highlightSunDried: string;
    highlightDelivery: string;
    viewDetails: string;
  };
  productsSection: {
    title: string;
    categoryAll: string;
    categoryMoong: string;
    categoryUdad: string;
    categorySpeciality: string;
    categoryKhichiya: string;
    selectPack: string;
    enquireNow: string;
    orderNow: string;
    addToEnquiry: string;
    addedToEnquiry: string;
    bestSellerBadge: string;
    ingredientsTitle: string;
    shelfLifeLabel: string;
    prepRoast: string;
    prepFry: string;
    prepAirFry: string;
  };
  qualitySection: {
    title: string;
    fact1Title: string;
    fact1Desc: string;
    fact2Title: string;
    fact2Desc: string;
    fact3Title: string;
    fact3Desc: string;
    fact4Title: string;
    fact4Desc: string;
  };
  storySection: {
    title: string;
    paragraph1: string;
    paragraph2: string;
    ctaReadMore: string;
  };
  deliverySection: {
    title: string;
    deliveryTimeLabel: string;
    wholesaleBadge: string;
    panIndiaNote: string;
    checkCityPrompt: string;
  };
  faqSection: {
    title: string;
    faqs: Array<{ question: string; answer: string }>;
  };
  ctaSection: {
    title: string;
    buttonText: string;
    directCallText: string;
    businessHoursText: string;
  };
  aboutPage: {
    title: string;
    traditionHeading: string;
    traditionText: string;
    ingredientsHeading: string;
    ingredientsText: string;
    processHeading: string;
    processText: string;
    hygieneHeading: string;
    hygieneText: string;
  };
  contactPage: {
    title: string;
    addressHeading: string;
    phoneHeading: string;
    whatsappHeading: string;
    emailHeading: string;
    hoursHeading: string;
    wholesaleHeading: string;
    wholesaleText: string;
    formProductLabel: string;
    formPackLabel: string;
    formCityLabel: string;
    formTypeLabel: string;
    formSendWhatsApp: string;
    typeRetail: string;
    typeWholesale: string;
  };
  basket: {
    title: string;
    emptyText: string;
    customerType: string;
    retail: string;
    wholesale: string;
    enterCityPlaceholder: string;
    customNotePlaceholder: string;
    sendEnquiryWhatsApp: string;
    clearBasket: string;
    totalItems: string;
  };
  footer: {
    legalName: string;
    fssaiLicense: string;
    copyright: string;
    seoDisclaimer: string;
    seoToolsLink: string;
  };
}

export const TRANSLATIONS: Record<Language, Translations> = {
  en: {
    nav: {
      home: 'Home',
      products: 'Products',
      about: 'About',
      contact: 'Contact',
      enquireWhatsApp: 'Order now',
      basket: 'Enquiry List',
    },
    hero: {
      title: 'Gujarati Papad in Rajkot, Ahmedabad & Gujarat',
      ctaProducts: 'View Products',
      ctaWhatsApp: 'Order now',
      highlightPurity: '100% Pure Moong & Udad Dal',
      highlightSunDried: 'Natural Sun-Drying Process',
      highlightDelivery: 'Fast Delivery Across India',
      viewDetails: 'View Details',
    },
    productsSection: {
      title: 'Our Papad',
      categoryAll: 'All Varieties',
      categoryMoong: 'Moong Dal',
      categoryUdad: 'Udad Dal',
      categorySpeciality: 'Garlic & Masala',
      categoryKhichiya: 'Rice Khichiya',
      selectPack: 'Pack Size',
      enquireNow: 'Order Now',
      orderNow: 'Order now',
      addToEnquiry: 'Add to Enquiry',
      addedToEnquiry: 'Added',
      bestSellerBadge: 'Popular Choice',
      ingredientsTitle: 'Ingredients',
      shelfLifeLabel: 'Shelf Life: 12 Months',
      prepRoast: 'Roast on Flame',
      prepFry: 'Deep Fry',
      prepAirFry: 'Air Fry / Microwave',
    },
    qualitySection: {
      title: 'Why Sakshi Pradip Papad',
      fact1Title: 'Pure Desi Dal Selection',
      fact1Desc: 'We grind select high-protein yellow moong and whole udad lentils with zero adulteration or filler flours.',
      fact2Title: 'Authentic Hand-Rolled Dough',
      fact2Desc: 'Kneaded with cold-pressed groundnut oil and balanced with traditional papad khar for airy blisters.',
      fact3Title: 'Gujarat Sun-Drying',
      fact3Desc: 'Dried under natural Saurashtra sunshine to lock in crispness without artificial oven dehydration.',
      fact4Title: 'Hygienic Moisture-Lock Packs',
      fact4Desc: 'Sealed in food-grade multilayer pouches to maintain crunch and freshness for up to 12 months.',
    },
    storySection: {
      title: 'Our Story',
      paragraph1: 'Rooted in Gujarat, Sakshi Pradip Papad was founded with one clear commitment: preserving the true, uncompromised taste of Kathiyawadi and Gujarati home-style papads.',
      paragraph2: 'Every batch honours time-tested recipes passed down through generations. From daily family meals to grand festive banquets, our papads bring the crisp warmth of traditional cooking to dining tables across India.',
      ctaReadMore: 'Read Full Story',
    },
    deliverySection: {
      title: 'Papad in Rajkot, Ahmedabad and across Gujarat',
      deliveryTimeLabel: 'Estimated Delivery',
      wholesaleBadge: 'Bulk & Wholesale Available',
      panIndiaNote: 'All-India express courier and freight shipping available for retail orders and wholesale merchant cartons.',
      checkCityPrompt: 'Select your city for estimated delivery timeline and local supply availability.',
    },
    faqSection: {
      title: 'Frequently Asked Questions',
      faqs: [
        {
          question: 'What types of papad does Sakshi Pradip Papad make?',
          answer: 'We manufacture authentic Moong Mari Papad, Udad Jeera Papad, Kathiyawadi Lasaniya Garlic Papad, Sindhi Masala Papad, and Traditional Rice Khichiya.',
        },
        {
          question: 'Do you deliver outside Rajkot and Ahmedabad?',
          answer: 'Yes. We deliver across Gujarat (Surat, Vadodara, Bhavnagar, Jamnagar, Kutch) and supply nationwide across India via trusted express courier and transport services.',
        },
        {
          question: 'Can I purchase in bulk or wholesale for shops and catering?',
          answer: 'Yes, we supply 5 kg and 10 kg bulk corrugated master cartons for retail grocery stores, caterers, hotels, and dealers with special wholesale terms.',
        },
        {
          question: 'What is the shelf life and storage recommendation?',
          answer: 'Our papads have a shelf life of 12 months from the packaging date. Keep them in an airtight container in a dry, cool place away from moisture.',
        },
        {
          question: 'Are artificial colours, chemical preservatives, or fillers added?',
          answer: 'No. We use only 100% natural dal flour, whole spices, rock salt, edible vegetable oil, and traditional papad khar.',
        },
        {
          question: 'How do I place an order?',
          answer: 'Tap "Order now" on any product or use our Enquiry List to send your item requirements, quantities, and delivery city directly to our WhatsApp.',
        },
      ],
    },
    ctaSection: {
      title: 'Place an Enquiry',
      buttonText: 'Chat on WhatsApp',
      directCallText: 'Direct Call Support: +91 98250 12345',
      businessHoursText: 'Monday to Saturday · 9:00 AM to 8:00 PM IST',
    },
    aboutPage: {
      title: 'About Sakshi Pradip Papad',
      traditionHeading: 'Rooted in Gujarati Culinary Heritage',
      traditionText: 'Sakshi Pradip Papad represents the honest tradition of Kathiyawadi kitchen mastery. Our focus is preserving authentic dal aromas and the signature blistered crunch that defines genuine Gujarati meals.',
      ingredientsHeading: 'Clean & Sourced Ingredients',
      ingredientsText: 'We procure premier grade yellow moong dal and black udad dal directly from trusted agricultural markets. Whole Malabar black peppercorns and unadulterated cumin seeds are freshly cracked in-house for every batch.',
      processHeading: 'Traditional Sun-Drying Craft',
      processText: 'Unlike industrial hot-air dried industrial alternatives, our papads undergo controlled natural sun-drying under the clear skies of Gujarat, giving them uniform expansion upon roasting.',
      hygieneHeading: 'FSSAI Standards & Food Safety',
      hygieneText: 'Prepared in a clean, sanitized facility following strict personal hygiene and food safety guidelines. Each pouch is weighed and sealed in barrier films to prevent moisture entry.',
    },
    contactPage: {
      title: 'Contact Sakshi Pradip Papad',
      addressHeading: 'Business Location',
      phoneHeading: 'Phone Support',
      whatsappHeading: 'WhatsApp Order Desk',
      emailHeading: 'Email Enquiry',
      hoursHeading: 'Operating Hours',
      wholesaleHeading: 'Wholesale & Retail Enquiries',
      wholesaleText: 'We welcome inquiries from retail families, grocery distributors, caterers, and food service partners across India.',
      formProductLabel: 'Select Product',
      formPackLabel: 'Pack Size',
      formCityLabel: 'Your City / Town',
      formTypeLabel: 'Enquiry Type',
      formSendWhatsApp: 'Send Enquiry via WhatsApp',
      typeRetail: 'Retail (Home Consumption)',
      typeWholesale: 'Wholesale (Shop / Catering / Bulk)',
    },
    basket: {
      title: 'Enquiry Basket',
      emptyText: 'Your enquiry basket is empty. Browse our products and tap "Add to Enquiry".',
      customerType: 'Order Intent',
      retail: 'Retail Household',
      wholesale: 'Wholesale / Bulk',
      enterCityPlaceholder: 'Your City (e.g. Rajkot, Ahmedabad, Mumbai)',
      customNotePlaceholder: 'Any specific requests or requirements (optional)...',
      sendEnquiryWhatsApp: 'Send Compiled Enquiry on WhatsApp',
      clearBasket: 'Clear List',
      totalItems: 'Total Varieties Selected',
    },
    footer: {
      legalName: 'Sakshi Pradip Papad',
      fssaiLicense: 'FSSAI Lic. No. 10721026000123 (Food Safety & Standards Authority of India)',
      copyright: 'All Rights Reserved. Handcrafted in Gujarat, India.',
      seoDisclaimer: 'Targeted Pan-India delivery with local hubs in Rajkot & Ahmedabad.',
      seoToolsLink: 'SEO / GEO / Schema Inspector',
    },
  },
  gu: {
    nav: {
      home: 'હોમ',
      products: 'પ્રોડક્ટ્સ',
      about: 'અમારા વિશે',
      contact: 'સંપર્ક',
      enquireWhatsApp: 'ઓર્ડર કરો',
      basket: 'પૂછપરછ લિસ્ટ',
    },
    hero: {
      title: 'રાજકોટ, અમદાવાદ અને સમગ્ર ગુજરાતમાં અસલી સ્વાદિષ્ટ પાપડ',
      ctaProducts: 'પ્રોડક્ટ્સ જુઓ',
      ctaWhatsApp: 'હમણાં ઓર્ડર કરો',
      highlightPurity: '૧૦૦% શુદ્ધ મગ અને અડદ દાળ',
      highlightSunDried: 'કુદરતી સૂર્યપ્રકાશમાં સુકવેલા',
      highlightDelivery: 'સમગ્ર ભારતમાં ઝડપી ડિલિવરી',
      viewDetails: 'વિગત જુઓ',
    },
    productsSection: {
      title: 'અમારા પાપડ',
      categoryAll: 'બધી વેરાયટી',
      categoryMoong: 'મગ દાળ પાપડ',
      categoryUdad: 'અડદ દાળ પાપડ',
      categorySpeciality: 'લસણીયા અને મસાલા',
      categoryKhichiya: 'ચોખાના ખીચિયા',
      selectPack: 'પેક સાઈઝ',
      enquireNow: 'ઓર્ડર કરો',
      orderNow: 'ઓર્ડર કરો',
      addToEnquiry: 'લિસ્ટમાં ઉમેરો',
      addedToEnquiry: 'ઉમેરાઈ ગયું',
      bestSellerBadge: 'લોકપ્રિય પસંદગી',
      ingredientsTitle: 'સામગ્રી',
      shelfLifeLabel: 'શેલ્ફ લાઇફ: ૧૨ મહિના',
      prepRoast: 'ગેસ પર શેકો',
      prepFry: 'તેલમાં તળો',
      prepAirFry: 'એર ફ્રાય / માઇક્રોવેવ',
    },
    qualitySection: {
      title: 'શા માટે સાક્ષી પ્રદીપ પાપડ?',
      fact1Title: 'શુદ્ધ દેશી દાળની પસંદગી',
      fact1Desc: 'અમે ઉત્તમ કક્ષાની પીળી મગ દાળ અને અડદ દાળ વાપરીએ છીએ, જેમાં કોઈ પણ જાતની ભેળસેળ કરવામાં આવતી નથી.',
      fact2Title: 'હાથેથી વણેલા પરંપરાગત પાપડ',
      fact2Desc: 'શુદ્ધ સીંગતેલ અને પરંપરાગત પાપડખારના યોગ્ય માપ સાથે કણક બાંધીને પાતળા પાપડ વણવામાં આવે છે.',
      fact3Title: 'સૌરાષ્ટ્રના તડકામાં સુકવણી',
      fact3Desc: 'કોઈપણ કૃત્રિમ ડ્રાયર મશીન વગર, શુદ્ધ કુદરતી સૂર્યપ્રકાશમાં સુકવીને સાચો સ્વાદ અને ક્રંચ મેળવવામાં આવે છે.',
      fact4Title: 'હાઈજીનિક મોઇશ્ચર-પ્રૂફ પેકિંગ',
      fact4Desc: 'ફૂડ-ગ્રેડ પાઉચ પેકિંગ જેથી પાપડ ૧૨ મહિના સુધી ક્રિસ્પી અને તાજા રહે.',
    },
    storySection: {
      title: 'અમારી સફર',
      paragraph1: 'ગુજરાતની પવિત્ર ધરતી અને કાઠિયાવાડી રસોઈ પરંપરામાંથી પ્રેરિત થઈને સાક્ષી પ્રદીપ પાપડની શરૂઆત કરવામાં આવી.',
      paragraph2: 'દરેક ઘરમાં જમતી વખતે પાપડનો સ્વાદ ભોજનને પૂર્ણ બનાવે છે. અમે પરંપરાગત મસાલા અને ચોખ્ખી દાળથી દરેક ઘરમાં અસલી સ્વાદ પહોંચાડીએ છીએ.',
      ctaReadMore: 'સંપૂર્ણ માહિતી વાંચો',
    },
    deliverySection: {
      title: 'રાજકોટ, અમદાવાદ અને સમગ્ર ગુજરાતમાં સપ્લાય',
      deliveryTimeLabel: 'અંદાજિત ડિલિવરી સમય',
      wholesaleBadge: 'જથ્થાબંધ હોલસેલ ઉપલબ્ધ',
      panIndiaNote: 'રાજકોટ, અમદાવાદ સહિત સમગ્ર ગુજરાત અને ઓલ ઇન્ડિયા કુરિયર તથા ટ્રાન્સપોર્ટ સુવિધા ઉપલબ્ધ છે.',
      checkCityPrompt: 'તમારા શહેરનો ડિલિવરી સમય જાણવા નીચે શહેર પસંદ કરો.',
    },
    faqSection: {
      title: 'વારંવાર પૂછાતા પ્રશ્નો',
      faqs: [
        {
          question: 'સાક્ષી પ્રદીપ પાપડ કઈ કઈ વેરાયટી બનાવે છે?',
          answer: 'અમે મગ મરી પાપડ, અડદ જીરું પાપડ, કાઠિયાવાડી લસણીયા પાપડ, સિંધિ મસાલા પાપડ અને ચોખાના ખીચિયા બનાવીએ છીએ.',
        },
        {
          question: 'શું રાજકોટ અને અમદાવાદ સિવાય ડિલિવરી મળે છે?',
          answer: 'હા, અમે સુરત, વડોદરા, ભાવનગર, જામનગર તેમજ સમગ્ર ભારતમાં કુરિયર અને ટ્રાન્સપોર્ટ દ્વારા માલ મોકલીએ છીએ.',
        },
        {
          question: 'દુકાન કે કેટરર્સ માટે જથ્થાબંધ (હોલસેલ) ઓર્ડર મળે?',
          answer: 'હા, ૫ કિલો અને ૧૦ કિલોના હોલસેલ બોક્સ ખાસ વેપારી ભાવે ઉપલબ્ધ છે.',
        },
        {
          question: 'પાપડ કેટલા સમય સુધી સારા રહે છે?',
          answer: 'પેકિંગ તારીખથી ૧૨ મહિના સુધી પાપડ એકદમ તાજા અને ક્રિસ્પી રહે છે. હવાચુસ્ત ડબ્બામાં રાખવા.',
        },
        {
          question: 'શું આમાં કોઈ કેમિકલ કે પ્રિઝર્વેટિવ ઉમેરવામાં આવે છે?',
          answer: 'બિલકુલ નહીં. માત્ર ૧૦૦% કુદરતી દાળ, શુદ્ધ મસાલા, સિંધવ મીઠું અને શુદ્ધ તેલનો જ ઉપયોગ થાય છે.',
        },
        {
          question: 'ઓર્ડર કે પૂછપરછ કેવી રીતે કરવી?',
          answer: 'કોઈપણ પ્રોડક્ટ નીચે આપેલા "વોટ્સએપ પૂછપરછ" બટન પર ક્લિક કરીને આપ સીધો સંદેશ મોકલી શકો છો.',
        },
      ],
    },
    ctaSection: {
      title: 'પૂછપરછ મોકલો',
      buttonText: 'વોટ્સએપ પર વાતચીત કરો',
      directCallText: 'સીધો ફોન સંપર્ક: +91 98250 12345',
      businessHoursText: 'સોમવાર થી શનિવાર · સવારે ૯:૦૦ થી રાત્રે ૮:૦૦',
    },
    aboutPage: {
      title: 'સાક્ષી પ્રદીપ પાપડ વિશે',
      traditionHeading: 'ગુજરાતી સ્વાદની અસલી પરંપરા',
      traditionText: 'સાક્ષી પ્રદીપ પાપડ કાઠિયાવાડી સ્વાદ અને પરંપરાગત રીતરસમોને જીવંત રાખે છે. અમારું લક્ષ્ય છે કે દરેક ગુજરાતી થાળીમાં સાચો અને શુદ્ધ પાપડ પીરસાય.',
      ingredientsHeading: 'શુદ્ધ અને ગુણવત્તાયુક્ત સામગ્રી',
      ingredientsText: 'અમે માત્ર ઉચ્ચ કક્ષાની દાળ, તાજા કાળા મરી અને દેશી જીરું વાપરીએ છીએ. કોઈ પણ કૃત્રિમ રંગ કે ફિલર લોટ ઉમેરવામાં આવતો નથી.',
      processHeading: 'કુદરતી તડકામાં સુકવણી',
      processText: 'અમારા પાપડ સૌરાષ્ટ્રના ખુલ્લા તડકામાં ધીમે ધીમે સુકવાય છે, જેથી શેકતી વખતે પાપડ બરાબર ફૂલે છે અને ક્રિસ્પી બને છે.',
      hygieneHeading: 'FSSAI લાયસન્સ અને સ્વચ્છતા',
      hygieneText: 'સંપૂર્ણ સ્વચ્છ વાતાવરણમાં અને FSSAI નિયમો મુજબ પાપડ તૈયાર કરવામાં આવે છે અને હવાચુસ્ત પેકિંગમાં પેક થાય છે.',
    },
    contactPage: {
      title: 'સંપર્ક કરો - સાક્ષી પ્રદીપ પાપડ',
      addressHeading: 'સરનામું',
      phoneHeading: 'ફોન નંબર',
      whatsappHeading: 'વોટ્સએપ ઓર્ડર',
      emailHeading: 'ઈમેલ',
      hoursHeading: 'કામકાજના કલાકો',
      wholesaleHeading: 'જથ્થાબંધ અને રીટેલ પૂછપરછ',
      wholesaleText: 'ઘર વપરાશ તેમજ દુકાન, કેટરિંગ કે ડીલરશીપ માટે આપ સીધો સંપર્ક કરી શકો છો.',
      formProductLabel: 'પ્રોડક્ટ પસંદ કરો',
      formPackLabel: 'પેકિંગ સાઈઝ',
      formCityLabel: 'તમારું શહેર / ગામ',
      formTypeLabel: 'ઓર્ડર પ્રકાર',
      formSendWhatsApp: 'વોટ્સએપ પર મોકલો',
      typeRetail: 'ઘર વપરાશ (રીટેલ)',
      typeWholesale: 'વેપાર / હોલસેલ (મોટો ઓર્ડર)',
    },
    basket: {
      title: 'પૂછપરછ લિસ્ટ',
      emptyText: 'તમારું લિસ્ટ ખાલી છે. પ્રોડક્ટ્સ જોઈને "લિસ્ટમાં ઉમેરો" દબાવો.',
      customerType: 'ઓર્ડર હેતુ',
      retail: 'ઘર વપરાશ (રીટેલ)',
      wholesale: 'જથ્થાબંધ (હોલસેલ)',
      enterCityPlaceholder: 'તમારું શહેર (દા.ત. રાજકોટ, અમદાવાદ, સુરત)',
      customNotePlaceholder: 'કોઈ વિશેષ વિગત કે પ્રશ્ન હોય તો લખો...',
      sendEnquiryWhatsApp: 'વોટ્સએપ પર લિસ્ટ મોકલો',
      clearBasket: 'લિસ્ટ ખાલી કરો',
      totalItems: 'પસંદ કરેલ વેરાયટી',
    },
    footer: {
      legalName: 'સાક્ષી પ્રદીપ પાપડ',
      fssaiLicense: 'FSSAI Lic. No. 10721026000123 (ફૂડ સેફ્ટી સ્ટાન્ડર્ડ્સ ઓથોરિટી ઓફ ઈન્ડિયા)',
      copyright: 'સર્વાધિકાર સુરક્ષિત. ગુજરાત, ભારત.',
      seoDisclaimer: 'રાજકોટ, અમદાવાદ અને સમગ્ર ભારતમાં હોલસેલ તથા રીટેલ સપ્લાય.',
      seoToolsLink: 'SEO / GEO / સ્કીમા ઇન્સ્પેક્ટર',
    },
  },
  hi: {
    nav: {
      home: 'होम',
      products: 'उत्पाद',
      about: 'हमारे बारे में',
      contact: 'संपर्क',
      enquireWhatsApp: 'ऑर्डर करें',
      basket: 'पूछताछ सूची',
    },
    hero: {
      title: 'राजकोट, अहमदाबाद और संपूर्ण गुजरात का प्रामाणिक पापड़',
      ctaProducts: 'उत्पाद देखें',
      ctaWhatsApp: 'अभी ऑर्डर करें',
      highlightPurity: '१००% शुद्ध मूंग और उड़द दाल',
      highlightSunDried: 'प्राकृतिक धूप में सुखाए गए',
      highlightDelivery: 'अखिल भारतीय त्वरित डिलीवरी',
      viewDetails: 'विवरण देखें',
    },
    productsSection: {
      title: 'हमारे पापड़',
      categoryAll: 'सभी वैरायटी',
      categoryMoong: 'मूंग दाल पापड़',
      categoryUdad: 'उड़द दाल पापड़',
      categorySpeciality: 'लहसुन व मसाला',
      categoryKhichiya: 'चावल खीचिया',
      selectPack: 'पैक साइज',
      enquireNow: 'ऑर्डर करें',
      orderNow: 'ऑर्डर करें',
      addToEnquiry: 'सूची में जोड़ें',
      addedToEnquiry: 'जुड़ गया',
      bestSellerBadge: 'सबसे लोकप्रिय',
      ingredientsTitle: 'सामग्री',
      shelfLifeLabel: 'शेल्फ लाइफ: १२ महीने',
      prepRoast: 'आंच पर भूनें',
      prepFry: 'तेल में तलें',
      prepAirFry: 'एयर फ्राई / माइक्रोवेव',
    },
    qualitySection: {
      title: 'साक्षी प्रदीप पापड़ ही क्यों?',
      fact1Title: 'शुद्ध देसी दाल का चयन',
      fact1Desc: 'हम केवल उत्तम ग्रेड की पीली मूंग और उड़द दाल का उपयोग करते हैं, जिसमें किसी भी प्रकार की मिलावट नहीं होती।',
      fact2Title: 'हाथ से बेले गए पारंपरिक पापड़',
      fact2Desc: 'मूंगफली के तेल और पारंपरिक पापड़खार के सही संतुलन के साथ पतले और कुरकुरे पापड़ तैयार किए जाते हैं।',
      fact3Title: 'प्राकृतिक धूप में सुखाई',
      fact3Desc: 'बिना किसी कृत्रिम हीटर के, गुजरात की खुली धूप में सुखाकर स्वाभाविक खस्तापन सुनिश्चित किया जाता है।',
      fact4Title: 'हाइजीनिक नमी-रोधी पैकिंग',
      fact4Desc: 'फूड-ग्रेड पाउच पैकिंग ताकि पापड़ १२ महीने तक ताज़ा और कुरकुरा बना रहे।',
    },
    storySection: {
      title: 'हमारी कहानी',
      paragraph1: 'गुजरात की समृद्ध पाक परंपरा से प्रेरित होकर साक्षी प्रदीप पापड़ की शुरुआत घर जैसा शुद्ध स्वाद देने के उद्देश्य से की गई।',
      paragraph2: 'पारंपरिक मसालों और शुद्ध दालों से तैयार हमारे पापड़ हर भोजन को संपूर्ण और स्वादिष्ट बनाते हैं। हम पूरे भारत में परिवारों और थोक व्यापारियों को सीधे आपूर्ति करते हैं।',
      ctaReadMore: 'पूरी कहानी पढ़ें',
    },
    deliverySection: {
      title: 'राजकोट, अहमदाबाद और पूरे गुजरात में आपूर्ति',
      deliveryTimeLabel: 'अनुमानित डिलीवरी समय',
      wholesaleBadge: 'थोक (होलसेल) उपलब्ध',
      panIndiaNote: 'राजकोट और अहमदाबाद सहित पूरे भारत में एक्सप्रेस कूरियर और ट्रांसपोर्ट से आपूर्ति उपलब्ध है।',
      checkCityPrompt: 'अपने शहर का डिलीवरी समय जानने के लिए नीचे शहर चुनें।',
    },
    faqSection: {
      title: 'अक्सर पूछे जाने वाले सवाल',
      faqs: [
        {
          question: 'साक्षी प्रदीप पापड़ किस प्रकार के पापड़ बनाता है?',
          answer: 'हम मूंग काली मिर्च पापड़, उड़द जीरा पापड़, काठियावाड़ी लसणिया पापड़, सिंधी मसाला पापड़ और चावल का खीचिया बनाते हैं।',
        },
        {
          question: 'क्या राजकोट और अहमदाबाद के बाहर डिलीवरी उपलब्ध है?',
          answer: 'हां, हम गुजरात के सभी शहरों तथा पूरे भारत में कूरियर और ट्रांसपोर्ट से सुरक्षित आपूर्ति करते हैं।',
        },
        {
          question: 'क्या दुकानों और कैटरर्स के लिए थोक में ऑर्डर मिल सकता है?',
          answer: 'हां, 5 किलो और 10 किलो के थोक बॉक्स विशेष व्यापारी दरों पर उपलब्ध हैं।',
        },
        {
          question: 'पापड़ कितने समय तक सुरक्षित रहते हैं?',
          answer: 'पैकिंग की तारीख से 12 महीने तक। इन्हें हवा-बंद डिब्बे में सूखी जगह पर रखें।',
        },
        {
          question: 'क्या इसमें कोई केमिकल या कृत्रिम रंग है?',
          answer: 'बिल्कुल नहीं। यह 100% प्राकृतिक दाल, साबुत मसाले और खाद्य तेल से निर्मित है।',
        },
        {
          question: 'ऑर्डर या पूछताछ कैसे करें?',
          answer: 'किसी भी उत्पाद के नीचे "व्हाट्सएप पूछताछ" बटन पर क्लिक करके सीधे व्हाट्सएप पर संपर्क करें।',
        },
      ],
    },
    ctaSection: {
      title: 'पूछताछ भेजें',
      buttonText: 'व्हाट्सएप पर चैट करें',
      directCallText: 'सीधा फोन संपर्क: +91 98250 12345',
      businessHoursText: 'सोमवार से शनिवार · सुबह 9:00 से रात 8:00',
    },
    aboutPage: {
      title: 'साक्षी प्रदीप पापड़ के बारे में',
      traditionHeading: 'गुजराती स्वाद की समृद्ध विरासत',
      traditionText: 'साक्षी प्रदीप पापड़ पारंपरिक काठियावाड़ी स्वाद और शुद्धता का प्रतीक है। हमारा उद्देश्य हर घर में स्वादिष्ट और स्वस्थ पापड़ पहुंचाना है।',
      ingredientsHeading: 'शुद्ध सामग्री का चयन',
      ingredientsText: 'हम बिना पॉलिश वाली शुद्ध दालें, ताजी काली मिर्च और भुना जीरा प्रयोग करते हैं।',
      processHeading: 'पारंपरिक धूप में सुखाने की विधि',
      processText: 'धूप में सुखाने से पापड़ सिकने पर बहुत हल्का और खस्ता बनता है।',
      hygieneHeading: 'FSSAI मानक और स्वच्छता',
      hygieneText: 'पूर्णतः स्वच्छ वातावरण में FSSAI दिशा-निर्देशों के अनुरूप निर्माण और सुरक्षित सीलिंग।',
    },
    contactPage: {
      title: 'संपर्क करें - साक्षी प्रदीप पापड़',
      addressHeading: 'व्यावसायिक पता',
      phoneHeading: 'फोन नंबर',
      whatsappHeading: 'व्हाट्सएप पूछताछ',
      emailHeading: 'ईमेल',
      hoursHeading: 'कार्य समय',
      wholesaleHeading: 'थोक व खुदरा पूछताछ',
      wholesaleText: 'घर के उपयोग या दुकान/कैटरिंग के लिए सीधे संपर्क करें।',
      formProductLabel: 'उत्पाद चुनें',
      formPackLabel: 'पैकिंग साइज',
      formCityLabel: 'आपका शहर / कस्बा',
      formTypeLabel: 'पूछताछ का प्रकार',
      formSendWhatsApp: 'व्हाટ્સएप पर भेजें',
      typeRetail: 'खुदरा (घर के लिए)',
      typeWholesale: 'थोक (दुकान / कैटरिंग)',
    },
    basket: {
      title: 'पूछताछ सूची',
      emptyText: 'आपकी सूची खाली है। उत्पादों में से "सूची में जोड़ें" पर क्लिक करें।',
      customerType: 'ऑर्डर का प्रकार',
      retail: 'खुदरा (घर के लिए)',
      wholesale: 'थोक / बल्क',
      enterCityPlaceholder: 'आपका शहर (जैसे राजकोट, अहमदाबाद, दिल्ली)',
      customNotePlaceholder: 'कोई विशेष आवश्यकता या प्रश्न (वैकल्पिक)...',
      sendEnquiryWhatsApp: 'व्हाट्सएप पर सूची भेजें',
      clearBasket: 'सूची खाली करें',
      totalItems: 'चुनी गई वैरायटी',
    },
    footer: {
      legalName: 'साक्षी प्रदीप पापड़',
      fssaiLicense: 'FSSAI Lic. No. 10721026000123 (भारतीय खाद्य सुरक्षा और मानक प्राधिकरण)',
      copyright: 'सर्वाधिकार सुरक्षित। गुजरात, भारत।',
      seoDisclaimer: 'राजकोट, अहमदाबाद और संपूर्ण भारत में थोक एवं खुदरा आपूर्ति।',
      seoToolsLink: 'SEO / GEO / स्कीमा विश्लेषक',
    },
  },
};
