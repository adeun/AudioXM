// API route in the App Directory with TypeScript
// Path: app/api//route.ts
import { auth } from '@/server/auth';
import prisma from '@/server/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
     try {
          // Fetching data (if applicable)
          const Session = await auth()
          if (!Session) {
               return NextResponse.json({ error: 'Not authenticated' }, { status: 500 });
          }
          const playList = await prisma.playList.findMany({
               where: {
                    userID: Session.user.id
               },
               select: {
                    id: true,
                    name: true,
                    file: {
                         select: {
                              id: true,
                              name: true,
                              imageUrl: true,

                         }
                    }

               },
          })
          return NextResponse.json({ data:playList }, { status: 200 });



     } catch (error) {
          console.error('Error fetching data:', error);
          return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
     }
}

// Type-safe example of a fetch function
