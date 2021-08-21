import { useState, useEffect } from 'react';
import Image from 'next/image';
import { numberWithCommas } from '../CountriesTable/CountriesTable';
import { getCountry } from '../../pages/country/[id]';

const CountryInfo = ({ country }) => {
     const [borders, setBorders] = useState([]);

     const getBorders = async () => {
          // Promise.all  => kelayotgan malumotlarni bitta array qib yigib beradi
          const borders = await Promise.all(
               country.borders.map((border) => getCountry(border))
          );

          setBorders(borders);
     };

     useEffect(() => {
          getBorders()
     }, []);

     return (
          <div className="flex md:flex-nowrap flex-wrap md:mt-12 mt-8 text-main">
               <div className="md:w-1/3 w-full lg:px-6 md:px-4 px-0">
                    <div className="rounded-lg relative lg:p-6 md:p-4 p-6 w-full shadow-lg bg-white">
                         <Image src={country.flag} width={310} height={200} layout="responsive" className="lg:rounded-lg md:rounded-md" alt="" />
                         <h1 className="text-center font-bold lg:text-xl text-lg xl:mt-3 lg:mt-2 mt-4 tracking-wider">{country.name}</h1>
                         <h2 className="text-sm xl:mt-2 lg:mt-1 md:mt-2 text-center">{country.region}</h2>
                         <div className="flex lg:flex-nowrap flex-wrap md:justify-between justify-around xl:my-4 lg:my-2 md:my-2">
                              <div className="xl:w-1/3 lg:w-1/2 md:w-full lg:mb-0 md:mb-3 text-center">
                                   <p className="xl:text-lg xl:tracking-wider lg:tracking-tight font-semibold md:tracking-widest mb-0 leading-6">{numberWithCommas(country.population || '0')}</p>
                                   <span className="block xl:text-sm lg:text-xs text-sm text-color-secendary">Population</span>
                              </div>
                              <div className="xl:w-1/3 lg:w-1/2 md:w-full text-center">
                                   <p className="xl:text-lg mb-0 leading-6 font-semibold md:tracking-widest lg:tracking-tight xl:tracking-wider">{numberWithCommas(country.area || '0')}</p>
                                   <span className="block xl:text-sm lg:text-xs text-sm text-color-secendary">Area (km<sup>2</sup>)</span>
                              </div>

                         </div>
                    </div>
               </div>
               <div className="md:w-2/3 md:mt-0 mt-6 w-full md:text-sm text-xs lg:px-6 md:px-4 px-0">
                    <div className="bg-white w-full rounded-lg shadow-lg">
                         <h1 className="text-lg pt-6 px-6 font-semibold">Details</h1>
                         <div className="flex items-center justify-between py-4 px-6 border-b-2">
                              <h1 className="text-color-secendary">Capital</h1>
                              <h1>{country.capital}</h1>
                         </div>
                         <div className="flex items-center justify-between py-4 px-6 border-b-2">
                              <h1 className="text-color-secendary">Subregion</h1>
                              <h1>{country.subregion}</h1>
                         </div>
                         <div className="flex items-center justify-between py-4 px-6 border-b-2">
                              <h1 className="text-color-secendary">Languages</h1>
                              <h1>
                                   {
                                        country.languages.map((language, index) => (
                                             `${language.name}${(index + 1) !== country.languages.length ? ', ' : ''}`
                                        ))
                                   }
                              </h1>

                         </div>
                         <div className="flex items-center justify-between py-4 px-6 border-b-2">
                              <h1 className="text-color-secendary">Currencies</h1>
                              <h1>{country.currencies[0].name} ({country.currencies[0].symbol})</h1>
                         </div>
                         <div className="flex items-center justify-between py-4 px-6 border-b-2">
                              <h1 className="text-color-secendary">Native name</h1>
                              <h1>{country.nativeName}</h1>
                         </div>
                         <div className="flex items-center justify-between py-4 px-6 border-b-2">
                              <h1 className="text-color-secendary">Gini</h1>
                              <div className="md:w-48 w-36 flex items-center">
                                   <div className="relative w-9/12">
                                        <div className="overflow-hidden h-1.5 text-xs flex rounded bg-color-third">
                                             <div style={{ width: `${country.gini}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-logo"></div>
                                        </div>
                                   </div>
                                   <span className="text-xs w-2/12 ml-auto block text-logo font-semibold"> {country.gini || 0}% </span>
                              </div>
                         </div>
                         <div className="pt-6 pb-4 px-2">
                              <h1 className="text-color-secendary px-4 mb-0 pb-6">Neighbouring Countries</h1>
                              <div className="flex md:justify-start justify-between flex-wrap">
                                   {
                                        borders.length > 0 ? borders.map((country) => (
                                             <div key={country.name}>
                                                  <div className="flex flex-wrap lg:w-28 md:w-24 w-28 justify-center mb-2">
                                                       <Image src={country.flag} width={70} height={50} className="rounded-md border overflow-hidden" alt="" />
                                                       <h1 className="text-center w-full text-color-secendary mt-2 text-xs">{country.name}</h1>
                                                  </div>
                                             </div>
                                        )) : (<h1 className="text-color-secendary text-center w-full text-sm">No neighbouring countries</h1>)
                                   }
                              </div>


                         </div>
                    </div>
               </div>
          </div>
     )
}

export default CountryInfo;
