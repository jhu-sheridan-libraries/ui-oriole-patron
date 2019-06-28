import qs from 'query-string'

export const searchOriole = (searchParams) => {
  let query = searchParams.query
  let page = searchParams.page || 0
  let pageSize = searchParams.pageSize || 20
  let params = {
    query: `(keywords all ${ query }) OR ((title="*${ query }*" or description="*${ query }*")) sortby title`,
    offset: page * pageSize,
    limit: pageSize
  }
  if (query.length < 2) {
    params.query = `title="^${ query }*" sortby title`
  }
  const url = `${ process.env.REACT_APP_API_ROOT }/oriole/databases?${ qs.stringify(params) }`
  return new Promise((resolve, reject) => {
    if (query) {
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
      return reject({error: 'empty search params'})
    }
  })
}

export const getResourceOriole = (altId) => { // retrieve single record by altId
  const params = {query:`altId==${altId}`}
  const url = `${ process.env.REACT_APP_API_ROOT }/oriole/databases?${ qs.stringify(params) }`
  return new Promise((resolve, reject) => {
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
  })
}

export const getTags = () => {
  let url = `${ process.env.REACT_APP_API_ROOT }/oriole/tags`
  return new Promise((resolve, reject) => {
    fetch(url, {
      headers: {
        'X-Okapi-Tenant': 'diku',
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText)
        }
        return response
      })
      .then(d => d.json())
      .then(d => {
        const subjects = {}
        d.tags.forEach(tag => {
          const tokens = tag.split("--")
          const first = tokens[0].trim()
          if (!(first in subjects)) {
            subjects[first] = []
          }
          if (tokens.length > 1) {
            subjects[first].push(tokens[1].trim())
          }
        })
        resolve(subjects)
      })
      .catch(error => reject(error))
  })
}

export const getTag = (tag) => {
  let url = `${process.env.REACT_APP_API_ROOT}/oriole/databases?query=tags.tagList=/respectAccents ${tag} -- &limit=1000`
  url = encodeURI(url)
  return new Promise((resolve, reject) => {
    fetch(url, {
      headers: {
        'X-Okapi-Tenant': 'diku',
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (!response.ok) {
          throw Error('Network request failed')
        }
        return response
      })
      .then(d => d.json())
      .then(d => resolve(d.resources))
      .catch(error => reject(error))
  })
}
