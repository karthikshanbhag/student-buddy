import {v4 as uuidv4} from "uuid";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse,NextRequest } from "next/server";
import { MemberRole } from "@prisma/client";

export async function POST(req: NextRequest) {
  try {
    const { name, imageUrl } = await req.json();
    console.log("[SERVER_POST]", name, imageUrl);
    const profile = await currentProfile();
    console.log("[SERVER_POST]", profile);
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const server = await db.server.create({
      data: {
        profileId: profile.id,
        name,
        imageUrl,
        invideCode: uuidv4(),
        channels: {
          create: [
            {name:"general",profileId:profile.id},
          ]
        },
        members: {
          create: [
             {profileId:profile.id,role:MemberRole.ADMIN}
          ]
        }
      },
    });
    console.log("[SERVER_POST]", server);
    return NextResponse.json(server);
  } catch (error) {
    console.log("[SERVER_POST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
