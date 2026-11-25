import { motion } from 'motion/react'
import { Reveal, Stagger, item } from '@/components/motion/Motion'
import { useState } from 'react'
import { Icon } from '@iconify/react'
import Button from '@/components/ui/Button'
import PageIntro from '@/components/ui/PageIntro'
import Seo from '@/components/ui/Seo'
import { FaqBlock } from '@/components/sections/Blocks'
import { company, contactForm, contactPage } from '@/data/site'
import { faqs } from '@/data/faqs'

const methods = [
  { label: 'Email', value: company.email, href: `mailto:${company.email}`, icon: 'ph:envelope-simple-light' },
  { label: 'Careers', value: company.careersEmail, href: `mailto:${company.careersEmail}`, icon: 'ph:briefcase-light', note: 'For job applications and career inquiries' },
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
  const empty = { name: '', email: '', phone: '', company: '', message: '' }
  const [values, setValues] = useState(empty)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState(null) // 'sending' | 'sent' | 'error' | null

  const set = (k) => (e) => {
    setValues((v) => ({ ...v, [k]: e.target.value }))
    setErrors((er) => ({ ...er, [k]: undefined }))
    if (status !== 'sending') setStatus(null)
  }

  const submit = async (e) => {
    e.preventDefault()
    if (status === 'sending') return
    const er = {}
    if (!values.name.trim()) er.name = 'Enter your name.'
    if (!values.email.trim()) er.email = 'Enter your email address.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) er.email = 'Enter an email address like name@company.com.'
    if (!values.message.trim()) er.message = 'Enter a brief message.'
    setErrors(er)
    if (Object.keys(er).length) {
      document.getElementById(`cf-${Object.keys(er)[0]}`)?.focus()
      return
    }

    setStatus('sending')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: contactForm.accessKey,
          subject: `New website inquiry from ${values.name.trim()}`,
          from_name: 'Wajhat Al Sawt Website',
          replyto: values.email.trim(),
          botcheck: e.target.botcheck.checked,
          ...values,
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok || !data.success) throw new Error(data.message)
      setValues(empty)
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  const aria = (k) => ({ 'aria-invalid': !!errors[k], 'aria-describedby': errors[k] ? `cf-${k}-error` : undefined })

  const message = {
    sending: 'Sending your message...',
    sent: 'Thank you. Your message has been received and a member of our team will get back to you within 24 hours.',
    error: (
      <>
        Your message could not be sent. Please try again or email{' '}
        <a className="text-link" href={`mailto:${company.email}`}>
          {company.email}
        </a>
        .
      </>
    ),
  }[status] ?? 'We respond to every inquiry within 24 hours.'

  return (
    <form onSubmit={submit} noValidate className="grid gap-8 sm:grid-cols-2 sm:gap-x-8">
      {/* Honeypot for spam bots (Web3Forms rejects submissions where it is ticked) */}
      <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <Field id="cf-name" label="Full name" error={errors.name}>
        <input id="cf-name" autoComplete="name" value={values.name} onChange={set('name')} className={fieldCls} {...aria('name')} />
      </Field>
      <Field id="cf-email" label="Email" error={errors.email}>
        <input id="cf-email" type="email" autoComplete="email" value={values.email} onChange={set('email')} className={fieldCls} {...aria('email')} />
      </Field>
      <Field id="cf-phone" label="Phone" optional>
        <input id="cf-phone" type="tel" autoComplete="tel" value={values.phone} onChange={set('phone')} className={fieldCls} />
      </Field>
      <Field id="cf-company" label="Company" optional>
        <input id="cf-company" autoComplete="organization" value={values.company} onChange={set('company')} className={fieldCls} />
      </Field>
      <div className="sm:col-span-2">
        <Field id="cf-message" label="Message" error={errors.message}>
          <textarea id="cf-message" rows={5} value={values.message} onChange={set('message')} className={`${fieldCls} resize-y`} {...aria('message')} />
        </Field>
      </div>
      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center">
        <Button type="submit" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending...' : 'Send message'}
        </Button>
        <p role="status" className={`text-15 ${status === 'error' ? 'text-red-300' : 'text-sage'}`}>
          {message}
        </p>
      </div>
    </form>
  )
}

export default function Contact() {
  return (
    <>
      <Seo path="/contact" />
      <PageIntro title={contactPage.title} deck={contactPage.lede} />

      <section className="shell grid gap-16 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-24">
        <div>
          <Stagger className="border-t border-line">
            {methods.map((m) => (
              <motion.li variants={item} key={m.label} className="flex gap-5 border-b border-line py-6">
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
                  {m.note && <p className="mt-1 text-15 text-sage">{m.note}</p>}
                </div>
              </motion.li>
            ))}
          </Stagger>
          <ul className="mt-12 space-y-6">
            {contactPage.trust.map((t) => (
              <li key={t.title}>
                <p className="font-semibold">{t.title}</p>
                <p className="text-15 text-sage">{t.text}</p>
              </li>
            ))}
          </ul>
        </div>

        <Reveal delay={0.15}>
          <h2 className="display-section max-w-[16ch]">{contactPage.formTitle}</h2>
          <p className="measure mt-6 text-sage">{contactPage.formIntro}</p>
          <div className="mt-12">
            <ContactForm />
          </div>
        </Reveal>
      </section>

      <FaqBlock faqs={faqs.contact} />
    </>
  )
}
