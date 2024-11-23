import { Field } from "#/src/components/ui/field";
import { useAuth } from "@/hooks/useAuth";
import {
  Box,
  Button,
  Center,
  HStack,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Avatar } from "@/components/ui/avatar";
import { RadioCardItem, RadioCardRoot } from "#/src/components/ui/radio-card";

const avatarImgFiles = [
  {file: 'preview1.svg', value: '1'},
  {file: 'preview2.svg', value: '2'},
  {file: 'preview3.svg', value: '3'},
  {file: 'preview4.svg', value: '4'},
]

export default function Auth() {
  const { methods, handleAnonymousLogin } = useAuth();
  const { register, handleSubmit } = methods;
  
  return (
    <Center h="full" p={10} background="gray.100" >
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
          <DialogRoot placement="center">
            <DialogTrigger asChild>
              <Button>Anonymous Login</Button>
            </DialogTrigger>
              <DialogContent>
                <form onSubmit={handleSubmit(handleAnonymousLogin)}>
                  <DialogHeader>
                    <DialogTitle>User Setting</DialogTitle>
                  </DialogHeader>
                  <DialogBody pb="4">
                    <Stack gap="4">
                      <Field label="Display Name">
                        <Input
                          {...register("displayName")}
                          placeholder="Display Name"
                        />
                      </Field>
                      <Field label="Avatar">
                        <RadioCardRoot gap="4" maxW="sm">
                          <HStack align="stretch" >
                            {avatarImgFiles.map(({file, value}, index) => {
                              const photoURL = `${process.env.NEXT_PUBLIC_AVATAR_BASE_URL}/${file}`
                              return (
                              <RadioCardItem
                                {...register("photoURL")}
                                key={index}
                                value={value}
                                icon={
                                  <Avatar key={index} src={photoURL}></Avatar>
                                }
                                indicator={<></>}
                                onChange={() => methods.setValue("photoURL", photoURL)}
                              />
                            )})}
                          </HStack>
                        </RadioCardRoot>
                      </Field>
                    </Stack>
                  </DialogBody>
                  <DialogFooter>
                    <DialogActionTrigger>
                      <Button type="submit">Log in</Button>
                    </DialogActionTrigger>
                  </DialogFooter>
              </form>
            </DialogContent>
          </DialogRoot>
        </Stack>
      </Box>
    </Center>
  );
}
