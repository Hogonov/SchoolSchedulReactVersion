import React from "react";
import style from "./ViewPage.module.css"
import {TimeBlock} from "./TimeBlock";
import {ClassBlock} from "./ClassBlock";


export const ViewTable = props => {

    const days = [
        'Понедельник',
        'Вторник',
        'Среда',
        'Четверг',
        'Пятница',
        'Суббота',
    ]
    return (
        <div className={style.viewTable}>
            <TimeBlock
                fullForm={props.fullForm}
                options={props.options}
                flag={props.flag}
            />
            {days.map((day, index) => {
                return <ClassBlock
                    day={day}
                    key={index}
                    index={index}
                    fullForm={props.fullForm}
                    options={props.options}
                    form={props.form}
                    flag={props.flag}
                />
            })}
        </div>
    )
};