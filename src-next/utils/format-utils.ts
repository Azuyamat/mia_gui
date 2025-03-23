export class SizeFormatter {
    static format(size: number): string {
        if (size < 1024) {
            return `${size} B`;
        } else if (size < 1024 * 1024) {
            return `${(size / 1024).toFixed(2)} KB`;
        } else if (size < 1024 * 1024 * 1024) {
            return `${(size / (1024 * 1024)).toFixed(2)} MB`;
        } else {
            return `${(size / (1024 * 1024 * 1024)).toFixed(2)} GB`;
        }
    }
}

export class DateFormatter {
    static format(date: Date): string {
        return date.toLocaleString();
    }
}

export class DurationFormatter {
    static format(milliseconds: number): string {
        if (milliseconds < 1000) {
            return `${milliseconds} ms`;
        } else if (milliseconds < 1000 * 60) {
            return `${(milliseconds / 1000).toFixed(2)} s`;
        } else if (milliseconds < 1000 * 60 * 60) {
            return `${(milliseconds / (1000 * 60)).toFixed(2)} m`;
        }
        return `${(milliseconds / (1000 * 60 * 60)).toFixed(2)} h`;
    }
}
