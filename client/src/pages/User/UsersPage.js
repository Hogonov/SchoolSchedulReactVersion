import {useHttp} from "../../hooks/http.hook";
import {AuthContext} from "../../context/AuthContext";
import React, {useCallback, useContext, useEffect, useState} from "react";
import {Loader} from "../../components/Loader";
import {UserList} from "./UserList";
import style from './StyleUsersPage.module.css'
import {AddFormUser} from "./AddFormUser";
import {InputForm} from "../../components/InputForm";
import {useMessage} from "../../hooks/message.hook";



export const UsersPage = () => {
    const message = useMessage();
    const [users, setUsers] = useState([]);
    const {loading, request} = useHttp();
    const {token} = useContext(AuthContext);
    const [user, setUser] = useState({login: '', password: '', role: '', school: ''});
    const [flag, setFlag] = useState({
        form: false,
        update: false
    })
    const [schoolForm, setSchoolForm] = useState({
        name: '',
        schools: []
    })

    const addHandler = async () => {
        try {
            const data = await request('/api/school/add', 'POST', {school: schoolForm.name}, {Authorization: `Bearer ${token}`});
            message(data.message)
            await fetchedSchools()
        } catch (e) {
        }
    };

    const changeHandler = event => {
        setSchoolForm({...schoolForm, [event.target.name]: event.target.value})
    };

    const fetchUsers = useCallback(async () => {
        try {
            const fetched = await request('/api/users/get_all', 'GET', null, {Authorization: `Bearer ${token}`});
            setUsers(fetched);
            setFlag({...flag, update: false})
        } catch (e) {

        }
    }, [token, request]);

    const fetchedSchools = useCallback(async () => {
        try {
            const fetched = await request('/api/school/get_all', 'GET', null, {Authorization: `Bearer ${token}`});
            setSchoolForm({...schoolForm, schools: fetched});
        } catch (e) {

        }
    }, [token, request]);

    useEffect(() => {
        fetchedSchools();
    }, [fetchedSchools, flag.update]);

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
            <div className={style.addSchoolBlock}>
                <InputForm
                    placeholderComp="Введите название школы"
                    nameComp='school'
                    idComp='school'
                    addHandler={addHandler}
                    changeHandler={changeHandler}
                    form={schoolForm}
                />

            </div>

            <h2 className={style.title}>Пользователи</h2>
            {!loading && <UserList setFlag={setFlag} flag={flag} token={token} users={users} user={user} setUser={setUser}/>}
            <h1/>
            <button onClick={viewFormAddUser} className={`btn ${style.button}`}>+ пользователь</button>
            <h1/>
            {flag.form && <AddFormUser schoolForm={schoolForm} token={token} setFlag={setFlag} flag={flag} user={user} setUser={setUser}/>}
        </div>
    );
};