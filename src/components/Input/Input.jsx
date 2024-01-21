import s from './style.module.css'

export function Input({ type, onTextChange, placeholder, required, value }) {
    return (
        <input
            type={type || 'text'}
            className={s.input}
            onChange={(e) => onTextChange(e.target.value)}
            placeholder={placeholder}
            required={required}
            value={value}
        />
    )
}