var config = require('../config/config')
var rp = require('request-promise-native')

var self = module.exports = {
    login: (who) => {
        return new Promise((resolve, reject) => {
            if (Object.keys(config).includes(who)) {
                var options = {
                    url: config.api.authenticate,
                    method: 'POST',
                    json: true,
                    body: config[who]
                }
                rp(options)
                    .then(data => {
                        resolve(data.token)
                    })
                    .catch(err => {
                        reject(err)
                    })
            } else {
                reject({
                    message: `Unknown account ${who}`
                })
            }
        })
    },

    getInvoices: (whose) => {
        return new Promise((resolve, reject) => {
            self.login(whose)
                .then(token => {
                    var options = {
                        url: config.api.invoices,
                        method: 'GET',
                        json: true,
                        headers: {
                            authorization: `Bearer ${token}`
                        }
                    }
                    rp(options)
                        .then(invoices => {
                            resolve(invoices)
                        })
                })
                .catch(error => {
                    reject(error);
                })

        })
    },
    getAccounts: (whose) => {
        return new Promise((resolve, reject) => {
            self.login(whose)
                .then(token => {
                    var options = {
                        url: config.api.accounts,
                        method: 'GET',
                        json: true,
                        headers: {
                            authorization: `Bearer ${token}`
                        }
                    }
                    rp(options).then(accounts => {
                        resolve(accounts)
                    })
                }).catch(error => {
                    reject(error)
                })

        })
    },
    createInvoices: (whose, payload) => {
        return new Promise((resolve, reject) => {
            self.login(whose)
                .then(token => {
                    var options = {
                        url: config.api.invoices,
                        method: 'POST',
                        json: true,
                        headers: {
                            authorization: `Bearer ${token}`
                        },
                        body: payload
                    }
                    rp(options).then(data => {
                        resolve(data)
                    })
                }).catch(err => {
                    console.log(err)
                })
        })
    },
    getTransfers: (whose) => {
        return new Promise((resolve, reject) => {
            self.login(whose)
                .then(token => {
                    var options = {
                        url: config.api.transfers,
                        json: true,
                        method: "GET",
                        headers: {
                            authorization: `Bearer ${token}`
                        }
                    }
                    rp(options).then(data => {
                        resolve(data)
                    })
                }).catch(err => {
                    console.log(err)
                })
        })
    },
    createTransfer: (token, transferbody) => {
        return new Promise((resolve, reject) => {

            var options = {
                url: config.api.transfers,
                json: true,
                method: "POST",
                headers: {
                    authorization: `Bearer ${token}`
                },
                body: transferbody
            }
            rp(options).then(created_transfer => {
                resolve(created_transfer)
            })

                .catch(err => {
                    console.log(err)
                })
        })
    },
    authorizeTransfer: (transfer_id, token) => {
        return new Promise((resolve, teject) => {
            console.log(token)
            let options = {
                url: config.api.authorize,
                json: true,
                method: "POST",
                headers: {
                    authorization: `Bearer ${token}`
                },
                body: transfer_id
            }
            rp(options).then(authorized_transfer => {
                resolve(authorized_transfer)
            }).catch(err => {
                console.log("error")
            })
        })



        // })
    }
}
