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
{isLoading && <div>Loading...</div>}
{error && <div>{error}</div>}
<button onClick={handleAddProduct}>Add Product</button>
<ul>
{products.map((product) => (
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