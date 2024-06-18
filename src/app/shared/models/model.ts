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
  
  // eslint-disable-next-line no-shadow
  export enum ProjectCategory {
    SOFTWARE = 'Software',
    MARKETING = 'Marketing',
    BUSINESS = 'Business'
  }

  export enum IssueType {
    STORY = 'Story',
    TASK = 'Task',
    BUG = 'Bug'
  }
  
  export enum IssueStatus {
    BACKLOG = 'Backlog',
    SELECTED = 'Selected',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    IN_PROGRESS = 'InProgress',
    DONE = 'Done'
  }
  
  export const IssueStatusDisplay = {
    [IssueStatus.BACKLOG]: 'Backlog',
    [IssueStatus.SELECTED]: 'Selected for Development',
    [IssueStatus.IN_PROGRESS]: 'In progress',
    [IssueStatus.DONE]: 'Done'
  };
  
  export enum IssuePriority {
    LOWEST = 'Lowest',
    LOW = 'Low',
    MEDIUM = 'Medium',
    HIGH = 'High',
    HIGHEST = 'Highest'
  }
  
  export const IssuePriorityColors = {
    [IssuePriority.HIGHEST]: '#CD1317',
    [IssuePriority.HIGH]: '#E9494A',
    [IssuePriority.MEDIUM]: '#E97F33',
    [IssuePriority.LOW]: '#2D8738',
    [IssuePriority.LOWEST]: '#57A55A'
  };
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
  /* eslint-enable no-shadow */