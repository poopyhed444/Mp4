import React, { useState } from 'react';

const AddProductForm = ({ handleAddProduct }) => {
  const [product, setProduct] = useState({ name: '', description: '', price: '', image: '' });

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      let reader = new FileReader();
      reader.onloadend = () => {
        setProduct({ ...product, image: reader.result });
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setProduct({ ...product, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Generate a random id for the new product
    const id = Math.floor(Math.random() * 10000);
    handleAddProduct({ ...product, id });
    // Reset the form fields
    setProduct({ name: '', description: '', price: '', image: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" name="name" value={product.name} onChange={handleChange} required />
      </label>
      <label>
        Description:
        <input type="text" name="description" value={product.description} onChange={handleChange} required />
      </label>
      <label>
        Price:
        <input type="number" name="price" value={product.price} onChange={handleChange} required />
      </label>
      <label>
        Image:
        <input type="file" name="image" onChange={handleChange} required />
      </label>
      <button type="submit">Add Product</button>
    </form>
  );
};

export default AddProductForm;
