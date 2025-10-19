'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

// 声明语音识别API类型
declare global {
  interface Window {
    SpeechRecognition?: any;
    webkitSpeechRecognition?: any;
  }
}

interface ResponseType {
  responses: string[];
  timestamp: number;
}

export default function ChatPage() {
  const [input, setInput] = useState('');
  const [intensity, setIntensity] = useState(5);
  const [responses, setResponses] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<ResponseType[]>([]);
  
  // 语音输入相关状态
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

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

  // 开始录音 - 真正的语音转文字
  const startRecording = async () => {
    try {
      // 检查浏览器是否支持语音识别
      if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        alert('您的浏览器不支持语音识别功能，请使用Chrome浏览器');
        return;
      }

      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      // 配置语音识别
      recognition.continuous = false; // 不连续识别
      recognition.interimResults = false; // 不显示中间结果
      recognition.lang = 'zh-CN'; // 设置为中文
      
      setIsRecording(true);
      setRecordingTime(0);
      
      // 开始计时
      intervalRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
      
      // 处理识别结果
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        console.log('识别结果:', transcript);
        setInput(transcript); // 将识别的文字填入输入框
      };
      
      // 处理识别错误
      recognition.onerror = (event: any) => {
        console.error('语音识别错误:', event.error);
        setIsRecording(false);
        setRecordingTime(0);
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        alert('语音识别失败，请重试');
      };
      
      // 识别结束
      recognition.onend = () => {
        setIsRecording(false);
        setRecordingTime(0);
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      };
      
      // 开始识别
      recognition.start();
      
    } catch (error) {
      console.error('无法开始语音识别:', error);
      alert('无法开始语音识别，请确保已授权麦克风权限');
      setIsRecording(false);
      setRecordingTime(0);
    }
  };

  // 停止录音
  const stopRecording = () => {
    setIsRecording(false);
    setRecordingTime(0);
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    
    // Web Speech API 会自动停止，无需手动处理
  };

  // 格式化时间显示
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // 组件卸载时清理
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
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
      {/* 头部导航 */}
      <div className="bg-[#07C160] text-white py-4 px-4 shadow-md">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 hover:opacity-80">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>返回首页</span>
          </Link>
          <h1 className="text-2xl font-bold">超吵宝 🔥</h1>
          <div className="w-20"></div> {/* 占位符保持居中 */}
        </div>
        <p className="text-center text-sm mt-2 opacity-90">AI 帮你吵架，怼得漂亮！</p>
      </div>

      {/* 主内容区 */}
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* 欢迎提示 */}
        <div className="bg-white rounded-lg shadow-md p-5 border-l-4 border-[#07C160]">
          <h2 className="text-lg font-bold text-gray-800 mb-2">🎯 开始你的反击之旅</h2>
          <p className="text-gray-600 text-sm">
            输入对方的话，选择回怼强度，让AI为你生成犀利的回复！每次生成3条不同风格的回复供你选择。
          </p>
        </div>

        {/* 输入区域 */}
        <div className="bg-white rounded-lg shadow-md p-5 space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              对方的话：
            </label>
            <div className="relative">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="例如：你怎么这么笨啊..."
                className="w-full px-4 py-3 pr-16 border-2 border-gray-200 rounded-lg focus:border-[#07C160] focus:outline-none resize-none transition-colors"
                rows={4}
              />
              
              {/* 语音录入按钮 */}
              <div className="absolute bottom-3 right-3">
                {/* 录音时间显示 */}
                {isRecording && (
                  <div className="absolute -top-14 -right-2 bg-white border border-gray-200 shadow-lg rounded-lg px-3 py-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-mono text-gray-700">
                        {formatTime(recordingTime)}
                      </span>
                    </div>
                  </div>
                )}
                
                {/* 语音按钮 */}
                <button
                  type="button"
                  onClick={isRecording ? stopRecording : startRecording}
                  className={`
                    relative w-12 h-12 rounded-full transition-all duration-200 
                    flex items-center justify-center text-white shadow-lg
                    hover:scale-110 active:scale-95
                    ${isRecording 
                      ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                      : 'bg-blue-500 hover:bg-blue-600'
                    }
                  `}
                  title={isRecording ? '停止录音' : '语音录入'}
                >
                  {/* 图标 */}
                  {isRecording ? (
                    <div className="w-4 h-4 bg-white rounded-sm"></div>
                  ) : (
                    <svg 
                      className="w-6 h-6" 
                      fill="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2C13.1046 2 14 2.89543 14 4V12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12V4C10 2.89543 10.8954 2 12 2Z"/>
                      <path d="M19 10V12C19 15.866 15.866 19 12 19C8.13401 19 5 15.866 5 12V10H7V12C7 14.7614 9.23858 17 12 17C14.7614 17 17 14.7614 17 12V10H19Z"/>
                      <path d="M10 22H14V20H10V22Z"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>
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
              <span>温和 😊</span>
              <span>中等 😐</span>
              <span>激烈 😤</span>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-[#07C160] hover:bg-[#06AD56] text-white font-bold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md active:scale-98"
          >
            {loading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>AI正在思考...</span>
              </div>
            ) : (
              '开始吵架 💪'
            )}
          </button>
        </div>

        {/* 结果显示区域 */}
        {responses.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-5 space-y-4">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <span>🎯</span>
              <span>怼回去！</span>
              <span className="text-sm text-gray-500 font-normal">({responses.length}条回复)</span>
            </h2>
            <div className="space-y-3">
              {responses.map((response, index) => (
                <div
                  key={index}
                  className="bg-green-50 border-l-4 border-[#07C160] p-4 rounded-r-lg hover:bg-green-100 transition-colors cursor-pointer group"
                  onClick={() => {
                    navigator.clipboard.writeText(response);
                    // 添加复制成功的视觉反馈
                    const element = document.getElementById(`response-${index}`);
                    if (element) {
                      element.textContent = '已复制！';
                      setTimeout(() => {
                        element.textContent = '点击复制';
                      }, 1000);
                    }
                  }}
                >
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-7 h-7 bg-[#07C160] text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </span>
                    <div className="flex-1">
                      <p className="text-gray-800 leading-relaxed">{response}</p>
                      <p id={`response-${index}`} className="text-xs text-gray-500 mt-2 text-right group-hover:text-[#07C160] transition-colors">
                        点击复制
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* 重新生成按钮 */}
            <div className="pt-4 border-t border-gray-200">
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
              >
                🔄 重新生成
              </button>
            </div>
          </div>
        )}

        {/* 使用说明 */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-gray-700">
          <p className="font-medium mb-2">💡 使用提示：</p>
          <ul className="list-disc list-inside space-y-1 text-xs leading-relaxed">
            <li>输入对方说的话，可以是微信聊天、面对面对话等任何场景</li>
            <li>调节语气强度：1-3为温和回复，4-7为适中回复，8-10为犀利回复</li>
            <li>每次生成3条不同风格的回复，选择最适合的一条使用</li>
            <li>点击任意回复可直接复制到剪贴板，方便粘贴使用</li>
            <li>所有回复仅供参考娱乐，请根据实际情况谨慎使用</li>
          </ul>
        </div>

        {/* 历史记录 */}
        {history.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-5 space-y-4">
            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <span>📚</span>
              <span>历史记录</span>
              <span className="text-sm text-gray-500 font-normal">({history.length}条)</span>
            </h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {history.slice(0, 5).map((item, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-3">
                  <div className="text-xs text-gray-500 mb-2">
                    {new Date(item.timestamp).toLocaleString()}
                  </div>
                  <div className="space-y-1">
                    {item.responses.map((response, responseIndex) => (
                      <div
                        key={responseIndex}
                        className="text-sm text-gray-700 p-2 bg-gray-50 rounded cursor-pointer hover:bg-gray-100"
                        onClick={() => {
                          navigator.clipboard.writeText(response);
                          alert('已复制到剪贴板！');
                        }}
                      >
                        {response}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            {history.length > 5 && (
              <p className="text-xs text-gray-500 text-center">
                仅显示最近5条记录，共{history.length}条
              </p>
            )}
          </div>
        )}
      </div>

      {/* 页脚 */}
      <div className="text-center py-8 text-gray-500 text-sm space-y-2">
        <p>AI 智能生成，仅供娱乐参考 😊</p>
        <p className="text-xs">
          <Link href="/" className="text-[#07C160] hover:underline">返回首页</Link>
          {' · '}
          <a href="#" className="text-[#07C160] hover:underline">意见反馈</a>
          {' · '}
          <a href="#" className="text-[#07C160] hover:underline">使用条款</a>
        </p>
      </div>
    </div>
  );
}