export async function getAllProtocols() {
  try {
    const response = await fetch("http://localhost:5000/protocols");
    
    if (!response.ok) {
      throw new Error(" Error fetching the Protocols");
    }
    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error(" Error fetching the users", err);
  }
}
