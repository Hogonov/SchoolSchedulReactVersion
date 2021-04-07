import React from "react";
import style from "./ViewPage.module.css"


export const ClassBlock = props => {
    let flag = props.options.sessions.specialDates.indexOf(props.form.dates[props.index]) !== -1
    return (
        <div className={style.classBlock}>
            <div
                className={`${style.titleTable} ${style.leftMargin} ${style.lastMargin} ${flag ? style.specialTitle : ''}`}>{props.day}<br/>{props.form.dates[props.index]}
            </div>
            {props.fullForm.form[props.index].subjects.map((subject, index) => {
                try {
                    let sessionVal = props.fullForm.form[props.index].session.value
                    if (sessionVal && subject.option !== null && sessionVal.indexOf('first') !== -1) {
                        return <div className={`${style.subject} ${style.leftMargin} ${style.lastMargin}`}
                                    key={index}
                        >
                            <div className={style.subjectTitle}>{subject.option.label}</div>
                            {subject.option.label !== '' && <div>каб. {subject.office}</div>}
                        </div>
                    } else {
                        return <div className={`${style.subject} ${style.leftMargin} ${style.lastMargin}`}
                                    key={index}
                        />
                    }
                } catch (e) {
                }

            })}

            {props.fullForm.form[props.index].subjects.map((subject, index) => {
                try {
                    let isFirstIndex = index === 0
                    let isLastIndex = index !== props.options.sessions.secondSession.length - 1
                    let sessionVal = props.fullForm.form[props.index].session.value
                    if (sessionVal && subject.option !== null && sessionVal.indexOf('second') !== -1) {
                        return <div
                            className={`${isFirstIndex && style.firstIndexSecondSession} ${style.subject} ${style.leftMargin}
                               ${isLastIndex && style.lastMargin}`}
                            key={index}
                        >
                            <div className={style.subjectTitle}>{subject.option.label}</div>
                            {subject.option.label !== '' && <div>каб. {subject.office}</div>}
                        </div>
                    } else {
                        return <div
                            className={`${isFirstIndex && style.firstIndexSecondSession} ${style.subject} ${style.leftMargin}
                                ${isLastIndex && style.lastMargin}`}
                            key={index}/>
                    }
                } catch (e) {
                }

            })}


        </div>
    )
}