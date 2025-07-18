import { useState } from "react"
import { supabase } from "../lib/supabaseClient"

export default function TestFormSupabase() {
  const [nom, setNom] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const { error } = await supabase.from("messages").insert([
      { nom, email, message },
    ])

    if (error) {
      alert("Erreur lors de l'envoi 😢")
      console.error(error)
    } else {
      setSuccess(true)
      setNom("")
      setEmail("")
      setMessage("")
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-8 space-y-4 border p-4 rounded-md bg-white text-black"
    >
      <h2 className="text-xl font-bold">Formulaire test Supabase</h2>

      <input
        type="text"
        placeholder="Nom"
        value={nom}
        onChange={(e) => setNom(e.target.value)}
        required
        className="w-full border px-3 py-2 rounded"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full border px-3 py-2 rounded"
      />
      <textarea
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
        className="w-full border px-3 py-2 rounded"
      />

      <button
        type="submit"
        className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
      >
        Envoyer
      </button>

      {success && <p className="text-green-600">Message envoyé ✅</p>}
    </form>
  )
}
