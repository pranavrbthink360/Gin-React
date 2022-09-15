import { useState, useEffect, useContext } from "react";
import PersonalDetails from './PersonalDetails.js';
import { Link, Route, useNavigate } from "react-router-dom";
import { infoContext } from "../../infoContext";
import "./GovtDetails.css"
import { Bluetooth } from "@mui/icons-material";
const axios = require("axios");

export default function GovtDetails() {

    const navigate = useNavigate();

    useEffect(() => {
        if (User.loggedIn != null) {
            let loginVal = User.loggedIn;
            if (loginVal == false) {
                navigate("/");
            }
        } else {
            navigate("/");
        }
    }, []);

    const [User, setUser] = useContext(infoContext);

    const aadhaarno = User.hasOwnProperty("aadhaar") ? User["aadhaar"] : "";
    const panno = User.hasOwnProperty("pan") ? User["pan"] : "";
    const username = User.hasOwnProperty("username");

    const [aadhaar, setaadhaar] = useState(aadhaarno);
    const [pan, setpan] = useState(panno);

    const useUpdateInfo = (inp, key) => {
        useEffect(() => {
            const userObj = {
                ...User,
            };
            userObj[key] = inp;
            setUser(userObj);
        }, [inp]);
    };

    useUpdateInfo(aadhaar, "aadhaar");
    useUpdateInfo(pan, "pan");

    const navigateToPD = () => {
        // 👇️ navigate to /contacts
        navigate("/personalDetails");
    };

    function handleSubmit(event) {
        event.preventDefault();

        const userObj = {
            ...User,
        };

        userObj["step"] = 3;
        setUser(userObj);

        //   console.log('fname', fname);
        //   console.log('lname', lname);

        var uname = User["username"]
        var aadharnumber = aadhaar
        var pannumber_ = pan

        const body = {
            "Username": uname,
            "AadharNumber": aadharnumber,
            "PanNumber" : pannumber_

        };
        let notificationResponse = axios.post(
            `http://localhost:8080/api/v1/addGovtIdDetails`,
            JSON.stringify(body),
        );

        navigate("/addressDetails");

    }

    function handleBack(event) {
        event.preventDefault();
        PersonalDetails();
    }


    return (
        <div className="Govtdetails">
            <form onSubmit={handleSubmit}>
                <div className="header">
                    <span> ID Details </span>
                </div>
                <div>
                    {/* <label htmlFor="aadhaar">Aadhaar Number :</label> */}
                    <br />
                    <input
                        id="aadhaar"
                        type="text"
                        placeholder="Aadhar Number"
                        value={aadhaar}
                        required
                        minLength={12}
                        maxLength={12}
                        pattern="\d*"
                        onChange={(e) => setaadhaar(e.target.value)}
                    />
                </div>
                <br />
                <div>
                    {/* <label htmlFor="pan">PAN Number :</label> */}
                    <br />
                    <input
                        style={{ marginBottom: 20 }}
                        id="pan"
                        type="text"
                        placeholder="PAN Number"
                        value={pan}
                        minLength={10}
                        maxLength={10}
                        pattern="\d*"
                        required
                        onChange={(e) => setpan(e.target.value)}
                    />
                </div>

                {/* <Link to="/personalDetails">Back</Link> */}
                <br />
                <button style={{ padding: 10, fontSize: 15, border: 0, borderRadius: 15 }} type="button" id="backBtn" onClick={navigateToPD}>
                    Back
                </button>
                {/* <button style={{ }} id= "submitbtn" type="submit">Submit</button> */}
                <button style={{ padding: 10, fontSize: 15, border: 0, borderRadius: 15, marginLeft: 10 }} type="submit">Submit</button>
            </form>
        </div>

    );
}