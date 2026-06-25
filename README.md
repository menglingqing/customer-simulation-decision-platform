# 仿真顾客决策平台 (Customer Simulation Decision Platform)

> 一个面向企业的仿真顾客决策平台型 Agent 工作台。在关键决策执行前，调度 Skill、Tool、资源库、知识库和仿真顾客群体，模拟顾客反应、识别风险、生成可执行的决策建议。

---

## 一句话定位

**用仿真顾客预演企业决策。** 帮助企业在投入资源之前，提前看到不同顾客会如何理解、反应、犹豫和决策。

---

## 核心问题

企业做重要决策时面临：

| 问题 | 本产品解法 |
|------|-----------|
| 决策者过度依赖内部视角 | 多类型仿真顾客提供外部视角 |
| 以为顾客会理解，实际不理解 | 第一人称顾客原声暴露认知盲区 |
| 以为顾客会买单，实际顾虑重重 | 结构化反馈识别反对/犹豫/条件接受 |
| 真实调研周期长、成本高 | 低成本、高效率的顾客预演场 |
| 决策风险执行后才暴露 | 提前识别风险，输出修改建议 |

---

## 产品架构

```
首页任务启动 → 创建任务上下文 → 澄清意图 → 生成方案
→ 仿真顾客回答 → 收集多视角反馈 → 识别风险争议
→ 输出结论建议 → 沉淀项目复盘
```

### 核心页面（MVP）

| # | 页面 | 状态 | 路径 |
|---|------|------|------|
| 1 | 首页 / Agent 工作台 | ✅ 原型完成 | `#home` |
| 2 | 对话内容详情页 / 任务详情页 | ✅ 原型完成 | `#task` |
| 3 | 探索技能详情页 | ✅ 原型完成 | `#skills` |
| 4 | 深度访谈页 / 顾客圆桌 | ✅ 原型完成 | `#interview` |
| 5 | 决策输入页 | 📋 设计完成 | - |
| 6 | 仿真顾客群体页 | 📋 设计完成 | - |
| 7 | 决策推演与反馈页 | 📋 设计完成 | - |
| 8 | 决策建议报告页 | 📋 设计完成 | - |

### V2 设计系统

独立的品牌设计体系，提供两种视觉风格：
- **原始版** (`index.html`) — Codex 基线，灰-米色系
- **V2 优化版** (`index-v2.html`) — 靛蓝品牌色 + 暖石中性底 + 完整微交互

---

## 技术实现

### 当前原型

- **技术栈**：Vanilla HTML/CSS/JS（零依赖，可直接在浏览器打开）
- **路由**：Hash-based（`#home`、`#task`、`#skills`）
- **数据**：Mock data，结构接近真实业务模型
- **图标**：内联 SVG（30+ 图标，`iconPaths` 库）

### 文件结构

```
prototype/
├── index.html          # 原始版本入口
├── styles.css          # 原始版本样式
├── app.js              # 原始版本逻辑
├── index-v2.html       # V2 优化版本入口
├── styles-v2.css       # V2 设计系统（品牌色、排版、交互）
├── app-v2.js           # V2 完整逻辑
docs/                   # 产品文档
├── PROJECT_BRIEF.md    # 项目简报
├── PRODUCT_POSITIONING.md  # 产品定位
├── ARCHITECTURE.md     # 架构设计（9 层架构）
├── PAGE_SPECS.md       # 页面规格（7 页完整交互定义）
├── DATA_MODEL.md       # 数据模型（24 个核心实体）
├── ROADMAP.md          # 路线图（6 阶段）
├── PROMPTS.md          # 仿真顾客反馈 Prompt
└── AGENT_DESIGN.md     # Agent 设计
tasks/
└── MVP_TASKS.md        # MVP 任务拆解
AGENTS.md               # Agent 编码指南
```

### V2 设计系统

- **色彩**：靛蓝 accent（`#1e1b4b`）+ 暖石色中性底
- **排版**：系统字体栈（PingFang SC + SF Pro）
- **交互**：完整 hover/active/focus 三态 + CSS transition
- **布局**：固定高度三栏（100vh），各自独立滚动
- **组件**：账户菜单、个性化弹窗、可折叠工作流卡、顾客 hover 快速档案

---

## 产品不是什么

- ❌ 通用 Chatbot
- ❌ 普通问卷工具
- ❌ 单纯数据看板
- ❌ 只服务服装行业的爆款分析工具

## 产品是什么

- ✅ 企业决策前的 Agent 工作台
- ✅ 仿真顾客决策推演平台
- ✅ 多 Agent 决策编排系统
- ✅ 业务资源与知识调度平台
- ✅ 决策风险识别与建议系统

---

## 目标用户

企业创始人、产品负责人、市场/品牌/增长负责人、用户研究团队、咨询顾问、业务决策者。

---

## 路线图

| 阶段 | 目标 |
|------|------|
| 1. 可点击 MVP | 原型验证平台型 Agent 首页 + 任务详情页 |
| 2. 平台资产体系 | Skill/Tool/资源库/知识库可浏览 |
| 3. 多场景模板 | 8 大业务场景决策模板 |
| 4. 仿真顾客增强 | 画像配置、反馈一致性、多轮追问 |
| 5. 决策推演 | 多方案对比、风险雷达、优化建议 |
| 6. 决策复盘 | 执行结果回填、预测校准、企业记忆 |

---

## 本地运行

```bash
# 直接浏览器打开
open prototype/index.html       # 原始版本
open prototype/index-v2.html    # V2 优化版本

# 或通过 Python 服务器
cd prototype && python3 -m http.server 4173
```

---

## 文档索引

- [项目简报](docs/PROJECT_BRIEF.md)
- [产品定位](docs/PRODUCT_POSITIONING.md)
- [架构设计](docs/ARCHITECTURE.md)
- [页面规格](docs/PAGE_SPECS.md)
- [数据模型](docs/DATA_MODEL.md)
- [路线图](docs/ROADMAP.md)
- [MVP 任务](tasks/MVP_TASKS.md)
- [Prompt 设计](docs/PROMPTS.md)
- [V2 设计系统](docs/V2_DESIGN_SYSTEM.md)
- [Agent 设计](docs/AGENT_DESIGN.md)
- [Agent 编码指南](AGENTS.md)
