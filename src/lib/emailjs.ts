import emailjs from 'emailjs-com'

export const sendContactEmail = (data: Record<string, unknown>) => {
  return emailjs.send(
    import.meta.env.VITE_EMAILJS_SERVICE_ID!,
    import.meta.env.VITE_EMAILJS_TEMPLATE_ID!,
    data,
    import.meta.env.VITE_EMAILJS_PUBLIC_KEY!
  )
}
