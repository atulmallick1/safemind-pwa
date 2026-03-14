'use client';

import { useState } from 'react';
import { T, styles } from './constants';

export default function CheckIn({ onNavigate }) {
  const [mood, setMood] = useState(null);

  const suggestions = {
    0: [1, 2],
    1: [1, 2],
    2: [2, 3],
    3: [2, 3],
    4: [1, 4],
    5: [1, 3],
  };

  if (mood === null)
    return (
      <div style={{ textAlign: 'center', padding: '24px 0' }}>
        <p
          style={{
            fontSize: 20,
            color: '#3a5a35',
            fontFamily: "'Playfair Display', serif",
            marginBottom: 28,
          }}
        >
          {T.moodQ}
        </p>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 12,
            maxWidth: 420,
            margin: '0 auto',
          }}
        >
          {T.moods.map((m, i) => (
            <button
              key={i}
              onClick={() => setMood(i)}
              style={{
                padding: '16px 10px',
                borderRadius: 16,
                border: '1px solid rgba(139,176,132,0.15)',
                background: 'rgba(255,255,255,0.5)',
                cursor: 'pointer',
                width: 120,
                transition: 'all 0.25s',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(122,170,110,0.1)';
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.06)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.5)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <span style={{ fontSize: 32, marginBottom: 8 }}>{T.moodEmoji[i]}</span>
              <span style={{ fontSize: 13, color: '#4a6a45', fontWeight: 600 }}>{m}</span>
            </button>
          ))}
        </div>
      </div>
    );

  return (
    <div style={{ textAlign: 'center', padding: '24px 16px' }}>
      <div style={{ fontSize: 52, marginBottom: 12 }}>{T.moodEmoji[mood]}</div>
      <div
        style={{
          background: 'rgba(122,170,110,0.08)',
          borderRadius: 16,
          padding: 28,
          maxWidth: 440,
          margin: '0 auto 24px',
          border: '1px solid rgba(122,170,110,0.15)',
        }}
      >
        <p style={{ fontSize: 16, color: '#3a4a3a', lineHeight: 1.8, margin: 0 }}>
          {T.checkinResponse[mood]}
        </p>
      </div>
      <p style={{ fontSize: 14, color: '#6a8a65', marginBottom: 14, fontWeight: 600 }}>
        {T.suggest}
      </p>
      <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
        {(suggestions[mood] || [1, 2]).map((tabIdx) => (
          <button key={tabIdx} onClick={() => onNavigate(tabIdx)} style={styles.secondaryBtn}>
            {T.tryLabels[tabIdx - 1]}
          </button>
        ))}
      </div>
      <button onClick={() => setMood(null)} style={{ ...styles.linkBtn, marginTop: 20 }}>
        {T.resetMood}
      </button>
    </div>
  );
}
