// ─── Session Data ────────────────────────────────────────────────────────────
// All 12 sessions for "أساسيات البحث العلمي"
// Only Session 1 is unlocked with real content for the MVP.

export interface Session {
  id: number
  number: string   // e.g. "01"
  title: string
  subtitle?: string
  locked: boolean
  duration?: string
  objectives?: string[]
  videoSrc?: string
  pdfSrc?: string
}

const sessions: Session[] = [
  {
    id: 1,
    number: '01',
    title: 'ما هو البحث العلمي؟',
    subtitle: 'تعريف البحث العلمي وأهميته',
    locked: false,
    duration: '٢٠ دقيقة',
    objectives: [
      'ما هو البحث العلمي',
      'الفرق بين البحث والمعلومة',
      'العناصر الأساسية للبحث',
      'كيف يبدأ البحث بسؤال',
    ],
    videoSrc: 'https://youtu.be/wJlqWbFG1SY',
    pdfSrc: '/session1.pdf',
  },
  {
    id: 2,
    number: '02',
    title: 'كيف تختار فكرة وسؤال بحث؟',
    subtitle: 'من الاهتمام إلى السؤال البحثي',
    locked: false,
    duration: '٢٥ دقيقة',
    objectives: [
      'كيف تحوّل اهتمامك إلى فكرة بحثية',
      'معايير اختيار موضوع البحث الجيد',
      'الفرق بين الموضوع والسؤال البحثي',
      'كيف تصيغ سؤالًا بحثيًا واضحًا ومحددًا',
    ],
    videoSrc: 'https://youtu.be/uSrdtGtvN28',
    pdfSrc: '/session2.pdf',
  },
  {
    id: 3,
    number: '03',
    title: 'البحث عن المصادر',
    locked: true,
    duration: '٣٠ دقيقة',
  },
  {
    id: 4,
    number: '04',
    title: 'كيف تقرأ ورقة بحثية؟',
    locked: true,
    duration: '٢٨ دقيقة',
  },
  {
    id: 5,
    number: '05',
    title: 'تقييم المصادر والمراجع',
    locked: true,
    duration: '٢٢ دقيقة',
  },
  {
    id: 6,
    number: '06',
    title: 'بناء الحجة البحثية',
    locked: true,
    duration: '٣٥ دقيقة',
  },
  {
    id: 7,
    number: '07',
    title: 'كيف تكتب مراجعة الأدبيات؟',
    locked: true,
    duration: '٣٠ دقيقة',
  },
  {
    id: 8,
    number: '08',
    title: 'المنهجية البحثية',
    locked: true,
    duration: '٤٠ دقيقة',
  },
  {
    id: 9,
    number: '09',
    title: 'جمع البيانات وتحليلها',
    locked: true,
    duration: '٣٨ دقيقة',
  },
  {
    id: 10,
    number: '10',
    title: 'كتابة النتائج والاستنتاجات',
    locked: true,
    duration: '٣٢ دقيقة',
  },
  {
    id: 11,
    number: '11',
    title: 'التوثيق والاستشهاد بالمراجع',
    locked: true,
    duration: '٢٥ دقيقة',
  },
  {
    id: 12,
    number: '12',
    title: 'مراجعة وتقديم البحث',
    locked: true,
    duration: '٤٥ دقيقة',
  },
]

export default sessions
