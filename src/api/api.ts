// src/api/api.ts
import axios, { AxiosPromise } from "axios";
import { CardapioResponse, NoticiaResponse, PutNoticiaResponse } from "./InterfaceApi";

const baseUrl = "http://44.223.188.239:8080";

export const api = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

// Função para obter notícias
export const getNoticia = async (token: string | null): AxiosPromise<NoticiaResponse> => {
  const response = await api.get<NoticiaResponse>("/noticias", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

// Outras funções
export const putNoticia = async (idNoticia: string, token: any, data: PutNoticiaResponse): AxiosPromise<PutNoticiaResponse> => {
  const response = await api.put<PutNoticiaResponse>(`/noticias/${idNoticia}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const getCardapio = async (token: string | null): AxiosPromise<CardapioResponse> => {
  const response = await api.get<CardapioResponse>("/cardapio", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};
