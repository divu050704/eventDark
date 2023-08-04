import React from "react";
import "../css/Login.css"
import "boxicons";
import getCookie from "../custom/getCookie";
export default function Login(props) {
    // If show password is toggled
    const [type, setType] = React.useState("password")
    // User is wants to login or sign up
    const [status, setStatus] = React.useState(true)
    // Signup submit function
    const signup = () => {
        if (props.creds.uname === "" || props.creds.passwd === "" || props.creds.cpasswd === "") {
            alert("All fields are required")
        }
        else if (props.creds.passwd !== props.creds.cpasswd) {
            alert("Passwords don't match")
        }
        else {
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json", 'X-CSRFToken': getCookie("csrftoken") },
                body: JSON.stringify({ name: props.creds.uname.trim(), passwd: (props.creds.passwd.trim()) }),
                credentials: 'include',
            };
            fetch("http://localhost:8000/signup/", requestOptions)
                .then(res => (res.status === 200 || 201 ? alert("Account Created") : alert("Username taken")))
        }
    }
    // Login function
    const login = () => {


        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json", 'X-CSRFToken': getCookie("csrftoken") },
            body: JSON.stringify({ name: props.creds.uname.trim(), passwd: (props.creds.passwd.trim()) }),
            credentials: 'include',

        };
        fetch("http://localhost:8000/login/", requestOptions)
            .then(res => res.json())
            .then(last => window.location.reload())
    }
    return (
        <div className="Login">
            <nav>
                <h1>eventDark</h1>

            </nav>
            <div className="card" style={{marginTop: "5rem"}}>
                <span>Username</span><br />
                <input type="text" className="Login--inputs" value={props.creds.uname} onChange={(event) => props.handleChange(event, "uname")} /><br /><br />
                <span>Password </span><br />
                <input type={type} className="Login--inputs" value={props.creds.passwd} onChange={(event) => props.handleChange(event, "passwd")} />
                {!status &&
                    <div>
                        <span>Confirm Password</span><br />
                        <input type={type} className="Login--inputs" value={props.creds.cpasswd} onChange={(event) => props.handleChange(event, "cpasswd")} />
                    </div>}
                <br />
                <br />
                <input type="checkbox" onChange={(event) => setType(event.target.checked ? "text" : "password")} /> <font style={{ color: "#8EBBFF" }} >Show password</font>
                <br /><br />
                {status ? <button onClick={login} >Login  </button> : <button onClick={signup} >Signup  </button>}
                {status ? <p className="login--card-option">Create an Account? <font onClick={() => setStatus(false)} >Signup</font></p> : <p className="login--card-option">Already have an Account? <font onClick={() => setStatus(true)} >Login</font></p>}
            </div>
        </div>
    )
}
