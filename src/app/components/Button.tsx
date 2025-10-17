import { type ReactNode } from "react";

const Button = ({ style, handleClick, textStyle, children, disabled }: { style: string, handleClick: () => void, textStyle: string, children: ReactNode, disabled?: boolean }) => (
  <div className={style === 'TLOAS' ? "tloas-border p-1" : ""}>
    <button disabled={disabled} onClick={handleClick} className={`py-1 px-4 m:px-10 ${style === 'TTPD' ? 'ttpd-button ttpd-border' : 'tloas-button'} ${textStyle} w-full uppercase sm:text-xl cursor-pointer`}>
      {children}
    </button>
  </div>
);

export default Button;