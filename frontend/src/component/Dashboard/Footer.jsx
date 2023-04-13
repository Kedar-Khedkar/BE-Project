
import { createStyles, Text, Container, ActionIcon, Group } from '@mantine/core';
const useStyles = createStyles((theme) => ({
  footer: {
    marginTop: 12,
    paddingTop: theme.spacing.xl * 2,
    paddingBottom: theme.spacing.xl ,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    borderTop: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },

  logo: {
    maxWidth: 200,

    [theme.fn.smallerThan('sm')]: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
  },

  description: {
    marginTop: 2,

    [theme.fn.smallerThan('sm')]: {
      marginTop: theme.spacing.xs,
      textAlign: 'center',
    },
  },

  inner: {
    display: 'flex',
    justifyContent: 'space-around',

    [theme.fn.smallerThan('sm')]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },

  groups: {
    display: 'flex',
    flexWrap: 'wrap',

    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  wrapper: {
    width: 160,
  },

  link: {
    display: 'block',
    // color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[6],
    fontSize: theme.fontSizes.sm,
    paddingTop: 3,
    paddingBottom: 3,

    '&:hover': {
      textDecoration: 'underline',
    },
  },

  title: {
    fontSize: theme.fontSizes.lg,
    fontWeight: 700,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    marginBottom: theme.spacing.xs / 2,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
  },

  afterFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: theme.spacing.xl,
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
    borderTop: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
    }`,

    [theme.fn.smallerThan('sm')]: {
      flexDirection: 'column',
    },
  },

  social: {
    [theme.fn.smallerThan('sm')]: {
      marginTop: theme.spacing.xs,
    },
  },
}));


const val =
  {
    "data": [
      {
        "title": "User",
        "links": [
          {
            "label": "Create Users",
            "link": "http://localhost:3000/user-mgmt/1"
          },
          {
            "label": "Manage Student",
            "link": "http://localhost:3000/user-mgmt/3"
          },
          {
            "label": "Manage Faculty",
            "link": "http://localhost:3000/user-mgmt/2"
          },
          
          
        ]
      },
      {
        "title": "Attendance",
        "links": [
          {
            "label": "Attedance Dashboard",
            "link": "/attend-mgmt/1"
          },
          {
            "label": "Mark attendance",
            "link": "/attend-mgmt/2"
          },
          {
            "label": "Edit Attendance",
            "link": "/attend-mgmt/3"
          },
          {
            "label": "Report Generation",
            "link": "/attend-mgmt/4"
          }
        ]
      },
      {
        "title": "Subjects",
        "links": [
          {
            "label": " Create Subject",
            "link": "/subject-mgmt/1"
          },
          {
            "label": "Edit Subject",
            "link": "/attend-mgmt/2"
          },
          {
            "label": "Claim/Unclaim Subject",
            "link": "/attend-mgmt/3"
          },
         
        ]
      },
      {
        "title": "Marks",
        "links": [
          {
            "label": " Unit test",
            "link": "/marks-mgmt/1"
          },
          {
            "label": "Insem",
            "link": "/marks-mgmt/2"
          },
          {
            "label": "Extract marks",
            "link": "/marks-mgmt/3"
          },
         
        ]
      },
      {
        "title": "Miscellanous",
        "links": [
          {
            "label": " Student promotion",
            "link": "/miscellanous-mgmt/1"
          },
          {
            "label": "Notification",
            "link": "/miscellanous-mgmt/2"
          },
          {
            "label": "Map seat number",
            "link": "/miscellanous-mgmt/3"
          },
          {
            "label": "Roll number management",
            "link": "/miscellanous-mgmt/4"
          },
         
        ]
      },
    ]
  }




export default function Footer({ data }) {
  const { classes } = useStyles();

  const groups = val.data.map((group) => {
    const links = group.links.map((link, index) => (
      <Text
        key={index}
        className={classes.link}
        component="a"
        href={link.link}

        // onClick={(event) => event.preventDefault()}
      >
        {link.label}
      </Text>
    ));
      
    return (
      <div className={classes.wrapper} key={group.title}>
        <Text className={classes.title}>{group.title}</Text>
        {links}
      </div>
    );
  });

  return (
    <footer className={classes.footer}>
      <Container className={classes.inner}>
        <div className={classes.logo}/>
         
        
        <div className={classes.groups}>{groups}</div>
      </Container>
      <Container className={classes.afterFooter}>
      <Text color="dimmed" size="sm">
          © 2023 DDMS. All rights reserved.
        </Text>

      
      </Container>
    </footer>
  );
}
