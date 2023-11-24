import { ReactNode, ButtonHTMLAttributes } from "react";
import classnames from "classnames"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
  }

const Button = ({ children,className, ...rest }: ButtonProps) => {
  const allClassNames = classnames(className )
  return (
    <button {...rest} className={`w-full bg-[#633CFF] hover:bg-[#BEADFF] text-[16px] font-semibold rounded-2xl shadow-xl py-4 text-white ${allClassNames} `}>{children}</button>
  )
}

export default Button