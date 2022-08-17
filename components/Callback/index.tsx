import { Center, Container, Loader, Text } from "@mantine/core";
import { useRouter } from "next/router";
import React from "react";


export default function CallbackBody() {
    const router = useRouter();

    React.useEffect(() => {
        setTimeout(() => {
            router.push("/");
        }, 5000);
    } , []);

    return (
        <Container m="lg">
            <Center>
                <Loader mr="md" />
                <Text align="center" size="lg">
                    Please wait...
                </Text>
            </Center>
        </Container>
    );
}