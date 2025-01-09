const API_BASE_URL = "http://localhost:3000"; // Replace with your actual API base URL

// Fetch answers for a specific question
export const fetchAnswers = async (questionId: string, token: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/answers/${questionId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch answers: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching answers:", error);
    throw error; // Propagate the error to be caught in the component
  }
};

// Post an answer to a specific question
export const postAnswer = async (
  questionId: string,
  answer: string,
  userId: string
) => {
  try {
    const token = localStorage.getItem("token"); // Get token inside the function
    console.log("Token:", token); // Log the token to see if it's being retrieved correctly

    if (!token) {
      throw new Error('Token is required');
    }

    const response = await fetch(`${API_BASE_URL}/answers/postAnswers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        questionid: Number(questionId),  // Ensure question ID is sent as a number
        answer,
        userid: userId,  // User ID should be passed
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'An error occurred while posting the answer');
    }
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || 'Something went wrong');
    } else {
      throw new Error('An unknown error occurred');
    }
  }
};
