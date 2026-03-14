'use client';

import { useState } from 'react';
import { T, LANGUAGES } from './constants';
import BreatheExercise from './BreatheExercise';
import GroundingExercise from './GroundingExercise';
import Screening from './Screening';
import ResourcesPanel from './ResourcesPanel';
import CheckIn from './CheckIn';
import InstallPrompt from './InstallPrompt';

function LandingPage({ lang, setLang, onEnter }) {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative blobs */}
      <div
        style={{
          position: 'absolute', top: -120, right: -100,
          width: 380, height: 380, borderRadius: '50%',
          background: 'rgba(139,176,132,0.07)',
        }}
      />
      <div
        style={{
          position: 'absolute', bottom: -80, left: -80,
          width: 300, height: 300, borderRadius: '50%',
          background: 'rgba(180,210,170,0.08)',
        }}
      />
      <div
        style={{
          position: 'absolute', top: '35%', left: '8%',
          width: 120, height: 120, borderRadius: '50%',
          background: 'rgba(170,200,160,0.06)',
        }}
      />

      {/* Language */}
      <div style={{ position: 'absolute', top: 20, right: 24, zIndex: 2 }}>
        <select
          value={lang}
          onChange={(e) => setLang(e.target.value)}
          style={{
            padding: '7px 14px', borderRadius: 8,
            border: '1px solid rgba(139,176,132,0.25)',
            background: 'rgba(255,255,255,0.6)',
            fontSize: 13, color: '#4a6a45', cursor: 'pointer',
            backdropFilter: 'blur(8px)',
          }}
        >
          {Object.entries(LANGUAGES).map(([k, v]) => (
            <option key={k} value={k}>{v}</option>
          ))}
        </select>
      </div>

      {/* Hero */}
      <div style={{ textAlign: 'center', zIndex: 1, maxWidth: 460 }}>
        <div
          style={{
            width: 90, height: 90, borderRadius: '50%', margin: '0 auto 24px',
            background: 'linear-gradient(135deg, rgba(122,170,110,0.15) 0%, rgba(160,200,150,0.1) 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '2px solid rgba(122,170,110,0.2)',
          }}
        >
          <span style={{ fontSize: 42 }}>🌿</span>
        </div>
        <h1
          style={{
            fontSize: 52, fontFamily: "'Playfair Display', serif",
            color: '#2a4a25', margin: '0 0 10px',
            letterSpacing: -1.5, fontWeight: 600,
          }}
        >
          {T.appName}
        </h1>
        <p style={{ fontSize: 18, color: '#6a8a65', margin: '0 0 8px', fontWeight: 400, letterSpacing: 0.3, lineHeight: 1.6 }}>
          {T.tagline}
        </p>
        <p
          style={{
            fontSize: 13, color: '#8aaa80', margin: '0 auto 40px',
            lineHeight: 1.6, maxWidth: 340,
          }}
        >
          {T.subtitle}
        </p>
        <button
          onClick={onEnter}
          style={{
            padding: '16px 52px', borderRadius: 30, border: 'none', cursor: 'pointer',
            background: 'linear-gradient(135deg, #7aaa6e 0%, #5a8e52 100%)',
            color: '#fff', fontSize: 16, fontWeight: 700, letterSpacing: 0.5,
            boxShadow: '0 8px 32px rgba(90,142,82,0.28)',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 12px 40px rgba(90,142,82,0.35)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(90,142,82,0.28)';
          }}
        >
          Begin
        </button>
        <p style={{
          fontSize: 12, color: '#8aaa80', marginTop: 20, letterSpacing: 0.5,
        }}>
          <a href={T.brandUrl} target="_blank" rel="noopener noreferrer" style={{
            color: '#7aaa6e', textDecoration: 'none', fontWeight: 600,
          }}>
            {T.brand}
          </a>
        </p>
      </div>

      <div style={{ position: 'absolute', bottom: 28, textAlign: 'center' }}>
        <p style={{ fontSize: 12, color: '#8aaa85', margin: 0 }}>{T.crisisLine}</p>
      </div>
    </div>
  );
}

