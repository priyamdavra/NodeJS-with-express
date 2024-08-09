filter(){

let queryString = JSON.stringify(this.queryStr);
queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
const queryObj = JSON.parse(queryString);

this.query = this.query.find(queryObj);

return this;
}