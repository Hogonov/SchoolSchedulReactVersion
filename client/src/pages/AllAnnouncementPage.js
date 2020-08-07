import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import React, {useCallback, useContext, useEffect, useState} from "react";
import {Loader} from "../components/Loader";
import {AnnouncementList} from "../components/AnnouncementList";
import Button from "react-bootstrap/Button";


export const AllAnnouncementPage = () => {
    const [announcements, setAnnouncements] = useState([]);
    const {loading, request} = useHttp();
    const {token} = useContext(AuthContext);

    const fetchAnnouncements = useCallback(async () => {
        try {
            const fetched = await request('/api/announcement/get_all', 'GET', null, {Authorization: `Bearer ${token}`});
            setAnnouncements(fetched);
        } catch (e) {

        }
    }, [token, request]);

    useEffect(() => {
        fetchAnnouncements();
    }, [fetchAnnouncements]);

    if (loading) {
        return <Loader/>
    }

    return (
        <div>
            {!loading && <AnnouncementList announcements={announcements}/>}
        </div>
    );
};