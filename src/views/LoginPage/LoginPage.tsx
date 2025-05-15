import * as styles from "./login.module.scss";
import * as commonStyles from "../../theme/common.module.scss";
import React, { useState } from "react";
import Logo from "../../components/Logo/logo";
import { NavLink, useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/constants";
import { authStore } from "../../core/store";
import { observer } from "mobx-react-lite";

const LoginPage: React.FC = observer(() => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            await authStore.login(email, password);
            navigate(ROUTES.MAIN);
        } catch (err) {
            setError("Некорректная почта или пароль");
        }
    };

    return (
        <>
            <nav className={styles.logo}>
                <NavLink to={ROUTES.LOGIN}>
                    <Logo />
                </NavLink>
            </nav>
            <div className={[commonStyles.box, styles.content].join(" ")}>
                <p>Вход</p>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Почта"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        aria-label="Email"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        aria-label="Password"
                        required
                    />
                    <button
                        type="submit"
                        disabled={authStore.isAuthInProgress}
                    >
                        {authStore.isAuthInProgress ? "Вход в систему..." : "Вход"}
                    </button>
                </form>
                {error && <div className={styles.error}>{error}</div>}
            </div>
        </>
    );
});

export default LoginPage;