export const searchOriole = (searchParams) => {
  console.log('search oriole')
  let url = `${ process.env.REACT_APP_API_ROOT }/oriole-resources?limit=30&query=(title="*${ searchParams.query }*" or description="*${ searchParams.query }*") sortby title`
  return new Promise((resolve, reject) => {
    if (searchParams.query) {
      return fetch(url, { 
        headers: { 
          'X-Okapi-Tenant': 'diku',
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText)
        }
        return response.json()
      })
      .then(json => resolve(json))
      .catch(error => reject(error))
    } else {
      return reject({error: 'emtpy search params'})
    }
  }) 
}