import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import sessions from '../data/sessions'
import { getCompletedSessions } from '../utils/progress'

export default function CoursePage() {
  const [completed, setCompleted] = useState<number[]>([])

  useEffect(() => { setCompleted(getCompletedSessions()) }, [])

  const completedCount = completed.length
  const total = sessions.length
  const unlocked = sessions.filter(s => !s.locked).length
  const pct = Math.round((completedCount / total) * 100)

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', flexDirection: 'column' }}>

      {/* ── Nav ── */}
      <nav className="nav">
        <div className="nav-inner">
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
            <img src="/logo-icon.png" alt="D" style={{ height: '30px' }} />
            <span style={{ fontFamily: 'var(--font-grotesk)', fontSize: '0.82rem', fontWeight: 700, letterSpacing: '0.18em', color: 'var(--action)', textTransform: 'uppercase' }}>DALIL</span>
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div className="progress-track" style={{ width: '80px' }}>
              <div className="progress-fill" style={{ width: `${pct}%` }} />
            </div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-tertiary)', letterSpacing: '0.04em' }}>
              {completedCount}/{total}
            </span>
          </div>
        </div>
      </nav>

      {/* ── Page header ── */}
      <div style={{ background: 'var(--bg-white)', borderBottom: '1px solid var(--border)', padding: 'clamp(28px, 5vw, 44px) clamp(20px, 5vw, 48px)' }}>
        <div style={{ maxWidth: '780px', margin: '0 auto' }}>

          <span style={{ fontFamily: 'var(--font-grotesk)', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-tertiary)', display: 'block', marginBottom: '12px' }}>Course · أساسيات البحث العلمي</span>

          <h1 className="t-serif" style={{ fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', marginBottom: '10px' }}>
            أساسيات البحث العلمي
          </h1>

          <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', color: 'var(--text-secondary)', fontSize: '1rem', marginBottom: '20px' }}>
            {total} جلسة · {unlocked} متاحة الآن · فيديو + ملخص PDF لكل جلسة
          </p>

          {/* Progress row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div className="progress-track" style={{ flex: 1, maxWidth: '300px' }}>
              <div className="progress-fill" style={{ width: `${pct}%` }} />
            </div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', letterSpacing: '0.04em', color: 'var(--text-secondary)' }}>
              {pct}% مكتمل · {completedCount} من {total} جلسة
            </span>
          </div>
        </div>
      </div>

      {/* ── Session list ── */}
      <main style={{ flex: 1 }}>
        <div className="container" style={{ padding: 'clamp(28px, 4vw, 44px) clamp(20px, 5vw, 48px)' }}>

          {/* Available section header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
            <span style={{ fontFamily: 'var(--font-grotesk)', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-tertiary)' }}>متاح الآن — {unlocked} جلسات</span>
          </div>

          <div className="session-list">
            {sessions.map((session, idx) => {
              const isCompleted = completed.includes(session.id)
              const isLocked = session.locked
              const prevUnlocked = idx > 0 && !sessions[idx - 1].locked
              const showLockedHeader = isLocked && prevUnlocked

              const inner = (
                <>
                  {/* Number */}
                  <span className={`session-number ${isCompleted ? 'completed' : ''}`}>
                    {isCompleted ? '✓' : session.number}
                  </span>

                  {/* Vertical rule */}
                  <span style={{ width: '1px', height: '20px', background: 'var(--border)', flexShrink: 0 }} />

                  {/* Title */}
                  <span className="session-title">
                    {session.title}
                  </span>

                  {/* Metadata chips */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                    {session.duration && (
                      <span className="t-mono" style={{ fontSize: '0.7rem' }}>{session.duration}</span>
                    )}
                    {session.pdfSrc && !isLocked && (
                      <span className="tag">PDF</span>
                    )}
                    {isLocked && <span style={{ fontSize: '0.8rem' }}>🔒</span>}
                    {isCompleted && <span className="tag tag-green">مكتملة</span>}
                    {!isLocked && !isCompleted && (
                      <span style={{ color: 'var(--text-tertiary)', fontSize: '0.8rem' }}>›</span>
                    )}
                  </div>
                </>
              )

              return (
                <div key={session.id}>
                  {showLockedHeader && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '24px 0 4px' }}>
                      <span className="t-mono-label">قادمة قريبًا — {total - unlocked} جلسات</span>
                      <span className="rule" style={{ flex: 1 }} />
                    </div>
                  )}

                  {isLocked ? (
                    <div className="session-row locked">{inner}</div>
                  ) : (
                    <Link
                      to={`/session/${session.id}`}
                      className={`session-row available ${isCompleted ? 'completed' : ''}`}
                    >
                      {inner}
                    </Link>
                  )}
                </div>
              )
            })}
          </div>

          {/* Bottom note */}
          <div style={{ marginTop: '40px', padding: '16px 0', borderTop: '1px solid var(--border)' }}>
            <p className="t-mono" style={{ color: 'var(--text-tertiary)', fontSize: '0.75rem' }}>
              يتم فتح الجلسات تباعًا — ترقّب الإطلاق التام للمنصة
            </p>
          </div>
        </div>
      </main>

      {/* ── Footer ── */}
      <footer style={{ borderTop: '1px solid var(--border)', padding: '20px clamp(20px, 5vw, 48px)', background: 'var(--bg-white)', marginTop: 'auto' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <span style={{ fontFamily: 'var(--font-grotesk)', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', color: 'var(--action)', textTransform: 'uppercase' }}>
              DALIL · RESEARCH FOUNDATIONS
            </span>
            <span style={{ color: 'var(--border)' }}>|</span>
            <a
              href="mailto:hello@dalilresearch.org"
              style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-secondary)', textDecoration: 'none' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--action)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
            >
              hello@dalilresearch.org
            </a>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-tertiary)' }}>
              dalilresearch.org
            </span>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <span style={{ fontFamily: 'var(--font-arabic)', fontSize: '0.8rem', color: 'var(--text-secondary)', transition: 'color 0.15s' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--action)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
              >
                ← الرئيسية
              </span>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
