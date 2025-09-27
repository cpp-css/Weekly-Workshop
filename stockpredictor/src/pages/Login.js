import "../styles/Login.css";
import Logo from '../assets/random-logo-removebg-preview.png';
import Navbar from "../components/Navbar";

function Login() {
    return (<>
    <Navbar />

    {/* <!-- Everything Else --> */}
    <div class="under-navbar">

        {/* <!-- Logo Side --> */}
        <div class="left-container">
            <div class="img-circle">
                <img src={Logo}/>
            </div>
        </div>

        {/* <!-- Login Side --> */}
        <div class="right-container">
            <div class="login-container">
                <h1>Login</h1>
                <div class="input-box">
                    <input id="email" type="email" placeholder="Enter Email" maxlength="50"/>
                    <i class="fa fa-envelope" ></i>
                </div>
                <div class="input-box">
                    <input id="password" type="password" placeholder="Enter Password" maxlength="50"/>
                    <i class="fa fa-eye" onclick="togglePasswordVisibility(this)"></i>
                    <i class="fa fa-eye-slash" onclick="togglePasswordVisibility(this)"></i>
                </div>
                <div id="checkbox-div">
                    <input id="rmbr-me" type="checkbox"/>
                    <label for="rmbr-me" >Remember me.</label>
                </div>
                <button id="login-btn" onclick="login()">Login</button>
                <p id="create-acc-msg">Don't have an account? Click <a href="/pages/createAcc.html">here</a> to create one.</p>
            </div>
        </div>
    </div>
    </>)
}

export default Login;