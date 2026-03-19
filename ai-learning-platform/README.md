# AI 学习平台

## 项目状态

✅ **完成** - 全功能 AI 学习平台

## 技术栈

- **前端框架**: Next.js 14 (App Router)
- **样式**: Tailwind CSS
- **语言**: TypeScript
- **数据库**: SQLite (开发) / PostgreSQL (生产)
- **认证**: JWT
- **部署**: Docker

## 功能清单

### 已完成
- [x] 用户注册/登录 + JWT 认证
- [x] 数据库 (SQLite/PostgreSQL)
- [x] 响应式布局 (Web + H5)
- [x] **学习内容系统** - 文章 CRUD、分类、浏览量
- [x] **AI 工具箱** - 工具展示、分类、HOT/VIP 标签
- [x] **社区** - 帖子 CRUD、评论
- [x] **管理后台** - 仪表盘、用户/内容管理
- [x] **Docker 部署** - docker-compose 一键部署

## 快速启动

### 开发环境
```bash
cd ai-learning-platform
npm install
npm run dev
```
访问 http://localhost:3000

### 生产部署 (Docker)
```bash
# 1. 配置环境变量
cp .env.example .env
# 编辑 .env 填写必要的配置

# 2. 启动服务
docker-compose up -d

# 3. 执行数据库迁移
docker-compose exec app npx prisma migrate deploy
```

访问 http://localhost:3000

## 页面结构

| 路径 | 说明 |
|------|------|
| / | 首页 |
| /learn | 学习中心 |
| /learn/:slug | 文章详情 |
| /tools | AI 工具箱 |
| /community | 社区 |
| /community/:id | 帖子详情 |
| /profile | 个人中心 |
| /admin | 管理后台 |
| /admin/users | 用户管理 |
| /admin/contents | 内容管理 |
| /login | 登录 |
| /register | 注册 |

## 管理后台

默认第一个注册用户为普通用户，需要手动在数据库中修改角色为 ADMIN：

```sql
UPDATE User SET role = 'ADMIN' WHERE email = 'your@email.com';
```

## 项目结构

```
ai-learning-platform/
├── src/
│   ├── app/           # 页面 + API
│   ├── components/    # 组件
│   ├── context/       # 状态管理
│   └── lib/          # 工具库
├── prisma/           # 数据库模型
├── public/           # 静态资源
├── docker-compose.yml
├── Dockerfile
└── package.json
```
