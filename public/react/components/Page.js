import React, { useEffect } from "react"
import apiURL from "../api"


export const Page = ({
  page,
  singlePageView,
  setSinglePageView,
  author,
  setAuthor,
  setCurrentArticle,
  wikiTags,
  setWikiTags,
}) => {

  const fetchTags = async () => {
    try {
      // single article page
      const res = await fetch(`${apiURL}/wiki/${page.slug}`)
      const data = await res.json()
      setWikiTags(data.tags)
      setAuthor(data.author)
      setCurrentArticle(data.slug)
      console.log(data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchTags()
  }, [])

  const showSinglePageView = () => {
    fetchTags()
    setSinglePageView(!singlePageView)
  }

  const handleBackButton = async () => {
    setSinglePageView(!singlePageView)
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
      {singlePageView ? (
        <>
          <h1>{page.title}</h1>
          <p>
            <strong>Author:</strong> {author.name}
          </p>
          <p>
            <strong>Published:</strong> {page.createdAt}
          </p>
          {page.content}
          <p>
            <strong>Tags:</strong>
          </p>
          {
            wikiTags.map((tag, index) => <p key={index}>{tag.name}</p>)
          }

          <button onClick={handleBackButton}>Back to Wiki List</button>
        </>

      ) : (<h3 onClick={showSinglePageView}>{page.title}</h3>)
      }


    </>
  )
}
