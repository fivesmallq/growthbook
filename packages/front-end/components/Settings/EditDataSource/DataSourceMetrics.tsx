import { MetricInterface } from "@back-end/types/metric";
import { useState } from "react";
import { FaArchive, FaChevronRight, FaPlus, FaRegCopy } from "react-icons/fa";
import Link from "next/link";
import { ago, datetime } from "shared/dates";
import clsx from "clsx";
import { getMetricLink } from "shared/experiments";
import { DocLink } from "@front-end/components/DocLink";
import { envAllowsCreatingMetrics } from "@front-end/services/env";
import { useAuth } from "@front-end/services/auth";
import useApi from "@front-end/hooks/useApi";
import MoreMenu from "@front-end/components/Dropdown/MoreMenu";
import Tooltip from "@front-end/components/Tooltip/Tooltip";
import MetricForm from "@front-end/components/Metrics/MetricForm";
import { useDefinitions } from "@front-end/services/DefinitionsContext";
import ProjectBadges from "@front-end/components/ProjectBadges";
import AutoGenerateMetricsButton from "@front-end/components/AutoGenerateMetricsButton";
import AutoGenerateMetricsModal from "@front-end/components/AutoGenerateMetricsModal";
import usePermissionsUtil from "@front-end/hooks/usePermissionsUtils";
import { DataSourceQueryEditingModalBaseProps } from "./types";

type DataSourceMetricsProps = Omit<
  DataSourceQueryEditingModalBaseProps,
  "onSave" | "onCancel"
>;

