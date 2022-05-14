import "@testing-library/jest-dom";
import {
  fireEvent,
  render,
  RenderResult,
  screen,
} from "@testing-library/react";
import {
  ModalActionTypes,
  ModalContext,
  ModalContextProvider,
} from "../contexts/useModalContext";

describe("ModalContext", () => {
  let MockModal: RenderResult;

  beforeEach(() => {
    MockModal = render(
      <ModalContextProvider>
        <ModalContext.Consumer>
          {(value) => (
            <>
              <p data-testid="modal-state">
                Modal state: {value?.state.modalExists ? "open" : "closed"}
              </p>
              {value?.state.modalExists && (
                <>
                  <section>{value.state.children}</section>
                  <p data-testid="modal-top">
                    Modal top: {value.state.location.top}
                  </p>
                  <p data-testid="modal-center">
                    Modal center: {value.state.location.center}
                  </p>
                </>
              )}
              <button
                data-testid="modal-open"
                onClick={() =>
                  value?.dispatch({
                    type: ModalActionTypes.CREATE_MODAL,
                    children: <span>This is a test Modal!</span>,
                    location: { top: 300, center: 450 },
                  })
                }
              >
                Open Modal
              </button>
              <button
                data-testid="modal-close"
                onClick={() =>
                  value?.dispatch({ type: ModalActionTypes.DELETE_MODAL })
                }
              >
                Close Modal
              </button>
            </>
          )}
        </ModalContext.Consumer>
      </ModalContextProvider>
    );
  });

  it("should open a modal at specific position and close properly", async () => {
    const { getByTestId } = MockModal;
    const modalState = getByTestId("modal-state");

    // Initially, modal shouldn't be open!
    expect(modalState).toHaveTextContent("Modal state: closed");

    // Opening a modal
    fireEvent.click(await screen.findByText("Open Modal"));
    expect(modalState).toHaveTextContent("Modal state: open");

    // Modal location should be visible if modal is open
    expect(await screen.findByText("Modal top: 300")).toBeVisible();
    expect(await screen.findByText("Modal center: 450")).toBeVisible();

    // Closing the modal
    fireEvent.click(await screen.findByText("Close Modal"));
    expect(modalState).toHaveTextContent("Modal state: closed");
  });
});
