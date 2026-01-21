import { Link, useParams } from "react-router-dom";

export default function MovieDetail() {
  const { id } = useParams<{ id: string }>();

  return (
    <div style={{ padding: 24 }}>
      <h1>Movie Detail 🎬</h1>
      <p>ID: {id}</p>
      <Link to="/">← Home</Link>
    </div>
  );
}