import { Faq } from '../entities/Faq';
import fileUploader from '../file-middleware';
import { FaqRepository } from "../data-source";

async function getAllFaq(){
  const data = await FaqRepository.find({
    select : {
      id : true,
      question : true,
      answer : true,
      createdAt : true,
    }
  });

  return data;
}

async function addFaq(body: { question: string; answer: string; }){
  let faq = new Faq();
  faq.question = body.question;
  faq.answer = body.answer;
  return await FaqRepository.save(faq);
}

async function editFaq(body: { id: any; question: string; answer: string; }){
  let faq = await FaqRepository.findOneOrFail({
    where : {id : body.id}
  });

  faq.question = body.question;
  faq.answer = body.answer;

  return await FaqRepository.save(faq);
}

export {getAllFaq , addFaq , editFaq };

    