import {useHttp} from "../../hooks/http.hook";
import {AuthContext} from "../../context/AuthContext";
import React, {useCallback, useContext, useEffect, useState} from "react";
import {Loader} from "../../components/Loader";
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";
import {useMessage} from "../../hooks/message.hook";


export const ListEditorPage = () => {
    const [classrooms, setClassrooms] = useState([]);
    const {loading, request} = useHttp();
    const {token} = useContext(AuthContext);
    const message = useMessage();

    const fetchClassrooms = useCallback(async () => {
        try {
            const fetched = await request('/api/editor/get_all_data', 'GET', null, {Authorization: `Bearer ${token}`});
            setClassrooms(fetched);
        } catch (e) {

        }
    }, [token, request]);

    useEffect(() => {
        fetchClassrooms();
    }, [fetchClassrooms]);


    const deleteHandler = async (event) => {
        try {
            const response = await request(`/api/editor/delete/${event.target.id}`, 'DELETE', null, {Authorization: `Bearer ${token}`});
            message(response.message);
            fetchClassrooms();
        } catch (e) {
            console.log(e)
        }
    };

    if (loading) {
        return <Loader/>
    }

    if (!classrooms.length) {
        return <div>
            <p className="center">Объявлений пока нет</p>
            <h1/>
            <Button href="/add_new_schedule" className="btn yellow darken-4">Добавить объявление</Button>
        </div>
    }

    return (
        <div>
            <table>
                <thead>
                <tr>
                    <th>№</th>
                    <th>Название</th>
                    <th>Школа</th>
                    <th>Дата удаления</th>
                    <th>Открыть</th>
                    <th>Удалить</th>
                </tr>
                </thead>

                <tbody>
                {announcements.map((announcement, index) => {
                    return (
                        <tr key={announcement._id}>
                            <td>{index + 1}</td>
                            <td>{announcement.name}</td>
                            <td>{announcement.school}</td>
                            <td>{announcement.deleteDate.split('T')[0]}</td>
                            <td>
                                <Link to={`/detail_announcement/${announcement._id}`}  className="btn yellow darken-4" >Открыть</Link>
                            </td>
                            <td>
                                <button
                                    className="btn yellow darken-4"
                                    disabled={loading}
                                    style={{marginRight: 10}}
                                    onClick={deleteHandler}
                                    id={announcement._id}
                                >
                                    Удалить
                                </button>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
            <h1/>
            <Button href="/add_new_announcement" className="btn yellow darken-4">Добавить объявление</Button>
        </div>
    )
};