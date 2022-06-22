const axios = require("axios")

console.log("Starting Client")
axios.get('http://localhost:3000/')
.then(response => {
    console.log(response.data)
})
.catch(err=>{
    console.log('Error', err)
})