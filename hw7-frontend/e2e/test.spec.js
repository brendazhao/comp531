import { expect } from 'chai'
import { driver,maximize, go, sleep, findId, findCSS, By } from './selenium'
import common from './common'
const webdriver = require('selenium-webdriver')

describe('Test frontend application', ()=>{

    before('should load the page', (done)=>{
        go().then(done)
    })

    it('should register new user', (done) => {
        sleep(1000)
        .then(findId('Name').sendKeys('sampleusername'))
        .then(findId('Email').sendKeys('sample@email.com'))
        .then(findId('Birthday').sendKeys('01011990'))
        .then(findId('Phone').sendKeys('123-456-7890'))
        .then(findId('Zipcode').sendKeys('12345'))
        .then(findId('YourPassword').sendKeys('password'))
        .then(findId('PasswordConfirmation').sendKeys('password'))
        .then(sleep(2000))
        .then(findId('registerbtn').click())
        .then(sleep(2000))
        .then(findId('registerinfo').getInnerHtml().then((element)=>{
            expect(element).to.equal('Finish register!')
        }))
        .then(sleep(500))
        .then(done)
    })

    it('should log in as the test user', (done) => {
        sleep(500)
        .then(common.login)
        .then(done)
    })

    it('should post a new article', (done)=>{
        let originalLength = 0
        let randomnum=Math.random()
        let article = "just post a new article: "+randomnum
        sleep(500)
        .then(findId('newArticle').clear())
        .then(findId('newArticle').sendKeys(article))
        .then(findId('postBtn').click())
        .then(sleep(2000))
         //we check the content 
        .then(findId('thisArticle').getInnerHtml().then(
            (children)=>{
               expect(children).to.equals(article)
            }
        ))
        .then(sleep(500))
        .then(done)
    })

    it('should edit an article', (done)=>{
        let newArticle = 'new article'
        sleep(500)
        .then(findId('thisArticle').clear())
        .then(findId('thisArticle').sendKeys(newArticle))
        .then(findId('editBtn').click())
        .then(sleep(500))
        .then(findId('thisArticle').getText()
        .then(
            text => expect(text).to.eql(newArticle)
        ))
        .then(done)
    })

    it('should update the headline', (done)=>{
        let newHeadline = 'new headline'
        sleep(500)
        .then(findId('inputStatus').clear())
        .then(findId('inputStatus').sendKeys(newHeadline))
        .then(findId('changeHl').click())
        .then(sleep(500))
        .then(findId('status').getText()
        .then(
            text => expect(text).to.eql(newHeadline)
        ))
        .then(done)
    })

it('should add a follower',(done)=>{
    let originalLength = 0
    let follower = 'yy55'
    sleep(500)
    .then(findId('followerList').findElements(webdriver.By.className('followersCard')).then(
        (followers)=>{
            originalLength = followers.length
        }
    ))
    .then(findId('addFollowing').clear())
    .then(findId('addFollowing').sendKeys(follower))
    .then(sleep(2000))
    .then(findId('followerBtn').click())
    .then(sleep(2000))
    .then(findId('followerList').findElements(webdriver.By.className('followersCard')).then(
        (followers)=>{
            expect(followers.length).to.be.eql(originalLength+1)
        }
    ))
    .then(findId('addFollowing').clear())
    .then(done)
})

it('should remove a follower', (done)=>{
    let originalLength = 0
    let follower='yy55'
    sleep(500)
    .then(findId('followerList').findElements(webdriver.By.className('followersCard')).then(
        (followers)=>{
            originalLength = followers.length
        }
    ))
    //remove the first follower
    .then(findId('followerList').findElements(webdriver.By.className('followersCard')).then(
        (elements) => {
                const element=elements[0]
                return element.findElements(webdriver.By.className('removeBtn')).then((icons)=>{
                const icon = icons[0]
                icon.click()
            })
        }
    ))
    .then(sleep(2000))
    .then(findId('followerList').findElements(webdriver.By.className('followersCard')).then(
        (followers)=>{
            expect(followers.length).to.be.eql(originalLength-1)
        }
    ))
 .then(done)
})


 it('should search by keyword', (done)=>{
    let keyword = 'Only One Article Like This'
    sleep(2000)
    .then(findId('articlesList').findElements(webdriver.By.className('articlesCard')).then(
        (children)=>{
            expect(children.length).to.be.at.least(2)
        }
    ))
    .then(findId('yourFeed').clear())
    .then(sleep(3000))
    .then(findId('yourFeed').sendKeys(keyword)
        .then(sleep(3000))
        .then(findId('articlesList').findElements(webdriver.By.className('articlesCard'))
        .then(
        (children)=>{
            expect(children.length).to.be.eql(1)
        }
    )))
    .then(sleep(2000))
    .then(findId('yourFeed').clear())
    .then(sleep(2000))
    .then(done)
})

    it('should navigate to profile', (done)=>{
        sleep(1000)
        .then(findId('goProfile').click())
        .then(sleep(500))
        .then(expect(findId('profilePage')).to.be.ok)
        .then(done)
    })

    it('should update profile - email', (done)=>{
        const oldemail='qz25test@email.com'
        const newemail = 'new@email.com'
        sleep(500)
        .then(findId('Emailnow').getInnerHtml().then(text=>{
            expect(text).to.be.ok
        }))
        .then(findId('Email').clear())
        .then(findId('Email').sendKeys(newemail))
        .then(findId('update').click())
        .then(sleep(2000))
        .then(findId('Emailnow').getInnerHtml().then(text=>{
            expect(text).to.eql(newemail)
        }))
        .then(findId('Email').clear())
        .then(findId('Email').sendKeys(oldemail))
        .then(findId('update').click())
        .then(sleep(500))
        .then(findId('Emailnow').getInnerHtml().then(text=>{
            expect(text).to.eql(oldemail)
        }))
        .then(done)
    })

    it('should update profile - zipcode', (done)=>{
        const oldzip = '77050'
        const newzip = '12345'
        sleep(500)
        .then(findId('Zipcodenow').getInnerHtml().then(text=>{
            expect(text).to.be.ok
        }))
        .then(findId('Zipcode').clear())
        .then(findId('Zipcode').sendKeys(newzip))
        .then(findId('update').click())
        .then(sleep(2000))
        .then(findId('Zipcodenow').getInnerHtml().then(text=>{
            expect(text).to.eql(newzip)
        }))
        .then(findId('Zipcode').clear())
        .then(findId('Zipcode').sendKeys(oldzip))
        .then(findId('update').click())
        .then(sleep(500))
        .then(findId('Zipcodenow').getInnerHtml().then(text=>{
            expect(text).to.eql(oldzip)
        }))
        .then(done)
    })

    it('should update profile - password', (done)=>{
        const pass = "password"
        sleep(500)
        .then(findId('YourPassword').clear())
        .then(findId('PasswordConfirmation').clear())
        .then(findId('YourPassword').sendKeys(pass))
        .then(findId('PasswordConfirmation').sendKeys(pass))
        .then(findId('update').click())
        .then(sleep(100))
         .then(findId('profilealert').getInnerHtml().then((element)=>{
            expect(element).to.equal('You have updated!')
        }))
        .then(sleep(500))
        .then(done)
    })

    it('should navigate to Main Page', (done)=>{
        sleep(500)
        .then(findId('goMain').click())
        .then(sleep(500))
        .then(expect(findId('goLanding')).to.be.ok)
        .then(done)
    })

    after('should log out', (done)=>{
        common.logout().then(done)
    })
})