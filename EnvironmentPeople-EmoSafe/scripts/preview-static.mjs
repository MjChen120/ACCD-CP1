import { createServer } from "node:http"
import { createReadStream, existsSync, statSync } from "node:fs"
import { extname, join, normalize } from "node:path"

const PORT = Number(process.env.PORT || 4173)
const ROOT = join(process.cwd(), "out")

const CONTENT_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8",
}

function safePath(urlPath) {
  const cleanPath = decodeURIComponent(urlPath.split("?")[0])
  const normalized = normalize(cleanPath).replace(/^(\.\.[/\\])+/, "")
  return normalized === "/" ? "/index.html" : normalized
}

function resolveFilePath(pathname) {
  const requested = join(ROOT, pathname)
  if (existsSync(requested) && statSync(requested).isFile()) return requested

  const indexCandidate = join(ROOT, pathname, "index.html")
  if (existsSync(indexCandidate) && statSync(indexCandidate).isFile()) return indexCandidate

  const htmlCandidate = join(ROOT, `${pathname}.html`)
  if (existsSync(htmlCandidate) && statSync(htmlCandidate).isFile()) return htmlCandidate

  return join(ROOT, "index.html")
}

if (!existsSync(ROOT)) {
  console.error("No static build found. Run `npm run export` first.")
  process.exit(1)
}

createServer((req, res) => {
  const pathname = safePath(req.url || "/")
  const filePath = resolveFilePath(pathname)
  const ext = extname(filePath).toLowerCase()
  const contentType = CONTENT_TYPES[ext] || "application/octet-stream"

  res.setHeader("Content-Type", contentType)
  createReadStream(filePath).pipe(res)
}).listen(PORT, () => {
  console.log(`Static prototype running at http://localhost:${PORT}`)
  console.log("Press Ctrl+C to stop.")
})
