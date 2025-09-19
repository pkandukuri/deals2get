import { useEffect, useState } from 'react'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Search from './components/Search.jsx'
import ProductCard from './components/ProductCard.jsx'
import MiniProductCard from './components/MiniProductCard.jsx'


export default function App() {

  const [item, setItem] = useState(null);

  useEffect(() => {
    fetch("\\item3.json")
      .then((res) => res.json())
      .then((data) => setItem(data));
  }, []);

  console.log("Item data:", item);
  if (!item) return <p>Loading...</p>;

  return (
    <>
      <Header />
      <main className="container main-content">
        <Search />

        <div style={{ margin: "10px 0" }}>
          <MiniProductCard data={item} />
         {/* <ProductCard data={item} /> */}
        </div>

      </main>
      <Footer />


    </>
  )
}