import s from './Form.module.css'
import Input from '../Input/Input'
import { useForm } from '../../hooks'
import { form1 } from '../../forms'

export default function Form(){

    const sendForm = () => {
        alert(`\nSEND FORM!\n${Object.keys(formState.current).map(item => {
            return `${item}: ${formState.current[item]}\n`
        })}`)
    }

    const {submitHandler, inputHandler, formState, errorState} = useForm(form1, sendForm)

    return(
        <form className={s.form} onSubmit={submitHandler} onInput={inputHandler}>
            {Object.keys(form1).map(item => {
                return <Input key={item} name={item} inputs={form1} errorState={errorState} />
            })}
            <button className={s.submitBtn}>Отправить</button>
        </form>
    )
}
