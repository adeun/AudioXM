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
     <Activity key={1} />, <Airplay key={2} />, <AlertCircle key={3} />, <Anchor key={4} />, <Aperture key={5} />, <Archive key={6} />,
     <ArrowDownCircle key={7} />, <ArrowUpCircle key={8} />, <Award key={9} />, <BarChart2 key={10} />, <BatteryCharging key={11} />, <Bell key={12} />,
     <Bluetooth key={13} />, <Book key={14} />, <Bookmark key={15} />, <Box key={16} />, <Briefcase key={17} />, <Calendar key={18} />, <Camera key={19} />,
     <Cast key={20} />, <CheckCircle key={21} />, <ChevronDown key={22} />, <ChevronUp key={23} />, <Circle key={24} />, <Clipboard key={25} />,
     <Cloud key={26} />, <Code key={27} />, <Coffee key={28} />, <Columns key={29} />, <Command key={30} />, <Compass key={31} />,
     <Copy key={32} />, <CornerDownRight key={33} />, <CreditCard key={34} />, <Crop key={35} />, <Crosshair key={36} />, <Database key={37} />,
     <Disc key={38} />, <DivideCircle key={39} />, <DollarSign key={40} />, <Download key={41} />, <Droplet key={42} />, <Edit key={43} />,
     <ExternalLink key={44} />, <Eye key={45} />, <FastForward key={46} />, <Feather key={47} />, <File key={48} />, <Film key={49} />,
     <Flag key={50} />, <Folder key={51} />, <Framer key={52} />, <Gift key={53} />, <Globe key={54} />, <Grid key={55} />,
     <HardDrive key={56} />, <Headphones key={57} />, <Heart key={58} />, <Home key={59} />, <Inbox key={61} />,
     <Info key={62} />, <Key key={63} />, <Layers key={64} />, <Layout key={65} />, <LifeBuoy key={66} />, <Link key={67} />,
     <Lock key={68} />, <LogIn key={69} />, <LogOut key={70} />, <Mail key={71} />, <Map key={72} />, <MapPin key={73} />,
     <Maximize key={74} />, <Meh key={75} />, <Menu key={76} />
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
