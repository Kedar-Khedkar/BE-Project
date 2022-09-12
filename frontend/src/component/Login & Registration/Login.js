// import * as React from "react";
// import {
//   Typography,
//   Box,
//   Grid,
//   Card,
//   CardContent,
//   Button,
//   TextField,
//   Container,
//   Link,
//   Tabs,
//   Tab,
//   InputAdornment,
//   InputLabel,
//   OutlinedInput,
//   FormControl,
//   IconButton,
// } from "@mui/material";
// import Visibility from "@mui/icons-material/Visibility";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";
// import { makeStyles } from "@mui/styles";
// import pattern from "../../assets/Images/ttten.svg";
// import loginImg from "../../assets/Images/Login-pana.svg";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";


// const useStyles = makeStyles((theme) => ({

//   section:{
//     height: "100vh",
//     backgroundImage: `url(${pattern})`,
//     backgroundSize: "cover",
//   },
//   image:{
//     [theme.breakpoints.down("md")]: {
//       display: "none",
//     },
//   }
// }));
// export default function Form(props) {

//   const classes = useStyles();

//   const [value, setValue] = React.useState("one");
//   const handleTabChange = (event, newValue) => {
//     setValue(newValue);
//   };
//   const [values, setValues] = React.useState({
//     password: "",
//     showPassword: false,
//   });

//   const handleChange = (prop) => (event) => {
//     setValues({ ...values, [prop]: event.target.value });
//   };

//   const handleClickShowPassword = () => {
//     setValues({
//       ...values,
//       showPassword: !values.showPassword,
//     });
//   };

//   const handleMouseDownPassword = (event) => {
//     event.preventDefault();
//   };
//   return (
//     <>
//       <div className={classes.section}>
//         <Container maxWidth="md">
//           <Box py={9}>
//             <Card variant="outlined" sx={{ mt: "40px" }}>
//               <Grid container>
//                 <Grid item md={7} className={classes.image}>
//                   <img  src={loginImg} alt="Login Illustration" />
//                 </Grid>
//                 <Grid item xs={12} md={5}>
//                   <CardContent>
//                     <Grid item xs={12} md={9}>
//                       <Tabs
//                         value={value}
//                         onChange={handleTabChange}
//                         textColor="secondary"
//                         indicatorColor="secondary"
//                         aria-label="secondary tabs example"
//                         centered
//                       >
//                         <Tab value="one" label="Faculty" />
//                         <Tab value="two" label="Student" />
//                       </Tabs>
//                     </Grid>

//                     <Box  mt={3}>
//                       <Grid container spacing={2}>
//                         <Grid item xs={12} md={12}>
//                           <FormControl variant="outlined">
//                             <TextField
//                               id="input-textfield"
//                               label="Email address"
//                               required
                              
//                               color="secondary"
//                               InputProps={{
//                                 endAdornment: (
//                                   <InputAdornment position="end">
//                                     <AccountCircleIcon />
//                                   </InputAdornment>
//                                 ),
//                               }}
//                             />
//                           </FormControl>
//                         </Grid>
//                         <Grid item xs={12} md={12}>
//                           <FormControl
//                             color="secondary"
//                             variant="outlined"
//                             required

//                           >
//                             <InputLabel htmlFor="outlined-adornment-password">
//                               Password
//                             </InputLabel>
//                             <OutlinedInput
                             
