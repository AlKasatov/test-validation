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

export function useTooltip({fixed}){

    const targetRef = useRef(null)
    const tooltipRef = useRef(null)
    const [isActive, setIsActive] = useState(false)

    const styleEdit = (e) => {
        if(tooltipRef.current){
            tooltipRef.current.style.position ='fixed'
            if(fixed){
                tooltipRef.current.style.transform ='translate(0%, -110%)'
                tooltipRef.current.style.top = targetRef.current.getBoundingClientRect().top + 'px'
                tooltipRef.current.style.left = targetRef.current.getBoundingClientRect().left + 'px'
            } else {
                tooltipRef.current.style.transform ='translate(-50%, -95%)'
                console.log(e)
                tooltipRef.current.style.top = e.clientY + 'px'
                tooltipRef.current.style.left = e.clientX + 'px'
            }
            tooltipRef.current.style.pointerEvents = 'none'
        }
    }
    const mouseEnterHandler = (e) => {
        setIsActive(true)
        styleEdit(e)
    }
    const mouseMoveHandler = (e) => {
        styleEdit(e)
    }
    const mouseLeaveHandler = (e) => {
        setIsActive(false)
    }

    useEffect(()=>{
        const target = targetRef.current
        target.addEventListener('mousemove', mouseMoveHandler)
        target.addEventListener('mouseleave', mouseLeaveHandler)
        target.addEventListener('mouseenter', mouseEnterHandler)
        return ()=>{
            target.removeEventListener('mousemove', mouseMoveHandler)
            target.removeEventListener('mouseleave', mouseLeaveHandler)
            target.removeEventListener('mouseenter', mouseEnterHandler)
        }
    })

    return {isActive, targetRef, tooltipRef}
}