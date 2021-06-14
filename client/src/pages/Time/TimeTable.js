import React from "react";
import stylesTimePage from './TimePage.module.css';

export const TimeTable = (props) => {


    const changeIndex = arr => {
        let subArr = []
        for (let i = 0; i < arr.length; i++) {
            subArr.push({...arr[i], index: i + 1})
        }
        return subArr
    }

    const deleteLesson = (event) => {
        let subArr = props.form.times
        let deleteIndex = +event.target.id.split('-')[1]
        if (+props.session === 0) {
            if (props.form.isSpecial) {
                if (subArr.specialFirstSession.length - 1 >= 1){
                    subArr.specialFirstSession.splice(deleteIndex - 1, 1)
                    subArr.specialFirstSession = changeIndex(subArr.specialFirstSession)
                }
            } else {
                if (subArr.firstSession.length - 1 >= 1){
                    subArr.firstSession.splice(deleteIndex - 1, 1)
                    subArr.firstSession = changeIndex(subArr.firstSession)
                }
            }
        } else {
            if (props.form.isSpecial) {
                if (subArr.specialSecondSession.length - 1 >= 1) {
                    subArr.specialSecondSession.splice(deleteIndex - 1, 1)
                    subArr.specialSecondSession = changeIndex(subArr.specialSecondSession)
                }
            } else {
                if (subArr.secondSession.length - 1 >= 1) {
                    subArr.secondSession.splice(deleteIndex - 1, 1)
                    subArr.secondSession = changeIndex(subArr.secondSession)
                }
            }
        }
        props.setForm({...props.form, times: subArr})
    }

    const changeHandler = event => {
        try {
            let firstTimes = props.form.times.firstSession;
            let secondTimes = props.form.times.secondSession;
            let firstSpecialTimes = props.form.times.specialFirstSession;
            let secondSpecialTimes = props.form.times.specialSecondSession;
            let arr = event.target.name.split('_');
            let index = +arr[1]
            let startTime, endTime, lengthSession = props.form.isSpecial ? +props.session + 2 : +props.session
            if (arr[0] === 's') {
                startTime = event.target.value
                endTime = otherTimeSetter(props.form.lengthLesson[lengthSession], startTime)
            } else {
                endTime = event.target.value
                startTime = otherTimeSetter(props.form.lengthLesson[lengthSession], endTime, true)
            }
            if (props.session === '0') {
                if(props.form.isSpecial){
                    firstSpecialTimes.splice(index - 1, 1, {index: index, startTime: startTime, endTime: endTime})
                    props.setForm({...props.form, times: {...props.form.times, specialFirstSession: firstSpecialTimes}});
                }else{
                    firstTimes.splice(index - 1, 1, {index: index, startTime: startTime, endTime: endTime})
                    props.setForm({...props.form, times: {...props.form.times, firstSession: firstTimes}});
                }
            } else {
                if(props.form.isSpecial){
                    secondSpecialTimes.splice(index - 1, 1, {index: index, startTime: startTime, endTime: endTime})
                    props.setForm({...props.form, times: {...props.form.times, specialSecondSession: secondSpecialTimes}});
                }else{
                    secondTimes.splice(index - 1, 1, {index: index, startTime: startTime, endTime: endTime})
                    props.setForm({...props.form, times: {...props.form.times, secondSession: secondTimes}});
                }
            }
        } catch (e) {
            console.log(e);
        }
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
            {Array.from(props.time, time => {
                return (
                    <tr key={time.index} className={stylesTimePage.cellTable}>
                        <td>{time.index}</td>
                        <td><input
                            id={props.session} name={`s_${time.index}`}
                            type="time" value={time.startTime}
                            onChange={changeHandler}
                        /></td>
                        <td><input
                            id={props.session} name={`e_${time.index}`}
                            type="time" value={time.endTime}
                            onChange={changeHandler}
                        /></td>
                        {props.time.length > 1 && <td className={stylesTimePage.redCross}>
                            <svg id={`delete-${time.index}`}
                                 onClick={deleteLesson}
                            />
                        </td>}
                    </tr>
                )
            })}
            </tbody>
        </table>
    )
};

export const otherTimeSetter = (lengthLesson, Time, flag) => { // если flag = true, то вычисляем начальное время, иначе конечное
    let timeArr = Time.split(':');
    let numFlag = 1;
    if (flag) {
        numFlag = -1;
    }
    let date = new Date();
    date.setHours(timeArr[0]);
    date.setMinutes(timeArr[1]);
    let newDate = new Date(+date + 60000 * lengthLesson * numFlag);
    let hours = newDate.getHours();
    let minutes = newDate.getMinutes();
    if (Math.floor(minutes / 10) === 0) {
        minutes = '0' + minutes;
    }
    if (Math.floor(hours / 10) === 0) {
        hours = '0' + hours;
    }
    return hours + ':' + minutes;
};