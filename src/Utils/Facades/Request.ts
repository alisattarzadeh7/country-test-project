import axios from "axios";


const Http = axios.create({
    baseURL:'https://restcountries.com/v3.1'
})

export default Http