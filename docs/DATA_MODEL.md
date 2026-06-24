# 数据模型

## 核心实体

第一版系统需要以下核心实体：

1. Workspace
2. Project
3. Skill
4. Tool
5. ResourceItem
6. KnowledgeItem
7. UserProfile
8. UserPreference
9. Task
10. TaskContext
11. ClarificationQuestion
12. SurveyPlan
13. SurveyResponse
14. SurveyConclusion
15. TaskUiState
16. CustomerQuickProfile
17. Decision
18. DecisionScenario
19. SimulatedCustomer
20. CustomerFeedback
21. RiskItem
22. Recommendation
23. DecisionReport
24. DecisionRecord

## Workspace 工作区

字段建议：

* id
* name
* companyName
* activeProjectId
* createdAt

## Project 项目

字段建议：

* id
* workspaceId
* name
* description
* status
* linkedDecisionIds
* linkedResourceIds
* linkedKnowledgeIds
* updatedAt

## Skill 能力

字段建议：

* id
* name
* category
* description
* inputTypes
* outputTypes
* enabled

示例：

* 决策拆解
* 仿真顾客生成
* 顾客反馈模拟
* 风险评估
* 报告生成

## Tool 工具

字段建议：

* id
* name
* category
* description
* supportedFileTypes
* enabled

示例：

* 表格读取
* 数据分析
* 文档解析
* 图表生成
* 报告导出

## ResourceItem 资源项

资源库是 Agent 的原材料。

字段建议：

* id
* name
* resourceType
* format
* description
* schema
* source
* tags
* updatedAt

resourceType 可选：

* product_table
* sku_table
* price_table
* customer_table
* member_table
* simulated_customer_table
* competitor_table
* channel_table
* store_table
* marketing_asset
* design_asset
* survey_result
* interview_notes

## KnowledgeItem 知识项

知识库是 Agent 的背景理解。

字段建议：

* id
* title
* knowledgeType
* summary
* content
* source
* tags
* updatedAt

knowledgeType 可选：

* brand_positioning
* user_research
* product_strategy
* membership_policy
* service_policy
* pricing_principle
* historical_review
* industry_insight
* sop

## UserProfile 用户资料

UserProfile 对应左下角账户菜单和“个人资料”入口。

字段建议：

* id
* workspaceId
* displayName
* avatar
* planName
* role
* createdAt
* updatedAt

当前前端原型示例：

* displayName: 我的 / 孟令卿
* planName: 企业空间 · Pro / Plus

## UserPreference 用户偏好

UserPreference 对应账户菜单中的“个性化”设置。

字段建议：

* userId
* nickname
* occupation
* about
* memoryEnabled
* updatedAt

字段说明：

* nickname：平台应该如何称呼当前用户。
* occupation：用户职业或业务角色，例如品牌负责人、产品经理、咨询顾问。
* about：需要记住的行业背景、决策偏好、常用业务场景或沟通风格。
* memoryEnabled：是否启用个性化记忆。

MVP 说明：

当前原型只实现前端静态表单，不要求持久化保存。后续接入真实账号系统后，UserPreference 可用于影响默认业务场景、提示词上下文和报告表达风格。

## Task 任务

Task 是首页输入后创建的任务对象。任何任务详情页都必须从 Task 读取首段用户输入，不能写死。

字段建议：

* id
* workspaceId
* projectId
* taskType
* title
* originalInput
* selectedCapability
* selectedScenario
* status
* currentStage
* createdAt
* updatedAt

taskType 可选：

* survey_questionnaire
* group_decision
* statistical_analysis
* design_review
* hit_product_graph

currentStage 可选：

* created
* clarifying
* plan_generated
* collecting_customer_responses
* conclusion_ready

当前前端原型中的映射：

* 首页输入框内容 → originalInput
* 首页能力按钮“调研问卷” → selectedCapability
* 任务详情页标题 → title
* 任务详情页阶段状态 → currentStage / status

## TaskContext 任务上下文

TaskContext 记录首页输入时选择或自动带入的上下文。

字段建议：

* id
* taskId
* linkedResourceIds
* linkedKnowledgeIds
* linkedCustomerIds
* linkedCustomerGroupIds
* inferredDecisionType
* extractedEntities
* assumptions

## ClarificationQuestion 澄清问题

用于任务详情页中 Agent 对用户意图的聚焦确认。

字段建议：

* id
* taskId
* question
* options
* selectedOptions
* required
* answeredAt

默认调研问卷任务包含两个澄清问题：

* 你更想验证哪一类顾客？
* 你更关心哪一个决策风险？

## SurveyPlan 调研方案

字段建议：

* id
* taskId
* objective
* targetCustomers
* hypotheses
* modules
* keyQuestions
* expectedOutputs
* createdAt

## SurveyResponse 调研回答

SurveyResponse 是某个仿真顾客对当前任务的回答。

字段建议：

* id
* taskId
* customerId
* status
* quote
* answer
* submittedAt

status 可选：

* waiting
* answering
* answered

注意：右侧顾客留声区展示 SurveyResponse 时，只展示脱敏顾客信息、门店 / 渠道、会员身份、回答内容和回答状态，不展示分析标签。

## SurveyConclusion 调研结论

字段建议：

* id
* taskId
* summary
* keyFindings
* mainConcerns
* acceptanceConditions
* highRiskGroups
* suggestedChanges
* nextActions
* generatedAt

