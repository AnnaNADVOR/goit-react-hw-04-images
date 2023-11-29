import { BiSearchAlt } from "react-icons/bi";
import { toast } from 'react-toastify';
import { useState } from "react";

import {
    Header,
    SearchForm,
    SearchField,
    SearchButton,

} from "./Searchbar.styled";

function Searchbar({submit}) {
    
   const [searchQuery, setSearchQuery] = useState(''); 
 
   const onSubmitForm = (event) => {
        event.preventDefault(); 

        if (searchQuery.trim() === "") {
           return toast.error("Enter you serch therm!");
        }

        submit(searchQuery);
    }

    const onInputChange = event => {
        const normaliseQuery = event.currentTarget.value.toLocaleLowerCase();
        setSearchQuery(normaliseQuery)
    }  

    return(
            <Header>
                <SearchForm  onSubmit={onSubmitForm}>
                    <SearchField     
                        type="text"                                     
                        placeholder="Search images and photos"
                        value={searchQuery}
                        onChange={onInputChange}
                     />
                    <SearchButton type="submit">
                        <BiSearchAlt />
                    </SearchButton>
                </SearchForm >
            </Header>
        )
    

}

export default Searchbar; 