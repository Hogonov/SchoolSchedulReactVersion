import {useHttp} from "../../hooks/http.hook";
import {AuthContext} from "../../context/AuthContext";
import React, {useCallback, useContext, useEffect, useState} from "react";
import {Loader} from "../../components/Loader";
import Button from "react-bootstrap/Button";
import {useMessage} from "../../hooks/message.hook";


export const AdListPage = () => {
    const [ads, setAds] = useState([]);
    const {loading, request} = useHttp();
    const {token} = useContext(AuthContext);
    const message = useMessage();

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

    if (!ads.length) {
        return <p className="center">Рекламы пока нет</p>
    }

    const deleteHandler = async (event) => {
        try {
            const response = await request(`/api/ad/delete/${event.target.id}`, 'DELETE', null, {Authorization: `Bearer ${token}`});
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
                {ads.map((ad, index) => {
                    return (
                        <tr key={ad._id}>
                            <td>{index + 1}</td>
                            <td>{ad.name}</td>
                            <td>{ad.school}</td>
                            <td>
                                <button
                                    className="btn yellow darken-4"
                                    disabled={loading}
                                    style={{marginRight: 10}}
                                    onClick={deleteHandler}
                                    id={ad._id}
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
            <Button href="/add_new_ad" className="btn yellow darken-4">Добавить рекламу</Button>
        </div>
    );
};