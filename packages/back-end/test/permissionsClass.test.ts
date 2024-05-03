import { Permissions } from "../../shared/src/permissions";
import { roleToPermissionMap } from "../src/util/organization.util";
import { OrganizationInterface } from "../types/organization";

const testOrg: OrganizationInterface = {
  id: "org_sktwi1id9l7z9xkjb",
  name: "Test Org",
  ownerEmail: "test@test.com",
  url: "https://test.com",
  dateCreated: new Date(),
  invites: [],
  members: [
    {
      id: "base_user_123",
      role: "readonly",
      dateCreated: new Date(),
      limitAccessByEnvironment: false,
      environments: [],
      projectRoles: [],
      teams: [],
    },
  ],
  settings: {
    environments: [
      { id: "development" },
      { id: "staging" },
      { id: "production" },
    ],
  },
};

class TestPermissions extends Permissions {
  public constructor() {
    super(
      {
        global: {
          permissions: roleToPermissionMap("noaccess", testOrg),
          limitAccessByEnvironment: false,
          environments: [],
        },
        projects: {},
      },
      false
    );

    this.checkGlobalPermission = jest.fn(() => true);
    this.checkProjectFilterPermission = jest.fn(() => true);
    this.checkProjectFilterUpdatePermission = jest.fn(() => true);
  }
}

// GLOBAL_PERMISSIONS HELPER METHODS
describe("canCreatePresentation", () => {
  it("Calls checkGlobalPermission with the correct parameters", () => {
    const p = new TestPermissions();
    p.canCreatePresentation();
    expect(p.checkGlobalPermission).toHaveBeenCalledWith("createPresentations");
  });
});

describe("canUpdatePresentation", () => {
  it("Calls checkGlobalPermission with the correct parameters", () => {
    const p = new TestPermissions();
    p.canUpdatePresentation();
    expect(p.checkGlobalPermission).toHaveBeenCalledWith("createPresentations");
  });
});

describe("canDeletePresentation", () => {
  it("Calls checkGlobalPermission with the correct parameters", () => {
    const p = new TestPermissions();
    p.canDeletePresentation();
    expect(p.checkGlobalPermission).toHaveBeenCalledWith("createPresentations");
  });
});

describe("canCreateDimension", () => {
  it("Calls checkGlobalPermission with the correct parameters", () => {
    const p = new TestPermissions();
    p.canCreateDimension();
    expect(p.checkGlobalPermission).toHaveBeenCalledWith("createDimensions");
  });
});

describe("canUpdateDimension", () => {
  it("Calls checkGlobalPermission with the correct parameters", () => {
    const p = new TestPermissions();
    p.canUpdateDimension();
    expect(p.checkGlobalPermission).toHaveBeenCalledWith("createDimensions");
  });
});

describe("canDeleteDimension", () => {
  it("Calls checkGlobalPermission with the correct parameters", () => {
    const p = new TestPermissions();
    p.canDeleteDimension();
    expect(p.checkGlobalPermission).toHaveBeenCalledWith("createDimensions");
  });
});

describe("canUpdateSegment", () => {
  it("Calls checkGlobalPermission with the correct parameters", () => {
    const p = new TestPermissions();
    p.canUpdateSegment();
    expect(p.checkGlobalPermission).toHaveBeenCalledWith("createSegments");
  });
});

describe("canDeleteSegment", () => {
  it("Calls checkGlobalPermission with the correct parameters", () => {
    const p = new TestPermissions();
    p.canDeleteSegment();
    expect(p.checkGlobalPermission).toHaveBeenCalledWith("createSegments");
  });
});

describe("canManageNorthStarMetric", () => {
  it("Calls checkGlobalPermission with the correct parameters", () => {
    const p = new TestPermissions();
    p.canManageNorthStarMetric();
    expect(p.checkGlobalPermission).toHaveBeenCalledWith(
      "manageNorthStarMetric"
    );
  });
});

