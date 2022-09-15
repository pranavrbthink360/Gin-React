import logo from './logo.svg';
import './App.css';
import Login from './page/login';
import React, {useState} from 'react';
import GovtDetails from './page/form/GovtDetails';
import AllRoutes from './AllRoutes';
import ReactDOM from 'react-dom';
import AddressDetails from './page/form/AddressDetails';
import PersonalDetails from './page/form/PersonalDetails';
// import Login from './page/login';
import { Link,Route } from "react-router-dom";
import {BrowserRouter as Router, Routes} from 'react-router-dom';
import { infoContext } from './infoContext';
import Summary from './page/Summary';
import Header from "./Header";

function App() {
    const [User, setUser] = useState({});
    return (
        <infoContext.Provider value={[User, setUser]}>
            <Router>
                <Header></Header>
                <div className="App">
                    <Routes>
                        <Route exact path="/" element={<Login />}></Route>
                        <Route exact path="/login" element={<Login />}></Route>
                        {/* <Route exact path="/header" element={<Header />}</Route> */}
                        <Route
                            exact
                            path="/personalDetails"
                            element={<PersonalDetails />}
                        ></Route>
                        <Route
                            exact
                            path="/govtDetails"
                            element={<GovtDetails />}
                        ></Route>
                        <Route
                            exact
                            path="/addressDetails"
                            element={<AddressDetails />}
                        ></Route>
                        <Route
                            exact
                            path="/summary"
                            element={<Summary />}
                        ></Route>
                    </Routes>
                </div>
            </Router>
        </infoContext.Provider>
    );
}

// ReactDOM.render(<AllRoutes/>, document.getElementById('root'));

export default App;