import React, { useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Importing Bootstrap
import classes from "./askQuestion.module.css";
import { postQuestion } from "../../api/questionApi"; // Import the postQuestion API function
import { useAuth } from "@/context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../component/Header/Header";
import Footer from "../../component/Footer/Footer";
import { ClipLoader } from "react-spinners";

const AskQuestion: React.FC = () => {
  const [file, setFile] = useState<string>("");
  const [postError, setPostError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const titleDom = useRef<HTMLInputElement | null>(null);
  const descDom = useRef<HTMLTextAreaElement | null>(null);
  const { user } = useAuth(); // Correctly use the hook directly
  const navigate = useNavigate();

  function resetMessage() {
    setFile("");
    setPostError("");
  }

  // Function to handle posting the question
  async function handlePostQuestion(e: React.FormEvent) {
    e.preventDefault();
    
    const titleValue = titleDom.current?.value;
    const descValue = descDom.current?.value;

    if (!titleValue || !descValue) {
      setPostError("Please provide all fields");
      return;
    }

    setLoading(true); // Set loading to true before making the API call

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setPostError("User not authenticated");
        setLoading(false);
        return;
      }

      // Use the postQuestion API function
      const data = await postQuestion(titleValue, descValue, user?.userid ?? "");

      setFile(`${data.message}: redirecting to home page`);
      setLoading(false);
      setPostError("");
      titleDom.current!.value = ""; // Clear input fields
      descDom.current!.value = "";

      setTimeout(() => navigate("/"), 2000); // Redirect to home page after 2 seconds
    } catch (error: any) {
      console.error(error);
      setPostError(error.message || "An unexpected error occurred");
      setLoading(false);
    }
  }

  return (
    <>
      <Header />
      <section className={classes.postQuestion}>
        <div className="container">
          <div className={`row justify-content-center ${classes.stepsSection}`}>
            <div className="col-12 text-center">
              <h1 className={classes.stepsTitle}>Steps to write a good question</h1>
            </div>
            <div className={classes.lists}>
              <ul className={classes.stepsList}>
                <li className={classes.stepItem}><span className={classes.arrow}>→</span> Summarize your problem in a one-line title.</li>
                <li className={classes.stepItem}><span className={classes.arrow}>→</span> Describe your problem in more detail.</li>
                <li className={classes.stepItem}><span className={classes.arrow}>→</span> Describe what you tried and what you expected to happen.</li>
                <li className={classes.stepItem}><span className={classes.arrow}>→</span> Review your question and post it to the site.</li>
              </ul>
            </div>
          </div>
          <div className={`row justify-content-center ${classes.formSection}`}>
            <div className="col-12 text-center">
              <h2 className={classes.formTitle}>Ask a public question</h2>
              <p className={classes.formLink}><Link to="/">Go to Question page</Link></p>
            </div>
            <div className="col-10">
              <form onSubmit={handlePostQuestion}>
                <div>
                  {postError ? (
                    <small style={{ textAlign: "center", color: "red" }}>{postError}</small>
                  ) : (
                    <small style={{ textAlign: "center", color: "blue" }}>{file}</small>
                  )}
                </div>
                <input
                  ref={titleDom}
                  type="text"
                  className={`form-control ${postError ? classes.errorInput : classes.questionTitle}`}
                  placeholder="Title"
                  onChange={resetMessage}
                />
                <textarea
                  ref={descDom}
                  className={`form-control ${postError ? classes.errorInput : classes.questionDescription}`}
                  placeholder="Question Description..."
                  rows={6}
                  onChange={resetMessage}
                ></textarea>
                <button className={`btn btn-primary w-100 ${classes.postButton}`} type="submit">
                  {loading ? (
                    <div className={classes.loader}>
                      <ClipLoader size={22} color="grey" />
                      <small>please wait</small>
                    </div>
                  ) : (
                    "Post Your Question"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default AskQuestion;
