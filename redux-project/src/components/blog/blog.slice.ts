import { Post } from './../../types/blog.type'
import http from '../../utils/http'
import {
  createAction,
  createReducer,
  createSlice,
  current,
  nanoid,
  PayloadAction,
  createAsyncThunk
} from '@reduxjs/toolkit'

interface BlogState {
  postList: Post[]
  editingPost: Post | null
}

const initialState: BlogState = {
  postList: [],
  editingPost: null
}

export const getPostList = createAsyncThunk('blog/getPostList', async (_, thunkAPI) => {
  const response = await http.get<Post[]>('posts', {
    signal: thunkAPI.signal
  })
  return response.data
})

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    // ! DO NOT MUTATE STATE BY ANY CIRCUMSTANCES WHEN USING NORMAL REDUX
    // * React/Toolkit uses ImmerJs
    // * ImmerJS helps savely mutate an object
    // * ImmerJS will create a draft state for us to mutate

    addPost: {
      reducer: (state, action: PayloadAction<Post>) => {
        const post = action.payload
        state.postList.push(post)
      },
      prepare: (post: Omit<Post, 'id'>) => {
        return {
          payload: {
            ...post,
            id: nanoid()
          }
        }
      }
    },
    deletePost(state, action: PayloadAction<string>) {
      const selectedID = action.payload
      state.postList = state.postList.filter((post) => post.id !== selectedID)
    },
    startEditingPost(state, action: PayloadAction<string>) {
      const selectedID = action.payload
      const foundPost = state.postList.find((post) => post.id === selectedID) || null
      state.editingPost = foundPost
    },
    cancelEditingPost(state) {
      state.editingPost = null
    },
    updatePost(state, action: PayloadAction<Post>) {
      const postID = action.payload.id
      state.postList.some((post, index) => {
        if (post.id === postID) {
          state.postList[index] = action.payload
          return true
        }
        return false
      })
      state.editingPost = null
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getPostList.fulfilled, (state, action) => {
        state.postList = action.payload
      })
      .addMatcher(
        (action) => action.type.includes('cancel'),
        (state) => {
          console.log(current(state))
        }
      )
      .addDefaultCase((state, action) => {
        console.log(`action type: ${action.type} `, current(state))
      })
  }
})

export const { addPost, cancelEditingPost, deletePost, startEditingPost, updatePost } = blogSlice.actions

const blogReducer = blogSlice.reducer
export default blogReducer
