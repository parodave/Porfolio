import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { useTranslation } from 'react-i18next';

const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID!;
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID!;

export default function ContactForm() {
  const { t } = useTranslation();
  const form = useRef<HTMLFormElement | null>(null);
  const [status, setStatus] = useState<"success" | "error" | "loading" | null>(null);

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    emailjs
      .sendForm(
        serviceId,
        templateId,
        form.current!,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setStatus("success");
          form.current?.reset();
        },
        (error) => {
          console.error("❌ Erreur EmailJS :", error);
          setStatus("error");
        }
      );
  };

  return (
    <form ref={form} onSubmit={sendEmail} className="space-y-4">
      <input type="text" name="name" placeholder={t('contactForm.namePlaceholder')} required className="w-full p-2 border rounded" />
      <input type="email" name="email" placeholder={t('contactForm.emailPlaceholder')} required className="w-full p-2 border rounded" />
      <textarea name="message" placeholder={t('contactForm.messagePlaceholder')} required className="w-full p-2 border rounded" />
      <button type="submit" disabled={status === 'loading'} className="px-4 py-2 bg-blue-500 text-white rounded">
        {status === "loading" ? t('contactForm.sending') : `✈️ ${t('contactForm.send')}`}
      </button>
      {status === "success" && <p style={{ color: 'green' }}>{t('contactForm.success')}</p>}
      {status === "error" && <p style={{ color: 'red' }}>{t('contactForm.error')}</p>}
    </form>
  );
}
