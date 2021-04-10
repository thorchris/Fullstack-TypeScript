import * as mongo from "mongodb"
import FriendFacade from '../src/facades/friendFacade';

import chai from "chai";
const expect = chai.expect;

//use these two lines for more streamlined tests of promise operations
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);

import bcryptjs from "bcryptjs"
import { InMemoryDbConnector } from "../src/config/dbConnector"
import { ApiError } from "../src/errors/apiError";

let friendCollection: mongo.Collection;
let facade: FriendFacade;

describe("## Verify the Friends Facade ##", () => {

    before(async function () {
        //Connect to inmemory test database
        const client = await InMemoryDbConnector.connect();
        //Get the database and initialize the facade
        const db = client.db();
        friendCollection = db.collection("friends");
        //Initialize friendCollection, to operate on the database without the facade
        facade = new FriendFacade(db);
    })

  beforeEach(async () => {
    const hashedPW = await bcryptjs.hash("secret", 4)
    await friendCollection.deleteMany({})
    await friendCollection.insertMany([
      {firstName: "Peter", lastName: "Pan", email: "pp@b.dk", password: hashedPW, role: "user"},
      {firstName: "Donald", lastName: "Duck", email: "dd@b.dk", password: hashedPW, role: "user"}
    ])
  })

  describe("Verify the addFriend method", () => {
    it("It should Add the user Jan", async () => {
      const newFriend = { firstName: "Jan", lastName: "Olsen", email: "jan@b.dk", password: "secret" }
      const status = await facade.addFriend(newFriend);
      expect(status).to.be.not.null
      const jan = await friendCollection.findOne({ email: "jan@b.dk" })
      expect(jan.firstName).to.be.equal("Jan")
    })

    it("It should not add a user with a role (validation fails)", async () => {
      const newFriend = { firstName: "Jan", lastName: "Olsen", email: "jan@b.dk", password: "secret", role: "admin" }
      try{
        await facade.addFriend(newFriend)
        expect(false).to.be.true("Should never get here")
      } catch (err){
        expect(err instanceof ApiError).to.be.true
      }
    })

    //Only works with chai-as-promised
    it("It should not add a user with a role (validation fails)" , async () => {
      const newFriend = {firstName: "Jan", lastName: "Olsen", email: "jan@b.dk", password: "secret", role: "admin"}
      await expect(facade.addFriend(newFriend)).to.be.rejectedWith(ApiError)
    })
  })

  describe("Verify the editFriend method", () => {
    it("It should change lastName to XXXX", async () => {
      const newLastName = {firstName: "Peter", lastName: "XXXX", email: "pp@b.dk", password: "secret"}
      const status = await facade.editFriend("pp@b.dk", newLastName)
      expect(status.modifiedCount).to.equal(1)
      const editFriend = await friendCollection.findOne({email: "pp@b.dk"})
      expect(editFriend.lastName).to.be.equal("XXXX")
    })
  })

  describe("Verify the deleteFriend method", () => {
    it("It should remove the user Peter", async () => {
      const status = await facade.deleteFriend("pp@b.dk")
      expect(status).to.be.true
    })
    it("It should return false, for a user that does not exist", async () => {
      const status = await facade.deleteFriend("lolol@lol.dk")
      expect(status).to.be.false
    })
  })

  describe("Verify the getAllFriends method", () => {
    it("It should get two friends", async () => {
      const status = await facade.getAllFriends()
      expect(status.length).to.be.equal(2)
    })
  })

  describe("Verify the getFriend method", () => {
    it("It should find Donald Duck", async () => {
      const status = await facade.getFrind("dd@b.dk");
      expect(status.firstName).to.be.equal("Donald");
    });
    it("It should not find xxx.@.b.dk", async () => {
      try {
        await facade.getFrind("xxx.@.b.dk");
      } catch (err) {
        expect(err instanceof ApiError).to.be.true;
      }
    });
  });

  describe("Verify the getVerifiedUser method", () => {
    it("It should correctly validate Peter Pan's credential,s", async () => {
      const veriefiedPeter = await facade.getVerifiedUser("pp@b.dk", "secret")
      expect(veriefiedPeter).to.be.not.null;
    })

    it("It should NOT validate Peter Pan's credential,s", async () => {
      const nonVerifiedPeter = await facade.getVerifiedUser("pp@b.dk", "LOLFORKERT")
      expect(nonVerifiedPeter).to.be.null
    })

    it("It should NOT validate a non-existing users credentials", async () => {
      const notValidated = await facade.getVerifiedUser("fake@fake.dk", "fake")
      expect(notValidated).to.be.null
    })
  })

})