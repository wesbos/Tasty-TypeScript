type Score = Record<string, number>;

const scores = {
  wes: 100,
  scott: 200,
} satisfies Score;

scores.wes = 200;
scores.was = 200;
scores.scott = 300;
scores['200'] = 300;
scores.scott.toFixed()

type Setting = string | number | { [key: string]: Setting } | Setting[];
type Settings = Record<string, Setting>;

function getData() {
  return { you: 'good' };
}

const mySettings = {
  title: `Wes' Website`,
  data: getData(),
  size: 200,
  overrides: [{ 'font-size': '20px' }],
  styleConfig: {
    color: 'red',
  },
} satisfies Settings;


// Valid Properties
mySettings.title = 'New title';
console.log(mySettings.size);
// Invalid Properties
console.log(mySettings.scott);
mySettings.limt = 200;

mySettings.size.toLocaleString();

mySettings.overrides.at(0)?.['font-size'];

console.log(metaData.title);
console.log(metaData.doesntExist);

export { };
