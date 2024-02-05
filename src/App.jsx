import { useState,useEffect } from 'react'
import Sidebar from './components/Sidebar'
import axios from 'axios';


const App = () => {

    // get catagory
    const [categories, setCategories] = useState([]);

    useEffect(() => {
      const fetchCategories = async () => {
        try {
          const response = await axios.get(
            "https://dummyjson.com/products/categories"
          );
          setCategories(response.data);
        } catch (error) {
          console.error("Error fetching categories:", error);
        }
      };
      fetchCategories();
    }, []); // Empty dependency array ensures the effect runs only once
    

  return (
    <Sidebar categories={categories}/>
  )
}

export default App