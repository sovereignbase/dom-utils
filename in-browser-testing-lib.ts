import { html, body, div } from './src/index.js'

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
`
body.appendChild(box)
