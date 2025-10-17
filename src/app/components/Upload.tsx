"use client";

import { RefObject, useState } from "react";
import { toBlob } from "html-to-image";
import ImageKit from "imagekit-javascript";

const blobToBase64 = (blob: Blob): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });

export default function HtmlToImageUpload({ htmlRef }: { htmlRef: RefObject<HTMLDivElement | null> }) {
    const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);

    const uploadHtmlAsImage = async () => {
        if (!htmlRef.current) return;

        try {
            const blob = await toBlob(htmlRef.current, {
                cacheBust: true,
                pixelRatio: 2,
                quality: 1,
            });

            if (!blob) throw new Error("Failed to generate image");

            const base64 = await blobToBase64(blob);

            const authResp = await fetch("/api/imagekit-auth");
            const auth = await authResp.json();

            const imagekit = new ImageKit({
                publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
                urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
                // @ts-expect-error testing
                authenticationEndpoint: "/api/imagekit-auth",
            });

            const uploadOptions = {
                file: base64.split(",")[1],
                fileName: `story-${Date.now()}.png`,
                tags: ["html-to-image"],
                ...auth,
            };

            const result = await new Promise<{ url: string }>((resolve, reject) => {
                // @ts-expect-error testing
                imagekit.upload(uploadOptions, (err, res) => {
                    if (err) reject(err);
                    else resolve(res);
                });
            });

            setUploadedUrl(result.url);
        } catch (err) {
            console.error(err);
            alert("Upload failed");
        }
    };

    const shareToInstagram = async () => {
        if (!uploadedUrl) return;

        try {
            const response = await fetch(uploadedUrl);
            const blob = await response.blob();
            const file = new File([blob], "story.png", { type: blob.type });

            if (navigator.canShare && navigator.canShare({ files: [file] })) {
                await navigator.share({
                    files: [file],
                    title: "Share to Instagram Story",
                });
            } else {
                alert("Sharing not supported on this device");
            }
        } catch (err) {
            console.error(err);
            alert("Failed to share");
        }
    };

    async function shareToInstagramStories() {
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

        if (isMobile && uploadedUrl) {
            const instagramURL = `instagram://story-camera?source_url=${encodeURIComponent(uploadedUrl)}`;

            const timeout = setTimeout(async () => {
                await fallbackWebShare(uploadedUrl);
            }, 1500);

            window.location.href = instagramURL;
            return;
        }
        if (!uploadedUrl) return;

        await fallbackWebShare(uploadedUrl);
    }

    async function fallbackWebShare(imageUrl: string) {
        try {
            const blob = await fetch(imageUrl).then(r => r.blob());
            const file = new File([blob], "story.png", { type: blob.type });

            if (navigator.canShare && navigator.canShare({ files: [file] })) {
                await navigator.share({
                    files: [file],
                    title: "Share to Instagram Stories",
                    text: "Share this image to your Instagram story!",
                });
            } else {
            }
        } catch (err) {
            console.error("Web Share API failed", err);
        }
    }

    return (
        <div className="space-y-4">
            <div className="flex gap-2">
                <button
                    onClick={uploadHtmlAsImage}
                    className="px-4 py-2"
                >
                    Upload as PNG
                </button>
                <button
                    onClick={shareToInstagramStories}
                    className="px-4 py-2"
                    disabled={!uploadedUrl}
                >
                    Share to Instagram Story
                </button>
            </div>

            {uploadedUrl && <p className="break-all">{uploadedUrl}</p>}
        </div>
    );
}
