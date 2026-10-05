import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import AuthCard from '../components/AuthCard'
import '../styles/form.scss'

const Register = () => {

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const { handleRegister, loading } = useAuth()
    const navigate = useNavigate()

    if (loading) {
        return <main><h1>Loading...</h1></main>
    }

    async function handleSubmit(e) {
        e.preventDefault()
        setError("")

        try {
            await handleRegister(username, email, password)
            navigate("/")
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed. Please try again.")
        }
    }

    return (
        <AuthCard
            title="Create your Moodify account"
            footerText="Already have an account?"
            footerLinkText="Login"
            footerLinkTo="/login"
        >
            <form onSubmit={handleSubmit} className="auth-form">
                <label>
                    Username
                    <input
                        type="text"
                        name='username'
                        value={username}
                        onChange={(e) => { setUsername(e.target.value) }}
                        placeholder='Enter username'
                        autoComplete='username'
                    />
                </label>
                <label>
                    Email
                    <input
                        type="email"
                        name='email'
                        value={email}
                        onChange={(e) => { setEmail(e.target.value) }}
                        placeholder='Enter email'
                        autoComplete='email'
                    />
                </label>
                <label>
                    Password
                    <input
                        type="password"
                        name='password'
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }}
                        placeholder='Enter password'
                        autoComplete='new-password'
                    />
                </label>
                {error && <p role="alert">{error}</p>}
                <button className='button primary-button' type='submit'>Register</button>
            </form>
        </AuthCard>
    )
}

export default Register