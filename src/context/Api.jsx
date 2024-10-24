import axios from "axios";
import { useState, useEffect, createContext } from "react";

// Create Context
export const Ecom = createContext();

// Context Provider Component
export const Euro = ({ children }) => {
  const [user, setUser] = useState([]); // State for all products
  const [filteredProducts, setFilteredProducts] = useState([]); // State for products to display
  const [newItem, setNewItem] = useState([]); // State for unique categories
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [selectedCategory, setSelectedCategory] = useState(""); // State for selected category

  const [cart, setCart] = useState([])


  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(`https://fakestoreapi.com/products`);
        console.log(res.data)
        setUser(res.data);

        // Calculate unique categories after data fetch
        const uniqueCategories = [
          ...new Set(res.data.map((val) => val.category)),
        ];
        setNewItem(uniqueCategories); // Set the unique categories for buttons

        setFilteredProducts(res.data); // Initially, set filteredProducts to show all products
      } catch (e) {
        console.log(e);
      }
    };

    getData();
  }, []);

  // Function to filter items by category and search query
  const filterItems = (cat) => {
    setSelectedCategory(cat); // Set the selected category

    const filtered = user.filter((item) => {
      const matchesCategory = cat ? item.category === cat : true;
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    setFilteredProducts(filtered);
  };

  // Function to handle search input
  const handleSearch = (query) => {
    setSearchQuery(query); // Update the search query state

    const filtered = user.filter((item) => {
      const matchesCategory = selectedCategory ? item.category === selectedCategory : true;
      const matchesSearch = item.title.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    setFilteredProducts(filtered);
  };

  return (
    <Ecom.Provider value={{ user, filteredProducts, newItem, filterItems, handleSearch, cart ,setCart }}>
      {children}
    </Ecom.Provider>
  );
};
