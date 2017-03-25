import { resource } from '../../actions'
//init the profile
export const initProfile = () => {
    return (dispatch) => {
        const user = {
            name: 'Sammy'
        }
        const emailPromise = resource('GET', 'email')
        .then((response) => user.email = response.email)
        const zipcodePromise = resource('GET', 'zipcode')
        .then((response) => user.zipcode = response.zipcode)
        const dobPromise = resource('GET', 'dob')
        .then((response) => user.dob = new Date(response.dob).toLocaleDateString())
        const avatarPromise = resource('GET', 'avatars')
        .then((response) => user.avatar = response.avatars[0].avatar)
       Promise.all([emailPromise, zipcodePromise, dobPromise, avatarPromise]).then(() => {
            dispatch({type: 'INIT_PROFILE', newuser: user})
        })
    }
}
//update the profile
export const updateProfile = ({newuser}) => {
    return (dispatch) => {
        const emailPromise = resource('PUT', 'email', { email: newuser.email})
        const zipcodePromise = resource('PUT', 'zipcode', { zipcode: newuser.zipcode})
        const passwordPromise = resource('PUT', 'password', { password: newuser.password})
        Promise.all([emailPromise, zipcodePromise, passwordPromise]).then(() => {
            dispatch(initProfile())
        })
    }
}