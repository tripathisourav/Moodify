import { createBrowserRouter } from "react-router";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import Home from "./features/home/pages/Home";
import Protected from "./features/auth/components/Protected";
import Moodify from "./features/home/pages/Moodify";


const router = createBrowserRouter([
    {
        path: "/",
        element: (
            // <Moodify/>
            // <Protected>
            //     <Home />
            // </Protected>
            <Home/>
        )
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    }
]);

export default router