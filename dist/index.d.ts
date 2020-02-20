export declare class AccurateTimer {
    private static readonly INTERVAL_TIME_DEFAULT;
    private static readonly LOWEST_SAFE_VALUE;
    private static IS_RUNNING;
    private id;
    private subject;
    private ms;
    constructor(ms: number);
    /**
    * @Method: Start the Timer.
    * @Return {void}
    */
    start(): void;
    /**
    * @Method: Stop the timer.
    * @Return {void}
    */
    stop(): void;
    /**
    * @Method: Set the interval in milliseconds.
    * @Param {number}
    * @Return {void}
    */
    setMilliseconds(ms: number): void;
    /**
    * @Method: Starts the Timer.
    * @Return {callback, callback}
    */
    subscribe(success: (v: string | number) => void, error?: (e: Error) => void): import("rxjs").Subscription;
}
