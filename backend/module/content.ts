import fileUploader from '../file-middleware';
import { ContentRepository } from "../data-source";
import { Content } from '../entities/Content';

async function getContentBySlug(slug){
  const content = await ContentRepository.findOneOrFail({
    where : {slug : slug},
    select :{
      id : true,
      title : true,
      slug : true,
      page : true,
      createdDate : true
    }
  });

  return content;
}

export {getContentBySlug,};