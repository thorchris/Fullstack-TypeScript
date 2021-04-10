import { MongoClient, Db, Collection } from "mongodb"
import connect from "./connect";
import setupTestData from "./setupTestData"

(async function Tester() {
  const client = await connect();
  const db = client.db("day1ex1")
  const collection = db.collection("inventory")
  const status = await setupTestData(collection)
  
  await collection.insertOne(
      {
        item: 'fishingpole',
        qty: 100,
        size: { h: 155, w: 5, uom: 'cm' },
        status: 'A',
        tags: ['blank', 'red'],
        dim_cm: [14, 21],
        instock: [{ warehouse: 'A', qty: 5 }],   
      }
  )

  const all = await collection.find({}).toArray()
  console.log(all)

  client.close()
})()
