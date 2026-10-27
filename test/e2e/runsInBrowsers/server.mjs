import { createServer } from 'node:http'
import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { extname, resolve, sep } from 'node:path'

const root = fileURLToPath(new URL('../../../', import.meta.url))
const dist = resolve(root, 'dist')
const bowser = resolve(root, 'node_modules/bowser/bowser.mjs')
const types = {
  '.js': 'text/javascript',
  '.mjs': 'text/javascript',
  '.map': 'application/json',
}

const server = createServer(async (request, response) => {
  const { pathname } = new URL(request.url ?? '/', 'http://127.0.0.1')
  if (pathname === '/') {
    response.setHeader('Content-Type', 'text/html; charset=utf-8')
    response.end(
      '<!doctype html><html><head><title>dom-utils browser tests</title><script type="importmap">{"imports":{"bowser":"/bowser.mjs"}}</script></head><body></body></html>'
    )
    return
  }

  const path =
    pathname === '/bowser.mjs' ? bowser : resolve(root, '.' + pathname)
  if (
    (path !== bowser && !path.startsWith(dist + sep)) ||
    !Object.hasOwn(types, extname(path))
  ) {
    response.writeHead(404).end('Not found')
    return
  }

  try {
    const content = await readFile(path)
    response.setHeader('Content-Type', types[extname(path)])
    response.end(content)
  } catch {
    response.writeHead(404).end('Not found')
  }
})

server.listen(Number(process.env.PORT ?? 4173), '127.0.0.1')
for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => server.close())
}
