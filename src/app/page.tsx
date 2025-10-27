"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { toPng } from 'html-to-image';
import { getLastDayOfMonth } from "./utils";
import { crimsonText, oswald, sourceCodePro } from "./utils/fonts";
import Card from "./components/Card";
import DateInput from "./components/DateInput";
import SocialMediaShareButton from "./components/SocialMediaShareButton";
import Button from "./components/Button";
import { track } from "@vercel/analytics";

export default function Home() {
  const [month, setMonth] = useState<number>(1);
  const [day, setDay] = useState<number>(1);
  const [style, setStyle] = useState('TLOAS');
  const [displayAnimation, setDisplayAnimation] = useState(true);
  const [displayResult, setDisplayResult] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const mainTextStyle = style === 'TLOAS' ? oswald.className : crimsonText.className;

  useEffect(() => {
    setDay(Math.min(day, getLastDayOfMonth(month)));
  }, [month]);

  useEffect(() => {
    setDisplayResult(false);
  }, [month, day]);

  const cardRef = useRef<HTMLDivElement>(null);
  const storyCardRef = useRef<HTMLDivElement>(null);

  const handleDownload = async (variant: string) => {
    setDownloading(true);

    const dataUrl = await toPng((variant === 'story' ? storyCardRef : cardRef).current as HTMLElement, {
      cacheBust: true,
      pixelRatio: 2,
      quality: 1,
    });

    const link = document.createElement('a');
    link.download = `tloas-ttpd-mashup-${variant}.png`;
    link.href = dataUrl;
    link.click();

    setDownloading(false);
  };

  const handleChangeStyle = () => setStyle(style === 'TLOAS' ? 'TTPD' : 'TLOAS');

  const scrollToResult = () => {
    setTimeout(() => {
      const element = document.getElementById('result');
      element?.scrollIntoView({ behavior: "smooth" });
    }, 250);
  };

  return (
    <div className={`items-center justify-items-center ${style === 'TLOAS' ? 'tloas-style' : 'ttpd-style'}`}>
      <div className="flex flex-col gap-8 items-center justify-center min-h-screen p-4">
        <span className={`text-2xl text-center sm:text-5xl lg:text-7xl ${mainTextStyle} ${style === 'TLOAS' ? 'tloas-text-mask tloas-font uppercase' : 'font-bold'}`}>Everyone has a birthday <br /> TTPD x TLOAS mashup.</span>

        <div className="flex flex-col gap-3">
          <div className="flex gap-2 mb-4">
            <DateInput style={style} textStyle={mainTextStyle} label="Month" value={month} setValue={setMonth} minValue={1} maxValue={12} />
            <DateInput style={style} textStyle={mainTextStyle} label="Day" disabled={month == 0} value={day} setValue={setDay} minValue={1} maxValue={getLastDayOfMonth(month)} />
          </div>
          <Button style={style} textStyle={mainTextStyle} handleClick={() => {
            track('Birthday', { day, month });
            setDisplayResult(true);
            scrollToResult();
          }} disabled={day == 0 || month == 0}>
            {day === 0 || month === 0 ? 'Select your birth date' : 'Find out your mashup'}
          </Button>
          <Button style={style} textStyle={mainTextStyle} handleClick={handleChangeStyle}>
            Switch to {style === 'TTPD' ? 'TLOAS' : 'TTPD'} theme
          </Button>
        </div>
      </div >

      {displayResult && (
        <div id="result" className="flex flex-col items-center">
          <div className="story-container">
            <Card ref={storyCardRef} day={day} month={month} displayAnimation={displayAnimation} style={style} textStyle={mainTextStyle} variant="story" />
          </div>
          <Card ref={cardRef} day={day} month={month} displayAnimation={displayAnimation} style={style} textStyle={mainTextStyle} variant="card" />

          <div className="flex flex-col gap-4 p-4 items-center">
            <span className={`text-3xl text-center lg:text-5xl text-center ${mainTextStyle} ${style === 'TLOAS' ? 'tloas-text-mask tloas-font uppercase' : 'font-bold'}`}>Customize and share your mashup!</span>
            <div className="flex flex-col gap-4 pb-4 w-fit">
              <div className="flex flex-col items-center w-full">
                <span className={`${style === 'TTPD' ? `${sourceCodePro.className} mb-2` : `tloas-font ${mainTextStyle} mb-1`} uppercase text-sm`}>
                  Customize
                </span>
                <div className="flex grid grid-cols-2 gap-2 w-full">
                  <Button style={style} textStyle={mainTextStyle} handleClick={handleChangeStyle}>
                    {style === 'TTPD' ? 'TLOAS' : 'TTPD'} style
                  </Button>
                  <Button style={style} textStyle={mainTextStyle} handleClick={() => setDisplayAnimation(!displayAnimation)}>
                    {displayAnimation ? 'Hide' : 'Display'} {style === 'TTPD' ? 'papers' : 'stars'}
                  </Button>
                </div>
              </div>
              <div className="flex flex-col items-center w-full">
                <span className={`${style === 'TTPD' ? `${sourceCodePro.className} mb-2` : `tloas-font ${mainTextStyle} mb-1`} uppercase text-sm`}>
                  Download
                </span>
                <div className={`flex grid ${downloading ? 'grid-cols-1' : 'grid-cols-2'} gap-2 w-full`}>
                  {downloading ? (
                    <Button disabled style={style} textStyle={mainTextStyle} handleClick={() => { }}>
                      Downloading...
                    </Button>
                  ) : (
                    <>
                      <Button disabled={downloading} style={style} textStyle={mainTextStyle} handleClick={() => handleDownload('square')}>
                        {downloading ? "Downloading..." : "Square (1:1)"}
                      </Button>
                      <Button disabled={downloading} style={style} textStyle={mainTextStyle} handleClick={() => handleDownload('story')}>
                        {downloading ? "Downloading..." : "Story (9:16)"}
                      </Button>
                    </>
                  )}
                </div>
              </div>

              <SocialMediaShareButton displayElements={displayAnimation} style={style} textStyle={mainTextStyle} cardRef={cardRef} storyCardRef={storyCardRef} />

              <hr className="my-4 opacity-50" />

              <div className="flex flex-col items-center w-full">
                <span className={`${style === 'TTPD' ? `${sourceCodePro.className} mb-2` : `tloas-font ${mainTextStyle} mb-1`} uppercase text-sm`}>
                  Follow me on social media for more like this!
                </span>

                <div className={`flex grid grid-cols-2 gap-2 w-full`}>
                  <div className={style === 'TLOAS' ? "tloas-border p-1 w-full" : "w-full"}>
                    <a
                      href="https://instagram.com/jrobsonjr"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`block text-center w-full py-1 px-4 m:px-10 ${style === 'TTPD' ? 'ttpd-button ttpd-border' : 'tloas-button'} ${mainTextStyle} w-full uppercase sm:text-xl cursor-pointer`}>
                      Instagram
                    </a>
                  </div>

                  <div className={style === 'TLOAS' ? "tloas-border p-1 w-full" : "w-full"}>
                    <a
                      href="https://tiktok.com/@jrobsonjr"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`block text-center w-full py-1 px-4 m:px-10 ${style === 'TTPD' ? 'ttpd-button ttpd-border' : 'tloas-button'} ${mainTextStyle} w-full uppercase sm:text-xl cursor-pointer`}>
                      TikTok
                    </a>
                  </div>
                </div>
              </div>

              <hr className="my-4 opacity-50" />

              <div className="flex flex-col items-center w-full">
                <span className={`${style === 'TTPD' ? `${sourceCodePro.className} mb-2` : `tloas-font ${mainTextStyle} mb-1`} uppercase text-sm`}>
                  Enjoyed this experience?
                </span>
                <div className={style === 'TLOAS' ? "tloas-border p-1 w-full" : "w-full"}>
                  <a
                    href="https://ko-fi.com/jrobsonjr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block text-center w-full py-1 px-4 m:px-10 ${style === 'TTPD' ? 'ttpd-button ttpd-border' : 'tloas-button'} ${mainTextStyle} w-full uppercase sm:text-xl cursor-pointer`}>
                    Buy me a coffee on Ko-Fi
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className={`${style === 'TLOAS' ? 'tloas-card-border p-4' : 'ttpd-style mt-4'} relative w-fit mx-2 mb-8`}>
            <div className={`flex flex-col items-center justify-center ${style === "TLOAS" ? 'tloas-style' : 'ttpd-card-border'}`}>
              <div className="flex flex-col gap-1 px-8 py-4">
                <span className={`mb-2 text-3xl text-center lg:text-5xl ${mainTextStyle} ${style === 'TLOAS' ? 'tloas-text-mask tloas-font' : 'font-bold'}`}>Credits</span>
                <ul className="ml-4">
                  <li className={style === 'TTPD' ? sourceCodePro.className : mainTextStyle}>Developed and designed by <b>JRobsonJr</b> (@SoftCircuits on X/Twitter)</li>
                  <li className={style === 'TTPD' ? sourceCodePro.className : mainTextStyle}>Inspired by a social media trend</li>
                  <li className={style === 'TTPD' ? sourceCodePro.className : mainTextStyle}>Song titles, album titles, and covers by Taylor Swift</li>
                  <li className={style === 'TTPD' ? sourceCodePro.className : mainTextStyle}>Icons from FontAwesome</li>
                  <li className={style === 'TTPD' ? sourceCodePro.className : mainTextStyle}>Floating papers inspired by Pixpine Mockups</li>
                  <li className={style === 'TTPD' ? sourceCodePro.className : mainTextStyle}>Floating star outlines from SVG Repo</li>
                  <li className={style === 'TTPD' ? sourceCodePro.className : mainTextStyle}>Glitter texture by Pierre Bamin (Unsplash)</li>
                  <li className={style === 'TTPD' ? sourceCodePro.className : mainTextStyle}>Paper texture by Konstantin Ivanov (Transparent Textures)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div >
  );
}
