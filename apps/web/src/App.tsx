import { Route, Routes } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import { HomePage } from "./pages/HomePage"
import { Navbar } from "./components/Navbar"
import { ProtectedRoute } from "./components/ProtectedRoute"
import { useEffect } from "react"
import { userStore } from "./stores/userStore"
import Upload from "pages/Upload"
import { LoggedIn } from "./components/LoggedIn"
let is_intial = true
function App() {
    const { getUserSession } = userStore()
    useEffect(() => {
        console.log('regetting session in app')
        if (is_intial) {
            getUserSession()
            is_intial = false
        }
    }, [getUserSession])
    return (
        <div className="bg-slate-950 text-white">
            <Navbar />
            <Routes>
                <Route element={<ProtectedRoute />} >
                    <Route path='/' element={< HomePage />} />
                    <Route path='/upload' element={<Upload />} />
                </Route>
                <Route element={< LoggedIn />}>
                    <Route path='/login' element={<LoginPage />} />
                    <Route path='/signup' element={< SignupPage />} />
                </Route>

            </Routes>
        </div>
    )
}

export default App
