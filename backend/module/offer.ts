
    import fileUploader from '../file-middleware';
    import { OfferRepository } from "../data-source";


    async function create(body:any,files:Array<Express.Multer.File>) {
        let tmp=await OfferRepository.save(body);
        let allowedUploadFileName:string[]=[];
        for await (let file of files) {
          if(allowedUploadFileName.indexOf(file.fieldname)==-1){
            OfferRepository.remove(tmp)
            throw "error"
          }
         tmp[file.fieldname]= fileUploader('Offer',tmp.id,file);
        }
       return await OfferRepository.save(tmp)
      }
      async function update(body:any,files:Array<Express.Multer.File>) {
        var old = await OfferRepository.findOne({ where: { id: body.id } })
        let allowedUploadFileName:string[]=[];
        Object.keys(body).forEach((element) => {
          old[element] = body[element]
        })
        for await (let file of files) {
          if(allowedUploadFileName.indexOf(file.fieldname)==-1){
            throw "error"
          }
          old[file.fieldname]= fileUploader('Offer',old.id,file);
         }
        return await OfferRepository.save(old)
      }
      async function filter(body:any) {
        let allowedfilterColumn:string[]=['id','itemId','offerMaker','recipient','price','status','createdDate','acceptedAt']
        Object.keys(body).forEach((element) => {
if(allowedfilterColumn.indexOf(element)==-1){
  throw "error"
}})
       return await OfferRepository.find({where:body})
      }
      async function filterWithRelations(body:any,query:any) {
        let allowedfilterColumn:string[]=['id','itemId','offerMaker','recipient','price','status','createdDate','acceptedAt']
        let allowedRelations:string[]=[];
let selectedRelations:string[]=[];
if(query!=undefined && Object.keys(query).length>0){
selectedRelations=query.relations.split(',');
selectedRelations.forEach((element)=>{
  if(allowedRelations.indexOf(element)==-1){
    throw "error"
}})
  }
  
        Object.keys(body).forEach((element) => {
if(allowedfilterColumn.indexOf(element)==-1){
  throw "error"
}})
        return await OfferRepository.find({where:body, relations:selectedRelations})
      }
    async function findAll(query:{skip?:number,take?:number}) {
        const {skip,take}=query;
        return await OfferRepository.find({skip:skip,take:take});
      }
      async function findOne() {
        return await OfferRepository.findOne({ where: {  } })
      }
      async function remove() {

        return await OfferRepository.delete({  })
      }

    async function findOneWithRelation(){
        return await OfferRepository.findOne({where:{id:id},relations:[]})    }

          
          async function findAllWithSelectedRelation(query:{relations?:string;skip?:number,take?:number}) {
            let allowedfilterRelation=[]
            let selectedRelations=[];
            if(query.relations!=undefined){
              selectedRelations=query.relations.split(',');
      if(!selectedRelations.every((element)=>{
        if(allowedfilterRelation.indexOf(element)==-1){
          return false;
        }
        return true;
      })){
        throw "error";
      }
            }
      const {skip,take}=query;
            return await OfferRepository.find({skip:skip,take:take,relations:selectedRelations})
          }
    export {create,update,remove,findOne,findAll,findOneWithRelation,findAllWithSelectedRelation,filter,filterWithRelations};

    