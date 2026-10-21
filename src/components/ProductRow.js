import { Link } from 'react-router-dom';
import { formatMoney } from '../data';

const ProductRow = ({ product, onIncrease, onDecrease, onDelete }) => {
  const { id, name, category, price, stock } = product;

  let className = '';
  if (stock < 5) {
    className = 'low';
  }

  return (
    <tr className={className}>
      <td><Link to={`/products/${id}`}>{name}</Link></td>
      <td>{category}</td>
      <td>{formatMoney(price)}</td>
      <td>{stock}</td>
      <td>
        <button onClick={() => onIncrease(id)}>+</button>
        <button onClick={() => onDecrease(id)} disabled={stock === 0}>-</button>
        <button onClick={() => onDelete(id)}>Xóa</button>
      </td>
    </tr>
  );
};

export default ProductRow;