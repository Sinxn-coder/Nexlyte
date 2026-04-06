import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Home, ShoppingCart, Plus, Heart, User, ArrowLeft, Star, X, Trash2, Minus } from 'lucide-react';

const SHOES_DB = [
  { id: 1, brand: "Men's Shoes", name: "Creter Impact", price: 77.65, category: 'Lifestyle', img: "/shoe3.png" },
  { id: 2, brand: "Men's Shoes", name: "Air Max Pre-Day", price: 240.70, category: 'Running', img: "/shoe1.png" },
  { id: 3, brand: "Men's Shoes", name: "Zoom Velocity", price: 165.00, category: 'Basketball', img: "/shoe2.png" },
  { id: 4, brand: "Men's Shoes", name: "Titan Glide", price: 210.00, category: 'Training', img: "/shoe4.png" },
  { id: 5, brand: "Men's Shoes", name: "Classic Low", price: 85.00, category: 'Lifestyle', img: "/shoe5.png" },
  { id: 6, brand: "Women's Shoes", name: "Runner XT", price: 120.00, category: 'Running', img: "/shoe6.png" },
];

export default function ShoeStoreMobile({ onExit }) {
  const [screen, setScreen] = useState('home'); // 'home', 'detail'
  const [navTab, setNavTab] = useState('home'); // 'home', 'cart', 'favorites', 'profile'
  const [category, setCategory] = useState('Lifestyle');
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([1]);
  
  const [selected, setSelected] = useState(null);
  const [selectedSize, setSelectedSize] = useState(4);
  const [toast, setToast] = useState('');

  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['Lifestyle', 'Basketball', 'Running', 'Training'];

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleLike = (e, id) => {
    e.stopPropagation();
    setFavorites(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    if (!favorites.includes(id)) showToast("Added to favorites ❤️");
  };

  const addToCart = () => {
    const existingIdx = cart.findIndex(c => c.id === selected.id && c.size === selectedSize);
    if(existingIdx >= 0) {
      const newCart = [...cart];
      newCart[existingIdx].qty += 1;
      setCart(newCart);
    } else {
      setCart([...cart, { ...selected, size: selectedSize, qty: 1, cartId: Date.now() }]);
    }
    setScreen('home');
    setNavTab('cart');
    showToast(`${selected.name} added to cart!`);
  };

  const fastAddToCart = (s) => {
    const defaultSize = 4;
    const existingIdx = cart.findIndex(c => c.id === s.id && c.size === defaultSize);
    if(existingIdx >= 0) {
      const newCart = [...cart];
      newCart[existingIdx].qty += 1;
      setCart(newCart);
    } else {
      setCart([...cart, { ...s, size: defaultSize, qty: 1, cartId: Date.now() }]);
    }
    showToast(`${s.name} added to cart!`);
  };

  const updateQty = (cartId, delta) => {
    setCart(prev => prev.map(c => {
      if(c.cartId === cartId) {
        return { ...c, qty: Math.max(1, c.qty + delta) };
      }
      return c;
    }));
  };

  const removeFromCart = (cartId) => {
    setCart(prev => prev.filter(c => c.cartId !== cartId));
    showToast("Item removed from cart");
  };

  const switchTab = (tab) => {
    setNavTab(tab);
    setScreen('home');
  };

  // Safe getter for rendered lists based on category
  const filteredShoes = SHOES_DB.filter(s => s.category === category);
  const displayShoes = filteredShoes.length > 0 ? filteredShoes : SHOES_DB.slice(0,2);
  const popularShoes = [...SHOES_DB].sort((a,b) => b.price - a.price).slice(0, 4);
  const cartTotal = cart.reduce((acc, curr) => acc + (curr.price * curr.qty), 0);

  const searchResults = SHOES_DB.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: '#f5f6f8', display: 'flex', flexDirection: 'column', color: '#111', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      
      {/* ── Toast Notification ── */}
      <AnimatePresence>
        {toast && (
          <motion.div initial={{ opacity: 0, y: -20, x: '-50%' }} animate={{ opacity: 1, y: 0, x: '-50%' }} exit={{ opacity: 0, y: -20, x: '-50%' }} style={{ position: 'absolute', top: 60, left: '50%', background: '#111', color: 'white', padding: '12px 24px', borderRadius: '999px', fontSize: '13px', fontWeight: 800, zIndex: 100000, boxShadow: '0 10px 30px rgba(0,0,0,0.2)', whiteSpace: 'nowrap' }}>
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Exit Button (Floating Top Center) ── */}
      <button 
        onClick={onExit} 
        style={{ position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)', zIndex: 10000, background: 'rgba(0,0,0,0.8)', color: 'white', border: 'none', padding: '8px 20px', borderRadius: '999px', fontSize: '13px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', boxShadow: '0 10px 30px rgba(0,0,0,0.2)', backdropFilter: 'blur(10px)' }}
      >
        <X size={16} strokeWidth={2.5} /> Exit Project View
      </button>

      <AnimatePresence mode="wait">
        
        {/* ======================= NAV SCREENS (Home, Cart, Fav, Profile) ======================= */}
        {screen === 'home' && (
          <motion.div key="main" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} style={{ flex: 1, display: 'flex', flexDirection: 'column', paddingBottom: '90px' }}>
            
            {/* Header */}
            {isSearchActive && navTab === 'home' ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '60px 24px 20px' }}>
                <ArrowLeft onClick={() => { setIsSearchActive(false); setSearchQuery(''); }} size={26} strokeWidth={2.5} cursor="pointer" />
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', background: 'white', borderRadius: '999px', padding: '10px 20px', boxShadow: '0 5px 15px rgba(0,0,0,0.03)' }}>
                  <Search size={18} color="#888" style={{ marginRight: '10px' }} />
                  <input 
                    autoFocus
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search shoes..."
                    style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', fontSize: '15px', fontWeight: 700, color: '#111', width: '100%' }}
                  />
                  {searchQuery && <X onClick={() => setSearchQuery('')} size={18} color="#111" cursor="pointer" />}
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '60px 24px 20px' }}>
                <div style={{ fontSize: '24px', fontWeight: 900 }}>
                  {navTab === 'home' && 'Discover'}
                  {navTab === 'cart' && 'Your Cart'}
                  {navTab === 'favorites' && 'Favorites'}
                  {navTab === 'profile' && 'Profile'}
                </div>
                {navTab === 'home' && (
                  <div onClick={() => setIsSearchActive(true)} style={{ width: '44px', height: '44px', background: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 5px 15px rgba(0,0,0,0.05)', cursor: 'pointer' }}>
                    <Search size={22} strokeWidth={2.5} color="#111" />
                  </div>
                )}
              </div>
            )}

            <div style={{ flex: 1, overflowY: 'auto' }}>
              
              {/* === HOME TAB === */}
              {navTab === 'home' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  
                  {isSearchActive ? (
                    <div style={{ padding: '0 24px' }}>
                      <div style={{ fontSize: '14px', color: '#888', fontWeight: 700, marginBottom: '20px' }}>
                        {searchQuery ? `${searchResults.length} results found` : "Type to start searching..."}
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        {searchResults.map(s => (
                          <div key={s.id} onClick={() => { setSelected(s); setSelectedSize(4); setScreen('detail'); }} style={{ background: 'white', borderRadius: '24px', padding: '16px', position: 'relative', boxShadow: '0 10px 30px rgba(0,0,0,0.03)', cursor: 'pointer' }}>
                            <div onClick={(e) => handleLike(e, s.id)} style={{ position: 'absolute', top: 12, left: 12, width: '32px', height: '32px', background: favorites.includes(s.id) ? '#ffe4e6' : '#f5f6f8', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>
                              <Heart size={16} fill={favorites.includes(s.id) ? "#ff2136" : "transparent"} color={favorites.includes(s.id) ? "#ff2136" : "#aaa"} />
                            </div>
                            <div style={{ height: '90px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                              <img src={s.img} style={{ width: '120px', transform: 'rotate(-25deg)', filter: 'drop-shadow(-10px 10px 10px rgba(0,0,0,0.15))' }} />
                            </div>
                            <div style={{ fontSize: '14px', fontWeight: 800, marginBottom: '6px', lineHeight: 1.2 }}>{s.name}</div>
                            <div style={{ fontSize: '15px', fontWeight: 900 }}>${s.price.toFixed(2)}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <>
                      {/* Banner */}
                      <div style={{ margin: '0 24px 24px', background: '#111', borderRadius: '28px', padding: '24px', position: 'relative', overflow: 'hidden' }}>
                        <div style={{ position: 'absolute', right: '-15%', bottom: '-20%', width: '180px', height: '180px', background: 'radial-gradient(circle, #fbcb15 0%, transparent 70%)', opacity: 0.6 }} />
                        <div style={{ position: 'relative', zIndex: 1 }}>
                          <h2 style={{ color: 'white', fontSize: '24px', fontWeight: 800, marginBottom: '8px', lineHeight: 1.1 }}>Get your<br/>special sale</h2>
                          <p style={{ color: '#fbcb15', fontSize: '15px', fontWeight: 700, marginBottom: '20px' }}>Up to 50%</p>
                          <button onClick={() => { setSelected(SHOES_DB[1]); setSelectedSize(4); setScreen('detail'); }} style={{ background: '#fbcb15', color: '#111', border: 'none', padding: '10px 20px', borderRadius: '999px', fontSize: '13px', fontWeight: 800, cursor: 'pointer' }}>Shop now</button>
                        </div>
                        <img src="/shoe2.png" alt="Promo" style={{ position: 'absolute', right: '-40px', top: '15px', width: '220px', transform: 'rotate(-15deg)', pointerEvents: 'none', filter: 'drop-shadow(-10px 10px 15px rgba(0,0,0,0.4))' }} />
                      </div>

                      {/* Categories */}
                      <div style={{ display: 'flex', gap: '12px', padding: '0 24px 24px', overflowX: 'auto', msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
                        {categories.map((c) => {
                          const isActive = category === c;
                          return (
                            <div key={c} onClick={() => setCategory(c)} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: isActive ? '#fbcb15' : 'transparent', padding: isActive ? '8px 20px 8px 8px' : '8px 20px', borderRadius: '999px', flexShrink: 0, cursor: 'pointer', transition: 'all 0.2s' }}>
                              {isActive && (
                                <div style={{ width: '32px', height: '32px', background: 'white', borderRadius: '50%', padding: '6px', display: 'flex', alignItems: 'center', justifyItems: 'center' }}>
                                  <img src="/shoe1.png" style={{ width: '100%', objectFit: 'contain' }} />
                                </div>
                              )}
                              <span style={{ fontSize: '14px', fontWeight: isActive ? 800 : 700, color: isActive ? '#111' : '#888' }}>{c}</span>
                            </div>
                          );
                        })}
                      </div>

                      {/* Dynamic Category Section */}
                      <div style={{ padding: '0 24px 24px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                          <h3 style={{ fontSize: '18px', fontWeight: 800 }}>New in {category}</h3>
                          <span onClick={() => showToast(`Showing all ${category} shoes`)} style={{ fontSize: '13px', color: '#666', fontWeight: 700, cursor: 'pointer' }}>See all</span>
                        </div>
                        <div style={{ display: 'flex', gap: '20px', overflowX: 'auto', paddingBottom: '10px', margin: '0 -24px', padding: '0 24px 20px' }} className="no-scrollbar">
                          {displayShoes.map(s => (
                            <div key={s.id} onClick={() => { setSelected(s); setSelectedSize(4); setScreen('detail'); }} style={{ minWidth: '180px', flex: '0 0 auto', background: 'white', borderRadius: '24px', padding: '20px', position: 'relative', boxShadow: '0 10px 30px rgba(0,0,0,0.03)', cursor: 'pointer' }}>
                              <div onClick={(e) => handleLike(e, s.id)} style={{ position: 'absolute', top: 16, left: 16, width: '32px', height: '32px', background: favorites.includes(s.id) ? '#ffe4e6' : '#f5f6f8', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>
                                <Heart size={16} fill={favorites.includes(s.id) ? "#ff2136" : "transparent"} color={favorites.includes(s.id) ? "#ff2136" : "#aaa"} />
                              </div>
                              <div style={{ height: '110px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                                <img src={s.img} style={{ width: '140px', transform: 'rotate(-25deg)', filter: 'drop-shadow(-10px 15px 15px rgba(0,0,0,0.15))' }} />
                              </div>
                              <div style={{ fontSize: '12px', color: '#aaa', fontWeight: 700, marginBottom: '6px' }}>{s.brand}</div>
                              <div style={{ fontSize: '16px', fontWeight: 800, marginBottom: '8px', lineHeight: 1.2 }}>{s.name}</div>
                              <div style={{ fontSize: '16px', fontWeight: 900 }}>${s.price.toFixed(2)}</div>
                              <div onClick={(e) => { e.stopPropagation(); fastAddToCart(s); }} style={{ position: 'absolute', bottom: 0, right: 0, background: '#111', color: 'white', width: '45px', height: '45px', borderRadius: '14px 0 24px 0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Plus size={20} strokeWidth={3} />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Popular Section */}
                      <div style={{ padding: '0 24px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                          <h3 style={{ fontSize: '18px', fontWeight: 800 }}>Popular</h3>
                          <span onClick={() => showToast(`Showing all popular items`)} style={{ fontSize: '13px', color: '#666', fontWeight: 700, cursor: 'pointer' }}>See all</span>
                        </div>
                        <div style={{ display: 'flex', gap: '20px', overflowX: 'auto', margin: '0 -24px', padding: '0 24px 20px' }} className="no-scrollbar">
                          {popularShoes.map(s => (
                            <div key={s.id} onClick={() => { setSelected(s); setSelectedSize(4); setScreen('detail'); }} style={{ minWidth: '180px', flex: '0 0 auto', background: 'white', borderRadius: '24px', padding: '20px', position: 'relative', boxShadow: '0 10px 30px rgba(0,0,0,0.03)', cursor: 'pointer' }}>
                              <div onClick={(e) => handleLike(e, s.id)} style={{ position: 'absolute', top: 16, left: 16, width: '32px', height: '32px', background: favorites.includes(s.id) ? '#ffe4e6' : '#f5f6f8', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>
                                <Heart size={16} fill={favorites.includes(s.id) ? "#ff2136" : "transparent"} color={favorites.includes(s.id) ? "#ff2136" : "#aaa"} />
                              </div>
                              <div style={{ height: '110px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                                <img src={s.img} style={{ width: '140px', transform: 'rotate(-25deg)', filter: 'drop-shadow(-10px 15px 15px rgba(0,0,0,0.15))' }} />
                              </div>
                              <div style={{ fontSize: '12px', color: '#aaa', fontWeight: 700, marginBottom: '6px' }}>{s.brand}</div>
                              <div style={{ fontSize: '16px', fontWeight: 800, marginBottom: '8px', lineHeight: 1.2 }}>{s.name}</div>
                              <div style={{ fontSize: '16px', fontWeight: 900 }}>${s.price.toFixed(2)}</div>
                              <div onClick={(e) => { e.stopPropagation(); fastAddToCart(s); }} style={{ position: 'absolute', bottom: 0, right: 0, background: '#111', color: 'white', width: '45px', height: '45px', borderRadius: '14px 0 24px 0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Plus size={20} strokeWidth={3} />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </motion.div>
              )}

              {/* === CART TAB === */}
              {navTab === 'cart' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ padding: '0 24px' }}>
                  {cart.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '60px 0', color: '#aaa' }}>
                      <ShoppingCart size={64} color="#ddd" strokeWidth={1.5} style={{ margin: '0 auto 20px' }} />
                      <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#111', marginBottom: '8px' }}>Your cart is empty</h3>
                      <p style={{ fontSize: '14px', fontWeight: 500 }}>Looks like you haven't added any shoes yet.</p>
                      <button onClick={() => switchTab('home')} style={{ marginTop: '24px', background: '#fbcb15', color: '#111', border: 'none', padding: '12px 24px', borderRadius: '999px', fontSize: '14px', fontWeight: 800, cursor: 'pointer' }}>Start Shopping</button>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                      {cart.map(c => (
                        <div key={c.cartId} style={{ display: 'flex', background: 'white', borderRadius: '20px', padding: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.03)', position: 'relative' }}>
                          <div style={{ width: '100px', height: '100px', background: '#f5f6f8', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '16px' }}>
                            <img src={c.img} style={{ width: '100%', transform: 'rotate(-20deg)', filter: 'drop-shadow(-5px 10px 10px rgba(0,0,0,0.1))' }} />
                          </div>
                          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <div style={{ fontSize: '16px', fontWeight: 800, marginBottom: '4px' }}>{c.name}</div>
                            <div style={{ fontSize: '13px', color: '#888', fontWeight: 700, marginBottom: '8px' }}>Size: {c.size}</div>
                            <div style={{ fontSize: '18px', fontWeight: 900 }}>${(c.price * c.qty).toFixed(2)}</div>
                          </div>
                          
                          {/* Qty Controls */}
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', marginLeft: 'auto' }}>
                            <button onClick={() => removeFromCart(c.cartId)} style={{ background: 'transparent', border: 'none', color: '#ff2136', cursor: 'pointer', padding: '4px' }}>
                              <Trash2 size={18} />
                            </button>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#f5f6f8', borderRadius: '999px', padding: '4px 8px' }}>
                              <button onClick={() => updateQty(c.cartId, -1)} disabled={c.qty<=1} style={{ border: 'none', background: 'transparent', cursor: c.qty<=1 ? 'not-allowed' : 'pointer', color: '#111', padding: 0, display: 'flex', alignItems: 'center' }}><Minus size={14} strokeWidth={3} /></button>
                              <span style={{ fontSize: '13px', fontWeight: 800, width: '14px', textAlign: 'center' }}>{c.qty}</span>
                              <button onClick={() => updateQty(c.cartId, 1)} style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#111', padding: 0, display: 'flex', alignItems: 'center' }}><Plus size={14} strokeWidth={3} /></button>
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      <div style={{ borderTop: '2px dashed #e0e0e0', padding: '24px 0', marginTop: '10px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '15px', color: '#888', fontWeight: 600 }}>
                          <span>Subtotal</span>
                          <span>${cartTotal.toFixed(2)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', fontSize: '15px', color: '#888', fontWeight: 600 }}>
                          <span>Shipping</span>
                          <span>Free</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '20px', fontWeight: 900 }}>
                          <span>Total</span>
                          <span>${cartTotal.toFixed(2)}</span>
                        </div>
                        <button onClick={() => { setCart([]); switchTab('home'); showToast("Order placed successfully! 🚀"); }} style={{ width: '100%', padding: '16px', background: '#fbcb15', border: 'none', borderRadius: '20px', fontSize: '15px', fontWeight: 800, marginTop: '24px', boxShadow: '0 10px 25px rgba(251,203,21,0.3)', cursor: 'pointer' }}>
                          Checkout Now
                        </button>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {/* === FAVORITES TAB === */}
              {navTab === 'favorites' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ padding: '0 24px' }}>
                  {favorites.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '60px 0', color: '#aaa' }}>
                      <Heart size={64} color="#ddd" strokeWidth={1.5} style={{ margin: '0 auto 20px' }} />
                      <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#111', marginBottom: '8px' }}>No favorites yet</h3>
                      <p style={{ fontSize: '14px', fontWeight: 500 }}>Tap the heart button on any shoe to save it.</p>
                      <button onClick={() => switchTab('home')} style={{ marginTop: '24px', background: '#111', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '999px', fontSize: '14px', fontWeight: 800, cursor: 'pointer' }}>Discover Shoes</button>
                    </div>
                  ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                      {SHOES_DB.filter(s => favorites.includes(s.id)).map(s => (
                        <div key={s.id} onClick={() => { setSelected(s); setSelectedSize(4); setScreen('detail'); }} style={{ background: 'white', borderRadius: '24px', padding: '16px', position: 'relative', boxShadow: '0 10px 30px rgba(0,0,0,0.03)', cursor: 'pointer' }}>
                          <div onClick={(e) => handleLike(e, s.id)} style={{ position: 'absolute', top: 12, left: 12, width: '32px', height: '32px', background: '#ffe4e6', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>
                            <Heart size={16} fill="#ff2136" color="#ff2136" />
                          </div>
                          <div style={{ height: '90px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                            <img src={s.img} style={{ width: '120px', transform: 'rotate(-25deg)', filter: 'drop-shadow(-10px 10px 10px rgba(0,0,0,0.15))' }} />
                          </div>
                          <div style={{ fontSize: '14px', fontWeight: 800, marginBottom: '6px', lineHeight: 1.2 }}>{s.name}</div>
                          <div style={{ fontSize: '15px', fontWeight: 900 }}>${s.price.toFixed(2)}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {/* === PROFILE TAB === */}
              {navTab === 'profile' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ padding: '0 24px', textAlign: 'center' }}>
                  <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: '#fbcb15', border: '4px solid white', margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 20px rgba(0,0,0,0.05)' }}>
                    <User size={48} color="white" />
                  </div>
                  <h2 style={{ fontSize: '24px', fontWeight: 900, marginBottom: '8px' }}>John Doe</h2>
                  <p style={{ color: '#888', fontWeight: 600, fontSize: '14px', marginBottom: '32px' }}>sneakerhead@example.com</p>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left' }}>
                    {['My Orders', 'Payment Methods', 'Shipping Addresses', 'Settings', 'Log Out'].map((item, i) => (
                      <div key={item} onClick={() => showToast(i === 4 ? "Logged out successfully" : `${item} panel unavailable`)} style={{ background: i === 4 ? '#ffe4e6' : 'white', color: i === 4 ? '#ff2136' : '#111', padding: '20px', borderRadius: '20px', fontWeight: 800, fontSize: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', boxShadow: '0 5px 15px rgba(0,0,0,0.02)' }}>
                        {item} <ArrowLeft size={16} strokeWidth={3} style={{ transform: 'rotate(180deg)', opacity: 0.5 }} />
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Bottom Nav */}
            <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: 'white', padding: '16px 30px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTopLeftRadius: '32px', borderTopRightRadius: '32px', boxShadow: '0 -10px 40px rgba(0,0,0,0.06)', zIndex: 10 }}>
              <Home onClick={() => switchTab('home')} size={26} color={navTab === 'home' ? '#111' : '#bbb'} strokeWidth={navTab === 'home' ? 3 : 2.5} cursor="pointer" />
              <div style={{ position: 'relative' }}>
                <ShoppingCart onClick={() => switchTab('cart')} size={26} color={navTab === 'cart' ? '#111' : '#bbb'} strokeWidth={navTab === 'cart' ? 3 : 2.5} cursor="pointer" />
                {cart.length > 0 && <div style={{ position: 'absolute', top: -5, right: -5, background: '#fbcb15', color: '#111', width: '16px', height: '16px', borderRadius: '50%', fontSize: '10px', fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{cart.length}</div>}
              </div>
              
              <div onClick={() => showToast("Scan Barcode feature coming soon")} style={{ width: '56px', height: '56px', background: '#fbcb15', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '-45px', boxShadow: '0 12px 25px rgba(251,203,21,0.4)', cursor: 'pointer' }}>
                <Plus size={28} color="white" strokeWidth={3} />
              </div>
              
              <Heart onClick={() => switchTab('favorites')} size={26} color={navTab === 'favorites' ? '#111' : '#bbb'} strokeWidth={navTab === 'favorites' ? 3 : 2.5} cursor="pointer" />
              <User onClick={() => switchTab('profile')} size={26} color={navTab === 'profile' ? '#111' : '#bbb'} strokeWidth={navTab === 'profile' ? 3 : 2.5} cursor="pointer" />
            </div>
          </motion.div>
        )}

        {/* ======================= DETAIL SCREEN ======================= */}
        {screen === 'detail' && selected && (
          <motion.div key="detail" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.3 }} style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative', background: '#fff', overflow: 'hidden' }}>
            
            {/* The Black Right Panel */}
            <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '42%', background: '#111', borderTopLeftRadius: '60px', borderBottomLeftRadius: '60px', zIndex: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <div style={{ transform: 'rotate(-90deg)', color: '#222', fontSize: '66px', fontWeight: 900, whiteSpace: 'nowrap', letterSpacing: '2px', marginLeft: '60px', userSelect: 'none' }}>
                Nike Max
               </div>
            </div>

            {/* Header */}
            <div style={{ padding: '60px 24px 20px', position: 'relative', zIndex: 10 }}>
              <div onClick={() => setScreen('home')} style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(0,0,0,0.03)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <ArrowLeft size={24} strokeWidth={2.5} />
              </div>
            </div>

            {/* Content Container */}
            <div style={{ display: 'flex', flexDirection: 'column', flex: 1, padding: '20px 24px', position: 'relative', zIndex: 10 }}>
              
              <h1 style={{ fontSize: '38px', fontWeight: 900, lineHeight: 1.1, marginBottom: '20px', maxWidth: '60%' }}>
                Nike {selected.name.split(' ')[0]}<br/>{selected.name.split(' ').slice(1).join(' ')}
              </h1>
              
              <p style={{ color: '#888', fontSize: '14px', lineHeight: 1.6, marginBottom: '30px', maxWidth: '58%', fontWeight: 500 }}>
                High-performance engineered upper meets our legendary cushioning. Unlock your best day.
              </p>
               
              <h4 style={{ fontSize: '16px', fontWeight: 800, marginBottom: '16px' }}>Select Size</h4>
              <div style={{ display: 'flex', gap: '12px', marginBottom: '30px' }}>
                {[2, 4, 6].map((sz) => {
                  const isActive = selectedSize === sz;
                  return (
                    <div 
                      key={sz} 
                      onClick={() => setSelectedSize(sz)}
                      style={{ width: '48px', height: '48px', borderRadius: '16px', border: isActive ? 'none' : '2px solid #eee', background: isActive ? '#111' : 'white', color: isActive ? 'white' : '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '16px', boxShadow: isActive ? '0 10px 20px rgba(0,0,0,0.1)' : 'none', cursor: 'pointer', transition: 'all 0.2s' }}
                    >
                      {sz}
                    </div>
                  );
                })}
              </div>

              {/* Shoe Image (Overlapping right panel) */}
              <div style={{ position: 'absolute', right: '-80px', top: '15%', height: '350px', width: '450px', zIndex: 15, pointerEvents: 'none' }}>
                <motion.img 
                  key={selected.id}
                  initial={{ scale: 0.8, rotate: -15, opacity: 0 }}
                  animate={{ scale: 1, rotate: -25, opacity: 1 }}
                  transition={{ type: 'spring', damping: 15, stiffness: 100 }}
                  src={selected.img} 
                  style={{ width: '100%', filter: 'drop-shadow(-20px 30px 25px rgba(0,0,0,0.4))' }} 
                />
              </div>

              {/* Ratings */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '2px', marginTop: 'auto', marginBottom: '80px' }}>
                {[1,2,3,4].map(s => <Star key={s} size={20} fill="#fbcb15" color="#fbcb15" />)}
                <Star size={20} fill="#eee" color="#eee" />
                <span style={{ fontSize: '15px', color: '#888', marginLeft: '10px', fontWeight: 800 }}>(4.8)</span>
                
                {/* Dummy Avatars */}
                <div onClick={() => showToast("Showing all 12 reviews")} style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto', position: 'relative', right: '40px', cursor: 'pointer' }}>
                  <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: '#FFC837', border: '2px solid white', zIndex: 3 }} />
                  <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: '#4facfe', border: '2px solid white', marginLeft: '-10px', zIndex: 2 }} />
                  <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: '#ff0844', border: '2px solid white', marginLeft: '-10px', zIndex: 1 }} />
                  <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: '#f5f6f8', border: '2px solid white', marginLeft: '-10px', zIndex: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 800, color: '#111' }}>+12</div>
                </div>
              </div>
            </div>

            {/* Bottom Add to Cart Bar */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '24px 30px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', zIndex: 20 }}>
              <div>
                <div style={{ fontSize: '14px', color: '#888', fontWeight: 700, marginBottom: '6px' }}>Total Price</div>
                <div style={{ fontSize: '32px', fontWeight: 900 }}>${(selected.price * 1).toFixed(2)}</div>
              </div>
              <button onClick={addToCart} style={{ background: '#fbcb15', color: '#111', border: 'none', padding: '16px 28px', borderRadius: '999px', fontSize: '15px', fontWeight: 800, whiteSpace: 'nowrap', boxShadow: '0 10px 25px rgba(251,203,21,0.4)', cursor: 'pointer', transition: 'transform 0.1s' }} onMouseDown={e => e.currentTarget.style.transform = 'scale(0.95)'} onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}>
                Add To Cart
              </button>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
