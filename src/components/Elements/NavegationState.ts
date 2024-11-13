export interface Route {
  urlDefault:string
  urls: string[];
  namePage: string[];
  nameNavegation: string[]
}

export const Menu = {
  urlDefault:'menu',
  urls: ["cardapio", "perfil"],
  namePage: ["Noticias do Dia", "Cardápio da Semana", "Perfil"],
  nameNavegation:['Menu','Cardápio','Perfil','Sair']
};

export const Admin = {
  urlDefault:'admin',
  urls: ["noticia", "cadastrar"],
  namePage: ["Visualize os Alunos", "Noticia", "Cadastrar"],
  nameNavegation:['Aluno','Noticia','Cadastrar','Sair']
};
