import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import sessions from '../data/sessions'
import { isSessionComplete, markSessionComplete, getCompletedSessions } from '../utils/progress'
import Footer from '../components/Footer'

export default function SessionPage() {
  const { id } = useParams<{ id: string }>()
  const sessionId = Number(id)
  const session = sessions.find(s => s.id === sessionId)

  const [completed, setCompleted] = useState(false)
  const [justCompleted, setJustCompleted] = useState(false)
  const [pdfToast, setPdfToast] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [completedIds, setCompletedIds] = useState<number[]>([])

  useEffect(() => {
    if (session) {
      setCompleted(isSessionComplete(session.id))
      setCompletedIds(getCompletedSessions())
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
  }, [session])

  // ── 404 ──
  if (!session) return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)', gap: '16px' }}>
      <p style={{ fontFamily: 'var(--font-arabic)', color: 'var(--text-secondary)' }}>الجلسة غير موجودة</p>
      <Link to="/course" className="btn-secondary">← العودة للدورة</Link>
    </div>
  )

  // ── Locked ──
  if (session.locked) return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)', gap: '12px', padding: '24px', textAlign: 'center' }}>
      <p className="t-mono-label" style={{ marginBottom: '8px' }}>LOCKED</p>
      <h1 className="t-serif" style={{ fontSize: '1.5rem', marginBottom: '8px' }}>{session.title}</h1>
      <p style={{ fontFamily: 'var(--font-arabic)', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>هذه الجلسة غير متاحة بعد — ترقّب إطلاقها قريبًا</p>
      <div style={{ marginTop: '20px' }}>
        <Link to="/course" className="btn-primary">← العودة للدورة</Link>
      </div>
    </div>
  )

  const handleComplete = () => {
    if (!completed) {
      markSessionComplete(session.id)
      setCompleted(true)
      setJustCompleted(true)
      setCompletedIds(prev => [...prev, session.id])
      setTimeout(() => setJustCompleted(false), 4000)
    }
  }

  const handlePdf = () => {
    if (!session.pdfSrc) {
      setPdfToast(true)
      setTimeout(() => setPdfToast(false), 3000)
    }
  }

  const prevSession = sessions.find(s => s.id === session.id - 1 && !s.locked)
  const nextSession = sessions.find(s => s.id === session.id + 1 && !s.locked)

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', flexDirection: 'column' }}>

      {/* ── Nav ── */}
      <nav className="nav">
        <div className="nav-inner">
          {/* Back */}
          <Link to="/course" className="nav-back">
            ← جميع الجلسات
          </Link>

          {/* Breadcrumb */}
          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <span className="t-mono" style={{ fontSize: '0.68rem', color: 'var(--gold-muted)', letterSpacing: '0.1em' }}>
              SESSION {session.number}
            </span>
            <span style={{ fontFamily: 'var(--font-arabic)', fontSize: '0.78rem', color: 'var(--text-secondary)', maxWidth: '180px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {session.title}
            </span>
          </div>

          {/* Sidebar toggle */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{ background: 'none', border: '1px solid var(--border-dark)', borderRadius: '2px', padding: '6px 12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'var(--font-arabic)', fontSize: '0.8rem', color: 'var(--text-secondary)', transition: 'border-color 0.15s, color 0.15s' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--text-primary)'; e.currentTarget.style.color = 'var(--text-primary)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-dark)'; e.currentTarget.style.color = 'var(--text-secondary)' }}
          >
            ☰ المحتوى
          </button>
        </div>
      </nav>

      {/* ── Sidebar ── */}
      {sidebarOpen && (
        <div className="sidebar-overlay anim-fade-in" onClick={() => setSidebarOpen(false)} />
      )}
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)' }}>
          <span className="t-mono-label">محتوى الدورة</span>
        </div>
        {sessions.map(s => {
          const isDone = completedIds.includes(s.id)
          const isCurrent = s.id === session.id
          if (s.locked) return (
            <div key={s.id} className="sidebar-session locked-row">
              <span className="t-mono" style={{ fontSize: '0.72rem', minWidth: '24px' }}>{s.number}</span>
              <span style={{ fontFamily: 'var(--font-arabic)', fontSize: '0.82rem', flex: 1, color: 'var(--text-tertiary)' }}>{s.title}</span>
              <span style={{ fontSize: '0.75rem' }}>🔒</span>
            </div>
          )
          return (
            <Link
              key={s.id}
              to={`/session/${s.id}`}
              onClick={() => setSidebarOpen(false)}
              className={`sidebar-session ${isCurrent ? 'active' : ''}`}
            >
              <span className="t-mono" style={{ fontSize: '0.72rem', minWidth: '24px', color: isDone ? '#2D5A3D' : isCurrent ? 'var(--action)' : 'var(--text-tertiary)', fontWeight: isDone ? 500 : 400 }}>
                {isDone ? '✓' : s.number}
              </span>
              <span style={{ fontFamily: 'var(--font-arabic)', fontSize: '0.85rem', flex: 1, color: isCurrent ? 'var(--action)' : 'var(--text-primary)', fontWeight: isCurrent ? 500 : 400 }}>
                {s.title}
              </span>
              {isCurrent && <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--action)', flexShrink: 0 }} />}
            </Link>
          )
        })}
      </div>

      {/* ── Main ── */}
      <main style={{ flex: 1 }}>
        <div style={{ maxWidth: '780px', margin: '0 auto', padding: 'clamp(28px, 5vw, 48px) clamp(20px, 5vw, 48px)' }}>

          {/* Completion banner */}
          {justCompleted && (
            <div className="anim-fade-up" style={{ marginBottom: '24px', padding: '12px 16px', border: '1px solid #4B7C5A', borderRadius: '2px', background: '#F0F5F0', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span>✓</span>
              <span style={{ fontFamily: 'var(--font-arabic)', fontSize: '0.9rem', color: '#2D5A3D', fontWeight: 500 }}>أحسنت — أكملت هذه الجلسة بنجاح</span>
            </div>
          )}

          {/* ── Session header ── */}
          <div className="anim-fade-up d1">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <span className="t-mono-label">SESSION {session.number}</span>
              {session.duration && (
                <span className="t-mono">· {session.duration}</span>
              )}
              {completed && <span className="tag tag-green">مكتملة</span>}
            </div>

            <h1
              className="t-serif"
              style={{ fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', marginBottom: '8px' }}
            >
              {session.title}
            </h1>

            {session.subtitle && (
              <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', color: 'var(--text-secondary)', fontSize: '1rem', marginBottom: '0' }}>
                {session.subtitle}
              </p>
            )}
          </div>

          {/* ── Rule ── */}
          <hr className="rule" style={{ margin: '24px 0' }} />

          {/* ── Theater Mode Video ── */}
          <div className="anim-fade-up d2" style={{ marginBottom: '0' }}>
            {/* Title above video (serif) */}
            <div style={{ marginBottom: '10px' }}>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontWeight: 500, fontSize: '1rem', color: 'var(--text-primary)' }}>
                {session.title}
              </h2>
            </div>

            {/* Video frame — YouTube embed */}
            <div className="theater-container" style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', background: '#000' }}>
              {session.videoSrc ? (
                (() => {
                  // Extract YouTube video ID from various URL formats
                  const url = session.videoSrc
                  const match =
                    url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([A-Za-z0-9_-]{11})/)
                  const videoId = match ? match[1] : null
                  return videoId ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
                      title={session.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      style={{
                        position: 'absolute', top: 0, left: 0,
                        width: '100%', height: '100%',
                        border: 'none',
                      }}
                    />
                  ) : (
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontFamily: 'var(--font-arabic)', color: '#666', fontSize: '0.9rem' }}>رابط الفيديو غير صحيح</span>
                    </div>
                  )
                })()
              ) : (
                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#555', letterSpacing: '0.08em' }}>VIDEO · COMING SOON</span>
                  <span style={{ fontFamily: 'var(--font-arabic)', color: '#888', fontSize: '0.85rem' }}>الفيديو قيد الإعداد</span>
                </div>
              )}
            </div>

            {/* Mono metadata below video */}
            <div className="theater-meta" style={{ marginTop: '10px' }}>
              <span className="t-mono">
                SESSION {session.number} · {session.duration ?? '—'} · أساسيات البحث العلمي
              </span>
              {session.pdfSrc ? (
                <span className="tag tag-gold">PDF متاح</span>
              ) : (
                <span className="tag">PDF قريبًا</span>
              )}
            </div>
          </div>

          {/* ── Rule ── */}
          <hr className="rule" style={{ margin: '28px 0' }} />

          {/* ── Two-column: objectives + resources ── */}
          <div className="anim-fade-up d3" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '32px', marginBottom: '32px' }}>

            {/* Objectives */}
            {session.objectives && session.objectives.length > 0 && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                  <span className="t-mono-label">في هذه الجلسة ستتعلم</span>
                </div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0' }}>
                  {session.objectives.map((obj, i) => (
                    <li key={i} style={{
                      display: 'flex', alignItems: 'flex-start', gap: '12px',
                      padding: '10px 0',
                      borderBottom: '1px solid var(--border)',
                      fontFamily: 'var(--font-arabic)', fontSize: '0.9rem',
                      color: 'var(--text-primary)', lineHeight: 1.6,
                    }}>
                      <span className="t-mono" style={{ color: 'var(--text-tertiary)', marginTop: '2px', fontSize: '0.7rem' }}>
                        0{i + 1}
                      </span>
                      {obj}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Resources */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <span className="t-mono-label">مواد الجلسة</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {/* PDF */}
                {session.pdfSrc ? (
                  <a
                    href={session.pdfSrc}
                    download
                    className="resource-row"
                  >
                    <div style={{ width: '36px', height: '36px', border: '1px solid var(--border-dark)', borderRadius: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', flexShrink: 0 }}>📄</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: 'var(--font-arabic)', fontWeight: 500, fontSize: '0.88rem', color: 'var(--text-primary)' }}>ملخص الجلسة {session.number}</div>
                      <div className="t-mono" style={{ marginTop: '2px', color: 'var(--action)' }}>تحميل PDF ↓</div>
                    </div>
                  </a>
                ) : (
                  <div style={{ position: 'relative' }}>
                    <button onClick={handlePdf} className="resource-row disabled" style={{ width: '100%', background: 'none', textAlign: 'right' }}>
                      <div style={{ width: '36px', height: '36px', border: '1px solid var(--border)', borderRadius: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', flexShrink: 0 }}>📄</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontFamily: 'var(--font-arabic)', fontWeight: 500, fontSize: '0.88rem', color: 'var(--text-tertiary)' }}>ملخص الجلسة</div>
                        <div className="t-mono" style={{ marginTop: '2px' }}>قريبًا</div>
                      </div>
                    </button>
                    {pdfToast && (
                      <div className="anim-fade-in" style={{ position: 'absolute', bottom: 'calc(100% + 8px)', right: 0, background: 'var(--bg-white)', border: '1px solid var(--border-dark)', borderRadius: '2px', padding: '8px 14px', fontFamily: 'var(--font-arabic)', fontSize: '0.82rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap', zIndex: 10 }}>
                        سيتوفر الملخص قريبًا
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ── Rule ── */}
          <hr className="rule" style={{ marginBottom: '24px' }} />

          {/* ── Actions ── */}
          <div className="anim-fade-up d4" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>

            {/* Prev */}
            {prevSession ? (
              <Link to={`/session/${prevSession.id}`} className="btn-secondary" style={{ fontSize: '0.85rem' }}>
                → الجلسة السابقة
              </Link>
            ) : (
              <div />
            )}

            {/* Complete + Next */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <button
                className={`btn-complete ${completed ? 'done' : ''}`}
                onClick={handleComplete}
                disabled={completed}
              >
                {completed
                  ? <><span>✓</span><span>مكتملة</span></>
                  : <><span>○</span><span>إكمال الجلسة</span></>
                }
              </button>

              {nextSession ? (
                <Link to={`/session/${nextSession.id}`} className="btn-primary">
                  الجلسة التالية ←
                </Link>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', border: '1px solid var(--border)', borderRadius: '2px', fontFamily: 'var(--font-arabic)', fontSize: '0.88rem', color: 'var(--text-tertiary)' }}>
                  🔒 الجلسة التالية قريبًا
                </div>
              )}
            </div>
          </div>

          {/* Footnote / Footer */}
          <div style={{ marginTop: '48px', paddingTop: '18px', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <span className="t-mono" style={{ color: 'var(--text-tertiary)', fontSize: '0.68rem' }}>
                SESSION {session.number} OF {sessions.length}
              </span>
              <span style={{ color: 'var(--border)' }}>|</span>
              <a
                href="mailto:hello@dalilresearch.org"
                style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-secondary)', textDecoration: 'none' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--action)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
              >
                hello@dalilresearch.org
              </a>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-tertiary)' }}>
                dalilresearch.org
              </span>
              <Link to="/course" style={{ textDecoration: 'none' }}>
                <span className="t-mono" style={{ color: 'var(--text-secondary)', fontSize: '0.7rem', transition: 'color 0.15s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--action)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
                >
                  ← جميع الجلسات
                </span>
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* ── Footer ── */}
      <Footer />
    </div>
  )
}
