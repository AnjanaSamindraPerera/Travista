import React, { Component } from "react";
import Pic from "../images/Pic.jpg";
import { Link } from "react-router-dom";
import axios from "axios";

//material ui
import withStyles from "@material-ui/core/styles/withStyles";
//import clsx from 'clsx';
//import { makeStyles } from '@material-ui/core/styles';
//import MenuItem from '@material-ui/core/MenuItem';
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
//bring grid
import Grid from "@material-ui/core/Grid";

const styles = {
  //classes.these atributes

  form: {
    textAlign: "center"
  },
  pageTittle: {
    // color:'#43a047',
    margin: "20px auto 20px auto"
  },
  image: {
    margin: "20px auto 20px auto"
  },
  textField: {
    margin: "10px auto 10px auto"
  },
  button: {
    marginTop: 20,
    position: "relative"
  },
  customError: {
    color: "red",
    fontSize: "0.8rem",
    marginTop: 10
  },
  progress: {
    position: "absolute"
  },
  formControl: {
    marginTop: 20,
    // marginBottom:100,
    minWidth: 120,
    maxWidth: 300
  }
};

class signup extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      handle: "", //name
      loading: false,
      category: "",
      errors: {}
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    this.setState({
      loading: true
    });

    const newUserData = {
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      handle: this.state.handle,
      category: this.state.category
    };

    axios
      .post("http://localhost:5000/user/signup", newUserData)
      .then(res => {
        console.log(res.data);
        localStorage.setItem("FBIdToken", `Bearer ${res.data.token}`); //when we get token res.data we need to store it locally if something happen to connection
        this.setState({
          loading: false
        });
        this.props.history.push("/"); //use in react to push a url and got to that path
      })
      .catch(err => {
        this.setState({
          errors: err.response.data,
          loading: false
        });
      });

    console.log(newUserData);
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    const { classes } = this.props;
    const { errors, loading } = this.state;

    return (
      <Grid container spacing={10} className={classes.form}>
        <Grid item sm>
          <img src={Pic} alt="logo" className={classes.image} />
        </Grid>

        <Grid item sm>
          <Typography variant="h2" className={classes.pageTittle}>
            Signup
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              id="email"
              type="email"
              name="email"
              label="Email"
              className={classes.textField}
              value={this.state.email}
              onChange={this.handleChange}
              helperText={errors.email}
              error={errors.email ? true : false}
              fullWidth
            />

            <TextField
              id="password"
              type="password"
              name="password"
              label="Password"
              className={classes.textField}
              value={this.state.password}
              onChange={this.handleChange}
              helperText={errors.password}
              error={errors.password ? true : false}
              fullWidth
            />

            <TextField
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              label="Confirm Password"
              className={classes.textField}
              value={this.state.confirmPassword}
              onChange={this.handleChange}
              helperText={errors.confirmPassword}
              error={errors.confirmPassword ? true : false}
              fullWidth
            />

            <TextField
              id="handle"
              type="text"
              name="handle"
              label="Name"
              className={classes.textField}
              value={this.state.handle}
              onChange={this.handleChange}
              helperText={errors.handle}
              error={errors.handle ? true : false}
              fullWidth
            />

            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="category-simple">category</InputLabel>
              <Select
                value={this.state.category}
                onChange={this.handleChange}
                inputProps={{
                  name: "category",
                  id: "category-simple"
                }}
              >
                <MenuItem value={1}>Hotel</MenuItem>
                <MenuItem value={2}>Driver</MenuItem>
                <MenuItem value={3}>Other</MenuItem>
              </Select>
            </FormControl>

            <br />
            {errors.general && (
              <Typography variant="body2" className={classes.customError}>
                {errors.general}
              </Typography>
            )}

            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
              disabled={loading}
            >
              Signup
              {loading && (
                <CircularProgress size={30} className={classes.progress} />
              )}
            </Button>
            <br />
            <small>
              Already have an account ?login <Link to="/login">here</Link>
            </small>
          </form>
        </Grid>
      </Grid>
    );
  }
}

signup.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(signup);
