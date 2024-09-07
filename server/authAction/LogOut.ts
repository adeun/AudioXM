"use server";

import prisma from "../db";
import { signOut } from "../auth";

export default async function LogOut() {
     await signOut()
}