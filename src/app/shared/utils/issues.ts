import { IssueType } from '../models/model';

export class IssueUtil {
  static getIssueTypeIcon(issueType: string): string {
    let src = '';
    console.log(issueType);

    if (issueType == IssueType.TASK) {
      src =
        'https://tjtech2022.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10318?size=small';
    }
    if (issueType == IssueType.BUG) {
      src =
        'https://tjtech2022.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10303?size=small';
    }
    if (issueType == IssueType.STORY) {
      src =
        'https://tjtech2022.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10315?size=small';
    }
    return src;
  }

  // static getIssuePriorityIcon(issuePriority: IssuePriority): IssuePriorityIcon {
  //   return new IssuePriorityIcon(issuePriority);
  // }

  // static getRandomId(): string {
  //   return `${Math.ceil(Math.random() * 8000)}`;
  // }

  // static searchString(str: string, searchString: string): boolean {
  //   str = str ?? '';
  //   searchString = searchString ?? '';
  //   return str.trim().toLowerCase().includes(searchString.trim().toLowerCase());
  // }
}
