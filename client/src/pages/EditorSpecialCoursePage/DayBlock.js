import React, {useCallback, useContext, useEffect, useState} from "react";
import styleEditorSpecialCourse from "./EditorSpecialCoursePage.module.css";
import stylesTimePage from "../Time/TimePage.module.css";

export const DayBock = (props) => {

    const changeHandler = event => {
        try {
            const oldCourses = props.form.courses;
            let newCourse = {...oldCourses[props.day], [event.target.name]: event.target.value}
            let newArrCourses = [];
            for(let i = 0; i < oldCourses.length; i++) {
                if (i === props.day) {
                    newArrCourses.push(newCourse);
                } else {
                    newArrCourses.push(oldCourses[i])
                }
            }
            props.setForm({...props.form, courses: newArrCourses});
        } catch (e) {
            console.log(e);
        }
    }


    return (
        <table className={styleEditorSpecialCourse.table}>
            <tr>
                <td className={stylesTimePage.titleTable}>№</td>
                <td className={stylesTimePage.titleTable}>Название</td>
                <td className={stylesTimePage.titleTable}>Время</td>
            </tr>
            <tr className={styleEditorSpecialCourse.cellTable}>
                <td>1</td>
                <td><input name="name1" type="text" value={props.form.courses[props.day].name1} onChange={changeHandler}/></td>
                <td><input name="time1" type="time" value={props.form.courses[props.day].time1} onChange={changeHandler}/></td>
            </tr>
            <tr className={styleEditorSpecialCourse.cellTable}>
                <td>2</td>
                <td><input name="name2" type="text" value={props.form.courses[props.day].name2} onChange={changeHandler}/></td>
                <td><input name="time2" type="time" value={props.form.courses[props.day].time2} onChange={changeHandler}/></td>
            </tr>
            <tr className={styleEditorSpecialCourse.cellTable}>
                <td>3</td>
                <td><input name="name3" type="text" value={props.form.courses[props.day].name3} onChange={changeHandler}/></td>
                <td><input name="time3" type="time" value={props.form.courses[props.day].time3} onChange={changeHandler}/></td>
            </tr>
        </table>


    )
};