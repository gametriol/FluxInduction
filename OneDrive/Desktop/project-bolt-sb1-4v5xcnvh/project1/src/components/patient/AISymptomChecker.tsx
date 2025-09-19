import React, { useState } from 'react';
import { MessageSquare, Send, Bot, User, AlertTriangle } from 'lucide-react';
import { Message } from '../../types';

export const AISymptomChecker: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your AI Health Assistant. I can help you understand your symptoms and suggest which type of doctor you might need to consult. Please describe your symptoms.',
      sender: 'ai',
      timestamp: new Date().toISOString(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Simulate AI response (in real app, this would call your AI API)
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputMessage);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        sender: 'ai',
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const generateAIResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('fever') || lowerInput.includes('cold') || lowerInput.includes('cough')) {
      return 'Based on your symptoms of fever, cold, and cough, this could be a common cold or viral infection. I recommend consulting a **General Medicine** doctor. In the meantime, get plenty of rest, stay hydrated, and monitor your temperature. If symptoms worsen or persist beyond 5-7 days, seek immediate medical attention.';
    }
    
    if (lowerInput.includes('headache') || lowerInput.includes('head pain')) {
      return 'Headaches can have various causes. For persistent or severe headaches, I recommend consulting a **General Medicine** doctor first, or a **Neurologist** if headaches are frequent or severe. Try to rest in a dark, quiet room and stay hydrated.';
    }
    
    if (lowerInput.includes('joint') || lowerInput.includes('knee') || lowerInput.includes('back pain')) {
      return 'Joint or back pain could indicate musculoskeletal issues. I recommend consulting an **Orthopedics** specialist. Apply ice for acute pain, gentle heat for stiffness, and avoid activities that worsen the pain.';
    }
    
    if (lowerInput.includes('ear') || lowerInput.includes('throat') || lowerInput.includes('nose')) {
      return 'For ear, nose, or throat related issues, I recommend consulting an **ENT (Ear, Nose, Throat)** specialist. These symptoms could indicate infections or other ENT-related conditions.';
    }
    
    if (lowerInput.includes('stomach') || lowerInput.includes('nausea') || lowerInput.includes('vomit')) {
      return 'Stomach issues, nausea, or vomiting could indicate digestive problems. I recommend consulting a **General Medicine** doctor first, or a **Gastroenterologist** for persistent issues. Stay hydrated and avoid heavy foods.';
    }
    
    return 'Thank you for describing your symptoms. Based on the information provided, I recommend consulting a **General Medicine** doctor for a proper evaluation. They can provide a comprehensive assessment and refer you to a specialist if needed. Please remember that this is not a substitute for professional medical advice.';
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-t-lg shadow-sm border border-gray-200 p-6 border-b-0">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Bot className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">AI Symptom Checker</h2>
            <p className="text-gray-600">Get preliminary health guidance</p>
          </div>
        </div>
        
        {/* Disclaimer */}
        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-yellow-800">
                <strong>Important:</strong> This AI assistant provides general health information only and is not a substitute for professional medical advice, diagnosis, or treatment. Always consult with qualified healthcare professionals for proper medical care.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="bg-white shadow-sm border-l border-r border-gray-200 h-96 overflow-y-auto p-6">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`flex items-start space-x-3 max-w-xs lg:max-w-md ${
                  message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    message.sender === 'user'
                      ? 'bg-blue-100'
                      : 'bg-purple-100'
                  }`}
                >
                  {message.sender === 'user' ? (
                    <User className="w-4 h-4 text-blue-600" />
                  ) : (
                    <Bot className="w-4 h-4 text-purple-600" />
                  )}
                </div>
                <div
                  className={`px-4 py-2 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-purple-600" />
                </div>
                <div className="bg-gray-100 px-4 py-2 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-white rounded-b-lg shadow-sm border border-gray-200 p-6 border-t-0">
        <div className="flex space-x-4">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Describe your symptoms..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            disabled={isLoading}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isLoading}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            <Send className="w-4 h-4" />
            <span>Send</span>
          </button>
        </div>
      </div>
    </div>
  );
};