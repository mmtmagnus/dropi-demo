# Dropi – donor community concept

An independent student concept demo inspired by the IBCC blood donor case.
It is not an official blood-bank service. All profiles, donation journeys,
leaderboards and notifications are fictional. The AI chat uses scripted replies.

## Hosting

This is a buildless static website. GitHub Pages can publish the `main` branch
from the repository root. The entry point is `index.html`.

## Supabase

Run `schema.sql` in a dedicated Supabase project. Set the public project
URL and **publishable** key in `config.js`. Only public fictional leaderboard
content is read. Public visitors cannot insert, change or delete database rows.
Do not put secret/service-role keys in these files.

Editing the demo profile, likes, chats and mentor selection does not create real
accounts or send messages. Profile preferences stay in the visitor's browser.
If cloud content is unavailable, the site uses its bundled fictional examples.

## Assets

The Bloddonorerne Storkøbenhavn logo was supplied in the user's case material.
It identifies the case organisation; this project does not claim endorsement.
No open-source licence is granted for third-party branding.
