'use client';

import { T } from './constants';

export default function ResourcesPanel() {
  return (
    <div style={{ padding: '16px 0' }}>
      <p
        style={{
          color: '#5a6e5a',
          fontSize: 15,
          lineHeight: 1.7,
          maxWidth: 420,
          margin: '0 auto 28px',
          textAlign: 'center',
        }}
      >
        {T.resourceDesc}
      </p>
      <div style={{ maxWidth: 500, margin: '0 auto' }}>
        {T.resources.map((r, i) => (
          <a
            key={i}
            href={r.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'block',
              textDecoration: 'none',
              background: 'rgba(255,255,255,0.5)',
              borderRadius: 14,
              padding: '18px 22px',
              marginBottom: 10,
              border: '1px solid rgba(139,176,132,0.12)',
              transition: 'all 0.25s',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 24px rgba(122,170,110,0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div
                  style={{
                    fontSize: 16,
                    color: '#3a6a30',
                    fontWeight: 700,
                    marginBottom: 4,
                    fontFamily: "'Playfair Display', serif",
                  }}
                >
                  {r.name}
                </div>
                <div style={{ fontSize: 13, color: '#6a8a65', lineHeight: 1.5 }}>{r.desc}</div>
                {r.phone && (
                  <div style={{ fontSize: 13, color: '#7aaa6e', marginTop: 6, fontWeight: 700 }}>
                    {r.phone}
                  </div>
                )}
              </div>
              <span style={{ fontSize: 18, color: '#7aaa6e', marginLeft: 12 }}>↗</span>
            </div>
          </a>
        ))}
      </div>
      <div
        style={{
          marginTop: 20,
          padding: '14px 20px',
          borderRadius: 12,
          background: 'rgba(201,122,106,0.07)',
          border: '1px solid rgba(201,122,106,0.12)',
          maxWidth: 500,
          margin: '20px auto 0',
          textAlign: 'center',
        }}
      >
        <p style={{ fontSize: 13, color: '#a05a4a', fontWeight: 500, margin: 0 }}>
          ⚠ {T.safetyNotice}
        </p>
      </div>
    </div>
  );
}
