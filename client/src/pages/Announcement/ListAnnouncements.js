import {useHttp} from "../../hooks/http.hook";
import {AuthContext} from "../../context/AuthContext";
import React, {useCallback, useContext, useEffect, useState} from "react";
import {Loader} from "../../components/Loader";
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";
import {useMessage} from "../../hooks/message.hook";
import style from "../Announcement/StyleAnnouncementsPage.module.css";


export const ListAnnouncements = props => {
    const {loading, request} = useHttp();
    const {token} = useContext(AuthContext);
    const message = useMessage();


    const chosenHandler = event => {
        let index = +event.target.id
        props.setAnnouncement({
            id: props.announcements[index]._id,
            name: props.announcements[index].name,
            school: props.announcements[index].school,
            deleteDate: props.announcements[index].deleteDate.split('T')[0],
            text: props.announcements[index].text
        })
        props.setEdit({text: `Редактирование объявления ${index + 1}`, flag: true})
        props.setFlag({...props.flag, form: true})
    }

    const deleteHandler = async (event) => {
        try {
            const response = await request(`/api/announcement/delete/${event.target.id}`, 'DELETE', null, {Authorization: `Bearer ${token}`});
            message(response.message);
            props.fetchAnnouncements();
        } catch (e) {
            console.log(e)
        }
    };

    if (loading) {
        return <Loader/>
    }

    if (!props.announcements.length) {
        return <div>
            <p className="center">Объявлений пока нет</p>
            <h1/>
        </div>
    }

    return (
        <div className={style.announcementsList}>
            <table>
                <thead>
                <tr>
                    <th>№</th>
                    <th>Название</th>
                    <th>Школа</th>
                    <th>Дата удаления</th>
                    <th><svg className={style.editGray}/></th>
                    <th><svg className={style.deleteTh}/></th>
                </tr>
                </thead>

                <tbody>
                {props.announcements.map((announcement, index) => {
                    return (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{announcement.name}</td>
                            <td>{announcement.school}</td>
                            <td>{announcement.deleteDate.split('T')[0]}</td>
                            <td>
                                <svg onClick={chosenHandler} id={index} className={style.editBlue}/>
                            </td>
                            <td>
                                <svg onClick={deleteHandler} id={announcement._id} className={style.redCross}/>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    )
};