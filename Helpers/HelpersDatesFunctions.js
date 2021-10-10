export const dateFormatDMY = () =>{
    let date = new Date()

    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()

    let dateformat = `${day}-${month}-${year}`;

    return dateformat;

}



export const dateISOString = () =>{
    let date = new Date();
    date = date.toLocaleString('es-AR');
    return date;
}