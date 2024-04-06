import NotificationApp from "../NotificationApp.tsx";
import { render, screen } from "@testing-library/react";
import _userEvent from "@testing-library/user-event";
import { useNotificationStore } from "../NotificationContext.tsx";

test("01 initial", async () => {
  const user = _userEvent.setup();

  render(<NotificationApp />);

  // ⚠️  Initial State: "Keine Notification" sichtbar

  expect(
    screen.getByRole("heading", { name: /Keine Notification/i }),
  ).toBeInTheDocument();

  await user.click(screen.getByRole("button", { name: /not_found/i }));

  // Achtung! Updates erfolgen asynchron, deswegen muessen wir hier ggf.
  //  warten
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

  // ⚠️  Da der Store nicht zurückgesetzt wird,
  //     ist hier "Keine Notification" NICHT sichtbar,
  //     wenn beide Tests hintereinander ausgeführt werden
  // ⚠️  Wenn dieser Test einzeln ausgeführt wird, ist er "rot"

  expect(
    screen.queryByRole("heading", { name: /Keine Notification/i }),
  ).not.toBeInTheDocument();

  const initialState = useNotificationStore.getInitialState();
  useNotificationStore.setState(initialState);

  expect(
    await screen.findByRole("heading", { name: /Keine Notification/i }),
  ).toBeInTheDocument();
});
