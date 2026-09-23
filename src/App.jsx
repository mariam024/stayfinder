import { createBrowserRouter, RouterProvider } from "react-router"
import Home from "./Pages/Home/Home"
import Explore from "./Pages/Explore/Explore"
import Contact from "./Pages/Contact/Contact"
import Login from "./Pages/Login/Login"
import Signup from "./Pages/Signup/Signup"
import Favorites from "./Pages/Favorites/Favorites"
import { Toaster } from 'react-hot-toast'

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/explore", element: <Explore /> },
  { path: "/favorites", element: <Favorites /> },
  { path: "/contact", element: <Contact /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
])

function App() {
  return <>
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 3000,
        style: {
          borderRadius: '10px',
          background: '#fff',
          color: '#1a1a1a',
          fontSize: '14px',
        },
        success: {
          iconTheme: { primary: '#16a34a', secondary: '#fff' },
        },
        error: {
          iconTheme: { primary: '#dc2626', secondary: '#fff' },
        },
      }}
    />
    <RouterProvider router={router} />
  </>
}

export default App
