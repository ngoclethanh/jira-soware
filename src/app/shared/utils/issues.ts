import { IssuePriority, IssueType } from "../common/enums";

export class IssueUtil {
  static getIssueTypeIcon(issueType: string): string {
    let src = '';
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

  static getIssuePriorityIcon(issue:string) :string{
    let src=''
    if (issue == IssuePriority.HIGH) {
      src='https://tjtech2022.atlassian.net/images/icons/priorities/high.svg'
    }
    if (issue == IssuePriority.HIGHEST) {
      src='https://tjtech2022.atlassian.net/images/icons/priorities/highest.svg'
    }
    if (issue == IssuePriority.MEDIUM) {
      src='https://tjtech2022.atlassian.net/images/icons/priorities/medium.svg'
    }
    if (issue == IssuePriority.LOW) {
      src='https://tjtech2022.atlassian.net/images/icons/priorities/low.svg'
    }
    if (issue ==  IssuePriority.LOWEST) {
      src ='https://tjtech2022.atlassian.net/images/icons/priorities/lowest.svg'
    }
    return src;
  }

  // static getRandomId(): string {
  //   return `${Math.ceil(Math.random() * 8000)}`;
  // }

  // static searchString(str: string, searchString: string): boolean {
  //   str = str ?? '';
  //   searchString = searchString ?? '';
  //   return str.trim().toLowerCase().includes(searchString.trim().toLowerCase());
  // }
}
