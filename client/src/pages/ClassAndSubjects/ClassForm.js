import React, {useContext} from "react";
import {AuthContext} from "../../context/AuthContext";
import {useMessage} from "../../hooks/message.hook";
import {useHttp} from "../../hooks/http.hook";
import style from './AddClassAndSubject.module.css'
import {CheckboxTable} from "./CheckboxTable";

export const ClassForm = props => {

    const auth = useContext(AuthContext);
    const message = useMessage();
    const {request} = useHttp();

    const addClassroomsHandler = async () => {
        try {
            const data = await request('/api/table/classroom', 'POST', {...props.form.classes, checkedArr: props.flag.checkedArr},
                {Authorization: `Bearer ${auth.token}`});
            message(data.message)
        } catch (e) {
        }
    };

    const changeHandler = event => {
        const alphabetArr = props.AlphabetRu
        const name = event.target.name
        if (name === 'lengthClasses') {
            let lengthClasses = event.target.value <= props.MaxLessons ? event.target.value : props.MaxLessons
            props.setForm({...props.form, classes: {...props.form.classes, lengthClasses: lengthClasses}})
        } else {
            let lastLetter = event.target.value.toUpperCase().charAt(event.target.value.length - 1)
            if (lastLetter <= 'Я' && lastLetter >= 'А') {
                let index = alphabetArr.indexOf(lastLetter) + 1
                let newAlphabetArr = alphabetArr.slice(0, index)
                props.setForm({
                    ...props.form,
                    classes: {
                        ...props.form.classes,
                        lastLetter: lastLetter,
                        classLetters: newAlphabetArr
                    }
                })
            }

        }
    }

    return (<div className={style.formClass}>
        <h3>Добавление нового предмета <svg className={style.arrowUp}
                                            id="classes"
                                            onClick={props.changeFlag}/></h3>
        <div className={style.inputBlock}>
            <h4>Количество классов:</h4>
            <div>
                <input
                    className='custom-input'
                    name='lengthClasses'
                    type='number'
                    onChange={changeHandler}
                    value={props.form.classes.lengthClasses}
                />
            </div>
        </div>
        <div className={style.inputBlock}>
            <h4>Последняя буква:</h4>
            <div className={style.specialDiv}>
                <input
                    className='custom-input'
                    name='lastLetter'
                    type='text'
                    onChange={changeHandler}
                    value={props.form.classes.lastLetter}
                />
            </div>
        </div>

        <CheckboxTable
            data={props.data}
            setData={props.setData}
            form={props.form}
            setForm={props.setForm}
            flag={props.flag}
            setFlag={props.setFlag}
        />

        <button className={`btn custom-button`} onClick={addClassroomsHandler}>Добавить</button>
    </div>)
}