import { useState, useEffect } from "react"
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom"
import Register from "./pages/Register"
import Login from "./pages/Login"

function Home() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/jobs/")
      .then(res => res.json())
      .then(data => {
        setJobs(data)
        setLoading(false)
      })
  }, [])

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}
      <nav className="bg-blue-600 text-white px-8 py-4 flex justify-between items-center shadow-lg">
        <h1 className="text-2xl font-bold cursor-pointer"
          onClick={() => navigate("/")}>
          NepJobs 💼
        </h1>
        <div className="flex gap-4">
          <button
            onClick={() => navigate("/login")}
            className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100">
            Login
          </button>
          <button
            onClick={() => navigate("/register")}
            className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300">
            Register
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-blue-600 text-white text-center py-16 px-4">
        <h2 className="text-4xl font-bold mb-4">
          Find Your Dream Job in Nepal 🇳🇵
        </h2>
        <p className="text-xl mb-8">
          Thousands of jobs waiting for you!
        </p>
        <input
          type="text"
          placeholder="Search jobs..."
          className="w-full max-w-lg px-6 py-3 rounded-full text-black text-lg outline-none"
        />
      </div>

      {/* Jobs Section */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h3 className="text-2xl font-bold mb-6 text-gray-800">
          Latest Jobs
        </h3>

        {loading ? (
          <p className="text-center text-gray-500 text-xl">
            Loading jobs...
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map(job => (
              <div
                key={job.id}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-xl font-bold text-gray-800">
                      {job.title}
                    </h4>
                    <p className="text-blue-600 font-semibold">
                      {job.company}
                    </p>
                  </div>
                  <span className="bg-blue-100 text-blue-600 text-sm px-3 py-1 rounded-full">
                    {job.job_type}
                  </span>
                </div>

                <div className="text-gray-500 text-sm space-y-1 mb-4">
                  <p>📍 {job.location}</p>
                  <p>💰 Rs. {job.salary}</p>
                  <p>📅 Deadline: {job.deadline}</p>
                </div>

                <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold">
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-6">
        <p>© 2025 NepJobs. Built with ❤️ in Nepal 🇳🇵</p>
      </footer>

    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App