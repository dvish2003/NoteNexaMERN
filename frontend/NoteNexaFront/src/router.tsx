import {createBrowserRouter} from "react-router-dom";
import Layout from "./pages/Layout.tsx";
import HeroSection from "./pages/HeroSection.tsx";
import LoginForm from "./component/LoginForm.tsx";

export const router = createBrowserRouter([

    {
        path: "/",
        element: <Layout />,
        children: [
            {path: "/", element: <HeroSection/>},
            {path: "/login", element: <LoginForm/>},
            /*{path: "/signup", element: <RegisterPage/>},
            {path: "/task", element: <TaskPage/>},
            {path: "/Home", element: <Home/>},*/
        ]



    }
])