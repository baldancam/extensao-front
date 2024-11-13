import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useNoticiaDelete } from "../../hooks/Response/NoticiaDelete";

interface NoticiaDelete {
  abrirDelete: boolean;
  setAbrirDelete: any;
  idNoticia: string;
}

const NoticiaDelete = ({
  abrirDelete,
  setAbrirDelete,
  idNoticia,
}: NoticiaDelete) => {

  const {mutate,isSuccess} = useNoticiaDelete()
  const handleClose = () => {
    setAbrirDelete(false);
  };

  const deletarNoticia = () => {
    mutate(idNoticia)
    if(!isSuccess){
      handleClose()
      alert('Deletado com Sucesso')
    }
  };


  return (
    <>
      <Dialog
        open={abrirDelete}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{ "& .MuiDialog-paper": { width: "50%", maxWidth: "none" } }}
      >
        <DialogTitle id="alert-dialog-title">Deletar Noticia</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <p>Tens certeza que queres deletar essa noticia? </p>
            <p>Não haverá mais volta!!!</p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Fechar</Button>
          <Button onClick={deletarNoticia} autoFocus>
            Deletar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default NoticiaDelete;
