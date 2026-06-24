// 首页右侧“顾客正在想”的轻量 mock 数据。
// 这里只表达顾客的真实消费心理活动，不展示分析标签，避免首页变成报告页。
const customerVoices = [
  {
    name: "符*儿",
    age: "18岁",
    meta: ["杭州砂之船折扣店", "女王卡"],
    quote: "我会先看这个品牌是不是适合我，便宜不一定就会买。",
  },
  {
    name: "林*姐",
    age: "32岁",
    meta: ["上海静安门店", "黑金会员"],
    quote: "我更在意服务和稳定体验，不想每次消费都踩雷。",
  },
  {
    name: "周*航",
    age: "27岁",
    meta: ["小程序商城", "潜在会员"],
    quote: "我会先比较权益和价格，看不出差别就先等等。",
  },
  {
    name: "陈*然",
    age: "24岁",
    meta: ["品牌旗舰店", "首次到访"],
    quote: "如果第一眼没看懂价值，我大概率会划走。",
  },
];

// 任务详情页右侧“顾客留声”的 mock 数据。
// purchases/persona 用于 hover 快速档案；右侧卡片本体仍保持低信息密度。
const taskCustomers = [
  {
    name: "符*儿",
    age: "18岁",
    meta: ["杭州砂之船折扣店", "女王卡"],
    quote: "如果只是涨价，我会有点不舒服。但如果多出来的权益真的用得上，我可以接受。",
    purchases: [
      "2026-02-14 会员年卡续费 <相关度0.91>",
      "2026-01-06 季度权益包 <相关度0.48>",
    ],
    persona: [
      "消费观：权益实用，价格敏感",
      "决策观：先看价值，再看优惠",
      "核心偏好：高频权益、清晰规则",
      "决策红线：涨价但权益无感",
    ],
  },
  {
    name: "林*姐",
    age: "32岁",
    meta: ["上海静安门店", "黑金会员"],
    quote: "我更在意服务和稳定体验，价格变化要让我看到更稳定的价值。",
    purchases: [
      "2026-02-18 高端护理服务包 <相关度0.86>",
      "2026-01-12 黑金会员专享权益 <相关度0.72>",
    ],
    persona: [
      "消费观：服务稳定，体验优先",
      "决策观：愿意付费，但要省心",
      "核心偏好：专属服务、稳定履约",
      "决策红线：承诺和体验不一致",
    ],
  },
  {
    name: "周*航",
    age: "27岁",
    meta: ["小程序商城", "潜在会员"],
    quote: "我会先比较权益和价格，看不出差别就不会马上开会员。",
    purchases: [
      "2026-02-09 限时体验券 <相关度0.64>",
      "2026-01-24 新客礼包 <相关度0.52>",
    ],
    persona: [
      "消费观：理性比较，谨慎付费",
      "决策观：先试用，再开通",
      "核心偏好：低风险入口、可量化权益",
      "决策红线：权益描述模糊",
    ],
  },
  {
    name: "陈*然",
    age: "24岁",
    meta: ["品牌旗舰店", "首次到访"],
    quote: "第一次接触，我需要一个低风险尝试入口。",
    purchases: [
      "2026-02-01 首购体验装 <相关度0.58>",
      "2026-01-20 直播间优惠券 <相关度0.44>",
    ],
    persona: [
      "消费观：先看第一印象",
      "决策观：被打动才继续了解",
      "核心偏好：清晰卖点、低门槛尝试",
      "决策红线：首屏价值不明确",
    ],
  },
  {
    name: "赵*敏",
    age: "41岁",
    meta: ["杭州湖滨门店", "家庭用户"],
    quote: "我会考虑家里人是不是都用得上，而不是只看单次优惠。",
    purchases: [
      "2026-02-21 家庭共享权益包 <相关度0.81>",
      "2026-01-15 周末门店服务 <相关度0.47>",
    ],
    persona: [
      "消费观：家庭可用，长期划算",
      "决策观：先评估全家适用性",
      "核心偏好：共享权益、稳定服务",
      "决策红线：只适合单人使用",
    ],
  },
];

// 任务详情页的前端运行状态。
// 这不是后端业务模型，只用于当前静态原型控制阶段、勾选项、折叠状态和模拟进度。
const taskState = {
  stage: "clarify",
  selectedCustomers: ["当前会员", "高价值用户"],
  selectedRisks: ["涨价接受度", "权益感知"],
  collapsed: {
    clarify: false,
    plan: false,
  },
  answered: 0,
  total: 30,
  timer: null,
};

// 首页左下角账户区的 UI 状态。
// accountMenuOpen 控制 ChatGPT 式账户菜单；personalizationOpen 控制“个性化 / 关于你”设置弹窗。
// 这两个状态只影响前端展示，后续接入真实账号系统时再替换为用户设置 API。
const uiState = {
  accountMenuOpen: false,
  personalizationOpen: false,
};

// 深度访谈页的前端运行状态。
// 来源：用户从首页右侧“顾客正在想”点击某位仿真顾客的一句话。
// 数据流：openInterview() 会把该顾客脱敏信息、首页首条心声和档案写入 localStorage，
// #interview 再读取这份上下文，保证深访首条消息与首页点击内容一致。
// mode=single：方案 A，一对一深访，只保留消息区、访谈对象档案和追问入口。
// mode=roundtable：方案 C，顾客圆桌模式，切换到独立圆桌工作台，而不是在 A 页右侧简单加栏。
const interviewState = {
  mode: "single",
  followups: [],
  showRoundtablePrompt: false,
};

// 没有首页输入或 localStorage 数据时的兜底任务。
// 任务详情页必须优先读取用户真实输入，不能把这个默认文案当成固定首条消息。
const defaultTaskContext = {
  id: "demo-task",
  type: "调研问卷",
  capability: "调研问卷",
  scenario: "会员权益",
  originalInput: "会员年费涨价评估",
  title: "会员年费涨价评估",
};

// 当前任务上下文由首页创建，并在任务详情页读取。
let taskContext = loadTaskContext();

