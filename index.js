// src/elements/index.ts
var html = document.documentElement
var body = document.body
var button = () => document.createElement('button')
var div = () => document.createElement('div')
var h1 = () => document.createElement('h1')
var input = () => document.createElement('input')
var label = () => document.createElement('label')
var li = () => document.createElement('li')
var p = () => document.createElement('p')
var ul = () => document.createElement('ul')

// in-browser-testing-lib.ts
var panel = div()
panel.style.cssText = `
  max-width: 640px;
  margin: 48px auto;
  padding: 24px;
  font: 16px/1.5 system-ui, sans-serif;
`
var title = h1()
title.textContent = 'Native DOM, less ceremony'
var description = p()
description.textContent =
  'Typed element factories, inline cssText styles, and ordinary browser events.'
var nameLabel = label()
nameLabel.htmlFor = 'item-name'
nameLabel.textContent = 'Item name '
var name = input()
name.id = 'item-name'
name.placeholder = 'Write something'
var add = button()
add.textContent = 'Add item'
add.style.cssText = 'margin-left: 8px; padding: 4px 12px;'
var list = ul()
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
