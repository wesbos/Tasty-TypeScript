const itemsEl = document.querySelector<HTMLUListElement>('.items');
const assistive = document.querySelector<HTMLSpanElement>('.assistiveReorder');

const nothing = document.createElement('img');
nothing.src =
  'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';

function updateLiveText(text: string) {
  if (assistive) {
    assistive.textContent = text;
  }
}

function handleDragStart(e: DragEvent) {
  const target = e.target as HTMLElement;
  const el = target.closest('li');
  if (!el) return;
  el.classList.add('drag');
  // We need to store reference to this element that is being dragged so that when it's dropped, we can move it
  if (!e.dataTransfer) return;
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setDragImage(nothing, 0, 0);
  // Since we can't access this data on
  const itemIndex = el.dataset.item || '';
  e.dataTransfer.setData(`index-${itemIndex}`, 'dummy data');
}

function handleDrag(e: DragEvent) {
  const target = e.target as HTMLElement;
  const el = target.closest('li');
  if (!el || !e.dataTransfer?.types.length) return;
  const [indexKey] = e.dataTransfer?.types as string[];
  const index = indexKey.replace('index-', '');
  const movingItem = itemsEl?.querySelector(`[data-item="${index}"]`);

  if (el && movingItem) {
    el.insertAdjacentElement('beforebegin', movingItem);
  }
  if (e.type === 'dragover' && e.dataTransfer) {
    e.preventDefault();
    // Set the dropEffect to move
    // e.dataTransfer.dropEffect = 'move';
  }
}

function handleDrop(e: DragEvent) {
  e.preventDefault();
  if (!e.dataTransfer?.types?.length) return;
  e.dataTransfer.dropEffect = 'move';
  const target = e.target as HTMLElement;
  const el = target.closest('li');
  el?.classList.remove('drag');
  // assignClasses(el, e.type);
  const [indexKey] = e.dataTransfer?.types as string[];
  const index = indexKey.replace('index-', '');
  const movingItem = itemsEl?.querySelector(`[data-item="${index}"]`);
  if (movingItem && el) {
    movingItem.classList.remove('drag');
    el.insertAdjacentElement('beforebegin', movingItem);
  }
}

let isReordering = false;
function handleKeyUp(e: KeyboardEvent) {
  const target = e.target as HTMLElement;
  const el = target.closest('li');
  if (!el) return;

  // some vars of the items
  const itemName = el.textContent || '';
  const itemsTotal = itemsEl?.childElementCount || 0;
  const currentIndex = itemsEl?.children
    ? Array.from(itemsEl?.children).findIndex((node) => node === el) + 1
    : 0;
  // Space bar the Stop
  if (e.code === 'Space' && isReordering) {
    e.preventDefault();
    el.classList.remove('drag');
    isReordering = false;
    updateLiveText(
      `${itemName}, dropped. Final position in list: ${currentIndex} of ${itemsTotal}.`
    );
    return;
  }
  // Space Bar To Start
  if (e.code === 'Space') {
    isReordering = true;
    el?.classList.add('drag');
    // TODO Text
    updateLiveText(
      `${itemName}, grabbed. Current position in list: ${currentIndex} of ${itemsTotal}. Press up and down arrow keys to change position, Spacebar to drop.`
    );
  }

  // Up and down Arrows
  if (e.code === 'ArrowUp' && isReordering) {
    if (el.previousElementSibling) {
      el.previousElementSibling.insertAdjacentElement('beforebegin', el);
      el.focus();
      updateLiveText(
        `${itemName}. Current position in list: ${
          currentIndex - 1
        } of ${itemsTotal}.`
      );
    }
  }
  if (e.code === 'ArrowDown' && isReordering) {
    if (el.nextElementSibling) {
      el.nextElementSibling.insertAdjacentElement('afterend', el);
      el.focus();
      updateLiveText(
        `${itemName}. Current position in list: ${
          currentIndex + 1
        } of ${itemsTotal}.`
      );
    }
  }
  // abort if someone presses tab when they are re-ordering
  if (e.code === 'Tab' && isReordering) {
    console.log('aborting');
    isReordering = false;
    const drag = itemsEl?.querySelector('.drag');
    console.log(drag);
    if (drag) drag.classList.remove('drag');
    updateLiveText(
      `${itemName}, dropped. Final position in list: ${currentIndex} of ${itemsTotal}.`
    );
  }
}

// EventListener is already built into typescript, but if we wanted to type our own:
// type EventListener2<EventType extends Event> = (e: EventType) => void;

type Funky<FunkyType> = (e: FunkyType) => void;
function delegate<EventType extends Event>(
  selector: string,
  callback: Funky<EventType>
) {
  return function delegator(e: EventType): void {
    const target = e.target as HTMLElement;
    // if we are the element we are looking for
    // OR are inside the element we are looking for
    if (target.matches(selector) || target.closest(selector)) {
      // pass the data on
      return callback(e);
    }
  };
}

function init() {
  if (!itemsEl) {
    throw new Error('No items el found!');
  }
  // Start
  itemsEl.addEventListener(
    'dragstart',
    delegate<DragEvent>('li', handleDragStart)
  );
  // Drag Moves
  itemsEl.addEventListener('drag', delegate('li', handleDrag));
  itemsEl.addEventListener('dragenter', delegate('li', handleDrag));
  itemsEl.addEventListener('dragleave', delegate('li', handleDrag));
  itemsEl.addEventListener('dragover', delegate('li', handleDrag));
  // Drops
  itemsEl.addEventListener('dragend', delegate('li', handleDrop));
  itemsEl.addEventListener('drop', delegate('li', handleDrop));
  itemsEl.addEventListener('keyup', delegate('li', handleKeyUp));
}

init();
