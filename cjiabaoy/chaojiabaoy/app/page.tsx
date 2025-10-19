'use client';

import { useState, useEffect } from 'react';

interface ResponseType {
  responses: string[];
  timestamp: number;
}

export default function Home() {
  const [input, setInput] = useState('');
  const [intensity, setIntensity] = useState(5);
  const [responses, setResponses] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<ResponseType[]>([]);

  // 加载历史记录
  useEffect(() => {
    const savedHistory = localStorage.getItem('chaojiabaoy-history');
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (error) {
        console.error('Failed to load history:', error);
      }
    }
  }, []);

  const handleSubmit = async () => {
    if (!input.trim()) {
      alert('请输入对方的话！');
      return;
    }

    setLoading(true);
    setResponses([]);

    try {
      console.log('发送请求到 /api/generate');
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          input: input.trim(),
          intensity,
        }),
      });

      console.log('响应状态:', response.status, response.statusText);

      if (!response.ok) {
        const errorData = await response.json();
        console.error('API 错误:', errorData);
        throw new Error(errorData.error || `HTTP ${response.status}: 生成失败，请重试`);
      }

      const data = await response.json();
      console.log('API 返回数据:', data);
      
      if (!data.responses || !Array.isArray(data.responses)) {
        throw new Error('API 返回数据格式错误');
      }
      
      setResponses(data.responses);

      // 保存到历史记录
      const newHistory = [
        {
          responses: data.responses,
          timestamp: Date.now(),
        },
        ...history.slice(0, 9), // 只保留最近10条
      ];
      setHistory(newHistory);
      localStorage.setItem('chaojiabaoy-history', JSON.stringify(newHistory));
    } catch (error) {
      console.error('请求失败:', error);
      const errorMessage = error instanceof Error ? error.message : '发生未知错误，请重试';
      alert(`错误: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* 头部 */}
      <div className="bg-[#07C160] text-white py-4 px-4 shadow-md">
        <h1 className="text-2xl font-bold text-center">超吵宝 🔥</h1>
        <p className="text-center text-sm mt-1 opacity-90">AI 帮你吵架，怼得漂亮！</p>
      </div>

      {/* 主内容区 */}
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* 输入区域 */}
        <div className="bg-white rounded-lg shadow-md p-5 space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              对方的话：
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="输入对方说的话..."
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#07C160] focus:outline-none resize-none transition-colors"
              rows={4}
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-gray-700 font-medium">
                语气强烈程度：
              </label>
              <span className="text-2xl font-bold text-[#07C160]">{intensity}</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={intensity}
              onChange={(e) => setIntensity(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, #07C160 0%, #07C160 ${(intensity - 1) * 11.11}%, #e5e7eb ${(intensity - 1) * 11.11}%, #e5e7eb 100%)`
              }}
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>温和</span>
              <span>中等</span>
              <span>激烈</span>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-[#07C160] hover:bg-[#06AD56] text-white font-bold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md active:scale-98"
          >
            {loading ? '生成中...' : '开始吵架 💪'}
          </button>
        </div>

        {/* 结果显示区域 */}
        {responses.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-5 space-y-4">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <span>🎯</span>
              <span>怼回去！</span>
            </h2>
            <div className="space-y-3">
              {responses.map((response, index) => (
                <div
                  key={index}
                  className="bg-green-50 border-l-4 border-[#07C160] p-4 rounded-r-lg hover:bg-green-100 transition-colors cursor-pointer"
                  onClick={() => {
                    navigator.clipboard.writeText(response);
                    alert('已复制到剪贴板！');
                  }}
                >
                  <div className="flex items-start gap-2">
                    <span className="flex-shrink-0 w-6 h-6 bg-[#07C160] text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </span>
                    <p className="text-gray-800 flex-1">{response}</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-2 text-right">点击复制</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 使用说明 */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-gray-700">
          <p className="font-medium mb-2">💡 使用提示：</p>
          <ul className="list-disc list-inside space-y-1 text-xs">
            <li>输入对方说的话，选择你想要的回怼强度</li>
            <li>点击"开始吵架"生成3条精彩回复</li>
            <li>点击任意回复可复制到剪贴板</li>
            <li>强度越高，回复越犀利</li>
          </ul>
        </div>
      </div>

      {/* 页脚 */}
      <div className="text-center py-6 text-gray-500 text-sm">
        <p>AI 智能生成，仅供娱乐 😊</p>
      </div>
    </div>
  );
}
