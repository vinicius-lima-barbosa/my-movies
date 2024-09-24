"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router"; // Certifique-se de que o roteador está importado corretamente
import EditCard from "@/src/components/EditCard";

// Função para buscar o tópico pela ID
const getTopicById = async (id) => {
  try {
    const response = await fetch(`http://localhost:3000/api/series/${id}`, {
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
  const [data, setData] = useState(null); // Estado para armazenar os dados carregados
  const [loading, setLoading] = useState(true); // Estado de loading para controlar a exibição da página enquanto carrega

  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = await getTopicById(id);
      setData(fetchedData);
      setLoading(false); // Para garantir que o loading pare depois de carregar os dados
    };

    fetchData();
  }, [id]);

  // Exibir carregamento enquanto os dados estão sendo buscados
  if (loading) {
    return <div>Carregando...</div>;
  }

  // Se os dados falharem em carregar, exibir mensagem de erro
  if (!data) {
    return <div>Erro ao carregar os dados.</div>;
  }
  // Renderizar o formulário EditCard com os dados carregados
  return <EditCard serieId={id} initialData={data} />;
}
