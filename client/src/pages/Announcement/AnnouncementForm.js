import React, {useContext, useEffect} from "react";
import {useHttp} from "../../hooks/http.hook";
import {AuthContext} from "../../context/AuthContext";
import {Loader} from "../../components/Loader";
import {useMessage} from "../../hooks/message.hook";
import style from "../Announcement/StyleAnnouncementsPage.module.css";


export const AnnouncementForm = props => {
    const message = useMessage();
    const {token} = useContext(AuthContext);
    const {loading, request, error, clearError} = useHttp();


    useEffect(() => {
        message(error);
        clearError()
    }, [error, message, clearError]);



    useEffect(() => {
        window.M.updateTextFields()
    }, []);

    const changeHandler = event => {
        props.setAnnouncement({...props.announcement, [event.target.name]: event.target.value});
    };

    if (loading) {
        return <Loader/>
    }

    const sendHandler = async () => {
        try {
            let data
            if(props.announcement.id){
                data = await request(`/api/announcement/edit/${props.announcement.id}`, 'PUT', {...props.announcement}, {Authorization: `Bearer ${token}`});
            } else {
                data = await request(`/api/announcement/add`, 'POST', {...props.announcement}, {Authorization: `Bearer ${token}`});
            }
            message(data.message);
            props.fetchAnnouncements()
        } catch (e) {
        }
    };
    const clearEdit = () => {
        props.setEdit({text: 'Новое объявление', flag: false})
        props.setAnnouncement({
            name: '',
            school: '',
            deleteDate: '',
            text: ''
        })
    }

    return (
        <div className={style.announcementsForm}>
            {props.edit.flag && <svg className={`${style.redCross} ${style.redCrossTitle}`} onClick={clearEdit}/>}
            <h2 className={style.title}>{props.edit.text}:</h2>
            <form>
                <div className={style.inputBlock}>
                    <h5>Название:</h5>
                    <div>
                        <input
                            className='custom-input'
                            onChange={changeHandler}
                            name='name'
                            type='text'
                            placeholder='Введите название'
                            value={props.announcement.name}
                        />
                    </div>
                </div>
                <div className={style.inputBlock}>
                    <h5>Текст объявления:</h5>
                    <div>
                        <textarea
                            onChange={changeHandler}
                            name='text'
                            placeholder='Введите текст объявления'
                            value={props.announcement.text}
                            style={{resize: 'vertical'}}
                        />
                    </div>
                </div>
                <div className={style.inputBlock}>
                    <h5>Дата удаления:</h5>
                    <div>
                        <input
                            className='custom-input'
                            onChange={changeHandler}
                            name='deleteDate'
                            type='date'
                            value={props.announcement.deleteDate}
                        />
                    </div>
                </div>
            </form>
            <h2/>
            <button onClick={sendHandler} className={`btn ${style.button}`}>Добавить</button>
            <h2/>
        </div>
    )
};