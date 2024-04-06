import { renderHook, act } from "@testing-library/react";
import {
  useNotificationMessage,
  useNotificationStore,
} from "../NotificationContext.tsx";

test("01 useNotificationStore test", async () => {
  const { result } = renderHook(() => useNotificationStore());

  expect(result.current.messageId).toBeNull();

  act(() => result.current.showNotification("invalid_user_id"));

  expect(result.current.messageId).toBe("invalid_user_id");

  act(() => result.current.showNotification(null));

  expect(result.current.messageId).toBeNull();
});

test("01 useMessage test", async () => {
  const { result } = renderHook(() => useNotificationMessage());

  expect(result.current).toBeNull();

  // da der Store global ist, können wir den hier verwenden!
  act(() =>
    useNotificationStore.setState({
      messageId: "not_found",
    }),
  );

  expect(result.current).toBe("Not found");
  act(() =>
    useNotificationStore.setState({
      lang: "de",
    }),
  );

  expect(result.current).toBe("Nicht gefunden");

  // Zurücksetzen, da der Store global ist und sonst andere Testergebnisse verfälscht!
  act(() =>
    useNotificationStore.setState(useNotificationStore.getInitialState()),
  );

  // Überflüssige expects hier. Nur um zu demonstrieren, dass der Store wieder zurückgesetzt wurde:
  expect(result.current).toBeNull();
  expect(useNotificationStore.getState().messageId).toBeNull();
  expect(useNotificationStore.getState().lang).toBe("en");
});
