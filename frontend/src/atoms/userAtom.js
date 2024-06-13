import { atom } from "recoil";

//when we refresh the page or visit the page for the first time, then the default value for the user is going to be the one that is in our local storage. Hence that is being set below.

const userAtom=atom({
    key:'userAtom',
    default:JSON.parse(localStorage.getItem('users-signedup'))
})

export default userAtom;