describe("canManageBilling", () => {
  it("Calls checkGlobalPermission with the correct parameters", () => {
    const p = new TestPermissions();
    p.canManageBilling();
    expect(p.checkGlobalPermission).toHaveBeenCalledWith("manageBilling");
  });
});

describe("canManageIntegrations", () => {
  it("Calls checkGlobalPermission with the correct parameters", () => {
    const p = new TestPermissions();
    p.canManageIntegrations();
    expect(p.checkGlobalPermission).toHaveBeenCalledWith("manageIntegrations");
  });
});

describe("canCreateApiKey", () => {
  it("Calls checkGlobalPermission with the correct parameters", () => {
    const p = new TestPermissions();
    p.canCreateApiKey();
    expect(p.checkGlobalPermission).toHaveBeenCalledWith("manageApiKeys");
  });
});

describe("canDeleteApiKey", () => {
  it("Calls checkGlobalPermission with the correct parameters", () => {
    const p = new TestPermissions();
    p.canDeleteApiKey();
    expect(p.checkGlobalPermission).toHaveBeenCalledWith("manageApiKeys");
  });
});

describe("canManageTeam", () => {
  it("Calls checkGlobalPermission with the correct parameters", () => {
    const p = new TestPermissions();
    p.canManageTeam();
    expect(p.checkGlobalPermission).toHaveBeenCalledWith("manageTeam");
  });
});

describe("canManageOrgSettings", () => {
  it("Calls checkGlobalPermission with the correct parameters", () => {
    const p = new TestPermissions();
    p.canManageOrgSettings();
    expect(p.checkGlobalPermission).toHaveBeenCalledWith(
      "organizationSettings"
    );
  });
});

describe("canSuperDeleteReport", () => {
  it("Calls checkGlobalPermission with the correct parameters", () => {
    const p = new TestPermissions();
    p.canSuperDeleteReport();
    expect(p.checkGlobalPermission).toHaveBeenCalledWith("superDeleteReport");
  });
});

// PROJECT_SCOPED_PERMISSIONS HELPER METHODS
describe("canCreateVisualChange", () => {
  it("Calls checkProjectFilterPermission with the correct parameters", () => {
    const p = new TestPermissions();
    expect(p.canCreateVisualChange({ project: "a" }));
    expect(p.checkProjectFilterPermission).toHaveBeenCalledWith(
      { projects: ["a"] },
      "manageVisualChanges"
    );
  });
});

describe("canUpdateVisualChange", () => {
  it("Calls checkProjectFilterPermission with the correct parameters", () => {
    const p = new TestPermissions();
    expect(p.canUpdateVisualChange({ project: "a" }));
    expect(p.checkProjectFilterPermission).toHaveBeenCalledWith(
      { projects: ["a"] },
      "manageVisualChanges"
    );
  });
});

describe("canViewAttributeModal", () => {
  it("Calls checkProjectFilterPermission with the correct paramters", () => {
    const p = new TestPermissions();
    expect(p.canViewAttributeModal("a"));
    expect(p.checkProjectFilterPermission).toHaveBeenCalledWith(
      { projects: ["a"] },
      "manageTargetingAttributes"
    );
  });
});

describe("canCreateAttribute", () => {
  it("Calls checkProjectFilterPermission with the correct paramters", () => {
    const p = new TestPermissions();
    expect(p.canCreateAttribute({ projects: ["a", "b"] }));
    expect(p.checkProjectFilterPermission).toHaveBeenCalledWith(
      { projects: ["a", "b"] },
      "manageTargetingAttributes"
    );
  });
});

describe("canUpdateAttribute", () => {
  it("Calls checkProjectFilterUpdatePermission with the correct paramters", () => {
    const p = new TestPermissions();
    expect(p.canUpdateAttribute({ projects: ["a", "b"] }, { projects: ["a"] }));
    expect(p.checkProjectFilterUpdatePermission).toHaveBeenCalledWith(
      { projects: ["a", "b"] },
      { projects: ["a"] },
      "manageTargetingAttributes"
    );
  });
});

