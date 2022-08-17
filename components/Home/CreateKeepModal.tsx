import {
  Group,
  Modal,
  Textarea,
  Button,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { Auth } from "@supabase/ui";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
interface CreateKeepProps {
  onClose: () => void;
  opened: boolean;
}

export default function CreateKeep({ onClose, opened }: CreateKeepProps) {
  const { user } = Auth.useUser()

  const client = useQueryClient()

  const form = useForm({
    initialValues: {
      note: "",
    },
  });
  const onSubmit = async (values: any) => {
    await axios.post("/api/keep/add", values, {
      headers: {
        user_id: user!.id,
      }
    })
  }

  const { mutate: createKeep, isLoading } = useMutation(onSubmit, {
    onSuccess: () => {
      client.refetchQueries("fetchInbox")
      onClose();
      form.reset();
    },
  });




  return (
    <Modal title="Create Keep" size="lg" opened={opened} onClose={onClose}>
      <form
        onSubmit={form.onSubmit(async (values) => createKeep(values))}
      >
        <Textarea
          {...form.getInputProps("note")}
          autosize
          minRows={2}
          maxRows={8}
          placeholder="Your keep..."
          required
        />
        <Group position="right" mt="md">
          <Button
            loading={isLoading}
            color="teal" type="submit" size="md">
            Create Keep
          </Button>
        </Group>
      </form>
    </Modal>
  );
}
