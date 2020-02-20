"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
class AccurateTimer {
    constructor(ms) {
        this.id = 0;
        this.ms = 0;
        this.subject = new rxjs_1.Subject();
        this.setMilliseconds(ms);
    }
    /**
    * @Method: Start the Timer.
    * @Return {void}
    */
    start() {
        if (AccurateTimer.IS_RUNNING) {
            console.warn('Accurate timer is already running');
            return;
        }
        let expected = (new Date().getTime() + this.ms);
        // Register function
        const timeout = () => {
            // Notify subscriber that function has triggered
            this.subject.next(new Date().toISOString());
            const ms = this.ms;
            // Register the drift in time
            const drift = (new Date().getTime() - expected);
            if (drift > ms) {
                // An error occured, don't do anything
                this.subject.next(0);
            }
            if (this.id) {
                // Clear the previous one if it's still running
                window.clearTimeout(this.id);
            }
            // Update expected time for next iteration
            expected += ms;
            // Bind timeout id
            this.id = window.setTimeout(timeout, Math.max(0, (ms - drift)));
        };
        // Trigger
        timeout();
        AccurateTimer.IS_RUNNING = 1;
    }
    /**
    * @Method: Stop the timer.
    * @Return {void}
    */
    stop() {
        try {
            if (!this.id) {
                throw new Error('Id is not set.');
            }
            window.clearTimeout(this.id);
        }
        catch (err) {
            console.warn(err);
        }
        finally {
            AccurateTimer.IS_RUNNING = 0;
        }
    }
    /**
    * @Method: Set the interval in milliseconds.
    * @Param {number}
    * @Return {void}
    */
    setMilliseconds(ms) {
        if (!isNaN(ms)) {
            if (typeof ms === 'string') {
                ms = +ms;
            }
            if (ms < AccurateTimer.LOWEST_SAFE_VALUE) {
                ms = AccurateTimer.LOWEST_SAFE_VALUE;
            }
            if (ms > Number.MAX_SAFE_INTEGER) {
                ms = Number.MAX_SAFE_INTEGER;
            }
        }
        else {
            ms = AccurateTimer.INTERVAL_TIME_DEFAULT;
        }
        this.ms = ms;
    }
    /**
    * @Method: Starts the Timer.
    * @Return {callback, callback}
    */
    subscribe(success, error) {
        return this.subject.subscribe(success, error);
    }
}
exports.AccurateTimer = AccurateTimer;
AccurateTimer.INTERVAL_TIME_DEFAULT = 1000;
AccurateTimer.LOWEST_SAFE_VALUE = 10;
AccurateTimer.IS_RUNNING = 0;
