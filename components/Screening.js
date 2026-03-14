'use client';

import { useState } from 'react';
import { T, styles } from './constants';

export default function Screening({ onNavigate }) {
  const [answers, setAnswers] = useState(Array(T.screenQuestions.length).fill(-1));
  const [result, setResult] = useState(null);

  const submit = () => {
    const score = answers.reduce((a, b) => a + Math.max(b, 0), 0);
    const max = T.screenQuestions.length * 3;
    setResult(score <= max * 0.3 ? 'low' : score <= max * 0.6 ? 'mid' : 'high');
  };

  const allDone = answers.every((a) => a >= 0);
  const rColors = { low: '#6a9e5f', mid: '#c4a24e', high: '#c97a6a' };
  const rIcons = { low: '🌿', mid: '🌤', high: '💛' };
  const rTexts = { low: T.screenLow, mid: T.screenMid, high: T.screenHigh };

  if (result)
    return (
      <div style={{ textAlign: 'center', padding: '24px 16px' }}>
        <div style={{ fontSize: 52, marginBottom: 16 }}>{rIcons[result]}</div>
        <div
          style={{
            background: `${rColors[result]}12`,
            border: `1.5px solid ${rColors[result]}30`,
            borderRadius: 16,
            padding: 28,
            maxWidth: 440,
            margin: '0 auto',
          }}
        >
          <p style={{ fontSize: 16, color: '#3a4a3a', lineHeight: 1.8 }}>{rTexts[result]}</p>
        </div>
        {(result === 'mid' || result === 'high') && (
          <button onClick={() => onNavigate(4)} style={{ ...styles.primaryBtn, marginTop: 20 }}>
            View Resources →
          </button>
        )}
        <button
          onClick={() => {
            setAnswers(Array(T.screenQuestions.length).fill(-1));
            setResult(null);
          }}
          style={{ ...styles.secondaryBtn, marginTop: 12 }}
        >
          Retake
        </button>
      </div>
    );

  return (
    <div style={{ padding: '16px 0' }}>
      <p style={styles.sectionDesc}>{T.screenDesc}</p>
      <div style={{ maxWidth: 500, margin: '0 auto' }}>
        {T.screenQuestions.map((q, qi) => (
          <div
            key={qi}
            style={{
              background: answers[qi] >= 0 ? 'rgba(122,170,110,0.06)' : 'rgba(255,255,255,0.4)',
              borderRadius: 14,
              padding: '16px 20px',
              marginBottom: 10,
              border:
                answers[qi] >= 0
                  ? '1px solid rgba(122,170,110,0.2)'
                  : '1px solid rgba(139,176,132,0.1)',
              transition: 'all 0.3s',
            }}
          >
            <p style={{ fontSize: 14, color: '#3a5a35', marginBottom: 10, lineHeight: 1.6, fontWeight: 500 }}>
              {qi + 1}. {q}
            </p>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {T.screenOptions.map((opt, oi) => (
                <button
                  key={oi}
                  onClick={() => {
                    const a = [...answers];
                    a[qi] = oi;
                    setAnswers(a);
                  }}
                  style={{
                    padding: '7px 16px',
                    borderRadius: 20,
                    fontSize: 13,
                    cursor: 'pointer',
                    border: answers[qi] === oi ? '2px solid #7aaa6e' : '1px solid rgba(139,176,132,0.2)',
                    background: answers[qi] === oi ? 'rgba(122,170,110,0.18)' : 'rgba(255,255,255,0.5)',
                    color: answers[qi] === oi ? '#2a5a20' : '#5a7a55',
                    fontWeight: answers[qi] === oi ? 700 : 400,
                    transition: 'all 0.2s',
                  }}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        ))}
        <button
          onClick={submit}
          disabled={!allDone}
          style={{
            ...styles.primaryBtn,
            width: '100%',
            marginTop: 16,
            opacity: allDone ? 1 : 0.45,
            cursor: allDone ? 'pointer' : 'default',
          }}
        >
          {T.screenSubmit}
        </button>
      </div>
    </div>
  );
}
