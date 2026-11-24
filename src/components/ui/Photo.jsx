import { useState } from 'react'
import { imageFor } from '@/data/images'

/**
 * Shows public/images/<slot>.jpg when it exists, otherwise a placeholder that names the slot,
 * its size and the suggested Freepik keywords.
 */
export default function Photo({ slot, alt, className = '', ratio, rounded = 'rounded-[22px]', showKeywords = true, eager = false }) {
  const img = imageFor(slot)
  const [failed, setFailed] = useState(false)
  if (!img) return null
  const aspect = ratio ?? img.ratio
  const label = alt ?? img.alt ?? ''

  return (
    <div className={`relative overflow-hidden bg-fern ${rounded} ${className}`} style={{ aspectRatio: aspect }}>
      {!failed && (
        <img
          src={img.file}
          alt={label}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          onError={() => setFailed(true)}
          className="absolute inset-0 size-full object-cover"
        />
      )}
      {failed && (
        <div className="absolute inset-0" role="img" aria-label={label || 'Image placeholder'}>
          <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_25%_15%,#1c4a39_0%,#0e2a20_50%,#0a1a14_100%)]" />
          <svg className="absolute -bottom-1/4 -left-1/4 h-[120%] text-mint/15" viewBox="0 0 200 200" fill="none" aria-hidden="true">
            <path d="M100 40a60 60 0 0 1 0 120" stroke="currentColor" />
            <path d="M100 10a90 90 0 0 1 0 180" stroke="currentColor" />
            <path d="M100 -20a120 120 0 0 1 0 240" stroke="currentColor" />
          </svg>
          {showKeywords && (
            <div className="absolute inset-x-0 bottom-0 p-4 text-13 leading-snug text-sage">
              <p className="font-semibold text-linen/80">
                {img.file.replace('/images/', '')} <span className="font-normal text-sage">({img.size})</span>
              </p>
              <p className="mt-1 max-w-[46ch]">Freepik: {img.keywords}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
