const API_BASE_URL = "http://localhost:3000"; // Replace with your actual API base URL

// Fetch all questions
export const fetchQuestions = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token is missing. Please log in.");
    }

    const response = await fetch(`${API_BASE_URL}/questions`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch questions.");
    }

    const data = await response.json();
    console.log("Fetched questions:", data);
    return data;
  } catch (error) {
    console.error("Error fetching questions:", error);
    throw error;
  }
};

// Fetch a single question
export const fetchSingleQuestion = async (questionId: string) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token is missing. Please log in.");
    }

    const response = await fetch(`${API_BASE_URL}/questions/${questionId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch the question.");
    }

    const data = await response.json();
    console.log("Fetched single question:", data);
    return data;
  } catch (error) {
    console.error("Error fetching single question:", error);
    throw error;
  }
};

// Post a new question
export const postQuestion = async (
  title: string,
  description: string,
  userId: string
) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token is missing. Please log in.");
    }

    const response = await fetch(`${API_BASE_URL}/questions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        description,
        userid: userId,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to post the question.");
    }

    const data = await response.json();
    console.log("Posted question:", data);
    return data;
  } catch (error) {
    console.error("Error posting question:", error);
    throw error;
  }
};
