import { connectToDB } from "@utils/database";
import Prompt from "@models/Prompt";

// GET
export const GET = async(req, {params}) => {
    try{
        await connectToDB();
        const prompt = await Prompt.findById(params.id);
        if(!prompt) return new Response("Prompt Not found", {status: 404})
        return new Response(JSON.stringify(prompt), {status: 200})
    }catch(err){
        return new Response (err, {status: 500})
    }
}

// PATCH
export const PATCH = async(req, {params}) => {
    const {prompt, tag} = await req.json();

    try{
        await connectToDB();

        const Eprompt = await Prompt.findById(params.id);

        if(!Eprompt) return new Response("Prompt Not found");
        if(tag) Eprompt.tag = tag;
        if(prompt) Eprompt.prompt = prompt;

        await Eprompt.save();

        return new Response(JSON.stringify(Eprompt), {status: 200})
    }catch(err){
        return new Response("Failed to update", {status: 500})
    }
}

// DELETE
export const DELETE = async(req, {params}) => {
    try{
        await connectToDB();
        const Eprompt = await Prompt.findByIdAndDelete(params.id);
        return new Response(JSON.stringify(Eprompt), {status: 200})
        }catch(err){
            return new Response("Failed to delete", {status: 500})
        }
    }