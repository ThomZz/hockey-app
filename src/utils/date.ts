export namespace DateHelper {
    export function since(date: Date, numberOfDays: number): Date {
        const d = new Date(date);
        d.setDate(date.getDate() - numberOfDays);
        return d;
    }

    export function toString(date: Date, withTime?: boolean): string {
        return date.toLocaleDateString("en-CA", withTime ? { hour: '2-digit', minute: '2-digit' } : {});
    }

    export function toShortString(date: Date): string {
        return date.toLocaleDateString("en-CA", { month: "long", day: "numeric" });
    }

    export function toAbbrevShortString(date: Date): string {
        return date.toLocaleDateString("en-CA", { month: "short", day: "numeric" });
    }

    export function addDays(date: Date, days: number): Date {
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }

    export function today(): Date {
        const now = new Date();
        return new Date(now.getFullYear(), now.getMonth(), now.getDate());
    }

    export function closest(needle: Date, haystack: Date[]): Date | undefined {
        return haystack.reduce((prev, curr) => {
            const nTime = needle.getTime();
            const prevTime = prev.getTime();
            const currTime = curr.getTime();
            let prevDiff = Math.abs(prevTime - nTime);
            let currDiff = Math.abs(currTime - nTime);

            if (prevDiff === currDiff) {
                return prev > curr ? prev : curr;
            } else {
                return currDiff < prevDiff ? curr : prev;
            }
        });
    }
}
