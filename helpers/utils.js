import bcrypt from "bcrypt"
import config from "./config.js"
import jwt from "jsonwebtoken"

export const changeDateFormat = (date) => {
    return addZeroInDate(date.getDate()) + "/" + addZeroInDate(date.getMonth()) + "/" + date.getFullYear()
}

const addZeroInDate = (dateValue) =>{
    return dateValue < 10 ? "0"+dateValue : dateValue
}

export const hashingPassword = async(password) => {
    const hashPassword = await bcrypt
        .hash(password, config.saltRounds)
        .then(hash => {
            return hash
        })
        .catch(err => err)
    return hashPassword
}

export const checkPasswordValidation = async(password, adminPassword) =>{
    const isMatch = await bcrypt.compare(password, adminPassword);
    return isMatch
}

export const parseJwt = (token) => {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}