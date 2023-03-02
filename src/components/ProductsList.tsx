import { useState, useMemo, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import {
  fetchProducts,
  selectProducts,
  selectProductsLoading,
  selectProductsError,
} from "../store/productsSlice";
import PopupForm from "./PopupForm";
import styled from "styled-components";
import {
  FiEdit,
  FiTrash,
  FiSearch,
  FiPlus,
  FiChevronRight,
  FiChevronLeft,
} from "react-icons/fi";

const ProductsListContainer = styled.div`
  margin: 0 auto;
  padding: 1rem;
  background-color: #fff;
  width: 100%;
  max-width: 1415px;
`;

const SearchContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
  max-height: 45px;
`;

const SearchSelect = styled.select`
  width: 25%;
  padding: 0.5rem;
  border-radius: 12px;
  border: 1px solid #b4bacc;
  font-size: 1rem;
  appearance: none;
  background-color: #fafbfe;
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

const AddProductButton = styled.button`
  margin: 0 5px;
  padding: 16px 20px;
  background-color: #5b66dc;
  color: #fff;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  font-size: 1rem;
  align-items: center;
  > .plusIcon {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    margin-right: 1rem;
  }
  &:hover {
    background-color: #5b66ff;
  }
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
    padding: 2.5rem;
    max-width: 350px;
    width: 100%;
    border-radius: 12px;
    -webkit-box-shadow: 8px 0px 20px 3px rgb(66 68 90);
    -moz-box-shadow: 8px 0px 20px 3px rgb(66 68 90);
    box-shadow: 8px 0px 20px 3px rgb(66 68 90);
  }
`;

const Table = styled.table`
  width: 100%;
  border-spacing: 0;
  border: 1px solid #e9eaef;
  border-radius: 12px;
  overflow: hidden;
`;

const TableHead = styled.thead`
  background-color: #fafbfe;
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #ccc;

  > td {
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
    &:first-child {
      padding-left: 1.5rem;
    }
  }
`;

const TableHeaderCell = styled.td`
  padding: 10px;
  font-weight: bold;
`;

const ProductListItem = styled.tr`
  border-bottom: 1px solid black;
  border-top: 1px solid black;
  border-collapse: collapse;
`;

const ProductCell = styled.td`
  &:first-child {
    padding: 1rem;
  }
`;

const Button = styled.button`
  margin: 0 5px;
  padding: 5px 10px;
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 12px;
  cursor: pointer;

  &:hover {
    background-color: #3e8e41;
  }
`;

const ProductActions = styled.td``;

const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
`;

const PaginationButton = styled.button`
  display: flex;
  font-weight: bold;
  background-color: transparent;
  color: #5b66dc;
  border: none;
  margin: 0 0.5rem;
  cursor: pointer;

  &:hover {
    color: #5b66ff;
  }
  &:disabled {
    background-color: transparent;
    color: #ccc;
    cursor: not-allowed;
  }
`;

const IconButton = styled.button`
  border: none;
  background: none;
  color: #d8dbe4;
  cursor: pointer;
  font-size: 1.2rem;
  padding: 0.5rem;
  transition: color 0.2s;

  &:hover {
    color: #636ede;
  }
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem;
  background-color: #fafbfe;
  border-radius: 12px;
  border: 1px solid #b4bacc;
  max-width: 300px;
  width: 100%;
  > .icon {
    color: #a2a8be;
  }
`;

const SearchIcon = styled.span`
  padding: 0 10px;
  font-size: 20px;
  display: flex;
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  margin-left: 0.5rem;
  font-size: 1rem;
  color: #333;
  background-color: transparent;
  &:focus {
    outline: none;
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
    let sorted = [...filteredProducts];
    if (sortOption === "name") {
      sorted = sorted.sort((a, b) =>
        a.name.toLowerCase().localeCompare(b.name.toLowerCase())
      );
    } else if (sortOption === "price") {
      sorted = sorted.sort((a, b) => a.price - b.price);
    } else if (sortOption === "category") {
      sorted = sorted.sort((a, b) => a.category_id - b.category_id);
    }
    return sorted;
  }, [filteredProducts, sortOption]);

  const currentProducts = useMemo(() => {
    return sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  }, [sortedProducts, indexOfFirstProduct, indexOfLastProduct]);

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
        <SearchBar>
          <SearchIcon className={`icon`}>
            <FiSearch />
          </SearchIcon>
          <SearchInput
            type="text"
            placeholder=""
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchBar>
        {/* <SearchSelect
          value={filterOptions.minPrice}
          onChange={(e) =>
            setFilterOptions({
              ...filterOptions,
              minPrice: e.target.value,
            })
          }
        >
          <option value="">Cena min</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
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
          <option value="">Cena max</option>
          <option value="50">50</option>
          <option value="100">100</option>
          <option value="200">200</option>
        </SearchSelect> */}
        <SearchSelect
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="" disabled>
            Sortuj
          </option>
          <option value="name">Nazwa</option>
          <option value="price">Cena</option>
          <option value="category">Kategoria</option>
        </SearchSelect>
        <AddProductButton onClick={handleAddProduct}>
          <FiPlus className="plusIcon" />
          Dodaj produkt
        </AddProductButton>
      </SearchContainer>

      {isLoading && <div>Ładowanie...</div>}
      {error && <div>{error}</div>}
      <Table>
        <TableHead>
          <TableRow>
            {/* <ProductListItem> */}

            <TableHeaderCell>UUID</TableHeaderCell>
            <TableHeaderCell>Nazwa</TableHeaderCell>
            <TableHeaderCell>Cena</TableHeaderCell>
            <TableHeaderCell>Kategoria</TableHeaderCell>
            <TableHeaderCell></TableHeaderCell>
            {/* </ProductListItem> */}
          </TableRow>
        </TableHead>
        <ProductList>
          {currentProducts.map((product) => (
            <ProductListItem key={product.uuid}>
              <ProductCell>
                <ProductName>{product.uuid}</ProductName>
              </ProductCell>
              <ProductCell>
                <ProductName>{product.name}</ProductName>
              </ProductCell>
              <ProductCell>
                <ProductPrice>{product.price} zł</ProductPrice>
              </ProductCell>
              <ProductCell>
                <ProductPrice>{product.category.name}</ProductPrice>
              </ProductCell>
              <ProductActions>
                <IconButton onClick={() => handleEditProduct(product)}>
                  <FiEdit />
                </IconButton>
                <IconButton onClick={() => handleDeleteProduct(product)}>
                  <FiTrash />
                </IconButton>
              </ProductActions>
            </ProductListItem>
          ))}
        </ProductList>
      </Table>
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
        <SearchSelect
          value={productsPerPage}
          onChange={(e) => setProductsPerPage(Number(e.target.value))}
        >
          <option value="5">5 na stronę</option>
          <option value="10">10 na stronę</option>
          <option value="20">20 na stronę</option>
        </SearchSelect>
      </PaginationContainer>
      <PaginationContainer>
        <PaginationButton
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage == 1}
        >
          <FiChevronLeft />
        </PaginationButton>
        Strona {currentPage} z{" "}
        {Math.ceil(sortedProducts.length / productsPerPage)}
        <PaginationButton
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage >= sortedProducts.length / productsPerPage}
        >
          <FiChevronRight />
        </PaginationButton>
      </PaginationContainer>
    </ProductsListContainer>
  );
};

export default ProductsList;
