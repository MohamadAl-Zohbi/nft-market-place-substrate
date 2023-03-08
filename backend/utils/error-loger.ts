import { LogRepository } from "../data-source";
import { Log } from "../entities/Log";

export default async function ErrorLogger(
  e: Error,
  apiName: string,
  userId?: number | undefined
) {
  if (e.name !== "EntityNotFoundError") {
    let log = new Log();
    log.apiName = apiName;
    log.error = e.stack;
    if (userId) log.userId = userId;
    await LogRepository.save(log);
  }
}
