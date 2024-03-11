import { useEffect } from "react";
import { useState } from "react";
import Country from "../Country/Country";
import './Countries.css';
//rsc
const Countries = () => {
    const [countries, setCountries] = useState([]); //api te array er vitore object tai emn
    
    const [Visitedcountries, setVisitedCountries] = useState([]);

    const [visitedFlags, setVisitedFlags] = useState([]);


    useEffect(() =>{
        fetch('https://restcountries.com/v3.1/all')
        .then(res => res.json())
        .then(data => setCountries(data));
    }, [])

    const handleVisitedCountries = country =>{
        console.log('add this to visited list')
        const newVisitedCountries = [...Visitedcountries, country];
        setVisitedCountries(newVisitedCountries);
    }
    
    const handleVisitedFlags = flag =>{
        const newVisitedFlags = [...visitedFlags, flag];
        setVisitedFlags(newVisitedFlags);
    }

    //remove
    //use filter to select all the elements except that one you want to remove
    return (
        <div>
            <h3>Countries: {countries.length}</h3>
            <div>
                <h5>Visited Countries: {Visitedcountries.length}</h5>
                <ul>
                {
                    Visitedcountries.map(country => <li key={country.cca3}>{country.name.common}</li> )
                }
                </ul>
            </div>
            <div className="flag-container">
                {
                    visitedFlags.map((flag, idx) => <img key={idx} src={flag}></img> )
                }
            </div>
            <div className="country-container">
            {
                countries.map(country =><Country 
                    key={country.cca3} 
                    handleVisitedCountries = {handleVisitedCountries}
                    handleVisitedFlags = {handleVisitedFlags}
                    country={country}></Country>)
            }
            </div>
        </div>
    );
};

export default Countries;