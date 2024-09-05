import React, { ReactElement } from "react";

type props = {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  text: string | ReactElement<HTMLImageElement>;
  type?: "submit" | "reset" | "button" | undefined;
  form?: string;
  disabled?: boolean;
  className?: string;
};

function Button({
  onClick,
  text,
  type = "button",
  form,
  disabled,
  className,
}: props) {
  return (
    <button
      type={type}
      form={form}
      onClick={onClick}
      disabled={disabled}
      className={className}
    >
      {text}
    </button>
  );
}

export default Button;
