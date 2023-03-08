import { Country } from '../entities/Country';
import fileUploader from '../file-middleware';
import { CountryRepository } from "../data-source";

async function getAllCountries() {
  const data = await CountryRepository.find({
    select : {
      id : true,
      name : true,
    },
    where : { archived : 0}
  });
  return data;
}

async function addCountry(body){
    let country = new Country();
    country.name = body.name;
    return await CountryRepository.save(country);
}

async function editCountry(body){
  let country = await CountryRepository.findOneOrFail({
    where : {id : body.id}
  });

  country.name = body.name;
  return await CountryRepository.save(country);
}

export {getAllCountries , addCountry , editCountry};