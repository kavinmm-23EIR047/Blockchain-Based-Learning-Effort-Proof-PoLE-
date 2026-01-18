import { useEffect, useState } from "react";

export default function Quiz({category, onFinish}) {
 const [questions, setQuestions] = useState([]);
 const [answers, setAnswers] = useState({});
 const [currentQuestion, setCurrentQuestion] = useState(0);
 const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
 const [quizStarted, setQuizStarted] = useState(false);

 useEffect(() => {
  // Using fetch instead of axios
  fetch(import.meta.env.VITE_BACKEND_URL + "/api/quiz/" + category)
    .then(res => res.json())
    .then(data => setQuestions(data));
 }, [category]);

 // Timer countdown
 useEffect(() => {
  if (!quizStarted || timeLeft <= 0) return;

  const timer = setInterval(() => {
   setTimeLeft(prev => {
    if (prev <= 1) {
      clearInterval(timer);
      submit(); // Auto-submit when time runs out
      return 0;
    }
    return prev - 1;
   });
  }, 1000);

  return () => clearInterval(timer);
 }, [quizStarted, timeLeft]);

 const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
 };

 async function submit() {
  const formatted = Object.keys(answers).map(id => ({
    questionId: id,
    selectedOption: answers[id]
  }));

  const res = await fetch(
    import.meta.env.VITE_BACKEND_URL + "/api/quiz/submit",
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ answers: formatted })
    }
  );

  const data = await res.json();
  onFinish(data.score);
 }

 const handleNext = () => {
  if (currentQuestion < questions.length - 1) {
    setCurrentQuestion(currentQuestion + 1);
  }
 };

 const handlePrev = () => {
  if (currentQuestion > 0) {
    setCurrentQuestion(currentQuestion - 1);
  }
 };

 const isAnswered = (questionId) => {
  return answers.hasOwnProperty(questionId);
 };

 if (questions.length === 0) {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
 }

 if (!quizStarted) {
  return (
    <div className="text-center py-12">
      <div className="bg-white rounded-2xl p-8 border border-gray-200 max-w-md mx-auto shadow-lg">
        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl">⏱️</span>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Start?</h3>
        <p className="text-gray-700 mb-2">Total Questions: <span className="font-bold text-blue-600">{questions.length}</span></p>
        <p className="text-gray-700 mb-6">Time Limit: <span className="font-bold text-blue-600">5 minutes</span></p>
        <button
          onClick={() => setQuizStarted(true)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-lg shadow-md transition-colors"
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
 }

 const currentQ = questions[currentQuestion];

 return (
  <div className="space-y-6">
    
    {/* Timer and Progress Bar */}
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <div>
          <p className="text-gray-600 text-sm">Question {currentQuestion + 1} of {questions.length}</p>
          <div className="flex gap-2 mt-2">
            {questions.map((_, index) => (
              <div
                key={index}
                className={`w-8 h-2 rounded-full transition-all ${
                  index === currentQuestion 
                    ? 'bg-blue-500' 
                    : isAnswered(questions[index]._id)
                    ? 'bg-green-500'
                    : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
        <div className="text-right">
          <p className="text-gray-600 text-sm">Time Remaining</p>
          <p className={`text-2xl font-bold ${timeLeft < 60 ? 'text-red-500' : 'text-blue-600'}`}>
            {formatTime(timeLeft)}
          </p>
        </div>
      </div>
    </div>

    {/* Question Card */}
    <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
      <div className="mb-6">
        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
          Question {currentQuestion + 1}
        </span>
        <h3 className="text-xl font-bold text-gray-900 leading-relaxed">
          {currentQ.question}
        </h3>
      </div>

      {/* Options */}
      <div className="space-y-3">
        {currentQ.options.map((option, index) => (
          <label
            key={option}
            className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
              answers[currentQ._id] === option
                ? 'bg-blue-50 border-blue-500 shadow-sm'
                : 'bg-white border-gray-300 hover:border-gray-400 hover:bg-gray-50'
            }`}
          >
            <input
              type="radio"
              name={currentQ._id}
              checked={answers[currentQ._id] === option}
              onChange={() => setAnswers({...answers, [currentQ._id]: option})}
              className="w-5 h-5 text-blue-600 bg-white border-gray-300 focus:ring-blue-500 focus:ring-2"
            />
            <span className="ml-4 text-gray-900 font-medium flex-1">
              {option}
            </span>
            {answers[currentQ._id] === option && (
              <span className="text-blue-600">✓</span>
            )}
          </label>
        ))}
      </div>
    </div>

    {/* Navigation Buttons */}
    <div className="flex gap-4">
      <button
        onClick={handlePrev}
        disabled={currentQuestion === 0}
        className={`flex-1 py-4 rounded-lg font-semibold transition-all ${
          currentQuestion === 0
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-gray-600 hover:bg-gray-700 text-white shadow-sm'
        }`}
      >
        ← Previous
      </button>

      {currentQuestion === questions.length - 1 ? (
        <button
          onClick={submit}
          className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-4 rounded-lg shadow-sm transition-colors"
        >
          Submit Quiz ✓
        </button>
      ) : (
        <button
          onClick={handleNext}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-lg shadow-sm transition-colors"
        >
          Next →
        </button>
      )}
    </div>

    {/* Answer Status */}
    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 text-center">
      <p className="text-gray-600 text-sm">
        Answered: <span className="font-bold text-green-600">{Object.keys(answers).length}</span> / {questions.length}
      </p>
    </div>

  </div>
 );
}