import React from "react";
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from "@mantine/core";
import Link from "next/link";
import axios from "axios";
import { useForm } from "@mantine/form";
import { useMutation } from "react-query";
import { showNotification } from "@mantine/notifications";
import { useRouter } from "next/router";
import { useLocalStorage } from "@mantine/hooks";

type LoginProps = {
  email: string;
  password: string;
};

export default function LoginBody() {
  const router = useRouter();

  const [_, setUserId]  = useLocalStorage({
    key: "userId",
  });

  const onLogin = async (values: LoginProps) => {
    const response = await axios.post("/api/login", values);
    return response.data;
  };

  const { mutate: login, isLoading } = useMutation(onLogin, {
    onSuccess: ({ id }) => {
      showNotification({
        message: "Welcome back!",
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
      email: "",
      password: "",
    },
    validate: {
      email: (value: string) =>
        /^\S+@\S+$/.test(value) ? null : "Invalid email",
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
        Login to Keeppt
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Do not have an account yet?{" "}
        <Link href="/register">
          <Anchor<"a"> href="/register">Create account</Anchor>
        </Link>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit(async (values) => login(values))}>
          <TextInput
            {...form.getInputProps("email")}
            label="Email"
            placeholder="you@example.com"
            required
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            mt="md"
            {...form.getInputProps("password")}
          />
          <Button
            loading={isLoading}
            type="submit"
            color="teal"
            fullWidth
            mt="xl"
            size="md"
          >
            Login
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
