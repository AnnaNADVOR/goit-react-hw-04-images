import Modal from "../Modal/Modal";
import { useState } from "react";

import {
    GalleryCard,
    GalleryLink,
    GalleryPhoto,

} from './ImageGalleryItem.styled';

function ImageGalleryItem({webformatURL, tags, largeImageURL}) {
    const [showModal, setShowModal] = useState(false); 

    const toggleModal = () => setShowModal(prevShowModal => !prevShowModal);

    return (
        <>
            <GalleryCard >
                <GalleryLink onClick={toggleModal}>
                  <GalleryPhoto src={webformatURL} alt={tags} width="250px" />       
                 </GalleryLink>                     
               </GalleryCard > 
              {showModal &&
                  <Modal
                largeImageURL={largeImageURL}
                tags={tags}
                closeModal={toggleModal} />
             }
          </>      
    )
}

export default ImageGalleryItem; 