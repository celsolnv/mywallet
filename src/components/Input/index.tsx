import {
  forwardRef,
  ForwardRefRenderFunction,
  InputHTMLAttributes,
} from "react";

import { FieldError } from "react-hook-form";
import styled from "./input.module.scss";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: FieldError;
}

export const InputBase: ForwardRefRenderFunction<
  HTMLInputElement,
  InputProps
> = ({ error = null, ...props }, ref) => {
  return (
    <div className={styled["form-control"]}>
      <input ref={ref} className={styled.input} {...props} />

      {!!error && <span> {error?.message} </span>}
    </div>
  );
};

export const Input = forwardRef(InputBase);
