import { useEffect, useState } from "react";
import "./App.css";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";

function App() {
  const [limit, setLimit] = useState(20)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState([])
  const [totalProducts, setTotalProducts] = useState(null)
  
  const getMoreData = async (page=1)=>{
    try {
      const response = await fetch(
        `https://dummyjson.com/products?limit=${limit}&skip=${
          (page - 1) * limit
        }`,   
        {
          method: "GET",
        }
      );
      // const {products} = await response.json()
      const data = await response.json()
      console.log("data" , data);
      setProducts(data.products)
      setTotalProducts(data.total)
    } catch (err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    getMoreData(page)
  }, [page])
  
  

  return loading ? (
    <>loading...</>
  ) : (
    <>
      <h1>Pagination</h1>
      <div className="container">
        {products &&
          products.map((item, index) => {
            return <div key={item.id} className="item">
              <img src={item.thumbnail} alt="" />
              <h3>{item.title}</h3>
            </div>;
          })}
      </div>
      <div className="pagination">
        <FaArrowAltCircleLeft  onClick={() => { setPage((prev) => (prev == 1 ? 1 : prev - 1)); }} className="r_icons" />
        <div className="current"> {page} </div>
        <FaArrowAltCircleRight onClick={ ()=>setPage(prev => prev < Math.ceil(totalProducts/limit) ? prev+1 : prev )} className="r_icons" />
      </div>

      {/* <button onClick={ ()=>setPage(prev => prev < Math.ceil(totalProducts/limit) ? prev+1 : prev )} >Load More Data</button> */}
    </>
  );
}

export default App;
