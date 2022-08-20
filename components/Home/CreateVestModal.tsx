import {
  Group,
  Modal,
  Textarea,
  Button,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useNotifications } from "@mantine/notifications";
import { Auth } from "@supabase/ui";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
interface CreateVestaProps {
  onClose: () => void;
  opened: boolean;
}

export default function CreateVesta({ onClose, opened }: CreateVestaProps) {
  const { user } = Auth.useUser()

  const client = useQueryClient()

  const form = useForm({
    initialValues: {
      note: "",
    },
  });
  const onSubmit = async (values: any) => {
    // check if values.note is url
    const url = values.note.trim()
    if (url.match(/^(http|https):\/\/[^ "]+$/)) {
      console.log("valid url")
      await axios.post("/api/keep/client-link", {
        note: url,
      }, {
        headers: {
          user_id: user!.id,
        }
      })
    } else {
      console.log("valid url")
      await axios.post("/api/keep/add", {
        note: values.note,
      }, {
        headers: {
          user_id: user!.id,
        }
      })
    }
  }

  const { mutate: createVesta, isLoading } = useMutation(onSubmit, {
    onSuccess: () => {
      client.refetchQueries("fetchInbox")
      onClose();
      form.reset();
    },
    onError: (e:any) => {
           const message =
        e?.response?.data?.message ||
        e?.response?.data?.erorr ||
        e?.message ||
        "Unknown error";
      showNotification({
        message,
        color: "red",
        title: "Error",
      });
    }
  });




  return (
    <Modal title="Add link or note" size="lg" opened={opened} onClose={onClose}>
      <form
        onSubmit={form.onSubmit(async (values) => createVesta(values))}
      >
        <Textarea
          {...form.getInputProps("note")}
          autosize
          minRows={2}
          maxRows={8}
          placeholder="Your link or note..."
          required
        />
        <Group position="right" mt="md">
          <Button
            loading={isLoading}
            color="teal" type="submit" size="md">
            Add
          </Button>
        </Group>
      </form>
    </Modal>
  );
}
