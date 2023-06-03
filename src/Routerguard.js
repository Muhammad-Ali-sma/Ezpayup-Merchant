import React, { useEffect } from 'react'
import AuthLayout from 'layouts/Auth.js'
import { useSelector } from 'react-redux';
import AdminLayout from 'layouts/Admin.js';
import { ToastContainer } from "react-toastify";
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom'
import Profile from 'Pages/Profile';
import CourseSchedule from 'Pages/CourseSchedule';
import Students from 'Pages/Students'
import Report from 'Pages/Report'
import BroadCast from 'Pages/BroadCast'
import Login from 'Pages/Login';
import Register from 'Pages/Register';
import Footer from 'components/Footer';


const Routerguard = () => {
    const token = useSelector(state => state.authUser.token);
    const publicPaths = ['/login', '/register'];
    const openPaths = ['/privacy-policy', '/terms-and-conditions'];

    useEffect(() => {
        if (!token && !publicPaths.includes(window.location.pathname) && !openPaths.includes(window.location.pathname)) {
            window.location.pathname = '/login';
        }
        if (token && (publicPaths.includes(window.location.pathname) || window.location.pathname === '/')) {
            window.location.pathname = '/merchant-profile';
        }
    }, [window.location])


    return (
        <Router>
            <ToastContainer />
            <Switch>
                {token ?
                    <AdminLayout>
                        <Route path="/merchant-profile" render={() => <Profile />} />
                        <Route path="/course-schedules" render={() => <CourseSchedule />} />
                        <Route path="/students" render={() => <Students />} />
                        <Route path="/broadcast" render={() => <BroadCast />} />
                        <Route path="/report" render={() => <Report />} />
                    </AdminLayout>
                    :
                    <AuthLayout>
                        <Route path="/login" render={() => <Login />} />
                        <Route path="/register" render={() => <Register />} />
                        <Footer containerStyle={{ position: 'absolute' }} />
                    </AuthLayout>
                }
            </Switch>
        </Router>
    )
}

export default Routerguard