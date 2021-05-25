import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const AlertCpt = ({ type, msg, removeAlert, List }) => {
  //danger for red
  //success for green
  useEffect(() => {
    const timeout = removeAlert();
    return () => clearTimeout(timeout);
  }, [List]);

  return <p className={`alert alert${type}`}>{msg}</p>;
};

const Review = ({ reviews, removeReview, editReview }) => {
  return (
    <div>
      {reviews.map((review) => {
        const { id, title, nickname } = review;
        // let half = Math.floor(nickname.length() / 2);
        // let theOtherHalf = nickname.length - half;
        {
          /* <p>{nickname.splice(0, half) + "*" * theOtherHalf}</p> */
        }
        return (
          <article key={id}>
            <p>{nickname}</p>
            <p>{title}</p>
            <div>
              <button type="button" onClick={() => editReview(id)}>
                <FaEdit />
              </button>
              <button type="button" onClick={() => removeReview(id)}>
                <FaTrash />
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export const Reviews = () => {
  const getLocalStorage = () => {
    let list = localStorage.getItem("List");
    if (list) {
      return JSON.parse(localStorage.getItem("List"));
    } else {
      return [];
    }
  };

  const [List, setList] = useState(getLocalStorage());

  useEffect(() => {
    localStorage.setItem("List", JSON.stringify(List));
  }, [List]);

  const [Name, setName] = useState("");
  const [NickName, setNickName] = useState("");
  const [Password, setPassword] = useState('');
  const [IsEditing, setIsEditing] = useState(false);
  const [EditId, setEditId] = useState(null);
  const [Alert, setAlert] = useState({ show: false, msg: "", type: "" });
  const [EditList, setEditList] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!Name) {
      showAlert(true, "please enter value", "danger");
    } else if (Name && IsEditing) {
      if (EditList.password === Password) {
        let newList = List.map((review) => {
          if (review.id === EditId) {
            return { ...review, title: Name };
          }
        });
        setList(newList);
        showAlert(true, "review has changed", "success");
      } else if (EditList !== Password) {
        showAlert(true, "fail to edit, check your passsword", "danger");
      }

      setName("");
      setNickName("");
      setPassword("");
      setEditId(null);
      setIsEditing(false);
    } else {
      showAlert(true, "thank you for your review", "success");

      const newReview = {
        id: new Date().getTime().toString(),
        title: Name,
        nickname: NickName,
        password: Password,
      };
      setList([...List, newReview]);
      setName("");
      setPassword("");
      setNickName("");
    }
  };

  const showAlert = (show = false, msg = "", type = "") => {
    setAlert({ show, msg, type });
  };

  const removeAlert = () => setTimeout(() => showAlert(false, "", ""), 3000);

  const removeReview = (id) => {
    showAlert(true, "successfully removed the review", "danger");
    setList(List.filter((review) => review.id !== id));
  };

  const editReview = (id) => {
    const specificReview = List.find((i) => i.id === id);
    setIsEditing(true);
    setEditId(id);
    setEditList(specificReview);
    setName(specificReview.title);
    setNickName(specificReview.nickname);
  };

  return (
    <section>
      <div>
        <form onSubmit={handleSubmit}>
          {Alert.show && (
            <AlertCpt {...Alert} removeAlert={removeAlert} List={List} />
          )}
          <h3>reviews</h3>
          <div>
            <label htmlFor="password">password</label>
            <input
              type="text"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="e.g. 0123"
            ></input>
            <label htmlFor="nickName">Nickname:</label>
            <input
              type="text"
              value={NickName}
              onChange={(e) => setNickName(e.target.value)}
              placeholder="e.g. 변덕"
            ></input>
            <input
              type="text"
              placeholder="e.g. she can cook/ 착해!"
              value={Name}
              onChange={(e) => setName(e.target.value)}
            ></input>
            <button type="submit">{IsEditing ? "edit" : "submit"}</button>
          </div>
        </form>
        {List.length > 0 && (
          <div>
            <Review
              reviews={List}
              removeReview={removeReview}
              editReview={editReview}
            ></Review>
            <button>clear reviews</button>
          </div>
        )}
      </div>
    </section>
  );
};
