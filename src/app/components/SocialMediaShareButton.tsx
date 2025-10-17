"use client";

import { type RefObject, useState } from "react";
import { toBlob } from "html-to-image";
import Button from "./Button";

interface Props {
    cardRef: RefObject<HTMLDivElement | null>,
    storyCardRef: RefObject<HTMLDivElement | null>,
    textStyle: string,
    style: string,
}

const SocialMediaShareButton = ({ cardRef, storyCardRef, textStyle, style }: Props) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const webShare = async (variant: string) => {
        try {
            setLoading(true);

            const ref = variant === 'story' ? storyCardRef : cardRef;

            if (!ref.current) return;

            const blob = await toBlob(ref.current, {
                cacheBust: true,
                pixelRatio: 2,
                quality: 1,
            });

            if (!blob) return;

            setLoading(false);

            const file = new File([blob], `share-${variant}.png`, { type: "image/png" });

            if (navigator.canShare && navigator.canShare({ files: [file] })) {
                await navigator.share({
                    files: [file],
                    title: "Share to your social media",
                    text: "Remember to tag #TTPDxTLOAS on social media!",
                });
            }

        } catch (err) {
            setError(`erro! ${err}`);
            console.error("Web Share API failed", err);
        }
    }

    return (
        <>
            {error && <p>{error}</p>}
            <Button style={style} textStyle={textStyle} disabled={loading} handleClick={() => webShare('square')}>{loading ? 'Loading...' : 'Share to social media (square)'}</Button>
            <Button style={style} textStyle={textStyle} disabled={loading} handleClick={() => webShare('story')}>{loading ? 'Loading...' : 'Share to social media (Instagram story)'}</Button>
        </>
    );
}

export default SocialMediaShareButton;
