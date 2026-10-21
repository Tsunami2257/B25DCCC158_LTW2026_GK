import { CATEGORIES } from '../data';

const FilterBar = ({ keyword, onKeywordChange, category, onCategoryChange }) => {
  return (
    <div>
      <label htmlFor="search">Tìm kiếm</label>
      <input
        id="search"
        value={keyword}
        onChange={(e) => onKeywordChange(e.target.value)}
      />

      <label htmlFor="category">Danh mục</label>
      <select
        id="category"
        value={category}
        onChange={(e) => onCategoryChange(e.target.value)}
      >
        <option value="Tất cả">Tất cả</option>
        {CATEGORIES.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
    </div>
  );
};

export default FilterBar;