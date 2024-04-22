import { format, formatDistanceToNow } from 'date-fns'

export function formatDate(date, formatStyle) {
  try {
    switch (formatStyle) {
      case 'absolute':
        return format(date, 'MMM d, yyyy, p')
      case 'abs-date':
        return format(date, 'EEEE, MMMM d, yyyy')
      case 'human':
        return formatDistanceToNow(date, { addSuffix: true })
      default:
        return format(date, 'MMM d, yyyy, p')
    }
  } catch {
    return null
  }
}
