/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { SeverityPolicy } from './SeverityPolicy';

/**
 * CVE related information
 */
export type CvePolicy = (SeverityPolicy & {
    /**
     * In case of CVE policy this is same as cve name else it is blank
     */
    name?: string,
});
