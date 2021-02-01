import React, {useEffect} from 'react';
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
    const flag = window.location.href.indexOf("/view") === -1;

    useEffect(() => {
        if (window.location.href.indexOf("/login") === -1) {
            document.getElementById('root').className = 'withBackgroundImage'
        } else {
            document.getElementById('root').className = 'withBackgroundColor'
        }
    }, [routes])

    if (!ready) {
        return <Loader/>
    }

    return (
        <AuthContext.Provider value={{token, login, logout, userId, isAuthenticated, userRole}}>
            <Roter>
                {isAuthenticated && flag && <Header/>}
                {flag && <div style={{display: "flex", flexDirection: "row"}}>
                    {isAuthenticated && <Sidebar userRole={userRole}/>}
                    <div className="container main">
                        {routes}
                    </div>
                </div>
                }
                {!flag && routes}
            </Roter>
        </AuthContext.Provider>
    );
}

export default App;
