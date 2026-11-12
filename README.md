# 创平数据治理平台 · 独立交互原型

本仓库用于从 [data-product-platform PR #363](https://github.com/henryxu1008/data-product-platform/pull/363) 提取前端交互原型，目标是与 [data-forge](https://github.com/henryxu1008/data-forge) 一样独立运行、独立评审和部署。

## 来源与边界

- 来源分支：`henryxu1008/data-product-platform:codex/agent-quality-readonly`
- 来源目录：`apps/web/components/governance-demo/`
- 产品名称：创平数据治理平台
- 仅保留本地演示数据、页面、导航、系统设置、Agent 工作台与业务交互
- 不接入 Core API、真实 IAM、真实 Agent 派发或业务写入
- 原仓库 PR #363 保持 Draft，不因本仓库创建而合并

## 迁移验收条件

1. React + Vite 独立构建和运行，无 Next.js 运行时依赖
2. 保留业务页面、设置、Agent 工作台及浏览器刷新后的演示会话
3. 保留业务导航和历史回退；不调用真实后端
4. 通过独立构建、状态测试和 Playwright 关键流程回归
5. GitHub Pages 部署仅在构建及测试通过后启用

> 当前为仓库初始化及迁移约束，原型源码尚未导入；请勿将此 README 视为已完成迁移或可运行的应用。
