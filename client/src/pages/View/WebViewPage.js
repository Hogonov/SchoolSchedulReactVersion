import React, {useCallback, useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContext";
import {useMessage} from "../../hooks/message.hook";
import {useHistory} from 'react-router-dom'
import {useHttp} from "../../hooks/http.hook";
import Select from "react-select";
import {Button} from "react-bootstrap";
import {Loader} from "../../components/Loader";
import style from "./ViewPage.module.css"
import {useAuth} from "../../hooks/auth.hook";
import {ChooseClassBlock} from "./ChooseClassBlock";


export const WebViewPage = () => {
    const message = useMessage();
    const auth = useAuth(AuthContext)
    const {loading, request, error, clearError} = useHttp();
    const [options, setOptions] = useState({schools: [], classes: []});
    const [form, setForm] = useState({
        school: '',
    });

    const getData = useCallback(async () => {
        try {
            const fetched = await request(`/api/table/get_school`, 'GET', null);
            setOptions({...options, schools: fetched.schools});
        } catch (e) {

        }
    }, [request]);

    useEffect(() => {
        getData();
    }, [getData]);


    const getClasses = useCallback(async (event) => {
        try {
            const data = await request(`/api/table/get_view_classes/${event.value}`, 'GET', null);
            setOptions({...options, classes: data[0]});
        } catch (e) {
            console.log(e)
        }
    }, [auth.token, setOptions, options]);


    const changeSchoolHandler = useCallback(async (event, action) => {
        setForm({...form, school: event});
        await getClasses(event)
    }, [getClasses, setForm, form])


    if (loading) {
        return <Loader/>
    }

    return (
        <div className={style.main}>
            <div className={style.schoolChoose}>
                <Select
                    onChange={changeSchoolHandler}
                    id="school"
                    placeholder="Выберите школу"
                    className={style.selector}
                    options={options.schools}
                    value={form.school}
                    name="school"
                />
            </div>
            <ChooseClassBlock
                options={options}
                setOptions={setOptions}
                form={form}
                setForm={setForm}
            />
        </div>
    )
};