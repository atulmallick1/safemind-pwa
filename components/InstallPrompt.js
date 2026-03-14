'use client';
import { useState, useEffect } from 'react';
import { t } from './constants';

export default function InstallPrompt({ lang }) {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showBanner, setShowBanner] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [showIOSTip, setShowIOSTip] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(display-mode: standalone)').matches) return;
    const ios = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    setIsIOS(ios);
    if (ios) { const timer = setTimeout(() => setShowIOSTip(true), 10000); return () => clearTimeout(timer); }
    const handler = (e) => { e.preventDefault(); setDeferredPrompt(e); setShowBanner(true); };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setShowBanner(false);
    setDeferredPrompt(null);
  };

  if (showBanner) return (
    <div style={{ position: 'fixed', bottom: 20, left: 16, right: 16, zIndex: 100, background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(12px)', borderRadius: 16, padding: '16px 20px', border: '1px solid rgba(122,170,110,0.2)', boxShadow: '0 8px 32px rgba(0,0,0,0.12)', display: 'flex', alignItems: 'center', gap: 14, maxWidth: 440, margin: '0 auto' }}>
      <span style={{ fontSize: 32 }}>🌿</span>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#2a4a25', marginBottom: 2 }}>{t('install', lang) || 'Install SafeMind'}</div>
        <div style={{ fontSize: 12, color: '#6a8a65', lineHeight: 1.4 }}>{t('installDesc', lang) || 'Works offline'}</div>
      </div>
      <button onClick={handleInstall} style={{ padding: '8px 18px', borderRadius: 20, border: 'none', background: 'linear-gradient(135deg, #7aaa6e, #5a8e52)', color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap' }}>{t('installBtn', lang) || 'Install'}</button>
      <button onClick={() => setShowBanner(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#aaa', fontSize: 18, padding: '0 4px' }}>×</button>
    </div>
  );

  if (showIOSTip) return (
    <div style={{ position: 'fixed', bottom: 20, left: 16, right: 16, zIndex: 100, background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(12px)', borderRadius: 16, padding: '16px 20px', border: '1px solid rgba(122,170,110,0.2)', boxShadow: '0 8px 32px rgba(0,0,0,0.12)', maxWidth: 440, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#2a4a25', marginBottom: 6 }}>🌿 {t('installIOS', lang) || 'Add to Home Screen'}</div>
          <div style={{ fontSize: 13, color: '#6a8a65', lineHeight: 1.5 }}>{t('installIOSDesc', lang) || 'Tap Share, then Add to Home Screen.'}</div>
        </div>
        <button onClick={() => setShowIOSTip(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#aaa', fontSize: 18, padding: '0 0 0 12px' }}>×</button>
      </div>
    </div>
  );

  return null;
}
