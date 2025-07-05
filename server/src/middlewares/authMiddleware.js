export const sample = (req, res,next) => {

    console.log("i am middleware named sample");
    console.log(req.url);
    console.log(req.method);
    next(); // Call next middleware or route handler
};

export const sample1 = (req, res,next) => {

    console.log("i am middleware named sample1");
    console.log(req.url);
    console.log(req.method);
     next();
};

export const sample2 = (req, res,next) => {

    console.log("i am middleware named sample2");
    console.log(req.url);
    console.log(req.method);
     next();
};