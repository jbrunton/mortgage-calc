import userEvent from "@testing-library/user-event";
import { ModalDialog } from "./ModalDialog";
import { render, screen, waitFor } from "@testing-library/react";

describe("ModalDialog", () => {
  const onClose = jest.fn();
  const onSubmit = jest.fn();

  const title = "My Dialog";

  const setup = ({ show }: { show: boolean }) => {
    const user = userEvent.setup();
    render(
      <ModalDialog
        show={show}
        title={title}
        onClose={onClose}
        onSubmit={onSubmit}
      >
        <p>Dialog Body</p>
      </ModalDialog>
    );
    return { user };
  };

  it("renders when show = true", async () => {
    setup({ show: true });
    await waitFor(() => {
      expect(screen.getByText("My Dialog")).toBeVisible();
      expect(screen.getByText("Dialog Body")).toBeVisible();
    });
  });

  it("invokes onClose on cancel", async () => {
    const { user } = setup({ show: true });

    await user.click(screen.getByText("Cancel"));

    expect(onClose).toHaveBeenCalled();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("invokes onSubmit on submit", async () => {
    const { user } = setup({ show: true });

    await user.click(screen.getByText("Submit"));

    expect(onClose).toHaveBeenCalled();
    expect(onSubmit).toHaveBeenCalled();
  });
});
