import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

const API_URL = import.meta.env.VITE_API_URL

function Dashboard() {
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [role, setRole] = useState("")
  const [username, setUsername] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("access")
    if (!token) {
      navigate("/login")
      return
    }

    fetch(`${API_URL}/api/accounts/profile/`, {
      headers: { "Authorization": `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        setRole(data.role)
        setUsername(data.username)

        const url = data.role === "employer"
          ? `${API_URL}/api/jobs/employer-applications/`
          : `${API_URL}/api/jobs/my-applications/`

        return fetch(url, {
          headers: { "Authorization": `Bearer ${token}` }
        })
      })
      .then(res => res.json())
      .then(data => {
        setApplications(Array.isArray(data) ? data : [])
        setLoading(false)
      })
      .catch(err => {
        console.log("Error:", err)
        setLoading(false)
      })
  }, [])

  const updateStatus = async (appId, status) => {
    const token = localStorage.getItem("access")
    try {
      const res = await fetch(`${API_URL}/api/jobs/${appId}/update-status/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      })
      if (res.ok) {
        setApplications(applications.map(app =>
          app.id === appId ? { ...app, status } : app
        ))
        alert(`Application ${status} successfully! 🎉`)
      }
    } catch (err) {
      console.log("Error:", err)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("access")
    localStorage.removeItem("refresh")
    navigate("/")
  }

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}
      <nav className="bg-blue-600 text-white px-8 py-4 flex justify-between items-center shadow-lg">
        <h1 className="text-2xl font-bold cursor-pointer"
          onClick={() => navigate("/")}>
          NepJobs 💼
        </h1>
        <div className="flex gap-4">
          {role === "employer" && (
            <button
              onClick={() => navigate("/post-job")}
              className="bg-green-400 text-black px-4 py-2 rounded-lg font-semibold hover:bg-green-300">
              Post Job 📝
            </button>
          )}
          <button
            onClick={handleLogout}
            className="bg-red-400 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-500">
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-12">

        {/* Welcome */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800">
            {role === "employer" ? "Employer Dashboard 🏢" : "My Applications 👨‍💼"}
          </h2>
          <p className="text-gray-500 mt-1">
            Welcome back, <span className="font-semibold text-blue-600">{username}</span> !
          </p>
          <p className="text-gray-500">
            {role === "employer"
              ? "See who applied for your jobs"
              : "Track your job applications"}
          </p>
        </div>

        {/* Applications */}
        {loading ? (
          <p className="text-center text-gray-500 text-xl">Loading...</p>
        ) : applications.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <p className="text-gray-500 text-xl">
              {role === "employer"
                ? "No applications yet 📭"
                : "You haven't applied for any jobs yet 📭"}
            </p>
            {role === "seeker" && (
              <button
                onClick={() => navigate("/")}
                className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                Browse Jobs
              </button>
            )}
            {role === "employer" && (
              <button
                onClick={() => navigate("/post-job")}
                className="mt-4 bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600">
                Post a Job
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {applications.map(app => (
              <div
                key={app.id}
                className="bg-white rounded-xl shadow-md p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-xl font-bold text-gray-800">
                      {app.job_title}
                    </h4>
                    <p className="text-gray-500">
                      {role === "employer"
                        ? `Applicant: ${app.applicant_name}`
                        : `Applied on: ${new Date(app.applied_at).toLocaleDateString()}`}
                    </p>
                  </div>
                  <span className={`text-sm px-3 py-1 rounded-full font-semibold
                    ${app.status === "accepted" ? "bg-green-100 text-green-600" :
                      app.status === "rejected" ? "bg-red-100 text-red-600" :
                      app.status === "reviewed" ? "bg-yellow-100 text-yellow-600" :
                      "bg-gray-100 text-gray-600"}`}>
                    {app.status}
                  </span>
                </div>

                {app.cover_letter && (
                  <p className="text-gray-500 text-sm mt-2">
                    📝 {app.cover_letter}
                  </p>
                )}

                {app.cv_url && (
                  
                    <a href={app.cv_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 text-sm hover:underline mt-2 block">
                    📄 View CV
                  </a>
                )}

                {role === "employer" && (
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => updateStatus(app.id, 'accepted')}
                      className="bg-green-500 text-white px-4 py-1 rounded-lg text-sm hover:bg-green-600">
                      ✅ Accept
                    </button>
                    <button
                      onClick={() => updateStatus(app.id, 'reviewed')}
                      className="bg-yellow-500 text-white px-4 py-1 rounded-lg text-sm hover:bg-yellow-600">
                      👁️ Reviewed
                    </button>
                    <button
                      onClick={() => updateStatus(app.id, 'rejected')}
                      className="bg-red-500 text-white px-4 py-1 rounded-lg text-sm hover:bg-red-600">
                      ❌ Reject
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  )
}

export default Dashboard