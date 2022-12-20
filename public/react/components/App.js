import React, { useState, useEffect } from "react"
import { PagesList } from "./PagesList"

// import and prepend the api url to any fetch calls
import apiURL from "../api"

export const App = () => {
	const [pages, setPages] = useState([])
	const [singlePageView, setSinglePageView] = useState(false)

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

	const handleSubmit = (e) => {
		e.preventDefault()
		setPages([...pages, formData])
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
