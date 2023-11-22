import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface FocusState {
  focusItems: string[];
  addItem: (item: string) => void;
  updateItem: (item: string) => void;
  removeItem: (item: string) => void;
}

const useFocusStore = create<FocusState>()(
  persist<FocusState>(
    (set) => ({
      focusItems: [],
      addItem: (item) =>
        set((state) => {
          console.log("adding item: ", item);
          return { focusItems: [...state.focusItems, item] };
        }),
      updateItem: (item) =>
        set((state) => ({
          focusItems: [...state.focusItems.filter((x) => x !== item), item],
        })),
      removeItem: (item) =>
        set((state) => ({
          focusItems: [...state.focusItems.filter((x) => x !== item)],
        })),
    }),
    {
      name: "focu-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
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

export default useFocusStore;
