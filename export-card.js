// ==================== 幸福卡片原生 Canvas 渲染与导出引擎 ====================

// 每日金句库（用于卡片底部轮换）
const CARD_QUOTES = [
  '"用宏大的世界稀释痛苦，以微小的事物感知幸福"',
  '"幸福不是拥有得多，而是能敏锐地发现身边的温润之光"',
  '"不必等待外界照亮你，你本身就是最温暖的一道微光"',
  '"去热爱每一个具体的日常，在平凡的沙砾中寻找闪光的温柔"',
  '"正念就是全然地活在当下，接纳此时此刻最真实的自己"',
  '"每一次小小的坚持，都是你在为自己心中憧憬的世界投票"',
  '"原谅自己的不完美，正如我们允许夜空中有阴晴圆缺"',
  '"你此刻的呼吸，就是生命最温柔的证明"',
];

function pickDailyQuote() {
  const d = new Date();
  const h = d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
  return CARD_QUOTES[h % CARD_QUOTES.length];
}

// ==================== 单张精美幸福卡片（手账日记风格） ====================

const CAT_COLORS = {
  '🎨 生活美学': ['#FCE7F3', '#DB2777'],
  '💻 个人成长': ['#E0E7FF', '#4F46E5'],
  '🐾 萌宠治愈': ['#FEF3C7', '#D97706'],
  '🌿 亲近自然': ['#D1FAE5', '#059669'],
  '🍔 美食之乐': ['#FEE2E2', '#DC2626'],
  '🏆 工作学业': ['#E0F2FE', '#0284C7'],
  '🔄 视角重构': ['#EDE9FE', '#7C3AED'],
};

const WEEKDAYS = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];

