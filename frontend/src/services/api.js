const API_BASE_URL = "http://localhost:8080";

export async function getHealth() {
  const response = await fetch(`${API_BASE_URL}/health`);

  if (!response.ok) {
    throw new Error("Backend health check failed");
  }

  return response.json();
}

export async function sendToNexora(userInput) {
  const response = await fetch(`${API_BASE_URL}/nexora`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_input: userInput,
    }),
  });

  if (!response.ok) {
    throw new Error("NEXORA backend request failed");
  }

  return response.json();
}