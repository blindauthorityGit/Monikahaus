import { useEffect, useRef } from "react";

const FOCUSABLE_SELECTOR =
    'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function useModalFocus(isOpen, onClose, containerRef) {
    const onCloseRef = useRef(onClose);

    useEffect(() => {
        onCloseRef.current = onClose;
    }, [onClose]);

    useEffect(() => {
        const container = containerRef.current;
        if (!isOpen || !container) return;

        const previouslyFocused = document.activeElement;
        const getFocusableElements = () =>
            Array.from(container.querySelectorAll(FOCUSABLE_SELECTOR)).filter(
                (element) => !element.hasAttribute("aria-hidden")
            );

        (getFocusableElements()[0] || container).focus();

        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                event.preventDefault();
                onCloseRef.current?.();
                return;
            }

            if (event.key !== "Tab") return;

            const focusableElements = getFocusableElements();
            if (focusableElements.length === 0) {
                event.preventDefault();
                container.focus();
                return;
            }

            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            if (event.shiftKey && (document.activeElement === firstElement || !container.contains(document.activeElement))) {
                event.preventDefault();
                lastElement.focus();
            } else if (
                !event.shiftKey &&
                (document.activeElement === lastElement || !container.contains(document.activeElement))
            ) {
                event.preventDefault();
                firstElement.focus();
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            if (previouslyFocused instanceof HTMLElement && previouslyFocused.isConnected) {
                previouslyFocused.focus();
            }
        };
    }, [isOpen, containerRef]);
}
