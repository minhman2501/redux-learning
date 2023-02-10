import { FormControl, selectClasses, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import { Post } from 'types/blog.type'
import { useDispatch, useSelector } from 'react-redux'
import { addPost, cancelEditingPost, startEditingPost, updatePost } from '../blog.slice'
import { RootState } from 'store'

export default function CreatePost() {
  const initialState: Post = {
    id: '',
    title: '',
    description: '',
    featuredImage: '',
    publishDate: '',
    isPublished: false
  }
  const [postData, setPostData] = useState<Post>(initialState)
  const editingPost = useSelector((state: RootState) => state.blog.editingPost)
  const dispatch = useDispatch()

  useEffect(() => {
    setPostData(editingPost || initialState)
  }, [editingPost])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (editingPost) {
      dispatch(updatePost(postData))
    } else {
      const postDataWithID = { ...postData }
      dispatch(addPost(postDataWithID))
    }
    setPostData(initialState)
  }
  const handleCancleEditing = () => {
    dispatch(cancelEditingPost())
  }

  return (
    <form onSubmit={handleSubmit} onReset={handleCancleEditing}>
      <FormControl className='mb-4 w-full'>
        <TextField
          id='title'
          label='Title'
          variant='outlined'
          required
          className='mb-3'
          value={postData.title}
          onChange={(event) => setPostData((prev) => ({ ...prev, title: event.target.value }))}
        />
        <TextField
          id='description'
          label='Description'
          variant='outlined'
          required
          className='mb-3'
          value={postData.description}
          onChange={(event) => setPostData((prev) => ({ ...prev, description: event.target.value }))}
        />
        <TextField
          id='featuredImage'
          label='Featured Image'
          variant='outlined'
          required
          value={postData.featuredImage}
          onChange={(event) => setPostData((prev) => ({ ...prev, featuredImage: event.target.value }))}
        />
      </FormControl>
      <div className='mb-4'>
        <label htmlFor='publishDate' className='mb-2 block text-sm font-medium text-gray-900 '>
          Publish Date
        </label>
        <input
          type='date'
          id='publishDate'
          className='block w-56 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500'
          placeholder='Title'
          required
          value={postData.publishDate}
          onChange={(event) => setPostData((prev) => ({ ...prev, publishDate: event.target.value }))}
        />
      </div>
      <div className='mb-4 flex items-center'>
        <input
          id='publish'
          type='checkbox'
          className='h-4 w-4 focus:ring-2 focus:ring-blue-500'
          checked={postData.isPublished}
          onChange={(event) => setPostData((prev) => ({ ...prev, isPublished: event.target.checked }))}
        />

        <label htmlFor='publish' className='ml-2 text-sm font-medium text-gray-900'>
          Publish
        </label>
      </div>
      <div>
        {(editingPost && (
          <>
            <button
              type='submit'
              className='group relative mb-2 mr-2 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-teal-300 to-lime-300 p-0.5 text-sm font-medium text-gray-900 focus:outline-none focus:ring-4 focus:ring-lime-200 group-hover:from-teal-300 group-hover:to-lime-300 '
            >
              <span className='relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 '>
                Update Post
              </span>
            </button>
            <button
              type='reset'
              className='group relative mb-2 mr-2 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 p-0.5 text-sm font-medium text-gray-900 focus:outline-none focus:ring-4 focus:ring-red-100 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 '
            >
              <span className='relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 '>
                Cancel
              </span>
            </button>
          </>
        )) || (
          <button
            className='group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 p-0.5 text-sm font-medium text-gray-900  focus:outline-none focus:ring-4 focus:ring-blue-300 group-hover:from-purple-600 group-hover:to-blue-500  '
            type='submit'
          >
            <span className='relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 '>
              Publish Post
            </span>
          </button>
        )}
      </div>
    </form>
  )
}
