import React, {useCallback, useContext, useEffect, useState} from "react";
import {useHttp} from "../../hooks/http.hook";
import {AuthContext} from "../../context/AuthContext";
import {Loader} from "../../components/Loader";
import {useMessage} from "../../hooks/message.hook";
import style from "../Announcement/StyleAnnouncementsPage.module.css";
import {ListAnnouncements} from "./ListAnnouncements";
import {AnnouncementForm} from "./AnnouncementForm";


export const AnnouncementsPage = () => {
    const message = useMessage();
    const {token} = useContext(AuthContext);
    const {loading, request, error, clearError} = useHttp();
    const [announcements, setAnnouncements] = useState([]);
    const [announcement, setAnnouncement] = useState([]);
    const [flag, setFlag] = useState({
        form: false,
        update: false
    })
    const [edit, setEdit] = useState({
        text: 'Новое объявление', flag: false
    })

    const fetchAnnouncements = useCallback(async () => {
        try {
            const fetched = await request('/api/announcement/get_all', 'GET', null, {Authorization: `Bearer ${token}`});
            setAnnouncements(fetched);
        } catch (e) {

        }
    }, [token, request])

    useEffect(() => {
        fetchAnnouncements();
    }, [fetchAnnouncements]);

    useEffect(() => {
        message(error);
        clearError()
    }, [error, message, clearError]);

    useEffect(() => {
        window.M.updateTextFields()
    }, []);

    const viewAnnouncementForm = () => {
        setFlag({...flag, form: !flag.form})
    }


    if (loading) {
        return <Loader/>
    }

    return (
        <div id='main' className={style.main}>
            <h2 className={style.title}>Объявления</h2>
            {!loading && <ListAnnouncements
                setFlag={setFlag}
                flag={flag}
                token={token}
                announcement={announcement}
                setAnnouncement={setAnnouncement}
                announcements={announcements}
                setAnnouncements={setAnnouncements}
                fetchAnnouncements={fetchAnnouncements}
                edit={edit}
                setEdit={setEdit}
            />}
            <h1/>
            <button onClick={viewAnnouncementForm} className={`btn ${style.button}`}>+ объявление</button>
            <h1/>
            {flag.form && <AnnouncementForm
                token={token}
                setFlag={setFlag}
                flag={flag}
                announcement={announcement}
                setAnnouncement={setAnnouncement}
                fetchAnnouncements={fetchAnnouncements}
                edit={edit}
                setEdit={setEdit}
            />}
        </div>
    );
};