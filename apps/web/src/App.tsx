import { Route, Routes } from "react-router-dom"
import LoginPage from "src/pages/LoginPage.tsx"
import SignupPage from "src/pages/SignupPage.tsx"
import { HomePage } from "src/pages/HomePage.tsx"
import { Navbar } from "src/components/Navbar.tsx"
import { ProtectedRoute } from "src/components/ProtectedRoute.tsx"
import { useEffect } from "react"
import { userStore } from "src/stores/userStore.tsx"
import Upload from "src/pages/Upload.tsx"
import { LoggedIn } from "src/components/LoggedIn.tsx"
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
