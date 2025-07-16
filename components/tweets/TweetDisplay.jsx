import styles from "../../styles/Tweet.module.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useRelativeTime } from "../../hooks/useRelativeTime";

function Tweet(props) {
  const user = useSelector((state) => state.users.value);
  const time = useRelativeTime(props.date);

  //DELETE TWEET
  const handleDelete = () => {
    props.deleteTweet(props.id);
  };

  //LIKE TWEET
  const handleLike = () => {
    props.likeTweet(props.id);
  };

  let likedStyle = {};
  if (props.userLiked) {
    likedStyle = { color: "#e74c3c", display: "inline" };
  } else {
    likedStyle = { display: "inline" };
  }

  // Fonction pour transformer les hashtags en liens
  const linkGenerator = (str) => {
    // Utilisation d'un split et d'un map pour créer des éléments React
    const parts = str.split(/(\s|#[A-zÀ-ú0-9]+)/gi); // Sépare le texte en parties avec et sans #hashtag
    return parts.map((part, index) => {
      // Si c'est un hashtag, on crée un lien React
      if (part.startsWith("#")) {
        const hashtag = part.slice(1);
        return (
          <Link key={index} href={`/trends/${hashtag}`}>
            <a>{part}</a>
          </Link>
        );
      }
      return part; // Sinon, on renvoie le texte brut
    });
  };

  return (
    <div className={styles.oneTweetContainer}>
      <div className={styles.tweetInfo}>
        <img
          src={props.image || "/user.jpg"}
          alt={props.username}
          width={40}
          height={40}
          className={styles.userPicture}
        />
        <h4>{props.firstname}</h4>
        <p className={styles.username}>
          @{props.username} • {time}
        </p>
      </div>
      <div className={styles.tweetContent}>{linkGenerator(props.content)}</div>
      <div className={styles.tweetActions}>
        <p style={likedStyle}>
          <FontAwesomeIcon
            icon={faHeart}
            className={styles.likeIcon}
            onClick={handleLike}
          />{" "}
          {props.isLiked.length}
        </p>{" "}
        &nbsp;{" "}
        {props.token === user.token && (
          <FontAwesomeIcon
            icon={faTrashCan}
            className={styles.deleteIcon}
            id={props.id}
            onClick={handleDelete}
          />
        )}
      </div>
    </div>
  );
}

export default Tweet;
