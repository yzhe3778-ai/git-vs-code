# 🎮 Pixel TodoList

一个复古像素风格的待办事项应用，支持桌面和移动端使用。

## ✨ 特性

- 🎨 **像素风格设计** - GameBoy 风格的复古界面
- 📱 **PWA 支持** - 可安装到手机主屏幕,离线可用
- 💾 **本地存储** - 使用 IndexedDB 本地持久化数据
- 🔊 **像素音效** - 8-bit 风格的操作音效
- 📊 **优先级管理** - 低/中/高三级优先级
- 🌓 **响应式设计** - 完美适配移动端和桌面端
- ⚡ **极速体验** - Vite + React 构建,性能卓越

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

访问 [http://localhost:5173](http://localhost:5173)

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

## 📱 移动端使用

### 安装 PWA

1. 在手机浏览器中打开应用
2. 点击浏览器菜单中的"添加到主屏幕"
3. 像使用原生应用一样使用

### 离线功能

安装 PWA 后,应用可以离线使用,所有数据都保存在本地。

## 🛠️ 技术栈

- **前端框架**: React 18 + TypeScript
- **构建工具**: Vite
- **状态管理**: Zustand
- **数据存储**: Dexie.js (IndexedDB)
- **PWA**: vite-plugin-pwa
- **样式**: CSS Modules
- **字体**: Press Start 2P (Google Fonts)

## 📁 项目结构

```
pixel-todolist/
├── src/
│   ├── components/          # React 组件
│   │   ├── AddTodo.tsx     # 添加待办表单
│   │   ├── TodoItem.tsx    # 待办项组件
│   │   └── PixelButton.tsx # 像素风格按钮
│   ├── stores/              # Zustand 状态管理
│   │   └── todoStore.ts    # 待办事项 store
│   ├── utils/               # 工具函数
│   │   ├── db.ts           # IndexedDB 配置
│   │   └── sound.ts        # 音效系统
│   ├── assets/styles/       # 全局样式
│   │   ├── variables.css   # CSS 变量
│   │   └── global.css      # 全局样式
│   ├── App.tsx             # 主应用组件
│   └── main.tsx            # 应用入口
├── public/                  # 静态资源
├── vite.config.ts          # Vite 配置
└── package.json
```

## 🎨 设计理念

### KISS 原则
- 极简的 UI 设计
- 直观的交互流程
- 专注核心功能

### DRY 原则
- 组件化设计
- 样式复用
- 统一的工具函数

### SOLID 原则
- 单一职责组件
- 依赖抽象（store）
- 接口隔离

## 🔊 音效说明

- **添加任务**: C5 → E5
- **完成任务**: C5 → E5 → G5
- **删除任务**: G4 → E4

可在应用中切换音效开关。

## 📝 待办功能

- ✅ 添加待办事项
- ✅ 标记完成/未完成
- ✅ 删除待办事项
- ✅ 设置优先级（低/中/高）
- ✅ 筛选（全部/进行中/已完成）
- ✅ 清除所有已完成
- ✅ 统计信息显示

## 🌐 浏览器兼容性

- Chrome/Edge (推荐)
- Firefox
- Safari
- 移动端浏览器

## 📄 许可证

MIT

## 🙏 致谢

- 字体: [Press Start 2P](https://fonts.google.com/specimen/Press+Start+2P)
- 灵感来源: GameBoy 经典游戏

---

Made with ❤️ and pixels
