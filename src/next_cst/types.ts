import { Dispatch, SetStateAction } from "react";

export type CrudClientType<T> = {
  BASE_URL: string | undefined;
  getProjectsUrl: string;
  getData: (setData: Dispatch<SetStateAction<T[]>>) => Promise<any>;
  saveDataAndRefresh: (
    newEntity: T,
    setData: Dispatch<SetStateAction<T[]>>
  ) => Promise<any>;
  deleteAndRefresh: (
    entityToDelete: T,
    setData: Dispatch<SetStateAction<T[]>>
  ) => Promise<any>;
};

export type UserProfile = {
  email?: string | null;
  email_verified?: boolean | null;
  name?: string | null;
  nickname?: string | null;
  picture?: string | null;
  sub?: string | null;
  updated_at?: string | null;
  org_id?: string | null;
  [key: string]: unknown; // Any custom claim which could be in the profile
};

export type BaseDBType = {
  title: string;
  order: string;
  ownerEmail: string;
};