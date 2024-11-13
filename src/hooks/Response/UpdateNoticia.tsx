import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../context/Auth";
import { NoticiaResponse } from "../../api/InterfaceApi";
import { putNoticia } from "../../api/api";

interface useUpdateNoticia {
  idNoticia: string ;
  data: any;
}

export function useUpdateNoticia({ idNoticia, data }: useUpdateNoticia) {
  const queryClient = useQueryClient();
  const { token } = useContext(AuthContext);

  const mutation = useMutation<NoticiaResponse>({
    mutationFn: () => {
      if (!token) {
        throw new Error("TOKEN NÃO ENCONTRADO");
      }
      return putNoticia(idNoticia,token, data).then((response) => response.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["noticia-data"],
      });
    },
  });

  return mutation;
}
