function myRobber(houses) {
  if (houses === null || houses.length === 0) return 0; //  NO Houses

  let money = 0; // we stolen so far

  // check every house
  for (let i = 0; i < houses.length; i++) {
    if (
      houses[i] + (houses[i + 2] ?? 0) >
      (houses[i + 1] ?? 0) + (houses[i + 3] ?? 0)
    ) {
     // console.log("stealing from  " + i);
      money += houses[i];
      houses[i] = 0; // we stole from this house
      if (i + 1 < houses.length) {
        // don't write out of boundary
        houses[i + 1] = 0;
      }
    } else {
      if ((houses[i - 1] ?? 0) > 0) {
        // check houses that we skipped over      (1,2,3,4,5,6,7)
       // console.log("stealing from  " + (i - 1));
        money += houses[i - 1];
        houses[i] = 0;
      }
    }
  }
  return money;
}

const { clear } = require("console");
//console.log(myRobber([100,200,300,100]));

const fs = require("fs");

let content = fs.readFileSync(process.argv[2], "utf8");

let data = JSON.parse(content);

console.log("stolen money :",myRobber(data));



/**    UNIT TEST       **/

function unitTest() {
  let testData = [
    [100, 200, 300, 100],
    [20, 70, 90, 3, 1],
    [1, 2, 3, 4, 5, 6, 7]
  ];

  let expected = [400, 111, 16];

  for (let i = 0; i < testData.length; i++) {
     //console.log(i);
    let actual = myRobber(testData[i]);
     //console.log(actual);
    if (actual !== expected[i]) {
      console.error("expected ", expected[i], "actual", actual);
    }
    
  }
}

unitTest();
