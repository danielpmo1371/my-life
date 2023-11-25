import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface Todo {
  title: string;
  date?: Date | undefined;
  index: number;
}

interface TodosState {
  todosItems: Todo[];
  addItem: (item: Todo) => void;
  updateItem: (item: Todo) => void;
  removeItem: (item: Todo) => void;
}

const useTodosStore = create<TodosState>()(
  persist<TodosState>(
    (set) => ({
      todosItems: [{ index: 0, title: "loading" }],
      addItem: (item) =>
        set((state) => {
          console.log("adding item: ", item);
          return { todosItems: [...state.todosItems, item] };
        }),
      updateItem: (item) =>
        set((state) => ({
          todosItems: [
            ...state.todosItems.filter((x) => x.index !== item.index),
            item,
          ],
        })),
      removeItem: (item) =>
        set((state) => ({
          todosItems: [
            ...state.todosItems.filter((x) => x.index !== item.index),
          ],
        })),
    }),
    {
      name: "todos-storage", // name of the item in the storage (must be unique)
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

export default useTodosStore;
