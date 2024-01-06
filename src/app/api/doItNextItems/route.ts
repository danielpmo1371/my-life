/* eslint-disable import/no-anonymous-default-export */
import { getCrudRestApi } from "@/next_cst/crudApi";

export const { GET, POST, DELETE } = getCrudRestApi("doItNext");
