import multer from "multer"
const storage=multer.memoryStorage();
export const singleUpload= multer({storage}).single("file"); 
//multer is a middleware and ab single upload ko0 jaha jaha hame file upload krni hai vha vha use krna hai i mean us us route me. so ab ham isse register vaale route me use krenge  
//yaha jo multer use kra hai hmne usse ese use kra hai:
// When you use multer.memoryStorage() for handling file uploads, files are stored in memory as Buffer objects rather than saved to disk. This means the uploaded file is temporarily held in RAM, making it ideal for quick file processing tasks without needing to persist the file on the server.
// ye travel story vaale app se alag hai cause usme ham multer ko use krke files ko device me hi store krva rahe the 
// Without middleware like Multer, the server cannot process multipart/form-data.
// Use multer.single("fieldName") or similar to handle the file and text fields.
// Match the name attribute in the frontend form with the field name expected by the server.