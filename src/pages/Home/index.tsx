import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={{ padding: 24 }}>
      <h1>Home 🏠</h1>
      <Link to="/search">Search'e git</Link>
    </div>
  );
}