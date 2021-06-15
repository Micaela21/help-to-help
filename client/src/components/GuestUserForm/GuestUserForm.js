import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../Actions/Actions";
import './GuestUserForm.css'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

 const GuestUserForm = () => {

  const dispatch = useDispatch()
  const products = useSelector(store => store.getAllProducts)
  const [userValues,  setUserValues] = useState({
    email:"",
    firstName:"",
    lastName:"",
});
const classes = useStyles();

const handleInputChange = (e)=>{
  e.preventDefault();
      setUserValues({
    ...userValues,
    [e.target.name] : e.target.value
  })

}

useEffect(() => {
  dispatch(getProducts())
},[])

var carrito = Object.keys(JSON.parse(localStorage.getItem('cart'))).map(id => parseInt(id))
var newProducts = []
carrito.forEach(id => {
  products.map(obj => {
    if(obj.id === id){
      newProducts.push(obj)
    }
  })
})

const handleSubmit = (e)=>{
  e.preventDefault();
  var body = userValues
  var user;
  axios({
    method: "POST",
    url: "http://localhost:3001/users",
    data: body
  })
    .then(async response => {
      user = response.data.id
      localStorage.setItem('user', JSON.stringify(user))
      for(var i = 0; i < newProducts.length; i++){
        var cant = Object.values(JSON.parse(localStorage.getItem('cart'))).map(id => parseInt(id))
        await axios({
          method: "POST",
          url: `http://localhost:3001/users/${user}/cart`,
          data: {
            productId: newProducts[i].id,
            quantity: cant[i],
            price: newProducts[i].price
          }
        })
      }
    })
    .then(response => {
      localStorage.removeItem('cart')
    })
}

return(
    <div className={'containerF'}>
        <form onSubmit={handleSubmit} className={classes.root} noValidate>
          <div className='obj'>
          <TextField required id="outlined-required" label="Nombre" variant="outlined" 
           type="text" name="firstName" value={userValues.firstName} onChange={handleInputChange}/>
          <TextField required id="outlined-required" label="Apellido" variant="outlined" 
           type="text" name="firstName" value={userValues.lastName} onChange={handleInputChange}/>
          <TextField required id="outlined-required" label="Email" variant="outlined" 
           type="text" name="firstName" value={userValues.email} onChange={handleInputChange}/>
        </div>
        <div className='obj'>
            <span>Metodo de Pago</span>
        </div>
        <div className='obj'>
        <Button variant="contained" disableElevation type='submit'>
          Finalizar la Compra
        </Button>
        </div>
        </form>
    </div>
)
}
export default GuestUserForm;






