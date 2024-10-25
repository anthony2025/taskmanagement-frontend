export const tasksUrl = "https://app-taskmanagement-sandropucp-dev.azurewebsites.net/tasks"
export const categoryChangeUrl = "https://app-taskmanagement-sandropucp-dev.azurewebsites.net/categories"

export const corsHeaders = {
  mode: 'cors',
  cache: 'no-cache',
  credentials: 'same-origin',
  headers: {
    'Content-Type': 'application/json'
  },
  redirect: 'follow',
  referrerPolicy: 'no-referrer',
}

export const mockTasks = [
  {
    id: '0001',
    description: 'Take out the garbage',
    category: 'inbox',
  },
  {
    id: '0002',
    description: 'Finish report',
    category: 'inbox',
  },
  {
    id: '0003',
    description: 'Find a date',
    category: 'inbox',
  },
  {
    id: '0004',
    description: 'Cook lunch',
    category: 'inbox',
  },
  {
    id: '0005',
    description: 'Read a book',
    category: 'inbox',
  },
]

