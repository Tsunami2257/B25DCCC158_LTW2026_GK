import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Layout from './components/Layout';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import AddProduct from './pages/AddProduct';
import ProductDetail from './pages/ProductDetail';

const App = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Chạy 1 lần khi mở ứng dụng: tải dữ liệu
  useEffect(() => {
    axios
      .get('/data/products.json')
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Không tải được dữ liệu');
        setLoading(false);
      });
  }, []);

  // Bấm +: tăng tồn kho 1
  const increaseStock = (id) => {
    const newProducts = products.map((p) => {
      if (p.id === id) {
        return { ...p, stock: p.stock + 1 };
      }
      return p;
    });
    setProducts(newProducts);
  };

  // Bấm -: bán 1 (giảm tồn kho 1, không xuống dưới 0)
  const decreaseStock = (id) => {
    const newProducts = products.map((p) => {
      if (p.id === id && p.stock > 0) {
        return { ...p, stock: p.stock - 1 };
      }
      return p;
    });
    setProducts(newProducts);
  };

  // Bấm Xóa
  const deleteProduct = (id) => {
    const newProducts = products.filter((p) => p.id !== id);
    setProducts(newProducts);
  };

  // Thêm sản phẩm mới: mã = mã lớn nhất hiện có + 1
  const addProduct = (data) => {
    const maxId = products.reduce((max, p) => (p.id > max ? p.id : max), 0);
    const newProduct = { id: maxId + 1, ...data };
    setProducts([...products, newProduct]);
  };

  // Đang tải hoặc lỗi thì chỉ hiện chữ (menu vẫn hiện vì nằm trong Layout)
  const show = (page) => {
    if (loading) {
      return <p>Đang tải...</p>;
    }
    if (error !== '') {
      return <p>{error}</p>;
    }
    return page;
  };

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={show(<Home products={products} />)} />
        <Route
          path="products"
          element={show(
            <ProductList
              products={products}
              onIncrease={increaseStock}
              onDecrease={decreaseStock}
              onDelete={deleteProduct}
            />
          )}
        />
        <Route path="products/new" element={show(<AddProduct onAdd={addProduct} />)} />
        <Route path="products/:id" element={show(<ProductDetail products={products} />)} />
      </Route>
    </Routes>
  );
};

export default App;