/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useState } from "react";
import { useLazyQuery, gql } from "@apollo/client"
import ILyndaFriend from "../interfaces/interfaces"

interface IFriendResult {
  getOneFriend: ILyndaFriend
}

interface IVariableInput {
  email: {email:string}
}

const GET_FRIEND = gql`
  query getFriend($email: FriendEmail) {
    getOneFriend(input: $email) {
      id
      firstName
      lastName
      email
      role
    }
  }
`;

export default function FindFriend() {
  const [email, setEmail] = useState("")
  const [getFriend, {loading, called, data}] = useLazyQuery<IFriendResult, IVariableInput>(
    GET_FRIEND,
    {fetchPolicy:"cache-and-network"}
  );

  const fetchFriend = () => {
    //alert(`Find friend with id: ${id}`)
    getFriend({variables: {email:{email:email}}})
  }

  return (
    <div>
      <h2>Fetch a friend using the provided id</h2>
      <br/>
      ID:<input type="txt" value={email} onChange={e => {
        setEmail(e.target.value)
      }} />
      &nbsp; <button onClick={fetchFriend}>Find Friend</button>
      <br />
      <br />

      {called && loading && <p>Loading..</p>}
      {data && (
        <div>
         <p>{data.getOneFriend.firstName}</p>
         <p>{data.getOneFriend.lastName}</p>
         </div>
      )}

    </div>)
}