// 轻量内联图标库。
// 原型不依赖外部 icon 包，方便单文件静态运行；后续工程化可替换为 lucide-react。
const iconPaths = {
  logo: '<path d="M12 3l2.7 5.4L21 11l-6.3 2.6L12 21l-2.7-7.4L3 11l6.3-2.6L12 3z"/>',
  customer: '<path d="M8 10a4 4 0 1 0 8 0 4 4 0 0 0-8 0z"/><path d="M4.5 21a7.5 7.5 0 0 1 15 0"/><path d="M17.5 6.5c1.8.3 3 1.6 3 3.5 0 1.4-.7 2.5-1.7 3.1"/>',
  plus: '<path d="M12 5v14"/><path d="M5 12h14"/>',
  spark: '<path d="M13 2L5 14h6l-1 8 8-12h-6l1-8z"/>',
  search: '<path d="M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z"/><path d="M16 16l5 5"/>',
  resource: '<path d="M4 7.5h16"/><path d="M6 4h12a2 2 0 0 1 2 2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a2 2 0 0 1 2-2z"/><path d="M8 11h8"/><path d="M8 15h5"/>',
  knowledge: '<path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H20v18H8.5A3.5 3.5 0 0 0 5 23V5.5z"/><path d="M8.5 2A3.5 3.5 0 0 0 5 5.5V23"/><path d="M9 7h7"/><path d="M9 11h6"/>',
  group: '<path d="M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/><path d="M16 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/><path d="M4 20a4 4 0 0 1 8 0"/><path d="M12 20a4 4 0 0 1 8 0"/>',
  project: '<path d="M3 7a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z"/>',
  history: '<path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 4v5h5"/><path d="M12 7v5l3 2"/>',
  user: '<path d="M8 9a4 4 0 1 0 8 0 4 4 0 0 0-8 0z"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  bell: '<path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9z"/><path d="M10 21h4"/>',
  settings: '<path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/><path d="M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 0 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-1.8-.3 1.6 1.6 0 0 0-1 1.5V21a2 2 0 0 1-4 0v-.2a1.6 1.6 0 0 0-1-1.5 1.6 1.6 0 0 0-1.8.3l-.1.1a2 2 0 0 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0 .3-1.8 1.6 1.6 0 0 0-1.5-1H3a2 2 0 0 1 0-4h.2a1.6 1.6 0 0 0 1.5-1 1.6 1.6 0 0 0-.3-1.8l-.1-.1a2 2 0 0 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 1.8.3 1.6 1.6 0 0 0 1-1.5V3a2 2 0 0 1 4 0v.2a1.6 1.6 0 0 0 1 1.5 1.6 1.6 0 0 0 1.8-.3l.1-.1a2 2 0 0 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.8 1.6 1.6 0 0 0 1.5 1h.2a2 2 0 0 1 0 4h-.2a1.6 1.6 0 0 0-1.5 1z"/>',
  bot: '<rect x="6" y="8" width="12" height="10" rx="3"/><path d="M12 5v3"/><path d="M9.5 13h.01"/><path d="M14.5 13h.01"/><path d="M10 16h4"/><path d="M4 12h2"/><path d="M18 12h2"/>',
  chevronUp: '<path d="M6 15l6-6 6 6"/>',
  chevronDown: '<path d="M6 9l6 6 6-6"/>',
  mic: '<path d="M12 14a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v5a3 3 0 0 0 3 3z"/><path d="M19 11a7 7 0 0 1-14 0"/><path d="M12 18v4"/>',
  arrowUp: '<path d="M12 19V5"/><path d="M6 11l6-6 6 6"/>',
  arrowRight: '<path d="M5 12h14"/><path d="M13 6l6 6-6 6"/>',
  score: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z"/><path d="M19 15l.9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9L19 15z"/>',
  design: '<path d="M4 7h16v10H4z"/><path d="M8 7V5h8v2"/><path d="M9 17l-1 4"/><path d="M15 17l1 4"/>',
  chart: '<path d="M4 19h16"/><path d="M7 16V9"/><path d="M12 16V5"/><path d="M17 16v-4"/>',
  survey: '<path d="M7 3h10a2 2 0 0 1 2 2v16H5V5a2 2 0 0 1 2-2z"/><path d="M9 8h6"/><path d="M9 12h6"/><path d="M9 16h4"/>',
  decision: '<path d="M12 4v5"/><path d="M12 15v5"/><path d="M4 12h5"/><path d="M15 12h5"/><circle cx="12" cy="12" r="3"/>',
  graph: '<circle cx="6" cy="17" r="2"/><circle cx="12" cy="7" r="2"/><circle cx="18" cy="17" r="2"/><path d="M7.2 15.4l3.6-6.8"/><path d="M13.2 8.6l3.6 6.8"/><path d="M8 17h8"/>',
  price: '<path d="M20 13l-7 7-9-9V4h7l9 9z"/><path d="M7.5 7.5h.01"/>',
  product: '<path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z"/><path d="M4 7.5l8 4.5 8-4.5"/><path d="M12 12v9"/>',
  growth: '<path d="M4 17l5-5 4 4 7-8"/><path d="M15 8h5v5"/>',
  brand: '<path d="M12 3l3 6 6 .9-4.5 4.3 1.1 6.1L12 17.4 6.4 20.3l1.1-6.1L3 9.9 9 9l3-6z"/>',
  member: '<path d="M5 7a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V7z"/><path d="M8 10h8"/><path d="M8 14h5"/>',
  service: '<path d="M4 12a8 8 0 0 1 16 0v5a3 3 0 0 1-3 3h-2"/><path d="M4 13h3v5H4z"/><path d="M17 13h3v5h-3z"/>',
  logout: '<path d="M10 17l5-5-5-5"/><path d="M15 12H3"/><path d="M21 5v14a2 2 0 0 1-2 2h-6"/><path d="M13 3h6a2 2 0 0 1 2 2"/>',
  help: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.8 2.8 0 0 1 5.1 1.6c0 2-2.6 2.2-2.6 4"/><path d="M12 18h.01"/>',
  apps: '<circle cx="6" cy="6" r="2"/><circle cx="12" cy="6" r="2"/><circle cx="18" cy="6" r="2"/><circle cx="6" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="18" cy="12" r="2"/><circle cx="6" cy="18" r="2"/><circle cx="12" cy="18" r="2"/><circle cx="18" cy="18" r="2"/>',
};

// 输出统一风格的 stroke SVG 图标。
function icon(name, className = "ui-icon") {
  const paths = iconPaths[name] || iconPaths.logo;
  return `<svg class="${className}" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.85" stroke-linecap="round" stroke-linejoin="round">${paths}</svg>`;
}

// 探索技能页 mock 卡片数据。
// 第四个参数用于模拟 hover/已启用态。
const skillCards = [
  ["辅助设计", "让仿真顾客评审设计方案、海报、包装和落地页。", "245 次使用"],
  ["统计分析", "基于顾客数据、反馈结果和资源表进行统计分析。", "224 次使用"],
  ["调研问卷", "生成问卷并结构化分析顾客回答。", "159 次使用"],
  ["群体决策", "调用顾客群体推演企业决策支持、反对与犹豫。", "306 次使用", true],
  ["爆款图谱", "发现商品、内容和顾客触动之间的关系。", "121 次使用"],
  ["顾客心声模拟", "生成真实语气的顾客心理活动和消费触动表达。", "198 次使用"],
  ["品牌定位验证", "让不同顾客理解并反馈品牌定位是否清晰。", "88 次使用"],
  ["资源读取", "读取商品表、会员表、价格表和设计素材。", "172 次使用"],
];

// 首页左侧导航项。当前只有“探索技能”真实跳转，其余保持回到首页。
function navItem(label, iconName, active) {
  return `<a class="nav-item ${active ? "active" : ""}" href="${
    label === "探索技能" ? "#skills" : "#home"
  }"><span class="nav-icon">${icon(iconName)}</span><span>${label}</span></a>`;
}

// 首页完整左侧栏：平台资产、项目、最近记录和“我的”入口。
// 左下角 account-trigger 是账户菜单入口，菜单弹出后仍保持底部账号区可见。
function sidebar(active = "home") {
  return `
    <aside class="sidebar">
      <div class="brand-row">
        <div class="brand-mark">${icon("logo", "brand-icon")}</div>
        <div class="brand-title">仿真顾客决策平台</div>
        <div class="search-icon">${icon("search")}</div>
      </div>
      <div class="assistant-entry">
        <div class="avatar">客</div>
        <div>顾客搭档 <span class="beta">Beta</span></div>
      </div>
      <nav class="nav-list">
        ${navItem("新建", "plus")}
        ${navItem("探索技能", "spark", active === "skills")}
        ${navItem("资源库", "resource")}
        ${navItem("知识库", "knowledge")}
        ${navItem("顾客群体库", "group")}
      </nav>
      <div class="section-head"><span>项目⌄</span><span>＋</span></div>
      <div class="recent-list">
        <div class="recent-item">新建项目</div>
      </div>
      <div class="section-head"><span>最近⌄</span></div>
      <div class="recent-list">
        <div class="recent-item active">会员年费涨价评估</div>
        <div class="recent-item">新品上市前顾客预演</div>
        <div class="recent-item">品牌定位验证</div>
      </div>
      <div class="sidebar-footer">
        ${uiState.accountMenuOpen ? accountMenu() : ""}
        <button class="account-trigger" onclick="toggleAccountMenu()" aria-expanded="${uiState.accountMenuOpen}">
          <div class="avatar">令</div>
          <div class="user-meta">我的<span>企业空间 · Pro</span></div>
        </button>
      </div>
    </aside>
  `;
}

// 账户菜单中的单行操作项。
// action 保留为字符串是为了匹配当前无框架静态原型的 inline onclick 写法。
function accountMenuItem(label, iconName, action = "") {
  return `
    <button class="account-menu-item" ${action}>
      <span>${icon(iconName)}</span>
      <strong>${label}</strong>
    </button>
  `;
}

// 左下角账户菜单，参考 ChatGPT 的账户入口层级。
// 点击“个性化”会关闭菜单并打开设置弹窗，默认展示“关于你”表单。
function accountMenu() {
  return `
    <div class="account-menu">
      <button class="account-menu-profile">
        <div class="avatar">令</div>
        <div>
          <strong>孟令卿</strong>
          <span>Plus</span>
        </div>
        <span class="profile-arrow">›</span>
      </button>
      <div class="account-menu-separator"></div>
      ${accountMenuItem("升级套餐", "score")}
      ${accountMenuItem("个性化", "history", 'onclick="openPersonalization()"')}
      ${accountMenuItem("个人资料", "user")}
      ${accountMenuItem("设置", "settings")}
      <div class="account-menu-separator"></div>
      ${accountMenuItem("帮助", "help")}
      ${accountMenuItem("退出登录", "logout")}
    </div>
  `;
}

// 个性化设置弹窗左侧导航项。
// 当前原型只实现“个性化”内容，其余项用于还原设置页的信息架构。
function settingsNavItem(label, iconName, active = false) {
  return `
    <button class="settings-nav-item ${active ? "active" : ""}">
      ${icon(iconName)}
      <span>${label}</span>
    </button>
  `;
}

