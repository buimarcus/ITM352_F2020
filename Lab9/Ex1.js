var month = 1;
var day = 28;
var year = 2000;

var StrYear = String(year);

var lastTwo = StrYear.slice(2,4);

var twoDigitYear = Number(lastTwo)

var step1 = twoDigitYear;
var step2 = parseInt(step1/4);
var step3 = step2 + step1;
var step5 = step3 + day;




/* Birthday Code

> var month = 1;
undefined
> var day = 28;
undefined
> var year = 2000;
undefined
> var StrYear = string(year);
Uncaught ReferenceError: string is not defined
> var StrYear = String(year);
undefined
> StrYear
'2000'
> var lastTwo = StrYear.slice(2,3);
undefined
> var lastTwo = StrYear.slice(2,4);
undefined
> StrYear
'2000'
> last
Uncaught ReferenceError: last is not defined
> lastTwo
'00'
> var twoDigityear = Number(lastTwo);
undefined
> step1 = 00
0
> step 2 = parseInt(step1/4);
step 2 = parseInt(step1/4);
     ^

Uncaught SyntaxError: Unexpected number
> step2 = parseInt(step1/4);
0
> step3 = step2 + step1;
0
> step4 = 1;
1
> step4 = step3 + 28;
28
> step8 = 28l
step8 = 28l
        ^^

Uncaught SyntaxError: Invalid or unexpected token
> step8 = 28;
28
> final = step8 - 2;
26
> final = final/7
3.7142857142857144
> final = 5;
5
FRIDAY! 

*/