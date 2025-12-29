// export const BASE_URL = "http://localhost:5000"; 
// export const SOCKET_URL = "http://localhost:5000"; 
let IS_PROD = false;
const server = IS_PROD ?
    "https://apnacollegebackend.onrender.com" :

    "http://10.201.239.118.nip.io:8000"


export default server;