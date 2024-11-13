import { useContext } from "react";
import { AuthContext } from "../../context/Auth";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate, useParams } from "react-router-dom";
import NoticiaEdit from "./NoticiaEdit";

interface NoticiaCard {
  titulo: string;
  conteudo: string;
  dataPublicacao: string;
  imagemUrl: string;
  idNoticia: string;
}

const NoticiaCard = ({
  titulo,
  conteudo,
  dataPublicacao,
  imagemUrl,
  idNoticia,
}: NoticiaCard) => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const Admin = user.role == "ADMIN";



  const showNoticia = () => {
    navigate(`/admin/noticia/${idNoticia}`);
    
  };

  return (
    <>
      <div className="relative group">
        {id && (
          <KeyboardBackspaceIcon
            fontSize="large"
            className="cursor-pointer my-2 "
            onClick={() => navigate("/admin/noticia")}
          />
        )}

        <div
          className={`flex flex-col mb-4 bg-gray-50 ${
            Admin ? "hover:opacity-75 group-hover:opacity-75" : "opacity-100"
          }`}
        >
          <img className="w-auto h-[25rem] object-cover" src={imagemUrl} alt="" />

          <div className="flex justify-between px-2 mt-2">
            <h1 className="text-xl">{titulo}</h1>
            <span>{dataPublicacao}</span>
          </div>

          <p className="px-2 my-2">{conteudo}</p>
        </div>

        {Admin && !id && (
          <div className="flex flex-row bg-slate-100 rounded-lg p-2 m-2 absolute right-0 top-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <EditNoteIcon className="cursor-pointer" onClick={showNoticia} />
            <DeleteIcon className="cursor-pointer" />
          </div>
        )}
      </div>
      
      {id && (
        <NoticiaEdit
          conteudo={conteudo}
          dataPublicacao={dataPublicacao}
          imagemUrl={imagemUrl}
          titulo={titulo}
          idNoticia={idNoticia}
        />
      )}
    </>
  );
};

export default NoticiaCard;
