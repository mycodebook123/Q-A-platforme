import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import classes from "./Home.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { MdKeyboardArrowRight } from "react-icons/md";
import { fetchQuestions } from "../../api/questionApi";
import { useAuth } from "../../context/AuthContext";
import Header from "../../component/Header/Header";
import Footer from "../../component/Footer/Footer";

function HomePage() {
  const { user } = useAuth();
  const [questions, setQuestions] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredQuestions, setFilteredQuestions] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const questionsPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    const loadQuestions = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Token is missing. Please log in.");
        navigate("/login");
        return;
      }

      try {
        const data = await fetchQuestions();
        setQuestions(data);
        setFilteredQuestions(data);
        setError(null);
      } catch (error: any) {
        setError("Failed to fetch questions. Please try again.");
        console.error("Error fetching questions:", error.message || error);
      }
    };

    loadQuestions();
  }, [navigate]);

  useEffect(() => {
    const results = questions.filter((question) =>
      question.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredQuestions(results);
    setCurrentPage(1);
  }, [searchQuery, questions]);

  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = filteredQuestions.slice(
    indexOfFirstQuestion,
    indexOfLastQuestion
  );

  const totalPages = Math.ceil(filteredQuestions.length / questionsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const generatePageNumbers = () => {
    const pageNumbers = [];
    const startPage = Math.max(currentPage - 2, 1);
    const endPage = Math.min(currentPage + 2, totalPages);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  return (
    <>
      <Header />
      <div className={classes.pageWrapper}>
        <div className={`container ${classes.container}`}>
          {error && (
            <div className="alert alert-danger">
              {error}
            </div>
          )}
          {!error && (
            <>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <Link to="/AskQuestion" className={`btn ${classes.askQuestionButton}`}>
                  Ask Question
                </Link>
                <div>
                  <small className={classes.welcomeText}>
                    Welcome: {user?.username}
                  </small>
                </div>
              </div>

              <input
                type="search"
                className={`form-control mb-3 ${classes.searchInput}`}
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />

              <div>
                <h3>Questions</h3>
                <hr />
                {currentQuestions.length > 0 ? (
                  currentQuestions.map((question, i) => (
                    <div key={i} className={classes.questionCard}>
                      <div className="d-flex align-items-center">
                        <FontAwesomeIcon icon={faUser} className="me-2" />
                        <small className={classes.usernameText}>
                          {question?.username}
                        </small>
                        <Link
                          to={`/question/${question?.questionid}`}
                          className={`text-decoration-none fw-bold ${classes.link}`}
                        >
                          {question?.title}
                        </Link>
                        <MdKeyboardArrowRight size={24} className="ms-2" />
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No questions match your search.</p>
                )}
              </div>

              <div className="d-flex justify-content-center mt-4">
                <button
                  className={`btn ${classes.paginationButton} me-2`}
                  onClick={() => handlePageChange(1)}
                  disabled={currentPage === 1}
                >
                  First
                </button>

                {generatePageNumbers().map((number) => (
                  <button
                    key={number}
                    className={`btn ${classes.paginationButton} ${
                      currentPage === number ? classes.active : ""
                    }`}
                    onClick={() => handlePageChange(number)}
                  >
                    {number}
                  </button>
                ))}

                <button
                  className={`btn ${classes.paginationButton}`}
                  onClick={() => handlePageChange(totalPages)}
                  disabled={currentPage === totalPages}
                >
                  Last
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default HomePage;
