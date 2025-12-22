import React, { useState } from 'react';
import { ChevronRight, Trophy, RefreshCw } from 'lucide-react';

const QuizApp = () => {
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 phút

  const questions = [
    {
      id: 1,
      question: "Hàm printf trong C dùng để làm gì?",
      options: [
        { id: 'A', text: "Đọc dữ liệu từ người dùng." },
        { id: 'B', text: "Xuất dữ liệu ra màn hình." },
        { id: 'C', text: "Gán giá trị cho biến." },
        { id: 'D', text: "Kết thúc chương trình." }
      ],
      correct: 'B'
    },
    {
      id: 2,
      question: "Trong printf, ký tự định dạng %d được sử dụng để hiển thị loại dữ liệu nào?",
      options: [
        { id: 'A', text: "Số thực." },
        { id: 'B', text: "Chuỗi ký tự." },
        { id: 'C', text: "Số nguyên." },
        { id: 'D', text: "Ký tự đơn." }
      ],
      correct: 'C'
    },
    {
      id: 3,
      question: "Lệnh nào sau đây dùng để khai báo một biến số nguyên trong C?",
      options: [
        { id: 'A', text: "float x;" },
        { id: 'B', text: "int x;" },
        { id: 'C', text: "char x;" },
        { id: 'D', text: "string x;" }
      ],
      correct: 'B'
    },
    {
      id: 4,
      question: "Nếu muốn in một số thực với 2 chữ số sau dấu thập phân, bạn sẽ sử dụng định dạng nào trong printf?",
      options: [
        { id: 'A', text: "%.2f" },
        { id: 'B', text: "%2f" },
        { id: 'C', text: "%f.2" },
        { id: 'D', text: "%.f2" }
      ],
      correct: 'A'
    },
    {
      id: 5,
      question: "Hàm scanf() trong C được sử dụng để làm gì?",
      options: [
        { id: 'A', text: "In dữ liệu ra màn hình." },
        { id: 'B', text: "Đọc dữ liệu từ bàn phím." },
        { id: 'C', text: "Khai báo biến." },
        { id: 'D', text: "Kết thúc chương trình." }
      ],
      correct: 'B'
    }
  ];

  React.useEffect(() => {
    if (started && !showResults && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setShowResults(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [started, showResults, timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleStart = () => {
    setStarted(true);
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setShowResults(false);
    setTimeLeft(300);
  };

  const handleSelectAnswer = (answerId) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion]: answerId
    });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correct) {
        correct++;
      }
    });
    return correct;
  };

  const getAnswerClass = (questionIdx, optionId) => {
    if (!selectedAnswers[questionIdx]) return '';
    
    const question = questions[questionIdx];
    const isSelected = selectedAnswers[questionIdx] === optionId;
    const isCorrect = question.correct === optionId;
    
    if (isSelected) {
      return isCorrect ? 'bg-green-600 text-white' : 'bg-red-600 text-white';
    }
    
    return '';
  };

  if (!started) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="mb-6">
            <div className="w-20 h-20 bg-indigo-600 rounded-full mx-auto flex items-center justify-center mb-4">
              <Trophy className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Quiz Lập Trình C</h1>
            <p className="text-gray-600">Kiểm tra kiến thức của bạn về ngôn ngữ C</p>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
            <h3 className="font-semibold text-gray-800 mb-3">Thông tin bài thi:</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-indigo-600 rounded-full mr-2"></span>
                Số câu hỏi: 5 câu
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-indigo-600 rounded-full mr-2"></span>
                Điểm mỗi câu: 20 điểm
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-indigo-600 rounded-full mr-2"></span>
                Thời gian: 5 phút
              </li>
            </ul>
          </div>
          
          <button
            onClick={handleStart}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
          >
            Bắt đầu làm bài
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  if (showResults) {
    const score = calculateScore();
    const totalScore = score * 20;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full">
          <div className="text-center mb-6">
            <div className={`w-24 h-24 ${totalScore >= 60 ? 'bg-green-600' : 'bg-red-600'} rounded-full mx-auto flex items-center justify-center mb-4`}>
              <Trophy className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Kết quả bài thi</h2>
            <p className="text-5xl font-bold text-indigo-600 mb-2">{totalScore}/100</p>
            <p className="text-gray-600">Bạn đã trả lời đúng {score}/{questions.length} câu</p>
          </div>

          <div className="space-y-4 mb-6">
            {questions.map((q, idx) => {
              const userAnswer = selectedAnswers[idx];
              const isCorrect = userAnswer === q.correct;
              
              return (
                <div key={q.id} className="border rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-sm font-bold ${isCorrect ? 'bg-green-600' : 'bg-red-600'}`}>
                      {idx + 1}
                    </span>
                    <p className="font-semibold text-gray-800 flex-1">{q.question}</p>
                  </div>
                  
                  <div className="ml-9 space-y-2">
                    {q.options.map(opt => {
                      const isUserAnswer = userAnswer === opt.id;
                      const isCorrectAnswer = opt.id === q.correct;
                      
                      return (
                        <div
                          key={opt.id}
                          className={`p-2 rounded text-sm ${
                            isCorrectAnswer ? 'bg-green-100 text-green-800 font-semibold' :
                            isUserAnswer ? 'bg-red-100 text-red-800' :
                            'text-gray-600'
                          }`}
                        >
                          {opt.id}. {opt.text}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          <button
            onClick={handleStart}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-5 h-5" />
            Làm lại
          </button>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];
  const hasSelected = selectedAnswers[currentQuestion] !== undefined;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-3xl mx-auto pt-8">
        <div className="bg-white rounded-lg shadow-md p-4 mb-6 flex justify-between items-center">
          <div className="text-gray-600">
            Thời gian còn lại: <span className="font-bold text-red-600">{formatTime(timeLeft)}</span>
          </div>
          <div className="text-gray-600">
            Câu hỏi {currentQuestion + 1} / {questions.length}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6">
            Câu hỏi {currentQuestion + 1}: {currentQ.question} (20 điểm)
          </h2>

          <div className="space-y-3 mb-8">
            {currentQ.options.map((option) => {
              const answerClass = getAnswerClass(currentQuestion, option.id);
              const isSelected = selectedAnswers[currentQuestion] === option.id;
              
              return (
                <button
                  key={option.id}
                  onClick={() => handleSelectAnswer(option.id)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    answerClass || (isSelected ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200 hover:border-indigo-300')
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      answerClass ? 'border-transparent' : (isSelected ? 'border-indigo-600' : 'border-gray-300')
                    }`}>
                      {isSelected && !answerClass && (
                        <div className="w-3 h-3 rounded-full bg-indigo-600"></div>
                      )}
                    </div>
                    <span className={`font-semibold ${answerClass ? '' : 'text-gray-700'}`}>
                      {option.id}. {option.text}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleNext}
              disabled={!hasSelected}
              className={`px-8 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2 ${
                hasSelected
                  ? 'bg-pink-100 text-pink-700 hover:bg-pink-200'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              {currentQuestion < questions.length - 1 ? 'Câu tiếp theo' : 'Hoàn thành'}
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizApp;