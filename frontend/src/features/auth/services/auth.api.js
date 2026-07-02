import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api/auth',
    withCredentials: true
})


export async function login(identifier, password) {
    try {
        const res = await api.post('/login', {
            identifier,
            password
        })
        console.log(res);

        return res.data
    } catch (err) {
        throw err
    }
}


export async function register(username, email, password) {
    try {
        const res = await api.post('/register', {
            username,
            email,
            password
        })
        return res.data
    } catch (err) {
        throw err
    }
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