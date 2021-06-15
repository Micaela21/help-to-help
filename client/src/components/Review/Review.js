import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { makeStyles, CardContent, Card, Typography, Grid, Paper } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import { useDispatch } from 'react-redux';
import axios from 'axios';


const useStyles = makeStyles( ({
    root: {minWidth: 275},
    title: {fontSize: 18},
    pos: {marginBottom: 12},
    body2: {fontWeight: 500},
    h3: {fontWeight: 500}
}));

const Review = ({review}) => {
  const classes = useStyles();
  
  const [value, setValue] = useState();
  //const dispatch = useDispatch()
  

  return (
    <Card className={classes.root} className={classes.pos} variant="outlined" >
        <CardContent>
            <Rating 
                name="read-only"
                value={review?.value}
                /*onChange={(event, newValue)=> {
                    setValue(newValue);
                }}*/
                readOnly
                />
            <Typography className={classes.title} color="textSecondary" gutterBottom>
                {review?.date}
            </Typography>
            <Typography variant={classes.h3} component="h3">
                {review?.title}
            </Typography>
            <Typography className={classes.title}>
               {review?.description}
                <br />
            </Typography>
            <Typography variant={classes.body2} color="textSecondary">
                ---
            </Typography>
        </CardContent>
    </Card>
  )
};

export default Review;