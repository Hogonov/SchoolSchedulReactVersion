import React, {useCallback, useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContext";
import {useMessage} from "../../hooks/message.hook";
import {useHttp} from "../../hooks/http.hook";
import Select from 'react-select';
import {Loader} from "../../components/Loader";
import Grid from "@material-ui/core/Grid";
import styleEditorSpecialCourse from "./EditorSpecialCoursePage.module.css";
import stylesTimePage from "../Time/TimePage.module.css";

export const EditorSpecialCoursePage = () => {
    const auth = useContext(AuthContext);
    const message = useMessage();
    const {loading, request, error, clearError} = useHttp();

    if (loading)
        return <Loader/>;
    return (
        <div className={styleEditorSpecialCourse.main}>
            <h3 className={styleEditorSpecialCourse.title}>Редактирование расписания спецкурсов</h3>
            <table className={styleEditorSpecialCourse.mainTable}>
                <tr>
                    <td className={`${styleEditorSpecialCourse.dayBlock} ${styleEditorSpecialCourse.leftBlock}`}>
                        <h3>Понедельник</h3>
                        <table className={styleEditorSpecialCourse.table}>
                            <tr>
                                <td className={stylesTimePage.titleTable}>№</td>
                                <td className={stylesTimePage.titleTable}>Название</td>
                                <td className={stylesTimePage.titleTable}>Время</td>
                            </tr>
                            <tr className={styleEditorSpecialCourse.cellTable}>
                                <td>1</td>
                                <td><input type="text"/></td>
                                <td><input type="time"/></td>
                            </tr>
                            <tr className={styleEditorSpecialCourse.cellTable}>
                                <td>2</td>
                                <td><input type="text"/></td>
                                <td><input type="time"/></td>
                            </tr>
                            <tr className={styleEditorSpecialCourse.cellTable}>
                                <td>3</td>
                                <td><input type="text"/></td>
                                <td><input type="time"/></td>
                            </tr>
                        </table>
                    </td>
                    <td className={styleEditorSpecialCourse.dayBlock}>
                        <h3>Вторник</h3>
                         <table className={styleEditorSpecialCourse.table}>
                            <tr>
                                <td className={stylesTimePage.titleTable}>№</td>
                                <td className={stylesTimePage.titleTable}>Название</td>
                                <td className={stylesTimePage.titleTable}>Время</td>
                            </tr>
                             <tr className={styleEditorSpecialCourse.cellTable}>
                                 <td>1</td>
                                 <td><input type="text"/></td>
                                 <td><input type="time"/></td>
                             </tr>
                             <tr className={styleEditorSpecialCourse.cellTable}>
                                 <td>2</td>
                                 <td><input type="text"/></td>
                                 <td><input type="time"/></td>
                             </tr>
                             <tr className={styleEditorSpecialCourse.cellTable}>
                                 <td>3</td>
                                 <td><input type="text"/></td>
                                 <td><input type="time"/></td>
                             </tr>
                        </table>
                    </td>
                    <td className={styleEditorSpecialCourse.dayBlock}>
                        <h3>Среда</h3>
                         <table className={styleEditorSpecialCourse.table}>
                            <tr>
                                <td className={stylesTimePage.titleTable}>№</td>
                                <td className={stylesTimePage.titleTable}>Название</td>
                                <td className={stylesTimePage.titleTable}>Время</td>
                            </tr>
                             <tr className={styleEditorSpecialCourse.cellTable}>
                                <td>1</td>
                                <td><input type="text"/></td>
                                <td><input type="time"/></td>
                             </tr>
                             <tr className={styleEditorSpecialCourse.cellTable}>
                                 <td>2</td>
                                 <td><input type="text"/></td>
                                 <td><input type="time"/></td>
                             </tr>
                             <tr className={styleEditorSpecialCourse.cellTable}>
                                 <td>3</td>
                                 <td><input type="text"/></td>
                                 <td><input type="time"/></td>
                             </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td className={styleEditorSpecialCourse.dayBlock}>
                        <h3>Четверг</h3>
                         <table className={styleEditorSpecialCourse.table}>
                            <tr>
                                <td className={stylesTimePage.titleTable}>№</td>
                                <td className={stylesTimePage.titleTable}>Название</td>
                                <td className={stylesTimePage.titleTable}>Время</td>
                            </tr>
                             <tr className={styleEditorSpecialCourse.cellTable}>
                                 <td>1</td>
                                 <td><input type="text"/></td>
                                 <td><input type="time"/></td>
                             </tr>
                             <tr className={styleEditorSpecialCourse.cellTable}>
                                 <td>2</td>
                                 <td><input type="text"/></td>
                                 <td><input type="time"/></td>
                             </tr>
                             <tr className={styleEditorSpecialCourse.cellTable}>
                                 <td>3</td>
                                 <td><input type="text"/></td>
                                 <td><input type="time"/></td>
                             </tr>
                        </table>

                    </td>
                    <td className={styleEditorSpecialCourse.dayBlock}>
                        <h3>Пятница</h3>
                         <table className={styleEditorSpecialCourse.table}>
                            <tr>
                                <td className={stylesTimePage.titleTable}>№</td>
                                <td className={stylesTimePage.titleTable}>Название</td>
                                <td className={stylesTimePage.titleTable}>Время</td>
                            </tr>
                             <tr className={styleEditorSpecialCourse.cellTable}>
                                 <td>1</td>
                                 <td><input type="text"/></td>
                                 <td><input type="time"/></td>
                             </tr>
                             <tr className={styleEditorSpecialCourse.cellTable}>
                                 <td>2</td>
                                 <td><input type="text"/></td>
                                 <td><input type="time"/></td>
                             </tr>
                             <tr className={styleEditorSpecialCourse.cellTable}>
                                 <td>3</td>
                                 <td><input type="text"/></td>
                                 <td><input type="time"/></td>
                             </tr>
                        </table>
                    </td>
                    <td className={`${styleEditorSpecialCourse.dayBlock} ${styleEditorSpecialCourse.leftBlock}`}>
                        <h3>Суббота</h3>
                         <table className={styleEditorSpecialCourse.table}>
                            <tr>
                                <td className={stylesTimePage.titleTable}>№</td>
                                <td className={stylesTimePage.titleTable}>Название</td>
                                <td className={stylesTimePage.titleTable}>Время</td>
                            </tr>
                             <tr className={styleEditorSpecialCourse.cellTable}>
                                 <td>1</td>
                                 <td><input type="text"/></td>
                                 <td><input type="time"/></td>
                             </tr>
                             <tr className={styleEditorSpecialCourse.cellTable}>
                                 <td>2</td>
                                 <td><input type="text"/></td>
                                 <td><input type="time"/></td>
                             </tr>
                             <tr className={styleEditorSpecialCourse.cellTable}>
                                 <td>3</td>
                                 <td><input type="text"/></td>
                                 <td><input type="time"/></td>
                             </tr>
                        </table>
                    </td>
                </tr>
            </table>
            <h1/>
            <button
                className={`btn ${styleEditorSpecialCourse.button}`}
                disabled={loading}
                // onClick={sendHandler}
            >
                Отправить
            </button>
        </div>
    )
};