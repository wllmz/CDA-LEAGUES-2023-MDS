import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const AddCommentForm = (props) => {
  const initialFormState = { gameId: "", leagues: "", body: "" };
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
      const user = JSON.parse(localStorage.getItem('user'));
      const token = user ? user.token : '';

      await axios.post(API_URL, comment, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });


      props.addComment(comment);
      setComment(initialFormState);
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors de la création du commentaire:",
        error
      );
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
      <button className="btn btn-outline-primary" onClick={refreshPage}>
        Ajouter un commentaire
      </button>
    </form>
  );
};

export default AddCommentForm;
