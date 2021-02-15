/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateVulnerabilityPolicyRequest } from '../models/CreateVulnerabilityPolicyRequest';
import type { CreateVulnerabilityPolicyResponse } from '../models/CreateVulnerabilityPolicyResponse';
import type { DeleteVulnerabilityPolicyResponse } from '../models/DeleteVulnerabilityPolicyResponse';
import type { GetVulnerabilityPolicyResponse } from '../models/GetVulnerabilityPolicyResponse';
import type { ResourceLevel } from '../models/ResourceLevel';
import type { UpdateVulnerabilityPolicyResponse } from '../models/UpdateVulnerabilityPolicyResponse';
import { request as __request } from '../core/request';

export class Service {

    /**
     * Fetch current security policy for global, cluster, environment and application level.
     * @param level
     * @param id
     * @returns GetVulnerabilityPolicyResponse Error or security policy for global, cluster, environment and application.
     * @throws ApiError
     */
    public static async fetchPolicy(
        level: ResourceLevel,
        id?: number,
    ): Promise<GetVulnerabilityPolicyResponse> {
        const result = await __request({
            method: 'GET',
            path: `/security/cve/control/list`,
            query: {
                'level': level,
                'id': id,
            },
        });
        return result.body;
    }

    /**
     * Delete policy
     * @param id
     * @returns DeleteVulnerabilityPolicyResponse Deleted response
     * @throws ApiError
     */
    public static async deletePolicy(
        id: number,
    ): Promise<DeleteVulnerabilityPolicyResponse> {
        const result = await __request({
            method: 'DELETE',
            path: `/security/cve/control/list`,
            query: {
                'id': id,
            },
        });
        return result.body;
    }

    /**
     * Update policy
     * @param id
     * @param action
     * @returns UpdateVulnerabilityPolicyResponse Update response
     * @throws ApiError
     */
    public static async updatePolicy(
        id: number,
        action: 'block' | 'allow',
    ): Promise<UpdateVulnerabilityPolicyResponse> {
        const result = await __request({
            method: 'POST',
            path: `/security/cve/control/list`,
            query: {
                'id': id,
                'action': action,
            },
        });
        return result.body;
    }

    /**
     * create policy
     * @param requestBody
     * @returns CreateVulnerabilityPolicyResponse Create response
     * @throws ApiError
     */
    public static async createPolicy(
        requestBody?: CreateVulnerabilityPolicyRequest,
    ): Promise<CreateVulnerabilityPolicyResponse> {
        const result = await __request({
            method: 'PUT',
            path: `/security/cve/control/list`,
            body: requestBody,
        });
        return result.body;
    }

}