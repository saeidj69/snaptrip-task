import React, { useState } from "react";
import useApiRequest from "../hooks/useApiRequest";

interface Post {
  id: number;
  title: string;
  body: string;
}


const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const { data, error, loading, getData } = useApiRequest<Post[]>(
    "https://jsonplaceholder.typicode.com/posts?q=" + searchTerm
  );

  return (
    <div>
      <input type="text" value={searchTerm} onChange={handleInputChange} />
      <button onClick={getData} disabled={loading}>
        search
      </button>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && (
        <ul>
          {data.map((post) => (
            <li key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.body}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;

