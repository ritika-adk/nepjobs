import { useState, useEffect } from "react"
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom"
import Register from "./pages/Register"
import Login from "./pages/Login"
import PostJob from "./pages/PostJob"
import ApplyJob from "./pages/ApplyJob"
import Dashboard from "./pages/Dashboard"

function Home() {
  const [jobs, setJobs] = useState([])
  const [filteredJobs, setFilteredJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [location, setLocation] = useState("")
  const [category, setCategory] = useState("")
  const [jobType, setJobType] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const navigate = useNavigate()

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/jobs/")
      .then(res => res.json())
      .then(data => {
        setJobs(data)
        setFilteredJobs(data)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    let filtered = jobs

    if (search) {
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.company.toLowerCase().includes(search.toLowerCase())
      )
    }
    if (location) {
      filtered = filtered.filter(job =>
        job.location.toLowerCase().includes(location.toLowerCase())
      )
    }
    if (category) {
      filtered = filtered.filter(job => job.category === category)
    }
    if (jobType) {
      filtered = filtered.filter(job => job.job_type === jobType)
    }

    // Tab logic
    if (activeTab === "title") {
      filtered = [...filtered].sort((a, b) =>
        a.title.localeCompare(b.title)
      )
    }
    if (activeTab === "organization") {
      filtered = [...filtered].sort((a, b) =>
        a.company.localeCompare(b.company)
      )
    }
    if (activeTab === "location") {
      filtered = [...filtered].sort((a, b) =>
        a.location.localeCompare(b.location)
      )
    }
    if (activeTab === "category") {
      filtered = [...filtered].sort((a, b) =>
        a.category.localeCompare(b.category)
      )
    }

    setFilteredJobs(filtered)
  }, [search, location, category, jobType, activeTab, jobs])

  const clearFilters = () => {
    setSearch("")
    setLocation("")
    setCategory("")
    setJobType("")
    setActiveTab("all")
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Navbar */}
      <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center">
        <h1
          onClick={() => navigate("/")}
          className="text-2xl font-bold text-blue-600 cursor-pointer">
          NepJobs 💼
        </h1>
        <div className="flex gap-3">
          <button
            onClick={() => navigate("/post-job")}
            className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-50">
            For Employers →
          </button>
          <button
            onClick={() => navigate("/dashboard")}
            className="border border-gray-300 text-gray-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-50">
            Dashboard
          </button>
          <button
            onClick={() => navigate("/login")}
            className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-50">
            Login
          </button>
          <button
            onClick={() => navigate("/register")}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700">
            Register
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-blue-600 text-white text-center py-16 px-4">
        <h2 className="text-4xl font-bold mb-3">
          Find Your Dream Job in Nepal 🇳🇵
        </h2>
        <p className="text-xl text-blue-100">
          Thousands of jobs waiting for you!
        </p>
        <div className="flex justify-center gap-6 mt-6 text-blue-100 text-sm">
          <span>✅ 500+ Companies</span>
          <span>✅ 1000+ Jobs</span>
          <span>✅ 50+ Categories</span>
        </div>
      </div>

      {/* Search Section */}
      <div className="bg-white shadow-md py-6 px-4">
        <div className="max-w-4xl mx-auto flex gap-3">
          <input
            type="text"
            placeholder="🔍 Search by Job Title, Skill or Organization"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-6 py-3 rounded-lg border border-gray-300 outline-none focus:border-blue-500 text-gray-700"
          />
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700">
            🔍 Search
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-6xl mx-auto px-4 flex gap-0 overflow-x-auto">
          {[
            { label: "All Jobs", value: "all" },
            { label: "Jobs by Organization", value: "organization" },
            { label: "Jobs by Category", value: "category" },
            { label: "Jobs by Location", value: "location" },
            { label: "Jobs by Title (A-Z)", value: "title" },
          ].map(tab => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`px-6 py-4 text-sm font-semibold border-b-2 transition whitespace-nowrap
                ${activeTab === tab.value
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-blue-600"}`}>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8 flex gap-6">

        {/* Left Sidebar Filters */}
        <div className="w-72 shrink-0">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-gray-800 text-lg">🔧 Filter</h3>
              <button
                onClick={clearFilters}
                className="text-blue-600 text-sm hover:underline">
                Clear All
              </button>
            </div>

            {/* Location Filter */}
            <div className="mb-6">
              <h4 className="font-semibold text-gray-700 mb-2">📍 Location</h4>
              <input
                type="text"
                placeholder="e.g. Kathmandu"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full border px-3 py-2 rounded-lg outline-none focus:border-blue-500 text-sm"
              />
            </div>

            {/* Job Type Filter */}
            <div className="mb-6">
              <h4 className="font-semibold text-gray-700 mb-2">💼 Job Type</h4>
              {[
                { label: "All Types", value: "" },
                { label: "Full Time", value: "full_time" },
                { label: "Part Time", value: "part_time" },
                { label: "Internship", value: "internship" },
                { label: "Remote", value: "remote" },
              ].map(type => (
                <label key={type.value} className="flex items-center gap-2 mb-2 cursor-pointer">
                  <input
                    type="radio"
                    name="jobType"
                    value={type.value}
                    checked={jobType === type.value}
                    onChange={(e) => setJobType(e.target.value)}
                    className="text-blue-600"
                  />
                  <span className="text-sm text-gray-600">{type.label}</span>
                </label>
              ))}
            </div>

            {/* Category Filter */}
            <div className="mb-6">
              <h4 className="font-semibold text-gray-700 mb-2">🗂️ Category</h4>
              {[
                { label: "All Categories", value: "" },
                { label: "💻 IT & Software", value: "it" },
                { label: "💰 Finance", value: "finance" },
                { label: "📚 Education", value: "education" },
                { label: "🏥 Health", value: "health" },
                { label: "🔧 Other", value: "other" },
              ].map(cat => (
                <label key={cat.value} className="flex items-center gap-2 mb-2 cursor-pointer">
                  <input
                    type="radio"
                    name="category"
                    value={cat.value}
                    checked={category === cat.value}
                    onChange={(e) => setCategory(e.target.value)}
                    className="text-blue-600"
                  />
                  <span className="text-sm text-gray-600">{cat.label}</span>
                </label>
              ))}
            </div>

          </div>
        </div>

        {/* Jobs List */}
        <div className="flex-1">

          {/* Active Tab Label */}
          <div className="flex justify-between items-center mb-4">
            <p className="text-gray-500 text-sm">
              Showing <span className="font-bold text-gray-800">{filteredJobs.length}</span> jobs
              {activeTab !== "all" && (
                <span className="ml-2 text-blue-600 font-semibold">
                  — sorted by {activeTab}
                </span>
              )}
            </p>
            {(search || location || category || jobType) && (
              <button
                onClick={clearFilters}
                className="text-red-500 text-sm hover:underline">
                ✕ Clear Filters
              </button>
            )}
          </div>

          {loading ? (
            <p className="text-center text-gray-500 text-xl py-12">
              Loading jobs...
            </p>
          ) : filteredJobs.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm p-12 text-center">
              <p className="text-gray-500 text-xl">No jobs found! 😕</p>
              <button
                onClick={clearFilters}
                className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredJobs.map(job => (
                <div
                  key={job.id}
                  className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition border border-gray-100"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold text-xl shrink-0">
                        {job.company.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h4
                          className="text-lg font-bold text-blue-600 hover:underline cursor-pointer"
                          onClick={() => navigate(`/apply/${job.id}`)}>
                          {job.title}
                        </h4>
                        <p className="text-gray-600 font-semibold">
                          {job.company}
                        </p>
                        <div className="flex flex-wrap gap-3 mt-2 text-sm text-gray-500">
                          <span>💼 {job.job_type.replace("_", " ")}</span>
                          <span>|</span>
                          <span>📍 {job.location}</span>
                          <span>|</span>
                          <span>💰 Rs. {job.salary}</span>
                          <span>|</span>
                          <span>🗂️ {job.category.toUpperCase()}</span>
                        </div>
                        <p className="text-sm text-gray-400 mt-1">
                          📅 Deadline: {job.deadline}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => navigate(`/apply/${job.id}`)}
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-semibold shrink-0">
                      Apply Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-6 mt-8">
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
        <Route path="/post-job" element={<PostJob />} />
        <Route path="/apply/:id" element={<ApplyJob />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App