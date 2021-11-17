import Ajv2020, { JSONSchemaType } from "ajv/dist/2020";
import formats from "ajv-formats";
const ajv = new Ajv2020({ allErrors: true, parseDate: true });

formats.addFormats(ajv);

export interface IUnleashEvent {
  /**
   * The unique identifier for an event
   */
  eventId: string;
  createdTimestamp?: string;
  receivedTimestamp?: string;
  /**
   * Type of the event
   */
  eventType: "isEnabled" | "getVariant" | "customGoal";
  /**
   * The name of the feature the event happened to
   */
  featureName: string;
  /**
   * Which environment did this event happen in
   */
  environment?: string;
  /**
   * If this is a getVariant event, which variant did the user receive
   */
  variant?: string;
  /**
   * Was the toggle enabled?
   */
  enabled?: boolean;
  /**
   * The unleash context at evaluation time
   */
  context: {
    /**
     * The id of the active user
     */
    userId?: string;
    sessionId?: string;
    /**
     * The environment set at client initialization time. *DEPRECATED*
     */
    environment?: string;
    /**
     * The instance id of the process running the client
     */
    instanceId?: string;
    /**
     * The name of the process running the client
     */
    appName?: string;
    remoteAddr?: string;
    remoteHost?: string;
    properties?: {
      [k: string]: string;
    }[];
  };
}

export const unleashSchema: JSONSchemaType<IUnleashEvent> = {
  type: "object",
  required: ["eventId", "eventType"],
  properties: {
    eventId: {
      type: "string",
      format: "uuid",
      description: "The unique identifier for an event",
    },
    createdTimestamp: {
      type: "string",
      format: "date-time",
      nullable: true,
    },
    receivedTimestamp: {
      type: "string",
      format: "date-time",
      nullable: true,
    },
    eventType: {
      description: "Type of the event",
      type: "string",
      oneOf: [
        {
          enum: ["isEnabled"],
          description: "Event enabled",
        },
        {
          enum: ["getVariant"],
          description: "Get variant",
        },
        {
          enum: ["customGoal"],
          description: "Custom goal",
        },
      ],
    },
    featureName: {
      type: "string",
      description: "The name of the feature the event happened to",
      nullable: true,
    },
    environment: {
      type: "string",
      description: "Which environment did this event happen in",
      nullable: true,
    },
    variant: {
      type: "string",
      description:
        "If this is a getVariant event, which variant did the user receive",
      nullable: true,
    },
    enabled: {
      type: "boolean",
      description: "Was the toggle enabled?",
      nullable: true,
    },
    context: {
      type: "object",
      description: "The unleash context at evaluation time",
      required: [],
      properties: {
        userId: {
          type: "string",
          description: "The id of the active user",
          nullable: true,
        },
        sessionId: {
          type: "string",
          description: "",
          nullable: true,
        },
        environment: {
          type: "string",
          description:
            "The environment set at client initialization time. *DEPRECATED*",
          nullable: true,
        },
        instanceId: {
          type: "string",
          description: "The instance id of the process running the client",
          nullable: true,
        },
        appName: {
          type: "string",
          description: "The name of the process running the client",
          nullable: true,
        },
        remoteAddr: {
          type: "string",
          format: "ipv4",
          nullable: true,
        },
        remoteHost: {
          type: "string",
          nullable: true,
        },
        properties: {
          type: "array",
          required: [],
          items: {
            type: "object",
            additionalProperties: {
              type: "string",
            },
            required: [],
          },
          nullable: true,
        },
      },
    },
  },
};
export const validator = ajv.compile(unleashSchema);

export default validator;