describe("canDeleteAttribute", () => {
  it("Calls checkProjectFilterPermission with the correct paramters", () => {
    const p = new TestPermissions();
    expect(p.canDeleteAttribute({ projects: ["a", "b"] }));
    expect(p.checkProjectFilterPermission).toHaveBeenCalledWith(
      { projects: ["a", "b"] },
      "manageTargetingAttributes"
    );
  });
});

describe("canViewFeatureModal", () => {
  it("Calls checkProjectFilterPermission with the correct paramters", () => {
    const p = new TestPermissions();
    expect(p.canViewFeatureModal("a"));
    expect(p.checkProjectFilterPermission).toHaveBeenCalledWith(
      { projects: ["a"] },
      "manageFeatures"
    );
  });
});

describe("canCreateFeature", () => {
  it("Calls checkProjectFilterPermission with the correct paramters", () => {
    const p = new TestPermissions();
    expect(p.canCreateFeature({ project: "a" }));
    expect(p.checkProjectFilterPermission).toHaveBeenCalledWith(
      { projects: ["a"] },
      "manageFeatures"
    );
  });
});

describe("canUpdateFeature", () => {
  it("Calls checkProjectFilterPermission with the correct paramters", () => {
    const p = new TestPermissions();
    expect(p.canUpdateFeature({ project: "a" }, { project: "b" }));
    expect(p.checkProjectFilterUpdatePermission).toHaveBeenCalledWith(
      { projects: ["a"] },
      { projects: ["b"] },
      "manageFeatures"
    );
  });
});

describe("canDeleteFeature", () => {
  it("Calls checkProjectFilterPermission with the correct paramters", () => {
    const p = new TestPermissions();
    expect(p.canDeleteFeature({ project: "a" }));
    expect(p.checkProjectFilterPermission).toHaveBeenCalledWith(
      { projects: ["a"] },
      "manageFeatures"
    );
  });
});

describe("canViewExperimentModal", () => {
  it("Calls checkProjectFilterPermission with the correct paramters", () => {
    const p = new TestPermissions();
    expect(p.canViewExperimentModal("a"));
    expect(p.checkProjectFilterPermission).toHaveBeenCalledWith(
      { projects: ["a"] },
      "createAnalyses"
    );
  });
});

describe("canCreateExperiment", () => {
  it("Calls checkProjectFilterPermission with the correct paramters", () => {
    const p = new TestPermissions();
    expect(p.canCreateExperiment({ project: "a" }));
    expect(p.checkProjectFilterPermission).toHaveBeenCalledWith(
      { projects: ["a"] },
      "createAnalyses"
    );
  });
});

describe("canUpdateExperiment", () => {
  it("Calls checkProjectFilterPermission with the correct paramters", () => {
    const p = new TestPermissions();
    expect(p.canUpdateExperiment({ project: "a" }, { project: "b" }));
    expect(p.checkProjectFilterUpdatePermission).toHaveBeenCalledWith(
      { projects: ["a"] },
      { projects: ["b"] },
      "createAnalyses"
    );
  });
});

describe("canDeleteExperiment", () => {
  it("Calls checkProjectFilterPermission with the correct paramters", () => {
    const p = new TestPermissions();
    expect(p.canDeleteExperiment({ project: "a" }));
    expect(p.checkProjectFilterPermission).toHaveBeenCalledWith(
      { projects: ["a"] },
      "createAnalyses"
    );
  });
});

describe("canViewReportModal", () => {
  it("Calls checkProjectFilterPermission with the correct paramters", () => {
    const p = new TestPermissions();
    expect(p.canViewReportModal("a"));
    expect(p.checkProjectFilterPermission).toHaveBeenCalledWith(
      { projects: ["a"] },
      "createAnalyses"
    );
  });
});

