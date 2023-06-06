import React, { useContext, useState } from "react";
import { AuthContext } from "../service/auth-context.service";
import { useNavigate } from "react-router-dom";
import './forgot-password-pages.scss';

const ForgotPasswordPage = () => {
    const { email_cred, setPasswordCred } = useContext(AuthContext);
    const [errorMessage, setErrorMessage] = useState("");
    let navigate = useNavigate();

    const [errors, setErrors] = useState({
        email_blank: false,
        password_blank: false,
        invalid_email: false,
        password_check: false
    });

    const [formdata, setFormData] = useState({
        email: '',
        password: '',
    });

    function navigateToPasswordChangeSuccessPage() {
        navigate('/passwordChanged');
    }

    function checkStrongPassword(password) {
        const minLengthRegex = /.{8,}/;
        const uppercaseRegex = /[A-Z]/;
        const lowercaseRegex = /[a-z]/;
        const digitRegex = /\d/;
        const specialCharRegex = /[!@#$%^&*]/;

        const hasMinLength = minLengthRegex.test(password);

        if (!hasMinLength) {
            setErrorMessage("Password must contain atleast 8 charecters");
            return false;
        }

        const hasUppercase = uppercaseRegex.test(password);

        if (!hasUppercase) {
            setErrorMessage("Password must contain one uppercase letter");
            return false;
        }

        const hasLowercase = lowercaseRegex.test(password);

        if (!hasLowercase) {
            setErrorMessage("Password must contain one lowercase letter");
            return false;
        }

        const hasDigit = digitRegex.test(password);

        if (!hasDigit) {
            setErrorMessage("Password must contain a number");
            return false;
        }

        const hasSpecialChar = specialCharRegex.test(password);

        if (!hasSpecialChar) {
            setErrorMessage("Password must contain a special character");
            return false;
        }

        return true;
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

        let valid = email === email_cred;

        setErrors((prevData) => ({
            ...prevData,
            invalid_email: !valid
        }));

        if (!valid) return;

        let strong_password = checkStrongPassword(password);

        setErrors((prevData) => ({
            ...prevData,
            password_check: !strong_password
        }));

        if (!strong_password) return;

        setPasswordCred(password);
        navigateToPasswordChangeSuccessPage();
    }


    const handleChange = event => {
        const { name, value } = event.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    }

    return (<div className="forgot-password-page">
        <div className="forgot-page-div">
            <div className="forgot-password-header-div">Forgot Password</div>
            <form onSubmit={handleSubmit}>
                <label>Email</label>
                <div>
                    <input name="email" placeholder="Email" type="email" value={formdata.email} onChange={handleChange} />
                </div>
                {errors.email_blank ? <div className="error-div">Email cannot be blank</div> : <div></div>}
                {errors.invalid_email ? <div className="error-div">Email id doesn't match</div> : <div></div>}
                <label>Password</label>
                <div>
                    <input placeholder="Password" type="password" name="password" value={formdata.password} onChange={handleChange} />
                </div>
                {errors.password_blank ? <div className="error-div">Password cannot be blank</div> : <div></div>}
                {errors.password_check ? <div className="error-div">{errorMessage}</div> : <div></div>}
                <button type="submit">Change</button>
            </form>
        </div>
    </div>)
}

export default ForgotPasswordPage;