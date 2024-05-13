import { useContext } from "react";
import { UserContext } from "../../../backend/context/userContext";

export default function Dashboard() {
    const {user} = UserContext(UserContext)
  return (
    <div>
        <h1>Dashboard</h1>
        <>
        {!!user && (<h1>HI{user.name}!</h1>)}
        </>
    </div>
  )
}
