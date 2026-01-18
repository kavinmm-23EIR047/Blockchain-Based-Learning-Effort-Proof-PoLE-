import QuizQuestion from "../models/QuizQuestion.js";

// GET quiz by category
export const getQuiz = async (req, res) => {
  try {
    const { category } = req.params;
    const questions = await QuizQuestion.find({ category }).limit(5);
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// SUBMIT quiz answers
export const submitQuiz = async (req, res) => {
  try {
    const { answers } = req.body;
    let score = 0;

    for (let ans of answers) {
      const q = await QuizQuestion.findById(ans.questionId);
      if (q && q.correctAnswer === ans.selectedOption) {
        score++;
      }
    }

    res.json({ score });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ADD quiz question
export const addQuiz = async (req, res) => {
  try {
    const { category, question, options, correctAnswer } = req.body;

    const quiz = new QuizQuestion({
      category,
      question,
      options,
      correctAnswer
    });

    await quiz.save();

    res.json({ message: "Quiz question added successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
