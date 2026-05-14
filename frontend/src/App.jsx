import { useState, useEffect } from "react"

function App() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/jobs/")
      .then(res => res.json())
      .then(data => {
        setJobs(data)
        setLoading(false)
      })
  }, [])

  return (
    <div>
      <h1>NepJobs 💼</h1>
      {loading ? (
        <p>Loading jobs...</p>
      ) : (
        jobs.map(job => (
          <div key={job.id}>
            <h2>{job.title}</h2>
            <p>{job.company}</p>
            <p>{job.location}</p>
            <p>{job.salary}</p>
          </div>
        ))
      )}
    </div>
  )
}

export default App