import React, { useState, useEffect } from 'react';

export default function Form() {
    const [modelUser, setModelUser] = useState({});
    const [validationMessage, setValidationMessage] = useState({});

    useEffect(() => {
        let newValidationMessage = {};

        // Validación del nombre completo
        if (modelUser?.fullName) {
            if (!/^(\w{2,})\s+(\w{2,})\s+(\w{2,})(\s+\w+)*$/.test(modelUser.fullName)) {
                newValidationMessage.fullName = "Enter First Names and Last Names (separated by a space)";
            } else {
                newValidationMessage.fullName = '';
            };
        };

        // Validación del email
        if (modelUser?.email) {
            if (!/^\S+@\S+\.\S+$/.test(modelUser.email)) {
                newValidationMessage.email = "Enter a valid email address";
            } else {
                newValidationMessage.email = '';
            };
        };

        // Validación del nombre de usuario
        if (modelUser?.userName) {
            if (modelUser.userName.length < 4) {
                newValidationMessage.userName = "Username must be at least 4 characters long";
            } else {
                newValidationMessage.userName = '';
            };
        };

        // Validación del número de teléfono
        if (modelUser?.phoneNumber) {
            if (!/^\d{3}-\d{3}-\d{4}$/.test(modelUser.phoneNumber)) {
                newValidationMessage.phoneNumber = "Enter a valid phone number (e.g., 123-456-7890)";
            } else {
                newValidationMessage.phoneNumber = '';
            };
        };

        // Validación de la contraseña
        if (modelUser?.password) {
            if (modelUser.password.length < 6) {
                newValidationMessage.password = "Password must be at least 6 characters long";
            } else if (!/[A-Z]/.test(modelUser.password)) {
                newValidationMessage.password = "Password must contain at least one uppercase letter";
            } else if (!/\d/.test(modelUser.password)) {
                newValidationMessage.password = "Password must contain at least one number";
            } else if (!/[#@+!*&]/.test(modelUser.password)) {
                newValidationMessage.password = "Password must contain at least one special character (#@+!*&)";
            }else{
                newValidationMessage.password = '';
            }
        };

        // Confirmación de contraseña
        if (modelUser?.passwordConfirm) {
            if (modelUser.password !== modelUser.passwordConfirm) {
                newValidationMessage.password = "Passwords don't match";
            } else {
                newValidationMessage.password = '';
            };
        };

        // Al ultimo estado de de validation mesaje, le agrega los mensajes nuevos
        setValidationMessage({ ...validationMessage, ...newValidationMessage });
    }, [modelUser]);

    function handleSubmit(event) {
        event.preventDefault();
        setModelUser({});
        setValidationMessage({});
        event.target.reset();
        setTimeout(() => {
            alert('Form submitted successfully!');
        }, 100);
    }

    return (
        <form onSubmit={handleSubmit}>
            <h3>Create Account</h3>
            <fieldset>
                <label htmlFor="fullName">Fullname</label>
                <input onChange={(event) => setModelUser({ ...modelUser, fullName: event.target.value })} id="fullName" name="fullName" type="text" />
                <span>{validationMessage.fullName}</span>
            </fieldset>
            <fieldset>
                <label htmlFor="email">E-mail</label>
                <input onChange={(event) => setModelUser({ ...modelUser, email: event.target.value })} id="email" name="email" type="email" />
                <span>{validationMessage.email}</span>
            </fieldset>
            <fieldset>
                <label htmlFor="userName">Username</label>
                <input onChange={(event) => setModelUser({ ...modelUser, userName: event.target.value })} id="userName" name="userName" type="text" />
                <span>{validationMessage.userName}</span>
            </fieldset>
            <fieldset>
                <label htmlFor="phoneNumber">Phone Number</label>
                <input onChange={(event) => setModelUser({ ...modelUser, phoneNumber: event.target.value })} id="phoneNumber" name="phoneNumber" type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" />
                <span>{validationMessage.phoneNumber}</span>
            </fieldset>
            <fieldset>
                <label htmlFor="birthDate">Birth Date</label>
                <input onChange={(event) => setModelUser({ ...modelUser, birthDate: event.target.value })} id="birthDate" name="birthDate" type="date" />
            </fieldset>
            <fieldset>
                <label htmlFor="description">Little description of you:</label>
                <textarea onChange={(event) => setModelUser({ ...modelUser, description: event.target.value })} rows="2"></textarea>
                <span>{validationMessage.description}</span>
            </fieldset>
            <fieldset>
                <label htmlFor="password">Password</label>
                <input onChange={(event) => setModelUser({ ...modelUser, password: event.target.value })} id="password" name="password" type="password" />
                <span>{validationMessage.password}</span>
            </fieldset>
            <fieldset>
                <label htmlFor="passwordConfirm">Confirm password</label>
                <input onChange={(event) => setModelUser({ ...modelUser, passwordConfirm: event.target.value })} id="passwordConfirm" name="passwordConfirm" type="password" />
            </fieldset>
            <fieldset>
                <input type="submit" value="Create Account" />
            </fieldset>
        </form>
    );
}
