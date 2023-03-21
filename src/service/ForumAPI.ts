import type { Forum } from '@/types/Forum'
import http from '../http-common'

class ForumAPI {
  private static PATH = '/foren'
  getForenAll() {
    return http.get(ForumAPI.PATH)
  }

  get(id: string) {
    return http.get(`${ForumAPI.PATH}/${id}`)
  }

  createForum(forum: Forum) {
    return http.post(ForumAPI.PATH, forum)
  }

  update(id: string, forum: Forum) {
    return http.put(`${ForumAPI.PATH}/${id}`, forum)
  }

  delete(id: string) {
    return http.delete(`${ForumAPI.PATH}/${id}`)
  }
}

export default new ForumAPI()
