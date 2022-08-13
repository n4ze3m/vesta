import {
  Group,
  Modal,
  Textarea,
  Button,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useLocalStorage } from "@mantine/hooks";
import { Link } from "tabler-icons-react";
import { useInsertKeepMutation } from "graphql/generated/graphql";
interface CreateKeepProps {
  onClose: () => void;
  opened: boolean;
}

export default function CreateKeep({ onClose, opened }: CreateKeepProps) {
  const [userId] = useLocalStorage({
    key: "userId",
  });

  const form = useForm({
    initialValues: {
      note: "",
      user_id: userId,
    },
  });

  const { mutate: createKeep, isLoading } = useInsertKeepMutation({
    onSuccess: () => {
      onClose();
      form.reset();
    },
  });

  return (
    <Modal title="Create Keep" size="lg" opened={opened} onClose={onClose}>
      <form onSubmit={form.onSubmit(async (values) => createKeep(values))}>
        <Textarea
          {...form.getInputProps("note")}
          autosize
          minRows={2}
          maxRows={8}
          placeholder="Your keep..."
          required
        />
        <Group position="right" mt="md">
          <Button loading={isLoading} color="teal" type="submit" size="md">
            Create Keep
          </Button>
        </Group>
      </form>
    </Modal>
  );
}
