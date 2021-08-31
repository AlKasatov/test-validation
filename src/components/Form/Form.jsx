import { useEffect, useRef, useState } from 'react'
import s from './Form.module.css'
import Input from '../Input/Input'

const inputs = {
    name: {
        placeholder: 'Имя',
        type: 'text',
        errorMsg: 'Имя должно состоять не менее, чем из 2 символов',
        validate: value => {
            return value.trim().length < 2
        }
    },
    surname: {
        placeholder: 'Фамилия',
        type: 'text',
        errorMsg: 'Фамилия должна состоять не менее, чем из 5 символов',
        validate: value => {
            return value.trim().length < 5 
        }
    },
    phone: {
        placeholder: 'Номер телефона',
        type: 'number',
        errorMsg: 'Номер должен состоять из 11 цифр',
        validate: value => {
            return value.trim().match(/\D/) || value.trim().length !== 11
        }
    },
}

export default function Form(){

    const formState = useRef({})
    const [errorState, setErrorState] = useState({})
    const [canSendForm, setCanSendForm] = useState(false)

    const inputHandler = e => {
        let name = e.target.name
        formState.current[name] = e.target.value
        setErrorState(prev => {
            return {
                ...prev,
                [name]: inputs[name].validate(formState.current[name])
            }
        })
    }

    const submitHandler = e => {
        e.preventDefault()
        for(let input in inputs){
            setErrorState(prev => {
                return {
                    ...prev,
                    [input]: inputs[input].validate(formState.current[input] || '')
                }
            })
        }
        if(canSendForm){
            sendForm()
        }
    }

    useEffect(()=>{
        console.log(errorState)
        let errorStateValues = Object.values(errorState)
        if(errorStateValues.some(item => item === true) || errorStateValues.length < Object.keys(inputs).length){
            setCanSendForm(false)
        } else {
            setCanSendForm(true)
        }
    }, [errorState])

    const sendForm = () => {
        alert(`\nSEND FORM!\n${Object.keys(formState.current).map(item => {
            return `${item}: ${formState.current[item]}\n`
        })}`)
    }

    return(
        <form className={s.form} onSubmit={submitHandler}>
            {Object.keys(inputs).map(item => {
                return <Input key={item} name={item} inputs={inputs} errorState={errorState} inputHandler={inputHandler}/>
            })}
            <button className={s.submitBtn}>Отправить</button>
        </form>
    )
}
