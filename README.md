# 全栈开发

全栈应用其实并不复杂，但是目前并没有很好的框架可以达到我的预期，无论是sveltekit、next、nuxt或者其他的框架，这些框架更多地还是倾向于前端技术，对于后端场景的覆盖很受限。

其中最大的问题就在于编译，前端由于历史原因，通常需要经过编译后压缩和打包等过程，然后才能进行部署。但是全栈框架+打包的过程带来了异常多的问题，常见问题如下：

- 我在使用sveltekit的时候就发现，开发时是正常的，但是打包后就缺失很多文件——因为树摇。
- 使用`import ?raw` 导入的文件也消失了
- 前端通常采用相对路径，而后端开发使用绝对路径，心智模型不一样
- 前端路由进行了大量封装，细节不清晰

## 原理

原理也很简单，前端页面目前依旧需要打包，但是将从统一的编译过程拆分为独立的编译，每个页面对应于自己的编译，虽然会影响一些性能，但是是可以接受的，而且可以在后续进行优化，在编译时对页面进行缓存，如果页面未修改，则不需要重新编译，也就是按需编译。

前端框架目前已经非常成熟了，支持无脚手架快速开发的框架也有很多，包括react、vue、lit、solidjs等等，但是经过对比分析，我还是倾向于使用lit，因为lit的编译目标是`web component`，它可以和其他任何框架进行很好的集成。
