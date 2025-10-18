import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY || 'sk-2b913359decb440988d699c69959f3b7';

const openai = new OpenAI({
  baseURL: 'https://api.deepseek.com',
  apiKey: DEEPSEEK_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { input, intensity } = await request.json();

    if (!input || typeof input !== 'string') {
      return NextResponse.json(
        { error: '请提供有效的输入内容' },
        { status: 400 }
      );
    }

    // 检查 API Key
    if (!DEEPSEEK_API_KEY || DEEPSEEK_API_KEY === 'YOUR_API_KEY') {
      console.error('API Key not configured');
      return NextResponse.json(
        { error: 'API Key 未配置，请在 .env.local 文件中设置 DEEPSEEK_API_KEY' },
        { status: 500 }
      );
    }

    // 根据强度级别调整 prompt
    const intensityDescriptions = [
      '非常温和、礼貌地',
      '温和但坚定地',
      '有理有据地',
      '略带讽刺地',
      '直接而犀利地',
      '犀利且有力地',
      '强势且不留情面地',
      '辛辣且尖锐地',
      '火力全开、毫不留情地',
      '极其激烈、毁灭性地',
    ];

    const intensityLevel = Math.min(Math.max(intensity - 1, 0), 9);
    const intensityDesc = intensityDescriptions[intensityLevel];

    const systemPrompt = `你是一个专业的吵架助手，擅长用巧妙、机智的方式回应他人。你需要${intensityDesc}回应用户提供的话。

要求：
1. 生成3条不同风格的回复，每条回复独立成句
2. 回复要有理有据，逻辑清晰
3. 可以使用幽默、讽刺、反问等修辞手法
4. 根据强度等级${intensity}调整语气的激烈程度
5. 每条回复控制在50字以内
6. 回复要接地气，符合中文表达习惯
7. 直接返回3条回复，用换行符分隔，不要加序号或其他标记

请直接生成3条回复内容，每条一行。`;

    const userPrompt = `对方说：${input}\n\n请生成3条回复。`;

    // 调用 DeepSeek API
    console.log('正在调用 DeepSeek API...');
    const completion = await openai.chat.completions.create({
      model: 'deepseek-chat',
      messages: [
        {
          role: 'system',
          content: systemPrompt,
        },
        {
          role: 'user',
          content: userPrompt,
        },
      ],
      temperature: 0.8,
      max_tokens: 500,
    });

    const content = completion.choices[0]?.message?.content || '';

    // 解析返回的内容
    let responses = content
      .split('\n')
      .map((line: string) => line.trim())
      .filter((line: string) => line.length > 0)
      .map((line: string) => line.replace(/^\d+[\.\s]+/, ''))
      .filter((line: string) => line.length > 0);

    // 确保有3条回复
    if (responses.length < 3) {
      responses = content
        .split(/[。！？]/)
        .map((s: string) => s.trim())
        .filter((s: string) => s.length > 5)
        .slice(0, 3);
    }

    // 如果还是不够，添加默认回复
    while (responses.length < 3) {
      responses.push('你说得对，但我不接受。');
    }

    // 只保留前3条
    responses = responses.slice(0, 3);

    return NextResponse.json({ responses });
  } catch (error) {
    console.error('生成回复时出错:', error);
    return NextResponse.json(
      { error: '生成失败，请稍后重试' },
      { status: 500 }
    );
  }
}
