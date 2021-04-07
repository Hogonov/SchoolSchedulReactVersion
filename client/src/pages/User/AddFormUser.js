import React from "react";
import style from './StyleUsersPage.module.css'
import {useMessage} from "../../hooks/message.hook";
import {useHttp} from "../../hooks/http.hook";
import Select from "react-select";



export const AddFormUser = props => {

    const message = useMessage();
    const {request} = useHttp();

    const changeHandler = event => {
        props.setUser({...props.user, [event.target.name]: event.target.value});
    };

    const selectHandler = (event, action) => {
        props.setUser({...props.user, school: event});
    }
    const clearFormUser = () => {
        props.setEdit({...props.edit,
            isEdit: false,
            textTitleEdit: `Новый пользователь:`,
            textButtonEdit: 'Добавить'
        })
        props.setUser({login: '', password: '', role: '', school: ''})
    }

    const sendHandler = async () => {
        try {
            let reqUrl = '/api/users/add_user'
            let reqType = 'POST'
            if (props.user.id){
                reqUrl = `/api/users/edit_user/${props.user.id}`
                reqType = 'PUT'
            }
            const data = await request(reqUrl, reqType, {...props.user}, {Authorization: `Bearer ${props.token}`});
            message(data.message);
            if(data.ok) {
                props.setFlag({...props.flag, update: true})
            }
        } catch (e) {
        }
    };

    return (
        <div className={style.addFormUser}>
            {props.user.id && <svg onClick={clearFormUser} className={`${style.redCross} ${style.clearFormUser}`}/>}
            <h2>{props.edit.textTitleEdit}</h2>
            <form>
                <div className={style.inputBlock}>
                    <h5>Логин:</h5>
                    <div>
                        <input
                            className='custom-input'
                            onChange={changeHandler}
                            name='login'
                            type='text'
                            placeholder='Введите логин'
                            value={props.user.login}
                        />
                    </div>
                </div>
                <div className={style.inputBlock}>
                    <h5>Пароль:</h5>
                    <div>
                        <input
                            className='custom-input'
                            onChange={changeHandler}
                            name='password'
                            type='password'
                            placeholder='Введите пароль'
                            value={props.user.password}
                        />
                    </div>
                </div>
                <div className={style.inputBlock}>
                    <h5>Роль:</h5>
                    <div>
                        <input
                            className='custom-input'
                            onChange={changeHandler}
                            name='role'
                            type='text'
                            placeholder='Введите название роли'
                            value={props.user.role}
                        />
                    </div>
                </div>
                <div className={style.inputBlock}>
                    <h5>Школа:</h5>
                    <div>
                        <Select
                            placeholder="Введите название школы"
                            className={style.selector}
                            name="session"
                            onChange={selectHandler}
                            value={props.user.school}
                            options={props.schoolForm.schools}
                        />
                    </div>
                </div>
            </form>
            <h2/>
            <button onClick={sendHandler} className={`btn ${style.button}`}>{props.edit.textButtonEdit}</button>
            <h2/>
        </div>
    );
};