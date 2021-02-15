/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { VulnerabilityPermission } from './VulnerabilityPermission';

/**
 * Severity related information
 */
export type SeverityPolicy = {
    id: number;
    severity: SeverityPolicy.severity;
    policyOrigin: string;
    policy: VulnerabilityPermission;
}

export namespace SeverityPolicy {

    export enum severity {
        HIGH = 'high',
        MEDIUM = 'medium',
        LOW = 'low',
    }


}
