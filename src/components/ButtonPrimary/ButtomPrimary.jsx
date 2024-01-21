import s from "./style.module.css"

export function ButtonPrimary({ type = "button", children, className, onClick, isDisabled }) {
    return <button
        type={type}
        onClick={onClick}
        disabled={isDisabled}
        className={`btn btn-primary ${s.button} ${className}`}
    >
        {children}
    </button>
}