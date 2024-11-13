import { Box, Button, Divider, TextField } from "@mui/material";
import { FormEvent, useContext, useState } from "react";
import { AuthContext } from "../../context/Auth";
import axios from "axios";

interface NoticiaEdit {
  titulo: string;
  conteudo: string;
  dataPublicacao: string;
  imagemUrl: any;
  idNoticia: string | undefined;
}

const NoticiaEdit = ({
  titulo,
  conteudo,
  dataPublicacao,
  imagemUrl,
  idNoticia,
}: NoticiaEdit) => {
  const { user, token } = useContext(AuthContext);
  const [editNoticia, setEditNoticia] = useState({
    usuarioId: user?.id,
    titulo: titulo,
    conteudo: conteudo,
    dataPublicacao: dataPublicacao,
    imagemUrl: imagemUrl,
  });

  const editNoticiaId = async (event: FormEvent) => {
    event.preventDefault();
  
    if (!idNoticia) {
      console.error("idNoticia está indefinido!");
      return;
    }
  
    const formData = new FormData();
    formData.append("titulo", editNoticia.titulo);
    formData.append("conteudo", editNoticia.conteudo);
    formData.append("usuarioId", String(editNoticia.usuarioId));
    if (editNoticia.imagemUrl instanceof File) {
      formData.append("file", editNoticia.imagemUrl);
    }
  
    try {
      console.log("Token:", token); // Verifica se o token está presente
      const response = await axios.put(
        `http://44.223.188.239:8080/noticias/${idNoticia}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Notícia atualizada com sucesso:", response.data);
    } catch (error) {
      console.error("Erro ao atualizar notícia:", error);
    }
  };
  

  const handleChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      setEditNoticia((prevState) => ({
        ...prevState,
        imagemUrl: file,
      }));
    }
  };

  const renderImagePreview = () => {
    if (editNoticia.imagemUrl) {
      if (editNoticia.imagemUrl instanceof Blob) {
        return (
          <img
            src={URL.createObjectURL(editNoticia.imagemUrl)}
            alt="Preview"
            className="w-screen h-full object-cover absolute rounded-xl"
          />
        );
      }
      return (
        <img
          src={editNoticia.imagemUrl}
          alt="Preview"
          className="w-screen h-full object-cover absolute rounded-xl"
        />
      );
    }
    return null;
  };

  return (
    <>
      <Divider textAlign="left"></Divider>
      <h1 className="text-2xl mt-4">Edite essa Noticia:</h1>
      <Box component="form" onSubmit={editNoticiaId} sx={{ display: "flex", flexDirection: "column" }}>
        <div className="flex flex-col ">
          <label className="py-1" htmlFor="titulo">
            Título
          </label>
          <TextField
            id="titulo"
            variant="outlined"
            value={editNoticia.titulo}
            onChange={(event) =>
              setEditNoticia((prevState) => ({
                ...prevState,
                titulo: event.target.value,
              }))
            }
          />
        </div>

        <div className="flex flex-col ">
          <label className="py-1" htmlFor="conteudo">
            Conteúdo
          </label>
          <TextField
            id="conteudo"
            variant="outlined"
            value={editNoticia.conteudo}
            onChange={(event) =>
              setEditNoticia((prevState) => ({
                ...prevState,
                conteudo: event.target.value,
              }))
            }
          />
        </div>

        <div className="flex flex-col my-2">
          <p>Edite a Foto:</p>
          <Button
            className="w-60 h-[14.1rem]"
            variant="contained"
            component="label"
            sx={{
              backgroundColor: "transparent",
              color: "black",
              borderRadius: "0.75rem",
              border: "2px solid #E2E2E2",
              "&:hover": {
                backgroundColor: "#EFEFEF",
              },
            }}
          >
            {renderImagePreview()}
            {editNoticia.imagemUrl ? (
              <p
                style={{ backgroundColor: "rgba(148, 163, 184, 0.5)" }}
                className="absolute font-bold text-white rounded-lg p-2 text-sm capitalize"
              >
                Alterar Imagem
              </p>
            ) : (
              "Upload Imagem"
            )}
            <input
              type="file"
              accept="image/png, image/jpeg"
              onChange={handleChange}
              hidden
              name="img"
            />
          </Button>
        </div>

        <button
          type="submit"
          className="col-span-2 bg-blue-300 rounded-lg py-4 font-semibold"
        >
          Atualizar
        </button>
      </Box>
    </>
  );
};

export default NoticiaEdit;
