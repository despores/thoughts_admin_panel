import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../views/LoginPage/LoginPage";
import { ROUTES } from "./constants";
import MainPage from "../views/MainPage/MainPage";
import AddMeditationPage from "../views/AddMeditationPage/AddMeditationPage";
import MeditationsPage from "../views/MeditationsPage/MeditationsPage";
import ViewMeditationPage from "../views/ViewMeditationPage/ViewMeditationPage";
import AchievementsPage from "../views/AchievementsPage/AchievementsPage";
import NotificationsPage from "../views/NotificationsPage/NotificationsPage";
import PrivateRoute from "./PrivateRoute";

export default function AppRoutes() {
    return (
        <Routes>
            {/* Public Routes */}
            <Route path={ROUTES.LOGIN} element={<LoginPage />} />

            {/* Protected Routes */}
            <Route element={<PrivateRoute />}>
                <Route path="/" element={<Navigate to={ROUTES.MAIN} replace />} />
                <Route path={ROUTES.MAIN} element={<MainPage />} />
                <Route path={ROUTES.NEW} element={<AddMeditationPage />} />
                <Route path={ROUTES.MEDITATIONS} element={<MeditationsPage />} />
                <Route path={`${ROUTES.MEDITATIONS}/:id`} element={<ViewMeditationPage />} />
                <Route path={ROUTES.ACHIEVMENTS} element={<AchievementsPage />} />
                <Route path={ROUTES.NOTIFICATIONS} element={<NotificationsPage />} />
            </Route>

            {/* Catch all route - redirect to main if authenticated, login if not */}
            <Route path="*" element={<Navigate to={ROUTES.LOGIN} replace />} />
        </Routes>
    );
}