function exportHappinessCard() {
  if (moments.length === 0) {
    showNotification('当前还没有记录任何幸福小事，快去写下一件吧！', 'error');
    return;
  }

  showNotification('正在绘制您的专属幸福卡片，请稍候... 🎨', 'info');

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const W = 800;
  const H = 950;
  canvas.width = W;
  canvas.height = H;
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  // ═══════════════════════════════════════════
  // 背景
  // ═══════════════════════════════════════════
  const bg = ctx.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, '#FFF1F2');
  bg.addColorStop(0.35, '#FFFBEB');
  bg.addColorStop(0.7, '#FEF3C7');
  bg.addColorStop(1, '#FFE4E6');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // 背景装饰：大尺寸柔和光圈
  ctx.fillStyle = 'rgba(253, 164, 186, 0.08)';
  ctx.beginPath(); ctx.arc(120, 100, 200, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = 'rgba(252, 211, 77, 0.08)';
  ctx.beginPath(); ctx.arc(W - 80, H - 150, 220, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = 'rgba(196, 181, 253, 0.06)';
  ctx.beginPath(); ctx.arc(W / 2, H / 2, 280, 0, Math.PI * 2); ctx.fill();

  // 云朵
  drawCloud(ctx, 90, 50, 0.85);
  drawCloud(ctx, 640, 30, 0.7);
  drawCloud(ctx, 40, 300, 0.55);
  drawCloud(ctx, 700, 280, 0.5);
  drawCloud(ctx, 380, 880, 0.75);

  // 散落星星
  const sparklePositions = [
    [70, 160], [720, 120], [130, 400], [680, 420],
    [60, 700], [740, 720], [100, 820], [700, 850],
    [200, 890], [600, 870], [350, 910]
  ];
  ctx.fillStyle = 'rgba(251, 191, 36, 0.45)';
  ctx.font = '14px sans-serif';
  for (const [sx, sy] of sparklePositions) ctx.fillText('✦', sx, sy);
  ctx.fillStyle = 'rgba(244, 114, 182, 0.35)';
  ctx.font = '11px sans-serif';
  for (const [sx, sy] of [[160, 200], [630, 160], [90, 500], [710, 520], [180, 850], [620, 830]]) ctx.fillText('✧', sx, sy);

  // 四角小花
  drawFlower(ctx, 80, 750, '#FBCFE8', '#F472B6', 11);
  drawFlower(ctx, 720, 770, '#FEF3C7', '#FBBF24', 10);
  drawFlower(ctx, 60, 870, '#E0E7FF', '#818CF8', 10);
  drawFlower(ctx, 740, 880, '#FCE7F3', '#F472B6', 12);

  // ═══════════════════════════════════════════
  // 顶部标题
  // ═══════════════════════════════════════════
  const titleGrad = ctx.createLinearGradient(W / 2 - 200, 0, W / 2 + 200, 0);
  titleGrad.addColorStop(0, '#F43F5E');
  titleGrad.addColorStop(0.4, '#F59E0B');
  titleGrad.addColorStop(1, '#EC4899');
  ctx.fillStyle = titleGrad;
  ctx.font = 'bold 36px "PingFang SC", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('🌱 心晴时光卡片', W / 2, 80);

  ctx.strokeStyle = '#FDA4AF';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(W / 2 - 130, 108);
  ctx.lineTo(W / 2 + 130, 108);
  ctx.stroke();

  ctx.fillStyle = '#94A3B8';
  ctx.font = '14px "PingFang SC", "Microsoft YaHei", sans-serif';
  ctx.fillText('珍藏每一个温柔瞬间  ·  让微光点亮日常', W / 2, 132);

  // ═══════════════════════════════════════════
  // 白色主卡片
  // ═══════════════════════════════════════════
  const cx = 52;
  const cy = 160;
  const cw = W - cx * 2;
  const ch = 620;

  ctx.shadowColor = 'rgba(244, 63, 94, 0.12)';
  ctx.shadowBlur = 60;
  ctx.shadowOffsetY = 24;
  ctx.fillStyle = '#FFFEF9';
  drawRoundedRect(ctx, cx, cy, cw, ch, 28);
  ctx.fill();
  ctx.shadowColor = 'transparent';
  ctx.shadowBlur = 0;
  ctx.shadowOffsetY = 0;

  // ── 卡片顶部：和纸胶带装饰 ──
  drawWashiTape(ctx, cx + 80, cy - 8, 160, 30, '#FBCFE8', -5);
  drawWashiTape(ctx, cx + cw - 200, cy - 8, 140, 30, '#FEF3C7', 4);

  const m = moments[0];

  // ── 日期行 ──
  const dateStr = m.date || (m.created_at ? m.created_at.substring(0, 10) : '');
  const d = new Date(dateStr || Date.now());
  const dayStr = dateStr ? `${dateStr}  ${WEEKDAYS[d.getDay()]}` : '今天';

  ctx.fillStyle = '#64748B';
  ctx.font = '15px "PingFang SC", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('📅  ' + dayStr, W / 2, cy + 55);

  // ── 心情大表情（居中 hero） ──
  ctx.font = '52px sans-serif';
  ctx.textAlign = 'center';
  const moodEmoji = m.mood ? m.mood.replace(/[^\p{Emoji}]/gu, '').trim() || '🥰' : '🥰';
  ctx.fillText(moodEmoji, W / 2, cy + 125);

  // 心情文字
  ctx.fillStyle = '#F43F5E';
  ctx.font = 'bold 20px "PingFang SC", "Microsoft YaHei", sans-serif';
  ctx.fillText(m.mood || '🥰 满足', W / 2, cy + 160);

  // ── 分类标签 + 星级（同一行居中） ──
  const [catBg, catFg] = CAT_COLORS[m.category] || ['#F1F5F9', '#475569'];
  const catW = ctx.measureText(m.category || '🎨 生活美学').width + 32;
  const catX = W / 2 - catW / 2 - 70;
  drawPill(ctx, m.category || '🎨 生活美学', catX, cy + 200, catBg, catFg, 'bold 15px');

  let starStr = '';
  for (let i = 0; i < 5; i++) starStr += i < (m.stars || 5) ? '★' : '☆';
  ctx.fillStyle = '#F59E0B';
  ctx.font = '22px sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText(starStr, catX + catW + 20, cy + 207);

  // ── 装饰分割线 ──
  ctx.strokeStyle = '#E2E8F0';
  ctx.lineWidth = 1.5;
  ctx.setLineDash([6, 8]);
  ctx.beginPath();
  ctx.moveTo(cx + 50, cy + 245);
  ctx.lineTo(cx + cw - 50, cy + 245);
  ctx.stroke();
  ctx.setLineDash([]);

  // ── "今天的幸福小事" 标签 ──
  ctx.fillStyle = '#F59E0B';
  ctx.font = 'bold 13px "PingFang SC", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('✦  今天的幸福小事  ✦', W / 2, cy + 275);

  // ── 正文（居中 hero 大字） ──
  ctx.fillStyle = '#1E293B';
  ctx.font = 'bold 34px "PingFang SC", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'center';
  wrapTextCenter(ctx, m.text, W / 2, cy + 330, cw - 100, 52);

  // ── 正文下方喜欢标记 ──
  if (m.liked) {
    ctx.fillStyle = '#F43F5E';
    ctx.font = 'bold 18px "PingFang SC", "Microsoft YaHei", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('❤️  已收藏这份美好', W / 2, cy + ch - 105);
  }

  // ── 底部统计条 ──
  ctx.strokeStyle = '#E2E8F0';
  ctx.lineWidth = 1.5;
  ctx.setLineDash([6, 8]);
  ctx.beginPath();
  ctx.moveTo(cx + 50, cy + ch - 85);
  ctx.lineTo(cx + cw - 50, cy + ch - 85);
  ctx.stroke();
  ctx.setLineDash([]);

  // 三项统计
  const statY = cy + ch - 48;
  const totalMoments = moments.length;
  const thisMonth = moments.filter(x => {
    const xd = x.date || (x.created_at ? x.created_at.substring(0, 7) : '');
    return xd.startsWith(new Date().toISOString().substring(0, 7));
  }).length;
  const avgStars = (moments.reduce((s, x) => s + (x.stars || 5), 0) / Math.max(totalMoments, 1)).toFixed(1);

  drawStatItem(ctx, '📝 总计', totalMoments + '件', W / 2 - 180, statY);
  drawStatItem(ctx, '📅 本月', thisMonth + '件', W / 2, statY);
  drawStatItem(ctx, '⭐ 均星', avgStars, W / 2 + 180, statY);

  // ═══════════════════════════════════════════
  // 卡片外：底部金句
  // ═══════════════════════════════════════════
  const footY = cy + ch + 40;
  ctx.fillStyle = '#6366F1';
  ctx.font = 'italic bold 22px "PingFang SC", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(pickDailyQuote(), W / 2, footY + 35);

  ctx.fillStyle = '#94A3B8';
  ctx.font = '14px "PingFang SC", "Microsoft YaHei", sans-serif';
  ctx.fillText('保存这张卡片，让生命中的温暖微光为你充能 ☀️', W / 2, footY + 72);

  // 底部水印
  ctx.fillStyle = 'rgba(148, 163, 184, 0.3)';
  ctx.font = '12px "PingFang SC", "Microsoft YaHei", sans-serif';
  ctx.fillText('心芽小栈  ·  用心记录每一寸温柔时光', W / 2, H - 25);

  // ── 下载 ──
  downloadCanvas(canvas, `我的心晴时刻_${getTodayDateStr()}.png`);
  showNotification('精美的幸福卡片已成功生成！📷', 'success');
}

// ==================== 批量导出：长卷幸福时光轴 ====================

function exportAllHappinessCards() {
  if (moments.length === 0) {
    showNotification('当前还没有记录任何幸福小事，快去写下一件吧！', 'error');
    return;
  }

  showNotification('正在绘制您的幸福时光长卷，请稍候... 🎨', 'info');

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const W = 800;
  const headerH = 180;
  const footerH = 180;
  const blockH = 220;
  const totalH = headerH + moments.length * blockH + footerH;
  canvas.width = W;
  canvas.height = totalH;
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  // ── 整体背景 ──
  const bg = ctx.createLinearGradient(0, 0, 0, totalH);
  bg.addColorStop(0, '#FFF1F2');
  bg.addColorStop(0.3, '#FFFBEB');
  bg.addColorStop(0.7, '#FFFBEB');
  bg.addColorStop(1, '#FFE4E6');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, totalH);

  // ── 装饰云朵 ──
  drawCloud(ctx, 100, 50, 1);
  drawCloud(ctx, 650, 30, 0.8);
  drawCloud(ctx, 80, totalH - 250, 0.7);
  drawCloud(ctx, 660, totalH - 200, 0.9);

  // ── 头部标题 ──
  const titleGrad = ctx.createLinearGradient(W / 2 - 200, 0, W / 2 + 200, 0);
  titleGrad.addColorStop(0, '#F43F5E');
  titleGrad.addColorStop(0.5, '#F59E0B');
  titleGrad.addColorStop(1, '#EC4899');
  ctx.fillStyle = titleGrad;
  ctx.font = 'bold 38px "PingFang SC", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('🌱 心晴时光长卷', W / 2, 75);

  ctx.strokeStyle = '#FDA4AF';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(W / 2 - 160, 105);
  ctx.lineTo(W / 2 + 160, 105);
  ctx.stroke();

  ctx.fillStyle = '#94A3B8';
  ctx.font = '15px "PingFang SC", "Microsoft YaHei", sans-serif';
  ctx.fillText(`📜 收录 ${moments.length} 件幸福小事  ·  ${new Date().toLocaleDateString()}`, W / 2, 140);

  // ── 每条 moment 一个区块 ──
  const sorted = [...moments].sort((a, b) => {
    const da = a.date || a.created_at || '';
    const db = b.date || b.created_at || '';
    return da.localeCompare(db);
  });

  const catColors = {
    '🎨 生活美学': ['#FCE7F3', '#DB2777'],
    '💻 个人成长': ['#E0E7FF', '#4F46E5'],
    '🐾 萌宠治愈': ['#FEF3C7', '#D97706'],
    '🌿 亲近自然': ['#D1FAE5', '#059669'],
    '🍔 美食之乐': ['#FEE2E2', '#DC2626'],
    '🏆 工作学业': ['#E0F2FE', '#0284C7'],
    '🔄 视角重构': ['#EDE9FE', '#7C3AED'],
  };

  for (let i = 0; i < sorted.length; i++) {
    const m = sorted[i];
    const yBase = headerH + i * blockH;

    // 区块背景卡片
    ctx.shadowColor = 'rgba(0,0,0,0.04)';
    ctx.shadowBlur = 20;
    ctx.shadowOffsetY = 6;
    ctx.fillStyle = '#FFFFFF';
    drawRoundedRect(ctx, 45, yBase + 10, W - 90, blockH - 20, 20);
    ctx.fill();
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    ctx.shadowOffsetY = 0;

    // 序号
    ctx.fillStyle = '#E2E8F0';
    ctx.font = 'bold 40px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('0' + (i + 1), 75, yBase + 70);

    // 分类标签
    const [catBg, catFg] = catColors[m.category] || ['#F1F5F9', '#475569'];
    drawPill(ctx, m.category || '🎨 生活美学', 125, yBase + 45, catBg, catFg);

    // 日期
    const d = m.date || (m.created_at ? m.created_at.substring(0, 10) : '');
    ctx.fillStyle = '#94A3B8';
    ctx.font = '14px sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(d, W - 75, yBase + 55);

    // 心情 + 星级
    ctx.fillStyle = '#475569';
    ctx.font = 'bold 20px "PingFang SC", "Microsoft YaHei", sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(m.mood || '🥰 满足', 125, yBase + 85);

    let starStr = '';
    for (let s = 0; s < 5; s++) starStr += s < (m.stars || 5) ? '★' : '☆';
    ctx.fillStyle = '#F59E0B';
    ctx.font = '18px sans-serif';
    ctx.fillText(starStr, 125 + ctx.measureText(m.mood || '🥰 满足').width + 15, yBase + 87);

    // 正文（截断显示）
    const text = m.text.length > 40 ? m.text.substring(0, 40) + '...' : m.text;
    ctx.fillStyle = '#64748B';
    ctx.font = '18px "PingFang SC", "Microsoft YaHei", sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(text, 125, yBase + 125);

    // 收藏标记
    if (m.liked) {
      ctx.fillStyle = '#F43F5E';
      ctx.font = '14px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText('❤️', W - 75, yBase + 125);
    }

    // 区块间装饰分隔
    if (i < sorted.length - 1) {
      ctx.fillStyle = 'rgba(251, 191, 36, 0.25)';
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('·  ✦  ·', W / 2, yBase + blockH + 5);
    }
  }

  // ── 底部 ──
  const footY = headerH + sorted.length * blockH;
  ctx.fillStyle = '#6366F1';
  ctx.font = 'italic bold 22px "PingFang SC", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(pickDailyQuote(), W / 2, footY + 60);

  ctx.fillStyle = '#94A3B8';
  ctx.font = '14px "PingFang SC", "Microsoft YaHei", sans-serif';
  ctx.fillText(`共计 ${moments.length} 件幸福小事  ·  心芽小栈 🌸`, W / 2, footY + 100);

  // ── 下载 ──
  downloadCanvas(canvas, `心晴时光长卷_${getTodayDateStr()}.png`);
  showNotification(`幸福长卷已生成，共收录 ${moments.length} 件美好瞬间！📚`, 'success');
}

