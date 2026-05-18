import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

const API_URL = import.meta.env.VITE_API_URL

function ResetPassword() {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { uid, token } = useParams()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setError("Passwords do not match!")
      return
    }
    setLoading(true)
    try {
      const res = await fetch(`${API_URL}/api/accounts/reset-password/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uid, token, password })
      })
      const data = await res.json()
      if (res.ok) {
        setMessage("Password reset successful! 🎉")
        setError("")
        setTimeout(() => navigate("/login"), 2000)
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
          Reset Password 🔒
        </h2>
        <p className="text-gray-500 text-center mb-6">
          Enter your new password
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
            <label className="block text-gray-700 mb-1">New Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border px-4 py-2 rounded-lg outline-none focus:border-blue-500"
              placeholder="Enter new password"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border px-4 py-2 rounded-lg outline-none focus:border-blue-500"
              placeholder="Confirm new password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold">
            {loading ? "Resetting..." : "Reset Password 🔒"}
          </button>
        </form>

      </div>
    </div>
  )
}

export default ResetPassword