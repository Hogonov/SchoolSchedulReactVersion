import {useHttp} from "../../hooks/http.hook";
import {AuthContext} from "../../context/AuthContext";
import React, {useCallback, useContext, useEffect, useState} from "react";
import {Loader} from "../../components/Loader";
import Button from "react-bootstrap/Button";
import {useMessage} from "../../hooks/message.hook";
import style from "../Ad/AdPage.module.css";


export const AdListPage = props => {


    const chosenHandler = event => {
        let index = +event.target.id
        let ad = props.ads[index]
        let searchSchool = null
        Array.from(props.options.schools, school => {
            if (school.label === ad.school) {
               return searchSchool = school
            }
        })
        console.log(searchSchool)
        props.setForm({...props.form, name: ad.name, school: searchSchool, id: ad._id})
        props.setEdit({text: `Редактирование рекламы ${index + 1}`, flag: true})
        props.setFlag({...props.flag, view: true})
    }


    if (!props.ads.length) {
        return <div>
            <p className="center">Рекламы пока нет</p>
        </div>
    }

    return (
        <div className={style.adList}>
            <table>
                <thead>
                <tr>
                    <th>№</th>
                    <th>Название</th>
                    <th>Школа</th>
                    <th>
                        <svg className={style.editGray}/>
                    </th>
                    <th>
                        <svg className={style.deleteTh}/>
                    </th>
                </tr>
                </thead>

                <tbody>
                {props.ads.map((ad, index) => {
                    return (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{ad.name}</td>
                            <td>{ad.school}</td>
                            <td>
                                <svg onClick={chosenHandler} id={index} className={style.editBlue}/>
                            </td>
                            <td>
                                <svg onClick={props.deleteHandler} id={ad._id} className={style.redCross}/>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    );
};