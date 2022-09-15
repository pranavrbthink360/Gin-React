import { useState, useContext, useEffect } from "react";
// import { UserContext } from "../App";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { infoContext } from "../infoContext";
import "./login.css"

export default function Login() {
    const [User, setUser] = useContext(infoContext);

    var navigate = useNavigate();

    const navigateToPD = () => {
        navigate("/personalDetails");
    };

    const navigateToGD = () => {
        navigate("/govtDetails");
    };

    const navigateToAD = () => {
        navigate("/addressDetails");
    };

    const navigateToSummary = () => {
        navigate("/summary");
    };

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const UpdateInfo = (inp, key) => {
        useEffect(() => {
            const userObj = {
                ...User,
            };
            userObj[key] = inp;
            setUser(userObj);
        }, [inp]);
    };

    function callPath(path) {
        console.log("Navigating");
        navigate(path);
    }

    // const navigateToPD = () => {
    //     // 👇️ navigate to /contacts
    //     navigate('/personalDetails');
    // };

    // <Route path="/personalDetails" exact element={<PersonalDetails/>}/>

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("username:", username);
        console.log("password:", password);

        var path = "";

        const userObj = {
            ...User,
        };
        userObj["username"] = username;
        userObj["password"] = password;
        userObj["loggedIn"] = true;

        setUser(userObj);

        if (User.username == null) {
            userObj["step"] = 1;

            setUser(userObj);
            // document.getElementById("loginBtn").innerHTML = "LOGOUT";

            console.log(User);

            // localStorage.setItem("loggedIn", true);

            // UpdateInfo(username, "username");
            // UpdateInfo(password, "password");

            // console.log("OITTTTTTTTTTT");

            navigate("/personalDetails");
        }

        if (User.username != null) {
            // let path = "";
            console.log("Step number", typeof 1);
            if (User.step === 1) {
                console.log("INNNNNN");
                // window.location.href = "/personalDetails";
                // path = "/personalDetails";
                navigateToPD();
                // navigate("/personalDetails");
            } else if (User.step === 2) {
                console.log("IOPPPPOPPPOPO");
                // path = "/govtDetails";
                navigateToGD();
                // window.location.href = "/govtDetails";
                // navigate("/govtDetails");
            } else if (User.step === 3) {
                // path = "/addressDetails";
                navigateToAD();
                // navigate("/addressDetails");
                // window.location.href = "/addressDetails";
            } else {
                // window.location.href = "/summary";
                // path = "/summary";
                navigateToSummary();
                // navigate("/summary");
            }
            // navigate("/addressDetails");
        }

        console.log(path);

        if (path !== "") {
            console.log("INSIDE THIS");
            callPath(path);
        }

        // event.preventDefault();
    };

    return (
        <div className="login-page">
            <form onSubmit={handleSubmit}>
                <div>
                    {/* <label htmlFor="username">Username</label> */}
                    <input
                        className="input-label"
                        id="username"
                        type="text"
                        placeholder="Username"
                        value={username}
                        required
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    {/* <label htmlFor="password">Password</label> */}
                    <input
                        className="input-label"
                        id="password"
                        type="password"
                        placeholder="Password"
                        value={password}
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <br/>
                <button style={{padding:10, fontSize:15, border:0,borderRadius:15}} type="submit">Submit</button>
            </form>
        </div>

    );
}
