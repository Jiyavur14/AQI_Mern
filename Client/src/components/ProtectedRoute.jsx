import { Navigate } from "react-router-dom"

function ProtectedRoute({children}){

    const user = JSON.parse(localStorage.getItem("Currentuser"))

    if(!user)
        return <Navigate to="/login"/>

    return children
}

export default ProtectedRoute;