import axios from 'axios'

const apiBaseUrl = import.meta.env.VITE_API_URL ||
    (import.meta.env.DEV ? 'http://localhost:3000/api' : '/api')

const api = axios.create({
    baseURL: `${apiBaseUrl}/songs`,
    withCredentials: true
})

export async function getSong({ mood }) {
    const res = await api.get(`/?mood=${mood}`) 
    return res.data
}

export async function uploadSong(formData) {
    const res = await api.post('/', formData)
    return res.data
}

export async function toggleLikeSong(id) {
    const res = await api.patch(`/${id}/like`)
    return res.data
}

export async function getLikedSongs() {
    const res = await api.get('/liked')
    return res.data
}

export async function deleteSong(id) {
    const res = await api.delete(`/${id}`)
    return res.data
}