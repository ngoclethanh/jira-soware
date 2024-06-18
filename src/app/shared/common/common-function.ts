import { ActivatedRoute } from "@angular/router";
import { BreadCrumb } from "../models/model";

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
