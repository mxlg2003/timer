# 网费很贵

[![codecov](https://codecov.io/gh/sheepzh/timer/branch/main/graph/badge.svg?token=S98QSBSKCR&style=flat-square)](https://codecov.io/gh/sheepzh/timer)
[![](https://www.travis-ci.com/sheepzh/timer.svg?branch=main)](https://www.travis-ci.com/sheepzh/timer.svg?branch=main)
[![](https://img.shields.io/badge/license-Anti%20996-blue)](https://github.com/996icu/996.ICU)
[![](https://img.shields.io/github/v/release/sheepzh/timer)](https://github.com/sheepzh/timer/releases)

用于上网时间统计的浏览器插件。

- 统计网站的运行时间
- 统计用户在不同网站上的浏览时间
- 统计用户打开网站的次数
- 网站白名单，过滤不需要统计的网站
- 自定义域名合并统计的规则
- 报表导出

详细展示图文：[douban.com](https://www.douban.com/group/topic/213888429/)

## 下载地址

[Firefox](https://addons.mozilla.org/zh-CN/firefox/addon/web%E6%99%82%E9%96%93%E7%B5%B1%E8%A8%88/)&emsp;[Chrome](https://chrome.google.com/webstore/detail/%E7%BD%91%E8%B4%B9%E5%BE%88%E8%B4%B5-%E4%B8%8A%E7%BD%91%E6%97%B6%E9%97%B4%E7%BB%9F%E8%AE%A1/dkdhhcbjijekmneelocdllcldcpmekmm?hl=zh-CN)&emsp;[Edge](https://microsoftedge.microsoft.com/addons/detail/timer-running-browsin/fepjgblalcnepokjblgbgmapmlkgfahc)

## 开发

```
 git clone https://github.com/sheepzh/timer.git
 cd timer
 npm install
 # 开发编译，输出目录为 dist_dev
 npm run dev
 # 生产编译，输出目录为 dist_prod 和 market_packages
 npm run build:prod
```

- 欢迎大家 PR， PR 之前请先创建 ISSUE

## DEBUG

- 在控制台下可以开启数据存取日志

```JavaScript
window.timer.openLog()
```

- 关闭日志

```JavaScript
window.timer.closeLog()
```
