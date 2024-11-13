import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../context/Auth";
import { deleteNoticia } from "../../api/api";


export function useNoticiaDelete(){
  const queryClient = useQueryClient()
  const {token} =useContext(AuthContext);

  const mutation = useMutation({
    mutationFn: (idNoticia: any) => {
      if (!token) {
        throw new Error("TOKEN NÃO ENCONTRADO");
      }
      return deleteNoticia(token,idNoticia ).then((response) => response.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["noticia-data"],
      });
      console.log('DEU CERTO')
    },
  })

  return mutation

}