## InterviewContext 深度访谈上下文

InterviewContext 由首页右侧顾客心声点击创建，用于进入深度访谈页。

字段建议：

* id
* source：例如 home_customer_voice
* sourceTaskId
* customerId
* firstMessage
* maskedName
* age
* channelOrStore
* membershipLevel
* purchasedItems
* personaSummary
* mode
* createdAt

mode 可选：

* single：方案 A，一对一深访
* roundtable：方案 C，顾客圆桌模式

当前前端原型中的映射：

* 首页顾客心声 quote → firstMessage
* 首页顾客脱敏信息 → maskedName / age / channelOrStore / membershipLevel
* 右侧顾客快速档案数据 → purchasedItems / personaSummary
* `interviewState.mode` → mode

## InterviewMessage 深度访谈消息

InterviewMessage 表示深度访谈或圆桌模式中的一条发言。

字段建议：

* id
* interviewId
* speakerType
* speakerId
* speakerName
* speakerRole
* content
* side
* createdAt

speakerType 可选：

* simulated_customer
* user
* human_participant
* agent
* customer_group

side 可选：

* left
* right

说明：

方案 A 中主要包含仿真顾客和用户发言；方案 C 中会增加真人参与者、专家 Agent 和顾客群体发言。

## RoundtableSession 顾客圆桌会话

RoundtableSession 是深度访谈升级后的协作会话。

字段建议：

* id
* interviewId
* title
* participants
* activeSpeakerId
* dialogueMessages
* currentSpeakerProfile
* draftConclusion
* createdAt
* updatedAt

participants 字段建议：

* id
* type
* displayName
* role
* avatar

draftConclusion 字段建议：

* concernPoints
* acceptanceConditions
* riskSignals
* nextActions

使用原则：

* 圆桌模式不是普通群聊，而是面向企业决策证据的协作访谈。
* 当前发言者档案与访谈结论草稿属于圆桌右侧工作区，不应塞回普通消息气泡。

## TaskUiState 任务界面状态

TaskUiState 只描述前端展示状态，不属于核心业务结论。

字段建议：

* taskId
* collapsedSections
* activeRightPanel
* hoveredCustomerId
* lastFocusedCardId

collapsedSections 示例：

```json
{
  "clarify": false,
  "plan": false
}
```

使用原则：

* 折叠 / 展开只影响界面展示，不改变 ClarificationQuestion、SurveyPlan 或 SurveyConclusion。
* 用户点击“生成调研方案”后，澄清问题卡不应被强制收起。
* hover 弹窗状态不需要持久化，通常只保存在前端运行时。

## CustomerQuickProfile 顾客快速档案

CustomerQuickProfile 用于右侧顾客留声 hover 弹窗。

字段建议：

* customerId
* maskedName
* age
* avatar
* channelOrStore
* membershipLevel
* voiceSummary
* purchasedItems
* personaSummary

purchasedItems 字段建议：

* orderDate
* productName
* relevanceScore

personaSummary 字段建议：

* consumptionView
* decisionView
* scenarioView
* purchaseTendency
* corePreference
* decisionRedLines

展示原则：

* 只展示脱敏信息。
* 不在 hover 弹窗中展示支持 / 反对 / 犹豫 / 条件接受等分析标签。
* 右侧顾客卡片和 hover 快速档案必须来自同一 customerId，避免出现两套不一致内容。

## Decision 决策

字段建议：

* id
* projectId
* title
* type
* background
* goal
* targetCustomers
* currentPlan
* alternativePlans
* constraints
* concerns
* expectedOutcome
* linkedResourceIds
* linkedKnowledgeIds
* createdAt

## DecisionScenario 决策场景

字段建议：

* id
* decisionId
* scenarioName
* industry
* businessContext
* decisionVariables
* affectedCustomerGroups
* successMetrics

## SimulatedCustomer 仿真顾客

字段建议：

* id
* decisionId
* name
* maskedName
* age
* avatar
* channelOrStore
* membershipLevel
* segment
* personaType
* background
* coreNeed
* decisionStyle
* priceSensitivity
* trustLevel
* riskPreference
* mainConcern
* decisionRedLines
* likelyAction
* sourceResourceIds
* sourceKnowledgeIds

## CustomerFeedback 顾客反馈

字段建议：

* id
* decisionId
* customerId
* attitude
* quote
* reason
* concern
* attractionPoint
* rejectionPoint
* acceptanceCondition
* riskTags
* confidence

attitude 可选：

* support
* oppose
* hesitate
* conditional_accept

## RiskItem 风险项

字段建议：

* id
* decisionId
* riskType
* description
* severity
* affectedCustomers
* mitigationSuggestion

## Recommendation 决策建议

字段建议：

* id
* decisionId
* recommendationType
* summary
* reasons
* suggestedChanges
* testPlan
* communicationAdvice
* nextActions
* confidenceScore

recommendationType 可选：

* proceed
* proceed_after_revision
* small_scale_test_first
* pause
* not_recommended

## DecisionReport 决策报告

字段建议：

* id
* decisionId
* executiveSummary
* finalRecommendation
* confidenceScore
* keyEvidence
* customerReactionSummary
* risks
* optimizationSuggestions
* nextActions
* citedResourceIds
* citedKnowledgeIds

## DecisionRecord 决策记录

字段建议：

* id
* decisionId
* finalChoice
* implementationDate
* actualResult
* reviewNotes
* predictionAccuracy
* learnings
