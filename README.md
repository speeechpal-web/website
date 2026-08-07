# SpeechPal website

Static site for Netlify.

## Deploy

1. Go to [Netlify Drop](https://app.netlify.com/drop) and drag the `website` folder, **or** connect this folder via Git.
2. In Netlify → Domain settings, add your custom domain.
3. In Squarespace DNS, add the A / CNAME records Netlify shows.
4. Replace `https://speechpal.app` in meta tags, `sitemap.xml`, and `robots.txt` if your domain is different.
5. Paste your real App Store URL into the Download buttons on `index.html`.

## Add a blog post

1. Duplicate `blog/first-line-confidence.html` and edit the title, date, and body.
2. Add a new row/link on `blog/index.html` and (optionally) the teaser on `index.html`.
3. Add the new URL to `sitemap.xml`.
4. Redeploy (drag folder again, or push to Git).
