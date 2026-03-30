# Learnings

Short, practical notes that help future-Chippy avoid repeating mistakes.

Categories: correction | insight | knowledge-gap | best-practice

---

## [LRN-20260330-001] best-practice

**Logged**: 2026-03-30T20:22:00Z
**Priority**: high
**Status**: pending
**Area**: infra

### Summary
Old Radeon graphics on the HP desktop can hard-freeze the screen under Discord desktop / Electron-heavy GPU use.

### Details
The machine showed Radeon ring stall errors and hung tasks tied to Discord and gnome-shell. Firefox and lightweight local web pages are much safer than the Discord desktop app on this hardware.

### Suggested Action
Prefer Telegram and browser-based tools on this machine. Avoid the Discord desktop app unless the graphics stack is later tuned and retested.

### Metadata
- Source: error
- Related Files: MEMORY.md
- Tags: graphics, discord, radeon, stability

---

## [LRN-20260330-002] best-practice

**Logged**: 2026-03-30T20:22:00Z
**Priority**: medium
**Status**: pending
**Area**: config

### Summary
Telegram pairing can be the missing step even when the bot itself shows as healthy.

### Details
OpenClaw showed Telegram as enabled, configured, running, polling, and working, but Jeff still saw "access not configured" until a pending pairing request was approved.

### Suggested Action
When Telegram says access is not configured but channel status looks good, check `openclaw pairing list` and approve the pending code.

### Metadata
- Source: conversation
- Related Files: TOOLS.md
- Tags: telegram, pairing, openclaw, auth

---
