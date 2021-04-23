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
    let [flag, setFlag] = useState({
        isView: window.location.href.indexOf("/view") !== -1,
        isLogin: window.location.href.indexOf("/login") !== -1
    })
    const routes = useRoutes(isAuthenticated, userRole, flag, setFlag);

    useEffect(() => {
        if (isAuthenticated) {
            document.getElementById('bodyId').className = 'withBackgroundImage'
        } else {
            document.getElementById('bodyId').className = 'withBackgroundColor'
        }
    }, [routes])


    if (!ready) {
        return <Loader/>
    }
    console.log(window.location.href)
    return (
        <AuthContext.Provider
            value={{token, login, logout, userId, isAuthenticated, userRole}}>
            <Roter>
                <div style={{display: "flex", flexDirection: "row"}}>
                    {window.location.href.indexOf("/view") !== -1 && <Header
                        flag={flag}
                        setFlag={setFlag}
                        isAuthenticated={isAuthenticated}
                    />}
                    {isAuthenticated && <>
                        <Header
                            flag={flag}
                            setFlag={setFlag}
                            isAuthenticated={isAuthenticated}
                        />
                        <Sidebar
                        userRole={userRole}
                        flag={flag}
                        setFlag={setFlag}
                    />
                    </>}
                    <div id='routerDiv' className="container">
                        {routes}
                    </div>
                </div>
            </Roter>
        </AuthContext.Provider>
    );
}

export default App;
