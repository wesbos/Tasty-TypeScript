const select = document.querySelector('select');
enum WeightUnit {
  g = 'grams',
  kg = 'kilograms',
  pounds = 'pounds',
}

enum Direction {
  UP = 1,
  DOWN,
  LEFT,
  RIGHT,
}

console.log(Direction);

function move(direction: Direction) {
  console.log('You are moving', direction);
}

move(Direction.DOWN);

function convertWeight(value: number, unit: WeightUnit) {
  return 100;
}

function populateWeights() {
  if (!select) return;
  const html = Object.entries(WeightUnit).map(
    ([key, val]) => `<option value="${key}">${val}</option>`
  );
  select.innerHTML = html.join('');
}

populateWeights();

convertWeight(100, WeightUnit.kg);

enum FontWeights {
  light = 100,
  normal = 400,
  bold = 700,
  heavy = 900,
}

console.log(FontWeights);

export {};
