/**
 *
 * @param el The Parent Element you want to listen on
 * @param selector The selector to delegate to
 * @param event The event to listen for
 * @param handler The handler to call when the event is fired
 */
export function delegate(
  el: Element,
  selector: string,
  event: string,
  handler: EventListener,
  options?: boolean | AddEventListenerOptions
) {
  // Note to wes: Show this neat trick!
  // type WhatIsThisType = Parameters<typeof document.addEventListener>[2]
  if (!el) return; // we check for the el here so we can pass in any querySelector value without checking it first

  el.addEventListener(
    event,
    (e: Event) => {
      const target = e.target as Element;
      if (target.matches(selector)) {
        handler(e);
      }
    },
    options
  );
}
