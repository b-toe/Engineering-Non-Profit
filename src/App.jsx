import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './auth/AuthContext'
import { AdminRoute, UserRoute } from './components/ProtectedRoute'
import Layout from './components/Layout'
import Login from './pages/Login'
import Home from './pages/Home'
import About from './pages/About'
import Programs from './pages/Programs'
import Workshops from './pages/Workshops'
import Events from './pages/Events'
import Impact from './pages/Impact'
import GetInvolved from './pages/GetInvolved'
import Sponsors from './pages/Sponsors'
import Donate from './pages/Donate'
import Contact from './pages/Contact'
import AdminDashboard from './pages/AdminDashboard'
import UserPortal from './pages/UserPortal'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Standalone — no navbar/footer */}
          <Route path="/login" element={<Login />} />

          {/* Main site with layout */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="programs" element={<Programs />} />
            <Route path="workshops" element={<Workshops />} />
            <Route path="events" element={<Events />} />
            <Route path="impact" element={<Impact />} />
            <Route path="get-involved" element={<GetInvolved />} />
            <Route path="sponsors" element={<Sponsors />} />
            <Route path="donate" element={<Donate />} />
            <Route path="contact" element={<Contact />} />

            {/* Protected routes */}
            <Route path="admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
            <Route path="portal" element={<UserRoute><UserPortal /></UserRoute>} />

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
