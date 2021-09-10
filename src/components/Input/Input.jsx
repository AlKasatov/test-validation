import s from './Input.module.css'

export function Input({name, type, placeholder, inputs, errorState}){
    return(
        <div className={s.inputItem}>
            <input name={name} className={s.input} placeholder={placeholder} type={type} />
            {errorState[name] && <div className={s.errorMsg}>{inputs[name].errorMsg}</div>}
        </div>
    )
}

export function Textarea({name, placeholder, inputs, errorState}){
    return(
        <div className={s.inputItem}>
            <textarea name={name} className={s.input} placeholder={placeholder} />
            {errorState[name] && <div className={s.errorMsg}>{inputs[name].errorMsg}</div>}
        </div>
    )
}
