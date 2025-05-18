import { Navigate, Route, Routes } from "react-router-dom"
import LoginPage from "src/pages/LoginPage"
import SignupPage from "src/pages/SignupPage"
import { HomePage } from "src/pages/HomePage"
import { Navbar } from "src/components/Navbar"
import { ProtectedRoute } from "src/components/ProtectedRoute"
import { useEffect } from "react"
import { userStore } from "src/stores/userStore"
import Upload from "src/pages/Upload"
import { LoggedIn } from "src/components/LoggedIn"
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
                <Route path='*' element={<Navigate to='/' replace />} />
            </Routes>
        </div>
    )
}

export default App
