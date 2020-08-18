import React, {useCallback, useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContext";
import {useMessage} from "../../hooks/message.hook";
import {useHistory} from 'react-router-dom'
import {useHttp} from "../../hooks/http.hook";
import Select from "react-select";
import {Button} from "react-bootstrap";
import {Loader} from "../../components/Loader";


export const SelectViewPage = () => {
    const auth = useContext(AuthContext);
    const history = useHistory();
    const message = useMessage();
    const {loading, request, error, clearError} = useHttp();
    const [options, setOptions] = useState({schools: []});
    const [form, setForm] = useState({
        schoolName: ''
    });

    const getData = useCallback(async () => {
        try {
            const fetched = await request(`/api/table/get_school`, 'GET', null);
            setOptions(fetched);
        } catch (e) {

        }
    }, [request]);

    useEffect(() => {
        getData();
        message(error);
        clearError()
    }, [getData, error, message, clearError]);

    useEffect(() => {
        window.M.updateTextFields()
    }, []);

    const changeHandlerSchool = event => {
        setForm({...form, schoolName: event.value});
        console.log("", form);
    };

    if(loading){
        return <Loader/>
    }

    return (
        <div className="row">
            <h1/>
            <div className="col s6 offset-s3">
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Добавление данных</span>
                        <div>

                            <label htmlFor="school" className="white-text">Класс</label>
                            <Select onChange={changeHandlerSchool}
                                    id="school"
                                    placeholder="Выберите школу"
                                    className="black-text"
                                    options={options.schools}
                                    name="school"
                            />
                        </div>
                    </div>
                    <div className="card-action">
                        <Button
                            className="btn yellow darken-4"
                            style={{marginRight: 10}}
                            disabled={loading}
                            href={`/view/${form.schoolName}`}
                        >
                            Выбрать школу
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
};