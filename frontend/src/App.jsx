import { RouterProvider } from 'react-router-dom'
import '../src/features/shared/global.scss'
import router from './app.routes.jsx'
import { AuthContextProvider } from './features/auth/auth.context.jsx'
import SongProvider from './features/home/song.context.jsx'




function App() {
  return (
    <AuthContextProvider>
      <SongProvider>
        <RouterProvider router={router} />
      </SongProvider>
    </AuthContextProvider>
  )
}

export default App