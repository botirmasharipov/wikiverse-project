import React, { useState } from "react"
import apiURL from "../api"


export const Page = (props) => {
  const [people, setPeople] = useState("")

  const handleClick = async () => {
    // single article page
    const res = await fetch(`${apiURL}/wiki/${props.page.slug}`)
    const data = await res.json()
    console.log(data)
    setPeople(data)
  }

  async function fetchPages() {
    try {
      const response = await fetch(`${apiURL}/wiki`)
      const pagesData = await response.json()
      setPages(pagesData)
    } catch (err) {
      console.log("Oh no an error! ", err)
    }
  }


  return (
    <>
      <h3 onClick={handleClick}>{props.page.title}</h3>
      <p>
        Author: {people ? (people.author.name) : ""}
      </p>
      <p>
        <strong>Published:</strong> {people ? people.author.createdAt : ""}
      </p>
      {people.content}
      <p>
        <strong>Tags:</strong>
      </p>
      {people ?
        people.tags.map((tag, index) => <p key={index}>{tag.name}</p>) : ""}

      <button onClick={fetchPages}>Back to Wiki List</button>
    </>
  )
}
