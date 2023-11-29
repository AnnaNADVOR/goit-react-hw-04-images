import { useState, useEffect} from "react";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import Searchbar from "../Gallery/Searchbar/Searchbar";
import ImageGallery from "../Gallery/ImageGallery/ImageGallery";
import Loader from "../Gallery/Loader/Loader";
import LoadMoreButton from "../Gallery/LoadMoreButton/LoadMoreButton";
import Error from "../Gallery/Error/Error";
import Notification from '../Gallery/Notification/Notification';

import { Container } from './App.styled';
import fetchGallery from "services/gallery.api";



function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalImages, setTotalImages] = useState(0);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);


  useEffect(() => {

    if (searchQuery === '') {
          return;
        }

    fetchGallery(searchQuery, page)
      .then(data => {
       
        if (data.hits.length === 0) {
          setError('No items found! Enter other serch therm.');
          setTotalImages(0);
          return;
        }
   
        if (page === 1) {
          setImages([...data.hits]);
          setTotalImages(data.totalHits);
          toast.info(`Found ${data.totalHits} items.`);
          return;
        }
        
        setImages(prevState => [...prevState, ...data.hits]);
        setTotalImages(data.totalHits);       
      })
      .catch(error => setError('Oops! Something went wrong. Try again.'))
      .finally(() => setLoading(false))    
    
  },[searchQuery, page])
    
  const getSearchQuery = (value) => {
    if (searchQuery === value) {
      return;
    }
    setPage(1);
    setSearchQuery(value);
    setLoading(true);
    setError(null);
    setImages([]);
  }

  // const  renderMorePhotos = () => {
  //   setPage(prevState => (prevState+1));  
  // }

    function showLoadMoreButton() {
     if (page < Math.ceil(totalImages / 12)) {
        return true;
    }     
  }

  const isShowButtom = showLoadMoreButton();
  
  return (
      <Container>
        <Searchbar submit={getSearchQuery} />
                
        {error && <Error>{error}</Error>}

        {loading && <Loader />}
        
        {searchQuery === "" && <Notification>Enter a keyword to find photos.</Notification>}

        {images.length > 0 && <ImageGallery photos={images} />}

        {isShowButtom && !error && !loading && <LoadMoreButton click={()=> setPage(prevState => (prevState+1))}/>}
               
        <ToastContainer autoClose={2000} />
      </Container>
    )
  }

export default App; 