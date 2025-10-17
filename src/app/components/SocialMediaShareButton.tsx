"use client";

import { type RefObject, useEffect, useState } from "react";
import { toBlob } from "html-to-image";
import Button from "./Button";
import { sourceCodePro } from "../utils/fonts";

interface Props {
    cardRef: RefObject<HTMLDivElement | null>,
    storyCardRef: RefObject<HTMLDivElement | null>,
    textStyle: string,
    style: string,
    displayElements: boolean,
}

const SocialMediaShareButton = ({ cardRef, storyCardRef, textStyle, style, displayElements }: Props) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<{ variant: string, error: unknown }>();
    const [cacheBlob, setCacheBlob] = useState<{ variant: string, blob: Blob | null }>();

    useEffect(() => {
        setCacheBlob(undefined);
        setError(undefined);
    }, [style, displayElements]);

    const webShare = async (variant: string) => {
        try {
            let blob = cacheBlob?.variant === variant ? cacheBlob.blob : null;

            if (!blob) {
                const ref = variant === 'story' ? storyCardRef : cardRef;

                if (!ref.current) return;

                setLoading(true);

                blob = await toBlob(ref.current, {
                    cacheBust: true,
                    pixelRatio: 2,
                    quality: 1,
                });

                setCacheBlob({ variant, blob });
                throw new Error('vish')
                setLoading(false);
            }

            if (!blob) return;

            const file = new File([blob], `share-${variant}.png`, { type: "image/png" });

            if (navigator.canShare && navigator.canShare({ files: [file] })) {
                await navigator.share({
                    files: [file],
                    title: "Share to your social media",
                    text: "Remember to tag #TTPDxTLOAS on social media!",
                });
            }

            setError(undefined);
        } catch (err: unknown) {
            setLoading(false);
            setError({ variant, error: err });
        }
    }

    return (
        <>
            <div className="flex flex-col items-center w-full">
                <span className={`${style === 'TTPD' ? `${sourceCodePro.className} mb-2` : `tloas-font ${textStyle} mb-1`} uppercase text-sm`}>
                    Share
                </span>
                <div className="flex grid grid-cols-2 gap-2 w-full">
                </div>

                <div className={`flex grid ${loading ? 'grid-cols-1' : 'grid-cols-2'} gap-2 w-full`}>
                    {loading ? (
                        <Button disabled style={style} textStyle={textStyle} handleClick={() => { }}>
                            Loading...
                        </Button>
                    ) : (
                        <>
                            <Button style={style} textStyle={textStyle} handleClick={() => webShare('square')}>
                                {error?.variant === 'square' ? 'Try again' : 'Square (1:1)'}
                            </Button>
                            <Button style={style} textStyle={textStyle} handleClick={() => webShare('story')}>
                                {error?.variant === 'story' ? 'Try again' : 'Story (9:16)'}
                            </Button>
                        </>
                    )}
                </div>
                {error && (
                    <span className={`${style === 'TTPD' ? `${sourceCodePro.className} text-gray-400` : `tloas-font ${textStyle} text-gray-600`} uppercase text-xs text-center mt-1`}>
                        An error occurred! Please, try again. If the error persists, download the image to share.
                    </span>
                )}
            </div>
        </>
    );
}

export default SocialMediaShareButton;
