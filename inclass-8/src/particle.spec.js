import { expect } from 'chai'
import particle, { update } from './particle'

describe('Particle Functionality', () => {

    it('should have default values', () => {
        const p = particle({})
        expect(p).to.be.ok
        expect(p.missingAttribute).to.not.be.ok
        //   check position, velocity, acceleration, mass
        //   these should all be numbers or arrays of numbers
        expect(p.position).to.be.ok
        expect(p.velocity).to.be.ok
        expect(p.acceleration).to.be.ok
        expect(p.mass).to.be.ok
    })

    it('should update the position by the velocity', () => {
        const p = particle({ position: [1, 1], velocity: [0.5, -0.5] })
        const { position } = update(p, 1.0)
        expect(position).to.eql([1.5, 0.5])
    })

    it('should update the position by the velocity and time delta', () => {
        const p = particle({ position: [1, 1], velocity: [0.5, -0.5] })
        const { position } = update(p, 2.0) // dt is different here
        expect(position).to.eql([2.0, 0.0])
    })

    it('should update the velocity by the acceleration', () => {
        const p = particle({ position: [1, 1], velocity: [0.5, -0.5], acceleration: [1, 2] })
        const { velocity } = update(p, 1.0)
        expect(velocity).to.eql([1.5,1.5])
    })

    it('particles should wrap around the world', () => {
        var width=800
        var height=800
        var canvas={width,height}
        // create a particle with position outside of the canvas area.  
        const tmp=particle({position:[900,900],velocity:[-2,-2]})
        //update() should bring the particle back inside
        const {position} =update(tmp,60,canvas)
        // check all four sides
        expect(position[0]>=0).to.be.ok
        expect(position[0]<=800).to.be.ok
        expect(position[1]>=0).to.be.ok
        expect(position[1]<=800).to.be.ok
    })

})
