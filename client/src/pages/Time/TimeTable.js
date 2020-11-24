import React, {useContext, useEffect, useState} from "react";
import stylesTimePage from './TimePage.module.css';


export const TimeTable = (props) => {

    const changeHandler = event => {
        try {
            let firstTimes = props.form.times[0];
            let secondTimes = props.form.times[1];
            let arr = event.target.name.split('_');
            let startTime = {name: 'startTime' + arr[1], value: ''};
            let endTime = {name: 'endTime' + arr[1], value: ''};
            if (arr[0] === 's'){
                startTime = {...startTime, value: event.target.value}
                endTime = {...endTime, value: otherTimeSetter(startTime.value)}
            } else {
                endTime = {...endTime, value: event.target.value}
                startTime = {...startTime, value: otherTimeSetter(endTime.value, true)}
            }
            if (props.session === '0') {
                firstTimes = {...firstTimes, [startTime.name]: startTime.value, [endTime.name]: endTime.value }
            } else {
                secondTimes = {...secondTimes, [startTime.name]: startTime.value, [endTime.name]: endTime.value }
            }
            props.setForm({...props.form, times: [firstTimes, secondTimes]});
        } catch (e) {
            console.log(e);
        }
    };

    const otherTimeSetter = (Time, flag) => { // если flag = true, то вычисляем начальное время, иначе конечное
        let timeArr = Time.split(':');
        let numFlag = 1;
        if(flag){
            numFlag = -1;
        }
        let lengthLesson = props.form.lengthLesson[props.session];
        let date = new Date();
        date.setHours(timeArr[0]);
        date.setMinutes(timeArr[1]);
        let newDate = new Date(+ date + 60000 * lengthLesson * numFlag);
        let hours = newDate.getHours();
        let minutes = newDate.getMinutes();
        if(Math.floor(minutes / 10) === 0){
            minutes = '0' + minutes;
        }
        if(Math.floor(hours / 10) === 0){
           hours = '0' + hours;
        }
        return hours + ':' + minutes;
    };


    return (
        <table className={stylesTimePage.table}>
            <thead>
            <tr>
                <td className={stylesTimePage.titleTable}>№</td>
                <td className={stylesTimePage.titleTable}>Начало</td>
                <td className={stylesTimePage.titleTable}>Конец</td>
            </tr>
            </thead>
            <tbody>
            <tr className={stylesTimePage.cellTable}>
                <td>1</td>
                <td><input
                    id={props.session} name="s_1" type="time" value={props.time.startTime1}
                    onChange={changeHandler}
                /></td>
                <td><input
                    id={props.session} name="e_1" type="time" value={props.time.endTime1}
                    onChange={changeHandler}
                /></td>
            </tr>
            <tr className={stylesTimePage.cellTable}>
                <td>2</td>
                <td><input
                    id={props.session} name="s_2" type="time" value={props.time.startTime2}
                    onChange={changeHandler}
                /></td>
                <td><input
                    id={props.session} name="e_2" type="time" value={props.time.endTime2}
                    onChange={changeHandler}
                /></td>
            </tr>
            <tr className={stylesTimePage.cellTable}>
                <td>3</td>
                <td><input
                    id={props.session} name="s_3" type="time" value={props.time.startTime3}
                    onChange={changeHandler}
                /></td>
                <td><input
                    id={props.session} name="e_3" type="time" value={props.time.endTime3}
                    onChange={changeHandler}
                /></td>
            </tr>
            <tr className={stylesTimePage.cellTable}>
                <td>4</td>
                <td><input
                    id={props.session} name="s_4" type="time" value={props.time.startTime4}
                    onChange={changeHandler}
                /></td>
                <td><input
                    id={props.session} name="e_4" type="time" value={props.time.endTime4}
                    onChange={changeHandler}
                /></td>
            </tr>
            <tr className={stylesTimePage.cellTable}>
                <td>5</td>
                <td><input
                    id={props.session} name="s_5" type="time" value={props.time.startTime5}
                    onChange={changeHandler}
                /></td>
                <td><input
                    id={props.session} name="e_5" type="time" value={props.time.endTime5}
                    onChange={changeHandler}
                /></td>
            </tr>
            <tr className={stylesTimePage.cellTable}>
                <td>6</td>
                <td><input
                    id={props.session} name="s_6" type="time" value={props.time.startTime6}
                    onChange={changeHandler}
                /></td>
                <td><input
                    id={props.session} name="e_6" type="time" value={props.time.endTime6}
                    onChange={changeHandler}
                /></td>
            </tr>
            </tbody>
        </table>
    )
};