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

    export function closest(from: Date, dates: Date[]): Date
    export function closest<T = any>(from: Date, items:  T[], predicate: (i: T) => Date): Date
    export function closest<T = any>(from: Date, items: (Date | T)[], predicate?: (i: T) => Date): Date  {
        return items.reduce((prev, curr) => {
            const current = curr instanceof Date ? curr : predicate!(curr as T);
            let previous = prev instanceof Date ? prev : predicate!(prev as T);

            const nTime = from.getTime();
            const prevTime = previous.getTime();
            const currTime = current.getTime();
            let prevDiff = Math.abs(prevTime - nTime);
            let currDiff = Math.abs(currTime - nTime);

            if (prevDiff === currDiff) {
                return prev > current ? prev : current;
            } 
            return currDiff < prevDiff ? current : previous;
        }) as Date;
    }
}
