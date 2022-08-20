import {
  Group,
  Modal,
  Textarea,
  Button,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { Auth } from "@supabase/ui";
import axios from "axios";
import { useSupabaseClient } from "lib/supabase";
import { useMutation, useQueryClient } from "react-query";
interface CreateVestaProps {
  onClose: () => void;
  opened: boolean;
}

export default function CreateVesta({ onClose, opened }: CreateVestaProps) {
  const { user } = Auth.useUser()
  const supabase = useSupabaseClient()

  const client = useQueryClient()

  const form = useForm({
    initialValues: {
      note: "",
    },
  });
  const onSubmit = async (values: any) => {
    const response = await supabase.functions.invoke("parser", {
      body: JSON.stringify({ url:  values.note }),
      headers: {
        "Content-Type": "application/json",
      }
    })
    console.log(response)
    // await axios.post("/api/keep/add", values, {
    //   headers: {
    //     user_id: user!.id,
    //   }
    // })
  }

  const { mutate: createVesta, isLoading } = useMutation(onSubmit, {
    onSuccess: () => {
      client.refetchQueries("fetchInbox")
      onClose();
      form.reset();
    },
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
