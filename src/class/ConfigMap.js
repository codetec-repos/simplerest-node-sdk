const cache = require('../cache')

class ConfigMap {

    static SANDBOX_ENVIRONMENT = 0
    static PRD_ENVIRONMENT = 1

    #secretToken = cache?.get?.('secretToken')
    #environment = cache?.get?.('environment')

    getSecretToken () {
        return this.#secretToken    
    }

    setSecretToken ({ secretToken }) {
        cache?.set?.('secretToken', secretToken)
        return this.#secretToken = secretToken
    }

    setEnvironment ({ environment }) {
        cache?.set?.('environment', environment)
        return this.#environment = environment
    }

    getEnvironment () {
        return this.#environment
    }

    getApiURL () {
        return !this.#environment 
            ? 'https://api.sandbox.simplerest.com.br' 
            : 'https://api.simplerest.com.br'
    }
}

module.exports = ConfigMap