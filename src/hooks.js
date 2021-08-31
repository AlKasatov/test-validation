import { useEffect, useRef, useState } from 'react'

export const useForm = (inputs = {}, sendForm=()=>{}) => {
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
        let errorStateValues = Object.values(errorState)
        if(errorStateValues.some(item => item === true) || errorStateValues.length < Object.keys(inputs).length){
            setCanSendForm(false)
        } else {
            setCanSendForm(true)
        }
    }, [errorState, inputs])

    return {submitHandler, inputHandler, formState, errorState}
}