import React from "react";

import styles from "./tags.module.scss";
import { RightOutlined } from "@ant-design/icons";
import { Alert, Input } from "antd";

import { Loading, Card, Button } from "@/components/antd";
import { Flex } from "@/components/flex";
import { AdminLayout } from "@/components/layout";
import { Tag } from "@/components/tag";

import { showNotification } from "@/utils";
import { getTagsWithCount, renameTag, deleteTag } from "@/utils/api";

export default function TagsManager() {
  return (
    <AdminLayout>
      <AdminTagsManager />
    </AdminLayout>
  );
}

export function AdminTagsManager() {
  const [tags, setTags] = React.useState<{ tag: string; count: number }[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  const initial = React.useCallback(() => {
    setLoading(true);
    getTagsWithCount({}).then((res) => {
      if (!!res.success && !!res.data) {
        setTags(res.data);
      }
      setLoading(false);
    });
  }, [setLoading]);

  React.useEffect(() => {
    initial();
  }, [initial]);

  const [tag, setTag] = React.useState<string>("");
  const [count, setCount] = React.useState<number>(0);
  const [newTag, setNewTag] = React.useState<string>("");

  const renameTagCallback = React.useCallback(
    (tag: string, newTag: string) => {
      setLoading(true);
      renameTag({ tag, newTag })
        .then((resp) => {
          if (showNotification(resp, true)) {
            initial();
            setTag("");
            setNewTag("");
          }
        })
        .finally(() => setLoading(false));
    },
    [setLoading, initial],
  );

  const deleteTagCallback = React.useCallback(
    (tag: string) => {
      setLoading(true);
      deleteTag({ tag })
        .then((resp) => {
          if (showNotification(resp, true)) {
            initial();
            setTag("");
            setNewTag("");
          }
        })
        .finally(() => setLoading(false));
    },
    [setLoading, initial],
  );

  return (
    <Card>
      <Loading loading={loading}>
        <Flex direction="TB" fullWidth>
          <Alert
            message="??????"
            description={
              <ul>
                <li>?????????????????????????????????????????????????????????</li>
                <li>???????????????????????????????????????????????????</li>
              </ul>
            }
            style={{ width: "100%" }}
          />
          <Flex direction="LR" mainAxis="center">
            <Input value={tag} disabled />
            <RightOutlined />
            <Input
              value={newTag}
              onChange={(e) => {
                if (!!e && !!e.target) {
                  setNewTag(e.target.value.toLowerCase());
                }
              }}
            />
            <Button
              text="??????"
              type="primary"
              disabled={tag === "" || newTag === ""}
              loading={loading}
              confirm={`${count} ???????????? ${tag} ?????????????????? ${newTag} ??????`}
              onClick={() => renameTagCallback(tag, newTag)}
            />
            <Button
              text="??????"
              type="primary"
              danger
              disabled={tag === ""}
              loading={loading}
              confirm={`${count} ?????????????????? ${tag} ??????`}
              onClick={() => deleteTagCallback(tag)}
            />
          </Flex>
          <Flex
            direction="LR"
            mainSize="small"
            subSize="small"
            mainAxis="flex-start"
          >
            {tags.map((item) => (
              <Tag
                key={item.tag}
                tag={item.tag}
                icon={<span className={styles.count}>{item.count}</span>}
                onClick={() => {
                  setTag(item.tag);
                  setCount(item.count);
                  setNewTag("");
                }}
              />
            ))}
          </Flex>
        </Flex>
      </Loading>
    </Card>
  );
}
