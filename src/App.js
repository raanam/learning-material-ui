import React from 'react';
import './App.css';
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import MenuIcon from '@material-ui/icons/Menu';
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from '@material-ui/core/styles';
import { Drawer, List, ListItem, ListItemText, ListItemIcon, Input, Checkbox, FormControl, FormHelperText, Radio, FormGroup, Grid, Paper } from '@material-ui/core';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { useFormik } from 'formik';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    position: "static",
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    marginTop: "60px",
    marginLeft: `calc(${drawerWidth}px + 10px)`
  }
}));


function App() {
  const classes = useStyles();

  const validate = values => {
    const errors = {};

    if (!values.username) {
      errors.username = "Required";
    }

    if (!values.isNewUser || values.isNewUser.checkedA === false) {
      errors.isNewUser = "Required";
    }

    if (!values.gender) {
      errors.gender = "required";
    }

    return errors;
  }

  const SignupForm = () => {

    const formik = useFormik({
      initialValues: {
        username: "aa",
        isNewUser: { checkedA: true },
        simpleCheckbox: true,
        gender: ""
      },
      validate,
      onSubmit: values => {
        alert(JSON.stringify(values, null, 2));
      },
    });

    const log = (errors) => {
      console.log(errors);
    }

    return (
      <form onSubmit={formik.handleSubmit}>
        <Input id="username"
          aria-describedby="my-helper-text"
          onChange={formik.handleChange}
          value={formik.values.username}
          error={formik.touched.username && formik.errors.username} />
        {formik.touched.username && formik.errors.username ? (
          <div>{formik.errors.username}</div>
        ) : null}
        {log(formik.errors)}

        <FormControl error={formik.touched.isNewUser && formik.errors.isNewUser}>
          <Checkbox
            value="true"
            name="isNewUser.checkedA"
            onChange={formik.handleChange}
            checked={formik.values.isNewUser.checkedA} />
          <FormHelperText>You can display an error</FormHelperText>
        </FormControl>

        <FormControl>
          <Checkbox
            value="true"
            name="simpleCheckbox"
            onChange={formik.handleChange}
            checked={formik.values.simpleCheckbox} />
          <FormHelperText>You can display an error</FormHelperText>
        </FormControl>

        <FormControl error={formik.touched.gender && formik.errors.gender}>
          <FormGroup>
            <Radio
              name="gender"
              value="male"
              onChange={formik.handleChange}
              checked={formik.values.gender === "male"}
            />
            <Radio
              name="gender"
              value="female"
              onChange={formik.handleChange}
              checked={formik.values.gender === "female"}
            />
          </FormGroup>
          <FormHelperText>
            Gender is required
          </FormHelperText>
        </FormControl>


        <Button variant="outlined" color="primary" type="submit">
          Primary
          </Button>
      </form>
    );

  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        anchor="left"
        open={true}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      <div className={classes.content}>
        <Grid container> 
            <Grid item xs={12}>
              <Paper className={classes.paper}>xs=12</Paper>
            </Grid>
        </Grid>
        {SignupForm()}
      </div>

    </div>
  );
}

export default App;
