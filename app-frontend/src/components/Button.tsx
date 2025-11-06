import React from "react";
import {Button as BsButton} from 'react-bootstrap';

type ButtonProps = {
    children: React.ReactNode;
    onclick: (e: React.MouseEvent<HTMLButtonElement>) => void | Promise<void>;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    className?: string;
    variant?: "outline-dark" | "outline-light" | "primary";
}


export const Button: React.FC<ButtonProps> = (
    {
        children,
        onclick,
        type = "button",
        disabled,
        className = "d-flex justify-content-center mt-2d",
        variant = "outline-dark",
    }: ButtonProps
) => {

    return <BsButton
        onClick={onclick}
        type={type}
        disabled={disabled}
        className={className}
        variant = {variant}
        >
        {children}

    </BsButton>

}