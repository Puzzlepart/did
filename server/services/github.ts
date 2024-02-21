import { createAppAuth } from '@octokit/auth-app'
import { request } from '@octokit/request'
import { Service } from 'typedi'
import { environment } from '../utils'

/**
 * GitHub service
 *
 * @category Injectable Container Service
 */
@Service({ global: false })
export class GitHubService {
  private _auth = createAppAuth({
    appId: environment('GITHUB_APPID'),
    installationId: environment('GITHUB_INSTALLATION_ID'),
    privateKey: environment('GITHUB_PRIVATE_KEY'),
    clientId: environment('GITHUB_CLIENT_ID'),
    clientSecret: environment('GITHUB_CLIENT_SECRET')
  })

  /**
   * Retrieves an access token for the GitHub API.
   *
   * @returns A Promise that resolves to a string representing
   * the access token.
   */
  private async _getAccessToken(): Promise<string> {
    const { token } = (await this._auth({ type: 'installation' })) as any
    return token
  }

  /**
   * Creates a new issue in the specified GitHub repository.
   *
   * @param title - The title of the issue.
   * @param body - The body of the issue.
   * @param labels - An array of labels to apply to the issue.
   * @param owner - The owner of the repository. Defaults to the value
   * of the GITHUB_FEEDBACK_OWNER environment variable.
   * @param repo - The name of the repository. Defaults to the value
   * of the GITHUB_FEEDBACK_REPO environment variable.
   *
   * @returns The number of the newly created issue.
   */
  public async createIssue(
    title: string,
    body: string,
    labels: string[],
    owner = environment<string>('GITHUB_FEEDBACK_OWNER'),
    repo = environment<string>('GITHUB_FEEDBACK_REPO')
  ) {
    const issue = {
      title,
      body,
      labels
    }
    const token = await this._getAccessToken()
    const result = await request('POST /repos/{owner}/{repo}/issues', {
      owner,
      repo,
      ...issue,
      headers: {
        authorization: `token ${token}`
      }
    })
    return result.data.number
  }
}
