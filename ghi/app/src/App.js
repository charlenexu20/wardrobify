import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ShoeForm from './ShoeForm';
import ShoeList from './ShoeList';

function App() {
  const [shoes, setShoes] = useState([])
  const [hats, setHats] = useState([])

  const fetchShoes = async () => {
    const url = "http://localhost:8080/api/shoes/"
    const response = await fetch(url)

    if (response.ok) {
      const data = await response.json()
      setShoes(data.shoes)
    }
  }

  useEffect(() => {
    fetchShoes();
  }, [])


  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>

          <Route path="/" element={<MainPage />} />
          <Route path="shoes">
              <Route index element={<ShoeList shoes={shoes} fetchShoes={fetchShoes} />} />
              <Route path='new' element={<ShoeForm fetchShoes={fetchShoes} />} />
            </Route>

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
