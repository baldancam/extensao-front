import NoticiaCard from "../../components/Elements/NoticiaCard";
import { useNoticia } from "../../hooks/Response/Noticias";

const Noticia = () => {
  const { data, isLoading } = useNoticia();

  return (
    <>
      {!isLoading && data && Object.values(data).map((item, index) => (
        <NoticiaCard
          key={index}
          conteudo={item.conteudo}
          titulo={item.titulo}
          dataPublicacao={item.dataPublicacao}
          imagemUrl={item.imagemUrl}

        />
      ))}
      {isLoading && <p>Carregando...</p>}
    </>
  );
};

export default Noticia;
