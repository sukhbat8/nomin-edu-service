import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import AdminLogin from "../Component/AdminPanel/AdminLogin";
import Home from "../Component/Home";
import Login from "../Component/Login";
import Register from "../Component/Register";
import AdminSign from "../Component/AdminPanel/AdminSign";

const AppRouter = () => {

    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route
                path="/"
                element={
                    <Login />
                }
            ></Route>
            <Route
                path="/signUp"
                element={
                    <Register />
                }
            ></Route>
            <Route
                path="/home"
                element={
                    <Home />
                }
            ></Route>
            <Route
                path="/admin"
                element={
                    <AdminLogin />
                }>
            </Route>
            <Route
                path="/admin/login"
                element={
                    <AdminLogin />
                }>
            </Route>
            <Route
                path="/admin/signin"
                element={
                    <AdminSign />
                }>
            </Route>
        </Routes>
    );
};

export default AppRouter;
