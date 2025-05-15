import React, { useState } from "react";
import * as styles from "./addAchievementForm.module.scss";
import { achievementsApi } from "../../api/achievements";
import { toast } from "react-toastify";

interface FormData {
    title: string;
    description: string;
}

interface FormErrors {
    title?: string;
    description?: string;
}

interface AddAchievementFormProps {
    onClose: () => void;
    onSuccess: () => void;
}

const AddAchievementForm: React.FC<AddAchievementFormProps> = ({ onClose, onSuccess }) => {
    const [formData, setFormData] = useState<FormData>({
        title: "",
        description: ""
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.title.trim()) {
            newErrors.title = "Название достижения обязательно";
        }

        if (!formData.description.trim()) {
            newErrors.description = "Описание достижения обязательно";
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
        setErrors(prev => ({
            ...prev,
            [name]: ""
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        try {
            await achievementsApi.addAchievement(formData);
            toast.success("Достижение успешно добавлено!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            onSuccess();
            onClose();
        } catch (error) {
            console.error("Failed to add achievement:", error);
            toast.error("Не удалось добавить достижение. Пожалуйста, попробуйте еще раз.", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <h2>Добавить достижение</h2>

            <div className={styles.formGroup}>
                <textarea
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Название достижения"
                    className={errors.title ? styles.errorInput : ""}
                />
                {errors.title && <span className={styles.errorText}>{errors.title}</span>}
            </div>

            <div className={styles.formGroup}>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Описание достижения"
                    className={errors.description ? styles.errorInput : ""}
                />
                {errors.description && <span className={styles.errorText}>{errors.description}</span>}
            </div>

            <div className={styles.buttons}>
                <button
                    type="button"
                    onClick={onClose}
                    className={styles.cancelButton}
                    disabled={isSubmitting}
                >
                    Отмена
                </button>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={styles.submitButton}
                >
                    {isSubmitting ? "Добавление..." : "Добавить"}
                </button>
            </div>
        </form>
    );
};

export default AddAchievementForm; 