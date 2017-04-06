const expect = require('chai').expect
const fetch = require('isomorphic-fetch')

const resource = (method, endpoint, payload) => {
	const url = `http://localhost:3000/${endpoint}`
	const options = { method, headers: { 'Content-Type': 'application/json' }}
	if (payload) options.body = JSON.stringify(payload)
	return fetch(url, options).then(r => {
			if (r.status == 200) {
				return r.json()
			} else {	
				const msg = `ERROR ${method} ${endpoint} returned ${r.status}`
				console.error(msg)
				throw new Error(msg)
			}
		})
}


describe('Validate POST /article', ()=>{

    let nextid = 0;
    it('should GET articles', done=>{
        resource('GET','articles')
        .then(body=>{
            expect(body.nextid).to.be.at.least(4)
            nextid = body.nextid
        })
        .then(done).catch(done)
    })

    it('should POST a new articles', done=>{
        const text = 'just for test'
        resource('POST','article', {text})
        .then(body=>{
            expect(body.articles[0].text).to.eql(text)
        })
        .then(done).catch(done)
    })

    it('should GET articles with length + 1', done=>{
        resource('GET', 'articles')
        .then(body=>{
            expect(body.nextid).to.eql(nextid+1)
        })
        .then(done).catch(done)
    })
})