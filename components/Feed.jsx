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
          <PromptCard key={post._id} post={post} handleTagClick={handleTagClick}/>
        ))
      }
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);

  const handleSearchChange = (e) => {

  }

  useEffect(() => {
    const fetchPost = async() => {
      const res = await fetch('/api/prompt');
      const data = await res.json();
      setPosts(data);
    }

    fetchPost();
  }, [])
  return (
    <section className='feed'>
      <form className="relative w-full flex-center">
        <input type="text" className="search_input peer"
        placeholder='Search for a tag or a username'
        value={searchText}
        onChange={handleSearchChange} />
      </form>

      <PromptCardList
      data={posts}
      handleTagClick = {() => {}}
      />
    </section>
  )
}

export default Feed