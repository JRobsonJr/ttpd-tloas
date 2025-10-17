import { monthNames, tloasTracks, ttpdTracks } from "../utils";
import { type ReactNode, type Ref } from "react";
import { crimsonText, oswald, sourceCodePro } from "../utils/fonts";

const X = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" height="16px" fill="currentColor"><path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z" /></svg>;

interface SongDisplayProps {
    title: string,
    textStyle: string,
    album: string,
    style: string,
    size?: number,
    variant: string,
}

const SongDisplay = ({ title, textStyle, album, style, variant, size = variant === 'story' ? 400 : 240 }: SongDisplayProps) => (
    <div className={`flex gap-4 text-center justify-center items-center ${album === 'TTPD' ? 'flex-col' : 'flex-col-reverse'}`}>
        <img
            src={album === 'TTPD' ? "/ttpd_anthology.jpg" : "/tloas.jpg"}
            alt={`${album} album cover`}
            width={size}
            height={size}
            id={album}
            className={style === 'TTPD' ? album === 'TTPD' ? 'ttpd-border-simple' : 'grayscale' : ''}
        />
        <span className={`${textStyle} text-bold ${variant === 'story' ? 'text-4-5xl' : 'text-5xl'}`}>{title}</span>
    </div>
);

interface FloatingImageProps {
    src: string,
    size: number,
    animationName: string,
    style: string,
    top?: string,
    bottom?: string,
    left?: string,
    right?: string,
}

const FloatingImage = ({ top, left, right, bottom, size, animationName, src, style }: FloatingImageProps) => (
    <img
        src={src}
        alt={style === 'TTPD' ? 'Flying paper' : 'Orange glitter star'}
        width={style === 'TTPD' ? .8 * size : size}
        height={style === 'TTPD' ? .8 * size : size}
        id="star"
        className="floating-image"
        style={{ top, left, bottom, right, animationName }}
    />
);

const Badge = ({ style, children, capitalize, variant }: { style: string, children: ReactNode, variant: string, capitalize?: boolean }) => (
    <div className={style === 'TLOAS' ? "tloas-border mt-4" : "mt-8 ttpd-border font-bold"}>
        <div className="flex text-center py-2 px-6">
            <span className={`w-full ${variant === 'story' && style === 'TLOAS' ? 'text-2xl' : 'text-2xl'} text-shadow ${capitalize ? 'uppercase' : 'default-capitalization'} ${style === 'TLOAS' ? oswald.className : sourceCodePro.className} ${style === 'TLOAS' ? 'text-white' : ''}`}>{children}</span>
        </div>
    </div>
);

interface Props {
    ref: Ref<HTMLDivElement>,
    style: string,
    displayAnimation: boolean,
    textStyle: string,
    day: number,
    month: number,
    variant: string
}

