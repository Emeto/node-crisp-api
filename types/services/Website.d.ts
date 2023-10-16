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

interface IGetWebsiteAvailabilityStatus {
  error: boolean;
  reason: string;
  data: {
    status: "online" | "away" | "offline";
    since: number;
  };
}

interface IListWebsiteOperatorAvailabilities {
  error: boolean;
  reason: string;
  data: {
    user_id: string;
    type: "online" | "away" | "offline";
    time: {
      for: number;
      since: number;
    }
  };
}

interface ICreateWebsite {
  error: boolean;
  reason: string;
  data: {
    website_id: string;
  };
}

interface IGetWebsite {
  error: boolean;
  reason: string;
  data: {
    website_id: string;
    name: string;
    domain: string;
    logo: string;
  }
}

interface IEmptyResponse {
  error: boolean;
  reason: string;
  data: {};
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
    dateFrom: string,
    dateTo: string,
    dateSplit: string,
    classifier?: string,
    filterPrimary?: string,
    filterSecondary?: string,
    filterTertiary?: string,
  ) => Promise<IAcquireAnalyticsPoints>;

  listAnalyticsFilters: (
    websiteID: string,
    pageNumber?: number,
    dateFrom?: string,
    dateTo?: string,
  ) => Promise<IListAnalyticsFilters>;

  listAnalyticsClassifiers: (
    websiteID: string,
    pageNumber: number,
    pointType: string,
    pointMetric: string,
    dateFrom: string,
    dateTo: string,
  ) => Promise<IListAnalyticsClassifiers>;

  getWebsiteAvailabilityStatus: (
    websiteID: string,
  ) => Promise<IGetWebsiteAvailabilityStatus>;

  listWebsiteOperatorAvailabilities: (
    websiteID: string,
  ) => Promise<IListWebsiteOperatorAvailabilities>;

  checkWebsiteExists: (
    domain: string,
  ) => Promise<any>;

  createWebsite: (
    websiteData: {
      name: string;
      domain: string;
    }
  ) => Promise<ICreateWebsite>;

  getWebsite: (
    websiteID: string,
  ) => Promise<IGetWebsite>;

  deleteWebsite: (
    websiteID: string,
    verify: string,
  ) => Promise<IEmptyResponse>;

  batchResolveConversations: (
    websiteID: string,
    sessions: string[],
  ) => Promise<IEmptyResponse>;

  batchReadConversations: (
    websiteID: string,
    sessions: string[],
  ) => Promise<IEmptyResponse>;

  batchRemoveConversations: (
    websiteID: string,
    sessions: string[],
  ) => Promise<IEmptyResponse>;

  batchRemovePeople: (
    websiteID: string,
    people: {
      profiles: string[];
      search: {
        filter: {
          model: "people";
          criterion: string;
          operator: "eq" | "neq" | "ex" | "nex" | "has" | "nhas" | "sw" | "ew" | "gte" | "lte" | "gt" | "lt";
          query: string[];
        }
      };
    }
  ) => Promise<IEmptyResponse>;
}
