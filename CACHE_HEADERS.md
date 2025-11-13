# Cache Headers for Static Assets

## Vercel Configuration
Add to `vercel.json`:

```json
{
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    },
    {
      "source": "/(.*\\.(jpg|jpeg|png|gif|webp|svg|ico))",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    },
    {
      "source": "/(.*\\.(js|css))",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    },
    {
      "source": "/sw.js",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=0, must-revalidate"
        }
      ]
    }
  ]
}
```

## Netlify Configuration
Add to `netlify.toml`:

```toml
[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*.{jpg,jpeg,png,gif,webp,svg,ico}"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*.{js,css}"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/sw.js"
  [headers.values]
    Cache-Control = "public, max-age=0, must-revalidate"
```

## Apache (.htaccess)

```apache
<IfModule mod_headers.c>
  # Cache assets for 1 year
  <FilesMatch "\.(jpg|jpeg|png|gif|webp|svg|ico|js|css|woff|woff2|ttf|eot)$">
    Header set Cache-Control "public, max-age=31536000, immutable"
  </FilesMatch>
  
  # Don't cache service worker
  <Files "sw.js">
    Header set Cache-Control "public, max-age=0, must-revalidate"
  </Files>
</IfModule>
```

## Nginx

```nginx
location ~* \.(jpg|jpeg|png|gif|webp|svg|ico|js|css|woff|woff2|ttf|eot)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}

location = /sw.js {
    expires 0;
    add_header Cache-Control "public, max-age=0, must-revalidate";
}
```
