import React, { useState } from "react";
import * as styles from "./notificationsPage.module.scss";
import * as commonStyles from "../../theme/common.module.scss";
import { notificationsApi } from "../../api/notifications";
import { toast } from "react-toastify";

interface FormData {
    title: string;
    message: string;
}

interface FormErrors {
    title?: string;
    message?: string;
}

function NotificationsPage() {
    const [formData, setFormData] = useState<FormData>({
        title: "",
        message: ""
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.title.trim()) {
            newErrors.title = "Название уведомления обязательно";
        }

        if (!formData.message.trim()) {
            newErrors.message = "Текст уведомления обязателен";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name as keyof FormErrors]) {
            setErrors(prev => ({
                ...prev,
                [name]: undefined
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        try {
            await notificationsApi.sendNotification(formData.title, formData.message);
            toast.success("Уведомление успешно отправлено", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                style: { background: "#c979be", color: "white" }
            });
            setFormData({ title: "", message: "" });
        } catch (error) {
            toast.error("Ошибка при отправке уведомления", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                style: { background: "#f0a6a6", color: "white" }
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={`${commonStyles.box} ${styles.content}`}>
            <form onSubmit={handleSubmit}>
                <h2>Отправить уведомление</h2>

                <div className={styles.formGroup}>
                    <textarea
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        placeholder="Название уведомления"
                        className={errors.title ? styles.errorInput : ""}
                    />
                    {errors.title && <span className={styles.errorText}>{errors.title}</span>}
                </div>

                <div className={styles.formGroup}>
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Текст уведомления"
                        className={errors.message ? styles.errorInput : ""}
                    />
                    {errors.message && <span className={styles.errorText}>{errors.message}</span>}
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={styles.submitButton}
                >
                    {isSubmitting ? "Отправка..." : "Отправить"}
                </button>
            </form>
        </div>
    );
}

export default NotificationsPage;