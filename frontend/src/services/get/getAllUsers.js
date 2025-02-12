export async function getAllUsers() {
  try {
    const response = await fetch("http://localhost:5000/api/users");
    console.log(response);
    if (!response.ok) {
      throw new Error(" Error fetching the users");
    }
    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error(" Error fetching the users", err);
  }
}
