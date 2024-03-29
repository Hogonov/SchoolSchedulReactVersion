import React, {useContext} from "react";
import {AuthContext} from "../../context/AuthContext";
import {useMessage} from "../../hooks/message.hook";
import {useHttp} from "../../hooks/http.hook";
import style from './AddClassAndSubject.module.css'

export const SubjectList = props => {

    const auth = useContext(AuthContext);
    const message = useMessage();
    const {request} = useHttp();

    const chosePagination = (event) => {
        props.setData({...props.data, indexPagination: +event.target.id})
    }

    const deleteSubjectHandler = async event => {
        try {
            const fetched = await request(`/api/table/delete_subject/${event.target.id}`, 'DELETE', null,
                {Authorization: `Bearer ${auth.token}`});
            if(fetched.ok) {
                props.setReady({...props.flag, update: true})
            }
            message(fetched.message)
            const fetchedSubjects = await request('/api/table/get_subject', 'GET', null, {Authorization: `Bearer ${auth.token}`});
            props.setData({...props.data, subjects: fetchedSubjects});
        } catch (e) {
        }
    };
    return ( <div className={style.subjectList}>
        <table>
            <thead>
            <tr>
                <th>№</th>
                <th>Название</th>
                <th><svg className={style.deleteTh}/></th>
            </tr>
            </thead>
            <tbody>
            {props.subjects[props.data.indexPagination].map((subject, index) => {
                return (
                    <tr key={subject._id}>
                        <td>{index + 1}</td>
                        <td>{subject.name}</td>
                        <td>
                            <svg onClick={deleteSubjectHandler} id={subject._id} className={style.redCross}/>
                        </td>
                    </tr>
                )
            })}
            </tbody>
        </table>
        <div className={style.paginationBlock}>
            {props.subjects.length > 1 && props.subjects.map((subject, index) => {
                let indexPag = props.data.indexPagination
                return (
                    <div key={index}
                         id={index}
                         onClick={chosePagination}
                         className={index === indexPag ? `${style.activePagination}` : ''}
                    >{index + 1}</div>
                )
            })}
        </div>
    </div>)
}