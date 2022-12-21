import React, { useState, useEffect } from "react"
import { PagesList } from "./PagesList"

// import and prepend the api url to any fetch calls
import apiURL from "../api"

export const App = () => {
	const [pages, setPages] = useState([])
	const [singlePageView, setSinglePageView] = useState(false)
	const [author, setAuthor] = useState("")
	const [wikiTags, setWikiTags] = useState([])
	const [currentArticle, setCurrentArticle] = useState("")

	//   show a form
	const [isAddingArticle, setIsAddingArticle] = useState(false)
	const [formData, setFormData] = useState({
		title: "",
		content: "",
		author_name: "",
		author_email: "",
		tags: [],
	})

	const { title, content, author_name, author_email, tags } = formData

	const handleInputChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		const response = await fetch(`${apiURL}/wiki`, {
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(
				formData // our data TO CREATE here
			)
		})
		const data = await response.json()
		console.log(data, "data")
		// setPages([...pages, data])
		setFormData({
			title: "",
			content: "",
			author_name: "",
			author_email: "",
			tags: [],
		})

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

	useEffect(() => {
		fetchPages()
	}, [])

	const handleCreatePage = () => {
		setIsAddingArticle(true)
	}

	return (
		<main>
			<h1>WikiVerse</h1>
			<h2>An interesting 📚</h2>
			<PagesList
				pages={pages}
				formData={formData}
				setFormData={setFormData}
				singlePageView={singlePageView}
				setSinglePageView={setSinglePageView}
				author={author}
				setAuthor={setAuthor}
				currentArticle={currentArticle}
				setCurrentArticle={setCurrentArticle}
				wikiTags={wikiTags}
				setWikiTags={setWikiTags}
			/>

			<button onClick={handleCreatePage}>Create Page</button>

			{isAddingArticle && (
				<form onSubmit={handleSubmit}>
					<div className="form-group">
						<input
							type="text"
							name="title"
							placeholder="Title"
							className="form_input"
							value={title}
							onChange={handleInputChange}
						/>
						<input
							type="text"
							name="content"
							placeholder="Article Content"
							className="form_input"
							value={content}
							onChange={handleInputChange}
						/>
						<input
							type="text"
							name="author_name"
							placeholder="Author Name"
							className="form_input"
							value={author_name}
							onChange={handleInputChange}
						/>
						<input
							type="email"
							name="author_email"
							placeholder="Author Email"
							className="form_input"
							value={author_email}
							onChange={handleInputChange}
						/>
						<input
							type="text"
							name="tags"
							placeholder="Tags"
							className="form_input"
							value={tags}
							onChange={handleInputChange}
						/>

						<button type="submit" className="button">Create Page</button>
					</div>
				</form>
			)}
		</main>
	)
}
