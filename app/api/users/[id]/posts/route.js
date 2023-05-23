import { connectToDB } from "@utils/database";
import Prompt from "@models/Prompt";


export const GET = async(req, {params}) =>{
    try{
        await connectToDB();
        const prompts = await Prompt.find({creater: params.id}).populate('creator');
        return new Response(JSON.stringify(prompts), {status: 200})
    }catch(err){
        return new Response("Failed to fetch users post", {status: 500})
    }

}