import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import PersonalDetails from './page/form/PersonalDetails';
import GovtDetails from './page/form/GovtDetails';
import AddressDetails from './page/form/AddressDetails';

export default function AllRoutes(){

    return (
        <React.StrictMode>
            <Router>
                <Routes>
                    <Route path="/" element={<AddressDetails/>}/>
                    <Route path="/personalDetails" element={<PersonalDetails/>}/>
                    <Route path="/governmentDetails" element={<GovtDetails/>}/>
                    <Route path="/addressDetails" element={<AddressDetails/>}/>
                </Routes>
            </Router>
        </React.StrictMode>
    )
}