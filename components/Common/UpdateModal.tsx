import { ActionIcon, Text, Modal, Textarea, Group } from "@mantine/core";
import React from "react";
import { Archive, Trash } from "tabler-icons-react";

interface UpdateProps {
  data: any;
  onClose: () => void;
  opened: boolean;
}

export default function UpdateModal({ data, opened, onClose }: UpdateProps) {
  return (
    <Modal title="Update Keep" size="lg" opened={opened} onClose={onClose}>
      <Textarea
        placeholder="Your keep..."
        autosize
        minRows={2}
        maxRows={8}
        value={data.note}
      />
      <Group position="apart" mt="md">
        <Group>
          <ActionIcon title="Move to archive">
            <Archive size={16} />
          </ActionIcon>
          <ActionIcon title="Delete">
            <Trash size={16} />
          </ActionIcon>
        </Group>
        <Text
          size="sm"
          style={{
            fontStyle: "italic",
          }}
        >
          Saving...
        </Text>
      </Group>
    </Modal>
  );
}
