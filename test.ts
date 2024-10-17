let nextUserId = 1;

type User = {
	id: number,
	username: string,
	role: "member" | "contributor" | "admin"
};

type UpdatedUser = Partial<User>;

const users: User[] = [
	{ id: nextUserId++, username: "john_doe", role: "member" },
	{ id: nextUserId++, username: "jane_doe", role: "contributor" },
	{ id: nextUserId++, username: "alice_jones", role: "admin" },
	{ id: nextUserId++, username: "charlie_brown", role: "member" }
] 

function updateUser(id: number, updates: UpdatedUser) {
	const foundUser = users.find(userObj => id === userObj.id);
	if (!foundUser) {
		console.error("User not found");
		return;
	}
	Object.assign(foundUser, updates);
}

function addNewUser(newUser: Omit<User, "id">): User {
	const user: User = {
		id: nextUserId++,
		...newUser
	};
	users.push(user);
	return user;
}

addNewUser({ username: "joe_schmoe", role: "member" })
