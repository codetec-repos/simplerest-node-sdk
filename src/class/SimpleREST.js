const ConfigMap = require('./ConfigMap'),
    ReverseAuthentication = require('./ReverseAuthentication')

class SimpleREST extends ConfigMap {

    constructor ({ secretToken } = { secretToken: null }) {
        super()
        this.setSecretToken({ secretToken })
    }

    /*
        @metaData : Object
    */
    async reverseAuthentication ({ metaData, expires, token } = { metaData: { roles: [] }, expires: 900, token: null }) {
        try {
            if(!this.getSecretToken()) throw 'Secret Token must be not empty or null'
            if((!token?.length || typeof token !== 'string')) throw 'Token must be string and not empty or null'

            const reverseAuthInstance = new ReverseAuthentication() 

            return await reverseAuthInstance.login({ metaData, expires, token })
        } catch (error) {
            console.log(error)
            return error
        }
    }

    async reverseAuthenticationLogout ({ token } = { token: null }) {
        try {
            if(!this.getSecretToken()) throw 'Secret Token must be not empty or null'
            if((!token?.length || typeof token !== 'string')) throw 'Token must be string and not empty or null'

            const reverseAuthInstance = new ReverseAuthentication() 

            return await reverseAuthInstance.logout({ token })
        } catch (error) {
            console.log(error)
            return error
        }
    }

}

module.exports = SimpleREST