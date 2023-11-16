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

// 1.Tally the total money made
const starterValue = 0;
const total: number = dummyData.reduce(
  (acc, value) => acc + value.amount,
  starterValue
);
// 1. Tally how many of each course sold
const coursesSold = dummyData.reduce((acc, value) => {
  const key = value.course;
  acc[key] = acc[key] + 1 || 1;
  // if (acc[key]) {
  //   acc[key] += 1;
  // } else {
  //   acc[key] = 1;
  // }
  return acc;
}, {} as Record<Course, number>);
// 2. Tally amount made on each course

type CourseSales = Partial<Record<Course, number>>;
const courseSales: CourseSales = {};

const totalMade = dummyData.reduce((acc, value) => {
  const key = value.course;
  acc[key] = acc[key] ? Number(acc[key]) + value.amount : value.amount;
  return acc;
}, {} as CourseSales);

// 3. Group the courses sold by country
const starterValueMap = new Map<CountryCode, CourseOrder[]>();
const coursesSoldByCountry = dummyData.reduce((acc, value) => {
  const exisitingCountryArray = acc.get(value.country);
  if (exisitingCountryArray) {
    exisitingCountryArray.push(value);
  } else {
    acc.set(value.country, [value]);
  }
  return acc;
}, starterValueMap);
console.log(coursesSoldByCountry);
// 4. Create a map of each country and the amount of students and $$ spent
type CourseTallyStat = {
  students: number;
  amountSpent: number;
};
const starterValueMap2 = new Map<CountryCode, CourseTallyStat>();

const courseStats = dummyData.reduce((acc, value) => {
  // 1. Check if this country exists in the map
  // 2. Increment the students adn amountSpend by however much!
  const existingCountry = acc.get(value.country);
  const valueForCurrent: CourseTallyStat = {
    students: 1,
    amountSpent: value.amount,
  };
  if (existingCountry) {
    valueForCurrent.students += existingCountry.students;
    valueForCurrent.amountSpent += existingCountry.amountSpent;
  }
  acc.set(value.country, valueForCurrent);
  return acc;
}, starterValueMap2);
console.log(courseStats);
