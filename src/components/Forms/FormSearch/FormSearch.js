import iconSearch from "../../../assets/icons/IconSearch.svg";
import "./style.css";
export default function FormSearch() {
  return (
    <form className="formSearch">
      <input type="text" />
      <button>
        <img src={iconSearch} alt="" width="20px" />
      </button>
    </form>
  );
}
