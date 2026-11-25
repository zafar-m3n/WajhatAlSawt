import { imageFor } from '@/data/images'

/**
 * Site photo by slot name (see @/data/images). Crops to its frame with the slot's focal point.
 * `fill` makes it cover its positioned parent instead of using its own aspect ratio;
 * `mobileRatio` gives phones their own crop.
 */
export default function Photo({ slot, alt, className = '', ratio, mobileRatio, rounded = 'rounded-[22px]', eager = false, fill = false }) {
  const img = imageFor(slot)
  if (!img) return null
  const r = ratio ?? img.ratio
  const box = fill ? 'absolute inset-0' : 'relative'
  const sizing = fill ? {} : mobileRatio ? { '--ar': r, '--ar-m': mobileRatio } : { aspectRatio: r }
  const sizeCls = !fill && mobileRatio ? 'aspect-(--ar-m) md:aspect-(--ar)' : ''
  const pos = img.pos ?? 'center'
  const posMobile = img.posMobile ?? pos

  return (
    <div className={`${box} ${sizeCls} overflow-hidden bg-fern ${rounded} ${className}`} style={sizing}>
      <img
        src={img.file}
        alt={alt ?? img.alt ?? ''}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={eager ? 'high' : undefined}
        style={{ '--pos': pos, '--pos-m': posMobile }}
        className="absolute inset-0 size-full object-cover object-(--pos-m) md:object-(--pos)"
      />
    </div>
  )
}
