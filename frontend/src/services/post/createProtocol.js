export async function createNewProtocol(newProtocol) {
  try {
    const response = await fetch("http://localhost:5000/protocols", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProtocol),
    });

    if (!response.ok) {
      throw new Error("Failed to create protocol");
    }

    console.log("Protocol created:", response);
  } catch (error) {
    console.error("Error:", error);
  }
}
