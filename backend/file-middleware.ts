import * as fs from "fs-extra";
export default function fileUploader(
  folderName: string,
  id: string | number,
  file: any
) {
  try {
    if (typeof id === "number") {
      id = id.toString();
    }
    let extension: string | string[] = file.originalname.split(".");
    extension = extension[extension.length - 1];
    let fileName: string =
      Date.now().toString().slice(-10) + file.fieldname + "." + extension;
    let fileContents = Buffer.from(file.buffer).toString("base64");
    fs.ensureDir("uploads/", (err) => {
      if (err) console.log(err);
    });
    fs.ensureDir("uploads/" + folderName + "/", (err) => {
      if (err) console.log(err);
    });
    fs.ensureDir("uploads/" + folderName + "/" + id, (err) => {
      if (err) console.log(err);
    });
    fs.writeFile(
      "uploads/" + folderName + "/" + id + "/" + fileName,
      fileContents,
      "base64",
      function (err: any) {
        if (err) console.log(err);
      }
    );
    return fileName;
  } catch (e) {
    console.log(file);
    return "";
  }
}
