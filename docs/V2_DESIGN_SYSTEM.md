# V2 Design System — 仿真顾客决策平台

> 基于 taste-skill + decision-system-design + harness-engineering 三技能融合的品牌设计系统。

---

## 设计理念

**Clean, professional, decision-focused.** 暖石色中性底 + 深靛蓝 accent，传达信任、智能、克制。不走 AI 默认的紫色渐变、beige+brass 暖调或 Inter 字体。

---

## 色彩体系

| Token | Hex | 用途 |
|-------|-----|------|
| `--bg` | `#fafaf9` | 页面底色 |
| `--surface` | `#ffffff` | 卡片/面板白底 |
| `--surface-raised` | `#f5f4f2` | 悬浮面板 |
| `--text` | `#1c1917` | 主文字 |
| `--text-secondary` | `#78716c` | 辅助文字 |
| `--text-tertiary` | `#a8a29e` | 三级文字 |
| `--border` | `#e7e5e4` | 边框 |
| `--accent` | `#1e1b4b` | 品牌主色 — 深靛蓝 |
| `--accent-hover` | `#312e81` | 品牌 hover |
| `--accent-soft` | `#eef2ff` | 品牌浅底 |
| `--success` | `#059669` | 成功/正向 |
| `--warning` | `#d97706` | 警告/注意 |

---

## 排版

| 角色 | 规格 |
|------|------|
| 字体栈 | `-apple-system, BlinkMacSystemFont, "SF Pro Display", "PingFang SC", ...` |
| 首页标题 | 34px / 600 / -0.02em |
| 页面标题 | 22-30px / 600 / -0.01em |
| 正文 | 15px / 1.6 |
| 辅助文字 | 13-14px |
| 微标签 | 11-12px / 550 / 0.04em uppercase |

**字体原则**: 不使用 Inter 作为默认。中英文混排优先系统字体栈。

---

## 圆角体系

| Token | 值 | 用途 |
|-------|-----|------|
| `--radius-sm` | 8px | 小元素 (checkmark, chip) |
| `--radius-md` | 12px | 导航项、标签 |
| `--radius-lg` | 16px | 卡片 |
| `--radius-xl` | 20px | 大卡片、弹窗 |
| `--radius-2xl` | 24px | 页面面板 |
| `--radius-full` | 9999px | 按钮、胶囊、头像 |

---

## 阴影

| Token | 用途 |
|-------|------|
| `--shadow-xs` | 微高亮 |
| `--shadow-sm` | 卡片 hover |
| `--shadow-md` | 弹窗、输入框 |
| `--shadow-lg` | 大卡片 |
| `--shadow-glow` | 输入框 focus 光环 |
| `--shadow-popover` | 顾客档案 popover |
| `--shadow-modal` | 设置弹窗 |

所有阴影 tinted to background hue，不使用纯黑 `rgba(0,0,0,...)`。

---

## 过渡动画

| Token | 值 | 用途 |
|-------|-----|------|
| `--ease-out` | `cubic-bezier(.16,1,.3,1)` | 标准过渡 |
| `--duration-fast` | 150ms | hover/active |
| `--duration-base` | 250ms | 卡片展开 |
| `--duration-slow` | 400ms | 大面积变化 |

所有动画遵循 `prefers-reduced-motion`。

---

## 布局系统

### 固定视口 + 区域滚动

```
page-shell: height: 100vh; overflow: hidden
├── left-rail:    height: calc(100vh - 24px)
├── main-area:    height: calc(100vh - 24px); overflow: auto
└── right-panel:  height: calc(100vh - 24px); overflow: auto
```

### 页面栅格

| 页面 | 列宽 |
|------|------|
| 首页 | 272px / 1fr / 340px |
| 任务页 | 52px / minmax(580px, 1fr) / 340px |
| 深访页 | 52px / minmax(680px, 1fr) / 360px |
| 圆桌页 | 52px / minmax(960px, 1fr) |
| 技能页 | 56px / 1fr |

---

## 组件速查

### 按钮层级

1. **Primary**: `bg: accent, color: text-inverse, radius: full`
2. **Secondary**: `border: border, bg: surface`
3. **Ghost**: `bg: transparent, hover: surface-raised`

### 卡片

- 所有卡片 `border: 1px solid --border` + `radius: lg`
- Hover: `border-color: border-strong` + `shadow-md` + `translateY(-1px)`
- Active: `translateY(0)` + `scale(0.98)`

### 输入框

- Border: `--border`, focus: `--accent` + `shadow-glow`
- Placeholder: `text-tertiary`
- Label 在输入框上方（非 placeholder-as-label）

### 胶囊 (Capsule/Tab)

- `radius: full` + `border: 1px`
- Active: `bg: accent-soft, color: accent`
- Primary capsule: `bg: accent, color: text-inverse`

---

## 交互状态矩阵

每个可交互元素覆盖：

| 状态 | 处理 |
|------|------|
| Default | 基础样式 |
| Hover | 边框加深 + 微阴影 + translateY(-1px) |
| Active/Focus | 缩放反馈 + 品牌色光环 |
| Disabled | 40% 透明度 + cursor: not-allowed |
| Loading | 骨架屏（匹配最终布局形状） |
| Empty | 虚线边框 + 居中提示文字 |

---

## 反模式

- ❌ AI-purple 渐变 / 发光
- ❌ Inter 作为默认字体
- ❌ 纯黑 `#000` 阴影
- ❌ em-dash `—` 作为设计元素
- ❌ warm beige+brass+espresso 暖调
- ❌ `min-height: 100vh` 导致整页滚动
- ❌ `overflow: visible` 导致内容溢出
- ❌ 无 hover/active 状态的静态按钮

---

## 相关文档

- [项目简报](PROJECT_BRIEF.md)
- [架构设计](ARCHITECTURE.md)
- [页面规格](PAGE_SPECS.md)
- [数据模型](DATA_MODEL.md)
