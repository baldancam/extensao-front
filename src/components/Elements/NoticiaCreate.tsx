import { useState, useContext } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, TextField, Typography } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { AuthContext } from "../../context/Auth"; // Ajuste o caminho conforme necessário
import axios from "axios";

// URL base da API
const baseUrl = "http://44.223.188.239:8080";

// Esquema de validação com yup
const schema = yup.object().shape({
  titulo: yup.string().required("O título é obrigatório"),
  conteudo: yup.string().required("O conteúdo é obrigatório"),
  imagemUrl: yup.mixed().required("A imagem é obrigatória"),
});

const NoticiaCreate = () => {
  const { token, user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [createNoticia, setCreateNoticia] = useState({
    titulo: "",
    conteudo: "",
    imagemUrl: null,
  });

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: createNoticia,
  });

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSend = async (data) => {
    if (!token) {
      console.error("Token não disponível");
      return;
    }
  
    const formData = new FormData();
    formData.append("titulo", data.titulo);
    formData.append("conteudo", data.conteudo);
  
    if (createNoticia.imagemUrl) {
      formData.append("file", createNoticia.imagemUrl);
    }
  
    // Adicione o campo usuarioId manualmente
    formData.append("usuarioId", user.id);
  
    try {
      const response = await axios.post(`${baseUrl}/noticias`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.status === 200) {
        console.log("Notícia enviada com sucesso");
        setOpen(false);
      } else {
        console.error("Erro ao enviar notícia");
      }
    } catch (error) {
      console.error("Erro ao enviar notícia:", error);
    }
  };
  
  

  const handleChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setValue("imagemUrl", file, { shouldValidate: true });
      setCreateNoticia((prev) => ({ ...prev, imagemUrl: file }));
    }
  };

  const renderImagePreview = () =>
    createNoticia.imagemUrl ? (
      <img
        src={URL.createObjectURL(createNoticia.imagemUrl)}
        alt="Preview"
        className="w-screen h-full object-cover absolute rounded-xl"
      />
    ) : null;

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Criar Notícia
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{ "& .MuiDialog-paper": { width: "70%", maxWidth: "none" } }}
      >
        <DialogTitle id="alert-dialog-title">
          <Typography variant="h6">Criar Uma Notícia:</Typography>
        </DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit(handleSend)} sx={{ display: "flex", flexDirection: "column" }}>
            <Typography className="py-1" component="label" htmlFor="titulo">
              Título
            </Typography>
            <Controller
              name="titulo"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="outlined"
                  error={!!errors.titulo}
                  helperText={errors.titulo?.message}
                />
              )}
            />

            <Typography className="py-1" component="label" htmlFor="conteudo">
              Conteúdo
            </Typography>
            <Controller
              name="conteudo"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="outlined"
                  error={!!errors.conteudo}
                  helperText={errors.conteudo?.message}
                />
              )}
            />

            <Typography>Edite a Foto:</Typography>
            <Button
              className="w-full h-[14.1rem]"
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
              {createNoticia.imagemUrl ? (
                <Typography
                  style={{ backgroundColor: "rgba(148, 163, 184, 0.5)" }}
                  className="absolute font-bold text-white rounded-lg p-2 text-sm capitalize"
                >
                  Alterar Imagem
                </Typography>
              ) : (
                "Upload Imagem"
              )}
              <input
                type="file"
                accept="image/png"
                onChange={handleChange}
                hidden
                name="imagemUrl"
              />
            </Button>
            {errors.imagemUrl && (
              <Typography color="error">{errors.imagemUrl.message}</Typography>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Fechar</Button>
          <Button onClick={handleSubmit(handleSend)} autoFocus>
            Enviar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default NoticiaCreate;
