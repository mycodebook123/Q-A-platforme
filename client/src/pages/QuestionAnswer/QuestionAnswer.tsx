import React, { useState, useEffect, ChangeEvent } from "react";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import classes from "./questionAnswer.module.css";
import { useAuth } from "@/context/AuthContext";
import Header from "../../component/Header/Header";
import Footer from "../../component/Footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { fetchSingleQuestion } from "../../api/questionApi";

// Types for data
interface Answer {
  answer: string;
  username: string;
  answerid: number;
}

interface Question {
  title: string;
  description: string;
}

function QuestionAnswer() {
  const { question_id } = useParams<{ question_id: string }>();
  const [singleQues, setSingleQues] = useState<Question | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [newAnswer, setNewAnswer] = useState<string>("");

  const { user, token } = useAuth();
  const [errorAns, setErrorAns] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  // Fetch question details
  useEffect(() => {
    const loadQuestionDetails = async () => {
      try {
        if (question_id && token) {
          const questionData = await fetchSingleQuestion(question_id);
          setSingleQues(questionData);
        }
      } catch (error) {
        console.error("Error fetching question details:", error);
        setErrorAns("Error fetching question details.");
      }
    };
    loadQuestionDetails();
  }, [question_id, token]);

  // Fetch answers
  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        if (token) {
          const response = await fetch(`/answers/${question_id}`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            throw new Error("Failed to fetch answers");
          }

          const answersData = await response.json();

          if (answersData && Array.isArray(answersData.data)) {
            setAnswers(answersData.data); // Extract and set answers
          } else {
            console.warn("Answers data is not an array:", answersData);
            setAnswers([]); // Set as empty if the format is incorrect
          }
        }
      } catch (error) {
        console.error("Error fetching answers:", error);
        setErrorAns("Error fetching answers.");
      }
    };
    fetchAnswers();
  }, [question_id, token]);

  // Handle answer submission
  const handleAnswerSubmit = async () => {
    if (!newAnswer) {
      setErrorAns("All fields are required.");
      return;
    }

    try {
      const response = await fetch(`/answers/postAnswers`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userid: user?.userid,
          questionid: question_id,
          answer: newAnswer,
        }),
      });
      const responseData = await response.json();
      setAnswers((prev) => [
        { answer: newAnswer, username: user?.username || "", answerid: responseData.insertId },
        ...prev,
      ]);
      setNewAnswer("");
      setErrorAns("");
      setSuccess(responseData.message);
    } catch (error) {
      console.error("Error submitting answer:", error);
      setErrorAns("Error submitting answer.");
    }
  };

  // Handle answer delete
  const handleDeleteAnswer = async (answerId: number) => {
    try {
      const response = await fetch(`/answers/${answerId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete answer");
      }

      // Remove deleted answer from state
      setAnswers((prevAnswers) => prevAnswers.filter((answer) => answer.answerid !== answerId));
      setSuccess("Answer deleted successfully.");
    } catch (error) {
      console.error("Error deleting answer:", error);
      setErrorAns("Error deleting answer.");
    }
  };

  // Handle answer update
  const handleUpdateAnswer = async (answerId: number, updatedAnswer: string) => {
    if (!updatedAnswer) {
      setErrorAns("Answer cannot be empty.");
      return;
    }

    try {
      const response = await fetch(`/answers/${answerId}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ answer: updatedAnswer }),
      });

      if (!response.ok) {
        throw new Error("Failed to update answer");
      }

      // Update the answer in state
      setAnswers((prevAnswers) =>
        prevAnswers.map((answer) =>
          answer.answerid === answerId ? { ...answer, answer: updatedAnswer } : answer
        )
      );
      setSuccess("Answer updated successfully.");
    } catch (error) {
      console.error("Error updating answer:", error);
      setErrorAns("Error updating answer.");
    }
  };

  return (
    <>
      <Header />
      <div className={`container ${classes.container}`}>
        {/* Question Section */}
        <div className={`mb-4 ${classes.questionSection}`}>
          <h1 className={classes.title}>Question</h1>
          <div className={classes.questionDetails}>
            {singleQues ? (
              <>
                <h3 className={classes.questionTitle}>
                  {singleQues.title} {singleQues.title && "?"}
                </h3>
                <small className={classes.description}>
                  {singleQues.description}
                </small>
              </>
            ) : (
              <p>Loading question details...</p>
            )}
          </div>
        </div>

        {/* Answers Section */}
        <div className={`mb-4 ${classes.answersSection}`}>
          <h2 className={classes.sectionTitle}>Answers From The Community</h2>
          <div className={classes.answersList}>
            {answers.length > 0 ? (
              answers.map((answer) => (
                <div key={answer.answerid} className={`d-flex ${classes.answerItem}`}>
                  <div className={classes.avatarSection}>
                    <div className={classes.user__icon}>
                      <FontAwesomeIcon icon={faUser} />
                    </div>
                    <span className={classes.username}>{answer.username}</span>
                  </div>
                  <p className={classes.answerText}>{answer.answer}</p>

                  {/* Only show update and delete options if the answer belongs to the logged-in user */}
                  {answer.username === user?.username && (
                    <>
                      <button
                        className="btn btn-warning me-2"
                        onClick={() => handleUpdateAnswer(answer.answerid, prompt("Update your answer:", answer.answer) || "")}
                      >
                        Update
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDeleteAnswer(answer.answerid)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              ))
            ) : (
              <p>No answers yet. Be the first to answer!</p>
            )}
          </div>
        </div>

        {/* Answer Submission Section */}
        <div className={`p-4 ${classes.submitSection}`}>
          <h3 className={classes.sectionTitle}>Answer The Top Question</h3>
          <textarea
            className={`form-control mb-3 ${classes.textArea}`}
            placeholder="Your Answer..."
            rows={4}
            value={newAnswer}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setNewAnswer(e.target.value)}
          ></textarea>
          <button className={`btn btn-primary ${classes.submitButton}`} onClick={handleAnswerSubmit}>
            Post Your Answer
          </button>
          {errorAns && <small className="text-danger">{errorAns}</small>}
          {success && <small className="text-success">{success}</small>}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default QuestionAnswer;
