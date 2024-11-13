export interface NoticiaResponse {
  id?: string | null;
  titulo: string;
  conteudo: string;
  imagemUrl: any;
  dataPublicacao: any;
}

export interface PutNoticiaResponse {
  titulo: string;
  conteudo: string;
  dataPublicacao: any;
  imagemUrl: any;
  usuarioId: string | null;
}

export interface CardapioResponse {
  id: number;
  diaSemana: string;
  conteudo: string;
}