// “个性化 / 关于你”设置弹窗。
// 表单字段用于模拟 ChatGPT 的个性化记忆设置：昵称、职业、详情和记忆开关。
function personalizationModal() {
  if (!uiState.personalizationOpen) return "";
  return `
    <div class="modal-backdrop" onclick="closePersonalization()">
      <section class="settings-modal" onclick="event.stopPropagation()" role="dialog" aria-modal="true" aria-label="个性化设置">
        <aside class="settings-sidebar">
          ${settingsNavItem("常规", "settings")}
          ${settingsNavItem("通知", "bell")}
          ${settingsNavItem("个性化", "history", true)}
          ${settingsNavItem("应用", "apps")}
          ${settingsNavItem("账户", "user")}
        </aside>
        <main class="settings-content">
          <button class="settings-close" onclick="closePersonalization()" aria-label="关闭">×</button>
          <h2>关于你</h2>
          <div class="settings-divider"></div>
          <label class="settings-field">
            <span>昵称</span>
            <input placeholder="这个平台应该怎么称呼你？" />
          </label>
          <label class="settings-field">
            <span>职业</span>
            <input placeholder="例如：品牌负责人、产品经理、医药销售" value="企业决策者" />
          </label>
          <label class="settings-field">
            <span>你的详情</span>
            <textarea placeholder="需要记住的行业背景、决策偏好、常用业务场景或沟通风格"></textarea>
          </label>
          <section class="memory-panel">
            <div>
              <h3>记忆</h3>
              <p>让平台依据你的项目、资源库和历史决策，为你定制更贴合企业场景的使用体验。</p>
            </div>
            <label class="switch-control">
              <input type="checkbox" checked />
              <span></span>
            </label>
          </section>
        </main>
      </section>
    </div>
  `;
}

// 首页右侧顾客心声卡片。
function voiceCard(item, index) {
  return `
    <article class="voice-card clickable-voice" role="button" tabindex="0" onclick="openInterview(${index})" onkeydown="handleVoiceKey(event, ${index})" title="进入与${escapeHtml(item.name)}的深度访谈">
      <div class="voice-head">
        <div class="avatar">${index + 1}</div>
        <div>
          <div class="voice-name">${item.name}</div>
          <div class="voice-age">${item.age}</div>
          <div class="meta-row">
            ${item.meta.map((m) => `<span class="meta-pill">${m}</span>`).join("")}
          </div>
        </div>
      </div>
      <p class="quote">“${item.quote}”</p>
    </article>
  `;
}

// 首页 / Agent 工作台。
// 中间输入框是任务启动器，不是通用聊天框；发送后会创建任务上下文并进入 #task。
function homePage() {
  return `
    <div class="app-shell">
      ${sidebar("home")}
      <main class="main-canvas">
        <div class="top-score"><span class="score-pill">${icon("score")} 决策点 424</span></div>
        <section class="hero">
          <div class="status-pill"><span class="small-avatar">客</span>你的顾客搭档已就位，打个招呼吧！ <span>→</span></div>
          <h1>今天要验证什么企业决策？</h1>
          <div class="prompt-box">
            <textarea id="homePrompt" placeholder="输入一个决策，例如：会员年费是否从 199 元提高到 299 元？"></textarea>
            <div class="prompt-actions">
              <span>${icon("plus")}<span class="sr-only">添加</span></span>
              <span>${icon("resource")}资源</span>
              <span>${icon("knowledge")}知识</span>
              <span>${icon("spark")}<span class="sr-only">技能</span></span>
              <span class="spacer"></span>
              <span>${icon("mic")}麦克风</span>
              <button class="round-btn" onclick="openTask()">${icon("arrowUp")}</button>
            </div>
          </div>
          <div class="capsules">
            ${[
              ["辅助设计", "design"],
              ["统计分析", "chart"],
              ["调研问卷", "survey"],
              ["群体决策", "decision"],
              ["爆款图谱", "graph"],
            ].map(([x, iconName], i) => `<button class="capsule ${i === 0 ? "primary" : ""}" ${x === "调研问卷" ? 'onclick="openTask()"' : ""}>${icon(iconName)}${x}</button>`).join("")}
          </div>
          <div class="capsules">
            ${[
              ["定价决策", "price"],
              ["产品决策", "product"],
              ["营销增长", "growth"],
              ["品牌定位", "brand"],
              ["会员权益", "member"],
              ["服务政策", "service"],
            ].map(([x, iconName]) => `<button class="capsule">${icon(iconName)}${x}</button>`).join("")}
          </div>
        </section>
        <section class="templates">
          <div class="tab-row">
            <span class="active">全部模板</span>
            <span>定价决策</span>
            <span>产品决策</span>
            <span>营销增长</span>
            <span>品牌定位</span>
            <span>会员权益</span>
            <span>我的模板</span>
          </div>
          <div class="template-grid">
            ${["会员涨价评估", "新品上市判断", "广告文案顾客反应", "品牌定位验证"].map((x) => `<article class="template-card"><div class="thumb"></div><strong>${x}</strong></article>`).join("")}
          </div>
        </section>
      </main>
      <aside class="right-panel">
        <h2>顾客正在想</h2>
        <p>仿真顾客心声预览</p>
        <div class="voice-list">
          ${customerVoices.map(voiceCard).join("")}
        </div>
      </aside>
    </div>
    ${personalizationModal()}
  `;
}

// 首页发送入口：读取输入框内容，创建任务上下文，然后跳转到任务详情页。
function openTask() {
  const prompt = document.getElementById("homePrompt");
  const originalInput = prompt?.value.trim() || taskContext.originalInput || defaultTaskContext.originalInput;
  createTaskContext({ originalInput, capability: "调研问卷" });
  location.hash = "task";
}

// 创建任务上下文，并重置任务详情页阶段状态。
// 当前原型使用 localStorage 模拟跨页面传递，后续可替换为真实 task API。
function createTaskContext({ originalInput, capability = "调研问卷", scenario = inferScenario(originalInput) }) {
  taskContext = {
    id: `task-${Date.now()}`,
    type: capability,
    capability,
    scenario,
    originalInput,
    title: inferTaskTitle(originalInput, capability),
  };
  taskState.stage = "clarify";
  taskState.selectedCustomers = ["当前会员", "高价值用户"];
  taskState.selectedRisks = ["涨价接受度", "权益感知"];
  taskState.answered = 0;
  clearInterval(taskState.timer);
  localStorage.setItem("customer-sim-current-task", JSON.stringify(taskContext));
}

// 从 localStorage 读取任务上下文。
// JSON 解析失败时回退默认任务，避免静态原型直接白屏。
function loadTaskContext() {
  try {
    const raw = localStorage.getItem("customer-sim-current-task");
    return raw ? { ...defaultTaskContext, ...JSON.parse(raw) } : { ...defaultTaskContext };
  } catch {
    return { ...defaultTaskContext };
  }
}

// 将首页右侧某位顾客的一句话变成一次深度访谈上下文。
// 这里保持和首页数据同源，避免进入访谈页后首条消息变成写死内容。
function openInterview(index) {
  const customer = customerVoices[index] || customerVoices[0];
  const profile = taskCustomers.find((item) => item.name === customer.name) || taskCustomers[0];
  const context = {
    ...profile,
    ...customer,
    firstMessage: customer.quote,
    source: "home-customer-voice",
    startedAt: new Date().toISOString(),
  };
  interviewState.mode = "single";
  interviewState.followups = [];
  interviewState.showRoundtablePrompt = false;
  localStorage.setItem("customer-sim-current-interview", JSON.stringify(context));
  location.hash = "interview";
}

// 支持键盘用户在首页顾客心声卡片上按 Enter / Space 进入深访。
function handleVoiceKey(event, index) {
  if (event.key !== "Enter" && event.key !== " ") return;
  event.preventDefault();
  openInterview(index);
}

// 读取深度访谈上下文。没有来源时默认用首页第一位顾客，保证直接访问 #interview 不白屏。
function loadInterviewContext() {
  try {
    const raw = localStorage.getItem("customer-sim-current-interview");
    if (raw) return JSON.parse(raw);
  } catch {
    // Ignore malformed prototype storage and fall back to the default customer.
  }
  const customer = customerVoices[0];
  const profile = taskCustomers.find((item) => item.name === customer.name) || taskCustomers[0];
  return { ...profile, ...customer, firstMessage: customer.quote, source: "fallback" };
}

