import { handlePlayPause } from '../dom';

/**
 *
 * @param el The Parent Element you want to listen on
 * @param selector The selector to delegate to
 * @param event The event to listen for
 * @param handler The handler to call when the event is fired
 */
export function delegate(el: Element, selector: string, event: string, handler: EventListener, options?: boolean | AddEventListenerOptions) {
  // Note to wes: Show this neat trick!
  // type WhatIsThisType = Parameters<typeof document.addEventListener>[2]

  el.addEventListener(event, (e: Event) => {
    const target = e.target as Element;
    if (target.matches(selector)) {
      handler(e);
    }
  }, options);
}


// I have <audio> elements that are not in the DOM yet, but I want to listen for play/pause on page load without attaching event listeners to every single <audio> creaed.

// play/pause don't bubble up, but they do ~capture down~. So we listen on a parent element (like )
document.body.addEventListener('play', handlePlayPause, { capture: true });
document.body.addEventListener('pause', handlePlayPause, { capture: true });

