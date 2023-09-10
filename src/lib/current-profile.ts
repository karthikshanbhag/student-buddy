import {auth} from '@clerk/nextjs'
import { db } from '@/lib/db'

export const currentProfile = async ()=>{
    const {userId} = auth();
    console.log("[currentProfile]",userId);
    if(userId===undefined || userId===null || userId===""){
        return null;
    }

    const profile = await db.profile.findUnique({
        where: {userId: userId}
    })
    return profile;
}