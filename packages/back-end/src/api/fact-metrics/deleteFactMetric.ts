import { deleteFactMetricValidator } from "@back-end/src/validators/openapi";
import { DeleteFactMetricResponse } from "@back-end/types/openapi";
import {
  deleteFactMetric as deleteFactMetricInDb,
  getFactMetric,
} from "@back-end/src/models/FactMetricModel";
import { createApiRequestHandler } from "@back-end/src/util/handler";

export const deleteFactMetric = createApiRequestHandler(
  deleteFactMetricValidator
)(
  async (req): Promise<DeleteFactMetricResponse> => {
    let id = req.params.id;
    // Add `fact__` prefix if it doesn't exist
    if (!id.startsWith("fact__")) {
      id = `fact__${id}`;
    }

    const factMetric = await getFactMetric(req.context, id);
    if (!factMetric) {
      throw new Error(
        "Unable to delete - Could not find factMetric with that id"
      );
    }

    if (!req.context.permissions.canDeleteMetric(factMetric)) {
      req.context.permissions.throwPermissionError();
    }

    await deleteFactMetricInDb(req.context, factMetric);

    return {
      deletedId: id,
    };
  }
);
