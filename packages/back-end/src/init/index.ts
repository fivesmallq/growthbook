import { logger } from "@back-end/src/util/logger";
import { initializeLicenseForOrg } from "@back-end/src/services/licenseData";
import mongoInit from "./mongo";
import { queueInit } from "./queue";

let initPromise: Promise<void>;
export async function init() {
  if (!initPromise) {
    initPromise = (async () => {
      await mongoInit();
      await queueInit();
      await initializeLicenseForOrg();
    })();
  }
  try {
    await initPromise;
  } catch (err) {
    logger.error(err, "Failed to initialize application");
    process.exit(1);
  }
}
