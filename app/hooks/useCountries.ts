import {create} from 'zustand'
import countries from 'world-countries'

const fomrattedCountries = countries.map((country) => ({
    value: country.cca2,
    label: country.name.common,
    flag: country.flag,
    latlng: country.latlng,
    region: country.region
}))

const useCountries = () => {
    const getAll = () => fomrattedCountries
    const getByValue = (value: string) => {
        return fomrattedCountries.find((item) => item.value === value)
    }

    return {
        getAll, getByValue
    }
}

export default useCountries

