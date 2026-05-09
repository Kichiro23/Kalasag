export type Language = 'en' | 'fil';

export const content = {
  en: {
    // Navigation
    nav: {
      home: 'Home',
      getHelp: 'Get Help',
      selfExclusion: 'Self-Exclusion',
      resources: 'Resources',
      recoveryTools: 'Recovery Tools',
      families: 'For Families',
      about: 'About',
      contact: 'Contact',
      dashboard: 'Dashboard',
      login: 'Login',
      toggleTheme: 'Toggle theme',
      toggleLanguage: 'Toggle language',
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
    },
    // Footer
    footer: {
      tagline: 'Your Shield Against Gambling Harm',
      quickLinks: 'Quick Links',
      crisisHotline: 'Crisis Hotline',
      copyright: '© {year} Kalasag. All rights reserved.',
      privacy: 'Privacy Policy',
      terms: 'Terms of Use',
      filipinoOwned: 'Filipino-Owned',
      freeForever: 'Free Forever',
      noDataStored: 'No Data Stored',
      anonymous: '100% Anonymous',
    },
    // Crisis Widget
    crisis: {
      title: 'Crisis Support',
      subtitle: 'You are not alone. Help is available right now.',
      iNeedHelp: 'I Need Help Now',
      call: 'Call',
      chat: 'Chat',
      philippines: 'Philippines',
      international: 'International',
      pagcorHotline: 'PAGCOR Hotline',
      pagcorNumber: '(02) 8527-0995',
      dohHotline: 'DOH Mental Health',
      dohNumber: '1553',
      natashaFoundation: 'Natasha Goulbourn Foundation',
      natashaNumber: '(02) 804-4673',
      inTouchHotline: 'InTouch Crisis Line',
      inTouchNumber: '(02) 8893-7603',
      text: 'Text',
      smsNumber: '0917-800-1123',
      gamblersAnonymous: 'Gamblers Anonymous',
      gaNumber: '+1-626-960-3500',
      gamblingTherapy: 'Gambling Therapy',
      close: 'Close crisis support',
      open: 'Open crisis support',
    },
    // Homepage
    home: {
      hero: {
        eyebrow: 'Anonymous · Free · Filipino-Owned',
        title: 'Your Shield Against Gambling Harm',
        description: 'Kalasag is a safe, anonymous sanctuary for anyone affected by gambling. No judgment. No tracking. Just support when you need it most.',
        ctaPrimary: 'Get Help Now',
        ctaSecondary: 'Learn More',
        trust: ['100% Anonymous', 'No Data Stored', 'Free Forever', 'Filipino-Owned'],
      },
      crisisBand: {
        title: 'Need immediate help?',
        description: 'Crisis hotlines are available 24/7. You are not alone.',
        cta: 'View Crisis Resources',
      },
      features: {
        eyebrow: 'How Kalasag Helps',
        title: 'Tools for Every Step of Recovery',
        description: 'From crisis intervention to daily recovery tools, Kalasag provides everything you need — completely anonymously.',
        cards: [
          {
            title: 'Crisis Support',
            description: 'One-tap access to Philippine and international hotlines, 24/7.',
            icon: 'Heart',
          },
          {
            title: 'Self-Exclusion',
            description: 'Digital registry and step-by-step guides to block gambling sites and venues.',
            icon: 'Shield',
          },
          {
            title: 'Recovery Tools',
            description: 'Streak tracking, mood journals, and urge management techniques.',
            icon: 'Wind',
          },
          {
            title: 'Family Support',
            description: 'Guidance for loved ones on how to help without enabling.',
            icon: 'Users',
          },
          {
            title: 'Education',
            description: 'Understand gambling addiction, warning signs, and Filipino-specific contexts.',
            icon: 'BookOpen',
          },
          {
            title: 'Anonymous Community',
            description: 'Connect with others who understand — no names, no judgment.',
            icon: 'MessageCircle',
          },
        ],
      },
      assessment: {
        eyebrow: 'Self-Assessment',
        title: 'Is Gambling Affecting Your Life?',
        description: 'Take a quick, anonymous self-check to understand your relationship with gambling. No data is stored.',
        cta: 'Start Anonymous Check',
        questions: [
          'Have you ever felt the need to bet more and more money?',
          'Have you tried to cut back or stop gambling but couldn\'t?',
          'Do you feel restless or irritable when trying to reduce gambling?',
          'Has gambling ever caused problems in your relationships?',
          'Have you ever borrowed money or sold things to gamble?',
        ],
      },
      testimonials: {
        eyebrow: 'Real Stories',
        title: 'You Are Not Alone',
        description: 'Anonymous voices from people who have walked this path and found hope.',
        stories: [
          {
            quote: 'Kalasag gave me the courage to admit I needed help. The anonymous chat saved my life.',
            name: 'Miguel',
            detail: 'Recovering for 8 months',
          },
          {
            quote: 'As a wife, I didn\'t know how to help my husband. The family resources gave me clarity.',
            name: 'Anna',
            detail: 'Family member',
          },
          {
            quote: 'The self-exclusion tools helped me block online casinos I didn\'t even know I was signed up for.',
            name: 'Jayson',
            detail: 'Recovering for 1 year',
          },
        ],
      },
      stats: {
        eyebrow: 'Community',
        title: 'Thousands Finding Strength Together',
        description: 'Every number represents a person choosing hope over harm.',
        items: [
          { value: '12,000+', label: 'People Supported' },
          { value: '24/7', label: 'Crisis Access' },
          { value: '100%', label: 'Anonymous' },
          { value: '₱0', label: 'Cost Forever' },
        ],
      },
    },
    // Get Help
    getHelp: {
      hero: {
        eyebrow: 'Immediate Support',
        title: 'Get Help Right Now',
        description: 'If you or someone you love is in crisis, help is available immediately. These hotlines are free, confidential, and staffed by trained professionals.',
      },
      emergency: {
        title: 'I Need Help Right Now',
        description: 'If you are in immediate danger or feel overwhelmed, please reach out.',
        cta: 'Call Emergency Hotline',
      },
      philippines: {
        title: 'Philippines Hotlines',
        description: 'Local support tailored for Filipinos, available in Tagalog and English.',
      },
      international: {
        title: 'International Support',
        description: 'Global resources for Filipinos abroad and international visitors.',
      },
      supportGroups: {
        title: 'Find a Support Group',
        description: 'Connect with others in your area who understand what you\'re going through.',
        cta: 'View Support Groups',
      },
      counselors: {
        title: 'Professional Counselors',
        description: 'Access to licensed therapists who specialize in gambling addiction recovery.',
        cta: 'Find a Counselor',
      },
    },
    // Self-Exclusion
    selfExclusion: {
      hero: {
        eyebrow: 'Take Control',
        title: 'Self-Exclusion Tools',
        description: 'Remove yourself from gambling environments and protect your future. These tools are free, anonymous, and effective.',
      },
      registry: {
        title: 'Digital Self-Exclusion Registry',
        description: 'Register your anonymous ID to opt out of gambling platforms and physical venues in the Philippines.',
        cta: 'Register Anonymously',
        steps: ['Create anonymous ID', 'Select platforms to exclude', 'Confirm and activate'],
      },
      blocking: {
        title: 'Block Gambling Sites',
        description: 'Step-by-step guides to block online casinos, e-sabong, and betting apps on your devices.',
        cta: 'View Blocking Guides',
      },
      financial: {
        title: 'Financial Protection',
        description: 'Set spending limits, freeze accounts, and protect your finances from gambling harm.',
        tools: ['Spending Limits', 'Account Freezing', 'Transaction Blocks', 'Budget Planner'],
      },
    },
    // Resources
    resources: {
      hero: {
        eyebrow: 'Learn & Understand',
        title: 'Resources & Education',
        description: 'Knowledge is power. Understand gambling addiction, recognize warning signs, and find pathways to recovery — all in stigma-free language.',
      },
      understanding: {
        title: 'Understanding Gambling Addiction',
        description: 'Gambling addiction is not a moral failure — it is a behavioral condition that can affect anyone. Learn how it develops and how recovery works.',
      },
      warningSigns: {
        title: 'Warning Signs Checklist',
        description: 'Recognize the early signs in yourself or a loved one before things get worse.',
        signs: [
          'Spending more time or money than intended',
          'Hiding gambling activity from family',
          'Chasing losses with bigger bets',
          'Borrowing money to gamble',
          'Neglecting work, school, or relationships',
          'Feeling anxious or irritable when not gambling',
        ],
      },
      families: {
        title: 'Impact on Families',
        description: 'Gambling harm extends beyond the individual. Learn how families are affected and how healing happens together.',
      },
      financial: {
        title: 'Financial Recovery',
        description: 'Practical guides to rebuilding your finances after gambling harm — one step at a time.',
      },
      filipinoContext: {
        title: 'Filipino Context',
        description: 'Gambling is deeply woven into Filipino culture — from fiestas and sabong to e-sabong and online casinos. Understanding this context is key to recovery.',
        topics: ['Sabong & E-Sabong', 'Online Casinos', 'Perya & Fiesta Games', 'Family Pressure'],
      },
    },
    // Recovery Tools
    recoveryTools: {
      hero: {
        eyebrow: 'Daily Support',
        title: 'Recovery Tools',
        description: 'Practical, anonymous tools to support your recovery every single day. No gamification — just genuine support.',
      },
      streakTracker: {
        title: 'Streak Tracker',
        description: 'Track your gambling-free days as a personal milestone — not a competition.',
        cta: 'Track My Progress',
      },
      moodJournal: {
        title: 'Mood Journal',
        description: 'Record how you feel each day. Your entries are encrypted and stored locally — we never see them.',
        cta: 'Open Journal',
      },
      triggers: {
        title: 'Trigger Identification',
        description: 'Understand what drives your urges — stress, boredom, social pressure — and build strategies to manage them.',
        cta: 'Identify Triggers',
      },
      coping: {
        title: 'Coping Strategies',
        description: 'A library of techniques proven to reduce gambling urges: breathing exercises, distraction techniques, and more.',
        cta: 'Browse Strategies',
      },
      rideTheWave: {
        title: 'Ride the Wave',
        description: 'An urge lasts about 20 minutes. This tool guides you through that window with breathing, grounding, and distraction.',
        cta: 'Start Now',
      },
    },
    // Families
    families: {
      hero: {
        eyebrow: 'For Loved Ones',
        title: 'For Families & Friends',
        description: 'If someone you care about is struggling with gambling, you can help. Learn how to support them without enabling the behavior.',
      },
      howToHelp: {
        title: 'How to Help a Loved One',
        description: 'Practical, compassionate guidance on starting the conversation and supporting recovery.',
        tips: [
          'Listen without judgment or blame',
          'Encourage professional support',
          'Avoid giving money that could be gambled',
          'Take care of your own wellbeing too',
        ],
      },
      boundaries: {
        title: 'Setting Healthy Boundaries',
        description: 'Protect yourself and your family while still showing love and support.',
      },
      financial: {
        title: 'Financial Protection',
        description: 'Strategies to safeguard family finances while someone is in recovery.',
      },
      supportGroups: {
        title: 'Family Support Groups',
        description: 'Connect with other families who understand exactly what you are going through.',
        cta: 'Find a Group',
      },
    },
    // About
    about: {
      hero: {
        eyebrow: 'Our Mission',
        title: 'Why Kalasag Exists',
        description: 'Kalasag was built to fill a critical gap: anonymous, stigma-free support for gambling addiction in the Philippines and beyond.',
      },
      mission: {
        title: 'Our Mission',
        description: 'To provide accessible, anonymous, and culturally-aware support for anyone affected by gambling harm — completely free, forever.',
      },
      story: {
        title: 'The Developer Story',
        description: 'Kalasag was created by Rommel Andrei De Leon, a full-stack developer from Malolos, Bulacan who believes technology should protect the vulnerable. Every feature was designed with one question: "Would this help someone at their lowest moment feel safe?"',
        name: 'Rommel Andrei De Leon',
        role: 'Founder & Developer',
      },
      partners: {
        title: 'Partners & Affiliations',
        description: 'We collaborate with mental health organizations, advocacy groups, and recovery communities to ensure our resources are accurate and effective.',
      },
      nonprofit: {
        title: 'Non-Profit Stance',
        description: 'Kalasag is a non-profit initiative. We do not sell data, display ads, or charge for any feature. Our only goal is to reduce gambling harm.',
      },
    },
    // Contact
    contact: {
      hero: {
        eyebrow: 'Reach Out',
        title: 'Contact & Feedback',
        description: 'Have feedback, want to volunteer, or need to report a bug? We read every message. All submissions are anonymous by default.',
      },
      form: {
        title: 'Send a Message',
        description: 'No email required. No data stored. Just your message.',
        typeLabel: 'Message Type',
        types: ['Anonymous Feedback', 'Volunteer Inquiry', 'Partnership', 'Media Contact', 'Bug Report'],
        messageLabel: 'Your Message',
        messagePlaceholder: 'Tell us what is on your mind...',
        submit: 'Send Message',
        submitting: 'Sending...',
        success: 'Thank you. Your message has been sent.',
        honeypot: 'Leave this field empty',
      },
      developer: {
        title: 'Developer Contact',
        description: 'For direct inquiries about the platform, partnerships, or technical matters.',
        email: 'rommeld216@gmail.com',
        phone: '+63 962 790 5910',
        location: 'Malolos, Bulacan, Philippines',
      },
      social: {
        title: 'Connect',
        description: 'Follow Kalasag and the developer for updates, resources, and community stories.',
      },
    },
    // Common
    common: {
      readMore: 'Read More',
      learnMore: 'Learn More',
      getStarted: 'Get Started',
      back: 'Back',
      next: 'Next',
      submit: 'Submit',
      cancel: 'Cancel',
      close: 'Close',
      loading: 'Loading...',
      error: 'Something went wrong. Please try again.',
      anonymousId: 'Anonymous ID',
      generateId: 'Generate Anonymous ID',
      privacyNotice: 'Your privacy is our priority. No personal data is ever stored or shared.',
    },
  },
  fil: {
    // Navigation
    nav: {
      home: 'Home',
      getHelp: 'Kumuha ng Tulong',
      selfExclusion: 'Self-Exclusion',
      resources: 'Mga Resource',
      recoveryTools: 'Mga Tool sa Pagbangon',
      families: 'Para sa Pamilya',
      about: 'Tungkol Sa',
      contact: 'Makipag-ugnayan',
      dashboard: 'Dashboard',
      login: 'Mag-login',
      toggleTheme: 'Baguhin ang tema',
      toggleLanguage: 'Baguhin ang wika',
      openMenu: 'Buksan ang menu',
      closeMenu: 'Isara ang menu',
    },
    // Footer
    footer: {
      tagline: 'Ang Iyong Kalasag Laban sa Pagsusugal',
      quickLinks: 'Mga Mabilis na Link',
      crisisHotline: 'Crisis Hotline',
      copyright: '© {year} Kalasag. Lahat ng karapatan ay nakalaan.',
      privacy: 'Patakaran sa Privacy',
      terms: 'Mga Tuntunin ng Paggamit',
      filipinoOwned: 'Pag-aari ng Pilipino',
      freeForever: 'Libre Magpakailanman',
      noDataStored: 'Walang Data na Sini-store',
      anonymous: '100% Anonymous',
    },
    // Crisis Widget
    crisis: {
      title: 'Crisis Support',
      subtitle: 'Hindi ka nag-iisa. May tulong na available ngayon.',
      iNeedHelp: 'Kailangan Ko ng Tulong Ngayon',
      call: 'Tumawag',
      chat: 'Makipag-chat',
      philippines: 'Pilipinas',
      international: 'Internasyonal',
      pagcorHotline: 'PAGCOR Hotline',
      pagcorNumber: '(02) 8527-0995',
      dohHotline: 'DOH Mental Health',
      dohNumber: '1553',
      natashaFoundation: 'Natasha Goulbourn Foundation',
      natashaNumber: '(02) 804-4673',
      inTouchHotline: 'InTouch Crisis Line',
      inTouchNumber: '(02) 8893-7603',
      text: 'Mag-text',
      smsNumber: '0917-800-1123',
      gamblersAnonymous: 'Gamblers Anonymous',
      gaNumber: '+1-626-960-3500',
      gamblingTherapy: 'Gambling Therapy',
      close: 'Isara ang crisis support',
      open: 'Buksan ang crisis support',
    },
    // Homepage
    home: {
      hero: {
        eyebrow: 'Anonymous · Libre · Pag-aari ng Pilipino',
        title: 'Ang Iyong Kalasag Laban sa Pagsusugal',
        description: 'Ang Kalasag ay isang ligtas at anonymous na sanctuarya para sa sinumang apektado ng pagsusugal. Walang hatol. Walang tracking. Suporta lang kapag kailangan mo ito.',
        ctaPrimary: 'Kumuha ng Tulong Ngayon',
        ctaSecondary: 'Matuto Pa',
        trust: ['100% Anonymous', 'Walang Data na Sini-store', 'Libre Magpakailanman', 'Pag-aari ng Pilipino'],
      },
      crisisBand: {
        title: 'Kailangan ng agarang tulong?',
        description: 'Ang mga crisis hotline ay available 24/7. Hindi ka nag-iisa.',
        cta: 'Tingnan ang Crisis Resources',
      },
      features: {
        eyebrow: 'Paano Tumutulong ang Kalasag',
        title: 'Mga Tool para sa Bawat Hakbang ng Pagbangon',
        description: 'Mula sa crisis intervention hanggang sa pang-araw-araw na recovery tools, ang Kalasag ay nagbibigay ng lahat ng kailangan mo — completely anonymously.',
        cards: [
          {
            title: 'Crisis Support',
            description: 'One-tap access sa Philippine at international hotlines, 24/7.',
            icon: 'Heart',
          },
          {
            title: 'Self-Exclusion',
            description: 'Digital registry at step-by-step guides para i-block ang mga gambling site at venue.',
            icon: 'Shield',
          },
          {
            title: 'Mga Tool sa Pagbangon',
            description: 'Streak tracking, mood journals, at urge management techniques.',
            icon: 'Wind',
          },
          {
            title: 'Suporta sa Pamilya',
            description: 'Gabay para sa mga mahal sa buhay kung paano tumulong nang hindi nag-e-enable.',
            icon: 'Users',
          },
          {
            title: 'Edukasyon',
            description: 'Unawain ang gambling addiction, warning signs, at Filipino-specific contexts.',
            icon: 'BookOpen',
          },
          {
            title: 'Anonymous Community',
            description: 'Makipag-ugnayan sa iba na nakaunawa — walang pangalan, walang hatol.',
            icon: 'MessageCircle',
          },
        ],
      },
      assessment: {
        eyebrow: 'Self-Assessment',
        title: 'Naaapektuhan ba ng Pagsusugal ang Iyong Buhay?',
        description: 'Gumawa ng mabilis, anonymous na self-check para maunawaan ang iyong relasyon sa pagsusugal. Walang data na sini-store.',
        cta: 'Simulan ang Anonymous Check',
        questions: [
          'Naramdaman mo na ba ang pangangailangang magtaya ng mas malaki at mas malaking pera?',
          'Sinubukan mo na bang bawasan o itigil ang pagsusugal pero hindi mo magawa?',
          'Naiirita ka ba o naiinip kapag sinusubukang bawasan ang pagsusugal?',
          'Nagdulot na ba ng problema sa iyong mga relasyon ang pagsusugal?',
          'Nanghiram ka na ba ng pera o nagbenta ng gamit para magsugal?',
        ],
      },
      testimonials: {
        eyebrow: 'Mga Tunay na Kwento',
        title: 'Hindi Ka Nag-iisa',
        description: 'Anonymous na mga tinig mula sa mga taong naglakad sa landas na ito at nakakita ng pag-asa.',
        stories: [
          {
            quote: 'Binigyan ako ng Kalasag ng lakas ng loob na aminin na kailangan ko ng tulong. Ang anonymous chat ay nagligtas sa buhay ko.',
            name: 'Miguel',
            detail: '8 buwan nang nagbabawas',
          },
          {
            quote: 'Bilang asawa, hindi ko alam kung paano tulungan ang aking mister. Ang family resources ay nagbigay sa akin ng linaw.',
            name: 'Anna',
            detail: 'Kamag-anak',
          },
          {
            quote: 'Ang mga self-exclusion tool ay tumulong sa akin na i-block ang mga online casino na hindi ko alam na naka-sign up ako.',
            name: 'Jayson',
            detail: '1 taon nang nagbabawas',
          },
        ],
      },
      stats: {
        eyebrow: 'Komunidad',
        title: 'Libu-libong Naghahanap ng Lakas Nang Magkasama',
        description: 'Bawat numero ay kumakatawan sa isang taong pumipili ng pag-asa kaysa sa pinsala.',
        items: [
          { value: '12,000+', label: 'Mga Taong Natulungan' },
          { value: '24/7', label: 'Akses sa Crisis' },
          { value: '100%', label: 'Anonymous' },
          { value: '₱0', label: 'Bayad Magpakailanman' },
        ],
      },
    },
    // Get Help
    getHelp: {
      hero: {
        eyebrow: 'Agarang Suporta',
        title: 'Kumuha ng Tulong Ngayon',
        description: 'Kung ikaw o ang iyong mahal sa buhay ay nasa crisis, may available na tulong agad. Ang mga hotline na ito ay libre, confidential, at may trained professionals.',
      },
      emergency: {
        title: 'Kailangan Ko ng Tulong Ngayon',
        description: 'Kung nasa panganib ka o overwhelmed, mangyaring makipag-ugnayan.',
        cta: 'Tumawag sa Emergency Hotline',
      },
      philippines: {
        title: 'Mga Hotline sa Pilipinas',
        description: 'Lokal na suporta para sa mga Pilipino, available sa Tagalog at English.',
      },
      international: {
        title: 'Internasyonal na Suporta',
        description: 'Global na resources para sa mga Pilipino sa abroad at international visitors.',
      },
      supportGroups: {
        title: 'Maghanap ng Support Group',
        description: 'Makipag-ugnayan sa iba sa iyong lugar na nakaunawa sa iyong pinagdadaanan.',
        cta: 'Tingnan ang Support Groups',
      },
      counselors: {
        title: 'Mga Propesyonal na Counselor',
        description: 'Akses sa licensed therapists na espesyalista sa gambling addiction recovery.',
        cta: 'Maghanap ng Counselor',
      },
    },
    // Self-Exclusion
    selfExclusion: {
      hero: {
        eyebrow: 'Kumontrol',
        title: 'Mga Tool sa Self-Exclusion',
        description: 'Alisin ang iyong sarili sa mga gambling environment at protektahan ang iyong hinaharap. Ang mga tool na ito ay libre, anonymous, at epektibo.',
      },
      registry: {
        title: 'Digital Self-Exclusion Registry',
        description: 'Irehistro ang iyong anonymous ID para mag-opt out sa mga gambling platform at physical venue sa Pilipinas.',
        cta: 'Magrehistro nang Anonymous',
        steps: ['Gumawa ng anonymous ID', 'Piliin ang mga platform na i-exclude', 'Kumpirmahin at i-activate'],
      },
      blocking: {
        title: 'I-block ang mga Gambling Site',
        description: 'Step-by-step guides para i-block ang online casinos, e-sabong, at betting apps sa iyong mga device.',
        cta: 'Tingnan ang Blocking Guides',
      },
      financial: {
        title: 'Proteksyon sa Pananalapi',
        description: 'Magtakda ng spending limits, i-freeze ang accounts, at protektahan ang iyong finances mula sa gambling harm.',
        tools: ['Spending Limits', 'Pag-freeze ng Account', 'Transaction Blocks', 'Budget Planner'],
      },
    },
    // Resources
    resources: {
      hero: {
        eyebrow: 'Matuto at Unawain',
        title: 'Mga Resource at Edukasyon',
        description: 'Ang kaalaman ay lakas. Unawain ang gambling addiction, makilala ang warning signs, at humanap ng mga daan patungo sa pagbangon — lahat sa stigma-free na wika.',
      },
      understanding: {
        title: 'Pag-unawa sa Gambling Addiction',
        description: 'Ang gambling addiction ay hindi moral na pagkukulang — ito ay isang kondisyon ng pag-uugali na maaaring maapektuhan ang sinuman. Alamin kung paano ito nagde-develop at kung paano gumagana ang recovery.',
      },
      warningSigns: {
        title: 'Checklist ng mga Warning Sign',
        description: 'Makilala ang mga maagang senyales sa iyong sarili o sa isang mahal sa buhay bago pa lumala.',
        signs: [
          'Gumagastos ng mas maraming oras o pera kaysa sa inasahan',
          'Itinatago ang aktibidad sa pagsusugal sa pamilya',
          'Hinahabol ang pagkatalo sa mas malalaking taya',
          'Nanghihiram ng pera para magsugal',
          'Pabayaan ang trabaho, paaralan, o relasyon',
          'Naiinip o naiirita kapag hindi nagsusugal',
        ],
      },
      families: {
        title: 'Epekto sa mga Pamilya',
        description: 'Ang gambling harm ay lumalampas sa indibidwal. Alamin kung paano naapektuhan ang mga pamilya at kung paano maghilom nang magkasama.',
      },
      financial: {
        title: 'Pagbangon sa Pananalapi',
        description: 'Mga praktikal na gabay sa pag-rebuild ng iyong finances pagkatapos ng gambling harm — isang hakbang sa bawat pagkakataon.',
      },
      filipinoContext: {
        title: 'Kontekstong Pilipino',
        description: 'Ang pagsusugal ay malalim na nakaugat sa kulturang Pilipino — mula sa fiesta at sabong hanggang e-sabong at online casinos. Ang pag-unawa sa kontekstong ito ay susi sa pagbangon.',
        topics: ['Sabong & E-Sabong', 'Online Casinos', 'Perya & Fiesta Games', 'Pressure mula sa Pamilya'],
      },
    },
    // Recovery Tools
    recoveryTools: {
      hero: {
        eyebrow: 'Pang-araw-araw na Suporta',
        title: 'Mga Tool sa Pagbangon',
        description: 'Mga praktikal at anonymous na tool para suportahan ang iyong recovery araw-araw. Walang gamification — tunay na suporta lang.',
      },
      streakTracker: {
        title: 'Streak Tracker',
        description: 'Subaybayan ang iyong mga araw na walang pagsusugal bilang personal na milestone — hindi kompetisyon.',
        cta: 'I-track ang Aking Progress',
      },
      moodJournal: {
        title: 'Mood Journal',
        description: 'Itala kung paano mo nararamdaman araw-araw. Ang iyong entries ay encrypted at naka-store locally — hindi namin nakikita.',
        cta: 'Buksan ang Journal',
      },
      triggers: {
        title: 'Pagkilala sa mga Trigger',
        description: 'Unawain kung ano ang nagtutulak sa iyong urges — stress, boredom, social pressure — at bumuo ng mga estratehiya para i-manage ang mga ito.',
        cta: 'Kilalanin ang mga Trigger',
      },
      coping: {
        title: 'Coping Strategies',
        description: 'Isang library ng mga teknik na napatunayang bumabawas sa gambling urges: breathing exercises, distraction techniques, at marami pa.',
        cta: 'Tingnan ang mga Estratehiya',
      },
      rideTheWave: {
        title: 'Ride the Wave',
        description: 'Ang isang urge ay tumatagal ng humigit-kumulang 20 minuto. Ang tool na ito ay gagabayan ka sa window na iyon sa pamamagitan ng breathing, grounding, at distraction.',
        cta: 'Simulan Ngayon',
      },
    },
    // Families
    families: {
      hero: {
        eyebrow: 'Para sa mga Minamahal',
        title: 'Para sa Pamilya at Kaibigan',
        description: 'Kung ang isang taong malapit sa iyong puso ay nahihirapan sa pagsusugal, maaari mong tulungan. Alamin kung paano suportahan sila nang hindi nag-e-enable ng behavior.',
      },
      howToHelp: {
        title: 'Paano Tulungan ang Isang Mahal sa Buhay',
        description: 'Mga praktikal at mapagkalingang gabay sa pagsisimula ng pag-uusap at pagsuporta sa recovery.',
        tips: [
          'Makinig nang walang hatol o sisihan',
          'Hikayatin ang propesyonal na suporta',
          'Iwasang magbigay ng pera na maaaring isugal',
          'Alagaan din ang iyong sariling kalusugan',
        ],
      },
      boundaries: {
        title: 'Pagtatakda ng Healthy Boundaries',
        description: 'Protektahan ang iyong sarili at pamilya habang nagpapakita pa rin ng pagmamahal at suporta.',
      },
      financial: {
        title: 'Proteksyon sa Pananalapi',
        description: 'Mga estratehiya para protektahan ang finances ng pamilya habang ang isang tao ay nasa recovery.',
      },
      supportGroups: {
        title: 'Mga Support Group para sa Pamilya',
        description: 'Makipag-ugnayan sa ibang pamilya na nakaunawa eksakto sa iyong pinagdadaanan.',
        cta: 'Maghanap ng Group',
      },
    },
    // About
    about: {
      hero: {
        eyebrow: 'Ang Aming Misyon',
        title: 'Bakit Umiiral ang Kalasag',
        description: 'Ang Kalasag ay binuo para punan ang kritikal na gap: anonymous, stigma-free na suporta para sa gambling addiction sa Pilipinas at sa buong mundo.',
      },
      mission: {
        title: 'Ang Aming Misyon',
        description: 'Magbigay ng accessible, anonymous, at culturally-aware na suporta para sa sinumang apektado ng gambling harm — completely free, forever.',
      },
      story: {
        title: 'Ang Kwento ng Developer',
        description: 'Ang Kalasag ay nilikha ni Rommel Andrei De Leon, isang full-stack developer mula sa Malolos, Bulacan na naniniwala na ang teknolohiya ay dapat protektahan ang mga mahihina. Bawat feature ay dinisenyo sa isang tanong: "Makakatulong ba ito sa isang taong nasa kanilang pinakamababang sandali na maramdaman ang kaligtasan?"',
        name: 'Rommel Andrei De Leon',
        role: 'Founder & Developer',
      },
      partners: {
        title: 'Mga Partner at Affiliations',
        description: 'Nakikipagtulungan kami sa mental health organizations, advocacy groups, at recovery communities para matiyak na ang aming resources ay tama at epektibo.',
      },
      nonprofit: {
        title: 'Non-Profit Stance',
        description: 'Ang Kalasag ay isang non-profit initiative. Hindi kami nagbebenta ng data, nagdi-display ng ads, o naniningil para sa anumang feature. Ang aming tanging layunin ay bawasan ang gambling harm.',
      },
    },
    // Contact
    contact: {
      hero: {
        eyebrow: 'Makipag-ugnayan',
        title: 'Makipag-ugnayan at Magbigay ng Feedback',
        description: 'May feedback, nais mag-volunteer, o kailangan mag-report ng bug? Binabasa namin ang bawat mensahe. Lahat ng submission ay anonymous by default.',
      },
      form: {
        title: 'Magpadala ng Mensahe',
        description: 'Hindi kailangan ng email. Walang data na nai-store. Ang iyong mensahe lang.',
        typeLabel: 'Uri ng Mensahe',
        types: ['Anonymous Feedback', 'Volunteer Inquiry', 'Partnership', 'Media Contact', 'Bug Report'],
        messageLabel: 'Iyong Mensahe',
        messagePlaceholder: 'Sabihin sa amin kung ano ang nasa isip mo...',
        submit: 'Ipadala ang Mensahe',
        submitting: 'Nagpapadala...',
        success: 'Salamat. Naipadala na ang iyong mensahe.',
        honeypot: 'Iwanang blangko ang field na ito',
      },
      developer: {
        title: 'Kontak sa Developer',
        description: 'Para sa direktang tanong tungkol sa platform, partnerships, o technical matters.',
        email: 'rommeld216@gmail.com',
        phone: '+63 962 790 5910',
        location: 'Malolos, Bulacan, Pilipinas',
      },
      social: {
        title: 'Kumonekta',
        description: 'Sundan ang Kalasag at ang developer para sa updates, resources, at community stories.',
      },
    },
    // Common
    common: {
      readMore: 'Magbasa Pa',
      learnMore: 'Matuto Pa',
      getStarted: 'Magsimula',
      back: 'Bumalik',
      next: 'Susunod',
      submit: 'Isumite',
      cancel: 'Kanselahin',
      close: 'Isara',
      loading: 'Naglo-load...',
      error: 'May nangyaring mali. Pakisubukan ulit.',
      anonymousId: 'Anonymous ID',
      generateId: 'Gumawa ng Anonymous ID',
      privacyNotice: 'Ang iyong privacy ang aming prayoridad. Walang personal na data ang sini-store o shinashare.',
    },
  },
} as const;

export type Content = typeof content.en;
