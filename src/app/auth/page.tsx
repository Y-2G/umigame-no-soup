"use client";

import { useAuth } from "@/hooks/useAuth";
import { Box, Button, Flex, Stack, Text } from "@chakra-ui/react";

export default function Auth() {
  const { handleAnonymousLogin } = useAuth();
  return (
    <Flex
      h="100%"
      justifyContent="center"
      alignItems="center"
      background="gray.100"
    >
      <Box
        w={500}
        p={10}
        rounded="md"
        background="white"
        borderStyle="solid"
        borderWidth={1}
        borderColor="gray.200"
        justifyContent="center"
        alignItems="center"
      >
        <Stack textAlign="center">
          <Text>匿名でログインできます</Text>
          <Button onClick={handleAnonymousLogin}>Sign in Anonymously</Button>
        </Stack>
      </Box>
    </Flex>
  );
}
