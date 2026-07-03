import api from "../../lib/axios";

export interface Chapter {
  id: string;
  title: string;
  slug: string;
  order: number;
  published: boolean;
  createdAt: string;
  updatedAt: string;

  subject: {
    id: string;
    name: string;
    examType: "JEE" | "WBJEE" | "CBSE";
  };
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export interface ChapterResponse {
  success: boolean;
  chapters: Chapter[];
  pagination: Pagination;
}

export const getChapters = async (
  page = 1,
  search = "",
  subjectId = ""
) => {

  const { data } = await api.get<ChapterResponse>(
    "/admin/chapters",
    {
      params: {
        page,
        search,
        subjectId,
      },
    }
  );

  return data;

};

export const createChapter = async (payload: {
  title: string;
  subjectId: string;
  order: number;
}) => {

  const { data } = await api.post(
    "/admin/chapters",
    payload
  );

  return data;

};

export const updateChapter = async (
  id: string,
  payload: {
    title: string;
    subjectId: string;
    order: number;
    published: boolean;
  }
) => {

  const { data } = await api.put(
    `/admin/chapters/${id}`,
    payload
  );

  return data;

};

export const deleteChapter = async (
  id: string
) => {

  const { data } = await api.delete(
    `/admin/chapters/${id}`
  );

  return data;

};