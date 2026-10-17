import { useState, useEffect, useRef } from 'react'
import quizzes, { type SessionQuiz, type QuizQuestion } from '../data/quizzes'

// ─── localStorage helpers ─────────────────────────────────────────────────────
type QuizProgress = {
  answers: (number | null)[]
  submitted: boolean
}

function storageKey(sessionId: number) {
  return `dalil_quiz_s${sessionId}`
}

function loadProgress(sessionId: number): QuizProgress | null {
  try {
    const raw = localStorage.getItem(storageKey(sessionId))
    return raw ? (JSON.parse(raw) as QuizProgress) : null
  } catch {
    return null
  }
}

function saveProgress(sessionId: number, progress: QuizProgress) {
  try {
    localStorage.setItem(storageKey(sessionId), JSON.stringify(progress))
  } catch {
    // silently ignore quota errors
  }
}

function clearProgress(sessionId: number) {
  try {
    localStorage.removeItem(storageKey(sessionId))
  } catch {}
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function ProgressBar({ current, total }: { current: number; total: number }) {
  return (
    <div style={{ marginBottom: '24px' }}>
      <div
        style={{
          height: '2px',
          background: 'var(--border)',
          borderRadius: '1px',
          overflow: 'hidden',
          marginBottom: '8px',
        }}
      >
        <div
          style={{
            height: '100%',
            background: 'var(--action)',
            borderRadius: '1px',
            width: `${(current / total) * 100}%`,
            transition: 'width 0.3s ease',
          }}
        />
      </div>
      <span
        style={{
          fontFamily: 'var(--font-arabic)',
          fontSize: '0.78rem',
          color: 'var(--text-tertiary)',
          display: 'block',
          textAlign: 'center',
          direction: 'rtl',
        }}
      >
        السؤال {current} من {total}
      </span>
    </div>
  )
}

function OptionCard({
  text,
  index,
  selected,
  onClick,
}: {
  text: string
  index: number
  selected: boolean
  onClick: () => void
}) {
  const letters = ['أ', 'ب', 'ج', 'د']
  const [hovered, setHovered] = useState(false)

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-pressed={selected}
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '14px',
        padding: '14px 16px',
        background: selected ? '#F0F3FB' : hovered ? '#F9FAFB' : 'var(--bg-white)',
        border: `1px solid ${selected ? 'var(--action)' : hovered ? 'var(--border-dark)' : 'var(--border)'}`,
        borderRadius: '12px',
        cursor: 'pointer',
        textAlign: 'right',
        direction: 'rtl',
        transition: 'border-color 0.15s, background 0.15s',
        outline: 'none',
      }}
      onFocus={e => {
        e.currentTarget.style.outline = '2px solid var(--action)'
        e.currentTarget.style.outlineOffset = '2px'
      }}
      onBlur={e => {
        e.currentTarget.style.outline = 'none'
      }}
    >
      {/* Letter badge */}
      <span
        style={{
          flexShrink: 0,
          width: '26px',
          height: '26px',
          borderRadius: '50%',
          border: `1px solid ${selected ? 'var(--action)' : 'var(--border-dark)'}`,
          background: selected ? 'var(--action)' : 'transparent',
          color: selected ? '#fff' : 'var(--text-tertiary)',
          fontFamily: 'var(--font-arabic)',
          fontSize: '0.75rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'background 0.15s, border-color 0.15s, color 0.15s',
          marginTop: '1px',
        }}
      >
        {letters[index]}
      </span>
      <span
        style={{
          fontFamily: 'var(--font-arabic)',
          fontSize: '0.92rem',
          color: selected ? 'var(--action)' : 'var(--text-primary)',
          lineHeight: 1.6,
          transition: 'color 0.15s',
          flex: 1,
        }}
      >
        {text}
      </span>
    </button>
  )
}

