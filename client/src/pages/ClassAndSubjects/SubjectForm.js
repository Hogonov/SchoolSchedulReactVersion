import React, {useContext, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";
import {useMessage} from "../../hooks/message.hook";
import {useHttp} from "../../hooks/http.hook";
import style from './AddClassAndSubject.module.css'

export const SubjectForm = props => {

    const auth = useContext(AuthContext);
    const message = useMessage();
    const {loading, request, error, clearError} = useHttp();


    const addSubjectHandler = async () => {
        try {
            const data = await request('/api/table/subject', 'POST', {subjectName: props.form.subjectName}, {Authorization: `Bearer ${auth.token}`});
            message(data.message)
        } catch (e) {
        }
    };

    return (<div className={style.formSubject}>
        <h3>Добавление нового предмета <svg className={style.arrowUp}
                                            id="subjects"
                                            onClick={props.changeFlag}/></h3>
        <div className={style.inputBlock}>
            <h4>Название:</h4>
            <div>
                <input
                    className='custom-input'
                    name='subjectName'
                    type='text'
                    placeholder='Введите название предмета'
                    onChange={props.changeHandler}
                    value={props.form.subjectName}
                />
            </div>
        </div>
        <button  className={`btn custom-button`} onClick={addSubjectHandler}>Добавить</button>
    </div>)
}