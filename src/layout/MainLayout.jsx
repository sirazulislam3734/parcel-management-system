import { Outlet } from "react-router-dom";


const MainLayout = () => {
    return (
        <div className="text-3xl mx-auto font-bold">
            <Outlet></Outlet>
        </div>
    );
};

export default MainLayout;