import NavBar from "../component/NavBar.tsx";
import {Outlet} from "react-router-dom";

const Layout = () => {

    return(

        <div className='h-screen'>
            <div className='fixed top-0 left-0 right-0 z-50'>
                <NavBar />
            </div>
            <main className='pt-16 h-full overflow-y-auto'>
                <Outlet />
            </main>
        </div>
    )
}



export default Layout;