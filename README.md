# accurate-timer-subscription
A Node.js module that makes accurate intervals using setTimeout and then emits an rxjs event on that iteration.
This is the first module I made so I'd be happy to get feedback from others.
## Installation 
```sh
npm install accurate-timer-subscription --save
```
## Usage
### Javascript
```javascript
const AccurateTimer = require('accurate-timer-subscription');
const rxjs = require("rxjs");
const timer = new AccurateTimer.AccurateTimer(interval);
const sub = new rxjs.Subscription();
sub.add(timer.subscribe((v) => {
    console.log('Date:', v);
}))
timer.start();
timer.stop();
timer.setMilliseconds(2000);
```
```sh
Output should be of type new Date().toISOString() or 0
```
### TypeScript
```typescript
import { AccurateTimer } from 'accurate-timer-subscription';
import { Subscription } from 'rxjs';
const timer = new AccurateTimer(1000);
const sub = new Subscription();
sub.add(timer.subscribe((v) => {
    console.log('Date:', v);
}))
timer.start();
timer.stop();
timer.setMilliseconds(2000);
```
```sh
Output should be of type new Date().toISOString() or 0
```
## Test 
```sh
npm run test