describe("canCreateReport", () => {
  it("Calls checkProjectFilterPermission with the correct paramters", () => {
    const p = new TestPermissions();
    expect(p.canCreateReport({ project: "a" }));
    expect(p.checkProjectFilterPermission).toHaveBeenCalledWith(
      { projects: ["a"] },
      "createAnalyses"
    );
  });
});

describe("canUpdateReport", () => {
  it("Calls checkProjectFilterPermission with the correct paramters", () => {
    const p = new TestPermissions();
    expect(p.canUpdateReport({ project: "a" }));
    expect(p.checkProjectFilterPermission).toHaveBeenCalledWith(
      { projects: ["a"] },
      "createAnalyses"
    );
  });
});

describe("canDeleteReport", () => {
  it("Calls checkProjectFilterPermission with the correct paramters", () => {
    const p = new TestPermissions();
    expect(p.canDeleteReport({ project: "a" }));
    expect(p.checkProjectFilterPermission).toHaveBeenCalledWith(
      { projects: ["a"] },
      "createAnalyses"
    );
  });
});

describe("canViewIdeaModal", () => {
  it("Calls checkProjectFilterPermission with the correct paramters", () => {
    const p = new TestPermissions();
    expect(p.canViewIdeaModal("a"));
    expect(p.checkProjectFilterPermission).toHaveBeenCalledWith(
      { projects: ["a"] },
      "createIdeas"
    );
  });
});

describe("canCreateIdea", () => {
  it("Calls checkProjectFilterPermission with the correct paramters", () => {
    const p = new TestPermissions();
    expect(p.canCreateIdea({ project: "a" }));
    expect(p.checkProjectFilterPermission).toHaveBeenCalledWith(
      { projects: ["a"] },
      "createIdeas"
    );
  });
});

describe("canUpdateIdea", () => {
  it("Calls checkProjectFilterUpdatePermission with the correct paramters", () => {
    const p = new TestPermissions();
    expect(p.canUpdateIdea({ project: "a" }, { project: "b" }));
    expect(p.checkProjectFilterUpdatePermission).toHaveBeenCalledWith(
      { projects: ["a"] },
      { projects: ["b"] },
      "createIdeas"
    );
  });
});

describe("canDeleteIdea", () => {
  it("Calls checkProjectFilterPermission with the correct paramters", () => {
    const p = new TestPermissions();
    expect(p.canDeleteIdea({ project: "a" }));
    expect(p.checkProjectFilterPermission).toHaveBeenCalledWith(
      { projects: ["a"] },
      "createIdeas"
    );
  });
});

describe("canViewCreateFactTableModal", () => {
  it("Calls checkProjectFilterPermission with the correct paramters", () => {
    const p = new TestPermissions();
    expect(p.canViewCreateFactTableModal("a"));
    expect(p.checkProjectFilterPermission).toHaveBeenCalledWith(
      { projects: ["a"] },
      "manageFactTables"
    );
  });
});

describe("canViewEditFactTableModal", () => {
  it("Calls checkProjectFilterPermission with the correct paramters", () => {
    const p = new TestPermissions();
    expect(p.canViewEditFactTableModal({ projects: ["a", "b"] }));
    expect(p.checkProjectFilterUpdatePermission).toHaveBeenCalledWith(
      { projects: ["a", "b"] },
      {},
      "manageFactTables"
    );
  });
});

describe("canCreateFactTable", () => {
  it("Calls checkProjectFilterPermission with the correct paramters", () => {
    const p = new TestPermissions();
    expect(p.canCreateFactTable({ projects: ["a"] }));
    expect(p.checkProjectFilterPermission).toHaveBeenCalledWith(
      { projects: ["a"] },
      "manageFactTables"
    );
  });
});

