import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/homepage";

export const router=createBrowserRouter([
    {
        path:'/',
        element:<Home/>

    }
])