"use client"
import { useEffect, useState } from "react"
import Image from "next/image"
import { useSession } from "next-auth/react"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"


const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete}) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();
  const [copied, setcopied] = useState("")
  const handleCopy = () =>{
    setcopied(post.prompt)
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setcopied(""), 3000);
  }
  return (
    <div className='prompt_card'>
      <div className="flex justify-between gap-5 items-start">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Link href={`/profile/id=${post._id}`}>
            <Image src={post.creator.image} alt="user image" width={40} height={40} className="rounded-full object-contain" />
          </Link>
          <div className="fex fle-col">
            <h3 className="font-satoshi font-semibold text-gray-900 ">
              {post.creator.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {post.creator.email}
            </p>
          </div>
        </div>
        <div className="copy_btn" onClick={handleCopy}>
          <Image src={copied === post.prompt ? '/assets/icons/tick.svg' : '/assets/icons/copy.svg'} alt="copy" width={12} height={12} />
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      <p className="fonr-inter text-sm blue_gradient cursor-pointer" onClick={handleTagClick && handleTagClick(post.tag)}>{post.tag}</p>
      {session?.user.id === post.creator._id && pathName === "/profile" && (
        <div className='mt-5 flex-center gap-4 border-t border-gray-100 pt-3'>
          <p
            className='font-inter text-sm green_gradient cursor-pointer'
            onClick={handleEdit}
          >     
            Edit
          </p>
          <p
            className='font-inter text-sm orange_gradient cursor-pointer'
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  )
}

export default PromptCard