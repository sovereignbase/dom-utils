import { body, button, div, h1, input, label, li, p, ul } from './src/index.js'

const panel = div()
panel.style.cssText = `
  max-width: 640px;
  margin: 48px auto;
  padding: 24px;
  font: 16px/1.5 system-ui, sans-serif;
`

const title = h1()
title.textContent = 'Native DOM, less ceremony'

const description = p()
description.textContent =
  'Typed element factories, inline cssText styles, and ordinary browser events.'

const nameLabel = label()
nameLabel.htmlFor = 'item-name'
nameLabel.textContent = 'Item name '

const name = input()
name.id = 'item-name'
name.placeholder = 'Write something'

const add = button()
add.textContent = 'Add item'
add.style.cssText = 'margin-left: 8px; padding: 4px 12px;'

const list = ul()
add.onclick = () => {
  if (!name.value.trim()) return
  const item = li()
  item.textContent = name.value
  list.append(item)
  name.value = ''
  name.focus()
}

panel.append(title, description, nameLabel, name, add, list)
body.append(panel)
