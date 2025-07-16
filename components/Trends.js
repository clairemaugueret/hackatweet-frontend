import styles from "../styles/Trends.module.css";
import { useSelector } from "react-redux";
import Link from "next/link";

function Trends() {
  const trendsData = useSelector((state) => state.tweets.trendsList);

  const occurrences = trendsData.reduce(function (acc, curr) {
    return acc[curr] ? ++acc[curr] : (acc[curr] = 1), acc;
  }, {});

  const hashtagElements = Object.entries(occurrences).map(
    ([hashtag, count], index, arr) => {
      const isFirst = index === 0;
      const isLast = index === arr.length - 1;
      const classes = `${styles.hashtagDisplay} ${
        isFirst ? styles.first : ""
      } ${isLast ? styles.end : ""}`;

      return (
        <Link href={`/trends/${hashtag.replace(/^#/, "")}`}>
          <div key={hashtag} className={classes}>
            <h5>#{hashtag}</h5>
            <p>
              {count} Tweet{count > 1 ? "s" : ""}
            </p>
          </div>
        </Link>
      );
    }
  );

  return (
    <div className={styles.trendsContainer}>
      <h3>Trends</h3>
      <div className={styles.hashtagListContainer}>{hashtagElements}</div>
    </div>
  );
}

export default Trends;
