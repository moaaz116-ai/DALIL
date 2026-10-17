import { Link } from 'react-router-dom'
import Footer from '../components/Footer'

export default function AboutPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-white)', display: 'flex', flexDirection: 'column' }}>

      {/* ── Nav ── */}
      <nav className="nav">
        <div className="nav-inner">
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
            <img src="/logo-icon.png" alt="D" style={{ height: '28px', width: 'auto' }} />
            <span style={{ fontFamily: 'var(--font-grotesk)', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.18em', color: 'var(--action)', textTransform: 'uppercase' }}>
              DALIL
            </span>
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
            <Link to="/" style={{ fontFamily: 'var(--font-arabic)', fontSize: '0.84rem', color: 'var(--text-secondary)', textDecoration: 'none' }}>
              الرئيسية
            </Link>
            <Link to="/about" style={{ fontFamily: 'var(--font-arabic)', fontSize: '0.84rem', color: 'var(--action)', fontWeight: 600, textDecoration: 'none' }}>
              عن دليل
            </Link>
            <Link to="/course" className="btn-primary" style={{ padding: '7px 18px', fontSize: '0.82rem' }}>
              الدورة ←
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Main Content Container ── */}
      <main style={{ flex: 1 }}>

        {/* Header Hero Section */}
        <section style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg)', padding: 'clamp(48px, 6vw, 80px) clamp(24px, 5vw, 64px)' }}>
          <div style={{ maxWidth: '860px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <span className="t-mono-label">INSTITUTIONAL PROFILE · VOL. I</span>
              <span style={{ flex: 1, maxWidth: '40px', height: '1px', background: 'var(--border-dark)' }} />
            </div>

            <h1 className="t-serif" style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', lineHeight: 1.25, marginBottom: '16px' }}>
              عن مؤسسة دليل لأبحاث المستقبل
            </h1>

            <p style={{ fontFamily: 'var(--font-arabic)', fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.85, maxWidth: '720px' }}>
              «دليل» هي مبادرة تعليمية وبحثية تأسست لتمكين الطلاب والباحثين الناطقين باللغة العربية من إتقان منهجيات وأدوات البحث العلمي، وصياغة الأوراق الأكاديمية الرصينة المؤهلة للنشر والمشاركة في المحافل العلمية العالمية.
            </p>
          </div>
        </section>

        {/* Section 1: The Origin & Philosophy */}
        <section style={{ borderBottom: '1px solid var(--border)', padding: 'clamp(56px, 7vw, 84px) clamp(24px, 5vw, 64px)' }}>
          <div style={{ maxWidth: '860px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
              <span style={{ fontFamily: 'var(--font-grotesk)', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.18em', color: 'var(--action)', textTransform: 'uppercase' }}>
                01 // THE PURPOSE & ORIGIN
              </span>
              <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
            </div>

            <h2 className="t-serif" style={{ fontSize: '1.6rem', marginBottom: '20px' }}>
              لماذا وُجد «دليل»؟
            </h2>

            <div style={{ fontFamily: 'var(--font-arabic)', fontSize: '0.98rem', color: 'var(--text-primary)', lineHeight: 1.95, display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <p>
                يواجه الكثير من الطلاب الشغوفين في العالم العربي عائقًا حقيقيًا عند الانتقال من مرحلة «تلقي المعرفة» إلى مرحلة «إنتاج المعرفة». ورغم توفر ملايين الأوراق العلمية على الإنترنت، إلا أن المنهج العملي الممنهج لكيفية طرح سؤال بحثي أصيل، وقراءة الدراسات السابقة نقدياً، وتوثيق المصادر بدقة أكاديمية، يظل نادراً وصعب المنال لغير المتخصصين.
              </p>
              <p>
                أُطلقت منصة «دليل» كحل عملي ومجاني لهذه الفجوة. نحن لا نعلّم النظريات المجردة، بل نأخذ الباحث خطوة بخطوة عبر مسار محدد يبدأ من بلورة الفكرة وحتى كتابة المسودة النهائية للبحث العلمي القابل للنشر.
              </p>
            </div>

            {/* Pull quote */}
            <div style={{ marginTop: '36px', borderRight: '3px solid var(--action)', paddingRight: '20px', background: 'var(--bg)', padding: '20px 24px', borderRadius: '2px' }}>
              <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '1.05rem', color: 'var(--text-primary)', lineHeight: 1.75, marginBottom: '6px' }}>
                «البحث العلمي ليس حكراً على المعامل المغلقة؛ إنه طريقة تفكير ونظام عقلي يستطيع أي طالب امتلاكه إذا أُتيحت له المنهجية الصحيحة.»
              </p>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-secondary)' }}>
                — مبادئ دليل في التربية البحثية
              </span>
            </div>
          </div>
        </section>

        {/* Section 2: Founder & Leadership Profile */}
        <section style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg)', padding: 'clamp(56px, 7vw, 84px) clamp(24px, 5vw, 64px)' }}>
          <div style={{ maxWidth: '860px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
              <span style={{ fontFamily: 'var(--font-grotesk)', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.18em', color: 'var(--action)', textTransform: 'uppercase' }}>
                02 // LEADERSHIP & FOUNDER
              </span>
              <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
            </div>

            <div style={{
              background: 'var(--bg-white)',
              border: '1px solid var(--border)',
              borderRadius: '2px',
              padding: 'clamp(28px, 5vw, 44px)',
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '20px', borderBottom: '1px solid var(--border)', paddingBottom: '20px' }}>
                <div>
                  <span className="t-mono-label" style={{ color: 'var(--action)', fontSize: '0.68rem' }}>FOUNDER & DIRECTOR // المؤسس والمشرف الأكاديمي</span>
                  <h2 style={{ fontFamily: 'var(--font-arabic)', fontSize: '1.7rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '6px', marginBottom: '4px' }}>
                    معاذ محمد حامد
                  </h2>
                  <p style={{ fontFamily: 'var(--font-grotesk)', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    Moaz Mohamed Hamed
                  </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', minWidth: '240px' }}>
                  <span className="t-mono-label" style={{ fontSize: '0.62rem' }}>DIRECT CONTACT INFO:</span>
                  <a
                    href="mailto:moaz.abdellatif2009@gmail.com"
                    style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-primary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}
                  >
                    <span>✉</span> moaz.abdellatif2009@gmail.com
                  </a>
                  <a
                    href="mailto:hello@dalilresearch.org"
                    style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--action)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}
                  >
                    <span>🏛</span> hello@dalilresearch.org
                  </a>
                  <a
                    href="tel:+201096264652"
                    style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-primary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}
                  >
                    <span>☎</span> +20 109 626 4652
                  </a>
                  <a
                    href="https://instagram.com/dalilresearch"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--action)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}
                  >
                    <span>📷</span> instagram.com/dalilresearch (@dalilresearch) ↗
                  </a>
                </div>
              </div>

              {/* Founder Statement */}
              <div style={{ fontFamily: 'var(--font-arabic)', fontSize: '0.96rem', color: 'var(--text-secondary)', lineHeight: 1.9, display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <p>
                  أسس <strong>معاذ محمد حامد</strong> منصة «دليل» انطلاقاً من إيمانه العميق بأن النهضة العلمية في العالم العربي تبدأ بتمكين الشباب في سن مبكرة من فهم المنطق البحثي الدقيق، والابتعاد عن السرد الإنشائي إلى التفكير النقدي المبني على الأدلة والتجريب.
                </p>
                <p>
                  يشرف معاذ شخصياً على إعداد مناهج «دليل»، وتصميم المحاضرات المرئية، وإعداد الملخصات المعرفية التأسيسية التي تتاح مجاناً للجميع دون أي قيود، مع تقديم التوجيه الأكاديمي المستمر للطلاب الراغبين في إنجاز أبحاثهم العلمية ونشرها.
                </p>
              </div>

              <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid var(--border)', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <span className="tag" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem' }}>RESEARCH EDUCATION</span>
                <span className="tag" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem' }}>ACADEMIC MENTORSHIP</span>
                <span className="tag" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem' }}>CAIRO · EGYPT</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: The 4 Institutional Pillars */}
        <section style={{ borderBottom: '1px solid var(--border)', padding: 'clamp(56px, 7vw, 84px) clamp(24px, 5vw, 64px)' }}>
          <div style={{ maxWidth: '860px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
              <span style={{ fontFamily: 'var(--font-grotesk)', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.18em', color: 'var(--action)', textTransform: 'uppercase' }}>
                03 // CORE ACADEMIC PILLARS
              </span>
              <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
              {[
                {
                  no: '01',
                  title: 'الرصانة المنهجية',
                  desc: 'الالتزام الصارم بقواعد الاستقصاء العلمي، صياغة الفرضيات القابلة للاختبار، وتطبيق التحليل الإحصائي والنوعي بدقة.',
                },
                {
                  no: '02',
                  title: 'النزاهة الأكاديمية',
                  desc: 'ترسيخ أخلاقيات البحث، التوثيق العلمي الدقيق (APA/IEEE)، وتجنب الانتحال العلمي وسوء استخدام الذكاء الاصطناعي.',
                },
                {
                  no: '03',
                  title: 'التعليم المفتوح والمجاني',
                  desc: 'توفير كل المحتوى التعليمي والملخصات المطبوعة والتمارين مجانًا بالكامل لكل طالب وباحث عربي.',
                },
                {
                  no: '04',
                  title: 'المشاركة العالمية الواثقة',
                  desc: 'تأهيل الطلاب للمنافسة والمشاركة الفاعلة في المؤتمرات الدولية ومسابقات البحث العلمي والنشر في الدوريات المحكّمة.',
                },
              ].map(pillar => (
                <div key={pillar.no} style={{ border: '1px solid var(--border)', padding: '24px', borderRadius: '2px', background: 'var(--bg)' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, color: 'var(--action)', display: 'block', marginBottom: '8px' }}>
                    {pillar.no}
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-arabic)', fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>
                    {pillar.title}
                  </h3>
                  <p style={{ fontFamily: 'var(--font-arabic)', fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                    {pillar.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 4: Call to Action */}
        <section style={{ padding: 'clamp(48px, 6vw, 72px) clamp(24px, 5vw, 64px)', background: 'var(--bg-white)', textAlign: 'center' }}>
          <div style={{ maxWidth: '640px', margin: '0 auto' }}>
            <h2 className="t-serif" style={{ fontSize: '1.8rem', marginBottom: '12px' }}>
              ابدأ رحلتك البحثية اليوم
            </h2>
            <p style={{ fontFamily: 'var(--font-arabic)', fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '28px' }}>
              انضم إلى جلسات دورة «أساسيات البحث العلمي» الآن، وحمّل الملخصات العلمية مجاناً.
            </p>
            <Link to="/course" className="btn-primary" style={{ padding: '12px 36px', fontSize: '1rem', fontFamily: 'var(--font-arabic)' }}>
              الانتقال إلى منهج الدورة ←
            </Link>
          </div>
        </section>

      </main>

      {/* ── Footer ── */}
      <Footer />
    </div>
  )
}
