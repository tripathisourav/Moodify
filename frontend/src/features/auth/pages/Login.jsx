import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import AuthCard from '../components/AuthCard'
import '../styles/form.scss'

const Login = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const { handleLogin, loading } = useAuth()

  if (loading) {
    return <main><h1>Loading....</h1></main>
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    try {
      const res = await handleLogin(username, password)

      if (res?.user) {
        navigate('/')
      }

      setUsername('')
      setPassword('')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.')
    }

  }

  return (
    <AuthCard
      title="Welcome back"
      footerText="Don't have an account?"
      footerLinkText="Register"
      footerLinkTo="/register"
    >
      <form onSubmit={handleSubmit} className="auth-form">
        <label>
          Username
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            autoComplete="username"
          />
        </label>

        <label>
          Password
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            autoComplete="current-password"
          />
        </label>

        {error && <p role="alert">{error}</p>}
        <button className="button primary-button" type="submit">Login</button>
      </form>
    </AuthCard>
  )
}

export default Login