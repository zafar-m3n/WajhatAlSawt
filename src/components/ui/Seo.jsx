const SITE = 'https://wajhatalsawt.com'

/** React 19 hoists these tags into <head>. */
export default function Seo({ title, description, path = '' }) {
  const full = title ? `${title} | Wajhat Al Sawt` : 'Wajhat Al Sawt | BPO & Contact Center Solutions'
  return (
    <>
      <title>{full}</title>
      {description && <meta name="description" content={description} />}
      <link rel="canonical" href={`${SITE}${path}`} />
      <meta property="og:title" content={full} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:url" content={`${SITE}${path}`} />
      <meta property="og:type" content="website" />
    </>
  )
}
