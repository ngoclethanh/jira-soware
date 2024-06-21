  
  export enum IssuePriority {
    LOWEST = 'Lowest',
    LOW = 'Low',
    MEDIUM = 'Medium',
    HIGH = 'High',
    HIGHEST = 'Highest'
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