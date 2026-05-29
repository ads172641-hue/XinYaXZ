# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## How to develop

Zero-setup. Open `index.html` directly in a browser (double-click). No build step, no server, no package manager.

All external services are called from the browser:
- **DeepSeek API** — AI chat and perspective reframing, called directly via `fetch()`
- **Supabase** — Auth (email/password) and database, via Supabase JS SDK CDN

## Configuration

`config.js` holds all credentials (this is a personal project):
```js
window.APP_CONFIG = {
  SUPABASE_URL: 'https://xxx.supabase.co',
  SUPABASE_ANON_KEY: 'sb_publishable_xxx',
  DEEPSEEK_API_KEY: 'sk-xxx'
};
```

## Architecture

- `index.html` — Single-file app. Tailwind CSS (CDN), Supabase SDK (CDN), vanilla JS. Three tabs, collapsible sidebar.
- `config.js` — Public credentials loaded before all other scripts.
- `prompts.js` — AI system prompts: `SYSTEM_PROMPT` (chat), `REFRAEMR_PROMPT` (perspective reframing), `KNOWLEDGE_ENTRIES` (empty array for future RAG), `buildSystemPrompt()`.
- `schema.sql` — Supabase DDL reference. Execute in Supabase SQL Editor once.

## Three feature tabs

1. **AI Chat** — Calls DeepSeek API directly. Uses `buildSystemPrompt()` (from prompts.js) which appends `KNOWLEDGE_ENTRIES` when populated. `buildApiMessages()` sends last 20 chat messages as context. `**bold**` rendered as underlined text.

2. **Happy Moments** — CRUD via Supabase SDK (`sb.from('happy_moments')`). RLS enforces `user_id = auth.uid()`. Stats computed client-side from local `moments` array. Falls back to in-memory-only if Supabase not configured.

3. **Perspective Converter** — Calls DeepSeek API with `REFRAEMR_PROMPT` as system prompt. Results can sync to Happy Moments via `syncReframingToHappyMoments()`.

## Auth flow

- `initSupabase()` runs on script load → checks session via `sb.auth.getSession()`
- No session → `showAuthOverlay()` (login/signup form)
- Has session → `showAppContent()` + `loadMoments()` + `renderChatFlow()`
- `onAuthStateChange` handles sign-in/sign-out across tabs

## Key variables

| Variable | Purpose |
|---|---|
| `sb` | Supabase client (null if not configured) |
| `currentUser` | Supabase auth user object (null = logged out) |
| `moments` | Happy moments array, synced from Supabase |
| `chatMessages` | Ephemeral chat history, not persisted |
| `DEEPSEEK_API_URL` / `DEEPSEEK_API_KEY` | From `window.APP_CONFIG` |
| `isAuthMode` | `'login'` or `'signup'` |

## Supabase tables

- `happy_moments`: id, user_id (FK auth.users), text, mood, stars, category, date, liked, created_at
- `knowledge_entries`: id, title, content, tags, created_at (reserved for future document reference)

## Knowledge base extension

To add documents the AI can reference, push entries to `KNOWLEDGE_ENTRIES` in `prompts.js`:
```js
KNOWLEDGE_ENTRIES.push({
  title: 'CBT 基础技巧',
  content: '认知行为疗法认为...'
});
```
`buildSystemPrompt()` automatically appends all entries to the system prompt.
