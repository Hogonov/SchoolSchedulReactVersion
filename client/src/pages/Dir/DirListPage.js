import {useHttp} from "../../hooks/http.hook";
import {AuthContext} from "../../context/AuthContext";
import React, {useCallback, useContext, useEffect, useState} from "react";
import {Loader} from "../../components/Loader";
import Button from "react-bootstrap/Button";
import {useMessage} from "../../hooks/message.hook";


export const DirListPage = () => {
    const [dirs, setAds] = useState([]);
    const {loading, request} = useHttp();
    const {token} = useContext(AuthContext);
    const message = useMessage();

    const fetchAds = useCallback(async () => {
        try {
            const fetched = await request('/api/dir/get_all', 'GET', null, {Authorization: `Bearer ${token}`});
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

    if (!dirs.length) {
        return <p className="center">Записей пока нет</p>
    }

    const deleteHandler = async (event) => {
        try {
            const response = await request(`/api/dir/delete/${event.target.id}`, 'DELETE', null, {Authorization: `Bearer ${token}`});
            message(response.message);
            fetchAds();
        } catch (e) {
            console.log(e)
        }
    };

    return (
        <div>
            <table>
                <thead>
                <tr>
                    <th>№</th>
                    <th>Название</th>
                    <th>Школа</th>
                    <th>Удалить</th>
                </tr>
                </thead>

                <tbody>
                {dirs.map((dir, index) => {
                    return (
                        <tr key={dir._id}>
                            <td>{index + 1}</td>
                            <td>{dir.name}</td>
                            <td>{dir.school}</td>
                            <td>
                                <button
                                    className="btn yellow darken-4"
                                    disabled={loading}
                                    style={{marginRight: 10}}
                                    onClick={deleteHandler}
                                    id={dir._id}
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
            <Button href="/add_new_dir" className="btn yellow darken-4">Добавить</Button>
        </div>
    );
};