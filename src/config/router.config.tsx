import {Suspense,  useEffect, useState} from "react";

import { Routes, Route } from "react-router-dom";
import LandingPage from "../pages/landing/landing.page";
import SocketExample from "../pages/landing/socket-eg.page";

import LoginPage from "../pages/auth/login";
import RegisterPage from "../pages/auth/register";

import HomeLayout from "../pages/layouts";
import AdminLayout from "../pages/layouts/admin";
import AdminDashboard from "../pages/dasboard/admin-dashboard.page";
// const AdminLayout = lazy(() => import("../pages/layouts/admin"))
// const AdminDashboard = lazy(() => import ("../pages/dasboard/admin-dashboard.page"))

import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css"
import PermissionConfig from "./permission.config";
import AuthContext from "../context/auth.context";
import axiosInstance from "./axios.config";
import { LoadingComponent } from "../components/common";

import { AdminBanner, AdminBannerCreate, AdminBannerEdit } from "../pages/banner";
// login
// register 
// activate 
// 

const RoutingConfig = () => {
    const [loggedInuser, setLoggedInuser] = useState();
    const [loading, setLoading] = useState(true);

    const getLoggedInUser = async() => {
        try {
            const token = localStorage.getItem("accessToken") || null
            const response: any = await axiosInstance.get(
                '/auth/me',
                {
                    headers: {
                        "Authorization": "Bearer "+token
                    }
                }
            )
            setLoggedInuser(response.result)
        } catch(exception) {
            // hanlde
        } finally{
            setLoading(false)
        }
    }
    useEffect(() => {
        const token = localStorage.getItem("accessToken") || null
        if(token) {
            getLoggedInUser()
        } else {
            setLoading(false)
        }
    }, [])
    return (<>
        {
            loading ? <>
                <LoadingComponent />
            </> : <>
            <AuthContext.Provider value={{loggedInUser: loggedInuser}}>
                <ToastContainer 
                    theme="colored"
                        
                />
                <Routes>
                    <Route path="/" element={<HomeLayout/>}>
                        <Route index element={<LandingPage />}></Route>
                        <Route path="login" element={<LoginPage />}></Route>
                        <Route path="socket" element={<SocketExample />}></Route>
                        <Route path="register" element={<RegisterPage />}></Route>

                        {/* TODO: Desgin Error Page */}
                        <Route path="*" element={<>Error Page</>}></Route>
                    </Route>
                    
                    <Route path="/admin" element={<PermissionConfig allowAccess={"admin"}>
                        <AdminLayout />
                    </PermissionConfig>}>
                        <Route index element={<Suspense fallback={<LoadingComponent/>}>
                            <AdminDashboard />
                        </Suspense>}></Route>

                        <Route path="banner" element={<Suspense fallback={<LoadingComponent/>}>
                            <AdminBanner />
                        </Suspense>}></Route>
                        <Route path="banner/create" element={<Suspense fallback={<LoadingComponent />}> 
                            <AdminBannerCreate />
                        </Suspense>} />
                        <Route path="banner/:id" element={<Suspense fallback={<LoadingComponent />}> 
                            <AdminBannerEdit />
                        </Suspense>} />
                        <Route path="*" element={<>Error Page</>}></Route>
                    </Route>
                </Routes>
            </AuthContext.Provider>
            </>
        }
    </>)
}

export default RoutingConfig;