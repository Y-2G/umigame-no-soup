import { useAuth } from "@/hooks/useAuth";
import { Box, Button, Center, Stack, Text } from "@chakra-ui/react";

export default function Auth() {
  const { handleAnonymousLogin } = useAuth();
  return (
    <Center h="full" p={10} background="gray.100">
      <Box
        w={350}
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
          <Text>匿名ログイン</Text>
          <Button onClick={handleAnonymousLogin}>Sign in Anonymously</Button>
        </Stack>
      </Box>
    </Center>
  );
}
