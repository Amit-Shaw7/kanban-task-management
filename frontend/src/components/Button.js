import React from 'react'

const Button = ({ name, text, onClickFn, type , fullWidth }) => {
    return (
        <button
            type={type}
            name={name}
            onClick={onClickFn}
            className={`w-${fullWidth ? "full" : "max"} flex items-center justify-center font-semibold text-lg ${type === "round" ? "p-3" : "px-5 py-1"} bg-btn text-white tracking-wider ${type === "round" ? "rounded-full" : "rounded-sm"}`}
        >
            {text}
        </button>
    )
}

export default Button;