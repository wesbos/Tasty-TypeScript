export function delegate(
  el: Element,
  selector: string,
  event: keyof WindowEventMap,
  handler: EventListener,
  options?: boolean | AddEventListenerOptions
) {
  el.addEventListener(
    event,
    (e: Event) => {
      const target = e.target as Element;
      // If the thing they clicked on matches the selector passed in, then run the handler!
      if (target.matches(selector)) {
        handler(e);
      }
    },
    options
  );
}
