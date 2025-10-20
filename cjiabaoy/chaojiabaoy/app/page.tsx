/**
 * Home 着陆页组件
 * 目标：以营销型结构快速传达“超吵宝”产品价值，促使用户试用 / 订阅。
 * 页面结构概览：
 *  1. Header 导航：品牌标识 + 基本链接 + 登录 CTA（后续接入鉴权）
 *  2. Hero 主视觉：产品口号 + 试用按钮 + 功能演示（当前为静态 Mock，后续可替换为真实交互）
 *  3. Benefits 核心优势：三列卖点强调差异化价值
 *  4. Features 功能介绍：两组功能模块列表（可抽象成 <FeatureGroup/>）
 *  5. Testimonials 用户评价：社交证明，提升信任（可做轮播/懒加载）
 *  6. CTA 二次行动召唤：再次推动试用
 *  7. Pricing 价格方案：分层定价，引导专业版订阅（标“推荐”徽章）
 *  8. Footer 页脚：导航补充 + 版权信息 + 自动更新时间（部署时间展示可信度）
 *
 * 后续可演进点：
 *  - 将重复的卡片抽离成复用组件：LogoBadge / BenefitCard / PricingTier / TestimonialCard。
 *  - 将硬编码文案与价格提取到配置或 CMS（便于非技术同学运营修改）。
 *  - Hero 演示替换为真实“语音输入 + AI 回复”交互（可用 Suspense + 动态导入）。
 *  - Pricing 区域增加“当前选择”状态管理与切换（月付/年付）。
 *  - SEO 优化：添加 <head> 中的 meta/og 标签（在布局或使用 next/head）。
 *  - 性能：大部分内容可静态生成（SSG），用户评价与价格可增量再验证更新。
 *  - 可访问性：部分 emoji 与图标增加 aria-label，确保读屏体验。
 *
 * 注意：当前无交互逻辑，保持纯展示；新增动态行为时需分离容器逻辑与展示组件。
 */
