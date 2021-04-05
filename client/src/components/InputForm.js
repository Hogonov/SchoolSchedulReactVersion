import React from "react";
import style from './Style/StyleComponent.module.css'

export const InputForm = props => {

    return (<div className={style.form}>
        <div className={style.inputBlock}>
            <h4>Название:</h4>
            <div>
                <input
                    className='custom-input'
                    name={props.nameComp}
                    type='text'
                    placeholder={props.placeholderComp}
                    onChange={props.changeHandler}
                    value={props.form.name}
                />
                <button  className={`btn custom-button`} onClick={props.addHandler}>Добавить</button>
            </div>
        </div>
    </div>)
}