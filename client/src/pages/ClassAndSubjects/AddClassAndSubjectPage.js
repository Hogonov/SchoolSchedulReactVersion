import React, {useCallback, useContext, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";
import {useMessage} from "../../hooks/message.hook";
import {useHttp} from "../../hooks/http.hook";
import style from './AddClassAndSubject.module.css'
import {SubjectForm} from "./SubjectForm";
import {ClassForm} from "./ClassForm";
import {SubjectList} from "./SubjectList";


export const AddClassAndSubjectPage = () => {

    const {auth, token} = useContext(AuthContext);
    const message = useMessage();
    const {loading, request, error, clearError} = useHttp();
    const AlphabetRu = [
        "А", "Б", "В", "Г", "Д", "Е", "Ё", "Ж", "З", "И", "Й",
        "К", "Л", "М", "Н", "О", "П", "Р", "С", "Т", "У", "Ф",
        "Х", "Ц", "Ч", "Ш", "Щ", "Ъ", "Ы", "Ь", "Э", "Ю", "Я"
    ]
    const MaxLessons = 14

    const [form, setForm] = useState({
        subjectName: '', classes: {
            lastLetter: 'В',
            lengthClasses: 11,
            classLetters: ["А", "Б", "В"],
            checkedClass: []
        }
    });
    const [data, setData] = useState({
        subjects: [], classes: []
    });
    const [flag, setFlag] = useState({
        classes: false,
        subjects: false,
        checkedArr: [
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false],
        ]
    })
    const [ready, setReady] = useState({
        subjects: false,
        classes: false,
    })


    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    };

    useEffect(() => {
        message(error);
        clearError()
    }, [error, message, clearError]);

    useEffect(() => {
        window.M.updateTextFields()
    }, []);


    const getData = useCallback(async () => {
        try {
            const fetchedSubjects = await request('/api/table/get_subject', 'GET', null, {Authorization: `Bearer ${token}`});
            const fetchedClasses = await request('/api/table/get_classes', 'GET', null, {Authorization: `Bearer ${token}`});
            setData({classes: fetchedClasses, subjects: fetchedSubjects});
            let arr1 = []
            for (let i = 0; i < AlphabetRu.length; i++) {
                arr1.push([])
                for (let j = 0; j < MaxLessons; j++) {
                    arr1[i].push(false)
                }
            }
            console.log(arr1)
        } catch (e) {

        }
    }, [token, request]);

    useEffect(() => {
        getData();
    }, [getData, ready.subject]);

    const addClassroomHandler = async () => {
        try {
            const data = await request('/api/table/classroom', 'POST', {...form}, {Authorization: `Bearer ${auth.token}`});
            message(data.message)
        } catch (e) {
        }
    };

    const changeFlag = event => {
        console.log(event.target)
        setFlag({...flag, [event.target.id]: !flag[event.target.id]})
    }

    return (
        <div className={style.main}>
            <div className={style.classes}>
                {flag.classes && <div className={style.classTitle}>Добавить класс <svg className={style.arrowDown}
                                                                                       id="classes"
                                                                                       onClick={changeFlag}/>
                </div>}
                {!flag.classes && <div className={style.classBlock}>
                    <ClassForm
                        AlphabetRu={AlphabetRu}
                        changeFlag={changeFlag}
                        data={data}
                        flag={flag}
                        setFlag={setFlag}
                        setData={setData}
                        form={form}
                        setForm={setForm}
                        MaxLessons={MaxLessons}
                    />
                </div>
                }
            </div>
            <div className={style.subjects}>
                {!flag.subjects && <div className={style.subjectTitle}>Добавить предмет <svg className={style.arrowDown}
                                                                                             id="subjects"
                                                                                             onClick={changeFlag}/>
                </div>}
                {flag.subjects && <div className={style.subjectBlock}>
                    <SubjectForm
                        form={form}
                        changeHandler={changeHandler}
                        changeFlag={changeFlag}
                    />
                    <SubjectList subjects={data.subjects} setReady={setReady} ready={ready}/>
                </div>}
            </div>
        </div>
    )
}