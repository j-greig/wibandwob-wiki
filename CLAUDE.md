# wibandwob-wiki

The wiki site (wiki.wibandwob.com) is built from wibandwob-heartbeat (`uv run scripts/ww.py wiki build --html`, `ww wiki deploy`) and published by Cloudflare Pages from this repo's git.

## Wiki unfiled pages

A hand-made page for wiki.wibandwob.com/unfiled/ goes in `~/Repos/wibandwob-wiki/site/unfiled/<name>/index.html` (pull first).
Then run `python3 scripts/wiki_unfiled_index.py` in `~/Repos/wibandwob-heartbeat` to rewrite the directory listing, and commit and push the wiki repo
(Pages publishes from git). Test: the new folder is a row at /unfiled/.
