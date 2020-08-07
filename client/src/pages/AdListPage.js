import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import React, {useCallback, useContext, useEffect, useState} from "react";
import {Loader} from "../components/Loader";
import {UserList} from "../components/UserList";
import Button from "react-bootstrap/Button";


export const AdListPage = () => {
    const [ads, setAds] = useState([]);
    const {loading, request} = useHttp();
    const {token} = useContext(AuthContext);

    const fetchAds = useCallback(async () => {
        try {
            const fetched = await request('/api/ad/get_all', 'GET', null, {Authorization: `Bearer ${token}`});
            setAds(fetched);
        } catch (e) {

        }
    }, [token, request]);

    useEffect(() => {
        fetchAds();
    }, [fetchAds]);

    if (loading) {
        return <Loader/>
    }

    return (
        <div>
            {!loading && <AdList ads={ads}/>}
        </div>
    );
};