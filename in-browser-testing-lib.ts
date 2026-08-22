import { html, body, div, h1 } from './src/index.js'

html.style.cssText = `
width: clamp(100vw,100vw, 100vw);
height: clamp(100vw,100vw, 100vw);
overflow: hidden;
`
body.style.cssText = `
padding: 0;
margin: 0;
width: 100dvw;
height: 100dvh;
`

const box = div()
box.style.cssText = `
position: fixed;
top: 50%;
left: 50%;
transform: translate(-50%,-50%);
width: 300px;
height: 300px;
background-color: red;
display: grid;
place-items: center;
`

const title = h1()
title.textContent = 'Hello, DOM!'
title.style.cssText = `
margin: 0;
color: white;
font-family: system-ui, sans-serif;
`

box.appendChild(title)
body.appendChild(box)
