import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../context/Auth";
import { postNoticia } from "../../api/api";

export function usePostNoticia(){
  const queryClient = useQueryClient()
  const {token} =useContext(AuthContext);

  const mutation = useMutation({
    mutationFn: (formData: any) => {
      if (!token) {
        throw new Error("TOKEN NÃO ENCONTRADO");
      }
      return postNoticia(token, formData).then((response) => response.data);
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