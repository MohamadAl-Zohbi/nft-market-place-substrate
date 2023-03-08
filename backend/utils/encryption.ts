import crypto from 'crypto';
const key = Buffer.from("c4b47be8cab3bcf8ca5031699f56b8ccf7c097cfc03fc29fc4b1320b8fe47bfc", "hex");
const iv =Buffer.from("7c03fc320b8ccf8cab51699fc4b47bfe", "hex")
function encrypt(text: string) {
    let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return  encrypted.toString('hex');
 }
 function decrypt(text:any) {
    let encryptedText = Buffer.from(text, 'hex');
    let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
 }

 export{encrypt,decrypt}
