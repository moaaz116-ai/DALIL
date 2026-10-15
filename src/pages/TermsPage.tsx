import { Link } from 'react-router-dom'
import Footer from '../components/Footer'

export default function TermsPage() {
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
              <span className="t-mono-label">TERMS OF USE // الشروط والأحكام</span>
              <span style={{ color: 'var(--border-dark)' }}>|</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-tertiary)' }}>
                LAST REVISED: OCTOBER 2026
              </span>
            </div>

            <h1 className="t-serif" style={{ fontSize: 'clamp(1.9rem, 4vw, 2.6rem)', marginBottom: '12px' }}>
              الشروط والأحكام الأكاديمية
            </h1>

            <p style={{ fontFamily: 'var(--font-arabic)', fontSize: '0.96rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              تحدد هذه الوثيقة الشروط المنظمة لاستخدام منصة «دليل» ومحتواها الأكاديمي، بما يضمن حماية الملكية الفكرية وترسيخ قيم النزاهة العلمية لجميع الباحثين والطلاب.
            </p>
          </div>

          {/* Sections */}
          <div style={{ fontFamily: 'var(--font-arabic)', fontSize: '0.94rem', color: 'var(--text-primary)', lineHeight: 1.9, display: 'flex', flexDirection: 'column', gap: '32px' }}>

            {/* Section 1 */}
            <div>
              <h2 className="t-serif" style={{ fontSize: '1.25rem', marginBottom: '10px', color: 'var(--action)' }}>
                ١. الموافقة والقبول
              </h2>
              <p>
                يُعد تصفح منصة «دليل» (<code>dalilresearch.org</code>)، أو متابعة جلساتها المرئية، أو تحميل أي من ملخصاتها التعليمية (PDF) بمثابة موافقة صريحة وكاملة على هذه الشروط والأحكام وميثاق النزاهة الأكاديمية التابع لها.
              </p>
            </div>

            {/* Section 2 */}
            <div>
              <h2 className="t-serif" style={{ fontSize: '1.25rem', marginBottom: '10px', color: 'var(--action)' }}>
                ٢. الاستخدام الأكاديمي المسموح به
              </h2>
              <p>
                تُقدَّم جميع محتويات الدورة مجاناً لأغراض التعلم الذاتي، والبحث العلمي الأكاديمي، والتأهيل المعرفي للطلاب والباحثين. يُسمح للأساتذة والمعلمين بمشاركة هذه المواد واستخدامها في الحلقات الدراسية غير الربحية بشرط الحفاظ على الإشارة الكاملة للمصدر والمؤسس.
              </p>
              <p style={{ marginTop: '8px' }}>
                يُحظر تماماً إعادة بيع محتوى المنصة، أو فرض أي رسوم على ملخصاتها، أو استغلالها تجارياً دون موافقة كتابية صريحة من إدارة المنصة.
              </p>
            </div>

            {/* Section 3 */}
            <div>
              <h2 className="t-serif" style={{ fontSize: '1.25rem', marginBottom: '10px', color: 'var(--action)' }}>
                ٣. الملكية الفكرية وحقوق الاستشهاد
              </h2>
              <p>
                جميع المناهج، النصوص، الهوية البصرية، والملخصات المعرفية المنشورة على منصة «دليل» مملوكة حصرياً لمؤسسة «دليل» ولمؤسسها <strong>معاذ محمد حامد</strong>. عند الاقتباس أو الاستشهاد بمنهجية المنصة في أي ورقة أو تقرير بحثي، يجب التوثيق الأكاديمي على النحو التالي:
              </p>
              <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', padding: '14px 18px', marginTop: '10px', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', direction: 'ltr', textAlign: 'left' }}>
                DALIL Research Foundations. (2026). Scientific Research Foundations Curriculum. Founded by Moaz Mohamed Hamed. Retrieved from https://dalilresearch.org
              </div>
            </div>

            {/* Section 4 */}
            <div>
              <h2 className="t-serif" style={{ fontSize: '1.25rem', marginBottom: '10px', color: 'var(--action)' }}>
                ٤. ميثاق النزاهة الأكاديمية ومكافحة الانتحال
              </h2>
              <p>
                تتبنى منصة «دليل» موقفاً حازماً تجاه الانتحال العلمي (Plagiarism). هدف الدورة هو تدريبك على كتابة فكرتك الخاصة وصياغة حجتك البحثية بأسلوبك الأصيل. لا تشجع المنصة ولا تجيز استخدام نصوص مولدة بالذكاء الاصطناعي دون إفصاح أو نقل محتوى باحثين آخرين دون توثيق أمين.
              </p>
            </div>

            {/* Section 5 */}
            <div>
              <h2 className="t-serif" style={{ fontSize: '1.25rem', marginBottom: '10px', color: 'var(--action)' }}>
                ٥. إخلاء المسؤولية الأكاديمية
              </h2>
              <p>
                تُقدم المعارف والنماذج الاسترشادية على «دليل» كإرشادات منهجية تعليمية. إن قبول الأبحاث في المجلات المحكمة أو فوزها في المعارض والمسابقات العلمية يخضع للجان التحكيم المستقلة في كل جهة، ولا تتحمل المنصة أي مسؤولية قانونية عن كيفية توظيف الطالب لهذه المعارف في أبحاثه الفردية.
              </p>
            </div>

            {/* Section 6 */}
            <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', padding: '24px', borderRadius: '2px' }}>
              <h2 className="t-serif" style={{ fontSize: '1.2rem', marginBottom: '12px', color: 'var(--action)' }}>
                ٦. التواصل بشأن الحقوق والشراكات الأكاديمية
              </h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>
                لطلب شراكات أكاديمية أو الاستفسار عن حقوق الاستخدام للجامعات والمؤسسات التعليمية، يرجى التواصل مع الإدارة:
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontFamily: 'var(--font-mono)', fontSize: '0.78rem' }}>
                <div>
                  <span style={{ color: 'var(--text-tertiary)' }}>DIRECTOR: </span>
                  <strong>معاذ محمد حامد (Moaz Mohamed Hamed)</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--text-tertiary)' }}>CORRESPONDENCE: </span>
                  <a href="mailto:hello@dalilresearch.org" style={{ color: 'var(--action)', textDecoration: 'none' }}>
                    hello@dalilresearch.org
                  </a>
                </div>
                <div>
                  <span style={{ color: 'var(--text-tertiary)' }}>DIRECT EMAIL: </span>
                  <a href="mailto:moaz.abdellatif2009@gmail.com" style={{ color: 'var(--action)', textDecoration: 'none' }}>
                    moaz.abdellatif2009@gmail.com
                  </a>
                </div>
                <div>
                  <span style={{ color: 'var(--text-tertiary)' }}>CONTACT NUMBER: </span>
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
