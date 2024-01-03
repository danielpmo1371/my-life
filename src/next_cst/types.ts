import { Routes, SectionsKeys } from "@/app/common/types";

export type CrudClientType<T> = {
  apiRoute: Routes;
  getProjectsUrl: string;
  getData: (id?: string, global?: boolean) => Promise<any>;
  saveItem: (newEntity: T) => Promise<any>;
  deleteItem: (entityToDelete: T) => Promise<any>;
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
  id?: string;
  title: string;
  order: string;
  ownerEmail: string;
  parentId?: string;
};
