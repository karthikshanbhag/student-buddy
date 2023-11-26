import { db } from "@/lib/db";

export const getOrCreateConversion = async()=>{
    
}

const findConversation = async (memberOneId: string, memberTwoId: string) => {
    try {
        return await db.conversation.findFirst({
            where:{
                AND: [
                    { memberOneId:memberOneId },
                    { memberTwoId:memberTwoId }
                ] 
            },
            include:{
                memberOne:{
                    include:{
                        profile:true
                    }
                },
                memberTwo:{
                    include:{
                        profile:true
                    }
                }
            }
        })
    } catch (error) {
        return null;
    }
};

const createNewConversation = async(memberOneId: string, memberTwoId: string) => {
    try {
        return await db.conversation.create({
            data:{
                memberOneId:memberOneId,
                memberTwoId:memberTwoId
            },
            include:{
                memberOne:{
                    include:{
                        profile:true
                    }
                },
                memberTwo:{
                    include:{
                        profile:true
                    }
                }
            }
        })
    } catch (error) {
        return null;
    }
}   