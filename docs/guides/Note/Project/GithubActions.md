## GitHub Actions


GitHub Actions 帮助您自动完成软件开发周期内的任务。
GitHub Actions 是事件驱动的，在 GitHub Actions 的仓库中自动化、自定义和执行软件开发工作流程。
您可以发现、创建和共享操作以执行您喜欢的任何作业（包括 CI/CD），并将操作合并到完全自定义的工作流程中。


[快速入门参考](https://docs.github.com/cn/actions/quickstart)


## 关于CI


Continuous Integration（持续集成）


持续集成 (CI) 是一种需要频繁提交代码到共享仓库的软件实践。
频繁提交代码能较早检测到错误，减少在查找错误来源时开发者需要调试的代码量。
频繁的代码更新也更便于从软件开发团队的不同成员合并更改。
这对开发者非常有益，他们可以将更多时间用于编写代码，而减少在调试错误或解决合并冲突上所花的时间。


## 关于CD


Continuous Deploy（持续构建）


## 工作流程


WorkFlows


工作流程是您添加到仓库的自动化过程。
工作流程由一项或多项作业组成，可以计划或由事件触发。
工作流程可用于在 GitHub 上构建、测试、打包、发布或部署项目。


`GitHub Actions` 使用 `YAML` 语法来定义事件、作业和步骤。
这些 YAML 文件存储在代码仓库中名为 `.github/workflows` 的目录中。


### 事件


事件是触发工作流程的特定活动。
例如，当有推送提交到仓库或者创建议题或拉取请求时，GitHub 就可能产生活动。
您还可以使用仓库分发 web 挂钩在发生外部事件时触发工作流程。 有关可用于触发工作流程的事件的完整列表，请参阅触发工作流程的事件。


### Jobs


作业是在同一运行服务器上执行的一组步骤。
默认情况下，包含多个作业的工作流程将同时运行这些作业。 您也可以配置工作流程按顺序运行作业。
例如，工作流程可以有两个连续的任务来构建和测试代码，其中测试作业取决于构建作业的状态。
如果构建作业失败，测试作业将不会运行。


### 步骤


步骤是可以在作业中运行命令的单个任务。
步骤可以是操作或 shell 命令。
作业中的每个步骤在同一运行器上执行，可让该作业中的操作互相共享数据。


### Node.js的工作流程模板


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


### 查看工作流程


查看运行进度的可视化图以及查看 GitHub 上每个步骤的活动。


#### WorkFlows


![WorkFlows.png](https://cdn.nlark.com/yuque/0/2021/png/1088766/1631080372883-4cee647b-d2d8-43d9-9b82-ae123da8a27e.png#clientId=u8eca79cb-e36f-4&from=drop&id=u5683479e&margin=%5Bobject%20Object%5D&name=WorkFlows.png&originHeight=329&originWidth=1507&originalType=binary&ratio=1&size=31193&status=done&style=none&taskId=u6ba84459-36ba-4234-b3a7-a6a9598a0c8)


#### jobs


![jobs.png](https://cdn.nlark.com/yuque/0/2021/png/1088766/1631080378247-2a809d66-114a-45d1-8efb-a3ed28964c10.png#clientId=u8eca79cb-e36f-4&from=drop&id=u6e773949&margin=%5Bobject%20Object%5D&name=jobs.png&originHeight=442&originWidth=1028&originalType=binary&ratio=1&size=29531&status=done&style=none&taskId=u615013a0-e7df-4445-ace1-dd4cff7bd78)


#### steps
![steps.png](https://cdn.nlark.com/yuque/0/2021/png/1088766/1631080384829-8ab6667e-a20b-4850-9b89-de3d78da2ca2.png#clientId=u8eca79cb-e36f-4&from=drop&id=ueaf2b9ca&margin=%5Bobject%20Object%5D&name=steps.png&originHeight=434&originWidth=1036&originalType=binary&ratio=1&size=32411&status=done&style=none&taskId=u26e75b5b-7ac3-4b6e-9cdf-21fb1ca28fc)


### yaml语法


