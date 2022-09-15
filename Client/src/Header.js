import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

// importing material UI components
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import { infoContext } from "./infoContext";
import Login from "./page/login";

export default function Header() {
    var loginText = "";

    const navigate = useNavigate();

    const [buttonText, setButtonText] = useState();

    const [User, setUser] = useContext(infoContext);

    // useEffect(() => {
    //     if (document)
    // })

    // useEffect(() => {
    //     console.log("Passed");
    //     if (User.loggedIn) {
    //         setButtonText("Logout");
    //     }
    //     if (User.loggedIn == null || User.loggedIn == false) {
    //         setButtonText("Login");
    //     }
    //     // setButtonText("Lo")
    // }, [buttonText]);

    function textChange(event) {
        var bText = "";
        if (User.loggedIn) {
            console.log("Button Press");
            // document.getElementById("loginBtn").innerHTML = "LOGIN";

            User.loggedIn = false;
            // setUser(userObj);
            document.getElementById("usernameVal").innerHTML = "";
            // bText = "Login";
            // document.getElementById("loginBtn").innerHTML = "Login";
            // setButtonText("Logout");
            console.log(User);
            navigate("/");
        } else {
            // setButtonText("Login");
            // document.getElementById("loginBtn").innerHTML = "LOGIN";
            // bText = "Logout";
            // setButtonText("Logout");
            User.loggedIn = true;
            // setUser(userObj);
            // document.getElementById("loginBtn").innerHTML = "Logout";
            navigate("/");
        }
        // setButtonText(bText);
    }

    console.log(User);

    return (
        <AppBar position="static" id="Header">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Info Tracker
                </Typography>
                {User.loggedIn ? (
                    <Typography
                        variant="h6"
                        fontSize={18}
                        component="div"
                        sx={{ flexGrow: 1 }}
                        id="usernameVal"
                    >
                        Hello, {User.username} !
                    </Typography>
                ) : (
                    ""
                )}
                {User.loggedIn ? (
                    <Button color="inherit" id="loginBtn" onClick={textChange}>
                        {/* {User.loggedIn ? "Logout" : "Login"} */}
                        LOGOUT
                    </Button>
                ) : null}
            </Toolbar>
        </AppBar>
    );
}
