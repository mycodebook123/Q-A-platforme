import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Card } from "react-bootstrap"; // Import Card from react-bootstrap
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is imported
import classes from "./howitworks.module.css"; // Import your custom CSS

const HowItWorks = () => {
  return (
    <>
      <Header />
      <div className="container mt-5">
        <Card className={text-center mb-5 ${classes.card}}>
          {/* Customize the header and body of the card */}
          <Card.Header as="h5" className={classes.header}>
            How Q&A Hub Works
          </Card.Header>
          <Card.Body className={classes.body}>
            <Card.Title className={classes.title}>
              Welcome to Q&A Hub
            </Card.Title>
            <Card.Text className="text-dark">
              Q&A Hub is a platform designed to connect people with questions to those who have answers in the tech space.
            </Card.Text>
            <Card.Text className="text-dark">Here’s how it works:</Card.Text>
            <div className={classes.numberContainer}>
              <ul className={list-unstyled ${classes.list}}>
                <li className={d-flex align-items-center ${classes.listItem}}>
                  <span className={classes.number}>1.</span>
                  <strong>Ask Questions:</strong> Post your tech-related questions and get answers from experts or the community.
                </li>
                <li className={d-flex align-items-center ${classes.listItem}}>
                  <span className={classes.number}>2.</span>
                  <strong>Share Knowledge:</strong> Share your expertise by answering questions and contributing to meaningful discussions.
                </li>
                <li className={d-flex align-items-center ${classes.listItem}}>
                  <span className={classes.number}>3.</span>
                  <strong>Engage Respectfully:</strong> Interact with others professionally and respectfully to foster productive conversations.
                </li>
                <li className={d-flex align-items-center ${classes.listItem}}>
                  <span className={classes.number}>4.</span>
                  <strong>Grow Together:</strong> Learn from others, exchange ideas, and stay updated with the latest in tech.
                </li>
              </ul>
            </div>
            <Card.Text>
              Feel free to explore the platform, ask questions, or share your insights. Start your journey today with Q&A Hub!
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
      <Footer />
    </>
  );
};

export default HowItWorks;