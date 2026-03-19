# AI 学习平台

## 访问地址

**生产环境**: http://106.54.45.113:3000

**GitHub 仓库**: https://github.com/XiuerFang/ai-learning-platform

---

## 项目状态

✅ **已部署并运行**

## 技术栈

- **前端框架**: Next.js 14 (App Router)
- **样式**: Tailwind CSS
- **语言**: TypeScript
- **数据库**: SQLite (开发) / PostgreSQL (生产)
- **认证**: JWT
- **部署**: Docker / PM2

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
- [x] **GitHub Actions CI/CD** - 自动化部署

## 本地开发

```bash
cd ai-learning-platform
npm install
npm run dev
```

访问 http://localhost:3000

## 生产部署

### 方式一: Docker (推荐)
```bash
docker-compose up -d
```

### 方式二: PM2
```bash
npm install -g pm2
pm2 start npm --name ai-learning-platform -- start
```

## CI/CD 配置

在 GitHub 仓库的 Settings → Secrets and variables → Actions 中配置:

| Secret | 说明 |
|--------|------|
| HOST | 服务器 IP |
| USERNAME | SSH 用户名 |
| PASSWORD | SSH 密码 |
| PORT | SSH 端口 (默认 22) |
| DATABASE_URL | PostgreSQL 连接字符串 |

## 页面结构

| 路径 | 说明 |
|------|------|
| / | 首页 |
| /learn | 学习中心 |
| /tools | AI 工具箱 |
| /community | 社区 |
| /profile | 个人中心 |
| /admin | 管理后台 |
| /login | 登录 |
| /register | 注册 |

## 管理后台

第一个注册用户需手动在数据库把 role 改成 ADMIN 才能进入管理后台。
