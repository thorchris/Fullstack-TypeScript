import { Friends } from './dbConnectors';

// resolver map
export const resolvers = {
  Query: {
    getFriend: (root, { id }) => {
      return Friends.findById(id);
    },
    allFriends: () => {
      return Friends.find({})
    }
  },
  Mutation: {
    createFriend: async (root, { input }) => {
      const newFriend = new Friends({
        firstName: input.firstName,
        lastName: input.lastName,
        gender: input.gender,
        age: input.age,
        email: input.email,
        contacts: input.contacts
      });
      return newFriend.save()
    },
    updateFriend: (root, { input }) => {
        return Friends.findOneAndUpdate({ _id: input.id }, input, { new: true });
      },
      deleteFriend: async (root, { id }) => {
        const res = await Friends.deleteOne({ _id: id })
        if(res.deletedCount ===1){
          return "Succesfully deleted a friend"
        }
        throw new Error("Could not delete a friend with the provided id")
        
      }
  },
};
