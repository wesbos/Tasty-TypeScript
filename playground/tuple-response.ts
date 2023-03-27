type User = {
  name: string;
  id: number;
  featureFlags: string[];
};

function queryDB(id: number): User {
  // Mimic a DB either reutnring some data, OR throwing an error
  if (Math.random() > 0.5) {
    throw new Error(`User ${id} not found!`);
  }
  return {
    name: 'Name',
    id,
    featureFlags: ['Beta'],
  };
}

type UserResponse = [Error, undefined] | [undefined, User];
function getUser(id: number): UserResponse {
  try {
    const user = queryDB(id);
    return [undefined, user];
  } catch (err) {
    return [err as Error, undefined];
  }
}

const [error, user] = getUser(123);
if (error) {
  console.log(error);
  document.body.textContent = error.message;
  // display the error
} else {
  document.body.textContent = `Hello ${user.name}! Your id is ${user.id}`;
  console.log(user);
}
// go ahead and use the user

export {};
