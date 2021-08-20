import { useState } from 'react';
import Layout from "../components/Layout/Layout";
import SearchInput from '../components/SearchInput/SearchInput';
import CountriesTable from "../components/CountriesTable/CountriesTable";

export default function Home({ country }) {
  // console.log(country);
  const [inputValue, setInputValue] = useState('');

  const filteredCountries = country.filter((country) =>
    country.name.toLowerCase().includes(inputValue) ||
    country.region.toLowerCase().includes(inputValue) ||
    country.subregion.toLowerCase().includes(inputValue)
  );

  const handleChange = (e) => {
    e.preventDefault();
    setInputValue(e.target.value.toLowerCase());
  };

  return (
    <Layout>
      <SearchInput country={country} handleChange={handleChange} />
      <CountriesTable country={filteredCountries} />
    </Layout>
  )
}

export async function getServerSideProps() {
  const res = await fetch('https://restcountries.eu/rest/v2/all');
  const data = await res.json();

  return {
    props: { country: data },
  }
}
