/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { useQuery, gql } from "@apollo/client"
import ILyndaFriend from "../interfaces/interfaces"
import { resolveProjectReferencePath } from "typescript";

interface IFriends {
  allFriends: ILyndaFriend[]
}


export const ALL_FRIENDS = gql`
 query {
  allFriends {
    id
    firstName
    lastName
    gender
    email
    age
  }
}
`

export default function All() {
  const {loading, error, data, refetch} = useQuery<IFriends>(
    ALL_FRIENDS,
    {fetchPolicy:"cache-first"}
    //{fetchPolicy:"cache-and-network"}
    )
  if (loading) return <p>loading...</p>
  if (error) return <p>{error.toString()}</p>
  return (
    <div>
      <table className="table">
        <thead>
          <tr><th>ID</th><th>First Name</th><th>Last Name</th><th>Gender</th><th>Email</th><th>Age</th></tr>
        </thead>
        <tbody>
          {data && data.allFriends.map(f => (
            <tr key={f.id}><td>{f.id}</td><td>{f.firstName}</td><td>{f.lastName}</td><td>{f.gender}</td><td>{f.email}</td><td>{f.age}</td></tr>
          ))}
        </tbody>
      </table>
      <button onClick={()=> refetch()}>Refresh</button>
    </div>
  )
}