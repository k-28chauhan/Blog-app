import { useParams,Links } from "react-router-dom";
import { useEffect } from "react";

const Edit = ({
    posts, handleEdit, editTitle, setEditTitle, editBody, setEditBody
}) =>{
    const { id } = useParams();
    const post = posts.find(post => post.id == id);

    useEffect(() => {
        if(post){
            setEditTitle(post.title);
            setEditBody(post.body);
        }
    }, [post, setEditBody, setEditTitle]);

    return(
        <main className="NewPost">
            <h2>Edit Post</h2>
            <form className="newPostForm" onSubmit={(e) => e.preventDefault()}>
                <label htmlFor="editTitle">Title:</label>
                <input className="border-2" type="text"
                    id="postTitle"
                    required
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)} />
                <label htmlFor="postBody">Post:</label>
                <textarea className="border-2" id="postBody"
                    required
                    value={editBody}
                    onChange={(e) => setEditBody(e.target.value)}
                ></textarea>
                <button className="border-2 bg-gray-200 flex items-center justify-center" type="submit"
                onClick={() => handleEdit(post.id)}>
                    Submit
                </button>
            </form>
        </main>
    )
}

export default Edit;