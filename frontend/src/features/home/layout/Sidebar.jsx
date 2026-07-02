import './sidebar.scss'
import { useSong } from '../hooks/useSongs'
import { motion } from 'framer-motion'

const Sidebar = () => {
    const { handleGetSong } = useSong()

    const menu = [
        { label: "Home", icon: "🏠", mood: null },
        { label: "Happy", icon: "😊", mood: "happy" },
        { label: "Sad", icon: "😢", mood: "sad" },
        { label: "Surprise", icon: "😲", mood: "surprised" },
    ]

    return (
        <div className="sidebar">

            <h2 className="logo">🎵 Moodify</h2>

            <nav>
                {menu.map((item, index) => (
                    <motion.div
                        key={index}
                        className="nav-item"
                        whileHover={{ scale: 1.05, x: 5 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                            if (item.mood) {
                                handleGetSong({ mood: item.mood })
                            }
                        }}
                    >
                        <span>{item.icon}</span>
                        <p>{item.label}</p>
                    </motion.div>
                ))}
            </nav>

        </div>
    )
}

export default Sidebar