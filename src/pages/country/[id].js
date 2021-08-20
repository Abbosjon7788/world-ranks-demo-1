import Image from 'next/image';
import CountryInfo from '../../components/CountryInfo/CountryInfo';
import Layout from '../../components/Layout/Layout';

export const getCountry = async (id) => {
     const res = await fetch(`https://restcountries.eu/rest/v2/alpha/${id}`);
     const data = await res.json();

     return data;
};

const CountryId = ({ country }) => {
     console.log(country)
     return (
          <Layout title={country.name}>
               <CountryInfo country={country} />
          </Layout>


     )
}

export default CountryId;

export const getStaticPaths = async () => {
     const res = await fetch('https://restcountries.eu/rest/v2/all');
     const data = await res.json();
     // console.log(data);

     const paths = data.map((element) => ({
          params: { id: element.alpha3Code }
     }));

     console.log('pathscha:', paths);

     return {
          paths,
          fallback: false
     }
};

export const getStaticProps = async ({ params }) => {
     const country = await getCountry(params.id);

     return {
          props: {
               country
          }
     }
};
