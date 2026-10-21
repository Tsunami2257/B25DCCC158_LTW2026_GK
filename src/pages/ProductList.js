import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import FilterBar from '../components/FilterBar';
import ProductTable from '../components/ProductTable';

const ProductList = ({ products, onIncrease, onDecrease, onDelete }) => {
  const location = useLocation();
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('Tất cả');
  const [message, setMessage] = useState(location.state?.message || '');

  // Tự tắt thông báo sau 3 giây
  useEffect(() => {
    if (message === '') {
      return;
    }
    const timer = setTimeout(() => setMessage(''), 3000);
    return () => clearTimeout(timer);
  }, [message]);

  // Lọc theo tên (không phân biệt hoa thường) VÀ theo danh mục
  const filtered = products.filter((p) => {
    const matchName = p.name.toLowerCase().includes(keyword.toLowerCase());
    const matchCategory = category === 'Tất cả' || p.category === category;
    return matchName && matchCategory;
  });

  return (
    <div>
      {message !== '' && (
        <div>
          <span>{message}</span>
          <button onClick={() => setMessage('')}>×</button>
        </div>
      )}

      <FilterBar
        keyword={keyword}
        onKeywordChange={setKeyword}
        category={category}
        onCategoryChange={setCategory}
      />

      <p>Tìm thấy {filtered.length} sản phẩm</p>

      <ProductTable
        products={filtered}
        onIncrease={onIncrease}
        onDecrease={onDecrease}
        onDelete={onDelete}
      />
    </div>
  );
};

export default ProductList;