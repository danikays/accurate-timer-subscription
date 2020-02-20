'use strict';
const expect = require('chai').expect;
const index = require('../dist/index.js');
const rxjs_1 = require("rxjs");
describe('Timer class test', () => {
    it('should return 10 dates and then stop', () => {

        let counter = 0;
        const interval = 1000;
        const timer = new index.AccurateTimer(interval);
        const shouldEqual = 10;
        const sub = new rxjs_1.Subscription();

        sub.add(timer.subscribe((v) => {
            console.log('subscription', v);
            counter++;
            console.log('counter', counter);
        }));

        // Start timer
        timer.start();
        console.log('Timer started');

        const expectedTime = (new Date().getTime() + (interval * shouldEqual));
        

        window.setTimeout(() => {
            timer.stop();
            console.log('Timer stopped');

            const n = counter;

            // Check if passed
            expect(n).to.equal(shouldEqual);
        }, (expectedTime - new Date().getTime()));

    });
});