"use client"
import {useState, useEffect} from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'


const PromptCard = ({post, handleTagClick, handleEdit, handleDelete}) => {
  // console.log(post)
  const {data: session} = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [copied, setCopied] = useState('')

  const handleCopy = () => {
    console.log("first")
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(""), 3000);
  } 
  return (
    <div className='prompt_card'>
      <div className="flex justify-between items-start gap-5">
        <div className='flex-1 flex justigy-start items-center gap-3 cursor-pointer'>
          <Image src={post.creator.image}
          alt='User_image'
          width={40}
          height={40}
          className="rounded-full object-contain"
          />
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">{post.creator.username}</h3>
            <p className="font-inter text-sm text-gray-500">{post.creator.email}</p>
          </div>
        </div>
        <div className="copy_btn" onClick={()=>handleCopy()}> 
          <Image 
          src={copied === post.prompt
            ? '/assets/icons/tick.svg'
            : '/assets/icons/copy.svg'}
            alt='Copy'
          width={12}
          height={12}
          />
        </div>
      </div>
      <p className="mt-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      <p className="font-inter text-sm blue_gradient cursor-pointer"
      onClick={() => handleTagClick && handleTagClick(post.tag)}>{post.tag}</p>

      {session?.user.id === post.creator._id &&
      pathname === '/profile' && (
        <div className='mt-5 flex-center gap-4 border-t border-gray-100 pt-3'>
          <p className="font-inter text-sm green_gradient cursor-pointer" onClick={handleEdit}>Edit</p>
          <p className="font-inter text-sm orange_gradient cursor-pointer" onClick={handleDelete}>Delete</p>
        </div>
      )}
    </div>
  )
}

export default PromptCard