/**
 * Copyright (c) 2021 Hengyang Zhang
 * 
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import resource from './report-resource.json'

export type ReportMessage = {
    mergeDate: string
    mergeDomain: string
    hostPlaceholder: string
    exportFileName: string
    batchDelete: {
        buttonText: string
        noSelectedMsg: string
        confirmMsg: string
        confirmMsgAll: string
        confirmMsgRange: string
    }
    remoteReading: {
        on: string
        off: string
        table: {
            client: string
            localData: string
            value: string
            percentage: string
        }
    }
}

const _default: Messages<ReportMessage> = resource

export default _default