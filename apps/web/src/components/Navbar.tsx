import { userStore } from "src/stores/userStore";
import { NavbarLink } from "./ui/navbarLink";
export const Navbar = () => {
    const { user, logout } = userStore()
    return (
        <div className="grid grid-cols-2 w-full ">
            <div className="flex flex-row justify-start  ">
                {user && (
                    <>
                        <NavbarLink to='/' text="Home" />
                        <NavbarLink to="/upload" text="Upload files" />
                    </>)}
            </div>
            <div className="flex flex-row justify-end">
                {!user && (<>
                    <NavbarLink to='/login' text="Login" />
                    <NavbarLink to='/signup' text="Signup" />
                </>)}
                {user && (
                    <NavbarLink to="" onClick={logout} text='Logout' />
                )}
            </div>
        </div>
    )
}


