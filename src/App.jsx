import Header from './Header';
import Nav from './Nav';
import PostPage from './PostPage';
import NewPost from './NewPost';
import Edit from './Edit';
import About from './About';
import Home from './Home';
import Missing from './Missing';
import Footer from './Footer';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import api from './api/posts';

function App() {

  const [posts, setPosts] = useState([])
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editBody, setEditBody] = useState('');
  const history = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try{
        const response = await api.get('/posts');
        setPosts(response.data);
      }
      catch(err){
        console.log(err.response.data);
        console.log(err.response.status);
      }
    }
    fetchPosts();
  }, [])

  useEffect(() => {
    const filteredResults = posts.filter(post => 
    ((post.body).toLowerCase()).includes(search.toLowerCase())
    || ((post.title).toLowerCase()).includes(search.toLowerCase()));
    setSearchResults(filteredResults.reverse());

  },[posts, search])

  const handleSubmit = async (e) =>{
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const newPost = {id, title: postTitle, datetime, body: postBody};
    try{
      const response = await api.post('/posts', newPost);
      const allPosts = [...posts, response.data];
      setPosts(allPosts);
      history('/');
      setPostTitle('');
      setPostBody('');
    }
    catch(err){
      console.log(err.message);
    }
  }

  const handleEdit = async (id) => {
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const updatedPost = {id, title: editTitle, datetime, body: editBody};
    try{
      const response = await api.put(`/posts/${id}`, updatedPost);
      setPosts(posts.map(post => post.id === id ? {...response.data} : post));
      setEditTitle('');
      setEditBody('');
      history('/');
    }
    catch(err){
      console.log(err.message);
    }
  }

  const handleDelete = async (id) => {
    try{
      await api.delete(`/posts/${id}`);
      const postsList = posts.filter(post => post.id !== id);
      setPosts(postsList);
      history('/');
    }
    catch(err){
      console.log(err.message);
    }
  }

  return (
    <div className='App'>
      <Header title={"Blog"} />
      <Nav search={search} setSearch={setSearch}/>
      <Routes>
        <Route path="/" element={<Home posts={searchResults}/>} />

        <Route path="/post" element={<NewPost 
            handleSubmit={handleSubmit}
            postTitle={postTitle} setPostTitle={setPostTitle}
            postBody={postBody} setPostBody={setPostBody}/>} />
        <Route path='/edit/:id' element={<Edit 
            handleEdit={handleEdit} posts={posts}
            editTitle={editTitle} setEditTitle={setEditTitle}
            editBody={editBody} setEditBody={setEditBody}/>} />

        <Route path="/post/:id" element={<PostPage 
            posts={posts} handleDelete={handleDelete}/>} />

        <Route path="/about" element={<About />} />
        <Route path="*" element={<Missing />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
