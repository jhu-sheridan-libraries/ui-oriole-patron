export const searchOriole = (searchParams) => {
  let url = `${ process.env.LARA_API }?page[size]=5&filter[keyword]=${ searchParams.query }`
  return new Promise((resolve, reject) => {
    if (searchParams.query) {
      return fetch(url, {})
        .then(response => response.json())
        .then(json => resolve(json))
        .catch(error => reject(error))
    } else {
      return reject({error: 'emtpy search params'})
    }
  }) 
}