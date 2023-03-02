import { useState, useMemo, useEffect, SetStateAction } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import {
  fetchProducts,
  selectProducts,
  selectProductsLoading,
  selectProductsError,
} from "../store/productsSlice";
import PopupForm from "./PopupForm";
import styled from "styled-components";

const ProductsListContainer = styled.div`
  margin: 0 auto;
  padding: 1rem;
  background-color: #fff;
`;

const SearchContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const SearchInput = styled.input`
  width: 40%;
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 1rem;
`;

const SearchSelect = styled.select`
  width: 25%;
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 1rem;
  appearance: none;
  background-color: #fff;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath fill='%23333' d='M17.4 8.6c-.4-.4-1-.4-1.4 0L12 12.2 7 7.2c-.4-.4-1-.4-1.4 0-.4.4-.4 1 0 1.4l5 5c.4.4 1 .4 1.4 0l5-5c.4-.4.4-1 0-1.4z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.5rem center;
  background-size: 1rem auto;
`;

const ProductList = styled.tbody`
  margin: 0;
  padding: 0;
  width: 100%;
`;

const ProductListItem = styled.tr`
  // display: flex;
  // justify-content: space-between;
  // align-items: center;
  padding: 10px;
  margin-bottom: 10px;
  background-color: "#f5f5f5";

  &:hover {
    background-color: #e5e5e5;
  }
`;

const ProductName = styled.p`
  margin: 0;
  padding: 0.5rem;
  text-align: left;
`;

const ProductPrice = styled.p`
  margin: 0;
  padding: 0.5rem;
  text-align: left;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`;

const PaginationButton = styled.button`
  margin: 0 0.5rem;
`;

const AddProductButton = styled.button`
  margin: 0 0.5rem;
`;

const Popup = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;

  > div {
    background-color: white;
    padding: 1rem;
    border-radius: 5px;
  }
`;

const ProductsList = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const products = useAppSelector(selectProducts);
  const isLoading = useAppSelector(selectProductsLoading);
  const error = useAppSelector(selectProductsError);
  const [selectedProduct, setSelectedProduct] = useState<{
    uuid: string;
    name: string;
    price: number;
    category_id: number;
  } | null>(null);
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
      filtered = filtered.filter(
        (p) => p.price >= Number(filterOptions.minPrice)
      );
    }
    if (filterOptions.maxPrice) {
      filtered = filtered.filter(
        (p) => p.price <= Number(filterOptions.maxPrice)
      );
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

  const handleAddProduct = () => {
    setSelectedProduct(null);
    setShowAddForm(true);
  };

  const handleEditProduct = (product: any) => {
    setSelectedProduct(product);
    setShowEditForm(true);
  };

  const handleDeleteProduct = (product: any) => {
    setSelectedProduct(product);
    setShowDeleteForm(true);
  };

  const handleCloseForms = () => {
    setShowAddForm(false);
    setShowEditForm(false);
    setShowDeleteForm(false);
  };

  return (
    <ProductsListContainer>
      <SearchContainer>
        <SearchInput
          type="text"
          placeholder=""
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {/* <SearchSelect
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
        </SearchSelect>
        <SearchSelect
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
        </SearchSelect> */}
        <SearchSelect
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="">Sortuj po</option>
          <option value="name">Nazwie</option>
          <option value="price">Cenie</option>
        </SearchSelect>
        <AddProductButton onClick={handleAddProduct}>
          Dodaj produkt
        </AddProductButton>
      </SearchContainer>

      {isLoading && <div>Ładowanie...</div>}
      {error && <div>{error}</div>}
      <table>
        <thead>
          <tr>
            {/* <ProductListItem> */}

            <td>UUID</td>
            <td>Nazwa</td>
            <td>Cena</td>
            <td>Kategoria</td>
            <td></td>
            {/* </ProductListItem> */}
          </tr>
        </thead>
        <ProductList>
          {currentProducts.map((product) => (
            <ProductListItem key={product.uuid}>
              <td>
                <ProductName>{product.uuid}</ProductName>
              </td>
              <td>
                <ProductName>{product.name}</ProductName>
              </td>
              <td>
                <ProductPrice>{product.price}</ProductPrice>
              </td>
              <td>
                <ProductPrice>{product.category_id}</ProductPrice>
              </td>
              <td>
                <button onClick={() => handleEditProduct(product)}>
                  Edytuj
                </button>
                <button onClick={() => handleDeleteProduct(product)}>
                  Usuń
                </button>
              </td>
            </ProductListItem>
          ))}
        </ProductList>
      </table>
      {(showAddForm || showEditForm || showDeleteForm) && (
        <Popup>
          {showAddForm && <PopupForm mode="add" onClose={handleCloseForms} />}
          {showEditForm && selectedProduct && (
            <PopupForm
              mode="edit"
              product={selectedProduct}
              onClose={handleCloseForms}
            />
          )}
          {showDeleteForm && selectedProduct && (
            <PopupForm
              mode="delete"
              product={selectedProduct}
              onClose={handleCloseForms}
            />
          )}
        </Popup>
      )}
      <PaginationContainer>
        <PaginationButton
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage == 1}
        >
          {`<<`}
        </PaginationButton>
        Strona {currentPage} z{" "}
        {Math.ceil(filteredProducts.length / productsPerPage)}
        <PaginationButton
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage > filteredProducts.length / productsPerPage}
        >
          {`>>`}
        </PaginationButton>
      </PaginationContainer>
      <PaginationContainer>
        <SearchSelect
          value={productsPerPage}
          onChange={(e) => setProductsPerPage(Number(e.target.value))}
        >
          <option value="5">5 na stronę</option>
          <option value="10">10 na stronę</option>
          <option value="20">20 na stronę</option>
        </SearchSelect>
      </PaginationContainer>
    </ProductsListContainer>
  );
};

export default ProductsList;
