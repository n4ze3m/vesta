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
import UpdateModal from "../Common/UpdateModal";
import { useForm, formList } from "@mantine/form";
import LinkPreview from "../Common/LinkPreview";
import { useLocalStorage } from "@mantine/hooks";
import {
  useWhenKeepDownMutation,
  useWhenKeepUpMutation,
  useDeleteKeepMutation,
  useUpdateKeepMutation,
  useMoveKeepsMutation,
} from "graphql/generated/graphql";
import { queryClient } from "pages/_app";
import { useRouter } from "next/router";
import Empty from "./Empty";

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
    border: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
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
  const [showUpdateModal, setShowUpdateModal] = React.useState(false);
  const [updateModalData, setUpdateModalData] = React.useState({});
  const keeps = data.getKeepsByType;
  const [userId] = useLocalStorage({
    key: "userId",
  });

  const { mutateAsync: whenKeepDownMutation } = useWhenKeepDownMutation();

  const { mutateAsync: whenKeepUpMutation } = useWhenKeepUpMutation();

  const { mutateAsync: deleteKeepMutation } = useDeleteKeepMutation({
    onSuccess(data) {
      // refetch the data
      queryClient.refetchQueries("GetKeepsQuery");
    },
  });

  const { mutateAsync: updateKeepMutation } = useUpdateKeepMutation({
    onSuccess(data) {
      // refetch the data
      // queryClient.refetchQueries("GetKeepsQuery");
    },
  });

  const { mutateAsync: moveKeepsMutation } = useMoveKeepsMutation({});

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
                    onDoubleClick={() => {}}
                    // onFocus={() => {
                    //   console.log("im focused");
                    // }}
                    onBlur={async () => {
                      const keep = form.values.keep[index];
                      await updateKeepMutation({
                        id: keep.id,
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
                        user_id: userId,
                      });
                    }}
                    icon={<Mailbox size={14} />}
                  >
                    Move to Keep
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
                        user_id: userId,
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
                        user_id: userId,
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
                    const id = item.id;
                    form.removeListItem("keep", index);
                    await deleteKeepMutation({
                      id,
                      user_id: userId,
                      keep_type: type,
                    });
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
      <UpdateModal
        opened={showUpdateModal}
        onClose={() => setShowUpdateModal(false)}
        data={updateModalData}
      />
      <DragDropContext
        onDragEnd={async ({ destination, source, mode }) => {
          if (destination) {
            form.reorderListItem("keep", {
              from: source.index,
              to: destination.index,
            });
            if (movement(source.index, destination.index) === "up") {
              const keep_id = form.values.keep[source.index].id;
              await whenKeepUpMutation({
                keep_id: keep_id,
                newPosition: destination.index + 1,
                oldPosition: source.index + 1,
                user_id: userId,
                keep_type: type,
              });
            } else if (movement(source.index, destination.index) === "down") {
              const keep_id = form.values.keep[source.index].id;
              await whenKeepDownMutation({
                keep_id: keep_id,
                newPosition: destination.index + 1,
                oldPosition: source.index + 1,
                user_id: userId,
                keep_type: type,
              });
            }

            // console.log(source.index, destination.index, movement(source.index, destination.index));
          }
        }}
      >
        <Droppable droppableId="dnd-list" direction="vertical">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {showUIElements && fields.length > 0 && fields}
              {fields.length === 0 && <Empty text="You have no keeps here" />}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
}
