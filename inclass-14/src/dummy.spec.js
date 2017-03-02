//
// Inclass Mocking Exercise
// ========================
//
// This is the test code for our web application.
// We start by introducing a mock of the fetch function.
// Before each test we create an inmemory DOM to contain
// the HTML elements of the client code.  At the end of each
// test we clear the inmemory document.
//
// Below you are asked to implement the test for updateHeadline
//

import { expect } from 'chai'
import { url, login, logout, updateHeadline } from './dummy'

// npm install https://www.clear.rice.edu/comp431/sample/mock-fetch.tgz
import fetch, { mock } from 'mock-fetch'

describe('Validate login', () => {

    beforeEach(() => {
        global.fetch = fetch
    })

    afterEach(() => {
        while (document.body.children.length) {
            document.body.removeChild(document.body.children[0])
        }
    })

    const createDOM = (username, password, message) => {
        const add = (tag, id, value) => {
            const el = document.createElement(tag)
            el.id = id
            el.value = value
            el.style = { display: 'inline' }
            document.body.appendChild(el)
            return el
        }
        add('input', 'username', username)
        add('input', 'password', password)
        const d = add('div', 'message', message)
        d.innerHTML = message
        return d
    }

    it('should log the user in', (done) => {
        const div = createDOM('user', 'pass', 'hello')
        expect(div.innerHTML).to.eql('hello')

        mock(`${url}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        })
        mock(`${url}/headlines`, {
            headers: { 'Content-Type': 'application/json' },
            json: {
                headlines: [{ username: 'hi', headline: 'ok' }]
            }
        })

        login()
            .then(_ => {
                expect(div.innerHTML)
                    .to.eql('you are logged in as hi "ok"')
            })
            .then(done)
            .catch(done)
    })

    it('should log the user out', (done) => {
        const div = createDOM('user', 'pass', 'hello')
        expect(div.innerHTML).to.eql('hello')

        mock(`${url}/logout`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' }
        })
        logout()
            .then(_ => {
                expect(div.innerHTML).to.eql('You have logged out')
            })
            .then(done)
            .catch(done)
    })

    it('should update the headline', (done) => {
        const div = createDOM('user', 'pass', 'hello')
        expect(div.innerHTML).to.eql('hello')

        mock(`${url}/headline`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            json: {
                username: 'foo', headline: 'bar'
            }
        })
        updateHeadline('this value is not used').then(_ => {
            expect(div.innerHTML).to.eql('you are logged in as foo "bar"')
        })
        .then(done)
        .catch(done)
    })

})