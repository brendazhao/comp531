import Promise from 'bluebird'
import fetch from 'isomorphic-fetch'

export const url = 'https://webdev-dummy.herokuapp.com'

export const resource = (method, endpoint, payload) => {
    const options =  {
        method,
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    if (payload) options.body = JSON.stringify(payload)


    return fetch(`${url}/${endpoint}`, options)
        .then(r => {
            if (r.status === 200) {
                return (r.headers.get('Content-Type').indexOf('json') > 0) ? r.json() : r.text()
            } else {
                // useful for debugging, but remove in production
                //onsole.error(`${method} ${endpoint} ${r.statusText}`)
                throw new Error(r.statusText)
            }
        })
}
//mock the Success register action
export const succRegisterAction = {
    type: 'IS_REG_ERROR',
    errRegInfo: 'Success to Register'
}
//mock the fail register action
export const failRegisterAction = {
    type: 'IS_REG_ERROR',
    errRegInfo: 'Fail to Register'
}
//mock to profile action
export const toProfileAction = {
    type: 'TO_PROFILE_PAGE'
}

export default resource