// 深访页需要比首页展示更多顾客背景，但仍只使用脱敏信息。
function interviewProfileFor(customer) {
  const purchases = customer.purchases?.length
    ? customer.purchases
    : ["2026-02-14 会员年卡续费 <相关度0.91>", "2026-01-06 季度权益包 <相关度0.48>"];
  const persona = customer.persona?.length
    ? customer.persona
    : ["消费观：先看价值，再看优惠", "决策观：熟人推荐，试用再定", "核心偏好：清晰权益、低风险入口", "决策红线：涨价但权益无感"];
  return { purchases, persona };
}

function participantAvatar(label, tone = "") {
  return `<span class="participant-avatar ${tone}">${escapeHtml(label)}</span>`;
}

function interviewSidePanel(customer) {
  const { purchases, persona } = interviewProfileFor(customer);
  if (interviewState.mode === "roundtable") {
    return `
      <aside class="interview-side">
        <div class="interview-side-head">
          <h2>圆桌模式</h2>
          <p>顾客、业务成员和 Agent 共创追问</p>
        </div>
        <div class="participant-list">
          ${roundtableParticipants(customer)
            .map(
              (item, index) => `
                <article class="participant-row ${index === 0 ? "active" : ""}">
                  ${participantAvatar(item.avatar, item.tone)}
                  <div>
                    <strong>${escapeHtml(item.name)}</strong>
                    <span>${escapeHtml(item.role)}</span>
                  </div>
                </article>
              `,
            )
            .join("")}
        </div>
        <section class="side-note">
          <h3>当前讨论焦点</h3>
          <p>把“涨价能不能接受”拆成权益感知、沟通理由和低风险试用入口三条线。</p>
        </section>
      </aside>
    `;
  }

  return `
    <aside class="interview-side">
      <div class="interview-side-head">
        <h2>访谈对象</h2>
        <p>本次一对一深度访谈</p>
      </div>
      <section class="interview-customer-card">
        <div class="voice-head">
          <div class="avatar">${escapeHtml(customer.name.charAt(0))}</div>
          <div>
            <div class="voice-name">${escapeHtml(customer.name)}</div>
            <div class="voice-age">${escapeHtml(customer.age)}</div>
            <div class="meta-row">${customer.meta.map((m) => `<span class="meta-pill">${escapeHtml(m)}</span>`).join("")}</div>
          </div>
        </div>
      </section>
      <button class="add-participant" type="button" onclick="enterRoundtable()">＋ 添加真人或仿真顾客</button>
      <section class="side-note">
        <h3>已购商品</h3>
        <ul>${purchases.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
      </section>
      <section class="side-note">
        <h3>仿真顾客人设</h3>
        <ul>${persona.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
      </section>
    </aside>
  `;
}

// 方案 A 中的轻量参与者数据，用于提示用户可以从一对一深访升级为多人圆桌。
// 真正的方案 C 参与者区在 roundtableModePage() 内单独渲染，以贴近确认线框图。
function roundtableParticipants(customer) {
  return [
    { avatar: customer.name.charAt(0), name: customer.name, role: "仿真顾客 · 首位发言", tone: "customer-tone" },
    { avatar: "令", name: "孟令卿", role: "企业决策者", tone: "user-tone" },
    { avatar: "研", name: "调研 Agent", role: "追问与归纳", tone: "agent-tone" },
    { avatar: "客", name: "高价值会员组", role: "补充群体视角", tone: "group-tone" },
  ];
}

// 一对一深访页的圆桌提示条。当前只有在旧增强态下使用，保留为后续过渡动画预留。
// 方案 C 已经由 roundtableModePage() 接管完整布局。
function roundtableStrip(customer) {
  if (interviewState.mode !== "roundtable") return "";
  return `
    <div class="roundtable-strip">
      ${roundtableParticipants(customer)
        .map(
          (item) => `
            <div class="roundtable-chip">
              ${participantAvatar(item.avatar, item.tone)}
              <span>${escapeHtml(item.name)}</span>
            </div>
          `,
        )
        .join("")}
      <button class="roundtable-chip add" type="button" onclick="enterRoundtable()">＋ 添加</button>
    </div>
  `;
}

function interviewFollowupHtml(customer) {
  if (!interviewState.followups.length) {
    return `
      <div class="interview-helper-card">
        <strong>可以继续追问</strong>
        <p>例如：你愿意接受什么样的权益补偿？什么情况会让你直接放弃？</p>
        <button class="inline-followup" type="button" onclick="quickInterviewFollowup()">追问这位顾客</button>
      </div>
    `;
  }

  const latest = interviewState.followups[interviewState.followups.length - 1];
  return `
    <article class="chat-message user-chat">
      <div class="chat-avatar user-tone">令</div>
      <div class="chat-bubble">${escapeHtml(latest.question)}</div>
    </article>
    <article class="chat-message customer-chat">
      <div class="chat-avatar customer-tone">${escapeHtml(customer.name.charAt(0))}</div>
      <div>
        <div class="chat-bubble">${escapeHtml(latest.answer)}</div>
        <div class="message-actions">
          <button type="button">有帮助</button>
          <button type="button" onclick="quickInterviewFollowup('如果要让你接受涨价，最打动你的权益是什么？')">继续追问</button>
          <button type="button">引用到报告</button>
        </div>
      </div>
    </article>
    ${interviewState.showRoundtablePrompt ? roundtablePrompt() : ""}
  `;
}

function roundtablePrompt() {
  return `
    <section class="roundtable-prompt">
      <div>
        <strong>这个问题可能需要更多视角。</strong>
        <p>是否进入圆桌模式，让业务成员、调研 Agent 和更多仿真顾客一起讨论？</p>
      </div>
      <div class="prompt-choice-row">
        <button class="secondary-action" type="button" onclick="dismissRoundtablePrompt()">否，继续一对一</button>
        <button class="primary-action compact-action" type="button" onclick="enterRoundtable()">是，进入圆桌模式</button>
      </div>
    </section>
  `;
}

// 旧版圆桌增强态消息片段。当前方案 C 会在 interviewPage() 中提前返回 roundtableModePage()，
// 因此这里主要作为后续对照和小屏兜底结构保留。
function roundtableMessages(customer) {
  if (interviewState.mode !== "roundtable") return "";
  return `
    <div class="date-divider">圆桌讨论已开启</div>
    <article class="chat-message agent-chat">
      <div class="chat-avatar agent-tone">研</div>
      <div class="chat-bubble">我会把问题拆成三条：权益是否可感知、涨价理由是否可信、是否需要低风险试用入口。</div>
    </article>
    <article class="chat-message customer-chat">
      <div class="chat-avatar group-tone">客</div>
      <div class="chat-bubble">高价值会员组更愿意接受涨价，但前提是权益必须高频、稳定、能直接用上。</div>
    </article>
    <article class="chat-message customer-chat">
      <div class="chat-avatar customer-tone">${escapeHtml(customer.name.charAt(0))}</div>
      <div class="chat-bubble">对我来说，最关键不是贵 100 元，而是这 100 元到底换来了什么，最好能先体验一次。</div>
    </article>
    <section class="roundtable-summary">
      <strong>圆桌阶段小结</strong>
      <p>建议把“涨价”改写为“权益升级”，同时提供限时体验或老会员缓冲方案。</p>
    </section>
  `;
}

