# Hardened JSON POST Pattern

Use this shape when you want fewer runtime surprises.

```ts
const res = await http.post(url, {
  headers: { 'Content-Type': 'application/json' },
  content: JSON.stringify(body),
});

if (!res || !res.content) {
  // notify user, log context, and fail fast
  throw new Error('No response content');
}

let parsed: any;
try {
  parsed = JSON.parse(res.content);
} catch (e) {
  throw new Error('Invalid JSON response');
}
```

