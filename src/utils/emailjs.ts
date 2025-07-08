// src/utils/emailjs.ts
import emailjs from '@emailjs/browser';

export const sendEmail = async (formElement: HTMLFormElement) => {
  return emailjs.sendForm(
    import.meta.env.VITE_EMAILJS_SERVICE_ID!,
    import.meta.env.VITE_EMAILJS_TEMPLATE_ID!,
    formElement,
    import.meta.env.VITE_EMAILJS_PUBLIC_KEY!
  );
};
