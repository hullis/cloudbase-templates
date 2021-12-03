---
comment: false 
# comments: false 
---
# 指南

<a href="https://github.com/TencentCloudBase/cloudbase-templates"><img src="https://main.qcloudimg.com/raw/230c115bee4300384fa557710daa2928.jpg"></a>

# 云开发 VuePress 网站应用示例

这个目录是基于云开发的一个 [VuePress](https://vuepress.vuejs.org/) 网站应用示例，包含 VuePress 静态网站部署，可以基于 **[CloudBase Framework](https://github.com/TencentCloudBase/cloudbase-framework)** 框架将项目一键部署到云开发环境

## 线上演示地址

[https://framework-1258016615.tcloudbaseapp.com/vuepress/](https://framework-1258016615.tcloudbaseapp.com/vuepress/)

点击下方按钮使用 [CloudBase Framework](https://github.com/TencentCloudBase/cloudbase-framework) 可以在云端一键部署本项目到自己的云开发账号上。

[![](https://main.qcloudimg.com/raw/95b6b680ef97026ae10809dbd6516117.svg)](https://console.cloud.tencent.com/tcb/env/index?action=CreateAndDeployCloudBaseProject&appUrl=https%3A%2F%2Fgitee.com%2Fwarmthlinn_admin%2Fvuepress&branch=master)

## 部署一个 VuePress 网站

### 步骤一. 准备工作

具体步骤请参照 [准备云开发环境和 CloudBase CLI 命令工具](https://github.com/TencentCloudBase/cloudbase-framework/blob/master/CLI_GUIDE.md)

### 步骤二. 初始化应用示例

在命令行执行

```
cloudbase init --template vuepress
```

### 步骤三. 一键部署

进入到项目目录，在命令行执行

```
cloudbase framework deploy
```

## 开发命令及配置

### 本地开发

```
npm run dev
```

### 上线部署

```
npm run deploy
```

### build

```
npm run build
```

### CloudBase Framework 相关开发配置

查看 [CloudBase Framework 配置](https://github.com/TencentCloudBase/cloudbase-framework).

### VuePress 相关开发配置

查看 [VuePress 配置](https://vuepress.vuejs.org/zh/config/).
