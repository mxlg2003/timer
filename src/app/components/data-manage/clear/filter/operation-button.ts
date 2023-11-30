/**
 * Copyright (c) 2021 Hengyang Zhang
 * 
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { ButtonType, ElButton, ElMessage, ElMessageBox, ElTooltip, IconProps } from "element-plus"
import { Ref, h } from "vue"
import StatDatabase, { StatCondition } from "@db/stat-database"
import { ItemMessage } from "@i18n/message/common/item"
import { t } from "@src/app/locale"
import { DataManageMessage } from "@i18n/message/app/data-manage"
import { MILL_PER_DAY } from "@util/time"

const statDatabase = new StatDatabase(chrome.storage.local)

export type BaseFilterProps = {
    focusStartRef: Ref<string>
    focusEndRef: Ref<string>
    timeStartRef: Ref<string>
    timeEndRef: Ref<string>
    dateRangeRef: Ref<[Date, Date]>
}

type _Props = BaseFilterProps & {
    onDateChanged: () => void

    confirm: {
        message: keyof DataManageMessage
        operation: (result: timer.stat.Row[]) => Promise<any>
        resultMessage: keyof DataManageMessage
    }

    button: {
        icon: IconProps
        type: ButtonType
        message: keyof ItemMessage['operation']
    }

    tooltipMessage?: keyof DataManageMessage
}

export type OperationButtonProps = _Props

/**
 * Assert query param with numeric range
 * 
 * @param range       numeric range, 2-length array
 * @param mustInteger must be integer?
 * @returns true when has error, or false
 */
function assertQueryParam(range: number[], mustInteger?: boolean): boolean {
    const reg = mustInteger ? /^[0-9]+$/ : /^[0-9]+.?[0-9]*$/
    const start = range[0]
    const end = range[1]
    const noStart = start !== undefined && start !== null
    const noEnd = end !== undefined && end !== null
    return (noStart && !reg.test(start.toString()))
        || (noEnd && !reg.test(end.toString()))
        || (noStart && noEnd && start > end)
}

const str2Num = (str: Ref<string>, defaultVal?: number) => (str.value && str.value !== '') ? parseInt(str.value) : defaultVal

const str2Range = (startAndEnd: Ref<string>[], numAmplifier?: (origin: number) => number) => {
    const startStr = startAndEnd[0]
    const endStr = startAndEnd[1]
    let start = str2Num(startStr, 0)
    numAmplifier && (start = numAmplifier(start))
    let end = str2Num(endStr)
    end && numAmplifier && (end = numAmplifier(end))
    return [start, end]
}

const seconds2Milliseconds = (a: number) => a * 1000

function checkParam(props: _Props): StatCondition | undefined {
    const { focusStartRef, focusEndRef, timeStartRef, timeEndRef } = props
    let hasError = false
    const focusRange = str2Range([focusStartRef, focusEndRef], seconds2Milliseconds)
    hasError = hasError || assertQueryParam(focusRange)
    const timeRange = str2Range([timeStartRef, timeEndRef])
    hasError = hasError || assertQueryParam(timeRange, true)
    if (hasError) {
        return undefined
    }
    const condition: StatCondition = {}
    condition.focusRange = focusRange
    condition.timeRange = timeRange
    return condition
}

function generateParamAndSelect(props: _Props): Promise<timer.stat.Row[]> | undefined {
    const condition = checkParam(props)
    if (!condition) {
        ElMessage({ message: t(msg => msg.dataManage.paramError), type: 'warning' })
        return
    }

    const { dateRangeRef } = props
    let [dateStart, dateEnd] = dateRangeRef?.value || []
    if (dateEnd == null) {
        // default end time is the yesterday
        dateEnd = new Date(new Date().getTime() - MILL_PER_DAY)
    }
    condition.date = [dateStart, dateEnd]

    return statDatabase.select(condition)
}

const operationCancelMsg = t(msg => msg.button.cancel)
const operationConfirmMsg = t(msg => msg.button.confirm)

const handleClick = async (props: _Props) => {
    const result: timer.stat.Row[] = await generateParamAndSelect(props)

    const count = result.length
    const confirmMsg = t(msg => msg.dataManage[props.confirm.message], { count })
    ElMessageBox.confirm(confirmMsg, {
        cancelButtonText: operationCancelMsg,
        confirmButtonText: operationConfirmMsg
    }).then(async () => {
        await props.confirm.operation(result)
        ElMessage(t(msg => msg.dataManage[props.confirm.resultMessage]))
        props.onDateChanged()
    }).catch(() => { })
}

const button = (props: _Props) => h(ElButton,
    {
        icon: props.button.icon,
        type: props.button.type,
        size: 'small',
        onClick: () => handleClick(props)
    },
    () => t(msg => msg.item.operation[props.button.message])
)

const buttonWithTooltip = (props: _Props) => h(ElTooltip,
    { content: t(msg => msg.dataManage[props.tooltipMessage]) },
    () => button(props)
)

const operationButton = (props: _Props) => props.tooltipMessage ? buttonWithTooltip(props) : button(props)

export default operationButton