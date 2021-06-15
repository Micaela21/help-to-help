import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createReviews, getUser } from "../../Actions/Actions";
import { Link, useHistory, useLocation } from "react-router-dom";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import {
  Typography,
  TextField,
  Box,
  Card,
  CardContent,
  makeStyles,
  Grid,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { useParams } from "react-router";

const reviewFormStyle = makeStyles({
  root: {
    minWidth: 350,
    maxWidth: 350,
    
  },
  bullet: {
    display: "flex",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 24,
  },
  pos: {
    marginBottom: 12,
  },
});


function ReviewForm() {
  let history = useHistory() 
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  today = dd + '/' + mm + '/' + yyyy;

  
  const dispatch = useDispatch();
  const classes = reviewFormStyle();
  const {id} = useParams()
  const [values, setValues] = useState({
    title: "",
    description: "",
    value: 0,
    date: today,
    
  });
 
  const handleInputChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleReviewSubmit = (e)=>{
    e.preventDefault()
    dispatch(createReviews(id ,values))
    alert("Review agregado al producto");
   history.push(`/productDetail/${id}`)
  }

  const handleReviewSubmit2 = (e)=>{
    e.preventDefault()
    dispatch(createReviews(id ,values))
    alert("Review agregado al producto")
  }

  return (
    <Grid
    container
    spacing={3}
    direction="column"
    alignItems="center"
    justify="center"
    >  
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          Deja tu review!!
        </Typography>
        <Box display="flex" flexDirection="column" justifyContent="center">
          <Rating
            name="value"
            value={values.value}
            onChange={(event, newValue) => {
              handleInputChange(event, newValue);
            }}
          />
          <TextField
            onChange={handleInputChange}
            id="title"
            name="title"
            value={values.title}
            label="Buen producto!"
            className={classes.bullet}
          />
          <TextField
            onChange={handleInputChange}
            id="description"
            name="description"
            value={values.description}
            label="Descripcion"
            multiline
            row={4}
            variant="outlined"
            className={classes.bullet}
          />
        </Box>
      </CardContent>
      <CardActions>
        <Box
          component="div"
          display="flex"
          justifyContent="flex-end"
          flexGrow={1}
        >
          <Button size="small" onClick={handleReviewSubmit} >Submit</Button>
         
        </Box>
      </CardActions>
    </Card>
    </Grid>
  );
}

export default ReviewForm;
