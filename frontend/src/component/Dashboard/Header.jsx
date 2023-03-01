import {
  createStyles,
  Avatar,
  Menu,
  ActionIcon,
  Header,
  Container,
  Group,
  UnstyledButton,
  Burger,
  Text,
  TextInput,
  Anchor,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconArrowRight,
  IconSearch,
  IconSettings,
  IconCheck,
  IconX,
  IconLogout,
} from "@tabler/icons-react";
import axios from "axios";
import { showNotification } from "@mantine/notifications";
import { redirect } from "react-router-dom";

const HEADER_HEIGHT = 60;

const useStyles = createStyles((theme) => ({
  inner: {
    height: HEADER_HEIGHT,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  links: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  burger: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: "8px 12px",
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  linkLabel: {
    marginRight: 5,
  },
}));

export default function HeaderAction({ links }) {
  const { classes } = useStyles();
  const [opened, { toggle }] = useDisclosure(false);

  let user = JSON.parse(localStorage.getItem("user"));
  const logout = () => {
    axios
      .post("http://localhost:5000/users/logout", null, {
        withCredentials: true,
      })
      .then((res) => {
        localStorage.removeItem("user");
        user = undefined;
        showNotification({
          title: "Logged off successfully",
          message: "Bye bye!",
          icon: <IconCheck />,
          color: "teal",
          autoClose: 4000,
          radius: "xl",
        });
      })
      .catch((err) => {
        showNotification({
          title: "Something went wrong",
          message: "contact support, and promptly change your password",
          icon: <IconX />,
          color: "red",
          autoClose: 4000,
          radius: "xl",
        });
      });
  };

  return (
    <Header height={HEADER_HEIGHT} >
      <Container className={classes.inner} fluid>
        <Group>
          <Burger
            opened={opened}
            onClick={toggle}
            className={classes.burger}
            size="sm"
          />
          <Text fz="xl" fw={700}>
            DDMS
          </Text>
        </Group>
        {user && (
          <Group spacing={5} className={classes.links}>
            <TextInput
              radius="xl"
              size="md"
              icon={<IconSearch size={18} stroke={1.5} />}
              rightSection={
                <ActionIcon size={32} radius="xl" color="blue" variant="filled">
                  <IconArrowRight size={18} stroke={1.5} />{" "}
                </ActionIcon>
              }
            />
          </Group>
        )}
        {user && (
          <Group spacing={4}>
            <Menu
              shadow="md"
              width={200}
              trigger="hover"
              openDelay={100}
              closeDelay={400}
            >
              <Menu.Target>
                <UnstyledButton>
                  <Group>
                    <Avatar size={40} color="blue">
                      {user.fullname.split(" ")[0][0] +
                        user.fullname.split(" ")[1][0]}
                    </Avatar>
                    <div>
                      <Text>{user.fullname}</Text>
                      <Text size="xs" color="dimmed">
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </Text>
                    </div>
                  </Group>
                </UnstyledButton>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Label>Department data management system</Menu.Label>
                <Anchor href="/my-account">
                  <Menu.Item icon={<IconSettings size={14} />}>
                    Settings
                  </Menu.Item>
                </Anchor>

                <Menu.Item
                  color="red"
                  icon={<IconLogout size={14} />}
                  onClick={logout}
                >
                  Logout
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        )}
      </Container>
    </Header>
  );
}
