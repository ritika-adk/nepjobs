import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Register() {
    const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "seeker"
  })
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/accounts/register/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })
      const data = await res.json()
      if (res.ok) {
        setMessage(data.message)
  setError("")
  setTimeout(() => navigate("/"), 1500)
        
      } else {
        setError(JSON.stringify(data))
        setMessage("")
      }
    } catch (err) {
      setError("Something went wrong!")
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">

        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Create Account 🚀
        </h2>

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
            <label className="block text-gray-700 mb-1">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-lg outline-none focus:border-blue-500"
              placeholder="Enter username"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-lg outline-none focus:border-blue-500"
              placeholder="Enter email"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-lg outline-none focus:border-blue-500"
              placeholder="Enter password"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">I am a</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-lg outline-none focus:border-blue-500"
            >
              <option value="seeker">Job Seeker 👨‍💼</option>
              <option value="employer">Employer 🏢</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            Register
          </button>
        </form>

        <p className="text-center text-gray-500 mt-4">
          Already have an account?{" "}
          <span className="text-blue-600 cursor-pointer hover:underline">
            Login
          </span>
        </p>

      </div>
    </div>
  )
}

export default Register