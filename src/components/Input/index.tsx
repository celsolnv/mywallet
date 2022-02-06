import { useCallback } from "react";
import {
  forwardRef,
  ForwardRefRenderFunction,
  InputHTMLAttributes,
} from "react";

import { FieldError } from "react-hook-form";
import styled from "./input.module.scss";
import { currency } from "./mask";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: FieldError;
  mask?: "currency";
  prefix?: string;
}

export const InputBase: ForwardRefRenderFunction<
  HTMLInputElement,
  InputProps
> = ({ error = null, mask, prefix, ...props }, ref) => {
  const handleKeyUp = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      if (mask === "currency") {
        currency(e);
      }
    },
    [mask]
  );

  return (
    <div className={styled["form-control"]}>
      <div className={styled["input-group"]}>
        {prefix && <span className="prefix-span">{prefix}</span>}
        <input
          ref={ref}
          className={styled.input}
          {...(mask && { onKeyUp: handleKeyUp })}
          {...props}
        />
      </div>

      {!!error && <small> {error?.message} </small>}
    </div>
  );
};

export const Input = forwardRef(InputBase);
