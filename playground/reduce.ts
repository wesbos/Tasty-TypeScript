// Group by Countries
type Course = 'BJS' | 'TTS' | 'JS30' | 'GRID' | 'RFB';
type CountryCode = 'US' | 'VN' | 'CA' | 'DE' | 'UK';

interface CourseOrder {
  id: number;
  amount: number;
  name: string;
  course: Course;
  country: CountryCode;
}

const dummyData: CourseOrder[] = [
  {
    id: 1,
    amount: 99,
    name: 'Silly Billy',
    course: 'BJS',
    country: 'US',
  },
  {
    id: 2,
    amount: 49,
    name: 'Banana Pants',
    course: 'TTS',
    country: 'VN',
  },
  {
    id: 3,
    amount: 79,
    name: 'Captain Underpants',
    course: 'JS30',
    country: 'CA',
  },
  {
    id: 4,
    amount: 69,
    name: 'Super Duper',
    course: 'GRID',
    country: 'DE',
  },
  {
    id: 5,
    amount: 59,
    name: 'Funny Bunny',
    course: 'RFB',
    country: 'UK',
  },
  {
    id: 6,
    amount: 99,
    name: 'Crazy Eyes',
    course: 'BJS',
    country: 'US',
  },
  {
    id: 7,
    amount: 49,
    name: 'Silly Goose',
    course: 'TTS',
    country: 'VN',
  },
  {
    id: 8,
    amount: 79,
    name: 'Weird Beard',
    course: 'JS30',
    country: 'CA',
  },
  {
    id: 9,
    amount: 69,
    name: 'Loud Mouth',
    course: 'GRID',
    country: 'DE',
  },
  {
    id: 10,
    amount: 59,
    name: 'Funky Monkey',
    course: 'RFB',
    country: 'UK',
  },
  {
    id: 11,
    amount: 99,
    name: 'Sleepy Head',
    course: 'BJS',
    country: 'US',
  },
  {
    id: 12,
    amount: 49,
    name: 'Big Foot',
    course: 'TTS',
    country: 'VN',
  },
  {
    id: 13,
    amount: 79,
    name: 'Happy Pants',
    course: 'JS30',
    country: 'CA',
  },
  {
    id: 14,
    amount: 69,
    name: 'Mr. Funny Bones',
    course: 'GRID',
    country: 'DE',
  },
  {
    id: 15,
    amount: 59,
    name: 'Weird Beard Jr.',
    course: 'RFB',
    country: 'UK',
  },
];

// 1. Tally the total money made
// 2. Tally how many of each course sold
// 3. Tally amount made on each course
// 4. Group the courses sold by country
// 5. Create a map of each country and the amount of students and $$ spent

console.log('hi');
