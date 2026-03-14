'use client';

import { useState, useEffect } from 'react';

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showBanner, setShowBanner] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [showIOSTip, setShowIOSTip] = useState(false);

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) return;

    // Detect iOS
    const ios = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    setIsIOS(ios);

    if (ios) {
      // Show iOS install tip after 10 seconds
      const timer = setTimeout(() => setShowIOSTip(true), 10000);
      return () => clearTimeout(timer);
    }

    // Android/Desktop — capture install prompt
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowBanner(true);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const result = await deferredPrompt.userChoice;
    if (result.outcome === 'accepted') {
      setShowBanner(false);
    }
    setDeferredPrompt(null);
  };

  // Android/Desktop install banner
  if (showBanner) return (
    <div style={{
      position: 'fixed', bottom: 20, left: 16, right: 16, zIndex: 100,
      background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(12px)',
      borderRadius: 16, padding: '16px 20px',
      border: '1px solid rgba(122,170,110,0.2)',
      boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
      display: 'flex', alignItems: 'center', gap: 14,
      maxWidth: 440, margin: '0 auto',
    }}>
      <span style={{ fontSize: 32 }}>🌿</span>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#2a4a25', marginBottom: 2 }}>
          Install SafeMind
        </div>
        <div style={{ fontSize: 12, color: '#6a8a65', lineHeight: 1.4 }}>
          Works offline — use anytime, anywhere
        </div>
      </div>
      <button onClick={handleInstall} style={{
        padding: '8px 18px', borderRadius: 20, border: 'none',
        background: 'linear-gradient(135deg, #7aaa6e, #5a8e52)',
        color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer',
        whiteSpace: 'nowrap',
      }}>
        Install
      </button>
      <button onClick={() => setShowBanner(false)} style={{
        background: 'none', border: 'none', cursor: 'pointer',
        color: '#aaa', fontSize: 18, padding: '0 4px',
      }}>×</button>
    </div>
  );

  // iOS install tip
  if (showIOSTip) return (
    <div style={{
      position: 'fixed', bottom: 20, left: 16, right: 16, zIndex: 100,
      background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(12px)',
      borderRadius: 16, padding: '16px 20px',
      border: '1px solid rgba(122,170,110,0.2)',
      boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
      maxWidth: 440, margin: '0 auto',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#2a4a25', marginBottom: 6 }}>
            🌿 Add SafeMind to Home Screen
          </div>
          <div style={{ fontSize: 13, color: '#6a8a65', lineHeight: 1.5 }}>
            Tap the <strong>Share</strong> button <span style={{ fontSize: 16 }}>⎙</span> below, then select <strong>"Add to Home Screen"</strong> for offline access.
          </div>
        </div>
        <button onClick={() => setShowIOSTip(false)} style={{
          background: 'none', border: 'none', cursor: 'pointer',
          color: '#aaa', fontSize: 18, padding: '0 0 0 12px',
        }}>×</button>
      </div>
    </div>
  );

  return null;
}
