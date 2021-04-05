import React from "react";
import styleEditorSpecialCourse from "./EditorSpecialCoursePage.module.css";
import {useMessage} from "../../hooks/message.hook";


export const DayBock = (props) => {
    const message = useMessage();
    const addSpecialCourse = () => {
        try {
            let arr = props.form.courses
            if(arr[props.day].course.length < 4){
                arr[props.day].course.push({index: arr[props.day].course.length + 1, name: '', time: ''})
                props.setForm({...props.form, courses: arr})
            } else {
                message('Слишком много спецкурсов в один денья')
            }
        } catch (e) {}
    }

    const deleteSpecialCourse = (event) => {
        try {
            let arr = props.form.courses
            if(arr[props.day].course.length > 1){
                let deleteIndex = +event.target.id.split('-')[1]
                let subArr = []
                arr[props.day].course.splice(deleteIndex - 1, 1)
                for (let i = 0; i < arr[props.day].course.length; i++) {
                    let course = arr[props.day].course[i]
                    subArr.push({...course, index: i + 1, name: course.name, time: course.time})
                }
                let subCoursesArr = {...arr[props.day], course: subArr}
                arr.splice(props.day, 1, subCoursesArr)
                props.setForm({...props.form, courses: arr})
            }
        } catch (e) {}
    }


    const changeHandler = event => {
        try {
            let indexCourse = +event.target.name.split('-')[1] - 1
            let nameOrTimeCourse = event.target.name.split('-')[0]
            const course = {...props.form.courses[props.day].course[indexCourse], [nameOrTimeCourse]: event.target.value};
            let courses = props.form.courses
            courses[props.day].course.splice(indexCourse, 1, course)
            props.setForm({...props.form, courses: courses})
        } catch (e) {
            console.log(e);
        }
    }

    return (<>
        <table className={styleEditorSpecialCourse.table}>
            <thead>
            <tr>
                <td className={styleEditorSpecialCourse.titleTable}>№</td>
                <td className={styleEditorSpecialCourse.titleTable}>Название</td>
                <td className={styleEditorSpecialCourse.titleTable}>Время</td>
            </tr>
            </thead>
            <tbody>
            {Array.from(props.form.courses[props.day].course, course => {
                return (
                    <tr key={course.index} className={styleEditorSpecialCourse.cellTable}>
                        <td>{course.index}</td>
                        <td><input name={`name-${course.index}`} type="text" value={course.name}
                                   onChange={changeHandler}/></td>
                        <td><input name={`time-${course.index}`} type="time" value={course.time}
                                   onChange={changeHandler}/></td>
                        {props.form.courses[props.day].course.length > 1 && <td className={styleEditorSpecialCourse.redCross}>
                            <svg id={`delete-${course.index}`}
                                 onClick={deleteSpecialCourse}
                            />
                        </td>}
                    </tr>
                )
            })}
            </tbody>
        </table>
            <button className={`btn ${styleEditorSpecialCourse.addSpecialCourse}`}
                    onClick={addSpecialCourse}
                    id={props.day}
            >+ спецкурс</button>
        </>
    )
};