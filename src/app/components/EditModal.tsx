import { FaWindowClose } from "react-icons/fa";
import useModalStore from "../stores/editModalStore";
import { useEffect } from "react";

export function Modal() {
  const { isOpen, closeModal, modalChildComponent, title } = useModalStore();

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    // Adding event listener
    window.addEventListener("keydown", handleEscape);

    // Cleanup event listener
    return () => window.removeEventListener("keydown", handleEscape);
  }, [closeModal]);

  return (
    isOpen && (
      <div
        style={{
          position: "fixed",
          backgroundColor: "whitesmoke",
          width: "80vw",
          height: "80vh",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: "100",
          borderRadius: "30px",
          boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.5)", // Adjust shadow as needed
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <div style={{ margin: "20px" }}>
            <h3>{title}</h3>
          </div>
          <div style={{ margin: "20px" }}>
            <FaWindowClose onClick={() => closeModal()} />
          </div>
        </div>{" "}
        <div style={{ margin: "35px" }}>{modalChildComponent}</div>
      </div>
    )
  );
}
