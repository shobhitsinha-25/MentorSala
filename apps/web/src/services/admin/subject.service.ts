import api from "../../lib/axios";

export interface Subject {
  id: string;
  name: string;
  slug: string;
  examType: "JEE" | "WBJEE" | "BOARDS";
  published: boolean;
  isDeleted: boolean;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export interface GetSubjectsResponse {
  success: boolean;
  subjects: Subject[];
  pagination: Pagination;
}

export const getSubjects = async (
  page = 1,
  search = "",
  examType?: "JEE" | "WBJEE" | "BOARDS"
) => {

  const { data } = await api.get(
    "/admin/subjects",
    {

      params: {

        page,

        search,

        examType,

      },

    }

  );

  return data;

};

export const createSubject = async (data: {
  name: string;
  examType: "JEE" | "WBJEE" | "BOARDS";
}) => {
  const res = await api.post(
    "/admin/subjects",
    data
  );

  return res.data;
};

export const updateSubject = async (
  id: string,
  data: {
    name: string;
    examType: "JEE" | "WBJEE" | "BOARDS";
    published: boolean;
  }
) => {
  const res = await api.put(
    `/admin/subjects/${id}`,
    data
  );

  return res.data;
};

export const deleteSubject = async (
  id: string
) => {
  const res = await api.delete(
    `/admin/subjects/${id}`
  );

  return res.data;
};