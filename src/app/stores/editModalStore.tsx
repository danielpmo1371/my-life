import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface Todo {
  title: string;
  date?: Date | undefined;
  index: number;
}

interface EditState {
  isOpen: boolean;
  initialData: unknown;
  result: unknown;
  modalChildComponent: React.JSX.Element;
  openModal: () => void;
  closeModal: () => void;
  toggleModal: () => void;
  setData: (data: unknown) => void;
  setModalChildComponent: (component: React.JSX.Element) => void;
  setResult: (result: unknown) => void;
}

const useEditModalStore = create<EditState>()(
  // persist<EditState>(
  (set, get) => ({
    isOpen: false,
    initialData: null,
    result: null,
    modalChildComponent: <div></div>,
    setModalChildComponent: (component: React.JSX.Element) =>
      set({ modalChildComponent: component }),
    setData: (data: unknown) => set({ initialData: data }),
    setResult: (result: unknown) => set({ result }),
    openModal: () => set({ isOpen: true }),
    closeModal: () => set({ isOpen: false }),
    toggleModal: () => set({ isOpen: !get().isOpen }),
  })
  // {
  //   name: "edit-storage", // name of the item in the storage (must be unique)
  //   storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
  //   onRehydrateStorage: (state) => {
  //     // optional
  //     return (state, error) => {
  //       if (error) {
  //         console.log("an error happened during hydration", error);
  //       } else {
  //         console.log("hydration finished");
  //       }
  //     };
  //   },
  // }
  // )
);

export default useEditModalStore;
