type BillOptions = {
  total: number;
  gst: number;
  pst: number;
};

function calculateBill(options: BillOptions): number;
function calculateBill(total: number): number;
function calculateBill(total: number, gst: number, pst: number): number;
function calculateBill(
  totalOrOptions: number | BillOptions,
  gst?: number,
  pst?: number
) {
  if (typeof total === 'number') {
  }
  const tip = 0.15;
  if (gst && pst) {
    return total + total * gst + total * pst + total * tip;
  }
  return total + total * tip;
}

calculateBill(100);
calculateBill(100, 0.06, 0.07);
calculateBill(100, 0.06); // Should Error!

type Callback<ReturnType> = (error: Error | null, result: ReturnType) => void;
type User = {
  name: string;
  id: string;
  age: number;
};
async function getUser(id: string): Promise<User>;
function getUser(id: string, callback: Callback<User>): void;
async function getUser(id: string, callback?: Callback<User>) {
  const user: User = {
    name: 'wes',
    age: 100,
    id: 'abc123',
  };
  if (callback) {
    return callback(null, user);
  }
  return user;
}

const user = await getUser('abc123');
getUser('abc123').then((user) => {
  console.log(user.age);
});

getUser('abc123', (err, myUser) => {
  console.log(myUser);
});

export {};
