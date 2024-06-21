import {  IssueTypeWithIcon } from '../models/model';
import { IssuePriority, IssueStatus, IssueType } from './enums';

export class ProjectConst {
  /* eslint-disable @typescript-eslint/naming-convention */
  static readonly IssueId = 'issueId';
  static readonly Projects = 'Projects';
  // static PrioritiesWithIcon: IssuePriorityIcon[] = [
  //   IssueUtil.getIssuePriorityIcon(IssuePriority.LOWEST),
  //   IssueUtil.getIssuePriorityIcon(IssuePriority.LOW),
  //   IssueUtil.getIssuePriorityIcon(IssuePriority.MEDIUM),
  //   IssueUtil.getIssuePriorityIcon(IssuePriority.HIGH),
  //   IssueUtil.getIssuePriorityIcon(IssuePriority.HIGHEST)
  // ];

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
