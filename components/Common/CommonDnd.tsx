import { createStyles, Divider, Menu, Textarea } from "@mantine/core";
import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  Archive,
  GripVertical,
  Link,
  Mailbox,
  Trash,
} from "tabler-icons-react";
import { useForm, formList } from "@mantine/form";
import LinkPreview from "../Common/LinkPreview";
import { useRouter } from "next/router";
import Empty from "./Empty";
import { useMutation } from "react-query";
import axios from "axios";
import { Auth } from "@supabase/ui";

const movement = (source: number, destination: number) => {
  if (source < destination) {
    return "down";
  } else if (source > destination) {
    return "up";
  } else {
    return "none";
  }
};

const useStyles = createStyles((theme) => ({
  item: {
    borderRadius: theme.radius.md,
    border: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
      }`,
    paddingLeft: theme.spacing.xl - theme.spacing.md, // to offset drag handle
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.white,
    marginBottom: theme.spacing.sm,
  },

  itemDragging: {
    boxShadow: theme.shadows.sm,
  },

  symbol: {
    fontSize: 30,
    fontWeight: 700,
    width: 60,
  },

  dragHandle: {
    ...theme.fn.focusStyles(),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[1]
        : theme.colors.gray[6],
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
  },
}));

type CommonKeepDndProps = {
  data: any;
  type: string;
};

export default function CommonKeepDnd({ data, type }: CommonKeepDndProps) {
  const { classes, cx } = useStyles();
  const router = useRouter();
  const [showUIElements, setShowUIElements] = React.useState(true);
  const keeps = data;
  const { user } = Auth.useUser();

  const onDragFinish = async (result: any) => {
    await axios.post(`/api/keep/drag`, result, {
      headers: {
        user_id: user!.id,
      }
    })
  }
  const { mutateAsync: whenMoveMutation } = useMutation(onDragFinish);

  const deleteKeep = async ({ keep_id, keep_type }: any) => {
    await axios.post(`/api/keep/delete`, {
      keep_id,
      keep_type,
    }, {
      headers: {
        user_id: user!.id,
      }
    })
  }

  const updateKeep = async ({ keep_id, note }: any) => {
    await axios.post(`/api/keep/update`, {
      keep_id,
      note,
    }, {
      headers: {
        user_id: user!.id,
      }
    })
  }

  const onMove = async (result: any) => {
    await axios.post(`/api/keep/move`, result, {
      headers: {
        user_id: user!.id,
      }
    })
  }


  const { mutateAsync: deleteKeepMutation } = useMutation(deleteKeep);

  const { mutateAsync: updateKeepMutation } = useMutation(updateKeep);

  const { mutateAsync: moveKeepsMutation } = useMutation(onMove);

  const form = useForm({
    initialValues: {
      keep: formList(keeps as any[]),
    },
  });
  React.useEffect(() => {
    form.setValues({
      keep: formList(keeps as any[]),
    });
    setShowUIElements(true);
  }, [data]);

  const fields = form.values.keep.map((item: any, index) => (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided, snapshot) => (
        <>
          <div
            className={cx(classes.item + " d-flex align-items-center", {
              [classes.itemDragging]: snapshot.isDragging,
            })}
            ref={provided.innerRef}
            {...provided.draggableProps}
          >
            <div
              {...provided.dragHandleProps}
              className={"flex-shrink-1 " + classes.dragHandle}
            >
              <GripVertical size={18} />
            </div>

            <div className="p-2 w-100">
              <div className="unselectable">
                {item.is_link ? (
                  <LinkPreview data={item.link[0]} />
                ) : (
                  <Textarea
                    variant="unstyled"
                    autosize
                    {...form.getListInputProps("keep", index, "note")}
                    onDoubleClick={() => { }}
                    onBlur={async () => {
                      const keep = form.values.keep[index];
                      await updateKeepMutation({
                        keep_id: keep.id,
                        note: keep.note,
                      });
                    }}
                  />
                )}
              </div>
            </div>
            <div className="align-items-right">
              <Menu trigger="hover" delay={200}>
                {router.pathname !== "/" && (
                  <Menu.Item
                    onClick={async () => {
                      let current_keep_type = item.keep_type;
                      let keep_id = item.id;
                      form.removeListItem("keep", index);
                      await moveKeepsMutation({
                        current_keep_type,
                        keep_id,
                        new_keep_type: "inbox",
                      });
                    }}
                    icon={<Mailbox size={14} />}
                  >
                    Move to Home
                  </Menu.Item>
                )}

                {item.is_link && router.pathname !== "/links" && (
                  <Menu.Item
                    onClick={async () => {
                      let current_keep_type = item.keep_type;
                      let keep_id = item.id;
                      form.removeListItem("keep", index);
                      await moveKeepsMutation({
                        current_keep_type,
                        keep_id,
                        new_keep_type: "link",
                      });
                    }}
                    icon={<Link size={14} />}
                  >
                    Move to Links
                  </Menu.Item>
                )}

                {router.pathname !== "/archives" && (
                  <Menu.Item
                    onClick={async () => {
                      let current_keep_type = item.keep_type;
                      let keep_id = item.id;
                      form.removeListItem("keep", index);
                      await moveKeepsMutation({
                        current_keep_type,
                        keep_id,
                        new_keep_type: "archive",
                      });
                    }}
                    icon={<Archive size={14} />}
                  >
                    Move to Archive
                  </Menu.Item>
                )}

                <Divider />

                <Menu.Label>Danger zone</Menu.Label>
                <Menu.Item
                  onClick={async () => {
                    const keep_id = item.id;
                    const keep_type = item.keep_type;
                    form.removeListItem("keep", index);
                    await deleteKeepMutation(
                      {
                        keep_id,
                        keep_type
                      }
                    );
                  }}
                  color="red"
                  icon={<Trash size={14} />}
                >
                  Delete keep
                </Menu.Item>
              </Menu>
            </div>
          </div>
        </>
      )}
    </Draggable>
  ));
  return (
    <>
      <DragDropContext
        onDragEnd={async ({ destination, source, mode }) => {
          if (destination) {
            form.reorderListItem("keep", {
              from: source.index,
              to: destination.index,
            });
            if (movement(source.index, destination.index) === "up") {
              const keep_id = form.values.keep[source.index].id;
              await whenMoveMutation({
                keep_id: keep_id,
                newPosition: destination.index + 1,
                oldPosition: source.index + 1,
                keep_type: type,
                move: "down",
              });
            } else if (movement(source.index, destination.index) === "down") {
              const keep_id = form.values.keep[source.index].id;
              await whenMoveMutation({
                keep_id: keep_id,
                newPosition: destination.index + 1,
                oldPosition: source.index + 1,
                keep_type: type,
                move: "up",
              });
            }
          }
        }}
      >
        <Droppable droppableId="dnd-list" direction="vertical">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {showUIElements && fields.length > 0 && fields}
              {fields.length === 0 && <Empty text="Oops, Seems like you don't have any note / links here" />}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
}
