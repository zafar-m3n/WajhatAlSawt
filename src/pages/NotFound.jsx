import Button from '@/components/ui/Button'
import Seo from '@/components/ui/Seo'

export default function NotFound() {
  return (
    <>
      <Seo title="Page not found" />
      <section className="shell grid min-h-[60vh] content-center gap-10 py-24">
        <svg viewBox="0 0 400 40" className="w-full max-w-xl text-mint" fill="none" aria-hidden="true">
          <path d="M0 20 C 30 2, 50 38, 80 20 S 130 2, 160 20 L 400 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <div>
          <h1 className="display-page max-w-[14ch]">This line isn't connected.</h1>
          <p className="deck measure mt-6">The page you're looking for doesn't exist or has moved.</p>
        </div>
        <div className="flex flex-wrap gap-4">
          <Button to="/">Back to home</Button>
          <Button to="/contact" variant="secondary">
            Contact us
          </Button>
        </div>
      </section>
    </>
  )
}
