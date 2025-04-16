import {
    createBrowserRouter,
    
} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Adoption from "../Pages/adoption/adoption";
import MissingFeed from "../Pages/MissingFeed/Missingfeed";
import Accessories from "../Pages/Accessories/Accessories";
import Medical from "../Pages/Medical/Medical";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Login from "../Pages/Login/Login";
import Registration from "../Pages/Registration/Registration";





export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/adoption',
                element: <Adoption></Adoption>
            },
            {
                path: '/missingfeed',
                element: <MissingFeed></MissingFeed>
            },
            {
                path: '/accessories',
                element: <Accessories></Accessories>
            },
            {
                path: '/medical',
                element: <Medical></Medical>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Registration></Registration>
            },
            
        ]
    },
    {
        path: '/dashboard',
        element: <Dashboard></Dashboard>,
        children: [
            {
                path: 'profile',
                element: "nothing"
            }
        ]
        
    }
]);