// 方案 C：顾客圆桌模式。
// 这是深度访谈的独立工作台形态，严格区别于方案 A 的一对一聊天：
// 1. 顶部说明本次深访任务和来源顾客。
// 2. 顶部第二行横向展示圆桌参与者：仿真顾客、研究员、真人成员、更多仿真顾客、专家 Agent。
// 3. 主体左侧是圆桌对话记录；主体右侧是当前发言者档案和访谈结论草稿。
// 4. 底部输入框仍是追问入口，但追问会继续沉淀到圆桌上下文中。
function roundtableModePage(customer) {
  const firstMessage = escapeHtml(customer.firstMessage || customer.quote);
  const name = escapeHtml(customer.name);
  const age = escapeHtml(customer.age);
  const meta = customer.meta.map((m) => `<span class="mini-meta">${escapeHtml(m)}</span>`).join("");
  const latestQuestion = escapeHtml(
    interviewState.followups[interviewState.followups.length - 1]?.question ||
      "如果会员年费从 199 元涨到 299 元，你最担心的是什么？",
  );
  const latestAnswer = escapeHtml(
    interviewState.followups[interviewState.followups.length - 1]?.answer ||
      "我不是完全不能接受，但需要知道多出来的钱换来了什么。",
  );

  return `
    <div class="roundtable-shell">
      <aside class="task-rail">
        <div class="task-logo">${icon("logo", "brand-icon")}</div>
        ${taskRailIcon("顾客", "customer", true)}
        ${taskRailIcon("添加", "plus")}
        ${taskRailIcon("技能", "spark")}
        ${taskRailIcon("资源", "resource")}
        ${taskRailIcon("知识", "knowledge")}
        ${taskRailIcon("项目", "project")}
        ${taskRailIcon("历史", "history")}
        <div class="task-rail-spacer"></div>
        ${taskRailIcon("设置", "settings")}
      </aside>

      <main class="roundtable-board">
        <header class="roundtable-header">
          <div>
            <h1>深度访谈 · 会员年费涨价评估</h1>
            <p>源自首页心声 · ${name}</p>
          </div>
          <div class="roundtable-header-actions">
            <button type="button">${icon("survey")}记录</button>
            <button type="button">${icon("knowledge")}白板</button>
            <button type="button">${icon("settings")}更多</button>
          </div>
        </header>

        <section class="roundtable-members" aria-label="圆桌参与者">
          <article class="member-avatar-card active">
            <div class="photo-avatar">符</div>
            <strong>${name}</strong>
            <span>仿真顾客</span>
          </article>
          <article class="member-avatar-card">
            <div class="outline-avatar">${icon("user")}</div>
            <strong>你</strong>
            <span>研究员</span>
          </article>
          <button class="member-avatar-card ghost" type="button">
            <div class="dash-avatar">＋</div>
            <strong>添加真人</strong>
            <span>团队成员</span>
          </button>
          <button class="member-avatar-card ghost" type="button">
            <div class="dash-avatar">＋</div>
            <strong>添加仿真顾客</strong>
            <span>补充视角</span>
          </button>
          <article class="member-avatar-card">
            <div class="bot-round-avatar">${icon("bot")}</div>
            <strong>专家 Agent</strong>
            <span>追问归纳</span>
          </article>
          <button class="roundtable-next" type="button">›</button>
        </section>

        <section class="roundtable-content">
          <div class="roundtable-dialogue">
            <div class="dialogue-title">访谈记录（圆桌对话）</div>
            <div class="date-divider">今天 15:21</div>
            ${roundtableLine({ avatar: "符", tone: "customer-tone", name, role: "仿真顾客", text: firstMessage })}
            ${roundtableLine({ avatar: "你", tone: "user-tone", name: "你", role: "研究员", text: latestQuestion, side: "right" })}
            ${roundtableLine({ avatar: "符", tone: "customer-tone", name, role: "仿真顾客", text: latestAnswer })}
            ${roundtableLine({ avatar: "市", tone: "user-tone", name: "市场同事", role: "真人", text: "我们目前提供的权益里，哪些对你最有吸引力？" })}
            ${roundtableLine({ avatar: "符", tone: "customer-tone", name, role: "仿真顾客", text: "常用服务和专属折扣最吸引我，其次是退换货更方便。" })}
            <section class="question-suggestions">
              <div class="suggestion-head">
                <strong>追问建议</strong>
                <button type="button">${icon("history")}</button>
              </div>
              <div class="suggestion-row">
                <button type="button" onclick="quickInterviewFollowup('你能接受的价格红线是多少？')">追问价格红线</button>
                <button type="button" onclick="quickInterviewFollowup('你更偏好哪一种权益组合？')">追问权益偏好</button>
                <button type="button" onclick="quickInterviewFollowup('哪些信息会降低你的顾虑？')">追问顾虑感知</button>
              </div>
            </section>
          </div>

          <aside class="speaker-archive">
            <section class="archive-card speaker-card">
              <h3>当前发言者档案</h3>
              <div class="archive-profile">
                <div class="photo-avatar small">符</div>
                <div>
                  <strong>${name}</strong>
                  <span>${age}</span>
                  <div class="meta-row">${meta}</div>
                </div>
              </div>
              <dl>
                <dt>关键画像</dt>
                <dd>消费观：实用耐穿</dd>
                <dd>决策观：熟人推荐</dd>
                <dd>购买倾向：考虑型</dd>
                <dd>决策红线：领域 / 花哨</dd>
              </dl>
            </section>
            <section class="archive-card">
              <h3>访谈结论草稿</h3>
              <h4>顾虑要点</h4>
              <ul>
                <li>担心涨价后权益不匹配</li>
                <li>体验变差 / 促销复杂</li>
              </ul>
              <h4>接受条件</h4>
              <ul>
                <li>常用服务、专属折扣</li>
                <li>退换货更方便</li>
              </ul>
              <h4>风险信号</h4>
              <ul>
                <li>价格敏感但可接受</li>
                <li>体验是关键决策因素</li>
              </ul>
              <h4>下一步行动</h4>
              <ul>
                <li>验证价格心理预期</li>
                <li>测试权益优先级排序</li>
              </ul>
            </section>
          </aside>
        </section>

        <form class="roundtable-composer" onsubmit="sendInterviewFollowup(event)">
          <div class="composer-tools">
            <button type="button">${icon("plus")}</button>
            <button type="button">${icon("resource")}资源</button>
            <button type="button">${icon("knowledge")}知识</button>
            <button type="button">${icon("group")}添加参与者</button>
          </div>
          <input id="interviewInput" placeholder="输入追问内容..." autocomplete="off" />
          <button class="round-btn" type="submit">${icon("arrowUp")}</button>
        </form>
      </main>
    </div>
  `;
}

// 圆桌模式中的单条发言。
// side=right 表示研究员 / 用户侧发言，其他发言保持左侧，接近飞书聊天记录的阅读节奏。
function roundtableLine({ avatar, tone, name, role, text, side = "left" }) {
  return `
    <article class="roundtable-line ${side === "right" ? "right" : ""}">
      ${side === "right" ? "" : `<div class="chat-avatar ${tone}">${escapeHtml(avatar)}</div>`}
      <div>
        <div class="line-speaker">${escapeHtml(name)} <span>${escapeHtml(role)}</span></div>
        <div class="line-bubble">${escapeHtml(text)}</div>
      </div>
      ${side === "right" ? `<div class="chat-avatar ${tone}">${escapeHtml(avatar)}</div>` : ""}
    </article>
  `;
}

// 深度访谈页。方案 A 默认只保留聊天消息区与对象侧栏，去掉“访谈目标 / 关键问题”。
// 用户继续追问后，会出现进入圆桌模式的提示；确认后切换到方案 C。
function interviewPage() {
  const customer = loadInterviewContext();
  if (interviewState.mode === "roundtable") return roundtableModePage(customer);

  const firstMessage = escapeHtml(customer.firstMessage || customer.quote);
  const name = escapeHtml(customer.name);
  const age = escapeHtml(customer.age);
  const meta = customer.meta.map((m) => escapeHtml(m)).join(" · ");
  const modeLabel = interviewState.mode === "roundtable" ? "圆桌模式" : "一对一深访";

  return `
    <div class="interview-shell">
      <aside class="task-rail">
        <div class="task-logo">${icon("logo", "brand-icon")}</div>
        ${taskRailIcon("顾客搭档", "customer", true)}
        ${taskRailIcon("新建", "plus")}
        ${taskRailIcon("探索技能", "spark")}
        ${taskRailIcon("搜索", "search")}
        ${taskRailIcon("资源库", "resource")}
        ${taskRailIcon("知识库", "knowledge")}
        ${taskRailIcon("项目库", "project")}
        ${taskRailIcon("历史记录", "history")}
        <div class="task-rail-spacer"></div>
        ${taskRailIcon("我的", "user")}
        ${taskRailIcon("通知", "bell")}
        ${taskRailIcon("设置", "settings")}
      </aside>

      <main class="interview-main">
        <header class="interview-header">
          <div class="interview-title">
            <div class="large-avatar">${escapeHtml(customer.name.charAt(0))}</div>
            <div>
              <h1>${name}</h1>
              <p>${age} · ${meta}</p>
            </div>
          </div>
          <div class="interview-tools">
            <span class="mode-badge">${modeLabel}</span>
            <button type="button" title="搜索">${icon("search")}</button>
            <button type="button" title="添加参与者进入圆桌模式" onclick="enterRoundtable()">${icon("plus")}</button>
            <button type="button" title="更多">${icon("settings")}</button>
          </div>
        </header>

        ${roundtableStrip(customer)}

        <section class="interview-thread">
          <div class="date-divider">今天 15:21</div>
          <article class="chat-message customer-chat">
            <div class="chat-avatar customer-tone">${escapeHtml(customer.name.charAt(0))}</div>
            <div>
              <div class="chat-bubble first-voice">${firstMessage}</div>
              <div class="message-actions">
                <button type="button" onclick="quickInterviewFollowup()">追问原因</button>
                <button type="button">引用到任务</button>
                <button type="button" onclick="enterRoundtable()">邀请圆桌</button>
              </div>
            </div>
          </article>
          ${interviewFollowupHtml(customer)}
          ${roundtableMessages(customer)}
        </section>

        <form class="interview-composer" onsubmit="sendInterviewFollowup(event)">
          <span>${icon("plus")}</span>
          <input id="interviewInput" placeholder="继续追问${name}..." autocomplete="off" />
          <span>${icon("resource")}资源</span>
          <span>${icon("knowledge")}知识</span>
          <button class="round-btn" type="submit">${icon("arrowUp")}</button>
        </form>
      </main>

      ${interviewSidePanel(customer)}
    </div>
  `;
}

