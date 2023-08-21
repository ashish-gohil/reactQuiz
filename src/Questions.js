function Questions({ question, onOpButtonClick, isOpSelected }) {
  const { correctOption } = question;
  function checkAns(e) {
    onOpButtonClick(Number(e.target.value));
  }
  return (
    <div>
      <h4>{question["question"]}</h4>
      <div className="options">
        {question["options"].map((op, idx) => {
          let classname;
          if (isOpSelected === null) {
            classname = "btn btn-option";
          } else if (isOpSelected === idx) {
            classname =
              correctOption === isOpSelected
                ? "btn btn-option answer correct"
                : "btn btn-option answer wrong";
          } else {
            classname =
              correctOption === idx
                ? "btn btn-option correct"
                : "btn btn-option wrong";
          }
          return (
            <button
              key={idx}
              className={classname}
              onClick={checkAns}
              value={idx}
              disabled={isOpSelected !== null ? true : false}
            >
              {op}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Questions;
