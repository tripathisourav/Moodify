import axios from 'axios';

const apiBaseUrl = import.meta.env.VITE_API_URL ||
    (import.meta.env.DEV ? 'https://moodify-1-ujwv.onrender.com/api' : '/api')

const api = axios.create({
    baseURL: `${apiBaseUrl}/auth`,
    withCredentials: true
})


export async function login(identifier, password) {
    const res = await api.post('/login', {
        identifier,
        password
    })
    return res.data
}


export async function register(username, email, password) {
    const res = await api.post('/register', {
        username,
        email,
        password
    })
    return res.data
}


export async function getMe() {
    try {
        const res = await api.get('/get-me')
        return res.data
    } catch (err) {
        if (err.response?.status === 401) {
            return null   // ✅ expected case (not logged in)
        }
        throw err        // other errors → real problems
    }
}


export async function logout() {
    const res = await api.post('/logout')
    return res.data
}