function ResultRow({
  question,
  userAnswer,
  index,
}: {
  question: QuizQuestion
  userAnswer: number | null
  index: number
}) {
  const isCorrect = userAnswer === question.correctAnswer
  const letters = ['أ', 'ب', 'ج', 'د']

  return (
    <div
      style={{
        border: '1px solid var(--border)',
        borderRadius: '12px',
        overflow: 'hidden',
        marginBottom: '12px',
      }}
    >
      {/* Question header */}
      <div
        style={{
          padding: '14px 16px',
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '12px',
          direction: 'rtl',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            color: 'var(--text-tertiary)',
            marginTop: '3px',
            flexShrink: 0,
          }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>
        <span
          style={{
            fontFamily: 'var(--font-arabic)',
            fontSize: '0.9rem',
            color: 'var(--text-primary)',
            lineHeight: 1.6,
          }}
        >
          {question.question}
        </span>
      </div>

      {/* Answers */}
      <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: '8px', direction: 'rtl' }}>
        {/* Student's answer */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '10px',
            padding: '10px 12px',
            borderRadius: '8px',
            background: isCorrect ? '#F0F5F0' : '#FEF2F2',
            border: `1px solid ${isCorrect ? '#4B7C5A' : '#FCA5A5'}`,
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.68rem',
              color: isCorrect ? '#2D5A3D' : '#B91C1C',
              marginTop: '2px',
              flexShrink: 0,
            }}
          >
            {isCorrect ? '✓' : '✗'}
          </span>
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                color: isCorrect ? '#4B7C5A' : '#B91C1C',
                marginBottom: '3px',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}
            >
              {isCorrect ? 'إجابتك — صحيحة' : 'إجابتك'}
            </div>
            <div
              style={{
                fontFamily: 'var(--font-arabic)',
                fontSize: '0.875rem',
                color: isCorrect ? '#2D5A3D' : '#B91C1C',
                lineHeight: 1.5,
              }}
            >
              {userAnswer !== null
                ? `${letters[userAnswer]}. ${question.options[userAnswer]}`
                : 'لم تُجب على هذا السؤال'}
            </div>
          </div>
        </div>

        {/* Correct answer — only show when wrong */}
        {!isCorrect && (
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '10px',
              padding: '10px 12px',
              borderRadius: '8px',
              background: '#F0F5F0',
              border: '1px solid #4B7C5A',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.68rem',
                color: '#2D5A3D',
                marginTop: '2px',
                flexShrink: 0,
              }}
            >
              ✓
            </span>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  color: '#4B7C5A',
                  marginBottom: '3px',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                }}
              >
                الإجابة الصحيحة
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-arabic)',
                  fontSize: '0.875rem',
                  color: '#2D5A3D',
                  lineHeight: 1.5,
                }}
              >
                {letters[question.correctAnswer]}. {question.options[question.correctAnswer]}
              </div>
            </div>
          </div>
        )}

        {/* Explanation */}
        <div
          style={{
            padding: '10px 12px',
            borderRadius: '8px',
            background: 'var(--bg)',
            border: '1px solid var(--border)',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              color: 'var(--text-tertiary)',
              marginBottom: '4px',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
            }}
          >
            الشرح
          </div>
          <p
            style={{
              fontFamily: 'var(--font-arabic)',
              fontSize: '0.85rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            {question.explanation}
          </p>
        </div>
      </div>
    </div>
  )
}

