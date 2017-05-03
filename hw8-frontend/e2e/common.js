import { expect } from 'chai'
import { findId, sleep } from './selenium'

exports.creds = {
    username: 'qz25test',
    password: 'direct-break-prepare'
}

exports.login = () =>
    sleep(1000)
    .then(findId('Name2').clear())
    .then(findId('YourPassword2').clear())
    .then(findId('Name2').sendKeys(exports.creds.username))
    .then(findId('YourPassword2').sendKeys(exports.creds.password))
    .then(findId('loginbtn').click())
    .then(sleep(1000))


exports.logout = () => 
    sleep(500)
    .then(findId('goLanding').click())
    .then(sleep(500))
    .then(expect(findId('landingpage')).to.be.ok)
    .then(sleep(500))