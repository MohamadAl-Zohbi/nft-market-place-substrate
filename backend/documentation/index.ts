import swaggerConfig from "./swagger-config"
const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' })

const doc = {
  info: {
    title: 'CEX EXCHANGE',
    description: 'Description',
  },
  host: 'localhost:5000',
  schemes: ['http'],
};
export default async function main(){
  await  swaggerAutogen('documentation/documentation.json', ['./router/index.ts'],swaggerConfig,doc);
}