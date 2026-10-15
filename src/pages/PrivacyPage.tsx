import { Link } from 'react-router-dom'
import Footer from '../components/Footer'

export default function PrivacyPage() {
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
            <Link to="/about" style={{ fontFamily: 'var(--font-arabic)', fontSize: '0.84rem', color: 'var(--text-secondary)', textDecoration: 'none' }}>
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
        <article style={{ maxWidth: '820px', margin: '0 auto', padding: 'clamp(48px, 6vw, 80px) clamp(24px, 5vw, 48px)' }}>

          {/* Header */}
          <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '28px', marginBottom: '36px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
              <span className="t-mono-label">LEGAL DOCUMENT // وثيقة رسمية</span>
              <span style={{ color: 'var(--border-dark)' }}>|</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-tertiary)' }}>
                LAST REVISED: OCTOBER 2026
              </span>
            </div>

            <h1 className="t-serif" style={{ fontSize: 'clamp(1.9rem, 4vw, 2.6rem)', marginBottom: '12px' }}>
              سياسة الخصوصية وحماية البيانات
            </h1>

            <p style={{ fontFamily: 'var(--font-arabic)', fontSize: '0.96rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              تلتزم مؤسسة «دليل» لأبحاث المستقبل (DALIL Research Foundations - dalilresearch.org) بحماية خصوصية الباحثين والطلاب والزوار، وتوفير بيئة تعليمية آمنة تحترم سرية البيانات وتلتزم بأعلى معايير الشفافية الأكاديمية.
            </p>
          </div>

          {/* Sections */}
          <div style={{ fontFamily: 'var(--font-arabic)', fontSize: '0.94rem', color: 'var(--text-primary)', lineHeight: 1.9, display: 'flex', flexDirection: 'column', gap: '32px' }}>

            {/* Section 1 */}
            <div>
              <h2 className="t-serif" style={{ fontSize: '1.25rem', marginBottom: '10px', color: 'var(--action)' }}>
                ١. المبادئ العامة والالتزام الأخلاقي
              </h2>
              <p>
                تم تصميم منصة «دليل» وفق مبدأ «الحد الأدنى من جمع البيانات» (Privacy by Design). منصتنا منصة تعليمية غير ربحية موجهة لنشر المعرفة، ولا نطلب من الطلاب إنشاء حسابات شخصية أو إدخال بيانات بنكية أو معلومات حساسة للوصول إلى الجلسات والمواد التعليمية.
              </p>
            </div>

            {/* Section 2 */}
            <div>
              <h2 className="t-serif" style={{ fontSize: '1.25rem', marginBottom: '10px', color: 'var(--action)' }}>
                ٢. طبيعة البيانات والتقدم الدراسي
              </h2>
              <p>
                <strong>التقدم الدراسي (Session Progress):</strong> عند تحديد جلسة كمكتملة، يتم تخزين هذه المعلومة محلياً فقط على متصفح جهازك الشخصي عبر تقنية <code>localStorage</code>. لا يتم إرسال سجل تقدمك إلى خوادم خارجية، ويبقى محفوظاً على جهازك حتى تقرر مسحه بنفسك عبر متصفحك.
              </p>
              <p style={{ marginTop: '8px' }}>
                <strong>المراسلات والاستفسارات:</strong> عند التواصل المباشر معنا عبر البريد الإلكتروني أو الهاتف، نحتفظ فقط بالمعلومات التي تقدمها طواعية (مثل اسمك وبريدك واستفسارك البحثي) بغرض الرد عليك وتقديم الدعم والإرشاد الأكاديمي.
              </p>
            </div>

            {/* Section 3 */}
            <div>
              <h2 className="t-serif" style={{ fontSize: '1.25rem', marginBottom: '10px', color: 'var(--action)' }}>
                ٣. المحتوى المرئي الخارجي (YouTube Embeds)
              </h2>
              <p>
                يتم عرض المحاضرات المرئية للجلسات عبر مشغل يوتيوب المضمن المعتمد بوضع الخصوصية المحسنة (Privacy-Enhanced Mode). يخضع تشغيل المقاطع لسياسة خصوصية Google / YouTube المعمول بها عالمياً، ولا تجمع منصة «دليل» أي بيانات حول عادات المشاهدة خارج النطاق التعليمي.
              </p>
            </div>

            {/* Section 4 */}
            <div>
              <h2 className="t-serif" style={{ fontSize: '1.25rem', marginBottom: '10px', color: 'var(--action)' }}>
                ٤. عدم بيع أو مشاركة البيانات
              </h2>
              <p>
                تتعهد منصة «دليل» وإدارتها بعدم بيع أو تأجير أو مشاركة أو تداول أي بيانات خاصة بأي طالب أو باحث مع أي جهات تسويقية أو تجارية أو أطراف ثالثة لأي غرض كان.
              </p>
            </div>

            {/* Section 5 */}
            <div>
              <h2 className="t-serif" style={{ fontSize: '1.25rem', marginBottom: '10px', color: 'var(--action)' }}>
                ٥. الأمان والتشفير التقني
              </h2>
              <p>
                تخضع جميع الاتصالات والزيارات لموقع <code>dalilresearch.org</code> لبروتوكول التشفير الآمن (HTTPS / TLS) تحت حماية شبكة Cloudflare العالمية، مما يضمن أمان وسلامة تصفح المحتوى والملفات المرفقة.
              </p>
            </div>

            {/* Section 6 */}
            <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', padding: '24px', borderRadius: '2px' }}>
              <h2 className="t-serif" style={{ fontSize: '1.2rem', marginBottom: '12px', color: 'var(--action)' }}>
                ٦. مسؤول الخصوصية والتواصل الرسمي
              </h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>
                إذا كانت لديك أي استفسارات أو ملاحظات بخصوص سياسة الخصوصية أو بياناتك الأكاديمية، يمكنك التواصل مباشرة مع المشرف العام ومؤسس المنصة:
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontFamily: 'var(--font-mono)', fontSize: '0.78rem' }}>
                <div>
                  <span style={{ color: 'var(--text-tertiary)' }}>NAME: </span>
                  <strong>معاذ محمد حامد (Moaz Mohamed Hamed)</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--text-tertiary)' }}>PERSONAL EMAIL: </span>
                  <a href="mailto:moaz.abdellatif2009@gmail.com" style={{ color: 'var(--action)', textDecoration: 'none' }}>
                    moaz.abdellatif2009@gmail.com
                  </a>
                </div>
                <div>
                  <span style={{ color: 'var(--text-tertiary)' }}>INSTITUTIONAL EMAIL: </span>
                  <a href="mailto:hello@dalilresearch.org" style={{ color: 'var(--action)', textDecoration: 'none' }}>
                    hello@dalilresearch.org
                  </a>
                </div>
                <div>
                  <span style={{ color: 'var(--text-tertiary)' }}>PHONE / WHATSAPP: </span>
                  <a href="tel:+201096264652" style={{ color: 'var(--action)', textDecoration: 'none' }}>
                    +20 109 626 4652
                  </a>
                </div>
              </div>
            </div>

          </div>
        </article>
      </main>

      {/* ── Footer ── */}
      <Footer />
    </div>
  )
}
