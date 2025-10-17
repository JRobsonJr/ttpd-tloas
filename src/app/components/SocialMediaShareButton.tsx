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
            {error && (
                <span className={`${style === 'TTPD' ? `${sourceCodePro.className}` : `tloas-font ${textStyle}`} uppercase text-sm text-center`}>
                    An error occurred when sharing! Try again or download image to share.
                </span>
            )}
            <Button style={style} textStyle={textStyle} disabled={loading} handleClick={() => webShare('square')}>{loading ? 'Loading...' : error?.variant === 'square' ? 'Try sharing again' : 'Share to social media (square)'}</Button>
            <Button style={style} textStyle={textStyle} disabled={loading} handleClick={() => webShare('story')}>{loading ? 'Loading...' : error?.variant === 'story' ? 'Try sharing again' : 'Share to social media (Instagram story)'}</Button>
        </>
    );
}

export default SocialMediaShareButton;