export default function DataSourceMetrics({
  dataSource,
  canEdit,
}: DataSourceMetricsProps) {
  const permissionsUtil = usePermissionsUtil();
  const [
    showAutoGenerateMetricsModal,
    setShowAutoGenerateMetricsModal,
  ] = useState(false);
  const [metricsOpen, setMetricsOpen] = useState(false);
  const [modalData, setModalData] = useState<{
    current: Partial<MetricInterface>;
    edit: boolean;
    duplicate: boolean;
  } | null>(null);
  const { apiCall } = useAuth();
  const { mutateDefinitions } = useDefinitions();

  const { data, mutate } = useApi<{
    metrics: MetricInterface[];
  }>(`/datasource/${dataSource.id}/metrics`);

  const metrics: MetricInterface[] | undefined = data?.metrics;

  const editMetricsPermissions: {
    [id: string]: { canDuplicate: boolean; canUpdate: boolean };
  } = {};
  metrics?.forEach((m) => {
    editMetricsPermissions[m.id] = {
      canDuplicate: permissionsUtil.canCreateMetric(m),
      canUpdate: permissionsUtil.canUpdateMetric(m, {}),
    };
  });

  // Auto-generated metrics inherit the data source's projects, so check that the user has createMetric permission for all of them
  const canCreateMetricsInAllDataSourceProjects = permissionsUtil.canCreateMetric(
    { projects: dataSource.projects }
  );

  return (
    <>
      {showAutoGenerateMetricsModal && (
        <AutoGenerateMetricsModal
          source="datasource-detail-page"
          datasource={dataSource}
          setShowAutoGenerateMetricsModal={setShowAutoGenerateMetricsModal}
          mutate={mutate}
        />
      )}
      {modalData ? (
        <MetricForm
          {...modalData}
          onClose={() => setModalData(null)}
          onSuccess={() => {
            mutateDefinitions();
            mutate();
          }}
          source="datasource-detail"
        />
      ) : null}
      <div className="d-flex flex-row align-items-center justify-content-between">
        <div>
          <h2>
            Metrics{" "}
            <span className="badge badge-purple mx-2 my-0">
              {metrics && metrics.length > 0 ? metrics.length : "0"}
            </span>
          </h2>
          <p className="m-0">
            Metrics are what your experiments are trying to improve (or at least
            not hurt). Below are the metrics defined from this data source.{" "}
            <DocLink docSection="metrics">Learn more.</DocLink>
          </p>
        </div>
        <div className="d-flex flex-row pl-3">
          {canEdit &&
          envAllowsCreatingMetrics() &&
          canCreateMetricsInAllDataSourceProjects ? (
            <>
              <AutoGenerateMetricsButton
                setShowAutoGenerateMetricsModal={
                  setShowAutoGenerateMetricsModal
                }
                datasource={dataSource}
              />
              <button
                className="btn btn-outline-primary font-weight-bold text-nowrap"
                onClick={() =>
                  setModalData({
                    current: {
                      datasource: dataSource.id,
                      projects: dataSource.projects || [],
                    },
                    edit: false,
                    duplicate: false,
                  })
                }
              >
                <FaPlus className="mr-1" /> Add
              </button>
            </>
          ) : null}
          <button
            className="btn text-dark"
            onClick={(e) => {
              e.preventDefault();
              setMetricsOpen(!metricsOpen);
            }}
          >
            <FaChevronRight
              style={{
                transform: `rotate(${metricsOpen ? "90deg" : "0deg"})`,
              }}
            />
          </button>
        </div>
      </div>
      {metricsOpen ? (
        <div className="my-3">
          {metrics && metrics?.length > 0 ? (
            <div>
              {metrics.map((metric) => {
                return (
                  <div key={metric.id} className="card p-3 mb-3 bg-light">
                    <Link href={getMetricLink(metric.id)}>
                      <div
                        className="d-flex flex-row align-items-center justify-content-between"
                        role="button"
                      >
                        <div className="pr-3">
                          <div className="mr-5 w-100">
                            <h4
                              className={
                                metric.status === "archived" ? "text-muted" : ""
                              }
                            >
                              {metric.name}
                            </h4>
                            <div className="d-flex flex-row align-items-center">
                              <div className="pr-3">
                                <strong
                                  className={
                                    metric.status === "archived"
                                      ? "text-muted"
                                      : ""
                                  }
                                >
                                  Type:{" "}
                                </strong>
                                <code
                                  className={
                                    metric.status === "archived"
                                      ? "text-muted"
                                      : ""
                                  }
                                >
                                  {metric.type}
                                </code>
                              </div>
                              <div
                                className={clsx(
                                  {
                                    "text-muted": metric.status === "archived",
                                  },
                                  "pr-3"
                                )}
                              >
                                <strong>Owner: </strong>
                                {metric.owner}
                              </div>
                              <div
                                className={clsx(
                                  {
                                    "text-muted": metric.status === "archived",
                                  },
                                  "pr-3"
                                )}
                              >
                                <strong>Projects: </strong>
                                {!metric?.projects?.length ? (
                                  <ProjectBadges
                                    resourceType="metric"
                                    className="badge-ellipsis align-middle"
                                  />
                                ) : (
                                  <ProjectBadges
                                    resourceType="metric"
                                    projectIds={metric.projects}
                                    className={clsx(
                                      {
                                        "text-muted":
                                          metric.status === "archived",
                                      },
                                      "badge-ellipsis align-middle"
                                    )}
                                  />
                                )}
                              </div>
                              {metric.managedBy !== "config" && (
                                <div
                                  title={datetime(metric.dateUpdated || "")}
                                  className={clsx(
                                    {
                                      "text-muted":
                                        metric.status === "archived",
                                    },
                                    "d-none d-md-table-cell"
                                  )}
                                >
                                  <strong>Last Updated: </strong>
                                  {ago(metric.dateUpdated || "")}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center">
                          <div className="text-muted px-2">
                            {metric.status === "archived" ? (
                              <Tooltip
                                body={"Archived"}
                                innerClassName="p-2"
                                tipMinWidth="auto"
                              >
                                <FaArchive />
                              </Tooltip>
                            ) : null}
                          </div>
                          <MoreMenu className="px-2">
                            {editMetricsPermissions[metric.id].canDuplicate ? (
                              <button
                                className="btn dropdown-item py-2"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  e.preventDefault();
                                  setModalData({
                                    current: {
                                      ...metric,
                                      managedBy: "",
                                      name: metric.name + " (copy)",
                                    },
                                    edit: false,
                                    duplicate: true,
                                  });
                                }}
                              >
                                <FaRegCopy /> Duplicate
                              </button>
                            ) : null}
                            {!metric.managedBy &&
                            editMetricsPermissions[metric.id].canUpdate ? (
                              <button
                                className="btn dropdown-item py-2"
                                color=""
                                onClick={async () => {
                                  const newStatus =
                                    metric.status === "archived"
                                      ? "active"
                                      : "archived";
                                  await apiCall(`/metric/${metric.id}`, {
                                    method: "PUT",
                                    body: JSON.stringify({
                                      status: newStatus,
                                    }),
                                  });
                                  mutateDefinitions({});
                                  mutate();
                                }}
                              >
                                <FaArchive />{" "}
                                {metric.status === "archived"
                                  ? "Unarchive"
                                  : "Archive"}
                              </button>
                            ) : null}
                          </MoreMenu>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="alert alert-info">
              No metrics have been defined from this data source. Click the{" "}
              <strong>Add</strong> button to create your first.
            </div>
          )}
        </div>
      ) : null}
    </>
  );
}
