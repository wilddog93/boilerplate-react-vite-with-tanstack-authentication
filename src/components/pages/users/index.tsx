
import { gql, useQuery } from '@apollo/client'



interface Users {
  id: string;
  name: string;
  email: string;
}

type DataType = {
  users: Users[];
}

const USERS_QUERY = gql`
  query USERS_QUERY {
  users {
    id
    name
    email
  }
}
`

export default function UserPage() {
  const { data, loading, error, } = useQuery<DataType>(USERS_QUERY)
  if (loading) return <div>loading...</div>
  if (error) return <div>error</div>
  if (!data) return <div>no data</div>
  return (
    <div>
      {data.users.map((user) => (
        <div key={user.id}>
          {user.name}
        </div>
      ))}
    </div>
  )
}
