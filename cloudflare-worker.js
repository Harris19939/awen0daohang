// Cloudflare Worker 代码
// 部署到 Cloudflare Workers: https://workers.cloudflare.com

const defaultData = [
  { id: 1, name: 'GitHub Pro', url: 'https://github.com', username: 'git_master', password: 'gh_token_xxx', notes: '开源项目管理', category: '开发' },
  { id: 2, name: '阿里云 ECS', url: 'https://aliyun.com', username: 'root', password: 'aliyun_pass', notes: 'IP: 47.103.xx.xx', category: '工作' }
];

export default {
  async fetch(request, env) {
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    // 处理 CORS 预检请求
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    const url = new URL(request.url);
    const path = url.pathname;

    // GET: 获取数据
    if (request.method === 'GET' && (path === '/' || path === '/data')) {
      try {
        const data = await env.NVWA_DATA.get('nav_data');
        if (data) {
          return new Response(data, {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }
      } catch (e) {
        console.log('KV not available, using default data');
      }
      return new Response(JSON.stringify(defaultData), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // POST: 保存数据
    if (request.method === 'POST' && path === '/save') {
      try {
        const body = await request.text();
        await env.NVWA_DATA.put('nav_data', body);
        return new Response(JSON.stringify({ success: true }), {
          headers: corsHeaders
        });
      } catch (e) {
        return new Response(JSON.stringify({ success: false, error: e.message }), {
          status: 500,
          headers: corsHeaders
        });
      }
    }

    return new Response('Not Found', { status: 404 });
  }
};
