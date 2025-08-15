import { useParams } from 'react-router-dom';
import axios from 'axios';

const UserDetail = ({ users, blogs }) => {
  const { id } = useParams();
  const user = users.find(user => user.id === id)

  if (!user) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <p>Username: {user.username}</p>
      <h3>Blogs</h3>
      <ul>
        {blogs.filter(blog => blog.user.id === id)
          .map(blog => {
            return (
              <li key={blog.id}>
                {blog.title}
              </li>
            )
          })}
      </ul>
    </div>
  );
};

export default UserDetail;