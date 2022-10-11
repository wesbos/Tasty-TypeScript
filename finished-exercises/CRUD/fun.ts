const fields = [{
  inputType: 'text',
  label: 'ID',
  name: 'id'
}, {
  inputType: 'text',
  label: 'Description',
  name: 'description'
}, {
  inputType: 'number',
  label: 'Price',
  name: 'price'
}] as const

type Field = (typeof fields)[number]

type Item = { [K in Field['name']]: string; }