// 一对一深访或圆桌模式中的底部追问提交。
// 在方案 A 中，提交后展示顾客回答，并提示是否升级为方案 C。
// 在方案 C 中，提交后继续留在圆桌工作台，刷新圆桌对话中的最新追问内容。
function sendInterviewFollowup(event) {
  event.preventDefault();
  const input = document.getElementById("interviewInput");
  const question = input?.value.trim() || "如果会员年费从 199 元涨到 299 元，你最担心的是什么？";
  addInterviewFollowup(question);
}

// 快捷追问入口：用于首条消息下方按钮、空状态提示卡和圆桌追问建议。
// 触发后会生成一轮 mock 顾客回答；若当前仍在方案 A，则提示用户是否进入方案 C。
function quickInterviewFollowup(question = "你为什么会这样想？能具体说说你的判断标准吗？") {
  addInterviewFollowup(question);
}

function addInterviewFollowup(question) {
  const answer = "我不是完全不能接受，但需要知道多出来的钱换来了什么。如果只是价格变高，我会犹豫；如果有稳定、常用、能马上感知到的权益，我会愿意继续了解。";
  interviewState.followups.push({ question, answer });
  interviewState.showRoundtablePrompt = interviewState.mode !== "roundtable";
  const input = document.getElementById("interviewInput");
  if (input) input.value = "";
  render();
}

function dismissRoundtablePrompt() {
  interviewState.showRoundtablePrompt = false;
  render();
}

function enterRoundtable() {
  interviewState.mode = "roundtable";
  interviewState.showRoundtablePrompt = false;
  render();
}

// 根据用户输入粗略推断业务场景，用于首页到详情页的数据贯通演示。
function inferScenario(input) {
  if (/年费|涨价|价格|定价|会员/.test(input)) return "会员权益";
  if (/新品|上市|产品/.test(input)) return "产品决策";
  if (/文案|广告|投放|营销/.test(input)) return "营销增长";
  if (/品牌|定位/.test(input)) return "品牌定位";
  return "定价决策";
}

// 根据用户输入生成任务标题。
// 如果输入已经带“调研 / 评估 / 验证”等任务语义，就原样作为标题。
function inferTaskTitle(input, capability) {
  const normalized = input.replace(/[。！？!?]$/g, "").trim();
  if (!normalized) return `${capability}任务`;
  if (/调研|评估|验证|分析|决策/.test(normalized)) return normalized;
  return `${normalized}调研`;
}

// 模板字符串会直接拼接 HTML，因此所有用户输入和动态文本都要转义。
// 这也能确保“<相关度0.91>”这类业务文本不会被浏览器误当成标签。
function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

// 绑定首页输入框的回车发送。
// Shift + Enter 保留为换行，Enter 才创建任务。
function bindHomePrompt() {
  const prompt = document.getElementById("homePrompt");
  if (!prompt) return;
  prompt.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" || event.shiftKey) return;
    event.preventDefault();
    if (prompt.value.trim()) openTask();
  });
}

// 探索技能页左侧窄栏图标。
function railIcon(label, iconName, active = false) {
  return `<div class="rail-icon ${active ? "active" : ""}" title="${label}">${icon(iconName)}</div>`;
}

// 探索技能页卡片。
function skillCard([name, desc, count, hovered], index) {
  return `
    <article class="skill-card ${hovered ? "hovered" : ""}">
      ${hovered ? `<div class="switch-wrap"><span>已启用</span><span class="switch"></span></div>` : ""}
      <div class="skill-icon"></div>
      <h3>${name}</h3>
      <p>${desc}</p>
      <div class="skill-foot">
        <span>试用</span>
        <span>${count}</span>
      </div>
    </article>
  `;
}

// 探索技能页，用于验证平台能力库的视觉风格。
function skillsPage() {
  return `
    <div class="skills-shell">
      <aside class="icon-rail">
        ${railIcon("首页", "logo")}
        ${railIcon("顾客搭档", "customer")}
        ${railIcon("新建", "plus")}
        ${railIcon("探索技能", "spark", true)}
        ${railIcon("搜索", "search")}
        ${railIcon("资源库", "resource")}
        ${railIcon("知识库", "knowledge")}
        ${railIcon("顾客群体库", "group")}
        ${railIcon("项目库", "project")}
        <div class="rail-spacer"></div>
        ${railIcon("我的", "user")}
      </aside>
      <main class="skills-main">
        <div class="skills-header">
          <div>
            <h1>探索技能</h1>
            <p>开箱即用的能力，让顾客仿真、调研分析和决策推演更高效。 <u>了解更多</u>　分享我的技能 ↗</p>
          </div>
          <button class="create-skill">＋ 创建技能⌄</button>
        </div>
        <div class="skill-toolbar">
          <div class="categories">
            ${["推荐", "顾客研究", "数据分析", "设计评审", "决策推演", "营销增长", "商品图谱", "通用"].map((x, i) => `<button class="category ${i === 0 ? "active" : ""}">${x}</button>`).join("")}
          </div>
          <input class="skill-search" placeholder="Search skills" />
        </div>
        <div class="skill-grid">
          ${skillCards.map(skillCard).join("")}
        </div>
      </main>
    </div>
  `;
}

// 任务详情页左侧收起导航图标。
function taskRailIcon(label, iconName, active) {
  return `<button class="task-rail-icon ${active ? "active" : ""}" title="${label}">${icon(iconName)}</button>`;
}

// 澄清问题选项。
// 当前用 button 模拟 checkbox，是为了在静态原型里保持简单可控。
function optionButton(group, label) {
  const key = group === "customers" ? "selectedCustomers" : "selectedRisks";
  const checked = taskState[key].includes(label);
  return `
    <button class="option-pill ${checked ? "selected" : ""}" onclick="toggleOption('${group}', '${label}')">
      <span class="checkmark">${checked ? "✓" : ""}</span>${label}
    </button>
  `;
}

// 可折叠工作流卡片的右上角按钮。
function collapseToggle(section) {
  const collapsed = taskState.collapsed[section];
  const label = collapsed ? "展开" : "收起";
  return `
    <button class="collapse-toggle" onclick="toggleCollapse('${section}')" aria-label="${label}">
      ${icon(collapsed ? "chevronDown" : "chevronUp")}
    </button>
  `;
}

// 用户原始输入消息头像。
function userAvatar() {
  return `<div class="message-avatar user-message-avatar">${icon("user")}</div>`;
}

// Agent 工作流消息头像。
function botAvatar() {
  return `<div class="message-avatar bot-message-avatar">${icon("bot")}</div>`;
}

// 右侧顾客 hover 快速档案内容。
// 注意：这里只生成一套内置 popover，避免再次出现“双层弹窗”。
function customerProfileHtml(item) {
  const name = escapeHtml(item.name);
  const age = escapeHtml(item.age);
  const initial = escapeHtml(item.name.charAt(0));
  const quote = escapeHtml(item.quote);
  const meta = item.meta.map((m) => `<span class="meta-pill">${escapeHtml(m)}</span>`).join("");
  const purchases = (item.purchases || []).map((x) => `<li>${escapeHtml(x)}</li>`).join("");
  const persona = (item.persona || []).map((x) => `<li>${escapeHtml(x)}</li>`).join("");

  return `
    <div class="popover-head">
      <div class="avatar">${initial}</div>
      <div>
        <strong>${name}</strong>
        <span>${age}</span>
        <div class="meta-row">${meta}</div>
      </div>
    </div>
    <section>
      <h4>顾客留言摘要</h4>
      <p>${quote}</p>
    </section>
    <section>
      <h4>已购商品</h4>
      <ul>${purchases}</ul>
    </section>
    <section>
      <h4>仿真顾客人设</h4>
      <ul>${persona}</ul>
    </section>
  `;
}

