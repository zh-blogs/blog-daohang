# 参与贡献

## 标准贡献

0. 提交 issue

    无论是问题或者是新标准的提出，我们都建议您先提交一个 issue 以便我们进行讨论，您可以在提出 issue 的同时执行以下步骤，并在相关 issue 中链接它，用以对您的想法进行补充说明和佐证。

1. Fork 并 close 仓库至本地

    ```bash
    git clone git@github.com:YOUR_GITHUB_USERNAME/blog-daohang.git
    ```

2. 为新标准或 Issue 创建一个语义化分支

    ```bash
    git checkout -b your-meaningful-branch-name
    ```

3. 文档编写

    编写过程中，请遵守[文档编写规范](./DOCUMENTATIONSTYLE.md)

    建议使用 [markdownlint](https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint) VScode 插件对 Markdown 文档语法进行检查和文档预览，确保无 Markdown 语法警告。

    > 可以依照需求对 HTML 标签进行放行，建议尽可能少的使用 HTML 标签，如有特殊排版需要，请确保遵守语义化标准的情况下使用对应标签

4. 发布分支

    ```bash
    git push origin your-meaningful-branch-name
    ```

5. 切换分支并提交 Pull Request

    由于本仓库并非代码仓库，因此我们参考了：[Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) 规范，并在此基础上我们定义了适用于本项目标准文档的 pr 规范，详见：[Pull Request 规范](#pull-request-commit-规范)，请您在提交 pr 时遵守此规范。

## Pull Request (Commit) 规范

### 提交规范

提交 pr/commit 的标题格式为 `<type>[<scope>]: <subject>`

- type 用于说明修改类型，填写内容参见下文
- scope 用于说明 pr/commit 影响的范围，填写内容参见下文
- subject 是 pr/commit 目的的简短描述，语言不限，结尾不加任何标点符号

> 如果您的文档尚未完成，请点击 Draft Pull Request，而不是 Open Pull Request

### 修改类型说明

- feat：新建标准大项——新文档（feature）
- fix：修复文档漏洞，对部分文档说明进行修改
- add: 新增标准子项——在已有文档基础上新增子项目说明
- style：对样式进行优化（不影响文档表意的变动）
- refactor：重构（不影响文档表意的情况下对文档进行重新编写）
- perf：优化文档，例如：文档表意不明确的地方进行进一步说明等
- revert：回滚到上一个版本
- merge：合并
- sync：同步变动

### 影响范围说明

- feat：标准大项名称
- fix：修改的文档名称（无需携带文件名后缀）
- add: 新增标准子项——在已有文档基础上新增子项目说明
- style：规范（不影响文档表意的变动）
- refactor：重构（不影响文档表意的情况下对文档进行重新编写）
- perf：优化文档，例如：文档表意不明确的地方进行进一步说明等
- revert：回滚到上一个版本
- merge：合并
- sync：同步变动
