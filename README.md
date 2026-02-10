# 文导航 (wen0daohang)

🌐 云端数据同步的个人导航页 - 云端存储，多设备同步

## 功能特性

- ✅ 云端数据存储 (Cloudflare Workers + KV)
- ✅ 多设备数据同步
- ✅ 分类管理
- ✅ 密码安全存储 (模糊显示)
- ✅ 搜索功能
- ✅ 数据导入导出
- ✅ 响应式设计

## 快速部署

### 1. 创建 Cloudflare Worker

```bash
# 在 Cloudflare Dashboard 中创建 Worker
# 名称: wen0daohang-api
```

### 2. 配置 KV 命名空间

1. 进入 Worker → Settings → Variables and Secrets
2. 添加 KV 命名空间: `NVWA_DATA`
3. 绑定到 Worker

### 3. 部署 Worker 代码

复制 `cloudflare-worker.js` 内容到 Worker 中

### 4. 修改 API 地址

编辑 `index.html`，修改:

```javascript
const API_URL = 'https://你的-worker-名称.你的用户名.workers.dev';
```

### 5. 部署到 Cloudflare Pages

1. 进入 Cloudflare Pages → Connect to Git
2. 连接本仓库
3. 设置构建命令为空
4. 设置输出目录为 `/`

## 数据结构

```json
[
  {
    "id": 1,
    "name": "GitHub",
    "url": "https://github.com",
    "username": "your-username",
    "password": "your-token",
    "notes": "开发资源",
    "category": "开发"
  }
]
```

## 手动部署到 GitHub Pages

```bash
git clone https://github.com/Harris19939/wen0daohang.git
cd wen0daohang
# 编辑 index.html 中的 API_URL
# 推送到 gh-pages 分支
```

## 许可证

MIT
