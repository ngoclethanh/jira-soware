import { IssueTypeWithIcon } from '../models/model';
import { IssueUtil } from '../utils/issues';
import { IssuePriority, IssueStatus, IssueType } from './enums';

export class ProjectConst {
  /* eslint-disable @typescript-eslint/naming-convention */
  static readonly IssueId = 'issueId';
  static readonly Projects = 'Projects';
  static PrioritiesWithIcon = [
    {
      id: 1,
      name: 'Lowest',
      avatarUrl: IssueUtil.getIssuePriorityIcon(IssuePriority.LOWEST),
    },
    {
      id: 2,
      name: 'Low',
      avatarUrl: IssueUtil.getIssuePriorityIcon(IssuePriority.LOW),
    },
    {
      id: 3,
      name: 'Medium',
      avatarUrl: IssueUtil.getIssuePriorityIcon(IssuePriority.MEDIUM),
    },
    {
      id: 4,
      name: 'High',
      avatarUrl: IssueUtil.getIssuePriorityIcon(IssuePriority.HIGH),
    },
    {
      id: 5,
      name: 'Highest',
      avatarUrl: IssueUtil.getIssuePriorityIcon(IssuePriority.HIGHEST),
    },
  ];

  static IssueTypesWithIcon: IssueTypeWithIcon[] = [
    new IssueTypeWithIcon(IssueType.BUG),
    new IssueTypeWithIcon(IssueType.STORY),
    new IssueTypeWithIcon(IssueType.TASK),
  ];
  /* eslint-enable @typescript-eslint/naming-convention */
}

export const IssueStatusDisplay = {
  [IssueStatus.BACKLOG]: 'Backlog',
  [IssueStatus.SELECTED]: 'Selected for Development',
  [IssueStatus.IN_PROGRESS]: 'In progress',
  [IssueStatus.DONE]: 'Done',
};

export const IssuePriorityColors = {
  [IssuePriority.HIGHEST]: '#CD1317',
  [IssuePriority.HIGH]: '#E9494A',
  [IssuePriority.MEDIUM]: '#E97F33',
  [IssuePriority.LOW]: '#2D8738',
  [IssuePriority.LOWEST]: '#57A55A',
};
