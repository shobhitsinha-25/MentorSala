import api from "../lib/axios";

export const uploadImage =
async (

file: File

)=>{

const form =
new FormData();

form.append(

"image",

file

);

const {data}=
await api.post(

"/upload/image",

form,

{

headers:{

"Content-Type":

"multipart/form-data"

}

}

);

return data.url;

};