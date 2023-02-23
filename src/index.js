import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';


// import components
import Header from './components/Header';

// import pages
import Home from './pages/Home'

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <>
                <Header/>
                <Outlet/>
            </>
        ),
        errorElement: <p>Page Not Found</p>,
        children: [
            {
            path: "/",
            element: <Home/>,
            }
        ],
    },
]);



const root =
ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RouterProvider router={router} />
);