const cache = require('../cache')

class ConfigMap {

    #secretToken = cache?.get?.('secretToken')

    getSecretToken () {
        return this.#secretToken    
    }

    setSecretToken ({ secretToken }) {
        cache?.set?.('secretToken', secretToken)
        return this.#secretToken = secretToken
    }

    getApiURL () {
        return process.env.API_URL ?? ''
    }
}

module.exports = ConfigMap