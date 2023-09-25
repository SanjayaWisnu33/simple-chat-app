import { Client, Databases, Account } from 'appwrite';

export const PROJECT_ID = '65102d3a77cad087ebe3'
export const DATABASES_ID = '6510346cbfbc64aad2ce'
export const COLLECTION_ID_MESSAGES = '651034ab5d80b38407da'


const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('65102d3a77cad087ebe3');

export const databases = new Databases(client);
export const account = new Account (client);

export default client;