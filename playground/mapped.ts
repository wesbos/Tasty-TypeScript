type CourseCode = 'RFB' | 'TTS' | 'ARG' | 'WTF';

type CourseInfo = {
  name: string;
  price: number;
  courseCode: CourseCode;
};

type CourseOptions = {
  [key in CourseCode]?: CourseInfo & { courseCode: key };
};

const courseOptions: CourseOptions = {
  ARG: {
    name: 'Advanced React and GRaphQL',
    courseCode: 'ARG',
    price: 10000000,
  },
};

// Record Types
type CourseOptions2 = Partial<Record<CourseCode, CourseInfo>>;

const myCourseData: CourseOptions2 = {
  ARG: {
    name: 'Advanced React and GRaphQL',
    courseCode: 'ARG',
    price: 10000000,
  },
};

// metadata
type MetaData = Record<string | number | symbol, any>;

const myMeta: MetaData = {
  dog: 'snickers',
  course: myCourseData.ARG,
};

function saveAnyData(anyDatathatTheyGiveus: MetaData) {
  console.log(anyDatathatTheyGiveus);
}

saveAnyData('asdfs');
saveAnyData(12324);

saveAnyData({
  [Symbol('wes')]: 'bos',
  [Symbol('wes')]: 'terhoff',
});
