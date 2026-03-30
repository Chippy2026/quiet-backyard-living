# Errors

Short records of failures worth remembering.

---

## [ERR-20260330-001] discord-desktop-radeon-freeze

**Logged**: 2026-03-30T20:22:00Z
**Priority**: high
**Status**: pending
**Area**: infra

### Summary
Discord desktop triggered a black-screen freeze on the HP desktop.

### Error
`radeon 0000:00:01.0: ring X stalled ...`
`cik startup failed on resume`
`task Discord blocked for more than 122 seconds`

### Context
Discord desktop was launched on an Ubuntu HP desktop using AMD/ATI Kabini Radeon HD 8400 / R3 graphics. The machine froze, screen went black, and logs pointed to Radeon/gnome-shell/Discord interaction.

### Suggested Fix
Do not use the Discord desktop app on this machine for now. Prefer Firefox/web Discord or Telegram instead.

### Metadata
- Reproducible: yes
- Related Files: MEMORY.md
- See Also: LRN-20260330-001

---

## [ERR-20260330-002] morning-brief-telegram-delivery

**Logged**: 2026-03-30T20:22:00Z
**Priority**: medium
**Status**: pending
**Area**: config

### Summary
Morning brief cron job can generate content but delivery to Telegram fails without a target chat ID.

### Error
`Delivering to Telegram requires target <chatId>`

### Context
The daily morning brief cron job ran, but announce delivery did not know exactly where to send the message in Telegram.

### Suggested Fix
Keep the brief content updated, but revisit direct Telegram cron delivery only after obtaining the exact Telegram target/chat ID.

### Metadata
- Reproducible: yes
- Related Files: TODO.md
- See Also: LRN-20260330-002

---
