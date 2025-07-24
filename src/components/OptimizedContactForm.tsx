import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { z } from 'zod'
import { supabase } from '../lib/supabaseClient'
import { sendContactEmail } from '../lib/emailjs'
import { useTranslation } from 'react-i18next'
import { Send, CheckCircle } from 'lucide-react'

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(1),
})

export default function OptimizedContactForm() {
  const { t } = useTranslation()
  const formRef = useRef<HTMLFormElement | null>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formRef.current) return

    const formData = new FormData(formRef.current)
    const data = {
      name: (formData.get('name') as string) || '',
      email: (formData.get('email') as string) || '',
      message: (formData.get('message') as string) || '',
    }

    const parsed = schema.safeParse(data)
    if (!parsed.success) {
      setError(t('contactForm.error'))
      return
    }

    try {
      setLoading(true)
      setError(null)

      const { error: insertError } = await supabase
        .from('contact_messages')
        .insert({
          name: data.name,
          email: data.email,
          message: data.message,
          origin: window.location.href,
          date: new Date().toISOString(),
        })

      if (insertError) {
        console.error(insertError)
        setError(t('contactForm.error'))
        return
      }

      await sendContactEmail({
        user_name: data.name,
        user_email: data.email,
        message: data.message,
      })

      setSuccess(true)
      formRef.current.reset()
    } catch (err) {
      console.error(err)
      setError(t('contactForm.error'))
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-6 border border-gray-800 bg-darker text-center text-green-500 flex items-center justify-center space-x-2 rounded-2xl"
      >
        <CheckCircle size={20} />
        <span>{t('contactForm.success')}</span>
      </motion.div>
    )
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="space-y-4 max-w-md w-full rounded-2xl bg-zinc-900 p-6 md:p-8 text-sm text-white border border-gray-800"
    >
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
          {t('contactForm.nameLabel')}
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="w-full rounded-lg bg-white/5 placeholder-gray-400 border border-white/20 p-3 focus:outline-none focus:border-white/40"
          placeholder={t('contactForm.namePlaceholder')}
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
          {t('contactForm.emailLabel')}
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="w-full rounded-lg bg-white/5 placeholder-gray-400 border border-white/20 p-3 focus:outline-none focus:border-white/40"
          placeholder={t('contactForm.emailPlaceholder')}
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
          {t('contactForm.messageLabel')}
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          className="w-full rounded-lg bg-white/5 placeholder-gray-400 border border-white/20 p-3 focus:outline-none focus:border-white/40"
          placeholder={t('contactForm.messagePlaceholder')}
        ></textarea>
      </div>

      {error && <div className="text-red-500 text-sm">{error}</div>}

      <button
        type="submit"
        aria-label={t('contactForm.send')}
        disabled={loading}
        className={`w-full flex items-center justify-center py-2 text-sm rounded-lg bg-white text-black font-medium transition ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/90'}`}
      >
        {loading ? (
          <span className="flex items-center">
            <svg
              className="animate-spin -ms-1 me-2 h-4 w-4 text-current"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            {t('contactForm.sending')}
          </span>
        ) : (
          <span className="flex items-center">
            <Send size={18} className="me-2" />
            {t('contactForm.send')}
          </span>
        )}
      </button>
      <p className="text-xs text-gray-500 text-center mt-2">
        {t('contactForm.disclaimer')}
      </p>
    </form>
  )
}
