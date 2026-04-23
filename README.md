# 浏览器插件 - 快捷网址打开器

## 功能

点击扩展图标即可打开指定网址（新标签页形式）。

## 安装方法

1. 打开 Chrome/Edge 浏览器，进入扩展管理页面：
   - Chrome: `chrome://extensions/`
   - Edge: `edge://extensions/`

2. 开启右上角的「开发者模式」

3. 点击「加载已解压的扩展程序」

4. 选择 `browser-extension` 文件夹

## 自定义网址

修改 `background.js` 文件中的 `TARGET_URL` 变量：

```javascript
const TARGET_URL = 'https://www.example.com';  // 改成你想要的网址
```

## 图标说明

请在 `icons` 文件夹中放置以下尺寸的图标：
- `icon16.png` (16x16)
- `icon48.png` (48x48)
- `icon128.png` (128x128)

如果没有图标，浏览器会使用默认图标，插件仍可正常工作。