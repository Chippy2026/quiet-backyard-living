# Tell the story → photos → connections → review → publish

Publishing is not implemented or authorized in this pilot. The content intake creates local drafts only.

1. Provide the real account, title, approximate event date with honest precision, and photo captions/alt text. Do not invent an outcome or a precise date.
2. Add approved photos to public/assets and data/media.json. Record rights and privacy review. External photos also need a data/licenses.json record; original manifests remain in reference.
3. Prepare an intake JSON with id, kind, title, body, description, route, optional hero, eventDate, related and videoIds. Run node scripts/new-content.cjs intake.json. It creates a draft JSON and Markdown file without a new page layout. Supported kinds: journey, project, notebook, update, guide, wildlife. Updates require parentId.
4. Use stable related content IDs and optional fragments, with real contextual labels. Add relationship evidence and project outcomes to the registries. “Unreported” means unreported, not a failure or success.
5. Review the Markdown, photos, factual queue, links and generated page. The public review server is not an approval/publishing service. Drafts currently appear in the local review output and must not be deployed.
6. Only after a future explicit release approval should a separate production process publish approved records. Production filtering, locked dependencies, redirects, signup configuration and CI remain release work.

Example intake (fictional placeholders are not actual QBL content):

    {"id":"new-real-note","kind":"notebook","title":"Real title supplied by Jeff","body":"The actual account supplied by Jeff.","eventDate":{"value":"2026-10","precision":"month","label":"October 2026"},"related":[{"contentId":"project","label":"See the trellis build","context":"From the workshop"}]}

Seasonal selection lives in data/editorial.json, activeSeason. Four profiles retain the approved editorial source references. Selecting a season is deliberate; the system does not fabricate new progress from the calendar. Seasonal JS uses this registry; no story date is advanced automatically.

Optional video: add a record with recordId (internal ID), provider:"youtube", real 11-character id, title, status:"verified", optional action/transcriptHref. Reference its recordId in entry.videoIds. The renderer supplies a tasteful watch link, without an autoplaying third-party embed. No real video is invented or attached in this pilot. Metadata/escaping tests passed; actual rendered video placement still needs browser review.

Current limitation: the intake does not itself provide an image-upload or editorial review interface. It is a maintainable file-based workflow, with a basic authoring layout awaiting rendered verification. Production status filtering and publication permissions remain unfinished.
