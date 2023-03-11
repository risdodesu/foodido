import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// import components
import Header from './components/Header';
import Footer from './components/Footer';

// import pages
import Home from './pages/Home'
import Recipes from './pages/Recipes';
import Login from './pages/Login';
import Register from './pages/Register';
import Detail from './pages/Recipes/Detail';
import Dashboard from './pages/Admin/Dashboard';
import Users from './pages/Admin/Users';
import Favourites from './pages/Favourites';
import AddFood from './pages/AddFood';


const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <>
                <Header/>
                <Outlet/>
                <Footer/>
            </>
        ),
        errorElement: <p>Page Not Found</p>,
        children: [
            {
            path: "/",
            element: <Home/>,
            },
            {
            path: "/recipes",
            element: <Recipes/>,
            },
            {
            path: "/detail/:foodId",
            element: <Detail/>
            },
            {
            path: "/dashboard",
            element: <Dashboard/>
            },
            {
            path: "/users",
            element: <Users/>
            },
            {
            path: "/favourite",
            element: <Favourites/>
            },
            {
            path: "/add-food",
            element: <AddFood/>
            }
        ],
    },
    {
        path: "/login",
        element: <Login/>
    },
    {
        path: "/register",
        element: <Register/>
    }
]);



const root =
ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RouterProvider router={router} />
);