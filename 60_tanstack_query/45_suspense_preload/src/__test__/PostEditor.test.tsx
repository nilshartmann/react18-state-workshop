import React from "react";
import { render, screen } from "@testing-library/react";
import _userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { jest } from "@jest/globals";

const mutateAsyncMock = jest.fn();
const resetMutationMock = jest.fn();

jest.unstable_mockModule("../use-save-post-mutation.ts", () => {
  return {
    useSaveBlogPostMutation: () => {
      return {
        isError: false,
        mutateAsync: mutateAsyncMock,
        reset: resetMutationMock,
      };
    },
  };
});

const { default: PostEditor } = await import("../PostEditor");

const setup = () => {
  const user = _userEvent.setup();

  render(
    <MemoryRouter>
      <PostEditor />
    </MemoryRouter>,
  );

  const titleInput = screen.getByLabelText("Title");
  const bodyInput = screen.getByLabelText("Body");
  const saveButton = screen.getByRole("button", { name: "Save Post" });

  return {
    user,

    titleInput,
    bodyInput,

    saveButton,
  } as const;
};

test("add post button callback", async () => {
  const { user, titleInput, bodyInput, saveButton } = setup();

  // enter form
  await user.type(titleInput, "New Title");
  await user.type(bodyInput, "New Body");

  // click save
  expect(saveButton).toBeEnabled();
  await user.click(saveButton);

  expect(mutateAsyncMock).toHaveBeenCalledWith({
    body: "New Body",
    title: "New Title",
  });
});

test("save button enablement", async () => {
  const { user, titleInput, bodyInput, saveButton } = setup();

  // Save Button should be disabled
  expect(saveButton).toBeDisabled();
  expect(titleInput).toBeEnabled();

  // enter Title...
  await user.type(titleInput, "New Title");

  expect(titleInput).toHaveValue("New Title");

  expect(resetMutationMock).toHaveBeenCalled();

  // should still be disabled
  expect(saveButton).toBeDisabled();

  // enter body
  await user.type(bodyInput, "New Body");

  // ...now the button should be enabled
  expect(saveButton).toBeEnabled();
});

test("clear button", async () => {
  const { user, titleInput, bodyInput, saveButton } = setup();

  const clearButton = screen.getByRole("button", { name: "Clear" });

  // enter form
  await user.type(titleInput, "New Title");
  await user.type(bodyInput, "New Body");

  expect(titleInput).toHaveValue("New Title");

  await user.click(clearButton);

  expect(titleInput).toHaveValue("");
  expect(bodyInput).toHaveValue("");
});
