import React from 'react'
import styles from './SearchInput.module.css';
import SearchIcon from '@material-ui/icons/Search';

const SearchInput = ({ country, handleChange }) => {
     return (
          <div className="flex md:text-base md:mt-12 mt-8 text-sm md:flex-row flex-col md:justify-between md:items-center">
               <span className="block md:mb-0 mb-3 text-color">Found {country.length} countries</span>
               <div className="flex items-center sm:px-4 px-2 md:w-1/2 w-full text-color bg-color-secondary rounded-md">
                    <SearchIcon />
                    <input type="text" onChange={handleChange} className={`${styles.input} md:w-4/5 w-11/12 sm:p-4 p-2 sm:text-base text-sm bg-color-secondary focus:outline-none ring-0`} placeholder="Filter by Name, Region or SubRegion" />

               </div>

          </div>
     )
}

export default SearchInput;
