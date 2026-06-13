import { DiskUsage } from 'src/repositories/storage.repository';
import { asHumanReadable } from 'src/utils/bytes';

/**
 * Calculate the disk usage percentage from a DiskUsage object.
 * Returns a float rounded to two decimal places (e.g. 42.53).
 */
export function calculateDiskUsagePercentage(diskInfo: DiskUsage): number {
  const usagePercentage = (((diskInfo.total - diskInfo.free) / diskInfo.total) * 100).toFixed(2);
  return Number.parseFloat(usagePercentage);
}

/**
 * Format a DiskUsage object into human-readable strings and raw byte values
 * suitable for the ServerStorageResponseDto.
 */
export function formatDiskInfo(diskInfo: DiskUsage): {
  diskAvailable: string;
  diskSize: string;
  diskUse: string;
  diskAvailableRaw: number;
  diskSizeRaw: number;
  diskUseRaw: number;
  diskUsagePercentage: number;
} {
  return {
    diskAvailable: asHumanReadable(diskInfo.available),
    diskSize: asHumanReadable(diskInfo.total),
    diskUse: asHumanReadable(diskInfo.total - diskInfo.free),
    diskAvailableRaw: diskInfo.available,
    diskSizeRaw: diskInfo.total,
    diskUseRaw: diskInfo.total - diskInfo.free,
    diskUsagePercentage: calculateDiskUsagePercentage(diskInfo),
  };
}
