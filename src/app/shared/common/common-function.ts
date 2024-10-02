import { ActivatedRoute } from "@angular/router";
import { BreadCrumb } from "../models/model";
import { VALIDATORS_KEY } from "./const";

export function buildBreadCrumb(
  route: ActivatedRoute,
  url: string = '',
  breadcrumbs: Array<BreadCrumb> = []
): Array<BreadCrumb> {
  // If no routeConfig is avalailable we are on the root path
  const label: any = route.routeConfig
    ? route.routeConfig?.data?.['title']
    : 'Projects';
  const path = route.routeConfig ? route.routeConfig.path : '';
  // In the routeConfig the complete path is not available,
  // so we rebuild it each time
  const nextUrl = `${url}${path}/`;
  const breadcrumb = {
    label,
    url: nextUrl,
  };
  const newBreadcrumbs = [...breadcrumbs, breadcrumb];
  if (route.firstChild) {
    // If we are not on our current path yet,
    // there will be more children to look after, to build our breadcumb
    return buildBreadCrumb(route.firstChild, nextUrl, newBreadcrumbs);
  }
  return newBreadcrumbs;
}
export function getErrorValidate(label: string, errorKey: string, errorValue: any) {
  switch (errorKey) {
    case 'required':
      return {
        key: VALIDATORS_KEY[label !== 'EMPTY' ? 'required' : 'requiredNoLabel'],
        required: {
          label: label,
        },
      };
    case 'pattern':
      return {
        key: VALIDATORS_KEY[label !== 'EMPTY' ? 'pattern' : 'patternNoLabel'],
        required: {
          label: label,
        },
      };
    case 'phonePattern':
      return {
        key: VALIDATORS_KEY['phonePattern'],
        required: {},
      };
    case 'maxlength':
      return {
        key: VALIDATORS_KEY['maxlength'],
        required: {
          requiredLength: errorValue['requiredLength'],
        },
      };
    case 'minlength':
      return {
        key: VALIDATORS_KEY['minlength'],
        required: {
          requiredLength: errorValue['requiredLength'],
        },
      };
    case 'min':
      return {
        key: VALIDATORS_KEY['min'],
        required: {
          min: errorValue['min'],
        },
      };
    case 'max':
      return {
        key: VALIDATORS_KEY['max'],
        required: {
          max: errorValue['max'],
        },
      };
    case 'email':
      return {
        key: VALIDATORS_KEY['email'],
        required: {},
      };
    case 'datePattern':
      return {
        key: VALIDATORS_KEY['datePattern'],
        required: {
          datePattern: errorValue['requiredPattern'],
        },
      };
    case 'minDateAndMaxDate':
      return {
        key: VALIDATORS_KEY[label !== 'EMPTY' ? 'minDateAndMaxDate' : 'minDateAndMaxDateNoLabel'],
        required: {
          label: label,
          minDate: errorValue['minDateLabel'],
          maxDate: errorValue['maxDateLabel'],
        },
      };
    case 'minDate':
      return {
        key: VALIDATORS_KEY[label !== 'EMPTY' ? 'minDate' : 'minDateNoLabel'],
        required: {
          label: label,
          minDateLabel: errorValue['minDateLabel'],
        },
      };
    case 'maxDate':
      return {
        key: VALIDATORS_KEY[label !== 'EMPTY' ? 'maxDate' : 'maxDateNoLabel'],
        required: {
          label: label,
          maxDateLabel: errorValue['maxDateLabel'],
        },
      };
    case 'maxDateToday':
      return {
        key: VALIDATORS_KEY[label !== 'EMPTY' ? 'maxDateToday' : 'maxDateTodayNoLabel'],
        required: {
          label: label,
        },
      };
    case 'minDateToday':
      return {
        key: VALIDATORS_KEY[label !== 'EMPTY' ? 'minDateToday' : 'minDateTodayNoLabel'],
        required: {
          label: label,
        },
      };
    default:
      return {
        key: 'EMPTY',
        required: {},
      };
  }
}