import React from "react"
import DatePicker from "react-multi-date-picker";
import stylesTimePage from "./TimePage.module.css";

class CustomComponent extends React.Component {
    render() {
        return (
            <button onClick={this.props.openCalendar}
                    className={`btn ${stylesTimePage.datePicker} ${this.props.flag && stylesTimePage.datePickerWithSecondSession || ""}`}
            >
                Выберите даты праздничных дней
            </button >
        )
    }
}

export default class CustomDatePicker extends React.Component {

    render() {
        const changeDate = (event) => {
            let dates = Array.from(event, date => {
                let year = date.year
                let month = date.month.number < 10 ? `0${date.month.number}` : date.month.number
                console.log(date.month.number)
                let day = date.day < 10 ? `0${date.day}` : date.day
                return `${year}/${month}/${day}`
            })
            this.props.setForm({...this.props.form, specialDates: dates})
        }
        return (
            <DatePicker
                months={[
                    ["Январь", "Янв"],
                    ["Февраль", "Фев"],
                    ["Март", "Мар"],
                    ["Апрель", "Апр"],
                    ["Май", "Май"],
                    ["Июнь", "Июн"],
                    ["Июль", "Июл"],
                    ["Август", "Авг"],
                    ["Сентябрь", "Сен"],
                    ["Октябрь", "Окт"],
                    ["Ноябрь", "Ноя"],
                    ["Декабрь", "Дек"],
                ]}
                weekDays={[
                    ["Воскресенье", "Вс"],
                    ["Понедельник", "Пн"],
                    ["Вторник", "Вто"],
                    ["Среда", "Ср"],
                    ["Четверг", "Чт"],
                    ["Пятница", "Пт"],
                    ["Суббота", "Сб"],
                ]}
                mapDays={({ date }) => {
                    let props = {}
                    let isWeekend = [0].includes(date.weekDay.index)
                    if (isWeekend) props.className = "highlight highlight-red"
                    return props
                }}
                value={this.props.form.specialDates}
                type="custom"
                multiple={true}
                animation={true}
                onChange={changeDate}
                render={<CustomComponent flag={this.props.flag} form={this.props.form} setForm={this.props.setForm}/>}
            />
        )
    }
}