export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 1. Header 导航栏 */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-[#07C160] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">超</span>
            </div>
            <span className="text-xl font-bold text-gray-800">超吵宝</span>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="#features" className="text-gray-600 hover:text-[#07C160]">功能</a>
            <a href="#pricing" className="text-gray-600 hover:text-[#07C160]">价格</a>
            <a href="#about" className="text-gray-600 hover:text-[#07C160]">关于</a>
          </nav>
          <button className="bg-[#07C160] text-white px-4 py-2 rounded-lg hover:bg-[#06AD56] transition-colors">
            登录
          </button>
        </div>
      </header>

      {/* 2. Hero Section (标题区) */}
      <section className="bg-gradient-to-b from-[#07C160] to-[#06AD56] text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">AI 智能回怼助手</h1>
          <p className="text-xl mb-8 opacity-90">支持语音输入！让AI帮你想出最犀利的回复，再也不怕被怼得哑口无言！</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="/chat" 
              className="bg-white text-[#07C160] px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg"
            >
              免费试用
            </a>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-[#07C160] transition-colors">
              了解更多
            </button>
          </div>
          <div className="mt-12 bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <p className="text-lg font-medium mb-4">产品功能展示</p>
            <div className="aspect-video bg-white rounded-lg overflow-hidden shadow-2xl border-4 border-white/30">
              <div className="w-full h-full bg-gradient-to-b from-green-400 to-green-500 relative">
                {/* 模拟手机界面 */}
                <div className="absolute inset-4 bg-white rounded-lg shadow-inner overflow-hidden">
                  {/* 顶部导航栏 */}
                  <div className="bg-[#07C160] text-white p-3 text-center">
                    <h3 className="font-bold">超吵宝 🔥</h3>
                    <p className="text-xs opacity-90">AI 帮你吵架，怼得漂亮！</p>
                  </div>
                  
                  {/* 输入区域 */}
                  <div className="p-4 space-y-3">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="text-xs text-gray-600 mb-1">对方的话：</div>
                      <div className="text-sm bg-yellow-100 rounded p-2 border-2 border-orange-500 shadow-sm">
                        <span className="text-green-600 font-medium">你这么做事吗</span>
                      </div>
                    </div>
                    
                    {/* 强度滑块 */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-600">语气强烈程度：</span>
                        <span className="text-lg font-bold text-[#07C160]">9</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-lg relative">
                        <div className="w-[90%] h-2 bg-[#07C160] rounded-lg"></div>
                        <div className="absolute right-[10%] top-1/2 w-4 h-4 bg-[#07C160] rounded-full transform -translate-y-1/2 shadow-lg"></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>温和 😊</span>
                        <span>激烈 😤</span>
                      </div>
                    </div>
                    
                    {/* 按钮 */}
                    <button className="w-full bg-[#07C160] text-white font-bold py-2 rounded-lg shadow-md">
                      开始吵架 💪
                    </button>
                  </div>
                  
                  {/* 回复区域 */}
                  <div className="px-4 pb-4">
                    <div className="bg-green-50 border-l-4 border-[#07C160] rounded-r-lg p-3 space-y-2">
                      <div className="flex items-center text-sm font-bold text-gray-800">
                        <span className="w-5 h-5 bg-[#07C160] text-white rounded-full flex items-center justify-center text-xs mr-2">1</span>
                        🎯 怼回去！
                      </div>
                      <div className="text-xs text-gray-700 leading-relaxed">
                        你管我怎么做事，先管好你自己那些闹不住的嘴吧！
                      </div>
                      <div className="text-xs text-gray-500 text-right">点击复制</div>
                    </div>
                    
                    <div className="bg-green-50 border-l-4 border-[#07C160] rounded-r-lg p-3 mt-2">
                      <div className="flex items-center text-xs text-gray-700">
                        <span className="w-4 h-4 bg-[#07C160] text-white rounded-full flex items-center justify-center text-xs mr-2">2</span>
                        怎么，你是在关心我还是在找茬？要不你先搞我明白了再说？
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-center text-sm mt-4 opacity-80">
              ✨ 实时演示：输入对方的话，AI立即生成犀利回复
            </p>
          </div>
        </div>
      </section>

      {/* 3. Benefits (核心优势) */}
      <section className="py-20 bg-green-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">核心优势</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤖</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">AI智能生成</h3>
              <p className="text-gray-600">基于先进的AI技术，生成个性化、有理有据的回复内容</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">秒速响应</h3>
              <p className="text-gray-600">3秒内生成多条不同风格的回复，让你快速反击</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">精准定制</h3>
              <p className="text-gray-600">可调节语气强度，从温和到犀利，满足不同场景需求</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Features (功能介绍) */}
      <section id="features" className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">功能介绍</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="bg-blue-50 p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">智能回怼生成</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center"><span className="text-[#07C160] mr-2">✓</span>多种回复风格</li>
                <li className="flex items-center"><span className="text-[#07C160] mr-2">✓</span>语气强度调节</li>
                <li className="flex items-center"><span className="text-[#07C160] mr-2">✓</span>一键复制分享</li>
              </ul>
            </div>
            <div className="bg-blue-50 p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">个性化定制</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center"><span className="text-[#07C160] mr-2">✓</span>场景化回复</li>
                <li className="flex items-center"><span className="text-[#07C160] mr-2">✓</span>历史记录保存</li>
                <li className="flex items-center"><span className="text-[#07C160] mr-2">✓</span>批量生成功能</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Testimonials (用户评价) */}
      <section className="py-20 bg-yellow-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">用户评价</h2>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-[#07C160] rounded-full flex items-center justify-center text-white font-bold">
                  张
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-gray-800">张同学</h4>
                  <p className="text-gray-600 text-sm">大学生</p>
                </div>
              </div>
              <p className="text-gray-700">"太好用了！室友总是怼我，现在有了超吵宝，每次都能完美回击，朋友们都说我变机智了！"</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-[#07C160] rounded-full flex items-center justify-center text-white font-bold">
                  李
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-gray-800">李女士</h4>
                  <p className="text-gray-600 text-sm">职场白领</p>
                </div>
              </div>
              <p className="text-gray-700">"工作中遇到奇葩同事时特别有用，生成的回复既有理有据又不失礼貌，真是职场神器！"</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CTA (行动召唤) */}
      <section className="py-20 bg-gradient-to-r from-[#07C160] to-[#06AD56] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">准备好开始反击了吗？</h2>
          <p className="text-xl mb-8 opacity-90">加入数万用户，让AI成为你的最佳辩友！</p>
          <a 
            href="/chat"
            className="inline-block bg-white text-[#07C160] px-12 py-4 rounded-xl font-bold text-xl hover:bg-gray-100 transition-colors shadow-xl"
          >
            立即开始14天免费试用
          </a>
        </div>
      </section>

      {/* 7. Pricing (价格方案) */}
      <section id="pricing" className="py-20 bg-gradient-to-b from-blue-50 to-purple-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">价格方案</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm text-center">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">基础版</h3>
              <div className="text-4xl font-bold text-[#07C160] mb-6">免费</div>
              <ul className="space-y-3 text-gray-600 mb-8">
                <li>每日10次生成</li>
                <li>基础回复模板</li>
                <li>标准响应速度</li>
              </ul>
              <button className="w-full bg-gray-200 text-gray-800 py-3 rounded-lg font-bold hover:bg-gray-300 transition-colors">
                当前方案
              </button>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg text-center border-2 border-[#07C160] relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#07C160] text-white px-4 py-1 rounded-full text-sm font-bold">
                推荐
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">专业版</h3>
              <div className="text-4xl font-bold text-[#07C160] mb-6">¥29/月</div>
              <ul className="space-y-3 text-gray-600 mb-8">
                <li>无限次生成</li>
                <li>高级回复模板</li>
                <li>优先响应速度</li>
                <li>历史记录保存</li>
              </ul>
              <button className="w-full bg-[#07C160] text-white py-3 rounded-lg font-bold hover:bg-[#06AD56] transition-colors">
                立即订阅
              </button>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm text-center">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">企业版</h3>
              <div className="text-4xl font-bold text-[#07C160] mb-6">联系销售</div>
              <ul className="space-y-3 text-gray-600 mb-8">
                <li>团队协作功能</li>
                <li>自定义模板</li>
                <li>API接口支持</li>
                <li>专属客服</li>
              </ul>
              <button className="w-full bg-gray-200 text-gray-800 py-3 rounded-lg font-bold hover:bg-gray-300 transition-colors">
                联系我们
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Footer (页脚) */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-[#07C160] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">超</span>
                </div>
                <span className="text-xl font-bold">超吵宝</span>
              </div>
              <p className="text-gray-400">AI智能回怼助手，让每一次对话都游刃有余。</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">产品</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">功能介绍</a></li>
                <li><a href="#" className="hover:text-white">价格方案</a></li>
                <li><a href="#" className="hover:text-white">API文档</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">支持</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">帮助中心</a></li>
                <li><a href="#" className="hover:text-white">联系我们</a></li>
                <li><a href="#" className="hover:text-white">意见反馈</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">关于我们</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">公司介绍</a></li>
                <li><a href="#" className="hover:text-white">隐私政策</a></li>
                <li><a href="#" className="hover:text-white">服务条款</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 超吵宝. All rights reserved. AI智能回怼助手</p>
            <p className="text-xs mt-2 opacity-60">🚀 自动部署测试 - 更新时间: {new Date().toLocaleString('zh-CN')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
