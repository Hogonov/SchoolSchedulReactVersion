import React, {useContext, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";
import {useMessage} from "../../hooks/message.hook";
import {useHttp} from "../../hooks/http.hook";
import style from './AddClassAndSubject.module.css'
import DatePicker from "react-multi-date-picker"

export const CheckboxTable = props => {


    const createArr = number => {
        let arr = []
        for (let i = 0; i < number; i++) {
            arr.push(i + 1)
        }
        return arr
    }
    const checkedHandler = event => {

        let index = [+event.target.id.split('-')[0], +event.target.id.split('-')[1]]
        let arr = props.flag.checkedArr.slice()
        arr[index[0]][index[1]] = !arr[index[0]][index[1]]
        props.setFlag({...props.flag, createArr: arr})
    }


    return (<div className={style.formClass}>
        <table>
            <tbody>
            <tr>
                <td className={style.specialTd}/>
                {createArr(props.form.classes.lengthClasses).map((number, index) => {
                    return <td className={style.title} key={index}>
                        {number}
                    </td>
                })}
            </tr>
            {props.form.classes.classLetters.map((classLetter, index) => {
                let firstIndex = index
                return (<tr key={index}>
                    <td className={style.title}>{classLetter}</td>
                    {createArr(props.form.classes.lengthClasses).map((number, index) => {
                        return <td key={index}>
                            <div className={`${style.clickDiv} ${props.flag.checkedArr[firstIndex][index] && style.checkedDiv}`}
                                 onClick={checkedHandler}
                                 id={`${firstIndex}-${index}`}
                            >
                                <svg className={style.checkMark} id={`${firstIndex}-${index}`}/>
                            </div>
                        </td>
                    })}
                </tr>)
            })}

            </tbody>
        </table>
    </div>)
}