const fs = require("fs-extra");
const { v4: uuidv4 } = require("uuid");

// async function createImage(collectionId, file) {
//   const uuid = uuidv4();
//   let imgPath =
//     `localhost/SUBSTRATE-NFT-MARKETPLACE/uploads/images/${collectionId}`.toLowerCase();
//   await fs.ensureDir(`./uploads/images/${collectionId}`, (err) => {
//     if (err) throw err;
//     console.log("Directory created or already existed");
//   });
//   await fs
//     .move(
//       file.path,
//       `./uploads/images/${collectionId}/${uuid}.png`.replace(/-/g, "")
//     )
//     .catch((err) => console.error("error", err));

async function createImage(collectionId , file){
    const uuid = uuidv4();
    let imgPath = `localhost/SUBSTRATE-NFT-MARKETPLACE/uploads/images/${collectionId}/`.toLowerCase();
    await fs.ensureDir(`./uploads/images/${collectionId}`, (err) => {
        if (err) throw err;
        console.log("Directory created or already existed");
    });
    await fs
      .move(file.path, `./uploads/images/${collectionId}/${uuid}.png`.replace(/-/g, ""))
      .catch((err) => console.error("error", err));

    let result = [imgPath , `${uuid}`.replace(/-/g, "")];
    return result;
}

export { createImage };
