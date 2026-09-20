import { useEffect, useRef } from "react";

export function useMenuDialog(onClose: () => void) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const closeCallback = useRef(onClose);

  useEffect(() => {
    closeCallback.current = onClose;
  }, [onClose]);

  useEffect(() => {
    const dialog = dialogRef.current;
    dialog?.showModal();
    closeRef.current?.focus({ preventScroll: true });
    const desktop = window.matchMedia("(min-width: 768px)");
    const handleResize = () => {
      if (desktop.matches) closeCallback.current();
    };
    desktop.addEventListener("change", handleResize);
    return () => {
      desktop.removeEventListener("change", handleResize);
      dialog?.close();
    };
  }, []);

  return { dialogRef, closeRef };
}
