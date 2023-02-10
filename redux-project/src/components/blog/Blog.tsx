import CreatePost from './CreatePost'
import PostList from './PostList'

export default function Blog() {
  return (
    <div className='p-5'>
      <CreatePost />
      <PostList />
    </div>
  )
}
