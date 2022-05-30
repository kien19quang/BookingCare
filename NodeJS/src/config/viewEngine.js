import express from "express"

let configViewEngine = (app) => {
    app.use(express.static("./src/public"))
    app.set("view engine", "ejc")
    app.set("views", "./src/views")
}

module.exports = configViewEngine