const NewPost = ({ 
    handleSubmit, postTitle, setPostTitle, postBody, setPostBody }) => {

    return(
        <main className="NewPost">
            <h2>New Post</h2>
            <form className="newPostForm" onSubmit={handleSubmit}>
                <label htmlFor="postTitle">Title:</label>
                <input className="border-2" type="text"
                id="postTitle"
                required
                value={postTitle}
                onChange={(e) => setPostTitle(e.target.value)} />
                <label htmlFor="postBody">Post:</label>
                <textarea className="border-2" id="postBody"
                required
                value={postBody}
                onChange={(e) => setPostBody(e.target.value)}
                ></textarea>
                <button className="border-2 bg-gray-200 flex items-center justify-center" type="submit">
                    Submit
                </button>
            </form>
        </main>
    )
}

export default NewPost;