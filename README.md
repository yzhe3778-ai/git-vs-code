# 超吵宝 - AI智能回怼助手

🎤 语音转文字 + AI智能回复的完美结合！

## 🌟 主要功能

- 🗣️ **语音转文字**：支持中文语音识别，无需打字
- 🤖 **AI智能回复**：基于DeepSeek API生成犀利回复
- 🎯 **多种风格**：温和到激烈，可调节语气强度
- 📱 **响应式设计**：完美适配手机和电脑

## 🚀 技术栈

- **框架**：Next.js 15.5.6 + TypeScript
- **样式**：Tailwind CSS
- **语音识别**：Web Speech API
- **AI服务**：DeepSeek API
- **部署**：Vercel

## 🔗 在线体验

部署地址：[即将更新]

## 📂 项目结构

```
git-vs-code/
└── cjiabaoy/
    └── chaojiabaoy/          # Next.js应用
        ├── app/
        │   ├── page.tsx      # 首页
        │   ├── chat/
        │   │   └── page.tsx  # 聊天页面
        │   └── api/
        │       └── generate/
        │           └── route.ts # API路由
        ├── package.json
        └── .env.local        # 环境变量
```

## 🛠️ 本地开发

```bash
cd cjiabaoy/chaojiabaoy
npm install
npm run dev
```

## 🌐 Vercel部署

1. Fork这个仓库
2. 在Vercel中导入项目
3. 设置环境变量：`DEEPSEEK_API_KEY`
4. 自动部署完成！

每次推送代码到main分支，Vercel会自动重新部署。