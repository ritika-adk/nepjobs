import { useState } from "react"
import { useNavigate } from "react-router-dom"

const API_URL = import.meta.env.VITE_API_URL

function ForgotPassword() {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch(`${API_URL}/api/accounts/forgot-password/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      })
      const data = await res.json()
      if (res.ok) {
        setMessage("Password reset email sent! Check your inbox 📧")
        setError("")
      } else {
        setError(data.error || "Something went wrong!")
      }
    } catch (err) {
      setError("Something went wrong!")
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">

        <h2 className="text-2xl font-bold text-center text-blue-600 mb-2">
          Forgot Password? 🔑
        </h2>
        <p className="text-gray-500 text-center mb-6">
          Enter your email and we'll send you a reset link
        </p>

        {message && (
          <div className="bg-green-100 text-green-700 p-3 rounded-lg mb-4">
            {message}
          </div>
        )}

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border px-4 py-2 rounded-lg outline-none focus:border-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold">
            {loading ? "Sending..." : "Send Reset Link 📧"}
          </button>
        </form>

        <p className="text-center text-gray-500 mt-4">
          Remember your password?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-600 cursor-pointer hover:underline">
            Login
          </span>
        </p>

      </div>
    </div>
  )
}

export default ForgotPassword