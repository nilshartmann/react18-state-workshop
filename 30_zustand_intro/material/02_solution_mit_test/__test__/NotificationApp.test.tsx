import NotificationApp from "../NotificationApp.tsx";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useNotificationStore } from "../NotificationStore.tsx";
test("01 initial", async () => {
  render(<NotificationApp />);

  expect(
    screen.getByRole("heading", { name: /Keine Notification/i }),
  ).toBeInTheDocument();

  userEvent.click(screen.getByRole("button", { name: /not_found/i }));

  expect(
    await screen.findByRole("heading", { name: /Not found/i }),
  ).toBeInTheDocument();
});

// 😈 😈 😈 😈 😈 😈 😈 😈 😈 😈 😈
// ‼️ ‼️‼️ ‼️‼️ ‼️‼️ ‼️‼️ ‼️‼️ ‼️‼️ ‼️
//  Store wird NICHT zurückgesetzt zwischen den Tests !!
//
// ‼️ ‼️‼️ ‼️‼️ ‼️‼️ ‼️‼️ ‼️‼️ ‼️‼️ ‼️
// 😈 😈 😈 😈 😈 😈 😈 😈 😈 😈 😈

test("02 second", async () => {
  render(<NotificationApp />);

  expect(
    screen.queryByRole("heading", { name: /Keine Notification/i }),
  ).not.toBeInTheDocument();

  const initialState = useNotificationStore.getInitialState();
  useNotificationStore.setState(initialState);

  expect(
    await screen.findByRole("heading", { name: /Keine Notification/i }),
  ).toBeInTheDocument();
});
