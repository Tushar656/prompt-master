"use client"
import {useEffect, useState} from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import Form from '@components/Form'

const UpdatePrompt = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const promptId = searchParams.get('id');
    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: '',
        tag: '',
    })

    useEffect(()=>{
        // console.log(promptId)
        const getPrompt = async() =>{
            const res = await fetch(`/api/prompt/${promptId}`)
            const data = await res.json();
            // console.log(data)
            setPost({
                prompt: data.prompt,
                tag: data.tag
            })
        }
        if(promptId) getPrompt();
    }, [promptId])

    const EditPrompt = async(e) => {
        e.preventDefault();
        setSubmitting(true);
        // console.log(post)
        if(!promptId) return alert('Prompt Id not found');
        try{
            const res = await fetch(`/api/prompt/${promptId}`,
            {
                method: 'PATCH',
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag
                })
            })
            if(res.ok){
                router.push('/')
            }
        }catch(err){
            console.log("Errrrrrrrrr", err)
        } finally{
            setSubmitting(false)
        }
    }
  return (
    <Form
    type="Edit"
    post={post}
    setPost={setPost}
    submitting={submitting}
    handleSubmit={EditPrompt}
    />
  )
}

export default UpdatePrompt