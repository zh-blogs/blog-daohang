# 参与贡献

## 标准贡献

1. Fork 并 close 仓库至本地

    ```bash
    git clone git@github.com:YOUR_GITHUB_USERNAME/blog-daohang.git
    ```

2. 为新标准或 Issue 创建一个语义化分支

    ```bash
    git checkout -b your-meaningful-branch-name
    ```

3. 文档编写

   建议使用 [markdownlint](https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint) VScode 插件对 Markdown 文档语法进行检查，确保无 Markdown 语法警告。
   （可以依照需求对 HTML 标签进行放行，建议尽可能少的使用 HTML 标签，如有特殊排版需要，请确保遵守语义化标准的情况下使用对应标签）

4. 发布分支

    ```bash
    git push -u origin your-meaningful-branch-name
    ```

5. 切换分支并提交 Pull Request
