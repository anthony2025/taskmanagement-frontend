export const baseUrl = "https://app-taskmanagement-sandropucp-dev.azurewebsites.net"

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
    categoryName: 'inbox',
  },
  {
    id: '0002',
    description: 'Finish report',
    categoryName: 'inbox',
  },
  {
    id: '0003',
    description: 'Find a date',
    categoryName: 'inbox',
  },
  {
    id: '0004',
    description: 'Cook lunch',
    categoryName: 'inbox',
  },
  {
    id: '0005',
    description: 'Read a book',
    categoryName: 'inbox',
  },
]

