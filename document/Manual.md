# 人工收录及数据字段说明

我们会主动添加博客网站。

我们在添加网站时会自己查找网站的数据。数据字段说明如下：

| 数据名 | 数据内容 |
| :--: | :--: |
| name | 博客名称 |
| url | 站点链接 |
| tag | 站点整体描述的tag |
| sign | 站点的描述或者签名 |
| feed | 站点的订阅链接 |
| arch | 站点的架构 |
| sitemap | 站点的网站地图 |
| saveweb_id | 在 save/rss-list 中的序号 |
| recommend | 是否为“推荐博客” |

由于是人为搜集，我们遵循以下顺序：

友链信息>订阅信息>站点信息 


友链信息：即您站点有友链界面，并在该界面有您本人所公示的站点信息

订阅信息：即您站点的订阅界面，里面所包含的您的站点信息，我们选取前面的几个标签：`<title>` `<description>` `<subtitle>`来完善您的站点信息

站点信息：即您站点首页所展现出来的信息，标题和站点描述


同样的，因为是人工手动收录，所以可能会有相关信息与您预期不符，您可以通过[提出 issue](https://github.com/zh-blogs/blog-daohang/issues/new?assignees=linlinzzo&labels=&template=change.md&title=%E7%94%B3%E8%AF%B7%E4%BF%AE%E6%94%B9%E4%BF%A1%E6%81%AF-%5B%E7%BD%91%E7%AB%99%E5%BA%8F%E5%8F%B7%5D) 来更改您的站点信息，帮助我们完善此项目。
