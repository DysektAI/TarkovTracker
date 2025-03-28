let openapi = {
  openapi: "3.0.0",
  info: {
    title: "TarkovTracker API",
    description:
      "Official TarkovTracker API - player's progress, objectives, level, reputation and much more in one place. If you are missing something here, let the developers know on TarkovTracker Discord server or create a new issue on GitHub.",
    version: "2.0",
    contact: {
      name: "TarkovTracker GitHub",
      url: "https://github.com/DysektAI/TarkovTracker",
    },
    license: { name: "GNU General Public License v3.0" },
  },
  servers: [
    {
      url: "https://tarkovtracker.org/api/v2",
      description: "TarkovTracker API v2 endpoint",
    },
  ],
  tags: [{ name: "Token" }, { name: "Progress" }],
  security: [{ bearer: [] }],
  paths: {
    "/token": {
      get: {
        summary:
          "Returns data associated with the Token given in the Authorization header of the request",
        tags: ["Token"],
        responses: {
          200: { $ref: "#/components/schemas/Token" },
          400: {
            description:
              "Provided API Token is not authorized to access this resource",
          },
        },
      },
    },
    "/progress": {
      get: {
        summary: "Returns progress data of the player",
        tags: ["Progress"],
        responses: {
          200: { $ref: "#/components/schemas/Progress" },
          400: {
            description:
              "Provided API Token is not authorized to access this resource",
          },
        },
      },
    },
    "/team/progress": {
      get: {
        summary: "Returns progress data of all members of the team",
        tags: ["Progress"],
        responses: {
          200: { $ref: "#/components/schemas/TeamProgress" },
          400: {
            description:
              "Provided API Token is not authorized to access this resource",
          },
        },
      },
    },
    "/api/v2/progress/task/{taskId}": {
      post: {
        summary: "Update task progress",
        tags: ["Progress"],
        description: "Update the progress of a task with the provided state.",
        parameters: [
          {
            in: "path",
            name: "taskId",
            required: true,
            description: "The ID of the task to update.",
            schema: { type: "string" },
          },
        ],
        requestBody: {
          required: true,
          description: "The new state of the task.",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  state: {
                    type: "string",
                    description: "The new state of the task.",
                    enum: ["uncompleted", "completed", "failed"],
                  },
                },
              },
            },
          },
        },
        responses: {
          200: { description: "The task was updated successfully." },
          400: { description: "Invalid request parameters." },
          401: { description: "Unauthorized to update progress." },
          500: { description: "Internal server error." },
        },
      },
    },
    "/api/v2/progress/task/objective/{objectiveId}": {
      post: {
        summary: "Update objective progress for a task.",
        tags: ["Progress"],
        description: "Update the progress objectives of tasks.",
        parameters: [
          {
            in: "path",
            name: "objectiveId",
            required: true,
            description: "The ID of the objective to update progress for.",
            schema: { type: "string" },
          },
        ],
        requestBody: {
          required: true,
          description: "Objective properties to update.",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  state: {
                    type: "string",
                    description:
                      "The state of the task objective (completed or uncompleted).",
                    enum: ["completed", "uncompleted"],
                    nullable: true,
                  },
                  count: {
                    type: "integer",
                    description:
                      "The number of items or completions toward the objective's goal.",
                    minimum: 0,
                    nullable: true,
                  },
                },
              },
            },
          },
        },
        responses: {
          200: { description: "The objective was updated successfully." },
          400: { description: "Invalid request parameters." },
          401: { description: "Unauthorized to update progress." },
          500: { description: "Internal server error." },
        },
      },
    },
  },
  components: {
    securitySchemes: {
      bearer: {
        bearerFormat: "Bearer <your-tarkovtracker-API-token>",
        type: "http",
        scheme: "bearer",
      },
    },
    schemas: {
      Token: {
        title: "Token",
        description: "User's progress data.",
        type: "object",
        properties: {
          token: {
            type: "string",
            description: "Shows token used to make this call",
          },
          permissions: {
            type: "array",
            description:
              "List of permissions this token has (GP == Read Personal Progression, TP == Read Team Progression, WP == Write Personal Progression)",
            items: { type: "string" },
          },
        },
      },
      TeamProgress: {
        title: "TeamProgress",
        description: "Array of team member's progress data.",
        type: "array",
        items: { $ref: "#/components/schemas/Progress" },
      },
      Progress: {
        title: "Progress",
        description: "User's progress data.",
        type: "object",
        properties: {
          playerLevel: {
            type: "integer",
            description: "Player's current level",
          },
          gameEdition: {
            type: "integer",
            description:
              "Player's game edition (1 = Standard Edition, 2 == Left to Die Edition, 3 == Prepare to Die Edition, 4 == Edge of Darkness Edition)",
          },
          taskProgress: {
            type: "array",
            description: "Array of task progress data.",
            items: { $ref: "#/components/schemas/TaskProgress" },
          },
          taskObjectivesProgress: {
            type: "array",
            description: "Array of task objective progress data.",
            items: { $ref: "#/components/schemas/TaskObjectiveProgress" },
          },
          hideoutModulesProgress: {
            type: "array",
            description: "Array of hideout module progress data.",
            items: { $ref: "#/components/schemas/HideoutModulesProgress" },
          },
          hideoutPartsProgress: {
            type: "array",
            description: "Array of hideout part progress data.",
            items: { $ref: "#/components/schemas/HideoutPartsProgress" },
          },
          userId: {
            type: "string",
            description: "Player's TarkovTracker UUID",
          },
          displayName: {
            type: "string",
            description:
              "Player's TarkovTracker display name within their team",
          },
          pmcFaction: {
            type: "string",
            description: "Player's PMC faction (USEC, BEAR)",
          },
        },
      },
      TaskProgress: {
        title: "TaskProgress",
        description:
          "Player's progress of a given task. The key is the UUID correlating to the task ID available via the tarkov.dev API",
        type: "object",
        properties: {
          id: {
            type: "string",
            description:
              "UUID correlating to the task ID available via the tarkov.dev API",
          },
          complete: {
            type: "boolean",
            description: "True if a given quest has been completed.",
          },
          failed: {
            type: "boolean",
            description:
              "True if a given quest has been failed in some permanent way (eg. one of three quest options was chosen and the other two are now unavailable)",
          },
          invalid: {
            type: "boolean",
            description:
              "True if a given quest is no longer accessible, but not necessarily failed (eg. wrong faction, part of a quest chain that was not chosen by previous completions)",
          },
        },
      },
      HideoutModulesProgress: {
        title: "HideoutModulesProgress",
        description: "Player's progress on a given hideout module.",
        type: "object",
        properties: {
          id: {
            type: "string",
            description:
              "UUID correlating to the hideout station level ID available via the tarkov.dev API",
          },
          complete: {
            type: "boolean",
            description: "True if a given hideout module has been installed",
          },
        },
      },
      TaskObjectiveProgress: {
        title: "TaskObjectiveProgress",
        description: "Player's progress on a given task objective.",
        type: "object",
        properties: {
          id: {
            type: "string",
            description:
              "UUID correlating to the task objective ID available via the tarkov.dev API",
          },
          count: {
            type: "integer",
            description:
              "Number of items collected for a given objective (if applicable)",
          },
          complete: {
            type: "boolean",
            description: "True if a given objective has been completed",
          },
          invalid: {
            type: "boolean",
            description:
              "True if a given objective is no longer accessible, but not necessarily failed (eg. wrong faction, part of a quest chain that was not chosen by previous completions)",
          },
        },
      },
      HideoutPartsProgress: {
        title: "HideoutPartsProgress",
        description:
          "Player's progress on items needed for hideout module upgrades.",
        type: "object",
        properties: {
          complete: {
            type: "boolean",
            description:
              "True if a given hideout part objective has been completed",
          },
          count: {
            type: "integer",
            description:
              "Number of items collected for a given hideout part objective",
          },
          id: {
            type: "string",
            description:
              "UUID correlating to individual hideout station level item requirements' ID available via the tarkov.dev API",
          },
        },
      },
    },
  },
};
