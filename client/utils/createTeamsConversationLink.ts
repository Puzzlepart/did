/**
 * Create Teams conversation link
 *
 * @param users - Users to include in conversation
 * @param message - Message
 * @param topicName - Topic name (optional)
 *
 * @returns A Teams conversation link/URL
 */
export function createTeamsConversationLink(
  users: string[],
  message: string,
  topicName?: string
): string {
  const parameters = { users: users.join(','), topicName, message }
  const queryString = Object.keys(parameters)
    .map((key) => parameters[key] && `${key}=${parameters[key]}`)
    .filter(Boolean)
    .join('&')
  return `https://teams.microsoft.com/l/chat/0/0?${queryString}`
}
