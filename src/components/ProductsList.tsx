import { useState, useMemo, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { fetchProducts, selectProducts, selectProductsLoading, selectProductsError } from "../store/productsSlice";
import PopupForm from "./PopupForm";
import styled from 'styled-components';
import ProductForm from "./ProductForm";

const ProductsList = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
            dispatch(fetchProducts())
      }, []);
  
  const products = useAppSelector(selectProducts);
  const isLoading = useAppSelector(selectProductsLoading);
  const error = useAppSelector(selectProductsError);
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
const [currentPage, setCurrentPage] = useState(1);
const [productsPerPage, setProductsPerPage] = useState(5);

const indexOfLastProduct = currentPage * productsPerPage;
const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
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
  
const currentProducts = useMemo(() => {
    return filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  }, [filteredProducts, indexOfFirstProduct, indexOfLastProduct]);

  

// const handleAddProduct = () => {
// setSelectedProduct(null);
// setShowAddForm(true);
// };

// const handleEditProduct = (product) => {
//     setEditedProduct(product);
//     setShowEditPopup(true);
//   };

//   const handleDeleteProduct = (product) => {
//     setDeletedProduct(product);
//     setShowDeletePopup(true);
//   };
  

// const handleCloseForms = () => {
// setShowAddForm(false);
// setShowEditForm(false);
// setShowDeleteForm(false);
// };

// const Popup = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background-color: rgba(0, 0, 0, 0.5);
//   display: flex;
//   justify-content: center;
//   align-items: center;

//   > div {
//     background-color: white;
//     padding: 1rem;
//     border-radius: 5px;
//   }
// `;


// const ProductFormPopup = ({ product, onSubmit, onCancel }) => {
//     return (
//       <Popup>
//         <h2>Edit Product</h2>
//         <ProductForm product={product} onSubmit={onSubmit} onCancel={onCancel} />
//       </Popup>
//     );
//   };
  
//   const ProductDeleteConfirmation = ({ product, onConfirm, onCancel }) => {
//     return (
//       <Popup>
//         <h2>Delete Product</h2>
//         <p>Are you sure you want to delete the product {product.name}?</p>
//         <button onClick={onConfirm}>Yes</button>
//         <button onClick={onCancel}>No</button>
//       </Popup>
//     );
//   };
  
  
  

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
{/* <button onClick={handleAddProduct}>Add Product</button> */}
<ul>
  {currentProducts.map((product) => (
    <li key={product.id}>
      {product.name} ({product.price})
      {/* <button onClick={() => handleEditProduct(product)}>Edit</button>
      <button onClick={() => handleDeleteProduct(product)}>Delete</button> */}
    </li>
  ))}
</ul>



{/* {showAddForm && <PopupForm mode="add" onClose={handleCloseForms} />}
{showEditForm && selectedProduct && <PopupForm mode="edit" product={selectedProduct} onClose={handleCloseForms} />}
{showDeleteForm && selectedProduct && (
<PopupForm mode="delete" product={selectedProduct} onClose={handleCloseForms} />
)} */}
<button onClick={() => setCurrentPage(currentPage - 1)}>Prev</button>
<div>
  Page {currentPage} of {Math.ceil(filteredProducts.length / productsPerPage)}
</div>
<button onClick={() => setCurrentPage(currentPage + 1)}>Next</button>

<select
  value={productsPerPage}
  onChange={(e) => setProductsPerPage(Number(e.target.value))}
>
  <option value="5">5 per page</option>
  <option value="10">10 per page</option>
  <option value="20">20 per page</option>
</select>

<div>
    <h2>Products</h2>
    {/* <button onClick={() => setShowAddPopup(true)}>Add Product</button>
    <ProductsFilter onFilterChange={handleFilterChange} />
    <ProductsList
      products={products}
      onDeleteProduct={handleDeleteProduct}
      onEditProduct={handleEditProduct}
    />
    {showAddPopup && (
      <ProductFormPopup
        product={{ name: "", price: "" }}
        onSubmit={handleAddProduct}
        onCancel={() => setShowAddPopup(false)}
      />
    )}
    {showEditPopup && (
      <ProductFormPopup
        product={editedProduct}
        onSubmit={handleUpdateProduct}
        onCancel={() => setShowEditPopup(false)}
      />
    )}
    {showDeletePopup && (
      <ProductDeleteConfirmation
        product={deletedProduct}
        onConfirm={handleConfirmDeleteProduct}
        onCancel={() => setShowDeletePopup(false)}
      />
    )} */}
  </div>
</div>
);
};

export default ProductsList;
