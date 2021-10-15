## 准备知识


### 1、GitHub Actions
`GitHub Actions` 是 `Github` 官方提供的自动化软件开发工作流程。
​

`GitHub Actions` 帮助您自动完成软件开发周期内的任务。
`GitHub Actions` 是事件驱动的，在 `GitHub Actions` 的仓库中自动化、自定义和执行软件开发工作流程。
您可以发现、创建和共享操作以执行您喜欢的任何作业（包括 `CI/CD`），并将操作合并到完全自定义的工作流程中。
​

[快速入门参考](https://docs.github.com/cn/actions/quickstart)
​

### 2、云开发CloudBase


#### 后端即服务
**​**

`CloudBase` 是腾讯云官方提供的可靠、丰富的一站式后端能力。
并提供多语言 SDK，轻松开发多端应用。


[入门文档](https://docs.cloudbase.net/)
​

## 项目配置


在这里以`vuepress`的部署为例
​

### 1、添加CI文件
​

在项目中新建 `.github/workflows/ci.yml` 文件，并拷入以下代码：
​

```yaml
# 工作流程名称
name: Blog CI
on: [push]

# 触发构建动作
#    push:
#        # 触发构建分支[默认分支]
#        branches: [ $default-branch ]
#    pull_request:


# 作业是在同一运行服务器上执行的一组步骤
jobs:
    # 作业名称
    deploy:
        # 运行器（这里是Ubuntu系统）
        runs-on: ubuntu-latest
        # 作业名称（同deploy）
        name: Deploy
        # 步骤是可以在作业中运行命令的单个任务
        # 步骤可以是操作或 shell 命令
        steps:
            # 检出推送的代码
            - name: Checkout
              uses: actions/checkout@v2
            # 发布到云开发
            - name: Deploy to Tencent CloudBase
              uses: TencentCloudBase/cloudbase-action@v2
              with:
              # 以下参数配置于 github secrets
                 secretId: ${{secrets.SECRETID}}
                 secretKey: ${{secrets.SECRETKEY}}
                 envId: ${{secrets.ENV_ID}}

```


** ci.yml文件**
![image.png](https://cdn.nlark.com/yuque/0/2021/png/1088766/1631692394151-e4b965ec-7250-4714-96a3-aa34acb50162.png)
#### 
### 2、获取并替换以下变量


secretId、secretKey、envId


secrets配置于GitHub仓库当中。


#### 腾讯云secretId与secretKey获取
[访问管理](https://console.cloud.tencent.com/cam/capi)
登录腾讯云，访问管理，复制`secretId`与`secretKey`。
通过`secretId`与`secretKey`活动对应的腾讯云账号部分权限，安全起见，可以通过策略去添加子账号。
![image.png](https://cdn.nlark.com/yuque/0/2021/png/1088766/1631693239688-a669da47-17dd-46bd-88d5-5205bca9c38c.png)


#### 云开发envId获取
[云开发控制台](https://console.cloud.tencent.com/tcb/env/index)
登录腾讯云，打开云开发控制台，获取云开发环境id。
![image.png](https://cdn.nlark.com/yuque/0/2021/png/1088766/1631692946190-f38ba5e3-17fc-4821-98a7-54c6f47ab1c3.png)


#### GitHub Secret添加
在`GitHub`仓库中，`Settings/Secrets`中添加以上变量，这样就可以在 `ci.yml`文件中访问设置的`Secret`变量。
![image.png](https://cdn.nlark.com/yuque/0/2021/png/1088766/1631692631634-f87f8e98-fb49-46c5-ac7f-d25b1889f085.png)
### 3、添加 cloudbaserc.json 文件
[配置说明](https://docs.cloudbase.net/framework/config)
在根目录添加 `cloudbaserc.json`文件，并添加一下代码。
```json
{
    "envId": "{{env.ENV_ID}}",
    "$schema": "https://framework-1258016615.tcloudbaseapp.com/schema/latest.json",
    "framework": {
        "name": "blog",
        "plugins": {
            "client": {
                "use": "@cloudbase/framework-plugin-website",
                "inputs": {
                    "buildCommand": "npm run build",
                    "outputPath": "docs/.vuepress/dist",
                    "cloudPath": "/"
                }
            }
        }
    }
}

```
**不同的项目可以修改 打包输出dist目录，outputPath。**
**​**

至此，准备工作完成。
​

## 触发部署


在`ci.yml`，我们设置了 只要`push`了代码就会触发`GitHub Actions`，继而触发`CloudBase`的代码部署。
​

一个部署完成的`Action`。
![image.png](https://cdn.nlark.com/yuque/0/2021/png/1088766/1631694561931-28bc28e4-01a0-4630-b89b-b47325149f8f.png)


## 最后


[演示项目的GitHub Actions](https://github.com/wforguo/blog/actions)
​

感谢Star...
