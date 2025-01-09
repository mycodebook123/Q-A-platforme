const API_URL = 'http://localhost:3000'; // Make sure this matches the backend port

// Fetch all questions
export const fetchQuestions = async (token: string) => {
  try {
    const response = await fetch(`${API_URL}/questions`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch questions');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching questions:', error);
    throw error; // Rethrow the error
  }
};

// Fetch a single question
export const fetchSingleQuestion = async (id: string, token: string) => {
  try {
    const response = await fetch(`${API_URL}/questions/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch question');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching single question:', error);
    throw error; // Rethrow the error
  }
};

// Fetch answers for a question
export const fetchAnswers = async (questionId: string, token: string) => {
  try {
    const response = await fetch(`${API_URL}/answers/${questionId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch answers');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching answers:', error);
    throw error; // Rethrow the error
  }
};

// Post an answer
export const postAnswer = async (
  questionId: string,
  answer: string,
  token: string
) => {
  try {
    const response = await fetch(`${API_URL}/answers/postAnswers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ questionId, answer }),
    });

    if (!response.ok) {
      throw new Error('Failed to post answer');
    }

    return await response.json();
  } catch (error) {
    console.error('Error posting answer:', error);
    throw error; // Rethrow the error
  }
};

// Delete an answer
export const deleteAnswer = async (answerId: string, token: string) => {
  try {
    const response = await fetch(`${API_URL}/answers/${answerId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete answer');
    }

    return await response.json();
  } catch (error) {
    console.error('Error deleting answer:', error);
    throw error; // Rethrow the error
  }
};

// Update an answer
export const updateAnswer = async (
  answerId: string,
  newAnswer: string,
  token: string
) => {
  try {
    const response = await fetch(`${API_URL}/answers/${answerId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ answer: newAnswer }),
    });

    if (!response.ok) {
      throw new Error('Failed to update answer');
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating answer:', error);
    throw error; // Rethrow the error
  }
};
