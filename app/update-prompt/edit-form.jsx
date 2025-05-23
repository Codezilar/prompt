"use client"

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import Form from '@components/Form'                     

const EditPrompt = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get('id')

  const [submitting, setsubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: '',
    tag: '',
  });
  useEffect(() =>{
    const getPromptDetails = async () =>{
        try {
            const response = await fetch(`/api/prompt/${promptId}`);
            const data = await response.json();
            setPost({
                prompt: data.prompt,
                tag: data.tag
            });
        } catch (error) {
            
        }
    }
    if(promptId) getPromptDetails()

  }, [promptId])

  const updatePrompt = async (e) => {
    e.preventDefault();
    setsubmitting(true);
    if(!promptId) return alert("Prompt ID nor found!")
    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        })
      })
      if(response.ok){
        router.push('/profile');
      }
    } catch (error) {
      console.log(error);
    } finally{
      setsubmitting(false)
    }
    
  }
  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  )
}

export default EditPrompt