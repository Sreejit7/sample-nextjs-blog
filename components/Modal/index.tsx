import React, { MutableRefObject, useEffect, useRef } from "react";
import {
  ModalActionTypes,
  useModalContext,
} from "../../contexts/useModalContext";

const FOCUSABLE_SELECTORS =
  "a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]";

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
     * Close the modal if clicked outside
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

  useEffect(() => {
    const focusableElements = Array.from(
      modalRef.current.querySelectorAll(
        FOCUSABLE_SELECTORS
      ) as NodeListOf<HTMLElement>
    );

    const firstFocusableEl = focusableElements[0];
    const lastFocusableEl = focusableElements[focusableElements.length - 1];
    // Storing the element which opens the modal
    const prevFocusEl = document.activeElement as HTMLElement;
    let currentFocusEl = document.activeElement as HTMLElement;

    // On opening modal, focus the first focusable element
    if (modalExists) {
      firstFocusableEl?.focus();
    }

    /**
     * Traps the focus inside the modal
     * @param e the focus event
     */
    const trapFocus = (e: FocusEvent) => {
      e.preventDefault();
      // If the focus goes outside the modal
      if (
        modalExists &&
        modalRef.current &&
        !focusableElements.includes(e.target as HTMLElement)
      ) {
        if (currentFocusEl === lastFocusableEl) {
          // If last focus was on first focus element, focus the last element
          firstFocusableEl.focus();
        }
        currentFocusEl = document.activeElement as HTMLElement;
      } else {
        currentFocusEl = e.target as HTMLElement;
      }
    };

    // Work-around for trapping reverse focus with shift + tab
    const trapRevFocus = (e: KeyboardEvent) => {
      if (
        e.key === "Tab" &&
        e.shiftKey &&
        document.activeElement === firstFocusableEl
      ) {
        // If focus was on the first element, move focus to last element
        lastFocusableEl.focus();
        currentFocusEl = lastFocusableEl;
        e.preventDefault();
      }
    };

    document.addEventListener("focus", trapFocus, true);
    document.addEventListener("keydown", trapRevFocus);

    return () => {
      document.removeEventListener("focus", trapFocus, true);
      document.removeEventListener("keydown", trapRevFocus);
      // Focus back to the element which opened the modal
      prevFocusEl?.focus();
    };
  }, [modalExists]);

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
