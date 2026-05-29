-- 心芽小栈 Supabase 数据库初始化脚本
-- 请在 Supabase Dashboard → SQL Editor 中执行此文件

-- ==================== 1. 幸福小事表 ====================
CREATE TABLE IF NOT EXISTS happy_moments (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  text TEXT NOT NULL,
  mood TEXT NOT NULL DEFAULT '🥰 满足',
  stars INT NOT NULL DEFAULT 5 CHECK (stars >= 1 AND stars <= 5),
  category TEXT NOT NULL DEFAULT '🎨 生活美学',
  date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  liked BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==================== 2. 知识库表（预留给未来文档参考功能） ====================
CREATE TABLE IF NOT EXISTS knowledge_entries (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==================== 3. 开启 Row Level Security ====================
ALTER TABLE happy_moments ENABLE ROW LEVEL SECURITY;
ALTER TABLE knowledge_entries ENABLE ROW LEVEL SECURITY;

-- ==================== 4. happy_moments RLS 策略 ====================
-- 用户只能读取自己的幸福小事
CREATE POLICY "users_select_own_moments" ON happy_moments
  FOR SELECT USING (auth.uid() = user_id);

-- 用户只能插入自己的幸福小事
CREATE POLICY "users_insert_own_moments" ON happy_moments
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 用户只能更新自己的幸福小事
CREATE POLICY "users_update_own_moments" ON happy_moments
  FOR UPDATE USING (auth.uid() = user_id);

-- 用户只能删除自己的幸福小事
CREATE POLICY "users_delete_own_moments" ON happy_moments
  FOR DELETE USING (auth.uid() = user_id);

-- ==================== 5. knowledge_entries RLS 策略 ====================
-- 所有已登录用户可读知识库
CREATE POLICY "users_read_knowledge" ON knowledge_entries
  FOR SELECT USING (auth.role() = 'authenticated');

-- 所有已登录用户可插入知识条目
CREATE POLICY "users_insert_knowledge" ON knowledge_entries
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- ==================== 6. 索引 ====================
CREATE INDEX IF NOT EXISTS idx_moments_user_id ON happy_moments(user_id);
CREATE INDEX IF NOT EXISTS idx_moments_date ON happy_moments(date DESC);