describe("canUpdateFactTable", () => {
  it("Calls checkProjectFilterPermission with the correct paramters", () => {
    const p = new TestPermissions();
    expect(p.canUpdateFactTable({ projects: ["a", "b"] }, { projects: ["a"] }));
    expect(p.checkProjectFilterUpdatePermission).toHaveBeenCalledWith(
      { projects: ["a", "b"] },
      { projects: ["a"] },
      "manageFactTables"
    );
  });
});

describe("canDeleteFactTable", () => {
  it("Calls checkProjectFilterPermission with the correct paramters", () => {
    const p = new TestPermissions();
    expect(p.canDeleteFactTable({ projects: ["a"] }));
    expect(p.checkProjectFilterPermission).toHaveBeenCalledWith(
      { projects: ["a"] },
      "manageFactTables"
    );
  });
});

describe("canCreateMetric", () => {
  it("Calls checkProjectFilterPermission with the correct paramters", () => {
    const p = new TestPermissions();
    expect(p.canCreateMetric({ projects: ["a"] }));
    expect(p.checkProjectFilterPermission).toHaveBeenCalledWith(
      { projects: ["a"] },
      "createMetrics"
    );
  });
});

describe("canUpdateMetric", () => {
  it("Calls checkProjectFilterPermission with the correct paramters", () => {
    const p = new TestPermissions();
    expect(p.canUpdateMetric({ projects: ["a"] }, { projects: ["a", "b"] }));
    expect(p.checkProjectFilterUpdatePermission).toHaveBeenCalledWith(
      { projects: ["a"] },
      { projects: ["a", "b"] },
      "createMetrics"
    );
  });
});

describe("canDeleteMetric", () => {
  it("Calls checkProjectFilterPermission with the correct paramters", () => {
    const p = new TestPermissions();
    expect(p.canDeleteMetric({ projects: ["a"] }));
    expect(p.checkProjectFilterPermission).toHaveBeenCalledWith(
      { projects: ["a"] },
      "createMetrics"
    );
  });
});

describe("canManageFeatureDrafts", () => {
  it("Calls checkProjectFilterPermission with the correct paramters", () => {
    const p = new TestPermissions();
    expect(p.canManageFeatureDrafts({ project: "a" }));
    expect(p.checkProjectFilterPermission).toHaveBeenCalledWith(
      { projects: ["a"] },
      "manageFeatureDrafts"
    );
  });
});

describe("canReviewFeatureDrafts", () => {
  it("Calls checkProjectFilterPermission with the correct paramters", () => {
    const p = new TestPermissions();
    expect(p.canReviewFeatureDrafts({ project: "a" }));
    expect(p.checkProjectFilterPermission).toHaveBeenCalledWith(
      { projects: ["a"] },
      "canReview"
    );
  });
});

describe("canBypassApprovalChecks", () => {
  it("Calls checkProjectFilterPermission with the correct paramters", () => {
    const p = new TestPermissions();
    expect(p.canBypassApprovalChecks({ project: "a" }));
    expect(p.checkProjectFilterPermission).toHaveBeenCalledWith(
      { projects: ["a"] },
      "bypassApprovalChecks"
    );
  });
});

describe("canAddComment", () => {
  it("Calls checkProjectFilterPermission with the correct paramters", () => {
    const p = new TestPermissions();
    expect(p.canAddComment(["a"]));
    expect(p.checkProjectFilterPermission).toHaveBeenCalledWith(
      { projects: ["a"] },
      "addComments"
    );
  });
});

describe("canCreateProjects", () => {
  it("Calls checkProjectFilterPermission with the correct paramters", () => {
    const p = new TestPermissions();
    expect(p.canCreateProjects());
    expect(p.checkProjectFilterPermission).toHaveBeenCalledWith(
      { projects: [] },
      "manageProjects"
    );
  });
});

describe("canUpdateSomeProjects", () => {
  it("Calls checkProjectFilterPermission with the correct paramters", () => {
    const p = new TestPermissions();
    expect(p.canUpdateSomeProjects());
    expect(p.checkProjectFilterPermission).toHaveBeenCalledWith(
      { projects: [] },
      "manageProjects"
    );
  });
});

