import { wait } from './promises';

type User = {
  name: string;
  cool: boolean;
};

async function getUser(id: number): Promise<User> {
  await wait(0);
  if (id === 69) {
    throw new Error('User Now Found');
  }
  return {
    name: 'Wes bos',
    cool: true,
  };
}

async function collect<T>(
  promise: Promise<T>
): Promise<[error: null, data: T] | [error: Error, data: null]> {
  try {
    const data = await promise;
    return [null, data]; // [null, User]
  } catch (err) {
    return [err as Error, null]; // [Error, null]
  }
}

const [userError, user] = await collect(getUser(123));
if (userError) {
  console.log(userError);
} else {
  console.log(user);
}

async function handleUserSave() {
  const [userError, user] = await collect(getUser(123));
  if (userError) {
    console.log('ERROR! 404');
    return;
  }
  // HAPPY PATH
  user.cool; // Exists for sure!
}
