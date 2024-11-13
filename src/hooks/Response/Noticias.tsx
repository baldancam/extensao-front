import { getNoticia } from "../../api/api";
import { useContext } from "react";
import { AuthContext } from "../../context/Auth";
import { useQuery } from '@tanstack/react-query';

export function useNoticia() {
  const { token } = useContext(AuthContext);

  const query = useQuery({
    queryFn: () => getNoticia(token),
    queryKey: ['noticia-data'],
    retry: false,
  });

  return {
    ...query,
    data: query.data?.data, // Extrai os dados 
  };
}
