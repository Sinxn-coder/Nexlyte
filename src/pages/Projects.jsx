import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useIsMobile from '../hooks/useIsMobile';
import MobileProjects from './MobileProjects';

const Projects = () => {
  const isMobile = useIsMobile();
  const [activeShoe, setActiveShoe] = useState(1);
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeSubCategory, setActiveSubCategory] = useState(null);
  const [isExiting, setIsExiting] = useState(false);
  const [selectedProd, setSelectedProd] = useState(null);
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);
  const [showNewReleases, setShowNewReleases] = useState(false);
  const [isNBExiting, setIsNBExiting] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [isCartExiting, setIsCartExiting] = useState(false);
  const [isCartMounting, setIsCartMounting] = useState(false);
  const [isCartCheckoutComplete, setIsCartCheckoutComplete] = useState(false);
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Air Dynamic Pro", price: 180, img: "/shoe1.png", quantity: 1 },
    { id: 2, name: "Zoom Velocity", price: 165, img: "/shoe2.png", quantity: 1 }
  ]);
  const [isBookHovered, setIsBookHovered] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isBookingSubmitting, setIsBookingSubmitting] = useState(false);
  const [isBookingSuccess, setIsBookingSuccess] = useState(false);
  const [isAboutActive, setIsAboutActive] = useState(false);
  const [isAboutTransitioning, setIsAboutTransitioning] = useState(false);
  const [isWorksActive, setIsWorksActive] = useState(false);
  const [isWorksTransitioning, setIsWorksTransitioning] = useState(false);
  const [isGalleryActive, setIsGalleryActive] = useState(false);
  const [isGalleryTransitioning, setIsGalleryTransitioning] = useState(false);
  const [isContactActive, setIsContactActive] = useState(false);
  const [isContactTransitioning, setIsContactTransitioning] = useState(false);
  const [expandedWorkId, setExpandedWorkId] = useState(null);
  const [imagesReady, setImagesReady] = useState({});
  const [activeDemandSlide, setActiveDemandSlide] = useState(0);
  const [activeAdminTab, setActiveAdminTab] = useState('Dashboard');
  const [isOrdersQueueExpanded, setIsOrdersQueueExpanded] = useState(false);

  // Preload High-Res Works Images
  useEffect(() => {
    if (isWorksActive || isGalleryActive) {
      const assets = isWorksActive ? [
        'work1.png', 'work2.png', 'work3.png', 'work4.png'
      ] : [
        'gal1.png', 'gal2.png', 'gal3.png', 'gal4.png',
        'gal5.png', 'gal6.png', 'gal7.png', 'gal8.png'
      ];
      assets.forEach(img => {
        const i = new Image();
        i.src = `/${img}`;
        i.onload = () => setImagesReady(prev => ({ ...prev, [img]: true }));
      });
    }
  }, [isWorksActive, isGalleryActive]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveDemandSlide((prev) => (prev + 1) % 4);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (activeAdminTab !== 'Orders') {
      setIsOrdersQueueExpanded(false);
    }
  }, [activeAdminTab]);

  // Trigger Mounting Animation for Cart
  useEffect(() => {
    if (showCart) {
      const raf = requestAnimationFrame(() => {
        setIsCartMounting(true);
      });
      return () => cancelAnimationFrame(raf);
    } else {
      setIsCartMounting(false);
    }
  }, [showCart]);

  // Block background scroll only for full-page overlays
  useEffect(() => {
    if (selectedProd || isBookingModalOpen || isAboutActive || isWorksActive || isGalleryActive || isContactActive) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedProd, isBookingModalOpen, isAboutActive, isWorksActive, isGalleryActive, isContactActive]);

  const dimensionProducts = {
    Men: [
      { id: 1, name: "Air Dynamic Pro", price: "$180", img: "/shoe1.png" },
      { id: 2, name: "Zoom Velocity", price: "$165", img: "/shoe2.png" },
      { id: 3, name: "Street Glide GT", price: "$140", img: "/shoe3.png" },
      { id: 4, name: "Titan Performance", price: "$210", img: "/shoe4.png" },
      { id: 5, name: "Cloud Walker 01", price: "$155", img: "/shoe5.png" },
      { id: 6, name: "Neon Surge", price: "$195", img: "/shoe6.png" },
      { id: 7, name: "Apex Elite", price: "$225", img: "/shoe1.png" },
      { id: 8, name: "Terra Nova", price: "$170", img: "/shoe2.png" }
    ],
    Women: [
      { id: 9, name: "Aura Luxe", price: "$175", img: "/shoe2.png" },
      { id: 10, name: "Zen Harmony", price: "$150", img: "/shoe1.png" },
      { id: 11, name: "Stellar Run", price: "$190", img: "/shoe6.png" },
      { id: 12, name: "Swift Elegance", price: "$165", img: "/shoe5.png" },
      { id: 13, name: "Luna Glide", price: "$145", img: "/shoe3.png" },
      { id: 14, name: "Orbit Pink", price: "$200", img: "/shoe4.png" },
      { id: 15, name: "Aura Swift", price: "$185", img: "/shoe6.png" },
      { id: 16, name: "Prism Light", price: "$160", img: "/shoe5.png" }
    ],
    Kids: [
      { id: 17, name: "Little Bolt", price: "$85", img: "/shoe4.png" },
      { id: 18, name: "Junior Speed", price: "$95", img: "/shoe3.png" },
      { id: 19, name: "Play Ready", price: "$75", img: "/shoe2.png" },
      { id: 20, name: "Kid's Zoom 10", price: "$110", img: "/shoe5.png" },
      { id: 21, name: "Tiny Titan", price: "$65", img: "/shoe6.png" },
      { id: 22, name: "Star Step", price: "$80", img: "/shoe1.png" },
      { id: 23, name: "Neon Sprint", price: "$90", img: "/shoe4.png" },
      { id: 24, name: "Little Titan", price: "$70", img: "/shoe3.png" }
    ]
  };
  
  const newReleasesProducts = [
    { id: 101, name: "Air Max Pulse", price: "$150", img: "/shoe3.png" },
    { id: 102, name: "Air Force 1 '07", price: "$115", img: "/shoe4.png" },
    { id: 103, name: "Dunk Low Retro", price: "$120", img: "/shoe5.png" },
    { id: 104, name: "Jordan Retro 4", price: "$210", img: "/shoe1.png" },
    { id: 105, name: "VaporMax Plus", price: "$210", img: "/shoe6.png" },
    { id: 106, name: "Invincible 3", price: "$180", img: "/shoe2.png" },
    { id: 107, name: "Metcon 9 Premium", price: "$160", img: "/shoe4.png" },
    { id: 108, name: "Blazer Mid '77", price: "$105", img: "/shoe3.png" }
  ];

  const categoryProducts = {
    Men: ["Shoes", "Watches", "Chappals", "Accessories", "Perfumes"],
    Women: ["Shoes", "Bags", "Watches", "Jewelry", "Cosmetics"],
    Kids: ["Shoes", "Toys", "Clothing", "Bags", "School Supplies"]
  };

  const demandSlides = [
    "Product demand rose by 18% after fresh arrivals reached the front page.",
    "Cart recovery improved this week as mobile checkout drop-off fell by 9%.",
    "Outerwear is leading orders today, with conversion strongest in evening traffic.",
    "Bundle offers are lifting average basket value across repeat customers this cycle."
  ];

  const adminTabs = ['Dashboard', 'Catalog', 'Orders', 'Customers', 'Campaigns', 'Inventory', 'Returns', 'Settings'];

  const adminTabContent = {
    Catalog: {
      eyebrow: 'Product Library',
      title: 'Catalog Control',
      description: 'Manage collections, pricing visibility, launch timing, and product readiness across every sales surface.',
      stats: [
        ['Live SKUs', '1,248'],
        ['Draft Items', '82'],
        ['Hidden', '17']
      ],
      cards: [
        ['Top Collection', 'Velocity Series', 'Strongest click-through from homepage placements.'],
        ['Pending Review', '24 products', 'Awaiting photography, copy, or pricing validation.'],
        ['Last Sync', '12 mins ago', 'Catalog feed distributed successfully to all channels.']
      ],
      rows: [
        ['Velocity Runner', 'Footwear', 'Live', '$129'],
        ['Core Hoodie', 'Apparel', 'Draft', '$62'],
        ['Orbit Duffel', 'Bags', 'Live', '$84'],
        ['Mono Sneaker', 'Footwear', 'Hidden', '$148']
      ]
    },
    Orders: {
      eyebrow: 'Fulfillment Desk',
      title: 'Order Operations',
      description: 'Track incoming purchases, shipment flow, payment status, and resolution queues from one control layer.',
      stats: [
        ['Open Orders', '146'],
        ['Packed', '58'],
        ['Delayed', '09']
      ],
      cards: [
        ['Peak Channel', 'Web Store', 'Most completed checkouts in the current sales window.'],
        ['Fastest Region', 'South Zone', 'Average dispatch speed improved by 11%.'],
        ['Attention Needed', '7 orders', 'Address verification or payment review required.']
      ],
      rows: [
        ['#10482', 'Web Store', 'Packed', '$129'],
        ['#10476', 'Marketplace', 'Processing', '$84'],
        ['#10471', 'Mobile App', 'Shipped', '$62'],
        ['#10463', 'Retail Sync', 'Review', '$148']
      ]
    },
    Customers: {
      eyebrow: 'Audience View',
      title: 'Customer Insights',
      description: 'Review loyalty movement, repeat purchase patterns, audience quality, and retention opportunities.',
      stats: [
        ['Active Buyers', '8.4k'],
        ['Returning', '61%'],
        ['VIP Tier', '312']
      ],
      cards: [
        ['Retention Lift', '+8%', 'Repeat customer rate improved after bundle incentives.'],
        ['Highest LTV', 'Footwear buyers', 'Best lifetime value over the last 90 days.'],
        ['Dormant Segment', '214 profiles', 'Eligible for reactivation messaging this week.']
      ],
      rows: [
        ['Mira Cole', 'VIP', '4 orders', '$482'],
        ['James Ford', 'Returning', '3 orders', '$264'],
        ['Ava Stone', 'New', '1 order', '$84'],
        ['Leo Hart', 'Returning', '2 orders', '$148']
      ]
    },
    Campaigns: {
      eyebrow: 'Growth Engine',
      title: 'Campaign Performance',
      description: 'Launch seasonal pushes, monitor conversion uplift, and compare message performance across channels.',
      stats: [
        ['Live Campaigns', '06'],
        ['Avg CTR', '4.8%'],
        ['ROAS', '5.2x']
      ],
      cards: [
        ['Winning Push', 'Spring Reset', 'Creative refresh delivered the highest conversion this month.'],
        ['Best Channel', 'Email', 'Email continues to outperform paid social on repeat buyers.'],
        ['Needs Refresh', 'Weekend Drop', 'Engagement slowed after the first 48 hours.']
      ],
      rows: [
        ['Spring Reset', 'Email', 'Live', '5.8x'],
        ['Weekend Drop', 'Paid Social', 'Review', '3.1x'],
        ['Core Essentials', 'Push', 'Live', '4.4x'],
        ['Layer Up', 'SMS', 'Scheduled', '2.9x']
      ]
    },
    Inventory: {
      eyebrow: 'Stock Monitor',
      title: 'Inventory Health',
      description: 'Balance availability, restock timing, and warehouse movement before product demand starts slipping.',
      stats: [
        ['In Stock', '86%'],
        ['Low Stock', '43'],
        ['Restocking', '18']
      ],
      cards: [
        ['Most At Risk', 'Outerwear', 'Sell-through is accelerating faster than forecasted.'],
        ['Best Covered', 'Accessories', 'Healthy stock depth across all active variants.'],
        ['Warehouse Sync', 'Stable', 'No critical mismatch across fulfillment locations.']
      ],
      rows: [
        ['Velocity Runner', '124 units', 'Healthy', '7 days'],
        ['Orbit Duffel', '18 units', 'Low', '2 days'],
        ['Core Hoodie', '76 units', 'Healthy', '6 days'],
        ['Trail Cap', '09 units', 'Urgent', '1 day']
      ]
    },
    Returns: {
      eyebrow: 'Resolution Desk',
      title: 'Returns Management',
      description: 'Review refund patterns, exchange requests, and product issues to reduce repeat friction.',
      stats: [
        ['Open Cases', '23'],
        ['Resolved', '91%'],
        ['Exchanges', '14']
      ],
      cards: [
        ['Top Reason', 'Sizing mismatch', 'Most requests are driven by fit expectations.'],
        ['Fastest Win', 'Store credit', 'Credit-based recoveries close fastest with best retention.'],
        ['Product Watch', 'Mono Sneaker', 'Higher-than-normal exchange volume this cycle.']
      ],
      rows: [
        ['#R-208', 'Exchange', 'Open', '$129'],
        ['#R-201', 'Refund', 'Resolved', '$84'],
        ['#R-197', 'Store Credit', 'Open', '$62'],
        ['#R-190', 'Exchange', 'Resolved', '$148']
      ]
    },
    Settings: {
      eyebrow: 'Platform Controls',
      title: 'Store Settings',
      description: 'Adjust storefront behavior, checkout rules, shipping logic, and permissions without leaving the panel.',
      stats: [
        ['Team Roles', '12'],
        ['Live Rules', '28'],
        ['Flags Enabled', '07']
      ],
      cards: [
        ['Checkout Rules', 'Stable', 'Payment, tax, and routing rules are active and synced.'],
        ['Permissions', 'Updated', 'New manager-level access was applied this morning.'],
        ['Theme Status', 'Published', 'Storefront theme changes are live with no blocking issues.']
      ],
      rows: [
        ['Storefront Theme', 'Published', 'Live', 'v2.4'],
        ['Checkout Flow', 'Protected', 'Live', 'v1.8'],
        ['Tax Logic', 'Managed', 'Live', 'v3.1'],
        ['Role Access', 'Updated', 'Today', '12 users']
      ]
    }
  };

  const demandSlideBackgrounds = [
    'radial-gradient(circle at 50% 50%, rgba(85,106,255,0.68), rgba(26,27,47,0.3) 38%, #0f1020 80%)',
    'radial-gradient(circle at 68% 34%, rgba(86,221,194,0.45), rgba(17,26,37,0.35) 36%, #0f1020 82%)',
    'radial-gradient(circle at 35% 30%, rgba(255,154,92,0.45), rgba(30,20,31,0.35) 36%, #0f1020 82%)',
    'radial-gradient(circle at 52% 58%, rgba(165,111,255,0.5), rgba(25,20,40,0.34) 38%, #0f1020 82%)'
  ];

  const handleBack = () => {
    setIsExiting(true);
    setTimeout(() => {
      setActiveCategory(null);
      setIsExiting(false);
    }, 200);
  };
  
  const shoes = [
    { 
      id: 1, 
      src: '/shoe1.png',
      subtitle: "Men's HIIT Class Shoe",
      title: "Nike Air Zoom\nSuperRep",
      desc: "Synchronization Protocol 01: The Nike Air Zoom SuperRep is redesigned for high-intensity training. Zoom Air cushioning in the forefoot combines with a stable heel for maximum athletic performance."
    },
    { 
      id: 2, 
      src: '/shoe2.png',
      subtitle: "Men's Running Shoe",
      title: "Nike ZoomX\nVaporfly NEXT%",
      desc: "Synchronization Protocol 02: Clear the path to record-breaking speeds. We've added more cushioning underfoot and reduced weight up top, giving you unprecedented energy return and comfort."
    },
    { 
      id: 3, 
      src: '/shoe3.png',
      subtitle: "Men's Basketball Shoe",
      title: "LeBron 19\nSpace Jam",
      desc: "Synchronization Protocol 03: The LeBron 19 harnesses energy with a visible Max Air heel unit and thick, responsive Zoom Air under the forefoot. Designed to maximize your kinetic dynamics."
    },
    { 
      id: 4, 
      src: '/shoe4.png',
      subtitle: "Men's Training Shoe",
      title: "Nike Metcon 8\nPremium",
      desc: "Synchronization Protocol 04: The gold standard for weight training. The Metcon 8 features a lighter, more breathable upper than the previous edition to complement our standard of durability."
    }
  ];

  const handleNext = () => {
    setActiveShoe(prev => prev === 4 ? 1 : prev + 1);
  };

  const handlePrev = () => {
    setActiveShoe(prev => prev === 1 ? 4 : prev - 1);
  };

  const renderAdminWorkspace = () => {
    const content = adminTabContent[activeAdminTab];
    if (!content) return null;

    const accentMap = {
      Catalog: '#8fa0ff',
      Orders: '#38d7b2',
      Customers: '#ffb36b',
      Campaigns: '#8f7cff',
      Inventory: '#62d46b',
      Returns: '#ff8d59',
      Settings: '#7db2ff'
    };

    const accent = accentMap[activeAdminTab] || '#8fa0ff';

    if (activeAdminTab === 'Catalog' || activeAdminTab === 'Inventory') {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', minHeight: 0, flex: 1, overflowY: 'auto', paddingRight: '0.25rem' }} className="custom-scrollbar">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
            <div>
              <div style={{ color: 'rgba(255,255,255,0.42)', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.18em', marginBottom: '0.45rem' }}>{content.eyebrow}</div>
              <div style={{ color: 'white', fontSize: '34px', fontWeight: 900, lineHeight: 1 }}>{content.title}</div>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <div style={{ padding: '0.9rem 1rem', background: '#232635', borderRadius: '14px', color: 'rgba(255,255,255,0.78)', fontSize: '13px', fontWeight: 700 }}>Sync Feed</div>
              <div style={{ padding: '0.9rem 1rem', background: 'linear-gradient(135deg, #4d69ff, #6679ff)', borderRadius: '14px', color: 'white', fontSize: '13px', fontWeight: 800, boxShadow: '0 14px 30px rgba(77,105,255,0.3)' }}>Create Item</div>
            </div>
          </div>
          <div style={{ color: 'rgba(255,255,255,0.64)', fontSize: '16px', lineHeight: 1.6, maxWidth: '760px' }}>{content.description}</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '1rem', minHeight: '250px' }}>
            <div style={{ background: '#0f1120', borderRadius: '24px', padding: '1.25rem', border: '1px solid rgba(255,255,255,0.04)', display: 'flex', flexDirection: 'column' }}>
              <div style={{ color: 'white', fontSize: '15px', fontWeight: 800, marginBottom: '0.6rem' }}>Trend Line</div>
              <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '12px', fontWeight: 700, marginBottom: '1rem' }}>Weekly movement across active catalog groups.</div>
              <div style={{ flex: 1, borderRadius: '18px', background: 'linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
                <svg viewBox="0 0 420 180" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                  <path d="M10 134 C70 146, 96 76, 152 88 S230 150, 286 94 S360 44, 410 66" fill="none" stroke={accent} strokeWidth="6" strokeLinecap="round" />
                  <path d="M10 134 C70 146, 96 76, 152 88 S230 150, 286 94 S360 44, 410 66 L410 180 L10 180 Z" fill={`${accent}22`} />
                </svg>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateRows: 'repeat(3, 1fr)', gap: '1rem' }}>
              {content.stats.map(([label, value]) => (
                <div key={label} style={{ background: '#0f1120', borderRadius: '22px', padding: '1.2rem', border: '1px solid rgba(255,255,255,0.04)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div style={{ color: 'rgba(255,255,255,0.42)', fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.16em' }}>{label}</div>
                  <div style={{ color: 'white', fontSize: '30px', fontWeight: 900 }}>{value}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '1rem', minHeight: 0, flex: 1 }}>
            <div style={{ background: '#0f1120', borderRadius: '24px', padding: '1.25rem', border: '1px solid rgba(255,255,255,0.04)', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
              <div style={{ color: 'white', fontSize: '15px', fontWeight: 800, marginBottom: '0.8rem' }}>Product Records</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.2fr) minmax(0,1fr) minmax(0,0.9fr) auto', gap: '0.75rem', padding: '0.35rem 0 0.55rem', color: 'rgba(255,255,255,0.38)', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em' }}>
                <span>Item</span><span>Segment</span><span>Status</span><span style={{ textAlign: 'right' }}>Value</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', overflow: 'auto', paddingRight: '0.25rem', flex: 1 }} className="custom-scrollbar">
                {content.rows.map(([name, segment, status, value]) => (
                  <div key={name} style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.2fr) minmax(0,1fr) minmax(0,0.9fr) auto', gap: '0.75rem', alignItems: 'center', padding: '1rem 0', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                    <div style={{ color: 'white', fontSize: '14px', fontWeight: 700, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{name}</div>
                    <div style={{ color: 'rgba(255,255,255,0.58)', fontSize: '13px', fontWeight: 600, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{segment}</div>
                    <div style={{ color: accent, fontSize: '13px', fontWeight: 700 }}>{status}</div>
                    <div style={{ color: 'white', fontSize: '14px', fontWeight: 800, textAlign: 'right' }}>{value}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background: '#0f1120', borderRadius: '24px', padding: '1.25rem', border: '1px solid rgba(255,255,255,0.04)', display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
              <div style={{ color: 'white', fontSize: '15px', fontWeight: 800 }}>Highlights</div>
              {content.cards.map(([title, metric, text], index) => (
                <div key={title} style={{ background: index === 0 ? `${accent}16` : '#171b31', borderRadius: '18px', padding: '1rem', border: `1px solid ${index === 0 ? `${accent}44` : 'rgba(255,255,255,0.04)'}` }}>
                  <div style={{ color: 'white', fontSize: '14px', fontWeight: 800, marginBottom: '0.35rem' }}>{title}</div>
                  <div style={{ color: accent, fontSize: '22px', fontWeight: 900, marginBottom: '0.45rem' }}>{metric}</div>
                  <div style={{ color: 'rgba(255,255,255,0.58)', fontSize: '13px', lineHeight: 1.5 }}>{text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (activeAdminTab === 'Orders') {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem', minHeight: 0, height: '100%', flex: 1, overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
            <div>
              <div style={{ color: 'rgba(255,255,255,0.42)', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.18em', marginBottom: '0.45rem' }}>{content.eyebrow}</div>
              <div style={{ color: 'white', fontSize: '30px', fontWeight: 900, lineHeight: 1 }}>{content.title}</div>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <div style={{ padding: '0.9rem 1rem', background: '#232635', borderRadius: '14px', color: 'rgba(255,255,255,0.78)', fontSize: '13px', fontWeight: 700 }}>Export Orders</div>
              <div style={{ padding: '0.9rem 1rem', background: 'linear-gradient(135deg, #4d69ff, #6679ff)', borderRadius: '14px', color: 'white', fontSize: '13px', fontWeight: 800, boxShadow: '0 14px 30px rgba(77,105,255,0.3)' }}>Create Shipment</div>
            </div>
          </div>
          <div style={{ color: 'rgba(255,255,255,0.64)', fontSize: '15px', lineHeight: 1.55, maxWidth: '760px' }}>{content.description}</div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: '1rem' }}>
            {[
              ['Open Orders', '146', '+18 today'],
              ['Awaiting Pack', '58', 'Warehouse queue'],
              ['On Route', '231', 'Across 7 hubs'],
              ['Delayed', '09', 'Needs attention']
            ].map(([label, value, note], idx) => (
              <div key={label} style={{ background: idx === 3 ? 'linear-gradient(180deg, rgba(255,141,89,0.14), rgba(255,141,89,0.04))' : '#0f1120', borderRadius: '22px', padding: '1.15rem', border: '1px solid rgba(255,255,255,0.04)' }}>
                <div style={{ color: 'rgba(255,255,255,0.42)', fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: '0.5rem' }}>{label}</div>
                <div style={{ color: 'white', fontSize: '28px', fontWeight: 900, marginBottom: '0.3rem' }}>{value}</div>
                <div style={{ color: idx === 3 ? '#ff8d59' : 'rgba(255,255,255,0.56)', fontSize: '12px', fontWeight: 700 }}>{note}</div>
              </div>
            ))}
          </div>

          {!isOrdersQueueExpanded && (
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(320px, 0.9fr) minmax(0, 1.1fr)', gap: '1rem', minHeight: '280px', maxHeight: '280px' }}>
              <div style={{ background: '#0f1120', borderRadius: '24px', padding: '1.1rem', border: '1px solid rgba(255,255,255,0.04)', display: 'flex', flexDirection: 'column', gap: '0.85rem', minWidth: 0, overflow: 'hidden' }}>
                <div style={{ color: 'white', fontSize: '15px', fontWeight: 800 }}>Fulfillment Stages</div>
                {[
                  ['Picked', '74%', '#38d7b2'],
                  ['Packed', '58%', '#7db2ff'],
                  ['Label Created', '46%', '#8f7cff'],
                  ['Delivered', '31%', '#ffb36b']
                ].map(([label, pct, color]) => (
                  <div key={label}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.45rem' }}>
                    <span style={{ color: 'white', fontSize: '13px', fontWeight: 700 }}>{label}</span>
                    <span style={{ color, fontSize: '12px', fontWeight: 800 }}>{pct}</span>
                  </div>
                  <div style={{ height: '9px', borderRadius: '999px', background: '#1f2337', overflow: 'hidden' }}>
                    <div style={{ width: pct, height: '100%', borderRadius: '999px', background: color }} />
                  </div>
                </div>
                ))}
                <div style={{ marginTop: 'auto', background: '#171b31', borderRadius: '18px', padding: '0.9rem' }}>
                  <div style={{ color: 'rgba(255,255,255,0.42)', fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: '0.4rem' }}>Current Focus</div>
                  <div style={{ color: 'white', fontSize: '20px', fontWeight: 900, marginBottom: '0.25rem' }}>South Zone</div>
                  <div style={{ color: 'rgba(255,255,255,0.56)', fontSize: '12px', lineHeight: 1.45 }}>Dispatch load is rising fastest there, with the strongest same-day completion rate.</div>
                </div>
              </div>

              <div style={{ background: '#0f1120', borderRadius: '24px', padding: '1.1rem', border: '1px solid rgba(255,255,255,0.04)', display: 'flex', flexDirection: 'column', minWidth: 0, overflow: 'hidden' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
                  <div style={{ color: 'white', fontSize: '15px', fontWeight: 800 }}>Dispatch Rhythm</div>
                  <div style={{ color: '#38d7b2', fontSize: '12px', fontWeight: 800 }}>+11% faster</div>
                </div>
                <div style={{ flex: 1, borderRadius: '18px', background: 'linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
                  <svg viewBox="0 0 460 210" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                    <path d="M10 160 C56 164, 94 118, 138 122 S214 172, 258 138 S338 66, 386 86 S432 64, 450 44" fill="none" stroke="#4d69ff" strokeWidth="6" strokeLinecap="round" />
                    <path d="M10 160 C56 164, 94 118, 138 122 S214 172, 258 138 S338 66, 386 86 S432 64, 450 44 L450 210 L10 210 Z" fill="rgba(77,105,255,0.12)" />
                  </svg>
                </div>
              </div>
            </div>
          )}

          <div style={{ background: '#0f1120', borderRadius: '24px', padding: '1.1rem', border: '1px solid rgba(255,255,255,0.04)', display: 'flex', flexDirection: 'column', minHeight: 0, flex: isOrdersQueueExpanded ? 1.6 : 1, overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
              <div style={{ color: 'white', fontSize: '15px', fontWeight: 800 }}>Order Queue</div>
              <button
                type="button"
                onClick={() => setIsOrdersQueueExpanded((prev) => !prev)}
                style={{
                  border: 'none',
                  cursor: 'pointer',
                  padding: '0.7rem 0.95rem',
                  background: isOrdersQueueExpanded ? 'rgba(77,105,255,0.16)' : '#232635',
                  borderRadius: '14px',
                  color: 'white',
                  fontSize: '12px',
                  fontWeight: 800,
                  letterSpacing: '0.04em'
                }}
              >
                {isOrdersQueueExpanded ? 'Collapse Queue' : 'Expand Queue'}
              </button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,0.95fr) minmax(0,0.9fr) minmax(0,0.7fr) auto', gap: '0.75rem', padding: '0.35rem 0 0.55rem', color: 'rgba(255,255,255,0.38)', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em' }}>
              <span>Order ID</span><span>Channel</span><span>Stage</span><span>Region</span><span style={{ textAlign: 'right' }}>Total</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem', overflowY: 'auto', overflowX: 'hidden', paddingRight: '0.25rem', paddingBottom: isOrdersQueueExpanded ? '6.25rem' : '5rem', flex: 1 }} className="custom-scrollbar">
              {[
                ['#10482', 'Web Store', 'Packed', 'South', '$129'],
                ['#10476', 'Marketplace', 'Processing', 'West', '$84'],
                ['#10471', 'Mobile App', 'Shipped', 'East', '$62'],
                ['#10463', 'Retail Sync', 'Review', 'North', '$148'],
                ['#10455', 'Web Store', 'Picked', 'South', '$96'],
                ['#10441', 'Mobile App', 'Delivered', 'Central', '$73'],
                ['#10435', 'Marketplace', 'Packed', 'West', '$118'],
                ['#10431', 'Web Store', 'Shipped', 'East', '$92'],
                ['#10427', 'Retail Sync', 'Processing', 'North', '$156'],
                ['#10421', 'Mobile App', 'Picked', 'South', '$64']
              ].map(([id, channel, stage, region, value]) => (
                <div key={id} style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,0.95fr) minmax(0,0.9fr) minmax(0,0.7fr) auto', gap: '0.75rem', alignItems: 'center', padding: '0.82rem 0', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                  <div style={{ color: 'white', fontSize: '14px', fontWeight: 700, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{id}</div>
                  <div style={{ color: 'rgba(255,255,255,0.58)', fontSize: '13px', fontWeight: 600, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{channel}</div>
                  <div style={{ color: stage === 'Review' ? '#ff8d59' : '#38d7b2', fontSize: '13px', fontWeight: 700 }}>{stage}</div>
                  <div style={{ color: 'rgba(255,255,255,0.62)', fontSize: '13px', fontWeight: 600, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{region}</div>
                  <div style={{ color: 'white', fontSize: '14px', fontWeight: 800, textAlign: 'right' }}>{value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (activeAdminTab === 'Customers') {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', minHeight: 0, flex: 1, overflowY: 'auto', paddingRight: '0.25rem' }} className="custom-scrollbar">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
            <div>
              <div style={{ color: 'rgba(255,255,255,0.42)', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.18em', marginBottom: '0.45rem' }}>{content.eyebrow}</div>
              <div style={{ color: 'white', fontSize: '34px', fontWeight: 900, lineHeight: 1 }}>{content.title}</div>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <div style={{ padding: '0.9rem 1rem', background: '#232635', borderRadius: '14px', color: 'rgba(255,255,255,0.78)', fontSize: '13px', fontWeight: 700 }}>Segment Export</div>
              <div style={{ padding: '0.9rem 1rem', background: 'linear-gradient(135deg, #ff9a4d, #ffbe78)', borderRadius: '14px', color: '#111321', fontSize: '13px', fontWeight: 900, boxShadow: '0 14px 30px rgba(255,179,107,0.22)' }}>Create Audience</div>
            </div>
          </div>
          <div style={{ color: 'rgba(255,255,255,0.64)', fontSize: '16px', lineHeight: 1.6, maxWidth: '780px' }}>{content.description}</div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: '1rem' }}>
            {[
              ['Active Buyers', '8.4k', '+6.8% from last cycle'],
              ['Repeat Rate', '61%', 'Healthy reorder movement'],
              ['VIP Tier', '312', 'High-value shoppers'],
              ['Churn Risk', '214', 'Need reactivation']
            ].map(([label, value, note], idx) => (
              <div key={label} style={{ background: idx === 3 ? 'linear-gradient(180deg, rgba(255,141,89,0.14), rgba(255,141,89,0.05))' : '#0f1120', borderRadius: '22px', padding: '1.15rem', border: '1px solid rgba(255,255,255,0.04)' }}>
                <div style={{ color: 'rgba(255,255,255,0.42)', fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: '0.5rem' }}>{label}</div>
                <div style={{ color: 'white', fontSize: '28px', fontWeight: 900, marginBottom: '0.35rem' }}>{value}</div>
                <div style={{ color: idx === 3 ? '#ff8d59' : 'rgba(255,255,255,0.56)', fontSize: '12px', fontWeight: 700 }}>{note}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.08fr) minmax(300px, 0.92fr)', gap: '1rem', minHeight: '300px' }}>
            <div style={{ background: '#0f1120', borderRadius: '24px', padding: '1.25rem', border: '1px solid rgba(255,255,255,0.04)', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.7rem' }}>
                <div style={{ color: 'white', fontSize: '15px', fontWeight: 800 }}>Retention Curve</div>
                <div style={{ color: '#ffb36b', fontSize: '12px', fontWeight: 800 }}>90-day cohort view</div>
              </div>
              <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '12px', fontWeight: 700, marginBottom: '1rem' }}>Returning customer activity is strongest in repeat footwear and accessories shoppers.</div>
              <div style={{ flex: 1, borderRadius: '18px', background: 'linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
                <svg viewBox="0 0 520 220" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                  <path d="M16 168 C66 172, 98 118, 144 122 S224 176, 276 134 S362 64, 416 88 S472 102, 504 54" fill="none" stroke="#ffb36b" strokeWidth="6" strokeLinecap="round" />
                  <path d="M16 168 C66 172, 98 118, 144 122 S224 176, 276 134 S362 64, 416 88 S472 102, 504 54 L504 220 L16 220 Z" fill="rgba(255,179,107,0.12)" />
                  <path d="M16 184 C78 168, 132 152, 192 162 S296 146, 350 126 S442 116, 504 100" fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="4" strokeLinecap="round" strokeDasharray="10 10" />
                </svg>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: '0.75rem', marginTop: '1rem' }}>
                {[
                  ['30 Days', '72%', 'Best repeat window'],
                  ['AOV Lift', '+14%', 'From bundle buyers'],
                  ['Referral Pull', '18%', 'Share-driven signups']
                ].map(([label, value, note]) => (
                  <div key={label} style={{ background: '#171b31', borderRadius: '18px', padding: '0.95rem' }}>
                    <div style={{ color: 'rgba(255,255,255,0.42)', fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: '0.35rem' }}>{label}</div>
                    <div style={{ color: 'white', fontSize: '22px', fontWeight: 900, marginBottom: '0.25rem' }}>{value}</div>
                    <div style={{ color: 'rgba(255,255,255,0.56)', fontSize: '12px', lineHeight: 1.4 }}>{note}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr', gap: '1rem', minHeight: 0 }}>
              <div style={{ background: '#0f1120', borderRadius: '24px', padding: '1.25rem', border: '1px solid rgba(255,255,255,0.04)', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <div style={{ color: 'white', fontSize: '15px', fontWeight: 800 }}>Loyalty Distribution</div>
                  <div style={{ color: '#ffb36b', fontSize: '12px', fontWeight: 800 }}>Updated today</div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: '1rem', alignItems: 'center', flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: '160px', height: '160px', borderRadius: '50%', background: 'conic-gradient(#ffb36b 0 212deg, #8f7cff 212deg 304deg, rgba(255,255,255,0.16) 304deg 360deg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <div style={{ width: '112px', height: '112px', borderRadius: '50%', background: '#0f1120', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ color: 'rgba(255,255,255,0.42)', fontSize: '11px', fontWeight: 700 }}>Loyal</div>
                        <div style={{ color: 'white', fontSize: '28px', fontWeight: 900 }}>59%</div>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    {[
                      ['Repeat Buyers', '59%', '#ffb36b'],
                      ['VIP Circle', '26%', '#8f7cff'],
                      ['At Risk', '15%', '#ff8d59']
                    ].map(([label, pct, color]) => (
                      <div key={label}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                          <span style={{ color: 'white', fontSize: '13px', fontWeight: 700 }}>{label}</span>
                          <span style={{ color, fontSize: '12px', fontWeight: 800 }}>{pct}</span>
                        </div>
                        <div style={{ height: '8px', borderRadius: '999px', background: '#1f2337', overflow: 'hidden' }}>
                          <div style={{ width: pct, height: '100%', borderRadius: '999px', background: color }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div style={{ background: '#0f1120', borderRadius: '24px', padding: '1.25rem', border: '1px solid rgba(255,255,255,0.04)', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <div style={{ color: 'white', fontSize: '15px', fontWeight: 800 }}>Audience Watchlist</div>
                {[
                  ['VIP Restock Alerts', '48 members waiting on premium sneaker drops.', '#ffb36b'],
                  ['Dormant Segment', '214 shoppers have not ordered in the last 45 days.', '#ff8d59'],
                  ['High Intent Newcomers', '92 first-time buyers viewed product pages more than 5 times.', '#7db2ff']
                ].map(([title, text, color]) => (
                  <div key={title} style={{ background: '#171b31', borderRadius: '18px', padding: '1rem' }}>
                    <div style={{ color, fontSize: '14px', fontWeight: 800, marginBottom: '0.35rem' }}>{title}</div>
                    <div style={{ color: 'rgba(255,255,255,0.58)', fontSize: '13px', lineHeight: 1.5 }}>{text}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ background: '#0f1120', borderRadius: '24px', padding: '1.25rem', border: '1px solid rgba(255,255,255,0.04)', display: 'flex', flexDirection: 'column', minHeight: 0, flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
              <div style={{ color: 'white', fontSize: '15px', fontWeight: 800 }}>Customer Profiles</div>
              <div style={{ color: 'rgba(255,255,255,0.48)', fontSize: '12px', fontWeight: 700 }}>Top-value and at-risk shoppers in the current review window.</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,0.82fr) minmax(0,0.85fr) minmax(0,0.75fr) auto', gap: '0.8rem', padding: '0.35rem 0 0.55rem', color: 'rgba(255,255,255,0.38)', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em' }}>
              <span>Customer</span><span>Segment</span><span>Recent Activity</span><span>Lifetime Value</span><span style={{ textAlign: 'right' }}>Status</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.18rem', overflowY: 'auto', overflowX: 'hidden', paddingRight: '0.25rem', paddingBottom: '5rem', flex: 1 }} className="custom-scrollbar">
              {[
                ['Mira Cole', 'VIP Circle', '4 orders in 30 days', '$482', 'Healthy'],
                ['James Ford', 'Returning', '3 orders in 45 days', '$264', 'Growing'],
                ['Ava Stone', 'New Buyer', '1 order and 6 product views', '$84', 'Warm'],
                ['Leo Hart', 'Repeat Footwear', '2 orders and 1 wishlist save', '$148', 'Healthy'],
                ['Nora Patel', 'Dormant', 'No order in 52 days', '$216', 'At Risk'],
                ['Rian Scott', 'VIP Circle', '5 orders this quarter', '$612', 'Healthy'],
                ['Tina Brooks', 'Bundle Shopper', '2 bundles in 14 days', '$198', 'Growing'],
                ['Omar Blake', 'New Buyer', 'Checkout started twice', '$0', 'Recover'],
                ['Sana Mehra', 'Returning', '3 orders, 1 referral use', '$338', 'Healthy'],
                ['Kai Turner', 'Dormant', 'Browsing active, no checkout', '$122', 'At Risk']
              ].map(([name, segment, activity, value, status]) => (
                <div key={name} style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,0.82fr) minmax(0,0.85fr) minmax(0,0.75fr) auto', gap: '0.8rem', alignItems: 'center', padding: '0.95rem 0', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                  <div style={{ color: 'white', fontSize: '14px', fontWeight: 700, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{name}</div>
                  <div style={{ color: 'rgba(255,255,255,0.58)', fontSize: '13px', fontWeight: 600, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{segment}</div>
                  <div style={{ color: 'rgba(255,255,255,0.62)', fontSize: '13px', fontWeight: 600, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{activity}</div>
                  <div style={{ color: 'white', fontSize: '14px', fontWeight: 800, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{value}</div>
                  <div style={{ color: status === 'At Risk' ? '#ff8d59' : status === 'Recover' ? '#7db2ff' : status === 'Growing' ? '#ffb36b' : '#38d7b2', fontSize: '13px', fontWeight: 800, textAlign: 'right' }}>{status}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (activeAdminTab === 'Returns') {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', minHeight: 0, flex: 1, overflowY: 'auto', paddingRight: '0.25rem' }} className="custom-scrollbar">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
            <div>
              <div style={{ color: 'rgba(255,255,255,0.42)', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.18em', marginBottom: '0.45rem' }}>{content.eyebrow}</div>
              <div style={{ color: 'white', fontSize: '34px', fontWeight: 900, lineHeight: 1 }}>{content.title}</div>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <div style={{ padding: '0.9rem 1rem', background: '#232635', borderRadius: '14px', color: 'rgba(255,255,255,0.78)', fontSize: '13px', fontWeight: 700 }}>Filter Queue</div>
              <div style={{ padding: '0.9rem 1rem', background: 'linear-gradient(135deg, #4d69ff, #6679ff)', borderRadius: '14px', color: 'white', fontSize: '13px', fontWeight: 800, boxShadow: '0 14px 30px rgba(77,105,255,0.3)' }}>Resolve Batch</div>
            </div>
          </div>
          <div style={{ color: 'rgba(255,255,255,0.64)', fontSize: '16px', lineHeight: 1.6, maxWidth: '760px' }}>{content.description}</div>
          <div style={{ display: 'grid', gridTemplateColumns: '0.95fr 1.05fr', gap: '1rem', minHeight: '280px' }}>
            <div style={{ background: '#0f1120', borderRadius: '24px', padding: '1.25rem', border: '1px solid rgba(255,255,255,0.04)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ color: 'white', fontSize: '15px', fontWeight: 800 }}>Queue Summary</div>
              {content.stats.map(([label, value], idx) => (
                <div key={label} style={{ display: 'grid', gridTemplateColumns: '90px 1fr auto', alignItems: 'center', gap: '0.8rem' }}>
                  <div style={{ color: 'rgba(255,255,255,0.52)', fontSize: '12px', fontWeight: 700 }}>{label}</div>
                  <div style={{ height: '8px', borderRadius: '999px', background: '#1f2337', overflow: 'hidden' }}>
                    <div style={{ width: `${68 - idx * 14}%`, height: '100%', borderRadius: '999px', background: accent }} />
                  </div>
                  <div style={{ color: 'white', fontSize: '18px', fontWeight: 800 }}>{value}</div>
                </div>
              ))}
              <div style={{ marginTop: 'auto', background: '#171b31', borderRadius: '18px', padding: '1rem' }}>
                <div style={{ color: 'rgba(255,255,255,0.42)', fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: '0.45rem' }}>Priority Window</div>
                <div style={{ color: 'white', fontSize: '24px', fontWeight: 900, marginBottom: '0.35rem' }}>{content.cards[0][1]}</div>
                <div style={{ color: 'rgba(255,255,255,0.58)', fontSize: '13px', lineHeight: 1.5 }}>{content.cards[0][2]}</div>
              </div>
            </div>
            <div style={{ background: '#0f1120', borderRadius: '24px', padding: '1.25rem', border: '1px solid rgba(255,255,255,0.04)', display: 'grid', gridTemplateColumns: '0.85fr 1.15fr', gap: '1rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: '190px', height: '190px', borderRadius: '50%', background: `conic-gradient(${accent} 0 224deg, rgba(255,255,255,0.16) 224deg 360deg)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: '132px', height: '132px', borderRadius: '50%', background: '#0f1120', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ color: 'rgba(255,255,255,0.42)', fontSize: '11px', fontWeight: 700 }}>Completion</div>
                    <div style={{ color: 'white', fontSize: '32px', fontWeight: 900 }}>62%</div>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', justifyContent: 'center' }}>
                {content.cards.map(([title, metric, text]) => (
                  <div key={title} style={{ background: '#171b31', borderRadius: '18px', padding: '1rem' }}>
                    <div style={{ color: 'white', fontSize: '14px', fontWeight: 800, marginBottom: '0.35rem' }}>{title}</div>
                    <div style={{ color: accent, fontSize: '20px', fontWeight: 900, marginBottom: '0.35rem' }}>{metric}</div>
                    <div style={{ color: 'rgba(255,255,255,0.56)', fontSize: '13px', lineHeight: 1.45 }}>{text}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div style={{ background: '#0f1120', borderRadius: '24px', padding: '1.25rem', border: '1px solid rgba(255,255,255,0.04)', display: 'flex', flexDirection: 'column', minHeight: 0, flex: 1 }}>
            <div style={{ color: 'white', fontSize: '15px', fontWeight: 800, marginBottom: '0.8rem' }}>Live Queue</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.1fr) minmax(0,1fr) minmax(0,0.9fr) auto', gap: '0.75rem', padding: '0.35rem 0 0.55rem', color: 'rgba(255,255,255,0.38)', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em' }}>
              <span>Reference</span><span>Channel</span><span>Status</span><span style={{ textAlign: 'right' }}>Value</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', overflow: 'auto', paddingRight: '0.25rem', flex: 1 }} className="custom-scrollbar">
              {content.rows.map(([name, segment, status, value]) => (
                <div key={name} style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.1fr) minmax(0,1fr) minmax(0,0.9fr) auto', gap: '0.75rem', alignItems: 'center', padding: '1rem 0', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                  <div style={{ color: 'white', fontSize: '14px', fontWeight: 700, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{name}</div>
                  <div style={{ color: 'rgba(255,255,255,0.58)', fontSize: '13px', fontWeight: 600, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{segment}</div>
                  <div style={{ color: accent, fontSize: '13px', fontWeight: 700 }}>{status}</div>
                  <div style={{ color: 'white', fontSize: '14px', fontWeight: 800, textAlign: 'right' }}>{value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', minHeight: 0, flex: 1, overflowY: 'auto', paddingRight: '0.25rem' }} className="custom-scrollbar">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
          <div>
            <div style={{ color: 'rgba(255,255,255,0.42)', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.18em', marginBottom: '0.45rem' }}>{content.eyebrow}</div>
            <div style={{ color: 'white', fontSize: '34px', fontWeight: 900, lineHeight: 1 }}>{content.title}</div>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <div style={{ padding: '0.9rem 1rem', background: '#232635', borderRadius: '14px', color: 'rgba(255,255,255,0.78)', fontSize: '13px', fontWeight: 700 }}>Open Report</div>
            <div style={{ padding: '0.9rem 1rem', background: 'linear-gradient(135deg, #4d69ff, #6679ff)', borderRadius: '14px', color: 'white', fontSize: '13px', fontWeight: 800, boxShadow: '0 14px 30px rgba(77,105,255,0.3)' }}>New Insight</div>
          </div>
        </div>
        <div style={{ color: 'rgba(255,255,255,0.64)', fontSize: '16px', lineHeight: 1.6, maxWidth: '760px' }}>{content.description}</div>
        <div style={{ background: '#0f1120', borderRadius: '24px', padding: '1.25rem', border: '1px solid rgba(255,255,255,0.04)', display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: '1rem' }}>
          {content.stats.map(([label, value], idx) => (
            <div key={label} style={{ background: idx === 1 ? `${accent}14` : '#171b31', borderRadius: '20px', padding: '1rem' }}>
              <div style={{ color: 'rgba(255,255,255,0.42)', fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: '0.45rem' }}>{label}</div>
              <div style={{ color: 'white', fontSize: '30px', fontWeight: 900 }}>{value}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 0.9fr', gap: '1rem', minHeight: 0, flex: 1 }}>
          <div style={{ background: '#0f1120', borderRadius: '24px', padding: '1.25rem', border: '1px solid rgba(255,255,255,0.04)', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
            <div style={{ color: 'white', fontSize: '15px', fontWeight: 800, marginBottom: '0.7rem' }}>Performance Curve</div>
            <div style={{ flex: 1, borderRadius: '18px', background: 'linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
              <svg viewBox="0 0 420 220" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                <path d="M0 160 C44 144, 78 86, 126 92 S214 178, 278 128 S346 52, 420 70" fill="none" stroke={accent} strokeWidth="6" strokeLinecap="round" />
              </svg>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateRows: 'repeat(3, 1fr)', gap: '1rem' }}>
            {content.cards.map(([title, metric, text]) => (
              <div key={title} style={{ background: '#0f1120', borderRadius: '22px', padding: '1.1rem', border: '1px solid rgba(255,255,255,0.04)' }}>
                <div style={{ color: 'white', fontSize: '14px', fontWeight: 800, marginBottom: '0.35rem' }}>{title}</div>
                <div style={{ color: accent, fontSize: '22px', fontWeight: 900, marginBottom: '0.45rem' }}>{metric}</div>
                <div style={{ color: 'rgba(255,255,255,0.56)', fontSize: '13px', lineHeight: 1.5 }}>{text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  if (isMobile) return <MobileProjects />;

  return (
    <div className="projects-container">
      {/* Back Button - Dimension Navigation */}
      <Link 
        to="/" 
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] flex items-center justify-center group px-6 py-3 min-w-[140px] rounded-full border border-[rgba(255,255,255,0.2)] bg-[rgba(0,0,0,0.3)] backdrop-blur-2xl hover:bg-white hover:border-transparent hover:scale-105 transition-all shadow-xl overflow-hidden"
      >
        <span className="text-[11px] uppercase font-black tracking-[0.25em] text-obsidian transition-colors">Home</span>
      </Link>

      {/* Product Order Popup */}
      {selectedProd && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 1000,
          background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '2rem'
        }} onClick={() => { setSelectedProd(null); setIsOrderConfirmed(false); }}>
          <div 
            style={{
              width: '100%', maxWidth: '440px', background: 'white', borderRadius: '4px',
              overflow: 'hidden', position: 'relative', boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
              opacity: 0, transform: 'scale(0.9)', 
              animation: 'fade-in-up 0.4s cubic-bezier(0.76, 0, 0.24, 1) forwards'
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div style={{ padding: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
              <div>
                <p style={{ fontSize: '10px', color: '#ff2136', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '4px' }}>Confirm Order</p>
                <h3 style={{ fontSize: '24px', fontWeight: 900, color: '#030303', textTransform: 'uppercase' }}>{selectedProd.name}</h3>
              </div>
              <div 
                onClick={() => { setSelectedProd(null); setIsOrderConfirmed(false); }}
                style={{ cursor: 'pointer', opacity: 0.4, transition: 'opacity 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.opacity = 1}
                onMouseLeave={e => e.currentTarget.style.opacity = 0.4}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#030303" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
              </div>
            </div>

            {/* Modal Body */}
            <div style={{ background: '#f8f8f8', padding: '3rem 2rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {!isOrderConfirmed ? (
                <>
                  <img 
                    src={selectedProd.img} 
                    alt={selectedProd.name} 
                    style={{ width: '80%', height: 'auto', marginBottom: '2rem', filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.1))' }}
                  />
                  <div style={{ width: '100%', borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span style={{ color: 'rgba(0,0,0,0.4)', fontWeight: 600, fontSize: '13px' }}>Price:</span>
                    <span style={{ fontSize: '32px', fontWeight: 900, color: '#030303' }}>{selectedProd.price}</span>
                  </div>
                </>
              ) : (
                <div style={{ padding: '2rem 0', animation: 'fade-in-up 0.5s ease forwards' }}>
                  <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#ff2136', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <h4 style={{ fontSize: '20px', fontWeight: 900, color: '#030303', marginBottom: '8px' }}>Order Success!</h4>
                  <p style={{ color: 'rgba(0,0,0,0.5)', fontSize: '14px', lineHeight: 1.6 }}>Your Nexlyte dimension model is being prepared for synchronization.</p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            {!isOrderConfirmed && (
              <div style={{ padding: '2rem' }}>
                <div 
                  onClick={() => setIsOrderConfirmed(true)}
                  style={{
                    padding: '1.5rem', background: '#030303', color: 'white', letterSpacing: '0.25em',
                    textAlign: 'center', fontWeight: 900, fontSize: '12px', textTransform: 'uppercase',
                    cursor: 'pointer', transition: 'all 0.3s cubic-bezier(0.76, 0, 0.24, 1)'
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = '#ff2136'}
                  onMouseLeave={e => e.currentTarget.style.background = '#030303'}
                >
                  Confirm Purchase
                </div>
              </div>
            )}
            
            {isOrderConfirmed && (
              <div style={{ padding: '2rem' }}>
                <div 
                  onClick={() => { setSelectedProd(null); setIsOrderConfirmed(false); }}
                  style={{
                    padding: '1.2rem', border: '1.5px solid rgba(0,0,0,0.1)', color: 'rgba(0,0,0,0.4)',
                    textAlign: 'center', fontWeight: 700, fontSize: '11px', textTransform: 'uppercase',
                    letterSpacing: '0.1em', cursor: 'pointer', transition: 'all 0.2s'
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.05)'; e.currentTarget.style.color = '#030303'; }}
                >
                  Return to Collection
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Section 01: E-Commerce Split Dimension (Nike Inspired) */}
      <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'row', position: 'relative', overflow: 'hidden', background: 'white' }}>
        
        {/* Left: Brand Kinetic Red — animates to full width */}
        <div style={{
          background: '#ff2136',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '5rem',
          minHeight: '100vh',
          overflow: 'hidden',
          width: activeCategory !== null ? '100%' : '50%',
          transition: 'width 0.8s cubic-bezier(0.76, 0, 0.24, 1)',
          flexShrink: 0
        }}>
          
          {/* Sub-Nav Left Labels */}
          <div style={{ position: 'absolute', top: '2.5rem', right: '2.5rem', display: 'flex', alignItems: 'center', gap: '2rem', zIndex: 20, opacity: activeCategory === null ? 1 : 0, transition: 'opacity 0.3s ease', pointerEvents: activeCategory === null ? 'auto' : 'none' }}>
             {['Men', 'Women', 'Kids'].map(cat => (
               <span 
                 key={cat}
                 onClick={() => {
                   setActiveCategory(cat);
                   setActiveSubCategory(categoryProducts[cat][0]);
                 }}
                 style={{ 
                   fontSize: '15px', fontWeight: 600,
                   cursor: 'pointer', color: 'white',
                   borderBottom: activeCategory === cat ? '2px solid white' : '2px solid transparent',
                   paddingBottom: '4px', transition: 'all 0.3s ease'
                 }}
               >{cat}</span>
             ))}
          </div>

          {/* Shoe Image — fades out when category selected */}
          <div style={{ position: 'relative', width: '100%', aspectRatio: '1/1', maxWidth: '600px', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: activeCategory === null ? 1 : 0, transition: 'opacity 0.4s ease', pointerEvents: activeCategory === null ? 'auto' : 'none' }}>
             <div style={{ position: 'relative', width: '130%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: 'translateX(-10%)' }}>
                <img 
                  key={activeShoe}
                  src={shoes.find(s => s.id === activeShoe).src} 
                  alt={`Shoe ${activeShoe}`}
                  className="animate-shoe-enter"
                  style={{ width: '100%', height: '100%', objectFit: 'contain', filter: 'drop-shadow(0 35px 60px rgba(0,0,0,0.5))', userSelect: 'none', pointerEvents: 'none' }}
                  onDragStart={e => e.preventDefault()}
                />
             </div>
          </div>

          {/* Nav buttons — fades out when category selected */}
          <div style={{ position: 'absolute', bottom: '3rem', left: '3rem', display: 'flex', gap: '1rem', zIndex: 40, opacity: activeCategory === null ? 1 : 0, transition: 'opacity 0.3s ease', pointerEvents: activeCategory === null ? 'auto' : 'none' }}>
             <div onClick={handlePrev} style={{ cursor: 'pointer', width: '3rem', height: '3rem', borderRadius: '50%', border: '2px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.2)', backdropFilter: 'blur(12px)' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
             </div>
             <div onClick={handleNext} style={{ cursor: 'pointer', width: '3rem', height: '3rem', borderRadius: '50%', border: '2px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.2)', backdropFilter: 'blur(12px)' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
             </div>
          </div>

          {/* Coming Soon Content - fades in after red expands, fades out on exit */}
          <div style={{
            position: 'absolute', inset: 0, zIndex: 30,
            display: 'flex', flexDirection: 'column',
            alignItems: 'stretch', justifyContent: 'flex-start',
            opacity: activeCategory !== null && !isExiting ? 1 : 0,
            transition: isExiting ? 'opacity 0.18s ease' : 'opacity 0.5s ease 0.5s',
            pointerEvents: activeCategory !== null && !isExiting ? 'auto' : 'none'
          }}>
            {/* App Bar */}
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.5rem 2.5rem', background: 'white', borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
              {/* Left: Back/Home button */}
              <div
                onClick={handleBack}
                style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', padding: '8px 16px', borderRadius: '999px', border: '1.5px solid rgba(0,0,0,0.12)', background: 'rgba(0,0,0,0.03)', transition: 'all 0.3s ease' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#ff2136'; e.currentTarget.style.borderColor = '#ff2136'; e.currentTarget.querySelector('svg').style.stroke = 'white'; e.currentTarget.querySelector('span').style.color = 'white'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.03)'; e.currentTarget.style.borderColor = 'rgba(0,0,0,0.12)'; e.currentTarget.querySelector('svg').style.stroke = '#030303'; e.currentTarget.querySelector('span').style.color = '#030303'; }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#030303" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'stroke 0.3s ease' }}>
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                  <polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
              </div>
              {/* Center: Collection heading */}
              <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', textAlign: 'center' }}>
                <p style={{ fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', fontWeight: 700, color: 'rgba(0,0,0,0.4)', marginBottom: '2px' }}>Collection</p>
                <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#030303', letterSpacing: '0.05em', textTransform: 'uppercase' }}>{activeCategory}'s Edition</h3>
              </div>
              {/* Right: Cart icon */}
              <div style={{ width: '44px', height: '44px', borderRadius: '50%', border: '1.5px solid rgba(0,0,0,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', background: 'rgba(0,0,0,0.04)', transition: 'all 0.3s ease' }}
                onClick={() => setShowCart(true)}
                onMouseEnter={e => { e.currentTarget.style.background = '#ff2136'; e.currentTarget.style.borderColor = '#ff2136'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.04)'; e.currentTarget.style.borderColor = 'rgba(0,0,0,0.15)'; }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z" fill="#030303"/>
                  <path d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z" fill="#030303"/>
                  <path d="M1 1H5L7.68 14.39C7.77 14.85 8.02 15.26 8.39 15.56C8.75 15.85 9.21 16.01 9.68 16H19.4C19.87 16.01 20.33 15.85 20.69 15.56C21.06 15.26 21.31 14.85 21.4 14.39L23 6H6" stroke="#030303" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>

            {/* Product Sub-Navigation - Appears below App Bar */}
            <div style={{ 
              display: 'flex', justifyContent: 'center', gap: '12px', padding: '1.2rem',
              background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(5px)',
              borderBottom: '1px solid rgba(255,255,255,0.05)',
              overflowX: 'auto', whiteSpace: 'nowrap'
            }}>
              {activeCategory && categoryProducts[activeCategory].map((prod, idx) => (
                <div 
                  key={prod}
                  onClick={() => setActiveSubCategory(prev => prev === prod ? null : prod)}
                  style={{
                    padding: '8px 20px', borderRadius: '999px',
                    background: activeSubCategory === prod ? 'white' : 'rgba(255,255,255,0.1)', 
                    border: '1px solid rgba(255,255,255,0.15)',
                    color: activeSubCategory === prod ? '#ff2136' : 'white', 
                    fontSize: '11px', fontWeight: 700, letterSpacing: '0.05em',
                    textTransform: 'uppercase', cursor: 'pointer',
                    opacity: 0, animation: `fade-in-up 0.5s ease forwards ${0.3 + idx * 0.1}s`,
                    transition: 'all 0.2s ease'
                  }}
                >
                  {prod}
                </div>
              ))}
            </div>

            {/* Scrollable Gallery Content */}
            <div style={{ 
              flex: 1,
              height: 'calc(100vh - 170px)',
              overflowY: 'auto',
              overflowX: 'hidden',
              padding: '3rem',
              paddingBottom: '4rem',
              display: 'grid',
              gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
              gridAutoRows: 'max-content',
              columnGap: '2rem',
              rowGap: '2.5rem',
              alignItems: 'start',
              alignContent: 'start',
              overscrollBehaviorY: 'auto',
              boxSizing: 'border-box',
              marginTop: '1rem'
            }} className="custom-scrollbar">
              {activeCategory && dimensionProducts[activeCategory].map((prod, idx) => (
                <div 
                  key={prod.id}
                  style={{
                    background: 'white', borderRadius: '4px', overflow: 'hidden',
                    display: 'flex', flexDirection: 'column',
                    opacity: 0, animation: `fade-in-up 0.6s ease forwards ${0.4 + idx * 0.1}s`,
                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                    height: 'fit-content'
                  }}
                >
                  {/* Image Holder */}
                  <div style={{ width: '100%', aspectRatio: '1/1', background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
                    <img src={prod.img} alt={prod.name} style={{ width: '100%', objectFit: 'contain', filter: 'drop-shadow(0 15px 30px rgba(0,0,0,0.15))' }} />
                  </div>
                  {/* Card Info */}
                  <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <h4 style={{ color: '#030303', fontSize: '16px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.02em' }}>{prod.name}</h4>
                    <span style={{ color: '#ff2136', fontSize: '18px', fontWeight: 900 }}>{prod.price}</span>
                    <div 
                      style={{ 
                        marginTop: '1rem', padding: '12px', background: '#030303', color: 'white', 
                        textAlign: 'center', fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', 
                        letterSpacing: '0.2em', cursor: 'pointer', transition: 'all 0.3s cubic-bezier(0.76, 0, 0.24, 1)' 
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = '#ff2136';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 10px 20px rgba(255,33,54,0.3)';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = '#030303';
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProd(prod);
                      }}
                    >
                      Buy Now
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Product Showcase White — shrinks to 0 when category selected */}
        <div 
          style={{
            background: 'white',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            padding: '3rem 8rem',
            color: '#030303',
            width: activeCategory !== null ? '0%' : '50%',
            overflow: 'hidden',
            transition: 'width 0.8s cubic-bezier(0.76, 0, 0.24, 1)',
            flexShrink: 0,
            minHeight: '100vh'
          }}
        >
          {/* Sub-Nav Right Labels (Visible on White - High Contrast) */}
          <div className="absolute top-10 left-10 flex items-center gap-8 z-20">
             <span 
               onClick={() => setShowNewReleases(true)}
               className="text-[15px] font-semibold text-obsidian cursor-pointer hover:text-brand-red transition-all"
             >New Releases</span>
             <span 
               onClick={() => setShowCart(true)}
               className="text-[15px] font-semibold text-obsidian cursor-pointer hover:text-brand-red transition-all"
             >My Cart</span>
          </div>

          {/* Shopping Cart Icon Overlay */}
          <div 
            onClick={() => setShowCart(true)}
            className="absolute top-0 right-0 w-24 h-24 bg-black flex items-center justify-center cursor-pointer hover:bg-[#111] transition-colors z-20">
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z" fill="white"/>
                <path d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z" fill="white"/>
                <path d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
             </svg>
          </div>

          {/* Product Info */}
          <div className="max-w-md">
            <div className="flex items-center gap-4 mb-6 relative">
               <div className="w-12 h-[2px] bg-black shrink-0" />
               <h4 key={`sub-${activeShoe}`} className="text-sm font-bold text-brand-red tracking-tight animate-text-reveal" style={{ animationDelay: '0ms' }}>
                 {shoes.find(s => s.id === activeShoe).subtitle}
               </h4>
            </div>

            <h1 key={`title-${activeShoe}`} className="ecommerce-title mb-8 whitespace-pre-line animate-text-reveal" style={{ animationDelay: '100ms' }}>
              {shoes.find(s => s.id === activeShoe).title}
            </h1>

            <p key={`desc-${activeShoe}`} className="text-slate-600 font-medium leading-relaxed mb-12 animate-text-reveal" style={{ animationDelay: '200ms' }}>
              {shoes.find(s => s.id === activeShoe).desc}
            </p>

            <button 
              onClick={() => setShowNewReleases(true)}
              className="btn-brand shadow-[0_15px_40px_rgba(255,33,54,0.4)]"
            >
              Shop Now
            </button>
          </div>
        </div>

        {/* New Releases View */}
        {showNewReleases && (
          <div style={{
            position: 'absolute',
            inset: 0,
            zIndex: 60,
            background: 'white',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            opacity: isNBExiting ? 0 : 1,
            transform: `translateY(${isNBExiting ? '100%' : '0'})`,
            transition: 'all 0.6s cubic-bezier(0.76, 0, 0.24, 1)',
            animation: 'fade-in-up 0.6s cubic-bezier(0.76, 0, 0.24, 1) forwards'
          }}>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.5rem 2.5rem', background: '#ff2136', borderBottom: '1px solid rgba(255,255,255,0.1)', zIndex: 10 }}>
              <div
                onClick={() => {
                  setIsNBExiting(true);
                  setTimeout(() => { setShowNewReleases(false); setIsNBExiting(false); }, 600);
                }}
                style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', padding: '8px 16px', borderRadius: '999px', border: '1.5px solid rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.1)', transition: 'all 0.3s ease' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'white'; e.currentTarget.style.borderColor = 'white'; e.currentTarget.querySelector('svg').style.stroke = '#ff2136'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; e.currentTarget.querySelector('svg').style.stroke = 'white'; }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'stroke 0.3s ease' }}><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              </div>
              <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', textAlign: 'center' }}>
                <p style={{ fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', fontWeight: 800, color: 'rgba(255,255,255,0.7)', marginBottom: '2px' }}>Curated</p>
                <h3 style={{ fontSize: '18px', fontWeight: 900, color: 'white', letterSpacing: '0.05em', textTransform: 'uppercase' }}>New Releases</h3>
              </div>
              <div style={{ width: '44px', height: '44px', borderRadius: '50%', border: '1.5px solid rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', background: 'rgba(255,255,255,0.1)', transition: 'all 0.3s ease' }}
                onClick={() => setShowCart(true)}
                onMouseEnter={e => { e.currentTarget.style.background = 'white'; e.currentTarget.style.borderColor = 'white'; e.currentTarget.querySelector('svg').style.stroke = '#ff2136'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; e.currentTarget.querySelector('svg').style.stroke = 'white'; }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'stroke 0.3s ease' }}><path d="M1 1H5L7.68 14.39C7.77 14.85 8.02 15.26 8.39 15.56C8.75 15.85 9.21 16.01 9.68 16H19.4C19.87 16.01 20.33 15.85 20.69 15.56C21.06 15.26 21.31 14.85 21.4 14.39L23 6H6"/></svg>
              </div>
            </div>

            <div style={{
              flex: 1,
              height: 'calc(100vh - 96px)',
              overflowY: 'auto',
              overflowX: 'hidden',
              padding: '3rem',
              paddingBottom: '4rem',
              display: 'grid',
              gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
              gridAutoRows: 'max-content',
              columnGap: '2rem',
              rowGap: '2.5rem',
              alignItems: 'start',
              alignContent: 'start',
              overscrollBehaviorY: 'auto',
              boxSizing: 'border-box'
            }} className="custom-scrollbar">
              {newReleasesProducts.map((prod, idx) => (
                <div
                  key={prod.id}
                  style={{
                    background: 'white',
                    borderRadius: '4px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    opacity: 0,
                    animation: `fade-in-up 0.6s ease forwards ${0.2 + idx * 0.1}s`,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                    border: '1px solid rgba(0,0,0,0.05)',
                    height: 'fit-content'
                  }}
                >
                  <div style={{ width: '100%', aspectRatio: '1/1', background: '#f9f9f9', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
                    <img src={prod.img} alt={prod.name} style={{ width: '100%', objectFit: 'contain', filter: 'drop-shadow(0 15px 30px rgba(0,0,0,0.1))' }} />
                  </div>
                  <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <h4 style={{ color: '#030303', fontSize: '15px', fontWeight: 900, textTransform: 'uppercase' }}>{prod.name}</h4>
                    <span style={{ color: '#030303', fontSize: '18px', fontWeight: 900, opacity: 0.8 }}>{prod.price}</span>
                    <div
                      onClick={() => setSelectedProd(prod)}
                      style={{ 
                        marginTop: '1rem', padding: '12px', background: '#030303', color: 'white', 
                        textAlign: 'center', fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', 
                        letterSpacing: '0.2em', cursor: 'pointer', transition: 'all 0.3s cubic-bezier(0.76, 0, 0.24, 1)' 
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = '#ff2136';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 10px 20px rgba(255,33,54,0.3)';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = '#030303';
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >Buy Now</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {showCart && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 70,
              background: 'rgba(10,11,10,0.08)',
              backdropFilter: 'blur(4px)',
              opacity: isCartMounting && !isCartExiting ? 1 : 0,
              transition: 'opacity 0.5s ease',
              pointerEvents: isCartMounting && !isCartExiting ? 'auto' : 'none'
            }}
            onClick={() => {
              setIsCartExiting(true);
              setTimeout(() => {
                setShowCart(false);
                setIsCartExiting(false);
                setIsCartMounting(false);
                setIsCartCheckoutComplete(false);
              }, 650);
            }}
          >
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '70vh',
                background: 'white',
                borderTopLeftRadius: '32px',
                borderTopRightRadius: '32px',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                boxShadow: '0 -20px 40px rgba(0,0,0,0.1)',
                transform: isCartMounting && !isCartExiting ? 'translateY(0)' : 'translateY(100%)',
                transformOrigin: 'bottom',
                transition: 'transform 0.65s cubic-bezier(0.76, 0, 0.24, 1)'
              }}
              onClick={e => e.stopPropagation()}
            >
              <div style={{ padding: '2rem 2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                <div>
                  <p style={{ fontSize: '10px', color: '#ff2136', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.3em', marginBottom: '4px' }}>Shopping Archive</p>
                  <h3 style={{ fontSize: '24px', fontWeight: 900, color: '#030303', letterSpacing: '0.05em' }}>YOUR BAG</h3>
                </div>
                <div
                  onClick={() => {
                    setIsCartExiting(true);
                    setTimeout(() => {
                      setShowCart(false);
                      setIsCartExiting(false);
                      setIsCartMounting(false);
                      setIsCartCheckoutComplete(false);
                    }, 650);
                  }}
                  style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.3s' }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#ff2136'; e.currentTarget.querySelector('svg').style.stroke = 'white'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.05)'; e.currentTarget.querySelector('svg').style.stroke = '#030303'; }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#030303" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'stroke 0.3s' }}><path d="M18 6L6 18M6 6l12 12"/></svg>
                </div>
              </div>

              <div style={{ flex: 1, overflowY: 'auto', padding: '2rem 2.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'relative' }} className="custom-scrollbar">
                {isCartCheckoutComplete ? (
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', animation: 'fade-in-up 0.6s cubic-bezier(0.76, 0, 0.24, 1) forwards' }}>
                    <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#ff2136', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem', boxShadow: '0 15px 30px rgba(255,33,54,0.3)' }}>
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                    </div>
                    <h4 style={{ fontSize: '28px', fontWeight: 900, color: '#030303', textTransform: 'uppercase', marginBottom: '1rem' }}>Order Secured</h4>
                    <p style={{ color: 'rgba(0,0,0,0.5)', fontWeight: 600, maxWidth: '280px', lineHeight: 1.6, marginBottom: '3rem' }}>Your Nexlyte items have been reserved. Processing your kinetic signature now.</p>
                    <div
                      onClick={() => {
                        setIsCartExiting(true);
                        setTimeout(() => {
                          setShowCart(false);
                          setIsCartExiting(false);
                          setIsCartMounting(false);
                          setIsCartCheckoutComplete(false);
                        }, 650);
                      }}
                      style={{ padding: '1rem 2.5rem', background: '#030303', color: 'white', borderRadius: '999px', fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.2em', cursor: 'pointer', transition: 'all 0.3s' }}
                      onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                      onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                    >
                      Return to Collection
                    </div>
                  </div>
                ) : (
                  <>
                    {cartItems.map((item, idx) => (
                      <div
                        key={item.id}
                        style={{
                          display: 'flex', gap: '1.5rem', padding: '1.5rem', background: '#fdfdfd',
                          borderRadius: '16px', border: '1px solid rgba(0,0,0,0.05)',
                          opacity: 0, animation: `fade-in-up 0.5s ease forwards ${0.2 + idx * 0.1}s`,
                          boxShadow: '0 4px 15px rgba(0,0,0,0.02)'
                        }}
                      >
                        <div style={{ width: '100px', height: '100px', background: '#f9f9f9', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px', border: '1px solid rgba(0,0,0,0.03)' }}>
                          <img src={item.img} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'contain', filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.05))' }} />
                        </div>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                          <h4 style={{ color: '#030303', fontSize: '18px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '4px' }}>{item.name}</h4>
                          <p style={{ color: '#ff2136', fontSize: '16px', fontWeight: 900 }}>${item.price}</p>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '12px' }}>
                            <span style={{ color: 'rgba(0,0,0,0.4)', fontSize: '12px', fontWeight: 700 }}>QTY:</span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                              <button onClick={() => {
                                const newItems = [...cartItems];
                                if (newItems[idx].quantity > 1) newItems[idx].quantity -= 1;
                                setCartItems(newItems);
                              }} style={{ color: '#030303', background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer', opacity: 0.5 }}>-</button>
                              <span style={{ color: '#030303', fontWeight: 900 }}>{item.quantity}</span>
                              <button onClick={() => {
                                const newItems = [...cartItems];
                                newItems[idx].quantity += 1;
                                setCartItems(newItems);
                              }} style={{ color: '#030303', background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer', opacity: 0.5 }}>+</button>
                            </div>
                          </div>
                        </div>
                        <div
                          onClick={() => setCartItems(prev => prev.filter(p => p.id !== item.id))}
                          style={{ cursor: 'pointer', alignSelf: 'center', opacity: 0.2, transition: 'all 0.2s' }}
                          onMouseEnter={e => { e.currentTarget.style.opacity = 1; e.currentTarget.style.color = '#ff2136'; }}
                          onMouseLeave={e => { e.currentTarget.style.opacity = 0.2; e.currentTarget.style.color = 'inherit'; }}
                        >
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                        </div>
                      </div>
                    ))}
                    {cartItems.length === 0 && (
                      <div style={{ padding: '4rem 0', textAlign: 'center' }}>
                        <p style={{ color: 'rgba(0,0,0,0.2)', fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em' }}>Your archive is empty.</p>
                      </div>
                    )}
                  </>
                )}
              </div>

              {!isCartCheckoutComplete && (
                <div style={{ padding: '2rem 2.5rem', background: 'white', borderTop: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 -10px 30px rgba(0,0,0,0.02)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', alignItems: 'baseline' }}>
                    <span style={{ color: 'rgba(0,0,0,0.4)', fontWeight: 700, fontSize: '14px' }}>SUBTOTAL</span>
                    <span style={{ color: '#030303', fontWeight: 900, fontSize: '28px' }}>
                      ${cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0)}
                    </span>
                  </div>
                  <div
                    onClick={() => setIsCartCheckoutComplete(true)}
                    style={{
                      width: '100%', padding: '1.5rem', background: '#ff2136', color: 'white',
                      textAlign: 'center', fontWeight: 900, fontSize: '13px', textTransform: 'uppercase',
                      letterSpacing: '0.3em', borderRadius: '12px', cursor: 'pointer', transition: 'all 0.3s',
                      boxShadow: '0 10px 30px rgba(255,33,54,0.3)'
                    }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                  >
                    Checkout Now
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Scroll Indicator Overlay */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-4 opacity-20 hover:opacity-100 transition-opacity cursor-pointer">
           <div className="w-[1px] h-12 bg-black" />
        </div>
      </section>

      {/* Section 02: Snap Master (Photography Dimension) */}
      <section style={{ 
        minHeight: '100vh', 
        background: '#0a0b0a', 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center', 
        justifyContent: 'flex-start', 
        padding: '1.2rem',
        paddingBottom: '2rem',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Main Lime Green Snap Card */}
        <div style={{
          width: '100%',
          height: 'calc(100vh - 9rem)',
          background: '#d9f43a',
          borderRadius: '80px',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '4rem 4rem 0 4rem',
          border: '4px solid #0a0b0a',
          transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)',
          opacity: (isAboutActive || isWorksActive || isGalleryActive || isContactActive) ? 0 : 1,
          transform: (isAboutActive || isWorksActive || isGalleryActive || isContactActive) ? 'scale(1.2) translateY(-40px)' : 'scale(1) translateY(0)',
          pointerEvents: (isAboutActive || isWorksActive || isGalleryActive || isContactActive) ? 'none' : 'auto'
        }}>
          {/* Background Branding Overlay */}
          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            opacity: 0.04,
            pointerEvents: 'none',
            zIndex: 1
          }}>
            {Array.from({ length: 3 }).map((_, i) => (
              <h1 key={i} style={{ 
                fontSize: '25vw', 
                fontWeight: 900, 
                color: 'black', 
                lineHeight: 0.8,
                letterSpacing: '-0.05em',
                whiteSpace: 'nowrap'
              }}>SNAP MASTER</h1>
            ))}
          </div>

          {/* Primary Logo Header */}
          <h1 style={{
            position: 'absolute',
            top: '80px',
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: 'min(18vw, 240px)',
            fontWeight: 900,
            color: '#1a1c1a',
            textTransform: 'uppercase',
            lineHeight: 0.8,
            letterSpacing: '-0.05em',
            zIndex: 2,
            textAlign: 'center',
            whiteSpace: 'nowrap'
          }}>SNAP MASTER</h1>

          {/* Central Ghost Portrait Stack */}
          <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', zIndex: 10 }}>
            {/* Ghost Layer 02 */}
            <img 
              src="/snap_master.png"
              alt="Ghost 2"
              style={{ position: 'absolute', height: '95%', transform: 'translateX(-45px) translateY(-5px) skew(-2deg)', opacity: 0.1, filter: 'grayscale(1) contrast(1.2)' }}
            />
            {/* Ghost Layer 01 */}
            <img 
              src="/snap_master.png"
              alt="Ghost 1"
              style={{ position: 'absolute', height: '95%', transform: 'translateX(-22px) translateY(-2px) skew(-1deg)', opacity: 0.25, filter: 'grayscale(0.5)' }}
            />
            {/* Main Subject */}
            <img 
              src="/snap_master.png" 
              alt="Snap Master Focal" 
              style={{ position: 'relative', height: '95%', objectFit: 'contain', zIndex: 15 }}
            />
          </div>

          {/* Editorial Text - Left */}
          <div style={{ position: 'absolute', top: '48%', left: '5rem', maxWidth: '300px', zIndex: 20 }}>
            <p style={{ fontSize: '20px', fontWeight: 600, color: '#1a1c1a', lineHeight: 1.3, marginBottom: '2.5rem', letterSpacing: '-0.02em' }}>
              What makes my photography unique is the combination of technical expertise and a personal touch
            </p>
            {/* Social Icons Stack */}
            <div style={{ display: 'flex', gap: '15px' }}>
              {['ig', 'li', 'x'].map(social => (
                <div 
                  key={social} 
                  onClick={() => {
                    const platformLinks = {
                      'ig': 'https://instagram.com',
                      'li': 'https://linkedin.com',
                      'x': 'https://x.com'
                    };
                    window.open(platformLinks[social], '_blank', 'noopener,noreferrer');
                  }}
                  style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#1a1c1a', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'transform 0.3s' }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                >
                   {social === 'ig' && <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z M17.5 6.5h.01"/></svg>}
                   {social === 'li' && <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>}
                   {social === 'x' && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M4 4l11.733 16h4.267l-11.733-16z M4 20l6.768-6.768 M13.232 10.768L20 4"/></svg>}
                </div>
              ))}
            </div>
          </div>

          {/* Editorial Text - Right */}
          <div style={{ position: 'absolute', bottom: '22%', right: '5rem', maxWidth: '340px', zIndex: 20, textAlign: 'right' }}>
            <p style={{ fontSize: '20px', fontWeight: 600, color: '#1a1c1a', lineHeight: 1.3, marginBottom: '2.5rem', letterSpacing: '-0.02em' }}>
              Immerse yourself in a world where each frame tells a tale, capturing the beauty of the ordinary and the extraordinary
            </p>
            {/* Scroll Indicator / Booking Trigger */}
            <div 
              style={{ 
                marginLeft: 'auto', 
                width: isBookHovered ? '240px' : '56px', 
                height: '56px', 
                borderRadius: '30px', 
                background: '#1a1c1a', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                cursor: 'pointer', 
                transition: 'all 0.5s cubic-bezier(0.76, 0, 0.24, 1)',
                padding: isBookHovered ? '0 25px' : '0',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                position: 'relative'
              }}
              onMouseEnter={() => setIsBookHovered(true)}
              onMouseLeave={() => setIsBookHovered(false)}
              onClick={() => setIsBookingModalOpen(true)}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: isBookHovered ? '15px' : '0px', width: '100%' }}>
                <div style={{ position: 'relative', width: '24px', height: '24px', flexShrink: 0 }}>
                  {/* Default Icon (Down Arrow) */}
                  <svg 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="white" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    style={{ 
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      transition: 'all 0.4s cubic-bezier(0.76, 0, 0.24, 1)', 
                      opacity: isBookHovered ? 0 : 1,
                      transform: isBookHovered ? 'scale(0) rotate(-90deg)' : 'scale(1) rotate(0deg)'
                    }}
                  >
                    <path d="M12 5v14"/>
                    <path d="M7 14l5 5 5-5"/>
                  </svg>
                  {/* Expanded Icon (Arrow) */}
                  <svg 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="white" 
                    strokeWidth="3" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    style={{ 
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      transition: 'all 0.5s cubic-bezier(0.76, 0, 0.24, 1)', 
                      opacity: isBookHovered ? 1 : 0,
                      transform: isBookHovered ? 'scale(1) rotate(-90deg)' : 'scale(0) rotate(0deg)'
                    }}
                  >
                    <path d="M7 13l5 5 5-5M12 6v12"/>
                  </svg>
                </div>
                <span style={{ 
                  color: 'white', 
                  fontSize: '14px', 
                  fontWeight: 900, 
                  letterSpacing: '0.15em', 
                  textTransform: 'uppercase',
                  width: isBookHovered ? '140px' : '0px',
                  overflow: 'hidden',
                  opacity: isBookHovered ? 1 : 0,
                  transform: isBookHovered ? 'translateX(0)' : 'translateX(20px)',
                  transition: 'all 0.4s cubic-bezier(0.76, 0, 0.24, 1) 0.1s',
                  pointerEvents: 'none'
                }}>
                  Book Your Date
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Integrated Navigation Footer (Relocated outside to Charcoal Area) */}
        <div style={{ 
          marginTop: '2.3rem',
          display: 'flex', 
          gap: '80px', 
          zIndex: 20,
          opacity: (isAboutActive || isWorksActive || isGalleryActive || isContactActive) ? 0 : 1,
          pointerEvents: (isAboutActive || isWorksActive || isGalleryActive || isContactActive) ? 'none' : 'auto',
          transition: 'all 0.6s ease'
        }}>
          {['About', 'Works', 'Gallery', 'Contact'].map(link => (
            <span key={link} style={{ 
              fontSize: '15px', 
              fontWeight: 700, 
              color: '#d9f43a', 
              cursor: 'pointer', 
              opacity: 0.6, 
              textTransform: 'uppercase', 
              letterSpacing: '0.1em',
              transition: 'opacity 0.3s'
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = 1}
            onMouseLeave={e => e.currentTarget.style.opacity = 0.6}
            onClick={() => {
              if (link === 'About') {
                setIsAboutTransitioning(true);
                setTimeout(() => setIsAboutActive(true), 100);
              } else if (link === 'Works') {
                setIsWorksTransitioning(true);
                setTimeout(() => setIsWorksActive(true), 100);
              } else if (link === 'Gallery') {
                setIsGalleryTransitioning(true);
                setTimeout(() => setIsGalleryActive(true), 100);
              } else if (link === 'Contact') {
                setIsContactTransitioning(true);
                setTimeout(() => setIsContactActive(true), 100);
              }
            }}
            >
              {link}
            </span>
          ))}
        </div>
      </section>

      {/* Snap Master: About Dimension Narrative Overlay */}
      {isAboutActive && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 500,
          background: '#0a0b0a',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '10vw',
          animation: 'fade-in 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards'
        }}>
          {/* Subtle Watermark BG */}
          <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', opacity: 0.03, pointerEvents: 'none' }}>
             <h1 style={{ fontSize: '40vw', fontWeight: 900, whiteSpace: 'nowrap', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>ABOUT</h1>
          </div>

          <div 
            onClick={() => {
              setIsAboutActive(false);
              setIsAboutTransitioning(false);
            }}
            style={{ 
              position: 'absolute',
              top: '6rem',
              left: '6rem',
              display: 'flex', 
              alignItems: 'center', 
              gap: '15px', 
              color: '#d9f43a', 
              padding: '15px 30px',
              borderRadius: '100px',
              border: '1px solid #d9f43a',
              fontSize: '12px', 
              fontWeight: 900, 
              textTransform: 'uppercase', 
              letterSpacing: '0.2em', 
              cursor: 'pointer',
              zIndex: 100,
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#d9f43a';
              e.currentTarget.style.color = '#0a0b0a';
              e.currentTarget.style.transform = 'translateY(-3px)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#d9f43a';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            <span>Return to Portfolio</span>
          </div>

          <div style={{ position: 'relative', zIndex: 10, maxWidth: '1400px', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
               <div style={{ width: '40px', height: '1px', background: '#d9f43a' }}></div>
               <span style={{ color: '#d9f43a', fontSize: '13px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.5em' }}>Philosophy</span>
            </div>
            
            <h2 style={{ fontSize: 'max(4vw, 52px)', fontWeight: 900, lineHeight: 0.95, letterSpacing: '-0.04em', color: 'white', maxWidth: '800px' }}>
              CAPTURING THE <span style={{ color: '#d9f43a' }}>SILENCE</span> BETWEEN THE FRAMES.
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', marginTop: '2rem' }}>
               <p style={{ fontSize: '18px', color: 'white', opacity: 0.6, lineHeight: 1.6, fontWeight: 500 }}>
                 I believe that photography is more than just a visual record. It is a cinematic preservation of emotion. Every project is a unique synchronization of technical mastery and an instinctual touch. I don't just take photos; I curate moments that tell a timeless narrative.
               </p>
               <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                 <p style={{ fontSize: '18px', color: 'white', opacity: 0.6, lineHeight: 1.6, fontWeight: 500 }}>
                   From editorial fashion to minimalist architecture, my focus remains constant: the interplay of shadow and light. Based in Dimension 01, working globally to synchronize vision with reality.
                 </p>
               </div>
            </div>
          </div>
        </div>
      )}

      {/* Snap Master: Works Dimension Showcase Overlay */}
      {isWorksActive && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 500,
          background: '#0a0b0a',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '6vw',
          animation: 'fade-in 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards'
        }}>
          {/* Subtle Watermark BG */}
          <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', opacity: 0.03, pointerEvents: 'none' }}>
             <h1 style={{ fontSize: '30vw', fontWeight: 900, whiteSpace: 'nowrap', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>SELECTED</h1>
          </div>

          {/* Return Button (Matching About View) */}
          <div 
            onClick={() => {
              setIsWorksActive(false);
              setIsWorksTransitioning(false);
            }}
            style={{ 
              position: 'absolute',
              top: '4rem',
              left: '4rem',
              display: 'flex', 
              alignItems: 'center', 
              gap: '15px', 
              color: '#0a0b0a', 
              background: '#d9f43a',
              padding: '15px 30px',
              borderRadius: '100px',
              border: '1px solid #d9f43a',
              fontSize: '12px', 
              fontWeight: 900, 
              textTransform: 'uppercase', 
              letterSpacing: '0.2em', 
              cursor: 'pointer',
              zIndex: 100,
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#d9f43a';
              e.currentTarget.style.transform = 'translateY(-3px)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = '#d9f43a';
              e.currentTarget.style.color = '#0a0b0a';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            <span>Return to Portfolio</span>
          </div>

          <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '1400px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1.5rem', marginBottom: '5rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                <span style={{ color: '#d9f43a', fontSize: '13px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.5em' }}>Collection 01</span>
                <h2 style={{ fontSize: 'max(4vw, 58px)', fontWeight: 900, lineHeight: 1, letterSpacing: '-0.04em', color: 'white' }}>FEATURED <span style={{ color: '#d9f43a' }}>WORKS</span></h2>
              </div>
              <div style={{ opacity: 0.3, color: 'white', fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.3em' }}>
                Editorial / Architecture / Motion
              </div>
            </div>

            <div style={{ 
              display: 'flex', 
              gap: '2rem',
              width: '100%',
              height: 'auto',
              alignItems: 'stretch'
            }}>
              {[
                { title: 'MONO ARCH.', year: '2024', cat: 'Minimalism', img: 'work1.png' },
                { title: 'VOGUE 88', year: '2023', cat: 'Editorial', img: 'work2.png' },
                { title: 'SILENT WAVE', year: '2024', cat: 'Motion', img: 'work3.png' },
                { title: 'THE ORCHID', year: '2022', cat: 'Fine Art', img: 'work4.png' }
              ].map((work, idx) => {
                const isExpanded = expandedWorkId === idx;
                const isLoaded = imagesReady[work.img];

                return (
                  <div 
                    key={idx}
                    onClick={() => setExpandedWorkId(isExpanded ? null : idx)}
                    style={{ 
                      flex: isExpanded ? 3.5 : 0.8,
                      height: '500px',
                      backgroundImage: isLoaded ? `linear-gradient(to bottom, rgba(0,0,0,${isExpanded ? 0.15 : 0.3}), rgba(0,0,0,${isExpanded ? 0.3 : 0.85})), url('/${work.img}')` : 'none',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundColor: 'rgba(255,255,255,0.02)',
                      borderRadius: '32px', 
                      border: `1px solid ${isExpanded ? '#d9f43a' : 'rgba(255,255,255,0.05)'}`,
                      padding: '2.5rem',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-end',
                      alignItems: isLoaded ? 'stretch' : 'center',
                      gap: '1rem',
                      cursor: 'pointer',
                      transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
                      position: 'relative',
                      overflow: 'hidden',
                      boxShadow: isExpanded ? '0 40px 80px rgba(0,0,0,0.6)' : 'none'
                    }}
                  >
                    {!isLoaded && (
                      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                         <div className="loading-ring"></div>
                         <span style={{ fontSize: '10px', fontWeight: 900, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.2em' }}>Fetching...</span>
                      </div>
                    )}
                    
                    {isLoaded && (
                      <div style={{ animation: 'fade-in 0.4s ease-out forwards' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', opacity: 0.8, transform: isExpanded ? 'translateY(0)' : 'translateY(-10px)', transition: 'transform 0.4s 0.2s' }}>
                           <span style={{ fontSize: '11px', fontWeight: 900, color: '#d9f43a' }}>{work.year}</span>
                           <span style={{ fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', color: 'white' }}>{work.cat}</span>
                        </div>
                        <h3 style={{ 
                          fontSize: isExpanded ? '36px' : '20px', 
                          fontWeight: 900, 
                          letterSpacing: '-0.02em', 
                          color: 'white',
                          transition: 'font-size 0.5s cubic-bezier(0.16, 1, 0.3, 1)' 
                        }}>
                          {work.title}
                        </h3>
                        <div style={{ 
                          width: isExpanded ? '60px' : '30px', 
                          height: '2px', 
                          background: '#d9f43a', 
                          marginTop: '5px',
                          transition: 'width 0.5s'
                        }}></div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Snap Master: GALLERY Dimension Showcase Overlay */}
      {isGalleryActive && (
        <div 
          className="custom-scrollbar"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 500,
            background: '#0a0b0a',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            padding: '10rem 6vw 6vw 6vw',
            overflowY: 'auto',
            animation: 'fade-in 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards'
          }}
        >
          {/* Subtle Watermark BG */}
          <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', opacity: 0.03, pointerEvents: 'none' }}>
             <h1 style={{ fontSize: '30vw', fontWeight: 900, whiteSpace: 'nowrap', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>GALLERY</h1>
          </div>

          {/* Return Button */}
          <div 
            onClick={() => {
              setIsGalleryActive(false);
              setIsGalleryTransitioning(false);
            }}
            style={{ 
              position: 'absolute',
              top: '4rem',
              left: '4rem',
              display: 'flex', 
              alignItems: 'center', 
              gap: '15px', 
              color: '#0a0b0a', 
              background: '#d9f43a',
              padding: '15px 30px',
              borderRadius: '100px',
              border: '1px solid #d9f43a',
              fontSize: '12px', 
              fontWeight: 900, 
              textTransform: 'uppercase', 
              letterSpacing: '0.2em', 
              cursor: 'pointer',
              zIndex: 100,
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#d9f43a';
              e.currentTarget.style.transform = 'translateY(-3px)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = '#d9f43a';
              e.currentTarget.style.color = '#0a0b0a';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            <span>Return to Portfolio</span>
          </div>

          <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '1400px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1.5rem', marginBottom: '4rem' }}>
                <span style={{ color: '#d9f43a', fontSize: '13px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.5em' }}>Visual Artifacts</span>
                <h2 style={{ fontSize: 'max(4vw, 58px)', fontWeight: 900, lineHeight: 1, letterSpacing: '-0.04em', color: 'white' }}>EDITORIAL <span style={{ color: '#d9f43a' }}>GALLERY</span></h2>
            </div>

            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(4, 1fr)', 
              gap: '1.5rem',
              width: '100%' 
            }}>
              {['gal1.png', 'gal2.png', 'gal3.png', 'gal4.png', 'gal5.png', 'gal6.png', 'gal7.png', 'gal8.png'].map((img, idx) => {
                const isLoaded = imagesReady[img];
                return (
                  <div 
                    key={idx}
                    style={{ 
                      aspectRatio: '3/4', 
                      background: 'rgba(255,255,255,0.02)', 
                      backgroundImage: isLoaded ? `url('/${img}')` : 'none',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      borderRadius: '16px', 
                      border: '1px solid rgba(255,255,255,0.05)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.transform = 'scale(1.1) translateY(-10px)';
                      e.currentTarget.style.borderColor = '#d9f43a';
                      e.currentTarget.style.zIndex = 10;
                      e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.5)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.transform = 'scale(1) translateY(0)';
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
                      e.currentTarget.style.zIndex = 1;
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    {!isLoaded && <div className="loading-ring"></div>}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Snap Master: CONTACT Dimension Engagement Overlay */}
      {isContactActive && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 500,
          background: '#0a0b0a',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '6vw',
          animation: 'fade-in 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards'
        }}>
          {/* Subtle Watermark BG */}
          <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', opacity: 0.03, pointerEvents: 'none' }}>
             <h1 style={{ fontSize: '30vw', fontWeight: 900, whiteSpace: 'nowrap', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>TALK</h1>
          </div>

          {/* Return Button */}
          <div 
            onClick={() => {
              setIsContactActive(false);
              setIsContactTransitioning(false);
            }}
            style={{ 
              position: 'absolute',
              top: '4rem',
              left: '4rem',
              display: 'flex', 
              alignItems: 'center', 
              gap: '15px', 
              color: '#0a0b0a', 
              background: '#d9f43a',
              padding: '15px 30px',
              borderRadius: '100px',
              border: '1px solid #d9f43a',
              fontSize: '12px', 
              fontWeight: 900, 
              textTransform: 'uppercase', 
              letterSpacing: '0.2em', 
              cursor: 'pointer',
              zIndex: 100,
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#d9f43a';
              e.currentTarget.style.transform = 'translateY(-3px)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = '#d9f43a';
              e.currentTarget.style.color = '#0a0b0a';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            <span>Return to Portfolio</span>
          </div>

          <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '1400px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8rem', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                   <span style={{ color: '#d9f43a', fontSize: '13px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.5em' }}>GET IN TOUCH</span>
                   <h2 style={{ fontSize: 'max(6vw, 84px)', fontWeight: 900, lineHeight: 0.9, letterSpacing: '-0.05em', color: 'white' }}>LET'S <br/><span style={{ color: '#d9f43a' }}>TALK.</span></h2>
                </div>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '18px', lineHeight: 1.6, maxWidth: '400px' }}>
                  Whether you're starting a new brand or need high-end architectural visuals, I'm here to bring your vision to absolute life.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                   <a href="mailto:hello@snapmaster.com" style={{ fontSize: '28px', color: 'white', fontWeight: 700, textDecoration: 'none' }}>hello@snapmaster.com</a>
                   <span style={{ color: '#d9f43a', fontWeight: 900, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.2em' }}>Available for Commission / worldwide</span>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
               {[
                 { 
                   name: 'INSTAGRAM', 
                   link: '@snapmaster_pro', 
                   url: 'https://instagram.com',
                   icon: (
                     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d9f43a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                       <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                       <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                       <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                     </svg>
                   )
                 },
                 { 
                   name: 'BEHANCE', 
                   link: 'snap_creative', 
                   url: 'https://behance.net',
                   icon: (
                     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d9f43a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                       <path d="M9 12a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"></path>
                       <path d="M15 12a2 2 0 1 0 4 0 2 2 0 0 0-4 0z"></path>
                       <path d="M9 12v6"></path>
                       <path d="M15 12v6"></path>
                       <path d="M5 8h14"></path>
                     </svg>
                   )
                 },
                 { 
                   name: 'DRIBBBLE', 
                   link: 'master_shots', 
                   url: 'https://dribbble.com',
                   icon: (
                     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d9f43a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                       <circle cx="12" cy="12" r="10"></circle>
                       <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.13 5.49m15.01 8.6c-4.38-1.53-11.11-.81-16.22 3.39"></path>
                     </svg>
                   )
                 },
                 { 
                   name: 'TWITTER', 
                   link: '@snap_master', 
                   url: 'https://twitter.com',
                   icon: (
                     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d9f43a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                       <path d="M4 4l11.733 16h4.267l-11.733 -16z"></path>
                       <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"></path>
                     </svg>
                   )
                 }
               ].map((social, idx) => (
                 <div key={idx} 
                 onClick={() => window.open(social.url, '_blank')}
                 style={{ 
                   background: 'rgba(255,255,255,0.02)', 
                   border: '1px solid rgba(255,255,255,0.05)', 
                   padding: '2.5rem', 
                   borderRadius: '24px',
                   display: 'flex',
                   flexDirection: 'column',
                   gap: '15px',
                   cursor: 'pointer',
                   transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                 }}
                 onMouseEnter={e => {
                   e.currentTarget.style.background = 'rgba(217, 244, 58, 0.05)';
                   e.currentTarget.style.borderColor = '#d9f43a';
                   e.currentTarget.style.transform = 'translateY(-5px)';
                 }}
                 onMouseLeave={e => {
                   e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
                   e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
                   e.currentTarget.style.transform = 'translateY(0)';
                 }}
                 >
                   <div style={{ height: '24px' }}>{social.icon}</div>
                   <div>
                     <div style={{ fontSize: '11px', fontWeight: 900, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em' }}>{social.name}</div>
                     <div style={{ fontSize: '16px', fontWeight: 700, color: 'white', marginTop: '5px' }}>{social.link}</div>
                   </div>
                 </div>
               ))}
            </div>
          </div>
        </div>
      )}

      {/* Section 03: Admin Dashboard Dimension */}
      <section style={{
        minHeight: '100vh',
        background: '#070816',
        position: 'relative',
        overflow: 'hidden',
        padding: '1rem',
        boxSizing: 'border-box',
        display: 'none'
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 20% 20%, rgba(74,95,255,0.16), transparent 30%), radial-gradient(circle at 80% 30%, rgba(92,57,255,0.16), transparent 28%), linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0))',
          pointerEvents: 'none'
        }} />

        <div style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: '1480px',
          margin: '0 auto',
          height: 'calc(100vh - 2rem)',
          background: '#11131f',
          borderRadius: '28px',
          border: '1px solid rgba(255,255,255,0.06)',
          padding: '1rem',
          display: 'grid',
          gridTemplateColumns: '210px 1fr',
          gap: '1rem',
          boxShadow: '0 30px 80px rgba(0,0,0,0.38)',
          overflow: 'hidden'
        }}>
          <aside style={{
            background: '#0c0e19',
            borderRadius: '24px',
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            border: '1px solid rgba(255,255,255,0.04)',
            overflow: 'hidden'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem 0.25rem' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #4f67ff, #7a56ff)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 10px 24px rgba(79,103,255,0.35)'
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M6 12h12M12 6v12"/><circle cx="12" cy="12" r="9" strokeOpacity="0.35"/></svg>
              </div>
              <div>
                <div style={{ color: 'white', fontSize: '14px', fontWeight: 800 }}>Pulse Grid</div>
                <div style={{ color: 'rgba(255,255,255,0.38)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Admin Core</div>
              </div>
            </div>

            <div style={{
              background: '#171927',
              borderRadius: '20px',
              padding: '1rem',
              border: '1px solid rgba(255,255,255,0.05)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #ff9d6c, #ffd56b)'
                  }} />
                  <div>
                    <div style={{ color: 'rgba(255,255,255,0.48)', fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.14em' }}>Today</div>
                    <div style={{ color: 'white', fontSize: '11px', fontWeight: 700 }}>Sunday, April 5</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
                </div>
              </div>
              <div style={{ color: 'white', fontSize: '14px', fontWeight: 800, lineHeight: 1.35 }}>
                Welcome back,
                <br />
                Operator.
              </div>
            </div>

            <div style={{
              background: '#171927',
              borderRadius: '20px',
              padding: '0.75rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.35rem',
              border: '1px solid rgba(255,255,255,0.05)',
              flex: 1,
              minHeight: 0
            }}>
              {['Command Center', 'Signal AI', 'Workflows', 'Activity', 'Analytics', 'Assets', 'Vault', 'Configs'].map((item, idx) => (
                <div key={item} style={{
                  padding: '0.85rem 0.9rem',
                  borderRadius: '14px',
                  background: idx === 0 ? 'rgba(255,255,255,0.08)' : 'transparent',
                  color: idx === 0 ? 'white' : 'rgba(255,255,255,0.58)',
                  fontSize: '13px',
                  fontWeight: 700
                }}>
                  {item}
                </div>
              ))}
            </div>

            <div style={{
              marginTop: 'auto',
              background: 'linear-gradient(135deg, #2f49ff, #5b74ff)',
              borderRadius: '18px',
              padding: '0.9rem',
              color: 'white',
              boxShadow: '0 16px 34px rgba(47,73,255,0.35)'
            }}>
              <div style={{ fontSize: '12px', fontWeight: 900, marginBottom: '0.35rem' }}>Live Sync Layer</div>
              <div style={{ fontSize: '11px', opacity: 0.8, lineHeight: 1.45 }}>Upgrade your control stack with adaptive widgets and auto-routing.</div>
            </div>
          </aside>

          <div style={{
            background: '#171927',
            borderRadius: '24px',
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            border: '1px solid rgba(255,255,255,0.04)',
            overflow: 'hidden',
            minHeight: 0
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
              <div style={{
                padding: '0.9rem 1rem',
                background: '#232635',
                borderRadius: '14px',
                color: 'white',
                fontSize: '13px',
                fontWeight: 700
              }}>
                This Cycle
              </div>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <div style={{
                  padding: '0.9rem 1rem',
                  background: '#232635',
                  borderRadius: '14px',
                  color: 'rgba(255,255,255,0.78)',
                  fontSize: '13px',
                  fontWeight: 700
                }}>
                  Arrange Panels
                </div>
                <div style={{
                  padding: '0.9rem 1rem',
                  background: 'linear-gradient(135deg, #4d69ff, #6679ff)',
                  borderRadius: '14px',
                  color: 'white',
                  fontSize: '13px',
                  fontWeight: 800,
                  boxShadow: '0 14px 30px rgba(77,105,255,0.3)'
                }}>
                  Add Module
                </div>
              </div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1.18fr 0.88fr 0.82fr',
              gap: '1rem',
              minHeight: '250px'
            }}>
              <div style={{
                minHeight: '260px',
                borderRadius: '24px',
                padding: '1.25rem',
                background: 'radial-gradient(circle at 50% 50%, rgba(85,106,255,0.7), rgba(26,27,47,0.35) 38%, #0f1020 80%)',
                position: 'relative',
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.04)'
              }}>
                <div style={{ color: 'white', fontSize: '14px', fontWeight: 800 }}>Smart Pulse</div>
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
                  backgroundSize: '22px 22px',
                  opacity: 0.5
                }} />
                <div style={{ position: 'absolute', left: '1.25rem', bottom: '1.25rem', zIndex: 2 }}>
                  <div style={{ display: 'flex', gap: '0.45rem', marginBottom: '1rem' }}>
                    {[0, 1, 2, 3].map((dot) => (
                      <div key={dot} style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'rgba(255,255,255,0.9)' }} />
                    ))}
                  </div>
                  <div style={{ color: 'white', fontSize: '15px', fontWeight: 800, lineHeight: 1.35, maxWidth: '250px' }}>
                    Active workflow momentum climbed by 18% across your live queues.
                  </div>
                </div>
              </div>

              <div style={{
                minHeight: '260px',
                borderRadius: '24px',
                padding: '1.25rem',
                background: '#0f1120',
                border: '1px solid rgba(255,255,255,0.04)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{ color: 'white', fontSize: '14px', fontWeight: 800, marginBottom: '1rem' }}>System Overview</div>
                  <div style={{ color: 'white', fontSize: '34px', fontWeight: 900, marginBottom: '0.45rem' }}>84.2%</div>
                  <div style={{ color: '#38d7b2', fontSize: '12px', fontWeight: 800 }}>+12% from previous cycle</div>
                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                    {['32 active', '7 segments'].map((tag) => (
                      <div key={tag} style={{ padding: '0.45rem 0.7rem', background: '#232635', borderRadius: '999px', color: 'rgba(255,255,255,0.72)', fontSize: '11px', fontWeight: 700 }}>
                        {tag}
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{
                  height: '74px',
                  borderRadius: '16px',
                  background: 'linear-gradient(180deg, rgba(83,103,255,0.14), rgba(83,103,255,0.02))',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <svg viewBox="0 0 240 80" style={{ width: '100%', height: '100%' }}>
                    <path d="M0 58 C40 60, 60 28, 95 34 S150 70, 188 42 S228 24, 240 30" fill="none" stroke="#4e6bff" strokeWidth="4" strokeLinecap="round" />
                  </svg>
                </div>
              </div>

              <div style={{
                minHeight: '260px',
                borderRadius: '24px',
                padding: '1.25rem',
                background: '#0f1120',
                border: '1px solid rgba(255,255,255,0.04)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}>
                <div style={{ color: 'white', fontSize: '14px', fontWeight: 800 }}>Capacity Ring</div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                  <div style={{
                    width: '170px',
                    height: '170px',
                    borderRadius: '50%',
                    background: 'conic-gradient(#3d61ff 0 234deg, rgba(255,255,255,0.24) 234deg 360deg)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <div style={{
                      width: '118px',
                      height: '118px',
                      borderRadius: '50%',
                      background: '#0f1120',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white'
                    }}>
                      <div style={{ fontSize: '12px', opacity: 0.5 }}>Usage</div>
                      <div style={{ fontSize: '30px', fontWeight: 900 }}>65%</div>
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', color: 'rgba(255,255,255,0.6)', fontSize: '11px', fontWeight: 700 }}>
                  <span>Current load</span>
                  <span>Target band</span>
                </div>
              </div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1.45fr 0.55fr',
              gap: '1rem',
              flex: 1,
              minHeight: 0,
              paddingBottom: '4.75rem'
            }}>
              <div style={{
                background: '#0f1120',
                borderRadius: '24px',
                padding: '1.25rem',
                border: '1px solid rgba(255,255,255,0.04)',
                display: 'flex',
                flexDirection: 'column',
                minHeight: 0
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <div style={{ color: 'white', fontSize: '14px', fontWeight: 800 }}>Recent Flow</div>
                  <div style={{ display: 'flex', gap: '0.6rem' }}>
                    <div style={{ width: '34px', height: '34px', borderRadius: '12px', background: '#232635' }} />
                    <div style={{ width: '34px', height: '34px', borderRadius: '12px', background: '#232635' }} />
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 0.8fr', gap: '0.75rem', padding: '0.75rem 0', color: 'rgba(255,255,255,0.38)', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em' }}>
                  <span>Channel</span>
                  <span>Cluster</span>
                  <span>Window</span>
                  <span style={{ textAlign: 'right' }}>Shift</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', overflow: 'auto', paddingRight: '0.25rem' }} className="custom-scrollbar">
                  {[
                    ['Console Prime', 'Node A7', '31 Mar, 3:20 PM', '+18'],
                    ['Media Loop', 'Node C2', '29 Mar, 5:11 PM', '+07'],
                    ['Orbit Sync', 'Node F5', '29 Mar, 1:20 PM', '+12'],
                    ['Task Stream', 'Node B4', '27 Mar, 2:31 AM', '+24'],
                    ['Signal Vault', 'Node D9', '27 Mar, 11:04 PM', '+09']
                  ].map(([name, node, time, value]) => (
                    <div key={name} style={{
                      display: 'grid',
                      gridTemplateColumns: '1.4fr 1fr 1fr 0.8fr',
                      gap: '0.75rem',
                      alignItems: 'center',
                      padding: '0.95rem 0',
                      borderTop: '1px solid rgba(255,255,255,0.04)'
                    }}>
                      <div style={{ color: 'white', fontSize: '14px', fontWeight: 700 }}>{name}</div>
                      <div style={{ color: 'rgba(255,255,255,0.58)', fontSize: '13px', fontWeight: 600 }}>{node}</div>
                      <div style={{ color: 'rgba(255,255,255,0.58)', fontSize: '13px', fontWeight: 600 }}>{time}</div>
                      <div style={{ color: '#38d7b2', fontSize: '14px', fontWeight: 800, textAlign: 'right' }}>{value}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{
                background: '#0f1120',
                borderRadius: '24px',
                padding: '1.25rem',
                border: '1px solid rgba(255,255,255,0.04)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: 0
              }}>
                <div>
                  <div style={{ color: 'white', fontSize: '14px', fontWeight: 800, marginBottom: '1rem' }}>Channel Mix</div>
                  <div style={{ color: 'white', fontSize: '32px', fontWeight: 900 }}>47.4k</div>
                  <div style={{ color: '#ff8d59', fontSize: '12px', fontWeight: 800, marginTop: '0.4rem' }}>+2 bands from previous cycle</div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.55rem' }}>
                  {['Ops', 'Media', 'Queue', 'Core', 'Sync', 'Review', 'Pulse', '+6'].map((label) => (
                    <div key={label} style={{
                      minHeight: '42px',
                      borderRadius: '12px',
                      background: label === '+6' ? 'rgba(255,255,255,0.08)' : '#232635',
                      color: 'rgba(255,255,255,0.72)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '11px',
                      fontWeight: 800
                    }}>
                      {label}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 03: Commerce Dashboard */}
      <section style={{ minHeight: '100vh', background: '#070816', position: 'relative', overflow: 'hidden', padding: '1rem', boxSizing: 'border-box' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 20% 20%, rgba(74,95,255,0.16), transparent 30%), radial-gradient(circle at 82% 18%, rgba(92,57,255,0.16), transparent 28%), linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0))', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '1480px', margin: '0 auto', height: 'calc(100vh - 2rem)', background: '#11131f', borderRadius: '28px', border: '1px solid rgba(255,255,255,0.06)', padding: '1rem', display: 'grid', gridTemplateColumns: '220px 1fr', gap: '1rem', boxShadow: '0 30px 80px rgba(0,0,0,0.38)', overflow: 'hidden' }}>
          <aside style={{ background: '#0c0e19', borderRadius: '24px', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem', border: '1px solid rgba(255,255,255,0.04)', overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.4rem 0.25rem' }}>
              <div style={{ width: '34px', height: '34px', borderRadius: '10px', background: 'linear-gradient(135deg, #4f67ff, #7a56ff)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 24px rgba(79,103,255,0.35)' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M7 7h10v10H7z"/><path d="M3 12h2m14 0h2M12 3v2m0 14v2"/></svg>
              </div>
              <div>
                <div style={{ color: 'white', fontSize: '14px', fontWeight: 800 }}>Store Pulse</div>
                <div style={{ color: 'rgba(255,255,255,0.38)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Merchant Desk</div>
              </div>
            </div>
            <div style={{ background: 'linear-gradient(180deg, #1b1d2b 0%, #171927 100%)', borderRadius: '22px', padding: '1rem', border: '1px solid rgba(255,255,255,0.06)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '14px', background: 'linear-gradient(135deg, #ffb36b, #ff8e6c)', boxShadow: '0 10px 24px rgba(255,158,108,0.28)' }} />
                  <div>
                    <div style={{ color: 'rgba(255,255,255,0.42)', fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.18em', marginBottom: '0.3rem' }}>Today</div>
                    <div style={{ color: 'white', fontSize: '14px', fontWeight: 800, lineHeight: 1.2 }}>Sunday,<br />April 5</div>
                  </div>
                </div>
              </div>
              <div style={{ paddingTop: '0.9rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ color: 'rgba(255,255,255,0.42)', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.16em', marginBottom: '0.45rem' }}>Session</div>
                <div style={{ color: 'white', fontSize: '14px', fontWeight: 800, lineHeight: 1.4 }}>Welcome back,<br />Merchant Lead.</div>
              </div>
            </div>
            <div style={{ background: '#171927', borderRadius: '20px', padding: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.22rem', border: '1px solid rgba(255,255,255,0.05)', flex: 1, minHeight: 0, overflow: 'hidden', justifyContent: 'space-between' }}>
              {adminTabs.map((item) => (
                <div
                  key={item}
                  onClick={() => setActiveAdminTab(item)}
                  style={{ padding: '0.62rem 0.9rem', borderRadius: '14px', background: activeAdminTab === item ? 'rgba(255,255,255,0.08)' : 'transparent', color: activeAdminTab === item ? 'white' : 'rgba(255,255,255,0.58)', fontSize: '13px', fontWeight: 700, lineHeight: 1.15, cursor: 'pointer', transition: 'all 0.2s ease' }}
                >
                  {item}
                </div>
              ))}
            </div>
            <div style={{ marginTop: 'auto', background: 'linear-gradient(135deg, #2f49ff, #5b74ff)', borderRadius: '18px', padding: '0.9rem', color: 'white', boxShadow: '0 16px 34px rgba(47,73,255,0.35)' }}>
              <div style={{ fontSize: '14px', fontWeight: 900 }}>Admin Panel</div>
            </div>
          </aside>
          <div style={{ background: '#171927', borderRadius: '24px', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem', border: '1px solid rgba(255,255,255,0.04)', overflow: 'hidden', minHeight: 0 }}>
            {activeAdminTab === 'Dashboard' ? (
              <>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
              <div style={{ padding: '0.9rem 1rem', background: '#232635', borderRadius: '14px', color: 'white', fontSize: '13px', fontWeight: 700 }}>This Month</div>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <div style={{ padding: '0.9rem 1rem', background: '#232635', borderRadius: '14px', color: 'rgba(255,255,255,0.78)', fontSize: '13px', fontWeight: 700 }}>Export Data</div>
                <div style={{ padding: '0.9rem 1rem', background: 'linear-gradient(135deg, #4d69ff, #6679ff)', borderRadius: '14px', color: 'white', fontSize: '13px', fontWeight: 800, boxShadow: '0 14px 30px rgba(77,105,255,0.3)' }}>Add New Product</div>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1.18fr 0.88fr 0.82fr', gap: '1rem', minHeight: '260px' }}>
              <div style={{ minHeight: '260px', borderRadius: '24px', padding: '1.25rem', background: demandSlideBackgrounds[activeDemandSlide], position: 'relative', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.04)', transition: 'background 0.5s ease' }}>
                <div style={{ color: 'white', fontSize: '14px', fontWeight: 800 }}>Demand Signal</div>
                <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)', backgroundSize: '22px 22px', opacity: 0.5 }} />
                <div style={{ position: 'absolute', left: '1.25rem', bottom: '1.25rem', zIndex: 2 }}>
                  <div style={{ display: 'flex', gap: '0.45rem', marginBottom: '1rem' }}>
                    {[0, 1, 2, 3].map((dot) => (
                      <div
                        key={dot}
                        onClick={() => setActiveDemandSlide(dot)}
                        style={{
                          width: dot === activeDemandSlide ? '18px' : '7px',
                          height: '7px',
                          borderRadius: '999px',
                          background: dot === activeDemandSlide ? 'white' : 'rgba(255,255,255,0.45)',
                          transition: 'all 0.25s ease',
                          cursor: 'pointer'
                        }}
                      />
                    ))}
                  </div>
                  <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.18em', marginBottom: '0.6rem' }}>
                    Quick Update 0{activeDemandSlide + 1}
                  </div>
                  <div style={{ color: 'white', fontSize: '15px', fontWeight: 800, lineHeight: 1.35, maxWidth: '280px', minHeight: '60px' }}>
                    {demandSlides[activeDemandSlide]}
                  </div>
                </div>
              </div>
              <div style={{ minHeight: '260px', borderRadius: '24px', padding: '1.25rem', background: '#0f1120', border: '1px solid rgba(255,255,255,0.04)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <div style={{ color: 'white', fontSize: '14px', fontWeight: 800, marginBottom: '0.9rem' }}>Revenue Overview</div>
                  <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '1rem', marginBottom: '0.7rem' }}>
                    <div style={{ color: 'white', fontSize: '34px', fontWeight: 900 }}>$40,111</div>
                    <div style={{ color: '#38d7b2', fontSize: '12px', fontWeight: 800, whiteSpace: 'nowrap' }}>+12% from last month</div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem' }}>
                    <div style={{ background: '#171b31', borderRadius: '16px', padding: '0.8rem 0.9rem' }}>
                      <div style={{ color: 'rgba(255,255,255,0.42)', fontSize: '10px', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.35rem' }}>Orders</div>
                      <div style={{ color: 'white', fontSize: '18px', fontWeight: 800 }}>44</div>
                    </div>
                    <div style={{ background: '#171b31', borderRadius: '16px', padding: '0.8rem 0.9rem' }}>
                      <div style={{ color: 'rgba(255,255,255,0.42)', fontSize: '10px', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.35rem' }}>Collections</div>
                      <div style={{ color: 'white', fontSize: '18px', fontWeight: 800 }}>12</div>
                    </div>
                  </div>
                </div>
                <div style={{ flex: 1, minHeight: '118px', borderRadius: '20px', background: 'linear-gradient(180deg, rgba(83,103,255,0.18), rgba(83,103,255,0.04))', overflow: 'hidden', position: 'relative', padding: '0.75rem' }}>
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)', backgroundSize: '24px 24px', opacity: 0.45 }} />
                  <div style={{ position: 'absolute', left: '0.9rem', right: '0.9rem', bottom: '0.75rem', top: '0.75rem' }}>
                    <svg viewBox="0 0 260 110" style={{ width: '100%', height: '100%' }}>
                      <defs>
                        <linearGradient id="revenueArea" x1="0" x2="0" y1="0" y2="1">
                          <stop offset="0%" stopColor="rgba(92,113,255,0.35)" />
                          <stop offset="100%" stopColor="rgba(92,113,255,0)" />
                        </linearGradient>
                      </defs>
                      <path d="M0 86 C30 90, 52 42, 88 50 S146 102, 188 64 S232 18, 260 40 L260 110 L0 110 Z" fill="url(#revenueArea)" />
                      <path d="M0 86 C30 90, 52 42, 88 50 S146 102, 188 64 S232 18, 260 40" fill="none" stroke="#5870ff" strokeWidth="5" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>
              </div>
              <div style={{ minHeight: '260px', borderRadius: '24px', padding: '1.25rem', background: '#0f1120', border: '1px solid rgba(255,255,255,0.04)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div style={{ color: 'white', fontSize: '14px', fontWeight: 800 }}>Goal Ring</div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                  <div style={{ width: '170px', height: '170px', borderRadius: '50%', background: 'conic-gradient(#3d61ff 0 248deg, rgba(255,255,255,0.24) 248deg 360deg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: '118px', height: '118px', borderRadius: '50%', background: '#0f1120', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                      <div style={{ fontSize: '12px', opacity: 0.5 }}>Progress</div>
                      <div style={{ fontSize: '30px', fontWeight: 900 }}>69%</div>
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', color: 'rgba(255,255,255,0.6)', fontSize: '11px', fontWeight: 700 }}><span>Current pace</span><span>Monthly target</span></div>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.45fr) minmax(300px, 0.55fr)', gap: '1rem', flex: 1, minHeight: 0, paddingBottom: '0.4rem' }}>
              <div style={{ background: '#0f1120', borderRadius: '24px', padding: '1.25rem', border: '1px solid rgba(255,255,255,0.04)', display: 'flex', flexDirection: 'column', minHeight: 0, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.45rem' }}>
                  <div style={{ color: 'white', fontSize: '14px', fontWeight: 800 }}>Recent Orders</div>
                  <div style={{ display: 'flex', gap: '0.6rem' }}><div style={{ width: '34px', height: '34px', borderRadius: '12px', background: '#232635' }} /><div style={{ width: '34px', height: '34px', borderRadius: '12px', background: '#232635' }} /></div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.35fr) minmax(0, 1fr) minmax(0, 1fr) auto', gap: '0.75rem', padding: '0.35rem 0 0.55rem', color: 'rgba(255,255,255,0.38)', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em' }}><span>Product</span><span>Channel</span><span>Placed</span><span style={{ textAlign: 'right' }}>Total</span></div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', overflow: 'auto', paddingRight: '0.25rem', flex: 1 }} className="custom-scrollbar">
                  {[
                    ['Velocity Runner', 'Web Store', '31 Mar, 3:20 PM', '$129'],
                    ['Orbit Duffel', 'Mobile App', '29 Mar, 5:11 PM', '$84'],
                    ['Core Hoodie', 'Marketplace', '29 Mar, 1:20 PM', '$62'],
                    ['Trail Cap', 'Web Store', '27 Mar, 2:31 AM', '$28'],
                    ['Mono Sneaker', 'Retail Sync', '27 Mar, 11:04 PM', '$148']
                  ].map(([name, channel, time, value]) => (
                    <div key={name} style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.35fr) minmax(0, 1fr) minmax(0, 1fr) auto', gap: '0.75rem', alignItems: 'center', padding: '1rem 0', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                      <div style={{ color: 'white', fontSize: '14px', fontWeight: 700, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{name}</div>
                      <div style={{ color: 'rgba(255,255,255,0.58)', fontSize: '13px', fontWeight: 600, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{channel}</div>
                      <div style={{ color: 'rgba(255,255,255,0.58)', fontSize: '13px', fontWeight: 600, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{time}</div>
                      <div style={{ color: '#38d7b2', fontSize: '14px', fontWeight: 800, textAlign: 'right' }}>{value}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ background: '#0f1120', borderRadius: '24px', padding: '1.25rem', border: '1px solid rgba(255,255,255,0.04)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', minHeight: 0, gap: '1.25rem', overflow: 'hidden', minWidth: 0 }}>
                <div>
                  <div style={{ color: 'white', fontSize: '14px', fontWeight: 800, marginBottom: '1rem' }}>Category Mix</div>
                  <div style={{ color: 'white', fontSize: '32px', fontWeight: 900 }}>47.4k</div>
                  <div style={{ color: '#ff8d59', fontSize: '12px', fontWeight: 800, marginTop: '0.4rem' }}>+2 groups from previous month</div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '0.75rem', marginTop: 'auto', alignContent: 'start', paddingBottom: '0.2rem', overflowY: 'auto', paddingRight: '0.2rem' }} className="custom-scrollbar">
                  {['Shoes', 'Bags', 'Outerwear', 'Accessories', 'Beauty', 'Denim', 'Essentials', '+6'].map((label) => (
                    <div key={label} style={{ minHeight: '52px', borderRadius: '14px', background: label === '+6' ? 'rgba(255,255,255,0.08)' : '#232635', color: 'rgba(255,255,255,0.72)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 800, textAlign: 'center', padding: '0 0.5rem', overflow: 'hidden', textOverflow: 'ellipsis' }}>{label}</div>
                  ))}
                </div>
              </div>
            </div>
              </>
            ) : renderAdminWorkspace()}
          </div>
        </div>
      </section>

      {/* Booking Modal Overlay */}
      {isBookingModalOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          background: 'rgba(10, 11, 10, 0.95)',
          backdropFilter: 'blur(20px)',
          animation: 'fade-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards'
        }}>
          {/* Close Button Trigger */}
          <div 
            onClick={() => {
              setIsBookingModalOpen(false);
              setIsBookingSuccess(false);
            }}
            style={{ position: 'absolute', top: '40px', right: '40px', cursor: 'pointer', zIndex: 100 }}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#d9f43a" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </div>

          <div style={{
            width: '100%',
            maxWidth: '600px',
            background: isBookingSuccess ? '#d9f43a' : '#1a1c1a',
            borderRadius: '40px',
            padding: '4rem',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 25px 80px rgba(0,0,0,0.5)',
            transform: 'scale(0.9) translateY(20px)',
            animation: 'modal-enter 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
            border: '2px solid rgba(217, 244, 58, 0.1)'
          }}>
            {!isBookingSuccess ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <span style={{ color: '#d9f43a', fontSize: '12px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.4em' }}>Reservations</span>
                  <h2 style={{ color: 'white', fontSize: '42px', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1 }}>BOOK YOUR <span style={{ color: '#d9f43a' }}>DATE</span></h2>
                </div>

                <form onSubmit={(e) => {
                  e.preventDefault();
                  setIsBookingSubmitting(true);
                  setTimeout(() => {
                    setIsBookingSubmitting(false);
                    setIsBookingSuccess(true);
                  }, 1800);
                }} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <label style={{ color: 'white', opacity: 0.4, fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.15em' }}>Full Name</label>
                      <input required type="text" placeholder="John Doe" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '16px', color: 'white', fontSize: '14px', outline: 'none' }} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <label style={{ color: 'white', opacity: 0.4, fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.15em' }}>Email Address</label>
                      <input required type="email" placeholder="john@example.com" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '16px', color: 'white', fontSize: '14px', outline: 'none' }} />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '20px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <label style={{ color: 'white', opacity: 0.4, fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.15em' }}>Project Type</label>
                      <select required style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '16px', color: 'white', fontSize: '14px', outline: 'none', appearance: 'none' }}>
                        <option value="portrait" style={{ background: '#1a1c1a' }}>Portrait Session</option>
                        <option value="event" style={{ background: '#1a1c1a' }}>Event Coverage</option>
                        <option value="fashion" style={{ background: '#1a1c1a' }}>Fashion Editorial</option>
                        <option value="commercial" style={{ background: '#1a1c1a' }}>Commercial Shoot</option>
                      </select>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <label style={{ color: 'white', opacity: 0.4, fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.15em' }}>Preferred Date</label>
                      <input required type="date" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '16px', color: 'white', fontSize: '14px', outline: 'none' }} />
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ color: 'white', opacity: 0.4, fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.15em' }}>Project Brief/Details</label>
                    <textarea placeholder="Tell us about your vision..." rows="3" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '16px', color: 'white', fontSize: '14px', outline: 'none', resize: 'none' }}></textarea>
                  </div>

                  <button 
                    disabled={isBookingSubmitting}
                    type="submit" 
                    style={{ 
                      marginTop: '1rem',
                      background: '#d9f43a', 
                      color: '#0a0b0a', 
                      padding: '20px', 
                      borderRadius: '16px', 
                      fontWeight: 900, 
                      fontSize: '13px', 
                      textTransform: 'uppercase', 
                      letterSpacing: '0.2em', 
                      cursor: 'pointer',
                      border: 'none',
                      transition: 'all 0.3s ease',
                      opacity: isBookingSubmitting ? 0.7 : 1
                    }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                  >
                    {isBookingSubmitting ? 'Securing date...' : 'Submit Reservation'}
                  </button>
                </form>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem', textAlign: 'center' }}>
                <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: '#0a0b0a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#d9f43a" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <h2 style={{ color: '#0a0b0a', fontSize: '32px', fontWeight: 900, letterSpacing: '-0.02em' }}>RESERVATION FILED</h2>
                  <p style={{ color: '#0a0b0a', opacity: 0.8, fontSize: '14px', maxWidth: '300px', lineHeight: 1.5 }}>Our team will review your brief and get back to you within 24 business hours.</p>
                </div>
                <div 
                  onClick={() => setIsBookingModalOpen(false)}
                  style={{ padding: '15px 40px', background: '#0a0b0a', color: 'white', borderRadius: '100px', fontSize: '12px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.15em', cursor: 'pointer' }}
                >
                  Return to Portfolio
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fade-in { 0% { opacity: 0; } 100% { opacity: 1; } }
        @keyframes modal-enter { 
          0% { opacity: 0; transform: scale(0.9) translateY(40px); filter: blur(5px); } 
          100% { opacity: 1; transform: scale(1) translateY(0); filter: blur(0); } 
        }
        @keyframes shoe-enter {
          0% { opacity: 0; transform: translateY(20px) scale(0.95); filter: blur(4px); }
          100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
        }
        .animate-shoe-enter {
          animation: shoe-enter 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes text-reveal {
          0% { opacity: 0; transform: translateX(30px); filter: blur(2px); }
          100% { opacity: 1; transform: translateX(0); filter: blur(0); }
        }
        .animate-text-reveal {
          animation: text-reveal 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }
        .projects-container { overflow-x: hidden; }
        .min-h-screen { min-height: 100vh; }
        .flex { display: flex; }
        .flex-col { flex-direction: column; }
        .lg\\:flex-row { @media (min-width: 1024px) { flex-direction: row; } }
        .items-center { align-items: center; }
        .justify-center { justify-content: center; }
        .text-center { text-align: center; }
        .relative { position: relative; }
        .absolute { position: absolute; }
        .fixed { position: fixed; }
        .z-10 { z-index: 10; }
        .z-20 { z-index: 20; }
        .z-30 { z-index: 30; }
        .z-40 { z-index: 40; }
        .z-\\[100\\] { z-index: 100; }
        .w-full { width: 100%; }
        .lg\\:w-1\\/2 { @media (min-width: 1024px) { width: 50%; } }
        .p-10 { padding: 2.5rem; }
        .p-12 { padding: 3rem; }
        .p-20 { padding: 5rem; }
        .px-6 { padding-left: 1.5rem; padding-right: 1.5rem; }
        .py-3 { padding-top: 0.75rem; padding-bottom: 0.75rem; }
        .lg\\:p-32 { @media (min-width: 1024px) { padding: 8rem; } }
        .top-8 { top: 2rem; }
        .left-8 { left: 2rem; }
        .left-12 { left: 3rem; }
        .top-10 { top: 2.5rem; }
        .bg-split-dimension { background: linear-gradient(90deg, #ffffff 50%, #ff2136 50%); border: none; }
        .left-10 { left: 2.5rem; }
        .right-10 { right: 2.5rem; }
        .left-1\\/2 { left: 50%; }
        .-translate-x-1\\/2 { transform: translateX(-50%); }
        .bottom-8 { bottom: 2rem; }
        .bottom-10 { bottom: 2.5rem; }
        .bottom-12 { bottom: 3rem; }
        .mb-2 { margin-bottom: 0.5rem; }
        .min-w-\\[140px\\] { min-width: 140px; }
        .left-5 { left: 1.25rem; }
        .pl-2 { padding-left: 0.5rem; }
        .mb-4 { margin-bottom: 1rem; }
        .mb-6 { margin-bottom: 1.5rem; }
        .mb-8 { margin-bottom: 2rem; }
        .mb-12 { margin-bottom: 3rem; }
        .gap-2 { gap: 0.5rem; }
        .gap-3 { gap: 0.75rem; }
        .gap-4 { gap: 1rem; }
        .gap-6 { gap: 1.5rem; }
        .gap-8 { gap: 2rem; }
        .rounded-full { border-radius: 9999px; }
        .rounded-3xl { border-radius: 1.5rem; }
        .transition-colors { transition: color 0.3s ease, background-color 0.3s ease, border-color 0.3s ease; }
        .transition-all { transition: all 0.3s ease; }
        .bg-white { background-color: #ffffff; }
        .bg-rose { background-color: #ffe4e1; }
        .bg-brand-red { background-color: #ff2136; }
        .leading-relaxed { line-height: 1.625; }
        .backdrop-blur-md { backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); }
        .backdrop-blur-2xl { backdrop-filter: blur(40px); -webkit-backdrop-filter: blur(40px); }
        .shadow-xl { box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04); }
        .aspect-square { aspect-ratio: 1 / 1; }
        .max-w-md { max-w: 28rem; }
        .max-w-\\[600px\\] { max-width: 600px; }
        .text-obsidian { color: #030303 !important; }
        .object-contain { object-fit: contain; }
      `}} />
    </div>
  );
};

export default Projects;
