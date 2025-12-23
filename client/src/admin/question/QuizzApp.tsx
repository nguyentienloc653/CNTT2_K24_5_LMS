import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Save, X, Check } from 'lucide-react';
import SideBarManager from '../../components/layout/SideBarManager';

interface Option {
  id: string;
  text: string;
}

interface Question {
  id: number;
  question: string;
  options: Option[];
  correct: string;
}

interface FormData {
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correct: string;
}

const QuizzApp: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<FormData>({
    question: '',
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: '',
    correct: 'A'
  });

  // Fetch questions from db.json
  const fetchQuestions = async (): Promise<void> => {
    try {
      const response = await fetch('http://localhost:3001/questions');
      const data = await response.json();
      setQuestions(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching questions:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;
    
    const loadQuestions = async () => {
      try {
        const response = await fetch('http://localhost:3001/questions');
        const data = await response.json();
        if (isMounted) {
          setQuestions(data);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching questions:', error);
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    
    loadQuestions();
    
    return () => {
      isMounted = false;
    };
  }, []);

  const resetForm = (): void => {
    setFormData({
      question: '',
      optionA: '',
      optionB: '',
      optionC: '',
      optionD: '',
      correct: 'A'
    });
    setEditingId(null);
  };

  const handleAdd = (): void => {
    setShowModal(true);
    resetForm();
  };

  const handleEdit = (question: Question): void => {
    setEditingId(question.id);
    setFormData({
      question: question.question,
      optionA: question.options[0].text,
      optionB: question.options[1].text,
      optionC: question.options[2].text,
      optionD: question.options[3].text,
      correct: question.correct
    });
    setShowModal(true);
  };

  const handleDelete = async (id: number): Promise<void> => {
    if (window.confirm('Bạn có chắc chắn muốn xóa câu hỏi này?')) {
      try {
        await fetch(`http://localhost:3001/questions/${id}`, {
          method: 'DELETE'
        });
        fetchQuestions();
      } catch (error) {
        console.error('Error deleting question:', error);
        alert('Có lỗi xảy ra khi xóa câu hỏi!');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    
    if (!formData.question || !formData.optionA || !formData.optionB || 
        !formData.optionC || !formData.optionD) {
      alert('Vui lòng điền đầy đủ thông tin!');
      return;
    }

    const newQuestion: Omit<Question, 'id'> = {
      question: formData.question,
      options: [
        { id: 'A', text: formData.optionA },
        { id: 'B', text: formData.optionB },
        { id: 'C', text: formData.optionC },
        { id: 'D', text: formData.optionD }
      ],
      correct: formData.correct
    };

    try {
      if (editingId) {
        // Update existing question
        await fetch(`http://localhost:3001/questions/${editingId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ ...newQuestion, id: editingId })
        });
      } else {
        // Add new question
        await fetch('http://localhost:3001/questions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newQuestion)
        });
      }
      
      fetchQuestions();
      setShowModal(false);
      resetForm();
    } catch (error) {
      console.error('Error saving question:', error);
      alert('Có lỗi xảy ra khi lưu câu hỏi!');
    }
  };

  const handleInputChange = (field: keyof FormData, value: string): void => {
    setFormData({ ...formData, [field]: value });
  };

  if (loading) {
    return (
      <div className="flex-1 p-6">
        <div className="flex items-center justify-center h-full">
          <div className="text-xl text-gray-600">Đang tải dữ liệu...</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", gap: "16px" }}>
      <SideBarManager />
<div className="flex-1 p-6 bg-gray-50 overflow-y-auto">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Quản lý câu hỏi</h1>
              <p className="text-gray-600 mt-1">Tổng số: {questions.length} câu hỏi</p>
            </div>
            <button
              onClick={handleAdd}
              className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Thêm câu hỏi
            </button>
          </div>
        </div>

        {/* Questions List */}
        <div className="space-y-4">
          {questions.map((question, index) => (
            <div key={question.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-800 flex-1">
                  <span className="text-orange-500 mr-2">Câu {index + 1}:</span>
                  {question.question}
                </h3>
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => handleEdit(question)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Sửa"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(question.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Xóa"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {question.options.map((option) => (
                  <div
                    key={option.id}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      option.id === question.correct
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {option.id === question.correct && (
                        <Check className="w-5 h-5 text-green-600" />
                      )}
                      <span className="font-semibold text-gray-700">
                        {option.id}.
                      </span>
                      <span className="text-gray-700">{option.text}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {questions.length === 0 && (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <p className="text-gray-500 text-lg">Chưa có câu hỏi nào. Hãy thêm câu hỏi mới!</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal Add/Edit */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">
                {editingId ? 'Sửa câu hỏi' : 'Thêm câu hỏi mới'}
              </h2>
              <button
                onClick={() => {
                  setShowModal(false);
                  resetForm();
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              {/* Question */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Câu hỏi <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.question}
                  onChange={(e) => handleInputChange('question', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
                  rows={3}
                  placeholder="Nhập nội dung câu hỏi..."
                  required
                />
              </div>

              {/* Options */}
              <div className="space-y-4 mb-6">
                <label className="block text-sm font-semibold text-gray-700">
                  Các đáp án <span className="text-red-500">*</span>
                </label>

                {(['A', 'B', 'C', 'D'] as const).map((letter) => (
                  <div key={letter} className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="correct"
                      value={letter}
                      checked={formData.correct === letter}
                      onChange={(e) => handleInputChange('correct', e.target.value)}
                      className="w-5 h-5 text-orange-500 focus:ring-orange-500"
                    />
                    <span className="font-semibold text-gray-700 w-8">{letter}.</span>
                    <input
                      type="text"
                      value={formData[`option${letter}` as keyof FormData]}
                      onChange={(e) => handleInputChange(`option${letter}` as keyof FormData, e.target.value)}
                      className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
                      placeholder={`Nhập đáp án ${letter}...`}
                      required
                    />
                  </div>
                ))}
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-blue-800">
                  <strong>Lưu ý:</strong> Chọn radio button để đánh dấu đáp án đúng
                </p>
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  {editingId ? 'Cập nhật' : 'Thêm mới'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
</div>
    
  );
};

export default QuizzApp;