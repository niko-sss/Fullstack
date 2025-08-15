import { Link } from 'react-router-dom';
import styled from 'styled-components'

const StyledLink = styled(Link)`
  color: DarkOrange;
  text-decoration: none;
  transition: transform 0.3s ease,
    color 0.3s ease,
    font-weight 0.3s ease;

  &:hover {
    color: black;
    font-weight: bold;
    transform: scale(1.2);
  }
`;

const UserList = ({ blogs, users }) => {

  // axios get users and user.blogs amount
  if (!users || !blogs) {
    return (
      <div>Loading users..</div>
    )
  }

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => {
            return (
              <tr key={user.id}>
                <td>
                  <StyledLink to={`/users/${user.id}`}>{user.name}</StyledLink>
                </td>
                <td>{blogs.filter(blog => blog.user === user.id).length}</td>
              </tr>

            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default UserList