import { IssuePriority, IssueStatus, IssueType, ProjectCategory } from "../common/enums";
import { IssueUtil } from "../utils/issues";

  export interface BreadCrumb {
    label: string;
    url: string;
  }
  export interface JProject {
    id: string;
    name: string;
    url: string;
    description: string;
    category: ProjectCategory;
    createdAt: string;
    updateAt: string;
    //issues: JIssue[];
    //users: JUser[];
  }
  
  
  
  
  export interface JIssue {
    id: string;
    title: string;
    type: IssueType;
    status: IssueStatus;
    priority: IssuePriority;
    listPosition: number;
    description: string;
    estimate: number;
    timeSpent: number;
    timeRemaining: number;
    createdAt: string;
    updatedAt: string;
    reporterId: string;
    userIds: string[];
    //comments: JComment[];
    projectId: string;
  }
  export interface JUser {
    id: string;
    name: string;
    email: string;
    avatarUrl: string;
    createdAt: string;
    updatedAt: string;
    issueIds: string[];
  }
  export class IssueTypeWithIcon {
    value: string;
    icon: string;
  
    constructor(issueType: IssueType) {
      this.value = issueType;
      this.icon = IssueUtil.getIssueTypeIcon(issueType);
    }
  }
  /* eslint-enable no-shadow */
  export class MyTel {
    constructor(
      public area: string,
      public exchange: string,
      public subscriber: string,
    ) {}
  }