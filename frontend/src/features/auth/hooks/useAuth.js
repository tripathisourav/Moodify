import { useContext, useEffect } from 'react'
import { AuthContext } from '../auth.context.js'
import { login, register, getMe, logout } from '../services/auth.api'


export const useAuth = () => {
    const context = useContext(AuthContext)

    const { user, setUser, loading, setLoading } = context

    const handleLogin = async (identifier, password) => {
        setLoading(true)

        try {
            const res = await login(identifier, password)
            setUser(res.user)
            return res
        }
        catch (err) {
            setUser(null)
            throw err
        }
        finally {
            setLoading(false)
        }
    }

    const handleRegister = async (username, email, password) => {
        setLoading(true)

        try {
            const res = await register(username, email, password)
            setUser(res.user)
            return res
        }
        finally {
            setLoading(false)
        }
    }

    const handleGetMe = async () => {
        setLoading(true)

        try {
            const res = await getMe()

            if (res) {
                setUser(res.user)
            } else {
                setUser(null)
            } 
            
        } catch {
            setUser(null)
        } finally {
            setLoading(false)
        }
    }

    const handleLogout = async () => {
        setLoading(true)

        await logout()
        setUser(null)

        setLoading(false)
    }

    useEffect(() => {
        let active = true
        setLoading(true)

        getMe()
            .then(res => {
                if (active) setUser(res?.user ?? null)
            })
            .catch(() => {
                if (active) setUser(null)
            })
            .finally(() => {
                if (active) setLoading(false)
            })

        return () => {
            active = false
        }
    }, [setLoading, setUser])


    return { user, setUser, loading, setLoading, handleLogin, handleRegister, handleGetMe, handleLogout }
}