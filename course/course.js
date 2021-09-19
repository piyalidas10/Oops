class Course{    
    get price() {
        return '$' + this._price;
    }    
    set price(value) {
        this._price = value;
    }
    constructor(courseTitle, courseLength, coursePrice) {
        this._title = courseTitle;
        this._length = courseLength;
        this._price = coursePrice;
    }
    calulate() {
        return this._length / this._price;
    }
    courseSummary() {
        console.log('Course Summary ------------------');
        console.log('Title => ', this._title);
        console.log('Length => ', this._length);
        console.log('Price => ', this.price); // this.price is getter/setter price
    }
}

const jsCourse = new Course('JavaScript - The Complete Guide', 50, 44);
const reactCourse = new Course('React.js - The Complete Guide', 50, 36);

console.log(jsCourse.calulate());
console.log(reactCourse.calulate());

jsCourse.courseSummary();
reactCourse.courseSummary();

class PracticalCourse extends Course{
    constructor(title, length, price, numOfExercises){
        super(title, price, length);
        this._numOfExercises = numOfExercises;
    }
}

class TheoreticalCourse extends Course{
    publish() {
        console.log('Publishing...');
    }
}

const angularCourse = new PracticalCourse(
    'Angular - The Complete Guide',
    36,
    50,
    10
  );
  
angularCourse.courseSummary();