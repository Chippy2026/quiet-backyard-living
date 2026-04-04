# Quiet Backyard Living — Simple Migration Plan from Netlify to Cloudflare Pages

A practical plan to move Quiet Backyard Living off Netlify and onto Cloudflare Pages while keeping the website simple and reliable.

---

## Goal
Move hosting from Netlify to Cloudflare Pages without rebuilding the whole site.

Keep:
- the current static site
- the GitHub repo workflow
- the custom domain
- the simple publish process

Avoid:
- a full WordPress migration right now
- unnecessary complexity
- downtime if possible

---

## Current setup
Source files:
- `/home/chippy/.openclaw/workspace/site/public/`

Publish repo:
- `/home/chippy/quiet-backyard-living-publish`

GitHub repo:
- `Chippy2026/quiet-backyard-living`

Current host:
- Netlify

Problem:
- Netlify paused the site due to usage limits

---

## Why Cloudflare Pages makes sense
Cloudflare Pages is a strong fit because Quiet Backyard Living is:
- a static site
- already git-based
- simple HTML/CSS
- not dependent on WordPress or heavy backend tools

Benefits:
- reliable static hosting
- custom domain support
- GitHub integration
- simple deployment flow
- no need to rebuild the site

---

## Simple migration strategy

### Phase 1 — Create the Cloudflare Pages project
1. Log into Cloudflare.
2. Go to **Workers & Pages**.
3. Choose **Create application**.
4. Choose **Pages**.
5. Connect your GitHub account if needed.
6. Select the repo:
   - `Chippy2026/quiet-backyard-living`

---

### Phase 2 — Set build settings
Because this is already a built static site, keep the setup simple.

Use:
- **Production branch:** `main`
- **Framework preset:** None
- **Build command:** leave blank
- **Build output directory:** `/`

If Cloudflare does not like `/`, use the repo root and make sure the repo contains:
- `index.html`
- `assets/`
- `blog/`
- `pages/`

That publish repo already looks correct for this.

---

### Phase 3 — Test on the temporary Cloudflare URL
Cloudflare will give you a temporary project URL.

Check:
- homepage loads
- blog page loads
- hummingbird article loads
- birdhouse pages load
- images load
- CSS loads
- custom links work
- MailerLite forms still behave normally

Do not switch the main domain yet.

---

### Phase 4 — Connect the custom domain
Once the Cloudflare Pages test URL looks good:

1. In Cloudflare Pages, open the project.
2. Go to **Custom domains**.
3. Add:
   - `quietbackyardliving.com`
   - maybe also `www.quietbackyardliving.com`
4. Follow Cloudflare DNS instructions.

If the domain is already using Cloudflare DNS, this is usually easier.
If not, domain DNS may need to be updated where the domain is registered.

---

### Phase 5 — Verify after cutover
After the domain points to Cloudflare Pages, test:
- homepage
- blog page
- hummingbird page
- birdhouse guide signup page
- checklist page
- image loading
- MailerLite signup forms
- Google Analytics still present

---

### Phase 6 — Leave Netlify alone until Cloudflare is confirmed
Do not immediately tear down Netlify.

Keep it in place until:
- the Cloudflare site is live
- the domain works
- forms behave correctly
- tracking still loads

Then Netlify can be ignored or removed later.

---

## Day-to-day workflow after migration
The workflow should stay basically the same:

1. edit files in:
   - `/home/chippy/.openclaw/workspace/site/public/`
2. sync to publish repo:
   ```bash
   rsync -av /home/chippy/.openclaw/workspace/site/public/ /home/chippy/quiet-backyard-living-publish/
   ```
3. push changes:
   ```bash
   cd /home/chippy/quiet-backyard-living-publish
   git add .
   git commit -m "Update site"
   git push
   ```
4. Cloudflare Pages auto-deploys from GitHub

That means almost no daily workflow change.

---

## Things to watch for

### 1. Root directory setting
Cloudflare Pages must publish from the repo root where `index.html` lives.

### 2. Absolute links
Your site already uses paths like:
- `/assets/...`
- `/pages/...`
- `/blog/...`

That should work fine if the domain root is correct.

### 3. Forms
MailerLite embeds should still work because they are external scripts, but verify after launch.

### 4. Analytics
Google Analytics should still work as long as the pages and tracking tag load normally.

### 5. DNS timing
Domain changes can take time to fully update depending on DNS propagation.

---

## Recommended order of operations
1. create Cloudflare Pages project
2. connect GitHub repo
3. deploy test version
4. test temporary Cloudflare URL
5. connect custom domain
6. verify live site
7. only then stop relying on Netlify

---

## Best-case result
Quiet Backyard Living keeps:
- the same site
- the same content
- the same GitHub workflow
- the same simple publishing process

But gains:
- more reliable hosting
- less risk of Netlify usage-limit downtime

---

## Bottom line
Do not rebuild the whole website just to fix hosting.

The smartest move is:
- keep the site static
- move hosting to Cloudflare Pages
- keep the current workflow
- get reliability first
