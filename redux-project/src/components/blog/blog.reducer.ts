import { initialPostList } from './../../constant/blog'
import { Post } from './../../types/blog.type'
import { createAction, createReducer, current, nanoid } from '@reduxjs/toolkit'

interface BlogState {
  postList: Post[]
  editingPost: Post | null
}

const initialState: BlogState = {
  postList: initialPostList,
  editingPost: null
}

export const addPost = createAction('blog/addPost', function (post: Omit<Post, 'id'>) {
  return {
    payload: {
      ...post,
      id: nanoid()
    }
  }
})
export const deletePost = createAction<string>('blog/deletePost')
export const startEditingPost = createAction<string>('blog/startEditingPost')
export const cancelEditingPost = createAction('blog/cancelEditingPost')
export const updatePost = createAction<Post>('blog/updatePost')

const blogReducer = createReducer(initialState, (builder) => {
  // ! DO NOT MUTATE STATE BY ANY CIRCUMSTANCES WHEN USING NORMAL REDUX
  // * React/Toolkit uses ImmerJs
  // * ImmerJS helps savely mutate an object
  // * ImmerJS will create a draft state for us to mutate

  builder
    .addCase(addPost, (state, action) => {
      const post = action.payload
      state.postList.push(post)
    })
    .addCase(deletePost, (state, action) => {
      const selectedID = action.payload
      state.postList = state.postList.filter((post) => post.id !== selectedID)
    })
    .addCase(startEditingPost, (state, action) => {
      const selectedID = action.payload
      const foundPost = state.postList.find((post) => post.id === selectedID) || null
      state.editingPost = foundPost
    })
    .addCase(cancelEditingPost, (state, action) => {
      state.editingPost = null
    })
    .addCase(updatePost, (state, action) => {
      const postID = action.payload.id
      state.postList.some((post, index) => {
        if (post.id === postID) {
          state.postList[index] = action.payload
          return true
        }
        return false
      })
      state.editingPost = null
    })
    .addMatcher(
      (action) => action.type.includes('cancel'),
      (state, action) => {
        console.log(current(state))
      }
    )
})

export default blogReducer