//                               id="outlined-adornment-password"
//                               type={values.showPassword ? "text" : "password"}
//                               value={values.password}
//                               onChange={handleChange("password")}
//                               endAdornment={
//                                 <InputAdornment position="end">
//                                   <IconButton
//                                     aria-label="toggle password visibility"
//                                     onClick={handleClickShowPassword}
//                                     onMouseDown={handleMouseDownPassword}
//                                     edge="end"
//                                   >
//                                     {values.showPassword ? (
//                                       <VisibilityOff />
//                                     ) : (
//                                       <Visibility />
//                                     )}
//                                   </IconButton>
//                                 </InputAdornment>
//                               }
//                               label="Password"
//                             />
//                           </FormControl>
//                         </Grid>
//                         <Grid item xs={6}>
//                           <Link href="#" color="textSecondary">
//                             Forgot password ?
//                           </Link>
//                         </Grid>
//                         <Grid item xs={6}>
//                           <Button
//                             type="submit"
//                             variant="contained"
//                             color="primary"
//                             px={4}
//                           >
//                             Sign-in
//                           </Button>
//                         </Grid>
//                       </Grid>
//                     </Box>
//                   </CardContent>
//                 </Grid>
//               </Grid>
//             </Card>
//           </Box>
//         </Container>
//       </div>
//     </>
//   );
// }
import * as React from "react";
import {
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  Container,
  Link,Tabs ,Tab
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import pattern from "../../assets/Images/ttten.svg";
import loginImg from "../../assets/Images/Login-pana.svg";
const useStyles = makeStyles((theme) => ({
  section: {
    height: "100vh",
    backgroundImage: `url(${pattern})`,
    backgroundSize: "cover",
  },
  image:{
    [theme.breakpoints.down("md")]: {
        display: "none",
      },
  },
  iconWrapper: {
    color: theme.palette.primary.main,
  },
  actions: {
    [theme.breakpoints.up("sm")]: {
      display: "flex",
    },
  },
  primaryAction: {
    width: "100%",
    marginTop: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      marginTop: theme.spacing(0),
      width: "auto",
    },
},

}));
export default function Form(props) {
  const classes = useStyles();

  const content = {
    header: "Lorem ipsum dolor sit amet",
    description:
      "Suspendisse aliquam tellus ante, porttitor mattis diam eleifend quis.",
    "primary-action": "Sign in",
    "secondary-action": "Forgot password?",
    ...props.content,
  };
  const [value, setValue] = React.useState('one');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <section className={classes.section}>
        <Container maxWidth="md" >
          <Box py={9}>
            <Card variant="outlined" sx={{mt:'40px'}}>
              <Grid container spacing={2} >
                <Grid item xs={6}>
                  <img className={classes.image} src={loginImg} alt="Login Illustration"  height={'460px'}/>
                </Grid>
                <Grid item md={6}>
                  <CardContent>
                  <Tabs
                            value={value}
                            onChange={handleChange}
                            textColor="secondary"
                            indicatorColor="secondary"
                            aria-label="secondary tabs example"
                            centered
                            >
                            <Tab value="one" label="Faculty" />
                            <Tab value="two" label="Student" />
                           
                            </Tabs>
                    <Box mt={2} px={2}>
                      <Typography
                        variant="h5"
                        component="h3"
                        align="center"
                        gutterBottom={true}
                      >
                        {content["header"]}
                      </Typography>
                      <Typography
                        variant="body2"
                        component="p"
                        color="textSecondary"
                        align="center"
                      >
                        {content["description"]}
                      </Typography>
                      <Box my={3}>
                        <form noValidate>
                          <Grid container spacing={2}>
                            <Grid item xs={12}>
                              <TextField
                                variant="outlined"
                                required
                                color="secondary"
                                fullWidth
                                size="small"
                                name="email"
                                label="E-mail address"
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <TextField
                                variant="outlined"
                                required
                                fullWidth
                                color="secondary"
                                size="small"
                                type="password"
                                name="password"
                                label="Password"
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <Box
                                alignItems="center"
                                justifyContent="space-between"
                                className={classes.actions}
                              >
                                <Link href="#" color="textSecondary">
                                  {content["secondary-action"]}
                                </Link>
                                
                                <Button
                                  type="submit"
                                  variant="contained"
                                  color="primary"
                                  size="large"
                                  className={classes.primaryAction}
                                >
                                  {content["primary-action"]}
                                </Button>
                              </Box>
                            </Grid>
                          </Grid>
                        </form>
                      </Box>
                    </Box>
                  </CardContent>
                </Grid>
              </Grid>
            </Card>
          </Box>
        </Container>
      </section>
    </>
  );
}
