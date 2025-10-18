import { type Dispatch, type SetStateAction } from "react";

const Minus = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" height="16px" fill="currentColor"><path d="M96 320C96 302.3 110.3 288 128 288L512 288C529.7 288 544 302.3 544 320C544 337.7 529.7 352 512 352L128 352C110.3 352 96 337.7 96 320z" /></svg>;
const Plus = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" height="16px" fill="currentColor"><path d="M256 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 160-160 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l160 0 0 160c0 17.7 14.3 32 32 32s32-14.3 32-32l0-160 160 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-160 0 0-160z" /></svg>;

interface Props {
    value: number,
    setValue: Dispatch<SetStateAction<number>>,
    label: string,
    minValue: number,
    maxValue: number,
    disabled?: boolean,
    textStyle: string,
    style: string,
}

const DateInput = ({ value, setValue, label, minValue, maxValue, disabled, textStyle, style }: Props) => (
    <div className="flex flex-col items-center justify-center gap-1">
        <label className={`text-sm ${textStyle} ${style === 'TLOAS' ? 'tloas-text-mask' : ''}`}>{label}</label>
        <div className={style === 'TLOAS' ? "tloas-border p-1" : ""}>
            <div className={`flex ${style === 'TTPD' ? 'ttpd-border' : 'tloas-input'} ${textStyle} text-xl sm:text-4xl`}>
                <button disabled={disabled} onClick={() => setValue(value <= minValue ? maxValue : value - 1)} className={`px-4 ${style === 'TLOAS' ? 'tloas-text-mask' : ''}`}><Minus /></button>
                <input type="number" disabled={disabled} min="1" max="12" value={value} className={`text-center w-[2rem] sm:w-[6rem] py-2 ${style === 'TLOAS' ? 'tloas-text-mask' : ''} outline-none`} onChange={(e) => setValue(e.target.value as unknown as number)} onBlur={() => {
                    if (isNaN(Number(value))) {
                        setValue(minValue);
                    } else {
                        const num = Math.min(Math.max(Number(value), minValue), maxValue);
                        setValue(num);
                    }
                }}></input>
                <button disabled={disabled} onClick={() => {
                    const num = Number(value) || minValue;
                    setValue(num >= maxValue ? minValue : num + 1);
                }} className={`px-4 ${style === 'TLOAS' ? 'tloas-text-mask' : ''}`}><Plus /></button>
            </div>
        </div>
    </div>
);

export default DateInput;
