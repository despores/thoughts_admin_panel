import React from "react";
import { Routes, Route } from "react-router-dom";
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
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
            <Route element={<PrivateRoute />}>
                <Route path={ROUTES.MAIN} element={<MainPage />} />
                <Route path={ROUTES.NEW} element={<AddMeditationPage />} />
                <Route path={ROUTES.MEDITATIONS} element={<MeditationsPage />} />
                <Route path={`${ROUTES.MEDITATIONS}/:id`} element={<ViewMeditationPage />} />
                <Route path={ROUTES.ACHIEVMENTS} element={<AchievementsPage />} />
                <Route path={ROUTES.NOTIFICATIONS} element={<NotificationsPage />} />
            </Route>
        </Routes>
    );
}