const generateHtmlTemplate =(name, message)=>{
    return `
    <div>
        <p>Hello, you have new Enquiry from <b>${name}</b></p>
        <p>${message}</p>
    </div>`
}

module.exports = generateHtmlTemplate