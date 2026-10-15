import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import CoursePage from './pages/CoursePage'
import SessionPage from './pages/SessionPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/course" element={<CoursePage />} />
      <Route path="/session/:id" element={<SessionPage />} />
    </Routes>
  )
}
