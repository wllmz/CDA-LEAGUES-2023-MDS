import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";

const AddCommentForm = (props) => {
  const initialFormState = { gameId: '', leagues: '', body: '' };
  const [comment, setComment] = useState(initialFormState);
  const { matchIds } = useParams();
  const { user } = useParams();

  console.log(matchIds);

  const API_URL = "http://localhost:3000/api/comment";

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setComment({ ...comment, [name]: value });

  };

  const createComment = async () => {
    try {
      await axios.post(API_URL, comment);
      props.addComment(comment);
      setComment(initialFormState);
      
    } catch (error) {

      console.error('Une erreur s\'est produite lors de la création du commentaire:', error);
    }
  };

   
  function refreshPage() {
    window.location.reload(false);
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (!comment.body || !comment.leagues || !comment.gameId) return;
        createComment();
      }}
    >
      <label>Body</label>
      <input type="text" name="body" value={comment.body} onChange={handleInputChange} />
      <label>Leagues</label>
      <input type="text" name="leagues" value={comment.leagues = user} onChange={handleInputChange} />
      <label>Game ID</label>
      <input type="text" name="gameId" value={comment.gameId = matchIds} onChange={handleInputChange} />
      <button onClick={refreshPage}>Ajouter un commentaire</button>
    </form>
  );
};

export default AddCommentForm;
