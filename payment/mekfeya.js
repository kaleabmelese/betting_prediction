const rp = require("request-promise-native");//this is not installed
var HelloCash = require("./lib/hellocash");
var bodyParser = require("body-parser");
var config = require("./config/config");
var checkpay = require("./lib/checkpay");
const mometnt = require("moment")

module.exports = {
    createInvoices: (from) => {
        return new Promise((resolve, reject) => {
            // the expiry date is not done yet
            console.log(from)
            var who = "kidus";
            var payload = {
                // amount: parseInt(req.body.amount),
                amount: 20,
                // description: req.body.description,
                description: "for betting site",
                from: from,
                currency: "ETB",
                tracenumber: "gurshaye - " + new Date(),
                notifyfrom: true,
                notifyto: true,
                expires: "2019-10-22T11:05:20.000Z"
            };
            console.log("test")
            HelloCash.createInvoices(who, payload)
                .then(data => {
                    console.log("test2")
                    console.log(data)
                    // checkpay.check(data)
                    // res.render("invoiceshow.html.ejs", { data: data });
                    resolve(data)
                })
                .catch(err => {
                    res.status(500).json({
                        message: "error"
                    });
                });
        })
    }
}



// app.post("/createtransfer", (req, res) => {
//     var who = "kidus";
//     var transferbody = {
//         amount: parseInt(req.body.amount),
//         description: req.body.description,
//         to: req.body.to,
//         currency: "ETB",
//         tracenumber: "kaleab -" + new Date(),
//         referenceid: "id -" + new Date(),
//         notifyfrom: true,
//         notifyto: true
//     };
//     let tok = "";
//     HelloCash.login(who).then(token => {
//         tok = token;
//         HelloCash.createTransfer(token, transferbody)
//             .then(data => {
//                 let transfer_id = [];
//                 transfer_id.push(data.id);

//                 // console.log(data)
//                 HelloCash.authorizeTransfer(transfer_id, tok)
//                     .then(data => {
//                         res.render("transfercrted.html.ejs", { data: data });
//                         console.log(data);
//                     })
//                     .catch(err => {
//                         console.log("error", err);
//                     });
//             })
//             .catch(err => {
//                 console.log("error", err);
//             });
//     });
// });