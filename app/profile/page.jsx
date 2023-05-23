"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from 'next/navigation'
import Profile from "@components/Profile"

const MyProfile = () => {
    const {data: session} = useSession();
    const [posts, setPosts] = useState([]);
    const router = useRouter();

    useEffect(()=>{
        const fetchPost = async() =>{
            const res = await fetch(`/api/users/${session?.user.id}/posts`);
            const data = await res.json();
            setPosts(data);
        }
        // console.log(session?.user.id) 
        if(session?.user.id) fetchPost();
    }, []);

    const handleEdit = (post) => {
        // console.log("id-- ", post._id)
        router.push(`/update-prompt?id=${post._id}`);
    }
    const hendleDelete = async(post) =>{
        const hasConfirmed = confirm("Are you sure to delete this post");

        if(hasConfirmed){
            try{
                await fetch(`/api/prompt/${post._id.toString()}`, {method: 'DELETE'})

                const filteredPosts = posts.filter((p) => p._id !== post._id);
                setPosts(filteredPosts);
            }catch(err){
                console.log(err);
            }
        }
    }
  return (
    <Profile 
        name="my"
        desc="Welcome to your personalized profile page"
        data = {posts}
        handleEdit={handleEdit}
        handleDelete={hendleDelete}
    />
  )
}

export default MyProfile