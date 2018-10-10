# bestinc-cli 前端自动化构建工具

## 工具实现思路

1. 项目名称 自定义 or 使用默认名称 or 在当前目录下放置模板 ？
2. 框架选择，React or Vue ?
3. 应用类型，单页面 or 多页面 ？
4. 项目类型，web 端 or 移动端 or 客户端 ... ?
5. 是否使用 CSS 预编译 ？ 若是，Less or Sass ？
6. 是否使用 ESlint 标准化语法 ？
7. 是否使用 前端自动化测试 ？（ Karma? ）

## 实现问题

1. node.js ，fs(文件系统)，stream（流），readline（逐行读取）...
2. 问答式命令行工具的实现 ？？？
3. 模板是与工具放在同一个项目中 ？模板从外部下载 ？
4. 模板的动态选择是 使用不同的模板 or 动态更新相关文件 ？暂定：使用不同的模板

## 主要难点

1. node.js 语法的不熟悉
2. 其他 cli 工具的学习，如：vue-cli(Vue) / create-react-app(react)

## 流程

1. node 版本的检验