// ==================== 装饰绘制辅助函数 ====================

function drawCloud(ctx, x, y, scale) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
  ctx.beginPath();
  ctx.arc(0, 0, 35, 0, Math.PI * 2);
  ctx.arc(40, -10, 45, 0, Math.PI * 2);
  ctx.arc(80, 0, 38, 0, Math.PI * 2);
  ctx.arc(35, 15, 32, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawFlower(ctx, x, y, petalColor, centerColor, r) {
  ctx.save();
  ctx.translate(x, y);
  ctx.fillStyle = petalColor;
  for (let i = 0; i < 5; i++) {
    const angle = (i / 5) * Math.PI * 2 - Math.PI / 2;
    const px = Math.cos(angle) * r * 0.6;
    const py = Math.sin(angle) * r * 0.6;
    ctx.beginPath();
    ctx.arc(px, py, r * 0.55, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.fillStyle = centerColor;
  ctx.beginPath();
  ctx.arc(0, 0, r * 0.4, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

// 和纸胶带装饰
function drawWashiTape(ctx, x, y, w, h, color, angle) {
  ctx.save();
  ctx.translate(x + w / 2, y + h / 2);
  ctx.rotate((angle * Math.PI) / 180);
  ctx.fillStyle = color;
  ctx.globalAlpha = 0.5;
  drawRoundedRect(ctx, -w / 2, -h / 2, w, h, 4);
  ctx.fill();
  // 细条纹纹理
  ctx.globalAlpha = 0.25;
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 1;
  for (let lx = -w / 2 + 10; lx < w / 2; lx += 12) {
    ctx.beginPath();
    ctx.moveTo(lx, -h / 2 + 3);
    ctx.lineTo(lx, h / 2 - 3);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
  ctx.restore();
}

function drawPill(ctx, text, x, y, bgColor, textColor, fontStr) {
  const padX = 16;
  const padY = 8;
  ctx.font = fontStr || 'bold 16px "PingFang SC", "Microsoft YaHei", sans-serif';
  const tm = ctx.measureText(text);
  const tw = tm.width;
  const th = 18;
  const rx = x;
  const ry = y - th / 2 - padY;
  const rw = tw + padX * 2;
  const rh = th + padY * 2;
  ctx.fillStyle = bgColor;
  drawRoundedRect(ctx, rx, ry, rw, rh, 20);
  ctx.fill();
  ctx.fillStyle = textColor;
  ctx.textAlign = 'left';
  ctx.fillText(text, rx + padX, ry + padY + th - 2);
}

// 居中文本自动换行
function wrapTextCenter(ctx, text, cx, y, maxWidth, lineHeight) {
  const chars = text.split('');
  let line = '';
  let cy = y;
  const lines = [];

  for (let i = 0; i < chars.length; i++) {
    if (chars[i] === '\n') { lines.push(line); line = ''; continue; }
    const test = line + chars[i];
    if (ctx.measureText(test).width > maxWidth && i > 0) { lines.push(line); line = chars[i]; }
    else { line = test; }
  }
  if (line) lines.push(line);

  ctx.textAlign = 'center';
  for (const ln of lines) {
    ctx.fillText(ln, cx, cy);
    cy += lineHeight;
  }
}

// 统计项
function drawStatItem(ctx, label, value, cx, y) {
  ctx.fillStyle = '#94A3B8';
  ctx.font = '12px "PingFang SC", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(label, cx, y - 12);
  ctx.fillStyle = '#334155';
  ctx.font = 'bold 20px "PingFang SC", "Microsoft YaHei", sans-serif';
  ctx.fillText(value, cx, y + 14);
}

// ==================== 通用辅助函数 ====================

function drawRoundedRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const chars = text.split('');
  let line = '';
  let cy = y;
  for (let i = 0; i < chars.length; i++) {
    if (chars[i] === '\n') {
      ctx.fillText(line, x, cy);
      line = '';
      cy += lineHeight;
      continue;
    }
    const test = line + chars[i];
    if (ctx.measureText(test).width > maxWidth && i > 0) {
      ctx.fillText(line, x, cy);
      line = chars[i];
      cy += lineHeight;
    } else {
      line = test;
    }
  }
  ctx.fillText(line, x, cy);
}

function downloadCanvas(canvas, filename) {
  const url = canvas.toDataURL('image/png');
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

function getTodayDateStr() {
  const d = new Date();
  return d.getFullYear() + ('0' + (d.getMonth() + 1)).slice(-2) + ('0' + d.getDate()).slice(-2);
}
