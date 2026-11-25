import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from '@/components/layout/Layout'
import Home from '@/pages/Home'

const About = lazy(() => import('@/pages/About'))
const Category = lazy(() => import('@/pages/Category'))
const Industry = lazy(() => import('@/pages/Industry'))
const Contact = lazy(() => import('@/pages/Contact'))
const Faqs = lazy(() => import('@/pages/Faqs'))
const Legal = lazy(() => import('@/pages/Legal'))
const NotFound = lazy(() => import('@/pages/NotFound'))

export default function App() {
  return (
    <Suspense fallback={<div className="min-h-[70vh]" />}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="services/:slug" element={<Category />} />
          <Route path="industries/:slug" element={<Industry />} />
          <Route path="contact" element={<Contact />} />
          <Route path="faqs" element={<Faqs />} />
          <Route path="privacy" element={<Legal page="privacy" />} />
          <Route path="terms" element={<Legal page="terms" />} />
          <Route path="cookies" element={<Legal page="cookies" />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
