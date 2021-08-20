import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { KeyboardArrowDownRounded, KeyboardArrowUpRounded, Sort } from '@material-ui/icons';

const sortBy = (value, direction, country) => {
     if (direction === 'asc') {
          return [...country].sort((a, b) => a[value] > b[value] ? 1 : -1);
     } else if (direction === 'desc') {
          return [...country].sort((a, b) => b[value] > a[value] ? 1 : -1);
     }

     return country;
}

const SortArrow = ({ direction }) => {
     if (!direction) {
          return null;
     } else {
          if (direction === 'desc') {
               return <span className="text-logo"><KeyboardArrowDownRounded /></span>
          } else {
               return <span className="text-logo"><KeyboardArrowUpRounded /></span>
          }
     }
}

export const numberWithCommas = (x) => {
     if (x === 0 || x === null) {
          return '';
     } else {
          return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
     }
}

const CountriesTable = ({ country }) => {
     console.log(country);
     const [direction, setDirection] = useState('');
     const [value, setValue] = useState('');

     const orderedCountries = sortBy(value, direction, country);

     const switchDirection = () => {
          if (!direction) {
               setDirection('desc');
          } else {
               if (direction === 'desc') {
                    setDirection('asc');
               } else {
                    setDirection(null);
               }
          }
     };

     const setValueAndDirection = (value) => {
          switchDirection();
          setValue(value);
     }


     return (
          <div className="md:mt-12 h-full my-3">
               <div className="flex md:text-base text-sm text-color-secendary w-full md:mb-6 mb-1 p-3">
                    <button type="button" onClick={() => setValueAndDirection('name')} className="block md:w-1/3 md:text-center text-left md:pl-0 pl-8 w-1/2">
                         <span className="mr-1">Name</span>
                         {value === 'name' && <SortArrow direction={direction} />}

                    </button>
                    <button type="button" onClick={() => setValueAndDirection('population')} className="block md:w-1/3 w-1/2">
                         <span className="mr-1">Population</span>
                         {value === 'population' && <SortArrow direction={direction} />}
                    </button>
                    <button type="button" onClick={() => setValueAndDirection('area')} className="md:block hidden w-1/3">
                         <span className="mr-1">Area (km<sup>2</sup>)</span>
                         {value === 'area' && <SortArrow direction={direction} />}
                    </button>
                    <button type="button" onClick={() => setValueAndDirection('gini')} className="md:block hidden w-1/3">
                         <span className="mr-1">Gini</span>
                         {value === 'gini' && <SortArrow direction={direction} />}
                    </button>
               </div>
               {
                    orderedCountries.map((element) => (
                         <Link href={`/country/${element.alpha3Code}`} passHref key={element.name} >
                              <div className="bg-white md:text-base text-sm flex md:text-center transform hover:-translate-y-1 duration-300 text-main md:rounded-lg rounded-md p-4 items-center mb-4 shadow-md hover:shadow-lg w-full">
                                   <div className="md:w-1/3 w-1/2 flex items-center">
                                        <div className="md:block hidden md:w-1/3 rounded overflow-hidden" >
                                             {/* <Image src={element.flag} layout="responsive" width={50} height={40} alt="" /> */}
                                             <img src={element.flag} alt="" />
                                        </div>

                                        <span className="pl-2 md:w-2/3 text-left w-full">{element.name}</span>
                                   </div>
                                   <div className="md:w-1/3 text-center w-1/2">{numberWithCommas(element.population)}</div>
                                   <div className="md:block hidden w-1/3">{numberWithCommas(element.area || 0)}</div>
                                   <div className="md:block hidden w-1/3">
                                        <div className="w-3/5 mx-auto flex items-center">
                                             <div className="relative w-9/12">
                                                  <div className="overflow-hidden h-1.5 text-xs flex rounded bg-color-third">
                                                       <div style={{ width: `${element.gini}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-logo"></div>
                                                  </div>
                                             </div>
                                             <span className="text-xs w-2/12 ml-3 block text-logo font-semibold"> {element.gini || 0}% </span>
                                        </div>
                                   </div>

                              </div>

                         </Link>
                    ))
               }

          </div >
     )
}


export default CountriesTable;
