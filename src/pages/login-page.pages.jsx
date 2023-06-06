import React, { useContext, useState } from "react";
import { AuthContext } from "../service/auth-context.service";
import { useNavigate } from "react-router-dom";
import './login-page.pages.scss';

const LoginPage = () => {
    const { email_cred, pass_cred } = useContext(AuthContext);
    let navigate = useNavigate();

    const [errors, setErrors] = useState({
        email_blank: false,
        password_blank: false,
        invalid: false
    });

    const [formdata, setFormData] = useState({
        email: '',
        password: '',
    });

    function navigateToForgotPasswordPage() {
        navigate('/forgotPassword');
    }

    const handleSubmit = event => {
        event.preventDefault();
        const { email, password } = formdata;

        setErrors((prevData) => ({
            ...prevData,
            email_blank: email === "" ? true : false,
            password_blank: password === "" ? true : false,
            invalid: false
        }));

        if (email === "" || password === "") return;

        let valid = email === email_cred && password === pass_cred;

        setErrors((prevData) => ({
            ...prevData,
            invalid: !valid
        }));

        if (!valid) return;

        alert("login is authenciated");
    }

    const handleChange = event => {
        const { name, value } = event.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    }

    return (
        <div className="login-page">
            <div className="login-page-div">
                <div className="login-header-div">Login</div>
                <form onSubmit={handleSubmit}>
                    <label>Email</label>
                    <div>
                        <input name="email" placeholder="Email" type="email" value={formdata.email} onChange={handleChange} />
                    </div>
                    {errors.email_blank ? <div className="error-div">Email cannot be blank</div> : null}
                    <label>Password</label>
                    <div>
                        <input placeholder="Password" type="password" name="password" value={formdata.password} onChange={handleChange} />
                    </div>
                    {errors.password_blank ? <div className="error-div">Password cannot be blank</div> : null}
                    {errors.invalid ? <div className="error-div">Invalid userid/password</div> : null}
                    <div className="forgot-password-div" onClick={() => { navigateToForgotPasswordPage() }}>Forgot Password</div>
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    )
}

export default LoginPage;