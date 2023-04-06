import { useState } from "react";
import React from "react";
import MyButton from "./UI/button/MyButton";
import MyInput from "./UI/input/MyInput";
const PostForm = ({ create }) => {
  const [post, setPost] = useState({
    title: "",
    body: "",
  });

  const addNewPOst = (e) => {
    e.preventDefault();

    const newPost = {
      ...post,
      id: Date.now(),
    };
    create(newPost);
    setPost({
      title: "",
      body: "",
    });
  };
  return (
    <form>
      <MyInput
        // Управляемый компонет
        value={post.title}
        onChange={(e) => setPost({ ...post, title: e.target.value })}
        type="text"
        placeholder="Название поста"
      />
      <MyInput
        // Неуправляемый компонет
        value={post.body}
        onChange={(e) => setPost({ ...post, body: e.target.value })}
        type="text"
        placeholder="Название поста"
      />
      <MyButton onClick={addNewPOst}>Создать пост</MyButton>
    </form>
  );
};

export default PostForm;
