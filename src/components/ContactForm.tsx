import { useRef, useState } from "react"
import emailjs from "@emailjs/browser"
import { useTranslation } from "react-i18next"

const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID!
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID!
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY!

export default function ContactForm() {
  const { t, i18n } = useTranslation()
  const form = useRef<HTMLFormElement | null>(null)
  const [status, setStatus] = useState<"success" | "error" | "loading" | null>(null)

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.current) return
    setStatus("loading")

    emailjs
      .sendForm(serviceId, templateId, form.current, publicKey)
      .then(
        () => {
          setStatus("success")
          form.current?.reset()
        },
        (error) => {
          console.error("❌ EmailJS Error:", error)
          setStatus("error")
        }
      )
  }

  return (
    <form
      ref={form}
      onSubmit={sendEmail}
      className="space-y-4 bg-transparent text-white"
    >
      <input
        type="text"
        name="user_name"
        placeholder={t("contactForm.namePlaceholder")}
        required
        className="w-full p-3 bg-transparent border border-neutral-600 rounded placeholder:text-gray-400"
      />
      <input
        type="email"
        name="user_email"
        placeholder={t("contactForm.emailPlaceholder")}
        required
        className="w-full p-3 bg-transparent border border-neutral-600 rounded placeholder:text-gray-400"
      />
      <textarea
        name="message"
        placeholder={t("contactForm.messagePlaceholder")}
        required
        rows={5}
        className="w-full p-3 bg-transparent border border-neutral-600 rounded placeholder:text-gray-400"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="px-6 py-2 rounded bg-white text-black hover:bg-neutral-200 transition disabled:opacity-50"
      >
        {status === "loading"
          ? t("contactForm.sending")
          : `✈️ ${t("contactForm.send")}`}
      </button>

      {status === "success" && (
        <p className="text-green-400">{t("contactForm.success")}</p>
      )}
      {status === "error" && (
        <p className="text-red-400">{t("contactForm.error")}</p>
      )}
    </form>
  )
}
