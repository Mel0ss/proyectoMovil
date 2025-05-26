import app from "./app.js"

const main = () => {
    app.listen(app.get('port'))
    console.log("el puerto de escucha es: ", app.get('port'))
}
main()