"use client"

import React, { useEffect, useState, useRef } from 'react'
import { colord } from 'colord';
import Image from 'next/image';

export default function PlayListHeader({ cover, name }: { cover: string | undefined, name: string }) {
     const [rgbToHex, setRgbToHex] = useState("#000000");
     const canvasRef = useRef<HTMLCanvasElement>(null)
     useEffect(() => {
          if (canvasRef.current) {
               const ctx = canvasRef.current.getContext('2d');// Get a 2-D reference to the cannabis
               if (ctx && cover) {
                    const nativeImage = new window.Image();
                    nativeImage.crossOrigin = 'anonymous'; // This tells the browser to make a cross-origin request
                    nativeImage.src = cover;
                    nativeImage.onload = () => {


                         ctx.drawImage(nativeImage, 30, 0)
                         // get the original image dimensions from the original image
                         const imageData = ctx.getImageData(0, 0, nativeImage.width, nativeImage.height);
                         const data = imageData.data;
                         if (data) {
                              let redSum = 0, greenSum = 0, blueSum = 0;
                              const pixelCount = data.length / 4; // Each pixel has 4 values (R, G, B, A)

                              // Loop through every pixel (4 values per pixel: R, G, B, A)
                              for (let i = 0; i < data.length; i += 4) {
                                   redSum += data[i];     // Red
                                   greenSum += data[i + 1]; // Green
                                   blueSum += data[i + 2];  // Blue
                              }
                              // Calculate the average for each color channel
                              const r = (Math.floor(redSum / pixelCount));
                              const g = (Math.floor(greenSum / pixelCount));
                              const b = (Math.floor(blueSum / pixelCount));
                              // Use Colord to handle color conversions
                              const color = colord({ r, g, b });
                              const hslColor = color.toHsl();
                              const adjustedColor = colord({
                                   h: hslColor.h,
                                   s: hslColor.s + 0.1,
                                   l: hslColor.l - 0.15,
                              }).toHex();

                              setRgbToHex(adjustedColor);

                         }
                    }
                    nativeImage.onerror = (e) => {
                         console.error('Failed to load image', e);
                    }

               }
          }
     }, [canvasRef, cover])

     return (
          <div className=' relative flex flex-row h-[275px] overflow-hidden bg-red-100'>
               {/* Image blur */}
               <div className='z-40 backdrop-blur-xl    absolute  w-full h-full  '>


               </div>
               <div className='z-30  absolute flex overflow-hidden  w-full h-full  '>
                    <canvas className=' flex-1 ' ref={canvasRef}>

                    </canvas>

               </div>

               {/* Album name and artist */}

               <div className=' z-50  absolute flex flex-row items-center gap-2 top-[20%] left-[1%]'>
                    <div className=' flex h-44 w-44 rounded-sm overflow-clip'>

                         {cover && <Image
                              className="object-cover w-full h-full "
                              src={cover}
                              alt="Album Cover"
                              width={300}
                              height={300}
                         />}

                    </div>
                    <h1 style={{ color: rgbToHex }} className={` text-5xl  font-semibold`}>{name}</h1>
               </div>




          </div>
     )
}
