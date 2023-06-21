/* This function return Example:  "2022-07-25" */
export const currentDateMounth = () => {
    return new Date().toLocaleDateString("es-EC", { timeZone: "America/Guayaquil", year: 'numeric', month: '2-digit', day: '2-digit' }).split('/').reverse().join('-');
}