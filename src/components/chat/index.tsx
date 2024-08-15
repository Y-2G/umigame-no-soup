import { Flex, Box } from "@chakra-ui/react";

type Props = {
  from: string;
  value: string;
};

export const Chat = ({ from, value }: Props) => {
  return (
    <Flex gap={2} px={10} direction={from === "p" ? "row-reverse" : undefined}>
      <Flex
        w={10}
        h={10}
        justifyContent="center"
        alignItems="center"
        borderRadius="50%"
        background={from === "p" ? "green.300" : "gray.300"}
      >
        {from}
      </Flex>
      <Box
        px={4}
        py={2}
        w="100%"
        borderRadius={6}
        background={from === "p" ? "green.300" : "gray.300"}
      >
        {value}
      </Box>
    </Flex>
  );
};
