import React, {useCallback, useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContext";
import {useMessage} from "../../hooks/message.hook";
import {useHistory} from 'react-router-dom'
import {useHttp} from "../../hooks/http.hook";
import Select from "react-select";
import {Button} from "react-bootstrap";
import {Loader} from "../../components/Loader";
import style from "./ViewPage.module.css"


export const TimeBlock = props => {


    return (
        <div className={style.timeBlock}>
            <div className={`${style.titleTable} ${style.lastMargin} ${style.paddingTopTitle}`}>Время</div>
            {props.options.sessions.firstSession.map((time, index) => {
                let specialSession = props.options.sessions.specialFirstSession
                return <div className={`${style.time} ${style.lastMargin} 
                ${props.flag.specialDate ? style.specialPaddingTop : style.paddingTop}`}
                            key={index}
                >{time.startTime}-{time.endTime} <br/>
                   <div className={style.specialTime}>
                       {props.flag.specialDate && !!specialSession[index] ? `${specialSession[index].startTime}-${specialSession[index].endTime}` : ''}
                   </div>
                </div>
            })}
            {props.options.sessions.secondSession.map((time, index) => {
                let isFirstIndex = index === 0
                let isLastIndex = index !== props.options.sessions.secondSession.length - 1
                let specialSession = props.options.sessions.specialSecondSession
                return <div
                    className={`
                            ${isFirstIndex && style.firstIndexSecondSession} 
                            ${style.time} 
                            ${style.time} 
                            ${style.paddingTop}
                            ${isLastIndex && style.lastMargin}
                            ${props.flag.specialDate ? style.specialPaddingTop : style.paddingTop}`}
                    key={index}
                >
                    {time.startTime}-{time.endTime}<br/>
                    <div className={style.specialTime}>
                        {props.flag.specialDate && !!specialSession[index] ? `${specialSession[index].startTime}-${specialSession[index].endTime}` : ''}
                    </div>
                </div>
            })}
        </div>
    )
}