import React, {useEffect, useState} from 'react';
import {BrowserRouter as Roter} from 'react-router-dom';

import {useRoutes} from "./routes";
import {useAuth} from "./hooks/auth.hook";
import 'materialize-css';
import {AuthContext} from "./context/AuthContext";
import {Header} from "./components/Header";
import {Loader} from "./components/Loader";
import {Sidebar} from "./components/Sidebar";

function App() {
    const {token, login, logout, userId, ready, userRole} = useAuth();
    const isAuthenticated = !!token;
    const routes = useRoutes(isAuthenticated, userRole);
    let [flag, setFlag] = useState(window.location.href.indexOf("/view") === -1)
    let [flagLogin, setFlagLogin] = useState(window.location.href.indexOf("/login") === -1)

    useEffect(() => {
        if (isAuthenticated) {
            document.getElementById('bodyId').className = 'withBackgroundImage'
        } else {
            document.getElementById('bodyId').className = 'withBackgroundColor'
        }
        flag = window.location.href.indexOf("/view") === -1;
        flagLogin = window.location.href.indexOf("/login") === -1;
    }, [routes])



    if (!ready) {
        return <Loader/>
    }

    return (
        <AuthContext.Provider value={{flagLogin, setFlagLogin, flag, setFlag, token, login, logout, userId, isAuthenticated, userRole}}>
            <Roter>
                <div style={{display: "flex", flexDirection: "row"}}>
                    {(isAuthenticated || flagLogin) && <Header/>}
                    {isAuthenticated && <Sidebar userRole={userRole}/>}
                    <div className="container">
                        {routes}
                    </div>
                </div>
            </Roter>
        </AuthContext.Provider>
    );
}

export default App;
