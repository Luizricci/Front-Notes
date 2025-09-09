"use client";


import axios from 'axios';
import { useEffect, useState } from 'react';
export default function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`${process.env.NEXT_PUBLIC_API_URL}/notes`);
      setData(result.data);
      console.log(result.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Notes: </h1>
      {data ? (
        <ul>
          {data.map((note) => (
            <li key={note.id}>
              <p>{note.titulo}</p>
              <p>{note.conteudo}</p>
              <p>Criado em: {note.created_at}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
} 