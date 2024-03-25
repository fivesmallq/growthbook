import type { Response } from "express";
import { AuthRequest } from "@back-end/src/types/AuthRequest";
import { getContextFromReq } from "@back-end/src/services/organizations";
import * as Event from "@back-end/src/models/EventModel";
import { EventInterface } from "@back-end/types/event";
import { ApiErrorResponse } from "@back-end/types/api";

type GetEventsRequest = AuthRequest;

type GetEventsResponse = {
  events: EventInterface<unknown>[];
};

export const getEvents = async (
  req: GetEventsRequest,
  res: Response<GetEventsResponse | ApiErrorResponse>
) => {
  req.checkPermissions("viewEvents");

  const { org } = getContextFromReq(req);

  const events = await Event.getLatestEventsForOrganization(org.id, 50);

  return res.json({ events });
};

type GetEventRequest = AuthRequest<null, { id: string }>;

type GetEventResponse = {
  event: EventInterface<unknown>;
};

export const getEventById = async (
  req: GetEventRequest,
  res: Response<GetEventResponse | ApiErrorResponse>
) => {
  req.checkPermissions("viewEvents");

  const { org } = getContextFromReq(req);

  const event = await Event.getEventForOrganization(req.params.id, org.id);
  if (!event) {
    return res.status(404).json({ message: "Not Found" });
  }

  return res.json({ event });
};
