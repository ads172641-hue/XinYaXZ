// 复制此文件为 config.js 并填入你的 Supabase 配置
// DeepSeek API Key 已通过 Supabase Edge Function 代理，无需在前端配置。
//
// 部署 Edge Function 后，设置 DeepSeek Key：
//   npx supabase secrets set DEEPSEEK_API_KEY=sk-你的密钥
//   npx supabase functions deploy deepseek-proxy
//
// Supabase 配置已内置于 index.html 作为默认值，以下为覆盖项：
window.APP_CONFIG = {
  // SUPABASE_URL: 'https://your-project.supabase.co',
  // SUPABASE_ANON_KEY: 'sb_publishable_your-key'
};
