import {promises} from 'fs';
// import { parseInputDatesAsUTC } from "pg/lib/defaults";

import {query, end} from './lib/db.js'

const DROPFILE = './sql/drop.sql';
const SCHEMAFILE = './sql/schema.sql';
const INSERT = './sql/insert.sql';

async function create() {
  // TODO setja upp gagnagrun + gögn
  
  const dropDate = await promises.readFile(DROPFILE);
  await query(dropDate.toString('utf-8'));
  
  const schemaData = await promises.readFile(SCHEMAFILE);
  await query(schemaData.toString('utf-8'));
  
  const insertData = await promises.readFile(INSERT);
  await query(insertData.toString('utf-8'));
  
  await end();
  
  console.info('Scheme & fake data created');
}


create().catch((err) => {
  console.error('Error creating running setup', err);
});