describe("canUpdateProject", () => {
  it("Calls checkProjectFilterPermission with the correct paramters", () => {
    const p = new TestPermissions();
    expect(p.canUpdateProject("a"));
    expect(p.checkProjectFilterPermission).toHaveBeenCalledWith(
      { projects: ["a"] },
      "manageProjects"
    );
  });
});

describe("canDeleteProject", () => {
  it("Calls checkProjectFilterPermission with the correct paramters", () => {
    const p = new TestPermissions();
    expect(p.canDeleteProject("a"));
    expect(p.checkProjectFilterPermission).toHaveBeenCalledWith(
      { projects: ["a"] },
      "manageProjects"
    );
  });
});

describe("canViewCreateDataSourceModal", () => {
  it("Calls checkProjectFilterPermission with the correct paramters", () => {
    const p = new TestPermissions();
    expect(p.canViewCreateDataSourceModal("a"));
    expect(p.checkProjectFilterPermission).toHaveBeenCalledWith(
      { projects: ["a"] },
      "createDatasources"
    );
  });
});

describe("canCreateDataSource", () => {
  it("Calls checkProjectFilterPermission with the correct paramters", () => {
    const p = new TestPermissions();
    expect(p.canCreateDataSource({ projects: ["a"] }));
    expect(p.checkProjectFilterPermission).toHaveBeenCalledWith(
      { projects: ["a"] },
      "createDatasources"
    );
  });
});

describe("canUpdateDataSourceParams", () => {
  it("Calls checkProjectFilterPermission with the correct paramters", () => {
    const p = new TestPermissions();
    expect(p.canUpdateDataSourceParams({ projects: ["a"] }));
    expect(p.checkProjectFilterPermission).toHaveBeenCalledWith(
      { projects: ["a"] },
      "createDatasources"
    );
  });
});

describe("canUpdateDataSourceSettings", () => {
  it("Calls checkProjectFilterPermission with the correct paramters", () => {
    const p = new TestPermissions();
    expect(p.canUpdateDataSourceSettings({ projects: ["a"] }));
    expect(p.checkProjectFilterPermission).toHaveBeenCalledWith(
      { projects: ["a"] },
      "editDatasourceSettings"
    );
  });
});

describe("canDeleteDataSource", () => {
  it("Calls checkProjectFilterPermission with the correct paramters", () => {
    const p = new TestPermissions();
    expect(p.canDeleteDataSource({ projects: ["a"] }));
    expect(p.checkProjectFilterPermission).toHaveBeenCalledWith(
      { projects: ["a"] },
      "createDatasources"
    );
  });
});

describe("canRunExperimentQueries", () => {
  it("Calls checkProjectFilterPermission with the correct parameters", () => {
    const p = new TestPermissions();
    expect(p.canRunExperimentQueries({ projects: ["a", "b"] }));
    expect(p.checkProjectFilterPermission).toHaveBeenCalledWith(
      { projects: ["a", "b"] },
      "runQueries"
    );
  });
});

describe("canRunPastExperimentQueries", () => {
  it("Calls checkProjectFilterPermission with the correct parameters", () => {
    const p = new TestPermissions();
    expect(p.canRunPastExperimentQueries({ projects: ["a", "b"] }));
    expect(p.checkProjectFilterPermission).toHaveBeenCalledWith(
      { projects: ["a", "b"] },
      "runQueries"
    );
  });
});

describe("canRunFactQueries", () => {
  it("Calls checkProjectFilterPermission with the correct parameters", () => {
    const p = new TestPermissions();
    expect(p.canRunFactQueries({ projects: ["a", "b"] }));
    expect(p.checkProjectFilterPermission).toHaveBeenCalledWith(
      { projects: ["a", "b"] },
      "runQueries"
    );
  });
});

