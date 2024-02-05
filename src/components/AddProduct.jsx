import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const AddProductForm = ({categories}) => {
  const initialValues = {
    title: "",
    description: "",
    price: "",
    discountPercentage: "",
    rating: "",
    stock: "",
    brand: "",
    category: "",
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    price: Yup.number().required("Price is required"),
    discountPercentage: Yup.number().required(
      "Discount Percentage is required"
    ),
    rating: Yup.number().required("Rating is required"),
    stock: Yup.number().required("Stock is required"),
    brand: Yup.string().required("Brand is required"),
    category: Yup.string().required("Category is required"),
  });

  const postData = async (values) => {
    try {
      const response = await axios.post('https://dummyjson.com/products/add', values);
      console.log('Response:', response.data);
      alert("Product Added!!!")
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSubmit = async (values, { resetForm }) => {
    console.log(values); 
    await postData(values); 
    resetForm();
  };

  return (
    <div style={{ width: "120vh", height: "83vh" }}>
       <div style={{display:'flex',justifyContent:'space-between'}}>
       <h2>Add Product</h2>
        {localStorage.getItem("token") && (
          <button
          style={{height:'2.5rem',background:"maroon",marginTop:'1rem'}}
            onClick={() => {
              localStorage.removeItem("token");
              window.location.reload();
            }}
          >
            Logout
          </button>
        )}
       </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form style={{width:'50%',margin:'auto',marginTop:'2rem',lineHeight:'2'}}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <Field type="text" name="title" className="form-control" />
            <ErrorMessage name="title" component="div" className="error" />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <Field type="text" name="description" className="form-control" />
            <ErrorMessage
              name="description"
              component="div"
              className="error"
            />
          </div>

          <div className="form-group">
            <label htmlFor="price">Price</label><br />
            <Field type="number" name="price" className="form-control" />
            <ErrorMessage name="price" component="div" className="error" />
          </div>

          <div className="form-group">
            <label htmlFor="discountPercentage">Discount Percentage</label><br />
            <Field
              type="number"
              name="discountPercentage"
              className="form-control"
            />
            <ErrorMessage
              name="discountPercentage"
              component="div"
              className="error"
            />
          </div>

          <div className="form-group">
            <label htmlFor="rating">Rating</label><br />
            <Field type="number" name="rating" className="form-control" />
            <ErrorMessage name="rating" component="div" className="error" />
          </div>

          <div className="form-group">
            <label htmlFor="stock">Stock</label><br />
            <Field type="number" name="stock" className="form-control" />
            <ErrorMessage name="stock" component="div" className="error" />
          </div>

          <div className="form-group">
            <label htmlFor="brand">Brand</label><br />
            <Field type="text" name="brand" className="form-control" />
            <ErrorMessage name="brand" component="div" className="error" />
          </div>

          <div className="form-group">
          <label htmlFor="category">Category</label><br />
          <Field as="select" name="category" className="form-control">
            <option value="">Select a category</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </Field>
          <ErrorMessage name="category" component="div" className="error" />
        </div>
<br />  
          <button type="submit" className="btn btn-primary" style={{background:'maroon'}}>
            Submit
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default AddProductForm;
