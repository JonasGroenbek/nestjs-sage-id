import { timer, Observable, throwError } from 'rxjs';
import { finalize, mergeMap } from 'rxjs/operators';

export const retry =
  ({
    maxRetryAttempts = 3,
    scalingDuration = 300,
    excludedStatusCodes = [],
  }: {
    maxRetryAttempts?: number;
    scalingDuration?: number;
    excludedStatusCodes?: number[];
  } = {}) =>
  (attempts: Observable<any>) => {
    return attempts.pipe(
      mergeMap((error, i) => {
        const retryAttempt = i + 1;
        // if maximum number of retries have been met
        // or response is a status code we don't wish to retry, throw error
        if (
          retryAttempt > maxRetryAttempts ||
          excludedStatusCodes.find((e) => e === error.status)
        ) {
          return throwError(() => error);
        }
        console.error(
          `Attempt ${retryAttempt}: retrying in ${
            retryAttempt * scalingDuration
          }ms, status: ${error?.response?.status}, url: ${error?.config?.url}`,
        );
        // retry after 1s, 2s, etc...
        return timer(retryAttempt * scalingDuration);
      }),
      finalize(() => console.log('Finishing retry strategy.')),
    );
  };
