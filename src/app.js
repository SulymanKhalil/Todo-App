export async function getInitialState() {
  const user = localStorage.getItem("user");

  return {
    user: user ? JSON.parse(user) : null,
  };
}
