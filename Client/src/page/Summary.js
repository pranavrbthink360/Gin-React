import React, { useState, useEffect, useContext } from "react";
import { Link, Route, useNavigate } from "react-router-dom";
import { infoContext } from "../infoContext.js";

export default function Summary() {

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

    console.log(User);

    return (
        <React.Fragment>
            <h1>{User.username} - Information</h1>
            <h3>Personal Details</h3>
            <table>
                <thead>
                    <tr>
                        <th>Field</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>First Name</td>
                        <td>{User.fname}</td>
                    </tr>
                    <tr>
                        <td>Last Name</td>
                        <td>{User.lname}</td>
                    </tr>
                    <tr>
                        <td>Email</td>
                        <td>{User.email}</td>
                    </tr>
                    <tr>
                        <td>Phone No.</td>
                        <td>{User.phone}</td>
                    </tr>
                </tbody>
            </table>
            <h3>Government Details</h3>
            <table>
                <thead>
                    <tr>
                        <th>Field</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Aadhaar No.</td>
                        <td>{User.aadhaar}</td>
                    </tr>
                    <tr>
                        <td>PAN No.</td>
                        <td>{User.pan}</td>
                    </tr>
                </tbody>
            </table>
            <h3>Address Details</h3>
            <table>
                <thead>
                    <tr>
                        <th>Field</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Flat No.</td>
                        <td>{User.flatno}</td>
                    </tr>
                    <tr>
                        <td>Building Name</td>
                        <td>{User.bname}</td>
                    </tr>
                    <tr>
                        <td>City</td>
                        <td>{User.city}</td>
                    </tr>
                    <tr>
                        <td>State</td>
                        <td>{User.state}</td>
                    </tr>
                </tbody>
            </table>
        </React.Fragment>
    );
}
