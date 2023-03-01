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
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconArrowRight,
  IconSearch,
  IconSettings,
  IconLogout,
} from "@tabler/icons-react";

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

interface HeaderActionProps {
  links: {
    link: string,
    label: string,
    links: { link: string, label: string }[],
  }[];
}

export default function HeaderAction({ links }: HeaderActionProps) {
  const { classes } = useStyles();
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <Header height={HEADER_HEIGHT} mb={60}>
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
                    BH
                  </Avatar>
                  <div>
                    <Text>Bob Handsome</Text>
                    <Text size="xs" color="dimmed">
                      bob@handsome.inc
                    </Text>
                  </div>
                </Group>
              </UnstyledButton>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Label>Application</Menu.Label>
              <Menu.Item icon={<IconSettings size={14} />}>Settings</Menu.Item>

              <Menu.Item color="red" icon={<IconLogout size={14} />}>
                Logout
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Container>
    </Header>
  );
}
