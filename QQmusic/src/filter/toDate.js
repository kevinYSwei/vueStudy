function toDate(tm){
    let dt = new Date(tm)
    return dt.toLocaleDateString().replace('/','年').replace('/','月')+'日'
}

export default toDate