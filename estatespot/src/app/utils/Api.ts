import axios from 'axios';

export const baseURL = 'https://bayut.p.rapidapi.com';

export const fetchData = async (url: string) => {
    
    // const host = bayut.p.rapidapi.com
    // const key = 6e37982d35mshb7663aa66c7cf32p13be1djsna53b19653e39

    const { data }  = await axios.get( (url), {
        headers: {
            'x-rapidapi-host' : 'bayut.p.rapidapi.com',
            'x-rapidapi-key' : '6e37982d35mshb7663aa66c7cf32p13be1djsna53b19653e39'
        }
    } )  

    return data;
}