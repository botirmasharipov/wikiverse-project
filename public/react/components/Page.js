import React, { useState } from 'react'
import apiURL from '../api'

export const Page = (props) => {
  const [people, setPeople] = useState("")

  const handleClick = async () => {
    // single article page
    const res = await fetch(`${apiURL}/wiki/${props.page.slug}`)
    const data = await res.json()
    console.log(data)
    setPeople(data)
  }

  return <>
    <h3 onClick={handleClick}>{props.page.title}</h3>
    <p>{people ? people.author.name : ""}</p>
  </>
}
