import { create } from "zustand";

interface ModalState {
  isOpen: boolean;
  initialData: unknown;
  title: string;
  result: unknown;
  modalChildComponent: React.JSX.Element;
  openModal: () => void;
  closeModal: () => void;
  toggleModal: () => void;
  setData: (data: unknown) => void;
  setTitle: (newTitle: string) => void;
  setModalChildComponent: (component: React.JSX.Element) => void;
  setResult: (result: unknown) => void;
}

const useModalStore = create<ModalState>()((set, get) => ({
  isOpen: false,
  initialData: null,
  result: null,
  modalChildComponent: <div></div>,
  title: "",
  setTitle: (newTitle: string) => set({ title: newTitle }),
  setModalChildComponent: (component: React.JSX.Element) =>
    set({ modalChildComponent: component }),
  setData: (data: unknown) => set({ initialData: data }),
  setResult: (result: unknown) => set({ result }),
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
  toggleModal: () => set({ isOpen: !get().isOpen }),
}));

export default useModalStore;
