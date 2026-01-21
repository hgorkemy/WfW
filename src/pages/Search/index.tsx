import { Link } from "react-router-dom";

export default function Search() {
  return (
    <div style={{ padding: 24 }}>
      <h1>Search 🔎</h1>
      <Link to="/movie/123">Movie 123 detay</Link>
    </div>
  );
}