import React, { useMemo, useRef, useState } from 'react';
import ClassCounter from './components/ClassCounter';
import Counter from './components/Counter';
import Postitems from './components/Postitems';
import Postlist from './components/Postlist';
import MyButton from './components/UI/button/MyButton';
import MyInput from './components/UI/input/MyInput';
import './styles/App.css'
import PostForm from './components/PostForm';
import MySelect from './components/UI/select/MySelect';
import PostFilter from './components/PostFilter';
import MyModal from './components/UI/MyModel/MyModal';
import { usePosts } from './hooks/usePosts';
import axios from 'axios';
import { useEffect } from 'react';
import PostsService from './API/PostsService';
import Loader from './components/UI/loader/Loader';
import { useFetching } from './hooks/useFetching';
import { getPageCount } from './utils/pages';


function App() {
  const [posts, setPosts] = useState([])
  const [filter, setFilter] = useState({ sort: '', query: '' })
  const [modal, setModal] = useState(false)
  const [totalPages, setTotalPages] = useState(0)
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)

  let pagesArray = []
  for (let i = 0; i < totalPages; i++) {
    pagesArray.push(i + 1)

  }
  console.log([pagesArray]);
  const [fetchPosts, isPostsLoding, postEror] = useFetching(async () => {
    const response = await PostsService.getAll(limit, page)
    setPosts(response.data)
    const totalCount = (response.headers['x-total-count']);
    setTotalPages(getPageCount(totalCount, limit))
  })


  useEffect(() => {
    fetchPosts()
  }, [])

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
    setModal(false)
  }

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }


  return (
    <div className="App">

      <MyButton onClick={() => setModal(true)}>
        Создать пользователя
      </MyButton>
      <MyModal
        visible={modal}
        setVisible={setModal}
      >
        <PostForm create={createPost} />
      </MyModal>

      <hr style={{ margin: '15px 0' }} />
      <PostFilter
        filter={filter}
        setFilter={setFilter}
      />
      {postEror &&
        <h1>Произошло ошибка ${postEror}</h1>
      }
      {isPostsLoding
        ? <div style={{ display: 'flex', justifyContent: "center" }}><Loader /></div>
        : <Postlist remove={removePost} posts={sortedAndSearchedPosts} title="Посты про JS" />
      }

    </div>
  );
}

export default App;