export default function SafeMind() {
  const [lang, setLang] = useState('en');
  const [tab, setTab] = useState(0);
  const [entered, setEntered] = useState(false);

  if (!entered) {
    return <LandingPage lang={lang} setLang={setLang} onEnter={() => setEntered(true)} />;
  }

  const renderTab = () => {
    switch (tab) {
      case 0: return <CheckIn onNavigate={setTab} />;
      case 1: return <BreatheExercise />;
      case 2: return <GroundingExercise />;
      case 3: return <Screening onNavigate={setTab} />;
      case 4: return <ResourcesPanel />;
      default: return null;
    }
  };

  return (
    <div style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      {/* Decorative bg */}
      <div style={{ position: 'fixed', top: -100, right: -80, width: 320, height: 320, borderRadius: '50%', background: 'rgba(139,176,132,0.05)', pointerEvents: 'none' }} />
      <div style={{ position: 'fixed', bottom: -60, left: -60, width: 260, height: 260, borderRadius: '50%', background: 'rgba(180,210,170,0.06)', pointerEvents: 'none' }} />

      {/* Header */}
      <div
        style={{
          padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          borderBottom: '1px solid rgba(139,176,132,0.1)',
          background: 'rgba(255,255,255,0.4)', backdropFilter: 'blur(12px)',
          position: 'sticky', top: 0, zIndex: 10,
        }}
      >
        <div
          style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}
          onClick={() => setEntered(false)}
        >
          <span style={{ fontSize: 22 }}>🌿</span>
          <span style={{ fontSize: 20, fontFamily: "'Playfair Display', serif", color: '#2a4a25', fontWeight: 600 }}>
            {T.appName}
          </span>
        </div>
        <select
          value={lang}
          onChange={(e) => setLang(e.target.value)}
          style={{
            padding: '5px 10px', borderRadius: 8,
            border: '1px solid rgba(139,176,132,0.2)',
            background: 'rgba(255,255,255,0.5)',
            fontSize: 12, color: '#4a6a45', cursor: 'pointer',
          }}
        >
          {Object.entries(LANGUAGES).map(([k, v]) => (
            <option key={k} value={k}>{v}</option>
          ))}
        </select>
      </div>

      {/* Tab bar */}
      <div
        style={{
          display: 'flex', justifyContent: 'center', gap: 4, padding: '12px 16px',
          background: 'rgba(255,255,255,0.25)',
          borderBottom: '1px solid rgba(139,176,132,0.08)',
          overflowX: 'auto',
        }}
      >
        {T.tabs.map((name, i) => (
          <button
            key={i}
            onClick={() => setTab(i)}
            style={{
              padding: '8px 16px', borderRadius: 20, border: 'none', cursor: 'pointer',
              background: tab === i ? 'rgba(122,170,110,0.18)' : 'transparent',
              color: tab === i ? '#2a5a20' : '#6a8a65',
              fontWeight: tab === i ? 700 : 500, fontSize: 13,
              transition: 'all 0.25s', whiteSpace: 'nowrap',
              display: 'flex', alignItems: 'center', gap: 6,
            }}
          >
            <span style={{ fontSize: 14 }}>{T.tabIcons[i]}</span>
            {name}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ maxWidth: 600, margin: '0 auto', padding: '20px 20px 100px' }}>
        <h2
          style={{
            fontSize: 26, fontFamily: "'Playfair Display', serif",
            color: '#2a4a25', textAlign: 'center',
            margin: '0 0 8px', fontWeight: 600,
          }}
        >
          {T.tabs[tab]}
        </h2>
        {renderTab()}
      </div>

      {/* PWA Install Prompt */}
      <InstallPrompt />

      {/* Footer */}
      <div
        style={{
          position: 'fixed', bottom: 0, left: 0, right: 0,
          padding: '10px 20px', textAlign: 'center',
          background: 'linear-gradient(transparent, rgba(238,244,232,0.95) 30%)',
          pointerEvents: 'none',
        }}
      >
        <p style={{ fontSize: 11, color: '#8aaa80', margin: 0 }}>
          {T.footer} ·{' '}
          <a href={T.brandUrl} target="_blank" rel="noopener noreferrer" style={{
            color: '#7aaa6e', textDecoration: 'none', fontWeight: 600, pointerEvents: 'auto',
          }}>
            {T.brand}
          </a>
        </p>
      </div>
    </div>
  );
}
