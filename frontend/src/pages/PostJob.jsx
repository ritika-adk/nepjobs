import { useState } from "react"
import { useNavigate } from "react-router-dom"

function PostJob() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    job_type: "full_time",
    category: "it",
    salary: "",
    description: "",
    deadline: "",
  })
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem("access")
    if (!token) {
      setError("Please login first!")
      return
    }
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/jobs/post/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      })
      const data = await res.json()
      if (res.ok) {
        setMessage("Job posted successfully! 🎉")
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
            Post a Job 📝
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
              <label className="block text-gray-700 mb-1">Job Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded-lg outline-none focus:border-blue-500"
                placeholder="e.g. Python Developer"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Company</label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded-lg outline-none focus:border-blue-500"
                placeholder="e.g. Tech Nepal"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded-lg outline-none focus:border-blue-500"
                placeholder="e.g. Kathmandu"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-1">Job Type</label>
                <select
                  name="job_type"
                  value={formData.job_type}
                  onChange={handleChange}
                  className="w-full border px-4 py-2 rounded-lg outline-none focus:border-blue-500"
                >
                  <option value="full_time">Full Time</option>
                  <option value="part_time">Part Time</option>
                  <option value="internship">Internship</option>
                  <option value="remote">Remote</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full border px-4 py-2 rounded-lg outline-none focus:border-blue-500"
                >
                  <option value="it">IT & Software</option>
                  <option value="finance">Finance</option>
                  <option value="education">Education</option>
                  <option value="health">Health</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Salary (Rs.)</label>
              <input
                type="text"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded-lg outline-none focus:border-blue-500"
                placeholder="e.g. 50000"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded-lg outline-none focus:border-blue-500 h-32"
                placeholder="Describe the job role..."
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Deadline</label>
              <input
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded-lg outline-none focus:border-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              Post Job 🚀
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default PostJob