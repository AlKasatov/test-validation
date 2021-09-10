import s from './Input.module.css'

export default function Input({name, inputs, errorState}){
    return(
        <div className={s.inputItem}>
            <input name={name} className={s.input} placeholder={inputs[name].placeholder} type={inputs[name].type} />
            {errorState[name] && <div className={s.errorMsg}>{inputs[name].errorMsg}</div>}
        </div>
    )
}
    