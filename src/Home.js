function Home({ onStart, noOfQuestions }) {
  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <h3>{noOfQuestions} questions to test your React mastery</h3>
      <button className="btn btn-ui" onClick={onStart}>
        Let's start
      </button>
    </div>
  );
}

export default Home;
