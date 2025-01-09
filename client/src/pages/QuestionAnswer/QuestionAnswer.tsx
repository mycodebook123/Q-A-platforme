import React, { useState, useEffect, useContext, ChangeEvent } from "react";
import { useParams, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import classes from "./questionAnswer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "@/context/AuthContext";
import Header from "../../component/Header/Header";
import Footer from "../../component/Footer/Footer";
import { fetchSingleQuestion } from "../../api/questionApi"; // Adjust the path to match your project structure

// Types for data
interface Answer {
  answer: string;
  username: string;
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
  const [errorAns, setErrorAns] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const { user, token } = useAuth(); // Assuming useAuth provides user and token

  // Fetch the question using fetchSingleQuestion
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

  // Fetch answers separately
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
          const answersData = await response.json();
          setAnswers(answersData);
          setErrorAns("");
        }
      } catch (error) {
        console.error("Error fetching answers:", error);
        setErrorAns("Error fetching answers.");
      }
    };

    fetchAnswers();
  }, [question_id, token]);

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
        { answer: newAnswer, username: user?.username || "" },
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

  return (
    <>
      <Header />
      <div className={`${classes.container}`}>
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
              answers.map((answer, index) => (
                <div key={index} className={`d-flex ${classes.answerItem}`}>
                  <div className={classes.avatarSection}>
                    <div className={classes.user__icon}>
                      <FontAwesomeIcon icon={faUser} />
                    </div>
                    <span className={classes.username}>{answer.username}</span>
                  </div>
                  <p className={classes.answerText}>{answer.answer}</p>
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
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setNewAnswer(e.target.value)
            }
          ></textarea>
          <button
            className={`btn btn-primary ${classes.submitButton}`}
            onClick={handleAnswerSubmit}
          >
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
