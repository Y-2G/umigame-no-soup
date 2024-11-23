import { useAuth } from "#/src/hooks/useAuth";
import { Flex, Box } from "@chakra-ui/react";
import { Avatar } from "../../ui/avatar";

type Props = {
  text: string;
  from?: string;
};

export const ChatMessage = ({ from, text }: Props) => {
  const { user } = useAuth()
  const isFromComputer =  from === "computer"

  if(isFromComputer) {
    return (
      <Flex
        gap={2}
        px={10}
      >
        <Avatar name={from} src={`${process.env.NEXT_PUBLIC_AVATAR_BASE_URL}/chatgpt.svg`} variant="outline" />
        <Box
          px={4}
          py={2}
          borderRadius={12}
          borderTopLeftRadius={0}
          backgroundColor="gray.100"
        >
          {text}
        </Box>
      </Flex>
    )
  }
  return (

    <Flex
      gap={2}
      px={10}
      direction="row-reverse"
    >
      <Avatar name={from} src={user?.photoURL ?? ''} />
      <Box
        px={4}
        py={2}
        maxW="50%"
        borderRadius={12}
        borderTopRightRadius={0}
        backgroundColor="gray.100"
      >
        {text}
      </Box>
    </Flex>
  );
};
