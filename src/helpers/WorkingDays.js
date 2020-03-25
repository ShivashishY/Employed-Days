// get moment
import moment from 'moment';

// export calculation fn
export function calculateWorkingDays(start, end, weekStart, weekEnd, holidays) {

    // start
    let startDate = moment().format('DD-MM-YYYY'); // today from moment
    if ( start != null ) {
        startDate = start;
    }
    // end
    let retireDate = '31-12-' + moment().format('YYYY'); // end of this year as default 
    if ( end != null ) {
        retireDate = end;
    }
    // public holidays
    let publicHolidays = [
{name: 'Republic Day' , date: '26-01-2020'},
{name: 'Maha Shi date: ratri' , date: '21-02-2020'},
{name: 'Rangwali Holi' , date: '10-03-2020'},
{name: 'Gudi Padwa	Likely' , date: '25-03-2020'},
{name: 'Cheti Chand' , date: '26-03-2020'},
{name: 'Rama Na date: ami' , date: '02-04-2020'},
{name: 'Good Friday Fri' , date: '10-04-2020'},
{name: 'Ambedkar Jayanti' , date: '14-04-2020'},
{name: 'Maharashtra Day Fri' , date: '01-05-2020'},
{name: ' date: esak Likely Thu' , date: '07-05-2020'},
{name: 'Eid al Fitr Likely' , date: '23-05-2020'},
{name: 'Eid al-Adha Likely' , date: '30-07-2020'},
{name: 'Indian Independence Day Sat' , date: '15-08-2020'},
{name: 'Ganesh Chaturthi Likely Sat' , date: '22-08-2020'},
{name: 'Ashura	Likely' , date: '28–08-2020'},
{name: 'Gandhi Jayanti	Fri' , date: '02-10-2020'},
{name: 'Dussehra' , date: '25-10-2020'},
{name: 'Prophets Birthday Likely' , date: '28–10-2020'},
{name: 'Diwali	Sat' , date: '14-11-2020'},
{name: 'Laxmi Pooja Sat' , date: '14-11-2020'},
{name: 'Balipratipada Likely Sun' , date: '15-11-2020'},
{name: 'Bhai Dooj Likely Mon' , date: '16-11-2020'},
{name: 'Guru Nanak Gurpurab Likely Mon' , date: '30-11-2020'},
{name: 'Christmas Day Fri' , date: '25-12-2020'}      
    ];
    if ( holidays != null ) {
        publicHolidays = holidays;
    }
    // week start and end
    let weekdayStart = 1;
    let weekdayEnd = 5;
    if ( weekStart != null ) {
      switch(weekStart) {
        case 'Monday':
            weekdayStart = 1;
            break;
        case 'Tuesday':
            weekdayStart = 2;
            break;
        case 'Wednesday':
            weekdayStart = 3;
            break;
        case 'Thursday':
            weekdayStart = 4;
            break;  
        default:
            weekdayStart = 1;
      }      
    }
    if ( weekEnd != null ) {
      switch(weekEnd) {
        case 'Tuesday':
            weekdayEnd = 2;
            break;
        case 'Wednesday':
            weekdayEnd = 3;
            break;
        case 'Thursday':
            weekdayEnd = 4;
            break;
        case 'Friday':
            weekdayEnd = 5;
            break;         
        default:
            weekdayEnd = 5;
      }   
    }

    moment.fn.isBusinessDay = function() {
      // check if public holiday.
        for ( let day in publicHolidays ) {
            if ( publicHolidays[day].date === this.format('DD-MM-YYYY') ) {
                return false;
            }
        }
      // check if a weekday - 0-6 is sun-sat in Moment so 1-5.
        let curDay = this.day();
        if ( curDay >= weekdayStart && curDay <= weekdayEnd ) return true; 
        return false;
    };

    moment.fn.businessDiff = function (end) {
      // get start and end dates
      let start = this;
      let daysBetween = 0;
      let totalDays = 0;
      // if days are the same, don't run
      if (start === end) {
        return daysBetween;
      }
      // loop and check if day is business or holiday
      while ( start <= end ) {
        if ( start.isBusinessDay() ) {
          daysBetween++;
        }      
        totalDays++;  
        // move forward one day
        start.add(1, 'd');
      }
      return {totalDays, daysBetween};
    };

    // fire fn
    let daysBetween = moment( startDate ,'DD-MM-YYYY').businessDiff(moment( retireDate ,'DD-MM-YYYY')).daysBetween;
    let totalDays = moment( startDate ,'DD-MM-YYYY').businessDiff(moment( retireDate ,'DD-MM-YYYY')).totalDays;

    return {totalDays, daysBetween};

}
