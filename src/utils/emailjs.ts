// src/utils/emailjs.ts
import emailjs from '@emailjs/browser';

export const sendEmail = async (
  formData: { name: string; email: string; message: string },
  formElement: HTMLFormElement
) => {
  return emailjs.sendForm(
    'service_i30ke34',
    'template_wnyg66p',
    formElement,
    'w2jrqSt-GwSCQR7zM'
  );
};
