import { Link } from "react-router-dom";
import "./style.css";

export default function MyHistory({ title, acertou, quiz_id }) {
  return (
    <div className="myHistory-item">
      <h2>{title}</h2>
      <h3>
        acertou
        {acertou >= 50 ? (
          <span className="notaBoa">{" " + acertou + "%"}</span>
        ) : (
          <span className="notaRuim">{" " + acertou + "%"}</span>
        )}
      </h3>
      <Link to={"/quiz/" + quiz_id}>Refazer</Link>
    </div>
  );
}
