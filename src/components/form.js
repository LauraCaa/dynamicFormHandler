import { useState, useEffect } from 'react';

// se mantiene una clara separación entre la lógica de validación y la definición de los datos estáticos.
const months = [...Array(12).keys()].map((month) => new Date(0, month).toLocaleString('en', {month: 'long'}));
const days = [...Array(31).keys()];
const years = [...Array(125).keys()].map((year)=> 1900 + year);

export default function Form({isOpen, toggleIsOpen}) {
    const [errorMessage, setErrorMessage] = useState('');
    const [userModel, setUserModel] = useState({});
    
    function toggleInput(id){
        let eyeOffIcon = (`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-slash" viewBox="0 0 16 16">
                        <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z"/>
                        <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829"/>
                        <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z"/>
                    </svg>`);
        let eyeOnIcon = (`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16">
                        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
                        <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
                    </svg>`);
        const input = document.getElementById(id);
        const icon = document.getElementById(id + "-icon");

        input.type === "password" ? input.type = "text" : input.type = "password";
        input.type === "password" ? icon.innerHTML = eyeOffIcon : icon.innerHTML = eyeOnIcon;
    };

    useEffect(() => {
        if(userModel?.password){
            //limpia los mensajes antes de seguir a la otra validacion
            setErrorMessage('');
            if (userModel.password.length < 6) {
                setErrorMessage('Password must be at least 6 characters long');
            } else if (!/[A-Z]/.test(userModel.password)) {
                setErrorMessage('Password must contain at least one uppercase letter');
            } else if (!/[a-z]/.test(userModel.password)) {
                setErrorMessage('Password must contain at least one lowercase letter');
            } else if (!/\d/.test(userModel.password)) {
                setErrorMessage('Password must contain at least one number');
            } else if (!/[!@#$%^&*]/.test(userModel.password)) {
                setErrorMessage('Password must contain at least one special character');
            } 
        }
    },[userModel])

    useEffect(() => {
        if(userModel?.passwordConfirm){
            if (userModel.password !== userModel.passwordConfirm) {
                setErrorMessage('Passwords must be equal (Passwords do not match)');
            }else{
                setErrorMessage('');
            }
        }
    },[userModel])

    function handleSubmit(event) {
        // previene que se refresque la pagina inecesariamente
        event.preventDefault();
        setUserModel({});
        event.target.reset()
        // un segundo despues de que se limpia el el formulario se confirma y se cierra
        setTimeout(() => {
            alert('Form submitted successfully!');
            toggleIsOpen(false);
        }, 100);
    };

    return (
      <main className={`form-wrapper ${isOpen ? "display-flex": null}`} onClick={() => toggleIsOpen(!isOpen)} >
        <form className="register-form" id="registration" name="registration" onClick={(event)=> event.stopPropagation()} onSubmit={handleSubmit}>
            <span onClick={() => toggleIsOpen(!isOpen)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                </svg>
            </span>
            <h4>Registration</h4>
            <div className="form-content">
                <fieldset>
                    <label htmlFor="first-name">First name</label>
                    <input 
                        id="first-name" 
                        name="first-name" 
                        type="text" 
                        placeholder="First name" 
                        onChange={(event) => setUserModel({...userModel, firstName: event.target.value})}
                        required
                    />
                </fieldset>
                <fieldset>
                    <label htmlFor="last-name">Last name</label>
                    <input 
                        id="last-name" 
                        name="last-name" 
                        type="text" 
                        placeholder="Last name"
                        onChange={(event) => setUserModel({...userModel, lastName: event.target.value})}
                        required
                    />
                </fieldset>
                <fieldset>
                    <label htmlFor="mail">Email address</label>
                    <input 
                        id="mail" 
                        name="mail" 
                        type="email" 
                        placeholder="Email address"  
                        onChange={(event) => setUserModel({...userModel, email: event.target.value})}
                        required
                    />
                </fieldset>
                <fieldset>
                    <label htmlFor="company">Company</label>
                    <input 
                        id="company" 
                        name="company" 
                        type="text" 
                        placeholder="Company"
                        onChange={(event) => setUserModel({...userModel, company: event.target.value})}
                        required
                    />
                </fieldset>
                <fieldset className="marginb-0">
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        id="password"  
                        onChange={(event) => setUserModel({...userModel, password: event.target.value})}
                        required
                    />
                    <span id="password-icon" onClick={() => toggleInput("password")}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-slash" viewBox="0 0 16 16">
                            <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z"/>
                            <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829"/>
                            <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z"/>
                        </svg>
                    </span>
                </fieldset>
                <fieldset className="marginb-0">
                    <label htmlFor="password-confirm"> Confirm Password</label>
                    <input 
                        type="password" 
                        id="password-confirm"
                        onChange={(event) => setUserModel({...userModel, passwordConfirm: event.target.value})}
                        required
                    />
                    <span id="password-confirm-icon" onClick={() => toggleInput("password-confirm")}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-slash" viewBox="0 0 16 16">
                            <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z"/>
                            <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829"/>
                            <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z"/>
                        </svg>
                    </span>
                </fieldset>
                <legend>{errorMessage}</legend>
                
                <fieldset>
                    <label htmlFor="address">Address</label>
                    <input 
                        name="address" 
                        id="address"
                        type="text" 
                        placeholder="Address"  
                        onChange={(event) => setUserModel({...userModel, address: event.target.value})}
                        required
                    />
                </fieldset>
                <fieldset className="date-fieldset">
                    <label>Date of birth</label>
                    <div>
                        <select 
                            defaultValue="Month" 
                            onChange={(event) => setUserModel({...userModel, month: event.target.value})}
                            required  
                        >
                            <option disabled value="Month" >Month</option>
                            {months.map((month, index)=>(
                            <option key={index} value={month}>{month}</option>
                            ))}
                        </select>
                        <select 
                            defaultValue="Day" 
                            onChange={(event) => setUserModel({...userModel, day: event.target.value})}
                            required
                        >
                            <option value="Day" disabled>Day</option>
                            {days.map((day, index2)=> (
                                <option key={index2} value={day + 1}>{day + 1}</option>
                            ))}
                        </select>
                        <select 
                            defaultValue="Year" 
                            onChange={(event) => setUserModel({...userModel, year: event.target.value})}
                            required
                        >
                            <option disabled value="Year">Year</option>
                            {years.map((year, index3)=> (
                            <option key={index3} value={year}>{year}</option>
                            ))}
                        </select>
                    </div>
                </fieldset>
                <fieldset className="button-fieldset">
                    <input type="submit" value="register"/>
                </fieldset>
            </div>
        </form>
      </main>
    );
  }
  