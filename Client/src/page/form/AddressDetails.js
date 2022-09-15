import { useState, useContext, useEffect } from "react";
import PersonalDetails from "./PersonalDetails.js";
import { Link, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { infoContext } from "../../infoContext";
import "./AddressDetails.css";
const axios = require("axios");

export default function AddressDetails() {
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

    const flatnumber = User.hasOwnProperty("flatno") ? User["flatno"] : "";
    const bldgname = User.hasOwnProperty("bname") ? User["bname"] : "";
    const cityname = User.hasOwnProperty("city") ? User["city"] : "";
    const statename = User.hasOwnProperty("state") ? User["state"] : "";

    const [flatno, setflatno] = useState(flatnumber);
    const [bname, setbname] = useState(bldgname);
    const [city, setcity] = useState(cityname);
    const [state, setstate] = useState(statename);

    const useUpdateInfo = (inp, key) => {
        useEffect(() => {
            const userObj = {
                ...User,
            };
            userObj[key] = inp;
            setUser(userObj);
        }, [inp]);
    };

    useUpdateInfo(flatno, "flatno");
    useUpdateInfo(bname, "bname");
    useUpdateInfo(city, "city");
    useUpdateInfo(state, "state");

    const navigateToGD = () => {
        // 👇️ navigate to /contacts
        navigate("/govtDetails");
    };

    const states = [
        "Andhra Pradesh",
        "Arunachal Pradesh",
        "Assam",
        "Bihar",
        "Chhattisgarh",
        "Goa",
        "Gujarat",
        "Haryana",
        "Himachal Pradesh",
        "Jammu and Kashmir",
        "Jharkhand",
        "Karnataka",
        "Kerala",
        "Madhya Pradesh",
        "Maharashtra",
        "Manipur",
        "Meghalaya",
        "Mizoram",
        "Nagaland",
        "Odisha",
        "Punjab",
        "Rajasthan",
        "Sikkim",
        "Tamil Nadu",
        "Telangana",
        "Tripura",
        "Uttarakhand",
        "Uttar Pradesh",
        "West Bengal",
        "Andaman and Nicobar Islands",
        "Chandigarh",
        "Dadra and Nagar Haveli",
        "Daman and Diu",
        "Delhi",
        "Lakshadweep",
        "Puducherry",
    ];

    function handleSubmit(event) {
        event.preventDefault();

        const userObj = {
            ...User,
        };

        userObj["step"] = 4;
        setUser(userObj);

        var uname = User["username"]
        var flatNumber = flatno
        var buildingName = bname
        var city_cur = city
        var state_cur = state

        const body = {
            "Username": uname,
            "FlatNumber":   flatNumber,
		    "BuildingName": buildingName,
		    "City": city_cur,
		    "State": state_cur,
            

        };
        let notificationResponse = axios.post(
            `http://localhost:8080/api/v1/addAddressDetails`,
            JSON.stringify(body),
        );


        navigate("/summary");
    }

    return (
        <div className="AddressDetails">
            <form onSubmit={handleSubmit}>
                <div className="header">
                    <span>Address Details</span>
                </div>
                <div>
                    {/* <label htmlFor="flatno">Flat number :</label> */}
                    <br />
                    <input
                        id="flatno"
                        type="number"
                        placeholder="Flat No."
                        value={flatno}
                        min={0}
                        required
                        onChange={(e) => setflatno(e.target.value)}
                    />
                </div>
                <br />
                <div>
                    {/* <label htmlFor="bname">Building number :</label> */}
                    <br />
                    <input
                        placeholder="Building No."
                        id="bname"
                        type="text"
                        value={bname}
                        required
                        onChange={(e) => setbname(e.target.value)}
                    />
                </div>
                <br />
                <div>
                    {/* <label htmlFor="city">City :</label> */}
                    <br />
                    <input
                        placeholder="City"
                        id="city"
                        type="text"
                        value={city}
                        required
                        onChange={(e) => setcity(e.target.value)}
                    />
                </div>
                <br />
                <div>
                    {/* <label htmlFor="state">State :</label> */}
                    <br />
                    <input
                        style={{ marginBottom: 10 }}
                        id="state"
                        type="text"
                        placeholder="State"
                        value={state}
                        required
                        onChange={(e) => setstate(e.target.value)}
                    />
                </div>
                {/* <button type="button" id="backBtn">Back</button> */}

                {/* <Link>Back</Link> */}

                <br />

                <button style={{ padding: 10, fontSize: 15, border: 0, borderRadius: 15 }} type="button" id="backBtn" onClick={navigateToGD}>
                    Back
                </button>
                <button style={{ padding: 10, fontSize: 15, border: 0, borderRadius: 15, marginLeft: 10 }} type="submit">Submit</button>
            </form>
        </div>

    );
}
