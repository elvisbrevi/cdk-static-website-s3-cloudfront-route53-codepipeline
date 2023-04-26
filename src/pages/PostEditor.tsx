import React, { useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import ApiCall from '../components/ApiCall/ApiCall';
import { Navigate } from 'react-router-dom';

const PostEditor: React.FC = () => {

  console.log(localStorage.getItem('token'));
  if (localStorage.getItem('token') == '' || 
      localStorage.getItem('token') == null || 
      localStorage.getItem('token') == undefined) {
    return <Navigate to="/login" replace={true} />;
  }

  useEffect(() => {
    const handler = (e:any) => {
      if (e.target.closest(".tox-tinymce-aux, .moxman-window, .tam-assetmanager-root") !== null) {
        e.stopImmediatePropagation();
      }
    };
    document.addEventListener("focusin", handler);
    return () => document.removeEventListener("focusin", handler);
  }, []);

  return (
      <div className="post-editor-container">
          <h1 className="post-editor">Post Title:</h1>
          <input className="post-editor" type="text" />
          <Editor
            tinymceScriptSrc="https://cdn.tiny.cloud/1/a0yvsscea1edxhxayp09gfv025kdjav8p1jszkia5thzsq7q/tinymce/6/tinymce.min.js"
            init={{
              plugins: [
              'lists link image paste help wordcount'
              ],
              toolbar: 'undo redo | formatselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | help'
            }}
          />
          <ApiCall 
            url="https://blogapi.elvisbrevi.com/posts?limit=100" 
            method="GET" 
            data={{ title: 'test', content: 'test', date: '01-01-01' }} 
            render={({ response, error, loading, callApi }) => {
              if (loading) {
                return <p>Loading...</p>;
              }
              if (error) {
                return <p>{error.message}</p>;
              }
              if (response) {
                return <p>Response data: {response.data}</p>;
              }
              return <button onClick={callApi}>Call API</button>;
          }} />
      </div>
  );
};

export default PostEditor;


