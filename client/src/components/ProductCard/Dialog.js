import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import MuiDialogContent from '@material-ui/core/DialogContent';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography'; 
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import './ProductCard.css';
import ArrowForwardRoundedIcon from '@material-ui/icons/ArrowForwardRounded';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';

function DialogComp ({ open, setOpen, product }) {
    const useStyles = makeStyles((theme) => ({
        root: {
            boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
            height: 500,
            width: 550,
            marginleft: 400
        },
        button: {
            marginRight: 10,
            marginTop: 5
        },
        title:{
            fontWeight: 500
        },
        closeButton: {
            position: 'absolute',
            right: theme.spacing(1),
            top: theme.spacing(1),
            color: theme.palette.grey[500]
        }
    }));

    const classes = useStyles();

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <Dialog   onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} >
           <MuiDialogContent className={classes.root} >       
                   <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
                    <CloseIcon/>
                    </IconButton>
                    <MuiDialogTitle id="customized-dialog-title" >
                    <Typography variant="h6" className={classes.title} >
                    ¡Producto agregado al carrito!
                    </Typography>
                    </MuiDialogTitle>
                    <div className="productName">
                        <Typography variant="h4">
                            {product.name}
                        </Typography>
                    </div>
                    <div className="productImg">
                    <img src={product.image} alt="imagen de producto" />
                    </div>
                    <div className="buttons">
                    <Button className={classes.button} variant="contained" onClick={handleClose} color="primary">
                     <ArrowBackRoundedIcon/>
                     Seguir comprando
                    </Button>
                    
                    <Link to='/cart'><Button className={classes.button} variant="contained" onClick={handleClose} color="primary">
                     Finalizar compra
                     <ArrowForwardRoundedIcon/>
                    </Button>
                    </Link>
                    </div>
                   
                </MuiDialogContent>
                </Dialog>
    )
}

export default DialogComp;