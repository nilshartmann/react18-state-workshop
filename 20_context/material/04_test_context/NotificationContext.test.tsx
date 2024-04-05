import { act, renderHook } from "@testing-library/react";
import NotificationContextProvider, {
  useNotificationContext,
} from "../NotificationContext.tsx";

test("context works", () => {
  const r = renderHook(() => useNotificationContext(), {
    wrapper: ({ children }) => (
      <NotificationContextProvider>{children}</NotificationContextProvider>
    ),
  });

  expect(r.result.current.messageId).toBe(null);

  act(() => {
    r.result.current.showNotification("not_found");
  });

  expect(r.result.current.messageId).toBe("not_found");
});
