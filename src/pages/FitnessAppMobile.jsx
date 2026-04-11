import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, ArrowLeft, Music, Pause, SkipForward, SkipBack, Play, Home as HomeIcon, Compass, Calendar, User, ChevronRight, X, Battery, Flame, Clock } from 'lucide-react';

// Theme Colors
const COLORS = {
  bg: '#f6f7fb',
  purple: '#927cf5',
  purpleLight: '#e4dcff',
  green: '#abf2c7',
  pink: '#fce3fc',
  text: '#111827',
  textMuted: '#6b7280',
};

// Data
const EXERCISES = [
  { id: 1, title: 'Seated Side Bend Left', time: '00:50', img: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=300' },
  { id: 2, title: 'Seated Side Bend Right', time: '00:50', img: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?auto=format&fit=crop&q=80&w=300' },
  { id: 3, title: 'Kneeling Stretch', time: '01:00', img: 'https://images.unsplash.com/photo-1552286450-37b98bc9ceb1?auto=format&fit=crop&q=80&w=300' },
  { id: 4, title: 'Core Engagement', time: '00:45', img: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=300' },
];

export default function FitnessAppMobile({ onExit }) {
  const [screen, setScreen] = useState('home'); // 'home', 'course', 'active'
  const [activeTab, setActiveTab] = useState('home');
  const [activeCategory, setActiveCategory] = useState('All');
  
  const [activeExerciseIdx, setActiveExerciseIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timer, setTimer] = useState(50); // seconds

  useEffect(() => {
    let interval;
    if (isPlaying && timer > 0) {
      interval = setInterval(() => setTimer(t => t - 1), 1000);
    } else if (timer === 0 && isPlaying) {
      // Auto next
      handleNext();
    }
    return () => clearInterval(interval);
  }, [isPlaying, timer]);

  const handleNext = () => {
    if (activeExerciseIdx < EXERCISES.length - 1) {
      setActiveExerciseIdx(i => i + 1);
      setTimer(50);
    } else {
      setIsPlaying(false);
    }
  };

  const handlePrev = () => {
    if (activeExerciseIdx > 0) {
      setActiveExerciseIdx(i => i - 1);
      setTimer(50);
    }
  };

  const padTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const openCourse = () => {
    setScreen('course');
  };

  const startExercise = (idx = 0) => {
    setActiveExerciseIdx(idx);
    setTimer(50);
    setIsPlaying(true);
    setScreen('active');
  };

  return (
    <div style={{ position: 'fixed', inset: 0, height: '100dvh', zIndex: 9999, background: COLORS.bg, display: 'flex', flexDirection: 'column', color: COLORS.text, fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      
      {/* ── Exit Button (Floating Top Center) ── */}
      <button 
        onClick={onExit} 
        style={{ position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)', zIndex: 10000, background: 'rgba(0,0,0,0.8)', color: 'white', border: 'none', padding: '8px 20px', borderRadius: '999px', fontSize: '13px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', boxShadow: '0 10px 30px rgba(0,0,0,0.2)', backdropFilter: 'blur(10px)' }}
      >
        <X size={16} strokeWidth={2.5} /> Exit
      </button>

      <AnimatePresence mode="wait">
        
        {/* ======================= HOME SCREEN ======================= */}
        {screen === 'home' && (
          <motion.div key="home" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.3 }} style={{ flex: 1, display: 'flex', flexDirection: 'column', paddingBottom: '90px' }}>
            
            {/* Header */}
            <div style={{ padding: '60px 24px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150" alt="Profile" style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }} />
                <div>
                  <div style={{ fontSize: '12px', color: COLORS.textMuted, fontWeight: 600, marginBottom: '2px' }}>Good Morning</div>
                  <div style={{ fontSize: '18px', fontWeight: 800 }}>Magnolia Jane</div>
                </div>
              </div>
              <div style={{ width: '46px', height: '46px', background: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
                <Bell size={20} strokeWidth={2.5} />
              </div>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', minHeight: 0 }}>
              <div style={{ padding: '0 24px' }}>
                <h1 style={{ fontSize: '32px', fontWeight: 900, lineHeight: 1.15, marginBottom: '24px', maxWidth: '80%' }}>
                  Welcome to Your Pilates Session
                </h1>

                {/* Hero Card */}
                <div onClick={openCourse} style={{ position: 'relative', background: 'linear-gradient(135deg, #a088f5, #8872e4)', borderRadius: '32px', padding: '24px', overflow: 'hidden', color: 'white', marginBottom: '24px', cursor: 'pointer', boxShadow: '0 20px 40px rgba(146, 124, 245, 0.3)' }}>
                  {/* Decorative blobs */}
                  <div style={{ position: 'absolute', top: -50, right: -20, width: '150px', height: '150px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%' }} />
                  <div style={{ position: 'absolute', bottom: -50, right: 80, width: '100px', height: '100px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%' }} />
                  
                  <div style={{ position: 'relative', zIndex: 1, width: '60%' }}>
                    <div style={{ fontSize: '24px', fontWeight: 800, marginBottom: '8px' }}>Day 1</div>
                    <p style={{ fontSize: '13px', fontWeight: 500, opacity: 0.9, marginBottom: '24px', lineHeight: 1.5 }}>
                      Do 7 Exercises in<br/>Only 6 Minutes
                    </p>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'white', color: COLORS.purple, padding: '8px 16px 8px 20px', borderRadius: '999px', fontSize: '13px', fontWeight: 800 }}>
                      Start <div style={{ background: COLORS.purple, color: 'white', borderRadius: '50%', padding: '4px' }}><ArrowLeft size={14} style={{ transform: 'rotate(180deg)' }} /></div>
                    </div>
                  </div>

                  <img src="https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=400" alt="Pilates" style={{ position: 'absolute', right: '-40px', bottom: '0', height: '120%', width: 'auto', maskImage: 'linear-gradient(to right, transparent, black 40%)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 40%)' }} />
                </div>
              </div>

              {/* Categories */}
              <div style={{ display: 'flex', gap: '12px', padding: '0 24px 24px', overflowX: 'auto', msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
                {['All', 'Butt & Leg', 'Abs', 'Full body', 'Arm'].map(c => {
                  const isActive = activeCategory === c;
                  return (
                    <div key={c} onClick={() => setActiveCategory(c)} style={{ whiteSpace: 'nowrap', padding: '12px 24px', borderRadius: '999px', background: isActive ? 'white' : 'transparent', border: isActive ? '1px solid transparent' : '1px solid #e5e7eb', color: isActive ? COLORS.text : COLORS.textMuted, fontSize: '14px', fontWeight: isActive ? 800 : 700, boxShadow: isActive ? '0 4px 15px rgba(0,0,0,0.04)' : 'none', cursor: 'pointer', transition: 'all 0.2s' }}>
                      {c}
                    </div>
                  )
                })}
              </div>

              {/* Challenges */}
              <div style={{ padding: '0 24px 24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h3 style={{ fontSize: '20px', fontWeight: 800 }}>Challenges</h3>
                  <span style={{ fontSize: '13px', color: COLORS.textMuted, fontWeight: 700 }}>See All</span>
                </div>

                <div style={{ display: 'flex', gap: '16px', overflowX: 'auto', margin: '0 -24px', padding: '0 24px 20px' }}>
                  {/* Challenge Card 1 */}
                  <div style={{ minWidth: '240px', background: COLORS.green, borderRadius: '32px', padding: '24px', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px', position: 'relative', zIndex: 1 }}>
                      <div style={{ fontSize: '18px', fontWeight: 800 }}>Core Pilates</div>
                      <div style={{ background: 'rgba(255,255,255,0.4)', padding: '4px 12px', borderRadius: '999px', fontSize: '11px', fontWeight: 800 }}>14-Day</div>
                    </div>

                    <div style={{ position: 'relative', zIndex: 1, marginBottom: '24px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', marginLeft: '8px' }}>
                        {[1,2,3].map(i => <div key={i} style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#ccc', marginLeft: '-8px', border: '2px solid '+COLORS.green, backgroundImage: `url(https://i.pravatar.cc/100?img=${i})`, backgroundSize: 'cover' }} />)}
                      </div>
                      <div style={{ fontSize: '12px', fontWeight: 700, marginTop: '8px' }}>users joined 156K</div>
                    </div>

                    <button style={{ position: 'relative', zIndex: 1, background: 'rgba(255,255,255,0.4)', border: 'none', padding: '10px 24px', borderRadius: '999px', fontSize: '13px', fontWeight: 800, cursor: 'pointer' }}>Join</button>

                    <img src="https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=200" style={{ position: 'absolute', right: -20, bottom: -10, width: '140px', mixBlendMode: 'multiply', opacity: 0.5 }} />
                  </div>

                  {/* Challenge Card 2 */}
                  <div style={{ minWidth: '240px', background: COLORS.pink, borderRadius: '32px', padding: '24px', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px', position: 'relative', zIndex: 1 }}>
                      <div style={{ fontSize: '18px', fontWeight: 800 }}>Face Yoga</div>
                    </div>
                    <div style={{ position: 'relative', zIndex: 1, marginBottom: '24px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', marginLeft: '8px' }}>
                        {[4,5,6].map(i => <div key={i} style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#ccc', marginLeft: '-8px', border: '2px solid '+COLORS.pink, backgroundImage: `url(https://i.pravatar.cc/100?img=${i+10})`, backgroundSize: 'cover' }} />)}
                      </div>
                      <div style={{ fontSize: '12px', fontWeight: 700, marginTop: '8px' }}>users joined 92K</div>
                    </div>
                    <button style={{ position: 'relative', zIndex: 1, background: 'white', color: COLORS.purple, border: 'none', padding: '10px 24px', borderRadius: '999px', fontSize: '13px', fontWeight: 800, cursor: 'pointer' }}>Join</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Bottom Nav */}
            <div style={{ position: 'fixed', bottom: '24px', left: '24px', right: '24px', background: 'white', padding: '12px', borderRadius: '999px', display: 'flex', justifyContent: 'space-around', alignItems: 'center', boxShadow: '0 20px 40px rgba(0,0,0,0.08)', zIndex: 10 }}>
              <div onClick={() => setActiveTab('home')} style={{ background: activeTab === 'home' ? COLORS.purple : 'transparent', color: activeTab === 'home' ? 'white' : COLORS.textMuted, width: '48px', height: '48px', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s', cursor: 'pointer' }}>
                <HomeIcon size={22} strokeWidth={2.5} />
              </div>
              <div onClick={() => setActiveTab('explore')} style={{ color: activeTab === 'explore' ? COLORS.text : COLORS.textMuted, width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <Compass size={24} strokeWidth={2.5} />
              </div>
              <div onClick={() => setActiveTab('calendar')} style={{ color: activeTab === 'calendar' ? COLORS.text : COLORS.textMuted, width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <Calendar size={24} strokeWidth={2.5} />
              </div>
              <div onClick={() => setActiveTab('profile')} style={{ color: activeTab === 'profile' ? COLORS.text : COLORS.textMuted, width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <User size={24} strokeWidth={2.5} />
              </div>
            </div>
          </motion.div>
        )}

        {/* ======================= COURSE SCREEN ======================= */}
        {screen === 'course' && (
          <motion.div key="course" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }} transition={{ duration: 0.3, ease: 'easeOut' }} style={{ flex: 1, background: 'white', display: 'flex', flexDirection: 'column', position: 'relative' }}>
            
            {/* Top Image Area */}
            <div style={{ position: 'relative', height: '35vh', width: '100%', overflow: 'hidden' }}>
              <button onClick={() => setScreen('home')} style={{ position: 'absolute', top: '50px', left: '20px', zIndex: 10, width: '44px', height: '44px', background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(10px)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer' }}>
                <ArrowLeft size={22} strokeWidth={2.5} color="#111" />
              </button>
              <img src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800" alt="Course Cover" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            {/* Content Area */}
            <div style={{ flex: 1, background: 'white', borderTopLeftRadius: '32px', borderTopRightRadius: '32px', marginTop: '-32px', position: 'relative', zIndex: 2, padding: '32px 24px', overflowY: 'auto', minHeight: 0, paddingBottom: '100px' }}>
              
              <h2 style={{ fontSize: '26px', fontWeight: 900, marginBottom: '24px' }}>Pilates Primer</h2>
              
              {/* Stats Row */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '32px' }}>
                <div style={{ background: COLORS.green, padding: '20px 16px', borderRadius: '24px', display: 'flex', flexDirection: 'column' }}>
                  <Battery size={20} style={{ marginBottom: '12px', opacity: 0.7 }} />
                  <div style={{ fontSize: '15px', fontWeight: 800, marginBottom: '4px' }}>Beginner</div>
                  <div style={{ fontSize: '12px', fontWeight: 600, opacity: 0.7 }}>Level</div>
                </div>
                <div style={{ background: COLORS.purpleLight, padding: '20px 16px', borderRadius: '24px', display: 'flex', flexDirection: 'column' }}>
                  <Flame size={20} style={{ marginBottom: '12px', opacity: 0.7 }} />
                  <div style={{ fontSize: '15px', fontWeight: 800, marginBottom: '4px' }}>50.4</div>
                  <div style={{ fontSize: '12px', fontWeight: 600, opacity: 0.7 }}>Kcal</div>
                </div>
                <div style={{ background: COLORS.pink, padding: '20px 16px', borderRadius: '24px', display: 'flex', flexDirection: 'column' }}>
                  <Clock size={20} style={{ marginBottom: '12px', opacity: 0.7 }} />
                  <div style={{ fontSize: '15px', fontWeight: 800, marginBottom: '4px' }}>6 min</div>
                  <div style={{ fontSize: '12px', fontWeight: 600, opacity: 0.7 }}>Net Duration</div>
                </div>
              </div>

              {/* Exercises List */}
              <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '16px' }}>Exercises ({EXERCISES.length})</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {EXERCISES.map((ex, i) => (
                  <div key={ex.id} onClick={() => startExercise(i)} style={{ display: 'flex', alignItems: 'center', gap: '16px', background: '#fafafa', padding: '12px', borderRadius: '24px', cursor: 'pointer' }}>
                    <img src={ex.img} alt={ex.title} style={{ width: '70px', height: '70px', borderRadius: '16px', objectFit: 'cover' }} />
                    <div>
                      <div style={{ fontSize: '16px', fontWeight: 800, marginBottom: '8px' }}>{ex.title}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: COLORS.textMuted, fontWeight: 600 }}>
                        <Clock size={14} /> {ex.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating Start Button */}
            <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, padding: '24px', background: 'linear-gradient(to top, white 80%, transparent)', zIndex: 10 }}>
              <button onClick={() => startExercise(0)} style={{ width: '100%', background: 'white', color: COLORS.text, border: '1px solid #e5e5e5', borderRadius: '999px', padding: '20px', fontSize: '16px', fontWeight: 800, cursor: 'pointer', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                Start
              </button>
            </div>
          </motion.div>
        )}

        {/* ======================= ACTIVE EXERCISE SCREEN ======================= */}
        {screen === 'active' && (
          <motion.div key="active" initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 100 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} style={{ flex: 1, background: COLORS.bg, display: 'flex', flexDirection: 'column', padding: '50px 24px 40px' }}>
            
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
              <button onClick={() => setScreen('course')} style={{ width: '48px', height: '48px', background: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer', boxShadow: '0 5px 15px rgba(0,0,0,0.02)' }}>
                <ArrowLeft size={22} strokeWidth={2.5} />
              </button>
              <h2 style={{ fontSize: '16px', fontWeight: 800 }}>{EXERCISES[activeExerciseIdx].title}</h2>
              <button style={{ width: '48px', height: '48px', background: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer', boxShadow: '0 5px 15px rgba(0,0,0,0.02)' }}>
                <Music size={20} strokeWidth={2.5} />
              </button>
            </div>

            {/* Video/Image Area */}
            <div style={{ flex: 1, minHeight: 0, background: '#ccc', borderRadius: '40px', overflow: 'hidden', marginBottom: '32px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
              <img src={EXERCISES[activeExerciseIdx].img} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            {/* Progress Area */}
            <div style={{ background: 'white', borderRadius: '32px', padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', boxShadow: '0 5px 20px rgba(0,0,0,0.02)' }}>
              <div>
                <div style={{ fontSize: '18px', fontWeight: 800, marginBottom: '6px' }}>Completed</div>
                <div style={{ fontSize: '13px', color: COLORS.textMuted, fontWeight: 600 }}>Exercise {activeExerciseIdx + 1}/{EXERCISES.length}</div>
              </div>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', border: '4px solid '+COLORS.purpleLight, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, position: 'relative' }}>
                {Math.round(((activeExerciseIdx+1)/EXERCISES.length)*100)}%
                <svg style={{ position: 'absolute', top: -4, left: -4, width: '60px', height: '60px', transform: 'rotate(-90deg)' }}>
                  <circle cx="30" cy="30" r="26" fill="transparent" stroke={COLORS.purple} strokeWidth="4" strokeDasharray={`${Math.round(((activeExerciseIdx+1)/EXERCISES.length)*163)} 163`} strokeLinecap="round" />
                </svg>
              </div>
            </div>

            {/* Controls Area */}
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '36px', fontWeight: 900, marginBottom: '24px', fontVariantNumeric: 'tabular-nums' }}>
                {padTime(timer)}
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '32px' }}>
                <button onClick={handlePrev} style={{ width: '60px', height: '60px', background: 'white', borderRadius: '50%', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 5px 15px rgba(0,0,0,0.03)' }}>
                  <SkipBack size={24} color={COLORS.text} strokeWidth={2.5} />
                </button>
                
                <button onClick={() => setIsPlaying(!isPlaying)} style={{ width: '80px', height: '80px', background: COLORS.purple, borderRadius: '40px', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'white', boxShadow: '0 20px 30px rgba(146, 124, 245, 0.4)' }}>
                  {isPlaying ? <Pause size={32} fill="white" /> : <Play size={32} fill="white" style={{ marginLeft: '4px' }} />}
                </button>
                
                <button onClick={handleNext} style={{ width: '60px', height: '60px', background: 'white', borderRadius: '50%', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 5px 15px rgba(0,0,0,0.03)' }}>
                  <SkipForward size={24} color={COLORS.text} strokeWidth={2.5} />
                </button>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
