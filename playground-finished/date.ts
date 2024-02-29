const now = new Date();

const formatter = new Intl.DateTimeFormat('en-CA', {
  dateStyle: 'full',
  timeStyle: 'long',
});

const formattedTime = formatter.format(now);

console.log(formattedTime);
