import ProductRow from './ProductRow';

const ProductTable = ({ products, onIncrease, onDecrease, onDelete }) => {
  if (products.length === 0) return <p>Không có dữ liệu</p>;
  return (
    <table>
      <thead>
        <tr>
          <th>Tên sản phẩm</th>
          <th>Danh mục</th>
          <th>Giá</th>
          <th>Tồn kho</th>
          <th>Thao tác</th>
        </tr>
      </thead>
      <tbody>
        {products.map((p) => (
          <ProductRow
            key={p.id}
            product={p}
            onIncrease={onIncrease}
            onDecrease={onDecrease}
            onDelete={onDelete}
          />
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;