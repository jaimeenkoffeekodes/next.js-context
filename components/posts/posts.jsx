'use client'
import React, { useState } from 'react'
import { useContext } from "react";

import { PostContext } from '@/context/PostContext';
import styles from './posts.module.css';
import { TodoContext } from '@/context/TodoContext';


const Posts = () => {
  const { posts, addPost, editPost, deletePost } = useContext(PostContext);
  const { todos, addTodo, editTodo, deleteTodo } = useContext(TodoContext);

  const [name, setname] = useState("");
  const [todoDes, setTodoDes] = useState("");
  const [todoID, settodoID] = useState(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [postId, setPostId] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  const handleAddTodo = (e) => {
    e.preventDefault();

    if (!name && !description) return;

    const newPost = {
      id: Date.now(),
      name,
      description,
    };
    addTodo(newPost);

    setname('');
    setTodoDes('');
  };

  const handleRemoveTodo = (postId) => {
    deleteTodo(postId);
  };

  const EditTodo = (postId) => {
    const post = todos.filter((post) => post.id === postId)[0];
    setname(post.title);
    setTodoDes(post.description);
    settodoID(postId);
    setIsEdit(true);
  };

  const handleEditTodo = (e) => {
    e.preventDefault();

    if (!name && !description) return;

    const updatedPost = {
      id: todoID,
      title,
      description,
    };

    editTodo(updatedPost.id, updatedPost);

    setname('');
    setTodoDes('');
    setIsEdit(false);
  };

  const handleAddPost = (e) => {
    e.preventDefault();

    if (!title && !description) return;

    const newPost = {
      id: Date.now(),
      title,
      description,
    };
    addPost(newPost);

    setTitle('');
    setDescription('');
  };

  const handleRemovePost = (postId) => {
    deletePost(postId);
  };

  const EditAPost = (postId) => {
    const post = posts.filter((post) => post.id === postId)[0];
    setTitle(post.title);
    setDescription(post.description);
    setPostId(postId);
    setIsEdit(true);
  };

  const handleEditPost = (e) => {
    e.preventDefault();

    if (!title && !description) return;

    const updatedPost = {
      id: postId,
      title,
      description,
    };

    editPost(updatedPost.id, updatedPost);

    setTitle('');
    setDescription('');
    setIsEdit(false);
  };

  return (<>

    <div className={styles.container}>
      <form className={styles.form}>
        <input
          type="text"
          className={styles.input}
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          className={styles.input}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <button className={styles.button} onClick={isEdit ? handleEditPost : handleAddPost}>
          {isEdit ? "Edit Post" : "Add New Post"}
        </button>
      </form>
      <h1 className={styles.heading}>Posts</h1>
      {posts ? (
        posts.map((post) => (
          <div key={post.id} className={styles.post}>
            <h3 className={styles.title}>{post.title}</h3>
            <p className={styles.description}>{post.description}</p>
            <button
              className={styles.editButton}
              onClick={() => EditAPost(post.id)}
            >
              Edit
            </button>
            <button
              className={styles.deleteButton}
              onClick={() => handleRemovePost(post.id)}
            >
              Delete
            </button>
          </div>
        ))
      ) : (
        <p>No posts found.</p>
      )}
    </div>

    {/* todos */}
    <div className={styles.container}>
      <form className={styles.form}>
        <input
          type="text"
          className={styles.input}
          placeholder="Title"
          value={name}
          onChange={(e) => setname(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={todoDes}
          className={styles.input}
          onChange={(e) => setTodoDes(e.target.value)}
        ></textarea>
        <button className={styles.button} onClick={isEdit ? handleEditTodo : handleAddTodo}>
          {isEdit ? "Edit Post" : "Add New Post"}
        </button>
      </form>
      <h1 className={styles.heading}>Posts</h1>
      {todos ? (
        todos.map((post) => (
          <div key={post.id} className={styles.post}>
            <h3 className={styles.title}>{post.name}</h3>
            <p className={styles.description}>{post.description}</p>
            <button
              className={styles.editButton}
              onClick={() => EditTodo(post.id)}
            >
              Edit
            </button>
            <button
              className={styles.deleteButton}
              onClick={() => handleRemoveTodo(post.id)}
            >
              Delete
            </button>
          </div>
        ))
      ) : (
        <p>No posts found.</p>
      )}
    </div>
  </>
  )
}

export default Posts