"use client"
import React, { useState, useEffect } from 'react'
import {
     Activity, Airplay, AlertCircle, Anchor, Aperture, Archive,
     ArrowDownCircle, ArrowUpCircle, Award, BarChart2, BatteryCharging, Bell,
     Bluetooth, Book, Bookmark, Box, Briefcase, Calendar, Camera,
     Cast, CheckCircle, ChevronDown, ChevronUp, Circle, Clipboard,
     Cloud, Code, Coffee, Columns, Command, Compass,
     Copy, CornerDownRight, CreditCard, Crop, Crosshair, Database,
     Disc, DivideCircle, DollarSign, Download, Droplet, Edit,
     ExternalLink, Eye, FastForward, Feather, File, Film,
     Flag, Folder, Framer, Gift, Globe, Grid,
     HardDrive, Headphones, Heart, Home, Image, Inbox,
     Info, Key, Layers, Layout, LifeBuoy, Link,
     Lock, LogIn, LogOut, Mail, Map, MapPin,
     Maximize, Meh, Menu
} from "lucide-react";

const randomIconsArray = [
     <Activity />, <Airplay />, <AlertCircle />, <Anchor />, <Aperture />, <Archive />,
     <ArrowDownCircle />, <ArrowUpCircle />, <Award />, <BarChart2 />, <BatteryCharging />, <Bell />,
     <Bluetooth />, <Book />, <Bookmark />, <Box />, <Briefcase />, <Calendar />, <Camera />,
     <Cast />, <CheckCircle />, <ChevronDown />, <ChevronUp />, <Circle />, <Clipboard />,
     <Cloud />, <Code />, <Coffee />, <Columns />, <Command />, <Compass />,
     <Copy />, <CornerDownRight />, <CreditCard />, <Crop />, <Crosshair />, <Database />,
     <Disc />, <DivideCircle />, <DollarSign />, <Download />, <Droplet />, <Edit />,
     <ExternalLink />, <Eye />, <FastForward />, <Feather />, <File />, <Film />,
     <Flag />, <Folder />, <Framer />, <Gift />, <Globe />, <Grid />,
     <HardDrive />, <Headphones />, <Heart />, <Home />, <Image />, <Inbox />,
     <Info />, <Key />, <Layers />, <Layout />, <LifeBuoy />, <Link />,
     <Lock />, <LogIn />, <LogOut />, <Mail />, <Map />, <MapPin />,
     <Maximize />, <Meh />, <Menu />
];

type ICON = {
     icon: React.FunctionComponentElement<React.RefAttributes<SVGSVGElement>>;
     width: number;
     height: number;
     opacity: number;
     randomRotation: number;
     top: number;
     left: number;
     color: string
}
export default function BackIcon() {
     const [iconGenerate, setIconGenerate] = useState<ICON[] | []>([])
     const MaxNum = 30
     function generateRandomIcon():ICON {
          const randomIndex = Math.floor(Math.random() * randomIconsArray.length);
          const randomIcon = randomIconsArray[randomIndex];
          const randomWidth = Math.floor(Math.random() * 200) + 100;
          const randomHeight = randomWidth;
          const randomFill = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
          const randomRotation = Math.floor(Math.random() * 360);
          const randomOpacity = Math.random() * 0.60 + 0.2; 
          const randomTop = Math.floor(Math.random() * (window.innerHeight - randomHeight));
          const randomLeft = Math.floor(Math.random() * (window.innerWidth - randomWidth));

          return {
               icon: React.cloneElement(randomIcon, {
                      
                    width: randomWidth,
                    height: randomHeight,
                     
                }),
               width: randomWidth,
               height: randomHeight,
               opacity: randomOpacity,
               top: randomTop,
               left: randomLeft,
               randomRotation: randomRotation,
               color:randomFill

          }

     }
     useEffect(() => {
          const iconsArray: ICON[] = [];
        for (let i = 0; i < MaxNum; i++) {
            iconsArray.push(generateRandomIcon());
        }
        setIconGenerate(iconsArray);
     },[])

     

     return (
          <>
          {iconGenerate.map((icon, index) => (
               <div key={index} className={`absolute  `} 
               style={{
                    top: `${icon.top}px`,
                    left: `${icon.left}px`,
                    opacity: `${icon.opacity}`,
                    width: `${icon.width}px`,
                    height: `${icon.height}px`,
                    transform: `rotate(${icon.randomRotation}deg)`,
                    color: `${icon.color}`,
                    // transition: `all 0.5s ease-in-out`,

               }}>
                    {icon.icon}
               </div>
          ))}
              

          </>
     )
}