const Card = ({ ref, style, displayAnimation, textStyle, day, month, variant }: Props) => {
    const birthday = `${monthNames[month - 1]} ${day}`;

    return (
        <div className={variant === 'story' ? "card-wrapper-story" : "card-wrapper"}>
            <div className={variant === 'story' ? "mashup-card-story" : 'mashup-card'}>
                <div ref={ref} className={`${style === 'TLOAS' ? 'tloas-card-border' : 'ttpd-style'} ${variant === 'story' ? 'p-12' : 'p-8'} relative uppercase`}>
                    <div className={`flex flex-col w-full h-full items-center justify-center ${style === "TLOAS" ? 'tloas-card-bg' : 'ttpd-card-border'}`}>
                        {displayAnimation && (
                            <div>
                                <FloatingImage src={style === 'TLOAS' ? '/star.png' : '/paper_3.png'} animationName={"move-4"} size={200} style={style} top={variant === 'story' ? "24rem" : "12rem"} left="3rem" />
                                <FloatingImage src={style === 'TLOAS' ? '/star.png' : '/paper_2.png'} animationName={"move-2"} size={200} style={style} top={variant === 'story' ? "44rem" : "24rem"} right={variant ==="story" ? "2rem" : "5rem"} />
                                <FloatingImage src={style === 'TLOAS' ? '/star.png' : '/paper_3.png'} animationName={"move-3"} size={200} style={style} bottom="-3rem" right="-4rem" />
                                <FloatingImage src={style === 'TLOAS' ? '/star.png' : '/paper_2.png'} animationName={"move-2"} size={100} style={style} top={variant === 'story' ? "2rem" : "25rem"} left="2.5rem" />
                                <FloatingImage src={style === 'TLOAS' ? '/star.png' : '/paper_1.png'} animationName={"move-1"} size={75} style={style} top={variant === 'story' ? "1rem" : "18rem"} left={variant === 'story' ? "40rem" : "15rem"} />
                                <FloatingImage src={style === 'TLOAS' ? '/star.png' : '/paper_3.png'} animationName={"move-2"} size={75} style={style} top={variant === 'story' ? "48rem" : "44rem"} left="4rem" />
                                <FloatingImage src={style === 'TLOAS' ? '/star.png' : '/paper_2.png'} animationName={"move-3"} size={100} style={style} bottom="16rem" left={variant === 'story' ? "10rem" : "16rem"} />
                                <FloatingImage src={style === 'TLOAS' ? '/star.png' : '/paper_3.png'} animationName={"move-4"} size={100} style={style} bottom="14rem" left="-2rem" />
                                <FloatingImage src={style === 'TLOAS' ? '/star.png' : '/paper_1.png'} animationName={"move-1"} size={75} style={style} bottom={variant === "story" ? "4rem" : "8rem"} left="4rem" />
                                <FloatingImage src={style === 'TLOAS' ? '/star.png' : '/paper_2.png'} animationName={"move-2"} size={100} style={style} top={variant === 'story' ? '16rem' : "8rem"} right="3.5rem" />
                                <FloatingImage src={style === 'TLOAS' ? '/star.png' : '/paper_3.png'} animationName={"move-3"} size={100} style={style} bottom="28rem" right="-1rem" />
                                <FloatingImage src={style === 'TLOAS' ? '/star.png' : '/paper_2.png'} animationName={"move-3"} size={75} style={style} bottom="12rem" right="3.5rem" />
                                <FloatingImage src={style === 'TLOAS' ? '/star.png' : '/paper_1.png'} animationName={"move-1"} size={100} style={style} bottom={variant === 'story' ? "4rem" : "8rem"} right="9rem" />
                            </div>
                        )}

                        <span className={`tracking-wide ${variant === 'story' ? 'text-6xl pb-8' : 'text-7xl pb-5'} text-center ${textStyle} ${style === 'TLOAS' ? 'tloas-text-mask tloas-font' : ''}`}>
                            Everyone has a birthday<br /> TTPD x TLOAS mashup,
                        </span>
                        <span className={`${variant === 'story' ? 'text-5xl pb-7' : 'text-3xl pb-4'} ${textStyle} ${style === 'TLOAS' ? 'tloas-font tloas-accent' : ''}`}>
                            and mine is
                        </span>
                        <div className={`px-8 py-2 ${variant === 'story' ? 'mb-10' : ''} ${style === 'TLOAS' ? "tloas-badge" : "ttpd-border"}`}>
                            <span className={`whitespace-nowrap ${variant === 'story' ? 'text-4xl' : 'text-3xl'} ${style === 'TLOAS' ? `${textStyle} text-white` : sourceCodePro.className}`}>
                                {birthday}
                            </span>
                        </div>
                        <div className="flex flex-col gap-7 p-6 w-[90%]">
                            <SongDisplay variant={variant} style={style} title={ttpdTracks[day]} album="TTPD" textStyle={`${style === 'TLOAS' ? 'text-white' : 'ttpd-text'} ${crimsonText.className}`} />
                            <div className={`mashup-divider ${style === 'TLOAS' ? 'tloas-accent' : 'ttpd-text'}`}><X /></div>
                            <SongDisplay variant={variant} style={style} title={tloasTracks[month]} album="TLOAS" textStyle={`${style === 'TLOAS' ? 'tloas-text tloas-text-mask' : 'ttpd-text'} tloas-font ${oswald.className}`} />
                        </div>

                        <div className={`flex ${variant === 'story' ? 'gap-4' : 'gap-8'}`}>
                            <Badge variant={variant} style={style}>#TTPDxTLOAS</Badge>
                            <Badge variant={variant} capitalize style={style}>Share yours at https://ttpd-tloas.vercel.app/</Badge>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;
