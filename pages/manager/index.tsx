import React from "react";

import styles from "./index.module.scss";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import {
  Table,
  Input,
  Collapse,
  TableColumnsType,
  notification,
  Radio,
} from "antd";
import moment from "moment";

import { Form, FormItemProps, Switch, Button } from "@/components/antd";
import { Flex } from "@/components/flex";
import { AdminLayout } from "@/components/layout";
import { UserInfoContext } from "@/components/login";
import { Tag } from "@/components/tag";

import {
  UserInfo,
  Blog,
  showNotification,
  shouldString,
  shouldNumber,
  getDomain,
  Combine,
} from "@/utils";
import { getTags, getBlogs, updateBlog, deleteBlog } from "@/utils/api";

export default function Manager() {
  return (
    <AdminLayout>
      <UserInfoContext.Consumer>
        {(info) => !!info && <AdminManager info={info} />}
      </UserInfoContext.Consumer>
    </AdminLayout>
  );
}
function AdminManager(props: { info: UserInfo }) {
  const { info } = props;

  const cacheRef = React.useRef<{ [key: string]: Blog[] }>({});

  const [blogs, setBlogs] = React.useState<Blog[]>([]);
  const [totalBlogs, setTotalBlogs] = React.useState(0);

  const [loading, setLoading] = React.useState(false);

  const [allowScripts, setAllowScripts] = React.useState(false);
  const [allowSameOrigin, setAllowSameOrigin] = React.useState(false);

  const [params, setParams] = React.useState<
    Combine<Required<Parameters<typeof getBlogs>[0]>, { page: number }>
  >({
    search: "",
    tags: [] as string[],
    page: 1,
    offset: 0,
    size: 10,
    status: 0,
  });

  const [allTags, setAllTags] = React.useState<string[]>([]);
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);
  const unselectedTags = React.useMemo(() => {
    var set = new Set(allTags);
    for (const tag of selectedTags) {
      set.delete(tag as never);
    }

    return Array.from(set);
  }, [allTags, selectedTags]);

  const addTag = React.useCallback(
    (tag: string) => {
      const newTags = [...selectedTags, tag];
      setSelectedTags(newTags);
      setParams({ ...params, tags: newTags });
    },
    [params, selectedTags, setSelectedTags],
  );

  const removeTag = React.useCallback(
    (tag: string) => {
      const newTags = selectedTags.filter((t) => t !== tag);
      setSelectedTags(newTags);
      setParams({ ...params, tags: newTags });
    },
    [params, selectedTags, setSelectedTags],
  );

  React.useEffect(() => {
    // ??????????????????
    getTags({}).then((result) => {
      if (showNotification(result) && !!result.data) {
        setAllTags(result.data);
      }
    });
  }, []);

  // query ????????????????????????
  const getPage = React.useCallback(() => {
    // ??????????????????
    const key = JSON.stringify(params);
    if (!!cacheRef.current[key] && cacheRef.current[key].length > 0) {
      setBlogs(cacheRef.current[key]);
    } else {
      setLoading(true);
    }
    getBlogs(params)
      .then((res) => {
        if (showNotification(res) && !!res.data) {
          setBlogs(res.data.blogs);
          setTotalBlogs(res.data.total);
          // ????????????
          cacheRef.current = { ...cacheRef.current, [key]: res.data.blogs };
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [params, cacheRef, setBlogs, setLoading]);

  React.useEffect(() => {
    getPage();
  }, [getPage]);

  const [edit, setEdit] = React.useState<Blog>();
  const [form] = Form.useForm();

  const forms = React.useMemo(
    () =>
      [
        {
          key: "id",
          label: "ID",
          required: true,
          readonly: true,
        },
        {
          key: "url",
          label: "????????????",
          required: true,
          rules: [
            {
              validator: async (_, value: string) => {
                // ??????????????????
                const resp = await getBlogs({
                  search: getDomain(value),
                  status: 0,
                });
                if (!!resp.success && !!resp.data) {
                  const blogs = resp.data.blogs;
                  const matchBlogs = blogs.filter(
                    (blog) =>
                      getDomain(blog.url) === getDomain(value) &&
                      !!edit &&
                      blog.id !== edit.id,
                  );
                  if (matchBlogs.length > 0) {
                    return Promise.reject(
                      `??????????????????, ?????????????????????????????????????????????: ${matchBlogs
                        .map((blog) => `${blog.name}(${blog.url})`)
                        .join(",")}`,
                    );
                  }
                }
              },
            },
          ],
        },
        {
          key: "name",
          label: "????????????",
          required: true,
        },
        {
          key: "sign",
          label: "????????????",
        },
        {
          key: "join_time",
          label: "????????????",
          readonly: true,
          datePicker: true,
          showTime: { defaultValue: moment("00:00:00", "HH:mm:ss") },
        },
        {
          key: "update_time",
          label: "????????????",
          readonly: true,
          datePicker: true,
          showTime: { defaultValue: moment("00:00:00", "HH:mm:ss") },
        },
        {
          key: "feed",
          label: "RSS ????????????",
        },
        {
          key: "sitemap",
          label: "????????????",
        },
        {
          key: "tags",
          label: "??????",
          select: allTags,
          mode: "tags",
        },
        {
          key: "arch",
          label: "????????????(???????????????)",
        },
        {
          key: "saveweb_id",
          label: "saveweb_id",
        },
        {
          key: "enabled",
          label: "??????",
          render: () => <Switch />,
        },
        {
          key: "recommend",
          label: "??????",
          render: () => <Switch />,
        },
      ] as FormItemProps[],
    [allTags, edit],
  );

  const cols: TableColumnsType<Blog> = React.useMemo(
    () => [
      {
        title: "#",
        dataIndex: "idx",
        key: "idx",
      },
      {
        title: "??????",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "??????",
        dataIndex: "url",
        key: "url",
        render: (url: string) => (
          <a
            href={url}
            hrefLang="zh"
            target="_blank"
            type="text/html"
            rel="noreferrer"
          >
            {url}
          </a>
        ),
      },
      {
        title: "??????",
        dataIndex: "sign",
        key: "sign",
      },
      {
        title: "Rss",
        dataIndex: "rss",
        key: "rss",
      },
      {
        title: "??????",
        dataIndex: "tags",
        key: "tags",
        render: (tags: string[]) => (
          <Flex
            direction="LR"
            mainSize="small"
            subSize="small"
            mainAxis="flex-start"
            subAxis="flex-start"
          >
            {tags.map((tag) => (
              <Tag key={tag} tag={tag} />
            ))}
          </Flex>
        ),
      },
      {
        title: "??????",
        dataIndex: "enabled",
        key: "enabled",
        render: (enabled: boolean) =>
          !!enabled ? (
            <CheckOutlined style={{ color: "green" }} />
          ) : (
            <CloseOutlined style={{ color: "red" }} />
          ),
      },
      {
        title: "??????",
        dataIndex: "op",
        key: "op",
        render: (_: any, record: Blog) => (
          <Flex direction="LR" mainSize="small" subSize="small">
            <Button
              onClick={() => {
                setEdit(record);
                form.setFieldsValue({
                  id: record.id,
                  url: record.url,
                  name: record.name,
                  sign: record.sign,
                  feed: record.feed,
                  tags: record.tags,
                  status: record.status,
                  repeat: record.repeat,
                  enabled: record.enabled,
                  sitemap: record.sitemap,
                  arch: record.arch,
                  join_time: moment(record.join_time),
                  update_time: moment(record.update_time),
                  saveweb_id: record.saveweb_id,
                  recommend: record.recommend,
                });
              }}
              type="primary"
              text="??????"
            />
            <Button
              onClick={async () => {
                const resp = await deleteBlog({ id: record.id as string });
                if (resp.success) {
                  notification.success({
                    message: "????????????",
                    description: resp.message,
                  });
                  getPage();
                } else {
                  notification.error({
                    message: "????????????",
                    description: resp.message,
                  });
                }
              }}
              type="primary"
              danger
              confirm="?????????????"
              text="??????"
            />
          </Flex>
        ),
      },
    ],
    [setEdit, form, getPage],
  );

  return (
    <Flex fullWidth direction="TB">
      <p>Hi, {info.name} !</p>
      <Radio.Group
        onChange={(e) => {
          if (!!e.target) {
            setParams({
              ...params,
              status: shouldNumber(e.target.value, 0) as 0 | 1 | -1,
            });
          }
        }}
        value={params.status}
      >
        <Radio.Button value={0}>??????</Radio.Button>
        <Radio.Button value={1}>????????????</Radio.Button>
        <Radio.Button value={-1}>?????????</Radio.Button>
        <Radio.Button value={2}>????????????</Radio.Button>
      </Radio.Group>
      <Input
        placeholder="?????????????????????????????????"
        defaultValue={shouldString(params.search)}
        onBlur={(e) => {
          if (!!e && !!e.target) {
            setParams({ ...params, search: e.target.value.toLowerCase() });
          }
        }}
        onKeyUp={(e) => {
          if (!!e && !!e.target && e.key === "Enter") {
            const search = (e.target as HTMLInputElement).value.toLowerCase();
            setParams({ ...params, search });
          }
        }}
      />
      <Flex
        direction="LR"
        mainSize="small"
        subSize="small"
        mainAxis="flex-start"
      >
        {selectedTags.map((tag) => (
          <Tag key={tag} tag={tag} onClose={() => removeTag(tag)} />
        ))}
      </Flex>
      <Collapse ghost>
        <Collapse.Panel header="????????????" key="tags">
          <Flex
            direction="LR"
            mainSize="small"
            subSize="small"
            mainAxis="flex-start"
          >
            {unselectedTags.map((tag) => (
              <Tag key={tag} tag={tag} onClick={() => addTag(tag)} />
            ))}
          </Flex>
        </Collapse.Panel>
      </Collapse>
      <Table
        loading={loading}
        rowKey={(record) => `${record.id}-${record.url}`}
        style={{ width: "100%" }}
        columns={cols}
        dataSource={blogs}
        rowClassName={(record) => (record.repeat ? styles.repeat : "")}
        pagination={{
          showLessItems: true,
          hideOnSinglePage: true,
          current: shouldNumber(params.page),
          total: totalBlogs,
          pageSize: params.size,
          pageSizeOptions: [5, 10, 20, 50],
          showSizeChanger: true,
          onChange: (page, size) => {
            setParams({
              ...params,
              page,
              size,
              offset: (page - 1) * params.size,
            });
          },
        }}
      />

      {!!edit && (
        <Form
          form={form}
          forms={forms}
          onFinish={async (values) => {
            const resp = await updateBlog({ id: values.id, blog: values });
            if (resp.success) {
              notification.success({
                message: "????????????",
                description: resp.message,
              });
              getPage();
            } else {
              notification.error({
                message: "????????????",
                description: resp.message,
              });
            }
          }}
        />
      )}
      {!!edit && (
        <Flex
          direction="LR"
          mainAxis="flex-start"
          mainSize="middle"
          subSize="small"
        >
          <Flex
            direction="LR"
            mainAxis="flex-start"
            mainSize="small"
            subSize="small"
          >
            <b>??????????????????</b>
            <span>??????????????????????????? JS ???????????????</span>
            <Switch
              value={allowScripts}
              onChange={(value) => setAllowScripts(value)}
            />
          </Flex>
          <Flex
            direction="LR"
            mainAxis="flex-start"
            mainSize="small"
            subSize="small"
          >
            <b>????????????</b>
            <span>????????????????????????????????? cookie ?????????</span>
            <Switch
              value={allowSameOrigin}
              onChange={(value) => setAllowSameOrigin(value)}
            />
          </Flex>
        </Flex>
      )}
      {!!edit && (
        <iframe
          src={edit.url}
          style={{ width: "100%", height: "50vh" }}
          sandbox={[
            allowSameOrigin && "allow-same-origin",
            allowScripts && "allow-scripts",
          ]
            .filter((item) => !!item)
            .join(" ")}
        />
      )}
    </Flex>
  );
}
