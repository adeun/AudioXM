"use server";

import { z } from "zod";
import prisma from "../db";
import { AlbumUploadForm } from "@/lib/ZOD";

export default async function AddSong(data: z.infer<typeof AlbumUploadForm>) {
     console.log(data);
     
     
}