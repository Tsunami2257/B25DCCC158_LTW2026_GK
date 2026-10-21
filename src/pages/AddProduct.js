import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CATEGORIES } from '../data';

const AddProduct = ({ onAdd }) => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Kiểm tra 1: có ô bị trống không
    if (name.trim() === '' || price === '' || stock === '') {
      setError('Vui lòng nhập đầy đủ thông tin');
      return;
    }

    // Kiểm tra 2: giá trị có hợp lệ không
    const priceNumber = Number(price);
    const stockNumber = Number(stock);
    if (priceNumber <= 0 || !Number.isInteger(stockNumber) || stockNumber < 0) {
      setError('Giá phải lớn hơn 0, số lượng là số nguyên không âm');
      return;
    }

    onAdd({ name: name.trim(), category, price: priceNumber, stock: stockNumber });
    navigate('/products');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Tên sản phẩm</label>
        <input id="name" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label htmlFor="category">Danh mục</label>
        <select id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="price">Giá</label>
        <input id="price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
      </div>
      <div>
        <label htmlFor="stock">Số lượng tồn</label>
        <input id="stock" type="number" value={stock} onChange={(e) => setStock(e.target.value)} />
      </div>
      <button type="submit">Thêm</button>
      {error !== '' && <p>{error}</p>}
    </form>
  );
};

export default AddProduct;