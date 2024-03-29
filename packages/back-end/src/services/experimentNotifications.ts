import { Context } from "../models/BaseModel";
import { ExperimentNotificationModel } from "../models/ExperimentNotification";
import { createEvent } from "../models/EventModel";
import { getExperimentById } from "../models/ExperimentModel";
import { EventNotifier } from "../events/notifiers/EventNotifier";
import { ExperimentInfoNotificationEvent } from "../events/notification-events";

export const notifyFailedAutoUpdate = async ({
  context,
  experimentId,
}: {
  context: Context;
  experimentId: string;
}) => {
  const experiment = await getExperimentById(context, experimentId);

  if (!experiment) throw new Error("Error while fetching experiment!");

  const payload: ExperimentInfoNotificationEvent = {
    event: "experiment.info",
    object: "experiment",
    data: {
      type: "auto-update-failed",
      experimentId,
      experimentName: experiment.name,
    },
    user: {
      type: "dashboard",
      id: context.userId,
      email: context.email,
      name: context.userName,
    },
  };

  const emittedEvent = await createEvent(context.org.id, payload);

  if (!emittedEvent) throw new Error("Error while creating event!");

  new EventNotifier(emittedEvent.id).perform();
};

export const notifyMetricsChange = async ({
  context,
  experimentId,
}: {
  context: Context;
  experimentId: string;
}) => {
  const experimentNotification = new ExperimentNotificationModel(context);
  const notifications = await experimentNotification.getAllByAttributes({
    trigger: "snapshot",
    experimentId,
  });

  notifications.forEach((n) => experimentNotification.onTrigger(n));
};