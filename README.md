# accurate-timer-subscription
A Node.js module that makes accurate intervals using setTimeout and then emits an rxjs event on that iteration.
This is the first module I made so I'd be happy to get feedback from others.
## Installation 
```sh
npm install accurate-timer-subscription --save
```
## Usage
```javascript
import { AccurateTimer } from 'accurate-timer-subscription';
import { Subscription } from 'rxjs';

const timer = new AccurateTimer(1000);
const sub = new Subscription();

// Subscribe to events
sub.add(timer.subscribe((v) => {
    console.log('Date:', v);
}))
// Start the timer
timer.start();
// Change interval while running
timer.setMilliseconds(2000);
// Stop the timer
timer.stop();

```
```sh
Output should be of type new Date().toISOString() or 0 for errors
```
## Test 
```sh
npm run test