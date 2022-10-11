import wait from 'waait';
import { speak } from './speech';

const timer = document.querySelector<HTMLDivElement>('.timer');
const timerProgress = document.querySelector<SVGCircleElement>('.timer-progress');
const controls = document.querySelector<HTMLDivElement>('.app-controls');
const startButton = controls.querySelector<HTMLButtonElement>('.start');
const pauseButton = controls.querySelector<HTMLButtonElement>('.pause');
const stopButton = controls.querySelector<HTMLButtonElement>('.stop');
const editor = document.querySelector<HTMLDivElement>('.editor');

let paused = false;
let requestToStop = false;

interface StretchGroup {
  name: string;
  startSpeak: string;
  stopSpeak: string;
  repetitions: number;
  repetitionLength: number; // seconds
  gapLength: number; // How many ms between each
}


let schedule: StretchGroup[] = [
  {
    name: 'Hamstrings',
    startSpeak: 'Reach',
    stopSpeak: 'Release',
    repetitions: 2,
    repetitionLength: 2,
    gapLength: 50,
  },
  {
    name: 'Ankle To Knee',
    startSpeak: 'start',
    stopSpeak: 'stop',
    repetitions: 10,
    repetitionLength: 3,
    gapLength: 50,
  },
  {
    name: 'Third Exercise',
    startSpeak: 'start',
    stopSpeak: 'stop',
    repetitions: 10,
    repetitionLength: 3,
    gapLength: 50,
  },
];

function  renderFormInputs(key: string, value: string | number) {
  return `
    <div class="stretch-input">
      <label for="${key}">${key.replace(/([A-Z]+)/g, ' $1')}</label>
      <input type="text" id="${key}" name="${key}" value="${value}">
    </div>
  `
}

function renderGroups(groups: StretchGroup[]) {
  return `<div class="stretch-groups">
    ${
      groups.map((group, i) => (`
      <div class="stretch-group">
        <header>
          <h2>${i + 1}. ${group.name}</h2>
          <div class="controls">
          ${i > 0 ? `<button data-move-up="${i}" type="button" title="Move Up">↑</button>` : ``}
          ${i !== groups.length - 1 ? `<button data-move-down="${i}" type="button" title="Move Down">↓</button>` : ``}
          <button data-delete="${i}" type="button" title="Delete Group">&times;</button>
          </div>
        </header>
        <section>
          ${Object
            .entries(group)
            .map(([key, value]) => renderFormInputs(key, value)).join('')}
        </section>
      </div>
        `))
      .join('')
    }
    <form class="add-group">
      <div class="stretch-group stretch-add">
        <header>
          <h2>Add A Group</h2>
          <div class="controls">
            <button type="submit">+ Add Group</button>
          </div>
        </header>
        ${renderFormInputs('name', 'Test')}
        ${renderFormInputs('startSpeak', 'Starting')}
        ${renderFormInputs('stopSpeak', 'Stop')}
        ${renderFormInputs('repetitions', 10)}
        ${renderFormInputs('repeitionLength', 2)}
        ${renderFormInputs('gapLength', 50)}
      </div>
    </form>
  </div>`;
}


interface DOMEvent extends Event {
  target:  HTMLElement,
  currentTarget: HTMLElement
}

function init() {
  editor.innerHTML = renderGroups(schedule);
}

init();

function expandStretches(stretchGroups: StretchGroup[]): Stretch[] {
  return stretchGroups
    // Turn each group into an array of stretches
    .map((group) => Array.from({ length: group.repetitions}, function() {
      const stretch = { ...group };
      delete stretch.repetitions;
      return stretch;
    }))
    .flat()
}


async function pauseUntil() {
  return new Promise(function(resolve, reject) {
    const interval = setInterval(function() {
      console.log('Checking stop')
      if (requestToStop) {
        // turn it off
        console.log('Should Stop')
        requestToStop = true;
        clearInterval(interval);
        stopButton.textContent = 'Stop';
        speak('Stopped!');
        reject('stopping');
      }
      if(!paused) {
        resolve('');
        clearInterval(interval);
      }
    }, 50);
  })
}

async function run(stretches: StretchGroup[]) {
  // Reset all start/stop/pause variables
  requestToStop = false;
  for(const stretch of stretches) {
    console.log(stretch);
    await speak(`Starting ${stretch.name}, ${stretch.repetitions} repetitions`);
    const stretchLength = stretch.repetitions * stretch.repetitionLength;
    await pauseUntil();
    let even = true;
    for(const repetition of Array.from({ length: stretch.repetitions})) {
      await pauseUntil();
      even = !even;
      if(even) {
        timer.classList.add('even');
      } else {
        timer.classList.remove('even');
      }
      await speak(stretch.startSpeak);
      timerProgress.style.setProperty('--transitionLength', `${stretch.repetitionLength}s`);
      timerProgress.classList.add('on');
      await wait(stretch.repetitionLength * 1000);
      await speak(stretch.stopSpeak);
      timerProgress.style.setProperty('--transitionLength', `0.1s`);
      timer.classList.remove('even');
      timerProgress.classList.remove('on');
      await wait(stretch.gapLength);
    }
    await speak(`Finished ${stretch.name}`);
    timerProgress.classList.remove('on');
  }
}

// Event Listeners
startButton.addEventListener('click', () => run(schedule).catch(console.error));
stopButton.addEventListener('click', (e: Event) => {
  requestToStop = true;
  if(e.target instanceof HTMLButtonElement) {
    e.target.textContent = 'Stopping...';
  }
});
pauseButton.addEventListener('click', () => {
  paused = !paused;
  pauseButton.textContent = paused ? 'Resume' : 'Pause';
})

// Delete / Moove
editor.addEventListener('click', function (event: Event) {
  if (!(event.target instanceof HTMLButtonElement)) {
    return;
  }

  const button = event.target;
  if (button.dataset.delete) {
    const index = parseInt(button.dataset.delete);
    schedule = [...schedule.slice(0, index), ...schedule.slice(index + 1)];
    editor.innerHTML = renderGroups(schedule);
  }

  if (button.dataset.moveUp) {
    const index = parseInt(button.dataset.moveUp);
    schedule = [
      // The Items before the one being moved
      ...schedule.slice(0, index - 1),
      // The Item being Moved
      schedule[index],
      // The item being displaced / Shifted Down
      schedule[index - 1],
      // everything after
      ...schedule.slice(index + 1)
    ]
    editor.innerHTML = renderGroups(schedule);
  }

  if (button.dataset.moveDown) {
    const index = parseInt(button.dataset.moveDown);
    console.log('Moving down', index)
    schedule = [
      // THe Items before the one being moved
      ...schedule.slice(0, index),
      // The item being displaced / Shifted up
      schedule[index + 1],
      // THe Item being Moved
      schedule[index],
      // everything after
      ...schedule.slice(index + 2)
    ]
    editor.innerHTML = renderGroups(schedule);
  }
});

editor.addEventListener('submit', function (event: Event) {
  event.preventDefault();
  if (!(event.target instanceof HTMLFormElement)) return;
  const form = event.target;
  const data = new FormData(form);
  const newStretchGroup = Object.fromEntries(data.entries()) as unknown as StretchGroup;
  schedule.push(newStretchGroup);
  editor.innerHTML = renderGroups(schedule);
})
