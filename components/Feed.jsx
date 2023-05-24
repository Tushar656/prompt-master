"use client"
import { useState, useEffect } from 'react'
import PromptCard from './PromptCard'
import React from 'react'

const PromptCardList = ({data, handleTagClick}) => {
  // console.log(data)
  return (
    <div className="mt-16 prompt_layout">
      {
        data.map((post) => (
          <PromptCard key={post._id} post={post} handleTagClick={() => handleTagClick(post)}/>
        ))
      }
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);
  const [searchPosts, setSearchPosts] = useState([]);

  useEffect(() => {
    const fetchPost = async() => {
      const res = await fetch('/api/prompt');
      const data = await res.json();
      setPosts(data);
    }

    fetchPost();
  }, [])

  useEffect(()=>{
    // console.log(posts)
    setSearchPosts(posts);
    setSearchText('');
  }, [posts])


  useEffect(()=>{
    // console.log(searchText)
    if(searchText.length > 0){
      const filteredPosts = posts.filter((post) => {
        return post.prompt.toLowerCase().includes(searchText.toLowerCase())
                || post.creator.username.toLowerCase().includes(searchText.toLowerCase())
                || post.tag.toLowerCase().includes(searchText.toLowerCase())
      })
      setSearchPosts(filteredPosts);
    }else{
      setSearchPosts(posts);
    }
  }, [searchText])
  return (
    <section className='feed'>
      <form className="relative w-full flex-center">
        <input type="text" className="search_input peer"
        placeholder='Search for a tag or a username'
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)} />
      </form>

      <PromptCardList
      data={searchPosts}
      handleTagClick = {(post) => {setSearchText(post.tag)}}
      />
    </section>
  )
}

export default Feed