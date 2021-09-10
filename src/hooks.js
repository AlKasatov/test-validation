import { useEffect, useRef, useState } from 'react'

export const useForm = (inputs = {}, sendForm=()=>{}) => {
    const formState = useRef({})
    const [errorState, setErrorState] = useState({})
    const [canSendForm, setCanSendForm] = useState(false)
    const [formWasValidatedOnce, setFormWasValidatedOnce] = useState(false)

    const inputHandler = e => {
        let name = e.target.name
        let type = e.target.type
        formState.current[name] = type ==='checkbox' ? e.target.checked : e.target.value
        if(formWasValidatedOnce){
            setErrorState(prev => {
                return {
                    ...prev,
                    [name]: inputs[name].validate(formState.current[name], formState.current)
                }
            })
        }
    }

    const submitHandler = e => {
        e.preventDefault()
        setFormWasValidatedOnce(true)
        for(let input in inputs){
            setErrorState(prev => {
                return {
                    ...prev,
                    [input]: inputs[input].validate(formState.current[input] || '', formState.current)
                }
            })
        }
        if(canSendForm){
            console.log('send')
            sendForm()
        }
    }

    useEffect(()=>{
        let errorStateValues = Object.values(errorState)
        if(errorStateValues.some(item => item === true) || errorStateValues.length < Object.keys(inputs).length){
            setCanSendForm(false)
        } else {
            setCanSendForm(true)
        }
    }, [errorState, inputs])

    return {submitHandler, inputHandler, formState, errorState}
}