import React, { useRef, useState, useEffect } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';

const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY!;
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID!;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID!;

interface CompactContactFormProps {
  id?: string;
  formRef?: React.RefObject<HTMLFormElement>;
  handleSubmit?: (e: React.FormEvent) => void;
  loading?: boolean;
  error?: string;
}

const CompactContactForm: React.FC<CompactContactFormProps> = ({
  id,
  formRef,
  handleSubmit,
  loading,
  error,
}) => {
  const internalFormRef = useRef<HTMLFormElement>(null);
  const [internalLoading, setInternalLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [internalError, setInternalError] = useState('');

  useEffect(() => {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }, []);

  const internalHandleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!internalFormRef.current) return;
    try {
      setInternalLoading(true);
      setInternalError('');
      const result = await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        internalFormRef.current
      );
      if (result.text === 'OK') {
        setSuccess(true);
        internalFormRef.current.reset();
      } else {
        throw new Error('Failed to send email');
      }
    } catch (err) {
      console.error(err);
      setInternalError("Une erreur est survenue. Veuillez réessayer plus tard.");
    } finally {
      setInternalLoading(false);
    }
  };

  if (success && !handleSubmit) {
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
      ref={formRef ?? internalFormRef}
      onSubmit={handleSubmit ?? internalHandleSubmit}
      className="space-y-4 max-w-md rounded-xl bg-zinc-900 p-4 text-sm text-white"
    >
      <div>
        <label htmlFor="user_name" className="block text-sm font-medium text-gray-300 mb-1">
          Nom
        </label>
        <input
          type="text"
          id="user_name"
          name="user_name"
          required
          className="w-full rounded-lg bg-white/5 placeholder-gray-400 border border-white/20 p-3 focus:outline-none focus:border-white/40"
          placeholder="Votre nom"
        />
      </div>

      <div>
        <label htmlFor="user_email" className="block text-sm font-medium text-gray-300 mb-1">
          Email
        </label>
        <input
          type="email"
          id="user_email"
          name="user_email"
          required
          className="w-full rounded-lg bg-white/5 placeholder-gray-400 border border-white/20 p-3 focus:outline-none focus:border-white/40"
          placeholder="votre@email.com"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          className="w-full rounded-lg bg-white/5 placeholder-gray-400 border border-white/20 p-3 focus:outline-none focus:border-white/40"
          placeholder="Votre message..."
        ></textarea>
      </div>

      {(error ?? internalError) && (
        <div className="text-red-500 text-sm">{error ?? internalError}</div>
      )}

      <button
        type="submit"
        disabled={loading ?? internalLoading}
        className={`w-full flex items-center justify-center py-2 text-sm rounded-lg bg-white text-black font-medium transition ${
          loading ?? internalLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/90'
        }`}
      >
        {(loading ?? internalLoading) ? (
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
            Envoi en cours...
          </span>
        ) : (
          <span className="flex items-center">
            <Send size={18} className="me-2" />
            Envoyer le message
          </span>
        )}
      </button>

      <p className="text-xs text-gray-500 text-center mt-2">
        En soumettant ce formulaire, vous acceptez que vos données soient utilisées uniquement pour que je puisse vous contacter.
      </p>
    </form>
  );
};

export default CompactContactForm;
