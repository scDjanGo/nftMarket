import { Outlet } from "react-router-dom";
import Header from './../header-front/header';
import Footer from "../footer/footer";

function Layout() {
    
   
    return (
        <>
            <Header/>
            <Outlet/>
            <Footer />
        </>
    );
}

export { Layout }