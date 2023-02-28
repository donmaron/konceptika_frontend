import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../store/productsSlice";
import PopupForm from "./PopupForm";

const ProductsList = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const isLoading = useSelector(selectProductsLoading);
  const error = useSelector(selectProductsError);
const [selectedProduct, setSelectedProduct] = useState<{ id: number; name: string; price: number } | null>(null);
const [showAddForm, setShowAddForm] = useState(false);
const [showEditForm, setShowEditForm] = useState(false);
const [showDeleteForm, setShowDeleteForm] = useState(false);
const [searchTerm, setSearchTerm] = useState("");
const [filterOptions, setFilterOptions] = useState({
  minPrice: "",
  maxPrice: "",
});
const [sortOption, setSortOption] = useState("");


const filteredProducts = useMemo(() => {
    let filtered = products;
    if (searchTerm) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (filterOptions.minPrice) {
      filtered = filtered.filter((p) => p.price >= Number(filterOptions.minPrice));
    }
    if (filterOptions.maxPrice) {
      filtered = filtered.filter((p) => p.price <= Number(filterOptions.maxPrice));
    }
    return filtered;
  }, [products, searchTerm, filterOptions]);

  const sortedProducts = useMemo(() => {
    let sorted = filteredProducts;
    if (sortOption === "name") {
      sorted = sorted.sort((a, b) =>
        a.name.toLowerCase().localeCompare(b.name.toLowerCase())
      );
    } else if (sortOption === "price") {
      sorted = sorted.sort((a, b) => a.price - b.price);
    }
    return sorted;
  }, [filteredProducts, sortOption]);
  
  

const handleAddProduct = () => {
setSelectedProduct(null);
setShowAddForm(true);
};

const handleEditProduct = (product: { id: number; name: string; price: number }) => {
setSelectedProduct(product);
setShowEditForm(true);
};

const handleDeleteProduct = (product: { id: number; name: string; price: number }) => {
setSelectedProduct(product);
setShowDeleteForm(true);
};

const handleCloseForms = () => {
setShowAddForm(false);
setShowEditForm(false);
setShowDeleteForm(false);
};

return (
<div>
<div>
  <input
    type="text"
    placeholder="Search by name"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />
  <select
    value={filterOptions.minPrice}
    onChange={(e) =>
      setFilterOptions({
        ...filterOptions,
        minPrice: e.target.value,
      })
    }
  >
    <option value="">Min price</option>
    <option value="10">$10</option>
    <option value="20">$20</option>
    <option value="50">$50</option>
  </select>
  <select
    value={filterOptions.maxPrice}
    onChange={(e) =>
      setFilterOptions({
        ...filterOptions,
        maxPrice: e.target.value,
      })
    }
  >
    <option value="">Max price</option>
    <option value="50">$50</option>
    <option value="100">$100</option>
    <option value="200">$200</option>
  </select>
</div>
<select
  value={sortOption}
  onChange={(e) => setSortOption(e.target.value)}
>
  <option value="">Sort by</option>
  <option value="name">Name</option>
  <option value="price">Price</option>
</select>


{isLoading && <div>Loading...</div>}
{error && <div>{error}</div>}
<button onClick={handleAddProduct}>Add Product</button>
<ul>
  {sortedProducts.map((product) => (
    <li key={product.id}>
      {product.name} ({product.price})
      <button onClick={() => handleEditProduct(product)}>Edit</button>
      <button onClick={() => handleDeleteProduct(product)}>Delete</button>
    </li>
  ))}
</ul>


{showAddForm && <PopupForm mode="add" onClose={handleCloseForms} />}
{showEditForm && selectedProduct && <PopupForm mode="edit" product={selectedProduct} onClose={handleCloseForms} />}
{showDeleteForm && selectedProduct && (
<PopupForm mode="delete" product={selectedProduct} onClose={handleCloseForms} />
)}
</div>
);
};