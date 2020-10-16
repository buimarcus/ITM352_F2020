this_year = 1900;

retirement_target = 2052;
retirement_year = years_to_retire(retirement_target);

console.log("I am going to retire in " + retirement_year + " years");

function years_to_retire (retire_year) {
    this_year = 2020;
    return retire_year - this_year;
}