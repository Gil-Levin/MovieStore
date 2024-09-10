import React, { Component } from 'react';
import axios from 'axios';

class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null
    };
  }

  componentDidMount() {
    this.loadProduct();
  }

  loadProduct = async () => {
    try {
      const { productId } = this.props.match.params;
      const response = await axios.get(`http://localhost:5000/api/products/${productId}`);
      const product = response.data;
      const imageUrl = product.imageBase64 ? `data:image/jpeg;base64,${product.imageBase64}` : null;
      this.setState({ product: { ...product, imageUrl } });
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  render() {
    const { product } = this.state;

    if (!product) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <h1>{product.name}</h1>
        {product.imageUrl && <img src={product.imageUrl} alt={product.name} />}
        <p>{product.description}</p>
        <p>Price: ${product.price}</p>
      </div>
    );
  }
}

export default ProductDetail;
