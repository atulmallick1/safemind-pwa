'use client';

import { useState, useEffect, useRef } from 'react';
import { T, styles } from './constants';

export default function BreatheExercise() {
  const [active, setActive] = useState(false);
  const [phase, setPhase] = useState(0);
  const [progress, setProgress] = useState(0);
  const [cycles, setCycles] = useState(0);
  const timings = [4000, 4000, 6000, 2000];
  const labels = [T.inhale, T.hold, T.exhale, T.rest];
  const colors = ['#7aaa6e', '#6a9a9e', '#8a7aaa', '#aaa06a'];
  const intervalRef = useRef(null);
  const startRef = useRef(0);

  useEffect(() => {
    if (!active) {
      clearInterval(intervalRef.current);
      return;
    }
    startRef.current = Date.now();
    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startRef.current;
      const duration = timings[phase];
      const p = Math.min(elapsed / duration, 1);
      setProgress(p);
      if (p >= 1) {
        const next = (phase + 1) % 4;
        if (next === 0) setCycles((c) => c + 1);
        setPhase(next);
        startRef.current = Date.now();
      }
    }, 30);
    return () => clearInterval(intervalRef.current);
  }, [active, phase]);

  const scale =
    phase === 0
      ? 1 + progress * 0.5
      : phase === 2
        ? 1.5 - progress * 0.5
        : phase === 1
          ? 1.5
          : 1;
  const opacity = phase === 1 ? 0.6 : phase === 3 ? 0.3 : 0.2 + progress * 0.3;

  return (
    <div style={{ textAlign: 'center', padding: '16px 0' }}>
      <p style={styles.sectionDesc}>{T.breatheDesc}</p>

      <div style={{ position: 'relative', width: 240, height: 240, margin: '0 auto 24px' }}>
        <div
          style={{
            position: 'absolute',
            inset: -10,
            borderRadius: '50%',
            border: `2px solid ${colors[phase]}`,
            opacity: active ? 0.3 : 0,
            transform: `scale(${scale * 1.05})`,
            transition: 'transform 0.4s ease, opacity 0.4s',
          }}
        />
        <div
          style={{
            width: 240,
            height: 240,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${colors[phase]}${Math.round(opacity * 99)
              .toString()
              .padStart(2, '0')} 0%, transparent 70%)`,
            border: `2px solid ${colors[phase]}40`,
            transform: `scale(${scale})`,
            transition: 'transform 0.35s ease, background 0.5s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <span
            style={{
              fontSize: 20,
              color: '#3a5a35',
              fontWeight: 600,
              fontFamily: "'Playfair Display', serif",
              letterSpacing: 0.5,
            }}
          >
            {active ? labels[phase] : 'Ready'}
          </span>
          {active && (
            <span style={{ fontSize: 12, color: '#6a8a65', marginTop: 6 }}>
              Cycle {cycles + 1}
            </span>
          )}
        </div>
      </div>

      <button
        onClick={() => {
          setActive(!active);
          if (!active) {
            setPhase(0);
            setProgress(0);
            setCycles(0);
          }
        }}
        style={{
          ...styles.primaryBtn,
          background: active
            ? 'linear-gradient(135deg, #c97a6a 0%, #b06a5a 100%)'
            : 'linear-gradient(135deg, #7aaa6e 0%, #5a8e52 100%)',
        }}
      >
        {active ? T.stop : T.start}
      </button>
      {cycles > 0 && !active && (
        <p style={{ fontSize: 13, color: '#6a8a65', marginTop: 12 }}>
          Completed {cycles} cycle{cycles > 1 ? 's' : ''}. Great work.
        </p>
      )}
    </div>
  );
}
