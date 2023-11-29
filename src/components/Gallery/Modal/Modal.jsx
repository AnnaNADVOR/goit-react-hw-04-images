import { useEffect } from "react";

import {
    Overlay,
    ModalField,
    ModalPhoto
} from './Modal.styled'


function Modal({ closeModal, largeImageURL, tags }) {

    useEffect(() => {
        const onEscClick = (event) => {
            if (event.code === "Escape") {
                closeModal();
            }
        }
        
        window.addEventListener("keydown", onEscClick);
        
        return () => {
            window.removeEventListener('keydown', onEscClick);
        }

    }, [closeModal]);
    
    const onOverlayClisk = (event) => {
        if (event.target === event.currentTarget) {
            closeModal();
        }
    }

    return ( 
        <Overlay onClick={onOverlayClisk}>
                <ModalField>
                    <ModalPhoto src={largeImageURL} alt={tags} />
                </ModalField>
            </Overlay>
    )    
}

export default Modal; 