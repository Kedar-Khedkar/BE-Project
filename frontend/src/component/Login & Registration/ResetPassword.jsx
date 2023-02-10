import {
  createStyles,
  Paper,
  Title,
  Text,
  TextInput,
  Button,
  Container,
  Group,
  Anchor,
  Center,
  Box,
} from '@mantine/core';
//import { IconArrowLeft } from '@tabler/icons';

const useStyles = createStyles((theme) => ({
  title: {
    fontSize: 26,
    fontWeight: 900,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  controls: {
    [theme.fn.smallerThan('xs')]: {
      flexDirection: 'column-reverse',
    },
  },

  control: {
    [theme.fn.smallerThan('xs')]: {
      width: '100%',
      textAlign: 'center',
    },
  },
}));

export function ResetPassword() {
  const { classes } = useStyles();

  return (
    <Container size={460} my={30}>
      <Title className={classes.title} align="center">
        Reset Password
      </Title>
      <Text color="dimmed" size="sm" align="center">
        Enter new password
      </Text>

      <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
        <TextInput label="New Password" placeholder="Enter new password" required />
        <TextInput mt="sm" label="Confirm New Password" placeholder="Enter new password again" required />
        <Group position="apart" mt="lg" className={classes.controls}>
          <Anchor color="dimmed" size="sm" className={classes.control}>
            <Center inline>
              {/* <IconArrowLeft size={12} stroke={1.5} /> */}
              {/* <Box ml={5}>Back to login page</Box> */}
            </Center>
          </Anchor>
          <Button className={classes.control}>Reset password</Button>
        </Group>
      </Paper>
    </Container>
  );
}