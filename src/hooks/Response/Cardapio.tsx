import { useContext } from "react";
import { AuthContext } from "../../context/Auth";
import { useQuery } from "@tanstack/react-query";
import { getCardapio } from "../../api/api";

export function useCardapio(){
  const { token } = useContext(AuthContext);

  const query = useQuery({
    queryFn: () => getCardapio(token),
    queryKey: ['cardapio-data'],
    retry:false
  })


  return {
    ...query,
    data: query.data?.data,
  }
}