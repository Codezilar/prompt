'use client'
import { useState, useEffect } from "react"
import PromptCard from "./PromptCard"
const PromptCardList =  ({data, handleTagClick}) =>{
  return(
    <div className="mt-16 prompt_layout">
      {data.map((post, index) =>(
        <PromptCard key={index} post={post} handleTagClick={handleTagClick} />
      ))}
    </div>
  )
}
const Feed = () => {

  const [ searchText, setsearchText ] = useState("");
  const [ posts, setPosts ] = useState([]);
  const handleSearchChange = (e) =>{
    
  }
  
  useEffect(() =>{
    const fetchPosts = async () =>{
      const response = await fetch('/api/prompt');
      const data = await response.json();
      setPosts(data);
    }
    fetchPosts();
  }, []);
  return (
    <section>
      <form action="" className="relative w-full flex-center">
        <input type="text" placeholder="Search for a tag or name" value={searchText} onChange={handleSearchChange} required className="search_input peer" />
      </form>
      <PromptCardList data={posts} handleTagClick={() => {}} />
    </section>
  )
}

export default Feed