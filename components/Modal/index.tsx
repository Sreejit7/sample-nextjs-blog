import React, { MutableRefObject, useEffect, useRef } from "react";
import {
  ModalActionTypes,
  useModalContext,
} from "../../contexts/useModalContext";

const Modal = () => {
  const {
    state: {
      children,
      modalExists,
      location: { top, center },
    },
    dispatch,
  } = useModalContext();

  const modalRef = useRef() as MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    if (modalExists && center && top) {
      modalRef.current.style.top = `${top}px`;
      modalRef.current.style.left = `${center}px`;
      modalRef.current.focus();
    }
  }, [modalExists, center, top]);

  useEffect(() => {
    // Event for closing the modal
    const closeModal = () => {
      if (modalExists) {
        dispatch({
          type: ModalActionTypes.DELETE_MODAL,
        });
      }
    };

    /**
     * @description close the modal if clicked outside
     * @param event a mouse click event
     */
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        closeModal();
      }
    };

    // close the modal on scrolling away from the modal position
    const handleScrollAway = () => {
      if (
        Math.abs(modalRef.current.getBoundingClientRect().y - window.scrollY) >=
        10
      ) {
        closeModal();
      }
    };

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    // Attach event listeners for handling modal behavior
    if (modalExists) {
      document.addEventListener("click", handleOutsideClick);
      document.addEventListener("scroll", handleScrollAway);
      document.addEventListener("keydown", closeOnEscape);
    }

    return () => {
      // Remove all event listeners on unmounting modal
      if (modalExists) {
        document.removeEventListener("click", handleOutsideClick);
        document.removeEventListener("scroll", handleScrollAway);
        document.removeEventListener("keydown", closeOnEscape);
      }
    };
  }, [dispatch, modalExists]);

  return (
    <section
      className={`fixed z-[100] ${
        modalExists && center && top ? "visible" : "invisible"
      } bg-white flex flex-col shadow-xl shadow-black/50 rounded-lg -translate-x-[50%] transition duration-700 ease-linear animate-[wake_1s_ease-in]`}
      ref={modalRef}
      role="dialog"
      aria-modal="true"
    >
      {/* <header className="flex justify-end p-1">
        <button
          onClick={() => dispatch({ type: ModalActionTypes.DELETE_MODAL })}
        >
          <AiFillCloseCircle color="#000" size={18} />
        </button>
      </header> */}
      <div className="p-2 flex items-center justify-center">{children}</div>
    </section>
  );
};

export default Modal;
