const pets = ['snickers', 'sunny'] as const;

const theme = {
  yellow: '#ffc600',
  white: '#efefef',
  padding: 20,
} as const;

const name = 'wes';
const pi = 3.14;

const element = document.querySelector('.what');
const element2 = document.querySelector<HTMLInputElement>('.what');
const element3 = document.querySelector('.what') as HTMLInputElement;
const element4 = document.querySelector('.what') as number;

export {};