describe("canRunTestQueries", () => {
  it("Calls checkProjectFilterPermission with the correct parameters", () => {
    const p = new TestPermissions();
    expect(p.canRunTestQueries({ projects: ["a", "b"] }));
    expect(p.checkProjectFilterPermission).toHaveBeenCalledWith(
      { projects: ["a", "b"] },
      "runQueries"
    );
  });
});

describe("canRunSchemaQueries", () => {
  it("Calls checkProjectFilterPermission with the correct parameters", () => {
    const p = new TestPermissions();
    expect(p.canRunSchemaQueries({ projects: ["a", "b"] }));
    expect(p.checkProjectFilterPermission).toHaveBeenCalledWith(
      { projects: ["a", "b"] },
      "runQueries"
    );
  });
});

describe("canRunHealthQueries", () => {
  it("Calls checkProjectFilterPermission with the correct parameters", () => {
    const p = new TestPermissions();
    expect(p.canRunHealthQueries({ projects: ["a", "b"] }));
    expect(p.checkProjectFilterPermission).toHaveBeenCalledWith(
      { projects: ["a", "b"] },
      "runQueries"
    );
  });
});

describe("canRunMetricQueries", () => {
  it("Calls checkProjectFilterPermission with the correct parameters", () => {
    const p = new TestPermissions();
    expect(p.canRunMetricQueries({ projects: ["a", "b"] }));
    expect(p.checkProjectFilterPermission).toHaveBeenCalledWith(
      { projects: ["a", "b"] },
      "runQueries"
    );
  });
});

//ENV_SCOPED_PERMISSIONS HELPER METHODS

// hasPermission Tests
describe("hasPermission", () => {
  it("hasPermission should always return true if user is superAdmin, regardless of their other roles", () => {
    const permissions = new Permissions(
      {
        global: {
          permissions: roleToPermissionMap("noaccess", testOrg),
          limitAccessByEnvironment: false,
          environments: [],
        },
        projects: {},
      },
      true
    );

    expect(permissions.hasPermission("manageFeatures", "project1")).toEqual(
      true
    );
  });

  it("hasPermission should use project level role over global role when specified", () => {
    const permissions = new Permissions(
      {
        global: {
          permissions: roleToPermissionMap("noaccess", testOrg),
          limitAccessByEnvironment: false,
          environments: [],
        },
        projects: {
          project1: {
            permissions: roleToPermissionMap("engineer", testOrg),
            limitAccessByEnvironment: false,
            environments: [],
          },
        },
      },
      false
    );

    expect(permissions.hasPermission("manageFeatures", "project1")).toEqual(
      true
    );
  });

  it("hasPermission should use global role over project role user doesn't have a specific role for the specified project", () => {
    const permissions = new Permissions(
      {
        global: {
          permissions: roleToPermissionMap("noaccess", testOrg),
          limitAccessByEnvironment: false,
          environments: [],
        },
        projects: {
          project1: {
            permissions: roleToPermissionMap("engineer", testOrg),
            limitAccessByEnvironment: false,
            environments: [],
          },
        },
      },
      false
    );

    expect(permissions.hasPermission("manageFeatures", "project2")).toEqual(
      false
    );
  });

  it("hasPermission should use global role if no project is specified", () => {
    const permissions = new Permissions(
      {
        global: {
          permissions: roleToPermissionMap("noaccess", testOrg),
          limitAccessByEnvironment: false,
          environments: [],
        },
        projects: {
          project1: {
            permissions: roleToPermissionMap("engineer", testOrg),
            limitAccessByEnvironment: false,
            environments: [],
          },
        },
      },
      false
    );

    expect(permissions.hasPermission("manageFeatures", "")).toEqual(false);
  });

  it("hasPermission should return false if user doesn't have env permission", () => {
    const permissions = new Permissions(
      {
        global: {
          permissions: roleToPermissionMap("engineer", testOrg),
          limitAccessByEnvironment: true,
          environments: ["dev"],
        },
        projects: {},
      },
      false
    );

    expect(permissions.hasPermission("publishFeatures", "", ["prod"])).toEqual(
      false
    );
  });

  it("hasPermission should return false if user doesn't have env permission", () => {
    const permissions = new Permissions(
      {
        global: {
          permissions: roleToPermissionMap("engineer", testOrg),
          limitAccessByEnvironment: true,
          environments: ["dev"],
        },
        projects: {},
      },
      false
    );

    expect(permissions.hasPermission("publishFeatures", "", ["dev"])).toEqual(
      true
    );
  });
});

