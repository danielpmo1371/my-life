import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { SectionsKeys } from "../common/types";

export interface Todo {
  title: string;
  date?: Date | undefined;
  index: number;
}

interface SectionsState {
  sectionsToShow: SectionsKeys[];
  toggleSection: (item: SectionsKeys) => void;
  showSection: (item: SectionsKeys) => boolean;
}

const useSectionsStore = create<SectionsState>()(
  persist<SectionsState>(
    (set, get) => ({
      sectionsToShow: ["highLevelGoals", "mantras", "projects", "todos"],
      toggleSection: (item: SectionsKeys) => {
        if (get().sectionsToShow.some((x) => item === x))
          set({
            sectionsToShow: get().sectionsToShow.filter((x) => x !== item),
          });
        else
          set({
            sectionsToShow: [...get().sectionsToShow, item],
          });
      },
      showSection: (item: SectionsKeys) =>
        get().sectionsToShow.some((s) => s === item),
    }),
    {
      name: "sections-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
      onRehydrateStorage: (state) => {
        console.log("hydration starts");
        console.log(JSON.stringify(state));

        // optional
        return (state, error) => {
          if (error) {
            console.log("an error happened during hydration", error);
          } else {
            console.log("hydration finished");
          }
        };
      },
    }
  )
);

export default useSectionsStore;
