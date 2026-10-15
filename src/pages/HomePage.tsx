import { useState } from 'react'
import { Link } from 'react-router-dom'
import sessions from '../data/sessions'
import Footer from '../components/Footer'

const unlockedCount = sessions.filter(s => !s.locked).length

interface MissionVisionContent {
  code: string
  label: string
  dir: 'ltr' | 'rtl'
  font: string
  missionTitle: string
  missionPurpose: string
  missionText: string
  missionTags: string[]
  visionTitle: string
  visionImpact: string
  visionText: string
  visionQuote: string
  visionTags: string[]
}

const languages: Record<string, MissionVisionContent> = {
  en: {
    code: 'en',
    label: 'English',
    dir: 'ltr',
    font: 'var(--font-grotesk)',
    missionTitle: 'Mission',
    missionPurpose: 'PURPOSE',
    missionText:
      'DALIL’s mission is to make research education accessible to Arabic-speaking students by providing clear, practical, and structured foundations in scientific research. We aim to equip students with the knowledge and skills to ask meaningful questions, find and evaluate scientific evidence, and communicate their ideas with academic integrity.',
    missionTags: ['ACCESSIBILITY', 'RIGOR', 'INTEGRITY'],
    visionTitle: 'Vision',
    visionImpact: 'IMPACT',
    visionText:
      'DALIL’s vision is to build a generation of Arabic-speaking students capable of participating confidently in the global research community and contributing meaningful knowledge to the world.',
    visionQuote: '“Contributing meaningful knowledge to the world.”',
    visionTags: ['GLOBAL COMMUNITY', 'LEADERSHIP'],
  },
  ar: {
    code: 'ar',
    label: 'العربية',
    dir: 'rtl',
    font: 'var(--font-arabic)',
    missionTitle: 'الرسالة',
    missionPurpose: 'الغاية والهدف',
    missionText:
      'تتمثل رسالة «دليل» في جعل تعليم البحث العلمي متاحًا وميسرًا للطلاب الناطقين باللغة العربية، عبر تزويدهم بأسس منهجية واضحة وعملية في البحث العلمي. ونهدف إلى تمكين الطلاب من المعارف والمهارات اللازمة لطرح أسئلة بحثية نوعية، والوصول إلى الأدلة العلمية وتقييمها، والتعبير عن أفكارهم بنزاهة أكاديمية راسخة.',
    missionTags: ['إتاحة المعرفة', 'الرصانة العلمية', 'النزاهة الأكاديمية'],
    visionTitle: 'الرؤية',
    visionImpact: 'الأثر المستهدف',
    visionText:
      'تتمثل رؤية «دليل» في بناء وتأهيل جيل من الباحثين والطلاب الناطقين باللغة العربية، قادر على المشاركة الفاعلة والواثقة في مجتمع البحث العلمي العالمي والمساهمة بإنتاج معرفي قيّم ومؤثر للعالم.',
    visionQuote: '«المساهمة في بناء وإنتاج معرفة قيّمة للعالم.»',
    visionTags: ['المجتمع العلمي العالمي', 'الريادة والتمكين'],
  },
  fr: {
    code: 'fr',
    label: 'Français',
    dir: 'ltr',
    font: 'var(--font-grotesk)',
    missionTitle: 'Mission',
    missionPurpose: 'OBJECTIF',
    missionText:
      'La mission de DALIL est de rendre la formation à la recherche accessible aux étudiants arabophones en leur offrant des bases claires, pratiques et structurées en recherche scientifique. Nous visons à doter les étudiants des connaissances et des compétences nécessaires pour poser des questions pertinentes, trouver et évaluer des preuves scientifiques, et communiquer leurs idées avec intégrité académique.',
    missionTags: ['ACCESSIBILITÉ', 'RIGUEUR', 'INTÉGRITÉ'],
    visionTitle: 'Vision',
    visionImpact: 'IMPACT',
    visionText:
      'La vision de DALIL est de former une génération d’étudiants arabophones capables de participer avec assurance à la communauté scientifique mondiale et d’apporter des contributions intellectuelles significatives au monde.',
    visionQuote: '« Apporter des contributions intellectuelles significatives au monde. »',
    visionTags: ['COMMUNAUTÉ MONDIALE', 'LEADERSHIP'],
  },
  pt: {
    code: 'pt',
    label: 'Português',
    dir: 'ltr',
    font: 'var(--font-grotesk)',
    missionTitle: 'Missão',
    missionPurpose: 'PROPÓSITO',
    missionText:
      'A missão do DALIL é tornar a formação em pesquisa acessível aos estudantes de língua árabe, fornecendo bases claras, práticas e estruturadas em pesquisa científica. Nosso objetivo é capacitar os estudantes com o conhecimento e as habilidades para formular perguntas relevantes, encontrar e avaliar evidências científicas e comunicar suas ideias com integridade acadêmica.',
    missionTags: ['ACESSIBILIDADE', 'RIGOR', 'INTEGRIDADE'],
    visionTitle: 'Visão',
    visionImpact: 'IMPACTO',
    visionText:
      'A visão do DALIL é formar uma geração de estudantes de língua árabe capazes de participar com confiança na comunidade científica global e contribuir com conhecimento relevante para o mundo.',
    visionQuote: '“Contribuir com conhecimento relevante para o mundo.”',
    visionTags: ['COMUNIDADE GLOBAL', 'LIDERANÇA'],
  },
  sw: {
    code: 'sw',
    label: 'Kiswahili',
    dir: 'ltr',
    font: 'var(--font-grotesk)',
    missionTitle: 'Dhamira',
    missionPurpose: 'KUSUDI',
    missionText:
      'Dhamira ya DALIL ni kufanya elimu ya utafiti ipatikane kwa wanafunzi wanaozungumza Kiarabu kwa kutoa misingi iliyo wazi, ya vitendo, na iliyopangwa katika utafiti wa kisayansi. Tunalenga kuwapa wanafunzi maarifa na ujuzi wa kuuliza maswali yenye maana, kutafuta na kutathmini ushahidi wa kisayansi, na kueleza mawazo yao kwa uadilifu wa kitaaluma.',
    missionTags: ['UPATIKANAJI', 'UMAKINI', 'UADILIFU'],
    visionTitle: 'Maono',
    visionImpact: 'MATOKEO',
    visionText:
      'Maono ya DALIL ni kujenga kizazi cha wanafunzi wanaozungumza Kiarabu chenye uwezo wa kushiriki kwa kujiamini katika jumuiya ya utafiti wa kimataifa na kutoa mchango wa maarifa yenye maana kwa ulimwengu.',
    visionQuote: '“Kutoa mchango wa maarifa yenye maana kwa ulimwengu.”',
    visionTags: ['JUMUIYA YA KIMATAIFA', 'UONGOZI'],
  },
  am: {
    code: 'am',
    label: 'አማርኛ',
    dir: 'ltr',
    font: 'var(--font-amharic)',
    missionTitle: 'ተልዕኮ',
    missionPurpose: 'ዓላማ',
    missionText:
      'የDALIL ተልዕኮ በሳይንሳዊ ምርምር ውስጥ ግልጽ፣ ተግባራዊ እና የተደራጁ መሠረቶችን በማቅረብ የምርምር ትምህርትን ለአረብኛ ተናጋሪ ተማሪዎች ተደራሽ ማድረግ ነው። አላማችን ተማሪዎች ትርጉም ያላቸው ጥያቄዎችን እንዲጠይቁ፣ ሳይንሳዊ ማስረጃዎችን እንዲፈልጉ እና እንዲገመግሙ እንዲሁም ሀሳቦቻቸውን በአካዳሚክ ታማኝነት እንዲያስተላልፉ እውቀት እና ክህሎት ማስታጠቅ ነው።',
    missionTags: ['ተደራሽነት', 'ጥራት', 'ታማኝነት'],
    visionTitle: 'ራዕይ',
    visionImpact: 'ተጽዕኖ',
    visionText:
      'የDALIL ራዕይ በዓለም አቀፍ የምርምር ማህበረሰብ ውስጥ በልበ ሙሉነት መሳተፍ የሚችሉ እና ለዓለም ትርጉም ያለው እውቀት የሚያበረክቱ የአረብኛ ተናጋሪ ተማሪዎችን ትውልድ መገንባት ነው።',
    visionQuote: '“ለዓለም ትርጉም ያለው እውቀት ማበርከት።”',
    visionTags: ['ዓለም አቀፍ ማህበረሰብ', 'አመራር'],
  },
}

