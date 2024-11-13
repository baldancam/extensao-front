import React from "react";

interface CardapioCard{
  diaSemana:string,
  conteudo:string
}

const CardapioCard = ({diaSemana,conteudo}:CardapioCard) => {
  return <>
  
  <div className="w-auto bg-gray-300 flex-col p-3 rounded-lg mt-4">
    <h1 className="text-xl font-medium">{diaSemana}</h1>
    <p className="pt-1">{conteudo}</p>
  </div>
  
  </>;
};

export default CardapioCard;
