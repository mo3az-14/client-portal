import { Outlet, Navigate } from "react-router-dom"
import { userStore } from "src/stores/userStore"
import { useQuery } from "@tanstack/react-query"
import { SkeletonCard } from "src/components/skeleton-card"
export const LoggedIn = () => {

    const { session, getUserSession } = userStore()
    const { isPending, isError, error } = useQuery({
        queryKey: ["getUserSession"],
        queryFn: getUserSession,
        staleTime: 1000 * 60 * 5
    })
    if (isPending) {
        return (
            <SkeletonCard />
        )
    }
    if (isError) {
        console.log(error)
    }
    return session ? <Navigate to={'/'} /> : <Outlet />
}
