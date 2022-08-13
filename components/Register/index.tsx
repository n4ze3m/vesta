import React from "react";
import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Button,
} from "@mantine/core";
import Link from "next/link";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import { useMutation } from "react-query";
import { useRouter } from "next/router";
import { useLocalStorage } from "@mantine/hooks";

type RegisterProps = {
  name: string;
  email: string;
  password: string;
};

export default function RegisterBody() {
  const router = useRouter();

  const onRegister = async (values: RegisterProps) => {
    const response = await axios.post("/api/register", values);
    return response.data;
  };

  const [_, setUserId]  = useLocalStorage({
    key: "userId",
  });

  const { mutate: register, isLoading } = useMutation(onRegister, {
    onSuccess: ({id}) => {
      showNotification({
        message: "Welcome to Keeppt",
        color: "green",
        title: "Success",
      });
      setUserId(id);
      router.push("/");
    },
    onError: (e: any) => {
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
    },
  });

  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validate: {
      email: (value: string) =>
        /^\S+@\S+$/.test(value) ? null : "Invalid email",
      password: (value: string) =>
        value.length > 8 ? null : "Password too short",
    },
  });

  return (
    <Container size={420} my={40}>
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Join Keeppt
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Already have an account?{" "}
        <Link href="/login">
          <Anchor<"a"> href="/login">Login</Anchor>
        </Link>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit(async (values) => register(values))}>
          <TextInput
            {...form.getInputProps("name")}
            label="Name"
            placeholder="Your name"
            required
          />
          <TextInput
            {...form.getInputProps("email")}
            label="Email"
            placeholder="you@example.com"
            required
          />
          <PasswordInput
            label="Password"
            {...form.getInputProps("password")}
            placeholder="Your password"
            required
            mt="md"
          />
          {/* <Group position="apart" mt="md">
                <Checkbox label="Remember me" />
                <Anchor<'a'> onClick={(event) => event.preventDefault()} href="#" size="sm">
                  Forgot password?
                </Anchor>
              </Group> */}
          <Button
            loading={isLoading}
            type="submit"
            color="teal"
            fullWidth
            mt="xl"
            size="md"
          >
            Register
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
