let standard_input = process.stdin;
let standard_output = process.stdout;
standard_input.setEncoding("ascii");

let _max = 182;
let _inf = _max * 2;

let t = 0;
let n = 0;
let m = 0;

let line = 0;
let current_test = 0;
let input_arr;

standard_input.on("data", function(data) {
  const reg = /(\d*)\s(\d*)/gm;
  if (data === "exit\n") {
    standard_output.write("User choose program exit\n");
    process.exit();
  } else {
    switch (line) {
      case 0:
        t = parseInt(data);
        line++;
        break;

      case 1:
        let regex_res = reg.exec(data);
        n = parseInt(regex_res[1]);
        m = parseInt(regex_res[2]);
        input_arr = new Array();
        let fill_arr = new Array(n + 2);
        fill_arr.fill(1);
        input_arr.push(fill_arr);
        line++;
        break;
      default:
        let vector = data
          .split("")
          .map(Number)
          .slice(0, n);
        input_arr.push([1].concat(vector, [1]));
        if (line == m + 1) {
          line = 1;
          current_test++;

          let fill_arr = new Array(n + 2);
          fill_arr.fill(1);
          input_arr.push(fill_arr);

          bfs(input_arr);

          if (current_test >= t) {
            standard_output.write("Program complete.\n");
            process.exit();
          }
        } else {
          line++;
        }

        break;
    }
  }
});

function bfs(arr) {
  let res = [];
  let head_count = 0;
  let head_run = 0;
  let head_m = [];
  let head_n = [];
  let a_m = arr.length - 1;
  let a_n = arr[0].length - 1;
  for (let i = 1; i < a_m; i++) {
    let line = arr[i];
    for (let j = 1; j < a_n; j++) {
      let el = line[j];
      if (el == 1) {
        head_m[head_count] = i;
        head_n[head_count] = j;
        head_count++;
      }
    }
  }

  while (head_run != head_count) {
    f = head_m[head_run];
    c = head_n[head_run];
    head_run++;
    let distance = arr[f][c] + 1;

    if (arr[f - 1][c] == 0) {
      arr[f - 1][c] = distance;
      head_m[head_count] = f - 1;
      head_n[head_count] = c;
      head_count++;
    }

    if (arr[f + 1][c] == 0) {
      arr[f + 1][c] = distance;
      head_m[head_count] = f + 1;
      head_n[head_count] = c;
      head_count++;
    }

    if (arr[f][c - 1] == 0) {
      arr[f][c - 1] = distance;
      head_m[head_count] = f;
      head_n[head_count] = c - 1;
      head_count++;
    }

    if (arr[f][c + 1] == 0) {
      arr[f][c + 1] = distance;
      head_m[head_count] = f;
      head_n[head_count] = c + 1;
      head_count++;
    }
  }

  for (let i = 1; i < a_m; i++) {
    let line = arr[i];
    res[i - 1] = [];
    for (let j = 1; j < a_n; j++) {
      arr[i][j] = arr[i][j] - 1;
      res[i - 1][j - 1] = arr[i][j];
      standard_output.write(arr[i][j] + (j < a_n - 1 ? " " : ""));
    }
    standard_output.write("\n");
  }

  return res;
}
