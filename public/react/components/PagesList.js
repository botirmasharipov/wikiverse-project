import React from "react"
import { Page } from "./Page"

export const PagesList = ({ pages, formData, setFormData, singlePageView }) => {
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
                formData={formData}
                setFormData={setFormData}
              />
            )
          )
        })
        : pages.map((page, index) => (
          <Page
            page={page}
            key={index}
            pages={pages}
            formData={formData}
            setFormData={setFormData}
          />
        ))}
    </>
  )
}