// ─── Main Quiz Component ──────────────────────────────────────────────────────
export default function SessionQuiz({ sessionId }: { sessionId: number }) {
  const quiz = quizzes.find(q => q.sessionId === sessionId) as SessionQuiz | undefined

  const [open, setOpen] = useState(false)
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState<(number | null)[]>(Array(5).fill(null))
  const [submitted, setSubmitted] = useState(false)

  const quizRef = useRef<HTMLDivElement>(null)

  // Restore saved progress on mount
  useEffect(() => {
    const saved = loadProgress(sessionId)
    if (saved) {
      setAnswers(saved.answers)
      setSubmitted(saved.submitted)
      if (saved.submitted) setOpen(true)
    }
  }, [sessionId])

  if (!quiz) return null

  const { questions } = quiz
  const totalQ = questions.length

  const handleStart = () => {
    setOpen(true)
    setTimeout(() => {
      quizRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 80)
  }

  const handleSelect = (optionIndex: number) => {
    if (submitted) return
    const next = [...answers]
    next[currentQ] = optionIndex
    setAnswers(next)
    saveProgress(sessionId, { answers: next, submitted: false })
  }

  const handleNext = () => {
    if (currentQ < totalQ - 1) setCurrentQ(q => q + 1)
  }

  const handlePrev = () => {
    if (currentQ > 0) setCurrentQ(q => q - 1)
  }

  const handleSubmit = () => {
    setSubmitted(true)
    saveProgress(sessionId, { answers, submitted: true })
    setTimeout(() => {
      quizRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 80)
  }

  const handleRetry = () => {
    setAnswers(Array(5).fill(null))
    setSubmitted(false)
    setCurrentQ(0)
    clearProgress(sessionId)
    setTimeout(() => {
      quizRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 80)
  }

  const score = submitted
    ? answers.filter((a, i) => a === questions[i].correctAnswer).length
    : 0

  const scoreLabel =
    score === 5
      ? 'ممتاز! أجبت على جميع الأسئلة بشكل صحيح 🎯'
      : score >= 4
      ? 'أحسنت! إجاباتك رائعة'
      : score >= 3
      ? 'جيد! راجع الإجابات الخاطئة أدناه'
      : score >= 2
      ? 'بداية جيدة — راجع الشرح وحاول مجدداً'
      : 'لا بأس — القراءة التفصيلية ستساعدك'

  // ── Collapsed "start" card ──
  if (!open) {
    return (
      <div
        style={{
          border: '1px solid var(--border)',
          borderRadius: '14px',
          padding: '28px 28px',
          background: 'var(--bg-white)',
          direction: 'rtl',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '200px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  color: 'var(--text-tertiary)',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}
              >
                اختبار الجلسة
              </span>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '2px 8px',
                  border: '1px solid var(--border-dark)',
                  borderRadius: '4px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  color: 'var(--text-tertiary)',
                  letterSpacing: '0.04em',
                }}
              >
                ٥ أسئلة
              </span>
            </div>
            <h3
              style={{
                fontFamily: 'var(--font-arabic)',
                fontSize: '1.05rem',
                fontWeight: 600,
                color: 'var(--text-primary)',
                marginBottom: '6px',
              }}
            >
              اختبر فهمك
            </h3>
            <p
              style={{
                fontFamily: 'var(--font-arabic)',
                fontSize: '0.875rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.65,
                margin: 0,
              }}
            >
              جاوب على ٥ أسئلة بسيطة عشان تراجع أهم اللي اتعلمته في الجلسة.
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <button
              onClick={handleStart}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 22px',
                background: 'var(--action)',
                color: '#fff',
                fontFamily: 'var(--font-arabic)',
                fontWeight: 600,
                fontSize: '0.9rem',
                border: '1px solid var(--action)',
                borderRadius: '10px',
                cursor: 'pointer',
                transition: 'background 0.15s',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'var(--action-hover)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'var(--action)'
              }}
            >
              ابدأ الاختبار ←
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ── Results screen ──
  if (submitted) {
    return (
      <div
        ref={quizRef}
        style={{
          border: '1px solid var(--border)',
          borderRadius: '14px',
          overflow: 'hidden',
          background: 'var(--bg-white)',
          direction: 'rtl',
        }}
      >
        {/* Score header */}
        <div
          style={{
            padding: '28px 28px 24px',
            borderBottom: '1px solid var(--border)',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              color: 'var(--text-tertiary)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: '12px',
            }}
          >
            نتيجة الاختبار
          </div>
          <div
            style={{
              fontFamily: 'var(--font-grotesk, var(--font-serif))',
              fontSize: '3rem',
              fontWeight: 700,
              color: score >= 4 ? '#2D5A3D' : score >= 3 ? 'var(--action)' : 'var(--text-primary)',
              lineHeight: 1,
              marginBottom: '6px',
              letterSpacing: '-0.02em',
            }}
          >
            {score} / {totalQ}
          </div>
          <p
            style={{
              fontFamily: 'var(--font-arabic)',
              fontSize: '0.9rem',
              color: 'var(--text-secondary)',
              margin: '0 0 20px',
            }}
          >
            {scoreLabel}
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <button
              onClick={handleRetry}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '9px 20px',
                background: 'transparent',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-arabic)',
                fontWeight: 500,
                fontSize: '0.88rem',
                border: '1px solid var(--border-dark)',
                borderRadius: '10px',
                cursor: 'pointer',
                transition: 'border-color 0.15s, background 0.15s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--text-primary)'
                e.currentTarget.style.background = '#F9FAFB'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border-dark)'
                e.currentTarget.style.background = 'transparent'
              }}
            >
              ↺ إعادة المحاولة
            </button>
            <button
              onClick={() => {
                setOpen(false)
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '9px 20px',
                background: 'transparent',
                color: 'var(--text-secondary)',
                fontFamily: 'var(--font-arabic)',
                fontWeight: 500,
                fontSize: '0.88rem',
                border: '1px solid var(--border)',
                borderRadius: '10px',
                cursor: 'pointer',
                transition: 'border-color 0.15s, color 0.15s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--border-dark)'
                e.currentTarget.style.color = 'var(--text-primary)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border)'
                e.currentTarget.style.color = 'var(--text-secondary)'
              }}
            >
              العودة للجلسة
            </button>
          </div>
        </div>

        {/* Detailed results */}
        <div style={{ padding: '24px 28px' }}>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              color: 'var(--text-tertiary)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: '16px',
            }}
          >
            مراجعة الإجابات
          </div>
          {questions.map((q, i) => (
            <ResultRow key={i} question={q} userAnswer={answers[i]} index={i} />
          ))}
        </div>
      </div>
    )
  }

  // ── Active quiz ──
  const currentQuestion = questions[currentQ]
  const currentAnswer = answers[currentQ]
  const isLast = currentQ === totalQ - 1
  const answeredCount = answers.filter(a => a !== null).length

  return (
    <div
      ref={quizRef}
      style={{
        border: '1px solid var(--border)',
        borderRadius: '14px',
        overflow: 'hidden',
        background: 'var(--bg-white)',
        direction: 'rtl',
      }}
    >
      {/* Quiz header */}
      <div
        style={{
          padding: '20px 24px',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '12px',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              color: 'var(--text-tertiary)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            اختبار الجلسة
          </span>
          <button
            onClick={() => setOpen(false)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px',
              color: 'var(--text-tertiary)',
              fontSize: '0.8rem',
              fontFamily: 'var(--font-arabic)',
              transition: 'color 0.15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-tertiary)')}
            aria-label="إغلاق الاختبار"
          >
            إغلاق ✕
          </button>
        </div>
        <ProgressBar current={currentQ + 1} total={totalQ} />
      </div>

      {/* Question body */}
      <div style={{ padding: '24px 24px 20px' }}>
        {/* Question text */}
        <h3
          style={{
            fontFamily: 'var(--font-arabic)',
            fontSize: '1rem',
            fontWeight: 600,
            color: 'var(--text-primary)',
            lineHeight: 1.65,
            marginBottom: '20px',
          }}
        >
          {currentQuestion.question}
        </h3>

        {/* Answer options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
          {currentQuestion.options.map((opt, i) => (
            <OptionCard
              key={i}
              text={opt}
              index={i}
              selected={currentAnswer === i}
              onClick={() => handleSelect(i)}
            />
          ))}
        </div>

        {/* Navigation */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '10px',
            paddingTop: '16px',
            borderTop: '1px solid var(--border)',
          }}
        >
          {/* Prev */}
          <button
            onClick={handlePrev}
            disabled={currentQ === 0}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 18px',
              background: 'transparent',
              color: currentQ === 0 ? 'var(--text-tertiary)' : 'var(--text-secondary)',
              fontFamily: 'var(--font-arabic)',
              fontSize: '0.875rem',
              border: `1px solid ${currentQ === 0 ? 'var(--border)' : 'var(--border-dark)'}`,
              borderRadius: '10px',
              cursor: currentQ === 0 ? 'default' : 'pointer',
              opacity: currentQ === 0 ? 0.4 : 1,
              transition: 'all 0.15s',
            }}
          >
            → السابق
          </button>

          {/* Answered indicator */}
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.68rem',
              color: 'var(--text-tertiary)',
            }}
          >
            {answeredCount}/{totalQ} أُجيب عليها
          </span>

          {/* Next / Submit */}
          {isLast ? (
            <button
              onClick={handleSubmit}
              disabled={answeredCount < totalQ}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '9px 22px',
                background: answeredCount < totalQ ? 'var(--border)' : 'var(--action)',
                color: answeredCount < totalQ ? 'var(--text-tertiary)' : '#fff',
                fontFamily: 'var(--font-arabic)',
                fontWeight: 600,
                fontSize: '0.9rem',
                border: `1px solid ${answeredCount < totalQ ? 'var(--border)' : 'var(--action)'}`,
                borderRadius: '10px',
                cursor: answeredCount < totalQ ? 'not-allowed' : 'pointer',
                transition: 'background 0.15s',
              }}
              onMouseEnter={e => {
                if (answeredCount >= totalQ)
                  e.currentTarget.style.background = 'var(--action-hover)'
              }}
              onMouseLeave={e => {
                if (answeredCount >= totalQ)
                  e.currentTarget.style.background = 'var(--action)'
              }}
            >
              إنهاء الاختبار ←
            </button>
          ) : (
            <button
              onClick={handleNext}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '9px 22px',
                background: 'var(--action)',
                color: '#fff',
                fontFamily: 'var(--font-arabic)',
                fontWeight: 600,
                fontSize: '0.9rem',
                border: '1px solid var(--action)',
                borderRadius: '10px',
                cursor: 'pointer',
                transition: 'background 0.15s',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--action-hover)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'var(--action)')}
            >
              التالي ←
            </button>
          )}
        </div>

        {/* Hint when not all answered */}
        {isLast && answeredCount < totalQ && (
          <p
            style={{
              fontFamily: 'var(--font-arabic)',
              fontSize: '0.8rem',
              color: 'var(--text-tertiary)',
              textAlign: 'center',
              marginTop: '10px',
              margin: '10px 0 0',
            }}
          >
            أجب على جميع الأسئلة قبل إنهاء الاختبار
          </p>
        )}
      </div>
    </div>
  )
}
