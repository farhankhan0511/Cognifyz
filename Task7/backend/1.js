import bcrypt from "bcrypt";

const plainPassword = "Farhan$543201";
const hashedPassword = "$2b$10$FzETn.U3MR6UIw77fl2la.0plakuDoWYwn5ZzmD8gKsADbCo9SM1C";

bcrypt.compare(plainPassword, hashedPassword, (err, result) => {
    if (err) {
        console.error("Error during comparison:", err);
    } else {
        console.log("Comparison result:", result); // Should print true
    }
});
