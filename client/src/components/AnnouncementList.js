import React from 'react'
import {Link} from 'react-router-dom'
import Button from "react-bootstrap/Button";

export const AnnouncementList = ({announcements: announcements}) => {
    if (!announcements.length) {
        return <div>
            <p className="center">Объявлений пока нет</p>
            <h1/>
            <Button href="/add_new_announcement" className="btn yellow darken-4">Добавить объявление</Button>
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
                </tr>
                </thead>

                <tbody>
                {announcements.map((announcement, index) => {
                    return (
                        <tr key={announcement._id}>
                            <td>{index + 1}</td>
                            <td>{announcement.name}</td>
                            <td>{announcement.school}</td>
                            <td>{announcement.deleteDate}</td>
                            <td>
                                <Link to={`/detail_announcement/${announcement._id}`}>Открыть</Link>
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
