"use client"
import React, { useState } from 'react'
import { Button } from './ui/button'
import { Calendar } from "@/components/ui/calendar"
import {
     Select,
     SelectContent,
     SelectItem,
     SelectTrigger,
     SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"
import { Input } from './ui/input'
import { ModeToggle } from './darkMode'



export default function Test() {
     const [date, setDate] = React.useState<Date | undefined>(new Date())

     return (
          <>
               <Button className=' w-40'> open</Button>
               <Button className=' w-40' onClick={() => setDate(new Date())}> reset</Button>
               <Button variant={"destructive"} className=' w-40'> destructive</Button>
               <Button variant={"ghost"} className=' w-40'> ghost</Button>
               <Button variant={"link"} className=' w-40'> link</Button>
               <Button variant={"outline"} className=' w-40'> outline</Button>
               <Button variant={'secondary'} className=' w-40'> secondary</Button>
               <ModeToggle/>



               <Input  className=' w-40'/>
               <Calendar
               
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border w-64"
               />
               <Select>
                    <SelectTrigger className="w-[180px]">
                         <SelectValue placeholder="Theme" />
                    </SelectTrigger>
                    <SelectContent>
                         <SelectItem value="light">Light</SelectItem>
                         <SelectItem value="dark">Dark</SelectItem>
                         <SelectItem value="system">System</SelectItem>
                    </SelectContent>
               </Select>
               <Slider className=' w-[800px]' defaultValue={[33]} max={100} step={5} />
               <Textarea className=' w-40' value="Textarea" />



          </>
     )
}
