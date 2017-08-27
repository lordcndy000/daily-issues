import { timestamp } from 'rxjs/operator/timestamp';
// For registration of Users
export interface User {
  $key?: string
  userId: string
  name: string
}

// For adding an Issue
export interface Issue {
  $key?: string
  userId: any
  title: string
  startDate: string
  endDate: string
  details: string
  priority: string
  isResolved: boolean,
  resolveMessage: string,
  timeStamp: any,
  archived: boolean
}
