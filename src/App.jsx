import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
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
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
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
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
