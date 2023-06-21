import React, { useState } from "react";
import { useParams } from "react-router-dom";
import CommentServices from "../services/comment.service";

const AddCommentForm = () => {
  const initialFormState = { gameId: "", leagues: "", body: "" };
  const [comment, setComment] = useState(initialFormState);
  const { matchIds } = useParams();
  const { user } = useParams();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setComment({ ...comment, [name]: value });
  };

  const createComment = () => {
    try {
      CommentServices.createComment(comment)
      .then(() => {
        setComment(initialFormState);
        window.location.reload(false); 
      }) 
      .catch (error => {
        console.error('Une erreur s\'est produite lors de la création du commentaire :', error);
      });
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors de la création du commentaire:",
        error
      );
    }
  };

  


  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (!comment.body || !comment.leagues || !comment.gameId) return;
        createComment();
      }}
    >
      <label>
        <p>Commentaire : </p>
      </label>
      <textarea
        className="form-control"
        name="body"
        rows="3"
        value={comment.body}
        onChange={handleInputChange}
      ></textarea>

      <label htmlFor="password">
        <p>Nom utilisateur league : </p>
      </label>
      <input
        type="text"
        className="form-control"
        name="leagues"
        value={(comment.leagues = user)}
        onChange={handleInputChange}
      />
      <label>
        <p>Game ID : </p>
      </label>
      <input
        type="text"
        rows="3"
        className="form-control"
        name="gameId"
        value={(comment.gameId = matchIds)}
        onChange={handleInputChange}
      />
      <br></br>
      <button className="btn btn-outline-primary" >
        Ajouter un commentaire
      </button>
    </form>
  );
};

export default AddCommentForm;
