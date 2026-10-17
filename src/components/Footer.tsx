import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--border)', background: 'var(--bg-white)', marginTop: 'auto' }}>
      {/* ── Main Footer Grid ── */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: 'clamp(48px, 6vw, 72px) clamp(24px, 5vw, 48px)' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '40px',
        }}>

          {/* Col 1: Organization & Mission */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <img src="/logo-icon.png" alt="DALIL" style={{ height: '32px', width: 'auto' }} />
              <span style={{ fontFamily: 'var(--font-grotesk)', fontSize: '0.95rem', fontWeight: 700, letterSpacing: '0.14em', color: 'var(--action)', textTransform: 'uppercase' }}>
                DALIL · دليل
              </span>
            </div>

            <p style={{ fontFamily: 'var(--font-arabic)', fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '20px' }}>
              مؤسسة تعليمية وبحثية تهدف إلى إتاحة تعليم مناهج البحث العلمي للطلاب والباحثين الناطقين باللغة العربية بأسلوب منهجي رصين وعملي.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="t-mono-label" style={{ fontSize: '0.62rem' }}>DOMAIN:</span>
                <a
                  href="https://dalilresearch.org"
                  style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-primary)', textDecoration: 'none' }}
                >
                  dalilresearch.org
                </a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="t-mono-label" style={{ fontSize: '0.62rem' }}>CORRESPONDENCE:</span>
                <a
                  href="mailto:hello@dalilresearch.org"
                  style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--action)', textDecoration: 'none' }}
                >
                  hello@dalilresearch.org
                </a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="t-mono-label" style={{ fontSize: '0.62rem' }}>INSTAGRAM:</span>
                <a
                  href="https://instagram.com/dalilresearch"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--action)', textDecoration: 'none' }}
                >
                  @dalilresearch
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Founder & Leadership */}
          <div style={{
            background: 'var(--bg)',
            border: '1px solid var(--border)',
            padding: '24px',
            borderRadius: '2px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <span className="t-mono-label" style={{ color: 'var(--action)' }}>LEADERSHIP // المؤسس</span>
            </div>

            <h3 style={{ fontFamily: 'var(--font-arabic)', fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>
              معاذ محمد حامد
            </h3>
            <p style={{ fontFamily: 'var(--font-grotesk)', fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
              Moaz Mohamed Hamed · Founder & Lead Researcher
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <a
                href="mailto:moaz.abdellatif2009@gmail.com"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  color: 'var(--text-primary)',
                  textDecoration: 'none',
                }}
              >
                <span style={{ color: 'var(--text-tertiary)' }}>✉</span>
                moaz.abdellatif2009@gmail.com
              </a>

              <a
                href="tel:+201096264652"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  color: 'var(--text-primary)',
                  textDecoration: 'none',
                }}
              >
                <span style={{ color: 'var(--text-tertiary)' }}>☎</span>
                +20 109 626 4652
              </a>

              <a
                href="https://instagram.com/dalilresearch"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  color: 'var(--action)',
                  textDecoration: 'none',
                }}
              >
                <span style={{ color: 'var(--text-tertiary)' }}>📷</span>
                @dalilresearch
              </a>

              <div style={{ marginTop: '8px', paddingTop: '10px', borderTop: '1px solid var(--border)' }}>
                <Link
                  to="/about"
                  style={{
                    fontFamily: 'var(--font-arabic)',
                    fontSize: '0.82rem',
                    color: 'var(--action)',
                    textDecoration: 'none',
                    fontWeight: 500,
                  }}
                >
                  تعرف أكثر على رؤية المؤسس ←
                </Link>
              </div>
            </div>
          </div>

          {/* Col 3: Navigation & Academic Resources */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <span className="t-mono-label">PAGES & ARCHIVE // الروابط</span>
            </div>

            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li>
                <Link to="/" style={{ fontFamily: 'var(--font-arabic)', fontSize: '0.88rem', color: 'var(--text-secondary)', textDecoration: 'none' }}>
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link to="/about" style={{ fontFamily: 'var(--font-arabic)', fontSize: '0.88rem', color: 'var(--text-secondary)', textDecoration: 'none' }}>
                  عن دليل والمؤسس (About)
                </Link>
              </li>
              <li>
                <Link to="/course" style={{ fontFamily: 'var(--font-arabic)', fontSize: '0.88rem', color: 'var(--text-secondary)', textDecoration: 'none' }}>
                  منهج أساسيات البحث العلمي
                </Link>
              </li>
              <li>
                <a
                  href="https://instagram.com/dalilresearch"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontFamily: 'var(--font-arabic)', fontSize: '0.88rem', color: 'var(--text-secondary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <span>انستغرام (@dalilresearch)</span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)' }}>↗</span>
                </a>
              </li>
              <li>
                <Link to="/privacy" style={{ fontFamily: 'var(--font-arabic)', fontSize: '0.88rem', color: 'var(--text-secondary)', textDecoration: 'none' }}>
                  سياسة الخصوصية وحماية البيانات
                </Link>
              </li>
              <li>
                <Link to="/terms" style={{ fontFamily: 'var(--font-arabic)', fontSize: '0.88rem', color: 'var(--text-secondary)', textDecoration: 'none' }}>
                  الشروط والأحكام الأكاديمية
                </Link>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* ── Sub-footer Strip ── */}
      <div style={{ borderTop: '1px solid var(--border)', background: 'var(--bg)', padding: '18px clamp(24px, 5vw, 48px)' }}>
        <div style={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
        }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-tertiary)' }}>
            © 2026 DALIL Research Foundations · dalilresearch.org · All rights reserved.
          </span>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Link to="/privacy" style={{ fontFamily: 'var(--font-arabic)', fontSize: '0.78rem', color: 'var(--text-secondary)', textDecoration: 'none' }}>
              الخصوصية
            </Link>
            <span style={{ color: 'var(--border)' }}>·</span>
            <Link to="/terms" style={{ fontFamily: 'var(--font-arabic)', fontSize: '0.78rem', color: 'var(--text-secondary)', textDecoration: 'none' }}>
              الشروط والأحكام
            </Link>
            <span style={{ color: 'var(--border)' }}>·</span>
            <Link to="/about" style={{ fontFamily: 'var(--font-arabic)', fontSize: '0.78rem', color: 'var(--text-secondary)', textDecoration: 'none' }}>
              من نحن
            </Link>
            <span style={{ color: 'var(--border)' }}>·</span>
            <a
              href="https://instagram.com/dalilresearch"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: 'var(--action)', textDecoration: 'none' }}
            >
              @dalilresearch
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
