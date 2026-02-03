/**
 * Returns an object containing version information about the application.
 */
export function useVersionInfo() {
  const displayVersionDetailsToooltip = DISPLAY_VERSION_DETAILS === '1'
  return {
    displayVersionDetailsToooltip,
    hashShort: COMMIT_HASH.slice(0, 8),
    branch: BRANCH !== 'HEAD' && BRANCH,
    branchUrl: BRANCH_URL,
    commitUrl: COMMIT_URL,
    lastCommitDatetime: new Date(LAST_COMMIT_DATETIME).toLocaleString()
  }
}
