import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";
import AuthService from "../services/auth.service";
import EventBus from "../common/EventBus";
import CommentServices from "../services/comment.service";


const BoardAdmin = () => {
  const [content, setContent] = useState();
  const [comment, setComment] = useState();
  const [user, setUser] = useState();

  

  useEffect(() => {

    if(!comment) {
      let test = CommentServices.getAllComment()
      const promise1 = Promise.resolve(test);
      promise1.then((value) => {
        setComment(value.data.data);
      });
    }
    if(!user) {
      let test2 = AuthService.getAllUsers()
      const promise2 = Promise.resolve(test2);
      promise2.then((value) => {
        setUser(value.data);
        console.log(user);
      });
    }


  
    UserService.getAdminBoard().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  }, [comment,user]);


  return (
    <div className="profile">
 <div> </div>
 <div>{user ? user[1].username : "Aucun utilisateurs"}</div>
 <div>{comment ? comment[1].body : "Aucun utilisateurs"}</div>

 <div className="images">
      {user && user.map((u) => (
        <div className="image-type">{u.username}</div>
      ))}
    </div>

    <div className="images">
      {comment && comment.map((c) => (
        <div className="image-type">{c.body}</div>
      ))}
    </div>
  </div>
  );
};

export default BoardAdmin;
