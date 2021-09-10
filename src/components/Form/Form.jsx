import s from './Form.module.css'
import { useTooltip, useForm } from '../../hooks'
import { useRef } from 'react'

export default function Form(){

    const formDraft = useRef({
        name: {
            errorMsg: 'Имя должно состоять не менее, чем из 2 символов, это ведь не радиопозывной, согласитесь',
            validate: value => {
                return value.trim().length < 2
            }
        },
        sex: {
            errorMsg: 'Че не мужик чтоли',
            validate: value => {
                return value !== 'man'
            }
        },
        // surname: {
        //     errorMsg: 'Фамилия должна состоять не менее, чем из 5 символов. Смените ее в паспортном столе и заполните форму',
        //     validate: value => {
        //         return value.trim().length < 5 
        //     }
        // },
        // age: {
        //     errorMsg: 'Возраст должен быть больше 60 лет. Постарейте и заполните форму',
        //     validate: value => {
        //         return +value.trim() <= 60
        //     }
        // },
        // phone: {
        //     errorMsg: 'Номер должен состоять из 11 цифр. Римские цифры не принимаются',
        //     validate: value => {
        //         return value.trim().match(/\D/) || value.trim().length !== 11
        //     }
        // },
        // agree: {
        //     errorMsg: 'Надо поставить галку',
        //     validate: value => {
        //         return !value
        //     }
        // },
        comment: {
            errorMsg: 'Подлиннее, а то читать не будем',
            validate: value => {
                return value.trim().length < 20 
            }
        },
        password1: {
            errorMsg: 'Подлиннее пароль можна?',
            validate: value => {
                return value.trim().length < 6
            }
        },
        password2: {
            errorMsg: 'Попутал? У тебя пароли не похожи, криворукий',
            validate: (value, form) => {
                return value.trim() !== form.password1
            }
        },
    })

    const sendForm = () => {
        alert(`\nSEND FORM!\n${Object.keys(formState.current).map(item => {
            return `${item}: ${formState.current[item]}\n`
        })}`)
    }

    const {submitHandler, inputHandler, formState, errorState} = useForm(formDraft.current, sendForm)

    const {isActive, targetRef, tooltipRef} = useTooltip({
        fixed: false,
    })

    return(
        <>
            {isActive && 
            <div className={s.tooltip} ref={tooltipRef}>
                <h1>Hello, dummy!</h1>
                <span >
                    Hello, im tooltip
                </span>
            </div>
        
            }
            <form className={s.form} onSubmit={submitHandler} onInput={inputHandler}>

                <div className={s.inputItem}>
                    <input name='name' className={s.input} placeholder={'Имя'} type='text' />
                    {errorState['name'] && <div className={s.errorMsg}>{formDraft.current['name'].errorMsg}</div>}
                </div>

                <div className={s.inputItem}>
                    <textarea name='comment' className={s.input} placeholder={'Оставьте комментарий'} />
                    {errorState['comment'] && <div className={s.errorMsg}>{formDraft.current['comment'].errorMsg}</div>}
                </div>

                <div className={s.inputItem}>
                    <input name='sex' className={s.input} placeholder={'Пол'} type='radio' value='man' /> <span>Мужской</span>
                    <input name='sex' className={s.input} placeholder={'Пол'} type='radio' value='woman' defaultChecked /> <span>Женский</span>
                    {errorState['sex'] && <div className={s.errorMsg}>{formDraft.current['sex'].errorMsg}</div>}
                </div>

                <div className={s.inputItem}>
                    <input name='password1' className={s.input} placeholder={'Пароль'} type='password' />
                    {errorState['password1'] && <div className={s.errorMsg}>{formDraft.current['password1'].errorMsg}</div>}
                </div>

                <div className={s.inputItem}>
                    <input name='password2' className={s.input} placeholder={'Повтори пароль'} type='password' />
                    {errorState['password2'] && <div className={s.errorMsg}>{formDraft.current['password2'].errorMsg}</div>}
                </div>



                <button className={s.submitBtn} ref={targetRef}>Отправить</button>
            </form>
        </>
    )
}
