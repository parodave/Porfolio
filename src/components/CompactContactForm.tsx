import React, { useRef, useState, useEffect } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';

const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY!;
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID!;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID!;

interface CompactContactFormProps {
  id?: string;
}

const CompactContactForm: React.FC<CompactContactFormProps> = ({ id }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    try {
      setLoading(true);
      setError('');
      const result = await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current
      );
      if (result.text === 'OK') {
        setSuccess(true);
        formRef.current.reset();
      } else {
        throw new Error('Failed to send email');
      }
    } catch (err) {
      console.error(err);
      setError("Une erreur est survenue. Veuillez réessayer plus tard.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="p-4 border border-gray-800 bg-darker text-center text-green-500 flex items-center justify-center space-x-2">
        <CheckCircle size={20} />
        <span>Message envoyé !</span>
      </div>
    );
  }

  return (
    <form
      id={id}
      ref={formRef}
      onSubmit={handleSubmit}
      className="space-y-2 w-full"
    >
      <div className="flex flex-col md:flex-row gap-2">
        <input
          type="text"
          name="user_name"
          required
          placeholder="Nom"
          className="flex-1 bg-dark border border-gray-700 text-white px-2 py-1 focus:outline-none focus:border-white"
        />
        <input
          type="email"
          name="user_email"
          required
          placeholder="Email"
          className="flex-1 bg-dark border border-gray-700 text-white px-2 py-1 focus:outline-none focus:border-white"
        />
      </div>
      <textarea
        name="message"
        required
        rows={2}
        placeholder="Message"
        className="w-full bg-dark border border-gray-700 text-white px-2 py-1 focus:outline-none focus:border-white"
      ></textarea>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 border border-white text-white hover:bg-white hover:text-black transition-colors duration-300 disabled:opacity-70 flex items-center justify-center"
      >
        {loading ? (
          <span>Envoi...</span>
        ) : (
          <>
            <Send size={16} className="mr-1" /> Envoyer
          </>
        )}
      </button>
    </form>
  );
};

export default CompactContactForm;
