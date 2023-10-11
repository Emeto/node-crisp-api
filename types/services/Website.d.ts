export = Website;

type WebsiteResources =
  "WebsiteAnalytics"
  | "WebsiteAvailability"
  | "WebsiteBase"
  | "WebsiteBatch"
  | "WebsiteCampaign"
  | "WebsiteConversation"
  | "WebsiteHelpdesk"
  | "WebsiteOperator"
  | "WebsitePeople"
  | "WebsiteSettings"
  | "WebsiteVerify"
  | "WebsiteVisitors";

type PointType                = "conversation" | "visitor" | "people" | "campaign" | "helpdesk" | "status";
type ConversationPointMetric  = "created" | "responsiveness" | "segment" | "shortcut" | "assigned";
type VisitorPointMetric       = "trigger" | "heatmap" | "calendar";
type PeoplePointMetric        = "created" | "rating";
type CampaignPointMetric      = "sent" | "activity";
type HelpdeskPointMetric      = "read" | "search";
type StatusPointMetric        = "downtime" | "latency";

type PointMetric<T extends string> =
  T extends "conversation" ? ConversationPointMetric :
  T extends "visitor"      ? VisitorPointMetric :
  T extends "people"       ? PeoplePointMetric :
  T extends "campaign"     ? CampaignPointMetric :
  T extends "helpdesk"     ? HelpdeskPointMetric :
  T extends "status"       ? StatusPointMetric :
  never;

interface IAcquireAnalyticsPoints {
  error: boolean;
  reason: string;
  data: {
    pipeline: {
      aggregator: "average" | "summation";
    };
    points: {
      value: number;
      hits: number;
      date: {
        from: number;
        to: number;
      };
    }[];
  }
}

interface IListAnalyticsFilters {
  error: boolean;
  reason: string;
  data: {
    primary: string;
    secondary: string;
    tertiary: string;
    aggregated: number;
  };
}

interface IListAnalyticsClassifiers {
  error: boolean;
  reason: string;
  data: {
    classifier: string;
    aggregated: number;
  };
}

/**
 * Crisp Website Service
 * @class
 * @classdesc This is the Crisp Website Service
 */
declare function Website(): void;
declare class Website {
  /**
   * @private
   * @type {Array}
   */
  private _resources: WebsiteResources[];

  acquireAnalyticsPoints: (
    websiteID: string,
    pointType: PointType,
    pointMetric: PointMetric<PointType>,
    dateForm: string,
    dateTo: string,
    dateSplit: string,
    classifier?: string,
    filterPrimary?: string,
    filterSecondary?: string,
    filterTertiary?: string,
  ) => Promise<IAcquireAnalyticsPoints>;

  listAnalyticsFilters: (
    websiteID: string,
    pointType: string,
    pointMetric: string,
    pageNumber?: number,
    dateForm?: string,
    dateTo?: string,
  ) => Promise<IListAnalyticsFilters>;

  listAnalyticsClassifiers: (
    websiteID: string,
    pageNumber: number,
    pointType: string,
    pointMetric: string,
    dateForm: string,
    dateTo: string,
  ) => Promise<IListAnalyticsClassifiers>;
}
