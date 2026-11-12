# 创平数据治理平台 · 独立交互原型

从 [data-product-platform PR #363](https://github.com/henryxu1008/data-product-platform/pull/363) 提取的独立前端交互原型，保留业务流程、治理、系统设置和 Agent 本地模拟交互。

## 运行

Node.js 20.19+ 或 22.12+：

```bash
npm install
npm run dev
npm run test
npm run build
```

本仓库是**模拟数据原型**，不连接真实 Core API、IAM 或 Agent 执行服务；本地演示结果不代表正式业务事实。

## 来源

来源分支：`data-product-platform/codex/agent-quality-readonly`，原始目录 `apps/web/components/governance-demo`。提取保留原始 JSX/模型，替换 Next.js 导航为浏览器本地 hash 导航。原 PR #363 保持 Draft。

## 当前验证边界

代码已迁入独立仓库。尚需在具备 Node 依赖安装能力的环境中运行真实构建、浏览器回归，并完成 Pages 发布验收。请勿将静态合同测试视为完整业务验收。
