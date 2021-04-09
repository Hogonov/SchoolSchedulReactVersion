import React, {useCallback, useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContext";
import {useMessage} from "../../hooks/message.hook";
import {useHttp} from "../../hooks/http.hook";
import style from './AddClassAndSubject.module.css'
import {SubjectForm} from "./SubjectForm";
import {ClassForm} from "./ClassForm";
import {SubjectList} from "./SubjectList";
import {Loader} from "../../components/Loader";


export const AddClassAndSubjectPage = () => {

    const {token} = useContext(AuthContext);
    const message = useMessage();
    const {loading, request, error, clearError} = useHttp();
    const AlphabetRu = [
        "А", "Б", "В", "Г", "Д", "Е", "Ё", "Ж", "З", "И", "Й",
        "К", "Л", "М", "Н", "О", "П", "Р", "С", "Т", "У", "Ф",
        "Х", "Ц", "Ч", "Ш", "Щ", "Ъ", "Ы", "Ь", "Э", "Ю", "Я"
    ]
    const MaxLessons = 11

    const [form, setForm] = useState({
        subjectName: '', classes: {
            lastLetter: 'В',
            lengthClasses: 11,
            classLetters: ["А", "Б", "В"],
            checkedClass: []
        }
    });
    const [data, setData] = useState({
        subjects: [], classes: [], indexPagination: 0
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
    const getData = useCallback(async () => {
        try {
            const fetchedSubjects = await request('/api/table/get_subject', 'GET', null, {Authorization: `Bearer ${token}`});
            const fetchedClasses = await request('/api/table/get_classes', 'GET', null, {Authorization: `Bearer ${token}`});
            const fetchedCandidate = await request('/api/table/get_checked_classroom', 'GET', null, {Authorization: `Bearer ${token}`});
            if (fetchedCandidate.candidate) {
                let index = AlphabetRu.indexOf(fetchedCandidate.lastLetter) + 1
                setForm({
                    ...form, classes: {
                        ...form.classes,
                        checkedClass: fetchedCandidate.classrooms.classes,
                        lastLetter: fetchedCandidate.lastLetter,
                        classLetters: AlphabetRu.slice(0, index)
                    }
                })
                setFlag({...flag, checkedArr: fetchedCandidate.classrooms.checkedArr})
            }
            setData({...data, classes: fetchedClasses, subjects: fetchedSubjects});
        } catch (e) {

        }
    }, [token, request]);

    useEffect(() => {
        getData()
    }, [getData, ready.subject]);

    const changeHandler = event => {
        if ( event.target.name === "subjectName" && event.target.value.length > 12){
            message("Слишком длинное название предмета")
        } else {
            setForm({...form, [event.target.name]: event.target.value})
        }

    };

    useEffect(() => {
        message(error);
        clearError()
    }, [error, message, clearError]);

    useEffect(() => {
        window.M.updateTextFields()
    }, []);


    const changeFlag = event => {
        setFlag({...flag, [event.target.id]: !flag[event.target.id]})
    }

    if (loading){
        return <Loader/>
    }
    return (
        <div className={style.main}>
            <div className={style.classes}>
                {!flag.classes && <div className={style.classTitle}>Добавить класс <svg className={style.arrowDown}
                                                                                       id="classes"
                                                                                       onClick={changeFlag}/>
                </div>}
                {flag.classes && <div className={style.classBlock}>
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
                        data={data}
                        setData={setData}
                    />
                    <SubjectList subjects={data.subjects} setReady={setReady} ready={ready} data={data} setData={setData}/>
                </div>}
            </div>
        </div>
    )
}