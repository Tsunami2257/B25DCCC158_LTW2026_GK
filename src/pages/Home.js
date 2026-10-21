import { formatMoney } from '../data';

const Home = ({ products }) => {
  // Đếm tổng số sản phẩm
  const total = products.length;

  // Lọc ra sản phẩm có tồn kho dưới 5, rồi đếm
  const lowStock = products.filter((p) => p.stock < 5).length;

  // Cộng dồn (giá x tồn kho) của từng sản phẩm
  const totalValue = products.reduce((sum, p) => sum + p.price * p.stock, 0);

  return (
    <div>
      <h1>Kho hàng</h1>
      <p>Tổng số sản phẩm: {total}</p>
      <p>Số sản phẩm sắp hết hàng: {lowStock}</p>
      <p>Tổng giá trị kho: {formatMoney(totalValue)}</p>
    </div>
  );
};

export default Home;