import React, { useState } from "react";
import ILyndaFriend from "../interfaces/interfaces"
import { useMutation, gql } from "@apollo/client"
import { ALL_FRIENDS } from "./AllFriends"

const ADD_FRIEND = gql`
mutation createFriend($friend: FriendInput) {
  createFriend(input: $friend){
    firstName
    lastName
    email
  }
}
`;

type AddFriendProps = {
  initialFriend?: ILyndaFriend
}

interface IKeyableFriend extends ILyndaFriend {
  [key: string]: any
}
const AddFriend = ({ initialFriend }: AddFriendProps) => {
  const EMPTY_FRIEND: ILyndaFriend = {firstName: "", lastName: "", email: "", role: "" }
  let newFriend:any = initialFriend ? initialFriend : { firstName: "", lastName: "", password: "", email: "" }
  const [friend, setFriend] = useState({ ...newFriend })

  const [addFriend, {data}] = useMutation(
    ADD_FRIEND, 
    {update(cache, { data }) {
      const addedFriend = data.createFriend;
      const d: any = cache.readQuery({ query: ALL_FRIENDS })
      if (!d) {
        return
      }
      let getAllFriends = d.getAllFriends
      cache.writeQuery({
        query: ALL_FRIENDS,
        data: { getAllFriends: [...getAllFriends, addedFriend] }
      })
    }
  }
)

  const handleChange = (event: any) => {
    const id = event.currentTarget.id;
    let friendToChange: IKeyableFriend = { ...friend }
    friendToChange[id] = event.currentTarget.value;
    setFriend({ ...friendToChange })
  }
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //alert(JSON.stringify(friend))
    addFriend({variables:{friend:{ ...friend }}})
    setFriend({ ...EMPTY_FRIEND, password: "" })
  }


  return (
    <form onSubmit={handleSubmit}>
      <label>
        FirstName<br />
        <input type="text" id="firstName" value={friend.firstName} onChange={handleChange} />
      </label>
      <br />
      <label>
        LastName <br />
        <input type="text" id="lastName" value={friend.lastName} onChange={handleChange} />
      </label>
      <br />
      <label>
        Email <br />
        <input type="text" id="email" value={friend.email} onChange={handleChange} />
      </label>
      <br />
      <label>
        Password <br />
        <input type="password" id="password" value={friend.password} onChange={handleChange} />
      </label>
      <br />
      <input type="submit" value="Submit" />
    </form>
  );
}

export default AddFriend;