// 任务详情页右侧顾客留声卡。
// 卡片本体展示精简回答；hover 时通过 .customer-popover 展示完整快速档案。
function taskVoiceCard(item, index) {
  let status = "等待";
  if (taskState.stage === "complete" || index < Math.ceil(taskState.answered / 6)) status = "已回答";
  if (taskState.stage === "collecting" && index === Math.ceil(taskState.answered / 6)) status = "正在回答";
  const name = escapeHtml(item.name);
  const age = escapeHtml(item.age);
  const initial = escapeHtml(item.name.charAt(0));
  const quote = escapeHtml(item.quote);
  const meta = item.meta.map((m) => `<span class="meta-pill">${escapeHtml(m)}</span>`).join("");
  const purchases = (item.purchases || []).map((x) => `<li>${escapeHtml(x)}</li>`).join("");
  const persona = (item.persona || []).map((x) => `<li>${escapeHtml(x)}</li>`).join("");

  return `
    <article class="task-voice-card ${status === "正在回答" ? "speaking" : ""}" data-customer-index="${index}">
      <div class="voice-head">
        <div class="avatar-hover">
          <button class="avatar hover-avatar" aria-label="查看${name}的快速档案">${initial}</button>
          <div class="customer-popover" role="tooltip">
            ${customerProfileHtml(item)}
          </div>
        </div>
        <div>
          <div class="voice-name">${name}</div>
          <div class="voice-age">${age}</div>
          <div class="meta-row">${meta}</div>
        </div>
      </div>
      <p class="quote">“${status === "等待" ? "正在等待本次调研问题。" : quote}”</p>
      <div class="answer-status">${status}</div>
    </article>
  `;
}

// 调研问卷增强 1：专家编排面板。
// 用于回应“数据分析专家、用户分析专家需要忙活”的产品要求，让用户看到多 Agent 分工、
// 数据源读取、分析口径和阶段性产出，而不是只看到一个黑盒回答。
function expertOrchestrationCard(complete) {
  const experts = [
    ["调研设计专家", "已完成", "设计问题结构、目标顾客、验证路径", "done"],
    ["用户分析专家", complete ? "已完成" : "进行中", "分析会员分层、消费频次、权益使用行为", complete ? "done" : "active"],
    ["数据分析专家", complete ? "已完成" : "排队中", "计算价格敏感度、流失风险、客群差异", complete ? "done" : "waiting"],
    ["风险识别专家", complete ? "已完成" : "排队中", "识别反对理由、沟通风险、执行风险", complete ? "done" : "waiting"],
  ];

  return `
    <article class="workflow-card expert-card">
      <div class="expert-head">
        <div>
          <div class="card-kicker">Agent 专家编排中</div>
          <h2>${complete ? "专家协作已完成，正在沉淀报告证据" : "多位专家正在协作分析调研问题"}</h2>
        </div>
        <span class="orchestration-badge">${complete ? "4 / 4 已完成" : "2 / 4 忙碌中"}</span>
      </div>
      <div class="expert-flow">
        ${experts
          .map(
            ([name, status, desc, state], index) => `
              <section class="expert-step ${state}">
                <div class="expert-avatar">${index + 1}</div>
                <div>
                  <div class="expert-row">
                    <strong>${name}</strong>
                    <span>${status}</span>
                  </div>
                  <p>${desc}</p>
                </div>
              </section>
            `,
          )
          .join("")}
      </div>
      <div class="expert-insight-grid">
        <section>
          <h3>当前专家输出</h3>
          <p>用户分析专家发现：高价值会员更关心权益稳定性，价格敏感用户更关心涨幅与替代方案。</p>
        </section>
        <section>
          <h3>关键数据口径</h3>
          <p>当前会员：过去 12 个月付费用户；高价值用户：年消费 Top 20%；流失风险：90 天未复购。</p>
        </section>
      </div>
      <div class="expert-actions">
        <button type="button">生成调研方案</button>
        <button type="button" onclick="startCollecting()" ${complete ? "disabled" : ""}>让仿真顾客回答</button>
        <button type="button">查看专家工作日志</button>
      </div>
    </article>
  `;
}

// 调研问卷增强 2：咨询级商业分析报告。
// 完成态不再只是几句总结，而是用 Executive Summary、客群分析、关键发现、决策矩阵、
// 推荐路径和下一步行动组成可汇报的商业报告骨架。
function consultingReportCard(originalInput) {
  return `
    <article class="workflow-card report-card">
      <div class="report-cover">
        <div>
          <div class="card-kicker">商业分析报告</div>
          <h2>会员年费涨价接受度调研报告</h2>
          <p>围绕“${originalInput}”形成的仿真顾客调研结论、证据和建议。</p>
        </div>
        <div class="confidence-block">
          <span>置信度</span>
          <strong>76%</strong>
        </div>
      </div>

      <section class="executive-summary">
        <h3>01 Executive Summary</h3>
        <p class="lead-conclusion">不建议直接从 199 元涨至 299 元。建议采用“权益升级 + 老会员缓冲 + 小范围测试”的分阶段方案。</p>
        <ol>
          <li>高价值会员可接受涨价，但要求权益可感知、可高频使用。</li>
          <li>价格敏感会员存在明显流失风险，需要缓冲期或替代方案。</li>
          <li>沟通方式会显著影响接受度，不能只表达“涨价”。</li>
        </ol>
      </section>

      <div class="report-two-col">
        <section class="report-section">
          <h3>02 Customer Segments</h3>
          <div class="segment-bars">
            <div><span>高价值会员</span><strong>68%</strong><i style="width:68%"></i></div>
            <div><span>当前会员</span><strong>54%</strong><i style="width:54%"></i></div>
            <div><span>价格敏感用户</span><strong>31%</strong><i style="width:31%"></i></div>
          </div>
        </section>
        <section class="report-section">
          <h3>03 Key Findings</h3>
          <p><strong>发现 1：</strong>涨价不是核心问题，核心是“权益是否值得”。</p>
          <p><strong>发现 2：</strong>老会员需要被尊重，直接涨价会触发被背刺感。</p>
          <p><strong>发现 3：</strong>低风险试用入口可降低潜在会员犹豫。</p>
        </section>
      </div>

      <section class="report-section">
        <h3>04 Decision Matrix</h3>
        <table class="decision-matrix">
          <thead>
            <tr><th>方案</th><th>收入潜力</th><th>流失风险</th><th>推荐度</th></tr>
          </thead>
          <tbody>
            <tr><td>直接涨至 299</td><td>高</td><td>高</td><td>不推荐</td></tr>
            <tr><td>老会员 199 / 新会员 299</td><td>中高</td><td>中</td><td>可测试</td></tr>
            <tr><td>299 + 权益升级</td><td>高</td><td>中</td><td>推荐</td></tr>
            <tr><td>分阶段涨价</td><td>中</td><td>低</td><td>强推荐</td></tr>
          </tbody>
        </table>
      </section>

      <section class="report-section recommendation-section">
        <h3>05 Recommendation</h3>
        <p>推荐路径：第一阶段保留老会员 199 元 3 个月；第二阶段推出 299 元权益升级包；第三阶段对高价值会员先做 A/B 测试。</p>
        <div class="next-actions">
          <span>设计权益包</span>
          <span>测试沟通文案</span>
          <span>选择测试客群</span>
          <span>生成汇报版</span>
        </div>
      </section>
    </article>
  `;
}

function evidenceCard(title, body, tag) {
  return `
    <article class="evidence-card">
      <span>${tag}</span>
      <h3>${title}</h3>
      <p>${body}</p>
    </article>
  `;
}

// 右侧栏保持单一职责：只展示仿真顾客留声与 hover 快速档案。
// 报告证据应在中间报告卡片内沉淀，避免右栏信息堆叠影响用户查看顾客详情。
function taskRightPanel(complete) {
  if (complete) {
    return `
      <aside class="task-right-panel completed-insight-panel">
        <div class="panel-header">
          <div>
            <h2>顾客留声</h2>
            <p>已用于生成报告的回答流</p>
          </div>
          <span class="panel-badge">已回答 ${taskState.total} / ${taskState.total}</span>
        </div>
        <div class="voice-list completed-voice-list">
          ${taskCustomers.map(taskVoiceCard).join("")}
        </div>
      </aside>
    `;
  }

  return `
    <aside class="task-right-panel">
      <div class="panel-header">
        <div>
          <h2>顾客留声</h2>
          <p>本次调研回答流</p>
        </div>
        <span class="panel-badge">已回答 ${taskState.answered} / ${taskState.total}</span>
      </div>
      <div class="voice-list">
        ${taskCustomers.map(taskVoiceCard).join("")}
      </div>
    </aside>
  `;
}

