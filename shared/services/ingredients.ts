import { Ingredient, Product } from "@prisma/client";
import { axiosInstance } from "./instance";
import { ApiRoutes } from "./constatnts";

export const getAll = async (): Promise<Ingredient[]> => {
  return (await axiosInstance.get<Ingredient[]>(ApiRoutes.INGREDIENTS)).data;
};