// checkProjectFilterPermission
describe("checkProjectFilterPermission", () => {
  class MockPermissionsHasPermissionsReturnsFalse extends Permissions {
    public constructor() {
      super(
        {
          global: {
            permissions: roleToPermissionMap("noaccess", testOrg),
            limitAccessByEnvironment: false,
            environments: [],
          },
          projects: {
            project1: {
              permissions: roleToPermissionMap("readonly", testOrg),
              limitAccessByEnvironment: false,
              environments: [],
            },
            project2: {
              permissions: roleToPermissionMap("readonly", testOrg),
              limitAccessByEnvironment: false,
              environments: [],
            },
          },
        },
        false
      );

      this.hasPermission = jest.fn(() => false);
    }
  }

  class MockPermissionsHasPermissionsReturnsTrue extends Permissions {
    public constructor() {
      super(
        {
          global: {
            permissions: roleToPermissionMap("noaccess", testOrg),
            limitAccessByEnvironment: false,
            environments: [],
          },
          projects: {
            project1: {
              permissions: roleToPermissionMap("readonly", testOrg),
              limitAccessByEnvironment: false,
              environments: [],
            },
            project2: {
              permissions: roleToPermissionMap("readonly", testOrg),
              limitAccessByEnvironment: false,
              environments: [],
            },
          },
        },
        false
      );

      this.hasPermission = jest.fn(() => true);
    }
  }
  it("Calls this.hasPermission once with the correct parameters & correct number of times for non READ_ONLY_PERMISSION and 1 project", () => {
    const p = new MockPermissionsHasPermissionsReturnsFalse();
    expect(
      p.checkProjectFilterPermission({ projects: ["a"] }, "manageFeatures")
    );
    expect(p.hasPermission).toBeCalledTimes(1);
    expect(p.hasPermission).toHaveBeenCalledWith("manageFeatures", "a");
  });

  it("Calls this.hasPermission 4 times for non READ_ONLY_PERMISSION and 4 project", () => {
    const p = new MockPermissionsHasPermissionsReturnsTrue();
    expect(
      p.checkProjectFilterPermission(
        { projects: ["a", "b", "c", "d"] },
        "manageFeatures"
      )
    );
    expect(p.hasPermission).toBeCalledTimes(4);
  });

  it("Calls this.hasPermission 3 times for READ_ONLY_PERMISSION and 4 project", () => {
    const p = new MockPermissionsHasPermissionsReturnsFalse();
    expect(p.checkProjectFilterPermission({}, "runQueries"));
    expect(p.hasPermission).toBeCalledTimes(3);
  });
});

// checkProjectFilerUpdatePermission

// checkGlobalPermission
describe("checkGlobalPermission", () => {
  class MockPermissions extends Permissions {
    public constructor() {
      super(
        {
          global: {
            permissions: roleToPermissionMap("noaccess", testOrg),
            limitAccessByEnvironment: false,
            environments: [],
          },
          projects: {},
        },
        false
      );

      this.hasPermission = jest.fn(() => true);
    }
  }

  it("Calls this.hasPermission with the correct paramters", () => {
    const p = new MockPermissions();
    expect(p.checkGlobalPermission("createDimensions"));
    expect(p.hasPermission).toBeCalledTimes(1);
    expect(p.hasPermission).toHaveBeenCalledWith("createDimensions", "");
  });
});