// 对话内容详情页 / 任务详情页。
// 页面分为左侧收起导航、中间结构化工作流、右侧顾客留声三栏。
function taskPage() {
  taskContext = loadTaskContext();
  const planVisible = taskState.stage === "plan" || taskState.stage === "collecting" || taskState.stage === "complete";
  const collectingVisible = taskState.stage === "collecting" || taskState.stage === "complete";
  const complete = taskState.stage === "complete";
  const originalInput = escapeHtml(taskContext.originalInput);
  const taskTitle = escapeHtml(taskContext.title);
  const capability = escapeHtml(taskContext.capability);

  return `
    <div class="task-shell">
      <aside class="task-rail">
        <div class="task-logo">${icon("logo", "brand-icon")}</div>
        ${taskRailIcon("顾客搭档", "customer", true)}
        ${taskRailIcon("新建", "plus")}
        ${taskRailIcon("探索技能", "spark")}
        ${taskRailIcon("搜索", "search")}
        ${taskRailIcon("资源库", "resource")}
        ${taskRailIcon("知识库", "knowledge")}
        ${taskRailIcon("项目库", "project")}
        ${taskRailIcon("历史记录", "history")}
        <div class="task-rail-spacer"></div>
        ${taskRailIcon("我的", "user")}
        ${taskRailIcon("通知", "bell")}
        ${taskRailIcon("设置", "settings")}
      </aside>

      <main class="task-main">
        <header class="task-header">
          <div>
            <div class="task-type">${capability}</div>
            <h1>${taskTitle}</h1>
          </div>
          <span class="task-status ${complete ? "done" : ""}">${complete ? "已完成" : "进行中"}</span>
        </header>

        <section class="conversation-stack">
          <article class="message-row user-message-row">
            ${userAvatar()}
            <div class="user-request message-card">
              <p>${originalInput}</p>
            </div>
          </article>

          <article class="message-row bot-message-row">
            ${botAvatar()}
            <div class="workflow-card collapsible-card ${taskState.collapsed.clarify ? "collapsed" : ""}">
              <div class="collapsible-head">
                <div class="card-title">为了设计更准确的调研，我需要先确认两个问题：</div>
                ${collapseToggle("clarify")}
              </div>
              <div class="collapsible-body">
                <div class="clarify-grid">
                  <div class="question-panel">
                    <h3>1. 你更想验证哪一类顾客？</h3>
                    <div class="option-list">
                      ${["当前会员", "潜在会员", "高价值用户", "价格敏感用户"].map((x) => optionButton("customers", x)).join("")}
                    </div>
                  </div>
                  <div class="question-panel">
                    <h3>2. 你更关心哪一个决策风险？</h3>
                    <div class="option-list">
                      ${["涨价接受度", "老用户流失", "权益感知", "竞品比较"].map((x) => optionButton("risks", x)).join("")}
                    </div>
                  </div>
                </div>
                <button class="primary-action centered-action" onclick="generatePlan()">生成调研方案</button>
              </div>
            </div>
          </article>

          ${planVisible ? `
            <article class="message-row bot-message-row">
              ${botAvatar()}
              <div class="workflow-card plan-card collapsible-card ${taskState.collapsed.plan ? "collapsed" : ""}">
                <div class="collapsible-head">
                  <div>
                    <div class="card-kicker">调研方案</div>
                    <h2>围绕“${originalInput}”验证顾客接受度与主要顾虑</h2>
                  </div>
                  ${collapseToggle("plan")}
                </div>
                <div class="collapsible-body">
                  <div class="plan-grid">
                    <div>
                      <h3>调研目标</h3>
                      <p>判断顾客对“${originalInput}”的理解、可接受条件与潜在流失风险。</p>
                    </div>
                    <div>
                      <h3>目标顾客</h3>
                      <p>${taskState.selectedCustomers.join("、")}</p>
                    </div>
                  </div>
                  <ol class="module-list">
                    <li>当前会员价值感知</li>
                    <li>涨价接受区间</li>
                    <li>权益补强偏好</li>
                    <li>流失风险判断</li>
                    <li>沟通方式偏好</li>
                  </ol>
                  <button class="primary-action plan-action" onclick="startCollecting()" ${taskState.stage !== "plan" ? "disabled" : ""}>开始让仿真顾客回答</button>
                </div>
              </div>
            </article>
          ` : ""}

          ${planVisible ? expertOrchestrationCard(complete) : ""}

          ${collectingVisible ? `
            <article class="workflow-card progress-card">
              <div class="progress-head">
                <div>
                  <div class="card-kicker">收集进度</div>
                  <h2>${complete ? "顾客回复已完成" : "正在收集仿真顾客回答"}</h2>
                </div>
                <strong>${taskState.answered} / ${taskState.total}</strong>
              </div>
              <div class="progress-track"><span style="width:${(taskState.answered / taskState.total) * 100}%"></span></div>
              <div class="distribution">
                <div><strong>8</strong><span>支持</span></div>
                <div><strong>12</strong><span>犹豫</span></div>
                <div><strong>6</strong><span>反对</span></div>
                <div><strong>4</strong><span>条件接受</span></div>
              </div>
            </article>
          ` : ""}

          ${complete ? `
            ${consultingReportCard(originalInput)}
          ` : `
            <article class="empty-conclusion">调研结论将在顾客回复完成后生成</article>
          `}
        </section>

        <div class="task-input-bar">
          <span>${icon("plus")}</span>
          <input placeholder="继续补充你的调研要求..." />
          <span>${icon("resource")}资源</span>
          <span>${icon("spark")}Skill</span>
          <span>${icon("mic")}麦克风</span>
          <button class="round-btn">${icon("arrowUp")}</button>
        </div>
      </main>

      ${taskRightPanel(complete)}
    </div>
  `;
}

// 用户勾选澄清问题选项。
// 只有 clarify 阶段允许修改，避免调研方案生成后选项和方案不一致。
function toggleOption(group, label) {
  if (taskState.stage !== "clarify") return;
  const key = group === "customers" ? "selectedCustomers" : "selectedRisks";
  const set = new Set(taskState[key]);
  if (set.has(label)) set.delete(label);
  else set.add(label);
  taskState[key] = Array.from(set);
  render();
}

// 折叠或展开澄清问题卡 / 调研方案卡。
// 折叠状态只影响 UI，不改变任务数据。
function toggleCollapse(section) {
  taskState.collapsed[section] = !taskState.collapsed[section];
  render();
}

function toggleAccountMenu() {
  uiState.accountMenuOpen = !uiState.accountMenuOpen;
  render();
}

// 打开个性化弹窗前先关闭账户菜单，避免菜单和弹窗同时占用注意力。
function openPersonalization() {
  uiState.accountMenuOpen = false;
  uiState.personalizationOpen = true;
  render();
}

// 关闭个性化弹窗。当前表单不持久化，后续可接入用户设置保存逻辑。
function closePersonalization() {
  uiState.personalizationOpen = false;
  render();
}

// 生成调研方案，进入 plan 阶段。
// 这里不自动收起澄清问题卡，保持和当前确认线框图一致。
function generatePlan() {
  taskState.stage = "plan";
  taskState.collapsed.plan = false;
  render();
}

// 模拟仿真顾客回答进度。
// 真实后端接入后，这里应改为订阅任务状态或轮询 SurveyResponse。
function startCollecting() {
  taskState.stage = "collecting";
  taskState.answered = 0;
  render();
  clearInterval(taskState.timer);
  taskState.timer = setInterval(() => {
    taskState.answered += 3;
    if (taskState.answered >= taskState.total) {
      taskState.answered = taskState.total;
      taskState.stage = "complete";
      clearInterval(taskState.timer);
    }
    render();
  }, 650);
}

// 极简 hash 路由。
// #home 默认首页，#skills 探索技能页，#task 任务详情页，#interview 深度访谈页。
function render() {
  const route = location.hash.replace("#", "") || "home";
  const app = document.getElementById("app");
  if (route === "skills") app.innerHTML = skillsPage();
  else if (route === "task") app.innerHTML = taskPage();
  else if (route === "interview") app.innerHTML = interviewPage();
  else app.innerHTML = homePage();
  bindHomePrompt();
}

// 监听 hash 变化并首次渲染页面。
window.addEventListener("hashchange", render);
render();
