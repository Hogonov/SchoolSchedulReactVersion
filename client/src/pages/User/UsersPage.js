import {useHttp} from "../../hooks/http.hook";
import {AuthContext} from "../../context/AuthContext";
import React, {useCallback, useContext, useEffect, useState} from "react";
import {Loader} from "../../components/Loader";
import {UserList} from "../../components/UserList";
import Button from "react-bootstrap/Button";


export const UsersPage = () => {
    const [users, setUsers] = useState([]);
    const {loading, request} = useHttp();
    const {token} = useContext(AuthContext);

    const fetchUsers = useCallback(async () => {
        try {
            const fetched = await request('/api/users/get_all', 'GET', null, {Authorization: `Bearer ${token}`});
            setUsers(fetched);
        } catch (e) {

        }
    }, [token, request]);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    if (loading) {
        return <Loader/>
    }

    return (
        <div>
            {!loading && <UserList users={users}/>}
        </div>
    );
};