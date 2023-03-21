import ForumAPI from '@/service/ForumAPI'
import type { Forum } from '@/types/Forum'
import { defineStore } from 'pinia'

export const useForumStore = defineStore({
  id: 'forumState',
  state: () => ({
    foren: [] as Forum[],
    isLoading: false,
    error: ''
  }),
  getters: {
    forenCount: (state) => state.foren.length,

    getForumById({ foren }): (id: string) => Forum | undefined {
      return (forumId: string): Forum | undefined => {
        return foren.find((forum) => forum.id === forumId)
      }
    }
  },
  actions: {
    async addForum(forum: Forum) {
      try {
        this.isLoading = true
        await ForumAPI.createForum(forum)
        this.isLoading = false
      } catch (error) {
        console.log(error)
        return
      }
      this.foren.unshift(forum)
    },
    async updateForum(forum: Forum) {
      try {
        this.isLoading = true
        await ForumAPI.update(forum.id, forum)
        this.isLoading = false
      } catch (error) {
        console.log(error)
        return
      }
      this.fetchForen()
    },
    async fetchForen() {
      try {
        this.isLoading = true
        const response = await ForumAPI.getForenAll()
        const forenFetched = response.data as Forum[]
        this.foren = forenFetched
        this.isLoading = false
      } catch (error) {
        console.log(error)
      }
    },
    async fetchForumById(id: string) {
      try {
        this.isLoading = true
        const response = await ForumAPI.get(id)
        const forenFetched = response.data as Forum[]
        this.isLoading = false
        this.foren = forenFetched
      } catch (error) {
        console.log(error)
      }
    },

    async removeForum(id: string) {
      try {
        await ForumAPI.delete(id)
      } catch (error) {
        console.log(error)
      }
      this.fetchForen()
    }
  }
})
