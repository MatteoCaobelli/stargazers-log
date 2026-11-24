# stargazers-log
A log of the repositories I've starred.

## Preview

Serve the project with a local HTTP server so the browser can load `events.json`:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Data format

The existing starred repositories are stored in `events.json` as an array of objects:

```json
[
  { "name": "owner/repository", "starred": "2024-01-15" }
]
```

`name` must contain a GitHub `owner/repository` pair, and `starred` must be a valid `YYYY-MM-DD` date.
