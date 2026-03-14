'use client';

import { useState } from 'react';
import { T, styles } from './constants';

export default function GroundingExercise() {
  const [step, setStep] = useState(0);
  const [inputs, setInputs] = useState(Array(5).fill(''));
  const [done, setDone] = useState(false);

  if (done)
    return (
      <div style={{ textAlign: 'center', padding: '40px 20px' }}>
        <div style={{ fontSize: 52, marginBottom: 20, filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))' }}>🌿</div>
        <p
          style={{
            fontSize: 20,
            color: '#3a5a35',
            fontFamily: "'Playfair Display', serif",
            lineHeight: 1.7,
            maxWidth: 360,
            margin: '0 auto',
          }}
        >
          {T.groundDone}
        </p>
        <button
          onClick={() => {
            setStep(0);
            setInputs(Array(5).fill(''));
            setDone(false);
          }}
          style={{ ...styles.secondaryBtn, marginTop: 24 }}
        >
          Try Again
        </button>
      </div>
    );

  const s = T.groundSteps[step];

  return (
    <div style={{ padding: '16px 0' }}>
      <p style={styles.sectionDesc}>{T.groundDesc}</p>
      <div style={styles.card}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginBottom: 24 }}>
          {T.groundSteps.map((_, i) => (
            <div
              key={i}
              style={{
                width: i === step ? 28 : 10,
                height: 10,
                borderRadius: 5,
                background:
                  i < step
                    ? '#7aaa6e'
                    : i === step
                      ? 'linear-gradient(90deg, #7aaa6e, #5a8e52)'
                      : 'rgba(139,176,132,0.2)',
                transition: 'all 0.4s ease',
              }}
            />
          ))}
        </div>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <span style={{ fontSize: 48, display: 'block', marginBottom: 12 }}>{s.icon}</span>
          <p style={{ fontSize: 26, color: '#3a5a35', fontFamily: "'Playfair Display', serif", margin: '0 0 6px' }}>
            Name <strong>{s.n}</strong>
          </p>
          <p style={{ color: '#6a8a65', fontSize: 15, margin: 0 }}>{s.sense}</p>
        </div>
        <textarea
          value={inputs[step]}
          onChange={(e) => {
            const a = [...inputs];
            a[step] = e.target.value;
            setInputs(a);
          }}
          placeholder={T.groundPlaceholder}
          rows={3}
          style={styles.textarea}
        />
        <button
          onClick={() => (step < 4 ? setStep(step + 1) : setDone(true))}
          disabled={!inputs[step].trim()}
          style={{
            ...styles.primaryBtn,
            width: '100%',
            marginTop: 14,
            opacity: inputs[step].trim() ? 1 : 0.5,
            cursor: inputs[step].trim() ? 'pointer' : 'default',
          }}
        >
          {step < 4 ? T.groundNext : '✓ Complete'}
        </button>
      </div>
    </div>
  );
}
