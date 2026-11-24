import { useState } from 'react'
import { Icon } from '@iconify/react'
import Button from '@/components/ui/Button'
import PageIntro from '@/components/ui/PageIntro'
import Select from '@/components/ui/Select'
import Seo from '@/components/ui/Seo'
import { FaqBlock } from '@/pages/Service'
import { company, contactPage } from '@/data/site'
import { practices, serviceIndex } from '@/data/catalog'
import { faqs } from '@/data/faqs'

const bySlug = Object.fromEntries(serviceIndex.map((s) => [s.slug, s]))
const serviceOptions = practices.map((p) => ({
  label: p.name,
  options: p.services.map((slug) => ({ value: slug, label: bySlug[slug].title })),
}))

const methods = [
  { label: 'Email', value: company.email, href: `mailto:${company.email}`, icon: 'ph:envelope-simple-light' },
  { label: 'Hotline', value: company.phone, href: company.phoneHref, icon: 'ph:phone-light' },
  { label: 'Address', value: company.address, icon: 'ph:map-pin-light' },
  { label: 'Web', value: company.web, href: '/', icon: 'ph:globe-simple-light' },
]

const fieldCls =
  'w-full border-0 border-b border-line bg-transparent py-2.5 text-17 text-linen placeholder:text-sage/60 transition-colors focus:border-mint focus:outline-none aria-[invalid=true]:border-red-400'

function Field({ id, label, error, optional, children }) {
  return (
    <div>
      <label htmlFor={id} className="flex justify-between text-15 text-sage">
        {label}
        {optional && <span className="text-13">Optional</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-2 text-15 text-red-300">
          {error}
        </p>
      )}
    </div>
  )
}

function ContactForm() {
  const [values, setValues] = useState({ name: '', email: '', company: '', phone: '', service: null, message: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState(null)

  const set = (k) => (e) => {
    setValues((v) => ({ ...v, [k]: e?.target ? e.target.value : e }))
    setErrors((er) => ({ ...er, [k]: undefined }))
    setStatus(null)
  }

  const submit = (e) => {
    e.preventDefault()
    const er = {}
    if (!values.name.trim()) er.name = 'Enter your name.'
    if (!values.email.trim()) er.email = 'Enter your email address.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) er.email = 'Enter an email address like name@company.com.'
    if (!values.message.trim()) er.message = 'Tell us a little about what you need.'
    setErrors(er)
    if (Object.keys(er).length) {
      document.getElementById(`cf-${Object.keys(er)[0]}`)?.focus()
      return
    }
    setStatus('offline')
  }

  const aria = (k) => ({ 'aria-invalid': !!errors[k], 'aria-describedby': errors[k] ? `cf-${k}-error` : undefined })

  return (
    <form onSubmit={submit} noValidate className="grid gap-8 sm:grid-cols-2 sm:gap-x-8">
      <Field id="cf-name" label="Full name" error={errors.name}>
        <input id="cf-name" autoComplete="name" value={values.name} onChange={set('name')} className={fieldCls} {...aria('name')} />
      </Field>
      <Field id="cf-email" label="Work email" error={errors.email}>
        <input id="cf-email" type="email" autoComplete="email" value={values.email} onChange={set('email')} className={fieldCls} {...aria('email')} />
      </Field>
      <Field id="cf-company" label="Company" optional>
        <input id="cf-company" autoComplete="organization" value={values.company} onChange={set('company')} className={fieldCls} />
      </Field>
      <Field id="cf-phone" label="Phone" optional>
        <input id="cf-phone" type="tel" autoComplete="tel" value={values.phone} onChange={set('phone')} className={fieldCls} />
      </Field>
      <div className="sm:col-span-2">
        <Field id="cf-service" label="Service you're interested in" optional>
          <Select
            inputId="cf-service"
            variant="underline"
            options={serviceOptions}
            value={values.service}
            onChange={set('service')}
            placeholder="Choose a service"
            isClearable
          />
        </Field>
      </div>
      <div className="sm:col-span-2">
        <Field id="cf-message" label="Message" error={errors.message}>
          <textarea id="cf-message" rows={5} value={values.message} onChange={set('message')} className={`${fieldCls} resize-y`} {...aria('message')} />
        </Field>
      </div>
      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center">
        <Button type="submit">Send message</Button>
        <p role="status" className="text-15 text-sage">
          {status === 'offline' ? (
            <>
              This form isn't connected yet. Email <a className="text-link" href={`mailto:${company.email}`}>{company.email}</a> or call{' '}
              <a className="text-link" href={company.phoneHref}>{company.phone}</a>.
            </>
          ) : (
            'We typically respond within 24 hours.'
          )}
        </p>
      </div>
    </form>
  )
}

export default function Contact() {
  return (
    <>
      <Seo title="Contact" description={contactPage.lede} path="/contact" />
      <PageIntro title={contactPage.title} deck={contactPage.lede} />

      <section className="shell grid gap-16 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-24">
        <div>
          <ul className="border-t border-line">
            {methods.map((m) => (
              <li key={m.label} className="flex gap-5 border-b border-line py-6">
                <Icon icon={m.icon} className="mt-1 size-6 shrink-0 text-mint" aria-hidden="true" />
                <div>
                  <p className="text-15 text-sage">{m.label}</p>
                  {m.href ? (
                    <a href={m.href} className="mt-1 block text-21 break-words hover:text-mint">
                      {m.value}
                    </a>
                  ) : (
                    <p className="mt-1 text-21">{m.value}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
          <ul className="mt-12 space-y-6">
            {contactPage.trust.map((t) => (
              <li key={t.title}>
                <p className="font-semibold">{t.title}</p>
                <p className="text-15 text-sage">{t.text}</p>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="display-section max-w-[16ch]">{contactPage.formTitle}</h2>
          <p className="measure mt-6 text-sage">{contactPage.formIntro}</p>
          <div className="mt-12">
            <ContactForm />
          </div>
        </div>
      </section>

      <FaqBlock faqs={faqs.contact} />
    </>
  )
}
