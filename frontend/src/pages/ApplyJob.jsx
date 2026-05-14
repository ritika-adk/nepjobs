import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

function ApplyJob() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [cv, setCv] = useState(null)
  const [coverLetter, setCoverLetter] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem("access")
    if (!token) {
      setError("Please login first!")
      return
    }
    try {
      const formData = new FormData()
      formData.append("job", id)
      formData.append("cv", cv)
      formData.append("cover_letter", coverLetter)

      const res = await fetch(`http://127.0.0.1:8000/api/jobs/${id}/apply/`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`
        },
        body: formData
      })
      const data = await res.json()
      if (res.ok) {
        setMessage("Application submitted successfully! 🎉")
        setError("")
        setTimeout(() => navigate("/"), 2000)
      } else {
        setError(JSON.stringify(data))
      }
    } catch (err) {
      setError("Something went wrong!")
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}
      <nav className="bg-blue-600 text-white px-8 py-4 flex justify-between items-center shadow-lg">
        <h1 className="text-2xl font-bold cursor-pointer"
          onClick={() => navigate("/")}>
          NepJobs 💼
        </h1>
        <button
          onClick={() => navigate("/")}
          className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold">
          Back to Jobs
        </button>
      </nav>

      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-blue-600 mb-6">
            Apply for Job 📄
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
              <label className="block text-gray-700 mb-1">
                Upload CV (PDF)
              </label>
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => setCv(e.target.files[0])}
                className="w-full border px-4 py-2 rounded-lg outline-none focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">
                Cover Letter (optional)
              </label>
              <textarea
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                className="w-full border px-4 py-2 rounded-lg outline-none focus:border-blue-500 h-32"
                placeholder="Write a short cover letter..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              Submit Application 🚀
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ApplyJob