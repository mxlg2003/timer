import StoragePromise from "./common/storage-promise";

/**
 * User memory of this extension
 */
export declare type MemoryInfo = {
    /**
     * Used bytes
     */
    used: number
    /**
     * Total bytes
     */
    total: number
}

/**
 * 'QUOTA_BYTES' Not supported in Firefox
 */
const total: number = chrome.storage.local.QUOTA_BYTES || 0

/**
 * Get the used memory by bytes
 * 
 * @since 0.0.9
 */
export async function getUsedStorage(): Promise<MemoryInfo> {
    const used = await new StoragePromise(chrome.storage.local).getUsedMemory()
    return { used, total }
}