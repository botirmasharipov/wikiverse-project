import React from "react"
import { Page } from "./Page"

export const PagesList = ({ pages, setPages, singlePageView, setSinglePageView, author,
  setAuthor, currentArticle, setCurrentArticle, wikiTags, setWikiTags
}) => {
  return (
    <>
      {singlePageView
        ? pages.map((page, idx) => {
          return (
            page.slug == currentArticle && (
              <Page
                page={page}
                key={idx}
                pages={pages}
                setPages={setPages}
                singlePageView={singlePageView}
                setSinglePageView={setSinglePageView}
                author={author}
                setAuthor={setAuthor}
                setCurrentArticle={setCurrentArticle}
                wikiTags={wikiTags}
                setWikiTags={setWikiTags}
              />
            )
          )
        })
        : pages.map((page, index) => (
          <Page
            page={page}
            key={index}
            pages={pages}
            setPages={setPages}
            singlePageView={singlePageView}
            setSinglePageView={setSinglePageView}
            author={author}
            setAuthor={setAuthor}
            setCurrentArticle={setCurrentArticle}
            wikiTags={wikiTags}
            setWikiTags={setWikiTags}
          />
        ))}
    </>
  )
}
