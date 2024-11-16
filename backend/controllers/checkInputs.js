const { z } = require("zod");

function checkInputs(req) {
  try {
    const { firstName, lastName, email, phoneNumber, company, jobTitle } =
      req.body;
    console.log(req.body);

    const contactSchema = z.object({
      firstName: z.string().min(1, "First name is required"),
      lastName: z.string().min(1, "Last name is required"),
      email: z.string().email("Invalid email address"),
      phoneNumber: z.string().min(10, "Phone number is required"),
      company: z.string().min(1, "Company is required"),
      jobTitle: z.string().min(1, "Job title is required"),
    });

    const input = {
      firstName,
      lastName,
      email,
      phoneNumber,
      company,
      jobTitle,
    };
    const validatedData = contactSchema.parse(input);
    return validatedData;
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.log("Validation errors:", error.errors);
      return false;
    }
  }
}

module.exports = { checkInputs };
