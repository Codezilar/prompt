import React from 'react'
import Link from 'next/link'


const Form = ({ type, post, setPost, submitting, handleSubmit,
}) => {
  return (  
    <section className='w-full max-w-full flex-start flex-col'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>{type} Post</span>
      </h1>
      <p className='desc text-left max-w-md'>
        {type} and Share amazing promps with the world, and let your imaginationrun wild with any AI-powered platform.
      </p>
      <form className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism' onSubmit={handleSubmit} action="" method="post">
        <label>
          <span className='font-satoshi font-semibold text-base text-grey-700'>Your AI Prompt</span>
          <textarea name="" onChange={(e) => setPost({...post, prompt: e.target.value})} value={post.prompt} id="" placeholder='Write your prompt here...' required className='form_textarea resize-none'></textarea>
        </label>
        <label>
          <span className='font-satoshi font-semibold text-base text-grey-700'>
            Tag {' '}
            <span className='font-normal'>( #product, #webdevelopment, #idea )</span>
          </span>
          <input name="" onChange={(e) => setPost({...post, tag: e.target.value})} value={post.tag} id="" placeholder='#tag' required className='form_input resize-none' />
        </label>
        <div className="flex-end mx-3 mb-5 gap-4 ">
          <Link href={'/'} className='text-gray-500 text-sm'>
            Cancle
          </Link>
          <button type='submit' disabled={submitting} className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'>
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  )
}

export default Form