export default function HomePage() {
  const [currentLang, setCurrentLang] = useState<string>('en')
  const langData = languages[currentLang] || languages.en

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-white)', display: 'flex', flexDirection: 'column' }}>

      {/* ── Nav ── */}
      <nav className="nav">
        <div className="nav-inner">
          <div className="nav-logo">
            <img src="/logo-icon.png" alt="D" />
            <span className="nav-wordmark">DALIL</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-tertiary)' }}>
              أساسيات البحث العلمي
            </span>
            <Link to="/about" style={{ fontFamily: 'var(--font-arabic)', fontSize: '0.84rem', color: 'var(--text-secondary)', textDecoration: 'none' }}>
              عن دليل
            </Link>
            <Link to="/course" className="btn-primary" style={{ padding: '7px 18px', fontSize: '0.82rem' }}>
              الدورة ←
            </Link>
          </div>
        </div>
      </nav>

      {/* ════════════════════════════════════
          HERO — split layout
      ════════════════════════════════════ */}
      <section style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        minHeight: 'calc(100vh - 57px)',
        borderBottom: '1px solid var(--border)',
      }}>

        {/* ── Left: text ── */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 'clamp(40px, 7vw, 80px) clamp(24px, 5vw, 64px)',
          borderLeft: '1px solid var(--border)',
        }}>

          {/* Eyebrow */}
          <div className="anim-fade-up d1" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-tertiary)' }}>
              Research Foundations · Vol. I
            </span>
            <span style={{ flex: 1, maxWidth: '36px', height: '1px', background: 'var(--border-dark)' }} />
          </div>

          {/* Logo wordmark */}
          <div className="anim-fade-up d2" style={{ marginBottom: '32px' }}>
            <img
              src="/logo-full.png"
              alt="دليل — DALIL"
              style={{ width: 'clamp(130px, 20vw, 190px)', height: 'auto', display: 'block' }}
            />
          </div>

          {/* Hero question — serif Arabic, italic English */}
          <div className="anim-fade-up d2" style={{ marginBottom: '20px' }}>
            <h1 className="t-serif" style={{ fontSize: 'clamp(1.9rem, 3.8vw, 3rem)', lineHeight: 1.2, marginBottom: '6px' }}>
              هل تريد كتابة
            </h1>
            <h1 className="t-serif" style={{ fontSize: 'clamp(1.9rem, 3.8vw, 3rem)', lineHeight: 1.2, marginBottom: '6px' }}>
              ورقة بحثية؟
            </h1>
            <h1 className="t-serif" style={{ fontSize: 'clamp(1.9rem, 3.8vw, 3rem)', lineHeight: 1.2, fontStyle: 'italic', color: 'var(--text-secondary)' }}>
              ابدأ من هنا.
            </h1>
          </div>

          {/* Sub */}
          <p className="anim-fade-up d3" style={{
            fontFamily: 'var(--font-arabic)', fontSize: '0.95rem', color: 'var(--text-secondary)',
            lineHeight: 1.85, maxWidth: '400px', marginBottom: '36px', opacity: 0,
          }}>
            دليل يأخذك خطوة بخطوة من الفكرة إلى البحث المكتمل —
            منهجية، مصادر، كتابة.
            {' '}{unlockedCount} جلسات متاحة الآن.
          </p>

          {/* CTA */}
          <div className="anim-fade-up d4" style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap', opacity: 0 }}>
            <Link to="/course" className="btn-primary" style={{ fontFamily: 'var(--font-arabic)', fontSize: '0.95rem', padding: '12px 28px' }}>
              ابدأ الدورة ←
            </Link>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-tertiary)', letterSpacing: '0.04em' }}>
              {unlockedCount} / 12 sessions · free
            </span>
          </div>

          {/* Stats strip */}
          <div className="anim-fade-up d5" style={{ marginTop: '44px', paddingTop: '20px', borderTop: '1px solid var(--border)', display: 'flex', gap: '28px', flexWrap: 'wrap', opacity: 0 }}>
            {[
              { en: '12', label: 'جلسة' },
              { en: 'PDF', label: 'ملخص لكل جلسة' },
              { en: 'FREE', label: 'مجاني تمامًا' },
            ].map(item => (
              <div key={item.en} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ fontFamily: 'var(--font-grotesk)', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.14em', color: 'var(--action)', textTransform: 'uppercase' }}>
                  {item.en}
                </span>
                <span style={{ fontFamily: 'var(--font-arabic)', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right: paper image ── */}
        <div style={{
          position: 'relative',
          background: 'var(--bg)',
          borderLeft: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 'clamp(32px, 5vw, 60px)',
          overflow: 'hidden',
          minHeight: '420px',
        }}>
          {/* Grid texture */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
            backgroundSize: '40px 40px', opacity: 0.45,
          }} />

          {/* Paper */}
          <div className="anim-fade-up d3" style={{
            position: 'relative', zIndex: 1,
            maxWidth: '360px', width: '100%', opacity: 0,
            border: '1px solid var(--border-dark)',
            transform: 'rotate(1.5deg)',
          }}>
            <img
              src="/hero-paper.jpg"
              alt="نموذج ورقة بحثية"
              style={{ width: '100%', display: 'block', filter: 'grayscale(15%) contrast(1.05)' }}
            />
            {/* Top annotation */}
            <div style={{ position: 'absolute', top: '-13px', right: '-13px', background: 'var(--bg-white)', border: '1px solid var(--border-dark)', padding: '4px 10px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--text-secondary)', letterSpacing: '0.08em' }}>
                RESEARCH PAPER · SAMPLE
              </span>
            </div>
            {/* Caption */}
            <div style={{ padding: '8px 12px', borderTop: '1px solid var(--border)', background: 'var(--bg-white)' }}>
              <span style={{ fontFamily: 'var(--font-arabic)', fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
                هذا ما ستتعلم كتابته ← ابدأ الآن
              </span>
            </div>
          </div>

          {/* Keywords card */}
          <div style={{ position: 'absolute', bottom: 'clamp(20px, 4vw, 36px)', left: 'clamp(16px, 3vw, 28px)', background: 'var(--bg-white)', border: '1px solid var(--border)', padding: '10px 14px', maxWidth: '190px' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-tertiary)', marginBottom: '6px' }}>
              Keywords
            </div>
            <div style={{ fontFamily: 'var(--font-arabic)', fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
              منهجية البحث · المصادر · الحجة العلمية
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          MISSION & VISION (Multilingual Academic Format)
      ════════════════════════════════════ */}
      <section style={{ background: 'var(--bg-white)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto', padding: 'clamp(56px, 8vw, 96px) clamp(24px, 5vw, 64px)' }}>

          {/* Section header */}
          <div dir="ltr" style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '28px', textAlign: 'left' }}>
            <span style={{ fontFamily: 'var(--font-grotesk)', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--action)' }}>
              02 / Institutional Foundations
            </span>
            <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-tertiary)', letterSpacing: '0.08em' }}>
              ABOUT DALIL
            </span>
          </div>

          {/* Language Selector Toolbar */}
          <div style={{
            marginBottom: '36px',
            padding: '12px 16px',
            background: 'var(--bg)',
            border: '1px solid var(--border)',
            borderRadius: '2px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', fontWeight: 700, color: 'var(--text-secondary)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Translate / الترجمة:
              </span>
            </div>

            {/* Language buttons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
              {Object.values(languages).map((l) => {
                const isActive = l.code === currentLang
                return (
                  <button
                    key={l.code}
                    onClick={() => setCurrentLang(l.code)}
                    style={{
                      padding: '6px 14px',
                      borderRadius: '2px',
                      border: isActive ? '1px solid var(--action)' : '1px solid var(--border)',
                      background: isActive ? 'var(--action)' : 'var(--bg-white)',
                      color: isActive ? '#FFFFFF' : 'var(--text-primary)',
                      fontFamily: l.font,
                      fontSize: '0.82rem',
                      fontWeight: isActive ? 600 : 400,
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                    }}
                    onMouseEnter={e => {
                      if (!isActive) {
                        e.currentTarget.style.borderColor = 'var(--text-secondary)'
                        e.currentTarget.style.background = '#F3F4F6'
                      }
                    }}
                    onMouseLeave={e => {
                      if (!isActive) {
                        e.currentTarget.style.borderColor = 'var(--border)'
                        e.currentTarget.style.background = 'var(--bg-white)'
                      }
                    }}
                  >
                    {l.label}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Two-column Mission / Vision in active language */}
          <div
            key={langData.code}
            dir={langData.dir}
            className="anim-fade-in"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '32px',
              textAlign: langData.dir === 'rtl' ? 'right' : 'left',
            }}
          >

            {/* ── Mission ── */}
            <div style={{
              background: 'var(--bg)',
              border: '1px solid var(--border)',
              borderRadius: '2px',
              padding: 'clamp(28px, 4vw, 36px)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}>
              <div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '20px',
                  borderBottom: '1px solid var(--border)',
                  paddingBottom: '12px',
                }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.12em', color: 'var(--action)', textTransform: 'uppercase' }}>
                    [ 01 // {langData.missionTitle.toUpperCase()} ]
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-tertiary)' }}>
                    {langData.missionPurpose}
                  </span>
                </div>

                <h2 style={{
                  fontFamily: langData.font,
                  fontSize: '1.45rem',
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  color: 'var(--text-primary)',
                  marginBottom: '16px',
                }}>
                  {langData.missionTitle}
                </h2>

                <p style={{
                  fontFamily: langData.font,
                  fontSize: '0.96rem',
                  fontWeight: 400,
                  color: 'var(--text-primary)',
                  lineHeight: 1.85,
                  letterSpacing: langData.dir === 'rtl' ? 'normal' : '-0.005em',
                }}>
                  {langData.missionText}
                </p>
              </div>

              <div style={{ marginTop: '24px', paddingTop: '14px', borderTop: '1px solid var(--border)', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {langData.missionTags.map((tag, idx) => (
                  <span key={idx} className="tag" style={{ fontFamily: langData.font, fontSize: '0.68rem' }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* ── Vision ── */}
            <div style={{
              background: 'var(--bg)',
              border: '1px solid var(--border)',
              borderRadius: '2px',
              padding: 'clamp(28px, 4vw, 36px)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}>
              <div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '20px',
                  borderBottom: '1px solid var(--border)',
                  paddingBottom: '12px',
                }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.12em', color: 'var(--action)', textTransform: 'uppercase' }}>
                    [ 02 // {langData.visionTitle.toUpperCase()} ]
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-tertiary)' }}>
                    {langData.visionImpact}
                  </span>
                </div>

                <h2 style={{
                  fontFamily: langData.font,
                  fontSize: '1.45rem',
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  color: 'var(--text-primary)',
                  marginBottom: '16px',
                }}>
                  {langData.visionTitle}
                </h2>

                <p style={{
                  fontFamily: langData.font,
                  fontSize: '0.96rem',
                  fontWeight: 400,
                  color: 'var(--text-primary)',
                  lineHeight: 1.85,
                  letterSpacing: langData.dir === 'rtl' ? 'normal' : '-0.005em',
                  marginBottom: '20px',
                }}>
                  {langData.visionText}
                </p>

                {/* Pull quote with appropriate border side based on reading direction */}
                <blockquote style={{
                  borderLeft: langData.dir === 'rtl' ? 'none' : '2px solid var(--action)',
                  borderRight: langData.dir === 'rtl' ? '2px solid var(--action)' : 'none',
                  paddingLeft: langData.dir === 'rtl' ? '0' : '14px',
                  paddingRight: langData.dir === 'rtl' ? '14px' : '0',
                  margin: '16px 0 0 0',
                }}>
                  <p style={{
                    fontFamily: langData.dir === 'rtl' ? 'var(--font-arabic)' : 'var(--font-serif)',
                    fontStyle: langData.dir === 'rtl' ? 'normal' : 'italic',
                    fontSize: '0.95rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.65,
                  }}>
                    {langData.visionQuote}
                  </p>
                </blockquote>
              </div>

              <div style={{ marginTop: '24px', paddingTop: '14px', borderTop: '1px solid var(--border)', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {langData.visionTags.map((tag, idx) => (
                  <span key={idx} className="tag" style={{ fontFamily: langData.font, fontSize: '0.68rem' }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Institutional Contact Strip */}
          <div dir="ltr" style={{
            marginTop: '32px',
            padding: '14px 20px',
            border: '1px solid var(--border)',
            background: 'var(--bg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
            textAlign: 'left',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="t-mono-label" style={{ color: 'var(--action)', fontSize: '0.65rem' }}>CORRESPONDENCE:</span>
              <a
                href="mailto:hello@dalilresearch.org"
                style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-primary)', textDecoration: 'none', fontWeight: 500 }}
                onMouseEnter={e => (e.currentTarget.style.textDecoration = 'underline')}
                onMouseLeave={e => (e.currentTarget.style.textDecoration = 'none')}
              >
                hello@dalilresearch.org
              </a>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="t-mono-label" style={{ fontSize: '0.65rem' }}>OFFICIAL DOMAIN:</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                dalilresearch.org
              </span>
            </div>
          </div>

          {/* Bottom CTA strip */}
          <div style={{ marginTop: '48px', paddingTop: '28px', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <p style={{ fontFamily: 'var(--font-arabic)', fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>
                مستعد للبدء؟
              </p>
              <p style={{ fontFamily: 'var(--font-arabic)', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                انضم الآن وابدأ رحلتك في البحث العلمي
              </p>
            </div>
            <Link to="/course" className="btn-primary" style={{ fontFamily: 'var(--font-arabic)', padding: '12px 32px', fontSize: '0.95rem' }}>
              ابدأ الدورة المجانية ←
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          FOUNDER & ACADEMIC LEADERSHIP
      ════════════════════════════════════ */}
      <section style={{ background: 'var(--bg)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: 'clamp(48px, 6vw, 72px) clamp(24px, 5vw, 64px)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '28px' }}>
            <span style={{ fontFamily: 'var(--font-grotesk)', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--action)' }}>
              03 / Leadership & Direction
            </span>
            <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-tertiary)' }}>
              FOUNDER
            </span>
          </div>

          <div style={{
            background: 'var(--bg-white)',
            border: '1px solid var(--border)',
            borderRadius: '2px',
            padding: 'clamp(28px, 4vw, 36px)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px', marginBottom: '18px' }}>
              <div>
                <span className="t-mono-label" style={{ color: 'var(--action)', fontSize: '0.65rem' }}>LEAD RESEARCHER & CURRICULUM ARCHITECT</span>
                <h2 style={{ fontFamily: 'var(--font-arabic)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '4px', marginBottom: '2px' }}>
                  معاذ محمد حامد
                </h2>
                <p style={{ fontFamily: 'var(--font-grotesk)', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  Moaz Mohamed Hamed
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <a
                  href="mailto:moaz.abdellatif2009@gmail.com"
                  style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: 'var(--text-primary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <span style={{ color: 'var(--text-tertiary)' }}>✉</span> moaz.abdellatif2009@gmail.com
                </a>
                <a
                  href="tel:+201096264652"
                  style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: 'var(--text-primary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <span style={{ color: 'var(--text-tertiary)' }}>☎</span> +20 109 626 4652
                </a>
              </div>
            </div>

            <p style={{ fontFamily: 'var(--font-arabic)', fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.85, marginBottom: '20px' }}>
              انطلقت فكرة «دليل» برؤية شخصية من الباحث <strong>معاذ محمد حامد</strong> بهدف تجسير الفجوة المعرفية لدى الطلاب والباحثين العرب، وتمكينهم من أدوات ومنهجيات التفكير العلمي الرصين وكتابة الأبحاث القابلة للنشر الدولي.
            </p>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <span className="tag" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem' }}>CAIRO · EGYPT</span>
                <span className="tag" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem' }}>FOUNDATION DIRECTOR</span>
              </div>

              <Link
                to="/about"
                style={{ fontFamily: 'var(--font-arabic)', fontSize: '0.85rem', color: 'var(--action)', fontWeight: 600, textDecoration: 'none' }}
              >
                نبذة تفصيلية عن المؤسس ورؤية المنصة ←
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          SESSION INDEX (compact)
      ════════════════════════════════════ */}
      <section style={{ background: 'var(--bg-white)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: 'clamp(40px, 6vw, 64px) clamp(24px, 5vw, 64px)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
            <span style={{ fontFamily: 'var(--font-grotesk)', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-tertiary)' }}>
              Course Contents · 04
            </span>
            <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-tertiary)' }}>
              {unlockedCount} / 12 available
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '0' }}>
            {sessions.map((s) => (
              <div key={s.id} style={{
                display: 'flex', alignItems: 'center', gap: '14px',
                padding: '11px 0',
                borderBottom: '1px solid var(--border)',
                opacity: s.locked ? 0.38 : 1,
              }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-tertiary)', minWidth: '22px', flexShrink: 0 }}>
                  {s.number}
                </span>
                <span style={{ fontFamily: 'var(--font-arabic)', fontSize: '0.88rem', color: 'var(--text-primary)', flex: 1, lineHeight: 1.5 }}>
                  {s.title}
                </span>
                {s.duration && (
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-tertiary)', flexShrink: 0 }}>
                    {s.duration}
                  </span>
                )}
                {s.locked
                  ? <span style={{ fontSize: '0.7rem', flexShrink: 0 }}>🔒</span>
                  : <span style={{ color: 'var(--action)', fontSize: '0.75rem', flexShrink: 0 }}>›</span>
                }
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <Footer />
    </div>
  )
}
