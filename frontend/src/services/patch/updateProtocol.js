export async function updateProtocol(updatedProtocol) {
    try {
        console.log(updatedProtocol)
      const response = await fetch("http://localhost:5000/protocols/edit", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProtocol),
      });
  
      if (!response.ok) {
        throw new Error("Failed to create protocol");
      }
  
      console.log("Protocol created:", response);
    } catch (error) {
      console.error("Error:", error);
    }
  }
  