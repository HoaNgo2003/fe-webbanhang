import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Fragment } from 'react'
import {Typography,Button, Grid,MenuItem, Select,TextField,InputLabel, FormControl} from '@mui/material'
import { createProduct, findProductsById, updateProduct } from '../../State/Product/Action'
import { useParams } from 'react-router-dom'
import { store } from '../../State/Store'
 
const UpdateProductForm = () => {
  const {id} = useParams();
  const products = useSelector(store=>store);
  const [product, setProductData] = useState({
    imageUrl: "",
    brand:"",
    title:"",
    danhmuc:"",
    price:"",
    quanity:"",
    discount:"",
    description:""
  })
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  useEffect(()=>{
    const req = {productId: id}
    console.log(req)
   dispatch(findProductsById(req));
   
  
  },[])
  useEffect(()=>{
    setProductData(products.product.product);

  },[products.product.product])
  
  const handleChange = (e)=>{
    const {name, value} = e.target;
    setProductData((prevData)=>({
      ...prevData,
      [name]:value,
    }))
    
  }
  
  const handleSubmit = (e)=>{
    e.preventDefault();
    console.log(product)
    // dispatch(createProduct(product))
    dispatch(updateProduct(product, id))
    // console.log(product)
    console.log(id)
  }
  return (
    <div className='p-10'>
      <Fragment >
        <Typography
        variant='h4'
        sx={{textAlign:'center'}}
        className='py-10 text-center'
        >
          Update san pham
        </Typography>
        <form
        onSubmit={handleSubmit}
        className='min-h-screen'
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
              fullWidth
              label="Image URL"
              name="imageUrl"
            
              value={product?.imageUrl}
              onChange={handleChange}
              />

               
            </Grid>
             
            <Grid item xs={12} sm={6}>
              <TextField
              fullWidth
              label="Brand"
              name="brand"
              value={product?.brand}
              onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
              fullWidth
              label="Title"
              name="title"
              value={product?.title}
              onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
              fullWidth
              label="Price"
              name="price"
              value={product?.price}
              onChange={handleChange}
              type='number'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
              fullWidth
              label="Discount"
              name="discount"
              value={product?.discount}
              onChange={handleChange}
              type='number'
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <FormControl fullWidth>
              <InputLabel>Danh muc san pham</InputLabel>
              <Select
              name='danhmuc'
              value={product?.danhmuc}
              onChange={handleChange}
              label="Danh Muc San pham"
              >
                <MenuItem value="truyenngan">Truyen Ngan</MenuItem>
                <MenuItem value="truyendai">Truyen Dai</MenuItem>
                <MenuItem value="truyenthieunhi">Truyen Thieu Nhi</MenuItem>
              </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
              fullWidth
              label="Quanity"
              name="quanity"
              value={product?.quanity}
              onChange={handleChange}
              type='number'
              />
              </Grid>
            <Grid item xs={12} >
              <TextField
              fullWidth
              id='outlined-multiline-static'
              label="Description"
              multiline
              name="description"
              value={product?.description}
              onChange={handleChange}
              row={3}
               
              />
            </Grid>
           <Grid item xs={12}>
            <Button variant='contained'
            sx={{p:1.8}}
            className='py-20'
            size='large'
            type='submit'
            >
              Update san pham
            </Button>
           </Grid>
          </Grid>
        </form>
      </Fragment>
    </div>
  )
}

export default UpdateProductForm
