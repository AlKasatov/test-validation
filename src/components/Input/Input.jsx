import s from './Input.module.css'

export default function Input({name, inputs, errorState, inputHandler}){
    return(
        <div className={s.inputItem}>
            <input name={name} onInput={inputHandler} className={s.input} placeholder={inputs[name].placeholder} type={inputs[name].type} />
            {errorState[name] && <div className={s.errorMsg}>{inputs[name].errorMsg}</div>}
        </div>
    )
}
