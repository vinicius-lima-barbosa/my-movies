"use client";

import { useState, useEffect } from "react";
import EditCard from "@/src/components/EditCard";

const getTopicById = async (id) => {
  try {
    const response = await fetch(`http://localhost:3000/api/movies/${id}`, {
      cache: "no-store",
    });

    if (!response.ok) throw new Error("Failed to fetch arquive");

    return await response.json();
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

export default function EditPage({ params }) {
  const { id } = params;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = await getTopicById(id);
      setData(fetchedData);
      setLoading(false);
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!data) {
    return <div>Erro ao carregar os dados.</div>;
  }

  console.log(data);

  return <EditCard movieID={id} initialData={data} />;
}
