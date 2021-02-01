import {useHttp} from "../../hooks/http.hook";
import {AuthContext} from "../../context/AuthContext";
import React, {useCallback, useContext, useEffect, useState} from "react";
import {Loader} from "../../components/Loader";
import {UserList} from "./UserList";
import Button from "react-bootstrap/Button";
import style from './StyleUsersPage.module.css'
import {AddFormUser} from "./AddFormUser";


export const UsersPage = () => {
    const [users, setUsers] = useState([]);
    const {loading, request} = useHttp();
    const {token} = useContext(AuthContext);
    const [user, setUser] = useState({login: '', password: '', role: '', school: ''});
    const [flag, setFlag] = useState({
        form: false,
        update: false
    })

    const fetchUsers = useCallback(async () => {
        try {
            const fetched = await request('/api/users/get_all', 'GET', null, {Authorization: `Bearer ${token}`});
            setUsers(fetched);
            setFlag({...flag, update: false})
        } catch (e) {

        }
    }, [token, request]);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers, flag.update]);

    const viewFormAddUser = () => {
        setFlag({...flag, form: !flag.form})
    }

    if (loading) {
        return <Loader/>
    }

    return (
        <div className={style.main}>
            <h2 className={style.title}>Пользователи</h2>
            {!loading && <UserList setFlag={setFlag} flag={flag} token={token} users={users} user={user} setUser={setUser}/>}
            <h1/>
            <button onClick={viewFormAddUser} className={`btn ${style.button}`}>+ пользователь</button>
            <h1/>
            {flag.form && <AddFormUser token={token} setFlag={setFlag} flag={flag} user={user} setUser={setUser}/>}
        </div>
    );
};